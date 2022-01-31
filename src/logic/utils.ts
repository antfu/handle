import seedrandom from 'seedrandom'
import Pinyin from 'pinyin'
import DATA from '../../data/data.json'
import { RANDOM_SEED } from './constants'
import type { MatchResult, ParsedChar } from './types'
import { pinyin2zhuyin, pinyinOne, pinyinTwo, toSimplified } from './lang'

export function parsePinyin(pinyin: string, toZhuyin = false) {
  let parts: string[] = []
  if (pinyin) {
    if (toZhuyin) {
      parts = Array.from(pinyin2zhuyin[pinyin] || '')
    }
    else {
      let rest = pinyin
      const one = pinyinOne.find(i => rest.startsWith(i))
      if (one)
        rest = rest.slice(one.length)
      const two = pinyinTwo.find(i => rest.startsWith(i))
      if (two)
        rest = rest.slice(two.length)
      parts = [one, two, rest].filter(Boolean) as string[]
    }
  }
  return parts
}

export function parseChar(char: string, pinyin?: string, toZhuyin = false): ParsedChar {
  if (!pinyin)
    pinyin = getPinyin(char)[0]
  const tone = pinyin.match(/[\d]$/)?.[0] || ''
  if (tone)
    pinyin = pinyin.slice(0, -tone.length).trim()

  const [one, two, three] = parsePinyin(pinyin, toZhuyin)
  return {
    char,
    one,
    two,
    three,
    tone: +tone || 0,
  }
}

export function parseWord(word: string, answer?: string, toZhuyin = false) {
  const pinyins = getPinyin(word)
  const chars = Array.from(word)
  const answerPinyin = answer ? getPinyin(answer) : undefined

  return chars.map((char, i): ParsedChar => {
    let pinyin = pinyins[i] || ''
    // try match the pinyin from the answer word
    if (answerPinyin && answer && answer.includes(char))
      pinyin = answerPinyin[answer.indexOf(char)] || pinyin
    return parseChar(char, pinyin, toZhuyin)
  })
}

export function testAnswer(input: ParsedChar[], answer: ParsedChar[]) {
  const keys = ['char', 'one', 'two', 'three', 'tone'] as const
  const unmatched = Object.fromEntries(
    keys.map(key => [
      key,
      answer
        .map((a, i) => toSimplified(input[i][key]) === toSimplified(a[key]) ? undefined : toSimplified(a[key]))
        .filter(i => i != null),
    ]),
  )

  return input.map((a, i): MatchResult => {
    return Object.fromEntries(
      keys.map((key) => {
        const value = toSimplified(a[key])
        if (answer[i][key] === value)
          return [key, 'exact']
        if (unmatched[key].includes(value)) {
          const index = unmatched[key].indexOf(value)
          unmatched[key].splice(index, 1)
          return [key, 'misplaced']
        }
        else {
          return [key, 'none']
        }
      }),
    ) as any as MatchResult
  })
}

export function checkPass(result: MatchResult[]) {
  return result.every(r => r.char === 'exact')
}

export function seedShuffle<T>(array: T[], seed = RANDOM_SEED): T[] {
  const rng = seedrandom(seed)
  let currentIndex = array.length
  let randomIndex

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(rng() * currentIndex)
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]]
  }

  return array
}

export function getHint(word: string) {
  return word[Math.floor(seedrandom(word)() * word.length)]
}

export function getPinyin(word: string) {
  word = toSimplified(word)
  const data = DATA.find(d => d.word === word)
  if (data)
    return data.pinyin.split(/\s+/g)
  return Pinyin(word, {
    style: Pinyin.STYLE_TONE2,
  }).map(i => i[0])
}
