// ──────────────────────────────────────────────────────────────
//  The story bank — single source of truth at RUNTIME.
//  Generates all stories in memory from storyData.js (same logic the
//  seed script uses to build stories.db). Used by BOTH the local
//  backend and the Vercel serverless functions, so behaviour is
//  identical everywhere and it deploys with no database engine needed.
// ──────────────────────────────────────────────────────────────
import { SUBJECTS, TEMPLATES } from './storyData.js'

const AGE_GROUPS = ['2-3', '4-6', '7-9']
const MAX_RESULTS = 12

// Build the full list once, when this module loads.
export const STORIES = []
export const SEARCH_ITEMS = []

const byAge = {}
for (const age of AGE_GROUPS) {
  byAge[age] = TEMPLATES.filter((t) => t.ages.includes(age))
}

SUBJECTS.forEach((sub, i) => {
  const key = sub.term.toLowerCase()
  SEARCH_ITEMS.push({ key, term: sub.term, term_hi: sub.termHi, category: sub.category })

  const ctx = { hero: sub.term, heroHi: sub.termHi, place: sub.place, placeHi: sub.placeHi }

  for (const age of AGE_GROUPS) {
    const pool = byAge[age]
    const tpl = pool[i % pool.length] // rotate templates so neighbours differ

    const en = tpl.en(ctx)
    STORIES.push({ subjectKey: key, subject: sub.term, category: sub.category, ageGroup: age, language: 'english', title: en.title, body: en.body, moral: en.moral })

    const hi = tpl.hi(ctx)
    STORIES.push({ subjectKey: key, subject: sub.termHi, category: sub.category, ageGroup: age, language: 'hindi', title: hi.title, body: hi.body, moral: hi.moral })
  }
})

// The searchable words (for the chips).
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
