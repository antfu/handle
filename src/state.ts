import type { ParsedChar } from './logic'
import { START_DATE, TRIES_LIMIT, parseWord as _parseWord, testAnswer as _testAnswer, checkPass, getHint } from './logic'
import { meta, tries, useZhuyin } from './storage'
import { getAnswerOfDay } from './answers'

export const now = useNow({ interval: 1000 })
export const isDark = useDark()
export const showHint = ref(false)
export const showSettings = ref(false)
export const showHelp = ref(false)
export const showShare = ref(false)
export const showFailed = ref(false)
export const showDashboard = ref(false)
export const showVariants = ref(false)
export const useMask = ref(false)
export const showCheatSheet = ref(false)

const params = new URLSearchParams(window.location.search)
export const isDev = params.get('dev') === 'hey'
export const daySince = useDebounce(computed(() => Math.floor((+now.value - +START_DATE) / 86400000)))
export const dayNo = computed(() => +(params.get('d') || daySince.value))
export const answer = computed(() =>
  params.get('word')
    ? {
      word: params.get('word')!,
      hint: getHint(params.get('word')!),
    }
    : getAnswerOfDay(dayNo.value),
)

export const hint = computed(() => answer.value.hint)
export const parsedAnswer = computed(() => parseWord(answer.value.word))

export const isPassed = computed(() => meta.value.passed || (tries.value.length && checkPass(testAnswer(parseWord(tries.value[tries.value.length - 1])))))
export const isFailed = computed(() => !isPassed.value && tries.value.length >= TRIES_LIMIT)
export const isFinished = computed(() => isPassed.value || meta.value.answer)

export function parseWord(word: string, _ans = answer.value.word, toZhuyin = useZhuyin.value) {
  return _parseWord(word, _ans, toZhuyin)
}

export function testAnswer(word: ParsedChar[], ans = parsedAnswer.value) {
  return _testAnswer(word, ans)
}

export const parsedTries = computed(() => tries.value.map((i) => {
  const word = parseWord(i)
  const result = testAnswer(word)
  return {
    word,
    result,
  }
}))
