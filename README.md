# HW05 — AI-Assisted Backend API Performance Testing

**Student Name:** NTT1906  
**Student ID:** 23127255  
**Course:** Software Testing  
**Selected Performance Tool:** k6 v2.2.0 (Windows binary, targeting WSL2 Ubuntu Backend API)  
**Target SUT:** EShop Backend API (`eshop-sut/backend`, `http://172.23.190.239:3000`)  
**Test Host Machine:** `riu` (Intel Core i7-1195G7 @ 2.90GHz, 8GB RAM, Windows 11 Home + Ubuntu 24.04 WSL2)  
**Demo Video URL:** `https://youtu.be/YOUR_VIDEO_ID_HERE` *(Unlisted YouTube)*

---

## 1. Self-Assessment Table (Section 15 Compliance)

| **No.** | **Criteria** | **Max Grade** | **Self-Assessed Grade** | **Justification & Artifact Location** |
|---|---|---|---|---|
| **1** | **Task 1 — Load testing** | 30 | **30** | Executed 5 VUs 3m Load test (1,250 reqs, 0% errors, p95=5.71ms). View 1 console text log saved at `k6/results/23127255_Load_20260817_raw.txt`. |
| **2** | **Task 1 — Stress testing** | 20 | **20** | Executed 0→20 VUs 4-stage 6m Stress test (6,425 reqs, 0% errors, p95=8.41ms). View 2 raw JSON stream saved at `k6/results/23127255_Stress_20260817_raw.json`. |
| **3** | **Task 1 — Spike testing** | 20 | **20** | Executed 3→20→3 VUs 4m Spike test (2,720 reqs, 0% errors, p95=6.25ms). View 3 HTML summary report saved at `k6/results/spike_report_20260817.html`. |
| **4** | **Task 2 — AI analysis + misinterpretation hunt** | 10 | **10** | Conducted Stage 12 AI analysis and Stage 13 GAP-01 audit table identifying 7 confirmed AI misinterpretations with human raw-evidence corrections. |
| **5** | **Task 3 — Continuous Performance Testing proposal (G9.6)** | 10 | **10** | Authored CI-01 continuous testing proposal with Mermaid flowchart, path filtering, baseline tagging, +20% p95 regression formula, and cost/false-positive trade-offs. |
| **6** | **Agent Skills** | 10 | **10** | Built and executed modular `SKILLS.md` registry (20 skills) and `WORKFLOW.md` orchestration pipeline. |
| | **Total** | **100** | **100** | Full compliance with all HW05 rules, anti-cheat regulations, and human-review gates. |

---

## 2. Test Execution Summary

### 2.1 Selected End-to-End Workflow & Endpoint Groups
All performance test plans execute the **single approved 5-step end-to-end workflow**:

```
POST /api/login  →  GET /api/users/me  →  PUT /api/users/me  →  POST /api/cart  →  GET /api/cart
```

| Step | Method & Endpoint | Endpoint Group | Role / Payload |
|---|---|---|---|
| 1 | `POST /api/login` | **Auth-heavy** | User login → Returns JWT `token` (no expiry) |
| 2 | `GET /api/users/me` | **Read-heavy** | Profile lookup → Returns user details |
| 3 | `PUT /api/users/me` | **Transactional** | Profile update → Updates name, address, phone |
| 4 | `POST /api/cart` | **Transactional** | Cart insertion → Adds product item (IDs 1–5) |
| 5 | `GET /api/cart` | **Read-heavy** | Cart view → Returns array of cart items |

---

### 2.2 Summary Metric Matrix Across All Scenarios

| Scenario | Max VUs | Duration | Iterations | Total HTTP Req | HTTP Failure Rate | Check Pass Rate | p50 Latency | p95 Latency | Max Latency | Throughput | Report View Used |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **Baseline** | 1 VU | 30.2s | 10 | 50 | **0.00%** | **100.00%** | 3.09 ms | 5.15 ms | 5.62 ms | 1.66 req/s | Native Console Text |
| **Load** | 5 VUs | 3m 01s | 250 | 1,250 | **0.00%** | **100.00%** | 2.65 ms | **5.71 ms** | 104.63 ms | 6.90 req/s | **View 1: Native Console Log** |
| **Stress** | 20 VUs | 6m 02s | 1,285 | 6,425 | **0.00%** | **100.00%** | 2.58 ms | **8.41 ms** | 150.65 ms | 17.72 req/s | **View 2: Raw JSON Metric Stream** |
| **Spike** | 20 VUs | 3m 01s | 544 | 2,720 | **0.00%** | **100.00%** | 2.49 ms | **6.25 ms** | 116.55 ms | 14.99 req/s | **View 3: HTML Report** |
| **Endurance** | 10 VUs | 11m 01s | 2,090 | 10,450 | **0.00%** | **100.00%** | 2.67 ms | **8.30 ms** | 125.47 ms | 15.79 req/s | Native Console Text |

---

## 3. Concrete Endurance Operating Thresholds

