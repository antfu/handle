<script setup lang="ts">
import { t } from '~/i18n'
import { showDashboard } from '~/state'
import { averageDurations, gamesCount, historyTriesCount, noHintPassedCount, passedCount, passedTries } from '~/storage'

const triesMap = computed(() => {
  const map = new Map<number, number>()
  passedTries.value.forEach((i) => {
    const count = i.tries!.length
    if (count > 10)
      return
    map.set(count, (map.get(count) || 0) + 1)
  })
  return map
})

const tiresMaxCount = computed(() => {
  let max = 1
  Array.from(triesMap.value.values()).forEach((i) => {
    if (i > max)
      max = i
  })
  return max
})

function close() {
  showDashboard.value = false
}
</script>

<template>
  <div p5 flex="~ col center" relative>
    <div absolute top-4 right-4 flex="~ gap-3">
      <button icon-btn @click="close">
        <div i-carbon-close />
      </button>
    </div>

    <p text-xl font-serif mb4>
      <b>{{ t('dashboard') }}</b>
    </p>
    <div grid="~ cols-[max-content_1fr] gap-2" min-w-100px py4>
      <div text-right op50>
        {{ t('games-count') }}
      </div>
      <div text-left>
        {{ gamesCount }}
      </div>
      <div text-right op50>
        {{ t('win-count') }}
      </div>
      <div text-left>
        {{ passedCount }}
      </div>
      <div text-right op50>
        {{ t('win-no-hint-count') }}
      </div>
      <div text-left>
        {{ noHintPassedCount }}
      </div>
      <div text-right op50>
        {{ t('win-rate') }}
      </div>
      <div text-left>
        {{ Math.round(passedCount / gamesCount * 100) }}%
      </div>
      <div text-right op50>
        {{ t('average-tries-count') }}
      </div>
      <div text-left>
        {{ (historyTriesCount / gamesCount).toFixed(1) }}
      </div>
      <div text-right op50>
        {{ t('average-durations') }}
      </div>
      <div text-left>
        {{ averageDurations || '-' }}
      </div>
    </div>
    <div v-if="passedTries.length >= 3" w-full max-w-100 pt4>
      <p text-lg font-serif mb4 text-center>
        <b>{{ t('guess-dist') }}</b>
      </p>
      <div bg-gray:5 p4>
        <div v-for="i of 10" :key="i" flex="~" items-center gap-2>
          <div w-4 flex-none text-right op50>
            {{ i }}
          </div>
          <div bg-primary h-5 text-white text-right flex justify-end :style="{width: (triesMap.get(i) || 0) / tiresMaxCount * 100 + '%' }">
            <div text-sm mya mr1>
              {{ triesMap.get(i) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
