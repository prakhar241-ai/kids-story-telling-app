import { useState, useEffect } from 'react'
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

function pickVoice(language, gender) {
  if (!TTS_SUPPORTED) return null
  const voices = window.speechSynthesis.getVoices()
  if (!voices.length) return null
  const prefix = language === 'hindi' ? 'hi' : 'en'
  const langVoices = voices.filter((v) => v.lang && v.lang.toLowerCase().startsWith(prefix))
  const pool = langVoices.length ? langVoices : voices
  const want = gender === 'man' ? MALE_HINTS : FEMALE_HINTS
  const avoid = gender === 'man' ? FEMALE_HINTS : MALE_HINTS
  const has = (v, list) => list.some((h) => v.name.toLowerCase().includes(h))
  return pool.find((v) => has(v, want)) || pool.find((v) => !has(v, avoid)) || pool[0] || null
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
    if (TTS_SUPPORTED) window.speechSynthesis.cancel()
    setSpeaking(false)
    setActiveIdx(-1)
  }

  const toggleSpeak = () => {
    if (!current || !readModel) return
    if (speaking) { stopSpeaking(); return }

    // Flatten into ordered segments: title → each sentence → moral
    const segs = [readModel.title, ...readModel.paragraphs.flat(), readModel.moral]
    const voice = pickVoice(language, voiceGender)
    const lang = language === 'hindi' ? 'hi-IN' : 'en-US'

    window.speechSynthesis.cancel()
    segs.forEach((seg, k) => {
      const u = new SpeechSynthesisUtterance(seg.text)
      u.lang = lang
      u.rate = 0.9    // a little slower for kids
      u.pitch = 1.05
      if (voice) u.voice = voice
      // Highlight this segment as it starts being spoken
      u.onstart = () => setActiveIdx(seg.idx)
      if (k === segs.length - 1) {
        u.onend = () => { setActiveIdx(-1); setSpeaking(false) }
      }
      u.onerror = () => { setActiveIdx(-1); setSpeaking(false) }
      window.speechSynthesis.speak(u)
    })
    setSpeaking(true)
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
      <div className="bg-decor" aria-hidden="true">
        <span className="float f1">⭐</span>
        <span className="float f2">🌙</span>
        <span className="float f3">📚</span>
        <span className="float f4">✨</span>
        <span className="float f5">🎈</span>
        <span className="float f6">🌈</span>
        <span className="float f7">⭐</span>
        <span className="float f8">🧸</span>
      </div>

      <header className="header">
        <div className="logo">📖</div>
        <h1>KidsAreBest<span className="logo-22">22</span></h1>
        <p className="tagline">Type a fun word and find a magical story ✨</p>
        <div className="badges">
          <span className="badge">📚 400+ stories</span>
          <span className="badge">🇮🇳 Hindi &amp; English</span>
          <span className="badge">💡 Moral in every tale</span>
        </div>
      </header>

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
                  className={`mic-btn ${listening ? 'listening' : ''}`}
                  onClick={startListening}
                  disabled={loading}
                  title="Say a word"
                  aria-label="Search by voice"
                >
                  {listening ? '🎙️' : '🎤'}
                </button>
              )}
              <button type="button" className="surprise-btn" onClick={handleSurprise} disabled={loading}>
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
                  className="chip"
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
                  className={`age-btn ${age === g.value ? 'selected' : ''}`}
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
                  className={`lang-btn ${language === l.value ? 'selected' : ''}`}
                  onClick={() => setLanguage(l.value)}
                  disabled={loading}
                >
                  <span className="lang-emoji">{l.emoji}</span>
                  <span>{l.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? '✨ Finding your story…' : '✨ Find a Story ✨'}
          </button>
        </form>

        {message && <div className="message-card">{message}</div>}

        {current && (
          <div className="story-card">
            <div className="font-toggle">
              <span className="font-label">Text size:</span>
              {FONT_SIZES.map((f) => (
                <button
                  key={f}
                  type="button"
                  className={`font-btn ${fontSize === f ? 'selected' : ''}`}
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
              <div className="listen-controls">
                <button
                  type="button"
                  className={`listen-btn ${speaking ? 'speaking' : ''}`}
                  onClick={toggleSpeak}
                >
                  {speaking ? '⏹️ Stop reading' : '🔊 Read aloud'}
                </button>
                <div className="voice-toggle">
                  <button
                    type="button"
                    className={`voice-opt ${voiceGender === 'woman' ? 'selected' : ''}`}
                    onClick={() => changeVoiceGender('woman')}
                  >
                    👩 Woman
                  </button>
                  <button
                    type="button"
                    className={`voice-opt ${voiceGender === 'man' ? 'selected' : ''}`}
                    onClick={() => changeVoiceGender('man')}
                  >
                    👨 Man
                  </button>
                </div>
              </div>
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
                  className={`reaction-btn ${reaction === emoji ? 'picked' : ''}`}
                  onClick={() => setReaction(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>

            <div className="share-buttons">
              <button type="button" className="share-btn copy-btn" onClick={handleCopy}>
                {copied ? '✅ Copied!' : '📋 Copy story'}
              </button>
              <button type="button" className="share-btn whatsapp-btn" onClick={handleWhatsApp}>
                💬 Share on WhatsApp
              </button>
            </div>

            {stories.length > 1 && (
              <button
                type="button"
                className="another-btn"
                onClick={() => { stopSpeaking(); setIndex((index + 1) % stories.length); setReaction(null) }}
              >
                🔄 Show another match ({index + 1}/{stories.length})
              </button>
            )}
          </div>
        )}
      </main>

      <footer className="footer">
        Made with ❤️ for @kidsarebest22
      </footer>
    </div>
  )
}

export default App
