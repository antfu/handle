<script setup lang="ts">import { showFailed } from '~/state'
import { meta } from '~/storage'

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
      很抱歉，今天你已经用完十次的尝试机会了<br><br>但是没关系，你还可以继续尝试<br>或者你也可以随时放弃题目并查看答案
    </div>
    <div p4 flex="~ gap-5" justify-center>
      <button btn @click="showFailed = false">
        继续游戏
      </button>
      <button icon-btn text-base gap-1 inline-flex items-center justify-center text="orange-500!" @click="revealAnswer()">
        <div i-mdi-emoticon-devil-outline /> 查看答案
      </button>
    </div>
  </div>
</template>
