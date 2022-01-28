<script setup lang="ts">
import type { ParsedChar } from '~/utils'
import { bopomofo, parsedAnswer } from '~/utils'
import { initialMap, medialMap, toneMap } from '~/bopomofo'

const props = defineProps<{
  char: ParsedChar
  answer?: ParsedChar
}>()

const colors = {
  match: 'text-green-500',
  partial: 'text-yellow-500',
  mismatch: 'text-gray-500',
}

const charColor = computed(() => {
  if (!props.answer)
    return
  if (props.char.char === props.answer.char)
    return colors.match
  else if (parsedAnswer.value.find(i => i.char === props.char.char))
    return colors.partial
  return colors.mismatch
})

const initialColor = computed(() => {
  if (!props.answer)
    return
  if (props.answer.pinyin.initial === props.char.pinyin.initial)
    return colors.match
  else if (parsedAnswer.value.find(i => i.pinyin.initial === props.char.pinyin.initial))
    return colors.partial
  return colors.mismatch
})

const medialColor = computed(() => {
  if (!props.answer)
    return
  if (props.answer.pinyin.medial === props.char.pinyin.medial)
    return colors.match
  else if (parsedAnswer.value.find(i => i.pinyin.medial === props.char.pinyin.medial))
    return colors.partial
  return colors.mismatch
})

const toneColor = computed(() => {
  if (!props.answer)
    return
  if (props.answer.pinyin.tone === props.char.pinyin.tone)
    return colors.match
  else if (parsedAnswer.value.find(i => i.pinyin.tone === props.char.pinyin.tone))
    return colors.partial
  return colors.mismatch
})
</script>

<template>
  <div h-20 w-20 border="~ 2 gray-400" flex="~" items-center justify-center relative>
    <div text-3xl mt-4 :class="charColor">
      {{ char.char }}
    </div>
    <div v-if="char.pinyin" absolute top-1 text-center left-0 right-0 flex gap-1 justify-center>
      <span :class="initialColor">
        {{ bopomofo ? initialMap[char.pinyin.initial] : char.pinyin.initial || '-' }}
      </span>
      <span :class="medialColor">
        {{ bopomofo ? medialMap[char.pinyin.medial]: char.pinyin.medial }}
      </span>
      <span :class="toneColor">
        {{ bopomofo ? toneMap[char.pinyin.tone] : char.pinyin.tone }}
      </span>
    </div>
  </div>
</template>
