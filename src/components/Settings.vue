<script setup lang="ts">
import { colorblind, hardMode, inputMode, useNumberTone as useNumberToneRaw } from '~/storage'
import { useNumberTone } from '~/state'
import { locale, t } from '~/i18n'
</script>

<template>
  <div p6 flex="~ col gap-4">
    <div flex="~ gap-4 center wrap">
      <div border="~ base" flex="~ gap-2" p="x2 y1">
        <button :class="inputMode === 'py' ? 'text-primary' : 'op80' " @click="inputMode = 'py'">
          {{ t('pinyin') }}
        </button>
        <div w-1px border="r base" />
        <button :class="inputMode === 'zy' ? 'text-primary' : 'op80' " @click="inputMode = 'zy'">
          {{ t('zhuyin') }}
        </button>
        <div w-1px border="r base" />
        <button :class="inputMode === 'sp' ? 'text-primary' : 'op80' " @click="inputMode = 'sp'">
          {{ t('shuangpin') }}
        </button>
      </div>
      <div border="~ base" flex="~ gap-2" p="x2 y1" :class="inputMode !== 'py' ? 'op50 pointer-events-none' : ''">
        <button :class="!useNumberTone ? 'text-primary' : 'op80' " @click="useNumberToneRaw = false">
          {{ t('tone-symbol') }}
        </button>
        <div w-1px border="r base" />
        <button :class="useNumberTone ? 'text-primary' : 'op80' " @click="useNumberToneRaw = true">
          {{ t('tone-number') }}
        </button>
      </div>
    </div>
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
        <button :class="colorblind ? 'text-primary' : 'op80' " relative @click="colorblind = !colorblind">
          {{ t('colorblind-mode') }}
          <div v-if="colorblind" h-2 w-2 bg-primary absolute style="right:-0.75rem;top:-0.5rem" />
        </button>
      </div>
      <div border="~ base" flex="~ gap-2" p="x2 y1">
        <button :class="hardMode ? 'text-primary' : 'op80' " relative @click="hardMode = !hardMode">
          {{ t('hard-mode') }}
          <div v-if="hardMode" h-2 w-2 bg-primary absolute style="right:-0.75rem;top:-0.5rem" />
        </button>
      </div>
    </div>
    <a
      v-if="inputMode === 'sp'"
      href="https://zh.wikipedia.org/wiki/%E5%8F%8C%E6%8B%BC" target="_blank" text-sm op50
    >
      {{ t('shuangpin-note') }}
    </a>
  </div>
</template>
