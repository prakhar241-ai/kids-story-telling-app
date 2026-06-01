import { useState, useEffect, useRef } from 'react'
import './App.css'

const AGE_GROUPS = [
  { value: '2-3', label: '2–3 years', emoji: '🍼' },
  { value: '4-6', label: '4–6 years', emoji: '🧸' },
  { value: '7-9', label: '7–9 years', emoji: '📚' },
]

const LANGUAGES = [
  { value: 'english', label: 'English', emoji: '🇬🇧' },
  { value: 'hindi', label: 'हिंदी', emoji: '🇮🇳' },
]

// Popular words shown as tappable chips (all exist in the story bank)
const POPULAR = [
  'Unicorn', 'Dragon', 'Mermaid', 'Robot', 'Dinosaur', 'Wizard', 'Fairy',
  'Lion', 'Elephant', 'Rabbit', 'Monkey', 'Doraemon', 'Pikachu', 'Rose', 'Mango', 'Train',
]

// "Surprise Me" picks one of these fun words at random
const FUN_LIST = ['Dinosaur', 'Mermaid', 'Robot', 'Cupcake', 'Wizard', 'Unicorn', 'Spaceship', 'Dragon', 'Fairy', 'Astronaut', 'Snowman', 'Teddy']

const FONT_SIZES = ['Small', 'Medium', 'Large']
const REACTIONS = ['😍', '🤩', '😄']

// Brand + standard info pages (opened from the footer links)
const BRAND = 'StoryNest'
const CONTACT = 'prakhar2goel@gmail.com'
const PAGES = {
  about: {
    title: `About ${BRAND}`,
    body: `${BRAND} makes free, safe, age-appropriate stories for curious kids aged 4–12. Every tale is hand-written and carefully screened to be gentle, positive, and fun.\n\nStories come in both English and Hindi, with a read-aloud voice so even the littlest listeners can enjoy them. No accounts, no ads, no clutter — just stories.`,
  },
  safety: {
    title: 'Safety Policy',
    body: `Every story on ${BRAND} follows strict content rules: no violence, nothing scary or upsetting, no bad language, and always a happy ending with a gentle moral.\n\nSearch words are filtered to keep things kid-friendly, and there are no ads or links that take a child away from the app. Stories are written and reviewed by us — never shown unsupervised.`,
  },
  privacy: {
    title: 'Privacy',
    body: `We don't collect any personal data. ${BRAND} has no accounts, no sign-ups, and no tracking cookies or analytics that identify you.\n\nNothing you type or tap is stored or shared. The voice features (read-aloud and voice search) run entirely in your own browser and are never recorded or sent anywhere.\n\nQuestions? Email us at ${CONTACT}.`,
  },
}

// Client-side instant safety check (backend double-checks too)
const BLOCKED = ['violence', 'violent', 'weapon', 'gun', 'knife', 'bomb', 'sword', 'death', 'dead', 'die', 'kill', 'murder', 'blood', 'gore', 'hurt', 'fight', 'war', 'attack', 'scary', 'fear', 'horror', 'ghost', 'zombie', 'monster', 'devil', 'demon', 'nightmare', 'sex', 'naked', 'nude', 'porn', 'kiss', 'drug', 'alcohol', 'wine', 'beer', 'smoke', 'hate', 'stupid', 'idiot', 'dumb', 'ugly']
const BLOCK_MSG = "Oops! Try a fun word like 'unicorn' or 'spaceship'! 🌈"

function isBlocked(kw) {
  const lower = kw.toLowerCase()
  return BLOCKED.some((bad) => lower.includes(bad))
}

// Browser voice support (free, no API key)
const TTS_SUPPORTED = typeof window !== 'undefined' && 'speechSynthesis' in window
const SpeechRec = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null
const STT_SUPPORTED = !!SpeechRec

// Split text into sentences, keeping punctuation + trailing space (works for English + Hindi)
function splitSentences(text) {
  const parts = text.match(/[^.!?।]+[.!?।]*\s*/g)
  return parts ? parts.filter((s) => s.trim()) : [text]
}

