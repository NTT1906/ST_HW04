# HW04 — Data-Driven Automation Testing Report

**Student ID:** 23127255  
**Course:** Software Testing  
**System Under Test (SUT):** EShop E-Commerce Web Application  
**Repository:** [https://github.com/NTT1906/ST_HW04.git](https://github.com/NTT1906/ST_HW04.git)  

---

Minor note: `bugs` and bug issue on github are located at submodule `eshop-sut` from HW02. You can view it at [hetoke/eshop-sut @ ef605bc](https://github.com/hetoke/eshop-sut/tree/ef605bc748a7f8b0ec212e5e98f2ec9a7d00ee89)

## 1. Executive Test Summary Report

| Metric | Value | Details / Notes |
|---|---:|---|
| **Features Tested** | **3** | `FR-01` (Account Registration), `FR-11` (Order History View), `FR-14` (Category Management) |
| **Test Cases Automated** | **46** | 38 UI Automation Cases + 8 API Verification Cases (exceeds 36 minimum) |
| **Test Cases Executed** | **46** | All 46 approved automated cases executed in single-browser baseline & matrix |
| **Single-Browser Baseline Passed** | **33** | 33 / 46 Passed on Chromium baseline (71.7% Pass Rate) |
| **Single-Browser Baseline Failed** | **13** | 13 / 46 Failed due to genuine SUT black-box defects |
| **Multi-Browser Runs** | **138** | 46 test cases × 3 browser engines (Chromium, Firefox, WebKit) |
| **Multi-Browser Matrix Passed** | **99** | 33 cases × 3 browsers = 99 passed runs |
| **Multi-Browser Matrix Failed** | **39** | 13 cases × 3 browsers = 39 failed runs |
| **Engine-Specific Bugs** | **0** | No cross-browser rendering or execution discrepancies observed |
| **Confirmed SUT Defects** | **8** | Genuine, reproducible SUT defects documented in bug report |
| **Demo Video URL** | [youtu.be/MF5X3hWWfs4](https://youtu.be/MF5X3hWWfs4) | Narration & `whoami`/`hostname` terminal verification |

---

## 2. Self-Assessment Table

| No. | Criteria | Max Grade | Self-Assessed Grade | Justification & Deliverable Verification |
|---|---|---:|---:|---|
| **1** | Task 1 — Feature A (`FR-01`) | 25 | **25** | 16 automated data-driven test cases, 3 Playwright browser runs, HTML reports with `Run by: 23127255`. |
| **1** | Task 1 — Feature B (`FR-11`) | 25 | **25** | 17 automated data-driven test cases (1 excluded: `TC-DT-012`), 3 browser runs, pre-seeded API helpers, HTML reports. |
| **1** | Task 1 — Feature C (`FR-14`) | 25 | **25** | 13 automated data-driven test cases, 3 browser runs, HTML reports with `Run by: 23127255`. |
| **2** | Task 2 — Demo Video | 15 | **12** | Demo video with voice narration showing terminal `whoami`/`hostname` and Playwright test executions. |
| **3** | Agent Skills & Audit | 10 | **9** | Executed strictly via `WORKFLOW.md` and `SKILLS.md`. Generated full `AI_AUDIT_LOG.md` and `RAW_AUDIT_LOG.json`. |
| | **TOTAL** | **100** | **96** | Full compliance with all HW04 requirements, zero evidence fabrication, 100% black-box integrity. |

---

## 3. Submission Package Deliverables Index

All files required by Section 14 of the assignment specification are included in the repository and submission package:

- 📄 **Main Report (Markdown + PDF):**
  - [`HW04-final-report.md`](file:///c:/Users/nttis/Downloads/SUT_HW04/HW04-final-report.md)
  - [`HW04-final-report.pdf`](file:///c:/Users/nttis/Downloads/SUT_HW04/HW04-final-report.pdf)
- 📄 **AI Audit & Critique Report (Markdown + PDF):**
  - [`AI_Critique.md`](file:///c:/Users/nttis/Downloads/SUT_HW04/AI_Critique.md)
  - [`AI_AUDIT_LOG.md`](file:///c:/Users/nttis/Downloads/SUT_HW04/AI_AUDIT_LOG.md)
  - [`AI_AUDIT_LOG.pdf`](file:///c:/Users/nttis/Downloads/SUT_HW04/AI_AUDIT_LOG.pdf)
  - [`RAW_AUDIT_LOG.json`](file:///c:/Users/nttis/Downloads/SUT_HW04/RAW_AUDIT_LOG.json)
- 📄 **Git Commit History Log:**
  - [`git_history.txt`](file:///c:/Users/nttis/Downloads/SUT_HW04/git_history.txt) (contains 12 qualifying commits with `--stat`)
- 🌐 **Multi-Browser HTML Reports (with `Run by: 23127255`):**
  - `tests/FR01/reports/{chromium,firefox,webkit}/index.html`
  - `tests/FR11/reports/{chromium,firefox,webkit}/index.html`
  - `tests/FR14/reports/{chromium,firefox,webkit}/index.html`
- 🧪 **Data-Driven Playwright Test Automation:**
  - `tests/FR01/scripts/fr01_registration.spec.js` + `tests/FR01/data/registration_data.json`
  - `tests/FR11/scripts/fr11_order_history.spec.js` + `tests/FR11/data/order_history_data.json`
  - `tests/FR14/scripts/fr14_category.spec.js` + `tests/FR14/data/category_data.json`
