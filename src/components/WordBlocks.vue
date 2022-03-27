<script setup lang="ts">
import { parseWord, parsedAnswer, testAnswer, answer as todayAnswer } from '~/state'
import { WORD_LENGTH } from '~/logic'

const props = withDefaults(
  defineProps<{
    word: string
    revealed?: boolean
    answer?: string
    animate?: boolean
  }>(), {
    animate: true,
  },
)

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
  <div flex>
    <div
      v-for="c,i in parseWord(word.padEnd(WORD_LENGTH, ' '), answer || todayAnswer.word)" :key="i"
      w-20 h-20 m1
      :class="['tile', flip ? 'revealed': '']"
    >
      <template v-if="animate">
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
      </template>
      <template v-else>
        <CharBlock :char="c" :answer="result[i]" />
      </template>
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
