/// <reference types="vitest" />

import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import type { Theme } from '@unocss/preset-uno'
import { presetAttributify, presetIcons, presetUno } from 'unocss'
import Unocss from 'unocss/vite'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
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
    Unocss({
      shortcuts: [
        {
          'btn': 'px-4 py-1 rounded inline-block bg-primary text-white cursor-pointer tracking-wide op90 hover:op100 disabled:cursor-default disabled:bg-gray-600 disabled:!op50 disabled:pointer-events-none',
          'icon-btn': 'text-1.2em cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-primary disabled:pointer-events-none',
          'square-btn': 'flex flex-gap-2 items-center border border-base px2 py1 relative !outline-none',
          'square-btn-mark': 'absolute h-2 w-2 bg-primary -right-0.2rem -top-0.2rem',

          'bg-base': 'bg-white dark:bg-[#121212]',
          'bg-overlay': 'bg-[#eee]:50 dark:bg-[#222]:50',
          'bg-header': 'bg-gray-500:5',
          'bg-active': 'bg-gray-500:8',
          'bg-hover': 'bg-gray-500:20',
          'border-base': 'border-gray-400:10',

          'tab-button': 'font-light op50 hover:op80 h-full px-4',
          'tab-button-active': 'op100 bg-gray-500:10',
        },
        [/^(flex|grid)-center/g, () => 'justify-center items-center'],
        [/^(flex|grid)-x-center/g, () => 'justify-center'],
        [/^(flex|grid)-y-center/g, () => 'items-center'],
      ],
      rules: [
        ['max-h-screen', { 'max-height': 'calc(var(--vh, 1vh) * 100)' }],
        ['h-screen', { height: 'calc(var(--vh, 1vh) * 100)' }],
      ],
      theme: <Theme>{
        colors: {
          'ok': 'var(--c-ok)',
          'primary': 'var(--c-primary)',
          'primary-deep': 'var(--c-primary-deep)',
          'mis': 'var(--c-mis)',
        },
      },
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          scale: 1.2,
        }),
      ],
    }),
  ],
  test: {
    environment: 'jsdom',
  },
})
