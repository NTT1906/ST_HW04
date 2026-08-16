---
name: ai-performance-testing-skills
description: >-
  Reusable AI-assisted performance-testing skills for HW05 against the EShop
  backend API using k6. Use for API validation, data-driven test generation,
  Load/Stress/Spike design, human review, execution, evidence collection,
  result analysis, endurance testing, optimization review, continuous
  performance-testing design, AI audit logging, and reporting.
  Do not use for frontend/browser automation or general application development.
---

# AI Performance Testing Skills

Reusable AI testing skills for HW05 backend API performance testing.

## Supported techniques
- API Endpoint Validation
- Data-Driven Performance Testing
- k6 Test Generation
- Load Testing
- Stress Testing
- Spike Testing
- Endurance / Soak Testing
- Performance Result Analysis
- AI Misinterpretation Analysis
- Performance Optimization Review
- Human Review
- AI Audit Logging
- Continuous Performance Testing
- Git History Validation
- Report Generation
- README/Summary Generation

## Skill Registry

| Skill | Purpose |
|---|---|
| ENV-01 | Prepare and verify the EShop backend/API performance environment |
| API-01 | Validate API endpoints, methods, authentication, request data, and constraints |
| DATA-01 | Prepare external performance-test data |
| K6-01 | Generate reusable k6 API performance-test code |
| PERF-01 | Design Load, Stress, and Spike workload profiles |
| CHECK-01 | Review API checks and performance thresholds |
| EXEC-01 | Execute an approved k6 performance scenario |
| RESULT-01 | Process raw k6 performance results |
| EVIDENCE-01 | Collect execution, resource, and hardware evidence |
| ENDURANCE-01 | Conduct endurance/soak testing and determine a stable threshold |
| ANALYSIS-01 | Analyze raw performance-test results with AI |
| GAP-01 | Identify AI mistakes in performance-result analysis |
| OPT-01 | Evaluate AI optimization recommendations |
| REVIEW-01 | Perform mandatory human review |
| AUDIT-01 | Maintain the AI interaction audit |
| CI-01 | Design continuous performance testing |
| BUG-01 | Document genuine SUT performance issues |
| GIT-01 | Validate HW05 Git history |
| REPORT-01 | Assemble the HW05 report |
| README-01 | Assemble the HW05 README/submission summary |

---

# ENV-01 — Performance Testing Environment

## When to Use

Use when preparing or verifying the EShop backend API environment before
performance testing.

## Purpose

Provide a verified environment for executing k6 performance tests against
the EShop backend API.

## Inputs

- EShop SUT
- Backend API
- `WORKFLOW.md`
- `api_specification.md`
- k6
- Required test accounts and test data
- Resource-monitoring tools

## Procedure

1. Start the EShop SUT.
2. Verify the backend API is reachable.
3. Verify the required API dependencies are running.
4. Verify authentication/test accounts.
5. Verify required performance-test data.
6. Verify k6 installation.
7. Verify resource-monitoring tools.
8. Execute a minimal API smoke request.
9. Record environment failures instead of inferring test results.

## Outputs

- Environment verification notes
- SUT connectivity evidence
- Tool/version information
- Test-data readiness status

## Validation

- Backend API is reachable.
- Required accounts/data are available.
- k6 executes successfully.
- Resource monitoring is available.
- No browser automation is required for HW05 performance execution.

## Pitfalls

- Do not use frontend/browser automation as the performance load generator.
- Do not claim the SUT is healthy solely because the server starts.
- Do not use stale evidence.
- Do not confuse environment failure with SUT performance failure.
# API-01 — API Endpoint Validation

## Purpose

Validate that API endpoints selected by the workflow are supported by the
SUT and documented correctly before performance-test generation.

## Inputs

- `api_specification.md`
- Approved workflow definition from `WORKFLOW.md`
- Running EShop SUT
- Required test data

## Procedure

