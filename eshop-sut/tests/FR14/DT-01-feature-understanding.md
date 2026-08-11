# DT-01 — Feature Understanding
**Feature:** FR-14 — Category Management (CRUD)  
**Date:** 2026-07-07  
**Skill:** DT-01  
**Evidence:**
- `tests/FR14/screenshots/ENV-01-categories-page.png`
- `tests/FR14/screenshots/ENV-01-login-page.png`
- `api_specification.md` §3.3, §3.4
- `WORKFLOW.md` Feature: Category Management (CRUD)
- `backend/server.js` (lines 243-278)
- `backend/database.js` (lines 22-26, 83-89)

---

## 1. Feature Summary

The **Category Management** feature allows an **authenticated Administrator** to perform CRUD operations on category entities. In the current SUT:
- All categories are retrieved from the backend (`GET /api/categories`) and displayed in a table.
- A new category can be created by entering a name in the text input and clicking "Thêm mới" (`POST /api/categories`).
- Existing categories can be deleted by clicking the "Xóa" button in the category row (`DELETE /api/categories/:id`).
- Note: Although the API supports updating categories (`PUT /api/categories/:id`), there is **no update/edit functionality** implemented in the frontend admin interface for categories.

---

## 2. Actors

| Actor | Role |
|-------|------|
| Authenticated Admin | Primary actor. Authenticated administrator managing system categories. |
| Backend API | Processes queries and updates, executing SQL on the SQLite database. |

---

## 3. System Inputs

| Input ID | UI Element | Variable | Data Type | Required | Notes |
|----------|-----------|----------|-----------|----------|-------|
| FI-01 | Text Input (Tên danh mục mới) | `categoryName` | String | Yes | Name of the category to be created. |
| FI-02 | Button (Thêm mới) | N/A | Button | N/A | Triggers submission of the creation form. |
| FI-03 | Button (Xóa) | `id` (via path param) | Button / ID | N/A | Deletes the category corresponding to the row. |
| FI-04 | JWT Token (implicit, in HTTP header) | `Authorization: Bearer <token>` | String | Yes | Set automatically after login. Required for POST and DELETE. |

---

## 4. System Outputs

| Output | Trigger | Observable Behaviour |
|--------|---------|---------------------|
| Category table list | Tab navigation / action success | Table rendered with rows: `ID` (system-generated `#{id}`), `Tên Danh Mục`, and `Hành động` (Xóa button). |
| Creation success | Form submit with valid/accepted name | Input field cleared; table list refreshed to show new category. |
| Creation failure | Form submit error (e.g. backend down) | Alert dialog: `"Lỗi thêm DM: <error message>"` |
| Deletion success | Clicking "Xóa" button succeeds | Table list refreshed; category is removed. |
| Deletion failure | Clicking "Xóa" button fails | Alert dialog: `"Lỗi xóa DM: <error message>"` |

---

## 5. Business Rules

| Rule ID | Business Rule | Evidence Source |
|---------|--------------|-----------------|
| BR-01 | Access to Category Management requires Administrator privileges and a valid JWT. | `WORKFLOW.md` preconditions; `backend/server.js` route protection using `authenticateToken`. |
| BR-02 | All categories are fetched from `GET /api/categories`. | `backend/server.js` line 243. |
| BR-03 | Creation of a category is requested via `POST /api/categories` with body `{ "name": categoryName }`. | `frontend-admin/src/App.jsx` line 145. |
| BR-04 | Deletion of a category is requested via `DELETE /api/categories/:id`. | `frontend-admin/src/App.jsx` line 155. |
| BR-05 | ⚠️ **Expected:** Category names should be unique. <br>**SUT Deviation:** SUT allows duplicate category names due to the lack of a `UNIQUE` constraint in the database. | `backend/database.js` line 23-26. |
| BR-06 | ⚠️ **Expected:** Category names must not be empty or whitespace-only. <br>**SUT Deviation:** SUT accepts and saves empty/whitespace names because there is no server-side validation. | `backend/server.js` line 249; user confirmation. |
| BR-07 | ⚠️ **Expected:** Category deletion should enforce referential integrity (e.g. restrict deletion if products are linked). <br>**SUT Deviation:** SUT allows category deletion even with linked products, leaving orphaned products in the system. | `backend/database.js` line 64-71; `backend/server.js` line 269; user confirmation. |

---

## 6. Preconditions

- The backend server is running on `http://localhost:3000`.
- The admin frontend is running on `http://localhost:5174`.
- The user is logged in as an Administrator (`admin@eshop.com` / `Admin123!`).
- The user has navigated to the Category Management ("Danh mục") page.

---

## 7. Assumptions

| # | Assumption | Status |
|---|-----------|--------|
| A-01 | Empty or whitespace-only category names will be accepted by the backend since there is no explicit validation logic on the server. | **Confirmed (Fact)** — User confirmed empty strings are accepted. |
| A-02 | Duplicate category names will be accepted by the backend because no `UNIQUE` constraint exists on the database table. | **Assumption** — to be tested |
| A-03 | Exceptionally long category names will be accepted by SQLite, which may cause layout issues in the Category Table or Product grids. | **Assumption** — to be tested |
| A-04 | Deleting a category that contains products will succeed at the database level but will orphan those products, which may cause UI rendering failures on the admin Product page or the customer web storefront. | **Partially Resolved** — Products remain loadable and editable on the admin side, but behavior on client storefront or other pages remains to be observed. |

---

## 8. Open Questions

| # | Question | Impact |
|---|---------|--------|
| OQ-01 | Does the backend enforce any length restrictions (e.g. max length) or check for empty string inputs in `POST /api/categories`? | **Resolved** — No. User verified empty strings can be inputted and saved. |
| OQ-02 | What happens to products assigned to a deleted category? Does the product page fail to load or show blank category? | **Resolved** — Products still load and are fully editable to select other categories. |
| OQ-03 | Is authorization strictly enforced? Can a regular user or unauthenticated request call POST or DELETE on categories? | **Medium** — Security testing scope. *AI will test this directly during execution.* |

---

## 9. Human Review Checklist

- [x] Feature purpose is correct
- [x] All actors identified
- [x] All business rules have evidence
- [x] No unsupported assumptions, ask for clarification

---

## Screenshot Evidence

![Categories Management Page](screenshots/ENV-01-categories-page.png)
