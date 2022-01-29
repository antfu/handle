<script setup lang="ts">
import { answer, dayNo } from '~/state'
import { tries } from '~/storage'
import { parseWord, testAnswer } from '~/utils'

const text = computed(() =>
  `汉兜 ${dayNo.value} ${tries.value.length}/10\n${
    tries.value
      .map(word => testAnswer(parseWord(word, answer.value.word))
        .map((i) => {
          if (i.char === 'exact')
            return '🟩'
          if (i.char === 'misplaced')
            return '🟧'
          if ([i.one, i.two, i.three].includes('exact'))
            return '🟡'
          return '⬜️'
        })
        .join(''))
      .join('\n')}`,
)
function share() {
  useShare({
    title: '汉兜',
    text: text.value,
  }).share()
}
</script>

<template>
  <button btn flex items-center justify-center gap-3 text-xl font-serif p="x4 y2" @click="share()">
    <div i-carbon-share />
    分享
  </button>
</template>
