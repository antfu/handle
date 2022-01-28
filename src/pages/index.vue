<script setup lang="ts">
import { WORD_LENGTH } from '~/utils'

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
</script>

<template>
  <div>
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse-lite" target="_blank">
        Pindle
      </a>
    </p>
    <div py-4 />

    <div flex="~ col gap-1" items-center>
      <!-- <Sentence :word="answer" /> -->
      <Sentence v-for="t,i of tries" :key="i" :word="t" />
      <Sentence :word="input" />
    </div>

    <input
      v-model="input"
      mt-5
      placeholder="What's your name?"
      type="text"
      autocomplete="false"
      p="x-4 y-2"
      w="250px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      @keydown.enter="go"
    >

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
  </div>
</template>
