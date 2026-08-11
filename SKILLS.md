---
name: ai-testing-skills
description: >-
  Reusable AI testing skills for HW04 automation testing against the EShop
  System Under Test (SUT). Use when understanding features, reusing and
  reviewing existing test cases, generating data-driven automation scripts,
  validating assertions, executing tests across multiple browsers, collecting
  execution evidence, analyzing AI-generated artifacts, reporting genuine
  defects, maintaining AI audit logs, and assembling the final automation
  report. Do not use when writing application code, debugging source code,
  designing system architecture, or deploying software.
---

# AI Testing Skills

Reusable AI testing skills for the HW04 Software Testing automation assignment.

Supported techniques:

- Domain Testing (DT)
- Boundary Value Analysis (BVA)
- Automation Script Generation (AUTO)
- Data-Driven Testing (DATA)
- Automation Assertion Review (ASSERT)
- Test Execution (EXEC)
- Multi-Browser Automation (BROWSER)
- Bug Reporting (BUG)
- AI Gap Analysis (GAP)
- Human Review (REVIEW)
- AI Audit Logging (AUDIT)
- Automation Report Generation (REPORT-AUTO)
- Final Report Generation (REPORT)
- Git History Validation (GIT)
- Demo Validation (DEMO)
- README/Test Summary Generation (README)

## Skill Registry

| Skill | Purpose |
|---|---|
| ENV-01 | Prepare and verify the EShop web automation environment |
| DT-01 | Understand a feature before testing it |
| DT-02 | Identify input domains for Domain Testing |
| DT-03 | Partition domains into equivalence classes |
| DT-04 | Generate Domain Testing test cases |
| BVA-01 | Generate Boundary Value Analysis test cases |
| DATA-01 | Convert approved test data into external CSV/JSON files |
| AUTO-01 | Generate data-driven automation scripts with AI |
| ASSERT-01 | Review automation assertion quality and coverage |
| EXEC-01 | Execute automation test cases and collect evidence |
| BROWSER-01 | Execute each feature across Chromium, Firefox, and WebKit |
| REPORT-AUTO-01 | Generate and validate per-run HTML automation reports |
| BUG-01 | Convert genuine SUT failures into reproducible bug reports |
| GAP-01 | Analyze gaps and errors in AI-generated automation |
| REVIEW-01 | Review every AI-generated artifact before acceptance |
| AUDIT-01 | Maintain the complete AI interaction history |
| REPORT-01 | Assemble the final HW04 report from verified artifacts |
| GIT-01 | Validate the required automation-script commit history |
| README-01 | Assemble the required README test summary |

---

# ENV-01 — Automation Testing Environment

## When to Use

Use when:

- preparing the EShop web automation environment
- launching and verifying the SUT
- verifying Playwright and browser availability
- collecting fresh evidence required by automation execution

Do not use when:

- analyzing a feature (use DT-01)
- generating test cases (use DT-04 / BVA-01)
- generating automation scripts (use AUTO-01)
- writing bug reports (use BUG-01)

## Purpose

Provide a verified desktop web environment for automating and executing the
EShop System Under Test (SUT). Whenever possible, execute the application and
collect real evidence instead of making assumptions.

## Inputs

- EShop SUT
- Target feature: FR-01, FR-11, or FR-14
- Playwright or Selenium environment
- Chromium, Firefox, and WebKit browser installations

## Dependencies

- `WORKFLOW.md` — execution order and general rules
- Playwright or Selenium
- Existing HW02 test artifacts
- Existing feature documentation and SUT evidence

## Procedure

1. Launch the EShop SUT.
2. Verify that the application is reachable and interactive.
3. Verify the required browser automation environment.
4. Verify required authentication state and test accounts.
5. Verify required test data and external data files.
6. Execute a minimal smoke interaction to confirm automation connectivity.
7. Capture fresh evidence when needed.
8. Save generated artifacts using the output convention.
9. Report launch, connectivity, authentication, or automation failures instead
   of inferring results.

## Outputs

```text
tests/
└── FR{feature}/
    ├── testcases/
    ├── scripts/
    ├── data/
    ├── screenshots/
    ├── recordings/
    ├── logs/
    ├── reports/
    └── execution.md

bugs/
└── FR{feature}/
    └── screenshots/
```

## Validation

- Application launched and was observed to be interactive.
- Required browsers are available.
- Required test accounts and data are available.
- No fabricated evidence or assumed application behavior.

## Pitfalls

