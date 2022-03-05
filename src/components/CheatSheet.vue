<script setup lang="ts">
import { inputMode } from '~/storage'
import { t } from '~/i18n'
import { pinyinFinals, pinyinInitials, shuangpinFinals, shuangpinInitials, zhuyinSymbols } from '~/logic'
import { getSymbolState, showCheatSheet } from '~/state'

function getSymbolClass(symbol: string, key?: '_1' | '_2') {
  const state = getSymbolState(symbol, key)
  if (!state)
    return ''
  return ({
    exact: 'text-ok',
    misplaced: 'text-mis',
    none: 'op30',
  })[state]
}

function close() {
  showCheatSheet.value = false
}

const modeText = computed(() => ({
  py: t('pinyin'),
  sp: t('shuangpin'),
  zy: t('zhuyin'),
}[inputMode.value]))
</script>

<template>
  <div p8 pt4 flex="~ col center" relative>
    <div absolute top-4 right-4 flex="~ gap-3">
      <button icon-btn @click="close()">
        <div i-carbon-close />
      </button>
    </div>

    <p text-xl font-serif mb8>
      <b>{{ modeText }}{{ t('cheatsheet') }}</b>
    </p>
    <!-- Zhuyin -->
    <div
      v-if="inputMode === 'zy'"
      grid="~ cols-6 center"
    >
      <div v-for="s of zhuyinSymbols" :key="s" text-2xl font-serif w-12 h-12 :class="getSymbolClass(s)">
        {{ s }}
      </div>
    </div>
    <!-- Shuangpin -->
    <div
      v-else-if="inputMode === 'sp'"
      grid="~ cols-[1fr_1fr] gap-x-10 gap-y-4"
      font-mono font-light
    >
      <div text-center>
        {{ t('initials') }}
      </div>
      <div text-center>
        {{ t('finals') }}
      </div>
      <div grid="~ cols-4 gap-4" h-min>
        <div v-for="s of shuangpinInitials" :key="s" :class="getSymbolClass(s, '_1')">
          {{ s }}
        </div>
      </div>
      <div grid="~ cols-4 gap-4" h-min>
        <div v-for="s of shuangpinFinals" :key="s" :class="getSymbolClass(s, '_2')">
          {{ s }}
        </div>
      </div>
    </div>
    <!-- Pinyin -->
    <div
      v-else
      grid="~ cols-[1fr_3fr] gap-x-10 gap-y-4"
      font-mono font-light
    >
      <div text-center>
        {{ t('initials') }}
      </div>
      <div text-center>
        {{ t('finals') }}
      </div>
      <div grid="~ cols-2 gap-3" h-min>
        <div v-for="s of pinyinInitials" :key="s" :class="getSymbolClass(s)">
          {{ s }}
        </div>
      </div>
      <div grid="~ cols-3 gap-3" h-min>
        <div v-for="s of pinyinFinals" :key="s" :class="getSymbolClass(s)">
          {{ s.replace('v', 'ü') }}
        </div>
      </div>
    </div>
  </div>
</template>
