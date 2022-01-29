import seedrandom from 'seedrandom'
import Pinyin from 'pinyin'
import DATA from '../../data/data.json'
import { toSimplified } from './t2s'

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

export function getPinyin(word: string) {
  word = toSimplified(word)
  const data = DATA.find(d => d.word === word)
  if (data)
    return data.pinyin.split(/\s+/g)
  return Pinyin(word, {
    style: Pinyin.STYLE_TONE2,
  }).map(i => i[0])
}
