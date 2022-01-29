<script setup lang="ts">
import { showFailed } from '~/state'
import { meta } from '~/storage'
import { t } from '~/i18n'

function revealAnswer() {
  showFailed.value = false
  meta.value.answer = true
  meta.value.failed = true
}
</script>

<template>
  <div p5 flex="~ col center">
    <div i-carbon-face-dizzy text-5xl op50 m4 />
    <div>
      {{ t('failed-1') }}<br><br>
      {{ t('failed-2') }}<br>
      {{ t('failed-3') }}
    </div>
    <div p4 flex="~ gap-5 center">
      <button btn @click="showFailed = false">
        {{ t('continue') }}
      </button>
      <button icon-btn flex="inline gap-1 center" text="base mis!" @click="revealAnswer()">
        <div i-mdi-emoticon-devil-outline /> {{ t('view-answer') }}
      </button>
    </div>
  </div>
</template>
