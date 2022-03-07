// @ts-expect-error missing types
import _getPinyin from 'pinyin/lib/web-pinyin.js'
import _toneMap from './map/pinyinTone.json'
import type { ParsedPinyin } from './types'

const toneMap = _toneMap as Record<string, string>

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
    if (toneMap[i]) {
      tone = +toneMap[i][1]
      return toneMap[i][0]
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
  return pinyin.base + (pinyin.tone || '')
}

export function getPinyin(text: string) {
  return _getPinyin(text, { style: _getPinyin.STYLE_TONE2 }).map((i: any) => parsePinyin(i[0]))
}
