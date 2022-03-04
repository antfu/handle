<script setup lang="ts">
import { breakpoints, isDark, showCheatSheet, showDashboard, showFailed, showHelp, showHint, showPrivacyNotes, showSettings, showShareDialog, showVariants, useMask } from '~/state'
import { gamesCount } from '~/storage'

const toggleDark = useToggle(isDark)
const toggleSettings = useToggle(showSettings)
const toggleDashboard = useToggle(showDashboard)

function openHelp() {
  showHelp.value = true
  useMask.value = false
}

const lg = breakpoints.lg
</script>

<template>
  <nav border="b base" relative>
    <div absolute font-serif text-2xl left-0 right-0 top-0 bottom-0 z--1 tracking-2 flex>
      <AppName ma />
    </div>
    <div flex items-center justify-between md:max-w-md ma py4 px2>
      <div flex items-center>
        <button icon-btn mx2 @click="openHelp()">
          <div i-carbon-help />
        </button>
        <button v-if="gamesCount" icon-btn mx2 @click="toggleDashboard()">
          <div i-carbon-catalog />
        </button>
      </div>
      <div flex items-center>
        <button icon-btn mx2 @click="toggleSettings()">
          <div i-carbon-settings />
        </button>
        <button icon-btn mx2 @click="toggleDark()">
          <div i-carbon-sun dark:i-carbon-moon />
        </button>
      </div>
    </div>
  </nav>

  <Modal v-model="showCheatSheet" :direction="lg ? 'right' : 'top'" :mask="!lg">
    <CheatSheet />
  </Modal>
  <Modal v-model="showSettings" direction="top">
    <Settings my6 />
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
  <Modal v-model="showVariants" direction="top">
    <VariantLinks />
  </Modal>
  <Modal v-model="showPrivacyNotes" direction="top">
    <PrivacyNotes />
  </Modal>
  <Modal v-model="showShareDialog" direction="top">
    <ShareDialog />
  </Modal>
  <Modal v-model="showHelp" direction="top">
    <WelcomePage />
  </Modal>
</template>
