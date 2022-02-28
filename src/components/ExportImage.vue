<script setup lang="ts">
import { dayNo, useMask } from '~/state'
import { tries } from '~/storage'
import { t } from '~/i18n'

const isIOS = /iPad|iPhone|iPod/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

const el = ref<HTMLDivElement>()
const show = ref(false)
const showDialog = ref(false)
const dataUrl = ref('')
const dataUrlMasked = ref('')

async function save() {
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

async function download() {
  const { saveAs } = await import('~/async/exportImage')
  saveAs(useMask.value ? dataUrlMasked.value : dataUrl.value, `${t('name')} D${dayNo.value}.png`)
}
</script>

<template>
  <button icon-btn text-sm pb2 gap-1 flex="~ wrap center" @click="save()">
    <div i-carbon-download /> {{ t('download-as-image') }}
  </button>
  <Modal v-model="showDialog" direction="top">
    <div flex="~ col center gap-4" p6 relative>
      <div absolute top-4 right-4 flex="~ gap-3">
        <button icon-btn @click="showDialog = false">
          <div i-carbon-close />
        </button>
      </div>
      <p text-xl font-serif>
        <b>{{ t('download-as-image') }}</b>
      </p>
      <div v-if="isIOS" op50>
        {{ t('press-and-download-image') }}
      </div>
      <img :src="useMask ? dataUrlMasked : dataUrl" sm:w-80 border="~ base rounded" shadow>
      <button v-if="!isIOS" flex="~ center gap-1" border="~ base" p="x2 y1" @click="download()">
        <div i-carbon-download />
        {{ t('download') }}
      </button>
      <ToggleMask />
    </div>
  </Modal>
  <div v-if="show" fixed style="left: 200vw; top: 200vh">
    <div ref="el" flex="~ col gap-2" items-center p="x6 y4" bg-base>
      <div text-2xl font-serif tracking-widest ws-nowrap>
        {{ t('name') }}
      </div>
      <div text-sm mb2 op50 mt--1 ws-nowrap>
        handle.antfu.me
      </div>

      <WordBlocks v-for="w,i of tries" :key="i" :word="w" :revealed="true" :animate="false" />
      <ResultFooter />
    </div>
  </div>
</template>
