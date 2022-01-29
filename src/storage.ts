import { dayNo } from './state'

export interface TriesMeta {
  hint?: boolean
  answer?: boolean
  start?: number
  end?: number
  failed?: boolean
  passed?: boolean
}

export const initialized = useStorage('handle-initialized', false)
export const allTries = useStorage<Record<number, string[]>>('handle-tries', {})
export const allMeta = useStorage<Record<number, TriesMeta>>('handle-tries-meta', {})
export const useZhuyin = useStorage('handle-zhuyin', false)

export const tries = computed<string[]>({
  get() {
    if (!(dayNo.value in allTries.value))
      allTries.value[dayNo.value] = []
    return allTries.value[dayNo.value]
  },
  set(v) {
    allTries.value[dayNo.value] = v
  },
})

export const meta = computed<TriesMeta>({
  get() {
    if (!(dayNo.value in allMeta.value))
      allMeta.value[dayNo.value] = {}
    return allMeta.value[dayNo.value]
  },
  set(v) {
    allMeta.value[dayNo.value] = v
  },
})

export const triesCount = computed(() => tries.value.length)