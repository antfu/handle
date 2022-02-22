<script setup lang="ts">
import { now } from '~/state'
import { t } from '~/i18n'
import { START_DATE } from '~/logic'

const ms = computed(() => 86400000 - (+now.value - +START_DATE) % 86400000)
const formatted = computed(() => {
  const h = Math.floor((ms.value % 86400000) / 3600000)
  const m = Math.floor((ms.value % 3600000) / 60000)
  const s = Math.floor((ms.value % 60000) / 1000)
  return t('time-format', h, m, s)
})
</script>

<template>
  <div flex gap-5 py8>
    <div flex="~ col center" relative w-38>
      <div op80 ws-nowrap>
        {{ t('next-note') }}
      </div>
      <div text-2xl font-serif ws-nowrap style="font-variant-numeric: tabular-nums;">
        {{ formatted }}
      </div>
    </div>

    <div w-1px border="l base" />

    <div flex="~ col gap-4" items-center>
      <ShareButton />
      <ExportImage />
    </div>
  </div>
</template>
