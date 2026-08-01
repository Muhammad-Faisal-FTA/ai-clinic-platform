/**
 * File: app/layout.tsx  (root layout, replaces the create-next-app default)
 * Sprint: 1 — required for FEAT-001/002 to work at all
 *
 * Wires in the three brand fonts (fonts.ts, from the Tailwind setup)
 * and wraps the app in <Providers> so client components can call
 * useSession()/signIn()/signOut(). Without this wrap, every page
 * using next-auth/react breaks.
 */
import type { Metadata } from 'next'
import './globals.css'
import { fraunces, publicSans, plexMono } from './fonts'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'AI Clinic Platform',
  description: 'Book with your doctor, in one message.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${publicSans.variable} ${plexMono.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
