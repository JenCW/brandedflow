/**
 * Tests for input validation and sanitization utilities
 */

import {
  sanitizeString,
  sanitizeName,
  sanitizePhone,
  sanitizeEmail,
  sanitizeNumeric,
  sanitizeCurrency,
  sanitizeAddress,
  sanitizeSSN,
  redactSSN,
  detectSQLInjection,
  detectXSS,
  validateInput,
  emailSchema,
  phoneSchema,
  nameSchema,
  creditScoreSchema,
  leadIntakeSchema,
} from '../validation'

describe('Sanitization Functions', () => {
  describe('sanitizeString', () => {
    it('should remove HTML tags', () => {
      expect(sanitizeString('<script>alert("xss")</script>Hello')).toBe('alert("xss")Hello')
      expect(sanitizeString('<b>Bold</b> text')).toBe('Bold text')
    })

    it('should remove script event handlers', () => {
      expect(sanitizeString('Hello onclick="evil()"')).toBe('Hello')
      expect(sanitizeString('Test onload="bad()" value')).toBe('Test value')
    })

    it('should remove javascript: protocols', () => {
      expect(sanitizeString('javascript:alert(1)')).toBe('alert(1)')
    })

    it('should normalize whitespace', () => {
      expect(sanitizeString('Hello    World')).toBe('Hello World')
      expect(sanitizeString('  Test  ')).toBe('Test')
    })
  })

  describe('sanitizeName', () => {
    it('should capitalize names properly', () => {
      expect(sanitizeName('john doe')).toBe('John Doe')
      expect(sanitizeName('MARY SMITH')).toBe('Mary Smith')
    })

    it('should preserve hyphens and apostrophes', () => {
      expect(sanitizeName("O'Brien")).toBe("O'brien")
      expect(sanitizeName('Mary-Jane')).toBe('Mary-jane')
    })

    it('should remove invalid characters', () => {
      expect(sanitizeName('John123 Doe')).toBe('John Doe')
      expect(sanitizeName('Test@Name')).toBe('Testname')
    })

    it('should normalize whitespace', () => {
      expect(sanitizeName('John   Doe')).toBe('John Doe')
    })
  })

  describe('sanitizePhone', () => {
    it('should format 10-digit phone numbers', () => {
      expect(sanitizePhone('5551234567')).toBe('(555) 123-4567')
      expect(sanitizePhone('555-123-4567')).toBe('(555) 123-4567')
      expect(sanitizePhone('(555) 123-4567')).toBe('(555) 123-4567')
    })

    it('should throw error for invalid phone numbers', () => {
      expect(() => sanitizePhone('123')).toThrow('Phone number must be 10 digits')
      expect(() => sanitizePhone('12345678901')).toThrow('Phone number must be 10 digits')
    })

    it('should handle phone numbers with extensions removed', () => {
      // Only first 10 digits should be used
      expect(() => sanitizePhone('555-123-4567 ext 123')).toThrow()
    })
  })

  describe('sanitizeEmail', () => {
    it('should convert to lowercase', () => {
      expect(sanitizeEmail('TEST@EXAMPLE.COM')).toBe('test@example.com')
      expect(sanitizeEmail('User@Example.Com')).toBe('user@example.com')
    })

    it('should trim whitespace', () => {
      expect(sanitizeEmail('  test@example.com  ')).toBe('test@example.com')
    })

    it('should remove HTML encoding', () => {
      expect(sanitizeEmail('test&#64;example.com')).toBe('testexample.com')
    })
  })

  describe('sanitizeNumeric', () => {
    it('should parse numeric strings', () => {
      expect(sanitizeNumeric('123')).toBe(123)
      expect(sanitizeNumeric('123.45')).toBe(123.45)
    })

    it('should handle numbers', () => {
      expect(sanitizeNumeric(123)).toBe(123)
      expect(sanitizeNumeric(123.45)).toBe(123.45)
    })

    it('should remove non-numeric characters', () => {
      expect(sanitizeNumeric('$1,234.56')).toBe(1234.56)
      expect(sanitizeNumeric('123abc')).toBe(123)
    })

    it('should throw error for invalid input', () => {
      expect(() => sanitizeNumeric('abc')).toThrow('Invalid numeric value')
    })
  })

  describe('sanitizeCurrency', () => {
    it('should parse currency strings', () => {
      expect(sanitizeCurrency('$1,234.56')).toBe(1234.56)
      expect(sanitizeCurrency('$500,000')).toBe(500000)
    })

    it('should handle numbers', () => {
      expect(sanitizeCurrency(1234.56)).toBe(1234.56)
    })
  })

  describe('sanitizeAddress', () => {
    it('should allow valid address characters', () => {
      expect(sanitizeAddress('123 Main St, Apt #4')).toBe('123 Main St, Apt #4')
      expect(sanitizeAddress('456 Oak Ave.')).toBe('456 Oak Ave.')
    })

    it('should remove invalid characters', () => {
      expect(sanitizeAddress('123 Main<script>alert(1)</script>')).toBe('123 Mainscriptalert1script')
    })

    it('should normalize whitespace', () => {
      expect(sanitizeAddress('123   Main   St')).toBe('123 Main St')
    })
  })

  describe('sanitizeSSN', () => {
    it('should format SSN correctly', () => {
      expect(sanitizeSSN('123456789')).toBe('123-45-6789')
      expect(sanitizeSSN('123-45-6789')).toBe('123-45-6789')
    })

    it('should throw error for invalid SSN', () => {
      expect(() => sanitizeSSN('12345')).toThrow('SSN must be 9 digits')
      expect(() => sanitizeSSN('1234567890')).toThrow('SSN must be 9 digits')
    })
  })

  describe('redactSSN', () => {
    it('should redact SSN showing only last 4 digits', () => {
      expect(redactSSN('123-45-6789')).toBe('***-**-6789')
      expect(redactSSN('123456789')).toBe('***-**-6789')
    })

    it('should handle invalid SSN', () => {
      expect(redactSSN('123')).toBe('***-**-****')
    })
  })
})

