/**
 * HW04 ENV-01 Smoke Test
 * Verifies automation connectivity to the EShop SUT:
 *   - Frontend Web is reachable
 *   - Registration page is accessible
 *   - Login page is accessible
 *   - Frontend Admin is reachable
 *   - Backend API (/api/categories) returns 200
 */
import { test, expect } from '@playwright/test';

test.describe('ENV-01 Smoke Test', () => {

  test('Frontend Web is reachable', async ({ page }) => {
    const response = await page.goto('http://localhost:5173/');
    expect(response?.status()).toBe(200);
    await page.screenshot({ path: '../tests/FR01/screenshots/ENV-homepage.png' });
  });

  test('Registration page is accessible', async ({ page }) => {
    await page.goto('http://localhost:5173/register');
    await expect(page).toHaveURL(/register/);
    await page.screenshot({ path: '../tests/FR01/screenshots/ENV-register-page.png' });
  });

  test('Login page is accessible', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await expect(page).toHaveURL(/login/);
    await page.screenshot({ path: '../tests/FR11/screenshots/ENV-login-page.png' });
  });

  test('Frontend Admin is reachable', async ({ page }) => {
    const response = await page.goto('http://localhost:5174/');
    expect(response?.status()).toBe(200);
    await page.screenshot({ path: '../tests/FR14/screenshots/ENV-admin-page.png' });
  });

  test('Backend API /api/categories returns 200', async ({ request }) => {
    const response = await request.get('http://localhost:3000/api/categories');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
  });

  test('Regular user login works', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    // Source: Login.jsx — both inputs are type="text", no id/name attrs.
    // First input is the email field (labeled "Username"), second is password.
    // Verified credentials: test@eshop.com / Test1234! (role=user)
    const inputs = page.locator('form input');
    await inputs.nth(0).fill('test@eshop.com');
    await inputs.nth(1).fill('Test1234!');
    await page.click('button[type="submit"]');
    // After login, should redirect to homepage
    await page.waitForURL(url => !url.pathname.includes('/login'), { timeout: 8000 });
    await page.screenshot({ path: '../tests/FR11/screenshots/ENV-user-logged-in.png' });
  });

  test('Admin user login works', async ({ page }) => {
    await page.goto('http://localhost:5174/');
    // Source: frontend-admin App.jsx — email input has placeholder="Email",
    // password input has placeholder="Password" and type="password".
    // Verified credentials: admin@eshop.com / Admin123! (role=admin)
    await page.fill('input[placeholder="Email"]', 'admin@eshop.com');
    await page.fill('input[placeholder="Password"]', 'Admin123!');
    await page.click('button:has-text("Login")');
    // After login, admin dashboard is shown — sidebar with "EShop Admin" heading appears
    await page.waitForSelector('h1:has-text("EShop Admin")', { timeout: 8000 });
    await page.screenshot({ path: '../tests/FR14/screenshots/ENV-admin-logged-in.png' });
  });

});
