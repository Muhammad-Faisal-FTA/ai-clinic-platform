/**
 * File: app/api/auth/[...nextauth]/route.ts
 * Sprint: 0 — Foundation
 *
 * Wires NextAuth's generated handlers into the Next.js App Router.
 * Handles /api/auth/signin, /api/auth/callback, /api/auth/session, etc.
 */
import { handlers } from '@/auth'

export const { GET, POST } = handlers
