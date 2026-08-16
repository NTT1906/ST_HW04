/**
 * 23127255_Endurance_20260817.js — EShop Endurance / Soak Test
 * Student ID: 23127255
 * Date: 2026-08-17
 *
 * Objective: Conduct a short 10-minute soak test under sustained workload (10 VUs)
 * to empirically determine the stable operating threshold, memory ceiling, and latency stability.
 *
 * Approved in Stage 11 — Endurance / Soak Test (ENDURANCE-01).
 *
 * Profile:
 *   - Ramp-up: 30s (0 → 10 VUs)
 *   - Sustained: 10m (10 VUs)
 *   - Ramp-down: 30s (10 → 0 VUs)
 *   - Total duration: ~11 minutes
 *
 * Usage:
 *   k6 run --env BASE_URL=http://<WSL2_IP>:3000 \
 *          k6/scripts/23127255_Endurance_20260817.js \
 *          2>&1 | Tee-Object k6/results/23127255_Endurance_20260817_raw.txt
 */

import { runWorkflow } from './lib/workflow.js';

export const options = {
  scenarios: {
    endurance: {
      executor:         'ramping-vus',
      startVUs:         0,
      stages: [
        { duration: '30s', target: 10 },  // Ramp up to 10 VUs
        { duration: '10m', target: 10 },  // Sustained soak workload
        { duration: '30s', target: 0  },  // Ramp down
      ],
      gracefulRampDown: '30s',
    },
  },
  thresholds: {
    'http_req_duration': ['p(95)<300'],   // p95 < 300ms
    'http_req_failed':   ['rate<0.01'],   // error rate < 1%
    'checks':            ['rate>0.99'],   // ≥99% checks pass
  },
  tags: {
    scenario:   'endurance',
    student_id: '23127255',
    date:       '20260817',
  },
};

export default function () {
  runWorkflow();
}
