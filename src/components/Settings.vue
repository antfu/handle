<script setup lang="ts">
import { colorblind, inputMode, meta, spMode, useCheckAssist, useNoHint, useNumberTone as useNumberToneRaw, useStrictMode } from '~/storage'
import { useNumberTone } from '~/state'
import { locale, t } from '~/i18n'

defineProps<{
  lite?: boolean
}>()
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
    <div v-if="inputMode === 'sp'" flex="~ center wrap">
      <div square-btn m2>
        <button :class="spMode === 'sougou' ? 'text-primary' : 'op80' " @click="spMode = 'sougou'">
          {{ t('shuangpin-sougou') }}
        </button>
        <div w-1px h-4 border="r base" />
        <button :class="spMode === 'xiaohe' ? 'text-primary' : 'op80' " @click="spMode = 'xiaohe'">
          {{ t('shuangpin-xiaohe') }}
        </button>
      </div>
    </div>
    <div v-if="!lite" flex="~ center wrap">
      <button
        square-btn m2
        :class="useNoHint ? 'text-primary' : 'op80' "
        @click="useNoHint = !useNoHint"
      >
        {{ t('hard-mode') }}
        <div v-if="useNoHint" square-btn-mark />
      </button>
      <button
        square-btn m2
        :class="useCheckAssist ? 'text-primary' : 'op80' "
        @click="useCheckAssist = !useCheckAssist"
      >
        {{ t('check-assist') }}
        <div v-if="useCheckAssist" square-btn-mark />
      </button>
      <button
        square-btn m2
        :class="[
          useStrictMode ? 'text-primary' : 'op80',
          !!meta.tries?.length ? 'op50 pointer-events-none' : '',
        ]"
        @click="useStrictMode = !useStrictMode"
      >
        {{ t('strict-mode') }}
        <div v-if="useStrictMode" square-btn-mark />
      </button>
    </div>
  </div>
</template>
