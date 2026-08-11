# AUDIT-01 — AI Audit Log
**Feature:** FR-20 — Xem sản phẩm (Mobile)  
**Assignment:** HW02 — AI-First Domain Testing & Boundary Value Analysis  
**AI Tool:** Antigravity (Gemini 3.5 Flash)  
**Conversation Start:** 2026-07-07T18:18 +07:00  
**Conversation End:** 2026-07-07T18:33 +07:00

---

## Audit Log

| # | Time (UTC+7) | Skill | Prompt / Action | AI Output Summary | Human Review | Changes Made |
|---|-------------|-------|-----------------|-------------------|-------------|--------------|
| 1 | 18:18 | ENV-01 | Start workflow | Verified Android emulator (`emulator-5554`) connectivity, backend API status, and captured initial product details page. | User confirmed ✅ | Created `tests/FR20/screenshots/`, and `ENV-01-environment-report.md`. |
| 2 | 18:20 | DT-01 | User confirmed | Drafted feature summary, actors, 2 inputs, 3 outputs, 5 business rules, 3 assumptions, and 2 open questions. | User resolved OQ-01 (no max limits). | Created `DT-01-feature-understanding.md`. |
| 3 | 18:22 | REVIEW-01 (DT-01) | User answered OQs | Re-drafted DT-01, resolved OQ-01, and marked checklist. | User approved ✅ | Created `REVIEW-01-of-DT-01.md`. Modified `DT-01-feature-understanding.md`. |
| 4 | 18:23 | DT-02 | Continuing | Mapped valid/invalid domains for `quantity` and `productId`. | User approved ✅ | Created `DT-02-domain-identification.md`. |
| 5 | 18:23 | REVIEW-01 (DT-02) | User checked checklist | Created human review record of DT-02. | User approved ✅ | Created `REVIEW-01-of-DT-02.md`. |
| 6 | 18:23 | DT-03 | Continuing | Partitioned variables into 9 unique equivalence classes. | User approved ✅ | Created `DT-03-domain-partitioning.md`. |
| 7 | 18:23 | REVIEW-01 (DT-03) | User checked checklist | Created human review record of DT-03. | User approved ✅ | Created `REVIEW-01-of-DT-03.md`. |
| 8 | 18:25 | DT-04 | Continuing | Generated 8 domain test cases covering all 9 partitions and mapping rules. | User approved ✅ | Created `DT-04-test-cases.md`. |
| 9 | 18:26 | EXEC-01 (Domain) | User confirmed | Wrote and executed `exec_fr20.ps1` via ADB. Discovered validation gaps (coercion of zero, negative, text to 1) and calculation overflow layout breakage. | User approved ✅ | Created `exec_fr20.ps1`, `execution.md`, and `execution-results.json`. |
| 10 | 18:29 | BUG-01 | User confirmed | Created 2 bug reports covering missing quantity validation/coercion flaw and missing upper bound layout overflow. | User approved ✅ | Created `BUG-001.md` and `BUG-002.md` under `bugs/FR20/`. |
| 11 | 18:31 | BVA-01 | User confirmed | Defined lower boundary values (`0`, `1`, `2`, `5`) for `quantity`. | User approved ✅ | Created `BVA-01-boundary-analysis.md`. |
| 12 | 18:31 | EXEC-01 (BVA) | Continuing | Executed nominal BVA test case `quantity`=5 on emulator and pulled screenshot evidence. | User approved ✅ | Created `execution-bva.md` and `bva-execution-results.json`. |
| 13 | 18:32 | GAP-01 | Continuing | Conducted AI Gap Analysis, detailing cart count unique item behavior (G-01), float truncation (G-02), silent coercion (G-03), and overflow visual layout limits (G-04). | User approved ✅ | Created `GAP-01-gap-analysis.md`. |
| 14 | 18:32 | REPORT-01 | Continuing | Generated the final summary report with all linked artifacts. | User approved ✅ | Created `REPORT-FR20.md`. |
| 15 | 18:33 | AUDIT-01 | Continuing | Created this log document. | — | Created `AUDIT-01-log.md`. |

---

## Artifact Index

| Artifact | Path | Created By | Reviewed By |
|---------|------|------------|------------|
| ENV-01 Environment Report | `tests/FR20/ENV-01-environment-report.md` | AI | Human ✅ |
| DT-01 Feature Understanding | `tests/FR20/DT-01-feature-understanding.md` | AI | Human ✅ |
| REVIEW-01 of DT-01 | `tests/FR20/REVIEW-01-of-DT-01.md` | AI | Human ✅ |
| DT-02 Domain Identification | `tests/FR20/DT-02-domain-identification.md` | AI | Human ✅ |
| REVIEW-01 of DT-02 | `tests/FR20/REVIEW-01-of-DT-02.md` | AI | Human ✅ |
| DT-03 Domain Partitioning | `tests/FR20/DT-03-domain-partitioning.md` | AI | Human ✅ |
| REVIEW-01 of DT-03 | `tests/FR20/REVIEW-01-of-DT-03.md` | AI | Human ✅ |
| DT-04 Test Cases | `tests/FR20/DT-04-test-cases.md` | AI | Human ✅ |
| EXEC-01 (Domain Execution) | `tests/FR20/execution.md` | AI | Human ✅ |
| execution-results.json | `tests/FR20/execution-results.json` | AI | — |
| BVA-01 Boundary Analysis | `tests/FR20/BVA-01-boundary-analysis.md` | AI | Human ✅ |
| EXEC-01 (BVA Execution) | `tests/FR20/execution-bva.md` | AI | Human ✅ |
| GAP-01 Gap Analysis | `tests/FR20/GAP-01-gap-analysis.md` | AI | Human ✅ |
| REPORT-FR20 | `tests/FR20/REPORT-FR20.md` | AI | Human ✅ |
| BUG-001 (Missing Quantity Validation) | `bugs/FR20/BUG-001.md` | AI | Human ✅ |
| BUG-002 (Large Quantity Overflow) | `bugs/FR20/BUG-002.md` | AI | Human ✅ |

---

## Statistics

| Metric | Value |
|--------|-------|
| Total skills executed | 15 |
| Total artifacts created | 15 |
| Total ADB/PowerShell scripts | 1 |
| Total screenshots captured | 10 |
| Domain test cases | 8 |
| BVA test cases | 4 |
| Total test cases | 12 |
| Passed (Specification-wise) | 6 (50%) |
| Failed (Specification/Logic Gaps) | 6 (50%) |
| Bugs filed | 2 (1 Medium, 1 Low) |
| AI hallucinations | 0 |
| Human corrections to AI output | 1 (resolved OQ-01 limit boundary assumption) |

---

## AI Performance Notes

- **Emulator Coordinates Dump Validation:** Successfully used `uiautomator dump` XML parsing to fetch coordinate mappings (`bounds`) dynamically for accurate ADB button clicks/text inserts.
- **Silent Coercion Detection:** Discovered that SUT normalizes invalid quantities silently on add-to-cart click instead of showing feedback validation.
- **Cart Count Logic Resolution:** Correctly mapped out that the header counter reflects the React Native unique state length (`cart.length`) instead of accumulated quantity sum.
