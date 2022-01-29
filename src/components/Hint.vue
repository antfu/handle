<script setup lang="ts">
import { answer, dayNo, hint } from '~/state'
import { parseWord } from '~/utils'
</script>

<template>
  <div p8 flex="~ col gap-4" items-center>
    <p><b>D{{ dayNo }}</b></p>
    <div>答案包含以下汉字</div>
    <CharBlock :char="parseWord(hint, answer.word)[0]" />
  </div>
</template>
