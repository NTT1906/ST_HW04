# DT-03 — Domain Partitioning
**Feature:** FR-11 — Order History View (User)  
**Date:** 2026-07-07  
**Skill:** DT-03  
**Input:** Verified `tests/FR11/DT-02-domain-identification.md`

---

## Partitioning Rules Applied

- Partitions are **mutually exclusive**: no value can belong to two partitions simultaneously.
- Partitions **completely cover** the domain: every possible value falls into exactly one partition.
- Partitions are **split** wherever business rules differ for different value subsets.
- Partitions are **merged** only where system behaviour is identical.

---

## Variable 1: `authToken` — Authentication State

| Partition ID | Partition Label | Description | Business Rule |
|-------------|----------------|-------------|---------------|
| **AT-P1** | Valid Token | A well-formed, non-expired JWT belonging to a registered user. The system recognises the user and loads their order list. | BR-01 |
| **AT-P2** | Missing Token | No `Authorization` header sent (user not logged in). The page shows "Vui lòng đăng nhập". | BR-01 |
| **AT-P3** | Expired / Invalid Token | Token present but rejected by the backend (expired, tampered, or malformed). Behaviour same as missing from user's perspective. | BR-01 |

> **Merge decision:** AT-P2 and AT-P3 produce identical observable UI output ("Vui lòng đăng nhập" / redirect to login). They are kept separate because the **cause** differs (missing vs. rejected), which matters for security test coverage. For domain testing purposes, a single representative is sufficient from each.

---

## Variable 2: `orderCount` — Number of Orders Returned

| Partition ID | Partition Label | Range | Description | Business Rule |
|-------------|----------------|-------|-------------|---------------|
| **OC-P1** | Zero orders | `0` | No orders exist for the user. UI shows empty state message: "Bạn chưa có đơn hàng nào." | BR-03 |
| **OC-P2** | One or more orders (within limit) | `1–10` | At least one order exists but not exceeding backend page limit. Order table is rendered. | BR-04, BR-10 |
| **OC-P3** | Exceeds pagination limit | `> 10` (system state) | Backend returns exactly 10 orders; remaining orders are silently truncated. UI impact is unknown — only 10 rows shown with no visible indicator. | BR-10 |

> **Split decision:** OC-P1 vs. OC-P2 are split because they produce completely different UI states. OC-P2 vs. OC-P3 are split because OC-P3 introduces silent data truncation, a distinct behaviour class.

---

## Variable 3: `order.status` — Order Status

| Partition ID | Partition Label | Value(s) | Cancel Button | Description | Business Rule |
|-------------|----------------|----------|--------------|-------------|---------------|
| **OS-P1** | Pending | `pending` | ✅ Shown | Order placed, not yet confirmed. Cancel button visible and expected to work. | BR-05, BR-08 |
| **OS-P2** | Confirmed | `confirmed` | ✅ Shown | Order confirmed by system/admin. Cancel button visible and expected to work. | BR-05, BR-08 |
| **OS-P3** | Shipping (Ambiguous) | `shipping` | ✅ Shown (UI) | Order in transit. Cancel button visible in UI (BR-05), but API spec restricts cancel to "not yet delivered" — backend enforcement unknown. ⚠️ Flagged BR-12. | BR-05, BR-07, BR-12 |
| **OS-P4** | Delivered | `delivered` | ❌ Hidden | Order delivered. Cancel button NOT shown. Attempting cancel via API → `{"error":"Cannot cancel this order."}`. | BR-05, BR-11 |
| **OS-P5** | Cancelled | `canceled` | ❌ Hidden | Order already cancelled. Cancel button NOT shown. Status badge: "Đã hủy". | BR-05, BR-09 |
| **OS-P6** | Unknown / Invalid | Any value outside above 5 | ❌ Undefined | Status not in the known enum. Status label falls back to `.toUpperCase()` of the raw value. Cancel button logic undefined. | BR-08 |

> **Split decisions:**
> - OS-P1 and OS-P2 are kept separate (different status labels and semantic meaning, even though both show the cancel button with expected-to-work behaviour).
> - OS-P3 is kept separate from OS-P1/P2 because its cancel behaviour is **ambiguous** (BR-12 flag).
> - OS-P4 and OS-P5 are kept separate: both hide the cancel button, but OS-P4 means "completed" while OS-P5 means "already cancelled" — different terminal states.
> - OS-P6 is an edge case partition for defensive testing.

---

## Variable 4: `orderId` (Cancel Action)

| Partition ID | Partition Label | Description | Business Rule |
|-------------|----------------|-------------|---------------|
| **OI-P1** | Valid cancellable order (own, non-terminal status) | The clicked order belongs to the authenticated user and has a cancellable status (`pending` or `confirmed`). Cancel succeeds: `200 OK {"message":"Order canceled successfully"}`. | BR-05, BR-06, OQ-01 |
| **OI-P2** | Ambiguous cancellable order (`shipping`) | The clicked order belongs to the user, status = `shipping`. Cancel button is shown by UI, but backend outcome is unknown. | BR-12 |
| **OI-P3** | Non-cancellable order (delivered or canceled) | Order belongs to the user but has terminal status. UI hides the button; direct API call returns `{"error":"Cannot cancel this order."}`. | BR-05, BR-11 |
| **OI-P4** | Non-existent order ID | Order ID does not exist in the system. Expected API error (e.g., 404 or error message). | BR-06 |

> **Note:** OI-P4 is only accessible via direct API call; the UI will never generate a click for a non-existent order.

---

## Full Partition Summary Table

| Partition ID | Variable | Partition Label | Valid/Invalid |
|-------------|----------|----------------|--------------|
| AT-P1 | `authToken` | Valid Token | Valid |
| AT-P2 | `authToken` | Missing Token | Invalid |
| AT-P3 | `authToken` | Expired / Invalid Token | Invalid |
| OC-P1 | `orderCount` | Zero orders | Valid (edge) |
| OC-P2 | `orderCount` | 1–10 orders | Valid (nominal) |
| OC-P3 | `orderCount` | > 10 orders | Invalid (boundary violation) |
| OS-P1 | `order.status` | `pending` | Valid |
| OS-P2 | `order.status` | `confirmed` | Valid |
| OS-P3 | `order.status` | `shipping` (ambiguous) | Valid (ambiguous) |
| OS-P4 | `order.status` | `delivered` | Valid (terminal) |
| OS-P5 | `order.status` | `canceled` | Valid (terminal) |
| OS-P6 | `order.status` | Unknown / Invalid | Invalid |
| OI-P1 | `orderId` | Own, cancellable (`pending`/`confirmed`) | Valid |
| OI-P2 | `orderId` | Own, ambiguous (`shipping`) | Valid (ambiguous) |
| OI-P3 | `orderId` | Own, non-cancellable | Invalid (at API level) |
| OI-P4 | `orderId` | Non-existent order | Invalid |

---

## Human Review Checklist

- [x] Partitions are mutually exclusive
- [x] Partitions completely cover the domain
- [x] No duplicated partitions
