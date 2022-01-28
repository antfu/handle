<script setup lang="ts">
import { START_DATE, now } from '~/state'

const ms = computed(() => 86400000 - (+now.value - +START_DATE) % 86400000)
const formatted = computed(() => {
  const h = Math.floor((ms.value % 86400000) / 3600000)
  const m = Math.floor((ms.value % 3600000) / 60000)
  const s = Math.floor((ms.value % 60000) / 1000)
  return `${h}小时${m}分${s}秒`
})
</script>

<template>
  <div flex gap-5 py-5>
    <div>
      <div op80>
        距离下一题更新还有
      </div>
      <div font-mono text-2xl>
        {{ formatted }}
      </div>
    </div>

    <div w-1px border="l base" />

    <div flex items-center>
      <ShareButton />
    </div>
  </div>
</template>
