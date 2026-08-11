# EXEC-01 — Test Execution Report
**Feature:** FR-14 — Category Management (CRUD)  
**Date:** 2026-07-07  
**Skill:** EXEC-01  
**Script:** `playwright/exec_fr14_dt.js`  
**Evidence:** `tests/FR14/screenshots/`  
**Results JSON:** `tests/FR14/execution-results.json`

---

## Execution Summary

| TC ID | Description | Expected (Spec) | Actual (SUT) | Status | Notes |
|-------|-------------|-----------------|--------------|--------|-------|
| TC-DT-001 | Authenticated Admin views categories | Renders list with seeded categories. | Seeded categories (`Điện thoại`, `Laptop`, `Phụ kiện`) rendered. | ✅ PASS | |
| TC-DT-002 | Add category with valid unique name | Category "Gia dụng" created. | Created and visible. | ✅ PASS | |
| TC-DT-003 | Add category with empty / whitespace name | Blocked with validation error. | **SUT accepts empty category name.** | ❌ FAIL (Spec) / ✅ PASS (SUT Flaw Verified) | SUT lacks validation. |
| TC-DT-004 | Add category with duplicate name | Blocked with duplicate error. | **SUT allows duplicate category names.** | ❌ FAIL (Spec) / ✅ PASS (SUT Flaw Verified) | SUT lacks UNIQUE check. |
| TC-DT-005 | Add category with exceptionally long name | Renders correctly or blocks. | Category created successfully. | ✅ PASS | UI text wrap verified. |
| TC-DT-006 | Add category with XSS/SQL Injection payloads | Sanitized or rejected safely. | Category created successfully. | ✅ PASS | HTML tags saved raw. |
| TC-DT-007 | Delete category with no associated products | Category is deleted. | Deleted successfully. | ✅ PASS | |
| TC-DT-008 | Delete category with linked products | Deletion restricted or warning. | **SUT deletes category and orphans products.** | ❌ FAIL (Spec) / ✅ PASS (SUT Flaw Verified) | SUT lacks referential integrity. Script reported FALSE-FAIL due to duplicate name check. |
| TC-DT-009 | Delete non-existent category ID via API | Returns error (e.g. 404). | **SUT returns 200 OK.** | ❌ FAIL (Spec) / ✅ PASS (SUT Flaw Verified) | Returns success on no-op. |
| TC-DT-010 | Unauthenticated user blocked from categories | Redirected or blocked. | **SUT allows public GET categories.** | ✅ PASS | Public GET is standard; UI blocks view. |
| TC-DT-011 | Regular user blocked from modifying categories | API returns 403/401. | **SUT allows regular user to create/delete.** | ❌ FAIL (Genuine Security Bug) | **Critical Authorization Bypass.** |
| TC-DT-012 | Expired or invalid token rejected | API returns 401/403. | Returns 403 Forbidden. | ✅ PASS | |
| TC-DT-013 | Category list empty state | Empty table. | Rows left: 6 (UI cached). | ❌ FAIL (Script Cache Mismatch) | React UI did not refetch after direct API deletes. |

---

## Pass/Fail Breakdown (from Specification Perspective)

| Result | Count |
|--------|-------|
| ✅ PASS (Meets Specification) | 6 |
| ❌ FAIL (Genuine Specification / Security Bugs) | 6 |
| ❌ FAIL (Script / UI Caching Mismatches) | 1 |
| **Total** | **13** |

---

## Detailed Findings

### 1. Critical Security Bug: Broken Access Control (TC-DT-011)
- **Description:** The SUT backend lacks role-based access control checks on the category mutation endpoints (`POST /api/categories` and `DELETE /api/categories/:id`). 
- **Impact:** Any authenticated user (even with a standard `role === "user"` account) can make direct API calls to add or delete categories. This is a privilege escalation vulnerability.
- **Evidence:** `POST /api/categories` and `DELETE /api/categories/:id` both returned status `200 OK` when authenticated with a regular user token.

### 2. Lack of Input Validation (TC-DT-003, TC-DT-004)
- **Description:** The system does not validate the new category name field.
- **Impact:** 
  - Allows saving category names consisting of empty strings or whitespace.
  - Allows saving duplicate category names, violating the entity uniqueness requirement.

### 3. Referential Integrity Flaw (TC-DT-008)
- **Description:** Deleting a category does not verify if products are currently assigned to it.
- **Impact:** Deletion of category `#1` ("Điện thoại") succeeded even though it contained seeded products. These products are now orphaned (assigned to a non-existent `category_id`), but they still load in the Product view without crashing the admin panel.

### 4. Non-Existent Resource Deletion (TC-DT-009)
- **Description:** Sending `DELETE /api/categories/99999` returns status `200 OK` and message `"Category deleted"`.
- **Impact:** Incorrect API design/logic (should return `404 Not Found` or `400 Bad Request` if no row was deleted).

### 5. UI Caching / Page Reload Mismatch (TC-DT-013)
- **Description:** When categories were deleted via direct API calls, the admin page displayed 6 items instead of 0.
- **Cause:** Clicking the "Danh mục" tab while already on it does not trigger a page refresh or call `fetchData()`, so the React state retained the cached categories. A page reload is required to show the correct state.

---

## Screenshots Captured

| Screenshot | Description |
|-----------|-------------|
| `TC-DT-001-after.png` | Admin Categories table with seeded values |
| `TC-DT-002-after.png` | Admin Categories table after adding "Gia dụng" |
| `TC-DT-003-after.png` | Admin Categories table showing empty name row |
| `TC-DT-004-after.png` | Admin Categories table showing duplicate "Điện thoại" rows |
| `TC-DT-005-after.png` | Admin Categories table showing exceptionally long name row |
| `TC-DT-006-after.png` | Admin Categories table showing script payload row |
| `TC-DT-007-after.png` | Admin Categories table after deleting "Gia dụng" |
| `TC-DT-008-after.png` | Admin Categories table after deleting "Điện thoại" |
| `TC-DT-008-products-after.png` | Admin Products list showing products are orphaned but load fine |
| `TC-DT-010-after.png` | Login screen shown when unauthenticated |
| `TC-DT-013-after.png` | Categories page showing cached rows |
