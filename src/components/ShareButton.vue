<script setup lang="ts">
import { answer, dayNo } from '~/state'
import { meta, tries } from '~/storage'
import { parseWord, testAnswer } from '~/utils'

const text = computed(() =>
  `汉兜 ${dayNo.value} ${meta.value.answer ? 'X' : tries.value.length}/10\n${
    tries.value
      .map(word => testAnswer(parseWord(word, answer.value.word))
        .map((i) => {
          if (i.char === 'exact')
            return '🟩'
          if (i.char === 'misplaced')
            return '🟧'
          if ([i.one, i.two].includes('exact'))
            return '🟡'
          return '⬜️'
        })
        .join(''))
      .join('\n')}\nhttps://handle.antfu.me`,
)
const share = useShare(computed(() => ({
  title: '汉兜',
  text: text.value,
})))
const clipboard = useClipboard()

const shareDialog = ref(false)

function start() {
  if (share.isSupported) {
    share.share()
  }
  else {
    shareDialog.value = true
    clipboard.copy(text.value)
  }
}
</script>

<template>
  <button btn flex items-center justify-center gap-3 text-xl font-serif p="x4 y2" @click="start()">
    <div i-carbon-share />
    分享
  </button>
  <Modal v-model="shareDialog" direction="top">
    <div flex="~ col" p5 items-center>
      <p text-xl font-serif mb4>
        <b>分享</b>
      </p>
      <p text-center mb4>
        你使用的浏览器似乎不支持弹窗分享，<br>以下内容已复制到你的剪贴板，你可以在其他平台贴上分享。
      </p>
      <pre text-left bg-gray-500:5 rounded p5 select-text mb4 style="line-height: 18px;letter-spacing: 1px;">{{ text }}</pre>
    </div>
  </Modal>
</template>
