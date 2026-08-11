# DT-04 — Domain Test Case Generation
**Feature:** FR-20 — Xem sản phẩm (Mobile)  
**Date:** 2026-07-07  
**Skill:** DT-04  
**Input:** Verified `tests/FR20/DT-03-domain-partitioning.md`

---

## Coverage Strategy

- One representative value per partition (minimum coverage).
- Focus on verifying expected specifications (under the domain model) and SUT actual behaviors (including coercion, truncation, and validation gaps).
- **9 partitions** across 2 variables are fully covered by these 8 test cases.

---

## Test Cases

### TC-DT-001 — View product details for Odd ID and add valid quantity (Nominal Path)

| Field | Value |
|-------|-------|
| **TC ID** | TC-DT-001 |
| **Covered Partitions** | PID-P1, QTY-P1 |
| **Covered Business Rules** | BR-01, BR-02, BR-03, BR-04 |
| **Precondition** | Product with Odd ID `#1` (iPhone 15 Pro Max) exists in SUT database. |
| **Input** | Navigate to details for product ID `1`. Enter `"2"` in the Quantity field and click "Thêm vào giỏ hàng". |
| **Expected Result** | Product detail page renders successfully (name, price: `30,000,000 ₫`, description). Success alert `"Đã thêm vào giỏ hàng"` appears. Cart counter increments by `2`. |
| **Covered Domain** | PID-P1 (odd product ID), QTY-P1 (valid quantity $X \ge 1$) |

---

### TC-DT-002 — View product details for Even ID and add default quantity (Data Formatting Path)

| Field | Value |
|-------|-------|
| **TC ID** | TC-DT-002 |
| **Covered Partitions** | PID-P2, QTY-P1 |
| **Covered Business Rules** | BR-01, BR-02, BR-03, BR-04 |
| **Precondition** | Product with Even ID `#2` (Samsung Galaxy S24 Ultra) exists in SUT database. |
| **Input** | Navigate to details for product ID `2`. Leave quantity as default `"1"`. Click "Thêm vào giỏ hàng". |
| **Expected Result** | Product detail page renders successfully (price string sent from backend is parsed cleanly by frontend and shown as `28,000,000 ₫`). Success alert appears. Cart counter increments by `1`. |
| **Covered Domain** | PID-P2 (even product ID), QTY-P1 (valid quantity $X = 1$) |

---

### TC-DT-003 — View non-existent product details (Failure Path)

| Field | Value |
|-------|-------|
| **TC ID** | TC-DT-003 |
| **Covered Partitions** | PID-P3 |
| **Covered Business Rules** | BR-01 |
| **Precondition** | Product ID `999` does not exist in the database. |
| **Input** | Attempt to view details for product ID `999`. |
| **Expected Result** | SUT returns empty object `{}` and displays a blank state page with the message: `"Sản phẩm không tồn tại (Lỗi trắng trang do data rỗng)"`. |
| **Covered Domain** | PID-P3 (non-existent product ID) |

---

### TC-DT-004 — Add product to cart with quantity of zero (SUT validation flaw)

| Field | Value |
|-------|-------|
| **TC ID** | TC-DT-004 |
| **Covered Partitions** | PID-P1, QTY-P2 |
| **Covered Business Rules** | BR-04, BR-05 |
| **Precondition** | On product `#1` detail page. |
| **Input** | Enter `"0"` in quantity field. Click "Thêm vào giỏ hàng". |
| **Expected Result** | **Expected (Spec):** Input rejected with error validation alert "Số lượng phải lớn hơn 0". <br>**Actual (SUT):** Silently normalizes quantity to `1` and adds item to cart. Success alert is shown. |
| **Covered Domain** | PID-P1, QTY-P2 (zero quantity) |

---

### TC-DT-005 — Add product to cart with negative quantity (SUT validation flaw)

