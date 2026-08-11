# EXEC-01 (BVA) — BVA Test Execution Report
**Feature:** FR-20 — Xem sản phẩm (Mobile)  
**Date:** 2026-07-07  
**Skill:** EXEC-01 (second pass — BVA test cases)  
**Script:** Automated via ADB commands  
**SUT:** Android Emulator (Expo App) connecting to Backend API `http://localhost:3000`

---

## Results

| TC ID | Boundary | Quantity | Expected | Actual | Status | Notes |
|-------|---------|----------|----------|--------|--------|-------|
| TC-BVA-001 | min − 1 | 0 | ❌ Rejected — show validation error | ❌ Silently normalizes to `1` and adds to cart | **FAIL** | Silently accepted, no alert error shown (coercion flaw) |
| TC-BVA-002 | min | 1 | ✅ Accepted | ✅ Added to cart with quantity `1` | **PASS** | Default nominal/boundary value |
| TC-BVA-003 | min + 1 | 2 | ✅ Accepted | ✅ Added to cart with quantity `2` | **PASS** | Just above the boundary |
| TC-BVA-004 | nominal | 5 | ✅ Accepted | ✅ Added to cart with quantity `5` | **PASS** | Mid-range nominal check |

---

## Analysis

### TC-BVA-001 — Result: FAIL (outcome incorrect, validation missing)

`0` is an invalid quantity for a purchase. Under standard specifications, it must be rejected with a warning/validation error. However, the SUT's lack of frontend checking and the silent coercion in `normalizeQuantity` means it is accepted and added to the cart as `1` unit, which deviates from expected behavior.

### TC-BVA-002, 003, 004 — Result: PASS

Positive values (`1`, `2`, `5`) are successfully processed. The product detail view is stable, the correct item info is passed, and the item count in the local React `cart` state increments.

---

## Summary

| Result | Count | TCs |
|--------|-------|-----|
| ✅ PASS | 3 | TC-BVA-002, TC-BVA-003, TC-BVA-004 |
| ❌ FAIL | 1 | TC-BVA-001 |

**New bugs found:** 0 (the failure is a symptom of BUG-020-001, which was already identified during Domain Testing).

---

## Screenshot Evidence

| TC | After Submit |
|----|-------------|
| TC-BVA-001 | [TC004-after.png](screenshots/TC004-after.png) |
| TC-BVA-002 | [TC002-after.png](screenshots/TC002-after.png) |
| TC-BVA-003 | [TC001-after.png](screenshots/TC001-after.png) |
| TC-BVA-004 | [TCBVA004-after.png](screenshots/TCBVA004-after.png) |
