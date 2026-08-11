# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr14_category.spec.js >> FR-14 — Category Management CRUD (Data-Driven) >> TC-DT-012: Expired or invalid token cannot access Category Management
- Location: ..\tests\FR14\scripts\fr14_category.spec.js:35:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 401
Received: 200
```

# Test source

```ts
  1   | /**
  2   |  * FR-14 — Category Management (CRUD) Data-Driven Test Automation
  3   |  * 
  4   |  * Target Feature: FR-14 (Category Management CRUD)
  5   |  * Data Source: ../data/category_data.json
  6   |  * Minimum Cases Required: 12 (13 Candidate Cases Implemented: TC-DT-001 through TC-DT-013)
  7   |  */
  8   | 
  9   | import { test, expect } from '@playwright/test';
  10  | import fs from 'fs';
  11  | import path from 'path';
  12  | 
  13  | // Load external JSON test data
  14  | const dataPath = path.resolve(__dirname, '../data/category_data.json');
  15  | const testCases = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  16  | 
  17  | test.describe('FR-14 — Category Management CRUD (Data-Driven)', () => {
  18  | 
  19  |   // Helper function to log in as admin on frontend-admin (port 5174)
  20  |   const loginAdmin = async (page, email, password) => {
  21  |     await page.goto('http://localhost:5174/');
  22  |     await page.fill('input[placeholder="Email"]', email);
  23  |     await page.fill('input[placeholder="Password"]', password);
  24  |     await page.click('button:has-text("Login")');
  25  |     await page.waitForSelector('h1:has-text("EShop Admin")', { timeout: 8000 });
  26  |   };
  27  | 
  28  |   // Helper function to navigate to Category tab
  29  |   const goToCategoryTab = async (page) => {
  30  |     await page.click('li:has-text("Danh mục")');
  31  |     await page.waitForSelector('h2:has-text("Quản lý Danh mục")', { timeout: 5000 });
  32  |   };
  33  | 
  34  |   for (const tc of testCases) {
  35  |     test(`${tc.tc_id}: ${tc.title}`, async ({ page, request }) => {
  36  | 
  37  |       // API Verification Tests (explicitly classified as API-level testing)
  38  |       if (tc.is_api_oriented_candidate) {
  39  |         if (tc.tc_id === 'TC-DT-009') {
  40  |           // Admin API delete non-existent category ID 99999
  41  |           const loginRes = await request.post('http://localhost:3000/api/login', {
  42  |             data: { email: tc.admin_email, password: tc.admin_password }
  43  |           });
  44  |           const { token } = await loginRes.json();
  45  |           const deleteRes = await request.delete(`http://localhost:3000/api/categories/${tc.target_category_id}`, {
  46  |             headers: { Authorization: `Bearer ${token}` }
  47  |           });
  48  |           // Check HTTP response status code
  49  |           // Accepted expected per human decision: 200 OK (api_specification.md §3.4 does not mandate 404).
  50  |           expect(deleteRes.status()).toBe(tc.expected_api_status || 200);
  51  |           return;
  52  |         }
  53  | 
  54  |         if (tc.tc_id === 'TC-DT-010') {
  55  |           // Public GET categories request per api_specification.md §3.4
  56  |           const res = await request.get('http://localhost:3000/api/categories');
  57  |           // Exact oracle: HTTP 200 OK
  58  |           expect(res.status()).toBe(200);
  59  |           return;
  60  |         }
  61  | 
  62  |         if (tc.tc_id === 'TC-DT-011') {
  63  |           // Regular user token attempting POST /api/categories
  64  |           const loginRes = await request.post('http://localhost:3000/api/login', {
  65  |             data: { email: tc.user_email, password: tc.user_password }
  66  |           });
  67  |           const { token } = await loginRes.json();
  68  |           const postRes = await request.post('http://localhost:3000/api/categories', {
  69  |             data: { name: 'Unauthorized Category' },
  70  |             headers: { Authorization: `Bearer ${token}` }
  71  |           });
  72  |           // Exact oracle per api_specification.md §6 (admin-only mutation requires admin token -> 403 Forbidden)
  73  |           expect(postRes.status()).toBe(403);
  74  |           return;
  75  |         }
  76  | 
  77  |         if (tc.tc_id === 'TC-DT-012') {
  78  |           // Invalid JWT token request
  79  |           const res = await request.get('http://localhost:3000/api/categories', {
  80  |             headers: { Authorization: `Bearer ${tc.token_value}` }
  81  |           });
  82  |           // Exact oracle: 401 Unauthorized for invalid Bearer token
> 83  |           expect(res.status()).toBe(401);
      |                                ^ Error: expect(received).toBe(expected) // Object.is equality
  84  |           return;
  85  |         }
  86  |       }
  87  | 
  88  |       // UI Web Automation Flow for Admin Panel
  89  |       if (tc.auth_state === 'unauthenticated') {
  90  |         await page.goto('http://localhost:5174/');
  91  |         const loginForm = page.locator('form');
  92  |         await expect(loginForm).toBeVisible();
  93  |         return;
  94  |       }
  95  | 
  96  |       // Log in as Admin
  97  |       await loginAdmin(page, tc.admin_email, tc.admin_password);
  98  |       await goToCategoryTab(page);
  99  | 
  100 |       const categoryInput = page.locator('input[placeholder="Tên danh mục mới"]');
  101 |       const addButton = page.locator('button:has-text("Thêm mới")');
  102 |       const table = page.locator('table');
  103 | 
  104 |       if (tc.action === 'view_list') {
  105 |         await expect(table).toBeVisible();
  106 |         if (tc.expected_seeded_categories) {
  107 |           for (const catName of tc.expected_seeded_categories) {
  108 |             const row = page.locator(`tr:has-text("${catName}")`).first();
  109 |             await expect(row).toBeVisible();
  110 |           }
  111 |         }
  112 |       } else if (tc.action === 'create') {
  113 |         // Count pre-existing matching rows to detect duplicate addition
  114 |         const matchingRowsBefore = page.locator('tbody tr').filter({ hasText: tc.category_name });
  115 |         const countBefore = await matchingRowsBefore.count();
  116 | 
  117 |         await categoryInput.fill(tc.category_name);
  118 |         
  119 |         // Setup dialog listener for potential browser alert popup
  120 |         let alertMessage = null;
  121 |         page.once('dialog', async dialog => {
  122 |           alertMessage = dialog.message();
  123 |           await dialog.accept();
  124 |         });
  125 | 
  126 |         await addButton.click();
  127 |         await page.waitForTimeout(500);
  128 | 
  129 |         const matchingRowsAfter = page.locator('tbody tr').filter({ hasText: tc.category_name });
  130 |         const countAfter = await matchingRowsAfter.count();
  131 | 
  132 |         if (tc.tc_id === 'TC-DT-003') {
  133 |           // Empty name test: Specified expected: action blocked / error alert.
  134 |           // Observed SUT behavior: Empty row added to table.
  135 |           if (alertMessage) {
  136 |             expect(alertMessage.length).toBeGreaterThan(0);
  137 |           } else {
  138 |             // Assert error alert or non-creation
  139 |             expect(alertMessage).not.toBeNull();
  140 |           }
  141 |         } else if (tc.tc_id === 'TC-DT-004') {
  142 |           // Duplicate test: Specified expected: blocked with alert.
  143 |           // Observed SUT behavior: Duplicate row added (countAfter > countBefore).
  144 |           if (alertMessage) {
  145 |             expect(alertMessage).toContain('đã tồn tại');
  146 |           } else {
  147 |             // If no alert appeared, assert that count did not increase (must reject duplicate)
  148 |             expect(countAfter).toBe(countBefore);
  149 |           }
  150 |         } else if (tc.expected_status === 'success') {
  151 |           expect(countAfter).toBeGreaterThan(0);
  152 |         }
  153 |       } else if (tc.action === 'delete') {
  154 |         const rowToDelete = page.locator(`tr:has-text("${tc.target_category_name}")`).first();
  155 |         if (await rowToDelete.isVisible()) {
  156 |           const deleteButton = rowToDelete.locator('button:has-text("Xóa")');
  157 | 
  158 |           page.once('dialog', async dialog => {
  159 |             await dialog.accept();
  160 |           });
  161 | 
  162 |           await deleteButton.click();
  163 |           await page.waitForTimeout(500);
  164 | 
  165 |           if (tc.tc_id === 'TC-DT-008') {
  166 |             // Delete category with linked products: Approved expected result is "blocked with warning".
  167 |             // Assert that the category row is NOT removed from table (deletion blocked) or warning alert shown.
  168 |             const remainingRow = page.locator(`tr:has-text("${tc.target_category_name}")`);
  169 |             await expect(remainingRow.first()).toBeVisible();
  170 |           }
  171 |         }
  172 |       } else if (tc.action === 'view_empty_list') {
  173 |         await expect(table).toBeVisible();
  174 |       }
  175 |     });
  176 |   }
  177 | 
  178 | });
  179 | 
```