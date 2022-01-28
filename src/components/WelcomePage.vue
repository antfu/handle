<script setup lang="ts">
import { showHelp } from '~/state'
import { parseWord } from '~/utils'
import { initialized } from '~/storage'

function start() {
  showHelp.value = false
  initialized.value = true
}
</script>

<template>
  <div p6 flex="~ col gap-2" items-center max-h-screen h-screen overflow-auto>
    <div text-2xl>
      汉兜
    </div>

    <div h-1px w-10 border="b base" m4 />

    <p><b>游戏规则</b></p>

    <p>你有十次的机会猜一四字成语。</p>
    <p>每次猜测后，拼音与汉字的颜色会指示你的猜测与正确答案的距离。</p>
    <div h-1px w-10 border="b base" m4 />

    <Sentence :word="'班门弄斧'" :revealed="true" :answer="parseWord(' 门  ')" />
    <p>第二个字 <b text-green-500>门</b> 为绿色，表示其出现在成语中且在正确的位置。</p>

    <Sentence :word="'仓颉造字'" :revealed="true" :answer="parseWord('   仓')" />
    <p>第一个字 <b text-orange-400>仓</b> 为橙色，表示其出现在成语，但不在第成语的第一个字。</p>

    <Sentence :word="'巧夺天工'" :revealed="true" :answer="parseWord('桥它拖 ')" />
    <p max-w-130>
      每个字的 <b>字</b>、<b>声母</b>、<b>韵母</b>、<b>声调</b> 都会独立进行颜色的指示。<br>例如，第一个 <b>巧</b> 字面为灰色，但其声母韵母均为绿色，代表该位置的正确答案为其同音字但非 <b>巧</b> 字本身。<br>同理，第二个字中韵母 <code>ou</code> 为橙色，代表其韵母出现在四个字之中，但非第二个字。以此类推。
    </p>

    <Sentence :word="'武运昌隆'" :revealed="true" :answer="parseWord('武运昌隆')" />
    <p max-w-130>
      当四字个都为绿色时，你便赢得了游戏！
    </p>

    <div h-1px w-10 border="b base" m4 />

    <button class="btn" @click="start()">
      开始游戏
    </button>

    <div h-1px w-10 border="b base" m4 />
    <div op50>
      heavily inspired by <a underline href="https://www.powerlanguage.co.uk/wordle/" target="_blank">Wordle</a>
    </div>
    <div op50>
      made by
      <a underline href="https://twitter.com/antfu7" target="_blank">Anthony</a>
      &
      <a underline href="https://twitter.com/iiiiiiines_____" target="_blank">Inès</a>
    </div>
  </div>
</template>
