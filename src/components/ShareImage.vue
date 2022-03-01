<script setup lang="ts">
import { dayNoHanzi, isIOS, isMobile, useMask } from '~/state'
import { tries } from '~/storage'
import { t } from '~/i18n'

const el = ref<HTMLDivElement>()
const show = ref(false)
const showDialog = ref(false)
const dataUrlUnmasked = ref('')
const dataUrlMasked = ref('')

const dataUrl = computed(() => useMask.value ? dataUrlMasked.value : dataUrlUnmasked.value)

async function render() {
  show.value = true
  const { toPng } = await import('~/async/exportImage')
  await nextTick()
  await nextTick()
  showDialog.value = true
  const p = useMask.value
  useMask.value = false
  await nextTick()
  dataUrlUnmasked.value = await toPng(el.value!)
  useMask.value = true
  await nextTick()
  dataUrlMasked.value = await toPng(el.value!)
  useMask.value = p
  show.value = false
}

onMounted(() => render())

async function download() {
  const { saveAs } = await import('~/async/exportImage')
  saveAs(dataUrl.value, `${t('name')} ${dayNoHanzi.value}${useMask.value ? ' 遮罩' : ''}.png`)
}
</script>

<template>
  <div v-if="isMobile" op50 mb4>
    {{ t('press-and-download-image') }}
  </div>
  <img v-if="dataUrl" :src="dataUrl" w-80 min-h-10 border="~ base rounded">
  <div v-else w-80 border="~ base rounded" p4 animate-pulse>
    {{ t('rendering') }}
  </div>

  <div flex="~ gap-2" py4>
    <button v-if="!isIOS" square-btn flex-gap-1 @click="download()">
      <div i-carbon-download />
      {{ t('download') }}
    </button>

    <ToggleMask />
  </div>

  <div v-if="show" fixed style="left: 200vw; top: 200vh">
    <div ref="el" flex="~ col" items-center p="x6 y4" bg-base relative>
      <AppName />
      <div text-xs mt1 mb3 op50 ws-nowrap>
        handle.antfu.me
      </div>

      <WordBlocks v-for="w,i of tries" :key="i" :word="w" :revealed="true" :animate="false" />
      <ResultFooter :day="true" mt3 />
    </div>
  </div>
</template>