1. Read the API specification.
2. Identify the HTTP method for each workflow endpoint.
3. Verify the endpoint path.
4. Verify authentication requirements.
5. Verify request headers.
6. Verify request body/query/path parameters.
7. Identify documented preconditions and constraints.
8. Execute representative requests against the running SUT.
9. Verify the response and request dependency.
10. Record discrepancies.
11. Stop if required behavior cannot be established.

## Rules

- Do not invent endpoints.
- Do not invent request fields.
- Do not assume undocumented behavior.
- Do not fabricate response values.
- Do not silently resolve specification conflicts.

## Outputs

- API validation notes
- Verified endpoint information
- Required test-data information
- Identified constraints
- Validation evidence

---

# K6-01 — k6 Performance Test Generation
## Purpose

Generate k6 code implementing an approved backend API performance workflow.

## Inputs

- Approved workflow from `WORKFLOW.md`
- API validation results
- `api_specification.md`
- Approved external test data
- Approved workload configuration
- SUT base URL

## Procedure

1. Translate the approved API workflow into k6 HTTP requests.
2. Preserve request dependencies and data flow.
3. Implement authentication/session handling.
4. Parameterize external test data.
5. Add meaningful request checks.
6. Add performance thresholds when approved.
7. Separate environment configuration from test logic.
8. Produce the requested k6 scenario artifact.
9. Do not invent API behavior.

## Rules

- Do not hardcode a workflow that is not supplied by the workflow document.
- Do not hardcode credentials or secrets.
- Do not fabricate API responses.
- Do not fabricate performance results.
- Do not change approved workload parameters without human review.

## Outputs

- k6 script
- configuration information
- required external-data references
- execution instructions

---

# PERF-01 — Performance Scenario Design

## Purpose

Design workload profiles for Load, Stress, and Spike performance testing
using an approved API workflow.

## Inputs

- Approved API workflow
- API validation results
- SUT characteristics
- Available hardware
- Assignment requirements
- Baseline measurements

## Procedure

1. Identify the objective of the requested scenario.
2. Determine virtual-user/concurrency requirements.
3. Determine ramp-up/ramp-down behavior.
4. Determine sustained duration.
5. Determine request pacing or think time where applicable.
6. Define success/failure criteria.
7. Define required metrics.
8. Justify selected parameters.
9. Identify risks and test-data constraints.
10. Produce the scenario configuration for human review.

## Scenario Semantics

### Load
Measure behavior under expected sustained workload.

### Stress
Increase workload progressively to identify degradation or instability.

### Spike
Introduce a sudden workload change and observe degradation and recovery.

## Rules

- Do not choose arbitrary load levels without justification.
- Do not modify the approved workflow.
- Do not confuse Stress and Spike testing.
- Do not fabricate baseline or threshold values.
- All generated parameters require human review.

## Required Scenario Relationship

Load, Stress, and Spike scenarios must use the same approved end-to-end
API workflow.

The scenario type changes the workload characteristics, not the business
workflow.

Do not create separate endpoint workflows for Load, Stress, and Spike.

## Outputs

A scenario design containing:

- scenario type;
- workload/concurrency;
- ramping;
- duration;
- pacing/think time;
- thresholds;
- objective;
- parameter justification;
- human approval status.

## Validation

- [ ] All scenarios use the same approved API workflow.
- [ ] No fabricated baseline or threshold values.
- [ ] All critical parameters are human-approved.
- [ ] Load scenario reflects expected traffic levels.
- [ ] Stress scenario exceeds expected load but stays within hardware limits.
- [ ] Spike scenario includes abrupt load changes.

## Pitfalls

- Do not create different API workflows for each scenario type.
- Do not invent baseline or threshold values.
- Do not modify the approved workflow without human review.

---

# CHECK-01 — API and Performance Check Review

## Purpose

Review checks and thresholds in generated performance tests.

## Review

Verify that checks:

- validate expected HTTP behavior;
- detect unexpected error responses;
- validate required response properties when documented;
- do not depend on fabricated response fields;
- distinguish functional failure from performance degradation;
- cover relevant performance metrics:
  - response time;
  - throughput/RPS;
  - p95/p99 latency where applicable;
  - error rate;
