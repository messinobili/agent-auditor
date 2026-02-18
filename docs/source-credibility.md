# Source Credibility Assessment Guide

This document provides guidance for evaluating and ranking sources during agent audits.

## Source Credibility Tiers

### Tier 1: Industry Standards (Highest Credibility)

These sources represent established authority in their domains.

**Characteristics:**
- Published by recognized industry bodies or analyst firms
- Methodology is transparent and rigorous
- Widely cited by practitioners
- Updated regularly

**Examples:**
| Domain | Sources |
|--------|---------|
| Business/Strategy | Harvard Business Review, McKinsey Quarterly, BCG Insights, MIT Sloan |
| Technology | Gartner, Forrester, IDC, Thoughtworks Tech Radar |
| Marketing | MarketingProfs, AMA (American Marketing Association), CMI (Content Marketing Institute) |
| Sales | Gartner Sales, Forrester Sales |
| Compliance/Risk | ISACA, COSO, IIA (Institute of Internal Auditors) |
| Standards | ISO, NIST, IEEE |

**Weight in research:** 40-50% of sources should be Tier 1 for Standard depth

---

### Tier 2: Expert Practitioners

These sources represent proven expertise from experienced practitioners.

**Characteristics:**
- Author has verifiable track record in the domain
- Published through credible channels (major publications, conferences)
- Practical, experience-based guidance
- Often authors of recognized books

**Examples:**
| Domain | Sources/Authors |
|--------|-----------------|
| Product Marketing | April Dunford (positioning), Marty Cagan (product), Andy Raskin (narrative) |
| Sales | Jeb Blount, Matt Dixon, Aaron Ross, Brent Adamson |
| Content | Ann Handley, Joe Pulizzi, Robert Rose |
| Competitive Intel | Leonard Fuld, Ben Gilad, Craig Fleisher |
| B2B Marketing | Dave Gerhardt, Chris Walker, Sangram Vajre |

**Verification Questions:**
- What is the author's professional background?
- Have they worked at companies known for excellence in this area?
- Is their work cited by others in the field?
- Do they speak at major industry conferences?

**Weight in research:** 30-40% of sources should be Tier 2

---

### Tier 3: Academic/Research

These sources provide research-backed evidence and theoretical foundations.

**Characteristics:**
- Peer-reviewed or published by academic institutions
- Methodology is documented and replicable
- May be more theoretical than practical
- Often foundational for Tier 1 and Tier 2 guidance

**Examples:**
| Domain | Sources |
|--------|---------|
| Business | Journal of Marketing, Harvard Business School cases, Stanford GSB |
| Journalism/Fact-checking | Poynter Institute, Reuters Institute, Columbia Journalism Review |
| Decision Science | Behavioral economics journals, cognitive science research |
| Technology | ACM Digital Library, IEEE Xplore |

**When to include:**
- Deep-dive audits (required)
- When challenging established practices
- When looking for foundational frameworks
- When Tier 1/2 sources conflict

**Weight in research:** 10-20% for Standard, 20-30% for Deep-dive

---

### Tier 4: Community Knowledge

These sources represent collective practitioner wisdom.

**Characteristics:**
- Community-generated content
- Variable quality (requires more validation)
- Often most current information
- Good for practical implementation details

**Examples:**
| Domain | Sources |
|--------|---------|
| Technical | Stack Overflow, GitHub discussions, Dev.to |
| Marketing | GrowthHackers, Inbound.org, Marketing Twitter/X |
| Product | ProductHunt, Product School community |
| General | Reddit professional communities, LinkedIn thought leadership |

**Validation Required:**
- Check author credentials when possible
- Look for corroboration from higher-tier sources
- Prioritize highly upvoted/engaged content
- Be skeptical of promotional content

**Weight in research:** 10-15% maximum

---

## Source Validation Checklist

For each source included in an audit, verify:

### Authorship (Who)
- [ ] Author/organization is identifiable
- [ ] Author has relevant domain expertise
- [ ] No obvious conflicts of interest
- [ ] Track record of credible work

### Recency (When)
- [ ] Publication date is known
- [ ] Content is current for the domain (varies by domain)
- [ ] No superseding developments since publication

