# ENV-01 — Testing Environment Report
## Feature: FR-11 — Order History View (User)
**Date:** 2026-07-07  
**Executed by:** AI (Antigravity)

---

## Environment Summary

| Item | Details |
|------|---------|
| Frontend URL | http://localhost:5173 |
| Backend URL  | http://localhost:3000 |
| Frontend Framework | React (Vite, Port 5173) |
| Backend Framework | Node.js / Express + SQLite |
| Browser | Chromium (Playwright headless) |
| OS | Windows |

---

## SUT Reachability

| Endpoint | Status |
|----------|--------|
| `http://localhost:5173/login` | ✅ Reachable |
| `http://localhost:5173/profile` | ✅ Reachable (authenticated) |
| `http://localhost:3000/api/orders/my-orders` | ✅ Reachable — HTTP 200 |

---

## Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Regular User | `test@eshop.com` | `Test1234!` |
| Admin | `admin@eshop.com` | `Admin123!` |

---

## Login Form Selectors (Critical Finding)

> **Bug Note:** The Login form uses `type="text"` for both the username and password fields (not `type="email"` or `type="password"`). The page heading reads "Đăng Ký" (Register) but the route is `/login`. These are UI defects observed during environment setup.

| Field | Playwright Selector |
|-------|-------------------|
| Username/Email input | `page.locator('input[type="text"]').nth(0)` |
| Password input | `page.locator('input[type="text"]').nth(1)` |
| Submit button | `button[type="submit"]` |

---

## Order History Feature — Observed Behavior

### With Existing Orders (Test User has 1 order)

- **Heading:** "Lịch sử đơn hàng" ✅ visible  
- **Table headers:** Mã ĐH, Ngày đặt, Tổng tiền, Trạng thái, Thao tác ✅  
- **Order row observed:**

| Mã ĐH | Ngày đặt | Tổng tiền | Trạng thái | Thao tác |
|-------|----------|-----------|-----------|---------|
| #2 | 7/7/2026 | 58.000.000 ₫ | Chờ xác nhận | Hủy đơn (button) |

- **Cancel button ("Hủy đơn"):** Visible for orders with status `pending`, `confirmed`, or `shipping` (not `delivered`, not `canceled`)
- **API response confirms:** `GET /api/orders/my-orders` returns `[{id, user_id, total_amount, status, shipping_address, created_at}]`

### Empty State

- **Message:** "Bạn chưa có đơn hàng nào." (verified from source code — `Profile.jsx` line 169)

---

## Directory Structure Created

```
tests/
└── FR11/
    ├── testcases/
    ├── scripts/
    └── screenshots/
        ├── ENV-01-login-page.png
        ├── ENV-01-after-login.png
        └── ENV-01-profile-page.png

bugs/
└── FR11/
    └── screenshots/
```

---

## Playwright Script

**Location:** `playwright/env_check_fr11.js`

---

## Status: ✅ PASSED

The testing environment is fully operational. Both frontend and backend are reachable. The Order History feature is accessible and renders correctly for authenticated users.

---

## Screenshots

| Screenshot | Description |
|-----------|-------------|
| `ENV-01-login-page.png` | Login form at `/login` |
| `ENV-01-after-login.png` | Homepage after successful login |
| `ENV-01-profile-page.png` | Profile page showing Order History with 1 order |
