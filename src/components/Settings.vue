<script setup lang="ts">
import { useZhuyin } from '~/storage'
</script>

<template>
  <div p6 flex="~ gap-4" justify-center>
    <label>
      <input v-model="useZhuyin" type="checkbox">
      注音
    </label>
    <!--TODO-->
    <label op50>
      <input type="checkbox" disabled>
      模糊音
      <sup>敬请期待</sup>
    </label>
  </div>
</template>
