<script setup lang="ts">
import type { MatchResult, MatchType, ParsedChar } from '~/types'
import { useZhuyin } from '~/storage'
import { zhuyinToneMap } from '~/lang'

const props = defineProps<{
  char?: ParsedChar
  answer?: MatchResult
}>()

const colors = {
  exact: 'text-teal-500',
  misplaced: 'text-orange-400',
  none: 'op80',
}

const exact = computed(() => Object.values(props.answer || {}).every(i => i === 'exact'))

function getColor(result?: MatchType) {
  if (!result || exact.value)
    return ''
  return colors[result]
}

const blockColor = computed(() => {
  if (!props.answer)
    return 'border-base'
  if (exact.value)
    return 'border-transparent bg-teal-500 text-white'
  return 'border-transparent bg-gray-500/10'
})
</script>

<template>
  <div h-20 w-20 border-2 font-serif :class="blockColor" flex="~" items-center justify-center relative>
    <template v-if="char?.char?.trim()">
      <!-- Zhuyin -->
      <template v-if="useZhuyin">
        <div text-3xl mr-3 :class="getColor(answer?.char)">
          {{ char.char }}
        </div>
        <div absolute text-center top-0 bottom-0 right="2.5" w-5 flex items-center>
          <div flex justify-center text-xs style="writing-mode: vertical-rl;">
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
          <span :class="getColor(answer?.tone)" text-xl font-light w="1.5">
            {{ zhuyinToneMap[char.tone] }}
          </span>
        </div>
      </template>
      <!-- Pinyin -->
      <template v-else>
        <div text-3xl mt-4 :class="getColor(answer?.char)">
          {{ char.char }}
        </div>
        <div absolute top="1.5" text-center left-0 right-0 flex gap="0.8" justify-center>
          <span :class="getColor(answer?.one)">
            {{ char.one }}
          </span>
          <span :class="getColor(answer?.two)">
            {{ char.two }}
          </span>
          <span :class="getColor(answer?.tone)" text-xs mr--2>
            {{ char.tone }}
          </span>
        </div>
      </template>
    </template>
  </div>
</template>