// Turn a story into numbered, highlightable segments (title → sentences → moral).
// The same numbering is used for both reading and on-screen highlighting.
function buildReadModel(story) {
  let idx = 0
  const title = { text: story.title, idx: idx++ }
  const paragraphs = story.body.split(/\n\n+/).map((p) => splitSentences(p).map((sent) => ({ text: sent, idx: idx++ })))
  const moral = { text: `The End! Remember: ${story.moral}`, idx: idx++ }
  return { title, paragraphs, moral }
}

// Name hints used to guess a voice's gender (the Web Speech API doesn't expose it)
const FEMALE_HINTS = ['female', 'woman', 'zira', 'heera', 'kalpana', 'samantha', 'lekha', 'susan', 'linda', 'aria', 'jenny', 'swara', 'neerja', 'veena', 'tessa', 'fiona', 'karen', 'moira', 'catherine', 'google us english', 'google uk english female', 'google हिन्दी']
const MALE_HINTS = ['male', ' man', 'david', 'mark', 'hemant', 'rishi', 'daniel', 'alex', 'ravi', 'prabhat', 'george', 'arthur', 'oliver', 'google uk english male']

function voicesFor(language) {
  if (!TTS_SUPPORTED) return []
  const prefix = language === 'hindi' ? 'hi' : 'en'
  return window.speechSynthesis.getVoices().filter((v) => v.lang && v.lang.toLowerCase().startsWith(prefix))
}

function pickVoice(language, gender) {
  const langVoices = voicesFor(language)
  // Never force a voice from another language — an English voice can't read Hindi
  // (it just stays silent). If there's no matching voice, return null and let the
  // browser fall back on its own.
  if (!langVoices.length) return null
  const want = gender === 'man' ? MALE_HINTS : FEMALE_HINTS
  const avoid = gender === 'man' ? FEMALE_HINTS : MALE_HINTS
  const has = (v, list) => list.some((h) => v.name.toLowerCase().includes(h))
  return langVoices.find((v) => has(v, want)) || langVoices.find((v) => !has(v, avoid)) || langVoices[0]
}

