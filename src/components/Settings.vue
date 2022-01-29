<script setup lang="ts">
import { useZhuyin } from '~/storage'
import { locale, t } from '~/i18n'
</script>

<template>
  <div p6 flex="~ gap-4 center">
    <div border="~ base rounded" flex="~ gap-2" p="x2 y1">
      <button :class="locale === 'hans' ? 'text-primary' : 'op80' " @click="locale = 'hans'">
        简体
      </button>
      <div w-1px border="r base" />
      <button :class="locale === 'hant' ? 'text-primary' : 'op80' " @click="locale = 'hant'">
        繁體
      </button>
    </div>
    <div border="~ base rounded" flex="~ gap-2" p="x2 y1">
      <button :class="!useZhuyin ? 'text-primary' : 'op80' " @click="useZhuyin = false">
        {{ t('pinyin') }}
      </button>
      <div w-1px border="r base" />
      <button :class="useZhuyin ? 'text-primary' : 'op80' " @click="useZhuyin = true">
        {{ t('zhuyin') }}
      </button>
    </div>
  </div>
</template>
