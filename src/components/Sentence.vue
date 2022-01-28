<script setup lang="ts">
import type { ParsedChar } from '~/state'
import { WORD_LENGTH, parseWord, parsedAnswer, testAnswer } from '~/state'

const props = defineProps<{
  word: string
  revealed?: boolean
  answer?: ParsedChar[]
}>()

const answer = computed(() => {
  if (props.revealed)
    return testAnswer(parseWord(props.word), props.answer || parsedAnswer.value)
  return []
})
</script>

<template>
  <div flex gap-2>
    <CharBlock
      v-for="c,i in parseWord(word.padEnd(WORD_LENGTH, ' '))"
      :key="i"
      :char="c"
      :answer="answer[i]"
    />
  </div>
</template>
