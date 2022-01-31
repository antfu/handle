import seedrandom from 'seedrandom'
import Pinyin from 'pinyin'
import DATA from '../../data/data.json'
import { toSimplified } from './t2s'
import { answers } from '~/answers'
import { RANDOM_SEED } from '~/constants'

const DATA_SET = DATA.length

export function getHint(word: string) {
  return word[Math.floor(seedrandom(word)() * word.length)]
}

export function getAnswerOfDay(day: number) {
  let [word = '', hint = ''] = answers[day] || []
  if (!word) {
    const rng = seedrandom(RANDOM_SEED)
    for (let i = 0; i <= day; i++)
      rng()
    word = DATA[Math.floor(rng() * DATA_SET - 1)].word
  }
  if (!hint)
    hint = getHint(word)
  return {
    word,
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
