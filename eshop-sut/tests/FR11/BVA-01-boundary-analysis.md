# BVA-01 — Boundary Value Analysis
**Feature:** FR-11 — Order History View (User)  
**Date:** 2026-07-07  
**Skill:** BVA-01  
**Input:** Verified `tests/FR11/DT-02-domain-identification.md`

---

## Variable Eligibility Assessment

| Variable | Type | Has Explicit Boundary? | BVA Applicable? | Reason |
|----------|------|----------------------|-----------------|--------|
| `authToken` | String (JWT) | No | ❌ No | No numeric, length, or ordered boundary specified |
| `orderCount` | Integer ≥ 0 | **Yes** | ✅ Yes | Explicit boundaries: min=0, max=10 (confirmed via OQ-04) |
| `order.status` | Enum (String) | No | ❌ No | Categorical values, not ordered or numeric |
| `orderId` (cancel) | Integer > 0 | Partial | ❌ No | System-generated ID; no user-specified min/max range in requirements |

> **Only `orderCount` qualifies for BVA** per skill rule: *"Skip variables without explicit boundaries."*

---

## Variable: `orderCount` — Boundary Value Analysis

### Boundary Definition

| Boundary Point | Value | Description |
|---------------|-------|-------------|
| **Minimum (min)** | `0` | No orders exist — empty state rendered |
| **Minimum + 1 (min+1)** | `1` | First order exists — table appears for the first time |
| **Nominal** | `5` | Mid-range — stable table with multiple rows |
| **Maximum − 1 (max−1)** | `9` | One below the stated pagination limit |
| **Maximum (max)** | `10` | Stated maximum: exactly 10 orders returned (OQ-04) |
| **Maximum + 1 (max+1)** | `11` | Beyond the limit — should be truncated to 10 |

---

## BVA Test Cases

### TC-BVA-001 — Minimum: 0 orders (empty state)

| Field | Value |
|-------|-------|
| **TC ID** | TC-BVA-001 |
| **Variable** | `orderCount` |
| **Boundary** | Minimum (min = 0) |
| **Test Value** | 0 |
| **Precondition** | Authenticated user with **zero** orders |
| **Input** | Navigate to `/profile` |
| **Expected Result** | "Bạn chưa có đơn hàng nào." displayed. No table rendered. API returns `[]`. |
| **Business Rule** | BR-03 |

---

### TC-BVA-002 — Minimum + 1: 1 order (table appears)

| Field | Value |
|-------|-------|
| **TC ID** | TC-BVA-002 |
| **Variable** | `orderCount` |
| **Boundary** | Minimum + 1 (min+1 = 1) |
| **Test Value** | 1 |
| **Precondition** | Authenticated user with **exactly 1** order |
| **Input** | Navigate to `/profile` |
| **Expected Result** | Order history table is rendered with **exactly 1 row**. Empty state message is NOT shown. |
| **Business Rule** | BR-04 |

---

### TC-BVA-003 — Nominal: 5 orders

| Field | Value |
|-------|-------|
| **TC ID** | TC-BVA-003 |
| **Variable** | `orderCount` |
| **Boundary** | Nominal (5) |
| **Test Value** | 5 |
| **Precondition** | Authenticated user with **exactly 5** orders |
| **Input** | Navigate to `/profile` |
| **Expected Result** | Order history table renders **5 rows** correctly. All 5 orders visible. |
| **Business Rule** | BR-04, BR-10 |

---

### TC-BVA-004 — Maximum − 1: 9 orders

| Field | Value |
|-------|-------|
| **TC ID** | TC-BVA-004 |
| **Variable** | `orderCount` |
| **Boundary** | Maximum − 1 (max−1 = 9) |
| **Test Value** | 9 |
| **Precondition** | Authenticated user with **exactly 9** orders |
| **Input** | Navigate to `/profile` |
| **Expected Result** | API returns all 9 orders. UI renders **9 rows**. No truncation occurs. |
| **Business Rule** | BR-04, BR-10 |

---

### TC-BVA-005 — Maximum: 10 orders (at the limit)

| Field | Value |
|-------|-------|
| **TC ID** | TC-BVA-005 |
| **Variable** | `orderCount` |
| **Boundary** | Maximum (max = 10) |
| **Test Value** | 10 |
| **Precondition** | Authenticated user with **exactly 10** orders |
| **Input** | Navigate to `/profile` |
| **Expected Result** | API returns exactly 10 orders. UI renders **10 rows**. No truncation. |
| **Business Rule** | BR-04, BR-10 |

---

### TC-BVA-006 — Maximum + 1: 11 orders (beyond the limit)

| Field | Value |
|-------|-------|
| **TC ID** | TC-BVA-006 |
| **Variable** | `orderCount` |
| **Boundary** | Maximum + 1 (max+1 = 11) |
| **Test Value** | 11 |
| **Precondition** | Authenticated user with **11 or more** orders |
| **Input** | Navigate to `/profile` |
| **Expected Result** | API returns **maximum 10 orders** (truncates at limit). UI renders **10 rows** only. Orders beyond position 10 are not displayed. |
| **Business Rule** | BR-10 |
| **⚠️ Note** | This boundary is already violated — **BUG-FR11-001** was filed after TC-DT-011 showed 19 orders returned. This BVA test case confirms the exact boundary point of the failure. |

---

## BVA Summary Table

| TC ID | Boundary | Test Value | Expected | Business Rule |
|-------|---------|-----------|----------|--------------|
| TC-BVA-001 | min | 0 | Empty state message | BR-03 |
| TC-BVA-002 | min+1 | 1 | Table with 1 row | BR-04 |
| TC-BVA-003 | nominal | 5 | Table with 5 rows | BR-04, BR-10 |
| TC-BVA-004 | max−1 | 9 | Table with 9 rows, no truncation | BR-04, BR-10 |
| TC-BVA-005 | max | 10 | Table with exactly 10 rows | BR-04, BR-10 |
| TC-BVA-006 | max+1 | 11+ | API truncates to 10; UI shows 10 rows | BR-10 |

---

## Human Review Checklist

- [ ] Every boundary identified
- [ ] Invalid boundaries included
- [ ] Nominal value selected correctly
