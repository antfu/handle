<script setup lang="ts">
import { answer, dayNo, isDev, isFailed, isFinished, isPassed, showCheatSheet, showFailed, showHelp, showHint } from '~/state'
import { markStart, meta, tries } from '~/storage'
import { t } from '~/i18n'
import { TRIES_LIMIT, WORD_LENGTH } from '~/logic'

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
  markStart()
}
function focus() {
  el.value?.focus()
}
function hint() {
  meta.value.hint = true
  if (!meta.value.hintLevel)
    meta.value.hintLevel = 1
  showHint.value = true
}
function sheet() {
  showCheatSheet.value = true
}

watchEffect(() => {
  if (!showHelp.value)
    focus()
})

watchEffect(() => {
  if (isFailed.value && !meta.value.failed) {
    setTimeout(() => {
      showFailed.value = true
    }, 1200)
  }
})
</script>

<template>
  <div>
    <div flex="~ col gap-2" pt4 items-center>
      <WordBlocks v-for="w,i of tries" :key="i" :word="w" :revealed="true" @click="focus()" />

      <template v-if="meta.answer">
        <div my4>
          <div font-serif p2>
            {{ t('correct-answer') }}
          </div>
          <WordBlocks :word="answer.word" />
        </div>
      </template>

      <template v-if="!isFinished">
        <WordBlocks :word="input" @click="focus()" />
        <input
          ref="el"
          v-model="inputValue"
          type="text"
          autocomplete="false"
          outline-none
          :placeholder="t('input-placeholder')"
          w-86 p3
          border="2 base"
          text="center"
          bg="transparent"
          @input="handleInput"
          @keydown.enter="go"
        >
        <button
          v-if="!isPassed"
          mt3
          btn p="x6 y2"
          :disabled="input.length !== WORD_LENGTH"
          @click="go"
        >
          {{ t('ok-spaced') }}
        </button>
        <div v-if="tries.length > 4 && !isFailed" op50>
          {{ t('tries-rest', TRIES_LIMIT - tries.length) }}
        </div>
        <button v-if="isFailed" icon-btn text-base gap-1 my4 inline-flex items-center justify-center @click="showFailed = true">
          <div i-mdi-emoticon-devil-outline /> {{ t('view-answer') }}
        </button>

        <div flex="~ center gap-4" mt4 :class="isFinished ? 'op0! pointer-events-none' : ''">
          <button icon-btn text-base pb2 gap-1 flex="~ center" @click="hint()">
            <div i-carbon-idea /> {{ t('hint') }}
          </button>
          <button icon-btn text-base pb2 gap-1 flex="~ center" @click="sheet()">
            <div i-carbon-grid /> {{ t('cheatsheet') }}
          </button>
        </div>
      </template>
      <template v-else>
        <Countdown />
        <ToggleMask />
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
        <div>常用词</div>
      </template>
    </div>
  </div>
</template>
