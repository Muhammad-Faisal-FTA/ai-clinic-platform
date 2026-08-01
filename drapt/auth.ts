/**
 * File: auth.ts  (project root, alongside next.config.ts)
 * Sprint: 2 — adds FR-AUTH-007 (login rate limiting)
 * Implements: FR-AUTH-002, FR-AUTH-005, FR-AUTH-007, NFR-SEC-002
 *
 * Full NextAuth config — Node runtime only.
 * Custom CredentialsSignin subclasses give the client a distinguishable
 * error message (rate-limited vs. wrong password) — see login/page.tsx.
 */
import NextAuth, { CredentialsSignin } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { authConfig } from './auth.config'
import { db } from '@/lib/db'
import { loginRateLimit } from '@/lib/rate-limit'

class RateLimitError extends CredentialsSignin {
  code = 'Too many login attempts. Try again in 15 minutes.'
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // FR-AUTH-005
  },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const email = credentials?.email as string
        const password = credentials?.password as string
        if (!email || !password) return null

        // FR-AUTH-007: 5 attempts per 15 minutes per account
        const { success } = await loginRateLimit.limit(email)
        if (!success) throw new RateLimitError()

        const user = await db.user.findUnique({ where: { email } })
        if (!user) return null

        const valid = await bcrypt.compare(password, user.passwordHash)
        if (!valid) return null

        return { id: user.id, email: user.email, role: user.role }
      },
    }),
  ],
})
