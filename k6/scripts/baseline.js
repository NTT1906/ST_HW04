/**
 * baseline.js — EShop HW05 Baseline Workflow Validation
 * Student ID: 23127255
 *
 * Validates the complete approved end-to-end workflow at minimal load (1 VU, 10 iterations)
 * before Load/Stress/Spike scenarios are executed.
 *
 * Workflow:
 *   POST /api/login
 *     → GET /api/users/me
 *     → PUT /api/users/me
 *     → POST /api/cart
 *     → GET /api/cart
 *
 * Usage:
 *   k6 run --env BASE_URL=http://localhost:3000 k6/scripts/baseline.js
 *
 * Data files (relative to this script's location):
 *   ../data/users.csv    — credentials (gitignored)
 *   ../data/products.csv — cart items
 */

import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

// ── Configuration ──────────────────────────────────────────────────────────
const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

// ── External test data ─────────────────────────────────────────────────────
const users = new SharedArray('users', function () {
  return papaparse.parse(open('../data/users.csv'), { header: true }).data
    .filter(r => r.email && r.email.trim() !== '');
});

const products = new SharedArray('products', function () {
  return papaparse.parse(open('../data/products.csv'), { header: true }).data
    .filter(r => r.product_id && r.product_id.trim() !== '');
});

// ── Scenario options ───────────────────────────────────────────────────────
export const options = {
  vus: 1,
  iterations: 10,
  tags: { scenario: 'baseline', student_id: '23127255' },
  // No performance thresholds on baseline — this is a functional validation only.
  // Do NOT use these response times as fabricated performance targets.
};

// ── Main workflow ──────────────────────────────────────────────────────────
export default function () {
  // Select user by VU index (wraps if more VUs than users)
  const user = users[(__VU - 1) % users.length];
  // Select product by iteration index (cycles through products)
  const product = products[__ITER % products.length];

  // ── Step 1: POST /api/login ──────────────────────────────────────────────
  const loginRes = http.post(
    `${BASE_URL}/api/login`,
    JSON.stringify({ email: user.email, password: user.password }),
    {
      headers: { 'Content-Type': 'application/json' },
      tags: { step: '1_login' },
    }
  );

  const loginOk = check(loginRes, {
    '1_login: status 200':  (r) => r.status === 200,
    '1_login: has token':   (r) => { try { return !!r.json().token; } catch { return false; } },
    '1_login: has user.id': (r) => { try { return r.json().user && r.json().user.id !== undefined; } catch { return false; } },
  });

  if (!loginOk) {
    console.error(`[ABORT] Login failed for ${user.email} — status ${loginRes.status}: ${loginRes.body}`);
    return; // Skip remaining steps — no token to use
  }

  const token = loginRes.json().token;
  const authHeaders = {
    'Content-Type':  'application/json',
    'Authorization': `Bearer ${token}`,
  };

  sleep(0.5);

  // ── Step 2: GET /api/users/me ────────────────────────────────────────────
  const meRes = http.get(`${BASE_URL}/api/users/me`, {
    headers: authHeaders,
    tags: { step: '2_get_profile' },
  });

  check(meRes, {
    '2_get_profile: status 200': (r) => r.status === 200,
    '2_get_profile: has id':     (r) => { try { return r.json().id !== undefined; } catch { return false; } },
    '2_get_profile: has email':  (r) => { try { return r.json().email !== undefined; } catch { return false; } },
  });

  sleep(0.5);

  // ── Step 3: PUT /api/users/me ────────────────────────────────────────────
  const putRes = http.put(
    `${BASE_URL}/api/users/me`,
    JSON.stringify({
      name:             user.name,
      shipping_address: user.shipping_address,
      phone:            user.phone,
    }),
    {
      headers: authHeaders,
      tags: { step: '3_update_profile' },
    }
  );

  check(putRes, {
    '3_update_profile: status 200':  (r) => r.status === 200,
    '3_update_profile: message ok':  (r) => { try { return r.json().message === 'Profile updated'; } catch { return false; } },
  });

  sleep(0.5);

  // ── Step 4: POST /api/cart ───────────────────────────────────────────────
  const addCartRes = http.post(
    `${BASE_URL}/api/cart`,
    JSON.stringify({
      id:       parseInt(product.product_id),
      name:     product.product_name,
      price:    parseInt(product.product_price),
      quantity: parseInt(product.quantity),
    }),
    {
      headers: authHeaders,
      tags: { step: '4_add_cart' },
    }
  );

  check(addCartRes, {
    '4_add_cart: status 200':  (r) => r.status === 200,
    '4_add_cart: message ok':  (r) => { try { return r.json().message === 'Added to cart'; } catch { return false; } },
  });

  sleep(0.5);

  // ── Step 5: GET /api/cart ────────────────────────────────────────────────
  const getCartRes = http.get(`${BASE_URL}/api/cart`, {
    headers: authHeaders,
    tags: { step: '5_get_cart' },
  });

  check(getCartRes, {
    '5_get_cart: status 200':  (r) => r.status === 200,
    '5_get_cart: is array':    (r) => { try { return Array.isArray(r.json()); } catch { return false; } },
    '5_get_cart: not empty':   (r) => { try { return r.json().length > 0; } catch { return false; } },
  });

  sleep(1);
}
