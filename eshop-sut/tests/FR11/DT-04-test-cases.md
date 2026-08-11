# DT-04 — Domain Test Case Generation
**Feature:** FR-11 — Order History View (User)  
**Date:** 2026-07-07  
**Skill:** DT-04  
**Input:** Verified `tests/FR11/DT-03-domain-partitioning.md`

---

## Coverage Strategy

- One representative value per partition (minimum coverage).
- Combined test cases where multiple variables must be exercised together (e.g., a specific order status requires a valid token and non-zero order count).
- Priority given to partitions that cover distinct business rules.
- **16 partitions** across 4 variables → test cases designed to cover all 16.

---

## Test Cases

### TC-DT-001 — Valid authenticated user views order history (nominal path)

| Field | Value |
|-------|-------|
| **TC ID** | TC-DT-001 |
| **Covered Partitions** | AT-P1, OC-P2, OS-P1 |
| **Covered Business Rules** | BR-01, BR-02, BR-04, BR-05, BR-08, BR-09 |
| **Precondition** | `test@eshop.com` is logged in; user has ≥ 1 order with status `pending` |
| **Input** | Navigate to `/profile` as authenticated user |
| **Expected Result** | Order history table is displayed. At least one row shows: Order ID (#n), date, total amount in ₫, status badge "Chờ xác nhận", and "Hủy đơn" button |
| **Covered Domain** | AT-P1 (valid token), OC-P2 (1–10 orders), OS-P1 (pending) |

---

### TC-DT-002 — User with zero orders sees empty state

| Field | Value |
|-------|-------|
| **TC ID** | TC-DT-002 |
| **Covered Partitions** | AT-P1, OC-P1 |
| **Covered Business Rules** | BR-01, BR-03 |
| **Precondition** | A registered user account with **no orders** exists (e.g., newly registered user); user is logged in |
| **Input** | Navigate to `/profile` as authenticated user with no orders |
| **Expected Result** | The "Lịch sử đơn hàng" section displays only the message: "Bạn chưa có đơn hàng nào." No table is rendered. |
| **Covered Domain** | AT-P1 (valid token), OC-P1 (0 orders) |

---

### TC-DT-003 — Unauthenticated user cannot access order history (missing token)

| Field | Value |
|-------|-------|
| **TC ID** | TC-DT-003 |
| **Covered Partitions** | AT-P2 |
| **Covered Business Rules** | BR-01 |
| **Precondition** | User is **not** logged in (no active session / token) |
| **Input** | Navigate to `/profile` without being logged in |
| **Expected Result** | The page shows "Vui lòng đăng nhập" OR redirects to the login page. Order history is not displayed. |
| **Covered Domain** | AT-P2 (missing token) |

---

### TC-DT-004 — Expired/invalid token cannot access order history

| Field | Value |
|-------|-------|
| **TC ID** | TC-DT-004 |
| **Covered Partitions** | AT-P3 |
| **Covered Business Rules** | BR-01 |
| **Precondition** | A JWT token is present in the client but is expired or tampered |
| **Input** | Send `GET /api/orders/my-orders` with an invalid/expired Bearer token |
| **Expected Result** | API returns an authentication error (e.g., 401 Unauthorized). UI shows "Vui lòng đăng nhập" or order list is empty. |
| **Covered Domain** | AT-P3 (expired/invalid token) |

---

### TC-DT-005 — Order with status `confirmed` shows cancel button and correct label

| Field | Value |
|-------|-------|
| **TC ID** | TC-DT-005 |
| **Covered Partitions** | AT-P1, OC-P2, OS-P2 |
| **Covered Business Rules** | BR-05, BR-08, BR-09 |
| **Precondition** | Logged-in user has an order with status `confirmed` |
| **Input** | Navigate to `/profile` |
| **Expected Result** | Order row shows status badge "Đã xác nhận" and "Hủy đơn" button is visible |
| **Covered Domain** | AT-P1, OC-P2, OS-P2 (confirmed status) |

---

### TC-DT-006 — Order with status `shipping` shows cancel button (ambiguous)

| Field | Value |
|-------|-------|
| **TC ID** | TC-DT-006 |
| **Covered Partitions** | AT-P1, OC-P2, OS-P3, OI-P2 |
| **Covered Business Rules** | BR-05, BR-08, BR-09, BR-12 |
| **Precondition** | Logged-in user has an order with status `shipping` |
| **Input** | Navigate to `/profile`; observe "Thao tác" column for the `shipping` row |
| **Expected Result** | Status badge displays "Đang giao". "Hủy đơn" button IS visible (per UI logic BR-05). ⚠️ Backend cancellation outcome for this status is under investigation (BR-12). |
| **Note** | If the cancel button is clicked and the backend rejects it, a bug should be filed for the UI showing the button when the action is not executable. |
| **Covered Domain** | AT-P1, OC-P2, OS-P3 (shipping, ambiguous), OI-P2 |

---

### TC-DT-007 — Order with status `delivered` hides cancel button

| Field | Value |
|-------|-------|
| **TC ID** | TC-DT-007 |
| **Covered Partitions** | AT-P1, OC-P2, OS-P4 |
| **Covered Business Rules** | BR-05, BR-08, BR-09 |
| **Precondition** | Logged-in user has an order with status `delivered` |
| **Input** | Navigate to `/profile` |
| **Expected Result** | Order row shows status badge "Đã giao". "Hủy đơn" button is **NOT visible** for this row. |
| **Covered Domain** | AT-P1, OC-P2, OS-P4 (delivered) |

---

### TC-DT-008 — Order with status `canceled` hides cancel button and shows "Đã hủy"

| Field | Value |
|-------|-------|
| **TC ID** | TC-DT-008 |
| **Covered Partitions** | AT-P1, OC-P2, OS-P5 |
| **Covered Business Rules** | BR-05, BR-08, BR-09 |
| **Precondition** | Logged-in user has an order with status `canceled` |
| **Input** | Navigate to `/profile` |
| **Expected Result** | Order row shows status badge "Đã hủy". "Hủy đơn" button is **NOT visible** for this row. |
| **Covered Domain** | AT-P1, OC-P2, OS-P5 (canceled) |

---

### TC-DT-009 — Successfully cancel a cancellable order (`pending`)

| Field | Value |
|-------|-------|
| **TC ID** | TC-DT-009 |
| **Covered Partitions** | AT-P1, OC-P2, OS-P1, OI-P1 |
| **Covered Business Rules** | BR-05, BR-06, BR-08, OQ-01 |
| **Precondition** | Logged-in user has a `pending` order; "Hủy đơn" button is visible |
| **Input** | Click "Hủy đơn" on the `pending` order row |
| **Expected Result** | Alert displays "Hủy đơn thành công!". The order list refreshes. The cancelled order's status changes to "Đã hủy" and its cancel button disappears. API call: `PUT /api/orders/:id/cancel` returns `200 OK {"message":"Order canceled successfully"}`. |
| **Covered Domain** | AT-P1, OC-P2, OS-P1, OI-P1 (valid cancel action) |

---

### TC-DT-010 — Attempt to cancel a `delivered` order via API (invalid action)

| Field | Value |
|-------|-------|
| **TC ID** | TC-DT-010 |
| **Covered Partitions** | AT-P1, OI-P3 |
| **Covered Business Rules** | BR-05, BR-07, BR-11 |
| **Precondition** | Logged-in user has a `delivered` order; cancel button is NOT shown in UI |
| **Input** | Send `PUT /api/orders/:id/cancel` directly via API (bypassing the UI) for a `delivered` order |
| **Expected Result** | API returns error response: `{"error":"Cannot cancel this order."}`. Order status remains `delivered`. |
| **Covered Domain** | AT-P1, OI-P3 (non-cancellable order) |

---

### TC-DT-011 — Order list with > 10 orders (pagination boundary)

| Field | Value |
|-------|-------|
| **TC ID** | TC-DT-011 |
| **Covered Partitions** | AT-P1, OC-P3 |
| **Covered Business Rules** | BR-10 |
| **Precondition** | Logged-in user has more than 10 orders in the database |
| **Input** | Navigate to `/profile` |
| **Expected Result** | Only **10 order rows** are displayed in the table. There is no visible pagination indicator or "load more" control. Orders beyond 10 are silently not shown. |
| **Covered Domain** | AT-P1, OC-P3 (> 10 orders, pagination limit) |

---

### TC-DT-012 — Order with unknown/invalid status value

| Field | Value |
|-------|-------|
| **TC ID** | TC-DT-012 |
| **Covered Partitions** | AT-P1, OC-P2, OS-P6 |
| **Covered Business Rules** | BR-08 |
| **Precondition** | A test order with a non-standard status string (e.g., `"processing"`) exists in the database for the logged-in user |
| **Input** | Navigate to `/profile` |
| **Expected Result** | The status badge displays the raw value uppercased (e.g., "PROCESSING"). The cancel button behaviour is undefined — its presence or absence should be observed and recorded. |
| **Note** | This test requires direct database manipulation and is a defensive/edge-case test. |
| **Covered Domain** | AT-P1, OC-P2, OS-P6 (unknown status) |

---

## Partition Coverage Summary

| Partition ID | Covered By TC |
|-------------|--------------|
| AT-P1 | TC-DT-001, 002, 005–012 |
| AT-P2 | TC-DT-003 |
| AT-P3 | TC-DT-004 |
| OC-P1 | TC-DT-002 |
| OC-P2 | TC-DT-001, 005–010, 012 |
| OC-P3 | TC-DT-011 |
| OS-P1 | TC-DT-001, TC-DT-009 |
| OS-P2 | TC-DT-005 |
| OS-P3 | TC-DT-006 |
| OS-P4 | TC-DT-007 |
| OS-P5 | TC-DT-008 |
| OS-P6 | TC-DT-012 |
| OI-P1 | TC-DT-009 |
| OI-P2 | TC-DT-006 |
| OI-P3 | TC-DT-010 |
| OI-P4 | — (not covered: requires fabricating non-existent order ID; no UI path; deprioritised) |

> **OI-P4 note:** A non-existent order ID is only accessible via direct API manipulation. It is deprioritised for the current test suite as it is not observable from the UI and not part of the FR-11 black-box scope.

---

## Acceptance Criteria Check

- [x] Every partition covered (except OI-P4 — intentionally deprioritised, documented above)
- [x] Every business rule exercised (BR-01 through BR-12)
- [x] No duplicated test cases

---

## Human Review Checklist

- [ ] Every partition covered
- [ ] Every business rule exercised
- [ ] No duplicated test cases
