<script setup lang="ts">
import { dayNo } from '~/state'
import { meta, tries } from '~/storage'
import { t } from '~/i18n'

const el = ref<HTMLDivElement>()
const show = ref(false)

async function save() {
  show.value = true
  const { toPng } = await import('html-to-image')
  const { saveAs } = await import('file-saver')
  await nextTick()
  await nextTick()
  const datauri = await toPng(el.value!)
  saveAs(datauri, `Handle D${dayNo.value}.png`)
  show.value = false
}
</script>

<template>
  <button icon-btn text-sm pb2 gap-1 flex="~ center" @click="save()">
    <div i-carbon-download /> 下载为图片
  </button>
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
