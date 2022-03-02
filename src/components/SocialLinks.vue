<script setup lang="ts">
import { t } from '~/i18n'
</script>

<template>
  <div p4 mt2 op50>
    {{ t('join-community') }}
  </div>
  <div flex>
    <a
      square-btn mx2 flex-gap-1
      href="https://weibo.com/p/100808efe67c0dab5ab1f22adcfd6635b05936"
      target="_blank"
    >
      <div i-ri-weibo-line />
      {{ t('weibo-topic') }}
    </a>
    <a
      square-btn mx2 flex-gap-1
      href="https://twitter.com/i/communities/1498733552443473920"
      target="_blank"
    >
      <div i-ri-twitter-line />
      {{ t('twitter-community') }}
    </a>
  </div>
</template>
