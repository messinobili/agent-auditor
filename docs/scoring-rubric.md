# Agent Auditor Scoring Rubric

This document provides detailed scoring guidance with examples for consistent audit evaluation.

## Overview

Agents and workflows are scored on five weighted categories:

| Category | Weight | Focus |
|----------|--------|-------|
| Completeness | 25% | Coverage of essential domain practices |
| Accuracy | 25% | Alignment with established best practices |
| Depth | 20% | Specificity and actionability of guidance |
| Currency | 15% | Reflection of current/emerging practices |
| Structure | 15% | Organization, workflow clarity, template quality |

## Category Details

### Completeness (25% weight)

**Question:** Does the agent/workflow cover all essential aspects of the domain?

| Score | Label | Description | Example |
|-------|-------|-------------|---------|
| 90-100 | Exemplary | Covers all essential practices plus advanced edge cases and exceptions | A fact-checking agent that includes source triangulation, confidence levels, AI-generated content detection, and handling of partial truths |
| 80-89 | Complete | Covers all essential practices without gaps | A competitive analysis agent that covers positioning, pricing, product capabilities, GTM strategy, and win/loss analysis |
| 70-79 | Mostly Complete | Covers most essential practices, 1-2 notable gaps | A content marketing agent missing SEO optimization workflow or distribution strategy |
| 60-69 | Partial | Covers basic practices, several important gaps | A PMM agent that handles messaging but lacks buyer persona research and competitive positioning workflows |
| Below 60 | Incomplete | Missing fundamental practices | A demand gen agent without lead scoring or campaign attribution |

**Scoring Questions:**
- What are the 5-7 essential capabilities for this domain?
- Does the agent address each one?
- Are there obvious gaps a domain expert would immediately notice?

---

### Accuracy (25% weight)

**Question:** Is the guidance aligned with established best practices?

| Score | Label | Description | Example |
|-------|-------|-------------|---------|
| 90-100 | Best-in-Class | Fully aligned with best practices, incorporates cutting-edge approaches | A content strategy agent using the Topic Cluster methodology with AI-augmented research |
| 80-89 | Aligned | Aligned with best practices, minor deviations | A sales enablement agent following MEDDIC but missing explicit champion identification step |
| 70-79 | Generally Aligned | Generally aligned, some outdated or non-standard approaches | A competitive intel agent still using SWOT as primary framework instead of modern alternatives |
| 60-69 | Mixed | Several practices contradict expert guidance | A fact-checking agent treating Wikipedia as a primary source |
| Below 60 | Misaligned | Significant misalignment with industry standards | A messaging agent that leads with features instead of buyer outcomes |

**Scoring Questions:**
- Do the recommended practices match what industry experts recommend?
- Are there any "anti-patterns" present?
- Would a domain expert approve of the methodology?

---

### Depth (20% weight)

**Question:** Is the guidance specific and actionable, not generic?

| Score | Label | Description | Example |
|-------|-------|-------------|---------|
| 90-100 | Expert-Level | Highly specific, context-aware, includes decision frameworks | A positioning workflow that provides specific questions to ask, shows how to evaluate answers, and includes decision tree for different scenarios |
| 80-89 | Actionable | Specific and actionable, good templates | A battlecard workflow with detailed template, example language, and clear completion criteria |
| 70-79 | Moderate | Reasonable specificity, some areas too generic | A content brief workflow that says "identify target audience" without specifying how |
| 60-69 | Generic | Often generic, lacks concrete guidance | A campaign planning workflow that lists steps without explaining how to execute them |
| Below 60 | Vague | Vague, could apply to any domain | A workflow that says "research the topic" without defining what good research looks like |

**Scoring Questions:**
- Could someone unfamiliar with the domain follow this guidance?
- Are there specific examples, templates, or decision criteria?
- Does it answer "how" or just "what"?

---

### Currency (15% weight)

**Question:** Does it reflect current and emerging practices?

