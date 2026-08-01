/**
 * File: types/next-auth.d.ts
 * Sprint: 0 — Foundation
 *
 * Extends NextAuth's built-in types so `session.user.role` and
 * `session.user.id` type-check — without this, TypeScript only
 * knows about name/email/image on the default session shape.
 */
import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: string
    } & DefaultSession['user']
  }
  interface User {
    role: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: string
  }
}
