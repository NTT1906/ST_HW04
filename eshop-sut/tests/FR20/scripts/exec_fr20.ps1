# PowerShell Script to Automate FR-20 Test Cases via ADB
# Date: 2026-07-07
# Author: AI (Antigravity)

$adb = "D:\bin\android\sdk\platform-tools\adb.exe"
$screenshotDir = "c:\Users\nttis\Downloads\eshop-sut\tests\FR20\screenshots"

function Capture-Screen($name) {
    Start-Sleep -Milliseconds 500
    & $adb shell screencap -p "/sdcard/$name.png"
    & $adb pull "/sdcard/$name.png" "$screenshotDir\$name.png"
    Write-Host "Captured screenshot: $name.png"
}

function Tap($x, $y) {
    & $adb shell input tap $x $y
    Start-Sleep -Seconds 1
}

function Input-Text($text) {
    & $adb shell input text $text
    Start-Sleep -Seconds 1
}

function Clear-Quantity {
    # Tap quantity field to focus
    Tap 215 1361
    # Press backspace 15 times to ensure it's empty
    for ($i=0; $i -lt 15; $i++) {
        & $adb shell input keyevent 67
    }
    Start-Sleep -Milliseconds 500
}

function Return-Home {
    # Tap "EShop Mobile" brand text
    Tap 206 72
}

function Dismiss-Alert {
    # Tap "OK" button coordinates on alert
    Tap 894 1301
}

Write-Host "Starting Test Execution for FR-20..."

# --- TC-DT-001 ---
Write-Host "Executing TC-DT-001 (Odd ID, Qty 2)..."
Return-Home
Tap 307 1236 # View details Product 1
Capture-Screen "TC001-before"
Clear-Quantity
Input-Text "2"
Tap 541 1525 # Add to cart
Capture-Screen "TC001-after"
Dismiss-Alert

# --- TC-DT-002 ---
Write-Host "Executing TC-DT-002 (Even ID, Qty 1 default)..."
Return-Home
Tap 307 2089 # View details Product 2
Capture-Screen "TC002-before"
Tap 541 1525 # Add to cart (default 1)
Capture-Screen "TC002-after"
Dismiss-Alert

# --- TC-DT-004 ---
Write-Host "Executing TC-DT-004 (Qty 0)..."
Return-Home
Tap 307 1236 # View details Product 1
Clear-Quantity
Input-Text "0"
Tap 541 1525 # Add to cart
Capture-Screen "TC004-after"
Dismiss-Alert

# --- TC-DT-005 ---
Write-Host "Executing TC-DT-005 (Qty -5)..."
Return-Home
Tap 307 1236
Clear-Quantity
Input-Text "-5"
Tap 541 1525
Capture-Screen "TC005-after"
Dismiss-Alert

# --- TC-DT-006 ---
Write-Host "Executing TC-DT-006 (Qty 2.5)..."
Return-Home
Tap 307 1236
Clear-Quantity
Input-Text "2.5"
Tap 541 1525
Capture-Screen "TC006-after"
Dismiss-Alert

# --- TC-DT-007 ---
Write-Host "Executing TC-DT-007 (Qty Empty)..."
Return-Home
Tap 307 1236
Clear-Quantity
Tap 541 1525
Capture-Screen "TC007-after"
Dismiss-Alert

# --- TC-DT-008 ---
Write-Host "Executing TC-DT-008 (Qty Exceptionally Large)..."
Return-Home
Tap 307 1236
Clear-Quantity
Input-Text "999999999999"
Tap 541 1525
Capture-Screen "TC008-after"
Dismiss-Alert

Return-Home
Write-Host "Test execution complete."
