# HW04 AI Workflow — Data-Driven Automation Testing

This workflow orchestrates the skills defined in `SKILLS.md`.

The workflow is designed for the HW04 Software Testing — Automation Testing
assignment.

The workflow uses an AI-First strategy while keeping all final decisions,
reviews, corrections, and execution verification under human control.

eshop-sut/
    = LEGACY HW02 REFERENCE ONLY

SUT_HW04/tests/
    = NEW HW04 ARTIFACTS

Do not write HW04 artifacts into eshop-sut/.
Do not modify HW02 artifacts in eshop-sut/.
Do not treat files under eshop-sut/tests/ or eshop-sut/bugs/ as HW04 execution evidence.

---

# 1. Human Approval Policy

This workflow is human-driven.

## Core Rules

Unless explicitly instructed otherwise:

- Execute exactly **one skill at a time**.
- Produce only the artifact requested by the current stage.
- Stop immediately after producing the artifact.
- Wait for explicit human approval before continuing.
- Never execute the next skill automatically.
- Never assume human approval.
- Never modify an approved artifact unless the human explicitly requests it.
- Never silently overwrite an existing artifact.
- Never fabricate test results, screenshots, traces, logs, reports, timestamps,
  bugs, or other evidence.
- Treat the EShop application as a **black-box from the implementation
  perspective**, while using the provided `api_specification.md` as an
  authoritative external specification.
- Use the implemented UI and `api_specification.md` to establish feature
  behavior, inputs, preconditions, and related API endpoints.
- Do not inspect or depend on application source-code implementation details
  unless explicitly authorized by the human.
- If required information cannot be established from the implemented UI,
  `api_specification.md`, or approved project artifacts, stop and request the
  missing evidence.
- Preserve existing HW02/HW03 artifacts unless the human explicitly requests
  modification.
- Do not replace an existing artifact with a newly generated version merely
  because the new version is more convenient.

## Human Review Gate

After every skill execution:

```text
Skill
  ↓
Artifact produced
  ↓
HUMAN REVIEW
  ↓
Approved?
 ├── NO → Stop and correct/re-run as instructed
 └── YES
       ↓
     Continue to next stage
```

The workflow must never interpret the absence of a rejection as approval.

---

# 2. HW04 Scope

The three HW04 web features are the same three web features selected in HW02:

- `FR-01` — Account Registration
- `FR-11` — Order History View (User)
- `FR-14` — Category Management (CRUD)

Pool D / mobile testing is not part of the HW04 automation scope.

Each feature must independently satisfy:

- At least 12 automated test cases.
- Data-driven execution using external CSV or JSON data.
- At least three distinct assertion patterns across the automation suite.
- Execution on Chromium.
- Execution on Firefox.
- Execution on WebKit.
- An HTML report for each required browser execution.

Minimum assignment totals:

```text
3 features
×
12 automated cases
=
36 automated cases minimum
```

and:

```text
3 features
×
3 browsers
=
9 browser executions minimum
```

---

# 3. Source-of-Truth Policy

HW04 uses multiple sources of evidence. They have different purposes and
must not be treated as interchangeable.

## 3.1 Implemented UI

Use the implemented UI to determine:

- What the user can actually interact with.
- User-controllable inputs.
- Visible validation behavior.
- Available actions.
- Navigation behavior.
- Observable results.
- Actual selectors/locators required for automation.

## 3.2 `api_specification.md`

Use `api_specification.md` to determine:

- Related API endpoints.
- HTTP methods.
- API-level feature behavior documented by the project.
- Request/response information provided by the specification.
- API-supported preconditions and data constraints when documented.

Do not invent endpoints.

Do not assume API behavior that is not documented.

## 3.3 Existing HW02 Artifacts

Use existing HW02 artifacts as the baseline for:

- Domain Testing.
- Boundary Value Analysis.
- Existing test cases.
- Existing expected results.
- Existing feature understanding.

Do not regenerate HW02 testing artifacts merely to duplicate previous work.

## 3.4 Execution Evidence

Use actual execution evidence to determine:

- Pass/Fail.
- Actual behavior.
- Browser-specific behavior.
- Whether a failure is reproducible.
- Whether a genuine SUT defect exists.

## 3.5 Conflict Resolution

If sources appear inconsistent:

1. Check the implemented UI.
2. Check `api_specification.md`.
3. Check the existing approved HW02 artifacts.
4. Record the discrepancy.
5. Stop and request human clarification if the discrepancy affects the
   expected behavior or test result.

Do not silently choose an interpretation.

---

