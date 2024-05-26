/// <reference types="vitest" />
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import ViteYaml from '@modyfi/vite-plugin-yaml';

export default defineConfig({
  plugins: [tsconfigPaths(), ViteYaml()],
  test: {
    setupFiles: ['./tests/vitest/vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      all: true,
      include: ['lib/**/*.ts'],
      exclude: ['lib/index.ts', '**/*types.ts'],
      reportsDirectory: 'reports/vitest/coverage',
      reporter: ['text', 'cobertura'],
    },
  },
});
