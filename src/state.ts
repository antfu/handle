import Pinyin from 'pinyin'
import { py2zy } from './bopomofo'
import { today } from './data'
import { bopomofo } from './storage'
import { toSimplified } from './t2s'

export const WORD_LENGTH = 4
export const ONES = ['b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'zh', 'ch', 'sh', 'r', 'z', 'c', 'x', 's', 'w', 'y']

export type MatchType = 'exact' | 'misplaced' | 'none'

export interface ParsedChar {
  char: string
  one: string
  two: string
  three: string
  tone: number
}

export interface MatchResult {
  char: MatchType
  one: MatchType
  two: MatchType
  three: MatchType
  tone: MatchType
}

export const answer = ref(today.word)
export const hint = today.hint
export const parsedAnswer = computed(() => parseWord(answer.value))

export const isDark = useDark()
export const showHint = ref(false)
export const showSettings = ref(false)
export const showHelp = ref(false)

export function parseWord(sentence: string) {
  const pinyins = Pinyin(sentence, {
    style: Pinyin.STYLE_TONE2,
  })
  const chars = Array.from(sentence)

  return chars.map((char, i): ParsedChar => {
    let pinyin = pinyins[i]?.[0] || ''
    const tone = pinyin.match(/[\d]$/)?.[0] || ''
    pinyin = pinyin.slice(0, -tone.length).trim()

    let parts: string[] = []
    if (pinyin) {
      if (bopomofo.value) {
        const zhuyin = py2zy[pinyin]
        parts = Array.from(zhuyin)
      }
      else {
        const t = ONES.find(i => pinyin.startsWith(i))
        if (t) {
          parts.push(t)
          parts.push(pinyin.slice(t.length))
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

export function isPassed(result: MatchResult[]) {
  return result.every(r => r.char === 'exact')
}
