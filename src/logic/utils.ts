import seedrandom from 'seedrandom'
import Pinyin from 'pinyin'
import IDIOMS from '../data/idioms.json'
import type { MatchResult, ParsedChar } from './types'
import { pinyin2zhuyin, pinyinInitials, toSimplified } from './lang'

export function parsePinyin(pinyin: string, toZhuyin = false) {
  let parts: string[] = []
  if (pinyin) {
    if (toZhuyin) {
      parts = Array.from(pinyin2zhuyin[pinyin] || '')
    }
    else {
      let rest = pinyin
      const one = pinyinInitials.find(i => rest.startsWith(i))
      if (one)
        rest = rest.slice(one.length)
      parts = [one, rest].filter(Boolean) as string[]
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

  const parts = parsePinyin(pinyin, toZhuyin)
  const [one, two, three] = parts
  return {
    char,
    _1: one,
    _2: two,
    _3: three,
    parts,
    yin: pinyin,
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
  const unmatched = {
    char: answer
      .map((a, i) => toSimplified(input[i].char) === toSimplified(a.char) ? undefined : toSimplified(a.char))
      .filter(i => i != null),
    tone: answer
      .map((a, i) => input[i].tone === a.tone ? undefined : a.tone)
      .filter(i => i != null),
    parts: answer
      .flatMap((a, i) => a.parts.filter(p => !input[i].parts.includes(p)))
      .filter(i => i != null) as string[],
  }

  function includesAndRemove<T>(arr: T[], v: T) {
    if (arr.includes(v)) {
      arr.splice(arr.indexOf(v), 1)
      return true
    }
    return false
  }

  return input.map((a, i): MatchResult => {
    const char = toSimplified(a.char)
    return {
      char: answer[i].char === char
        ? 'exact'
        : includesAndRemove(unmatched.char, char)
          ? 'misplaced'
          : 'none',
      tone: answer[i].tone === a.tone
        ? 'exact'
        : includesAndRemove(unmatched.tone, a.tone)
          ? 'misplaced'
          : 'none',
      _1: !a._1 || answer[i].parts.includes(a._1)
        ? 'exact'
        : includesAndRemove(unmatched.parts, a._1)
          ? 'misplaced'
          : 'none',
      _2: !a._2 || answer[i].parts.includes(a._2)
        ? 'exact'
        : includesAndRemove(unmatched.parts, a._2)
          ? 'misplaced'
          : 'none',
      _3: !a._3 || answer[i].parts.includes(a._3)
        ? 'exact'
        : includesAndRemove(unmatched.parts, a._3)
          ? 'misplaced'
          : 'none',
    }
  })
}

export function checkPass(result: MatchResult[]) {
  return result.every(r => r.char === 'exact')
}

export function getHint(word: string) {
  return word[Math.floor(seedrandom(word)() * word.length)]
}

export function getPinyin(word: string) {
  word = toSimplified(word)
  const data = IDIOMS.find(d => d[0] === word)
  if (data && data[1])
    return data[1].split(/\s+/g)
  return Pinyin(word, { style: Pinyin.STYLE_TONE2 }).map(i => i[0])
}
