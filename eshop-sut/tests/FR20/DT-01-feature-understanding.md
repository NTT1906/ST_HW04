# DT-01 — Feature Understanding
**Feature:** FR-20 — Xem sản phẩm (Mobile)  
**Date:** 2026-07-07  
**Skill:** DT-01  
**Evidence:**
- `tests/FR20/screenshots/ENV-01-product-screen.png`
- `api_specification.md` §3.1, §3.2
- `WORKFLOW.md` Feature: Xem sản phẩm (Mobile)
- `frontend-mobile/App.js` (lines 113-153, 536-588)
- `backend/server.js` (lines 141-165)

---

## 1. Feature Summary

The **Xem sản phẩm (Mobile)** feature allows a **Guest or Registered User** on the mobile application to view details of products and add them to their shopping cart:
- The home screen fetches the product list from the backend (`GET /api/products`) and renders product cards.
- Clicking "Xem chi tiết" on a product fetches the product details (`GET /api/products/:id`) and navigates to the detailed view (`productDetail`).
- On the product details view, users can view product attributes (image, name, price, description) and input a purchase quantity.
- Clicking "Thêm vào giỏ hàng" adds the product with the specified quantity to the shopping cart.

---

## 2. Actors

| Actor | Role |
|-------|------|
| Guest / Registered User | Primary actor. Views product details and specifies the quantity to add to the cart. |
| Backend API | Serves product data (`GET /api/products` and `GET /api/products/:id`). |

---

## 3. System Inputs

| Input ID | UI Element | Variable | Data Type | Required | Notes |
|----------|-----------|----------|-----------|----------|-------|
| IN-01 | Text Input (Số lượng) | `quantity` | Integer / String | Yes | Quantity of items to purchase. Default value is `"1"`. |
| IN-02 | Button (Thêm vào giỏ hàng) | N/A | Button | Yes | Triggers the action to append/update the product in the cart. |

---

## 4. System Outputs

| Output | Trigger | Observable Behaviour |
|--------|---------|---------------------|
| Product Detail view | Clicking "Xem chi tiết" from Home screen | Product detail screen renders with image, name, price, description, quantity input field, and "Thêm vào giỏ hàng" button. |
| Success Alert | Clicking "Thêm vào giỏ hàng" button | Alert modal with text `"Thành công: Đã thêm vào giỏ hàng"`. |
| Local Cart state change | Clicking "Thêm vào giỏ hàng" button | The cart state updates in-memory. The navbar cart counter (e.g. `Giỏ (N)`) increments. |

---

## 5. Business Rules

| Rule ID | Business Rule | Evidence Source |
|---------|--------------|-----------------|
| BR-01 | Product details are retrieved from `GET /api/products/:id`. | `frontend-mobile/App.js` line 120; `backend/server.js` line 159. |
| BR-02 | The default value shown in the quantity input is 1. | `frontend-mobile/App.js` line 29, line 115. |
| BR-03 | Adding a product to the cart updates the local in-memory React state `cart` and does not call any API. | `frontend-mobile/App.js` lines 134-153. (Note: Although `api_specification.md` mentions a `POST /api/cart` endpoint, the mobile client implements cart management purely on the frontend). |
| BR-04 | If the product is already in the cart, the quantity is accumulated: `newQuantity = oldQuantity + addedQuantity`. | `frontend-mobile/App.js` line 145. |
| BR-05 | Quantity inputs are normalized using `parseInt(value, 10)`. If the parsed value is not a finite number or is <= 0, it defaults to 1. | `frontend-mobile/App.js` lines 129-132. |

---

## 6. Preconditions

- Mobile application is installed and running on the emulator.
- Emulator has network connectivity to the backend API.
- Product data exists in the SQLite database.
- The product screen/detail view has loaded successfully.

---

## 7. Assumptions

| # | Assumption | Status |
|---|-----------|--------|
| A-01 | Even though the `quantity` text field uses `keyboardType="numeric"`, users might be able to type or paste invalid inputs (e.g. letters, negative numbers, decimals, or extremely large values). | **Assumption** — to be verified during testing. |
| A-02 | Non-integer numeric strings (e.g., `"2.5"`) will be truncated to `"2"` because of the `parseInt(value, 10)` normalization. | **Assumption** — to be verified during testing. |
| A-03 | Strings that do not begin with digits (e.g. `"abc"` or `"-5"`) will default to `1` upon adding to the cart due to `normalizeQuantity`. | **Assumption** — to be verified during testing. |

---

## 8. Open Questions

| # | Question | Impact |
|---|---------|--------|
| OQ-01 | Is there a maximum value constraint for the quantity field? (e.g., stock limits, database constraints, or frontend integer overflow). | **Resolved** — No specific limit is specified. Assumed none. |
| OQ-02 | Does the quantity field validate inputs dynamically (as-you-type) or only when clicking the add button? | **Resolved** — Input state is updated dynamically but normalization/sanitization only happens on click. |

---

## 9. Human Review Checklist

- [x] Feature purpose is correct
- [x] All actors identified
- [x] All business rules have evidence
- [x] No unsupported assumptions, ask for clarification

