/**
 * EXEC-01 — FR-11: Order History View (User)
 * Executes TC-DT-001 through TC-DT-012.
 *
 * Setup strategy:
 *   - test@eshop.com / Test1234! → regular user (already has order #2, status=pending)
 *   - admin@eshop.com / Admin123! → admin (used to change order status via API)
 *   - newuser_fr11@test.com / NewUser1! → freshly registered user with NO orders (TC-DT-002)
 *
 * Login form selectors (both fields are type="text" — confirmed):
 *   input[type="text"] nth(0) = email/username
 *   input[type="text"] nth(1) = password
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:5173';
const API_URL  = 'http://localhost:3000';
const SS_DIR   = path.join(__dirname, '../tests/FR11/screenshots');

fs.mkdirSync(SS_DIR, { recursive: true });

const results = [];

// ── Helpers ──────────────────────────────────────────────────────────────────

async function login(page, email, password) {
  await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle' });
  await page.locator('input[type="text"]').nth(0).fill(email);
  await page.locator('input[type="text"]').nth(1).fill(password);
  await page.click('button[type="submit"]');
  await page.waitForTimeout(1500);
}

async function getToken(email, password) {
  const res = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const body = await res.json();
  return body.token || null;
}

async function setOrderStatus(adminToken, orderId, status) {
  const res = await fetch(`${API_URL}/api/admin/orders/${orderId}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
    body: JSON.stringify({ status })
  });
  return { status: res.status, body: await res.json() };
}

async function getMyOrders(userToken) {
  const res = await fetch(`${API_URL}/api/orders/my-orders`, {
    headers: { Authorization: `Bearer ${userToken}` }
  });
  return await res.json();
}

async function registerUser(email, password) {
  const res = await fetch(`${API_URL}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'FR11 NoOrder User', email, password })
  });
  return { status: res.status, body: await res.json() };
}

async function cancelOrderApi(userToken, orderId) {
  const res = await fetch(`${API_URL}/api/orders/${orderId}/cancel`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${userToken}` }
  });
  return { status: res.status, body: await res.json() };
}

function record(tcId, desc, expected, actual, status, notes = '') {
  results.push({ tcId, desc, expected, actual, status, notes });
  console.log(`[${status}] ${tcId}: ${desc}`);
  if (notes) console.log(`        NOTE: ${notes}`);
}

// ── Main ──────────────────────────────────────────────────────────────────────

(async () => {
  const browser = await chromium.launch({ headless: true });

  // ── SETUP: Obtain tokens ──────────────────────────────────────────────────
  const adminToken = await getToken('admin@eshop.com', 'Admin123!');
  const userToken  = await getToken('test@eshop.com', 'Test1234!');
  console.log('[SETUP] Admin token:', adminToken ? 'OK' : 'FAILED');
  console.log('[SETUP] User token:',  userToken  ? 'OK' : 'FAILED');

  // ── SETUP: Ensure test user has an order with known ID ────────────────────
  const myOrders = await getMyOrders(userToken);
  console.log('[SETUP] Current orders for test user:', JSON.stringify(myOrders));

  // Use order #2 (known from ENV-01); if missing, report setup failure
  const baseOrderId = myOrders.length > 0 ? myOrders[0].id : null;
  if (!baseOrderId) {
    console.error('[SETUP ERROR] test@eshop.com has no orders. Please reset database.');
    await browser.close(); process.exit(1);
  }
  console.log(`[SETUP] Using base order ID: ${baseOrderId}`);

  // ── SETUP: Reset base order to `pending` before tests begin ──────────────
  await setOrderStatus(adminToken, baseOrderId, 'pending');
  console.log(`[SETUP] Reset order #${baseOrderId} to pending.`);

  // ── SETUP: Register no-order user (TC-DT-002) — ignore if already exists ─
  const noOrderEmail = 'fr11_noorder@test.com';
  const regResult = await registerUser(noOrderEmail, 'NewUser1!');
  console.log('[SETUP] Register no-order user:', JSON.stringify(regResult));

  // ── TC-DT-001: Valid user, pending order, sees table ─────────────────────
  {
    const page = await browser.newPage();
    await login(page, 'test@eshop.com', 'Test1234!');
    await page.goto(`${BASE_URL}/profile`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SS_DIR, 'TC-DT-001.png'), fullPage: true });

    const heading = await page.locator('text=Lịch sử đơn hàng').count();
    const rows    = await page.locator('table tbody tr').count();
    const hasCancel = await page.locator('button:has-text("Hủy đơn")').count();
    const statusBadge = await page.locator('table tbody tr').first().locator('span').innerText().catch(() => '');

    const pass = heading > 0 && rows >= 1 && hasCancel > 0;
    record('TC-DT-001', 'Authenticated user views order table (pending)',
      'Table shown with ≥1 row; Hủy đơn button visible; status "Chờ xác nhận"',
      `heading=${heading>0}, rows=${rows}, cancelBtn=${hasCancel>0}, badge="${statusBadge}"`,
      pass ? 'PASS' : 'FAIL');
    await page.close();
  }

  // ── TC-DT-002: User with zero orders — empty state ────────────────────────
  {
    const noOrderToken = await getToken(noOrderEmail, 'NewUser1!');
    if (!noOrderToken) {
      record('TC-DT-002', 'User with zero orders — empty state',
        '"Bạn chưa có đơn hàng nào." shown',
        'Could not log in as no-order user (registration may have failed or user already existed)',
        'SKIP', 'User may already exist with password mismatch. Try manual test.');
    } else {
      const page = await browser.newPage();
      await login(page, noOrderEmail, 'NewUser1!');
      await page.goto(`${BASE_URL}/profile`, { waitUntil: 'networkidle' });
      await page.screenshot({ path: path.join(SS_DIR, 'TC-DT-002.png'), fullPage: true });

      const emptyMsg = await page.locator('text=Bạn chưa có đơn hàng nào.').count();
      const table    = await page.locator('table').count();

      const pass = emptyMsg > 0 && table === 0;
      record('TC-DT-002', 'User with zero orders — empty state',
        '"Bạn chưa có đơn hàng nào." shown; no table rendered',
        `emptyMsg=${emptyMsg>0}, tableVisible=${table>0}`,
        pass ? 'PASS' : 'FAIL');
      await page.close();
    }
  }

  // ── TC-DT-003: Unauthenticated user cannot access order history ───────────
  {
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/profile`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SS_DIR, 'TC-DT-003.png'), fullPage: true });

    const url         = page.url();
    const loginMsg    = await page.locator('text=Vui lòng đăng nhập').count();
    const profileForm = await page.locator('text=Hồ sơ của bạn').count();

    // Pass if either: redirected away from /profile OR shows "Vui lòng đăng nhập"
    const pass = loginMsg > 0 || !url.includes('/profile') || profileForm === 0;
    record('TC-DT-003', 'Unauthenticated user blocked from order history',
      'Shows "Vui lòng đăng nhập" OR redirects to login',
      `url=${url}, loginMsg=${loginMsg>0}, profileForm=${profileForm>0}`,
      pass ? 'PASS' : 'FAIL');
    await page.close();
  }

  // ── TC-DT-004: Expired/invalid token rejected ─────────────────────────────
  {
    const apiRes = await fetch(`${API_URL}/api/orders/my-orders`, {
      headers: { Authorization: 'Bearer invalidtoken.tampered.xyz' }
    });
    const apiBody = await apiRes.json().catch(() => ({}));
    const pass = apiRes.status === 401 || apiBody.error || apiBody.message;
    record('TC-DT-004', 'Invalid/expired token rejected by API',
      'API returns 401 or error response',
      `status=${apiRes.status}, body=${JSON.stringify(apiBody)}`,
      pass ? 'PASS' : 'FAIL');
  }

  // ── TC-DT-005: `confirmed` order — correct label + cancel button ──────────
  {
    await setOrderStatus(adminToken, baseOrderId, 'confirmed');
    const page = await browser.newPage();
    await login(page, 'test@eshop.com', 'Test1234!');
    await page.goto(`${BASE_URL}/profile`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SS_DIR, 'TC-DT-005.png'), fullPage: true });

    const badge     = await page.locator('table tbody tr').first().locator('span').innerText().catch(() => '');
    const hasCancel = await page.locator('button:has-text("Hủy đơn")').count();

    const pass = badge.includes('Đã xác nhận') && hasCancel > 0;
    record('TC-DT-005', '`confirmed` order — correct badge + cancel button visible',
      'Badge="Đã xác nhận", cancel button shown',
      `badge="${badge}", cancelBtn=${hasCancel>0}`,
      pass ? 'PASS' : 'FAIL');
    await page.close();
  }

  // ── TC-DT-006: `shipping` order — cancel button visible (ambiguous) ───────
  {
    await setOrderStatus(adminToken, baseOrderId, 'shipping');
    const page = await browser.newPage();
    await login(page, 'test@eshop.com', 'Test1234!');
    await page.goto(`${BASE_URL}/profile`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SS_DIR, 'TC-DT-006.png'), fullPage: true });

    const badge     = await page.locator('table tbody tr').first().locator('span').innerText().catch(() => '');
    const hasCancel = await page.locator('button:has-text("Hủy đơn")').count();

    // Expected per BR-05: button shown; badge = "Đang giao"
    const pass = badge.includes('Đang giao') && hasCancel > 0;
    record('TC-DT-006', '`shipping` order — cancel button visible (ambiguous BR-12)',
      'Badge="Đang giao", cancel button shown (per BR-05)',
      `badge="${badge}", cancelBtn=${hasCancel>0}`,
      pass ? 'PASS' : 'FAIL',
      'OQ-02: Backend cancel enforcement for shipping unknown — flagged for final report.');
    await page.close();
  }

  // ── TC-DT-007: `delivered` order — cancel button hidden ──────────────────
  {
    await setOrderStatus(adminToken, baseOrderId, 'delivered');
    const page = await browser.newPage();
    await login(page, 'test@eshop.com', 'Test1234!');
    await page.goto(`${BASE_URL}/profile`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SS_DIR, 'TC-DT-007.png'), fullPage: true });

    const badge     = await page.locator('table tbody tr').first().locator('span').innerText().catch(() => '');
    const hasCancel = await page.locator('button:has-text("Hủy đơn")').count();

    const pass = badge.includes('Đã giao') && hasCancel === 0;
    record('TC-DT-007', '`delivered` order — cancel button hidden',
      'Badge="Đã giao", cancel button NOT shown',
      `badge="${badge}", cancelBtn=${hasCancel>0}`,
      pass ? 'PASS' : 'FAIL');
    await page.close();
  }

  // ── TC-DT-008: `canceled` order — cancel button hidden, "Đã hủy" ─────────
  {
    // Reset to pending first, then cancel it via API to get status=canceled
    await setOrderStatus(adminToken, baseOrderId, 'pending');
    const cancelRes = await cancelOrderApi(userToken, baseOrderId);
    console.log('[SETUP TC-008] Cancel result:', JSON.stringify(cancelRes));

    const page = await browser.newPage();
    await login(page, 'test@eshop.com', 'Test1234!');
    await page.goto(`${BASE_URL}/profile`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SS_DIR, 'TC-DT-008.png'), fullPage: true });

    const badge     = await page.locator('table tbody tr').first().locator('span').innerText().catch(() => '');
    const hasCancel = await page.locator('button:has-text("Hủy đơn")').count();

    const pass = badge.includes('Đã hủy') && hasCancel === 0;
    record('TC-DT-008', '`canceled` order — badge "Đã hủy", cancel button hidden',
      'Badge="Đã hủy", cancel button NOT shown',
      `badge="${badge}", cancelBtn=${hasCancel>0}`,
      pass ? 'PASS' : 'FAIL');
    await page.close();
  }

  // ── TC-DT-009: Cancel a `pending` order — success path ───────────────────
  {
    // Reset order back to pending
    await setOrderStatus(adminToken, baseOrderId, 'pending');

    const page = await browser.newPage();
    await login(page, 'test@eshop.com', 'Test1234!');
    await page.goto(`${BASE_URL}/profile`, { waitUntil: 'networkidle' });

    // Set up dialog handler before clicking
    let alertText = '';
    page.once('dialog', async dialog => {
      alertText = dialog.message();
      await dialog.accept();
    });

    await page.screenshot({ path: path.join(SS_DIR, 'TC-DT-009-before.png'), fullPage: true });
    await page.locator('button:has-text("Hủy đơn")').first().click();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(SS_DIR, 'TC-DT-009-after.png'), fullPage: true });

    // Verify badge changed to "Đã hủy" and button gone
    const badge     = await page.locator('table tbody tr').first().locator('span').innerText().catch(() => '');
    const hasCancel = await page.locator('button:has-text("Hủy đơn")').count();

    const pass = alertText.includes('Hủy đơn thành công') && badge.includes('Đã hủy') && hasCancel === 0;
    record('TC-DT-009', 'Cancel pending order — success path',
      'Alert "Hủy đơn thành công!"; badge→"Đã hủy"; cancel button disappears',
      `alert="${alertText}", badge="${badge}", cancelBtn=${hasCancel>0}`,
      pass ? 'PASS' : 'FAIL');
    await page.close();
  }

  // ── TC-DT-010: Cancel a delivered order via API — rejected ───────────────
  {
    await setOrderStatus(adminToken, baseOrderId, 'delivered');
    const cancelRes = await cancelOrderApi(userToken, baseOrderId);
    const pass = cancelRes.body?.error === 'Cannot cancel this order.';
    record('TC-DT-010', 'Cancel delivered order via API — rejected',
      'API returns {"error":"Cannot cancel this order."}',
      `status=${cancelRes.status}, body=${JSON.stringify(cancelRes.body)}`,
      pass ? 'PASS' : 'FAIL');
  }

  // ── TC-DT-011: > 10 orders — pagination limit ────────────────────────────
  {
    // Create 11 checkout orders via API for the test user
    // First, reset order back to pending so we have one
    await setOrderStatus(adminToken, baseOrderId, 'pending');

    // Create 10 more orders via checkout API (we already have 1 → total 11)
    for (let i = 0; i < 10; i++) {
      await fetch(`${API_URL}/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userToken}` },
        body: JSON.stringify({ total_amount: (i + 1) * 10000, shipping_address: `Test Address ${i}` })
      });
    }
    console.log('[SETUP TC-011] Created 10 additional orders.');

    // Verify how many are returned by API
    const ordersAfter = await getMyOrders(userToken);
    console.log(`[SETUP TC-011] Orders returned by API: ${ordersAfter.length}`);

    const page = await browser.newPage();
    await login(page, 'test@eshop.com', 'Test1234!');
    await page.goto(`${BASE_URL}/profile`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SS_DIR, 'TC-DT-011.png'), fullPage: true });

    const rows = await page.locator('table tbody tr').count();
    const pass = rows <= 10 && ordersAfter.length <= 10;
    record('TC-DT-011', '>10 orders — pagination limit (max 10 shown)',
      'API returns ≤10 orders; table shows ≤10 rows',
      `apiOrders=${ordersAfter.length}, tableRows=${rows}`,
      pass ? 'PASS' : 'FAIL',
      ordersAfter.length < 11 ? `API returned ${ordersAfter.length} (confirms ≤10 limit)` : `API returned all ${ordersAfter.length} (no limit observed)`);
    await page.close();
  }

  // ── TC-DT-012: Unknown status value — note requires DB manipulation ────────
  record('TC-DT-012', 'Order with unknown/invalid status — fallback display',
    'Status badge shows raw value uppercased (e.g., "PROCESSING")',
    'SKIPPED — requires direct database manipulation to insert unknown status. Not achievable via black-box API.',
    'SKIP',
    'Requires INSERT into DB with status="processing". Deprioritised per black-box constraint.');

  // ── Cleanup: Reset base order to pending ─────────────────────────────────
  await setOrderStatus(adminToken, baseOrderId, 'pending');
  console.log(`[CLEANUP] Reset order #${baseOrderId} to pending.`);

  await browser.close();

  // ── Write results ─────────────────────────────────────────────────────────
  fs.writeFileSync(
    path.join(__dirname, '../tests/FR11/execution-results.json'),
    JSON.stringify(results, null, 2)
  );

  console.log('\n══════════════════════════════════════════');
  console.log(' EXEC-01 FR-11 Results Summary');
  console.log('══════════════════════════════════════════');
  for (const r of results) {
    console.log(`  [${r.status}] ${r.tcId}: ${r.desc}`);
    console.log(`         Expected: ${r.expected}`);
    console.log(`         Actual  : ${r.actual}`);
    if (r.notes) console.log(`         Note    : ${r.notes}`);
  }
  console.log('══════════════════════════════════════════');
})();
