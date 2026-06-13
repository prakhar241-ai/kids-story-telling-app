// Builds stories.db from the v1 template library (shared/storyData.js).
// This is the ORIGINAL story generator (deterministic templates). The app does
// NOT read this DB at runtime — after seeding, run `node backend/db/export.js`
// to refresh the served data (shared/storiesData.js).
//
//   npm run seed --prefix backend
import { DatabaseSync } from 'node:sqlite'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { SUBJECTS, TEMPLATES, OPENERS, OPENERS_HI } from '../../shared/storyData.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
export const DB_PATH = join(__dirname, 'stories.db')

const AGE_GROUPS = ['2-3', '4-6', '7-9']

// Grammatically feminine Hindi subjects — so verbs agree (e.g. खेली, not खेला)
const FEMININE_HI = new Set([
  'लोमड़ी', 'गाय', 'बकरी', 'बिल्ली', 'गिलहरी', 'गौरैया', 'बत्तख', 'कोयल',
  'चमेली', 'लिली', 'डेज़ी', 'चंपा', 'स्ट्रॉबेरी',
  'रेलगाड़ी', 'कार', 'नाव', 'बस', 'साइकिल', 'जलपरी', 'परी',
])

// Expand the templates into concrete stories (v1 content).
function generate() {
  const STORIES = []
  const SEARCH_ITEMS = []
  const byAge = {}
  for (const age of AGE_GROUPS) byAge[age] = TEMPLATES.filter((t) => t.ages.includes(age))

  SUBJECTS.forEach((sub, i) => {
    const key = sub.term.toLowerCase()
    SEARCH_ITEMS.push({ key, term: sub.term, term_hi: sub.termHi, category: sub.category })

    AGE_GROUPS.forEach((age, ageIdx) => {
      const pool = byAge[age]
      const tpl = pool[i % pool.length]
      const oIdx = (i + ageIdx) % OPENERS.length
      const isFem = FEMININE_HI.has(sub.termHi)
      const ctx = {
        hero: sub.term, heroHi: sub.termHi,
        place: sub.place, placeHi: sub.placeHi,
        trait: sub.trait, traitHi: sub.traitHi,
        opener: OPENERS[oIdx], openerHi: OPENERS_HI[oIdx],
        g: (m, f) => (isFem ? f : m),
      }
      const en = tpl.en(ctx)
      STORIES.push({ subjectKey: key, subject: sub.term, category: sub.category, ageGroup: age, language: 'english', title: en.title, body: en.body, moral: en.moral })
      const hi = tpl.hi(ctx)
      STORIES.push({ subjectKey: key, subject: sub.termHi, category: sub.category, ageGroup: age, language: 'hindi', title: hi.title, body: hi.body, moral: hi.moral })
    })
  })
  return { STORIES, SEARCH_ITEMS }
}

function build() {
  const { STORIES, SEARCH_ITEMS } = generate()
  const db = new DatabaseSync(DB_PATH)

  db.exec(`DROP TABLE IF EXISTS stories;`)
  db.exec(`DROP TABLE IF EXISTS search_items;`)
  db.exec(`
    CREATE TABLE search_items (
      id INTEGER PRIMARY KEY, key TEXT UNIQUE, term TEXT, term_hi TEXT, category TEXT
    );
  `)
  db.exec(`
    CREATE TABLE stories (
      id INTEGER PRIMARY KEY, subject_key TEXT, subject TEXT, category TEXT,
      age_group TEXT, language TEXT, title TEXT, body TEXT, moral TEXT
    );
  `)
  db.exec(`CREATE INDEX idx_lookup ON stories (subject_key, age_group, language);`)

  const insertItem = db.prepare(`INSERT INTO search_items (key, term, term_hi, category) VALUES (?, ?, ?, ?)`)
  for (const it of SEARCH_ITEMS) insertItem.run(it.key, it.term, it.term_hi, it.category)

  const insertStory = db.prepare(
    `INSERT INTO stories (subject_key, subject, category, age_group, language, title, body, moral)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  )
  for (const s of STORIES) insertStory.run(s.subjectKey, s.subject, s.category, s.ageGroup, s.language, s.title, s.body, s.moral)

  const total = db.prepare(`SELECT COUNT(*) AS n FROM stories`).get().n
  const items = db.prepare(`SELECT COUNT(*) AS n FROM search_items`).get().n
  db.close()
  console.log(`✅ stories.db rebuilt — ${total} stories, ${items} search items. Now run: node backend/db/export.js`)
}

build()