# 4. Artifact and Folder Rules

## 4.1 General Rule

Before executing any skill, inspect the relevant existing artifacts.

Never assume that a folder is empty.

For each feature:

```text
tests/FR{feature}/
bugs/FR{feature}/
```

Existing artifacts must be reused whenever they remain valid.

## 4.2 Recommended HW04 Structure

Use the following structure unless the repository already has an established
compatible structure:

```text
tests/
├── FR01/
│   ├── testcases/
│   ├── scripts/
│   ├── data/
│   ├── screenshots/
│   ├── traces/
│   ├── videos/
│   ├── logs/
│   ├── reports/
│   │   ├── chromium/
│   │   ├── firefox/
│   │   └── webkit/
│   └── execution.md
│
├── FR11/
│   ├── testcases/
│   ├── scripts/
│   ├── data/
│   ├── screenshots/
│   ├── traces/
│   ├── videos/
│   ├── logs/
│   ├── reports/
│   │   ├── chromium/
│   │   ├── firefox/
│   │   └── webkit/
│   └── execution.md
│
└── FR14/
    ├── testcases/
    ├── scripts/
    ├── data/
    ├── screenshots/
    ├── traces/
    ├── videos/
    ├── logs/
    ├── reports/
    │   ├── chromium/
    │   ├── firefox/
    │   └── webkit/
    └── execution.md

bugs/
├── FR01/
├── FR11/
└── FR14/

REPORT/
├── HW04_Report.md
├── HW04_Report.pdf
├── AI_Audit.md
├── AI_Audit.pdf
├── AI_Critique.md
├── AI_Critique.pdf
├── README.md
└── git-log.txt
```

If the repository already has an established structure, preserve it and adapt
the workflow to that structure instead of creating duplicate directories.

## 4.3 File Safety

- Do not overwrite an existing file without explicit permission.
- Do not create duplicate versions such as `final2`, `new`, `latest`, or
  `fixed-final`.
- Before modifying an existing artifact, determine whether it is approved.
- Approved artifacts are immutable unless the human explicitly requests a
  change.
- Save generated artifacts in the feature-specific directory.
- Keep evidence associated with the feature and browser that produced it.
- Do not mix FR-01, FR-11, and FR-14 execution artifacts.
- Do not mix Chromium, Firefox, and WebKit reports.
- Do not place temporary files into the final submission directory.
- Preserve raw AI audit logs separately from summarized reports.

---

# 5. Required Inputs

The workflow requires:

- EShop SUT.
- `api_specification.md`.
- Existing HW02 artifacts.
- Existing HW03/HW04 project structure where applicable.
- `SKILLS.md`.
- `FEATURE_INPUT.md` or equivalent feature-input artifacts.
- Existing test cases under `tests/FR{feature}/`.
- Existing bugs under `bugs/FR{feature}/`.
- Required Playwright/Selenium environment.
- Chromium.
- Firefox.
- WebKit.
- Student ID.
- Public GitHub repository.
- Assignment-specific report templates, if provided.

Before starting a feature, inspect the relevant existing files rather than
recreating them.

---

# 6. Stage 0 — Preparation

## Skill

`ENV-01`

## Purpose

Verify that the EShop SUT and automation environment are ready.

## Inputs

- EShop SUT.
- `api_specification.md`.
- Existing project artifacts.
- Existing test artifacts.
- Automation tooling.

## Required Verification

Verify:

- SUT is available.
- Web frontend is accessible.
- `api_specification.md` is available.
- Automation tooling is available.
- Required browser engines are available.
- Required test accounts/state can be prepared.
- Existing HW02 artifacts can be located.
- Required feature folders exist or can be created safely.

## Output

`Environment Ready` and any required environment evidence.

## Human Review

The human must review:

- SUT availability.
- Tool availability.
- Browser availability.
- `api_specification.md` availability.
- Test-account/state availability.
- Existing artifact paths.

### STOP — HUMAN APPROVAL REQUIRED

Do not continue until the human explicitly approves the environment.

---

# 7. Stage 1 — Recover Existing HW02 Test-Case Definitions

This stage does NOT rerun HW02 Domain Testing or Boundary Value Analysis.

It also does NOT reuse HW02 execution results as HW04 execution evidence.

The purpose of this stage is only to recover the existing HW02 test-case definitions/design that will serve as the starting point for HW04 automation.

For HW04, DT-01, DT-02, DT-03, DT-04, and BVA-01 are NOT executed to recreate HW02 test cases.

They remain available only as reusable skill definitions/reference for understanding the methodology.

