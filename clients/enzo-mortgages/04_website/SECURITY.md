# Security Guide - Enzo Mortgages Website

## 🔒 Security Improvements Implemented

### ✅ Completed Security Enhancements

#### 1. Rate Limiting (Protection Against Abuse)
**Status:** ✅ Implemented

All API endpoints are protected with IP-based rate limiting:
- **Lead Submission API:** 5 requests/minute per IP
- Automatic cleanup to prevent memory leaks
- Standard HTTP rate limit headers
- Proxy-aware (Cloudflare, x-forwarded-for)

**Files:**
- [`app/api/lib/rate-limit.ts`](app/api/lib/rate-limit.ts) - Rate limiting middleware
- [`app/api/lead/intake/route.ts`](app/api/lead/intake/route.ts) - Protected endpoint

**Protection Against:**
- ✅ Spam/bot submissions
- ✅ Brute force attacks
- ✅ DoS (Denial of Service)
- ✅ API abuse

---

#### 2. Input Validation & Sanitization
**Status:** ✅ Implemented + **50 tests passing**

Comprehensive validation for all user inputs:
- XSS (Cross-Site Scripting) prevention
- SQL Injection detection
- Input sanitization (HTML/script tag removal)
- Format validation (email, phone, SSN, etc.)
- Type safety with Zod schemas

**Files:**
- [`app/lib/validation.ts`](app/lib/validation.ts) - Validation utilities
- [`app/lib/__tests__/validation.test.ts`](app/lib/__tests__/validation.test.ts) - 50 comprehensive tests

**What's Validated:**
- ✅ Email addresses (format + sanitization)
- ✅ Phone numbers (10-digit US format)
- ✅ Names (alphanumeric + hyphens/apostrophes)
- ✅ Addresses (safe characters only)
- ✅ Numeric values (currency, credit scores)
- ✅ SSN (format validation + redaction)
- ✅ Text fields (XSS/SQL injection detection)

**Protection Against:**
- ✅ XSS attacks
- ✅ SQL injection
- ✅ Malformed data
- ✅ Buffer overflow
- ✅ Type coercion attacks

---

### 🔄 Recommended Additional Security Measures

#### 3. CSRF Protection
**Status:** ⏳ Not Yet Implemented
**Priority:** HIGH
**Estimated Time:** 2-3 hours

**What is CSRF?**
Cross-Site Request Forgery allows attackers to submit forms on behalf of authenticated users.

**How to Implement:**
```bash
npm install csrf
```

**Implementation Example:**
```typescript
// middleware.ts
import { csrf } from 'csrf'

export async function middleware(request: NextRequest) {
  if (request.method === 'POST') {
    const csrfToken = request.headers.get('x-csrf-token')
    if (!csrf.verify(csrfToken)) {
      return new NextResponse('Invalid CSRF token', { status: 403 })
    }
  }
}
```

---

#### 4. Security Headers
**Status:** ⏳ Not Yet Implemented
**Priority:** HIGH
**Estimated Time:** 1 hour

**Recommended Headers:**
```typescript
// next.config.mjs
export default {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY', // Prevent clickjacking
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', // Prevent MIME sniffing
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://api.airtable.com",
            ].join('; '),
          },
        ],
      },
    ]
  },
}
```

---

#### 5. PII (Personally Identifiable Information) Handling
**Status:** ⏳ Needs Audit
**Priority:** CRITICAL
**Estimated Time:** 1 day

**Current PII Collected:**
- Email addresses
- Phone numbers
- Names
- Addresses
- Income information
- Credit scores
- SSN (if collected - currently not)

**Best Practices:**

1. **Data Minimization**
   - Only collect what's absolutely necessary
   - Don't ask for SSN unless required by law

2. **Encryption**
   - Encrypt sensitive data at rest
   - Use HTTPS for all transmission (already done)
   - Never log sensitive information

3. **Access Control**
   - Limit who can access PII in Airtable
   - Use role-based access control
   - Audit access logs regularly

