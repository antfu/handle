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
  <div flex gap-5 py-5>
    <div flex="~ col center" relative>
      <div op80>
        {{ t('next-note') }}
      </div>
      <div text-2xl font-serif w-45>
        {{ formatted }}
      </div>
      <img src="/tiger.svg" w="1.5em" absolute right-0 top-1 rotate-15>
    </div>

    <div w-1px border="l base" />

    <div flex="~ col gap-2" items-center>
      <ShareButton />
      <ExportImage />
    </div>
  </div>
</template>