**Recency Guidelines by Domain:**
| Domain | "Current" Threshold |
|--------|---------------------|
| Technology/AI | 6-12 months |
| Marketing practices | 1-2 years |
| Business strategy | 2-3 years |
| Foundational frameworks | 5+ years (if still cited) |

### Corroboration (Validation)
- [ ] Key claims supported by other sources
- [ ] No contradicting evidence from higher-tier sources
- [ ] If unique claim, clearly noted as single-source

### Methodology (How)
- [ ] For research/data, methodology is explained
- [ ] Sample sizes are reasonable
- [ ] Conclusions match the evidence presented
- [ ] Limitations are acknowledged

### Bias Assessment (Why)
- [ ] Commercial motivations identified (vendor content)
- [ ] Ideological positions noted
- [ ] Content is balanced or bias is disclosed

---

## Bias Red Flags

Watch for these indicators of potential bias:

### Vendor/Commercial Bias
- Content published by a company selling related products
- Heavy product promotion disguised as thought leadership
- Methodology designed to favor the publisher's offering
- Missing comparison to alternatives

**How to handle:** Use for data/features only, not methodology. Corroborate claims independently.

### Recency Bias
- Declaring practices "dead" without evidence
- Promoting "new" approaches without comparing to proven methods
- Ignoring foundational principles in favor of trends

**How to handle:** Look for corroboration from established practitioners. Check if "new" approach is truly better or just different.

### Survivor Bias
- Case studies only from successful companies
- Ignoring companies that used same approach and failed
- Attribution of success to single factor

**How to handle:** Look for failure mode discussions. Check for longitudinal studies.

### Authority Bias
- Over-reliance on famous names without substance
- Appeals to authority without supporting evidence
- Assuming large company practices are best practices

**How to handle:** Evaluate the guidance on its merits, not just the source's reputation.

---

## Source Documentation Format

When documenting sources in audit reports:

### Tier 1 Example
```
1. "The New Rules of Marketing and PR" - McKinsey Quarterly (2024)
   Tier: 1 | Credibility: High
   Relevance: Foundational framework for modern marketing practices
   URL: [link]
```

### Tier 2 Example
```
2. "Obviously Awesome" - April Dunford (2019, updated 2023)
   Tier: 2 | Credibility: High
   Relevance: Definitive B2B positioning methodology
   Author credentials: Former VP Marketing at multiple successful B2B companies
   URL: [link]
```

### Tier 3 Example
```
3. "The Science of Fact-Checking" - Harvard Kennedy School (2022)
   Tier: 3 | Credibility: High (peer-reviewed)
   Relevance: Research on fact-checking effectiveness and methodology
   Methodology: Randomized controlled study, n=2,500
   URL: [link]
```

### Tier 4 Example
```
4. "How we do competitive intelligence at [Company]" - Reddit r/ProductMarketing (2024)
   Tier: 4 | Credibility: Moderate (verified practitioner)
   Relevance: Practical implementation example
   Corroboration: Aligns with Tier 2 source #2
   URL: [link]
```

---

## Research Query Strategies by Tier

### Tier 1 Queries
- `"[topic] best practices" site:hbr.org`
- `"[topic]" Gartner report`
- `"[topic] framework" McKinsey`
- `"[topic]" Forrester research`

### Tier 2 Queries
- `"[topic]" "[known expert name]"`
- `"[topic]" conference keynote`
- `"[topic]" book author`
- `best "[topic]" practitioners`

### Tier 3 Queries
- `"[topic]" research study`
- `"[topic]" peer-reviewed`
- `"[topic]" academic paper`
- `"[topic]" journal article`

### Tier 4 Queries
- `"[topic]" how we do it`
- `"[topic]" implementation guide`
- `"[topic]" real example`

---

## Minimum Source Requirements

### Standard Audit (10-15 sources)
- Tier 1: 4-6 sources (minimum 4)
- Tier 2: 4-6 sources (minimum 3)
- Tier 3: 0-2 sources (optional)
- Tier 4: 1-2 sources (optional)

### Deep-Dive Audit (20+ sources)
- Tier 1: 6-8 sources (minimum 6)
- Tier 2: 6-8 sources (minimum 5)
- Tier 3: 4-6 sources (minimum 4)
- Tier 4: 2-4 sources (optional)
