# ENV-01 — Testing Environment Report
## Feature: FR-20 — Xem sản phẩm (Mobile)
**Date:** 2026-07-07  
**Executed by:** AI (Antigravity)

---

## Environment Summary

| Item | Details |
|------|---------|
| Metro Bundler URL | http://localhost:8081 |
| Backend URL (Local) | http://localhost:3000 |
| Backend API URL (App Config) | http://172.23.190.239:3000/api |
| Target Platform | Android (Expo) |
| Device | Android Emulator (emulator-5554) |
| OS Version | Android 16 |
| Host OS | Windows |

---

## SUT Reachability

| Endpoint / Interface | Status |
|----------------------|--------|
| `http://localhost:3000/api/products` | ✅ Reachable — HTTP 200 (Returns product list) |
| Mobile Frontend UI on Emulator | ✅ Reachable — Mobile application successfully launches and displays product details screen |

---

## Product Details Screen — Observed UI Elements & Selectors

Since we are testing the mobile interface via ADB/Emulator, we interact with inputs and buttons using coordinate clicks, text-based targeting, or focused elements.

| Element | Component / Type | Properties / Texts |
|---------|------------------|-------------------|
| Quantity input | `TextInput` | `keyboardType="numeric"`, `style={styles.quantityInput}`, default value: `1` |
| Add to Cart button | `TouchableOpacity` | Contains text `"Thêm vào giỏ hàng"` or `"Đã thêm"`, `style={styles.greenButton}` |
| Product Name | `Text` | Display text: `{product.name}` (e.g. `"iPhone 15 Pro Max"`), `style={styles.detailName}` |
| Product Price | `Text` | Display text: `{formatMoney(product.price)}` (e.g. `"30,000,000 ₫"`), `style={styles.detailPrice}` |
| Product Description | `Text` | Display text: `{product.description}`, `style={styles.description}` |

---

## Directory Structure Created

```
tests/
└── FR20/
    ├── screenshots/
    │   └── ENV-01-product-screen.png
    └── ENV-01-environment-report.md
```

---

## ADB Environment Verification Command

```powershell
# Verify running emulator devices
& "D:\bin\android\sdk\platform-tools\adb.exe" devices

# Capture screen for verification
& "D:\bin\android\sdk\platform-tools\adb.exe" shell screencap -p /sdcard/screencap.png
& "D:\bin\android\sdk\platform-tools\adb.exe" pull /sdcard/screencap.png tests/FR20/screenshots/ENV-01-product-screen.png
```

---

## Status: ✅ PASSED

The mobile testing environment is fully operational. The backend API is reachable, the Android emulator is connected, and the EShop Mobile application is running and rendering the product details screen correctly.

---

## Screenshots

| Screenshot | Description |
|-----------|-------------|
| `ENV-01-product-screen.png` | Product details view on Android Emulator (default screen) |
