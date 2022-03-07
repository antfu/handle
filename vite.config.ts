/// <reference types="vitest" />

import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  define: {
    'import.meta.vitest': 'false',
  },
  plugins: [
    Vue(),
    AutoImport({
      imports: [
        'vue',
        '@vueuse/core',
      ],
      dts: true,
    }),
    Components({
      dts: true,
    }),
    Unocss(),
  ],
  test: {
    includeSource: ['packages/*/src/**/*.ts'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('locale'))
            return 'locale'
          if (id.includes('idioms.txt'))
            return 'idioms'
          if (id.includes('polyphones.json'))
            return 'polyphones'
          if (id.includes('node_modules') && !id.endsWith('.css'))
            return 'vendor'
        },
      },
    },
  },
})