- Do not fabricate evidence or application behavior.
- Do not assume a test passed because the application launched.
- Do not claim a browser was tested without actually executing the suite on it.
- Do not use stale screenshots as proof of a new execution.

---

# DT-01 — Feature Understanding

## When to Use

Use when:

- selecting and analyzing a feature before testing
- identifying actors, inputs, outputs, and business rules
- producing feature documentation consumed by DT-02

Do not use when:

- generating test cases (use DT-04)
- executing tests (use EXEC-01)
- analyzing AI gaps (use GAP-01)

## Purpose

Understand the selected feature before applying any testing technique. Separate verified facts from assumptions.

## Inputs

- Feature description
- UI screenshots (if available)
- Source code (if available)
- API documentation (if available)
- Database schema (if available)

## Dependencies

- `FEATURE_INPUT.md` — feature input identification template, when provided
- `api_specification.md` — endpoint identification, when available
- ENV-01 — evidence collection

## Procedure

1. Identify the purpose of the feature.
2. Identify actors.
3. Identify system inputs.
4. Identify outputs.
5. Identify business rules.
6. List assumptions.
7. Highlight missing information instead of guessing.

## Outputs

- Feature summary
- Input list
- Output list
- Business rules
- Assumptions
- Open questions

## Validation

- Every business rule is traceable to the SUT.
- No assumption stated without evidence.
- Missing information is listed as open questions, not guessed.

## Pitfalls

- Do not infer business rules without evidence.
- Do not guess when feature information is incomplete; ask for clarification.
- Do not present assumptions as verified facts.

---

# DT-02 — Domain Identification

## When to Use

Use when:

- identifying input domains for Domain Testing
- converting verified feature understanding into a domain table

Do not use when:

- partitioning domains (use DT-03)
- generating test cases (use DT-04)

## Purpose

Identify all input domains required for Domain Testing.

## Inputs

- Verified output from DT-01

## Dependencies

- DT-01 — verified feature understanding

## Procedure

1. List every input variable.
2. Determine its data type.
3. Determine the valid domain.
4. Determine invalid domains.
5. Identify constraints.
6. Identify dependencies between variables.

## Outputs

| Variable | Type | Valid Domain | Invalid Domain | Evidence |
|---|---|---|---|---|

## Validation

- Every user input is included.
- Hidden/system-generated inputs are considered when they affect behavior.
- Domains do not overlap.
- Every domain is supported by the feature specification.

## Pitfalls

- Do not ignore display-only fields.
- Do not skip hidden inputs that affect behavior.
- Do not define overlapping domains.

---

# DT-03 — Domain Partitioning

## When to Use

Use when:

- partitioning each input domain into equivalence classes
- preparing partitions consumed by DT-04

Do not use when:

- identifying domains (use DT-02)
- selecting representative values (use DT-04)

## Purpose

Partition each input domain into equivalence classes.

## Inputs

- Domain table from DT-02

## Dependencies

- DT-02 — verified domains

## Procedure

For each variable:

1. Create valid partitions.
2. Create invalid partitions.
3. Label each partition.
4. Explain why the partition exists.

## Outputs

| Variable | Partition | Description |
|---|---|---|

## Validation

- Partitions are mutually exclusive.
- Partitions completely cover the domain.
- No duplicated partitions.

## Pitfalls

- Do not merge partitions when system behavior differs.
- Do not split partitions when system behavior is identical.
- Do not reuse partition labels.

---

# DT-04 — Domain Test Case Generation

## When to Use

Use when:

- generating Domain Testing test cases
- maximizing domain coverage

Do not use when:

- generating boundary values (use BVA-01)
- executing test cases (use EXEC-01)

## Purpose

Generate comprehensive Domain Testing test cases.

## Inputs

- Partition table from DT-03
- Business rules from DT-01

## Dependencies

- DT-01 — business rules
- DT-03 — verified partitions

## Procedure

1. Select representative values from every partition.
2. Combine partitions where appropriate.
3. Avoid redundant cases.
4. Maximize domain coverage.

## Outputs

| TC ID | Input | Expected Result | Covered Domain | Business Rule |
|---|---|---|---|---|

## Validation

- Every partition is covered.
- Every business rule is exercised.
- No duplicated test cases.

## Pitfalls

- Do not add multiple representative values per partition without reason.
- Do not generate duplicate test cases.
- Do not omit business-rule-driven cases to reduce coverage.

---

# BVA-01 — Boundary Value Analysis

