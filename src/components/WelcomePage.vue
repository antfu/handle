<script setup lang="ts">
import { isDark, showHelp } from '~/state'
import { initialized } from '~/storage'

function start() {
  showHelp.value = false
  initialized.value = true
}
</script>

<template>
  <div p6 flex="~ col gap-2" items-center max-h-screen h-screen overflow-auto relative>
    <div absolute top-4 right-4>
      <button class="icon-btn" @click="isDark = !isDark">
        <div i-carbon-sun dark:i-carbon-moon />
      </button>
    </div>
    <div text-3xl font-serif>
      汉兜
    </div>
    <div mt--1 op50 text-sm>
      汉字 Wordle
    </div>

    <div h-1px w-10 border="b base" m4 />

    <p text-xl font-serif mb4>
      <b>游戏规则</b>
    </p>

    <p>你有十次的机会猜一个<b text-teal-600>四字词语</b>。</p>
    <p>每次猜测后，汉字与拼音的颜色将会标识其与正确答案的区别。</p>
    <div h-1px w-10 border="b base" m4 />

    <Sentence word="班门弄斧" :revealed="true" answer=" 门  " />
    <p>第二个字 <b text-teal-600>门</b> 为青色，表示其出现在答案中且在正确的位置。</p>

    <Sentence word="仓颉造字" :revealed="true" answer="   仓" />
    <p>第一个字 <b text-orange-400>仓</b> 为橙色，表示其出现在答案中，但并不是第一个字。</p>

    <Sentence word="巧夺天工" :revealed="true" answer="桥它拖 " />
    <p max-w-130>
      每个格子的 <b>汉字</b>、<b>声母</b>、<b>韵母</b>、<b>声调</b> 都会独立进行颜色的指示。<br>例如，第一个 <b>巧</b> 汉字为灰色，但其声母韵与母均为青色，代表该位置的正确答案为其同音字但非 <b>巧</b> 字本身。<br>同理，第二个字中韵母 <span>uo</span> 为橙色，代表其韵母出现在四个字之中，但非位居第二。以此类推。
    </p>

    <Sentence word="武运昌隆" :revealed="true" answer="武运昌隆" />
    <p>当四个格子都为青色时，你便赢得了游戏！</p>

    <div h-1px w-10 border="b base" m4 />

    <button btn tracking-widest p="x4 y2" @click="start()">
      开始游戏!
    </button>

    <div op50>
      *支持繁体输入与注音
    </div>

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
