import { defineConfig, devices } from '@playwright/test';

/**
 * HW04 — Data-Driven Automation Testing
 * Playwright configuration for FR-01, FR-11, FR-14
 */
export default defineConfig({
  testDir: '../tests',
  timeout: 30_000,
  retries: 0,
  workers: 1,
  fullyParallel: false,

  reporter: [
    ['list'],
    ['html', { outputFolder: '../tests/playwright-report', open: 'never' }],
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
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
