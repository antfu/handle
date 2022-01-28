<script setup lang="ts">
import { WORD_LENGTH, parsedAnswer } from '~/state'
import type { ParsedChar } from '~/types'
import { parseWord, testAnswer } from '~/utils'

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
