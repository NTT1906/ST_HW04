import { defineConfig, devices } from '@playwright/test';

/**
 * FR-11 — Order History View (User)
 * Per-feature per-browser config: FIREFOX
 * Student ID: 23127255
 */
export default defineConfig({
  testDir: '../tests/FR11/scripts',
  timeout: 60_000,
  retries: 0,
  workers: 1,
  fullyParallel: false,

  metadata: {
    'Run by': '23127255',
    'Student ID': '23127255',
    'Feature': 'FR-11 — Order History View (User)',
    'Browser': 'firefox',
    'Executed at': new Date().toISOString(),
  },

  reporter: [
    ['list'],
    ['html', { outputFolder: '../tests/FR11/reports/firefox', open: 'never' }],
  ],

  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'off',
  },

  projects: [
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});
