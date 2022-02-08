<script setup lang="ts">
import ToneSymbol from './ToneSymbol.vue'
import type { MatchResult, MatchType, ParsedChar } from '~/logic/types'
import { useNumberTone, useZhuyin } from '~/storage'
import { useMask } from '~/state'

const props = defineProps<{
  char?: ParsedChar
  answer?: MatchResult
}>()

const PINYIN_CHAR_WIDTH = 9.64
const PINYIN_CHAR_GAP = 2.1
const PINYIN_CHAR_INIT = 0.5

const exact = computed(() => Object.values(props.answer || {}).every(i => i === 'exact'))

function getColor(result?: MatchType, isChar = false) {
  const pre = useMask.value
    ? `bg-current ${isChar ? ' !op70' : '!op40'} border border-current`
    : ''
  if (!result || exact.value)
    return pre

  const colors = {
    exact: 'text-ok',
    misplaced: 'text-mis',
    none: isChar ? 'op80' : 'op40',
  }
  return `${pre} ${colors[result]}`
}

const blockColor = computed(() => {
  if (!props.answer)
    return 'border-base'
  if (exact.value)
    return 'border-transparent bg-ok text-white'
  return 'border-transparent bg-gray-400/8'
})

const toneCharLocation = computed(() => {
  const part = props.char?.yin || ''
  return [
    part.lastIndexOf('iu') > -1 ? part.lastIndexOf('iu') + 1 : -1,
    part.lastIndexOf('a'),
    part.lastIndexOf('e'),
    part.lastIndexOf('i'),
    part.lastIndexOf('u'),
    part.lastIndexOf('o'),
    part.lastIndexOf('v'),
  ].find(i => i !== null && i >= 0) || 0
})

const toneCharLeft = computed(() => {
  const char = props.char
  if (!char)
    return 0
  let gaps = 0
  if (char._2 && toneCharLocation.value >= char._1.length + char._2.length)
    gaps = 2
  else if (toneCharLocation.value >= char._1.length)
    gaps = 1
  return PINYIN_CHAR_INIT + toneCharLocation.value * PINYIN_CHAR_WIDTH + gaps * PINYIN_CHAR_GAP
})

const partTwo = computed(() => {
  const two = props.char?._2 || ''
  const oneLength = props.char?._1?.length || 0
  const index = toneCharLocation.value - oneLength
  // replace i with dot less for tone symbol
  if (!useNumberTone.value && props.char?.yin[toneCharLocation.value] === 'i')
    return `${two.slice(0, index)}ı${two.slice(index + 1)}`
  return two
})
</script>

<template>
  <div h-20 w-20 border-2 font-serif leading-1em flex="~ center" relative>
    <template v-if="char?.char?.trim()">
      <!-- Zhuyin -->
      <template v-if="useZhuyin">
        <div text-3xl leading-1em mr-3 :class="getColor(answer?.char, true)">
          {{ char.char }}
        </div>
        <div absolute text-center top-0 bottom-0 right="2.5" w-5 flex items-center>
          <div flex="~ center" text-xs style="writing-mode: vertical-rl;">
            <span v-if="char._1" :class="getColor(answer?._1)">
              {{ char._1 }}
            </span>
            <span v-if="char._2" :class="getColor(answer?._2)">
              {{ char._2 }}
            </span>
            <span v-if="char._3" :class="getColor(answer?._3)">
              {{ char._3 }}
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
            <div v-if="char._1" :class="getColor(answer?._1)">
              {{ char._1 }}
            </div>
            <div v-if="partTwo" :class="getColor(answer?._2)">
              {{ partTwo }}
            </div>
            <div v-if="char._3" :class="getColor(answer?._3)">
              {{ char._3 }}
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
                left: toneCharLeft + 'px',
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
