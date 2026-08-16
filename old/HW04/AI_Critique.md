# HW04 — AI Critique & Collaboration Analysis

**Student ID:** 23127255  
**Student Name:** Nguyễn Thọ Tài  
**Course:** Software Testing / Data-Driven Automation  
**Date:** 2026-08-11  
**AI Tools Evaluated:** Antigravity (Gemini 3.6 Flash & Claude Sonnet)  
**Reference Log:** `AI_AUDIT_LOG.md`

---

## 1. AI Flaws & Misconceptions

The AI was useful for generating Playwright scripts and organizing test data, but it still made several mistakes that needed human review.

- **Brittle selectors and timing:** The first scripts used selectors such as `form input:nth-child(...)` and `waitForTimeout`, which were unreliable with the React UI.
- **Incorrect REST assumptions:** For `FR-14 TC-DT-009`, the AI assumed that deleting a non-existent category should return `404`. The SUT returned `200`, and after checking the specification, I decided to accept this behavior because `404` was not explicitly required.
- **Over-engineering:** During browser setup, the AI sometimes created extra scripts or approaches outside the defined workflow. I had to redirect it back to `WORKFLOW.md`, `SKILLS.md`, and the existing project structure.

---

## 2. Human Intervention

Human review was important throughout the process.

- I required the AI to follow the staged workflow and stop after each stage instead of running everything automatically.
- `FR-11 TC-DT-012` was excluded because automating it would require directly modifying the SQLite database, which would violate the intended black-box boundary.
- I reviewed the `TC-DT-009` HTTP `200` result and made the final decision that it was acceptable rather than assuming `404` from REST conventions.
- I also corrected unnecessary changes when the AI tried to introduce extra scripts or deviate from the established workflow.

These interventions helped keep the testing process focused on the actual SUT and assignment requirements.

---

## 3. Conclusion

The main lesson from HW04 is that AI is good at repetitive testing work, but it should not be trusted blindly with test decisions. Like how in stage 8, it's only execute FR01 script and ignore the other test scripts.

It was effective at generating scripts, handling test data, and setting up browser execution. However, it sometimes made assumptions about how the SUT should behave instead of relying on the specification and actual execution results.