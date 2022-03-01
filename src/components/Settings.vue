<script setup lang="ts">
import { checkAssist, colorblind, hardMode, inputMode, useNumberTone as useNumberToneRaw } from '~/storage'
import { useNumberTone } from '~/state'
import { locale, t } from '~/i18n'
</script>

<template>
  <div flex="~ col">
    <div flex="~ center wrap">
      <div square-btn m2>
        <button :class="locale === 'hans' ? 'text-primary' : 'op80' " @click="locale = 'hans'">
          简体
        </button>
        <div w-1px h-4 border="r base" />
        <button :class="locale === 'hant' ? 'text-primary' : 'op80' " @click="locale = 'hant'">
          繁體
        </button>
      </div>
      <button
        square-btn m2
        :class="colorblind ? 'text-primary' : 'op80' "
        @click="colorblind = !colorblind"
      >
        {{ t('colorblind-mode') }}
        <div v-if="colorblind" square-btn-mark />
      </button>
    </div>
    <div flex="~ center wrap">
      <div square-btn m2>
        <button :class="inputMode === 'py' ? 'text-primary' : 'op80' " @click="inputMode = 'py'">
          {{ t('pinyin') }}
        </button>
        <div w-1px h-4 border="r base" />
        <button :class="inputMode === 'zy' ? 'text-primary' : 'op80' " @click="inputMode = 'zy'">
          {{ t('zhuyin') }}
        </button>
        <div w-1px h-4 border="r base" />
        <button :class="inputMode === 'sp' ? 'text-primary' : 'op80' " @click="inputMode = 'sp'">
          {{ t('shuangpin') }}
        </button>
      </div>
      <div square-btn m2 :class="inputMode !== 'py' ? 'op50 pointer-events-none' : ''">
        <button :class="!useNumberTone ? 'text-primary' : 'op80' " @click="useNumberToneRaw = false">
          {{ t('tone-symbol') }}
        </button>
        <div w-1px h-4 border="r base" />
        <button :class="useNumberTone ? 'text-primary' : 'op80' " @click="useNumberToneRaw = true">
          {{ t('tone-number') }}
        </button>
      </div>
    </div>
    <div flex="~ center wrap">
      <button
        square-btn m2
        :class="hardMode ? 'text-primary' : 'op80' "
        @click="hardMode = !hardMode"
      >
        {{ t('hard-mode') }}
        <div v-if="hardMode" square-btn-mark />
      </button>
      <button
        square-btn m2
        :class="checkAssist ? 'text-primary' : 'op80' "
        @click="checkAssist = !checkAssist"
      >
        {{ t('check-assist') }}
        <div v-if="checkAssist" square-btn-mark />
      </button>
    </div>
    <a
      v-if="inputMode === 'sp'" mt2
      href="https://zh.wikipedia.org/wiki/%E5%8F%8C%E6%8B%BC" target="_blank" text-sm op50
    >
      {{ t('shuangpin-note') }}
    </a>
  </div>
</template>
