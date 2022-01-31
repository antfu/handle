<script setup lang="ts">
import { answer, dayNo, hint, parseWord } from '~/state'
import { t } from '~/i18n'
</script>

<template>
  <div p8 flex="~ col gap-4" items-center>
    <p><b>D{{ dayNo }}</b></p>
    <div>{{ t('hint-note') }}</div>
    <CharBlock :char="parseWord(hint, answer.word)[0]" />
  </div>
</template>
