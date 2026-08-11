import { defineConfig, devices } from '@playwright/test';

/**
 * HW04 — ENV-01 Smoke Test Configuration
 * Used only for the environment verification smoke test.
 */
export default defineConfig({
  testDir: '.',
  timeout: 30_000,
  retries: 0,
  workers: 1,

  reporter: [['list']],

  use: {
    headless: true,
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