4. **Retention Policy**
   - Delete old leads after reasonable time period
   - Document retention policy in Privacy Policy
   - Provide data deletion mechanism

5. **Redaction**
   ```typescript
   // Use redaction for logging
   console.log('Lead created:', {
     email: redactEmail(email), // j***@example.com
     phone: redactPhone(phone), // (***) ***-4567
     ssn: redactSSN(ssn),       // ***-**-6789
   })
   ```

---

#### 6. Honeypot Fields (Bot Detection)
**Status:** ⏳ Not Yet Implemented
**Priority:** MEDIUM
**Estimated Time:** 2 hours

**What are Honeypots?**
Hidden form fields that humans can't see but bots will fill out.

**Implementation:**
```tsx
// Add to ApplyForm.tsx
<input
  type="text"
  name="website" // Bots often fill this
  style={{ display: 'none' }}
  tabIndex={-1}
  autoComplete="off"
/>
```

**Server-side validation:**
```typescript
// In API route
if (body.website) {
  // Honeypot triggered - likely a bot
  console.warn('Bot detected via honeypot')
  return NextResponse.json({ success: false }, { status: 400 })
}
```

---

## 🛡️ Security Testing Checklist

### Manual Testing

- [ ] **XSS Testing**
  ```
  Try submitting: <script>alert('xss')</script>
  Expected: Should be sanitized/rejected
  ```

- [ ] **SQL Injection Testing**
  ```
  Try submitting: ' OR '1'='1
  Expected: Should be detected and rejected
  ```

- [ ] **Rate Limit Testing**
  ```
  Submit form 6 times in 1 minute
  Expected: 6th request should return 429 error
  ```

- [ ] **Phone Format Testing**
  ```
  Try: 123, 12345678901, abc-def-ghij
  Expected: Should reject invalid formats
  ```

- [ ] **Email Validation**
  ```
  Try: invalid@, @example.com, test
  Expected: Should reject malformed emails
  ```

### Automated Testing

Run security tests:
```bash
npm test -- --testPathPatterns=validation
```

**Current Status:**
- ✅ 50/50 validation tests passing
- ✅ 49/49 qualification tests passing
- ✅ 99/99 total tests passing

---

## 🚨 Security Incident Response

### If You Detect Suspicious Activity

1. **Immediate Actions:**
   - Review API logs for patterns
   - Check Airtable for suspicious leads
   - Temporarily increase rate limits if needed

2. **Investigation:**
   - Identify attack vector
   - Document what happened
   - Assess data breach scope

3. **Mitigation:**
   - Block attacking IPs (if identified)
   - Patch vulnerability
   - Update validation rules

4. **Notification:**
   - Notify users if PII was accessed
   - Report to relevant authorities if required
   - Update security documentation

### Monitoring for Attacks

**Red Flags:**
- Multiple 429 (rate limit) responses from same IP
- Repeated validation errors from same source
- Honeypot field submissions
- SQL/XSS patterns in logs
- Unusual traffic spikes

**Logging:**
```typescript
// Already implemented in validation.ts
console.warn('Potential SQL injection detected:', input)
console.warn('Potential XSS detected:', input)
console.error('Security validation failed:', error)
```

---

## 📋 Security Compliance

### OWASP Top 10 (2021) Coverage

| Risk | Status | Protection |
|------|--------|------------|
| A01: Broken Access Control | ⏳ Partial | Rate limiting implemented, CSRF needed |
| A02: Cryptographic Failures | ⏳ Review | HTTPS only, PII encryption needed |
| A03: Injection | ✅ Protected | Input validation + sanitization |
| A04: Insecure Design | ✅ Good | Security-first architecture |
| A05: Security Misconfiguration | ⏳ Partial | Need security headers |
| A06: Vulnerable Components | ✅ Monitored | Regular `npm audit` |
| A07: Authentication Failures | N/A | No authentication system |
| A08: Software/Data Integrity | ✅ Good | Type safety, validation |
| A09: Logging Failures | ⏳ Partial | Basic logging, need SIEM |
| A10: SSRF | ✅ Protected | No user-controlled URLs |