| Field | Value |
|-------|-------|
| **TC ID** | TC-DT-005 |
| **Covered Partitions** | PID-P1, QTY-P3 |
| **Covered Business Rules** | BR-04, BR-05 |
| **Precondition** | On product `#1` detail page. |
| **Input** | Enter `"-5"` in quantity field. Click "Thêm vào giỏ hàng". |
| **Expected Result** | **Expected (Spec):** Input rejected with error validation alert "Số lượng phải lớn hơn 0". <br>**Actual (SUT):** Silently normalizes quantity to `1` and adds item to cart. Success alert is shown. |
| **Covered Domain** | PID-P1, QTY-P3 (negative quantity) |

---

### TC-DT-006 — Add product to cart with decimal quantity (SUT truncation)

| Field | Value |
|-------|-------|
| **TC ID** | TC-DT-006 |
| **Covered Partitions** | PID-P1, QTY-P4 |
| **Covered Business Rules** | BR-04, BR-05 |
| **Precondition** | On product `#1` detail page. |
| **Input** | Enter `"2.5"` in quantity field. Click "Thêm vào giỏ hàng". |
| **Expected Result** | **Expected (Spec):** Blocked or rounded to nearest integer with warning. <br>**Actual (SUT):** Truncates to integer `2` via `parseInt` and adds `2` items to cart. Success alert is shown. |
| **Covered Domain** | PID-P1, QTY-P4 (decimal quantity) |

---

### TC-DT-007 — Add product to cart with non-numeric quantity (SUT validation flaw)

| Field | Value |
|-------|-------|
| **TC ID** | TC-DT-007 |
| **Covered Partitions** | PID-P1, QTY-P5 |
| **Covered Business Rules** | BR-04, BR-05 |
| **Precondition** | On product `#1` detail page. |
| **Input** | Clear quantity input (or enter `"abc"`). Click "Thêm vào giỏ hàng". |
| **Expected Result** | **Expected (Spec):** Blocked with validation error. <br>**Actual (SUT):** Silently normalizes quantity to `1` and adds item to cart. Success alert is shown. |
| **Covered Domain** | PID-P1, QTY-P5 (non-numeric / empty quantity) |

---

### TC-DT-008 — Add product to cart with exceptionally large quantity

| Field | Value |
|-------|-------|
| **TC ID** | TC-DT-008 |
| **Covered Partitions** | PID-P1, QTY-P6 |
| **Covered Business Rules** | BR-04 |
| **Precondition** | On product `#1` detail page. |
| **Input** | Enter `"999999999999"` in quantity field. Click "Thêm vào giỏ hàng". |
| **Expected Result** | Adds `999999999999` items to cart. Verify if frontend has integer overflow issues or visual layout breakage. |
| **Covered Domain** | PID-P1, QTY-P6 (exceptionally large quantity) |

---

## Partition Coverage Summary

| Partition ID | Variable | Covered By TC | Expected Validity | SUT Validity |
|-------------|----------|---------------|-------------------|--------------|
| **QTY-P1** | `quantity` | TC-DT-001, TC-DT-002 | Valid | Valid |
| **QTY-P2** | `quantity` | TC-DT-004 | Invalid | Valid (Silently coerced to 1) |
| **QTY-P3** | `quantity` | TC-DT-005 | Invalid | Valid (Silently coerced to 1) |
| **QTY-P4** | `quantity` | TC-DT-006 | Invalid | Valid (Parsed as truncated int) |
| **QTY-P5** | `quantity` | TC-DT-007 | Invalid | Valid (Silently coerced to 1) |
| **QTY-P6** | `quantity` | TC-DT-008 | Invalid | Valid (Stored raw) |
| **PID-P1** | `productId` | TC-DT-001, 004, 005, 006, 007, 008 | Valid | Valid |
| **PID-P2** | `productId` | TC-DT-002 | Valid | Valid |
| **PID-P3** | `productId` | TC-DT-003 | Invalid | Valid (Blank page message) |

---

## Acceptance Criteria Check

- [x] Every partition covered (9/9 partitions).
- [x] Every business rule exercised (BR-01 through BR-05).
- [x] No duplicated test cases.
