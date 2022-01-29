import { getPinyin, pinyin2zhuyin, pinyingInitials, toSimplified } from './lang'
import type { MatchResult, ParsedChar } from './types'
import { useZhuyin } from './storage'
import { parsedAnswer } from './state'

export function parseWord(word: string, answer?: string) {
  const pinyins = getPinyin(word)
  const chars = Array.from(word)
  const answerPinyin = answer ? getPinyin(answer) : undefined

  return chars.map((char, i): ParsedChar => {
    let pinyin = pinyins[i] || ''
    // try match the pinyin from the answer word
    if (answerPinyin && answer && answer.includes(char))
      pinyin = answerPinyin[answer.indexOf(char)] || pinyin
    const tone = pinyin.match(/[\d]$/)?.[0] || ''
    if (tone)
      pinyin = pinyin.slice(0, -tone.length).trim()

    let parts: string[] = []
    if (pinyin) {
      if (useZhuyin.value) {
        parts = Array.from(pinyin2zhuyin[pinyin] || '')
      }
      else {
        const t = pinyingInitials.find(i => pinyin.startsWith(i))
        if (t) {
          parts.push(t)
          parts.push(pinyin.slice(t.length))
        }
        else {
          parts = [pinyin]
        }
      }
    }

    const [one = '', two = '', three = ''] = parts
    return {
      char,
      one,
      two,
      three,
      tone: +tone || 0,
    }
  })
}

export function testAnswer(input: ParsedChar[], answer = parsedAnswer.value) {
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
