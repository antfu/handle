import Pinyin from 'pinyin'
import IDIOMS from '../data/idioms.json'
import { toSimplified } from './lang'

export function getIdiom(word: string) {
  const simplified = toSimplified(word)
  return IDIOMS.find(d => d[0] === simplified || d[0] === word)
}

export function getPinyin(word: string) {
  const simplified = toSimplified(word)
  const data = IDIOMS.find(d => d[0] === simplified || d[0] === word)
  if (data && data[1])
    return data[1].split(/\s+/g)
  return Pinyin(simplified, { style: Pinyin.STYLE_TONE2 }).map(i => i[0])
}

export { IDIOMS }
