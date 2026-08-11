# DT-04 — Domain Test Case Generation
**Feature:** FR-14 — Category Management (CRUD)  
**Date:** 2026-07-07  
**Skill:** DT-04  
**Input:** Verified `tests/FR14/DT-03-domain-partitioning.md`

---

## Coverage Strategy

- One representative value per partition (minimum coverage).
- Combined test cases where multiple variables must be exercised together (e.g. creating/deleting category requires a valid Admin token).
- Focus on verifying both expected specifications (what *should* happen) and observed SUT actual/buggy behaviors (what *does* happen).
- **14 partitions** across 4 variables → test cases designed to cover all 14.

---

## Test Cases

### TC-DT-001 — Authenticated Admin views categories (nominal path)

| Field | Value |
|-------|-------|
| **TC ID** | TC-DT-001 |
| **Covered Partitions** | AT-P1, CC-P1 |
| **Covered Business Rules** | BR-01, BR-02 |
| **Precondition** | `admin@eshop.com` / `Admin123!` is logged in; database has seeded categories. |
| **Input** | Click the "Danh mục" tab. |
| **Expected Result** | Category management screen loads. Table displays seeded categories: `#1 Điện thoại`, `#2 Laptop`, `#3 Phụ kiện`. Each row shows ID, Name, and action button "Xóa". |
| **Covered Domain** | AT-P1 (valid admin token), CC-P1 (categories present) |

---

### TC-DT-002 — Add category with valid unique name (nominal creation)

| Field | Value |
|-------|-------|
| **TC ID** | TC-DT-002 |
| **Covered Partitions** | AT-P1, CN-P1, CC-P1 |
| **Covered Business Rules** | BR-01, BR-02, BR-03 |
| **Precondition** | Logged in as Admin; on Category page. |
| **Input** | Enter `"Gia dụng"` in "Tên danh mục mới" input and click "Thêm mới". |
| **Expected Result** | Category is created successfully. The input field is cleared. The table refreshes to display the new category `#4 Gia dụng` with its "Xóa" button. |
| **Covered Domain** | AT-P1, CN-P1 (valid unique name) |

---

### TC-DT-003 — Add category with empty / whitespace name (SUT validation flaw)

| Field | Value |
|-------|-------|
| **TC ID** | TC-DT-003 |
| **Covered Partitions** | AT-P1, CN-P2 |
| **Covered Business Rules** | BR-01, BR-03, BR-06 |
| **Precondition** | Logged in as Admin; on Category page. |
| **Input** | Leave input blank (or enter spaces `"   "`) and click "Thêm mới". |
| **Expected Result** | **Expected (Spec):** Action blocked, shows error alert "Vui lòng nhập tên danh mục". <br>**Actual (SUT):** Accepts empty/whitespace string, inserts category, clears input, and refreshes the table showing a category row with empty text. |
| **Covered Domain** | AT-P1, CN-P2 (empty name input) |

---

### TC-DT-004 — Add category with duplicate name (SUT uniqueness flaw)

| Field | Value |
|-------|-------|
| **TC ID** | TC-DT-004 |
| **Covered Partitions** | AT-P1, CN-P3 |
| **Covered Business Rules** | BR-01, BR-03, BR-05 |
| **Precondition** | Logged in as Admin; on Category page. Seeded category `"Điện thoại"` exists. |
| **Input** | Enter `"Điện thoại"` in input and click "Thêm mới". |
| **Expected Result** | **Expected (Spec):** Action blocked, displays error alert "Tên danh mục đã tồn tại". <br>**Actual (SUT):** Accepts duplicate, inserts another row named "Điện thoại" with a new ID, and refreshes the table. |
| **Covered Domain** | AT-P1, CN-P3 (duplicate name input) |

---

### TC-DT-005 — Add category with exceptionally long name

| Field | Value |
|-------|-------|
| **TC ID** | TC-DT-005 |
| **Covered Partitions** | AT-P1, CN-P4 |
| **Covered Business Rules** | BR-01, BR-03, BR-05 |
| **Precondition** | Logged in as Admin; on Category page. |
| **Input** | Enter a string of `150` characters (e.g. `"A"` repeated 150 times) in input and click "Thêm mới". |
| **Expected Result** | Category created. Observe if the table row wraps text cleanly or breaks the UI grid width. |
| **Covered Domain** | AT-P1, CN-P4 (exceptionally long name) |

---

### TC-DT-006 — Add category with XSS/SQL Injection payloads

| Field | Value |
|-------|-------|
| **TC ID** | TC-DT-006 |
| **Covered Partitions** | AT-P1, CN-P5 |
| **Covered Business Rules** | BR-01, BR-03, BR-05 |
| **Precondition** | Logged in as Admin; on Category page. |
| **Input** | Enter payload `<script>alert('xss')</script>` or `' OR '1'='1` in input and click "Thêm mới". |
| **Expected Result** | Category is added. Verify if script executes (leads to popup alert) or if database command is subverted (for SQL Injection). If properly escaped, it renders as raw text. |
| **Covered Domain** | AT-P1, CN-P5 (injection payload strings) |

---

### TC-DT-007 — Delete category with no associated products (nominal deletion)

| Field | Value |
|-------|-------|
| **TC ID** | TC-DT-007 |
| **Covered Partitions** | AT-P1, DC-P1 |
| **Covered Business Rules** | BR-01, BR-04 |
| **Precondition** | An empty category exists in the system (e.g., created from TC-DT-002). |
| **Input** | Click the "Xóa" button in the row for category "Gia dụng". |
| **Expected Result** | Category is deleted successfully. Table refreshes and row is removed. |
| **Covered Domain** | AT-P1, DC-P1 (existing empty category) |

