# HW05 AI Workflow — Backend API Performance Testing

This workflow orchestrates the reusable skills defined in `SKILLS.md`.

HW05 is an AI-assisted backend API performance-testing assignment.
The selected performance-testing tool is k6.

Student ID: 23127255.
Platform: Windows 11 (Prefered) + Ubuntu 24.04 WSL.
SUT Source: eshop-sut/

---

# 0. Mandatory First Read

Before performing ANY HW05 task, read:

`2026.HW05.Performance Testing_En_2.0_TA.md`

This file is the primary authority for:

- HW05 scope and requirements;
- Load, Stress, and Spike testing;
- endpoint-group requirements;
- AI-first strategy;
- human review;
- endurance testing;
- AI analysis;
- AI critique;
- continuous performance testing;
- Agent Skill requirements;
- evidence;
- Git requirements;
- submission requirements.

Then read:

`api_specification.md`

Use it as the authoritative source for documented EShop API behavior.

Do not begin test-plan generation before reading both files.

---

# 1. Human Approval Policy

This workflow is human-driven.

## Core Rules

Unless explicitly instructed otherwise:

- Execute one skill at a time.
- Produce only the artifact requested by the current stage.
- Stop after producing the artifact.
- Wait for explicit human approval before continuing.
- Never assume approval.
- Never silently modify an approved artifact.
- Never fabricate test results, screenshots, logs, metrics, bugs, timestamps,
  or other evidence.
- Preserve raw execution results.
- Do not use frontend/browser automation as the HW05 load generator.
- Do not invent API behavior.
- Do not inspect backend source code unless explicitly authorized.
- Use `api_specification.md` and actual SUT behavior to establish API behavior.

## Human Review Gate

```text
Skill
  ↓
Artifact
  ↓
HUMAN REVIEW
  ↓
Approved?
 ├── NO → Correct/re-run as instructed
 └── YES
       ↓
     Continue
```

The workflow must never interpret absence of rejection as approval.

---

# 2. HW05 Scope

## SUT

EShop backend API.

## Tool

k6.

The HW05 specification permits JMeter or k6. k6 is the selected
performance-testing tool for this submission.

Native k6 raw output is accepted as the raw performance-result format
when k6 is used.

## Selected End-to-End Workflow

The selected workflow is:

```text
POST /api/login
        ↓
GET /api/users/me
        ↓
PUT /api/users/me
        ↓
POST /api/cart
        ↓
GET /api/cart
```

## Endpoint Groups

| Endpoint | Group |
|---|---|
| `POST /api/login` | Auth-heavy |
| `GET /api/users/me` | Read-heavy |
| `PUT /api/users/me` | Transactional |
| `POST /api/cart` | Transactional |
| `GET /api/cart` | Read-heavy |

This is the single approved end-to-end workflow for HW05.

Load, Stress, and Spike MUST all execute this same workflow.

Do not create separate endpoint workflows for different scenarios.

---

# 3. Source-of-Truth Policy

## HW05 Specification

`2026.HW05.Performance Testing_En_2.0_TA.md`

Defines assignment requirements.

## API Specification

`api_specification.md`

Defines documented API methods, paths, parameters, authentication,
request data, and constraints.

## Workflow

`WORKFLOW.md`

Defines the student's selected workflow, scenario configuration,
orchestration, and artifacts.

## Raw Performance Results

Raw native k6 output is the source of truth for measured performance
results when k6 is used.

## Actual SUT

Actual execution is the source of truth for observed SUT behavior.

---

# 4. Stage 1 — Environment Preparation

Use:

`ENV-01`

## Tasks

1. Start the EShop SUT.
2. Verify backend API connectivity.
3. Verify required dependencies.
4. Verify test accounts.
5. Verify required test data.
6. Verify k6 installation.
7. Verify resource-monitoring tools.
8. Execute a minimal API smoke request.

## Output

Produce:

- environment verification notes;
- tool/version information;
- test-data readiness status;
- SUT connectivity evidence.

→ **Human Review**

---

# 5. Stage 2 — API Validation

Use:

`API-01`

Validate the selected workflow against:

- `api_specification.md`;
- the actual running SUT.

Verify:

- endpoint paths;
- HTTP methods;
- authentication;
- headers;
- request bodies;
- parameters;
- response dependencies;
- documented constraints;
- required test data.

Do not invent undocumented behavior.

## Output

Produce:

- API validation notes;
- verified endpoint information;
- required test-data information;
- identified constraints;
- validation evidence.

→ **Human Review**

