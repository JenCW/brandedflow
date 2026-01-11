/**
 * Rate Limiting Utility for Next.js API Routes
 *
 * Implements in-memory rate limiting to prevent abuse of API endpoints.
 * For production, consider using Redis or a dedicated rate limiting service.
 */

import { NextRequest, NextResponse } from 'next/server'

interface RateLimitConfig {
  /**
   * Number of requests allowed within the time window
   */
  maxRequests: number
  /**
   * Time window in milliseconds
   */
  windowMs: number
  /**
   * Message to return when rate limit is exceeded
   */
  message?: string
}

interface RequestLog {
  count: number
  resetTime: number
}

// In-memory store for rate limit tracking
// Key format: "ip:endpoint" or "identifier:endpoint"
const rateLimitStore = new Map<string, RequestLog>()

// Clean up old entries every 5 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now()
  for (const [key, log] of rateLimitStore.entries()) {
    if (now > log.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}, 5 * 60 * 1000)

/**
 * Gets the client identifier from the request (IP address or forwarded IP)
 */
function getClientIdentifier(request: NextRequest): string {
  // Try to get real IP from common proxy headers
  const forwardedFor = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const cfConnectingIp = request.headers.get('cf-connecting-ip') // Cloudflare

  if (cfConnectingIp) return cfConnectingIp
  if (realIp) return realIp
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim()
  }

  // Fallback to a generic identifier (not ideal for rate limiting)
  return 'unknown'
}

/**
 * Rate limiting middleware for Next.js API routes
 *
 * @param request - The Next.js request object
 * @param config - Rate limit configuration
 * @returns null if rate limit not exceeded, NextResponse with 429 status if exceeded
 *
 * @example
 * ```ts
 * export async function POST(request: NextRequest) {
 *   const rateLimitResponse = await rateLimit(request, {
 *     maxRequests: 5,
 *     windowMs: 60 * 1000, // 5 requests per minute
 *   })
 *
 *   if (rateLimitResponse) {
 *     return rateLimitResponse
 *   }
 *
 *   // Process the request...
 * }
 * ```
 */
export async function rateLimit(
  request: NextRequest,
  config: RateLimitConfig
): Promise<NextResponse | null> {
  const { maxRequests, windowMs, message = 'Too many requests, please try again later.' } = config

  const clientId = getClientIdentifier(request)
  const endpoint = new URL(request.url).pathname
  const key = `${clientId}:${endpoint}`

  const now = Date.now()
  const requestLog = rateLimitStore.get(key)

  if (!requestLog || now > requestLog.resetTime) {
    // First request or time window has reset
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs,
    })
    return null
  }

  if (requestLog.count >= maxRequests) {
    // Rate limit exceeded
    const resetIn = Math.ceil((requestLog.resetTime - now) / 1000)

    return NextResponse.json(
      {
        success: false,
        error: message,
        retryAfter: resetIn,
      },
      {
        status: 429,
        headers: {
          'Retry-After': resetIn.toString(),
          'X-RateLimit-Limit': maxRequests.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': new Date(requestLog.resetTime).toISOString(),
        },
      }
    )
  }

  // Increment request count
  requestLog.count++
  rateLimitStore.set(key, requestLog)

  return null
}

/**
 * Predefined rate limit configurations for different use cases
 */
export const RateLimitPresets = {
  /**
   * Strict rate limit for sensitive operations (e.g., lead submission)
   * 5 requests per minute per IP
   */
  STRICT: {
    maxRequests: 5,
    windowMs: 60 * 1000,
    message: 'Too many submissions. Please wait a moment before trying again.',
  },

  /**
   * Standard rate limit for general API endpoints
   * 20 requests per minute per IP
   */
  STANDARD: {
    maxRequests: 20,
    windowMs: 60 * 1000,
    message: 'Too many requests. Please try again in a moment.',
  },

  /**
   * Relaxed rate limit for read-only operations (e.g., rates API)
   * 60 requests per minute per IP
   */
  RELAXED: {
    maxRequests: 60,
    windowMs: 60 * 1000,
    message: 'Rate limit exceeded. Please try again shortly.',
  },
} as const
