# GAP-01 — AI Gap Analysis
**Feature:** FR-20 — Xem sản phẩm (Mobile)  
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
| **G-01** | Cart Header Count Discrepancy | Expected `Giỏ (X)` to display total item quantity (e.g. `Giỏ (2)` after adding 2 items). | `Giỏ (1)` displayed. Counter only tracks number of unique products (`cart.length`). | **Misunderstood UI design:** The counter represents unique product items, not accumulated product quantities. | ☐ Confirm / ☐ Reject |
| **G-02** | Implicit Truncation of Float inputs | Expected decimals to either be rejected or rounded. | Decimals are truncated (e.g. `2.5` -> `2`) and successfully added. | **SUT implementation:** `normalizeQuantity` uses `parseInt(value, 10)`, which truncates float inputs without error. | ☐ Confirm / ☐ Reject |
| **G-03** | Silent Coercion of Invalid values | Expected zero, negative, text, or empty values to trigger validation alerts. | SUT displays success alert `"Đã thêm vào giỏ hàng"` and defaults quantity to `1`. | **Missing SUT validations:** `normalizeQuantity` lacks validation bounds checks; it falls back to `1` on `NaN` or values $\le 0$. | ☐ Confirm / ☐ Reject |
| **G-04** | Total Price Visual Overflow | Expected extremely large inputs to be restricted at the text field or click action. | Accepts `999999999999` and renders calculations in scientific notation, breaking UI text boundaries. | **Missing upper bound check:** SUT does not validate or cap maximum quantity values. | ☐ Confirm / ☐ Reject |

---

## Potential Additional Test Cases (Proposed)

These are candidate test cases to address identified gaps. Do not add to the test suite unless approved.

| Proposed TC | Technique | Rationale |
|------------|-----------|-----------|
| **TC-NEW-01** (Verify Cart Screen Quantity Accumulation) | Integration Testing | Verify that navigating to the shopping cart screen correctly displays the accumulated quantity `2` for a product added via `TC-DT-001` (confirming that `Giỏ (1)` in the nav header indeed stands for unique items, and quantity is stored correctly in state). |
| **TC-NEW-02** (Quantity Capping) | UI/UX Validation | Verify that when a user tries to enter a value higher than a practical limit (e.g., 99 or 999), the SUT either caps it or truncates it to prevent cart layout breakage. |

---

## Summary

| Category | Count | Notes |
|---------|-------|-------|
| Missing test cases (confirmed gaps) | 1 | TC-NEW-01 proposes checking cart screen detail to verify quantity was indeed stored as `2`. |
| Incorrect assumptions | 1 | G-01 represents a minor gap in understanding header count definition. |
| Hallucinated requirements | 0 | No requirements were invented. |
| Incorrect expected results | 0 | Expected results matched normal spec guidelines. |
| Reasoning/Harness errors | 0 | Script executed and clicked exactly as intended. |

---

## Human Review Checklist

- [ ] G-01 (Cart header counts unique items): confirm or reject
- [ ] G-02 (Float truncated to int): confirm or reject
- [ ] G-03 (Silent coercion of invalid inputs): confirm or reject
- [ ] G-04 (Lack of upper bound check): confirm or reject
- [ ] Overall gap analysis accepted
