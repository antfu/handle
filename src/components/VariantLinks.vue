<script setup lang="ts">
import { t } from '~/i18n'
</script>

<template>
  <div p5 flex="~ col center" class="variant-links">
    <p text-xl font-serif mb4>
      <b>{{ t('other-variants') }}</b>
    </p>
    <ul flex="~ col gap-3" text-left w-50 m2 list-disc>
      <li>
        <a href="https://pinyincaichengyu.com" target="_blank">拼音猜成语</a> - by <a href="https://twitter.com/_limboy">limboy</a>
      </li>
      <li>
        <a href="https://cheeaun.github.io/chengyu-wordle/" target="_blank">成语 Wordle</a> - by <a href="https://twitter.com/cheeaun">Chee Aun</a>
      </li>
      <li>
        <a href="https://apps.apple.com/cn/app/id1606194420" target="_blank">猜文字 (iOS)</a> - by <a href="https://twitter.com/OKJAKETO">Jinke Du</a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.variant-links a {
  color: var(--c-primary);
}
.variant-links a:hover {
  color: var(--c-primary-deep);
}
</style>
