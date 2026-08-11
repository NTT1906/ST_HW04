const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // 1. Navigate to login page
  await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle' });
  await page.screenshot({ path: '../tests/FR11/screenshots/ENV-01-login-page.png', fullPage: true });
  console.log('[ENV-01] Login page captured.');

  // 2. Login with a registered user
  await page.fill('input[type="email"], input[name="email"]', 'user@example.com');
  await page.fill('input[type="password"], input[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  await page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => { });
  await page.screenshot({ path: '../tests/FR11/screenshots/ENV-01-after-login.png', fullPage: true });
  console.log('[ENV-01] After-login page captured. Current URL:', page.url());

  // 3. Navigate to Profile page to find Order History
  await page.goto('http://localhost:5173/profile', { waitUntil: 'networkidle' });
  await page.screenshot({ path: '../tests/FR11/screenshots/ENV-01-profile-page.png', fullPage: true });
  console.log('[ENV-01] Profile page captured. Current URL:', page.url());

  // 4. Print page title and visible text for inspection
  const title = await page.title();
  const bodyText = await page.evaluate(() => document.body.innerText.substring(0, 500));
  console.log('[ENV-01] Page title:', title);
  console.log('[ENV-01] Visible text (first 500 chars):\n', bodyText);

  await browser.close();
  console.log('[ENV-01] Environment check complete.');
})();