From the 10-minute sustained soak test (`23127255_Endurance_20260817.js`):
- **Maximum Stable Operating Throughput:** **15.79 requests/second** (~3.16 iterations/sec at 10 VUs).
- **p95 Latency Stability:** **8.30 ms** (remained flat across 10 minutes; no write queue growth or degradation).
- **HTTP Error Rate:** **0.00%** (0 out of 10,450 requests failed).
- **Memory Ceiling & Leak Status:** Node.js RSS process memory stayed flat at **~85–110 MB**; zero memory leaks detected.

---

## 4. Summary of SUT Bugs and Defects Found

- **Performance Issues:** **0 confirmed SUT performance issues** (0% HTTP errors, 0 crashes, p95 < 8.41ms across 10,395 requests).
- **API Functional Defects Cataloged (Stage 1/2 API Validation):**
  1. `BUG-01` (Auth Lockout): `login_attempts + 2` locks accounts after 2 wrong passwords instead of 3 (`server.js:54`).
  2. `BUG-02` (Password Exposure): `GET /api/users/me` returns plaintext password in JSON payload (`server.js:113`).
  3. `BUG-03` (Privilege Escalation): `PUT /api/users/me` permits standard users to escalate `role` to `admin` (`server.js:124`).

---

## 5. System Setup & Test Execution Instructions

### Prerequisites
- Node.js >= 18.x installed in WSL Ubuntu
- k6 v2.2.0 installed on Windows host

### Step 1: Start SUT Backend in WSL
```bash
cd eshop-sut/backend
npm install
node database.js    # Seed database
node server.js      # Backend running on http://localhost:3000
```

### Step 2: Register Test Accounts & Prepare Data
```bash
# In project root:
node k6/data/setup_users.js
```
*Generates 31 test accounts in `k6/data/users.csv` (gitignored).*

### Step 3: Identify WSL2 IP & Execute Performance Scenarios from Windows PowerShell
```powershell
# Get WSL2 IP address:
$wslIP = (wsl bash -c "hostname -I").Split(" ")[0]

# 1. Load Test (View 1: Native Console Output)
k6 run --env BASE_URL=http://${wslIP}:3000 `
       k6/scripts/23127255_Load_20260817.js `
       2>&1 | Tee-Object k6/results/23127255_Load_20260817_raw.txt

# 2. Stress Test (View 2: Raw JSON Stream)
k6 run --env BASE_URL=http://${wslIP}:3000 `
       --out json=k6/results/23127255_Stress_20260817_raw.json `
       k6/scripts/23127255_Stress_20260817.js `
       2>&1 | Tee-Object k6/results/23127255_Stress_20260817_console.txt

# 3. Spike Test (View 3: HTML Report)
k6 run --env BASE_URL=http://${wslIP}:3000 `
       k6/scripts/23127255_Spike_20260817.js `
       2>&1 | Tee-Object k6/results/spike_console_20260817.txt

# 4. Endurance / Soak Test (10-minute run)
k6 run --env BASE_URL=http://${wslIP}:3000 `
       k6/scripts/23127255_Endurance_20260817.js `
       2>&1 | Tee-Object k6/results/23127255_Endurance_20260817_raw.txt
```

---

## 6. Repository & Submission Structure

```
SUT_HW04/
├── 2026.HW05.Performance Testing_En_2.0_TA.md   ← HW05 specification
├── SKILLS.md                                   ← Skill registry (20 skills)
├── WORKFLOW.md                                 ← HW05 workflow orchestration
├── README.md                                   ← Submission summary & self-assessment
├── git_commit_log.txt                          ← Mandatory Git commit log
├── eshop-sut/                                  ← SUT source code
└── k6/
    ├── data/
    │   ├── products.csv                        ← Cart item product data
    │   ├── setup_users.js                      ← Registration helper script
    │   └── users.csv                           ← GITIGNORED (31 accounts)
    ├── scripts/
    │   ├── lib/
    │   │   └── workflow.js                     ← Shared 5-step workflow module
    │   ├── baseline.js                         ← Baseline script
    │   ├── 23127255_Load_20260817.js           ← Load scenario
    │   ├── 23127255_Stress_20260817.js         ← Stress scenario
    │   ├── 23127255_Spike_20260817.js          ← Spike scenario
    │   └── 23127255_Endurance_20260817.js      ← Endurance scenario
    └── results/
        ├── 23127255_Load_20260817_raw.txt      ← View 1: Native console text log
        ├── 23127255_Stress_20260817_raw.json   ← View 2: Raw JSON metric stream
        ├── 23127255_Stress_20260817_console.txt
        ├── spike_report_20260817.html          ← View 3: HTML summary report
        ├── spike_console_20260817.txt
        └── 23127255_Endurance_20260817_raw.txt ← Endurance raw log
```

---

## 7. Mandatory Declarations

### AI Usage Declaration
I use AI tools (Claude Sonnet 4.6, Gemini 3.6 Flash, and Antigravity IDE Assistant) for script generation, result aggregation, gap analysis, and report formatting. All results were critically audited by human review (Stage 13 GAP-01 table).

### Anti-Fabrication Declaration
All performance test plans, raw logs, metrics, hardware specifications, and commit logs derive from actual execution on host `riu`. No results, logs, or metrics have been fabricated.
