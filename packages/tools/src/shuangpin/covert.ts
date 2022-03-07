import type { ParsedPinyin } from 'packages/tools/dist'
import { finals as finalsMap, initals as initialsMap } from '../map/toShuangpin.json'
import { parsePinyin } from '../pinyin'
import { pinyinInitials } from '../pinyin/constants'

export function toShuangpin(pinyin: string | ParsedPinyin) {
  pinyin = parsePinyin(pinyin)
  const base = pinyin.base
  const initial = pinyinInitials.find(i => base.startsWith(i)) || ''
  const final = base.slice(initial.length)

  const a = initialsMap[initial as keyof typeof initialsMap] || initial
  const b = finalsMap[final as keyof typeof finalsMap] || final

  return a + b
}
