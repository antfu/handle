import Pinyin from 'pinyin'
import ALL from '../data/data.json'

export const WORD_LENGTH = 4
export const INITIALS = ['b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'zh', 'ch', 'sh', 'r', 'z', 'c', 'x', 's', 'w', 'y']

export type MatchType = 'exact' | 'misplaced' | 'none'

export interface ParsedChar {
  char: string
  initial: string
  medial: string
  tone: number
}

export interface MatchResult {
  char: MatchType
  initial: MatchType
  medial: MatchType
  tone: MatchType
}

export const bopomofo = ref(false)
export const answer = ref(ALL[623].word)
export const parsedAnswer = computed(() => parseWord(answer.value))

export function parseWord(sentence: string) {
  const pinyins = Pinyin(sentence, {
    style: Pinyin.STYLE_TONE2,
  })
  const chars = Array.from(sentence)

  return chars.map((char, i): ParsedChar => {
    const pinyin = pinyins[i]?.[0] || ''
    const initial = INITIALS.find(i => pinyin.startsWith(i)) || ''
    const tone = pinyin.match(/[\d]$/)?.[0] || ''
    const medial = pinyin.slice(initial.length, -tone.length)
    return {
      char,
      initial,
      medial,
      tone: +tone || 0,
    }
  })
}

export function testAnswer(input: ParsedChar[]) {
  const keys = ['char', 'initial', 'medial', 'tone'] as const
  const answer = parsedAnswer.value
  const unmatched = Object.fromEntries(
    keys.map(key => [
      key,
      answer
        .map((a, i) => input[i][key] === a[key] ? undefined : a[key])
        .filter(i => i != null),
    ]),
  )

  return input.map((a, i): MatchResult => {
    return Object.fromEntries(
      keys.map((key) => {
        if (answer[i][key] === a[key]) {
          return [key, 'exact']
        }
        else if (unmatched[key].includes(a[key])) {
          const index = unmatched[key].indexOf(a[key])
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
