# DT-02 — Domain Identification
**Feature:** FR-11 — Order History View (User)  
**Date:** 2026-07-07  
**Skill:** DT-02  
**Input:** Verified `tests/FR11/DT-01-feature-understanding.md`

---

## Preliminary Note: Feature Nature

> Per WORKFLOW.md, FR-11 is described as a **read-only** view with "no user-controllable input variables suitable for Domain Testing." However, black-box observation reveals **one user-triggered action** ("Hủy đơn" / Cancel Order button) and **system-state variables** that directly determine UI behaviour and available actions.
>
> This DT-02 analysis identifies all variables — user-triggered and system-state — that affect observable system behaviour, in line with the DT-02 skill's requirement to "include hidden/system-generated inputs if they affect behaviour."

---

## Variable Identification

### Variable 1: Authentication State (`authToken`)

| Attribute | Value |
|-----------|-------|
| **Variable** | `authToken` (JWT token, implicit) |
| **UI Element** | Implicit — sent automatically in `Authorization` header |
| **Data Type** | String (JWT) |
| **Valid Domain** | Valid, non-expired JWT belonging to a registered user |
| **Invalid Domain** | Missing token (not logged in), expired token, malformed token |
| **Constraints** | Required for all API calls. Without a valid token, the page shows "Vui lòng đăng nhập". |
| **Dependencies** | All other variables depend on this being valid. |
| **Evidence** | BR-01; API spec §4.4; Profile.jsx line 108 |

---

### Variable 2: Order Count (`orderCount`)

| Attribute | Value |
|-----------|-------|
| **Variable** | `orderCount` — number of orders returned by `GET /api/orders/my-orders` |
| **UI Element** | Drives the two-state UI: empty vs. table |
| **Data Type** | Integer (≥ 0) |
| **Valid Domain** | `0` → empty state; `1–10` → order table displayed |
| **Invalid Domain** | `> 10` — backend truncates to 10 (BR-10); UI impact unknown (silent truncation or shown indicator?) |
| **Constraints** | Maximum 10 orders returned per API call (BR-10) |
| **Dependencies** | Determines whether order table is rendered. Independent of `authToken` value beyond validity. |
| **Evidence** | BR-03 (empty state), BR-04 (table), BR-10 (pagination); UI screenshot |

---

### Variable 3: Order Status (`order.status`)

| Attribute | Value |
|-----------|-------|
| **Variable** | `order.status` — status of each individual order |
| **UI Element** | "Trạng thái" column (status badge) + "Thao tác" column (cancel button visibility) |
| **Data Type** | Enumeration (String) |
| **Valid Domain** | `{pending, confirmed, shipping, delivered, canceled}` — 5 known values (BR-08) |
| **Invalid Domain** | Any status string not in the above set (e.g., unknown status from DB corruption) |
| **Constraints** | - Cancel button shown iff `status ∉ {delivered, canceled}` (BR-05) <br>- API spec restricts cancel to "chưa giao" / not yet delivered (BR-07) <br>- ⚠️ `shipping` is ambiguous: button shown (BR-05) but API spec may reject (BR-12) |
| **Dependencies** | Determines cancel button visibility; determines status label displayed |
| **Evidence** | BR-05, BR-07, BR-08, BR-09, BR-12; UI screenshot |

**Sub-partitions of `order.status` by cancel button visibility:**

| Partition | Values | Cancel Button | Expected Behaviour |
|-----------|--------|--------------|-------------------|
| Cancellable (confirmed by UI) | `pending`, `confirmed` | ✅ Shown | Cancel allowed |
| Ambiguous | `shipping` | ✅ Shown (UI) | Backend behaviour unknown (BR-12) |
| Non-cancellable | `delivered` | ❌ Hidden | Cannot cancel |
| Already cancelled | `canceled` | ❌ Hidden | Cannot cancel |

---

### Variable 4: Cancel Action — Order ID (`orderId`)

| Attribute | Value |
|-----------|-------|
| **Variable** | `orderId` — the ID of the order the user clicks "Hủy đơn" on |
| **UI Element** | "Hủy đơn" button in Thao tác column |
| **Data Type** | Integer (positive) |
| **Valid Domain** | A positive integer matching an order that belongs to the authenticated user and has a cancellable status |
| **Invalid Domain** | - Order ID belonging to a **different user** (authorization bypass attempt) <br>- Order ID of a `delivered` order (should be rejected by API: `{"error":"Cannot cancel this order."}`) <br>- Order ID of a `canceled` order (should be rejected by API) |
| **Constraints** | UI only shows the button for orders with cancellable status — so invalid domain is primarily accessible via direct API call |
| **Dependencies** | Depends on `order.status` (BR-05); requires valid `authToken` (BR-01) |
| **Evidence** | BR-05, BR-06, BR-11; API spec §4.6; OQ-01, OQ-03 |

---

## Domain Summary Table

| Variable | Type | Valid Domain | Invalid Domain | Evidence |
|----------|------|-------------|----------------|---------|
| `authToken` | String (JWT) | Valid non-expired JWT for registered user | Missing / expired / malformed token | BR-01, API spec §4 |
| `orderCount` | Integer ≥ 0 | 0 (empty state), 1–10 (table state) | > 10 (silent truncation by backend) | BR-03, BR-10 |
| `order.status` | Enum (String) | `pending`, `confirmed`, `shipping`, `delivered`, `canceled` | Any value outside this set | BR-08, BR-09, BR-12 |
| `orderId` (cancel) | Integer > 0 | ID of own order with cancellable status | ID of delivered/cancelled order; ID of another user's order | BR-05, BR-06, BR-11 |

---

## Dependencies Between Variables

```
authToken (valid)
    └─► orderCount is retrievable
            └─► if orderCount = 0 → empty state (no orderId, no status)
            └─► if orderCount ≥ 1 → order table rendered
                    └─► order.status determines cancel button visibility
                            └─► if button visible → orderId can be submitted via cancel action
```

---

## Ignored Variables (per DT-02 constraints)

| Element | Reason Excluded |
|---------|----------------|
| Order ID display (`#id` in table) | Display-only field — system-generated, not user input |
| Order Date (`created_at` formatted) | Display-only — system-generated |
| Total Amount (`total_amount`) | Display-only — system-generated |
| Profile form fields (name, phone, etc.) | Belongs to FR-04 |

---

## Human Review Checklist

- [x] Every input variable identified
- [x] No overlapping domains
- [x] Every domain supported by feature specification
