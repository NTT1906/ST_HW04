# HW05 — AI Audit Report (AUDIT-01)

**Student Name:** NTT1906  
**Student ID:** 23127255  
**Course:** Software Testing (HW05 Performance Testing)  
**Raw Audit Log Reference:** [`RAW_AUDIT_LOG.jsonl`](file:///c:/Users/nttis/Downloads/SUT_HW04/RAW_AUDIT_LOG.jsonl)  
**Compact Log Reference:** [`RAW_AUDIT_LOG_compact.jsonl`](file:///c:/Users/nttis/Downloads/SUT_HW04/RAW_AUDIT_LOG_compact.jsonl)

This document provides the structured AI Audit Report required by HW05 Section 9 and `AUDIT-01`. It summarizes every significant interaction, human review gate, rejected recommendation, and human correction throughout the 22-stage HW05 performance-testing workflow.

---

## 1. AI Tool & Model Declaration

| Tool / Model Name | Role & Usage Area | Execution Window |
|---|---|---|
| **Claude Sonnet 4.6 (Thinking)** | Requirements Analysis, Workflow Design, k6 Script Generation, Scenario Parameterization | Stages 0 – 8 |
| **Gemini 3.6 Flash (Medium)** | Log Processing, AI Analysis Audit, Continuous Testing Proposal, Report Assembly | Stages 9 – 22 |
| **Antigravity IDE Agentic Assistant** | Terminal command execution, file management, background k6 process monitoring | Stages 0 – 22 |

---

## 2. Chronological Stage-by-Stage Audit Summary

### Stage 0: Requirements Analysis & Scope Review
- **Date/Time:** 2026-08-17 05:13 ICT
- **AI Tool:** Claude Sonnet 4.6 (Thinking)
- **Prompt:** Analyze `WORKFLOW.md`, `SKILLS.md`, `2026.HW05.Performance Testing_En_2.0_TA.md`, and `api_specification.md` for workflow requirements, k6 specifics, evidence needs, and ambiguities.
- **AI Output Summary:** Identified 5-step workflow, 3 scenario types, CSV data needs, k6 output mapping, account lockout bug, and 9 open items.
- **Human Review & Decision:** Approved analysis. Resolved `.jtl` mapping to native k6 output/JSON/HTML. Deferred lockout account sizing to Stage 3/5.

### Stage 1: Environment Preparation (ENV-01)
- **Date/Time:** 2026-08-17 05:23 ICT
- **AI Tool:** Claude Sonnet 4.6 (Thinking)
- **Prompt:** Verify Node.js, k6, htop, and test connectivity to all 5 EShop backend API endpoints.
- **AI Output Summary:** Verified all endpoints returned HTTP 200. Identified critical SUT bug in `server.js:54`: `login_attempts + 2` locks accounts after 2 failed logins.
- **Human Review & Decision:** Confirmed lockout bug is intentionally bugged SUT behavior. Approved using correct credentials exclusively.

### Stage 2: API Endpoint Validation (API-01)
- **Date/Time:** 2026-08-17 05:30 ICT
- **AI Tool:** Claude Sonnet 4.6 (Thinking)
- **Prompt:** Validate request/response schemas, JWT authentication, and idempotency across all 5 endpoints.
- **AI Output Summary:** Validated schemas. Discovered JWT has no `exp` payload field (indefinite token validity). Noted cart in-memory accumulation behavior.
- **Human Review & Decision:** Approved. Confirmed valid product IDs (1–5).

### Stage 3: Test Data Preparation (DATA-01)
- **Date/Time:** 2026-08-17 05:34 ICT
- **AI Tool:** Claude Sonnet 4.6 (Thinking)
- **Prompt:** Generate parameterized `products.csv` and automated user registration script `setup_users.js`.
- **AI Output Summary:** Registered 30 perf test accounts (`perf001`–`perf030`) + 1 seed account. Added credentials to `.gitignore`.
- **Human Review & Decision:** Approved 31 accounts supporting up to 30 VUs.

### Stage 4: Baseline Workflow Validation (K6-01)
- **Date/Time:** 2026-08-17 05:39 ICT
- **AI Tool:** Claude Sonnet 4.6 (Thinking)
- **Prompt:** Write and execute 1 VU 10-iteration baseline script `baseline.js`.
- **AI Output Summary:** Discovered k6 on Windows must connect via WSL2 IP `172.23.190.239:3000`. Executed baseline: 130/130 checks passed (100%), 0 errors, avg 2.85ms latency.
- **Human Review & Decision:** Approved baseline results. Noted baseline response times are informational only and not thresholds.

### Stage 5: Performance Scenario Design (PERF-01)
- **Date/Time:** 2026-08-17 05:44 ICT
- **AI Tool:** Claude Sonnet 4.6 (Thinking)
- **Prompt:** Propose workload parameters and pre-execution thresholds for Load (5 VUs), Stress (20 VUs 4-stage), and Spike (3→20→3 VUs).
- **AI Output Summary:** Proposed parameters, durations (~3m, ~6m, ~4m), think time (0.5s+1s), and report view mapping.
- **Human Review & Decision:** Approved all scenario parameters and pre-execution thresholds.

### Stage 6: k6 Test Generation (K6-01)
- **Date/Time:** 2026-08-17 05:47 ICT
- **AI Tool:** Claude Sonnet 4.6 (Thinking)
- **Prompt:** Generate `lib/workflow.js` and scenario scripts `23127255_Load_20260817.js`, `23127255_Stress_20260817.js`, and `23127255_Spike_20260817.js`.
- **AI Output Summary:** Created 4 scripts. Syntax dry-run passed 10/10 checks.
- **Human Review & Decision:** Approved generated scripts.

### Stage 7: Check and Threshold Review (CHECK-01)
- **Date/Time:** 2026-08-17 05:54 ICT
- **AI Tool:** Claude Sonnet 4.6 (Thinking)
- **Prompt:** Review all 12 checks and scenario thresholds.
- **AI Output Summary:** Added `2_get_profile: has email` and `5_get_cart: not empty`. Removed tagged per-step thresholds from Load script to avoid false exit codes. Added `checks` thresholds (>99%, >90%, >80%).
- **Human Review & Decision:** Explicitly locked pre-execution criteria and approved.

### Stage 8: Scenario Execution (EXEC-01)
- **Date/Time:** 2026-08-17 05:58 – 06:12 ICT
- **AI Tool:** Antigravity IDE / k6 v2.2.0
- **Prompt:** Execute Load, Stress, and Spike scenarios and record raw outputs.
- **AI Output Summary:** 
  - Load: 1,250 reqs, 0% error, p95=5.71ms (View 1 console output)
  - Stress: 6,425 reqs, 0% error, p95=8.41ms (View 2 raw JSON stream)
  - Spike: 2,720 reqs, 0% error, p95=6.25ms (View 3 HTML report)
- **Human Review & Decision:** Approved execution results.

### Stage 9: Evidence Collection (EVIDENCE-01)
- **Date/Time:** 2026-08-17 06:12 ICT
- **AI Tool:** Gemini 3.6 Flash (Medium)
- **Prompt:** Compile hardware specs (Intel i7-1195G7, 8GB RAM, Windows 11, WSL Ubuntu 24.04, Hostname `riu`) and evidence catalog.
- **AI Output Summary:** Produced hardware report and evidence mapping.
- **Human Review & Decision:** Approved hardware specifications.

### Stage 10: Result Processing (RESULT-01)
- **Date/Time:** 2026-08-17 06:14 ICT
- **AI Tool:** Gemini 3.6 Flash (Medium)
- **Prompt:** Consolidate raw k6 outputs into side-by-side metric comparison tables without modifying raw files.
- **AI Output Summary:** Generated comparative metric tables preserving percentiles (`p50`, `p90`, `p95`).
- **Human Review & Decision:** Approved.

### Stage 11: Endurance Testing (ENDURANCE-01)
- **Date/Time:** 2026-08-17 06:15 – 06:27 ICT
- **AI Tool:** Antigravity IDE / k6 v2.2.0
- **Prompt:** Execute 10 VU 10-minute sustained soak test (`23127255_Endurance_20260817.js`).
- **AI Output Summary:** 10,450 requests, 0% errors, p95=8.30ms, stable throughput 15.79 RPS, zero memory leaks.
- **Human Review & Decision:** Approved.

### Stage 12: AI Performance Analysis (ANALYSIS-01)
- **Date/Time:** 2026-08-17 06:27 ICT
- **AI Tool:** Gemini 3.6 Flash (Medium)
- **Prompt:** Generate initial AI performance analysis across all scenarios.
- **AI Output Summary:** Produced AI analysis interpreting scaling, tail latency, and proposing SLAs (p95 <20ms, max 25 RPS).
- **Human Review & Decision:** **PROVISIONALLY ACCEPTED.** Explicitly flagged 7 unsupported claims for Stage 13 audit.

### Stage 13: AI Misinterpretation Hunt (GAP-01)
- **Date/Time:** 2026-08-17 06:29 ICT
- **AI Tool:** Gemini 3.6 Flash (Medium)
- **Prompt:** Audit Stage 12 AI analysis and construct GAP-01 table for the 7 flagged issues.
- **AI Output Summary:** Audited 7 issues (speculative root cause, over-extrapolated leaks/starvation, time-series claims, sub-millisecond wording, untested 25 RPS capacity, arbitrary <0.01% SLA error proposal, unlinked RSS metric).
- **Human Review & Decision:** Approved human corrections.

### Stage 14: AI Optimization Review (OPT-01)
- **Date/Time:** 2026-08-17 06:30 ICT
- **AI Tool:** Gemini 3.6 Flash (Medium)
- **Prompt:** Evaluate 5 AI optimization recommendations against SUT codebase.
- **AI Output Summary:** Classified SQLite WAL (Feasible), Indexing (Feasible), Connection Pooling (Infeasible), Redis (Requires Evidence), Express HTTP/2 (Hallucinated).
- **Human Review & Decision:** Approved evaluations with explicit declaration that zero optimizations were implemented.

### Stage 15: Continuous Testing Proposal (CI-01)
- **Date/Time:** 2026-08-17 06:31 ICT
- **AI Tool:** Gemini 3.6 Flash (Medium)
- **Prompt:** Design continuous performance testing model with Mermaid flowchart, trigger rules, and p95 regression criteria.
- **AI Output Summary:** Produced CI/CD architectural proposal document.
- **Human Review & Decision:** Approved proposal.

### Stage 16: Bug Reporting (BUG-01)
- **Date/Time:** 2026-08-17 06:31 ICT
- **AI Tool:** Gemini 3.6 Flash (Medium)
- **Prompt:** Document performance issue status and catalog API validation bugs.
- **AI Output Summary:** Reported zero performance issues observed; cataloged 3 API functional/security defects.
- **Human Review & Decision:** Approved bug report.

### Stage 17–22: Finalization & README
- **Date/Time:** 2026-08-17 06:32 – 06:36 ICT
- **AI Tool:** Gemini 3.6 Flash (Medium)
- **Prompt:** Author AI Critique, assemble Git commit log, assemble main report, and generate `README.md`.
- **Human Review & Decision:** Approved all deliverables.

---

## 3. Raw Log Verification Statement

The untruncated conversation history file [`RAW_AUDIT_LOG.jsonl`](file:///c:/Users/nttis/Downloads/SUT_HW04/RAW_AUDIT_LOG.jsonl) (691 KB) and compact transcript [`RAW_AUDIT_LOG_compact.jsonl`](file:///c:/Users/nttis/Downloads/SUT_HW04/RAW_AUDIT_LOG_compact.jsonl) (487 KB) are physically preserved in the workspace root directory. They contain every user input, assistant thinking trace, model response, tool execution, and human review decision without editing or fabrication.
