import { getAnswerOfDay } from './lang'
import { tries } from './storage'
import { checkPass, parseWord, testAnswer } from './utils'

export const WORD_LENGTH = 4
export const START_DATE = new Date('2022-01-20')

const daySince = Math.floor((Date.now() - +START_DATE) / 86400000)
export const dayNo = +(new URLSearchParams(window.location.search).get('d') || daySince)
export const answer = getAnswerOfDay(dayNo)
export const isPassed = computed(() => tries.value.length && checkPass(testAnswer(parseWord(tries.value[tries.value.length - 1]))))

export const hint = answer.hint
export const parsedAnswer = computed(() => parseWord(answer.word))

export const isDark = useDark()
export const showHint = ref(false)
export const showSettings = ref(false)
export const showHelp = ref(false)

// eslint-disable-next-line no-console
console.log(`D${dayNo}`, { are: { you: { sure: { to: { cheat: { '?': answer.word } } } } } })
