/**
 * File: lib/rate-limit.ts
 * Sprint: 2 — FR-AUTH-007 (rate-limit login attempts)
 *
 * Sliding-window limiter on Upstash Redis, keyed by email.
 * Applies to every login attempt (success or failure) — the TRD
 * requirement doesn't distinguish, so this is the simpler read.
 *
 * Install: npm install @upstash/ratelimit @upstash/redis
 */
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export const loginRateLimit = new Ratelimit({
  redis: Redis.fromEnv(), // reads UPSTASH_REDIS_REST_URL / _TOKEN
  limiter: Ratelimit.slidingWindow(5, '15 m'), // FR-AUTH-007: 5 per 15 minutes
  prefix: 'login-attempt',
})