## When to Use

Use when:

- generating boundary test values for numeric, string-length, date/time, or ordered inputs
- complementing Domain Testing with boundary coverage

Do not use when:

- partitioning domains (use DT-03)
- covering only mid-range values

## Purpose

Generate Boundary Value Analysis test cases.

## Inputs

- Verified input domains from DT-02

## Dependencies

- DT-02 — verified domains and boundaries

## Procedure

For each bounded variable:

1. Identify the minimum value.
2. Identify minimum + 1.
3. Identify the nominal value.
4. Identify maximum − 1.
5. Identify the maximum value.
6. Identify maximum + 1.

Apply to numeric, string-length, date/time, and ordered inputs. Skip variables without explicit boundaries.

## Outputs

| Variable | Boundary | Test Value |
|---|---|---|

## Validation

- Every boundary is tested.
- Invalid boundaries are included.
- Nominal value selected correctly.
- Variables without boundaries are excluded.

## Pitfalls

- Do not apply BVA to unbounded variables.
- Do not skip invalid boundaries.
- Do not confuse the nominal value with the minimum.

---

# EXEC-01 — Automation Test Execution

## When to Use

Use when:

- executing approved automation scripts
- recording actual results and Pass/Fail status
- collecting screenshots, traces, logs, and other execution evidence

Do not use when:

- generating automation scripts (use AUTO-01)
- executing the browser matrix (use BROWSER-01)
- analyzing failures (use BUG-01 / GAP-01)

## Purpose

Execute approved automation test cases against the EShop SUT and distinguish
actual SUT behavior from automation, environment, data, or test-design failures.

## Inputs

- Approved automation scripts
- Approved test cases
- External CSV/JSON test data
- Prepared environment
- Required user role and login state

## Dependencies

- ENV-01 — verified automation environment
- AUTO-01 — generated automation scripts
- DATA-01 — external test data
- ASSERT-01 — reviewed assertions
- WORKFLOW.md — orchestration rules

## Procedure

1. Verify the environment.
2. Load the external test data.
3. Execute the approved automation script.
4. Record the actual result.
5. Compare actual behavior with the expected result.
6. Record Pass or Fail.
7. Capture evidence for failures.
8. Determine whether a failure is caused by:
   - the SUT,
   - the automation script,
   - test data,
   - environment/browser configuration, or
   - an incorrect test expectation.
9. Forward genuine SUT failures to BUG-01.
10. Forward AI-generated automation problems to GAP-01 and REVIEW-01.

## Evidence Priority

1. Screenshot
2. Playwright trace
3. Video/recording
4. Browser console
5. Network log

## Outputs

| TC ID | Browser | Expected | Actual | Status | Failure Source | Evidence |
|---|---|---|---|---|---|---|

- Execution result under `tests/FR{feature}/execution.md`
- Screenshots, traces, logs, and recordings under `tests/FR{feature}/`
- Failure artifacts linked from the execution result

## Validation

- Every selected automation test is executed.
- Every actual result is observed, not inferred.
- Every failure is classified.
- Every genuine SUT failure has sufficient evidence.
- Automation failures are not incorrectly reported as application bugs.

## Pitfalls

- Do not mark a case as passed without execution.
- Do not report an automation failure as a SUT bug without verification.
- Do not infer results when the environment fails.
- Do not use fixed sleeps when proper Playwright synchronization is available.

---

# BUG-01 — Bug Reporting

## When to Use

Use when:

- an executed automation test reveals a reproducible defect in the SUT
- generating the Markdown bug report and GitHub Issue evidence

Do not use when:

- the failure is caused by the automation script
- the failure is caused by test data
- the failure is caused by the browser/environment
- the expected result is incorrect

## Purpose

Convert a verified genuine SUT defect into a reproducible bug report.

## Inputs

- Failed automation test
- Execution result
- Screenshot / trace / logs
- Expected result from the approved test case

## Dependencies

- EXEC-01 — execution evidence
- GAP-01 — AI/automation failure analysis
- REVIEW-01 — human validation

## Procedure

1. Verify the failure is reproducible.
2. Determine the failure source:
   - SUT defect
   - automation defect
   - test-data defect
   - environment/browser defect
   - incorrect test expectation
3. Only continue if the failure is a genuine SUT defect.
4. Determine severity.
5. Capture supporting evidence.
6. Record reproduction steps.
7. Generate the Markdown bug report.
8. Create or prepare the corresponding GitHub Issue.
9. Attach the screenshot to the GitHub Issue.
10. Reference the issue from the final report.

