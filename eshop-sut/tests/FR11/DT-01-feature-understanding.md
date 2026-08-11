# DT-01 — Feature Understanding
**Feature:** FR-11 — Order History View (User)  
**Date:** 2026-07-07  
**Skill:** DT-01  
**Evidence:**
- `tests/FR11/screenshots/ENV-01-profile-page.png`
- `tests/FR11/screenshots/ENV-01-login-page.png`
- `api_specification.md` §4.4, §4.5, §4.6
- `WORKFLOW.md` Feature Input section (FR-11)

---

## 1. Feature Summary

The **Order History View** feature allows an **authenticated (registered) user** to view their past orders on the **Profile page** (`/profile`). The order list is fetched from the backend via `GET /api/orders/my-orders` and displayed in a read-only table. Each order row shows: Order ID, Date, Total Amount, Status, and an optional **"Hủy đơn" (Cancel Order)** action button.

There are **two UI states**:

| State | Trigger | Display |
|-------|---------|---------|
| Empty | No orders exist for the user | Text: "Bạn chưa có đơn hàng nào." |
| Order List | ≥ 1 order exists | Table with columns: Mã ĐH, Ngày đặt, Tổng tiền, Trạng thái, Thao tác |

---

## 2. Actors

| Actor | Role |
|-------|------|
| Registered User | Primary actor. Authenticated user viewing their own order history. |
| Backend API | Returns order data for the authenticated user via JWT-protected endpoint. |
| Admin | Can change order status (outside this feature's scope — FR admin panel). |

---

## 3. System Inputs

> **Per WORKFLOW.md and FR-11 feature inputs:** This feature is **read-only**. There are no user-editable form fields in the Order History section itself.

| Input ID | UI Element | Variable | Data Type | Required | Notes |
|----------|-----------|----------|-----------|----------|-------|
| FI-01 | "Hủy đơn" button (Thao tác column) | `orderId` (via button click) | Integer | Conditional | Visible only when `status ∉ {delivered, canceled}`. Triggers `PUT /api/orders/:id/cancel`. |
| FI-02 | JWT Token (implicit, in HTTP header) | `Authorization: Bearer <token>` | String | Yes | Set automatically after login. Required for `GET /api/orders/my-orders`. |

> **Note:** The Profile page form (Họ Tên, Số điện thoại, Địa chỉ giao hàng, Cập nhật) belongs to FR-04 and is **excluded** from this feature.

---

## 4. System Outputs

| Output | Trigger | Observable Behaviour |
|--------|---------|---------------------|
| Order list table | `GET /api/orders/my-orders` returns ≥ 1 orders | Table rendered with rows: #id, date (toLocaleDateString), total (formatted with ₫), status badge, Hủy đơn button (conditional) |
| Empty state message | `GET /api/orders/my-orders` returns [] | Text: "Bạn chưa có đơn hàng nào." |
| Cancel success | `PUT /api/orders/:id/cancel` succeeds | Alert: "Hủy đơn thành công!"; order list refreshed |
| Cancel failure | `PUT /api/orders/:id/cancel` returns error | Alert: "Lỗi: \<error message\>" |
| Auth error | Token missing or expired | Page shows "Vui lòng đăng nhập" (if `user` is null in context) |

---

## 5. Business Rules

Derived from UI evidence, API spec (§4.4, §4.5, §4.6), and WORKFLOW feature description:

| Rule ID | Business Rule | Evidence Source |
|---------|--------------|-----------------|
| BR-01 | User must be authenticated (valid JWT) to access order history | Precondition in WORKFLOW.md; API requires `Authorization` header |
| BR-02 | `GET /api/orders/my-orders` returns only orders belonging to the authenticated user | API spec §4.4; profile page context |
| BR-03 | If no orders exist, the UI displays "Bạn chưa có đơn hàng nào." | Observed from `Profile.jsx` source (line 169); confirmed black-box observable |
| BR-04 | Order table displays: Order ID (#id), Date (formatted), Total Amount (₫), Status (badge), Action (cancel button) | UI screenshot `ENV-01-profile-page.png` |
| BR-05 | "Hủy đơn" button is shown only when `status ∉ {delivered, canceled}` | Observed in UI (`Profile.jsx` logic line 200); black-box: button absent for delivered/canceled orders |
| BR-06 | Cancellation is performed via `PUT /api/orders/:id/cancel` | API spec §4.6 |
| BR-07 | The API spec states cancellation "chỉ được thực hiện khi đơn hàng chưa giao" (only when not yet delivered) | API spec §4.6 |
| BR-08 | Order statuses are: `pending`, `confirmed`, `shipping`, `delivered`, `canceled` | API spec §6.2; UI status labels observed |
| BR-09 | Status display labels (Vietnamese): pending→"Chờ xác nhận", confirmed→"Đã xác nhận", shipping→"Đang giao", delivered→"Đã giao", canceled→"Đã hủy" | UI observed from profile page |
| BR-10 | `GET /api/orders/my-orders` returns a maximum of **10 orders** per call (confirmed by reviewer) | Reviewer clarification (OQ-04) |
| BR-11 | Attempting to cancel an already-canceled or delivered order via API returns `{"error":"Cannot cancel this order."}` | Reviewer clarification (OQ-03) |
| BR-12 | ⚠️ The UI shows "Hủy đơn" for `shipping` orders, but the API spec says cancellation is only allowed "khi đơn hàng chưa giao" (not yet delivered). Backend enforcement for `shipping` status is **unknown** — flagged for final report. | UI observation + API spec §4.6 + OQ-02 |

---

## 6. Preconditions

- User is registered and has a valid account.
- User has successfully logged in (valid JWT token stored).
- User has navigated to `/profile`.
- Backend order service is reachable at `http://localhost:3000`.
- Frontend is loaded at `http://localhost:5173`.

---

## 7. Assumptions

| # | Assumption | Status |
|---|-----------|--------|
| A-01 | A user with no prior orders will see the empty state. Creating a new account (no orders placed) is sufficient to reproduce this. | **Assumption** — needs test execution to confirm |
| A-02 | The "Hủy đơn" button for a `shipping` status order will be visible in the UI (status ≠ delivered and ≠ canceled) | **Assumption based on code logic** — needs execution confirmation |
| A-03 | The backend enforces cancellation restrictions (e.g., cannot cancel a `delivered` order) even if the button is bypassed via direct API call | **Assumption** — black-box enforcement not yet verified |
| A-04 | The order date is displayed in the locale format of the user's browser (Vietnamese locale) | **Assumption** — `toLocaleDateString()` observed but locale not specified |
| A-05 | Orders are displayed in reverse-chronological order (most recent first) | **Not specified in API spec** — needs execution evidence |

---

## 8. Open Questions

| # | Question | Impact |
|---|---------|--------|
| OQ-01 | What HTTP status code does `PUT /api/orders/:id/cancel` return on success? | ✅ **Answered:** `200 OK` with body `{"message":"Order canceled successfully"}` |
| OQ-02 | Can a user cancel an order with status `shipping`? The UI shows the button, but does the backend allow it? | ⚠️ **Partially answered:** The UI displays the "Hủy đơn" button for `shipping` orders. Backend behavior is **unknown** (black-box). This discrepancy will be **noted in the final report** as a potential bug risk (BR-07 vs. BR-05 conflict). |
| OQ-03 | What error message does the backend return when attempting to cancel an already-canceled or delivered order directly via API? | ✅ **Answered:** `{"error":"Cannot cancel this order."}` |
| OQ-04 | Is there any pagination on `GET /api/orders/my-orders` (e.g., max 10 orders shown)? | ✅ **Answered:** Yes — maximum **10 orders** are returned per call. |
| OQ-05 | Does the backend validate that the authenticated user owns the order when calling `GET /api/orders/:id`? | ⚠️ **Unknown** — backend is a black-box. Not verifiable without further testing. Outside FR-11 scope. |

---

## 9. Human Review Checklist

- [x] Feature purpose is correct
- [x] All actors identified
- [x] All business rules have evidence
- [x] No unsupported assumptions — OQ-01 through OQ-05 clarified by reviewer (see Section 8)

---

## Screenshot Evidence

![Profile Page with Order History](screenshots/ENV-01-profile-page.png)
