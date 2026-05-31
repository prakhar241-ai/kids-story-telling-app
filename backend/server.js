import express from 'express'
import cors from 'cors'
import { searchStories, listSearchItems } from '../shared/storyBank.js'
import { checkKeyword } from '../shared/safety.js'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

// Search the story bank by keyword + age + language
app.post('/api/story', (req, res) => {
  const { keyword, age, language } = req.body || {}

  if (!age || !language) {
    return res.status(400).json({ error: 'Please choose an age group and language.' })
  }

  const safe = checkKeyword(keyword)
  if (!safe.ok) {
    return res.json({ blocked: true, message: safe.message, stories: [] })
  }

  res.json({ stories: searchStories({ keyword, age, language }) })
})

// List of searchable words (for the tappable chips)
app.get('/api/search-items', (_req, res) => {
  res.json({ items: listSearchItems() })
})

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`)
})