- use appropriate scenario-specific performance thresholds;
- define regression criteria where applicable;
- do not make the test artificially pass.

## Human Review

The student must approve all checks and thresholds before execution.

# DATA-01 — Performance Test Data

## Purpose

Prepare external test data required by an approved API performance workflow.

## Inputs

- Approved workflow
- API specification
- Existing valid test data
- SUT constraints

## Procedure

1. Identify data required by workflow requests.
2. Determine which values should be parameterized.
3. Create CSV/JSON data as required.
4. Validate every value against documented constraints.
5. Verify data against the running SUT when necessary.
6. Ensure sufficient data exists for the intended concurrency and duration.
7. Document data-reset or reuse requirements.

## Rules

- Do not invent valid application data without verification.
- Do not include secrets in committed files.
- Do not reuse stateful data indefinitely when it changes test behavior.
- Do not modify expected behavior to accommodate invalid data.

## Outputs

- External data files
- Data-generation/maintenance notes
- Validation evidence

---

# EXEC-01 — Performance Test Execution

## Purpose

Execute an approved k6 performance scenario against the EShop backend.

## Inputs

- Approved k6 script
- Approved scenario configuration
- Valid test data
- Running SUT
- Resource-monitoring environment

## Procedure

1. Verify the SUT is ready.
2. Verify required test data.
3. Verify the scenario configuration.
4. Start the resource monitor.
5. Execute the k6 scenario.
6. Preserve raw output.
7. Record execution metadata.
8. Capture required evidence.
9. Record failures without inventing explanations.

## Rules

- Do not modify the approved scenario during execution without recording it.
- Do not fabricate missing results.
- Do not treat environment failures as SUT performance failures.
- Preserve raw results unchanged.

---

# RESULT-01 — Raw Performance Result Processing

## Purpose

Process raw k6 output into analysis-ready performance metrics without
altering the original raw result.

## Inputs

- Raw k6 output
- Scenario metadata

## Metrics

Where available:

- request count;
- throughput/RPS;
- response-time distribution;
- p50;
- p90;
- p95;
- p99;
- error rate;
- checks;
- iteration duration;
- HTTP failures.

## Rules

- Preserve raw output unchanged.
- Keep derived metrics separate from raw data.
- Record the calculation method for derived metrics.
- Do not substitute averages for percentiles.
- Do not infer unavailable metrics.

## Outputs

- Processed analysis data
- Metric summary
- Raw-result reference

---

# EVIDENCE-01 — Performance Execution Evidence

## Purpose

Collect evidence required to demonstrate an actual performance-test execution.

## Evidence

Collect, as applicable:

- Load execution;
- Stress execution;
- Spike execution;
- resource monitor;
- CPU utilization;
- memory utilization;
- hardware specifications;
- scenario configuration;
- raw native k6 output for each scenario;
- processed results;
- timestamps;
- endurance-test evidence.

## Rules

- Evidence must come from actual execution.
- Do not fabricate screenshots.
- Do not reuse unrelated HW04 evidence.
- The resource monitor and performance tool must be visible together when
  required by the assignment.
- Record enough context to identify the scenario and execution.

---

# ENDURANCE-01 — Endurance / Soak Testing

## Purpose

Determine the stable operating threshold of the test environment under
sustained workload.

## Inputs

- Approved API workflow
- Approved sustained workload
- Previous Load/Stress results

## Procedure

1. Select a sustained workload based on previous evidence.
2. Run the workload for the assignment-required duration.
3. Monitor latency, throughput, errors, CPU, and memory.
4. Identify sustained degradation.
5. Determine the maximum empirically stable operating point.
6. Document the threshold and supporting evidence.

## Rules

- Do not claim a threshold without execution evidence.
- Distinguish hardware saturation from application failure where evidence permits.
- Do not infer a universal threshold from one machine.

## Outputs

- Endurance results
- Stable threshold
- Supporting metrics
- Evidence

---

