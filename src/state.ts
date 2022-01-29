import { getAnswerOfDay, getHint } from './lang'
import { initialized, tries } from './storage'
import { checkPass, parseWord, testAnswer } from './utils'

export const now = useNow({ interval: 1000 })
export const WORD_LENGTH = 4
export const START_DATE = new Date(2022, 0, 0)

export const isDark = useDark()
export const showHint = ref(false)
export const showSettings = ref(false)
export const showHelp = ref(false)
export const showShare = ref(false)
export const showFailed = ref(false)

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
export const isPassed = computed(() => tries.value.length && checkPass(testAnswer(parseWord(tries.value[tries.value.length - 1], answer.value.word))))
export const isFailed = computed(() => !isPassed.value && tries.value.length >= 10)

export const hint = computed(() => answer.value.hint)
export const parsedAnswer = computed(() => parseWord(answer.value.word))

watchEffect(() => {
  // eslint-disable-next-line no-console
  console.log(`D${dayNo.value}`, { are: { you: { sure: { to: { cheat: { '?': answer.value.word } } } } } })
}, { flush: 'post' })

if (!initialized.value)
  showHelp.value = true