---

# 6. Stage 3 — Test Data Preparation

Use:

`DATA-01`

Prepare external CSV/JSON data required by the selected workflow.

The data must support the intended concurrency and test duration.

Verify:

- credentials;
- product/test data;
- profile data;
- stateful data requirements;
- reset/reuse requirements.

Do not commit secrets.

→ **Human Review**

---

# 7. Stage 4 — Baseline Workflow Validation

Before Load/Stress/Spike testing, implement and execute a low-load
baseline of the complete workflow:

```text
POST /api/login
        ↓
GET /api/users/me
        ↓
PUT /api/users/me
        ↓
POST /api/cart
        ↓
GET /api/cart
```

Use:

`K6-01`

The baseline validates that the complete workflow can execute correctly
before concurrency is increased.

Record:

- HTTP results;
- checks;
- errors;
- response times;
- required state transitions.

Do not use baseline results as fabricated performance thresholds.

→ **Human Review**

---

# 8. Stage 5 — Performance Scenario Design

Use:

`PERF-01`

Create three separate performance scenarios:

```text
Load
Stress
Spike
```

All three MUST use the same approved end-to-end workflow.

Only workload characteristics change.

## Load

Measure behavior under expected sustained workload.

## Stress

Increase workload progressively to identify degradation or instability.

## Spike

Introduce an abrupt workload increase and observe degradation and recovery.

For each scenario define and justify:

- virtual users/concurrency;
- ramp-up/ramp-down;
- duration;
- pacing/think time;
- thresholds;
- success/failure criteria;
- scenario objective.

Do not copy arbitrary values without justification.

Parameters must be reviewed and approved by the student.

→ **Human Review after each scenario design**

---

# 9. Stage 6 — k6 Test Generation

Use:

`K6-01`

Generate the three performance test plans using:

- the approved workflow;
- validated API information;
- approved test data;
- approved scenario configurations.

## Test Plan Names

Use:

```text
<StudentID>_Load_<YYYYMMDD>
<StudentID>_Stress_<YYYYMMDD>
<StudentID>_Spike_<YYYYMMDD>
```

Use appropriate k6 script/output extensions.

## Requirements

Each test plan must:

- use the approved end-to-end workflow;
- use external test data;
- handle authentication correctly;
- preserve request dependencies;
- implement approved checks;
- implement approved thresholds;
- use a configurable SUT base URL;
- avoid hardcoded credentials;
- avoid fabricated API behavior.

→ **Human Review**

---

# 10. Stage 7 — Check and Threshold Review

Use:

`CHECK-01`

Review:

- HTTP checks;
- functional checks;
- response-time metrics;
- throughput/RPS;
- p95/p99 latency where applicable;
- error rate;
- scenario-specific performance thresholds;
- regression criteria.

Do not invent threshold values.

All thresholds must be human-approved.

→ **Human Review**

---

# 11. Stage 8 — Load / Stress / Spike Execution

Use:

`EXEC-01`

Execute all three approved scenarios.

For each scenario:

1. Verify SUT readiness.
2. Verify test data.
3. Verify scenario configuration.
4. Start resource monitoring.
5. Execute k6.
6. Preserve raw native k6 output.
7. Record execution metadata.
8. Capture required evidence. 

→ **Human Review after each execution**

---

# 12. Stage 9 — Evidence Collection

Use:

`EVIDENCE-01`

For each Load, Stress, and Spike execution, capture a screenshot showing:

- the k6 performance-test execution/result;
- the backend process resource usage;
- CPU usage;
- memory usage;
- the scenario being executed.

The performance-testing tool and resource monitor must be visible together.

Use an appropriate resource-monitoring tool for the SUT environment.
For a backend running in WSL Ubuntu, `htop` or an equivalent Linux process
monitor may be used. Windows Task Manager may also be used for host-level
resource evidence.

For each scenario, also preserve:

- scenario configuration;
- raw native k6 output;
- processed results;
- execution timestamp.

## Hardware Report

Produce a hardware report containing:

1. A hardware-information screenshot using `dxdiag`, `screenfetch`,
   or an equivalent system-information tool.
2. A hardware specification table containing the relevant test-machine
   specifications.

The specification table should include, where applicable:

- CPU model;
- CPU core/thread count;
- RAM capacity;
- operating system;
- WSL/Ubuntu version;
- storage information relevant to the test environment;
- GPU model where applicable;
- other hardware information required by HW05.

The hardware report must describe the machine on which the performance
tests were actually executed.

