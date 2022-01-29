<script setup lang="ts">
import type { MatchResult, MatchType, ParsedChar } from '~/types'
import { useZhuyin } from '~/storage'
import { zhuyinToneMap } from '~/lang'
import { useMask } from '~/state'

const props = defineProps<{
  char?: ParsedChar
  answer?: MatchResult
}>()

const colors = {
  exact: 'text-ok',
  misplaced: 'text-mis',
  none: 'op80',
}

const exact = computed(() => Object.values(props.answer || {}).every(i => i === 'exact'))

function getColor(result?: MatchType, isChar = false) {
  const pre = useMask.value
    ? `bg-current ${isChar ? ' !op70' : '!op40'}`
    : ''
  if (!result || exact.value)
    return pre
  return `${pre} ${colors[result]}`
}

const blockColor = computed(() => {
  if (!props.answer)
    return 'border-base'
  if (exact.value)
    return 'border-transparent bg-ok text-white'
  return 'border-transparent bg-gray-500/10'
})
</script>

<template>
  <div h-20 w-20 border-2 font-serif leading-1em :class="blockColor" flex="~ center" relative>
    <template v-if="char?.char?.trim()">
      <!-- Zhuyin -->
      <template v-if="useZhuyin">
        <div text-3xl leading-1em mr-3 :class="getColor(answer?.char, true)">
          {{ char.char }}
        </div>
        <div absolute text-center top-0 bottom-0 right="2.5" w-5 flex items-center>
          <div flex="~ center" text-xs style="writing-mode: vertical-rl;">
            <span :class="getColor(answer?.one)">
              {{ char.one }}
            </span>
            <span :class="getColor(answer?.two)">
              {{ char.two }}
            </span>
            <span :class="getColor(answer?.three)">
              {{ char.three }}
            </span>
          </div>
          <span :class="getColor(answer?.tone)" text-xl font-light w="12px" h="12px" mt--3>
            {{ zhuyinToneMap[char.tone] }}
          </span>
        </div>
      </template>
      <!-- Pinyin -->
      <template v-else>
        <div text-3xl leading-1em mt-4 :class="getColor(answer?.char, true)">
          {{ char.char }}
        </div>
        <div absolute top="2.5" text-center left-0 right-0 flex="~ x-center gap-0.5" items-start font-light>
          <div :class="getColor(answer?.one)">
            {{ char.one }}
          </div>
          <div :class="getColor(answer?.two)">
            {{ char.two }}
          </div>
          <div>
            <div :class="getColor(answer?.tone)" text-xs leading-1em mr--2 mt--1>
              {{ char.tone }}
            </div>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>
