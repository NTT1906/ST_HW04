# GAP-01 — AI Gap Analysis
**Feature:** FR-14 — Category Management (CRUD)  
**Date:** 2026-07-07  
**Skill:** GAP-01  
**Reviewer:** Human (student) — validates or rejects every hypothesis below

---

## Purpose

Compare AI-generated artifacts with final reviewed results. Identify missing test cases, incorrect assumptions, hallucinations, and reasoning/automation errors.

---

## Gap Analysis Table

| # | Issue | AI Output | Final Result | Cause | Human Validation |
|---|-------|-----------|-------------|-------|-----------------|
| **G-01** | Test Script False-Fail in `TC-DT-008` (Delete Category with Products) | Automated script reported `FAIL` for `TC-DT-008` because `"Điện thoại"` was still present. | SUT behaved **correctly**; the targeted row was successfully deleted and the database record was removed. | **Test script defect:** `TC-DT-004` (duplicate test) created a second category named `"Điện thoại"`. The delete action in `TC-DT-008` successfully deleted one row, but the check (`!includes('Điện thoại')`) failed because the duplicate row was still present in the list. | ☐ Confirm / ☐ Reject |
| **G-02** | UI Caching / Page Reload Mismatch in `TC-DT-013` (Empty State) | Automated script reported `FAIL` because the table showed 6 rows left after clearing. | The database categories **were** deleted. The UI retained cached categories because re-clicking the active tab doesn't trigger React reload. | **Test script / UI caching defect:** The categories were deleted directly via API. Re-clicking the active tab does not re-run the `useEffect` since the token didn't change, causing the UI to display stale cached items. A page reload (`page.reload()`) is needed. | ☐ Confirm / ☐ Reject |
| **G-03** | Severe Security Role Verification Bypass | Identified during execution of `TC-DT-011`. | API allowed regular users to create and delete categories. | **Design defect in SUT:** The backend middleware `authenticateToken` only verifies token validity but completely lacks role checks (`user.role === 'admin'`). | ☐ Confirm / ☐ Reject |
| **G-04** | Missing Database Constraint Tests | Seeded categories have no SQL constraints. | SUT allows saving empty strings and duplicate names in database. | **Database schema flaw in SUT:** `categories` table lacks `UNIQUE` and `NOT NULL` constraints, and `products` lacks `FOREIGN KEY` constraints. | ☐ Confirm / ☐ Reject |

---

## Potential Additional Test Cases (Proposed)

These are candidate test cases to address identified gaps. Do not add to the test suite unless approved.

| Proposed TC | Technique | Rationale |
|------------|-----------|-----------|
| **TC-NEW-01** (Admin Page Refresh Sync) | UI Synchronization | Verify that navigating away from "Danh mục" tab and back, or refreshing the page, syncs the UI table rows with the actual backend database categories state. |
| **TC-NEW-02** (Verify Product Integrity storefront) | System/Regression | Verify that deleting a category containing products does not crash the client-side storefront when displaying those products (handles orphaned categories gracefully). |

---

## Summary

| Category | Count | Notes |
|---------|-------|-------|
| Missing test cases (confirmed gaps) | 1 | TC-NEW-02 is documented to test customer-side storefront regression. |
| Incorrect assumptions | 0 | Checked and confirmed by user prior to test cases. |
| Hallucinated requirements | 0 | No requirements were invented; all traced to codebase. |
| Incorrect expected results | 0 | Expected results matched specification expectations. |
| Reasoning/Harness errors | 2 | G-01 (duplicate row name check) and G-02 (UI caching check) were script-level gaps. |

---

## Human Review Checklist

- [ ] G-01 (duplicate row name check): confirm or reject as test harness gap
- [ ] G-02 (UI caching check): confirm or reject as test harness gap
- [ ] G-03 (Security Role Bypass): confirm or reject as critical SUT vulnerability
- [ ] G-04 (Database constraint flaw): confirm or reject as SUT DB defect
- [ ] Overall gap analysis accepted
