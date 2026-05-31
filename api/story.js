// Vercel serverless function — story search.
// Reachable at  POST /api/story  on the deployed site.
// Generates stories in memory from the shared story bank (no database
// engine needed), so it runs on any Node runtime.
import { searchStories } from '../shared/storyBank.js'
import { checkKeyword } from '../shared/safety.js'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { keyword, age, language } = req.body || {}

  if (!age || !language) {
    res.status(400).json({ error: 'Please choose an age group and language.' })
    return
  }

  const safe = checkKeyword(keyword)
  if (!safe.ok) {
    res.json({ blocked: true, message: safe.message, stories: [] })
    return
  }

  res.json({ stories: searchStories({ keyword, age, language }) })
}
