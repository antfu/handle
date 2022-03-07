import { getPinyinRaw, toSimplified } from '@hankit/tools'
import PolyphonesRaw from '../data/polyphones.json'
import IdiomsRaw from '../data/idioms.txt?raw'

export const IdiomsList = IdiomsRaw.split('\n').map(i => i.trim()).filter(Boolean)
export const Polyphones = PolyphonesRaw as Record<string, string>

export function getIdiom(word: string): [string, string | undefined] | undefined {
  const simplified = toSimplified(word)
  if (Polyphones[word])
    return [word, Polyphones[word]]
  if (Polyphones[simplified])
    return [word, Polyphones[simplified]]
  if (IdiomsList.includes(word))
    return [word, undefined]
  if (IdiomsList.includes(simplified))
    return [simplified, undefined]
  return undefined
}

export function getPinyin(word: string) {
  const data = getIdiom(word)
  const parts = data?.[1]
    ? data[1].split(/\s+/g)
    : getPinyinRaw(data?.[0] || toSimplified(word), { style: getPinyinRaw.STYLE_TONE2 }).map(i => i[0])
  // https://baike.baidu.com/item/%E6%B1%89%E8%AF%AD%E6%8B%BC%E9%9F%B3%E6%96%B9%E6%A1%88/1884432
  return parts.map(i => i
    .replace(/^(y|j|q|x)u([0-9]?)$/g, '$1v$2'),
  )
}
