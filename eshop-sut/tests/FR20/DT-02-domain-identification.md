# DT-02 — Domain Identification
**Feature:** FR-20 — Xem sản phẩm (Mobile)  
**Date:** 2026-07-07  
**Skill:** DT-02  
**Input:** Verified `tests/FR20/DT-01-feature-understanding.md`

---

## Variable Identification

### Variable 1: Purchase Quantity (`quantity`)

| Attribute | Value |
|-----------|-------|
| **Variable** | `quantity` |
| **UI Element** | Text Input field next to "Số lượng:" |
| **Data Type** | Integer (handled as String in input state) |
| **Expected Valid Domain** | Integers $X \ge 1$ (e.g. `1`, `2`, `100`) |
| **Expected Invalid Domain** | - Zero (`0`) (Should be rejected or show error)<br>- Negative integers (e.g. `-1`, `-5`) (Should be rejected)<br>- Floating point / decimal numbers (e.g. `1.5`, `2.3`) (Should be rejected or rounded)<br>- Non-numeric strings (e.g. `"abc"`, `""`, `"   "`) (Should be rejected)<br>- Extremely large integers (e.g. `9999999999999999`) (Should be rejected/capped) |
| **SUT Actual Behaviour** | **Coercion/Normalization instead of Validation:** The SUT does not prevent typing invalid inputs in the text field. On clicking "Thêm vào giỏ hàng", the value is normalized via `normalizeQuantity`: <br>1. Uses `parseInt(value, 10)` to parse. <br>2. If parsed value is finite and $> 0$, it uses it. <br>3. Otherwise (letters, empty string, negative, zero), it silently falls back to `1`. <br>4. Decimal strings (e.g. `"2.5"`) are parsed as `2` by `parseInt`, which is valid and $>0$, so it uses `2`. |
| **Constraints** | Entered by the user. Default value is `"1"`. |
| **Dependencies** | None. Triggers local cart state updates when clicking "Thêm vào giỏ hàng". |
| **Evidence** | `frontend-mobile/App.js` lines 129-132 (`normalizeQuantity`), line 134 (`addToCart`). |

---

### Variable 2: Product ID (`productId`) (Implicit System Input)

| Attribute | Value |
|-----------|-------|
| **Variable** | `productId` |
| **UI Element** | "Xem chi tiết" buttons on the Home screen cards |
| **Data Type** | Integer (positive) |
| **Expected Valid Domain** | Positive integer of an existing product in the SQLite database |
| **Expected Invalid Domain** | - ID of a non-existent product (e.g. `999`) |
| **SUT Actual Behaviour** | **Data Format and Missing Page Handlers:** <br>1. If the ID is an even number (e.g. `2`, `4`), the backend sends the price as a string: `if (row.id % 2 === 0) row.price = row.price.toString()`. The mobile app parses this using `Number(value)` so it prints fine. <br>2. If a non-existent product ID is requested, the backend returns an empty object `{}`. The frontend checks `Object.keys(product).length === 0` and renders a blank state page with the message: `"Sản phẩm không tồn tại (Lỗi trắng trang do data rỗng)"`. |
| **Constraints** | Triggered by clicking "Xem chi tiết" in the product catalog. |
| **Dependencies** | Fetches data from `GET /api/products/:id`. |
| **Evidence** | `frontend-mobile/App.js` lines 113-127, lines 544-550; `backend/server.js` lines 159-165. |

---

## Domain Summary Table

| Variable | Type | Expected Valid Domain | Expected Invalid Domain | SUT Actual Behavior | Evidence |
|----------|------|-----------------------|-------------------------|---------------------|---------|
| `quantity` | Integer | Integers $X \ge 1$ | $X \le 0$, decimals, alphabetic, empty | Silently normalizes invalid values to `1` or truncates decimals | `App.js`: `normalizeQuantity` |
| `productId` | Integer | Existing product IDs (e.g. `1`, `2`, `3`...) | Non-existent IDs (e.g. `999`) | Non-existent IDs return `{}` and render a blank state page | `App.js`: `openProductDetail`; `server.js`: `GET /api/products/:id` |

---

## Dependencies Between Variables

```
Product Selection (productId)
       │
       ▼
Product Detail Screen Loaded
       │
       ▼
Quantity Input (quantity) ──► Add to Cart Button (addToCart) ──► Local Cart State Updated
```

---

## Ignored Variables (per DT-02 constraints)

| Element | Reason Excluded |
|---------|----------------|
| Product image, name, price, description | Display-only fields |
| User authentication state | Excluded because both guests and logged-in users can view products and add to cart |
| Header and Footer layout | Non-input UI elements |

---

## Human Review Checklist

- [x] Every input variable identified
- [x] No overlapping domains
- [x] Every domain supported by feature specification