## Severity

- Critical
- High
- Medium
- Low
- Cosmetic

## Outputs

- Bug report
- Screenshot
- Execution evidence
- GitHub Issue
- GitHub Issue link
- Bug entry in the final report

## Validation

- [ ] Bug is reproducible.
- [ ] Failure is confirmed to originate from the SUT.
- [ ] Expected and Actual results are clear.
- [ ] Environment and browser are recorded.
- [ ] Screenshot is attached.
- [ ] GitHub Issue is created or prepared.
- [ ] No automation/environment failure is incorrectly reported as a SUT bug.

## Pitfalls

- Do not report every failed automation test as a bug.
- Do not fabricate screenshots.
- Do not omit the browser used for reproduction.
- Do not guess a root cause without evidence.

---

# GAP-01 — AI Automation Gap Analysis

## When to Use

Use when:

- comparing AI-generated automation with the final reviewed automation
- documenting mistakes, omissions, and incorrect assumptions made by AI

Do not use when:

- accepting or rejecting an artifact (use REVIEW-01)
- generating a new automation script (use AUTO-01)

## Purpose

Evaluate AI-generated automation through human review and document what the AI
got wrong, missed, or incorrectly assumed.

The AI may suggest possible causes, but the human must validate or reject every
explanation.

## Inputs

- AI-generated automation scripts
- Final reviewed scripts
- Approved test cases
- SUT behavior
- Execution results

## Dependencies

- AUTO-01
- REVIEW-01
- EXEC-01

## Procedure

1. Compare the AI-generated script with the final reviewed script.
2. Identify missing test cases.
3. Identify incorrect assumptions.
4. Identify hallucinated UI elements or requirements.
5. Identify missing edge cases.
6. Identify incorrect expected results.
7. Identify fragile selectors.
8. Identify weak or missing assertions.
9. Identify flaky waits or synchronization.
10. Identify incorrect test-data handling.
11. Identify hardcoded data that should be externalized.
12. Identify browser-specific assumptions.
13. Explain why each issue occurred.
14. Record the human correction.
15. Validate every explanation before including it in the report.

## Analysis Categories

- Missing test cases
- Incorrect assumptions
- Hallucinated requirements
- Missing edge cases
- Incorrect expected results
- Fragile selectors
- Incorrect locators
- Weak assertions
- Missing assertions
- Flaky waits
- Incorrect synchronization
- Hardcoded test data
- Incorrect external data handling
- Browser-specific assumptions
- Incorrect authentication/state handling

## Outputs

| Issue | AI Output | Final Result | Category | Cause | Human Correction |
|---|---|---|---|---|---|

## Validation

- [ ] Every significant AI error is recorded.
- [ ] Every correction is verified against the SUT or approved requirements.
- [ ] Causes are treated as hypotheses until validated.
- [ ] Human responsibility for the final script is explicit.

## Pitfalls

- Do not let AI validate its own output.
- Do not claim an AI mistake without comparing it against evidence.
- Do not record an unverified hypothesis as the root cause.
- Do not omit corrections simply because the final script works.

---

# REVIEW-01 — Human Review

## When to Use

Use when:

- validating any AI-generated artifact before acceptance
- reviewing automation scripts before execution
- gating progress between skills as defined by `WORKFLOW.md`

Do not use when:

- generating artifacts
- executing tests

## Purpose

Ensure that every AI-generated artifact is reviewed, corrected, and explicitly
accepted by the student before becoming part of the final submission.

## Inputs

- AI-generated artifact
- Original requirements
- SUT evidence
- Validation rules of the producing skill

## Procedure

1. Verify factual correctness.
2. Verify the testing methodology.
3. Verify the artifact against the SUT.
4. Remove hallucinations.
5. Identify missing cases.
6. Verify expected results.
7. For automation scripts, additionally verify:
   - selectors
   - synchronization
   - assertions
   - external test data
   - test isolation
   - browser compatibility
8. Correct identified problems.
9. Record every meaningful modification.
10. Explicitly approve the final artifact.

## Outputs

| Artifact | Issue | Correction | Evidence | Reviewer |
|---|---|---|---|---|

## Automation Review Checklist

- [ ] Correct feature
- [ ] Correct test case
- [ ] Correct test data
- [ ] External CSV/JSON data used
- [ ] No prohibited inline test data
- [ ] Stable selectors
- [ ] Reliable waits
- [ ] Meaningful assertions
- [ ] At least three assertion patterns across the suite
- [ ] Correct expected results
- [ ] No unnecessary test-order dependency
- [ ] No fabricated UI behavior

