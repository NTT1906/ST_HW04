# AUDIT-01 — AI Audit Log
**Feature:** FR-14 — Category Management (CRUD)  
**Assignment:** HW02 — AI-First Domain Testing & Boundary Value Analysis  
**AI Tool:** Antigravity (Gemini 3.5 Flash)  
**Conversation Start:** 2026-07-07T15:58 +07:00  
**Conversation End:** 2026-07-07T16:21 +07:00

---

## Audit Log

| # | Time (UTC+7) | Skill | Prompt / Action | AI Output Summary | Human Review | Changes Made |
|---|-------------|-------|-----------------|-------------------|-------------|--------------|
| 1 | 15:58 | ENV-01 | Start workflow | Wrote and executed `env_check_fr14.js`; verified Admin authentication password `Admin123!` (setup guide `admin123` fails); captured screenshots of Login, Dashboard, and Categories page. | User confirmed ✅ | Created `tests/FR14/screenshots/`, `env_check_fr14.js`, and `ENV-01-environment-report.md`. |
| 2 | 16:01 | DT-01 | User confirmed | Drafted feature summary, actors, 4 inputs, 5 outputs, 7 business rules (BR-01–BR-07), 4 assumptions, and 3 open questions. | User answered OQ-01, OQ-02, and corrected BR framing. | Created `DT-01-feature-understanding.md`. |
| 3 | 16:11 | REVIEW-01 (DT-01) | User answered OQs | Re-drafted DT-01 business rules (BR-05 to BR-09) to clearly separate expected spec from SUT buggy deviations. | User approved ✅ | Created `REVIEW-01-of-DT-01.md`. Modified `DT-01-feature-understanding.md`. |
| 4 | 16:13 | DT-02 | Continuing | Mapped valid/invalid domains for `authToken`, `categoryName`, `deleteCategoryId`, and `categoriesCount`. Included SUT accepted vs expected columns. | User approved ✅ | Created `DT-02-domain-identification.md`. |
| 5 | 16:14 | REVIEW-01 (DT-02) | User checked checklist | Created human review record of DT-02. | User approved ✅ | Created `REVIEW-01-of-DT-02.md`. |
| 6 | 16:14 | DT-03 | Continuing | Partitioned variables into 13 labelled partitions, detailing expected spec validity vs SUT actual processing. | User approved ✅ | Created `DT-03-domain-partitioning.md`. |
| 7 | 16:15 | REVIEW-01 (DT-03) | User checked checklist | Created human review record of DT-03. | User approved ✅ | Created `REVIEW-01-of-DT-03.md`. |
| 8 | 16:16 | DT-04 | Continuing | Generated 13 test cases covering all 14 partitions and mapping their business rules. | User approved ✅ | Created `DT-04-test-cases.md`. |
| 9 | 16:17 | EXEC-01 (Domain) | User confirmed | Wrote and executed `exec_fr14_dt.js`. Discovered major privilege escalation bug (regular user can create/delete categories), empty name bug, duplicate name bug, and orphaning bug. | User approved ✅ | Created `exec_fr14_dt.js`, `execution.md`, and `execution-results.json`. |
| 10 | 16:19 | BUG-01 | User confirmed | Created 5 bug reports covering broken access control, missing validation, missing uniqueness, referential integrity violation, and delete status anomaly. | User approved ✅ | Created `BUG-001.md` through `BUG-005.md` under `bugs/FR14/`. |
| 11 | 16:20 | BVA-01 | User confirmed | Assessed variables; skipped BVA test case generation because no variables have explicit boundaries in specifications. | User approved ✅ | Created `BVA-01-boundary-analysis.md`. |
| 12 | 16:20 | EXEC-01 (BVA) | Continuing | Documented BVA execution skip. | User approved ✅ | Created `execution-bva.md`. |
| 13 | 16:20 | GAP-01 | Continuing | Conducted AI Gap Analysis, detailing false-fail on duplicate checks (G-01) and page caching reload issues (G-02). | User approved ✅ | Created `GAP-01-gap-analysis.md`. |
| 14 | 16:21 | REPORT-01 | Continuing | Generated the final summary report compile with all artifacts. | User approved ✅ | Created `REPORT-FR14.md`. |
| 15 | 16:21 | AUDIT-01 | Continuing | Created this log document. | — | Created `AUDIT-01-log.md`. |

