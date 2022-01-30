import { preferZhuyin } from './i18n'
import { dayNo } from './state'
import type { TriesMeta } from './types'

export const legacyTries = useStorage<Record<number, string[]>>('handle-tries', {})

export const initialized = useStorage('handle-initialized', false)
export const history = useStorage<Record<number, TriesMeta>>('handle-tries-meta', {})
export const useZhuyin = useStorage('handle-zhuyin', preferZhuyin)

export const meta = computed<TriesMeta>({
  get() {
    if (!(dayNo.value in history.value))
      history.value[dayNo.value] = {}
    return history.value[dayNo.value]
  },
  set(v) {
    history.value[dayNo.value] = v
  },
})

export const tries = computed<string[]>({
  get() {
    if (!meta.value.tries)
      meta.value.tries = []
    return legacyTries.value[dayNo.value] || meta.value.tries
  },
  set(v) {
    meta.value.tries = v
  },
})

export const gamesCount = computed(() => Object.values(history.value).filter(m => m.passed || m.answer || m.failed).length)
export const passedCount = computed(() => Object.values(history.value).filter(m => m.passed).length)
export const historyTriesCount = computed(() => Object.values(history.value).filter(m => m.passed || m.answer || m.failed).map(m => m.tries?.length || 0).reduce((a, b) => a + b, 0))

export const triesCount = computed(() => tries.value.length)
