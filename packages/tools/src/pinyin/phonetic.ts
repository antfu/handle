import type { ParsedPinyin } from '../types'
import { parsePinyin } from './parse'

export function getPhoneticPosition(pinyin: string | ParsedPinyin) {
  pinyin = parsePinyin(pinyin)

  if (pinyin.phoneticPos == null) {
    const base = pinyin.base
    pinyin.phoneticPos = [
      base.lastIndexOf('iu') > -1 ? base.lastIndexOf('iu') + 1 : -1,
      base.lastIndexOf('a'),
      base.lastIndexOf('e'),
      base.lastIndexOf('o'),
      base.lastIndexOf('i'),
      base.lastIndexOf('u'),
      base.lastIndexOf('v'),
      base.lastIndexOf('ü'),
    ].find(i => i !== null && i >= 0)

    if (pinyin.phoneticPos == null)
      throw new Error(`Unable to find phonetic position for ${pinyin.base}`)
  }

  return pinyin.phoneticPos
}
