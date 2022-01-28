import { showHelp } from './state'
import { day } from '~/data'

export const initialized = useStorage('handle-initialized', false)
export const allTries = useStorage<Record<number, string[]>>('handle-tries', {})
export const bopomofo = useStorage('handle-bopomofo', false)

export const tries = computed<string[]>({
  get() {
    if (!(day in allTries.value))
      allTries.value[day] = []
    return allTries.value[day]
  },
  set(v) {
    allTries.value[day] = v
  },
})

if (!initialized.value)
  showHelp.value = true
