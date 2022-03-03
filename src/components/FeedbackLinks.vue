<script setup lang="ts">
import { t } from '~/i18n'
</script>

<template>
  <div pb2 op50>
    {{ t('feedback') }}
  </div>
  <div flex>
    <a
      square-btn mx2 flex-gap-1
      href="https://weibo.com/7485197193/Li2WLFosw"
      target="_blank"
    >
      <div i-ri-weibo-line />
      {{ t('weibo-topic') }}
    </a>
    <a
      square-btn mx2 flex-gap-1
      href="https://twitter.com/antfu7/status/1499342397956067329"
      target="_blank"
    >
      <div i-ri-twitter-line />
      {{ t('twitter-community') }}
    </a>
  </div>
</template>
