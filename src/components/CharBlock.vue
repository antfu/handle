<script setup lang="ts">
import type { MatchResult, MatchType, ParsedChar } from '~/utils'
import { bopomofo } from '~/utils'
import { initialMap, medialMap, toneMap } from '~/bopomofo'

defineProps<{
  char?: ParsedChar
  answer?: MatchResult
}>()

const colors = {
  exact: 'text-green-500',
  misplaced: 'text-yellow-500',
  none: 'text-gray-500',
}

function getColor(result?: MatchType) {
  if (!result)
    return ''
  return colors[result]
}
</script>

<template>
  <div h-20 w-20 border="~ 2 gray-400" flex="~" items-center justify-center relative>
    <template v-if="char?.char">
      <div text-3xl mt-4 :class="getColor(answer?.char)">
        {{ char.char }}
      </div>
      <div absolute top-1 text-center left-0 right-0 flex gap-1 justify-center>
        <span :class="getColor(answer?.initial)">
          {{ bopomofo ? initialMap[char.initial] : char.initial || '-' }}
        </span>
        <span :class="getColor(answer?.medial)">
          {{ bopomofo ? medialMap[char.medial]: char.medial }}
        </span>
        <span :class="getColor(answer?.tone)">
          {{ bopomofo ? toneMap[char.tone] : char.tone }}
        </span>
      </div>
    </template>
  </div>
</template>
