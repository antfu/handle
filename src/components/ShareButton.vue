<script setup lang="ts">
import { answer, dayNo, parseWord, testAnswer } from '~/state'
import { meta, tries } from '~/storage'
import { t } from '~/i18n'

const text = computed(() =>
  `${t('name')} ${dayNo.value} ${meta.value.answer ? 'X' : tries.value.length}/10\n\n${
    tries.value
      .map((word) => {
        const parsed = parseWord(word, answer.value.word)
        return testAnswer(parsed)
          .map((i, idx) => {
            if (i.char === 'exact')
              return '🟩'
            if (i.char === 'misplaced')
              return '🟧'
            if (parsed[idx]._1 && i._1 === 'exact')
              return '🟡'
            if (parsed[idx]._2 && i._2 === 'exact')
              return '🟡'
            if (parsed[idx]._3 && i._3 === 'exact')
              return '🟡'
            return '⬜️'
          })
          .join('')
      })
      .join('\n')}\n\nhandle.antfu.me`,
)
const share = useShare(computed(() => ({
  title: t('name'),
  text: text.value,
})))
const clipboard = useClipboard()

const shareDialog = ref(false)

function start() {
  if (share.isSupported) {
    share.share()
  }
  else {
    shareDialog.value = true
    clipboard.copy(text.value)
  }
}
</script>

<template>
  <button btn flex items-center justify-center gap-3 text-xl font-serif p="x4 y2" @click="start()">
    <div i-carbon-share />
    {{ t('share') }}
  </button>
  <Modal v-model="shareDialog" direction="top">
    <div flex="~ col" p5 items-center>
      <p text-xl font-serif mb4>
        <b>{{ t('share') }}</b>
      </p>
      <p text-center mb4>
        {{ t('share-copied') }}
      </p>
      <pre text-left bg-gray-500:5 rounded p5 select-text mb4 style="line-height: 18px;letter-spacing: 1px;">{{ text }}</pre>
    </div>
  </Modal>
</template>
