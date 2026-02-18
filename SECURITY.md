# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in Agent Auditor, please report it responsibly:

1. **Do NOT open a public GitHub issue** for security vulnerabilities
2. **Email:** Send details to the maintainer via GitHub's private vulnerability reporting
3. **Or:** Use [GitHub's Security Advisory feature](https://github.com/messinobili/agent-auditor/security/advisories/new)

### What to include in your report

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### What to expect

- **Acknowledgment:** Within 48 hours
- **Status update:** Within 7 days
- **Resolution timeline:** Depends on severity, typically within 30 days

### Scope

This security policy covers:
- The agent-auditor npm package
- The CLI installation tool
- The Reviewer agent specification

This policy does NOT cover:
- Third-party dependencies (report to those projects directly)
- User-generated audit reports
- External websites fetched during research

## Security Best Practices for Users

When using Agent Auditor:

1. **Review audit reports** before sharing externally (may contain competitive intelligence)
2. **Never commit** `.env` files or API keys to your repository
3. **Keep dependencies updated** with `npm audit` and `npm update`
4. **Be cautious** when auditing packages from untrusted sources

## Acknowledgments

We appreciate responsible disclosure and will acknowledge security researchers who report valid vulnerabilities.
