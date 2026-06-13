// Builds the NEW stories_v2 table from the authored master list (storiesV2.js),
// then writes a MERGED shared/storiesData.js (v1 content with all v2 stories
// overlaid) so the app shows v2 for completed keywords while the rest stay v1.
// The live `stories` table and live site are NOT touched.
// Restore pure v1 served data with:  node backend/db/export.js
import { DatabaseSync } from 'node:sqlite'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { writeFileSync } from 'node:fs'
import { STORIES_V2 } from './storiesV2.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dbPath = join(__dirname, 'stories.db')
const outPath = join(__dirname, '../../shared/storiesData.js')

const db = new DatabaseSync(dbPath)

db.exec(`DROP TABLE IF EXISTS stories_v2;`)
db.exec(`
  CREATE TABLE stories_v2 (
    id INTEGER PRIMARY KEY, subject_key TEXT, subject TEXT, category TEXT,
    age_group TEXT, language TEXT, title TEXT, body TEXT, moral TEXT,
    intended_value TEXT, source_reference TEXT, main_characters TEXT,
    setting TEXT, structure_type TEXT, seed_source TEXT
  );
`)
const ins = db.prepare(`INSERT INTO stories_v2
  (subject_key, subject, category, age_group, language, title, body, moral,
   intended_value, source_reference, main_characters, setting, structure_type, seed_source)
  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`)
for (const s of STORIES_V2) {
  ins.run(s.subject_key, s.subject, s.category, s.age_group, s.language, s.title, s.body, s.moral,
    s.intended_value, s.source_reference, JSON.stringify(s.main_characters), s.setting, s.structure_type, s.seed_source)
}

// merged runtime data: v1 overlaid by all v2 so far
const v1 = db.prepare(`SELECT subject_key, subject, category, age_group, language, title, body, moral FROM stories ORDER BY id`).all()
const items = db.prepare(`SELECT key, term, term_hi, category FROM search_items ORDER BY id`).all()
db.close()

const keyOf = (k, a, l) => `${k}|${a}|${l}`
const map = new Map()
for (const r of v1) {
  map.set(keyOf(r.subject_key, r.age_group, r.language), {
    subjectKey: r.subject_key, subject: r.subject, category: r.category,
    ageGroup: r.age_group, language: r.language, title: r.title, body: r.body, moral: r.moral,
  })
}
for (const s of STORIES_V2) {
  map.set(keyOf(s.subject_key, s.age_group, s.language), {
    subjectKey: s.subject_key, subject: s.subject, category: s.category,
    ageGroup: s.age_group, language: s.language, title: s.title, body: s.body, moral: s.moral,
    sourceReference: s.source_reference,
  })
}
const STORIES = Array.from(map.values())
const SEARCH_ITEMS = items.map((r) => ({ key: r.key, term: r.term, term_hi: r.term_hi, category: r.category }))

// progress: which (keyword) are fully done in v2, per language
const doneByLang = { english: new Set(), hindi: new Set() }
for (const s of STORIES_V2) doneByLang[s.language]?.add(s.subject_key)

writeFileSync(outPath,
  `// ⚠️ AUTO-GENERATED (V2 MERGE) — v1 + ${STORIES_V2.length} v2 stories overlaid for testing.\n` +
  `// Restore pure v1 with: node backend/db/export.js\n\n` +
  `export const META = ${JSON.stringify({ mode: 'v2-merge', stories: STORIES.length, v2: STORIES_V2.length })}\n\n` +
  `export const STORIES = ${JSON.stringify(STORIES)}\n\n` +
  `export const SEARCH_ITEMS = ${JSON.stringify(SEARCH_ITEMS)}\n`)

console.log(`stories_v2: ${STORIES_V2.length} rows inserted.`)
console.log(`English keywords with v2: ${[...doneByLang.english].join(', ')}`)
console.log(`Hindi keywords with v2:   ${[...doneByLang.hindi].join(', ')}`)
console.log(`Total v2 rows: ${STORIES_V2.length} / 474 target (${Math.round(STORIES_V2.length / 474 * 100)}%)`)
