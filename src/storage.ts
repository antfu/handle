import { dayNo, showHelp } from './state'

export const initialized = useStorage('handle-initialized', false)
export const allTries = useStorage<Record<number, string[]>>('handle-tries', {})
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

if (!initialized.value)
  showHelp.value = true
