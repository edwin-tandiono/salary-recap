import { reactRouter } from '@react-router/dev/vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths(), svgr()],
  server: {
    port: 8080,
  },
});