The existing HW02 DT/BVA artifacts are the starting test-design inputs for HW04.

## Source Files

For each HW04 feature, inspect the existing HW02 artifacts under:

- `tests/FR01/`
- `tests/FR11/`
- `tests/FR14/`

Locate the files containing the actual Domain Testing, Boundary Value
Analysis, and test-case definitions.

Do not rely on `README.md` as the test-case source when the detailed
feature artifacts are available.

## Reuse

Reuse from HW02:

- Test-case IDs.
- Test-case descriptions.
- Preconditions.
- Input/domain partitions.
- Boundary values.
- Expected results.
- Positive/negative/edge-case intent.
- Relevant feature understanding.

Do NOT reuse from HW02:

- Passed/failed status.
- Execution counts.
- Screenshots as HW04 execution evidence.
- HW02 execution logs.
- HW02 browser results.
- HW02 bug status as proof of an HW04 defect.
- Any other HW02 execution result.

HW04 execution evidence must come from the new HW04 automation runs.

## Required Procedure

1. Locate the detailed FR-01 test-case artifacts in `tests/FR01/`.
2. Locate the detailed FR-11 test-case artifacts in `tests/FR11/`.
3. Locate the detailed FR-14 test-case artifacts in `tests/FR14/`.
4. Extract the existing test-case definitions.
5. Preserve their original IDs where practical.
6. Cross-check their feature behavior against:
   - the implemented UI;
   - `api_specification.md`;
   - existing approved HW02 artifacts.
7. Do not rerun Domain Testing or BVA.
8. Do not recreate HW02 test cases from scratch unless the detailed source
   artifact is genuinely missing.
9. Present the recovered test-case set to the human for review.

## Human Review

The human must verify that:

- The correct HW02 files were identified.
- The recovered test cases correspond to the intended HW02 work.
- The test-case definitions are complete enough for HW04 automation.
- Any inconsistencies with the current SUT or `api_specification.md` are
  identified.
- HW02 execution results have not been incorrectly carried into HW04.

### STOP — HUMAN APPROVAL REQUIRED

---

# 8. Stage 2 — Prepare Data-Driven Test Data

## Skill

`DATA-01`

Execute independently for:

- `FR-01`
- `FR-11`
- `FR-14`

Complete one feature and obtain approval before moving to another feature.

## Inputs

- Approved HW02 test cases.
- Feature UI evidence.
- `api_specification.md`.
- Current SUT behavior.
- Approved automation scope.

## Required Result

For the current feature:

- External CSV or JSON test data.
- Every selected automated test case has corresponding data.
- Test logic is separated from test data.
- No prohibited hardcoded test-data arrays/objects are used.

## Human Review

The human must verify:

- Data corresponds to real UI/API-supported inputs.
- Data does not contain invented fields.
- Values are supported by the implemented feature.
- Negative and edge data are meaningful.
- Every selected test case maps to a data record.
- Data is actually externalized.
- The file is stored under the correct feature folder.

### STOP — HUMAN APPROVAL REQUIRED

---

# 9. Stage 3 — Select Automatable Cases

This stage is a human decision supported by the approved test-case artifacts.

For each feature:

```text
FR-01 → at least 12 automated cases
FR-11 → at least 12 automated cases
FR-14 → at least 12 automated cases
```

## Required Coverage

The selected cases should preserve the existing HW02 test design and include
appropriate:

- Positive cases.
- Negative cases.
- Edge/boundary cases.

## Non-Automated Test Cases

A test case that is not automated must not be silently removed.

For every excluded test case, record:

```text
| TC ID | Reason Not Automated | Technical Limitation |
|---|---|---|
```

The reason must be concrete and based on:

- The actual SUT.
- Available automation capabilities.
- Required external resources.
- Environment limitations.
- Other verifiable technical constraints.

## Human Review

The human must explicitly approve:

- The ≥12 selected automated cases.
- The excluded cases.
- The reason for every exclusion.

### STOP — HUMAN APPROVAL REQUIRED

---

# 10. Stage 4 — Generate Automation Scripts

## Skill

`AUTO-01`

Execute independently for:

- `FR-01`
- `FR-11`
- `FR-14`

## Inputs

- Approved test cases.
- Approved external test data.
- Feature evidence.
- `api_specification.md`.
- Current SUT.
- Automation environment.

## AI-First Requirement

Automation must be generated through a documented AI-assisted process.

AI may assist incrementally with:

- Test structure.
- Locator selection.
- Automation implementation.
- Assertions.
- Data-driven implementation.
- Synchronization.

