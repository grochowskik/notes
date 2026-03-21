import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    exclude: ['**/node_modules/**', '**/e2e/**'],
    env: {
      TZ: 'UTC',
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.styles.ts',
        'src/**/index.ts',
        'src/providers/**',
        'src/lib/**',
        'src/config/**',
        'src/app/**/page.tsx',
        'src/app/layout.tsx',
        'src/app/globals.css',
        'src/tests/**',
        'src/redux/store.ts',
      ],
    },
  },
});
