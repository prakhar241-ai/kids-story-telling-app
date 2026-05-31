// Keyword safety filter — keeps the story search kid-safe.
// Used by the backend; the frontend has a matching copy for instant feedback.

export const MAX_KEYWORD_LENGTH = 30

// Base blocked words + common variations.
const BLOCKED = [
  'violence', 'violent', 'weapon', 'gun', 'guns', 'knife', 'bomb', 'sword',
  'death', 'dead', 'die', 'died', 'dying', 'kill', 'killed', 'killing', 'murder',
  'blood', 'bloody', 'gore', 'hurt', 'wound', 'fight', 'fighting', 'war', 'attack',
  'scary', 'scared', 'fear', 'horror', 'ghost', 'zombie', 'monster', 'devil', 'demon', 'nightmare',
  'sex', 'sexy', 'naked', 'nude', 'porn', 'kiss', 'romance',
  'drug', 'drugs', 'alcohol', 'wine', 'beer', 'smoke', 'cigarette',
  'hate', 'stupid', 'idiot', 'dumb', 'ugly', 'loser',
]

export const FRIENDLY_BLOCK_MESSAGE =
  "Oops! Try a fun word like 'unicorn' or 'spaceship'! 🌈"

// Returns { ok: true } or { ok: false, message }.
export function checkKeyword(raw) {
  const keyword = (raw || '').trim()

  if (!keyword) {
    return { ok: false, message: 'Please type a fun word to search! 🌟' }
  }
  if (keyword.length > MAX_KEYWORD_LENGTH) {
    return { ok: false, message: `Please use a shorter word (under ${MAX_KEYWORD_LENGTH} letters). 🙂` }
  }

  const lower = keyword.toLowerCase()
  const hit = BLOCKED.some((bad) => lower.includes(bad))
  if (hit) {
    return { ok: false, message: FRIENDLY_BLOCK_MESSAGE }
  }
  return { ok: true }
}
