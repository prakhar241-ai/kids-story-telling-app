// Builds stories.db from storyData.js.
// Run with:  node backend/db/seed.js   (from the project root)
// Safe to re-run — it rebuilds the tables from scratch each time.
import { DatabaseSync } from 'node:sqlite'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { SUBJECTS, TEMPLATES } from './storyData.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
export const DB_PATH = join(__dirname, 'stories.db')

const AGE_GROUPS = ['2-3', '4-6', '7-9']
const LANGUAGES = ['english', 'hindi']

function build() {
  const db = new DatabaseSync(DB_PATH)

  // Fresh start every run
  db.exec(`DROP TABLE IF EXISTS stories;`)
  db.exec(`DROP TABLE IF EXISTS search_items;`)

  db.exec(`
    CREATE TABLE search_items (
      id        INTEGER PRIMARY KEY,
      key       TEXT UNIQUE,   -- canonical lowercase english (e.g. 'lion')
      term      TEXT,          -- English label (e.g. 'Lion')
      term_hi   TEXT,          -- Hindi label (e.g. 'शेर')
      category  TEXT
    );
  `)

  db.exec(`
    CREATE TABLE stories (
      id          INTEGER PRIMARY KEY,
      subject_key TEXT,    -- links to search_items.key
      subject     TEXT,    -- subject name shown for this language
      category    TEXT,
      age_group   TEXT,    -- '2-3' | '4-6' | '7-9'
      language    TEXT,    -- 'english' | 'hindi'
      title       TEXT,
      body        TEXT,
      moral       TEXT
    );
  `)
  db.exec(`CREATE INDEX idx_lookup ON stories (subject_key, age_group, language);`)

  const insertItem = db.prepare(
    `INSERT INTO search_items (key, term, term_hi, category) VALUES (?, ?, ?, ?)`
  )
  const insertStory = db.prepare(
    `INSERT INTO stories (subject_key, subject, category, age_group, language, title, body, moral)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  )

  // Templates grouped by age for easy rotation
  const byAge = {}
  for (const age of AGE_GROUPS) {
    byAge[age] = TEMPLATES.filter((t) => t.ages.includes(age))
  }

  let storyCount = 0
  SUBJECTS.forEach((sub, i) => {
    const key = sub.term.toLowerCase()
    insertItem.run(key, sub.term, sub.termHi, sub.category)

    const ctx = {
      hero: sub.term,
      heroHi: sub.termHi,
      place: sub.place,
      placeHi: sub.placeHi,
    }

    for (const age of AGE_GROUPS) {
      const pool = byAge[age]
      // rotate templates across subjects so neighbours differ
      const tpl = pool[i % pool.length]

      const en = tpl.en(ctx)
      insertStory.run(key, sub.term, sub.category, age, 'english', en.title, en.body, en.moral)
      storyCount++

      const hi = tpl.hi(ctx)
      insertStory.run(key, sub.termHi, sub.category, age, 'hindi', hi.title, hi.body, hi.moral)
      storyCount++
    }
  })

  const items = db.prepare(`SELECT COUNT(*) AS n FROM search_items`).get().n
  const total = db.prepare(`SELECT COUNT(*) AS n FROM stories`).get().n
  const perLang = db.prepare(`SELECT language, COUNT(*) AS n FROM stories GROUP BY language`).all()
  db.close()

  console.log(`✅ Database built at ${DB_PATH}`)
  console.log(`   Search items: ${items}`)
  console.log(`   Stories total: ${total}  (generated ${storyCount})`)
  perLang.forEach((r) => console.log(`     - ${r.language}: ${r.n}`))
}

build()
