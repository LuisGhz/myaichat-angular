import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test-setup.ts',
    include: ['src/**/*.spec.ts', 'src/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
    // Disable teardown timeout to allow async operations to complete
    teardownTimeout: 5000,
    // Suppress console output for known harmless warnings
    onConsoleLog(log) {
      // Suppress NG0406 and NG0205 warnings which occur when async operations complete after test cleanup
      if (log.includes('NG0406') || log.includes('NG0205')) {
        return false;
      }
      return true;
    },
  },
});
