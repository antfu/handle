<script setup lang="ts">
import { dayNo, daySince } from '~/state'
import { t } from '~/i18n'

const delta = computed(() => dayNo.value - daySince.value)
</script>

<template>
  <div bg-orange:10 border="b orange/30" text-orange-600 dark:text-orange-200 text-sm py4>
    <div>{{ t('playing-previous-1') }} {{ -delta }} {{ t('playing-previous-2') }}</div>
    <div mt2>
      <a href="/" bg-yellow6 p="x2.5 y1.5" text-white rounded>
        {{ t('back-today') }}
      </a>
    </div>
  </div>
</template>