## Validation

- [ ] Every AI artifact is reviewed before acceptance.
- [ ] Every meaningful correction is recorded.
- [ ] Final automation is executable.
- [ ] Final automation reflects verified SUT behavior.

## Pitfalls

- Do not accept raw AI output without review.
- Do not approve assumptions lacking evidence.
- Do not record only successful corrections; record important failures too.

---

# AUDIT-01 — AI Audit Logging

## When to Use

Use when:

- maintaining the AI interaction history for the assignment
- producing the AI Audit Report

Do not use when:

- generating the final report (use REPORT-01)

## Purpose

Maintain a complete AI interaction history.

## Inputs

- Record of every AI interaction during the assignment

## Dependencies

- All skills — interactions to log
- External AI Audit Report template

## Procedure

For every AI interaction, record:

1. Date and time.
2. AI tool.
3. Skill ID.
4. Prompt.
5. AI output summary.
6. Human review.
7. Changes made.
8. Artifacts generated.
9. Files modified.
10. Save raw prompt and output logs separately in their own file.

## Outputs

| Time | Skill | Prompt | Review | Changes | Artifacts |
|---|---|---|---|---|---|

- Raw prompt / output log files (saved separately)

## Validation

- Every AI interaction is recorded.
- Every human review and modification is logged.
- Raw logs are saved as separate files.

## Pitfalls

- Do not omit failed or corrected interactions.
- Do not edit raw logs after the fact.
- Do not merge raw logs into the summary table.

---

# REPORT-01 — Final HW04 Report Generation

## When to Use

Use when:

- assembling the final HW04 report
- generating the final verified submission artifacts

Do not use when:

- generating individual artifacts
- logging AI interactions (use AUDIT-01)

## Purpose

Generate the final HW04 report using only reviewed and verified automation
artifacts.

## Inputs

- Feature selections
- Approved test cases
- Automation scripts
- External test data
- Assertion review
- Execution results
- Multi-browser results
- HTML reports
- Bug reports
- AI Gap Analysis
- AI Audit Report
- AI Critique
- README summary
- Git commit log
- Demo video link

## Dependencies

- All artifact-producing skills
- REVIEW-01
- AUDIT-01
- REPORT-AUTO-01
- BROWSER-01
- BUG-01
- GAP-01
- README-01
- GIT-01
- DEMO-01

## Required Report Contents

- Selected Features
- Existing HW02 Test-Case Basis
- Automation Test Cases
- Data-Driven Test Data
- Automation Scripts
- Human Review and Corrections
- Assertion Patterns
- Multi-Browser Execution
- HTML Automation Reports
- Execution Summary
- Bug Reports
- AI Gap Analysis
- AI Audit Report
- AI Critique
- Git Commit Log
- README Summary
- Demo Video Link

## Procedure

1. Collect verified artifacts for every feature.
2. Verify that each feature has at least 12 automated test cases.
3. Verify external CSV/JSON test data.
4. Verify at least three assertion patterns.
5. Verify Chromium, Firefox, and WebKit execution.
6. Verify the required HTML reports.
7. Verify genuine bugs and GitHub Issues.
8. Include AI Gap Analysis.
9. Include the AI Audit Report.
10. Include the AI Critique.
11. Include the Git commit log.
12. Include the demo video link.
13. Verify that every included artifact passed REVIEW-01.
14. Remove unapproved or fabricated content.
15. Save the final report.

## Outputs

- Final HW04 Markdown report
- PDF version of the final report
- References to all required evidence

## Validation

- [ ] Three required features are covered.
- [ ] At least 12 automation cases per feature.
- [ ] At least 36 automation cases in total.
- [ ] External CSV/JSON test data is used.
- [ ] At least three assertion patterns are demonstrated.
- [ ] At least 9 browser runs are completed.
- [ ] HTML reports exist for the required executions.
- [ ] Genuine bugs are documented.
- [ ] AI Audit Report is included.
- [ ] AI Critique is included.
- [ ] Git commit log is included.
- [ ] Demo video link is included.
- [ ] Report contains only reviewed and verified information.

## Pitfalls

- Do not include unreviewed artifacts.
- Do not fabricate execution results.
- Do not fabricate HTML reports.
- Do not fabricate screenshots.
- Do not present assumptions as facts.
- Do not claim browser coverage without execution evidence.

