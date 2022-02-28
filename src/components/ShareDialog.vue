<script setup lang="ts">
import { answer, dayNoHanzi, parseWord, showShareDialog, testAnswer } from '~/state'
import { meta, tries } from '~/storage'
import { t } from '~/i18n'

const isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)

const text = computed(() =>
  `${t('name')} ${dayNoHanzi.value.slice(0, -1)} ${meta.value.answer ? 'X' : tries.value.length}/10\n\n${
    tries.value
      .map((word) => {
        const parsed = parseWord(word, answer.value.word)
        return testAnswer(parsed)
          .map((i, idx) => {
            if (i.char === 'exact')
              return '🟩'
            if (i.char === 'misplaced')
              return '🟧'
            if (parsed[idx]._1 && i._1 === 'exact')
              return '🟠'
            if (parsed[idx]._2 && i._2 === 'exact')
              return '🟠'
            if (parsed[idx]._3 && i._3 === 'exact')
              return '🟠'
            if (i._1 === 'misplaced' || i._2 === 'misplaced' || i._3 === 'misplaced')
              return '🟡'
            return '⬜️'
          })
          .join('')
      })
      .join('\n')}\n\nhandle.antfu.me`,
)
const shareType = ref<'text' | 'image' | null>()
const share = useShare(computed(() => ({
  title: t('name'),
  text: text.value,
})))
const clipboard = useClipboard()
const copied = ref(false)

async function startShareText() {
  copied.value = false
  shareType.value = 'text'
  if (clipboard.isSupported) {
    await clipboard.copy(text.value)
    copied.value = true
  }
}

function startShareImage() {
  shareType.value = 'image'
}

watch(showShareDialog, (v) => {
  if (!v)
    reset()
})

function reset() {
  shareType.value = null
  copied.value = false
}

async function shareSystem() {
  if (share.isSupported && isMobile) {
    await share.share()
    return true
  }

  return false
}
</script>

<template>
  <div flex="~ col" p6 items-center relative>
    <div absolute top-4 right-4 flex="~">
      <button icon-btn @click="showShareDialog = false">
        <div i-carbon-close />
      </button>
    </div>

    <p text-xl font-serif mb4>
      <b>{{
        shareType === 'text'
          ? t('share-with-text')
          : shareType === 'image'
            ? t('download-as-image')
            : t('share')
      }}</b>
    </p>
    <template v-if="!shareType">
      <div>
        {{ t('select-share-method') }}
      </div>
      <div grid="~ cols-2 gap-2" my4>
        <button
          flex="~ col center" border="~ base" p4 op80 rounded class="hover:op100 hover:bg-gray:10"
          w-30 h-30
          @click="startShareText()"
        >
          <div i-carbon-text-creation text-10 op80 />
          <div>{{ t('share-with-text') }}</div>
        </button>
        <button
          flex="~ col center" border="~ base" p4 op80 rounded class="hover:op100 hover:bg-gray:10"
          w-30 h-30
          @click="startShareImage()"
        >
          <div i-carbon-image text-10 op80 />
          <div>{{ t('download-as-image') }}</div>
        </button>
      </div>
    </template>
    <template v-if="shareType === 'text'">
      <p text-center mb4 w-80>
        {{ copied ? t('share-copied'): t('share-not-copied') }}
      </p>
      <pre text-left bg-gray-500:5 rounded p5 select-text mb4 style="line-height: 18px;letter-spacing: 1px;">{{ text }}</pre>
      <button v-if="share.isSupported" my4 flex="~ center gap-1" border="~ base" p="x2 y1" @click="shareSystem()">
        <div i-carbon-share />
        {{ t('share-with-system-api') }}
      </button>
    </template>
    <template v-if="shareType === 'image'">
      <ExportImage />
    </template>
  </div>
</template>