### Data Protection Regulations

**GDPR (if serving EU customers):**
- [ ] Privacy Policy updated with data collection details
- [ ] Cookie consent banner (if using cookies)
- [ ] Data deletion mechanism
- [ ] Data export mechanism
- [ ] Consent management for marketing

**CCPA (California customers):**
- [ ] Privacy Policy with "Do Not Sell" option
- [ ] Data deletion request process
- [ ] Disclosure of data sharing practices

**GLBA (Financial Services):**
- ⚠️ **IMPORTANT**: As a mortgage business, you may be subject to GLBA
- [ ] Implement encryption for financial data
- [ ] Annual security audit
- [ ] Customer privacy notices
- [ ] Data breach notification procedures

---

## 🔐 Encryption Recommendations

### Data in Transit
- ✅ HTTPS enforced (Netlify)
- ✅ TLS 1.3 recommended

### Data at Rest
- ⏳ Encrypt sensitive fields in Airtable
- ⏳ Use field-level encryption for SSN/income if stored

**Implementation Example:**
```typescript
import crypto from 'crypto'

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY // 32-byte key

function encrypt(text: string): string {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv)
  let encrypted = cipher.update(text)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return iv.toString('hex') + ':' + encrypted.toString('hex')
}

function decrypt(text: string): string {
  const parts = text.split(':')
  const iv = Buffer.from(parts.shift()!, 'hex')
  const encryptedText = Buffer.from(parts.join(':'), 'hex')
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv)
  let decrypted = decipher.update(encryptedText)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}
```

---

## 🎯 Security Roadmap

### Immediate (This Week)
- [x] Input validation & sanitization
- [x] Rate limiting
- [ ] Security headers configuration
- [ ] PII handling audit

### Short-term (This Month)
- [ ] CSRF protection implementation
- [ ] Honeypot fields in all forms
- [ ] Security logging enhancement
- [ ] Penetration testing

### Long-term (This Quarter)
- [ ] Security audit by third party
- [ ] SIEM (Security Information and Event Management) integration
- [ ] Automated security scanning in CI/CD
- [ ] Bug bounty program consideration

---

## 📚 Resources & References

### Security Tools
- [OWASP ZAP](https://www.zaproxy.org/) - Security testing
- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit) - Dependency vulnerabilities
- [Snyk](https://snyk.io/) - Continuous security monitoring

### Security Best Practices
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE Top 25](https://cwe.mitre.org/top25/)
- [Next.js Security Headers](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)

### Compliance
- [GDPR Compliance](https://gdpr.eu/)
- [CCPA Compliance](https://oag.ca.gov/privacy/ccpa)
- [GLBA Requirements](https://www.ftc.gov/business-guidance/privacy-security/gramm-leach-bliley-act)

---

## ✅ Security Checklist Summary

### Currently Protected ✅
- [x] Rate limiting (DoS protection)
- [x] Input validation (XSS/SQL injection)
- [x] Input sanitization (HTML tag removal)
- [x] Phone number formatting
- [x] Email validation
- [x] Numeric validation
- [x] Security pattern detection
- [x] HTTPS enforcement

### Needs Implementation ⏳
- [ ] CSRF tokens
- [ ] Security headers (CSP, X-Frame-Options, etc.)
- [ ] Honeypot fields
- [ ] PII encryption at rest
- [ ] Comprehensive audit logging
- [ ] Automated security scanning
- [ ] Third-party security audit

### Recommended Monitoring 📊
- [ ] Set up error tracking (Sentry)
- [ ] Monitor rate limit violations
- [ ] Track validation failures
- [ ] Alert on suspicious patterns
- [ ] Regular dependency audits

---

**Last Updated:** 2026-01-09
**Security Level:** GOOD (Significant protections in place)
**Next Review:** 2026-02-09 (Monthly review recommended)
