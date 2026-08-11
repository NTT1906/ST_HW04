# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FR01\scripts\fr01_registration.spec.js >> FR-01 — Account Registration (Data-Driven) >> TC001: Successful registration with all valid inputs
- Location: tests\FR01\scripts\fr01_registration.spec.js:35:9

# Error details

```
TimeoutError: page.waitForURL: Timeout 5000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
============================================================
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - link "EShop" [ref=e5] [cursor=pointer]:
      - /url: /
    - navigation [ref=e6]:
      - link "Giỏ hàng" [ref=e7] [cursor=pointer]:
        - /url: /cart
      - link "Đăng nhập" [ref=e8] [cursor=pointer]:
        - /url: /login
      - link "Đăng ký" [ref=e9] [cursor=pointer]:
        - /url: /register
  - main [ref=e10]:
    - generic [ref=e11]:
      - heading "Đăng Ký Tài Khoản" [level=2] [ref=e12]
      - generic [ref=e13]: Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT.
      - generic [ref=e14]:
        - generic [ref=e15]:
          - generic [ref=e16]: Họ Tên
          - textbox [ref=e17]: Nguyen Van A
        - generic [ref=e18]:
          - generic [ref=e19]: Email
          - textbox [ref=e20]: testuser01@example.com
        - generic [ref=e21]:
          - generic [ref=e22]: Mật khẩu
          - textbox [ref=e23]: Password1!
          - paragraph [ref=e24]: "Yêu cầu: Tối thiểu 8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt."
        - button "Đăng Ký" [active] [ref=e25] [cursor=pointer]
        - generic [ref=e26]:
          - text: Đã có tài khoản?
          - link "Đăng nhập" [ref=e27] [cursor=pointer]:
            - /url: /login
  - contentinfo [ref=e28]: © 2026 EShop SUT. Dành cho mục đích kiểm thử.
```

# Test source

```ts
  1  | /**
  2  |  * FR-01 — Account Registration Data-Driven Test Automation
  3  |  * 
  4  |  * Target Feature: FR-01 (Account Registration)
  5  |  * Data Source: ../data/registration_data.json
  6  |  * Minimum Cases Required: 12 (16 Candidate Cases Implemented: TC001-TC013, BVA-TC001-BVA-TC003)
  7  |  */
  8  | 
  9  | import { test, expect } from '@playwright/test';
  10 | import fs from 'fs';
  11 | import path from 'path';
  12 | 
  13 | // Load external JSON test data
  14 | const dataPath = path.resolve(__dirname, '../data/registration_data.json');
  15 | const testCases = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  16 | 
  17 | test.describe('FR-01 — Account Registration (Data-Driven)', () => {
  18 | 
  19 |   // Seed pre-existing user before running TC007 duplicate email test
  20 |   test.beforeAll(async ({ request }) => {
  21 |     try {
  22 |       await request.post('http://localhost:3000/api/register', {
  23 |         data: {
  24 |           name: 'Existing User Preseed',
  25 |           email: 'existing_user@example.com',
  26 |           password: 'Password1! '
  27 |         }
  28 |       });
  29 |     } catch (e) {
  30 |       // Ignore if user already exists
  31 |     }
  32 |   });
  33 | 
  34 |   for (const tc of testCases) {
  35 |     test(`${tc.tc_id}: ${tc.title}`, async ({ page }) => {
  36 |       // Navigate to Registration Page
  37 |       await page.goto('http://localhost:5173/register');
  38 |       await expect(page).toHaveURL(/register/);
  39 | 
  40 |       // Locate form input fields
  41 |       const inputs = page.locator('form input');
  42 |       const nameInput = inputs.nth(0);
  43 |       const emailInput = inputs.nth(1);
  44 |       const passwordInput = inputs.nth(2);
  45 |       const submitButton = page.locator('button[type="submit"]');
  46 | 
  47 |       // Fill form with external test data
  48 |       if (tc.name !== undefined) await nameInput.fill(tc.name);
  49 |       if (tc.email !== undefined) await emailInput.fill(tc.email);
  50 |       if (tc.password !== undefined) await passwordInput.fill(tc.password);
  51 | 
  52 |       // Submit form
  53 |       await submitButton.click();
  54 | 
  55 |       // Assertions based on expected status
  56 |       if (tc.expected_status === 'success') {
  57 |         // Successful registration redirects to /login page
> 58 |         await page.waitForURL(/login/, { timeout: 5000 });
     |                    ^ TimeoutError: page.waitForURL: Timeout 5000ms exceeded.
  59 |         await expect(page).toHaveURL(/login/);
  60 |       } else {
  61 |         // Failed registration displays error message alert block or stays on /register
  62 |         // Verify URL remains on register or error message is rendered
  63 |         const errorAlert = page.locator('div.bg-red-100');
  64 |         
  65 |         // Wait briefly for potential client/server error state update
  66 |         await page.waitForTimeout(500);
  67 | 
  68 |         // Multiple distinct assertion patterns:
  69 |         // Pattern 1: Page URL assertion (does not navigate away)
  70 |         expect(page.url()).toContain('/register');
  71 | 
  72 |         // Pattern 2: Error box visibility or input validity check
  73 |         const isErrorVisible = await errorAlert.isVisible();
  74 |         if (isErrorVisible) {
  75 |           await expect(errorAlert).toBeVisible();
  76 |           const errorText = await errorAlert.innerText();
  77 |           expect(errorText.length).toBeGreaterThan(0);
  78 |         }
  79 |       }
  80 |     });
  81 |   }
  82 | 
  83 | });
  84 | 
```