Do not fabricate hardware specifications.

Do not use hardware information from a different machine.

Do not modify hardware information to make performance results appear
better or worse.

Do not create a separate hardware report for every scenario; one
hardware report may be referenced by the Load, Stress, Spike, and
Endurance results when the same test machine is used.

---

# 13. Stage 10 — Result Processing

Use:

`RESULT-01`

Process raw k6 results while preserving the original raw output unchanged.

Collect, where available:

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

Do not replace percentile metrics with averages.

Keep derived metrics separate from raw results.

→ **Human Review**

---

# 14. Stage 11 — Endurance / Soak Test

Use:

`ENDURANCE-01`

Run a short endurance/soak test of approximately 10–15 minutes at
sustained load, following the HW05 requirement.

Use a sustained workload selected from the Load/Stress evidence.

Measure:

- throughput;
- latency;
- p95/p99;
- errors;
- CPU;
- memory.

Determine the maximum empirically stable operating point on the
student's hardware.

Report concrete numbers, such as:

- maximum stable RPS;
- relevant latency;
- memory ceiling;
- CPU behavior.

Do not claim a threshold without execution evidence.

→ **Human Review**

---

# 15. Stage 12 — AI Performance Analysis

Use:

`ANALYSIS-01`

After collecting raw results, use AI to analyze:

- Load;
- Stress;
- Spike;
- Endurance.

Ask AI to interpret:

- throughput;
- latency;
- percentiles;
- errors;
- degradation;
- resource usage;
- candidate performance thresholds.

Preserve the complete AI output.

AI analysis is advisory and must be reviewed by the student.

→ **Human Review**

---

# 16. Stage 13 — AI Misinterpretation Hunt

Use:

`GAP-01`

Compare the AI analysis against the raw k6 results.

For every confirmed AI mistake, record:

| Issue | AI Claim | Correct Result | Evidence | Error Type | Human Correction |
|---|---|---|---|---|---|

Focus on:

- incorrect metric values;
- percentile mistakes;
- average/percentile confusion;
- throughput interpretation;
- error-rate interpretation;
- unsupported causal claims;
- incorrect thresholds;
- missed important observations.

Every correction must be supported by raw execution evidence.

→ **Human Review**

---

# 17. Stage 14 — AI Optimization Review

Use:

`OPT-01`

Ask AI to propose performance optimizations.

For every recommendation classify it as:

- Feasible;
- Infeasible;
- Hallucinated;
- Requires additional evidence.

Provide human reasoning and supporting evidence.

Do not claim an optimization was implemented unless it was actually
implemented and verified.

→ **Human Review**

---

# 18. Stage 15 — Continuous Performance Testing Proposal

Use:

`CI-01`

Design a CI/CD model that:

1. Watches relevant SUT commits.
2. Determines whether performance testing should run.
3. Executes the appropriate performance test.
4. Compares results with a baseline.
5. Detects p95 regression.
6. Flags regression for review.

Include:

- flow chart;
- trigger logic;
- baseline strategy;
- p95 regression criteria;
- cost trade-offs;
- false-positive trade-offs.

This is a proposal unless actually implemented.

Do not claim that the CI/CD pipeline exists unless it has actually
been implemented and executed.

→ **Human Review**

---

# 19. Stage 16 — Bug and Performance Issue Reporting

Use:

`BUG-01`

if genuine SUT issues are discovered.

Report genuine:

- HTTP errors;
- crashes;
- functional regressions;
- severe latency degradation;
- reproducible performance issues.

Create GitHub Issues with screenshots when required.

Do not classify environment, configuration, network, or tool failures
as SUT bugs without evidence.

If no genuine issue is discovered, explicitly report that no confirmed
SUT bug/performance issue was found.

---

# 20. Stage 17 — AI Audit

Use:

`AUDIT-01`

Maintain the complete AI Audit throughout the assignment.

For every significant AI interaction record:

- AI tool;
- date and time;
- prompt;
- AI output.

Also preserve relevant:

- human review;
- corrections;
- rejected recommendations;
- final decisions.

The final AI Audit Report is mandatory.

---

# 21. Stage 18 — AI Critique

Produce the mandatory 200–300 word AI Critique.

Address:

1. Where AI was wrong, biased, or incomplete.
2. Why AI failed to catch the issue.
3. What principle was learned about collaborating with AI.

This is a human-written critique based on the actual AI-assisted work.

---

# 22. Stage 19 — Git Commit Log

Use:

`GIT-01`

Create meaningful Git commits for major workflow stages, including:

