// Vercel serverless function — the production backend.
// Vercel automatically turns every file in /api into an endpoint, so this is
// reachable at  POST /api/generate-story  on the deployed site.
// The OPENROUTER_API_KEY comes from Vercel's Environment Variables (NOT code).
import { streamStory } from '../shared/storyEngine.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  // Stream progress to the browser via Server-Sent Events
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  const send = (event) => res.write(`data: ${JSON.stringify(event)}\n\n`)

  await streamStory(req.body || {}, send)
  res.end()
}
