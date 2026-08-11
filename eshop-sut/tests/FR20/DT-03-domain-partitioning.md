# DT-03 — Domain Partitioning
**Feature:** FR-20 — Xem sản phẩm (Mobile)  
**Date:** 2026-07-07  
**Skill:** DT-03  
**Input:** Verified `tests/FR20/DT-02-domain-identification.md`

---

## Partitioning Rules Applied

- Partitions are **mutually exclusive**: no input value can fall into multiple partitions at the same time.
- Partitions **completely cover** the domain: every possible input value matches exactly one partition.
- Partitions are **split** where business rules or expected behaviors differ.
- Partitions are **merged** where actual system behavior is identical.

---

## Variable 1: `quantity` — Purchase Quantity

| Partition ID | Partition Label | Value Class | Expected Behavior | SUT Actual Behavior (Coercion/Normalization) | Business Rule |
|-------------|----------------|-------------|-------------------|---------------------------------------------|---------------|
| **QTY-P1** | Valid Positive Integer | $X \ge 1$ (e.g. `1`, `5`, `10`) | Product is added to the cart with quantity $X$. | Product is added to the cart with quantity $X$ correctly. | BR-04 |
| **QTY-P2** | Zero | `0` | Rejected with validation error. | Silently normalizes quantity to `1` and adds to cart. | BR-05 |
| **QTY-P3** | Negative Integer | $X < 0$ (e.g. `-5`) | Rejected with validation error. | Silently normalizes quantity to `1` and adds to cart. | BR-05 |
| **QTY-P4** | Decimal / Float | Positive float (e.g. `2.5`, `1.9`) | Rejected or rounded cleanly. | Truncates decimal part using `parseInt` (e.g. `2.5` -> `2`) and adds `2` items to cart. | BR-05 |
| **QTY-P5** | Non-numeric String | Empty `""`, spaces `"  "`, or text `"abc"` | Rejected with validation error. | Silently normalizes quantity to `1` and adds to cart. | BR-05 |
| **QTY-P6** | Exceptionally Large Integer | Very large number (e.g. `999999999999`) | Rejected with maximum purchase limit error. | Accepts value, adds to cart, which might lead to overflow or UI visual wrapping issues. | BR-04 |

---

## Variable 2: `productId` — Product ID (Implicit Input)

| Partition ID | Partition Label | Target Class | Expected Behavior | SUT Actual Behavior | Business Rule |
|-------------|----------------|--------------|-------------------|---------------------|---------------|
| **PID-P1** | Existing Product ID (Odd) | Odd ID in DB (e.g. `1`, `3`, `5`) | Product details load. Price is retrieved as numeric value. | Details load successfully. | BR-01 |
| **PID-P2** | Existing Product ID (Even) | Even ID in DB (e.g. `2`, `4`) | Product details load. Price is retrieved as numeric value. | Details load successfully. Backend returns price as string, parsed back to numeric by frontend. | BR-01 |
| **PID-P3** | Non-existent Product ID | ID not in DB (e.g. `999`, `-1`) | Error page displayed or redirects back to catalog. | Page loads blank state indicating `"Sản phẩm không tồn tại (Lỗi trắng trang do data rỗng)"`. | BR-01 |

---

## Full Partition Summary Table

| Partition ID | Variable | Partition Label | Expected Validity | SUT Processing Validity |
|-------------|----------|----------------|-------------------|-------------------------|
| QTY-P1 | `quantity` | Valid Positive Integer | Valid | Valid |
| QTY-P2 | `quantity` | Zero | Invalid | Valid (Silently coerced to 1) |
| QTY-P3 | `quantity` | Negative Integer | Invalid | Valid (Silently coerced to 1) |
| QTY-P4 | `quantity` | Decimal / Float | Invalid | Valid (Parsed as truncated int) |
| QTY-P5 | `quantity` | Non-numeric String | Invalid | Valid (Silently coerced to 1) |
| QTY-P6 | `quantity` | Exceptionally Large Integer | Invalid | Valid (Stored raw) |
| PID-P1 | `productId` | Existing Product ID (Odd) | Valid | Valid |
| PID-P2 | `productId` | Existing Product ID (Even) | Valid | Valid |
| PID-P3 | `productId` | Non-existent Product ID | Invalid | Valid (Renders blank state page) |

---

## Human Review Checklist

- [x] Partitions are mutually exclusive
- [x] Partitions completely cover the domain
- [x] No duplicated partitions
