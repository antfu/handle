import type { ParsedPinyin } from '../types'
import _phonetics from '../map/phonetics.json'

const phonetics = _phonetics as Record<string, string>

export function parsePinyin(pinyin: string | ParsedPinyin): ParsedPinyin {
  if (typeof pinyin !== 'string')
    return pinyin

  let chars = Array.from(pinyin.trim().toLowerCase())

  let phoneticPos: number | undefined
  let tone: number | undefined

  chars = chars.map((i, idx) => {
    if ('01234'.includes(i)) {
      tone = +i
      return ''
    }
    if (phonetics[i]) {
      tone = +phonetics[i][1]
      phoneticPos = idx
      return phonetics[i][0]
    }
    return i
  }).filter(Boolean)

  return {
    raw: pinyin,
    base: chars.join(''),
    tone,
    phoneticPos,
  }
}
