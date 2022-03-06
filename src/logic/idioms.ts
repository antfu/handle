import Pinyin from 'pinyin'
import PolyphonesRaw from '../data/polyphones.json'
import IdiomsRaw from '../data/idioms.txt?raw'
import { toSimplified } from './lang'

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
  if (data?.[1])
    return data[1].split(/\s+/g)
  return Pinyin(data?.[0] || toSimplified(word), { style: Pinyin.STYLE_TONE2 }).map(i => i[0])
}
