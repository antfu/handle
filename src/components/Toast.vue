<script setup lang="ts">
defineProps<{
  modelValue?: boolean
}>()
</script>

<template>
  <div
    fixed top-0 left-0 right-0 pointer-events-none transition-all flex="~ center"
    :class="modelValue ? '' : 'translate-y--10px op0'"
  >
    <slot />
  </div>
</template>
