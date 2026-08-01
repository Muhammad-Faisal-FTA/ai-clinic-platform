/**
 * File: auth.config.ts  (project root, alongside next.config.ts)
 * Sprint: 0 — Foundation
 * Implements: FR-AUTH-004 (role-based route protection)
 *
 * Edge-safe NextAuth config, consumed by middleware.ts.
 * Deliberately has no Credentials provider — bcrypt requires the
 * Node runtime, so the full provider config lives in auth.ts instead.
 */
import type { NextAuthConfig } from 'next-auth'

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    // Runs on every matched request, before the page renders.
    authorized({ auth, request }) {
      const role = auth?.user?.role
      const path = request.nextUrl.pathname

      if (path.startsWith('/admin')) return role === 'ADMIN'
      if (path.startsWith('/doctor')) return role === 'DOCTOR'
      if (path.startsWith('/dashboard')) return role === 'PATIENT'

      return true
    },
    // Persists role/id onto the JWT at sign-in.
    jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    // Exposes role/id on the client-facing session object.
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
        session.user.id = token.id as string
      }
      return session
    },
  },
  providers: [], // populated in auth.ts
}
