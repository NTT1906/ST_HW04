/**
 * FR-14 — Category Management (CRUD) Data-Driven Test Automation
 * 
 * Target Feature: FR-14 (Category Management CRUD)
 * Data Source: ../data/category_data.json
 * Minimum Cases Required: 12 (13 Candidate Cases Implemented: TC-DT-001 through TC-DT-013)
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Load external JSON test data
const dataPath = path.resolve(__dirname, '../data/category_data.json');
const testCases = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

test.describe('FR-14 — Category Management CRUD (Data-Driven)', () => {

  // Helper function to log in as admin on frontend-admin (port 5174)
  const loginAdmin = async (page, email, password) => {
    await page.goto('http://localhost:5174/');
    await page.fill('input[placeholder="Email"]', email);
    await page.fill('input[placeholder="Password"]', password);
    await page.click('button:has-text("Login")');
    await page.waitForSelector('h1:has-text("EShop Admin")', { timeout: 8000 });
  };

  // Helper function to navigate to Category tab
  const goToCategoryTab = async (page) => {
    await page.click('li:has-text("Danh mục")');
    await page.waitForSelector('h2:has-text("Quản lý Danh mục")', { timeout: 5000 });
  };

  for (const tc of testCases) {
    test(`${tc.tc_id}: ${tc.title}`, async ({ page, request }) => {

      // API Verification Tests (explicitly classified as API-level testing)
      if (tc.is_api_oriented_candidate) {
        if (tc.tc_id === 'TC-DT-009') {
          // Admin API delete non-existent category ID 99999
          const loginRes = await request.post('http://localhost:3000/api/login', {
            data: { email: tc.admin_email, password: tc.admin_password }
          });
          const { token } = await loginRes.json();
          const deleteRes = await request.delete(`http://localhost:3000/api/categories/${tc.target_category_id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          // Check HTTP response status code
          // Accepted expected per human decision: 200 OK (api_specification.md §3.4 does not mandate 404).
          expect(deleteRes.status()).toBe(tc.expected_api_status || 200);
          return;
        }

        if (tc.tc_id === 'TC-DT-010') {
          // Public GET categories request per api_specification.md §3.4
          const res = await request.get('http://localhost:3000/api/categories');
          // Exact oracle: HTTP 200 OK
          expect(res.status()).toBe(200);
          return;
        }

        if (tc.tc_id === 'TC-DT-011') {
          // Regular user token attempting POST /api/categories
          const loginRes = await request.post('http://localhost:3000/api/login', {
            data: { email: tc.user_email, password: tc.user_password }
          });
          const { token } = await loginRes.json();
          const postRes = await request.post('http://localhost:3000/api/categories', {
            data: { name: 'Unauthorized Category' },
            headers: { Authorization: `Bearer ${token}` }
          });
          // Exact oracle per api_specification.md §6 (admin-only mutation requires admin token -> 403 Forbidden)
          expect(postRes.status()).toBe(403);
          return;
        }

        if (tc.tc_id === 'TC-DT-012') {
          // Invalid JWT token request
          const res = await request.get('http://localhost:3000/api/categories', {
            headers: { Authorization: `Bearer ${tc.token_value}` }
          });
          // Exact oracle: 401 Unauthorized for invalid Bearer token
          expect(res.status()).toBe(401);
          return;
        }
      }

      // UI Web Automation Flow for Admin Panel
      if (tc.auth_state === 'unauthenticated') {
        await page.goto('http://localhost:5174/');
        const loginForm = page.locator('form');
        await expect(loginForm).toBeVisible();
        return;
      }

      // Log in as Admin
      await loginAdmin(page, tc.admin_email, tc.admin_password);
      await goToCategoryTab(page);

      const categoryInput = page.locator('input[placeholder="Tên danh mục mới"]');
      const addButton = page.locator('button:has-text("Thêm mới")');
      const table = page.locator('table');

      if (tc.action === 'view_list') {
        await expect(table).toBeVisible();
        if (tc.expected_seeded_categories) {
          for (const catName of tc.expected_seeded_categories) {
            const row = page.locator(`tr:has-text("${catName}")`).first();
            await expect(row).toBeVisible();
          }
        }
      } else if (tc.action === 'create') {
        // Count pre-existing matching rows to detect duplicate addition
        const matchingRowsBefore = page.locator('tbody tr').filter({ hasText: tc.category_name });
        const countBefore = await matchingRowsBefore.count();

        await categoryInput.fill(tc.category_name);
        
        // Setup dialog listener for potential browser alert popup
        let alertMessage = null;
        page.once('dialog', async dialog => {
          alertMessage = dialog.message();
          await dialog.accept();
        });

        await addButton.click();
        await page.waitForTimeout(500);

        const matchingRowsAfter = page.locator('tbody tr').filter({ hasText: tc.category_name });
        const countAfter = await matchingRowsAfter.count();

        if (tc.tc_id === 'TC-DT-003') {
          // Empty name test: Specified expected: action blocked / error alert.
          // Observed SUT behavior: Empty row added to table.
          if (alertMessage) {
            expect(alertMessage.length).toBeGreaterThan(0);
          } else {
            // Assert error alert or non-creation
            expect(alertMessage).not.toBeNull();
          }
        } else if (tc.tc_id === 'TC-DT-004') {
          // Duplicate test: Specified expected: blocked with alert.
          // Observed SUT behavior: Duplicate row added (countAfter > countBefore).
          if (alertMessage) {
            expect(alertMessage).toContain('đã tồn tại');
          } else {
            // If no alert appeared, assert that count did not increase (must reject duplicate)
            expect(countAfter).toBe(countBefore);
          }
        } else if (tc.expected_status === 'success') {
          expect(countAfter).toBeGreaterThan(0);
        }
      } else if (tc.action === 'delete') {
        const rowToDelete = page.locator(`tr:has-text("${tc.target_category_name}")`).first();
        if (await rowToDelete.isVisible()) {
          const deleteButton = rowToDelete.locator('button:has-text("Xóa")');

          page.once('dialog', async dialog => {
            await dialog.accept();
          });

          await deleteButton.click();
          await page.waitForTimeout(500);

          if (tc.tc_id === 'TC-DT-008') {
            // Delete category with linked products: Approved expected result is "blocked with warning".
            // Assert that the category row is NOT removed from table (deletion blocked) or warning alert shown.
            const remainingRow = page.locator(`tr:has-text("${tc.target_category_name}")`);
            await expect(remainingRow.first()).toBeVisible();
          }
        }
      } else if (tc.action === 'view_empty_list') {
        await expect(table).toBeVisible();
      }
    });
  }

});
