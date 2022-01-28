<script setup lang="ts">
import { WORD_LENGTH, showHint } from '~/state'
import { tries } from '~/storage'
import { day } from '~/data'

const toggleHint = useToggle(showHint)

const input = ref('')
function go() {
  if (input.value.length !== WORD_LENGTH)
    return
  tries.value.push(input.value)
  input.value = ''
}
function reset() {
  tries.value = []
  input.value = ''
}
function handleInput(e: Event) {
  const el = (e.target! as HTMLInputElement)
  input.value = Array.from(el.value)
    .filter(i => /\p{Script=Han}/u.test(i))
    .slice(0, 4)
    .join('')
}
</script>

<template>
  <div>
    <button icon-btn text-base pb3 gap-1 inline-flex items-center justify-center @click="toggleHint()">
      <div i-carbon-idea /> 提示
    </button>
    <Modal v-model="showHint" direction="top">
      <Hint />
    </Modal>

    <div flex="~ col gap-2" items-center>
      <!-- <Sentence :word="answer" /> -->
      <Sentence v-for="t,i of tries" :key="i" :word="t" :revealed="true" />
      <Sentence :word="input" />
      <input
        :value="input"
        type="text"
        autocomplete="false"
        outline-none
        placeholder="輸入四字成语"
        w-86
        p3
        border="~ base rounded"
        text="center"
        bg="transparent"
        @input="handleInput"
        @keydown.enter="go"
      >
    </div>

    <div flex="~ col gap-2" p4 justify-center items-center>
      <button
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
        :href="`/?d=${day + 1}`"
      >
        下一天
      </a>
    </div>
  </div>
</template>
