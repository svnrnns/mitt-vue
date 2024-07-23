import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';

const packagename = 'mitt-vue';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: packagename,
      fileName: (format) => `${packagename}.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
});
