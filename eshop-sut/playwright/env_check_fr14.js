const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  // Ensure the screenshots directory exists
  const screenshotDir = path.join(__dirname, '../tests/FR14/screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log('[ENV-01] Navigating to http://localhost:5174/ (Admin Portal)...');
    await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' });
    
    // Capture login page
    await page.screenshot({ path: path.join(screenshotDir, 'ENV-01-login-page.png'), fullPage: true });
    console.log('[ENV-01] ✔ Login page screenshot captured.');

    // Login
    console.log('[ENV-01] Logging in as admin...');
    await page.locator('input[placeholder="Email"]').fill('admin@eshop.com');
    
    // Try admin123 first (per setup_guide.md)
    await page.locator('input[placeholder="Password"]').fill('admin123');
    
    // Setup dialog handler to detect incorrect login alert
    let dialogShown = false;
    let dialogMsg = '';
    page.on('dialog', async dialog => {
      dialogShown = true;
      dialogMsg = dialog.message();
      console.log('[ENV-01] Dialog shown:', dialogMsg);
      await dialog.dismiss();
    });

    await page.click('button:has-text("Login")');
    await page.waitForTimeout(2000); // Wait to see if alert shows or if we log in successfully

    if (dialogShown) {
      console.log(`[ENV-01] Login with admin123 failed (Message: "${dialogMsg}"). Trying Admin123!...`);
      dialogShown = false;
      await page.locator('input[placeholder="Password"]').fill('Admin123!');
      await page.click('button:has-text("Login")');
      await page.waitForTimeout(2000);
    }

    // Verify dashboard heading is visible
    const dashboardHeading = await page.locator('h2:has-text("Dashboard")').isVisible();
    if (!dashboardHeading) {
      throw new Error('Failed to login or reach Dashboard. Current URL: ' + page.url());
    }
    
    await page.screenshot({ path: path.join(screenshotDir, 'ENV-01-dashboard.png'), fullPage: true });
    console.log('[ENV-01] ✔ Logged in and dashboard screenshot captured.');

    // Go to Category Management
    console.log('[ENV-01] Navigating to "Danh mục" tab...');
    await page.click('li:has-text("Danh mục")');
    await page.waitForTimeout(1000);
    
    // Verify heading
    const catHeading = await page.locator('h2:has-text("Quản lý Danh mục")').isVisible();
    console.log('[ENV-01] "Quản lý Danh mục" visible:', catHeading);

    // Capture Category page
    await page.screenshot({ path: path.join(screenshotDir, 'ENV-01-categories-page.png'), fullPage: true });
    console.log('[ENV-01] ✔ Categories page screenshot captured.');

  } catch (err) {
    console.error('[ENV-01] Error during env check:', err.message);
    process.exit(1);
  } finally {
    await browser.close();
    console.log('[ENV-01] Environment check script finished.');
  }
})();
