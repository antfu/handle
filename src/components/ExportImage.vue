<script setup lang="ts">
import { dayNoHanzi, useMask } from '~/state'
import { tries } from '~/storage'
import { t } from '~/i18n'

const isIOS = /iPad|iPhone|iPod/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
const isMobile = isIOS || /iPad|iPhone|iPod|Android|Phone/i.test(navigator.userAgent)

const el = ref<HTMLDivElement>()
const show = ref(false)
const showDialog = ref(false)
const dataUrl = ref('')
const dataUrlMasked = ref('')

async function render() {
  show.value = true
  const { toPng } = await import('~/async/exportImage')
  await nextTick()
  await nextTick()
  showDialog.value = true
  const p = useMask.value
  useMask.value = false
  await nextTick()
  dataUrl.value = await toPng(el.value!)
  useMask.value = true
  await nextTick()
  dataUrlMasked.value = await toPng(el.value!)
  useMask.value = p
  show.value = false
}

onMounted(() => render())

async function download() {
  const { saveAs } = await import('~/async/exportImage')
  saveAs(useMask.value ? dataUrlMasked.value : dataUrl.value, `${t('name')} ${dayNoHanzi.value}.png`)
}
</script>

<template>
  <div v-if="isMobile" op50 mb4>
    {{ t('press-and-download-image') }}
  </div>
  <img :src="useMask ? dataUrlMasked : dataUrl" w-80 min-h-10 border="~ base rounded" shadow>

  <div flex="~ gap-2">
    <button v-if="!isIOS" my4 flex="~ center gap-1" border="~ base" p="x2 y1" @click="download()">
      <div i-carbon-download />
      {{ t('download') }}
    </button>

    <ToggleMask />
  </div>

  <div v-if="show" fixed style="left: 200vw; top: 200vh">
    <div ref="el" flex="~ col gap-2" items-center p="x6 y4" bg-base relative>
      <AppName class="!text-3xl" />
      <div text-xs mt--1 mb2 op50 ws-nowrap>
        handle.antfu.me
      </div>

      <WordBlocks v-for="w,i of tries" :key="i" :word="w" :revealed="true" :animate="false" />
      <ResultFooter :day="true" />
    </div>
  </div>
</template>
