<script setup lang="ts">
import { answer, dayNo, isDev, isFailed, isFinished, showCheatSheet, showFailed, showHelp, showHint } from '~/state'
import { markStart, meta, tries, useNoHint, useStrictMode } from '~/storage'
import { t } from '~/i18n'
import { TRIES_LIMIT, WORD_LENGTH, checkValidIdiom, filterNonChineseChars } from '~/logic'

const el = ref<HTMLInputElement>()
const input = ref('')
const inputValue = ref('')

const isFinishedDelay = debouncedRef(isFinished, 800)

function enter() {
  if (input.value.length !== WORD_LENGTH)
    return
  if (!checkValidIdiom(input.value, useStrictMode.value)) {
    // TODO: shake and show mesage
    return false
  }
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
  input.value = filterNonChineseChars(el.value)
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
  showCheatSheet.value = !showCheatSheet.value
}

watchEffect(() => {
  if (!showHelp.value)
    focus()
})

watchEffect(() => {
  if (isFailed.value && !meta.value.failed) {
    meta.value.failed = true
    setTimeout(() => {
      showFailed.value = true
    }, 1200)
  }
})
</script>

<template>
  <div>
    <div flex="~ col" pt4 items-center>
      <WordBlocks v-for="w,i of tries" :key="i" :word="w" :revealed="true" @click="focus()" />

      <template v-if="meta.answer">
        <div my4>
          <div font-serif p2>
            {{ t('correct-answer') }}
          </div>
          <WordBlocks :word="answer.word" />
        </div>
      </template>

      <WordBlocks v-if="!isFinished" :word="input" :active="true" @click="focus()" />

      <div mt-1 />

      <Transition name="fade-out">
        <div v-if="!isFinished" flex="~ col gap-2" items-center>
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
            :disabled="isFinished"
            @input="handleInput"
            @keydown.enter="enter"
          >
          <button
            mt3
            btn p="x6 y2"
            :disabled="input.length !== WORD_LENGTH"
            @click="enter"
          >
            {{ t('ok-spaced') }}
          </button>
          <div v-if="tries.length > 4 && !isFailed" op50>
            {{ t('tries-rest', TRIES_LIMIT - tries.length) }}
          </div>
          <button v-if="isFailed" square-btn @click="showFailed = true">
            <div i-mdi-emoticon-devil-outline /> {{ t('view-answer') }}
          </button>

          <div flex="~ center" mt4 :class="isFinished ? 'op0! pointer-events-none' : ''">
            <button v-if="!useNoHint" mx2 icon-btn text-base pb2 gap-1 flex="~ center" @click="hint()">
              <div i-carbon-idea /> {{ t('hint') }}
            </button>
            <button mx2 icon-btn text-base pb2 gap-1 flex="~ center" @click="sheet()">
              <div i-carbon-grid /> {{ t('cheatsheet') }}
            </button>
          </div>
        </div>
      </Transition>
      <Transition name="fade">
        <div v-if="isFinishedDelay && isFinished">
          <ResultFooter />
          <Countdown />
        </div>
      </Transition>

      <template v-if="isDev">
        <div h-200 />
        <div op50 mb-2>
          测试用
        </div>
        <div flex gap2>
          <a
            class="btn"
            :href="`/?dev=hey&d=${dayNo - 1}`"
          >
            上一天
          </a>
          <button
            class="btn"
            @click="reset"
          >
            重置
          </button>
          <a
            class="btn"
            :href="`/?dev=hey&d=${dayNo + 1}`"
          >
            下一天
          </a>
        </div>
      </template>
    </div>
  </div>
</template>

<style>
.fade-enter-active {
  transition: all 1s ease;
}
.fade-out-leave-active {
  transition: all 0.5s ease;
}

.fade-out-leave-to,
.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
</style>
