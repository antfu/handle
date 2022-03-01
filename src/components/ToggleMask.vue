<script setup lang="ts">
import { useMask } from '~/state'
import { t } from '~/i18n'

defineProps<{
  hint?: boolean
}>()
</script>

<template>
  <button
    square-btn flex-gap-1
    :class="useMask ? 'text-primary' : hint ? 'op50' : ''" ma
    @click="useMask = !useMask"
  >
    <div :i="useMask ? 'carbon-view-off' : 'carbon-view'" />
    {{ useMask ? t('mask-on') : t('mask-off') }}
  </button>
  <div v-if="hint" my2 op50>
    {{ t('dont-spoiler') }}
  </div>
</template>
