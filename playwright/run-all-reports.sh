#!/usr/bin/env bash
# =============================================================================
# run-all-reports.sh
# HW04 — Run all 9 per-feature per-browser Playwright suites and generate
# HTML reports with "Run by: 23127255"
#
# Usage: bash playwright/run-all-reports.sh
# Run from: SUT_HW04/ root directory (where tests/ and playwright/ live)
# =============================================================================

set -e  # exit on first error in critical sections (we'll handle test failures manually)

# Load nvm and use Node 22
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 22

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
PW_DIR="$SCRIPT_DIR"
STUDENT_ID="23127255"
TIMESTAMP="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"

echo "============================================================"
echo " HW04 Multi-Browser Report Runner"
echo " Student ID : $STUDENT_ID"
echo " Timestamp  : $TIMESTAMP"
echo " Playwright : $PW_DIR"
echo "============================================================"
echo ""

# Verify SUT is running
check_sut() {
  echo ">>> Checking SUT health..."
  if ! curl -s http://localhost:3000/api/categories > /dev/null 2>&1; then
    echo "ERROR: Backend API (port 3000) is not reachable. Start the SUT first."
    exit 1
  fi
  if ! curl -s http://localhost:5173 > /dev/null 2>&1; then
    echo "ERROR: Frontend (port 5173) is not reachable."
    exit 1
  fi
  if ! curl -s http://localhost:5174 > /dev/null 2>&1; then
    echo "ERROR: Admin panel (port 5174) is not reachable."
    exit 1
  fi
  echo ">>> SUT OK (ports 3000, 5173, 5174 responding)"
  echo ""
}

run_suite() {
  local CONFIG="$1"
  local LABEL="$2"
  local OUT_DIR="$3"

  echo "------------------------------------------------------------"
  echo " Running: $LABEL"
  echo " Config : $CONFIG"
  echo " Output : $OUT_DIR"
  echo "------------------------------------------------------------"

  # Ensure output directory exists
  mkdir -p "$OUT_DIR"

  cd "$PW_DIR"
  # Run playwright; allow test failures (non-zero exit from failed tests is OK)
  npx playwright test --config="$CONFIG" || true
  echo ""
}

check_sut

# ── FR-01 ─────────────────────────────────────────────────────────
run_suite "fr01.chromium.config.js" "FR-01 Chromium" "$ROOT_DIR/tests/FR01/reports/chromium"
run_suite "fr01.firefox.config.js"  "FR-01 Firefox"  "$ROOT_DIR/tests/FR01/reports/firefox"
run_suite "fr01.webkit.config.js"   "FR-01 WebKit"   "$ROOT_DIR/tests/FR01/reports/webkit"

# ── FR-11 ─────────────────────────────────────────────────────────
run_suite "fr11.chromium.config.js" "FR-11 Chromium" "$ROOT_DIR/tests/FR11/reports/chromium"
run_suite "fr11.firefox.config.js"  "FR-11 Firefox"  "$ROOT_DIR/tests/FR11/reports/firefox"
run_suite "fr11.webkit.config.js"   "FR-11 WebKit"   "$ROOT_DIR/tests/FR11/reports/webkit"

# ── FR-14 ─────────────────────────────────────────────────────────
run_suite "fr14.chromium.config.js" "FR-14 Chromium" "$ROOT_DIR/tests/FR14/reports/chromium"
run_suite "fr14.firefox.config.js"  "FR-14 Firefox"  "$ROOT_DIR/tests/FR14/reports/firefox"
run_suite "fr14.webkit.config.js"   "FR-14 WebKit"   "$ROOT_DIR/tests/FR14/reports/webkit"

# ── Patch all reports with "Run by: StudentID" banner ─────────────
echo "============================================================"
echo " Patching HTML reports with student ID banner..."
echo "============================================================"
cd "$PW_DIR"
node patch-reports.js

echo ""
echo "============================================================"
echo " ALL DONE"
echo " Run by : $STUDENT_ID"
echo " Time   : $TIMESTAMP"
echo "============================================================"
echo ""
echo "Reports generated in:"
echo "  tests/FR01/reports/{chromium,firefox,webkit}/index.html"
echo "  tests/FR11/reports/{chromium,firefox,webkit}/index.html"
echo "  tests/FR14/reports/{chromium,firefox,webkit}/index.html"