function App() {
  const [keyword, setKeyword] = useState('')
  const [age, setAge] = useState('')
  const [language, setLanguage] = useState('')
  const [loading, setLoading] = useState(false)
  const [stories, setStories] = useState([])
  const [index, setIndex] = useState(0)
  const [message, setMessage] = useState('')
  const [items, setItems] = useState([])
  const [copied, setCopied] = useState(false)
  const [fontSize, setFontSize] = useState('Medium')
  const [reaction, setReaction] = useState(null)
  const [speaking, setSpeaking] = useState(false)
  const [listening, setListening] = useState(false)
  const [voiceGender, setVoiceGender] = useState('woman')
  const [activeIdx, setActiveIdx] = useState(-1)
  const [infoPage, setInfoPage] = useState(null)
  const [voiceNote, setVoiceNote] = useState('')
  const speakTokenRef = useRef(0) // invalidates an in-progress read when we stop/restart

  // Load the searchable words once (for the chips, with Hindi labels)
  useEffect(() => {
    fetch('/api/search-items')
      .then((r) => r.json())
      .then((d) => setItems(d.items || []))
      .catch(() => {})
  }, [])

  // Warm up the voice list (voices load asynchronously in some browsers)
  useEffect(() => {
    if (!TTS_SUPPORTED) return
    window.speechSynthesis.getVoices()
    const handler = () => window.speechSynthesis.getVoices()
    window.speechSynthesis.addEventListener('voiceschanged', handler)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', handler)
  }, [])

  const current = stories[index] || null
  const readModel = current ? buildReadModel(current) : null

  const labelFor = (englishTerm) => {
    if (language !== 'hindi') return englishTerm
    const found = items.find((it) => it.term === englishTerm)
    return found ? found.term_hi : englishTerm
  }

  // ── Voice: read the story aloud (text-to-speech) ──
  const stopSpeaking = () => {
    speakTokenRef.current++ // any in-flight chain will see a stale token and stop
    if (TTS_SUPPORTED) window.speechSynthesis.cancel()
    setSpeaking(false)
    setActiveIdx(-1)
    setVoiceNote('')
  }

  const toggleSpeak = () => {
    if (!current || !readModel) return
    if (speaking) { stopSpeaking(); return }

    const voice = pickVoice(language, voiceGender)
    const lang = language === 'hindi' ? 'hi-IN' : 'en-US'
    const allVoices = TTS_SUPPORTED ? window.speechSynthesis.getVoices() : []

    // Only warn if voices ARE loaded but none exist for this language (reading would be
    // silent). If the list isn't loaded yet, attempt anyway and let the browser fall back.
    if (!voice && allVoices.length && !voicesFor(language).length) {
      setVoiceNote(
        language === 'hindi'
          ? 'This browser has no Hindi voice installed, so Hindi read-aloud is silent here. Try Chrome or Edge, which include a Hindi voice. 🙂'
          : 'No English voice is available on this device for read-aloud.'
      )
      return
    }
    setVoiceNote('')

    // Flatten into ordered segments: title → each sentence → moral
    const segs = [readModel.title, ...readModel.paragraphs.flat(), readModel.moral]

    // Speak ONE sentence at a time, chaining each on the previous one's `onend`.
    // Queuing all utterances at once is unreliable in Chrome with remote voices
    // (the Hindi voice is remote) and can play nothing. Chaining fixes that and
    // keeps the highlight in sync.
    window.speechSynthesis.cancel()
    const myToken = ++speakTokenRef.current
    setSpeaking(true)

    const speakSeg = (i) => {
      if (myToken !== speakTokenRef.current) return // stopped or superseded
      if (i >= segs.length) { setActiveIdx(-1); setSpeaking(false); return }
      const seg = segs[i]
      const u = new SpeechSynthesisUtterance(seg.text)
      u.lang = lang
      u.rate = 0.9    // a little slower for kids
      // Pitch carries the Man/Woman difference. This matters most for Hindi, where
      // Chrome has only one (female) voice — a lower pitch makes the Man option sound male.
      u.pitch = voiceGender === 'man' ? 0.8 : 1.2
      if (voice) u.voice = voice
      u.onstart = () => { if (myToken === speakTokenRef.current) setActiveIdx(seg.idx) }
      u.onend = () => speakSeg(i + 1)
      u.onerror = () => { if (myToken === speakTokenRef.current) { setActiveIdx(-1); setSpeaking(false) } }
      window.speechSynthesis.speak(u)
    }

    // small delay lets cancel() settle (a Chrome quirk) before the first utterance
    setTimeout(() => speakSeg(0), 60)
  }

  const changeVoiceGender = (g) => {
    if (g === voiceGender) return
    stopSpeaking()
    setVoiceGender(g)
  }

  // ── Voice: say a word to search (speech-to-text) ──
  const startListening = () => {
    if (!STT_SUPPORTED || listening) return
    const rec = new SpeechRec()
    rec.lang = language === 'hindi' ? 'hi-IN' : 'en-US'
    rec.interimResults = false
    rec.maxAlternatives = 1
    rec.onresult = (e) => {
      const said = (e.results[0][0].transcript || '').trim().replace(/[.।!?]+$/, '')
      setKeyword(said)
      runSearch(said)
    }
    rec.onend = () => setListening(false)
    rec.onerror = () => setListening(false)
    try { rec.start(); setListening(true) } catch { setListening(false) }
  }

  const runSearch = async (kw) => {
    stopSpeaking()
    if (!age || !language) {
      setMessage('Please pick an age and a language first! 🙂')
      return
    }
    if (isBlocked(kw)) {
      setMessage(BLOCK_MSG)
      setStories([])
      return
    }

    setLoading(true)
    setMessage('')
    setStories([])
    setReaction(null)

    try {
      const res = await fetch('/api/story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword: kw, age, language }),
      })
      const data = await res.json()

      if (data.blocked) {
        setMessage(data.message)
      } else if (data.stories && data.stories.length) {
        setStories(data.stories)
        setIndex(0)
      } else {
        setMessage('Hmm, no story for that word yet. Try a fun word below! 🌈')
      }
    } catch {
      setMessage('Could not reach the story shelf. Please try again. 🙂')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    runSearch(keyword)
  }

  const handleChip = (englishTerm) => {
    setKeyword(englishTerm)
    runSearch(englishTerm)
  }

  const handleSurprise = () => {
    const pick = FUN_LIST[Math.floor(Math.random() * FUN_LIST.length)]
    setKeyword(pick)
    runSearch(pick)
  }

  // ── Copy / Share ──
  const buildShareText = () =>
    `${current.title}\n\n${current.body}\n\nThe End! Remember: ${current.moral}\n\n— @kidsarebest22`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildShareText())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setMessage('Could not copy. Please select and copy the text manually.')
    }
  }

  const handleWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(buildShareText())}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="app">
      <header className="header">
        <div className="logo">📖</div>
        <h1>Story<span className="brand-accent">Nest</span></h1>
        <p className="tagline">Type a fun word and find a magical story ✨</p>
        <div className="badges">
          <span className="badge">📚 400+ stories</span>
          <span className="badge">🇮🇳 Hindi &amp; English</span>
          <span className="badge">💡 Moral in every tale</span>
        </div>
      </header>

      <section className="trust-banner" aria-label="Safe for kids">
        <div className="trust-item">
          <span className="trust-icon" aria-hidden="true">🔒</span>
          <span className="trust-text">No accounts, no data collected, ever</span>
        </div>
        <div className="trust-item">
          <span className="trust-icon" aria-hidden="true">🛡️</span>
          <span className="trust-text">Every story is age-appropriate, no violence, no ads</span>
        </div>
        <div className="trust-item">
          <span className="trust-icon" aria-hidden="true">🚫</span>
          <span className="trust-text">No external links or tracking</span>
        </div>
      </section>

      <main className="main">
        <form className="story-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="keyword">Search a word ✨</label>
            <div className="search-row">
              <input
                id="keyword"
                type="text"
                placeholder="e.g. unicorn, lion, dragon…"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                maxLength={30}
                disabled={loading}
              />
              {STT_SUPPORTED && (
                <button
                  type="button"
                  className={`btn-audio btn-icon mic-btn ${listening ? 'is-listening' : ''}`}
                  onClick={startListening}
                  disabled={loading}
                  title="Say a word"
                  aria-label="Search by voice"
                >
                  {listening ? '🎙️' : '🎤'}
                </button>
              )}
              <button type="button" className="btn-magic" onClick={handleSurprise} disabled={loading}>
                🎲 Surprise Me!
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Popular words 👇</label>
            <div className="chips">
              {POPULAR.map((term) => (
                <button
                  key={term}
                  type="button"
                  className="btn-ghost chip"
                  onClick={() => handleChip(term)}
                  disabled={loading}
                >
                  {labelFor(term)}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Age Group <span className="required">*</span></label>
            <div className="age-buttons">
              {AGE_GROUPS.map((g) => (
                <button
                  key={g.value}
                  type="button"
                  className={`btn-ghost age-btn ${age === g.value ? 'is-selected' : ''}`}
                  onClick={() => setAge(g.value)}
                  disabled={loading}
                >
                  <span className="age-emoji">{g.emoji}</span>
                  <span>{g.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Story Language <span className="required">*</span></label>
            <div className="lang-buttons">
              {LANGUAGES.map((l) => (
                <button
                  key={l.value}
                  type="button"
                  className={`btn-ghost lang-btn ${language === l.value ? 'is-selected' : ''}`}
                  onClick={() => setLanguage(l.value)}
                  disabled={loading}
                >
                  <span className="lang-emoji">{l.emoji}</span>
                  <span>{l.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="btn-primary btn-block submit-btn" disabled={loading}>
            {loading ? '✨ Finding your story…' : '✨ Find a Story ✨'}
          </button>
        </form>

        {loading && (
          <div className="state-card" aria-live="polite">
            <div className="spinner" />
            <p className="state-text">Finding a magical story…</p>
          </div>
        )}

        {message && !loading && <div className="message-card">{message}</div>}

        {!loading && !current && !message && (
          <div className="state-card">
            <span className="state-emoji" aria-hidden="true">📚</span>
            <p className="state-title">Ready for a story?</p>
            <p className="state-text">Pick an age and language, then type a fun word (like “unicorn”) or tap a chip above.</p>
          </div>
        )}

        {current && !loading && (
          <div className="story-card">
            <div className="font-toggle">
              <span className="font-label">Text size:</span>
              {FONT_SIZES.map((f) => (
                <button
                  key={f}
                  type="button"
                  className={`btn-ghost font-btn ${fontSize === f ? 'is-selected' : ''}`}
                  onClick={() => setFontSize(f)}
                >
                  {f}
                </button>
              ))}
            </div>

            <h2 className="story-title">
              <span className={activeIdx === readModel.title.idx ? 'reading' : ''}>{current.title}</span>
            </h2>

            {TTS_SUPPORTED && (
              <>
              <div className="listen-controls">
                <button
                  type="button"
                  className={`btn-audio listen-btn ${speaking ? 'is-speaking' : ''}`}
                  onClick={toggleSpeak}
                >
                  {speaking ? '⏹️ Stop reading' : '🔊 Read aloud'}
                </button>
                <div className="voice-toggle">
                  <button
                    type="button"
                    className={`btn-ghost voice-opt ${voiceGender === 'woman' ? 'is-selected' : ''}`}
                    onClick={() => changeVoiceGender('woman')}
                  >
                    👩 Woman
                  </button>
                  <button
                    type="button"
                    className={`btn-ghost voice-opt ${voiceGender === 'man' ? 'is-selected' : ''}`}
                    onClick={() => changeVoiceGender('man')}
                  >
                    👨 Man
                  </button>
                </div>
              </div>
              {voiceNote && <p className="voice-note">🔈 {voiceNote}</p>}
              </>
            )}

            <div className={`story-text ${fontSize.toLowerCase()}`}>
              {readModel.paragraphs.map((para, pi) => (
                <p key={pi} className="story-para">
                  {para.map((sent) => (
                    <span key={sent.idx} className={activeIdx === sent.idx ? 'reading' : ''}>{sent.text}</span>
                  ))}
                </p>
              ))}
            </div>

            <div className="moral-box">
              <span className="moral-label">🌟 The End!</span>
              <p className="moral-text">
                <span className={activeIdx === readModel.moral.idx ? 'reading' : ''}>Remember: {current.moral}</span>
              </p>
            </div>

            <div className="reactions">
              <span className="reactions-label">Did you like it?</span>
              {REACTIONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  className={`btn-ghost reaction-btn ${reaction === emoji ? 'is-picked' : ''}`}
                  onClick={() => setReaction(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>

            <div className="share-buttons">
              <button type="button" className="btn-ghost" onClick={handleCopy}>
                {copied ? '✅ Copied!' : '📋 Copy story'}
              </button>
              <button type="button" className="btn-share" onClick={handleWhatsApp}>
                💬 Share on WhatsApp
              </button>
            </div>

            {stories.length > 1 && (
              <button
                type="button"
                className="btn-primary btn-block another-btn"
                onClick={() => { stopSpeaking(); setIndex((index + 1) % stories.length); setReaction(null) }}
              >
                🔄 Show another match ({index + 1}/{stories.length})
              </button>
            )}
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="footer-brand">{BRAND}</div>
        <p className="footer-mission">Free, safe stories for curious kids.</p>
        <a className="footer-email" href={`mailto:${CONTACT}`}>{CONTACT}</a>
        <nav className="footer-links">
          <button type="button" onClick={() => setInfoPage('about')}>About</button>
          <span className="footer-sep" aria-hidden="true">|</span>
          <button type="button" onClick={() => setInfoPage('safety')}>Safety Policy</button>
          <span className="footer-sep" aria-hidden="true">|</span>
          <button type="button" onClick={() => setInfoPage('privacy')}>Privacy</button>
        </nav>
      </footer>

      {infoPage && (
        <div className="info-overlay" onClick={() => setInfoPage(null)}>
          <div className="info-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <button className="info-close" onClick={() => setInfoPage(null)} aria-label="Close">✕</button>
            <h2 className="info-title">{PAGES[infoPage].title}</h2>
            <p className="info-body">{PAGES[infoPage].body}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
