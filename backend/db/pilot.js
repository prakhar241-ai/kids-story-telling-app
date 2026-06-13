// PILOT builder (local testing only):
//  1) creates the NEW stories_v2 table and inserts the 10 authored pilot stories
//  2) writes a MERGED shared/storiesData.js = v1 content with the pilot keywords
//     overlaid, so the app shows the new stories for those keywords while every
//     other keyword keeps working.
//  The live `stories` table and the live site are NOT touched.
//  To restore the pure v1 served data:  node backend/db/export.js
import { DatabaseSync } from 'node:sqlite'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { writeFileSync } from 'node:fs'
import { PILOT } from './pilotStories.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dbPath = join(__dirname, 'stories.db')
const outPath = join(__dirname, '../../shared/storiesData.js')

const db = new DatabaseSync(dbPath)

// 1) build stories_v2 (additive — does not touch the live `stories` table)
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
for (const s of PILOT) {
  ins.run(s.subject_key, s.subject, s.category, s.age_group, s.language, s.title, s.body, s.moral,
    s.intended_value, s.source_reference, JSON.stringify(s.main_characters), s.setting, s.structure_type, s.seed_source)
}

// 2) merged runtime data: v1 stories with pilot overlaid
const v1 = db.prepare(`SELECT subject_key, subject, category, age_group, language, title, body, moral FROM stories ORDER BY id`).all()
const items = db.prepare(`SELECT key, term, term_hi, category FROM search_items ORDER BY id`).all()
db.close()

const map = new Map()
const keyOf = (k, a, l) => `${k}|${a}|${l}`
for (const r of v1) {
  map.set(keyOf(r.subject_key, r.age_group, r.language), {
    subjectKey: r.subject_key, subject: r.subject, category: r.category,
    ageGroup: r.age_group, language: r.language, title: r.title, body: r.body, moral: r.moral,
  })
}
for (const s of PILOT) {
  map.set(keyOf(s.subject_key, s.age_group, s.language), {
    subjectKey: s.subject_key, subject: s.subject, category: s.category,
    ageGroup: s.age_group, language: s.language, title: s.title, body: s.body, moral: s.moral,
    sourceReference: s.source_reference,
  })
}
const STORIES = Array.from(map.values())
const SEARCH_ITEMS = items.map((r) => ({ key: r.key, term: r.term, term_hi: r.term_hi, category: r.category }))

const out =
  `// ⚠️ AUTO-GENERATED (PILOT MERGE) — v1 content + 10 pilot stories overlaid for testing.\n` +
  `// Restore pure v1 with: node backend/db/export.js\n\n` +
  `export const META = ${JSON.stringify({ mode: 'pilot-merge', stories: STORIES.length, searchItems: SEARCH_ITEMS.length, pilot: PILOT.length })}\n\n` +
  `export const STORIES = ${JSON.stringify(STORIES)}\n\n` +
  `export const SEARCH_ITEMS = ${JSON.stringify(SEARCH_ITEMS)}\n`
writeFileSync(outPath, out)

console.log(`stories_v2 created with ${PILOT.length} pilot stories.`)
console.log(`Merged runtime data written: ${STORIES.length} total stories (pilot overlaid).`)
console.log(`Pilot keywords -> monkey, lion, tortoise (ages 2-3 / 4-6 / 7-9), robot (4-6). Language: English.`)
