# DT-02 — Domain Identification
**Feature:** FR-14 — Category Management (CRUD)  
**Date:** 2026-07-07  
**Skill:** DT-02  
**Input:** Verified `tests/FR14/DT-01-feature-understanding.md`

---

## Variable Identification

### Variable 1: Authentication State (`authToken`)

| Attribute | Value |
|-----------|-------|
| **Variable** | `authToken` (JWT token, implicit) |
| **UI Element** | Implicit — stored in `localStorage` as `adminToken` and sent automatically in `Authorization` header |
| **Data Type** | String (JWT) |
| **Valid Domain** | Valid, non-expired JWT belonging to an authenticated user with `role === "admin"` |
| **Invalid Domain** | - Missing token (unauthenticated)<br>- Expired or malformed token<br>- Valid token belonging to a regular user (`role === "user"`) |
| **Constraints** | Required for Category Management access. Without a valid admin token, the frontend redirects to login, and backend API requests will fail. |
| **Dependencies** | All other variables and actions depend on this being valid. |
| **Evidence** | BR-01; `backend/server.js` lines 100-110 (auth checks) |

---

### Variable 2: New Category Name (`categoryName`)

| Attribute | Value |
|-----------|-------|
| **Variable** | `categoryName` |
| **UI Element** | Text Input field "Tên danh mục mới" |
| **Data Type** | String |
| **Expected Valid Domain** | Non-empty, unique, alphanumeric string within a reasonable length (e.g., 1 to 50 characters) |
| **Expected Invalid Domain** | - Empty string (`""`) / whitespace-only string (e.g. `"   "`) (Should be rejected)<br>- Duplicate category name (e.g. "Điện thoại") (Should be rejected)<br>- Exceptionally long string (e.g. > 255 characters)<br>- Special characters / HTML tags (potential XSS)<br>- SQL Injection payload strings |
| **SUT Actual Behaviour** | **Severe Validation Flaws:** The SUT lacks any server-side validation or database constraints on name, meaning it accepts and saves empty strings, whitespaces, duplicate names, exceptionally long names, and script/SQL payloads without error. |
| **Constraints** | Entered by user in the frontend form and submitted via the "Thêm mới" button |
| **Dependencies** | Requires valid `authToken`. Drives database insertion on submit. |
| **Evidence** | FI-01, FI-02, BR-03, BR-05, BR-06, BR-08 |

---

### Variable 3: Category ID to Delete (`deleteCategoryId`)

| Attribute | Value |
|-----------|-------|
| **Variable** | `deleteCategoryId` |
| **UI Element** | "Xóa" button in the Action (Hành động) column for each category row |
| **Data Type** | Integer (positive) |
| **Expected Valid Domain** | Positive integer of an existing category that contains **no linked products** (to preserve database referential integrity) |
| **Expected Invalid Domain** | - Non-existent category ID (non-positive integer, zero, or arbitrary integer not in database)<br>- ID of a category that has products associated with it (e.g. ID `1` which contains "iPhone 15 Pro Max") (Should be restricted from deletion) |
| **SUT Actual Behaviour** | **Referential Integrity Flaw:** SUT allows deletion of any existing category ID, even if products are associated with it, resulting in orphaned products in the system. |
| **Constraints** | Triggered by clicking the "Xóa" button corresponding to a row in the Category table (or via direct API call) |
| **Dependencies** | Requires valid `authToken`. |
| **Evidence** | FI-03, BR-04, BR-06, BR-07, BR-09 |

---

### Variable 4: Categories Count (`categoriesCount`)

| Attribute | Value |
|-----------|-------|
| **Variable** | `categoriesCount` |
| **UI Element** | Implicit state that controls the rendering of the Category table |
| **Data Type** | Integer (≥ 0) |
| **Valid Domain** | `0` → Table empty or placeholder state; `≥ 1` → Table rendered with row items |
| **Invalid Domain** | N/A (system-generated display state; not directly modifiable by user inputs) |
| **Constraints** | Determined by the total records returned from `GET /api/categories` |
| **Dependencies** | Dependent on DB state and preceding create/delete operations |
| **Evidence** | BR-02 |

---

## Domain Summary Table

| Variable | Type | Expected Valid Domain | Expected Invalid Domain | SUT Actual (Buggy) Behavior | Evidence |
|----------|------|-----------------------|-------------------------|-----------------------------|---------|
| `authToken` | String (JWT) | Valid, non-expired Admin JWT | Missing / expired / malformed / Non-Admin JWT | Denies access / returns `401`/`403` | BR-01 |
| `categoryName` | String | Non-empty, unique, standard string | Empty string, duplicate name, exceptionally long, XSS/SQL payloads | Accepts and inserts all inputs without error | FI-01, BR-05, BR-06, BR-08 |
| `deleteCategoryId` | Integer | ID of existing category (no linked products) | ID of non-existent category, ID of category with linked products | Deletes any category; orphans products | FI-03, BR-04, BR-06, BR-07, BR-09 |

---

## Dependencies Between Variables

```
authToken (Admin)
    └─► access to Category page
             ├─► categoriesCount determines rows in table
             │         └─► deleteCategoryId can be selected for deletion
             └─► categoryName can be entered and submitted (Add new)
```

---

## Ignored Variables (per DT-02 constraints)

| Element | Reason Excluded |
|---------|----------------|
| Category ID display (`#id` in table) | Display-only field — system-generated |
| Existing category name text | Display-only field |
| Sidebar Navigation / Admin Panel layout | Excluded UI elements (not inputs) |

---

## Human Review Checklist

- [x] Every input variable identified
- [x] No overlapping domains
- [x] Every domain supported by feature specification
