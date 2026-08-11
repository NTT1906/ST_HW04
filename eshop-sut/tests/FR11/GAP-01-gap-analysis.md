# GAP-01 — AI Gap Analysis
**Feature:** FR-11 — Order History View (User)  
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
| G-01 | Test Script False-Fails in EXEC-01 (Domain) | Automated script reported FAIL for TC-DT-007, TC-DT-008, TC-DT-009. | SUT behaved **correctly** in manual screenshots (cancel button absent for delivered/canceled; alert popped on cancel). | **Test script defect:** Checked the presence of the "Hủy đơn" button globally (`page.locator('button:has-text("Hủy đơn")').count()`) instead of checking it specifically within the target order row. | ☐ Confirm / ☐ Reject |
| G-02 | Test Data Pollution on Rerun of BVA Script | Rerunning the BVA script caused accumulated orders (e.g. TC-BVA-002 showing 2 orders instead of 1). | Script was modified to use unique dynamic emails with `runId = Date.now()` (e.g. `bva_1order_171987654@test.com`). | **Test harness defect:** Reusing static email addresses across script executions without database reset accumulated order data. | ☐ Confirm / ☐ Reject |
| G-03 | Missing API-level authorization test cases | No test case to verify if a user can cancel another user's order ID directly via the API. | Not tested. | **Domain scoping:** Focussed primarily on the visible UI of FR-11. However, security-critical authorization bypass is a key boundary case for the cancel API. | ☐ Confirm / ☐ Reject |
| G-04 | Ambiguous `shipping` status behavior | TC-DT-006 and TC-BVA-006 passed because the UI correctly renders the "Hủy đơn" button. | Unknown if the backend cancel API actually permits this (violating API spec §4.6 restriction to "chưa giao"). | **Black-box limitation:** The backend enforcement was not explicitly verified at the server level, leaving a potential gap/discrepancy. | ☐ Confirm / ☐ Reject |

---

## Potential Additional Test Cases (Proposed)

These are candidate test cases to address identified gaps. Do not add to the test suite unless approved.

| Proposed TC | Technique | Rationale |
|------------|-----------|-----------|
| **TC-NEW-01** (Authorization Bypass) | Domain / Security | Call `PUT /api/orders/:otherUserOrderId/cancel` using `test@eshop.com` token. Should return `403 Forbidden` or `404 Not Found` (prevent cross-user cancellation). |
| **TC-NEW-02** (Cancel Shipping Order API) | API / Boundary | Call `PUT /api/orders/:shippingOrderId/cancel` via API and verify if it returns `200 OK` or `400 Cannot cancel this order.` (Resolves UI vs. API spec conflict). |

---

## Summary

| Category | Count | Notes |
|---------|-------|-------|
| Missing test cases (confirmed gaps) | 0 | Candidate gaps (G-03, G-04) are documented above for approval |
| Incorrect assumptions | 0 | Assumptions (e.g. pagination) were validated by reviewer before execution |
| Hallucinated requirements | 0 | No requirements were invented; all traced to spec or UI |
| Incorrect expected results | 0 | Expected results matched the spec; discrepancies were script bugs |
| Reasoning/Harness errors | 2 | G-01 (button count scope) and G-02 (data accumulation) were script-level gaps |

---

## Human Review Checklist

- [ ] G-01 (button count scope): confirm or reject as test harness gap
- [ ] G-02 (data accumulation): confirm or reject as test harness gap
- [ ] G-03 (API cross-user bypass): approve or reject TC-NEW-01 for inclusion
- [ ] G-04 (shipping cancel API test): approve or reject TC-NEW-02 for inclusion
- [ ] Overall gap analysis accepted
