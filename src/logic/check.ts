import EXTRA from '../data/extra.json'
import { WORD_LENGTH } from './constants'
import { getIdiom } from './idioms'
import { toSimplified } from './lang'

export function filterNonChineseChars(input: string) {
  return Array.from(input)
    .filter(i => /\p{Script=Han}/u.test(i))
    .slice(0, WORD_LENGTH)
    .join('')
}

export function checkValidIdiom(word: string, strict = false) {
  if (!strict)
    return true
  return EXTRA.includes(word) || EXTRA.includes(toSimplified(word)) || !!getIdiom(word)
}
