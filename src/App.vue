<script setup lang="ts">
import '~/init'
import { dayNo, daySince, isDev } from '~/state'
</script>

<template>
  <main font-sans text="center gray-700 dark:gray-300" select-none>
    <Navbar />
    <div p="4">
      <NoFuturePlay v-if="dayNo > daySince && !isDev" />
      <Play v-else />
    </div>
  </main>
</template>
