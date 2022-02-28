<script setup lang="ts">
import { formatDuration, meta } from '~/storage'
import { dayNo } from '~/state'
import { t } from '~/i18n'
</script>

<template>
  <div relative op50 my2 text-sm min-h-1em w-86>
    <div absolute text-sm left-0 bottom-0 ws-nowrap>
      D{{ dayNo }} · {{ meta.hintLevel ? meta.hintLevel + t('hint-level') : t('hint-level-none') }}
    </div>
    <div absolute text-sm right-0 bottom-0 ws-nowrap>
      {{ formatDuration(meta.duration || 0) }} ·
      {{ meta.answer ? 'X' : meta.tries?.length || 0 }}/10
    </div>
  </div>
</template>
