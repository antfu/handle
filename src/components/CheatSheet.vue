<script setup lang="ts">
import { useZhuyin } from '~/storage'
import { t } from '~/i18n'
import type { MatchType } from '~/logic'
import { WORD_LENGTH, pinyinFinals, pinyinInitials, zhuyinSymbols } from '~/logic'
import { parsedTries, showCheatSheet } from '~/state'

function getSymbolState(symbol: string) {
  const results: MatchType[] = []
  for (const t of parsedTries.value) {
    for (let i = 0; i < WORD_LENGTH; i++) {
      const w = t.word[i]
      const r = t.result[i]
      if (w._1 === symbol)
        results.push(r._1)
      if (w._2 === symbol)
        results.push(r._2)
      if (w._3 === symbol)
        results.push(r._3)
    }
  }
  if (results.includes('exact'))
    return 'text-ok'
  if (results.includes('misplaced'))
    return 'text-mis'
  if (results.includes('none'))
    return 'op30'
  return ''
}

function close() {
  showCheatSheet.value = false
}
</script>

<template>
  <div p5 flex="~ col center" relative>
    <div absolute top-4 right-4 flex="~ gap-3">
      <button icon-btn @click="close()">
        <div i-carbon-close />
      </button>
    </div>

    <p text-xl font-serif mb4>
      <b>{{ t('cheatsheet') }}</b>
    </p>
    <!-- Zhuyin -->
    <div v-if="useZhuyin" mt4 grid="~ cols-6 center">
      <div v-for="s of zhuyinSymbols" :key="s" text-2xl font-serif w-12 h-12 :class="getSymbolState(s)">
        {{ s }}
      </div>
    </div>
    <!-- Pinyin -->
    <div v-else my4 grid="~ cols-[1fr_3fr] gap-x-10 gap-y-4" font-mono font-light>
      <div text-center>
        {{ t('initials') }}
      </div>
      <div text-center>
        {{ t('finals') }}
      </div>
      <div grid="~ cols-2 gap-3" justify-start>
        <div v-for="s of pinyinInitials" :key="s" :class="getSymbolState(s)">
          {{ s }}
        </div>
      </div>
      <div grid="~ cols-3 gap-3" justify-start>
        <div v-for="s of pinyinFinals" :key="s" :class="getSymbolState(s)">
          {{ s }}
        </div>
      </div>
    </div>
  </div>
</template>
