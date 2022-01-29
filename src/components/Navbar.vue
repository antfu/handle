<script setup lang="ts">
import { isDark, showFailed, showHelp, showHint, showSettings } from '~/state'

const toggleDark = useToggle(isDark)
const toggleSettings = useToggle(showSettings)
const toggleHelp = useToggle(showHelp)
</script>

<template>
  <nav p4 border="b base" flex="~" justify-between items-center relative>
    <div absolute font-serif text-2xl left-0 right-0 z--1>
      汉兜
    </div>
    <div flex="~ gap-4" items-center>
      <button class="icon-btn" @click="toggleHelp()">
        <div i-carbon-help />
      </button>
    </div>
    <div flex="~ gap-4" items-center>
      <button class="icon-btn" @click="toggleSettings()">
        <div i-carbon-settings />
      </button>

      <button class="icon-btn" @click="toggleDark()">
        <div i-carbon-sun dark:i-carbon-moon />
      </button>
    </div>
  </nav>

  <Modal v-model="showSettings" direction="top">
    <Settings />
  </Modal>
  <Modal v-model="showHelp" direction="top">
    <WelcomePage />
  </Modal>
  <Modal v-model="showHint" direction="top">
    <Hint />
  </Modal>
  <Modal v-model="showFailed" direction="top">
    <FailedPage />
  </Modal>
</template>