The AI interaction must be recorded by `AUDIT-01`.

## Required Output

For the current feature:

- Automation script(s).
- Test-case-to-script mapping.
- External-data usage.
- Initial AI-generated automation.

## Human Review

The human must inspect:

### Feature correctness

- Correct feature.
- Correct user role.
- Correct preconditions.
- Correct expected results.
- Correct UI behavior.
- Correct API assumptions.

### Automation correctness

- Locators.
- Selectors.
- Synchronization.
- Assertions.
- Test data handling.
- Test isolation.
- Authentication/state handling.
- Browser compatibility.
- Error handling.

### Evidence correctness

The human must compare generated assumptions against:

- Implemented UI.
- `api_specification.md`.
- Approved test cases.

The human must correct any identified problem.

Every meaningful correction must be recorded for later GAP-01 analysis.

### STOP — HUMAN APPROVAL REQUIRED

Do not execute generated automation until the human explicitly approves it.

---

# 11. Stage 5 — Validate Assertions

## Skill

`ASSERT-01`

Run after automation generation and initial human review.

## Required Result

The automation suite must contain at least three distinct assertion patterns.

Examples:

- Visibility / existence
- Text / content
- URL / navigation
- Value
- Attribute
- Enabled / disabled state
- Count
- Checked / selected state

Only assertion patterns that are actually implemented and executed count.

## Human Review

The human must verify:

- Every automated test has meaningful assertions.
- Assertions correspond to the approved expected result.
- Negative tests verify the expected negative behavior.
- Assertions are not merely action-completion checks.
- At least three distinct assertion patterns exist across the suite.
- Assertions are based on observable SUT behavior.
- Assertions are not based on invented implementation details.

The human must correct weak or missing assertions.

### STOP — HUMAN APPROVAL REQUIRED

---

# 12. Stage 6 — Execute Approved Automation

## Skill

`EXEC-01`

Execute the approved automation for the current feature.

## Inputs

- Approved script.
- Approved external test data.
- Approved assertions.
- Prepared SUT.

## Required Output

Record:

```text
| TC ID | Browser | Expected | Actual | Status | Failure Source | Evidence |
|---|---|---|---|---|---|---|
```

## Failure Classification

Every failure must be classified before proceeding.

Possible sources:

- SUT defect
- Automation defect
- Test-data defect
- Environment/browser defect
- Incorrect expected result

A failed automation test is not automatically a SUT bug.

## Human Review

The human must inspect:

- Actual test results.
- Screenshots.
- Traces.
- Logs.
- Videos where applicable.
- Failure classification.

The human must verify that the actual result corresponds to the real SUT
behavior.

### STOP — HUMAN APPROVAL REQUIRED

No browser-matrix execution proceeds until the human approves the execution
result.

---

# 13. Stage 7 — Multi-Browser Execution

## Skill

`BROWSER-01`

For each feature, execute the approved automation suite on:

- Chromium
- Firefox
- WebKit

## Required Matrix

```text
| Feature | Chromium | Firefox | WebKit |
|---|---|---|---|
| FR-01 | Required | Required | Required |
| FR-11 | Required | Required | Required |
| FR-14 | Required | Required | Required |
```

Minimum:

```text
9 browser executions
```

## Rules

- Do not infer one browser's result from another.
- Do not claim browser coverage without execution.
- Use the approved automation logic.
- Use the approved external test data.
- Record browser-specific failures separately.
- Do not silently modify test logic to make one browser pass.

## Human Review

The human must inspect:

- Every browser result.
- Browser-specific failures.
- Test counts.
- Passed/failed counts.
- Whether all 9 required executions actually occurred.

### STOP — HUMAN APPROVAL REQUIRED

---

# 14. Stage 8 — Generate HTML Execution Reports

## Skill

`REPORT-AUTO-01`

Generate the required HTML report for every actual browser execution.

## Required Reports

```text
FR-01 / Chromium
FR-01 / Firefox
FR-01 / WebKit

FR-11 / Chromium
FR-11 / Firefox
FR-11 / WebKit

FR-14 / Chromium
FR-14 / Firefox
FR-14 / WebKit
```

## Each Report Must Contain

```text
Run by: {StudentID}
```

and an ISO timestamp.

The report must originate from the actual test execution.

## Human Review

The human must verify:

- Report corresponds to the correct feature.
- Report corresponds to the correct browser.
- Test results are genuine.
- Student ID is present.
- ISO timestamp is present.
- No execution result has been manually fabricated or altered.
- Report is stored under the correct feature/browser directory.

