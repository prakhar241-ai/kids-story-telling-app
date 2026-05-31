// Vercel serverless function — list of searchable words (for the chips).
// Reachable at  GET /api/search-items  on the deployed site.
import { listSearchItems } from '../shared/storyBank.js'

export default function handler(_req, res) {
  res.json({ items: listSearchItems() })
}
