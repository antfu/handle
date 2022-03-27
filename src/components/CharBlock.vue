<script setup lang="ts">
import type { MatchResult, MatchType, ParsedChar } from '~/logic/types'
import { inputMode } from '~/storage'
import { useMask, useNumberTone } from '~/state'

const props = defineProps<{
  char?: ParsedChar
  answer?: MatchResult
}>()

const exact = computed(() => !!props.answer && Object.values(props.answer).every(i => i === 'exact'))

function getColor(result?: MatchType, isChar = false) {
  const pre = useMask.value
    ? `bg-current ${isChar ? ' !op70' : '!op40'} border border-current`
    : ''

  if (!result || exact.value)
    return pre

  const colors = {
    exact: 'text-ok',
    misplaced: 'text-mis',
    none: isChar ? 'op80' : 'op35',
    deleted: !isChar && inputMode.value === 'zy' ? 'op30' : 'line-through op30',
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
  const part = props.char?._2 || ''
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

const vLocation = computed(() => {
  const part = props.char?._2 || ''
  return part.lastIndexOf('v')
})

const partTwo = computed(() => {
  const two = (props.char?._2 || '')
  const index = toneCharLocation.value
  // replace i with dot less for tone symbol
  if (!useNumberTone.value && two[index] === 'i')
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
          :class="[getColor(answer?.char, true), useMask ? 'mr4': 'mr3']"
        >
          {{ char.char }}
        </div>
        <div absolute text-center top-0 bottom-0 right="2.5" w="5" flex items-center>
          <div flex="~ center" text-xs style="writing-mode: vertical-rl">
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
          <ToneSymbol :tone="char.tone" :class="getColor(answer?.tone)" mt--1 min-w-6px />
        </div>
      </template>

      <!-- Pinyin or Shuangpin -->
      <template v-else>
        <div
          text-3xl leading-1em
          :class="[getColor(answer?.char, true), useMask ? 'mt6': 'mt4']"
        >
          {{ char.char }}
        </div>
        <div
          absolute font-mono
          text-center left-0 right-0 font-100 flex flex-col items-center
          :class="[useMask ? 'top-14px': 'top-11px']"
        >
          <div relative flex="~ x-center" items-start ma>
            <div v-if="char._1" :class="getColor(answer?._1)" mx-1px>
              {{ char._1 }}
            </div>
            <div v-if="partTwo" mx-1px flex>
              <div v-for="w,idx of partTwo" :key="idx" relative>
                <div :class="getColor(answer?._2)">
                  {{ inputMode === 'sp' ? w : w.replace('v', 'u') }}
                </div>
                <VDots
                  v-if="!useMask && idx === vLocation && inputMode === 'py'"
                  :class="getColor(answer?._2)"
                  absolute w="87%" left="8%" bottom="0.76rem"
                />
                <ToneSymbol
                  v-if="!useNumberTone && idx === toneCharLocation"
                  :tone="char.tone"
                  :class="getColor(answer?.tone)"
                  absolute w="86%" left="8%"
                  :style="{
                    bottom: useMask
                      ? '1.25rem'
                      : w === 'v'
                        ? '0.85rem'
                        : '0.78rem',
                  }"
                />
              </div>
            </div>
            <div
              v-if="useNumberTone"
              :class="getColor(answer?.tone)"
              text-xs leading-1em mr--3 mt--1 ml-1px
            >
              {{ char.tone }}
            </div>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>