- performance-test setup;
- test-data preparation;
- API workflow;
- Load plan;
- Stress plan;
- Spike plan;
- execution/results;
- AI analysis;
- continuous-performance proposal;
- report.

Provide the Git commit log as a text file.

Do not fabricate commits or rewrite history merely to satisfy the
assignment.

---

# 23. Stage 20 — Human Demonstration

This stage is HUMAN-ONLY.

Do not use an AI skill to perform the demonstration.

Record the required unlisted YouTube demonstration:

- at least 6 minutes total;
- own Vietnamese voice narration;
- performance-testing tool visible;
- resource monitor visible in the same frame;
- actual performance-testing execution shown.

The video may be split into one clip per scenario if necessary.

Add the video link to the report and README.

---

# 24. Stage 21 — Final Report

Use:

`REPORT-01`

The final report must contain the approved:

- selected workflow;
- endpoint-group classification;
- Load plan and results;
- Stress plan and results;
- Spike plan and results;
- endurance test and threshold;
- performance metrics;
- AI performance analysis;
- AI misinterpretation hunt;
- AI optimization review;
- continuous-performance proposal;
- bugs/performance issues;
- evidence;
- AI Critique;
- AI Audit information.

Distinguish clearly between:

- measured results;
- AI interpretation;
- human correction;
- human conclusions.

Do not present AI-generated values as measured values.

→ **Final Human Review**

---

# 25. Stage 22 — README

Use:

`README-01`

The README must include:

- self-assessment table;
- test summary;
- scenarios executed;
- endpoint groups covered;
- selected workflow;
- endurance threshold with concrete numbers;
- number of confirmed bugs/performance issues;
- demo video link;
- reproduction instructions;
- relevant artifact locations.

---

# 26. Final Submission Checklist

Before submission verify:

- [ ] Main report Markdown
- [ ] Main report PDF
- [ ] Public GitHub repository link
- [ ] Load test plan
- [ ] Stress test plan
- [ ] Spike test plan
- [ ] Raw native k6 Load result
- [ ] Raw native k6 Stress result
- [ ] Raw native k6 Spike result
- [ ] Required distinct k6 result/report views
- [ ] Resource-monitor screenshots
- [ ] Hardware-spec evidence
- [ ] Endurance results
- [ ] Concrete endurance threshold
- [ ] Unlisted YouTube demo link
- [ ] AI Critique
- [ ] AI Audit Report
- [ ] Git commit log
- [ ] Bug/performance issue report if applicable
- [ ] README with self-assessment
- [ ] README test summary
- [ ] All required supporting materials

---

# 27. Artifact Dependency

```text
HW05 Specification
        ↓
API Specification
        ↓
Environment
        ↓
API Validation
        ↓
Test Data
        ↓
Baseline Workflow
        ↓
Load / Stress / Spike Design
        ↓
k6 Test Plans
        ↓
Human Review
        ↓
Load / Stress / Spike Execution
        ↓
Raw Results + Evidence
        ↓
Endurance Test
        ↓
AI Performance Analysis
        ↓
AI Misinterpretation Hunt
        ↓
AI Optimization Review
        ↓
Continuous Performance Proposal
        ↓
AI Audit + AI Critique
        ↓
Git Commit Log
        ↓
Report + README
        ↓
Final Human Review
        ↓
Submission
```

---

# 28. Stop Conditions

Stop and request human input when:

- HW05 requirements are unclear;
- API behavior cannot be established;
- required test data is unavailable;
- the selected workflow cannot execute;
- an AI-generated plan conflicts with the HW05 specification;
- a threshold cannot be justified;
- execution evidence is missing;
- raw results are missing or corrupted;
- a proposed optimization requires unsupported assumptions;
- an environment failure prevents valid performance measurement.

Never silently substitute another workflow.

Never fabricate missing evidence.

Never fabricate performance results.

---

# 29. Workflow Separation Rule

`SKILLS.md` defines reusable capabilities.

`WORKFLOW.md` defines this student's HW05 workflow and orchestration.

Therefore:

- Do not move the selected endpoints into `SKILLS.md`.
- Do not move the selected endpoint-group classification into `SKILLS.md`.
- Do not move scenario-specific VU/concurrency values into `SKILLS.md`.
- Do not move scenario-specific durations into `SKILLS.md`.
- Do not move scenario-specific thresholds into `SKILLS.md`.
- Do not hardcode this student's workflow into reusable skills.

The reusable skills must consume the approved information supplied by
this workflow.
