/**
 * File: app/providers.tsx
 * Sprint: 0 — Foundation
 *
 * Wraps the app in NextAuth's SessionProvider so client components
 * can call useSession()/signIn(). Import into app/layout.tsx and
 * wrap {children} with it.
 */
'use client'

import { SessionProvider } from 'next-auth/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}
