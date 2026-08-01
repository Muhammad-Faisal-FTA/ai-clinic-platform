/**
 * File: app/dashboard/layout.tsx
 * Sprint: 3 — nav now links to Profile and Appointments (FEAT-003)
 * Implements: FR-AUTH-004
 * Responsive: nav wraps on narrow widths, max-width container centers
 * content on large screens.
 */
import Link from 'next/link'
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
          <div className="flex gap-4 sm:gap-6 text-sm">
            <Link href="/dashboard" className="text-ink hover:text-reef">
              Dashboard
            </Link>
            <Link href="/dashboard/appointments" className="text-ink hover:text-reef">
              Appointments
            </Link>
            <Link href="/dashboard/profile" className="text-ink hover:text-reef">
              Profile
            </Link>
          </div>
        </nav>
      </header>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">{children}</main>
    </div>
  )
}
