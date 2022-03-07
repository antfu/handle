// @ts-expect-error missing types
import _getPinyinWeb from 'pinyin/lib/web-pinyin.js'
import _phonetics from './map/phonetics.json'
import toPhonetics from './map/toPhonetics.json'
import type { ParsedPinyin } from './types'

const _getPinyin = _getPinyinWeb as typeof import('pinyin')
const phonetics = _phonetics as Record<string, string>

export function parsePinyin(pinyin: string | ParsedPinyin): ParsedPinyin {
  if (typeof pinyin !== 'string')
    return pinyin

  let chars = Array.from(pinyin.trim().toLowerCase())

  let tone: number | undefined

  chars = chars.map((i) => {
    if ('01234'.includes(i)) {
      tone = +i
      return ''
    }
    if (phonetics[i]) {
      tone = +phonetics[i][1]
      return phonetics[i][0]
    }
    return i
  }).filter(Boolean)

  return {
    base: chars.join(''),
    tone,
  }
}

export function pinyinToNumberStyle(pinyin: string | ParsedPinyin) {
  pinyin = parsePinyin(pinyin)
  return pinyin.base + (pinyin.tone || '')
}

export function pinyinToToneStyle(pinyin: string | ParsedPinyin) {
  pinyin = parsePinyin(pinyin)
  const toneIndex = pinyinGetTonePosition(pinyin.base)
  const toneBaseChar = pinyin.base[toneIndex]
  const withPhonetic = (pinyin.tone ? (toPhonetics as any)[toneBaseChar][pinyin.tone - 1] : null) || toneBaseChar
  return Array.from(pinyin.base).map((i, index) => index === toneIndex ? withPhonetic : i).join('')
}

export function pinyinGetTonePosition(pinyin: string) {
  return [
    pinyin.lastIndexOf('iu') > -1 ? pinyin.lastIndexOf('iu') + 1 : -1,
    pinyin.lastIndexOf('a'),
    pinyin.lastIndexOf('e'),
    pinyin.lastIndexOf('o'),
    pinyin.lastIndexOf('i'),
    pinyin.lastIndexOf('u'),
    pinyin.lastIndexOf('v'),
    pinyin.lastIndexOf('ü'),
  ].find(i => i !== null && i >= 0) || 0
}

export function getPinyin(text: string) {
  return _getPinyin(text, { style: _getPinyin.STYLE_TONE2 }).map(i => parsePinyin(i[0]))
}
