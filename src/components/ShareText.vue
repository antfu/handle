<script setup lang="ts">
import { t } from '~/i18n'
import { answer, dayNoHanzi, isMobile, parseWord, testAnswer } from '~/state'
import { meta, tries } from '~/storage'

const lines = computed(() => {
  const table = tries.value.map((word) => {
    const parsed = parseWord(word, answer.value.word)
    return testAnswer(parsed)
      .map((i, idx) => {
        if (i.char === 'exact')
          return '🟩'
        if (i.char === 'misplaced')
          return '🟧'
        if (parsed[idx]._1 && i._1 === 'exact')
          return '🟠'
        if (parsed[idx]._2 && i._2 === 'exact')
          return '🟠'
        if (parsed[idx]._3 && i._3 === 'exact')
          return '🟠'
        if (i._1 === 'misplaced' || i._2 === 'misplaced' || i._3 === 'misplaced')
          return '🟡'
        return '⬜️'
      })
      .join('')
  })

  return [
    [
      t('name'),
      dayNoHanzi.value,
      meta.value.strict ? t('strict-mode').slice(0, 2) : '',
      !meta.value.hint ? t('hint-level-none') : '',
    ].filter(Boolean).join(' · '),
    '',
    ...table,
    '',
    'handle.antfu.me',
  ]
})

const text = computed(() => lines.value.join('\n'))

const share = useShare(computed(() => ({
  title: t('name'),
  text: text.value,
})))
const clipboard = useClipboard()
const copied = ref(false)

async function shareSystem() {
  if (share.isSupported && isMobile) {
    await share.share()
    return true
  }
  return false
}

onMounted(async() => {
  if (clipboard.isSupported) {
    await clipboard.copy(text.value)
    copied.value = true
  }
})
</script>

<template>
  <p text-center mb4>
    {{ copied ? t('share-copied'): t('share-not-copied') }}
  </p>
  <textarea
    bg-gray-500:5 rounded p5 select-text resize-none outline-none
    w-90 text-center
    style="line-height: 19px;letter-spacing: 1px;"
    :rows="lines.length"
    :value="text" readonly
  />
  <button v-if="share.isSupported" my4 square-btn @click="shareSystem()">
    <div i-carbon-share />
    {{ t('share-with-system-api') }}
  </button>
</template>
