<script setup lang="ts">
import { useMask } from '~/state'
import { t } from '~/i18n'
</script>

<template>
  <div border="~ base" flex="~ gap-2" p="x2 y1">
    <button :class="useMask ? 'text-primary' : 'op50'" flex="~ center gap-1" @click="useMask = !useMask">
      <div :i="useMask ? 'carbon-view-off' : 'carbon-view'" />
      {{ useMask ? t('mask-on') : t('mask-off') }}
    </button>
  </div>
  <div text-sm op50>
    {{ t('dont-spoiler') }}
  </div>
</template>