| Score | Label | Description | Example |
|-------|-------|-------------|---------|
| 90-100 | Forward-Looking | Incorporates latest developments, anticipates trends | A content workflow that integrates AI-assisted research and addresses E-E-A-T requirements |
| 80-89 | Current | Reflects current best practices | A competitive intel workflow using modern CI tools and frameworks from 2023-2024 |
| 70-79 | Mostly Current | Mostly current, some outdated elements | A social media workflow missing short-form video strategy |
| 60-69 | Dated | Several outdated practices | A lead gen workflow focused on gated content without considering modern ungated approaches |
| Below 60 | Obsolete | Based on obsolete approaches | An SEO workflow focused on keyword density and link farms |

**Scoring Questions:**
- When was this approach popular?
- Have better alternatives emerged in the last 2-3 years?
- Would this be considered current practice at leading companies?

---

### Structure (15% weight)

**Question:** Is it well-organized with clear workflow and good templates?

| Score | Label | Description | Example |
|-------|-------|-------------|---------|
| 90-100 | Excellent | Excellent organization, comprehensive templates, clear flow, effective validation gates | A workflow with numbered steps, decision points, comprehensive output template, and clear quality checkpoints |
| 80-89 | Good | Well-organized, good templates | A workflow with clear steps and useful output template |
| 70-79 | Adequate | Reasonable organization, some template gaps | A workflow with clear steps but incomplete output template |
| 60-69 | Weak | Confusing structure or weak templates | A workflow with unclear step ordering or minimal output guidance |
| Below 60 | Poor | Disorganized, missing templates | A workflow that's difficult to follow with no structured output |

**Scoring Questions:**
- Is the workflow easy to follow step-by-step?
- Are templates comprehensive and usable?
- Are there clear quality gates and validation points?

---

## Overall Score Calculation

```
Overall = (Completeness × 0.25) + (Accuracy × 0.25) + (Depth × 0.20) + (Currency × 0.15) + (Structure × 0.15)
```

### Example Calculation

| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| Completeness | 75 | 0.25 | 18.75 |
| Accuracy | 82 | 0.25 | 20.50 |
| Depth | 70 | 0.20 | 14.00 |
| Currency | 68 | 0.15 | 10.20 |
| Structure | 80 | 0.15 | 12.00 |
| **Overall** | | | **75.45** |

---

## Score Interpretation

| Range | Label | Action Required |
|-------|-------|-----------------|
| 90-100 | World-class | Minimal improvements; maintain and monitor |
| 80-89 | Strong | Address minor gaps; consider enhancements |
| 70-79 | Good | Address notable gaps before heavy use |
| 60-69 | Adequate | Significant revision recommended |
| Below 60 | Needs work | Major revision required before use |

---

## Scoring Best Practices

### Do:
- Score each category independently before calculating overall
- Reference specific sources when justifying scores
- Be consistent across audits (use this rubric)
- Note specific evidence for scores in the report

### Don't:
- Let one exceptional area compensate for fundamental gaps
- Round up without justification
- Score based on intent rather than actual content
- Compare to a theoretical perfect agent instead of industry standards

---

## Calibration Examples

### Example 1: PMM Agent Audit

**Context:** Agent for B2B SaaS Product Marketing

| Category | Score | Justification |
|----------|-------|---------------|
| Completeness | 78 | Covers messaging, positioning, battlecards. Missing buyer persona research workflow and customer evidence collection. |
| Accuracy | 85 | Positioning framework aligns with April Dunford methodology. Minor deviation in competitive analysis approach. |
| Depth | 72 | Messaging workflow provides good template but lacks decision criteria for message selection. |
| Currency | 80 | Reflects modern B2B practices. Could incorporate AI-assisted research trends. |
| Structure | 82 | Clear workflows with good templates. Missing validation gates between steps. |
| **Overall** | **79** | Good - notable gaps but solid foundation |

### Example 2: Fact-Checking Workflow Audit

**Context:** `/fact-check` workflow in a Critic agent

| Category | Score | Justification |
|----------|-------|---------------|
| Completeness | 68 | Missing source triangulation requirement, no AI content detection, no confidence levels. |
| Accuracy | 80 | Aligns with AP Fact Check principles. Deviates from IFCN multi-source requirements. |
| Depth | 70 | Good verification steps but needs source type hierarchy guidance. |
| Currency | 65 | Missing AI-generated content considerations. Fact-checking has evolved significantly. |
| Structure | 78 | Clear template, good step ordering. Missing priority ranking in output. |
| **Overall** | **72** | Good - notable gaps requiring attention before critical use |
