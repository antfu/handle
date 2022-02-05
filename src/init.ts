import { initialized, markEnd, markStart, meta, onPause } from './storage'
import { answer, dayNo, isFinished, isPassed, showHelp } from './state'
import { t } from './i18n'

useTitle(computed(() => `${t('name')} - ${t('description')}`))

// show answer in console
watchEffect(() => {
  // eslint-disable-next-line no-console
  console.log(`D${dayNo.value}`, { are: { you: { sure: { to: { cheat: { '?': answer.value.word } } } } } })
}, { flush: 'post' })

if (!initialized.value)
  showHelp.value = true

watchEffect(() => {
  if (isPassed.value)
    meta.value.passed = true
})

watch([isFinished, meta], () => {
  if (isFinished.value)
    markEnd()
}, { flush: 'post' })

const visible = useDocumentVisibility()

watchEffect(() => {
  if (visible.value === 'visible') {
    if (meta.value.duration)
      markStart()
  }
  else if (visible.value === 'hidden') {
    onPause()
  }
}, { flush: 'post' })
