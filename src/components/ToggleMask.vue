<script setup lang="ts">
import { useMask } from '~/state'
import { t } from '~/i18n'

defineProps<{
  hint?: boolean
}>()
</script>

<template>
  <button
    :class="useMask ? 'text-primary' : 'op50'" border="~ base" p="x2 y1" ma
    flex="~ center gap-1" class="outline-none!" @click="useMask = !useMask"
  >
    <div :i="useMask ? 'carbon-view-off' : 'carbon-view'" />
    {{ useMask ? t('mask-on') : t('mask-off') }}
  </button>
  <div v-if="hint" text-sm op50>
    {{ t('dont-spoiler') }}
  </div>
</template>
