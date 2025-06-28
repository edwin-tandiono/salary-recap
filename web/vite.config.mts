// https://github.com/import-js/eslint-plugin-import/issues/2132
/* eslint-disable import/no-unresolved */

import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths()],
  server: {
    port: 8080,
  },
});