---

# AUTO-01 — Automation Script Design & Generation

## When to Use

Use when:

- converting approved test cases into automation scripts
- using AI to generate Playwright/Selenium automation
- creating automation for one of the three HW04 features

Do not use when:

- creating test data (use DATA-01)
- reviewing completed scripts (use REVIEW-01 / ASSERT-01)
- executing scripts (use EXEC-01)

## Purpose

Convert approved test cases into reliable, data-driven Playwright or Selenium
automation scripts using an AI-first, step-by-step process.

## Inputs

- Approved test cases
- Feature understanding
- Existing HW02 test artifacts
- SUT UI evidence
- External test data
- Playwright/Selenium environment

## Dependencies

- ENV-01 — verified SUT environment
- DT-01..DT-04 / BVA-01 — existing test-design artifacts where applicable
- DATA-01 — external test data
- REVIEW-01 — human review

## Procedure

1. Select one HW04 feature.
2. Load its approved HW02 test cases.
3. Select at least 12 automatable test cases.
4. Verify that each selected case contains:
   - Preconditions
   - Test data
   - Steps
   - Expected result
5. Inspect the actual SUT UI.
6. Identify reliable locators.
7. Identify required synchronization points.
8. Define meaningful assertions.
9. Ask the AI to generate the automation script step by step.
10. Save the generated script.
11. Review the generated script using REVIEW-01.
12. Correct fragile selectors, waits, assertions, test-data handling, and other
    defects.
13. Run the corrected script through EXEC-01.
14. Record all human corrections for GAP-01 and AUDIT-01.

## Mandatory Constraints

- Minimum 12 automated test cases per feature.
- The three HW04 features must each satisfy the minimum independently.
- Positive, negative, and edge cases may be used.
- Scripts must be data-driven.
- Test data must come from an external CSV or JSON file.
- Hardcoded inline test-data arrays or objects are prohibited.
- At least three distinct assertion patterns must be used.
- Playwright or Selenium may be used.
- AI-generated scripts must be reviewed and corrected by the student.

## Outputs

```text
tests/
└── FR{feature}/
    ├── testcases/
    ├── scripts/
    └── data/
Automation script(s)
Test-case-to-script traceability
Human review record
AI-generated version and reviewed version where required
```
## Non-Automated Test Cases

Not every existing test case is required to be automated if automation is
technically impractical. Every test case excluded from automation must be
explicitly documented with its reason.

## Required Record

| TC ID | Feature | Reason Not Automated | Technical Limitation | Human Decision |
|---|---|---|---|---|

## Validation

- [ ] Every excluded test case is documented.
- [ ] A concrete reason is provided.
- [ ] The reason is based on the actual SUT or automation environment.
- [ ] No test case is silently omitted.
- At least 12 test cases are automated for the feature.
- Every automated case maps to an approved test case.
- External test data is used.
- No prohibited inline test data exists.
- At least three assertion patterns are present.
- Selectors are stable and justified.
- Synchronization is deterministic.
- Human review is completed before execution.

## Pitfalls

- Do not ask AI to generate the entire assignment from one generic prompt.
- Do not blindly accept generated selectors.
- Do not use arbitrary fixed sleeps when proper waits/assertions are available.
- Do not generate weak assertions merely to make tests pass.
- Do not invent UI elements or business rules.

---

# DATA-01 — Data-Driven Test Data

## When to Use

Use when:

- separating test data from automation logic
- preparing data-driven automation for a feature
- validating that automation consumes external data

Do not use when:

- writing test logic (use AUTO-01)
- reviewing assertions (use ASSERT-01)

## Purpose

Create and validate external CSV or JSON test data for automation scripts.

## Inputs

- Approved test cases
- Feature requirements
- Business rules
- Required user accounts and application state

## Procedure

1. Load the approved test cases.
2. Identify all variable test inputs.
3. Separate test logic from test data.
4. Define the required data fields.
5. Create the CSV or JSON data file.
6. Assign each test case a corresponding data record.
7. Verify the automation script reads the external file.
8. Verify the script does not contain prohibited inline test-data arrays or
   objects.
9. Verify all required fields are present.
10. Review the resulting data against the original test cases.

## Constraints

- Test data must be stored in a separate `.csv` or `.json` file.
- Hardcoded inline arrays or objects containing the test data are not accepted.
- Every automated test case must be traceable to its external data.
- Data must represent the intended positive, negative, or edge condition.

