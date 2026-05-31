import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { streamStory } from '../shared/storyEngine.js'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.post('/api/generate-story', async (req, res) => {
  // Stream progress to the browser via Server-Sent Events
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  const send = (event) => res.write(`data: ${JSON.stringify(event)}\n\n`)

  await streamStory(req.body || {}, send)
  res.end()
})

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`)
})
