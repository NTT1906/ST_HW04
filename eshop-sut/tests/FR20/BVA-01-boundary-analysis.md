# BVA-01 — Boundary Value Analysis
**Feature:** FR-20 — Xem sản phẩm (Mobile)  
**Date:** 2026-07-07  
**Skill:** BVA-01  
**Input:** Verified `tests/FR20/DT-02-domain-identification.md`

---

## Variable Eligibility Assessment

| Variable | Type | Has Explicit Boundary? | BVA Applicable? | Reason |
|----------|------|----------------------|-----------------|--------|
| `quantity` | Integer | **Yes** (Lower Bound) | ✅ Yes | Explicit lower bound is `1` (default value). No upper bound is defined. |
| `productId` | Integer | No | ❌ No | ID values are categories/keys; no user-specified range. |

---

## Variable: `quantity` — Boundary Value Analysis

Since there is no explicit maximum boundary specified in SUT requirements or backend schema (no stock count is recorded), we focus on the lower boundary of the purchase quantity field.

### Boundary Definition

| Boundary Point | Value | Description | Expected Behavior | SUT Actual Behavior (Deviation) |
|---------------|-------|-------------|-------------------|---------------------------------|
| **Minimum − 1 (min−1)** | `0` | Invalid value | Rejected with validation error | Silently normalizes to `1` and adds to cart |
| **Minimum (min)** | `1` | Smallest valid quantity (Default) | Added to cart with quantity `1` | Added to cart with quantity `1` successfully |
| **Minimum + 1 (min+1)** | `2` | Just above the boundary | Added to cart with quantity `2` | Added to cart with quantity `2` successfully |
| **Nominal** | `5` | Standard quantity | Added to cart with quantity `5` | Added to cart with quantity `5` successfully |

---

## BVA Test Cases

### TC-BVA-001 — Quantity Minimum − 1: 0 (Invalid boundary)

| Field | Value |
|-------|-------|
| **TC ID** | TC-BVA-001 |
| **Variable** | `quantity` |
| **Boundary** | Minimum − 1 (min−1 = 0) |
| **Test Value** | `0` |
| **Precondition** | On product details page. |
| **Input** | Enter `"0"` in quantity field and click "Thêm vào giỏ hàng". |
| **Expected Result** | **Expected (Spec):** Action blocked, displays error alert "Số lượng phải lớn hơn 0". <br>**Actual (SUT):** Silently normalizes to `1` and adds item to cart. |
| **Business Rule** | BR-04, BR-05 |

---

### TC-BVA-002 — Quantity Minimum: 1 (Valid boundary / Nominal)

| Field | Value |
|-------|-------|
| **TC ID** | TC-BVA-002 |
| **Variable** | `quantity` |
| **Boundary** | Minimum (min = 1) |
| **Test Value** | `1` |
| **Precondition** | On product details page. |
| **Input** | Leave quantity as default `"1"` and click "Thêm vào giỏ hàng". |
| **Expected Result** | Product is added to the cart with quantity `1`. Success alert pops up. |
| **Business Rule** | BR-02, BR-04 |

---

### TC-BVA-003 — Quantity Minimum + 1: 2

| Field | Value |
|-------|-------|
| **TC ID** | TC-BVA-003 |
| **Variable** | `quantity` |
| **Boundary** | Minimum + 1 (min+1 = 2) |
| **Test Value** | `2` |
| **Precondition** | On product details page. |
| **Input** | Enter `"2"` in quantity field and click "Thêm vào giỏ hàng". |
| **Expected Result** | Product is added to the cart with quantity `2`. Success alert pops up. |
| **Business Rule** | BR-04 |

---

### TC-BVA-004 — Quantity Nominal: 5

| Field | Value |
|-------|-------|
| **TC ID** | TC-BVA-004 |
| **Variable** | `quantity` |
| **Boundary** | Nominal (5) |
| **Test Value** | `5` |
| **Precondition** | On product details page. |
| **Input** | Enter `"5"` in quantity field and click "Thêm vào giỏ hàng". |
| **Expected Result** | Product is added to the cart with quantity `5`. Success alert pops up. |
| **Business Rule** | BR-04 |

---

## BVA Summary Table

| TC ID | Boundary | Test Value | Expected | SUT Actual Behavior | Business Rule |
|-------|---------|-----------|----------|---------------------|--------------|
| TC-BVA-001 | min−1 | 0 | Error validation alert | Silently normalizes to 1 | BR-05 |
| TC-BVA-002 | min | 1 | Adds 1 to cart successfully | Adds 1 to cart successfully | BR-02, BR-04 |
| TC-BVA-003 | min+1 | 2 | Adds 2 to cart successfully | Adds 2 to cart successfully | BR-04 |
| TC-BVA-004 | nominal | 5 | Adds 5 to cart successfully | Adds 5 to cart successfully | BR-04 |

---

## Human Review Checklist

- [x] Every boundary identified
- [x] Invalid boundaries included
- [x] Nominal value selected correctly
