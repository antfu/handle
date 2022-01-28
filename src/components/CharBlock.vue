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
  if (props.answer.pinyin.find(i => i.initial === props.char.pinyin[0].initial))
    return colors.match
  else if (parsedAnswer.value.find(i => i.pinyin.find(j => j.initial === props.char.pinyin[0].initial)))
    return colors.partial
  return colors.mismatch
})

const medialColor = computed(() => {
  if (!props.answer)
    return
  if (props.answer.pinyin.find(i => i.medial === props.char.pinyin[0].medial))
    return colors.match
  else if (parsedAnswer.value.find(i => i.pinyin.find(j => j.medial === props.char.pinyin[0].medial)))
    return colors.partial
  return colors.mismatch
})

const toneColor = computed(() => {
  if (!props.answer)
    return
  if (props.answer.pinyin.find(i => i.tone === props.char.pinyin[0].tone))
    return colors.match
  else if (parsedAnswer.value.find(i => i.pinyin.find(j => j.tone === props.char.pinyin[0].tone)))
    return colors.partial
  return colors.mismatch
})
</script>

<template>
  <div h-20 w-20 border="~ 2 gray-400" flex="~" items-center justify-center relative>
    <div text-3xl mt-4 :class="charColor">
      {{ char.char }}
    </div>
    <div v-if="char.pinyin[0]" absolute top-1 text-center left-0 right-0 flex gap-1 justify-center>
      <span :class="initialColor">
        {{ bopomofo ? initialMap[char.pinyin[0].initial] : char.pinyin[0].initial || '-' }}
      </span>
      <span :class="medialColor">
        {{ bopomofo ? medialMap[char.pinyin[0].medial]: char.pinyin[0].medial }}
      </span>
      <span :class="toneColor">
        {{ bopomofo ? toneMap[char.pinyin[0].tone] : char.pinyin[0].tone }}
      </span>
    </div>
  </div>
</template>
