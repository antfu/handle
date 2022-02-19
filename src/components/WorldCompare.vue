<script setup lang="ts">
import { getReport } from '~/analytics'

const data = asyncComputed(() => getReport())
</script>

<template>
  <div>
    World Compare
    <div v-if="!data">
      加载中...
    </div>
    <div v-else>
      <pre text-left>{{ JSON.stringify(data, null, 2) }}</pre>
    </div>
  </div>
</template>
