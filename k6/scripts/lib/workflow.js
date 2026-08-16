/**
 * lib/workflow.js — Shared EShop performance-test workflow
 * Student ID: 23127255
 *
 * Implements the approved 5-step end-to-end workflow:
 *   POST /api/login
 *   GET  /api/users/me
 *   PUT  /api/users/me
 *   POST /api/cart
 *   GET  /api/cart
 *
 * Imported by Load, Stress, and Spike scenario scripts.
 * Do NOT modify this workflow without human review (WORKFLOW.md §1).
 */

import http      from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray }  from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

// ── Base URL ───────────────────────────────────────────────────────────────
// Always pass via --env BASE_URL=http://<WSL2_IP>:3000
// Default kept for reference; verify WSL2 IP before each run.
export const BASE_URL = __ENV.BASE_URL || 'http://172.23.190.239:3000';

// ── External test data ─────────────────────────────────────────────────────
// Loaded once during k6 init phase; shared across all VUs.
export const users = new SharedArray('users', function () {
  return papaparse
    .parse(open('../../data/users.csv'), { header: true })
    .data.filter(r => r.email && r.email.trim() !== '');
});

export const products = new SharedArray('products', function () {
  return papaparse
    .parse(open('../../data/products.csv'), { header: true })
    .data.filter(r => r.product_id && r.product_id.trim() !== '');
});

// ── Workflow execution ─────────────────────────────────────────────────────
/**
 * runWorkflow()
 * Executes one complete end-to-end iteration of the approved workflow.
 * Called by each VU on each iteration.
 * Think time: 0.5s between steps, 1.0s at the end.
 */
export function runWorkflow() {
  // Data selection
  const user    = users[(__VU - 1) % users.length];
  const product = products[__ITER % products.length];

  // ── Step 1: POST /api/login ──────────────────────────────────────────────
  const loginRes = http.post(
    `${BASE_URL}/api/login`,
    JSON.stringify({ email: user.email, password: user.password }),
    {
      headers: { 'Content-Type': 'application/json' },
      tags:    { step: '1_login' },
    }
  );

  const loginOk = check(loginRes, {
    '1_login: status 200': (r) => r.status === 200,
    '1_login: has token':  (r) => { try { return !!r.json().token; } catch { return false; } },
  });

  if (!loginOk) {
    // Do not continue — no valid token to use downstream
    console.error(`[VU${__VU}] Login failed: HTTP ${loginRes.status} for ${user.email}`);
    return;
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
    tags:    { step: '2_get_profile' },
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
      tags:    { step: '3_update_profile' },
    }
  );

  check(putRes, {
    '3_update_profile: status 200': (r) => r.status === 200,
    '3_update_profile: message ok': (r) => {
      try { return r.json().message === 'Profile updated'; } catch { return false; }
    },
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
      tags:    { step: '4_add_cart' },
    }
  );

  check(addCartRes, {
    '4_add_cart: status 200': (r) => r.status === 200,
    '4_add_cart: message ok': (r) => {
      try { return r.json().message === 'Added to cart'; } catch { return false; }
    },
  });

  sleep(0.5);

  // ── Step 5: GET /api/cart ────────────────────────────────────────────────
  const getCartRes = http.get(`${BASE_URL}/api/cart`, {
    headers: authHeaders,
    tags:    { step: '5_get_cart' },
  });

  check(getCartRes, {
    '5_get_cart: status 200': (r) => r.status === 200,
    '5_get_cart: is array':   (r) => { try { return Array.isArray(r.json()); } catch { return false; } },
    // Step 4 always runs before Step 5 — cart must be non-empty by this point
    '5_get_cart: not empty':  (r) => { try { return r.json().length > 0; } catch { return false; } },
  });

  sleep(1.0);
}
