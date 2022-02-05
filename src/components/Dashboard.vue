<script setup lang="ts">
import { t } from '~/i18n'
import { averageDurations, gamesCount, historyTriesCount, noHintPassedCount, passedCount } from '~/storage'
</script>

<template>
  <div p5 flex="~ col center">
    <p text-xl font-serif mb4>
      <b>{{ t('dashboard') }}</b>
    </p>
    <div grid="~ cols-[max-content_1fr] gap-2" min-w-100px>
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
  </div>
</template>
