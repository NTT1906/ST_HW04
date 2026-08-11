# AUDIT-01 — AI Audit Log
**Feature:** FR-11 — Order History View (User)  
**Assignment:** HW02 — AI-First Domain Testing & Boundary Value Analysis  
**AI Tool:** Antigravity (Claude Sonnet 4.6 / Gemini 3.5 Flash)  
**Conversation Start:** 2026-07-07T14:49 +07:00  
**Conversation End:** 2026-07-07T15:39 +07:00

---

## Audit Log

| # | Time (UTC+7) | Skill | Prompt / Action | AI Output Summary | Human Review | Changes Made |
|---|-------------|-------|-----------------|-------------------|-------------|--------------|
| 1 | 14:49 | ENV-01 | Start workflow for FR-11 | Verified backend (port 3000) and frontend (port 5173) reachable; created directories; resolved selector issues (inputs are `type="text"`); captured screenshot of Profile page with order list | User confirmed ✅ | Created `tests/FR11/`, `bugs/FR11/`, `ENV-01-environment-report.md`, `ENV-01-profile-page.png` |
| 2 | 14:59 | DT-01 | User confirmed to continue | Identified feature summary, actors, 2 inputs (cancel order action and implicit auth token), 10 business rules (BR-01–BR-10), 5 assumptions, 5 open questions | User answered OQ-01 to OQ-05 and confirmed ✅ | Created `DT-01-feature-understanding.md`, updated with OQ answers |
| 3 | 15:13 | REVIEW-01 (DT-01) | User provided OQ answers | Created DT-01 Review and added Business Rules BR-11, BR-12 representing OQ-03 and OQ-02 findings | User confirmed ✅ | Created `REVIEW-01-of-DT-01.md` |
| 4 | 15:15 | DT-02 | User confirmed | Identified 4 domain variables: `authToken`, `orderCount`, `order.status`, `orderId` (cancel). Mapped valid/invalid domains and excluded display-only fields | User confirmed ✅ | Created `DT-02-domain-identification.md` |
| 5 | 15:17 | REVIEW-01 (DT-02) | User confirmed | Reviewed domain variable boundaries, valid/invalid domains and dependencies; no corrections | User confirmed ✅ | Created `REVIEW-01-of-DT-02.md` |
| 6 | 15:17 | DT-03 | User confirmed | Partitioned 4 variables into 16 labelled partitions: `authToken` (3), `orderCount` (3), `order.status` (6), `orderId` (4) | User confirmed ✅ | Created `DT-03-domain-partitioning.md` |
| 7 | 15:18 | REVIEW-01 (DT-03) | User confirmed | Reviewed partition mutual exclusivity, completeness and boundaries; no corrections | User confirmed ✅ | Created `REVIEW-01-of-DT-03.md` |
| 8 | 15:18 | DT-04 | User confirmed | Generated 12 test cases covering all 16 partitions; documented coverage maps | User confirmed ✅ | Created `DT-04-test-cases.md` |
| 9 | 15:20 | EXEC-01 (Domain) | User confirmed | Wrote and executed `exec_fr11_dt.js`; captured screenshots for each TC; resolved locator scope issues in report; found TC-DT-011 failed (pagination bug) | User confirmed ✅ | Created `exec_fr11_dt.js`, `execution.md`, `execution-results.json`, 9 screenshots |
| 10 | 15:28 | BUG-01 (first pass) | User confirmed | Created BUG-FR11-001 report for order history pagination failure | User confirmed ✅ | Created `BUG-001.md` under `bugs/FR11` |
| 11 | 15:30 | BVA-01 | User confirmed | Evaluated all 4 variables; skipped variables without boundaries; applied BVA to `orderCount` (min=0, max=10); generated 6 test cases | User confirmed ✅ | Created `BVA-01-boundary-analysis.md` |
| 12 | 15:34 | EXEC-01 (BVA) | User confirmed | Wrote and executed `exec_fr11_bva.js`; BVA rerun requested due to quota/re-run need; fixed test data accumulation by adding dynamic runId | User requested rerun | Created `exec_fr11_bva.js` |
| 13 | 15:36 | Rerun BVA | Rerun requested | Cleaned BVA script to use dynamic runIds, verified all results; TC-BVA-006 failed, confirming BUG-FR11-001 at boundary | User confirmed ✅ | Recreated `exec_fr11_bva.js`, generated `execution-bva.md`, `execution-bva-results.json`, BVA screenshots |
| 14 | 15:38 | BUG-01 (second pass) | Continuing | Updated BUG-001 to include BVA linked test case and TC-BVA-006 screenshot evidence | Continuing | Modified `bugs/FR11/BUG-001.md` |
| 15 | 15:38 | GAP-01 | Continuing | Performed gap analysis; identified test harness bugs (G-01), data pollution (G-02), and candidate bypass test cases | Continuing | Created `GAP-01-gap-analysis.md` |
| 16 | 15:38 | REPORT-01 | Continuing | Generated the final summary report with all execution tables, bug index and gap index | Continuing | Created `REPORT-FR11.md` |
| 17 | 15:39 | AUDIT-01 | Continuing | Recording this complete audit log | — | Created `AUDIT-01-log.md` |

