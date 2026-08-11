/**
 * EXEC-01 — FR-11: BVA Test Execution
 * Executes TC-BVA-001 through TC-BVA-006 (orderCount boundary values: 0,1,5,9,10,11+)
 *
 * Strategy:
 *   - Dedicated user per boundary to achieve exact order counts.
 *   - TC-BVA-001: fr11_noorder_runId@test.com (0 orders)
 *   - TC-BVA-002: bva_1order_runId@test.com  (1 order)
 *   - TC-BVA-003: bva_5order_runId@test.com  (5 orders)
 *   - TC-BVA-004: bva_9order_runId@test.com  (9 orders)
 *   - TC-BVA-005: bva_10order_runId@test.com (10 orders)
 *   - TC-BVA-006: test@eshop.com             (19 orders — already set up from DT exec)
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

async function apiPost(endpoint, body, token) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_URL}${endpoint}`, { method: 'POST', headers, body: JSON.stringify(body) });
  return { status: res.status, body: await res.json().catch(() => null) };
}

async function getToken(email, password) {
  const r = await apiPost('/api/login', { email, password });
  return r.body?.token || null;
}

async function registerAndSetup(email, password, orderCount) {
  // Register fresh
  await apiPost('/api/register', { name: `BVA User`, email, password });
  const token = await getToken(email, password);
  if (!token) return null;

  // Create exactly orderCount orders
  for (let i = 0; i < orderCount; i++) {
    await apiPost('/api/checkout', {
      total_amount: (i + 1) * 10000,
      shipping_address: `BVA Address ${i + 1}`
    }, token);
  }

  // Verify count
  const res = await fetch(`${API_URL}/api/orders/my-orders`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const orders = await res.json();
  return { token, actualCount: Array.isArray(orders) ? orders.length : 0 };
}

async function login(page, email, password) {
  await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle' });
  await page.locator('input[type="text"]').nth(0).fill(email);
  await page.locator('input[type="text"]').nth(1).fill(password);
  await page.click('button[type="submit"]');
  await page.waitForTimeout(1500);
}

function record(tcId, boundary, testValue, expected, actual, status, notes = '') {
  results.push({ tcId, boundary, testValue, expected, actual, status, notes });
  console.log(`[${status}] ${tcId} (boundary=${boundary}, value=${testValue})`);
  console.log(`        Expected: ${expected}`);
  console.log(`        Actual  : ${actual}`);
  if (notes) console.log(`        Note    : ${notes}`);
}

// ── Main ──────────────────────────────────────────────────────────────────────

(async () => {
  const browser = await chromium.launch({ headless: true });
  const pass = 'BvaTest1!';
  const runId = Date.now();

  // ── TC-BVA-001: min = 0 orders ────────────────────────────────────────────
  {
    const email = `fr11_noorder_${runId}@test.com`;
    // Register fresh
    await apiPost('/api/register', { name: `BVA NoOrder User`, email, password: 'NewUser1!' });
    const token = await getToken(email, 'NewUser1!');
    const res   = await fetch(`${API_URL}/api/orders/my-orders`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const orders  = await res.json();
    const count   = Array.isArray(orders) ? orders.length : -1;

    const page = await browser.newPage();
    await login(page, email, 'NewUser1!');
    await page.goto(`${BASE_URL}/profile`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SS_DIR, 'TC-BVA-001.png'), fullPage: true });

    const emptyMsg = await page.locator('text=Bạn chưa có đơn hàng nào.').count();
    const table    = await page.locator('table').count();
    const rows     = await page.locator('table tbody tr').count();

    const ok = emptyMsg > 0 && table === 0 && count === 0;
    record('TC-BVA-001', 'min', 0,
      'API returns []; empty state message shown; no table',
      `apiCount=${count}, emptyMsg=${emptyMsg > 0}, table=${table > 0}, rows=${rows}`,
      ok ? 'PASS' : 'FAIL');
    await page.close();
  }

  // ── TC-BVA-002: min+1 = 1 order ──────────────────────────────────────────
  {
    const email  = `bva_1order_${runId}@test.com`;
    const setup  = await registerAndSetup(email, pass, 1);
    console.log(`[SETUP TC-BVA-002] actual orders: ${setup?.actualCount}`);

    const page = await browser.newPage();
    await login(page, email, pass);
    await page.goto(`${BASE_URL}/profile`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SS_DIR, 'TC-BVA-002.png'), fullPage: true });

    const emptyMsg = await page.locator('text=Bạn chưa có đơn hàng nào.').count();
    const rows     = await page.locator('table tbody tr').count();

    const ok = setup?.actualCount === 1 && emptyMsg === 0 && rows === 1;
    record('TC-BVA-002', 'min+1', 1,
      'API returns 1 order; table renders exactly 1 row; empty message gone',
      `apiCount=${setup?.actualCount}, emptyMsg=${emptyMsg > 0}, tableRows=${rows}`,
      ok ? 'PASS' : 'FAIL');
    await page.close();
  }

  // ── TC-BVA-003: nominal = 5 orders ───────────────────────────────────────
  {
    const email  = `bva_5order_${runId}@test.com`;
    const setup  = await registerAndSetup(email, pass, 5);
    console.log(`[SETUP TC-BVA-003] actual orders: ${setup?.actualCount}`);

    const page = await browser.newPage();
    await login(page, email, pass);
    await page.goto(`${BASE_URL}/profile`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SS_DIR, 'TC-BVA-003.png'), fullPage: true });

    const rows = await page.locator('table tbody tr').count();

    const ok = setup?.actualCount === 5 && rows === 5;
    record('TC-BVA-003', 'nominal', 5,
      'API returns 5 orders; table renders exactly 5 rows',
      `apiCount=${setup?.actualCount}, tableRows=${rows}`,
      ok ? 'PASS' : 'FAIL');
    await page.close();
  }

  // ── TC-BVA-004: max-1 = 9 orders ─────────────────────────────────────────
  {
    const email  = `bva_9order_${runId}@test.com`;
    const setup  = await registerAndSetup(email, pass, 9);
    console.log(`[SETUP TC-BVA-004] actual orders: ${setup?.actualCount}`);

    const page = await browser.newPage();
    await login(page, email, pass);
    await page.goto(`${BASE_URL}/profile`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SS_DIR, 'TC-BVA-004.png'), fullPage: true });

    const rows = await page.locator('table tbody tr').count();

    const ok = setup?.actualCount === 9 && rows === 9;
    record('TC-BVA-004', 'max-1', 9,
      'API returns 9 orders; table renders exactly 9 rows; no truncation',
      `apiCount=${setup?.actualCount}, tableRows=${rows}`,
      ok ? 'PASS' : 'FAIL');
    await page.close();
  }

  // ── TC-BVA-005: max = 10 orders ──────────────────────────────────────────
  {
    const email  = `bva_10order_${runId}@test.com`;
    const setup  = await registerAndSetup(email, pass, 10);
    console.log(`[SETUP TC-BVA-005] actual orders: ${setup?.actualCount}`);

    const page = await browser.newPage();
    await login(page, email, pass);
    await page.goto(`${BASE_URL}/profile`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SS_DIR, 'TC-BVA-005.png'), fullPage: true });

    const rows = await page.locator('table tbody tr').count();

    const ok = setup?.actualCount === 10 && rows === 10;
    record('TC-BVA-005', 'max', 10,
      'API returns exactly 10 orders; table renders exactly 10 rows',
      `apiCount=${setup?.actualCount}, tableRows=${rows}`,
      ok ? 'PASS' : 'FAIL');
    await page.close();
  }

  // ── TC-BVA-006: max+1 = 11+ orders ───────────────────────────────────────
  // test@eshop.com already has 19 orders from DT exec
  {
    const email = 'test@eshop.com';
    const uToken = await getToken(email, 'Test1234!');
    const res    = await fetch(`${API_URL}/api/orders/my-orders`, {
      headers: { Authorization: `Bearer ${uToken}` }
    });
    const orders     = await res.json();
    const apiCount   = Array.isArray(orders) ? orders.length : -1;

    const page = await browser.newPage();
    await login(page, email, 'Test1234!');
    await page.goto(`${BASE_URL}/profile`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SS_DIR, 'TC-BVA-006.png'), fullPage: true });

    const rows = await page.locator('table tbody tr').count();

    // Expected: both apiCount and rows should be ≤ 10
    const ok = apiCount <= 10 && rows <= 10;
    record('TC-BVA-006', 'max+1', apiCount,
      'API returns ≤10 orders; UI renders ≤10 rows (pagination limit enforced)',
      `apiCount=${apiCount}, tableRows=${rows}`,
      ok ? 'PASS' : 'FAIL',
      ok ? '' : `BUG-FR11-001 CONFIRMED: API returned ${apiCount} orders, UI showed ${rows} rows — limit NOT enforced`);
    await page.close();
  }

  await browser.close();

  // ── Save results ──────────────────────────────────────────────────────────
  fs.writeFileSync(
    path.join(__dirname, '../tests/FR11/execution-bva-results.json'),
    JSON.stringify(results, null, 2)
  );

  console.log('\n══════════════════════════════════════════');
  console.log(' EXEC-01 BVA FR-11 Results Summary');
  console.log('══════════════════════════════════════════');
  for (const r of results) {
    console.log(`  [${r.status}] ${r.tcId} (boundary=${r.boundary}, value=${r.testValue})`);
  }
  console.log('══════════════════════════════════════════');
})();
