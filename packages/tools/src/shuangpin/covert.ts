import type { ParsedPinyin } from 'packages/tools/dist'
import { parsePinyin } from '../pinyin'
import { pinyinInitials } from '../pinyin/constants'
import type { SpMode } from './constants'
import { getShuangpinMaps } from './constants'

export function toShuangpin(pinyin: string | ParsedPinyin, spMode: SpMode) {
  pinyin = parsePinyin(pinyin)
  const base = pinyin.base
  const initial = pinyinInitials.find(i => base.startsWith(i)) || ''
  const final = base.slice(initial.length)

  const maps = getShuangpinMaps(spMode)

  const a = maps.initials[initial] || initial
  const b = maps.finals[final] || final

  return a + b
}
