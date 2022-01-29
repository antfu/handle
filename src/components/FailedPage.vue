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
  <div p5 flex="~ col" items-center>
    <div i-carbon-face-dizzy text-5xl op50 m4 />
    <div>
      {{ t('failed-1') }}<br><br>
      {{ t('failed-2') }}<br>
      {{ t('failed-3') }}
    </div>
    <div p4 flex="~ gap-5" justify-center>
      <button btn @click="showFailed = false">
        {{ t('continue') }}
      </button>
      <button icon-btn text-base gap-1 inline-flex items-center justify-center text="orange-500!" @click="revealAnswer()">
        <div i-mdi-emoticon-devil-outline /> {{ t('view-answer') }}
      </button>
    </div>
  </div>
</template>
