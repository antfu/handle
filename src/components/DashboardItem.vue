<script setup lang="ts">
defineProps<{
  text: string
  value: string | number
}>()
</script>

<template>
  <div>
    <div text-3xl font>
      {{ value }}
    </div>
    <div op50 text-center>
      {{ text }}
    </div>
  </div>
</template>
