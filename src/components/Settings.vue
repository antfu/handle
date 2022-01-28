<script setup lang="ts">
import { bopomofo } from '~/storage'
</script>

<template>
  <div p6 flex="~ gap-4" justify-center>
    <label>
      <input v-model="bopomofo" type="checkbox">
      注音
    </label>
    <!--TODO-->
    <label op50>
      <input type="checkbox" disabled>
      模糊音
    </label>
  </div>
</template>