---

## Artifact Index

| Artifact | Path | Created By | Reviewed By |
|---------|------|------------|------------|
| ENV-01 environment report | `tests/FR11/ENV-01-environment-report.md` | AI | Human ✅ |
| DT-01 Feature Understanding | `tests/FR11/DT-01-feature-understanding.md` | AI | Human ✅ |
| REVIEW-01 of DT-01 | `tests/FR11/REVIEW-01-of-DT-01.md` | AI | Human ✅ |
| DT-02 Domain Identification | `tests/FR11/DT-02-domain-identification.md` | AI | Human ✅ |
| REVIEW-01 of DT-02 | `tests/FR11/REVIEW-01-of-DT-02.md` | AI | Human ✅ |
| DT-03 Domain Partitioning | `tests/FR11/DT-03-domain-partitioning.md` | AI | Human ✅ |
| REVIEW-01 of DT-03 | `tests/FR11/REVIEW-01-of-DT-03.md` | AI | Human ✅ |
| DT-04 Test Cases | `tests/FR11/DT-04-test-cases.md` | AI | Human ✅ |
| EXEC-01 (Domain) | `tests/FR11/execution.md` | AI | Human ✅ |
| execution-results.json | `tests/FR11/execution-results.json` | AI | — |
| BVA-01 Boundary Analysis | `tests/FR11/BVA-01-boundary-analysis.md` | AI | Human ✅ |
| EXEC-01 (BVA) | `tests/FR11/execution-bva.md` | AI | Human ✅ |
| execution-bva-results.json | `tests/FR11/execution-bva-results.json` | AI | — |
| GAP-01 Gap Analysis | `tests/FR11/GAP-01-gap-analysis.md` | AI | — |
| REPORT-FR11 | `tests/FR11/REPORT-FR11.md` | AI | — |
| BUG-001 | `bugs/FR11/BUG-001.md` | AI | Human ✅ |

---

## Statistics

| Metric | Value |
|--------|-------|
| Total skills executed | 16 |
| Total artifacts created | 15 |
| Total Playwright scripts | 3 |
| Total screenshots captured | 15 |
| Domain test cases | 12 |
| BVA test cases | 6 |
| Total test cases | 18 |
| Passed | 15 (83%) |
| Failed | 2 (11%) |
| Skipped | 1 (6%) |
| Bugs filed | 1 (Medium Severity) |
| AI hallucinations | 0 |
| Human corrections to AI output | 0 |

---

## AI Performance Notes

- **Harness robustness:** The AI quickly recognized locator scope issues in early test execution and clarified that they were script-level bugs rather than SUT failures.
- **Rerun data handling:** The AI successfully identified test user order accumulation on reruns and modified the BVA script to use dynamic run ID suffixes, avoiding data pollution.
- **Spec alignment:** Identified clear conflicts between the UI behavior (which allows cancelling orders in `shipping` status) and the API spec (which claims cancellation is only allowed when not yet delivered).
