<script setup lang="ts">
import { dayNo, daySince, isDev } from '~/state'
</script>

<template>
  <NoFuturePlay v-if="dayNo > daySince && !isDev" />
  <Play v-else />
</template>
