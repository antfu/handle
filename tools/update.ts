/* eslint-disable no-console */
import fs from 'fs'
import c from 'picocolors'
import _polyphones from '../src/data/polyphones.json'
import { normalizePinyin } from './utils'
import { getWordInfoFromZDict } from './zdict'

const polyphones = _polyphones as Record<string, string>
const idioms = new Set(fs.readFileSync('src/data/idioms.txt', 'utf8').split('\n').map(i => i.trim()).filter(Boolean))
const newOnes = new Set(fs.readFileSync('src/data/new.txt', 'utf8').split('\n').map(i => i.trim()).filter(Boolean))
const unknown = new Set<string>()

async function getPinyinWeb(word: string) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pinyin = require('pinyin/lib/web-pinyin.js') as typeof import('pinyin')
  return pinyin(word, { style: pinyin.STYLE_TONE2 }).map((i: any) => i[0]).join(' ')
}

function validPinyin(word: string, pinyin: string) {
  if (!pinyin.match(/^[a-z0-9 ]+$/))
    return console.log(c.red(`[${word}] invalid char`), c.yellow(pinyin))
  if (!pinyin.match(/[0-9]/))
    return console.log(c.red(`[${word}] invalid tone`), c.magenta(pinyin))
  if (pinyin.split(/\s+/g).length !== 4)
    return console.log(c.red(`[${word}] invalid length`), c.blue(pinyin))
}

async function run() {
  const polyphonesKeys = Object.keys(polyphones)

  console.log(newOnes.size, 'new items')
  console.log(polyphonesKeys.length, 'polyphones')
  console.log(idioms.size, 'idioms')

  for (const word of Object.keys(polyphones)) {
    if (!polyphones[word])
      polyphones[word] = await getPinyinZDict(word)
    const pinyingComputed = await getPinyinWeb(word)
    if (!polyphones[word] || pinyingComputed === polyphones[word]) {
      console.log(`\n[${word}] removed from polyphones`)
      delete polyphones[word]
      idioms.add(word)
    }
    else {
      validPinyin(word, polyphones[word])
      idioms.delete(word)
    }
  }

  const items = Array.from(newOnes)
  const len = items.length
  for (let idx = 0; idx < len; idx++) {
    const word = items[idx]
    idioms.delete(word)
    delete polyphones[word]
    const pinyinZDict = await getPinyinZDict(word)

    newOnes.delete(word)

    if (pinyinZDict) {
      const pinyingComputed = await getPinyinWeb(word)
      if (!pinyinZDict || pinyingComputed === pinyinZDict) {
        delete polyphones[word]
        idioms.add(word)
      }
      else {
        console.log(`[${word}] Polyphones! ${pinyingComputed} -> ${pinyinZDict}`)
        polyphones[word] = pinyinZDict
      }
    }
    else {
      unknown.add(word)
    }

    if (idx && idx % 10 === 0) {
      save()
      console.log(`${idx + 1} / ${len} ${((idx + 1) / len * 100).toFixed(1)}%`)
    }
  }

  save()

  if (unknown.size)
    console.log(unknown.size, 'missed items, please check manually')
}

function save() {
  console.log('\n---SAVING---')
  fs.writeFileSync('src/data/polyphones.json', JSON.stringify(Object.fromEntries(Object.entries(polyphones).sort((a, b) => a[0].localeCompare(b[0]))), null, 2), 'utf8')
  fs.writeFileSync('src/data/idioms.txt', Array.from(new Set(idioms)).sort().join('\n'), 'utf8')
  fs.writeFileSync('src/data/new.txt', Array.from(newOnes).join('\n'), 'utf8')
  fs.writeFileSync('src/data/unknown.txt', Array.from(unknown).join('\n'), 'utf8')
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
