import type { ParsedPinyin } from './types'
import { parsePinyin } from './pinyin'
import zhuyinMap from './map/zhuyin.json'
import toneSymbols from './map/toneSymbols.json'
import { reverseMap } from './utils'

export function pinyinToZhuyin(pinyin: string | ParsedPinyin, renderTone = true) {
  pinyin = parsePinyin(pinyin)

  const base = (zhuyinMap as any)[pinyin.base]

  if (!base)
    throw new Error(`Invalid pinyin ${pinyin.base}`)

  const tone = renderTone && pinyin.tone ? toneSymbols[pinyin.tone] : ''
  return base + tone
}

let toPinyinMap: Record<string, string> | undefined

export function zhuyinToPinyin(zhuyin: string): ParsedPinyin {
  let tone: number | undefined

  const last = zhuyin.slice(-1)[0]
  if (last && toneSymbols.includes(last)) {
    tone = toneSymbols.indexOf(last)
    zhuyin = zhuyin.slice(0, -1)
  }

  if (!toPinyinMap)
    toPinyinMap = reverseMap(zhuyinMap)

  const base = (toPinyinMap as any)[zhuyin]

  if (!base)
    throw new Error(`Invalid zhuyin ${zhuyin}`)

  return {
    base,
    tone,
  }
}
