<script setup lang="ts">
import { WORD_LENGTH, dayNo, isPassed, showHelp, showHint } from '~/state'
import { tries } from '~/storage'

const toggleHint = useToggle(showHint)

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
watchEffect(() => {
  if (!showHelp.value)
    focus()
})
</script>

<template>
  <div>
    <button icon-btn text-base pb3 gap-1 inline-flex items-center justify-center @click="toggleHint()">
      <div i-carbon-idea /> 提示
    </button>

    <div flex="~ col gap-2" items-center @click="focus()">
      <!-- <Sentence :word="answer" /> -->
      <Sentence v-for="t,i of tries" :key="i" :word="t" :revealed="true" />

      <template v-if="!isPassed">
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
      <button
        v-if="!isPassed"
        class="btn"
        :disabled="input.length !== WORD_LENGTH"
        @click="go"
      >
        确定
      </button>
      <div h-200 />
      <div op50>
        这个是测试用的，之后会拿掉 👀
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
    </div>
  </div>
</template>
