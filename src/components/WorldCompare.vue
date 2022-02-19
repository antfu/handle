<script setup lang="ts">
import { getReport } from '~/analytics'

const data = asyncComputed(() => getReport())
</script>

<template>
  <div>
    World Compare
    <pre text-left>{{ JSON.stringify(data, null, 2) }}</pre>
  </div>
</template>
