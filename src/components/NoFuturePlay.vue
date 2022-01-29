<script setup lang="ts">
import { t } from '~/i18n'
</script>

<template>
  <div>
    <p text-center p-4>
      {{ t('no-future-play') }}
    </p>
    <a btn href="/">{{ t('back-today') }}</a>
  </div>
</template>