## Outputs

```text
tests/
└── FR{feature}/
    └── data/
        └── <feature-data>.json

or:

tests/
└── FR{feature}/
    └── data/
        └── <feature-data>.csv
```

## Expected Output
| TC-ID | Data-ID | Input Values | Expected Condition | Source |
|-------|---------|--------------|--------------------|--------|
|  |         |              |                    |        |
## Pitfalls

- Do not hardcode the test dataset inside the automation script.
- Do not create data that is not supported by the feature.
- Do not silently modify expected results to make a test pass.

---

# ASSERT-01 — Automation Assertion Review

## When to Use

Use when:

- reviewing assertions in generated automation scripts
- verifying that automation validates behavior rather than merely clicking UI
- checking the HW04 assertion-pattern requirement

## Purpose

Verify that generated automation contains meaningful assertions that validate
the expected behavior of the SUT.

## Inputs

- Automation scripts from AUTO-01
- Expected results from approved test cases

## Dependencies

- AUTO-01 — generated automation
- REVIEW-01 — human review

## Required Assertion Coverage

The automation suite must use at least three distinct assertion patterns.

Examples include:

1. Visibility / existence
2. Text or content
3. URL / navigation
4. Value
5. Attribute
6. Enabled / disabled state
7. Element count
8. Checked / selected state

Only patterns actually implemented and executed count toward the requirement.

## Procedure

1. Inspect every automated test.
2. Identify every assertion.
3. Map each assertion to its expected result.
4. Classify each assertion pattern.
5. Check whether the assertion verifies behavior rather than implementation detail.
6. Identify weak, redundant, or missing assertions.
7. Add or correct assertions where necessary.
8. Record all changes in REVIEW-01.

## Outputs

| TC ID | Expected Behavior | Assertion | Assertion Pattern | Valid |
|---|---|---|---|---|

## Validation

- [ ] Every automated test has meaningful assertions.
- [ ] Assertions correspond to the expected result.
- [ ] At least three distinct assertion patterns are used.
- [ ] Assertions are not merely action-completion checks.
- [ ] Negative tests verify the expected negative behavior.
- [ ] Assertions are stable across supported browsers.

## Pitfalls

- Do not count multiple assertions of the same pattern as different patterns.
- Do not use element existence as the only assertion for a functional test.
- Do not assert implementation details when observable behavior is available.
- Do not weaken an assertion simply to avoid a failure.

---

# BROWSER-01 — Multi-Browser Automation

## When to Use

Use when:

- executing HW04 automation across the required browsers
- producing the required multi-browser execution evidence

Do not use when:

- testing mobile devices
- testing unrelated operating systems or device classes

## Purpose

Execute every selected HW04 feature across all three required browser engines.

## Required Browser Matrix

| Feature | Chromium | Firefox | WebKit |
|---|---|---|---|
| FR-01 | Required | Required | Required |
| FR-11 | Required | Required | Required |
| FR-14 | Required | Required | Required |

Minimum total:

- 3 features
- 3 browsers
- 9 browser runs

## Inputs

- Approved automation scripts
- External test data
- Browser configuration
- SUT environment

## Dependencies

- EXEC-01 — automation execution
- REPORT-AUTO-01 — HTML report generation

## Procedure

For each feature:

1. Start from the approved automation suite.
2. Execute the suite on Chromium.
3. Generate the HTML report.
4. Execute the same suite on Firefox.
5. Generate the HTML report.
6. Execute the same suite on WebKit.
7. Generate the HTML report.
8. Record the results for all three executions.
9. Investigate browser-specific failures.
10. Do not extrapolate an untested browser result from another browser.

## Outputs

| Feature | Browser | Tests | Passed | Failed | Report |
|---|---|---:|---:|---:|---|
| FR-01 | Chromium | | | | |
| FR-01 | Firefox | | | | |
| FR-01 | WebKit | | | | |
| FR-11 | Chromium | | | | |
| FR-11 | Firefox | | | | |
| FR-11 | WebKit | | | | |
| FR-14 | Chromium | | | | |
| FR-14 | Firefox | | | | |
| FR-14 | WebKit | | | | |

## Validation

- [ ] Every feature executed on Chromium.
- [ ] Every feature executed on Firefox.
- [ ] Every feature executed on WebKit.
- [ ] At least 9 browser runs completed.
- [ ] Every run has a corresponding HTML report.
- [ ] Browser-specific failures are investigated.
- [ ] Untested browser results are never inferred.