# GAP-01 — AI Performance Analysis Gap Analysis

## Purpose

Identify and verify mistakes in AI-generated analysis of performance results.

## Inputs

- Raw performance results
- AI analysis
- Processed metrics
- Execution metadata

## Review Categories

- Incorrect metric values
- Incorrect percentile interpretation
- Average/percentile confusion
- Throughput misinterpretation
- Error-rate misinterpretation
- Incorrect comparison between scenarios
- Unsupported causal claims
- Incorrect threshold recommendations
- Missing important observations

## Procedure

1. Record the AI claim.
2. Locate the corresponding raw evidence.
3. Determine the correct value/interpretation.
4. Classify the AI error.
5. Explain the discrepancy.
6. Record the human correction.

## Output

| Issue | AI Claim | Correct Result | Evidence | Error Type | Human Correction |
|---|---|---|---|---|---|

---

# OPT-01 — AI Optimization Recommendation Review

## Purpose

Evaluate performance optimizations proposed by AI.

## Procedure

1. Obtain optimization recommendations from AI.
2. Identify the technical assumption behind each recommendation.
3. Compare the recommendation with the SUT documentation and observed results.
4. Determine whether the recommendation is applicable.
5. Classify it as:
   - Feasible
   - Infeasible
   - Hallucinated
   - Requires additional evidence
6. Document the human reasoning.

## Rules

Do not accept an optimization recommendation merely because it is
technically plausible in another system.

# CI-01 — Continuous Performance Testing Design

## Purpose

Design a CI/CD strategy that automatically determines when performance
testing should run and detects p95 regressions.

## Inputs

- Performance baseline
- Approved performance scenario
- Repository/commit workflow
- Regression criteria

## Procedure

1. Identify commits that may affect backend performance.
2. Define when performance tests should run.
3. Define the performance-test environment.
4. Define baseline collection.
5. Define p95 comparison logic.
6. Define regression thresholds.
7. Define pass/fail/flag behavior.
8. Identify false-positive and cost trade-offs.
9. Produce a flow chart and explanation.

## Rules

- Do not claim a CI integration exists unless implemented.
- Distinguish proposal from actual execution.
- Do not choose a regression threshold without justification.

# REVIEW-01 — Human Review

## Purpose

Provide mandatory human review for every significant AI-generated
performance artifact.

## Review

The human verifies:

- API correctness;
- test-data correctness;
- workflow dependencies;
- workload realism;
- Load/Stress/Spike distinction;
- k6 implementation;
- checks and thresholds;
- execution evidence;
- metric interpretation;
- AI analysis;
- optimization recommendations;
- final conclusions.

## Rules

- AI output is never automatically approved.
- Do not treat lack of human rejection as approval.
- Record important corrections and rejected AI suggestions.

# AUDIT-01 — AI Audit Logging

## Purpose

Maintain the complete audit trail of AI usage throughout HW05.

## Record

For each significant AI interaction:

- AI tool;
- date/time;
- prompt;
- relevant input;
- AI output;
- human review;
- correction;
- final decision.

## Rules

- Preserve raw AI interactions.
- Do not rewrite AI output to make it appear correct.
- Do not omit rejected recommendations or corrections.
- Keep the audit separate from the final summary.

# BUG-01 — Performance/SUT Issue Reporting

## Purpose

Document genuine SUT defects or performance issues discovered during
performance testing.

## Inputs

- Raw performance result
- Execution evidence
- Reproduction information
- Relevant API response
- Resource-monitor evidence

## Possible Issues

- HTTP errors
- crashes
- functional regressions
- unexpectedly persistent failures
- severe latency degradation
- other reproducible SUT problems

## Rules

- Do not classify environment failures as SUT bugs.
- Do not claim root cause without evidence.
- Human verification is required before reporting a genuine defect.

---

# REPORT-01 — HW05 Report Generation

## Purpose

Assemble the final HW05 report from approved performance-testing artifacts.

## Inputs

