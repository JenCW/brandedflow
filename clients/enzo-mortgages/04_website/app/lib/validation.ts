/**
 * Input Validation & Sanitization Utilities
 *
 * Provides security-focused validation and sanitization for user inputs.
 * Protects against XSS, injection attacks, and malformed data.
 */

import { z } from 'zod'

/**
 * Sanitize string input to prevent XSS attacks
 * Removes potentially dangerous HTML/script tags and attributes
 */
export function sanitizeString(input: string): string {
  if (!input) return ''

  return input
    .trim()
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove script event handlers
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    // Remove javascript: protocols
    .replace(/javascript:/gi, '')
    // Remove data: protocols (can be used for XSS)
    .replace(/data:text\/html/gi, '')
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Sanitize name fields (first name, last name)
 * Allows letters, spaces, hyphens, apostrophes
 */
export function sanitizeName(name: string): string {
  if (!name) return ''

  return name
    .trim()
    // Keep only valid name characters
    .replace(/[^a-zA-Z\s\-']/g, '')
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    // Capitalize properly
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
    .trim()
}

/**
 * Sanitize and format phone number
 * Accepts various formats, outputs (XXX) XXX-XXXX
 */
export function sanitizePhone(phone: string): string {
  if (!phone) return ''

  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '')

  // Must be 10 digits (US phone numbers)
  if (digits.length !== 10) {
    throw new Error('Phone number must be 10 digits')
  }

  // Format as (XXX) XXX-XXXX
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

/**
 * Sanitize email address
 * Converts to lowercase, trims whitespace
 */
export function sanitizeEmail(email: string): string {
  if (!email) return ''

  return email
    .trim()
    .toLowerCase()
    // Remove any HTML encoding
    .replace(/&[#\w]+;/g, '')
}

/**
 * Sanitize numeric input
 * Removes non-numeric characters, preserves decimal point
 */
export function sanitizeNumeric(input: string | number): number {
  if (typeof input === 'number') return input

  const cleaned = input.replace(/[^0-9.]/g, '')
  const number = parseFloat(cleaned)

  if (isNaN(number)) {
    throw new Error('Invalid numeric value')
  }

  return number
}

/**
 * Sanitize currency input
 * Parses $1,234.56 format to 1234.56
 */
export function sanitizeCurrency(input: string | number): number {
  if (typeof input === 'number') return input

  const cleaned = input.replace(/[$,]/g, '')
  return sanitizeNumeric(cleaned)
}

/**
 * Sanitize address input
 * Allows alphanumeric, spaces, commas, periods, hyphens
 */
export function sanitizeAddress(address: string): string {
  if (!address) return ''

  return address
    .trim()
    // Keep only valid address characters
    .replace(/[^a-zA-Z0-9\s,.\-#]/g, '')
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Validate SSN format (if needed)
 * Returns sanitized XXX-XX-XXXX format
 * NOTE: Store SSNs encrypted, never in plain text!
 */
export function sanitizeSSN(ssn: string): string {
  if (!ssn) return ''

  // Remove all non-digit characters
  const digits = ssn.replace(/\D/g, '')

  if (digits.length !== 9) {
    throw new Error('SSN must be 9 digits')
  }

  // Format as XXX-XX-XXXX
  return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`
}

/**
 * Redact SSN for display/logging
 * Shows only last 4 digits: ***-**-1234
 */
export function redactSSN(ssn: string): string {
  const cleaned = ssn.replace(/\D/g, '')
  if (cleaned.length !== 9) return '***-**-****'
  return `***-**-${cleaned.slice(5)}`
}

/**
 * Detect potential SQL injection patterns
 * Returns true if suspicious patterns found
 */
export function detectSQLInjection(input: string): boolean {
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/i,
    /(--|;|\/\*|\*\/|xp_|sp_)/i,
    /(\bOR\b.*=.*|1\s*=\s*1|'\s*OR\s*'1'\s*=\s*'1)/i,
    /(\bUNION\b.*\bSELECT\b)/i,
  ]

  return sqlPatterns.some(pattern => pattern.test(input))
}

/**
 * Detect potential XSS patterns
 * Returns true if suspicious patterns found
 */
export function detectXSS(input: string): boolean {
  const xssPatterns = [
    /<script\b[^>]*>/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /<iframe\b[^>]*>/i,
    /eval\s*\(/i,
    /<object\b[^>]*>/i,
    /<embed\b[^>]*>/i,
  ]

  return xssPatterns.some(pattern => pattern.test(input))
}

/**
 * Comprehensive input validation
 * Throws error if suspicious patterns detected
 */
export function validateInput(input: string, fieldName: string = 'Input'): string {
  if (!input) return ''

  if (detectSQLInjection(input)) {
    console.warn(`Potential SQL injection detected in ${fieldName}:`, input)
    throw new Error(`Invalid ${fieldName}: suspicious content detected`)
  }

  if (detectXSS(input)) {
    console.warn(`Potential XSS detected in ${fieldName}:`, input)
    throw new Error(`Invalid ${fieldName}: suspicious content detected`)
  }

  return input
}

// ============================================================================
// Zod Validation Schemas
// ============================================================================

/**
 * Email validation schema
 */
export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Invalid email address')
  .max(255, 'Email is too long')
  .transform(sanitizeEmail)

/**
 * Phone validation schema
 */
export const phoneSchema = z
  .string()
  .min(10, 'Phone number must be at least 10 digits')
  .max(20, 'Phone number is too long')
  .transform(phone => {
    try {
      return sanitizePhone(phone)
    } catch (error) {
      throw new z.ZodError([
        {
          code: 'custom',
          message: 'Invalid phone number format',
          path: [],
        },
      ])
    }
  })

/**
 * Name validation schema
 */
export const nameSchema = z
  .string()
  .min(1, 'Name is required')
  .max(50, 'Name is too long')
  .regex(/^[a-zA-Z\s\-']+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes')
  .transform(sanitizeName)

/**
 * Address validation schema
 */
export const addressSchema = z
  .string()
  .min(5, 'Address must be at least 5 characters')
  .max(200, 'Address is too long')
  .transform(sanitizeAddress)

/**
 * Currency/numeric validation schema
 */
export const currencySchema = z
  .union([z.string(), z.number()])
  .transform(sanitizeCurrency)
  .refine(val => val >= 0, 'Amount must be positive')
  .refine(val => val <= 100000000, 'Amount exceeds maximum')

/**
 * Credit score validation schema
 */
export const creditScoreSchema = z
  .union([z.string(), z.number()])
  .transform(val => (typeof val === 'string' ? sanitizeNumeric(val) : val))
  .refine(val => val >= 300, 'Credit score must be at least 300')
  .refine(val => val <= 850, 'Credit score cannot exceed 850')

/**
 * SSN validation schema (use only if necessary)
 */
export const ssnSchema = z
  .string()
  .regex(/^\d{3}-?\d{2}-?\d{4}$/, 'Invalid SSN format')
  .transform(sanitizeSSN)

/**
 * Timeline validation schema
 */
export const timelineSchema = z.enum([
  'asap',
  '1-3months',
  '3-6months',
  '6plus',
  'exploring',
])

/**
 * Lead type validation schema
 */
export const leadTypeSchema = z.enum([
  'Purchase',
  'Refinance',
  'Home Purchase',
  'Cash-Out Refinance',
])

/**
 * Property type validation schema
 */
export const propertyTypeSchema = z.enum([
  'Primary Residence',
  'Secondary Home',
  'Investment Property',
  'Owner Occupied',
  'Rental',
])

/**
 * Complete lead intake validation schema
 */
export const leadIntakeSchema = z.object({
  // Required fields
  email: emailSchema,

  // Personal information
  firstName: nameSchema.optional(),
  lastName: nameSchema.optional(),
  name: z.string().optional(), // Legacy support
  phone: phoneSchema.optional(),
  address: addressSchema.optional(),

  // Lead details
  leadType: leadTypeSchema.optional(),
  loanType: z.string().max(50).optional(),
  source: z.string().max(100).optional(),
  timeline: timelineSchema.optional(),
  urgency: z.string().max(20).optional(),

  // Financial information
  loanAmount: currencySchema.optional(),
  purchasePrice: currencySchema.optional(),
  homeValue: currencySchema.optional(),
  loanBalance: currencySchema.optional(),
  downPayment: currencySchema.optional(),
  creditScore: creditScoreSchema.optional(),
  income: currencySchema.optional(),
  currentRate: z.number().min(0).max(20).optional(),

  // Property details
  propertyType: propertyTypeSchema.optional(),
  propertyValue: currencySchema.optional(),

  // Additional information
  state: z.string().length(2).optional(), // Two-letter state code
  refinanceGoal: z.string().max(200).optional(),
  message: z.string().max(1000).transform(sanitizeString).optional(),
})

export type LeadIntakeData = z.infer<typeof leadIntakeSchema>
