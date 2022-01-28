import seedrandom from 'seedrandom'
import DATA from '../../data/data.json'

const SEED = 'handle'
const DATA_SET = DATA.length

export function getAnswerOfDay(day: number) {
  const rng = seedrandom(SEED)
  for (let i = 0; i <= day; i++)
    rng()
  const data = DATA[Math.floor(rng() * DATA_SET - 1)]
  const hint = data.word[Math.floor(seedrandom(data.word)() * 4)]
  return {
    ...data,
    hint,
  }
}
