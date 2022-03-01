<script setup lang="ts">
import ToneSymbol from './ToneSymbol.vue'
import type { MatchResult, MatchType, ParsedChar } from '~/logic/types'
import { checkAssist, inputMode } from '~/storage'
import { getSymbolState, useMask, useNumberTone } from '~/state'

const props = defineProps<{
  char?: ParsedChar
  answer?: MatchResult
  active?: boolean
}>()

const PINYIN_CHAR_WIDTH = 9.64
const PINYIN_CHAR_GAP = 2.1
const PINYIN_CHAR_INIT = 0.5

const exact = computed(() => props.answer && Object.values(props.answer).every(i => i === 'exact'))

const parsed = computed(() => {
  if (props.answer)
    return props.answer
  if (!props.char || !checkAssist.value || !props.active)
    return

  // Assist coloring
  return {
    _1: getSymbolState(props.char._1, inputMode.value === 'sp' ? '_1' : undefined) === 'none' ? 'deleted' : undefined,
    _2: getSymbolState(props.char._2, inputMode.value === 'sp' ? '_2' : undefined) === 'none' ? 'deleted' : undefined,
    _3: getSymbolState(props.char._3) === 'none' ? 'deleted' : undefined,
    tone: getSymbolState(props.char.tone, 'tone') === 'none' ? 'deleted' : undefined,
  } as MatchResult
})

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
    deleted: inputMode.value === 'zy' ? 'op30' : 'line-through op30',
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
    part.lastIndexOf('o'),
    part.lastIndexOf('i'),
    part.lastIndexOf('u'),
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
  <div h-20 w-20 border-2 font-serif leading-1em flex="~ center" relative :class="blockColor">
    <template v-if="char?.char?.trim()">
      <!-- Zhuyin -->
      <template v-if="inputMode === 'zy'">
        <div
          text-3xl leading-1em
          :class="[getColor(parsed?.char, true), useMask ? 'mr4': 'mr3']"
        >
          {{ char.char }}
        </div>
        <div absolute text-center top-0 bottom-0 right="2.5" w-5 flex items-center>
          <div flex="~ center" text-xs style="writing-mode: vertical-rl;">
            <span v-if="char._1" :class="getColor(parsed?._1)">
              {{ char._1 }}
            </span>
            <span v-if="char._2" :class="getColor(parsed?._2)">
              {{ char._2 }}
            </span>
            <span v-if="char._3" :class="getColor(parsed?._3)">
              {{ char._3 }}
            </span>
          </div>
          <ToneSymbol :tone="char.tone" :class="getColor(parsed?.tone)" mt--1 />
        </div>
      </template>

      <!-- Pinyin or Shuangpin -->
      <template v-else>
        <div
          text-3xl leading-1em
          :class="[getColor(parsed?.char, true), useMask ? 'mt6': 'mt4']"
        >
          {{ char.char }}
        </div>
        <div
          absolute font-mono
          text-center left-0 right-0 font-100 flex flex-col items-center
          :class="[useMask ? 'top-14px': 'top-11px']"
        >
          <div relative flex="~ x-center" items-start ma>
            <div v-if="char._1" :class="getColor(parsed?._1)" mx-1px>
              {{ char._1 }}
            </div>
            <div v-if="partTwo" :class="getColor(parsed?._2)" mx-1px>
              {{ partTwo }}
            </div>
            <div v-if="char._3" :class="getColor(parsed?._3)" mx-1px>
              {{ char._3 }}
            </div>
            <div
              v-if="useNumberTone"
              :class="getColor(parsed?.tone)"
              text-xs leading-1em mr--3 mt--1 ml-1px
            >
              {{ char.tone }}
            </div>
            <ToneSymbol
              v-else
              :tone="char.tone"
              :class="getColor(parsed?.tone)"
              absolute
              :style="{
                left: toneCharLeft + 'px',
                top: useMask ? '-8px' : '-1.2px'
              }"
              mt--1
            />
          </div>
        </div>
      </template>
    </template>
  </div>
</template>
