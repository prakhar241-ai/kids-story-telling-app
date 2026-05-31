import { useState } from 'react'
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

// The 4 agents, in the order the backend runs them
const AGENTS = [
  { key: 'writer', emoji: '✍️', label: 'Writing' },
  { key: 'simplifier', emoji: '🧸', label: 'Simplifying' },
  { key: 'moral', emoji: '💡', label: 'Moral' },
  { key: 'title', emoji: '🎨', label: 'Title' },
]

const IDLE_STEPS = { writer: 'idle', simplifier: 'idle', moral: 'idle', title: 'idle' }

function App() {
  const [name, setName] = useState('')
  const [topic, setTopic] = useState('')
  const [age, setAge] = useState('')
  const [language, setLanguage] = useState('')
  const [loading, setLoading] = useState(false)
  const [steps, setSteps] = useState(IDLE_STEPS)
  const [result, setResult] = useState(null) // { title, story, moral }
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  // Builds the shareable text from the finished story
  const buildShareText = () =>
    `${result.title}\n\n${result.story}\n\n💡 ${result.moral}\n\n— @kidsarebest22`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildShareText())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setError('Could not copy. Please select and copy the text manually.')
    }
  }

  const handleWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(buildShareText())}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    setError('')
    setSteps(IDLE_STEPS)

    try {
      const res = await fetch('/api/generate-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, topic, age, language }),
      })

      // The backend streams progress as Server-Sent Events.
      // We read the stream piece by piece and update the screen.
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const chunks = buffer.split('\n\n')
        buffer = chunks.pop() // keep any incomplete piece for next round

        for (const chunk of chunks) {
          const line = chunk.trim()
          if (!line.startsWith('data: ')) continue
          const event = JSON.parse(line.slice(6))

          if (event.step === 'error') {
            setError(event.error)
          } else if (event.step === 'complete') {
            setResult({ title: event.title, story: event.story, moral: event.moral })
          } else {
            // a normal agent progress update
            setSteps((prev) => ({ ...prev, [event.step]: event.status }))
          }
        }
      }
    } catch {
      setError('Could not connect to the server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const canSubmit = topic.trim() && age && language && !loading

  return (
    <div className="app">
      <header className="header">
        <div className="logo">📖</div>
        <h1>KidsAreBest22</h1>
        <p className="tagline">Magical stories for little hearts ✨</p>
      </header>

      <main className="main">
        <form className="story-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="name">
              Child's Name <span className="optional">(optional)</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="e.g. Arjun, Priya…"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={40}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="topic">
              Story Topic <span className="required">*</span>
            </label>
            <input
              id="topic"
              type="text"
              placeholder="e.g. Sharing toys, Being brave…"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
              maxLength={80}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>
              Age Group <span className="required">*</span>
            </label>
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
            <label>
              Story Language <span className="required">*</span>
            </label>
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

          <button type="submit" className="submit-btn" disabled={!canSubmit}>
            {loading ? '✨ Creating your story…' : '✨ Create Story ✨'}
          </button>

        </form>

        {loading && (
          <div className="agents-bar">
            {AGENTS.map((a) => (
              <div key={a.key} className={`agent-chip ${steps[a.key]}`}>
                <span className="agent-emoji">{a.emoji}</span>
                <span className="agent-label">{a.label}</span>
                <span className="agent-mark">
                  {steps[a.key] === 'done' ? '✓' : steps[a.key] === 'running' ? '…' : ''}
                </span>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="error-card">
            ⚠️ {error}
          </div>
        )}

        {result && (
          <div className="story-card">
            <h2 className="story-title">{result.title}</h2>
            <p className="story-text">{result.story}</p>
            <div className="moral-box">
              <span className="moral-label">💡 Moral</span>
              <p className="moral-text">{result.moral}</p>
            </div>

            <div className="share-buttons">
              <button type="button" className="share-btn copy-btn" onClick={handleCopy}>
                {copied ? '✅ Copied!' : '📋 Copy story'}
              </button>
              <button type="button" className="share-btn whatsapp-btn" onClick={handleWhatsApp}>
                💬 Share on WhatsApp
              </button>
            </div>
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