### STOP — HUMAN APPROVAL REQUIRED

---

# 15. Stage 9 — Analyze Execution Failures

This is a human classification stage.

For every failure:

```text
Failure
  ↓
Automation problem?
 ├── YES → Correct automation
 │
Test-data problem?
 ├── YES → Correct test data
 │
Environment/browser problem?
 ├── YES → Correct environment and re-run
 │
Expected-result problem?
 ├── YES → Review test case
 │
Genuine SUT defect?
 └── YES → BUG-01
```

The human must make this classification.

Do not automatically create bugs from failed tests.

If automation, data, environment, or expected-result problems are found, the
relevant artifact must be corrected through the appropriate reviewed process
before relying on the resulting execution.

### STOP — HUMAN APPROVAL REQUIRED

---

# 16. Stage 10 — Report Genuine SUT Bugs

## Skill

`BUG-01`

Run only for failures verified by the human as genuine SUT defects.

## Inputs

- Failed execution.
- Approved expected result.
- Actual result.
- Screenshots.
- Trace/log evidence.
- Browser information.
- Reproduction information.
- Relevant UI/API evidence.

## Required Output

For each genuine defect:

```text
bugs/FR{feature}/
```

containing the required bug evidence.

Also create or update the corresponding GitHub Issue.

## Required Bug Evidence

- Clear title.
- Preconditions.
- Reproduction steps.
- Expected result.
- Actual result.
- Severity.
- Browser/environment.
- Screenshot.
- Relevant execution evidence.
- GitHub Issue reference.

## Human Review

The human must confirm:

- The issue is reproducible.
- The issue originates from the SUT.
- Severity is appropriate.
- Screenshot is genuine.
- GitHub Issue corresponds to the defect.
- Automation/environment failures were not incorrectly reported as bugs.
- The expected behavior is supported by the UI, `api_specification.md`, or
  approved test artifacts.

### STOP — HUMAN APPROVAL REQUIRED

If no genuine defect exists, explicitly record that no SUT bug was created.

---

# 17. Stage 11 — AI Automation Gap Analysis

## Skill

`GAP-01`

Run after human review and correction of the generated automation.

## Purpose

Document what the AI got wrong, missed, or incorrectly assumed.

## Required Analysis

Consider:

- Missing test cases.
- Incorrect assumptions.
- Hallucinated UI elements.
- Hallucinated API endpoints.
- Incorrect API assumptions.
- Missing edge cases.
- Incorrect expected results.
- Fragile selectors.
- Incorrect locators.
- Weak assertions.
- Missing assertions.
- Flaky waits.
- Incorrect synchronization.
- Hardcoded test data.
- Incorrect external-data handling.
- Browser-specific assumptions.
- Authentication/state problems.

## Required Output

```text
| Issue | AI Output | Final Result | Category | Cause | Human Correction |
|---|---|---|---|---|---|
```

## Human Review

The human must verify every reported AI gap.

The AI must not be allowed to determine its own mistakes without human
verification.

Causes must not be presented as facts unless supported by evidence.

The human must compare the AI output against:

- Implemented UI.
- `api_specification.md`.
- Approved test cases.
- Actual execution results.

### STOP — HUMAN APPROVAL REQUIRED

---

# 18. Stage 12 — Complete Current Feature

A feature is complete only when all of the following have been approved:

```text
[ ] Feature evidence verified
[ ] Existing HW02 test cases reviewed
[ ] ≥12 automated test cases selected
[ ] Non-automated cases documented with reasons
[ ] External CSV/JSON test data approved
[ ] Automation scripts generated
[ ] Human corrections completed
[ ] ≥3 assertion patterns demonstrated
[ ] Execution completed
[ ] Chromium completed
[ ] Firefox completed
[ ] WebKit completed
[ ] Required HTML reports generated
[ ] Failures classified
[ ] Genuine bugs reported
[ ] AI Gap Analysis completed
[ ] Human review completed
```

### STOP — HUMAN APPROVAL REQUIRED

The human must explicitly approve feature completion.

---

# 19. Stage 13 — Repeat for Remaining Features

Repeat Stages 2–18 independently for:

- `FR-01`
- `FR-11`
- `FR-14`

Do not mix artifacts between features.

Each feature must independently satisfy the HW04 minimum requirements.

---

# 20. Stage 14 — Assignment-Wide Coverage Verification

This is a manual verification stage.

The human must confirm:

```text
FR-01 ≥ 12 automated cases
FR-11 ≥ 12 automated cases
FR-14 ≥ 12 automated cases
```

