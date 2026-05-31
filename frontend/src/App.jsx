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

  // Load the searchable words once (for the chips, with Hindi labels)
  useEffect(() => {
    fetch('/api/search-items')
      .then((r) => r.json())
      .then((d) => setItems(d.items || []))
      .catch(() => {})
  }, [])

  const current = stories[index] || null

  const labelFor = (englishTerm) => {
    if (language !== 'hindi') return englishTerm
    const found = items.find((it) => it.term === englishTerm)
    return found ? found.term_hi : englishTerm
  }

  const runSearch = async (kw) => {
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

            <h2 className="story-title">{current.title}</h2>
            <p className={`story-text ${fontSize.toLowerCase()}`}>{current.body}</p>

            <div className="moral-box">
              <span className="moral-label">🌟 The End!</span>
              <p className="moral-text">Remember: {current.moral}</p>
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
                onClick={() => { setIndex((index + 1) % stories.length); setReaction(null) }}
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
