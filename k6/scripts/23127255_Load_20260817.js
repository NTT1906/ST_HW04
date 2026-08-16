/**
 * 23127255_Load_20260817.js — EShop Load Test
 * Student ID: 23127255
 * Date: 2026-08-17
 *
 * Objective: Measure SUT behavior under expected, sustained workload.
 * Scenario: 5 VUs sustained for 2 minutes, with 30s ramp-up and 30s ramp-down.
 *
 * Approved in Stage 5 — Performance Scenario Design.
 * Thresholds approved in Stage 5 and reviewed in Stage 7 (CHECK-01).
 *
 * Report view: Native k6 end-of-run console summary (View 1 of 3).
 * Capture: Redirect stdout to k6/results/load_result_YYYYMMDD.txt
 *
 * Usage:
 *   k6 run --env BASE_URL=http://<WSL2_IP>:3000 \
 *          k6/scripts/23127255_Load_20260817.js \
 *          2>&1 | Tee-Object k6/results/load_result_20260817.txt
 *
 * Workflow (from WORKFLOW.md — must not be altered without human review):
 *   POST /api/login → GET /api/users/me → PUT /api/users/me
 *   → POST /api/cart → GET /api/cart
 *
 * Data files:
 *   k6/data/users.csv    (gitignored — credentials)
 *   k6/data/products.csv
 */

import { runWorkflow } from './lib/workflow.js';

// ── Scenario options ───────────────────────────────────────────────────────
// All parameters approved in Stage 5. Do not change without human review.
export const options = {
  scenarios: {
    load: {
      executor:           'ramping-vus',
      startVUs:           0,
      stages: [
        { duration: '30s', target: 5 },   // ramp-up to expected load
        { duration: '2m',  target: 5 },   // sustained expected load
        { duration: '30s', target: 0 },   // ramp-down
      ],
      gracefulRampDown:   '30s',
    },
  },
  // ── Thresholds (approved Stage 5, reviewed/corrected Stage 7 CHECK-01) ───
  // Pre-execution estimates. abortOnFail not set — breaches recorded, test continues.
  thresholds: {
    'http_req_duration': ['p(95)<200'],   // p95 < 200ms — expected load ceiling
    'http_req_failed':   ['rate<0.01'],   // error rate < 1%
    'checks':            ['rate>0.99'],   // ≥99% of functional checks must pass
    // Note: per-step thresholds removed (Stage 7 CHECK-01) — step tags still applied
    // to requests so per-step timings appear in the results for analysis.
  },
  tags: {
    scenario:   'load',
    student_id: '23127255',
    date:       '20260817',
  },
};

// ── Main VU function ───────────────────────────────────────────────────────
export default function () {
  runWorkflow();
}
