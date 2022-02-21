<script setup lang="ts">
import { useMask } from '~/state'
import { t } from '~/i18n'
</script>

<template>
  <button :class="useMask ? 'text-primary' : 'op50'" border="~ base" p="x2 y1" flex="~ center gap-1" class="outline-none!" @click="useMask = !useMask">
    <div :i="useMask ? 'carbon-view-off' : 'carbon-view'" />
    {{ useMask ? t('mask-on') : t('mask-off') }}
  </button>
  <div text-sm op50>
    {{ t('dont-spoiler') }}
  </div>
</template>
