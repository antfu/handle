<script setup lang="ts">
import { colorblind, useNumberTone, useZhuyin } from '~/storage'
import { locale, t } from '~/i18n'
</script>

<template>
  <div p6 flex="~ col gap-4">
    <div flex="~ gap-4 center wrap">
      <div border="~ base" flex="~ gap-2" p="x2 y1">
        <button :class="locale === 'hans' ? 'text-primary' : 'op80' " @click="locale = 'hans'">
          简体
        </button>
        <div w-1px border="r base" />
        <button :class="locale === 'hant' ? 'text-primary' : 'op80' " @click="locale = 'hant'">
          繁體
        </button>
      </div>
      <div border="~ base" flex="~ gap-2" p="x2 y1">
        <button :class="!useZhuyin ? 'text-primary' : 'op80' " @click="useZhuyin = false">
          {{ t('pinyin') }}
        </button>
        <div w-1px border="r base" />
        <button :class="useZhuyin ? 'text-primary' : 'op80' " @click="useZhuyin = true">
          {{ t('zhuyin') }}
        </button>
      </div>
    </div>
    <div flex="~ gap-4 center wrap">
      <div border="~ base" flex="~ gap-2" p="x2 y1" :class="useZhuyin ? 'op50 pointer-events-none' : ''">
        <button :class="!useNumberTone || useZhuyin ? 'text-primary' : 'op80' " @click="useNumberTone = false">
          符号声调
        </button>
        <div w-1px border="r base" />
        <button :class="useNumberTone && !useZhuyin ? 'text-primary' : 'op80' " @click="useNumberTone = true">
          数字声调
        </button>
      </div>
      <div border="~ base" flex="~ gap-2" p="x2 y1">
        <button :class="colorblind ? 'text-primary' : 'op80' " relative @click="colorblind = !colorblind">
          {{ t('colorblind-mode') }}
          <div v-if="colorblind" h-2 w-2 bg-primary absolute style="right:-0.75rem;top:-0.5rem" />
        </button>
      </div>
    </div>
  </div>
</template>
