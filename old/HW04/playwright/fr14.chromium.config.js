import { defineConfig, devices } from '@playwright/test';

/**
 * FR-14 — Category Management (CRUD Admin)
 * Per-feature per-browser config: CHROMIUM
 * Student ID: 23127255
 */
export default defineConfig({
  testDir: '../tests/FR14/scripts',
  timeout: 60_000,
  retries: 0,
  workers: 1,
  fullyParallel: false,

  metadata: {
    'Run by': '23127255',
    'Student ID': '23127255',
    'Feature': 'FR-14 — Category Management (CRUD Admin)',
    'Browser': 'chromium',
    'Executed at': new Date().toISOString(),
  },

  reporter: [
    ['list'],
    ['html', { outputFolder: '../tests/FR14/reports/chromium', open: 'never' }],
  ],

  use: {
    baseURL: 'http://localhost:5174',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'off',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
