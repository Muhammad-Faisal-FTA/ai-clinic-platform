/**
 * File: middleware.ts  (project root, alongside next.config.ts)
 * Sprint: 0 — Foundation
 * Implements: FR-AUTH-004 (role-based route protection)
 *
 * Runs on the Edge runtime, before any matched route renders.
 * Uses auth.config.ts (not auth.ts) — no Node-only deps allowed here.
 */
import NextAuth from 'next-auth'
import { authConfig } from '@/auth.config'

export default NextAuth(authConfig).auth

export const config = {
  matcher: ['/dashboard/:path*', '/doctor/:path*', '/admin/:path*'],
}