Therefore:

```text
Total ≥ 36 automated cases
```

The human must also confirm:

```text
FR-01 → Chromium + Firefox + WebKit
FR-11 → Chromium + Firefox + WebKit
FR-14 → Chromium + Firefox + WebKit
```

Therefore:

```text
Total ≥ 9 browser executions
```

Verify:

```text
[ ] External CSV/JSON test data is used.
[ ] No prohibited inline test data exists.
[ ] At least 3 distinct assertion patterns are present.
[ ] HTML reports exist for all required executions.
[ ] Reports contain Student ID.
[ ] Reports contain ISO timestamps.
[ ] Non-automated cases have documented reasons.
[ ] Genuine bugs have evidence.
[ ] GitHub Issues exist for genuine bugs.
[ ] AI Gap Analysis is complete.
```

### STOP — HUMAN APPROVAL REQUIRED

---

# 21. Stage 15 — AI Audit

## Skill

`AUDIT-01`

The AI Audit records every AI interaction used throughout HW04.

The audit must include:

- AI tool.
- Date/time.
- Exact prompt.
- AI output.
- Human review.
- Human changes.
- Generated artifacts.

Raw AI interaction logs must be preserved separately.

## Human Review

The human must verify:

- Every AI interaction has been recorded.
- Exact prompts are preserved.
- AI outputs are preserved.
- Failed and corrected interactions are not omitted.
- Human corrections are recorded.
- Timestamps are accurate.
- No fabricated AI interactions exist.

### STOP — HUMAN APPROVAL REQUIRED

---

# 22. Stage 16 — Human AI Critique

This stage is **manual**.

No Agent Skill is required.

The human writes the mandatory AI Critique.

## Requirements

The critique must:

- Be 200–300 words.
- Be based on actual AI interactions.
- Be based on documented AI gaps/corrections.
- Address actual AI performance during HW04.

It must address:

1. Where AI was wrong, biased, or incomplete.
2. Why AI failed to catch the problem.
3. What principle was learned about collaborating with AI.

## Output

```text
REPORT/AI_Critique.md
REPORT/AI_Critique.pdf
```

## Human Review

The human verifies:

- Word count is 200–300 words.
- Claims correspond to the AI Audit/GAP evidence.
- A concrete AI problem is discussed.
- The reason for the AI failure is discussed.
- A lesson about AI collaboration is stated.

### STOP

Do not proceed until the human confirms the critique is complete.

---

# 23. Stage 17 — Git History Verification

## Skill

`GIT-01`

## Required Repository Conditions

The GitHub repository must be public.

At least:

```text
8 meaningful commits
```

must modify automation test-script files.

Commits that only modify:

- README.
- PDF.
- Report.
- Screenshots.
- Other documentation.

do not count toward the 8-commit requirement.

## Output

```text
REPORT/git-log.txt
```

## Human Review

The human must verify:

- Repository is public.
- At least 8 qualifying commits exist.
- Qualifying commits actually modify test scripts.
- Commit history represents genuine development.
- Git log corresponds to the submitted repository.

### STOP — HUMAN APPROVAL REQUIRED

---

# 24. Stage 18 — README and Self-Assessment

This stage is primarily manual/documentation work.

The README must contain the required HW04 summary and self-assessment.

## Required Test Summary

```text
| Metric | Value |
|---|---:|
| Features | 3 |
| Test cases automated | ≥36 |
| Test cases executed | Actual value |
| Passed | Actual value |
| Failed | Actual value |
| Browser runs | ≥9 |
| Bugs | Actual value |
| Demo video | YouTube URL |
```

## Required Self-Assessment

```text
| No. | Criteria | Grade | Self-Assessed Grade |
|---|---|---:|---:|
| 1 | Task 1 - Feature A | 25 | |
| 1 | Task 1 - Feature B | 25 | |
| 1 | Task 1 - Feature C | 25 | |
| 2 | Task 2 — Demo video | 15 | |
| 3 | Agent Skills | 10 | |
| | Total | 100 | |
```

## Human Review

The human must verify:

- Counts match actual artifacts.
- Browser-run count matches actual reports.
- Bug count matches actual bug reports.
- Demo link is correct.
- Self-assessment is within the allowed grading range.
- No fabricated metrics exist.

### STOP — HUMAN APPROVAL REQUIRED

---

# 25. Stage 19 — Final Report

## Skill

`REPORT-01`

Execute only after all feature-level artifacts and assignment-wide
verification have been approved.

## Inputs

