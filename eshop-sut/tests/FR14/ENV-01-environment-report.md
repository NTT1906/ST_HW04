# ENV-01 — Testing Environment Report
## Feature: FR-14 — Category Management (CRUD)
**Date:** 2026-07-07  
**Executed by:** AI (Antigravity)

---

## Environment Summary

| Item | Details |
|------|---------|
| Admin Frontend URL | http://localhost:5174 |
| Backend URL  | http://localhost:3000 |
| Frontend Framework | React (Vite, Port 5174) |
| Backend Framework | Node.js / Express + SQLite |
| Browser | Chromium (Playwright headless) |
| OS | Windows |

---

## SUT Reachability

| Endpoint | Status |
|----------|--------|
| `http://localhost:5174/` (Unauthenticated) | ✅ Reachable (Renders Admin Login form) |
| `http://localhost:5174/` (Authenticated) | ✅ Reachable (Renders Admin Dashboard) |
| `http://localhost:3000/api/categories` | ✅ Reachable — HTTP 200 |

---

## Test Accounts

| Role | Email | Password | Notes |
|------|-------|----------|-------|
| Admin | `admin@eshop.com` | `Admin123!` | Credentials seed in backend database. Note: `setup_guide.md` mentions `admin123`, but login fails with that credential. `Admin123!` is the correct working credential. |

---

## Login Form Selectors

| Field | Playwright Selector |
|-------|-------------------|
| Email input | `input[placeholder="Email"]` |
| Password input | `input[placeholder="Password"]` |
| Login button | `button:has-text("Login")` |

---

## Category Management — Observed Behavior

- **Heading:** "Quản lý Danh mục" ✅ visible
- **Form Fields:**
  - Input field with placeholder "Tên danh mục mới" ✅
  - Button with text "Thêm mới" ✅
- **Table headers:** ID, Tên Danh Mục, Hành động ✅
- **Actions:** "Xóa" button for each category row ✅
- **Backend check:** Navigation to "Danh mục" queries `GET http://localhost:3000/api/categories` to load categories.

---

## Directory Structure Created

```
tests/
└── FR14/
    ├── screenshots/
    │   ├── ENV-01-login-page.png
    │   ├── ENV-01-dashboard.png
    │   └── ENV-01-categories-page.png
    └── ENV-01-environment-report.md
```

---

## Playwright Script

**Location:** `playwright/env_check_fr14.js`

---

## Status: ✅ PASSED

The testing environment is fully operational. The backend and admin frontend are reachable, credentials are verified, and the Category Management tab is accessible.

---

## Screenshots

| Screenshot | Description |
|-----------|-------------|
| `ENV-01-login-page.png` | Admin Login form at `http://localhost:5174/` |
| `ENV-01-dashboard.png` | Admin Dashboard after successful login |
| `ENV-01-categories-page.png` | Category Management interface |