- Approved workflow
- Load results
- Stress results
- Spike results
- Endurance results
- AI analysis
- AI gap analysis
- Optimization review
- Continuous-testing proposal
- Evidence
- AI Audit
- Git history

## Rules

- Use only verified results.
- Distinguish measured values from interpretation.
- Do not fabricate missing evidence.
- Preserve traceability to raw results.

---

# README-01 — HW05 Submission Summary

## Purpose

Generate the HW05 README describing how to reproduce the performance tests.

## Include

- SUT setup;
- k6 requirements;
- environment configuration;
- test-data setup;
- execution commands;
- Load/Stress/Spike scenarios;
- result locations;
- evidence locations;
- AI usage;
- repository structure.

## Rules

Do not include secrets or fabricated execution results.

---

# GIT-01 — HW05 Commit History

## Purpose

Validate the Git history required by HW05.

## Review

Verify that meaningful commits correspond to development stages such as:

- performance-test setup;
- data preparation;
- k6 workflow;
- scenario development;
- execution/result artifacts;
- analysis;
- reporting.

## Outputs

- Git commit log;
- commit-summary table;
- repository link.

## Rules

- Do not fabricate commits.
- Do not rewrite history solely to satisfy the assignment.
- Do not claim a commit exists without repository evidence.

# ANALYSIS-01 — AI Performance Result Analysis

## Purpose

Analyze raw performance-test results using AI to identify performance
characteristics, trends, anomalies, and potential bottlenecks.

## Inputs

- Raw k6 results
- Processed performance metrics
- Scenario metadata
- Resource-monitoring results

## Procedure

1. Provide the raw/processed results to AI.
2. Ask AI to identify significant performance observations.
3. Ask AI to interpret throughput, latency, percentiles, and error rates.
4. Ask AI to compare Load, Stress, and Spike behavior.
5. Record the complete AI output.
6. Submit the analysis to `GAP-01` for human verification.

## Rules

- Do not treat AI interpretation as ground truth.
- Do not allow AI to invent unavailable metrics.
- Do not replace raw results with AI-generated values.
- Preserve the raw results for comparison.

## Outputs

- AI performance analysis
- Identified observations
- AI-generated hypotheses
- Analysis input/output record

# General Principles

These skills support the HW05 AI-First performance-testing process.

The AI may assist with API validation, performance-test design, test-data
generation, k6 script generation, workload configuration, result analysis,
optimization analysis, reporting, and continuous-testing design.

The student remains responsible for:

- reviewing AI-generated artifacts;
- correcting errors;
- validating API behavior;
- approving workload parameters;
- executing performance tests;
- validating performance results;
- verifying AI analysis;
- validating optimization recommendations;
- maintaining the AI Audit;
- producing final evidence and conclusions.

## Workflow Separation

These skills are reusable capabilities.

They must NOT define the student's specific API workflow, endpoint selection,
endpoint-group classification, scenario configuration, or other
student-specific choices.

Those are defined exclusively in `WORKFLOW.md`.

## Source-of-Truth Rules

- `2026.HW05.Performance Testing_En_2.0_TA.md` is the assignment specification.
- `api_specification.md` is the API contract/source of truth for documented API behavior.
- `WORKFLOW.md` defines the selected student workflow and orchestration.
- Raw k6 output is the source of truth for measured performance results.
- Actual SUT execution is the source of truth for observed behavior.

## Anti-Fabrication Rules

- Do not fabricate API behavior.
- Do not fabricate test data.
- Do not fabricate performance results.
- Do not fabricate screenshots or execution evidence.
- Do not claim an optimization was implemented unless it actually was.
- Do not claim CI/CD integration exists unless it was actually implemented.
- Do not present AI-generated interpretations as measured facts.

## Skill Structure

Each skill defines, where applicable:

- Purpose
- When to Use
- Inputs
- Dependencies
- Procedure
- Outputs
- Validation criteria
- Rules/Pitfalls

The orchestration order, human-approval gates, artifact dependencies, iteration rules, and stop/continue conditions are defined exclusively in `WORKFLOW.md`.