- Approved FR-01 artifacts.
- Approved FR-11 artifacts.
- Approved FR-14 artifacts.
- Automation scripts.
- External test data.
- Assertion evidence.
- Execution results.
- Multi-browser results.
- HTML reports.
- Bug reports.
- Non-automated test-case records.
- AI Gap Analysis.
- AI Audit.
- Human AI Critique.
- Git log.
- README.
- Demo video URL.

## Required Final Report Contents

The final report must document:

1. Selected features.
2. Existing HW02 test-case basis.
3. Feature evidence and relevant API specification usage.
4. Automated test cases.
5. Data-driven test data.
6. Automation implementation.
7. Assertion patterns.
8. Human review and corrections.
9. Multi-browser execution.
10. HTML report evidence.
11. Execution results.
12. Genuine bugs.
13. Non-automated test cases and reasons.
14. AI Gap Analysis.
15. AI Audit.
16. AI Critique.
17. GitHub repository.
18. Git commit log.
19. Demo video.

## Human Review

The human must review the entire final report for:

- Factual correctness.
- Consistency with actual artifacts.
- Correct test counts.
- Correct browser counts.
- Correct bug counts.
- Correct API references.
- Correct links.
- Correct file references.
- No fabricated evidence.
- No unapproved AI-generated content.

### STOP — HUMAN APPROVAL REQUIRED

---

# 26. Stage 20 — Demo Video

This stage is **manual**.

No Agent Skill is required.

The human creates the required unlisted YouTube demonstration.

## Required Content

The video must:

- Be at least 5 minutes.
- Use Vietnamese narration.
- Demonstrate one automation script end to end.
- Demonstrate multi-browser execution.
- Show the generated HTML report.
- Explain at least one human fix to AI-generated automation.
- Show authorship evidence using either:
  - face-cam, or
  - `whoami` and `hostname` in the terminal.
- Demonstrate the Agent Skill where required by the assignment.

## Human Review

Before submission, verify the uploaded video against every requirement.

### STOP — HUMAN APPROVAL REQUIRED

---

# 27. Stage 21 — Final Submission Verification

This stage is manual.

Do not submit until every required artifact has been checked.

## Feature Requirements

```text
[ ] FR-01 has ≥12 automated cases
[ ] FR-11 has ≥12 automated cases
[ ] FR-14 has ≥12 automated cases
[ ] ≥36 automated cases total

[ ] External CSV/JSON data is used
[ ] No prohibited inline test data
[ ] ≥3 assertion patterns
```

## Browser Requirements

```text
[ ] FR-01 Chromium
[ ] FR-01 Firefox
[ ] FR-01 WebKit

[ ] FR-11 Chromium
[ ] FR-11 Firefox
[ ] FR-11 WebKit

[ ] FR-14 Chromium
[ ] FR-14 Firefox
[ ] FR-14 WebKit

[ ] ≥9 browser executions total
```

## Evidence Requirements

```text
[ ] HTML report for every required browser execution
[ ] "Run by: {StudentID}" present
[ ] ISO timestamp present
[ ] Screenshots/traces/logs available where required
[ ] Genuine bugs documented
[ ] GitHub Issues created for genuine bugs
[ ] Bug screenshots attached
[ ] Non-automated test cases documented with reasons
```

## AI Requirements

```text
[ ] AI Audit complete
[ ] Exact prompts preserved
[ ] AI outputs preserved
[ ] Human corrections recorded
[ ] AI Gap Analysis complete
[ ] AI Critique complete
[ ] AI Critique is 200–300 words
```

## Repository Requirements

```text
[ ] Public GitHub repository
[ ] ≥8 qualifying automation-script commits
[ ] Git log exported
```

## Documentation Requirements

```text
[ ] Final Report Markdown
[ ] Final Report PDF
[ ] AI Audit Markdown
[ ] AI Audit PDF
[ ] AI Critique Markdown
[ ] AI Critique PDF
[ ] README
[ ] Test summary
[ ] Self-assessment
[ ] Demo video URL
```

## File and Folder Verification

The human must verify:

```text
[ ] Every referenced file exists.
[ ] Every report path is valid.
[ ] Every screenshot/trace/log referenced by a report exists.
[ ] Every browser report is stored under the correct feature/browser folder.
[ ] FR-01 artifacts are not mixed with FR-11 or FR-14.
[ ] Temporary files are removed from the submission package.
[ ] No obsolete HW03-only artifacts are presented as HW04 evidence.
[ ] No duplicate or ambiguous "final" files exist.
[ ] Raw AI audit logs are preserved.
```

