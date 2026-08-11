# AI Audit Report & AI Critique
## HW02 — Domain Testing on EShop

**Assignment:** HW02-AI — Domain Testing  
**Student:** Nguyễn Thọ Tài - 23127255 - Group 01
**AI Policy:** Open — AI was used and is declared below.

---

# Part 1 — AI Audit Report

## Declaration

> *"I use AI tools for the following tasks."*

All AI interactions were recorded step-by-step using the AUDIT-01 skill defined in [`SKILLS.md`](SKILLS.md). The AI was used as a disciplined testing assistant, guided through each step of the domain testing and boundary value analysis technique. Every AI output was reviewed and corrected where necessary before being accepted into the final artifacts.

---

## Summary of AI Tool Usage

| Feature | AI Tool | Session Start | Session End | Interactions |
|---------|---------|--------------|-------------|-------------|
| FR-01 (Account Registration) | Antigravity (Claude Sonnet 4.6 Thinking) | 2026-07-07 13:34 UTC+7 | 2026-07-07 14:10 UTC+7 | 16 |
| FR-11 (Order History) | Antigravity (Claude Sonnet 4.6 / Gemini 3.5 Flash) | 2026-07-07 14:49 UTC+7 | 2026-07-07 15:39 UTC+7 | 17 |
| FR-14 (Category CRUD) | Antigravity (Gemini 3.5 Flash) | 2026-07-07 15:58 UTC+7 | 2026-07-07 16:21 UTC+7 | 15 |
| FR-20 (Mobile) | Antigravity (Gemini 3.5 Flash) | 2026-07-07 18:18 UTC+7 | 2026-07-07 18:33 UTC+7 | 15 |

---

## Detailed Interaction Logs

Per-feature detailed logs are stored in the respective `AUDIT-01-log.md` files:

- **FR-01:** [`tests/FR01/AUDIT-01-log.md`](tests/FR01/AUDIT-01-log.md)
- **FR-11:** [`tests/FR11/AUDIT-01-log.md`](tests/FR11/AUDIT-01-log.md)
- **FR-14:** [`tests/FR14/AUDIT-01-log.md`](tests/FR14/AUDIT-01-log.md)
- **FR-20:** [`tests/FR20/AUDIT-01-log.md`](tests/FR20/AUDIT-01-log.md)

Raw conversation transcripts are available at:
- **FR-01:** [`tests/FR01/RAW_AUDIT_FR01.md`](tests/FR01/RAW_AUDIT_FR01.md)
- **FR-11:** [`tests/FR11/RAW_AUDIT_FR14.md`](tests/FR11/RAW_AUDIT_FR14.md)
- **FR-14:** [`tests/FR14/RAW_AUDIT_FR14.md`](tests/FR14/RAW_AUDIT_FR14.md)
- **FR-20:** [`tests/FR20/RAW_AUDIT_FR20.md`](tests/FR20/RAW_AUDIT_FR20.md)

---

## Tasks AI Was Used For

| Task | Skill | Features |
|------|-------|---------|
| Testing environment verification | ENV-01 | FR-01, FR-11, FR-14, FR-20 |
| Feature understanding | DT-01 | FR-01, FR-11, FR-14, FR-20 |
| Domain identification | DT-02 | FR-01, FR-11, FR-14, FR-20 |
| Domain partitioning | DT-03 | FR-01, FR-11, FR-14, FR-20 |
| Test case generation | DT-04 | FR-01, FR-11, FR-14, FR-20 |
| Playwright/ADB script writing | EXEC-01 | FR-01, FR-11, FR-14, FR-20 |
| Test execution & results recording | EXEC-01 | FR-01, FR-11, FR-14, FR-20 |
| Boundary value analysis | BVA-01 | FR-01, FR-11, FR-20 |
| Bug report creation | BUG-01 | FR-01, FR-11, FR-14, FR-20 |
| AI gap analysis | GAP-01 | FR-01, FR-11, FR-14, FR-20 |
| Final report compilation | REPORT-01 | FR-01, FR-11, FR-14, FR-20 |

---

## Human Review Record

All AI-generated artifacts were reviewed before acceptance. Key corrections made:

| Feature | Correction | Reason |
|---------|-----------|--------|
| FR-01 | None required | AI output was accurate; all rules grounded in evidence |
| FR-11 | Added BR-11, BR-12 from OQ-03 and OQ-02 | Student answered open questions; AI updated rules accordingly |
| FR-14 | Corrected Business Rule framing (spec vs. SUT bug) | AI initially mixed expected behaviour with SUT deviations |
| FR-20 | Resolved OQ-01 (no explicit upper quantity limit) | Student confirmed no spec-defined max; AI updated test cases |

---

# Part 2 — AI Critique

Throughout this assignment, the AI demonstrated strong capability in structured, step-by-step testing workflows based on SKILLs. It reliably produced domain identification tables, equivalence partitions, and test cases when guided by well-defined skills. However, several patterns of failure and incompleteness emerged that reveal the limits of the current human-AI collaboration model such as human errors, token running out, hallucination, misinterpretation and missing inputs.

For example, in FR-11, AI makes up test user in the DT-01. I corrected that and it hallucinated again in next skill, but it corrected itself by my correction.

However, it did a breeze job in fast and robust domain testing, boundry value analysis and bug reports with screenshoot captured which impressed me a lot with current AI capability.

I don't like how prompt sensitivity it is for this agent. In FR-14, the AI conflated "expected specification behaviour" with "SUT actual behaviour" in the Business Rules section, requiring a human correction to separate them. This can be seen in my first prompt for this feature. It means AI is easily influenced by how the feature is described and forget older context.

I learned from this on how to make a skill-set for agent, and creating a workflow for it. Tho not perfect in how AI apply different ways to different feature target causing some minor mis-matches between file structure, it did a great job.

---

*End of AI Audit Report and AI Critique*
