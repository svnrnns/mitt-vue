import dts from 'vite-plugin-dts';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

const PACKAGE_NAME = 'mitt-vue';
/**
 * Vite configuration for building the mitt-vue library.
 *
 * This configuration sets up Vite to build a distributable Vue library
 * that can be consumed via both ES Modules and CommonJS.
 *
 * @see https://vitejs.dev/guide/build.html#library-mode
 */
export default defineConfig({
  /**
   * Plugins used in the build process.
   *
   * @property {Plugin} vue - Enables Vue support including SFC transformation
   *                          and HMR during development.
   * @property {Plugin} dts - Generates TypeScript declaration files (.d.ts) from
   *                          source code. The `insertTypesEntry` option automatically
   *                          adds a "types" field to package.json exports.
   */
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      outputDir: 'dist',
      entryRoot: 'src',
    }),
  ],

  build: {
    /**
     * Library mode configuration.
     *
     * Configures Vite to build as a library rather than an application.
     * This changes the output to be consumable as an npm package.
     */
    lib: {
      /**
       * Entry point for the library.
       * All public exports should be re-exported from this file.
       */
      entry: 'src/index.ts',

      /**
       * Custom filename generator for output bundles.
       * - ES Module format: mitt-vue.js
       * - CommonJS format: mitt-vue.cjs
       *
       * @param format - The output format ('es' or 'cjs')
       * @returns The generated filename
       */
      fileName: (format) => `${PACKAGE_NAME}.${format === 'es' ? 'js' : 'cjs'}`,

      /**
       * Output formats to generate:
       * - "es": ES Modules (import/export) - for modern bundlers and browsers
       * - "cjs": CommonJS (require/module.exports) - for Node.js and legacy bundlers
       */
      formats: ['es', 'cjs'],
    },

    /**
     * Rollup-specific options.
     * Vite uses Rollup under the hood for production builds.
     */
    rollupOptions: {
      /**
       * External dependencies that should NOT be bundled.
       *
       * Vue is marked as external because:
       * 1. It is a peer dependency - consumers provide their own version
       * 2. Bundling Vue would cause version conflicts and duplicate Vue instances
       * 3. It significantly reduces the library bundle size
       */
      external: ['vue'],

      output: {
        /**
         * Global variable names for external dependencies.
         *
         * When the library is used via a <script> tag (UMD/IIFE),
         * these mappings tell Rollup which global variables correspond
         * to the external dependencies.
         *
         * Example: When code imports 'vue', it will reference window.Vue
         */
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
