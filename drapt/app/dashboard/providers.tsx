/**
 * File: app/dashboard/layout.tsx
 * Sprint: 1 — completes FEAT-002 (role-based dashboards)
 * Implements: FR-AUTH-004 (server-side check, backs up middleware.ts)
 * Responsive: nav wraps on narrow widths, max-width container centers
 * content on large screens.
 *
 * Correction from Sprint 0: this must be a literal "dashboard" folder,
 * not a "(patient)" route group — route groups don't add a URL segment,
 * so middleware.ts's "/dashboard/:path*" matcher would never have matched.
 */
import { redirect } from 'next/navigation'
import { auth } from '@/auth'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (session?.user?.role !== 'PATIENT') redirect('/login')

  return (
    <div className="min-h-screen bg-mist">
      <header className="bg-white border-b border-border">
        <nav className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <span className="font-display text-lg text-harbor">AI Clinic</span>
          <span className="text-sm text-ink-secondary">{session.user.email}</span>
        </nav>
      </header>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">{children}</main>
    </div>
  )
}
