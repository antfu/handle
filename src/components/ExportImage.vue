<script setup lang="ts">
import { dayNo, useMask } from '~/state'
import { meta, tries } from '~/storage'
import { t } from '~/i18n'

const isIOS = /iPad|iPhone|iPod/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

const el = ref<HTMLDivElement>()
const show = ref(false)
const showDialog = ref(false)
const dataUrl = ref('')
const dataUrlMasked = ref('')

async function save() {
  show.value = true
  const { exportImage, toPng } = await import('~/async/exportImage')
  await nextTick()
  await nextTick()
  if (isIOS) {
    showDialog.value = true
    const p = useMask.value
    useMask.value = false
    await nextTick()
    dataUrl.value = await toPng(el.value!)
    useMask.value = true
    await nextTick()
    dataUrlMasked.value = await toPng(el.value!)
    useMask.value = p
  }
  else {
    await exportImage(el.value!, `${t('name')} D${dayNo.value}.png`)
  }
  show.value = false
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
      <div op50>
        {{ t('press-and-download-image') }}
      </div>
      <img :src="useMask ? dataUrlMasked : dataUrl" w-100 border="~ base rounded" shadow>
      <ToggleMask />
    </div>
  </Modal>
  <div v-if="show" fixed style="left: 200vw; top: 200vh">
    <div ref="el" flex="~ col gap-2" items-center p="x6 y4" bg-base>
      <div text-2xl mb2 font-serif tracking-widest>
        {{ t('name') }}
      </div>

      <WordBlocks v-for="w,i of tries" :key="i" :word="w" :revealed="true" :animate="false" />
      <div relative w-full op50 my1 text-sm>
        <div absolute text-sm left-0 bottom-0>
          D{{ dayNo }}
        </div>
        <div>handle.antfu.me</div>
        <div absolute text-sm right-0 bottom-0>
          {{ meta.answer ? 'X' : tries.length }}/10
        </div>
      </div>
    </div>
  </div>
</template>
