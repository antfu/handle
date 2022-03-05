<script setup lang="ts">
import {
  breakpoints,
  showCheatSheet,
  showDashboard,
  showFailed,
  showHelp,
  showHint,
  showPrivacyNotes,
  showSettings,
  showShareDialog,
  showVariants,
} from '~/state'

const lg = breakpoints.lg
</script>

<template>
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
  <Modal v-model="showShareDialog" direction="top">
    <ShareDialog />
  </Modal>
  <Modal v-model="showHelp" direction="top">
    <WelcomePage />
  </Modal>
  <Modal v-model="showVariants" direction="top">
    <VariantLinks />
  </Modal>
  <Modal v-model="showPrivacyNotes" direction="top">
    <PrivacyNotes />
  </Modal>
</template>
