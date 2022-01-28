<script setup lang="ts">
import { WORD_LENGTH, answer, bopomofo, parseWord } from '~/utils'

const hint = answer.value[2]

const tries = useStorage<string[]>('tries', [])
const input = useStorage('input', '')
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
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse-lite" target="_blank">
        Pindle
      </a>
    </p>

    <div py-4 flex="~ col" items-center>
      Hint
      <CharBlock :char="parseWord(hint)[0]" />
    </div>

    <div flex="~ col gap-2" items-center>
      <!-- <Sentence :word="answer" /> -->
      <Sentence v-for="t,i of tries" :key="i" :word="t" :revealed="true" />
      <div relative pt-8>
        <Sentence :word="input" />
        <input
          :value="input"
          type="text"
          autocomplete="false"
          absolute
          inset-0
          text-4xl
          w-full
          h-full
          outline-none
          bg="transparent"
          op-1
          style="letter-spacing: 2rem; font-size: 3.5rem"
          @input="handleInput"
          @keydown.enter="go"
        >
      </div>
    </div>

    <div>
      <button
        class="m-3 text-sm btn"
        :disabled="!input"
        @click="go"
      >
        Go
      </button>
      <button
        class="m-3 text-sm btn"
        @click="reset"
      >
        Reset
      </button>
    </div>

    <label>
      <input v-model="bopomofo" type="checkbox">
      注音
    </label>
  </div>
</template>
