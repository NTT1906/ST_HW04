# DT-03 — Domain Partitioning
**Feature:** FR-14 — Category Management (CRUD)  
**Date:** 2026-07-07  
**Skill:** DT-03  
**Input:** Verified `tests/FR14/DT-02-domain-identification.md`

---

## Partitioning Rules Applied

- Partitions are **mutually exclusive**: no value can belong to multiple partitions simultaneously.
- Partitions **completely cover** the domain: every possible value falls into exactly one partition.
- Partitions are **split** where business rules or expected behaviors differ.
- Partitions are **merged** only where system behavior is identical.
- Spec-wise invalid partitions are labeled clearly to test the SUT's validation flaws (SUT deviations).

---

## Variable 1: `authToken` — Authentication State

| Partition ID | Partition Label | Description | Business Rule |
|-------------|----------------|-------------|---------------|
| **AT-P1** | Valid Admin Token | Valid, non-expired JWT belonging to an administrator user. Category management page is accessible and changes can be made. | BR-01 |
| **AT-P2** | Missing Token | No token provided. Redirected to login page or API returns `401 Unauthorized`. | BR-01 |
| **AT-P3** | Non-Admin Token | Token of a regular user (`role === "user"`). Redirected to dashboard or shows alert "Bạn không phải là admin!", and API returns `403 Forbidden`. | BR-01 |
| **AT-P4** | Expired / Invalid Token | Expired, tampered, or malformed token. Denied access. | BR-01 |

---

## Variable 2: `categoryName` — New Category Name

| Partition ID | Partition Label | Value Class | Expected Behavior | SUT Actual (Buggy) Behavior | Business Rule |
|-------------|----------------|-------------|-------------------|-----------------------------|---------------|
| **CN-P1** | Valid Unique Name | E.g. "Gia dụng", "Thời trang" | Category created; list refreshed. | Category created successfully. | BR-03 |
| **CN-P2** | Empty / Whitespace | `""` or `"   "` | Rejected with validation error message. | Accepts and creates category with empty name. | BR-06 |
| **CN-P3** | Duplicate Name | E.g. "Điện thoại" (already exists) | Rejected with uniqueness error message. | Creates duplicate category record in database. | BR-05 |
| **CN-P4** | Exceptionally Long Name | String > 100 characters | Rejected or truncated cleanly in UI. | Accepts and inserts full string; table layout may break. | BR-05 |
| **CN-P5** | Injection / Script | Payloads (e.g. `<script>`, SQL Injection) | Sanitized or rejected safely. | Inserts payload raw; risk of XSS/SQL Injection. | BR-05 |

---

## Variable 3: `deleteCategoryId` — Category ID to Delete

| Partition ID | Partition Label | Value / Target Class | Expected Behavior | SUT Actual (Buggy) Behavior | Business Rule |
|-------------|----------------|----------------------|-------------------|-----------------------------|---------------|
| **DC-P1** | Existing Empty Category | Category ID has **no linked products**. | Category is deleted from database; table is refreshed. | Category is deleted successfully. | BR-04 |
| **DC-P2** | Existing Category with Products | Category ID has **active products** linked. | Deletion blocked/restricted to prevent data inconsistency. | Deletes category; products are orphaned (reference invalid ID). | BR-07 |
| **DC-P3** | Non-existent ID | Arbitrary ID (e.g. `999` or non-positive value). | API returns error (e.g., `404 Not Found`). | Completes request with no changes made in DB. | BR-04 |

---

## Variable 4: `categoriesCount` — Number of Categories in Table

| Partition ID | Partition Label | Value | Description | Business Rule |
|-------------|----------------|-------|-------------|---------------|
| **CC-P1** | Categories Present | `≥ 1` | Renders a table list of all categories with ID, Name, and action buttons. | BR-02 |
| **CC-P2** | No Categories | `0` | Empty state showing headers only (or custom empty state notice). | BR-02 |

---

## Full Partition Summary Table

| Partition ID | Variable | Partition Label | Expected Validity | SUT Processing Validity |
|-------------|----------|----------------|-------------------|-------------------------|
| AT-P1 | `authToken` | Valid Admin Token | Valid | Valid |
| AT-P2 | `authToken` | Missing Token | Invalid | Invalid |
| AT-P3 | `authToken` | Non-Admin Token | Invalid | Invalid |
| AT-P4 | `authToken` | Expired / Invalid Token | Invalid | Invalid |
| CN-P1 | `categoryName` | Valid Unique Name | Valid | Valid |
| CN-P2 | `categoryName` | Empty / Whitespace | Invalid | Valid |
| CN-P3 | `categoryName` | Duplicate Name | Invalid | Valid |
| CN-P4 | `categoryName` | Exceptionally Long Name | Invalid | Valid |
| CN-P5 | `categoryName` | Injection / Script | Invalid | Valid |
| DC-P1 | `deleteCategoryId` | Existing Empty Category | Valid | Valid |
| DC-P2 | `deleteCategoryId` | Existing Category with Products | Invalid | Valid |
| DC-P3 | `deleteCategoryId` | Non-existent ID | Invalid | Valid (silent) |
| CC-P1 | `categoriesCount` | Categories Present | Valid | Valid |
| CC-P2 | `categoriesCount` | No Categories | Valid | Valid |

---

## Human Review Checklist

- [x] Partitions are mutually exclusive
- [x] Partitions completely cover the domain
- [x] No duplicated partitions
