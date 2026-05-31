// Builds stories.db — the queryable copy of the story bank.
// The app does NOT need this file at runtime (it generates stories in
// memory from shared/storyBank.js). This DB is for browsing/querying the
// stories directly with SQL tools.
//
// Run with:  npm run seed --prefix backend   (or: node backend/db/seed.js)
import { DatabaseSync } from 'node:sqlite'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { STORIES, SEARCH_ITEMS } from '../../shared/storyBank.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
export const DB_PATH = join(__dirname, 'stories.db')

function build() {
  const db = new DatabaseSync(DB_PATH)

  db.exec(`DROP TABLE IF EXISTS stories;`)
  db.exec(`DROP TABLE IF EXISTS search_items;`)

  db.exec(`
    CREATE TABLE search_items (
      id        INTEGER PRIMARY KEY,
      key       TEXT UNIQUE,
      term      TEXT,
      term_hi   TEXT,
      category  TEXT
    );
  `)
  db.exec(`
    CREATE TABLE stories (
      id          INTEGER PRIMARY KEY,
      subject_key TEXT,
      subject     TEXT,
      category    TEXT,
      age_group   TEXT,
      language    TEXT,
      title       TEXT,
      body        TEXT,
      moral       TEXT
    );
  `)
  db.exec(`CREATE INDEX idx_lookup ON stories (subject_key, age_group, language);`)

  const insertItem = db.prepare(
    `INSERT INTO search_items (key, term, term_hi, category) VALUES (?, ?, ?, ?)`
  )
  for (const it of SEARCH_ITEMS) {
    insertItem.run(it.key, it.term, it.term_hi, it.category)
  }

  const insertStory = db.prepare(
    `INSERT INTO stories (subject_key, subject, category, age_group, language, title, body, moral)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  )
  for (const s of STORIES) {
    insertStory.run(s.subjectKey, s.subject, s.category, s.ageGroup, s.language, s.title, s.body, s.moral)
  }

  const items = db.prepare(`SELECT COUNT(*) AS n FROM search_items`).get().n
  const total = db.prepare(`SELECT COUNT(*) AS n FROM stories`).get().n
  const perLang = db.prepare(`SELECT language, COUNT(*) AS n FROM stories GROUP BY language`).all()
  db.close()

  console.log(`✅ Database built at ${DB_PATH}`)
  console.log(`   Search items: ${items}`)
  console.log(`   Stories total: ${total}`)
  perLang.forEach((r) => console.log(`     - ${r.language}: ${r.n}`))
}

build()
