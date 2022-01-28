import Pinyin from 'pinyin'

export const WORD_LENGTH = 4
export const INITIALS = [
  'b',
  'p',
  'm',
  'f',
  'd',
  't',
  'n',
  'l',
  'g',
  'k',
  'h',
  'j',
  'q',
  'x',
  'zh',
  'ch',
  'sh',
  'r',
  'z',
  'c',
  'x',
  's',
  'w',
  'y',
]

export const bopomofo = ref(false)
export const answer = ref('万水千山')

export interface ParsedChar {
  char: string
  pinyin: ParsedPinyin[]
}

export interface ParsedPinyin {
  initial: string
  medial: string
  tone: number
}

export function parseWord(sentence: string) {
  const pinyins = Pinyin(sentence, {
    style: Pinyin.STYLE_TONE2,
  }) || []
  const chars = Array.from(sentence)
  return chars.map((char, i): ParsedChar => {
    return {
      char,
      pinyin: (pinyins[i] || []).filter(i => i.trim()).map(parsePinyin),
    }
  })
}

export function parsePinyin(pinyin: string): ParsedPinyin {
  const initial = INITIALS.find(i => pinyin.startsWith(i)) || ''
  const tone = pinyin.match(/[\d]$/)?.[0] || ''
  const medial = pinyin.slice(initial.length, -tone.length)
  return {
    initial,
    medial,
    tone: +tone || 0,
  }
}

export const parsedAnswer = computed(() => parseWord(answer.value))