## Pitfalls

- Do not claim browser coverage without actual execution.
- Do not replace WebKit with a different browser unless the HW04 instructions
  explicitly permit it.
- Do not treat one successful browser run as proof of cross-browser correctness.

---

# REPORT-AUTO-01 — HTML Automation Report

## When to Use

Use when:

- generating the required HTML report after an automation execution
- validating the evidence required by HW04

## Purpose

Generate and validate an HTML report for every browser execution.

## Inputs

- Actual automation execution
- Test results
- Browser information
- Student ID
- Execution timestamp

## Dependencies

- EXEC-01
- BROWSER-01
- Playwright HTML reporter or Allure

## Procedure

1. Execute the automation suite.
2. Generate the HTML report using Playwright HTML Reporter or Allure.
3. Verify that the report corresponds to the actual execution.
4. Verify that the report identifies the browser.
5. Verify that the report contains:

   `Run by: {StudentID}`

6. Verify that the report contains an ISO timestamp.
7. Save the report under the feature/browser artifact directory.
8. Record the report path in the execution summary.

## Outputs

```text
tests/
└── FR{feature}/
    └── reports/
        ├── chromium/
        ├── firefox/
        └── webkit/
```

## Validation
- HTML report generated from a real execution.
- Browser is identifiable.
- Report contains `Run by: {StudentID}`.
- Report contains an ISO timestamp.
- Test results are visible.
- Every required browser run has a report.
- No report is fabricated or manually populated with fake results.

## Pitfalls
- Do not fabricate an HTML report.
- Do not edit execution results to hide failures.
- Do not reuse a report from another browser.
- Do not omit the Student ID.

---

# GIT-01 — Automation Commit History

## Purpose

Validate that the public GitHub repository contains the required meaningful
automation-script history.

## Procedure

1. Inspect the public GitHub repository.
2. Inspect the Git commit history.
3. Count commits that modify test-script files.
4. Exclude commits that only modify README, PDF, report, or other
   non-test-document files.
5. Export the relevant Git log to a text file.

## Validation

- [ ] Public GitHub repository exists.
- [ ] At least 8 qualifying commits exist.
- [ ] Qualifying commits modify test-script files.
- [ ] Commit history represents meaningful automation development.
- [ ] Git commit log is saved as a text file.

## Outputs

- Git commit log text file
- Public GitHub repository link

---

# README-01 — HW04 Test Summary

## Purpose

Generate and validate the README summary required for HW04.

## Required Summary

The README must contain:

| Metric | Value |
|---|---:|
| Features | 3 |
| Test cases automated | At least 36 |
| Test cases executed | Actual result |
| Passed | Actual result |
| Failed | Actual result |
| Browser runs | At least 9 |
| Bugs | Actual result |
| Demo video | YouTube URL (Human manually fill it in) |

## Procedure

1. Collect the final verified execution results.
2. Count automated test cases per feature.
3. Count executed, passed, and failed cases.
4. Count browser runs.
5. Count genuine bugs.
6. Verify that README values match the actual artifacts.

## Self-Assessment Table

The README must also contain the HW04 self-assessment table:

| No. | Criteria | Grade | Self-Assessed Grade |
|---|---|---:|---:|
| 1 | Task 1 - Feature A | 25 | |
| 1 | Task 1 - Feature B | 25 | |
| 1 | Task 1 - Feature C | 25 | |
| 2 | Task 2 — Demo video | 15 | |
| 3 | Agent Skills | 10 | |
| | Total | 100 | |

## Validation

- [ ] README contains all required metrics.
- [ ] Values match the actual execution evidence.
- [ ] No fabricated counts.

---

# General Principles

These skills follow the HW04 AI-First strategy.

The AI may assist with feature analysis, test-case selection, test-data
generation, automation-script generation, assertion design, review, and
analysis. The student remains responsible for reviewing, correcting,
executing, and validating every AI-generated artifact.

All skills are feature-independent and may be applied to the HW04 features:

- FR-01 — Account registration
- FR-11 — Order history view (user)
- FR-14 — Category management (CRUD)

Each skill defines its own:

- Purpose
- Inputs
- Dependencies
- Procedure
- Outputs
- Validation criteria
- Pitfalls

The orchestration order, human-approval gates, artifact dependencies,
iteration rules, and stop/continue conditions are defined exclusively in
`WORKFLOW.md`.

All execution evidence must originate from real SUT execution.
