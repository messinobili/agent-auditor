# Agent Auditor

A meta-research agent that audits AI agent packages against industry best practices.

[![npm version](https://img.shields.io/npm/v/agent-auditor.svg)](https://www.npmjs.com/package/agent-auditor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

Agent Auditor provides a research agent (codename: **Reviewer**) that can:

1. **Research** - Crawl the internet for authoritative best practices on any domain topic
2. **Analyze** - Compare existing agent specifications against those practices
3. **Score** - Rate agents/workflows on a 0-100 scale using a weighted rubric
4. **Improve** - Provide actionable recommendations with clear rationale

## Features

- **Domain-agnostic** - Can audit any agent package (MARK Method, BMAD, custom agents)
- **Runtime depth selection** - Choose Standard (10-15 sources) or Deep-dive (20+ sources) per audit
- **Source credibility validation** - Validates and ranks sources by authority tier
- **Consistent scoring** - Uses weighted rubric (Completeness, Accuracy, Depth, Currency, Structure)
- **Actionable output** - Specific improvements with what, why, and how

## Installation

### Quick Start (Recommended)

```bash
npx agent-auditor
```

This will run the interactive installer in your current directory.

### Global Installation

```bash
npm install -g agent-auditor
agent-auditor install
```

### From GitHub

```bash
npx github:messinobili/agent-auditor
```

## Usage

After installation, you'll have access to three workflows:

### `/audit-agent` - Full Agent Audit

Analyze an entire agent specification against domain best practices.

```
/audit-agent ./path/to/package agent-name
```

**Example:**
```
/audit-agent ./mark-method critic
```

**Options:**
- `depth`: `standard` (default) or `deep`

### `/audit-workflow` - Workflow Deep-Dive

Analyze a single workflow within an agent.

```
/audit-workflow ./path/to/package agent-name workflow-name
```

**Example:**
```
/audit-workflow ./mark-method critic /fact-check
```

### `/research-topic` - Pure Research

Gather best practices on a topic without auditing.

```
/research-topic "topic description"
```

**Example:**
```
/research-topic "B2B product positioning frameworks"
```

## Scoring Rubric

| Category | Weight | Description |
|----------|--------|-------------|
| **Completeness** | 25% | Covers all essential aspects of the domain |
| **Accuracy** | 25% | Aligned with established best practices |
| **Depth** | 20% | Specific, actionable guidance (not generic) |
| **Currency** | 15% | Reflects current/emerging practices |
| **Structure** | 15% | Well-organized, clear workflow, good templates |

### Score Interpretation

| Range | Label | Meaning |
|-------|-------|---------|
| **90-100** | World-class | Minimal improvements needed; exceeds standards |
| **80-89** | Strong | Minor gaps to address; meets standards |
| **70-79** | Good | Notable gaps but solid foundation |
| **60-69** | Adequate | Significant improvement opportunities |
| **<60** | Needs work | Major gaps or outdated practices |

## Source Credibility Tiers

The Reviewer validates sources using a credibility hierarchy:

| Tier | Source Type | Examples |
|------|-------------|----------|
| **Tier 1** | Industry standards | Gartner, Forrester, HBR, McKinsey |
| **Tier 2** | Expert practitioners | Conference speakers, thought leaders, books |
| **Tier 3** | Academic/research | Peer-reviewed papers, university research |
| **Tier 4** | Community knowledge | Stack Overflow, Reddit, dev blogs |

## Output

Audit reports are saved to your configured reports path (default: `audits/`):

```
audits/
├── agents/           # Full agent audit reports
├── workflows/        # Workflow-specific deep dives
└── research/         # Pure research briefs
```

## CLI Commands

```bash
# Install into current directory
npx agent-auditor install

# Check installation status
npx agent-auditor status

# Remove from current directory
npx agent-auditor uninstall
```

## Platforms Supported

- **Claude Code** - Anthropic's CLI assistant
- **Gemini CLI** - Google's CLI assistant
- Or both simultaneously

## Example Audit Output

```markdown
# Agent Audit Report: Quinn (Critic Agent)

**Overall Score: 71/100** (Good - notable gaps but solid foundation)

## Category Scores
| Category | Score | Notes |
|----------|-------|-------|
| Completeness | 68 | Missing source triangulation |
| Accuracy | 80 | Aligns with AP principles |
| Depth | 70 | Good steps but needs source hierarchy |
| Currency | 65 | Missing AI content considerations |
| Structure | 78 | Clear templates, needs priority ranking |

## Critical Gaps Identified

### Gap 1: No Source Triangulation (HIGH)
**Current:** Accepts single-source verification
**Best Practice:** Require 2+ independent sources
**Fix:** Add triangulation step requiring minimum 2 sources
...
```

## Requirements

- Node.js 18+
- Claude Code or Gemini CLI
- Internet access (for web research)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see [LICENSE](LICENSE) for details.
