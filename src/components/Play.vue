<script setup lang="ts">
import { WORD_LENGTH, answer, dayNo, isDev, isFailed, isPassed, showFailed, showHelp, showHint } from '~/state'
import { meta, tries } from '~/storage'

const el = ref<HTMLInputElement>()
const input = ref('')
const inputValue = ref('')
function go() {
  if (input.value.length !== WORD_LENGTH)
    return
  tries.value.push(input.value)
  input.value = ''
  inputValue.value = ''
}
function reset() {
  tries.value = []
  meta.value = {}
  input.value = ''
  inputValue.value = ''
}
function handleInput(e: Event) {
  const el = (e.target! as HTMLInputElement)
  input.value = Array.from(el.value)
    .filter(i => /\p{Script=Han}/u.test(i))
    .slice(0, 4)
    .join('')
}
function focus() {
  el.value?.focus()
}
function hint() {
  meta.value.hint = true
  showHint.value = true
}

watchEffect(() => {
  if (!showHelp.value)
    focus()
})

watchEffect(() => {
  if (isFailed.value && !meta.value.failed) {
    setTimeout(() => {
      showFailed.value = true
    }, 2000)
  }
})
</script>

<template>
  <div>
    <button icon-btn text-base pb3 gap-1 inline-flex items-center justify-center @click="hint()">
      <div i-carbon-idea /> 提示
    </button>

    <div flex="~ col gap-2" items-center @click="focus()">
      <!-- <Sentence :word="answer" /> -->
      <Sentence v-for="t,i of tries" :key="i" :word="t" :revealed="true" />

      <template v-if="meta.answer">
        <div my4>
          <div font-serif p2>
            正确答案
          </div>
          <Sentence :word="answer.word" />
        </div>
      </template>

      <template v-if="!isPassed && !meta.answer">
        <Sentence :word="input" />
        <input
          ref="el"
          v-model="inputValue"
          type="text"
          autocomplete="false"
          outline-none
          placeholder="输入四字词语..."
          w-86
          p3
          border="~ base rounded"
          text="center"
          bg="transparent"
          @input="handleInput"
          @keydown.enter="go"
        >
      </template>
      <template v-else>
        <Countdown />
      </template>
    </div>

    <div flex="~ col gap-2" p4 justify-center items-center>
      <template v-if="!isPassed && !meta.answer">
        <button
          v-if="!isPassed"
          class="btn"
          :disabled="input.length !== WORD_LENGTH"
          @click="go"
        >
          确定
        </button>
        <div v-if="tries.length > 4 && !isFailed" op50>
          剩余 {{ 10 - tries.length }} 次尝试机会
        </div>
        <button v-if="isFailed" icon-btn text-base gap-1 my4 inline-flex items-center justify-center @click="showFailed = true">
          <div i-mdi-emoticon-devil-outline /> 查看答案
        </button>
      </template>

      <template v-if="isDev">
        <div h-200 />
        <div op50>
          测试用
        </div>
        <button
          class="btn"
          @click="reset"
        >
          重置
        </button>
        <a
          class="btn"
          :href="`/?d=${dayNo + 1}`"
        >
          下一天
        </a>
      </template>
    </div>
  </div>
</template>
