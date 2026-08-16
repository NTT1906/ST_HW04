/**
 * 23127255_Spike_20260817.js — EShop Spike Test
 * Student ID: 23127255
 * Date: 2026-08-17
 *
 * Objective: Introduce a sudden, near-instantaneous load jump (3 → 20 VUs)
 * and observe SUT degradation during the spike and recovery after the spike
 * recedes.
 *
 * Approved in Stage 5 — Performance Scenario Design.
 * Thresholds approved in Stage 5 and reviewed in Stage 7 (CHECK-01).
 *
 * Report view: HTML summary via handleSummary() (View 3 of 3).
 * Output HTML: k6/results/spike_report_20260817.html
 *
 * Usage:
 *   k6 run --env BASE_URL=http://<WSL2_IP>:3000 \
 *          k6/scripts/23127255_Spike_20260817.js \
 *          2>&1 | Tee-Object k6/results/spike_console_20260817.txt
 *
 * Workflow (from WORKFLOW.md — must not be altered without human review):
 *   POST /api/login → GET /api/users/me → PUT /api/users/me
 *   → POST /api/cart → GET /api/cart
 *
 * Data files:
 *   k6/data/users.csv    (gitignored — credentials)
 *   k6/data/products.csv
 */

import { runWorkflow }                  from './lib/workflow.js';
import { htmlReport }                   from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary }                  from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';

// ── Scenario options ───────────────────────────────────────────────────────
// All parameters approved in Stage 5. Do not change without human review.
// Spike profile: base 3 VUs → instant 20-VU spike → recovery to 3 VUs.
export const options = {
  scenarios: {
    spike: {
      executor:         'ramping-vus',
      startVUs:         0,
      stages: [
        { duration: '10s', target: 3  },  // ramp-up to base load
        { duration: '30s', target: 3  },  // pre-spike normal operation
        { duration: '5s',  target: 20 },  // spike onset (near-instantaneous)
        { duration: '1m',  target: 20 },  // spike sustained
        { duration: '5s',  target: 3  },  // spike drop (near-instantaneous)
        { duration: '1m',  target: 3  },  // recovery observation window
        { duration: '10s', target: 0  },  // ramp-down
      ],
      gracefulRampDown: '30s',
    },
  },
  // ── Thresholds (approved Stage 5, reviewed/corrected Stage 7 CHECK-01) ───
  // Spike thresholds are permissive — significant degradation is expected.
  // Key metrics: Does the system survive? Does it recover?
  thresholds: {
    'http_req_duration': ['p(95)<1000'],  // p95 < 1s
    'http_req_failed':   ['rate<0.10'],   // error rate < 10%
    'checks':            ['rate>0.80'],   // ≥80% of functional checks must pass
  },
  tags: {
    scenario:   'spike',
    student_id: '23127255',
    date:       '20260817',
  },
};

// ── Main VU function ───────────────────────────────────────────────────────
export default function () {
  runWorkflow();
}

// ── HTML summary (View 3 of 3) ─────────────────────────────────────────────
// Generates an HTML report at end of run AND preserves the native text summary.
export function handleSummary(data) {
  return {
    // HTML report — distinct view for Spike scenario
    'k6/results/spike_report_20260817.html': htmlReport(data),
    // Also preserve native text summary to stdout
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
