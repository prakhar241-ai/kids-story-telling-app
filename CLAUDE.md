# CLAUDE.md — KidsAreBest22 Story Generator

> This file tells Claude Code everything about this project. Read it fully before doing any work. The owner is a **beginner** — explain each step in simple language, and never run destructive commands without asking first.

---

## 1. What we are building

A web app called **KidsAreBest22** that generates short, age-appropriate **Hinglish** (Hindi + English) stories for kids. The user enters a few details and a chain of AI "agents" turns them into a finished story card with a moral lesson.

This app supports a faceless kids Instagram channel (`@kidsarebest22`) and will later be monetized.

**Tech stack (keep it beginner-friendly):**
- **Frontend:** React + Vite
- **Backend:** A small Node.js/Express server (REQUIRED — see security rules below)
- **AI provider:** OpenRouter (free tier), OpenAI-compatible API
- **Hosting:** Vercel (free) later

---

## 2. The multi-agent design

Four agents run **in sequence**. Each does ONE job. The output of one feeds into the next.

| # | Agent | Job |
|---|-------|-----|
| 1 | **Story Writer** | Writes a ~150-word Hinglish story from name + topic + age |
| 2 | **Simplifier** | Rewrites it with shorter words for the chosen age group |
| 3 | **Moral Finder** | Extracts a 2-line lesson (1 line Hindi, 1 line English) |
| 4 | **Title Maker** | Creates a short catchy title with one emoji |

The frontend should show a small status indicator for each agent as it runs (e.g. ✍️ → 🧸 → 💡 → 🎨).

---

## 3. OpenRouter setup (IMPORTANT — read carefully)

We are using **OpenRouter free models**, NOT Anthropic directly.

**API basics:**
- Base URL: `https://openrouter.ai/api/v1`
- Endpoint: `POST https://openrouter.ai/api/v1/chat/completions`
- Format: **OpenAI-compatible** (use `messages` array with `role` + `content`)
- Auth header: `Authorization: Bearer <OPENROUTER_API_KEY>`
- Recommended extra headers: `HTTP-Referer` (your site URL) and `X-Title` (your app name) — OpenRouter uses these for free-tier ranking.

**Which model to use:**
- Use a free model — any model ID ending in `:free`.
- Safest default: set the model to `openrouter/free` (this is OpenRouter's auto-router that picks an available free model for each request). This avoids breakage if a specific free model is removed.
- Make the model name a single constant at the top of the backend so it can be changed in one place.

**Rate limits we MUST respect (free tier):**
- ~20 requests per minute, ~200 requests per day.
- A 429 response means the limit was hit.
- Because each story = 4 agent calls = 4 requests, one user can only generate roughly **50 stories/day** on the free tier.
- Build in: (a) a clear, friendly error message if a 429 happens ("Bohot saare requests! Thodi der baad try karein 🙂"), and (b) a simple retry-after-wait with one retry attempt.

**Example request shape (for reference):**
```
POST https://openrouter.ai/api/v1/chat/completions
Headers:
  Authorization: Bearer $OPENROUTER_API_KEY
  Content-Type: application/json
  HTTP-Referer: https://kidsarebest22.example
  X-Title: KidsAreBest22
Body:
  {
    "model": "openrouter/free",
    "messages": [
      { "role": "system", "content": "<the agent's role>" },
      { "role": "user", "content": "<the agent's task>" }
    ]
  }
```
The reply text is at `response.choices[0].message.content`.

---

## 4. SECURITY RULES (do not break these)

1. **The OpenRouter API key must NEVER appear in frontend code.** If it's in the React app, anyone can open the browser and steal it, then run up usage on the owner's account.
2. All AI calls go through the **backend server**. The React frontend calls our own backend (e.g. `POST /api/generate-story`), and the backend talks to OpenRouter.
3. The key lives only in a `.env` file as `OPENROUTER_API_KEY=...`.
4. Add `.env` to `.gitignore` **before the first commit**. Never commit secrets.
5. Create a `.env.example` file with `OPENROUTER_API_KEY=` (empty) so the setup is documented without leaking the real key.

---

## 5. Build order (do these one phase at a time, pause after each)

**Phase 1 — Skeleton**
- Set up Vite + React frontend and an Express backend in one repo.
- Build the input form: child's name (optional), story topic, age group (2-3 / 4-6 / 7-9), and a "Create Story" button.
- Kid-friendly colorful UI. No AI logic yet. Confirm it runs locally.

**Phase 2 — One agent working end-to-end**
- Wire the backend `/api/generate-story` route to call OpenRouter ONCE (just the Story Writer agent).
- Confirm a story comes back and shows on screen. Get the key + `.env` working here.

**Phase 3 — Full 4-agent chain**
- Add the other 3 agents in sequence on the backend.
- Add the per-agent status indicators on the frontend.
- Add 429 handling and the friendly error message.

**Phase 4 — Polish**
- "Generate Another" button, loading states, mobile layout (most users will be on phones).
- "Copy story" and "Share on WhatsApp" buttons (useful for the Instagram workflow).

**Phase 5 — Deploy**
- Deploy to Vercel for free. Set `OPENROUTER_API_KEY` as an environment variable in the Vercel dashboard (NOT in code).

---

## 6. Agent prompts (starting point — refine later)

**Agent 1 — Story Writer**
- System: "You are a warm, imaginative children's storyteller for an Indian audience."
- User: "Write a ~150-word story for kids aged {age}. Main character: {name or 'a little child'}. Theme: {topic}. Natural Hinglish. Clear beginning, small problem, happy ending, gentle lesson."

**Agent 2 — Simplifier**
- System: "You simplify text for very young children without losing the charm."
- User: "Rewrite using shorter sentences and simpler words for a {age} year old. Keep it Hinglish and fun. Story: {story}"

**Agent 3 — Moral Finder**
- System: "You extract gentle moral lessons from children's stories."
- User: "Write ONE moral in two lines: line 1 Hindi, line 2 English, each under 12 words. Story: {story}"

**Agent 4 — Title Maker**
- System: "You write playful, catchy titles for children's stories."
- User: "Create ONE catchy title, max 5 words, one emoji at the start. Reply with ONLY the title. Story: {story}"

---

## 7. Working style for Claude Code

- I am a beginner. Explain what each command does before running it.
- Always ask before installing global packages or deleting files.
- Make small commits with clear messages.
- After each phase, give me simple instructions to test it myself before moving on.
- If something needs a paid upgrade, tell me clearly and suggest the free alternative first.

---

## 8. Content safety (this is a kids app)

- All stories must be gentle, positive, non-scary, and age-appropriate.
- No violence, fear, or adult themes.
- The backend should reject or soften any topic that isn't suitable for young children.
