<script setup lang="ts">
import { parseWord, parsedAnswer, testAnswer, answer as todayAnswer } from '~/state'
import { WORD_LENGTH } from '~/logic'

const props = defineProps<{
  word: string
  revealed?: boolean
  answer?: string
}>()

const result = computed(() => {
  if (props.revealed) {
    return testAnswer(
      parseWord(props.word),
      props.answer ? parseWord(props.answer) : parsedAnswer.value,
    )
  }
  return []
})

const flip = ref(false)

watchEffect(() => {
  if (props.revealed) {
    setTimeout(() => {
      flip.value = true
    }, Math.random() * 300)
  }
})
</script>

<template>
  <div flex gap-2>
    <div
      v-for="c,i in parseWord(word.padEnd(WORD_LENGTH, ' '), answer || todayAnswer.word)" :key="i"
      w-20
      h-20
      :class="['tile', flip ? 'revealed': '']"
    >
      <CharBlock
        class="front"
        :char="c"
        :style="{ transitionDelay: `${i * (300 + Math.random() * 50)}ms` }"
      />
      <CharBlock
        class="back"
        :char="c"
        :answer="result[i]"
        :style="{
          transitionDelay: `${i * (300 + Math.random() * 50)}ms`,
          animationDelay: `${i * (100 + Math.random() * 50)}ms`
        }"
      />
    </div>
  </div>
</template>

<style scoped>
.tile {
  user-select: none;
  position: relative;
}
.tile .front,
.tile .back {
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.6s;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.tile .back {
  transform: rotateY(180deg);
}
.tile.revealed .front {
  transform: rotateY(180deg);
}
.tile.revealed .back {
  transform: rotateY(0deg);
}
</style>
