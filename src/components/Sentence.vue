<script setup lang="ts">
import { WORD_LENGTH, parseWord, parsedAnswer } from '~/utils'

defineProps<{
  word: string
  revealed?: boolean
}>()
</script>

<template>
  <div flex gap-1>
    <CharBlock
      v-for="c,i in parseWord(word.padEnd(WORD_LENGTH, ' '))"
      :key="i"
      :char="c"
      :answer="revealed ? parsedAnswer[i] : undefined"
    />
  </div>
</template>
