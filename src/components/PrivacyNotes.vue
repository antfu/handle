<script setup lang="ts">
import { t } from '~/i18n'
import { acceptCollecting } from '~/storage'
import { showPrivacyNotes } from '~/state'

function close() {
  showPrivacyNotes.value = false
}
</script>

<template>
  <div p5 flex="~ col center" relative>
    <div absolute top-4 right-4 flex="~ gap-3">
      <button icon-btn @click="close">
        <div i-carbon-close />
      </button>
    </div>

    <p text-xl font-serif mb6>
      <b>{{ t('privacy-notes') }}</b>
    </p>
    <div flex="~ col gap-4 center">
      <p max-w-115>
        为了提供更好的游戏体验，我们会以<b>完全匿名的形式</b>收集与统计一些游戏相关的信息。其中包含
      </p>
      <p>
        <ul text-left ml4 leading="2em">
          <li>您输入的词语</li>
          <li>游戏次数与结果</li>
          <li>查看提示与否</li>
          <li>您所使用的输入方案</li>
          <li>游戏开始与结束的时间</li>
        </ul>
      </p>
      <p max-w-115>
        以上收集到的信息将会用于调整与改进未来题目的难易度与游戏体验，同时也会用于展示每日世界胜率供玩家参考。
      </p>
      <div h-1px w-10 border="b base" m4 />
      <p>
        若您不希望这些信息被收集，您可以通过下面的按钮关闭。
      </p>
      <div>
        <button
          square-btn relative
          :class="acceptCollecting ? 'text-primary' : 'op80' "
          @click="acceptCollecting = !acceptCollecting"
        >
          <div :class="acceptCollecting ? 'i-carbon-checkbox-checked': 'i-carbon-checkbox'" />
          {{ t('send-game-data-button') }}
        </button>
      </div>
    </div>
  </div>
</template>
