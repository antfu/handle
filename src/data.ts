import seedrandom from 'seedrandom'
import DATA from '../data/data.json'
import { checkPass, parseWord, testAnswer } from './state'
import { tries } from './storage'

const START_DATE = new Date('2022-01-20')
const SEED = 'handle'
const DATA_SET = DATA.length

export function getDay(day: number) {
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

const daySince = Math.floor((Date.now() - +START_DATE) / 86400000)
export const day = +(new URLSearchParams(window.location.search).get('d') || daySince)
export const today = getDay(day)

export const isPassed = computed(() => tries.value.length && checkPass(testAnswer(parseWord(tries.value[tries.value.length - 1]))))

console.log(`D${day}`, today.word)
