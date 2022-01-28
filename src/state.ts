import { getAnswerOfDay } from './lang'
import { initialized, tries } from './storage'
import { checkPass, parseWord, testAnswer } from './utils'

export const now = useNow({ interval: 1000 })
export const WORD_LENGTH = 4
export const START_DATE = new Date('2022-01-20')

export const isDark = useDark()
export const showHint = ref(false)
export const showSettings = ref(false)
export const showHelp = ref(false)
export const showShare = ref(false)

const daySince = computed(() => Math.floor((+now.value - +START_DATE) / 86400000))
export const dayNo = computed(() => +(new URLSearchParams(window.location.search).get('d') || daySince.value))
export const answer = computed(() => getAnswerOfDay(dayNo.value))
export const isPassed = computed(() => tries.value.length && checkPass(testAnswer(parseWord(tries.value[tries.value.length - 1]))))

export const hint = computed(() => answer.value.hint)
export const parsedAnswer = computed(() => parseWord(answer.value.word))

watchEffect(() => {
  // eslint-disable-next-line no-console
  console.log(`D${dayNo.value}`, { are: { you: { sure: { to: { cheat: { '?': answer.value.word } } } } } })
}, { flush: 'post' })

if (!initialized.value)
  showHelp.value = true
