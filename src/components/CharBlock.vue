<script setup lang="ts">
import ToneSymbol from './ToneSymbol.vue'
import type { MatchResult, MatchType, ParsedChar } from '~/types'
import { useNumberTone, useZhuyin } from '~/storage'
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
  return 'border-transparent bg-gray-400/8'
})

const pingyin = computed(() => (props.char?.one || '') + (props.char?.two || '') + (props.char?.three || ''))

const toneCharLocation = computed(() => {
  const part = pingyin.value
  return [
    part.lastIndexOf('a'),
    part.lastIndexOf('e'),
    part.lastIndexOf('i'),
    part.lastIndexOf('o'),
    part.lastIndexOf('u'),
  ].find(i => i !== null && i >= 0) || 0
})

const partTwo = computed(() => {
  const two = props.char?.two || ''
  const oneLength = props.char?.one?.length || 0
  const index = toneCharLocation.value - oneLength
  // replace i with dot less for tone symbol
  if (!useNumberTone.value && pingyin.value[toneCharLocation.value] === 'i')
    return `${two.slice(0, index)}ı${two.slice(index + 1)}`
  return two
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
          <ToneSymbol :tone="char.tone" :class="getColor(answer?.tone)" mt--1 />
        </div>
      </template>
      <!-- Pinyin -->
      <template v-else>
        <div text-3xl leading-1em mt-4 :class="getColor(answer?.char, true)">
          {{ char.char }}
        </div>
        <div absolute font-mono top="2.7" text-center left-0 right-0 font-100 flex flex-col items-center>
          <div relative flex="~ x-center gap-2px" items-start ma>
            <div :class="getColor(answer?.one)">
              {{ char.one }}
            </div>
            <div :class="getColor(answer?.two)">
              {{ partTwo }}
            </div>
            <div v-if="useNumberTone">
              <div :class="getColor(answer?.tone)" text-xs leading-1em mr--2 mt--1>
                {{ char.tone }}
              </div>
            </div>
            <ToneSymbol
              v-else
              :tone="char.tone" :class="getColor(answer?.tone)"
              absolute
              :style="{
                left: toneCharLocation * 9.64 + 2.6 + 'px',
                top: useMask ? '-5px' : '-1.2px'
              }"
              mt--1
            />
          </div>
        </div>
      </template>
    </template>
  </div>
</template>