### STOP — HUMAN APPROVAL REQUIRED

---

# 28. Final Submission Package

The final submission package should preserve the repository's established
structure while containing all required HW04 artifacts.

Recommended structure:

```text
<StudentID>_HW04_AI_Automation_<SelfAssessedGrade>/
│
├── tests/
│   ├── FR01/
│   ├── FR11/
│   └── FR14/
│
├── bugs/
│   ├── FR01/
│   ├── FR11/
│   └── FR14/
│
├── REPORT/
│   ├── HW04_Report.md
│   ├── HW04_Report.pdf
│   ├── AI_Audit.md
│   ├── AI_Audit.pdf
│   ├── AI_Critique.md
│   ├── AI_Critique.pdf
│   ├── README.md
│   └── git-log.txt
│
└── README.md
```

If the actual repository uses a different established structure, preserve that
structure instead of creating duplicate artifacts.

Before packaging:

- Verify every referenced file exists.
- Verify every report link/path is valid.
- Verify screenshots and traces are present where required.
- Verify browser reports are present.
- Verify the Git log is present.
- Verify the README is present.
- Verify no temporary files are included.
- Verify no unrelated HW03 mobile/usability artifacts are incorrectly presented
  as HW04 automation evidence.

### STOP

Only the human may authorize final submission.

---

# 29. Workflow Summary

The complete HW04 workflow is:

```text
ENV-01
   ↓
HUMAN REVIEW
   ↓
Feature Evidence + Existing HW02 Test-Case Baseline
   ↓
HUMAN APPROVAL
   ↓
DATA-01
   ↓
HUMAN REVIEW
   ↓
Manual Selection of ≥12 Automatable Cases
   ↓
HUMAN APPROVAL
   ↓
AUTO-01
   ↓
HUMAN REVIEW + HUMAN CORRECTION
   ↓
ASSERT-01
   ↓
HUMAN REVIEW + HUMAN CORRECTION
   ↓
EXEC-01
   ↓
HUMAN REVIEW
   ↓
BROWSER-01
   ↓
HUMAN REVIEW
   ↓
REPORT-AUTO-01
   ↓
HUMAN REVIEW
   ↓
Failure Classification
   ├── Automation/Data/Environment/Expectation
   │       ↓
   │    Correct + Review + Re-run
   │
   └── Genuine SUT Defect
           ↓
         BUG-01
           ↓
        HUMAN REVIEW
   ↓
GAP-01
   ↓
HUMAN REVIEW
   ↓
Repeat for FR-01 / FR-11 / FR-14
   ↓
Assignment-Wide Coverage Verification
   ↓
HUMAN APPROVAL
   ↓
AUDIT-01
   ↓
HUMAN REVIEW
   ↓
Human AI Critique
   ↓
HUMAN REVIEW
   ↓
GIT-01
   ↓
HUMAN REVIEW
   ↓
Human README / Self-Assessment
   ↓
HUMAN REVIEW
   ↓
REPORT-01
   ↓
HUMAN REVIEW
   ↓
Human Demo Video
   ↓
HUMAN REVIEW
   ↓
Final Submission Verification
   ↓
HUMAN APPROVAL
   ↓
SUBMIT
```

---

# 30. Non-Negotiable Rules

1. **One skill at a time.**
2. **One requested artifact at a time.**
3. **Human review after every skill.**
4. **No automatic continuation.**
5. **No fabricated evidence.**
6. **No silent overwriting of files.**
7. **Reuse existing HW02 artifacts whenever valid.**
8. **Do not regenerate existing work without a reason.**
9. **FR-01, FR-11, and FR-14 are the HW04 feature scope.**
10. **Each feature requires ≥12 automated cases.**
11. **External CSV/JSON test data is mandatory.**
12. **At least three distinct assertion patterns are mandatory.**
13. **Every feature must run on Chromium, Firefox, and WebKit.**
14. **Every required browser execution needs an HTML report.**
15. **Every genuine SUT defect requires evidence and a GitHub Issue.**
16. **Non-automated test cases must have documented reasons.**
17. **Every AI interaction must be auditable.**
18. **AI output must be preserved, not merely summarized.**
19. **The implemented UI and `api_specification.md` are the primary feature
    evidence sources.**
20. **The student makes the final testing decision.**
21. **`WORKFLOW.md` controls orchestration; `SKILLS.md` defines skills.**
22. **The demo video and AI Critique remain human-created deliverables and are
    not Agent Skills.**
23. **Only real execution may produce execution evidence.**