---

## Artifact Index

| Artifact | Path | Created By | Reviewed By |
|---------|------|------------|------------|
| ENV-01 Environment Report | `tests/FR14/ENV-01-environment-report.md` | AI | Human ✅ |
| DT-01 Feature Understanding | `tests/FR14/DT-01-feature-understanding.md` | AI | Human ✅ |
| REVIEW-01 of DT-01 | `tests/FR14/REVIEW-01-of-DT-01.md` | AI | Human ✅ |
| DT-02 Domain Identification | `tests/FR14/DT-02-domain-identification.md` | AI | Human ✅ |
| REVIEW-01 of DT-02 | `tests/FR14/REVIEW-01-of-DT-02.md` | AI | Human ✅ |
| DT-03 Domain Partitioning | `tests/FR14/DT-03-domain-partitioning.md` | AI | Human ✅ |
| REVIEW-01 of DT-03 | `tests/FR14/REVIEW-01-of-DT-03.md` | AI | Human ✅ |
| DT-04 Test Cases | `tests/FR14/DT-04-test-cases.md` | AI | Human ✅ |
| EXEC-01 (Domain Execution) | `tests/FR14/execution.md` | AI | Human ✅ |
| execution-results.json | `tests/FR14/execution-results.json` | AI | — |
| BVA-01 Boundary Analysis | `tests/FR14/BVA-01-boundary-analysis.md` | AI | Human ✅ |
| EXEC-01 (BVA Execution) | `tests/FR14/execution-bva.md` | AI | Human ✅ |
| GAP-01 Gap Analysis | `tests/FR14/GAP-01-gap-analysis.md` | AI | Human ✅ |
| REPORT-FR14 | `tests/FR14/REPORT-FR14.md` | AI | Human ✅ |
| BUG-001 (Broken Access Control) | `bugs/FR14/BUG-001.md` | AI | Human ✅ |
| BUG-002 (Empty Name Validation) | `bugs/FR14/BUG-002.md` | AI | Human ✅ |
| BUG-003 (Duplicate Name Validation) | `bugs/FR14/BUG-003.md` | AI | Human ✅ |
| BUG-004 (Referential Integrity) | `bugs/FR14/BUG-004.md` | AI | Human ✅ |
| BUG-005 (Non-existent Delete Code) | `bugs/FR14/BUG-005.md` | AI | Human ✅ |

---

## Statistics

| Metric | Value |
|--------|-------|
| Total skills executed | 15 |
| Total artifacts created | 19 |
| Total Playwright scripts | 2 |
| Total screenshots captured | 12 |
| Domain test cases | 13 |
| BVA test cases | 0 |
| Total test cases | 13 |
| Passed (Specification-wise) | 6 (46%) |
| Failed (Specification/Security Bugs) | 6 (46%) |
| Skipped / Mismatch | 1 (8%) |
| Bugs filed | 5 (1 Critical, 1 High, 2 Medium, 1 Low) |
| AI hallucinations | 0 |
| Human corrections to AI output | 1 (corrected expected Business Rule logic) |

---

## AI Performance Notes

- **Aaccess Control Flaw Discovery:** Successfully identified a critical security risk (privilege escalation) where non-admin account JWTs can invoke category modifications.
- **UI Caching Identification:** Identified a React page sync limitation where direct API category deletion is not rendered in the active UI table because the re-navigation is a no-op, requiring page reload.
- **Spec vs. Bug Separation:** Assisted in separating expected design requirements from current SUT bugs by restructuring Business Rules dynamically.
