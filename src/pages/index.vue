<script setup lang="ts">
import { dayNo, daySince } from '~/state'
</script>

<template>
  <NoFuturePlay v-if="dayNo > daySince" />
  <Play v-else />
</template>
