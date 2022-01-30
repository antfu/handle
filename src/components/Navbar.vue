<script setup lang="ts">
import { isDark, showDashboard, showFailed, showHelp, showHint, showSettings } from '~/state'
import { gamesCount } from '~/storage'
import { t } from '~/i18n'

const toggleDark = useToggle(isDark)
const toggleSettings = useToggle(showSettings)
const toggleHelp = useToggle(showHelp)
const toggleDashboard = useToggle(showDashboard)
</script>

<template>
  <nav p4 border="b base" flex="~" justify-between items-center relative>
    <div absolute font-serif text-2xl left-0 right-0 z--1 tracking-2>
      {{ t('name') }}
    </div>
    <div flex="~ gap-4" items-center>
      <button class="icon-btn" @click="toggleHelp()">
        <div i-carbon-help />
      </button>
      <button v-if="gamesCount" class="icon-btn" @click="toggleDashboard()">
        <div i-carbon-catalog />
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
  <Modal v-model="showDashboard" direction="top">
    <Dashboard />
  </Modal>
</template>
