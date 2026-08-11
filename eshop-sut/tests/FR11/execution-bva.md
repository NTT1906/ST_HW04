# BVA Test Execution Report
**Feature:** FR-11 — Order History View (User)  
**Date:** 2026-07-07  
**Skill:** EXEC-01 (BVA)  
**Script:** `playwright/exec_fr11_bva.js`  
**Evidence:** `tests/FR11/screenshots/TC-BVA-*.png`

---

## Execution Summary

| TC ID | Boundary | Test Value | Expected Result | Actual Result | Status | Notes |
|-------|----------|------------|-----------------|---------------|--------|-------|
| TC-BVA-001 | min | 0 | API returns `[]`; empty state message shown; no table | apiCount=0, emptyMsg=true, table=false | ✅ PASS | |
| TC-BVA-002 | min+1 | 1 | API returns 1 order; table renders 1 row; empty message gone | apiCount=1, emptyMsg=false, tableRows=1 | ✅ PASS | |
| TC-BVA-003 | nominal | 5 | API returns 5 orders; table renders 5 rows | apiCount=5, tableRows=5 | ✅ PASS | |
| TC-BVA-004 | max-1 | 9 | API returns 9 orders; table renders 9 rows; no truncation | apiCount=9, tableRows=9 | ✅ PASS | |
| TC-BVA-005 | max | 10 | API returns exactly 10 orders; table renders 10 rows | apiCount=10, tableRows=10 | ✅ PASS | |
| TC-BVA-006 | max+1 | 19 | API returns ≤10 orders; UI renders ≤10 rows (limit enforced) | apiCount=19, tableRows=19 | ❌ FAIL | **BUG-FR11-001 CONFIRMED**: API returned all 19 orders and UI rendered all 19 rows. |

---

## Detailed Findings

### TC-BVA-006 — Maximum + 1 Boundary Violation ❌ FAIL
- **Boundary Point:** `max+1` (Expected truncation at 10 orders when 11+ exist).
- **Observed Behavior:** The backend API `GET /api/orders/my-orders` returned all 19 orders belonging to `test@eshop.com`. The frontend table displayed all 19 rows. 
- **Significance:** Confirms **BUG-FR11-001** at the boundary of `max+1`. The 10-order pagination limit is not implemented or enforced.

---

## Screenshots Captured

| Test Case | Screenshot |
|-----------|------------|
| TC-BVA-001 | [TC-BVA-001.png](file:///c:/Users/nttis/Downloads/eshop-sut/tests/FR11/screenshots/TC-BVA-001.png) |
| TC-BVA-002 | [TC-BVA-002.png](file:///c:/Users/nttis/Downloads/eshop-sut/tests/FR11/screenshots/TC-BVA-002.png) |
| TC-BVA-003 | [TC-BVA-003.png](file:///c:/Users/nttis/Downloads/eshop-sut/tests/FR11/screenshots/TC-BVA-003.png) |
| TC-BVA-004 | [TC-BVA-004.png](file:///c:/Users/nttis/Downloads/eshop-sut/tests/FR11/screenshots/TC-BVA-004.png) |
| TC-BVA-005 | [TC-BVA-005.png](file:///c:/Users/nttis/Downloads/eshop-sut/tests/FR11/screenshots/TC-BVA-005.png) |
| TC-BVA-006 | [TC-BVA-006.png](file:///c:/Users/nttis/Downloads/eshop-sut/tests/FR11/screenshots/TC-BVA-006.png) |
