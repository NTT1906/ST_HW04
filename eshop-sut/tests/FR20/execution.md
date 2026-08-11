# EXEC-01 — Test Execution Report
**Feature:** FR-20 — Xem sản phẩm (Mobile)  
**Date:** 2026-07-07  
**Skill:** EXEC-01  
**Script:** `tests/FR20/scripts/exec_fr20.ps1`  
**SUT:** Android Emulator (Expo App) connecting to Backend API `http://localhost:3000`

---

## Execution Method

- Automated via ADB coordinates and screen tapping on the Android Emulator (`emulator-5554`).
- Input values (such as quantity) were entered using ADB keyboard simulation.
- Screenshots were automatically captured before and after major actions and saved to `tests/FR20/screenshots/`.
- Backend endpoints and behaviors were verified against `App.js` source code logic and direct API queries.

---

## Results

| TC ID | Description | Expected Result | Actual Result | Status | Notes |
|-------|-------------|-----------------|---------------|--------|-------|
| TC-DT-001 | View Odd Product ID and add valid quantity | Detail view loads price as `30,000,000 ₫`. Success alert appears; cart increments. | ✅ Detail view loads. Success alert appears; unique item added to cart. | **PASS** | Nominal path works. Cart counts unique items. |
| TC-DT-002 | View Even Product ID and add default quantity | Detail view loads price as `28,000,000 ₫` (string formatted cleanly). Success alert appears. | ✅ Price is parsed as number and formatted as `28,000,000 ₫`. Success alert appears. | **PASS** | Backend string price format is handled. |
| TC-DT-003 | View non-existent product details | Returns empty object `{}`. Client shows blank state page. | ✅ Backend API returns `{}` and frontend displays: `"Sản phẩm không tồn tại (Lỗi trắng trang do data rỗng)"`. | **PASS** | Verified via code audit of `App.js` and direct API check. |
| TC-DT-004 | Add product to cart with quantity of zero | Rejected with error validation alert. | ❌ Silently normalizes quantity to `1` and adds to cart with success alert. | **FAIL** | 🐛 SUT lacks input validation; zero is coerced to 1. |
| TC-DT-005 | Add product to cart with negative quantity | Rejected with error validation alert. | ❌ Silently normalizes quantity to `1` and adds to cart with success alert. | **FAIL** | 🐛 SUT lacks input validation; negative is coerced to 1. |
| TC-DT-006 | Add product to cart with decimal quantity | Blocked or rounded to nearest integer with warning. | ❌ Truncates `2.5` to `2` using `parseInt` and adds to cart. | **FAIL** | 🐛 SUT lacks decimal validation; float truncated. |
| TC-DT-007 | Add product to cart with non-numeric quantity | Blocked with validation error. | ❌ Silently normalizes empty/text to `1` and adds to cart. | **FAIL** | 🐛 SUT lacks numeric format validation; text coerced to 1. |
| TC-DT-008 | Add product to cart with exceptionally large quantity | Rejected with maximum purchase limit error. | ❌ Stored raw `999999999999` in cart. | **FAIL** | 🐛 SUT lacks upper bound check; causes overflow/layout issues. |

---

## Summary

| Result | Count | TC IDs |
|--------|-------|--------|
| ✅ PASS | 3 | TC-DT-001, TC-DT-002, TC-DT-003 |
| ❌ FAIL | 5 | TC-DT-004, TC-DT-005, TC-DT-006, TC-DT-007, TC-DT-008 |

---

## Bug Candidates

| Bug # | TC | Description | Severity Estimate |
|-------|-----|-------------|-----------------|
| BUG-020-001 | TC-DT-004, TC-DT-005, TC-DT-006, TC-DT-007 | **Missing Quantity Validation / Coercion Flaw**: The mobile app lacks user-facing validation errors for invalid quantity inputs (zero, negative, decimal, text, or empty). Instead, it silently normalizes them to `1` (or truncates floats) and adds them to the cart. | **Medium** |
| BUG-020-002 | TC-DT-008 | **Missing Quantity Upper Bound Check**: The quantity field accepts exceptionally large values (e.g. `999999999999`), which causes floating-point price calculation overflow and corrupts the cart's total sum layout on the checkout/cart screens. | **Low** |

---

## Evidence

| TC | Before | After |
|----|--------|-------|
| TC-DT-001 | [TC001-before.png](screenshots/TC001-before.png) | [TC001-after.png](screenshots/TC001-after.png) |
| TC-DT-002 | [TC002-before.png](screenshots/TC002-before.png) | [TC002-after.png](screenshots/TC002-after.png) |
| TC-DT-003 | *N/A (API level check)* | *N/A (Front-end code verification)* |
| TC-DT-004 | *Same as TC-DT-001 before* | [TC004-after.png](screenshots/TC004-after.png) |
| TC-DT-005 | *Same as TC-DT-001 before* | [TC005-after.png](screenshots/TC005-after.png) |
| TC-DT-006 | *Same as TC-DT-001 before* | [TC006-after.png](screenshots/TC006-after.png) |
| TC-DT-007 | *Same as TC-DT-001 before* | [TC007-after.png](screenshots/TC007-after.png) |
| TC-DT-008 | *Same as TC-DT-001 before* | [TC008-after.png](screenshots/TC008-after.png) |

---

## Observations

1. **In-memory Cart State**: Adding products to the cart in the mobile client does not trigger any HTTP request to `POST /api/cart`. The state is fully managed in-memory on the client via `useState`.
2. **Even ID String Formats**: The backend server returns prices as string types for products with even IDs (`row.id % 2 === 0`). The mobile client handles this cleanly on load using `Number(value)`.
3. **Blank State Handling**: When attempting to fetch non-existent products, the backend returns `{}`. The mobile app detects this and renders a fallback message page, although the layout has a simple visual style.
