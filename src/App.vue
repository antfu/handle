<script setup lang="ts">
import { t } from '~/i18n'
useTitle(computed(() => `${t('name')} - ${t('description')}`))
</script>

<template>
  <main font-sans text="center gray-700 dark:gray-200" select-none>
    <Navbar />
    <div p="4">
      <router-view />
    </div>
  </main>
</template>
