/**
 * setup_users.js
 * DATA-01: Register performance test accounts against the running EShop SUT.
 *
 * Usage:
 *   node k6/data/setup_users.js
 *
 * Requirements:
 *   - EShop backend must be running on http://localhost:3000
 *   - Node.js >= 18 (uses built-in fetch)
 *
 * Output:
 *   - Registers PERF_USER_COUNT test accounts via POST /api/register
 *   - Writes k6/data/users.csv  (gitignored — contains credentials)
 *   - Writes k6/data/users_register_log.json  (registration results)
 *
 * NOTE: users.csv contains plaintext passwords.
 *       Do NOT commit users.csv to Git.
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const PERF_USER_COUNT = 30;
const PASSWORD = 'Perf1234!';
const OUTPUT_CSV = path.join(__dirname, 'users.csv');
const OUTPUT_LOG = path.join(__dirname, 'users_register_log.json');

// Also include the two seed accounts so VU index 0 and 1 can use them as fallback
// (seed accounts are pre-existing — skip registration for them)
const SEED_USERS = [
  { email: 'test@eshop.com',  password: 'Test1234!',  name: 'Test User',      shipping_address: '123 Le Loi Q1 HCM',     phone: '0901234567' },
  // admin@eshop.com is role=admin; skip from perf workflow to avoid privilege escalation
];

async function registerUser(email, password, name) {
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await fetch(`${BASE_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
    const json = await res.json();
    return { email, status: res.status, response: json };
  } catch (err) {
    return { email, status: 'ERROR', error: err.message };
  }
}

async function verifyLogin(email, password) {
  try {
    const res = await fetch(`${BASE_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();
    return { ok: res.status === 200, token: json.token };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

async function main() {
  console.log(`EShop Performance Test User Setup`);
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Creating ${PERF_USER_COUNT} perf users + ${SEED_USERS.length} seed user(s)...\n`);

  const csvRows = ['email,password,name,shipping_address,phone'];
  const log = [];

  // Add seed users first
  for (const u of SEED_USERS) {
    const verify = await verifyLogin(u.email, u.password);
    if (verify.ok) {
      csvRows.push(`${u.email},${u.password},${u.name},${u.shipping_address},${u.phone}`);
      log.push({ email: u.email, type: 'seed', login_ok: true });
      console.log(`[SEED] ${u.email} — login OK`);
    } else {
      log.push({ email: u.email, type: 'seed', login_ok: false });
      console.log(`[SEED] ${u.email} — login FAILED`);
    }
  }

  // Register perf users
  for (let i = 1; i <= PERF_USER_COUNT; i++) {
    const idx = String(i).padStart(3, '0');
    const email = `perf${idx}@eshop.com`;
    const name  = `Perf User ${idx}`;
    const shipping_address = `${i} Nguyen Hue Q1 HCM`;
    const phone = `090${String(9000000 + i).padStart(7, '0')}`;

    const reg = await registerUser(email, PASSWORD, name);

    if (reg.status === 200) {
      // Verify login immediately after registration
      const verify = await verifyLogin(email, PASSWORD);
      if (verify.ok) {
        csvRows.push(`${email},${PASSWORD},${name},${shipping_address},${phone}`);
        log.push({ email, type: 'perf', register_status: reg.status, login_ok: true });
        console.log(`[OK]   ${email} — registered & login verified`);
      } else {
        log.push({ email, type: 'perf', register_status: reg.status, login_ok: false });
        console.log(`[WARN] ${email} — registered but login failed`);
      }
    } else if (reg.status === 500 && reg.response && reg.response.error && reg.response.error.includes('UNIQUE')) {
      // Already exists — try login
      const verify = await verifyLogin(email, PASSWORD);
      if (verify.ok) {
        csvRows.push(`${email},${PASSWORD},${name},${shipping_address},${phone}`);
        log.push({ email, type: 'perf', register_status: 'already_exists', login_ok: true });
        console.log(`[SKIP] ${email} — already exists, login OK`);
      } else {
        log.push({ email, type: 'perf', register_status: 'already_exists', login_ok: false });
        console.log(`[FAIL] ${email} — already exists but login failed`);
      }
    } else {
      log.push({ email, type: 'perf', register_status: reg.status, response: reg.response });
      console.log(`[FAIL] ${email} — register failed: ${JSON.stringify(reg.response)}`);
    }
  }

  fs.writeFileSync(OUTPUT_CSV, csvRows.join('\n') + '\n', 'utf8');
  fs.writeFileSync(OUTPUT_LOG, JSON.stringify(log, null, 2), 'utf8');

  const okCount = log.filter(l => l.login_ok).length;
  console.log(`\nDone. ${okCount}/${log.length} accounts ready.`);
  console.log(`CSV written to: ${OUTPUT_CSV}`);
  console.log(`Log written to: ${OUTPUT_LOG}`);
  console.log(`\nIMPORTANT: users.csv contains credentials. Do NOT commit it to Git.`);
}

main().catch(console.error);
