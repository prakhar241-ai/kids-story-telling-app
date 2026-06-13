// ──────────────────────────────────────────────────────────────
//  Runtime READ layer.
//  Serves stories from the bundled export (shared/storiesData.js), which is
//  generated from the ACTIVE database table by backend/db/export.js.
//  Keep this a pure query layer — no story generation lives here.
// ──────────────────────────────────────────────────────────────
import { STORIES, SEARCH_ITEMS } from './storiesData.js'

const MAX_RESULTS = 12

// The searchable words (for the chips). Keywords are unchanged across versions.
export function listSearchItems() {
  return SEARCH_ITEMS.map(({ term, term_hi, category }) => ({ term, term_hi, category }))
}

// Find stories by keyword + age + language.
// Tries: exact subject → partial subject → words inside the story text.
export function searchStories({ keyword, age, language }) {
  const raw = (keyword || '').trim()
  const q = raw.toLowerCase()

  const storiesForKeys = (keySet) =>
    STORIES.filter((s) => keySet.has(s.subjectKey) && s.ageGroup === age && s.language === language)
      .slice(0, MAX_RESULTS)

  // 1) exact subject match (english key/label or hindi label)
  let keys = new Set(
    SEARCH_ITEMS.filter((it) => it.key === q || it.term.toLowerCase() === q || it.term_hi === raw).map((it) => it.key)
  )
  let rows = storiesForKeys(keys)
  if (rows.length) return rows

  // 2) partial subject match
  keys = new Set(
    SEARCH_ITEMS.filter((it) => it.key.includes(q) || it.term.toLowerCase().includes(q) || (raw && it.term_hi.includes(raw))).map((it) => it.key)
  )
  rows = storiesForKeys(keys)
  if (rows.length) return rows

  // 3) words inside the story title/body
  return STORIES.filter(
    (s) => s.language === language && s.ageGroup === age && (s.title.toLowerCase().includes(q) || s.body.toLowerCase().includes(q))
  ).slice(0, MAX_RESULTS)
}
