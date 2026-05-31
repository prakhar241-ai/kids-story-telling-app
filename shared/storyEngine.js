// ──────────────────────────────────────────────────────────────
//  Shared story engine
//  Used by BOTH the local backend (backend/server.js) and the
//  Vercel serverless function (api/generate-story.js).
//  Edit story logic / prompts HERE — one place, both environments.
// ──────────────────────────────────────────────────────────────

// Free models. OpenRouter tries them in order — if the first is congested
// upstream, it automatically falls back to the next. OpenRouter allows at most
// 3 models in this fallback list. Edit this list to change which models are used.
const MODELS = [
  'meta-llama/llama-3.3-70b-instruct:free',
  'google/gemini-2.0-flash-exp:free',
  'deepseek/deepseek-chat-v3-0324:free',
]
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

const MAX_ATTEMPTS = 3    // how many times to try a call before giving up on a 429
const MAX_WAIT_MS = 15000 // never wait longer than this between retries

// Raised when OpenRouter keeps rate-limiting us even after all retries
class RateLimitError extends Error {}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function callOpenRouter(systemPrompt, userPrompt) {
  const response = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://kidsarebest22.example',
      'X-Title': 'KidsAreBest22',
    },
    body: JSON.stringify({
      models: MODELS,            // primary + automatic fallbacks
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    }),
  })

  if (response.status === 429) {
    // OpenRouter tells us how long to wait, in seconds
    const retryAfter = Number(response.headers.get('Retry-After')) || 5
    return { rateLimited: true, retryAfterMs: Math.min(retryAfter * 1000, MAX_WAIT_MS) }
  }

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`OpenRouter error ${response.status}: ${text}`)
  }

  const data = await response.json()
  return { text: data.choices[0].message.content.trim() }
}

// Calls OpenRouter, retrying on 429 (honoring the Retry-After hint) up to
// MAX_ATTEMPTS times. Takes a { system, user } prompt object.
async function runAgent(prompt) {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const result = await callOpenRouter(prompt.system, prompt.user)
    if (!result.rateLimited) {
      return result.text
    }
    // rate-limited — wait the suggested time, unless that was our last try
    if (attempt < MAX_ATTEMPTS) {
      await sleep(result.retryAfterMs)
    }
  }
  throw new RateLimitError('rate limited after retries')
}

// ── Agent prompts (per language) ──────────────────────────────
const PROMPTS = {
  english: {
    writer: (name, topic, age) => ({
      system: 'You are a warm, imaginative children\'s storyteller. Write only in simple English.',
      user: `Write a ~150-word story in simple English for kids aged ${age}. Main character: ${name}. Theme: ${topic}. Clear beginning, small problem, happy ending, gentle lesson.`,
    }),
    simplifier: (story, age) => ({
      system: 'You simplify text for very young children without losing the charm. Reply only in simple English.',
      user: `Rewrite using shorter sentences and simpler words for a ${age} year old. Keep it fun and in simple English. Reply with only the rewritten story. Story: ${story}`,
    }),
    moral: (story) => ({
      system: 'You extract gentle moral lessons from children\'s stories. Reply only in simple English.',
      user: `Write ONE short moral lesson in a single line of simple English, under 12 words. Reply with only the moral. Story: ${story}`,
    }),
    title: (story) => ({
      system: 'You write playful, catchy titles for children\'s stories in English.',
      user: `Create ONE catchy title in English, max 5 words, one emoji at the start. Reply with ONLY the title. Story: ${story}`,
    }),
  },
  hindi: {
    writer: (name, topic, age) => ({
      system: 'आप एक गर्मजोशी भरे, कल्पनाशील बच्चों के कहानीकार हैं। केवल शुद्ध हिंदी में लिखें।',
      user: `${age} साल के बच्चों के लिए शुद्ध हिंदी में लगभग 150 शब्दों की कहानी लिखें। मुख्य पात्र: ${name}। विषय: ${topic}। स्पष्ट शुरुआत, एक छोटी समस्या, खुशहाल अंत और एक कोमल सीख हो।`,
    }),
    simplifier: (story, age) => ({
      system: 'आप छोटे बच्चों के लिए कहानी को सरल बनाते हैं, बिना उसका मज़ा खोए। केवल शुद्ध हिंदी में उत्तर दें।',
      user: `${age} साल के बच्चे के लिए छोटे वाक्यों और आसान शब्दों में कहानी दोबारा लिखें। मज़ेदार और शुद्ध हिंदी में रखें। केवल नई कहानी लिखें। कहानी: ${story}`,
    }),
    moral: (story) => ({
      system: 'आप बच्चों की कहानियों से कोमल सीख निकालते हैं। केवल शुद्ध हिंदी में उत्तर दें।',
      user: `एक पंक्ति में शुद्ध हिंदी में एक छोटी सी सीख लिखें, 12 शब्दों से कम। केवल सीख लिखें। कहानी: ${story}`,
    }),
    title: (story) => ({
      system: 'आप बच्चों की कहानियों के लिए मज़ेदार, आकर्षक शीर्षक लिखते हैं। केवल हिंदी में।',
      user: `हिंदी में एक आकर्षक शीर्षक बनाएं, अधिकतम 5 शब्द, शुरुआत में एक इमोजी। केवल शीर्षक लिखें। कहानी: ${story}`,
    }),
  },
}

// Runs the full 4-agent chain. Calls send(event) for every progress update,
// then a final { step: 'complete', ... } or { step: 'error', ... } event.
// Handles all validation and errors internally — callers just stream the events.
export async function streamStory({ name, topic, age, language }, send) {
  if (!topic || !age || !language) {
    return send({ step: 'error', error: 'Topic, age, and language are required.' })
  }
  if (!['english', 'hindi'].includes(language)) {
    return send({ step: 'error', error: 'Language must be "english" or "hindi".' })
  }
  if (!process.env.OPENROUTER_API_KEY) {
    return send({ step: 'error', error: 'API key not configured on the server.' })
  }

  const childName = name?.trim() || (language === 'hindi' ? 'एक छोटा बच्चा' : 'a little child')
  const p = PROMPTS[language]

  try {
    // Agent 1 — Story Writer
    send({ step: 'writer', status: 'running' })
    let story = await runAgent(p.writer(childName, topic, age))
    send({ step: 'writer', status: 'done' })

    // Agent 2 — Simplifier
    send({ step: 'simplifier', status: 'running' })
    story = await runAgent(p.simplifier(story, age))
    send({ step: 'simplifier', status: 'done' })

    // Agent 3 — Moral Finder
    send({ step: 'moral', status: 'running' })
    const moral = await runAgent(p.moral(story))
    send({ step: 'moral', status: 'done' })

    // Agent 4 — Title Maker
    send({ step: 'title', status: 'running' })
    const title = await runAgent(p.title(story))
    send({ step: 'title', status: 'done' })

    send({ step: 'complete', title, story, moral })
  } catch (err) {
    if (err instanceof RateLimitError) {
      send({ step: 'error', error: 'Too many requests! Please try again in a little while. 🙂' })
    } else {
      console.error('Story generation failed:', err.message)
      send({ step: 'error', error: 'Story generation failed. Please try again.' })
    }
  }
}
