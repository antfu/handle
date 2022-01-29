import { initialized, meta } from './storage'
import { answer, dayNo, isFinished, showHelp } from './state'
import { t } from './i18n'

useTitle(computed(() => `${t('name')} - ${t('description')}`))

// show answer in console
watchEffect(() => {
  // eslint-disable-next-line no-console
  console.log(`D${dayNo.value}`, { are: { you: { sure: { to: { cheat: { '?': answer.value.word } } } } } })
}, { flush: 'post' })

if (!initialized.value)
  showHelp.value = true

watch([initialized, meta], () => {
  if (initialized.value && !meta.value.start)
    meta.value.start = Date.now()
})

watch([isFinished, meta], () => {
  if (isFinished.value && !meta.value.end)
    meta.value.end = Date.now()
})
