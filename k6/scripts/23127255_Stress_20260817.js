/**
 * 23127255_Stress_20260817.js — EShop Stress Test
 * Student ID: 23127255
 * Date: 2026-08-17
 *
 * Objective: Progressively increase VU count to identify the load level at
 * which the SUT begins to degrade, produce errors, or become unstable.
 *
 * Approved in Stage 5 — Performance Scenario Design.
 * Thresholds approved in Stage 5 and reviewed in Stage 7 (CHECK-01).
 *
 * Report view: Raw JSON metrics via --out json (View 2 of 3).
 * Capture: Pass --out json=k6/results/stress_result_20260817.json to k6 CLI.
 *
 * Usage:
 *   k6 run --env BASE_URL=http://<WSL2_IP>:3000 \
 *          --out json=k6/results/stress_result_20260817.json \
 *          k6/scripts/23127255_Stress_20260817.js \
 *          2>&1 | Tee-Object k6/results/stress_console_20260817.txt
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
// Ramp profile: 0 → 5 → 10 → 15 → 20 VUs in 4 progressive stages.
export const options = {
  scenarios: {
    stress: {
      executor:         'ramping-vus',
      startVUs:         0,
      stages: [
        { duration: '30s', target: 5  },   // warm-up (= Load peak VUs)
        { duration: '1m',  target: 5  },   // stage 1: sustained 5 VUs
        { duration: '30s', target: 10 },   // ramp to stage 2
        { duration: '1m',  target: 10 },   // stage 2: sustained 10 VUs
        { duration: '30s', target: 15 },   // ramp to stage 3
        { duration: '1m',  target: 15 },   // stage 3: sustained 15 VUs
        { duration: '30s', target: 20 },   // ramp to peak
        { duration: '30s', target: 20 },   // stage 4: peak sustained (20 VUs)
        { duration: '30s', target: 0  },   // ramp-down
      ],
      gracefulRampDown: '30s',
    },
  },
  // ── Thresholds (approved Stage 5, reviewed/corrected Stage 7 CHECK-01) ───
  // Stress thresholds are lenient — degradation is expected.
  // abortOnFail not set — test runs to completion even when thresholds breach.
  thresholds: {
    'http_req_duration': ['p(95)<500'],   // p95 < 500ms
    'http_req_failed':   ['rate<0.05'],   // error rate < 5%
    'checks':            ['rate>0.90'],   // ≥90% of functional checks must pass
  },
  tags: {
    scenario:   'stress',
    student_id: '23127255',
    date:       '20260817',
  },
};

// ── Main VU function ───────────────────────────────────────────────────────
export default function () {
  runWorkflow();
}
