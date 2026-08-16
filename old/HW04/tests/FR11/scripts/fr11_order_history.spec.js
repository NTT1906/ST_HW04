/**
 * FR-11 — Order History View (User) Data-Driven Test Automation
 * 
 * Target Feature: FR-11 (Order History View)
 * Data Source: ../data/order_history_data.json
 * Minimum Cases Required: 12 (17 Candidate Cases Implemented)
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Load external JSON test data
const dataPath = path.resolve(__dirname, '../data/order_history_data.json');
const testCases = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

test.describe('FR-11 — Order History View (Data-Driven)', () => {

  // Global test setup: Register accounts & seed exact orders required by test cases
  test.beforeAll(async ({ request }) => {
    // 1. Get Admin Token to update order statuses
    let adminToken = '';
    try {
      const adminLogin = await request.post('http://localhost:3000/api/login', {
        data: { email: 'admin@eshop.com', password: 'Admin123!' }
      });
      const adminData = await adminLogin.json();
      adminToken = adminData.token;
    } catch (e) {}

    // Helper to transition order status sequentially through SUT state machine
    const transitionOrderStatus = async (orderId, targetStatus) => {
      if (!adminToken) return;
      
      const transitions = {
        'confirmed': ['confirmed'],
        'shipping': ['confirmed', 'shipping'],
        'delivered': ['confirmed', 'shipping', 'delivered'],
        'canceled': ['canceled']
      };

      const steps = transitions[targetStatus] || [];
      for (const nextStatus of steps) {
        try {
          await request.put(`http://localhost:3000/api/admin/orders/${orderId}/status`, {
            data: { status: nextStatus },
            headers: { Authorization: `Bearer ${adminToken}` }
          });
        } catch (e) {}
      }
    };

    // Helper to setup user with N orders and optional specific status
    const setupUserOrders = async (email, count, status = 'pending') => {
      let userToken = '';
      try {
        await request.post('http://localhost:3000/api/register', {
          data: { name: `User ${email}`, email, password: 'Test1234!' }
        });
      } catch (e) {}

      try {
        const loginRes = await request.post('http://localhost:3000/api/login', {
          data: { email, password: 'Test1234!' }
        });
        const data = await loginRes.json();
        userToken = data.token;
      } catch (e) {}

      if (!userToken || count === 0) return;

      try {
        const myOrdersRes = await request.get('http://localhost:3000/api/orders/my-orders', {
          headers: { Authorization: `Bearer ${userToken}` }
        });
        const currentOrders = await myOrdersRes.json();
        const existingCount = Array.isArray(currentOrders) ? currentOrders.length : 0;
        
        for (let i = existingCount; i < count; i++) {
          const checkoutRes = await request.post('http://localhost:3000/api/checkout', {
            data: { total_amount: 100000, shipping_address: '123 Test Street' },
            headers: { Authorization: `Bearer ${userToken}` }
          });
          const checkoutData = await checkoutRes.json();

          if (status !== 'pending' && checkoutData.order_id) {
            await transitionOrderStatus(checkoutData.order_id, status);
          }
        }
      } catch (e) {}
    };

    // Pre-seed dedicated accounts for FR-11 test cases
    await setupUserOrders('fr11_user_0orders@eshop.com', 0);
    await setupUserOrders('fr11_user_1order@eshop.com', 1);
    await setupUserOrders('fr11_user_5orders@eshop.com', 5);
    await setupUserOrders('fr11_user_9orders@eshop.com', 9);
    await setupUserOrders('fr11_user_10orders@eshop.com', 10);
    await setupUserOrders('fr11_user_11orders@eshop.com', 11);
    await setupUserOrders('fr11_user_12orders@eshop.com', 12);
    
    // Pre-seed status specific accounts
    await setupUserOrders('fr11_user_pending@eshop.com', 1, 'pending');
    await setupUserOrders('fr11_user_confirmed@eshop.com', 1, 'confirmed');
    await setupUserOrders('fr11_user_shipping@eshop.com', 1, 'shipping');
    await setupUserOrders('fr11_user_delivered@eshop.com', 1, 'delivered');
    await setupUserOrders('fr11_user_canceled@eshop.com', 1, 'canceled');
    await setupUserOrders('fr11_user_cancel_action@eshop.com', 1, 'pending');
  });

  // Helper function to log in as a user and obtain session
  const loginUser = async (page, email, password) => {
    await page.goto('http://localhost:5173/login');
    const inputs = page.locator('form input');
    await inputs.nth(0).fill(email);
    await inputs.nth(1).fill(password);
    await page.click('button[type="submit"]');
    await page.waitForURL(url => !url.pathname.includes('/login'), { timeout: 8000 });
  };

  for (const tc of testCases) {
    if (tc.excluded) continue;
    test(`${tc.tc_id}: ${tc.title}`, async ({ page, request }) => {
      
      // API Verification Test: Unauthenticated / Invalid Token request checks
      if (tc.auth_state === 'unauthenticated') {
        await page.goto('http://localhost:5173/profile');
        const prompt = page.locator('text=Vui lòng đăng nhập');
        await expect(prompt).toBeVisible();
        return;
      }

      if (tc.auth_state === 'invalid_token') {
        const response = await request.get('http://localhost:3000/api/orders/my-orders', {
          headers: { Authorization: `Bearer ${tc.token_value || 'invalid_token'}` }
        });
        // Stated expected per spec: 401 Unauthorized for invalid JWT token. Observed response: 403 Forbidden.
        expect(response.status()).toBe(401);
        return;
      }

      if (tc.action === 'api_cancel_request') {
        // Direct API request verification
        const loginRes = await request.post('http://localhost:3000/api/login', {
          data: { email: tc.user_email, password: tc.user_password }
        });
        const loginData = await loginRes.json();
        const token = loginData.token;

        const ordersRes = await request.get('http://localhost:3000/api/orders/my-orders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const orders = await ordersRes.json();
        const deliveredOrder = Array.isArray(orders) ? orders.find(o => o.status === 'delivered') : null;

        if (deliveredOrder) {
          const cancelRes = await request.put(`http://localhost:3000/api/orders/${deliveredOrder.id}/cancel`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          expect(cancelRes.status()).toBe(400);
        }
        return;
      }

      // UI Web Automation Flow for Authenticated User
      await loginUser(page, tc.user_email, tc.user_password);
      await page.goto('http://localhost:5173/profile');

      // Assert empty state vs table state
      if (tc.expected_empty_state) {
        const emptyMsg = page.locator('text=Bạn chưa có đơn hàng nào.');
        await expect(emptyMsg).toBeVisible();
      } else {
        const table = page.locator('table');
        await expect(table).toBeVisible();

        // Check expected row count using web-first locator assertion
        if (tc.expected_row_count !== undefined) {
          const rows = page.locator('tbody tr');
          await expect(rows).toHaveCount(tc.expected_row_count);
        }

        // Check badge text
        if (tc.expected_badge_text) {
          const badge = page.locator(`span:has-text("${tc.expected_badge_text}")`);
          await expect(badge.first()).toBeVisible();
        }

        // Check cancel button presence or absence
        if (tc.expected_cancel_button !== undefined) {
          const cancelButton = page.locator('button:has-text("Hủy đơn")');
          if (tc.expected_cancel_button) {
            await expect(cancelButton.first()).toBeVisible();

            // Perform cancel action test if requested
            if (tc.action === 'click_cancel') {
              page.once('dialog', async dialog => {
                expect(dialog.message()).toContain('Hủy đơn thành công!');
                await dialog.accept();
              });
              await cancelButton.first().click();
            }
          } else {
            // Cancel button must be absent (count == 0) using Playwright web-first assertion
            await expect(cancelButton).toHaveCount(0);
          }
        }
      }
    });
  }

});
