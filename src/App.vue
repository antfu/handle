<script setup lang="ts">
import '~/init'
</script>

<template>
  <main font-sans text="center gray-700 dark:gray-300" select-none>
    <Navbar />
    <div p="4">
      <router-view />
    </div>
  </main>
</template>
