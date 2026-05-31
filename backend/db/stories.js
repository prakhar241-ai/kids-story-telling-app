// Read-only query helpers for the story database.
import { DatabaseSync } from 'node:sqlite'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DB_PATH = join(__dirname, 'stories.db')

// Open once and reuse. Read-only so it also works on read-only hosts.
let db
function getDb() {
  if (!db) db = new DatabaseSync(DB_PATH, { readOnly: true })
  return db
}

const MAX_RESULTS = 12

// Returns an array of story rows matching the keyword, age and language.
// Tries: exact subject → partial subject → words inside the story text.
export function searchStories({ keyword, age, language }) {
  const d = getDb()
  const raw = (keyword || '').trim()
  const q = raw.toLowerCase()

  const storiesForKeys = (keys) => {
    if (!keys.length) return []
    const holes = keys.map(() => '?').join(',')
    return d.prepare(
      `SELECT title, body, moral, subject, age_group, language
         FROM stories
        WHERE subject_key IN (${holes}) AND age_group = ? AND language = ?
        LIMIT ${MAX_RESULTS}`
    ).all(...keys, age, language)
  }

  // 1) exact subject match (english key, english label, or hindi label)
  let keys = d.prepare(
    `SELECT key FROM search_items WHERE key = ? OR lower(term) = ? OR term_hi = ?`
  ).all(q, q, raw).map((r) => r.key)
  let rows = storiesForKeys(keys)
  if (rows.length) return rows

  // 2) partial subject match
  keys = d.prepare(
    `SELECT key FROM search_items WHERE key LIKE ? OR lower(term) LIKE ? OR term_hi LIKE ?`
  ).all(`%${q}%`, `%${q}%`, `%${raw}%`).map((r) => r.key)
  rows = storiesForKeys(keys)
  if (rows.length) return rows

  // 3) search inside the story title/body
  return d.prepare(
    `SELECT title, body, moral, subject, age_group, language
       FROM stories
      WHERE language = ? AND age_group = ? AND (lower(title) LIKE ? OR lower(body) LIKE ?)
      LIMIT ${MAX_RESULTS}`
  ).all(language, age, `%${q}%`, `%${q}%`)
}

// Returns the list of searchable words (for the tappable chips).
export function listSearchItems() {
  return getDb().prepare(
    `SELECT term, term_hi, category FROM search_items ORDER BY category, term`
  ).all()
}
