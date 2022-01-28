<script setup lang="ts">
import { hint, parseWord } from '~/state'
import { day } from '~/data'
</script>

<template>
  <div p8 flex="~ col gap-4" items-center>
    <p><b>D{{ day }}</b></p>
    <div>答案包含以下汉字</div>
    <CharBlock :char="parseWord(hint)[0]" />
  </div>
</template>
