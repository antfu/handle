<script setup lang="ts">
import { isDark, showCheatSheet, showDashboard, showFailed, showHelp, showHint, showSettings, showVariants, useMask } from '~/state'
import { gamesCount } from '~/storage'
import { t } from '~/i18n'

const toggleDark = useToggle(isDark)
const toggleSettings = useToggle(showSettings)
const toggleDashboard = useToggle(showDashboard)

function openHelp() {
  showHelp.value = true
  useMask.value = false
}
</script>

<template>
  <nav border="b base" relative>
    <div absolute font-serif text-2xl left-0 right-0 top-0 bottom-0 z--1 tracking-2 flex>
      <div ma leading-1em>
        {{ t('name') }}
      </div>
    </div>
    <div flex="~" items-center justify-between md:max-w-md ma p4>
      <div flex="~ gap-4" items-center>
        <button class="icon-btn" @click="openHelp()">
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
  <Modal v-model="showVariants" direction="top">
    <VariantLinks />
  </Modal>
  <Modal v-model="showCheatSheet" direction="top">
    <CheatSheet />
  </Modal>
</template>