describe('Security Detection', () => {
  describe('detectSQLInjection', () => {
    it('should detect SQL keywords', () => {
      expect(detectSQLInjection('SELECT * FROM users')).toBe(true)
      expect(detectSQLInjection('DROP TABLE users')).toBe(true)
      expect(detectSQLInjection('INSERT INTO')).toBe(true)
    })

    it('should detect SQL injection patterns', () => {
      expect(detectSQLInjection("' OR '1'='1")).toBe(true)
      expect(detectSQLInjection('1=1--')).toBe(true)
      expect(detectSQLInjection('UNION SELECT')).toBe(true)
    })

    it('should not flag normal text', () => {
      expect(detectSQLInjection('John Doe')).toBe(false)
      expect(detectSQLInjection('test@example.com')).toBe(false)
    })
  })

  describe('detectXSS', () => {
    it('should detect script tags', () => {
      expect(detectXSS('<script>alert(1)</script>')).toBe(true)
      expect(detectXSS('<SCRIPT>bad()</SCRIPT>')).toBe(true)
    })

    it('should detect javascript: protocol', () => {
      expect(detectXSS('javascript:alert(1)')).toBe(true)
    })

    it('should detect event handlers', () => {
      expect(detectXSS('onclick="evil()"')).toBe(true)
      expect(detectXSS('onload="bad()"')).toBe(true)
    })

    it('should detect dangerous tags', () => {
      expect(detectXSS('<iframe src="evil"></iframe>')).toBe(true)
      expect(detectXSS('<object data="bad"></object>')).toBe(true)
    })

    it('should not flag normal text', () => {
      expect(detectXSS('Hello World')).toBe(false)
      expect(detectXSS('test@example.com')).toBe(false)
    })
  })

  describe('validateInput', () => {
    it('should throw error on SQL injection', () => {
      expect(() => validateInput('SELECT * FROM users', 'test')).toThrow(
        'Invalid test: suspicious content detected'
      )
    })

    it('should throw error on XSS', () => {
      expect(() => validateInput('<script>alert(1)</script>', 'test')).toThrow(
        'Invalid test: suspicious content detected'
      )
    })

    it('should allow clean input', () => {
      expect(validateInput('John Doe', 'name')).toBe('John Doe')
    })
  })
})

describe('Zod Schemas', () => {
  describe('emailSchema', () => {
    it('should validate correct emails', () => {
      expect(emailSchema.parse('test@example.com')).toBe('test@example.com')
      expect(emailSchema.parse('USER@EXAMPLE.COM')).toBe('user@example.com')
    })

    it('should reject invalid emails', () => {
      expect(() => emailSchema.parse('invalid')).toThrow()
      expect(() => emailSchema.parse('')).toThrow()
      expect(() => emailSchema.parse('test@')).toThrow()
    })
  })

  describe('phoneSchema', () => {
    it('should validate and format phone numbers', () => {
      expect(phoneSchema.parse('5551234567')).toBe('(555) 123-4567')
      expect(phoneSchema.parse('555-123-4567')).toBe('(555) 123-4567')
    })

    it('should reject invalid phone numbers', () => {
      expect(() => phoneSchema.parse('123')).toThrow()
      expect(() => phoneSchema.parse('abc')).toThrow()
    })
  })

  describe('nameSchema', () => {
    it('should validate and format names', () => {
      expect(nameSchema.parse('john doe')).toBe('John Doe')
      expect(nameSchema.parse("O'Brien")).toBe("O'brien")
    })

    it('should reject invalid names', () => {
      expect(() => nameSchema.parse('John123')).toThrow()
      expect(() => nameSchema.parse('')).toThrow()
    })
  })

  describe('creditScoreSchema', () => {
    it('should validate credit scores', () => {
      expect(creditScoreSchema.parse(750)).toBe(750)
      expect(creditScoreSchema.parse('750')).toBe(750)
    })

    it('should reject out-of-range scores', () => {
      expect(() => creditScoreSchema.parse(250)).toThrow()
      expect(() => creditScoreSchema.parse(900)).toThrow()
    })
  })

  describe('leadIntakeSchema', () => {
    it('should validate complete lead data', () => {
      const validLead = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '5551234567',
        timeline: 'asap' as const,
        loanAmount: '500000',
        creditScore: 750,
      }

      const result = leadIntakeSchema.parse(validLead)
      expect(result.email).toBe('test@example.com')
      expect(result.firstName).toBe('John')
      expect(result.phone).toBe('(555) 123-4567')
    })

    it('should require email', () => {
      expect(() => leadIntakeSchema.parse({})).toThrow()
    })

    it('should sanitize message field', () => {
      const lead = {
        email: 'test@example.com',
        message: '<script>alert(1)</script>Hello',
      }

      const result = leadIntakeSchema.parse(lead)
      expect(result.message).toBe('alert(1)Hello')
    })

    it('should validate timeline enum', () => {
      const lead = {
        email: 'test@example.com',
        timeline: 'invalid' as any,
      }

      expect(() => leadIntakeSchema.parse(lead)).toThrow()
    })
  })
})
