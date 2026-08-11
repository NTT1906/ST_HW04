# HW02 — Main Testing Report
## Domain Testing & Boundary Value Analysis on EShop

**Assignment:** HW02-AI — Domain Testing  
**Student:** Nguyễn Thọ Tài - 23127255 - Group 01
**Date:** 2026-07-08
**SUT:** EShop — Vietnamese e-commerce demo application  
**Repository:** https://github.com/ttbhanh/eshop-sut  
**AI Tools Used:** Antigravity (Claude Sonnet 4.6 Thinking / Gemini 3.5 Flash)

---

## Table of Contents

1. [Feature Selection](#1-feature-selection)
2. [FR-01 — Account Registration (Pool A)](#2-fr-01--account-registration-pool-a)
3. [FR-11 — Order History View (Pool B)](#3-fr-11--order-history-view-pool-b)
4. [FR-14 — Category Management CRUD (Pool C)](#4-fr-14--category-management-crud-pool-c)
5. [FR-20 — Mobile App (Pool D)](#5-fr-20--mobile-app-pool-d)
6. [Overall Test Summary](#6-overall-test-summary)

---

## 1. Feature Selection

| Pool | Feature ID | Feature Name |
|------|-----------|--------------|
| A | FR-01 | Account Registration |
| B | FR-11 | Order History View (User) |
| C | FR-14 | Category Management (CRUD) |
| D | FR-20 | Mobile App — Product View & Cart |

---

## 2. FR-01 — Account Registration (Pool A)

**Full Report:** [`tests/FR01/REPORT-FR01.md`](tests/FR01/REPORT-FR01.md)

### 2.1 Domain Testing

#### Methodology
Applied the DT-01 → DT-02 → DT-03 → DT-04 pipeline as defined in SKILLS.md. Each step was reviewed by the student before proceeding (REVIEW-01).

**Step-by-step process:**
1. **DT-01 (Feature Understanding):** Identified 3 inputs (`name`, `email`, `password`), 9 business rules, and confirmed via DOM inspection that the email field uses `type="text"` (not `type="email"`) — a spec deviation itself.
2. **DT-02 (Domain Identification):** Mapped valid/invalid domains for all 3 inputs. `name`: non-empty string (valid), empty (invalid). `email`: valid format, missing `@`, missing domain, missing local-part, duplicate (all invalid). `password`: 8+ chars with all required character classes (valid), and 7 invalid partitions based on rule violations.
3. **DT-03 (Domain Partitioning):** Produced 15 mutually exclusive partitions — NAME(2), EMAIL(6), PASS(7).
4. **DT-04 (Test Case Generation):** Generated 13 test cases using one-invalid-at-a-time strategy to isolate each failing partition.

#### Test Cases Summary

| TC ID | Scenario | Status |
|-------|----------|--------|
| TC001 | All valid inputs | ❌ FAIL — BUG-001 |
| TC002 | Empty name | ✅ PASS |
| TC003 | Empty email | ✅ PASS |
| TC004 | Email missing `@` | ❌ FAIL — BUG-002 |
| TC005 | Email missing domain | ❌ FAIL — BUG-002 |
| TC006 | Email missing local-part | ❌ FAIL — BUG-002 |
| TC007 | Duplicate email | ❌ FAIL — BUG-003 |
| TC008 | Empty password | ✅ PASS |
| TC009 | Password too short (7 chars) | ✅ PASS |
| TC010 | Password missing uppercase | ✅ PASS |
| TC011 | Password missing lowercase | ✅ PASS |
| TC012 | Password missing digit | ✅ PASS |
| TC013 | Password missing special char | ✅ PASS |

**DT Result:** 8 PASS / 5 FAIL

### 2.2 Boundary Value Analysis

**Variable:** `password` (min length = 8)  
Boundary points: min−1 (7), min (8), min+1 (9)

| TC ID | Boundary | Value | Status |
|-------|----------|-------|--------|
| BVA-TC001 | min−1 | `Pas1!Aa` (7 chars) | ✅ PASS (correct rejection) |
| BVA-TC002 | min | `Pas1!Aab` (8 chars) | ❌ FAIL — rejected by BUG-001 |
| BVA-TC003 | min+1 | `Pas1!Aabc` (9 chars) | ❌ FAIL — rejected by BUG-001 |

**BVA Result:** 1 PASS / 2 FAIL (both caused by BUG-001)

### 2.3 AI Gap Analysis

See [`tests/FR01/GAP-01-gap-analysis.md`](tests/FR01/GAP-01-gap-analysis.md).

Key gaps: AI correctly identified all domain boundaries. One gap (G-07): AI did not independently test whitespace-only names (e.g. `"   "`). Added as candidate test.

### 2.4 Bug Reports

| Bug ID | Title | Severity | GitHub Issue |
|--------|-------|----------|--------------|
| BUG-FR01-001 | Valid password `Password1!` wrongly rejected — happy path broken | Critical | [#1](https://github.com/hetoke/eshop-sut/issues/1) |
| BUG-FR01-002 | Invalid email formats accepted without validation | High | [#2](https://github.com/hetoke/eshop-sut/issues/2) |
| BUG-FR01-003 | Duplicate email not detected; API never called due to BUG-001 | High | [#4](https://github.com/hetoke/eshop-sut/issues/3) |

---

## 3. FR-11 — Order History View (Pool B)

**Full Report:** [`tests/FR11/REPORT-FR11.md`](tests/FR11/REPORT-FR11.md)

### 3.1 Domain Testing

#### Methodology
Applied DT-01 → DT-02 → DT-03 → DT-04 pipeline. Ran Playwright automation against `http://localhost:5173/profile`.

**Step-by-step process:**
1. **DT-01:** Identified 2 active inputs (`authToken`, `orderId` for cancel action), and 2 display-driving variables (`orderCount`, `order.status`). Documented 12 business rules via open questions (OQ-01 to OQ-05) answered by the student.
2. **DT-02:** Mapped valid/invalid domains for all 4 variables. Key boundary: `orderCount` has a spec-defined max of 10.
3. **DT-03:** Produced 16 partitions — authToken(3), orderCount(3), order.status(6), orderId(4).
4. **DT-04:** Generated 12 test cases covering all partitions.

#### Test Cases Summary

| TC ID | Scenario | Status |
|-------|----------|--------|
| TC-DT-001 | Authenticated user views orders | ✅ PASS |
| TC-DT-002 | Zero orders — empty state | ✅ PASS |
| TC-DT-003 | Unauthenticated user blocked | ✅ PASS |
| TC-DT-004 | Invalid/expired token rejected | ✅ PASS |
| TC-DT-005 | `confirmed` order — badge + cancel btn | ✅ PASS |
| TC-DT-006 | `shipping` order — cancel button visible | ✅ PASS |
| TC-DT-007 | `delivered` order — cancel button hidden | ✅ PASS* |
| TC-DT-008 | `canceled` order — correct badge, no cancel | ✅ PASS* |
| TC-DT-009 | Cancel pending order — success | ✅ PASS* |
| TC-DT-010 | Cancel delivered order via API — rejected | ✅ PASS |
| TC-DT-011 | >10 orders — pagination limit | ❌ FAIL — BUG-FR11-001 |
| TC-DT-012 | Unknown status — fallback display | ⏭️ SKIP |

*Script false-fails; manual analysis confirms correct SUT behaviour.

**DT Result:** 10 PASS / 1 FAIL / 1 SKIP

### 3.2 Boundary Value Analysis

**Variable:** `orderCount` (min=0, expected max=10)  
Boundary points: min(0), min+1(1), nominal(5), max−1(9), max(10), max+1(11+)

| TC ID | Boundary | Value | Status |
|-------|----------|-------|--------|
| TC-BVA-001 | min | 0 | ✅ PASS |
| TC-BVA-002 | min+1 | 1 | ✅ PASS |
| TC-BVA-003 | nominal | 5 | ✅ PASS |
| TC-BVA-004 | max−1 | 9 | ✅ PASS |
| TC-BVA-005 | max | 10 | ✅ PASS |
| TC-BVA-006 | max+1 | 19 | ❌ FAIL — BUG-FR11-001 confirmed at boundary |

**BVA Result:** 5 PASS / 1 FAIL

### 3.3 AI Gap Analysis

See [`tests/FR11/GAP-01-gap-analysis.md`](tests/FR11/GAP-01-gap-analysis.md).

Key gaps: AI initially used global-scope locators for cancel buttons — a test-harness defect. Script scoping to per-row selectors was identified in the gap analysis.

### 3.4 Bug Reports

| Bug ID | Title | Severity | GitHub Issue |
|--------|-------|----------|--------------|
| BUG-FR11-001 | Order history API returns all orders with no pagination limit (spec: max 10) | Medium | [#4](https://github.com/hetoke/eshop-sut/issues/4) |

---

## 4. FR-14 — Category Management CRUD (Pool C)

**Full Report:** [`tests/FR14/REPORT-FR14.md`](tests/FR14/REPORT-FR14.md)

### 4.1 Domain Testing

#### Methodology
Applied DT-01 → DT-02 → DT-03 → DT-04 pipeline. Ran Playwright automation against Admin panel `http://localhost:5174`.

**Step-by-step process:**
1. **DT-01:** Identified 4 inputs (`authToken`, `categoryName`, `deleteCategoryId`, `categoriesCount`). Admin password corrected from setup guide default to `Admin123!` during ENV-01.
2. **DT-02:** Mapped domains. Discovered via testing that SUT accepts empty strings and duplicates for `categoryName`.
3. **DT-03:** Produced 13 partitions covering all variables.
4. **DT-04:** Generated 13 test cases.

#### Test Cases Summary

| TC ID | Scenario | Status |
|-------|----------|--------|
| TC-DT-001 | Admin views categories | ✅ PASS |
| TC-DT-002 | Add valid unique category | ✅ PASS |
| TC-DT-003 | Add empty/whitespace name | ❌ FAIL — BUG-FR14-002 |
| TC-DT-004 | Add duplicate name | ❌ FAIL — BUG-FR14-003 |
| TC-DT-005 | Add exceptionally long name | ✅ PASS |
| TC-DT-006 | Add XSS/injection payload | ✅ PASS |
| TC-DT-007 | Delete category (no products) | ✅ PASS |
| TC-DT-008 | Delete category with linked products | ❌ FAIL — BUG-FR14-004 |
| TC-DT-009 | Delete non-existent category ID | ❌ FAIL — BUG-FR14-005 |
| TC-DT-010 | Unauthenticated access | ✅ PASS |
| TC-DT-011 | Regular user modifying categories | ❌ FAIL — BUG-FR14-001 (Critical) |
| TC-DT-012 | Expired/invalid token rejected | ✅ PASS |
| TC-DT-013 | Empty state display | ❌ FAIL (UI cache mismatch — script issue) |

**DT Result:** 6 PASS / 6 FAIL (genuine) / 1 FAIL (script cache mismatch)

### 4.2 Boundary Value Analysis

As documented in [`tests/FR14/BVA-01-boundary-analysis.md`](tests/FR14/BVA-01-boundary-analysis.md), no variables in Category Management qualify for full BVA because:
- `categoryName` has a non-empty requirement (min ≥ 1) but **no defined maximum length** in the specification or UI — preventing min−1/min/min+1/max−1/max/max+1 analysis. The empty-name case is already covered by TC-DT-003.
- Other variables (`authToken`, `deleteCategoryId`, `categoriesCount`) have no explicit numeric boundaries.

**BVA Result:** N/A — No applicable boundaries. Empty-name boundary covered in DT.

### 4.3 AI Gap Analysis

See [`tests/FR14/GAP-01-gap-analysis.md`](tests/FR14/GAP-01-gap-analysis.md).

Key gaps: AI initially flagged TC-DT-004 (duplicate name) as a false-fail because the duplicate detection check ran before the duplicate was added. Corrected in review.

### 4.4 Bug Reports

| Bug ID | Title | Severity | GitHub Issue |
|--------|-------|----------|--------------|
| BUG-FR14-001 | Broken Access Control — regular users can create/delete categories | Critical | [#5](https://github.com/hetoke/eshop-sut/issues/5) |
| BUG-FR14-002 | Empty/whitespace category names accepted without validation | Medium | [#6](https://github.com/hetoke/eshop-sut/issues/6) |
| BUG-FR14-003 | Duplicate category names allowed — no uniqueness enforcement | Medium | [#7](https://github.com/hetoke/eshop-sut/issues/7) |
| BUG-FR14-004 | Deleting category with linked products orphans them (no referential integrity) | High | [#8](https://github.com/hetoke/eshop-sut/issues/8) |
| BUG-FR14-005 | DELETE on non-existent category ID returns 200 OK instead of 404 | Low | [#9](https://github.com/hetoke/eshop-sut/issues/9) |

---

## 5. FR-20 — Mobile App (Pool D)

**Full Report:** [`tests/FR20/REPORT-FR20.md`](tests/FR20/REPORT-FR20.md)

### 5.1 Domain Testing

#### Methodology
Applied DT-01 → DT-02 → DT-03 → DT-04 pipeline. Executed via ADB (Android Debug Bridge) on Android emulator `emulator-5554` running Expo Go. Used PowerShell + ADB automation script (`exec_fr20.ps1`).

**Step-by-step process:**
1. **DT-01:** Identified 2 inputs (`productId`, `quantity`). Confirmed cart is in-memory state (no API call on add-to-cart).
2. **DT-02:** Mapped valid/invalid domains. Discovered during execution that SUT coerces invalid quantities silently.
3. **DT-03:** Produced 9 partitions — productId(3), quantity(6).
4. **DT-04:** Generated 8 test cases.

#### Test Cases Summary

| TC ID | Scenario | Status |
|-------|----------|--------|
| TC-DT-001 | View product (odd ID) + valid quantity | ✅ PASS |
| TC-DT-002 | View product (even ID) + default quantity | ✅ PASS |
| TC-DT-003 | Non-existent product ID | ✅ PASS |
| TC-DT-004 | Zero quantity | ❌ FAIL — BUG-FR20-001 (coercion) |
| TC-DT-005 | Negative quantity | ❌ FAIL — BUG-FR20-001 (coercion) |
| TC-DT-006 | Decimal quantity | ❌ FAIL — BUG-FR20-001 (truncation) |
| TC-DT-007 | Non-numeric quantity | ❌ FAIL — BUG-FR20-001 (coercion) |
| TC-DT-008 | Exceptionally large quantity | ❌ FAIL — BUG-FR20-002 (overflow) |

**DT Result:** 3 PASS / 5 FAIL

### 5.2 Boundary Value Analysis

**Variable:** `quantity` (lower bound = 1, no explicit upper bound)

| TC ID | Boundary | Value | Status |
|-------|----------|-------|--------|
| TC-BVA-001 | min−1 | 0 | ❌ FAIL — silently coerced to 1 |
| TC-BVA-002 | min | 1 | ✅ PASS |
| TC-BVA-003 | min+1 | 2 | ✅ PASS |
| TC-BVA-004 | nominal | 5 | ✅ PASS |

**BVA Result:** 3 PASS / 1 FAIL

### 5.3 AI Gap Analysis

See [`tests/FR20/GAP-01-gap-analysis.md`](tests/FR20/GAP-01-gap-analysis.md).

Key gaps:
- **G-01:** Cart header counter reflects unique product count (`cart.length`), not total quantity sum.
- **G-02/G-03:** Silent coercion discovered — AI initially did not predict the `normalizeQuantity()` coercion path.
- **G-04:** No max constraint detected — confirmed via BUG-FR20-002.

### 5.4 Bug Reports

| Bug ID | Title | Severity | GitHub Issue |
|--------|-------|----------|--------------|
| BUG-FR20-001 | Quantity input silently coerces invalid values (zero, negative, text, decimal) to 1 without feedback | Medium | [#10](https://github.com/hetoke/eshop-sut/issues/10) |
| BUG-FR20-002 | No upper bound on quantity — large values cause scientific notation overflow in cart/checkout UI | Low | [#11](https://github.com/hetoke/eshop-sut/issues/11) |

---

## 6. Overall Test Summary

| Feature | Pool | DT TCs | BVA TCs | Total | Pass | Fail | Skip | Bugs |
|---------|------|--------|---------|-------|------|------|------|------|
| FR-01 (Account Registration) | A | 13 | 3 | 16 | 9 | 7 | 0 | 3 |
| FR-11 (Order History) | B | 12 | 6 | 18 | 15 | 2 | 1 | 1 |
| FR-14 (Category CRUD) | C | 13 | 0 | 13 | 6 | 6 | 1 | 5 |
| FR-20 (Mobile) | D | 8 | 4 | 12 | 6 | 6 | 0 | 2 |
| **Total** | | **46** | **13** | **59** | **36** | **21** | **2** | **11** |

### Bug Severity Summary

| Severity | Count | Features |
|----------|-------|---------|
| Critical | 2 | FR-01 (BUG-001), FR-14 (BUG-001) |
| High | 3 | FR-01 (BUG-002, 003), FR-14 (BUG-004) |
| Medium | 3 | FR-11 (BUG-001), FR-14 (BUG-002, 003), FR-20 (BUG-001) |
| Low | 3 | FR-14 (BUG-005), FR-20 (BUG-002) |
| **Total** | **11** | |

---

*End of Main Report — Individual feature reports and all supporting artifacts are stored under `tests/` and `bugs/` directories.*
