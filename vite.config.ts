import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';
import ViteYaml from '@modyfi/vite-plugin-yaml';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: 'app/public',
  plugins: [
    dts({
      include: ['lib/**/*'],
      exclude: ['lib/**/*.{test,spec}.*'],
      tsconfigPath: './tsconfig.build.json',
      rollupTypes: true,
    }),
    tsconfigPaths(),
    ViteYaml(),
  ],
  build: {
    lib: {
      entry: { main: resolve(__dirname, 'lib/main.ts'), locales: resolve(__dirname, 'lib/locales.ts') },
      name: '@newhorizons/core',
      formats: ['es'],
    },
  },
});
