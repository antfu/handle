import seedrandom from 'seedrandom'
import type { SpMode } from '@hankit/tools'
import { pinyinInitials, toShuangpin, toSimplified, toZhuyin } from '@hankit/tools'
import type { InputMode, MatchResult, ParsedChar } from './types'
import { getPinyin } from './idioms'
import { useCheckAssist } from '~/storage'

export function parsePinyin(pinyin: string, mode: InputMode = 'py', spMode: SpMode = 'sougou') {
  let parts: string[] = []
  if (pinyin) {
    if (mode === 'zy') {
      parts = Array.from(pinyin.trim() ? toZhuyin(pinyin) : '')
    }
    else if (mode === 'sp') {
      parts = Array.from(toShuangpin(pinyin, spMode))
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

export function parseChar(char: string, pinyin?: string, mode?: InputMode, spMode?: SpMode): ParsedChar {
  if (!pinyin)
    pinyin = getPinyin(char)[0]
  const tone = pinyin.match(/[\d]$/)?.[0] || ''
  if (tone)
    pinyin = pinyin.slice(0, -tone.length).trim()

  const parts = parsePinyin(pinyin, mode, spMode)
  // if there is no final, actually it's no intital
  if (parts[0] && !parts[1]) {
    parts[1] = parts[0]
    parts[0] = ''
  }

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

export function parseWord(word: string, answer?: string, mode?: InputMode, spMode?: SpMode) {
  const pinyins = getPinyin(word)
  const chars = Array.from(word)
  const answerPinyin = answer ? getPinyin(answer) : undefined

  return chars.map((char, i): ParsedChar => {
    let pinyin = pinyins[i] || ''
    // try match the pinyin from the answer word
    if (answerPinyin && answer && answer.includes(char))
      pinyin = answerPinyin[answer.indexOf(char)] || pinyin
    return parseChar(char, pinyin, mode, spMode)
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
      char: answer[i].char === char || answer[i].char === a.char
        ? 'exact'
        : includesAndRemove(unmatched.char, char)
          ? 'misplaced'
          : useCheckAssist.value
            ? 'deleted'
            : 'none',
      tone: answer[i].tone === a.tone
        ? 'exact'
        : includesAndRemove(unmatched.tone, a.tone)
          ? 'misplaced'
          : useCheckAssist.value
            ? 'deleted'
            : 'none',
      _1: !a._1 || answer[i].parts.includes(a._1)
        ? 'exact'
        : includesAndRemove(unmatched.parts, a._1)
          ? 'misplaced'
          : useCheckAssist.value
            ? 'deleted'
            : 'none',
      _2: !a._2 || answer[i].parts.includes(a._2)
        ? 'exact'
        : includesAndRemove(unmatched.parts, a._2)
          ? 'misplaced'
          : useCheckAssist.value
            ? 'deleted'
            : 'none',
      _3: !a._3 || answer[i].parts.includes(a._3)
        ? 'exact'
        : includesAndRemove(unmatched.parts, a._3)
          ? 'misplaced'
          : useCheckAssist.value
            ? 'deleted'
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

const numberChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
const tens = ['', '十', '百', '千']

export function numberToHanzi(number: number) {
  const digits = Array.from(number.toString()).map(i => +i)
  const chars = digits.map((i, idx) => {
    const unit = i !== 0 ? tens[digits.length - 1 - idx] : ''
    return numberChar[i] + unit
  })
  const str = chars.join('')
  return str
    .replace('一十', '十')
    .replace('一百', '百')
    .replace('二十', '廿')
    .replace(/零+/, '零')
    .replace(/(.)零$/, '$1')
}
