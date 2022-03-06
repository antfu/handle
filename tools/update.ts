/* eslint-disable no-console */
import fs from 'fs'
import _polyphones from '../src/data/polyphones.json'
import { normalizePinyin } from './utils'
import { getWordInfoFromZDict } from './zdict'

const polyphones = _polyphones as Record<string, string>
const idioms = new Set(fs.readFileSync('src/data/idioms.txt', 'utf8').split('\n').map(i => i.trim()).filter(Boolean))
const newOnes = new Set(fs.readFileSync('src/data/new.txt', 'utf8').split('\n').map(i => i.trim()).filter(Boolean))

async function getPinyinWeb(word: string) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pinyin = require('pinyin/lib/web-pinyin.js') as typeof import('pinyin')
  return pinyin(word, { style: pinyin.STYLE_TONE2 }).map((i: any) => i[0]).join(' ')
}

async function run() {
  const polyphonesKeys = Object.keys(polyphones)

  console.log(newOnes.size, 'new items')
  console.log(polyphonesKeys.length, 'polyphones')
  console.log(idioms.size, 'idioms')

  for (const key of Object.keys(polyphones)) {
    if (!polyphones[key])
      polyphones[key] = await getPinyinZDict(key)
    const pinyingComputed = await getPinyinWeb(key)
    if (!polyphones[key] || pinyingComputed === polyphones[key]) {
      console.log(`\n[${key}] removed from polyphones`)
      delete polyphones[key]
      idioms.add(key)
    }
    else {
      idioms.delete(key)
    }
  }

  const items = Array.from(newOnes)
  const len = items.length
  for (let idx = 0; idx < len; idx++) {
    const word = items[idx]
    idioms.delete(word)
    delete polyphones[word]
    const pinyinZDict = await getPinyinZDict(word)

    if (!pinyinZDict)
      continue

    newOnes.delete(word)
    const pinyingComputed = await getPinyinWeb(word)
    if (!pinyinZDict || pinyingComputed === pinyinZDict) {
      delete polyphones[word]
      idioms.add(word)
      continue
    }
    console.log(`[${word}] Polyphones! ${pinyingComputed} -> ${pinyinZDict}`)
    polyphones[word] = pinyinZDict

    if (idx && idx % 10 === 0)
      save()
  }

  save()

  if (newOnes.size)
    console.log(newOnes.size, 'missed items, please check manully')
}

function save() {
  console.log('\n---SAVING---')
  fs.writeFileSync('src/data/polyphones.json', JSON.stringify(Object.fromEntries(Object.entries(polyphones).sort((a, b) => a[0].localeCompare(b[0]))), null, 2), 'utf8')
  fs.writeFileSync('src/data/idioms.txt', Array.from(new Set(idioms)).sort().join('\n'), 'utf8')
  fs.writeFileSync('src/data/new.txt', Array.from(newOnes).join('\n'), 'utf8')
}

run()

async function getPinyinZDict(i: string) {
  console.log(`\n[${i}] fetching`)
  const data = await getWordInfoFromZDict(i)
  const pinyinZDict = normalizePinyin(data?.pinyin || '')
  if (pinyinZDict)
    console.log(`[${i}] got ${pinyinZDict}`)
  else
    console.log(`[${i}] missed`)

  return pinyinZDict
}
