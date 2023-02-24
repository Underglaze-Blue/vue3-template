/* eslint-disable import/no-extraneous-dependencies */
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

import UnoCSS from '@unocss/vite';
import { presetAttributify, presetUno } from 'unocss';
import presetRemToPx from '@unocss/preset-rem-to-px';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
    }),
    UnoCSS({
      presets: [
        presetAttributify(),
        presetUno(),
        presetRemToPx({ baseFontSize: 4 }),
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/assets/styles/element/index.scss" as *;',
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://testsaas.imeduplus.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