---

### TC-DT-008 — Delete category with linked products (SUT referential integrity flaw)

| Field | Value |
|-------|-------|
| **TC ID** | TC-DT-008 |
| **Covered Partitions** | AT-P1, DC-P2 |
| **Covered Business Rules** | BR-01, BR-04, BR-07 |
| **Precondition** | Category `#1 Điện thoại` exists and contains products (e.g. "iPhone 15 Pro Max"). |
| **Input** | Click the "Xóa" button in the row for category `Điện thoại`. |
| **Expected Result** | **Expected (Spec):** Action restricted or returns warning "Không thể xóa danh mục chứa sản phẩm". <br>**Actual (SUT):** Category is deleted successfully. Table refreshes and row is removed. Products originally in category `#1` are orphaned in the database but remain loadable/editable in the Products section. |
| **Covered Domain** | AT-P1, DC-P2 (existing category with products) |

---

### TC-DT-009 — Delete non-existent category ID via direct API call

| Field | Value |
|-------|-------|
| **TC ID** | TC-DT-009 |
| **Covered Partitions** | AT-P1, DC-P3 |
| **Covered Business Rules** | BR-01, BR-04 |
| **Precondition** | Admin authentication token is active. |
| **Input** | Make a direct `DELETE` HTTP request to `http://localhost:3000/api/categories/99999` bypassing the UI. |
| **Expected Result** | **Expected (Spec):** Returns `404 Not Found` or similar error. <br>**Actual (SUT):** Returns `200 OK` with `{"message":"Category deleted"}` (even though no database change occurred). |
| **Covered Domain** | AT-P1, DC-P3 (non-existent category ID deletion) |

---

### TC-DT-010 — Unauthenticated user cannot access Category Management (missing token)

| Field | Value |
|-------|-------|
| **TC ID** | TC-DT-010 |
| **Covered Partitions** | AT-P2 |
| **Covered Business Rules** | BR-01 |
| **Precondition** | User is not logged in (`adminToken` deleted from `localStorage`). |
| **Input** | Open `http://localhost:5174/` or call `GET http://localhost:3000/api/categories` with no auth header. |
| **Expected Result** | UI stays on or redirects to login page. API returns `401 Unauthorized`. |
| **Covered Domain** | AT-P2 (missing authentication token) |

---

### TC-DT-011 — Regular user cannot access/modify categories (non-admin token)

| Field | Value |
|-------|-------|
| **TC ID** | TC-DT-011 |
| **Covered Partitions** | AT-P3 |
| **Covered Business Rules** | BR-01 |
| **Precondition** | Logged in as regular user (`test@eshop.com` / `Test1234!`). |
| **Input** | Send `POST` to `http://localhost:3000/api/categories` or `DELETE` to `http://localhost:3000/api/categories/1` using user token. |
| **Expected Result** | API blocks request and returns `403 Forbidden` or `401 Unauthorized`. |
| **Covered Domain** | AT-P3 (user token authentication) |

---

### TC-DT-012 — Expired or invalid token cannot access Category Management

| Field | Value |
|-------|-------|
| **TC ID** | TC-DT-012 |
| **Covered Partitions** | AT-P4 |
| **Covered Business Rules** | BR-01 |
| **Precondition** | Invalid or expired token string is constructed. |
| **Input** | Send `GET http://localhost:3000/api/categories` with header `Authorization: Bearer <invalid_jwt>`. |
| **Expected Result** | API rejects with error status `403 Forbidden` or `401 Unauthorized`. |
| **Covered Domain** | AT-P4 (invalid token) |

---

### TC-DT-013 — Category list empty state

| Field | Value |
|-------|-------|
| **TC ID** | TC-DT-013 |
| **Covered Partitions** | AT-P1, CC-P2 |
| **Covered Business Rules** | BR-01, BR-02 |
| **Precondition** | All category records are removed from the database table (no categories remain). |
| **Input** | Navigate to the "Danh mục" tab. |
| **Expected Result** | The Category table displays with headers but contains no rows. System remains responsive (no frontend crash). |
| **Covered Domain** | AT-P1, CC-P2 (zero categories present) |

---

## Partition Coverage Summary

| Partition ID | Variable | Covered By TC |
|-------------|----------|---------------|
| **AT-P1** | `authToken` | TC-DT-001, 002, 003, 004, 005, 006, 007, 008, 009, 013 |
| **AT-P2** | `authToken` | TC-DT-010 |
| **AT-P3** | `authToken` | TC-DT-011 |
| **AT-P4** | `authToken` | TC-DT-012 |
| **CN-P1** | `categoryName` | TC-DT-002, TC-DT-007 |
| **CN-P2** | `categoryName` | TC-DT-003 |
| **CN-P3** | `categoryName` | TC-DT-004 |
| **CN-P4** | `categoryName` | TC-DT-005 |
| **CN-P5** | `categoryName` | TC-DT-006 |
| **DC-P1** | `deleteCategoryId` | TC-DT-007 |
| **DC-P2** | `deleteCategoryId` | TC-DT-008 |
| **DC-P3** | `deleteCategoryId` | TC-DT-009 |
| **CC-P1** | `categoriesCount` | TC-DT-001, 002, 003, 004, 005, 006, 007, 008 |
| **CC-P2** | `categoriesCount` | TC-DT-013 |

---

## Acceptance Criteria Check

- [x] Every partition covered (14/14 partitions).
- [x] Every business rule exercised (BR-01 through BR-07, and SUT deviations).
- [x] No duplicated test cases.

---

## Human Review Checklist

- [x] Every partition covered
- [x] Every business rule exercised
- [x] No duplicated test cases
