/**
 * File: app/page.tsx  (root "/" route, replaces the create-next-app default)
 * Sprint: 1 — required for FEAT-001/002 to be reachable from the home page
 *
 * Logged-in users skip the landing page and go straight to their
 * role's dashboard — no reason to show a marketing page to someone
 * already signed in. Logged-out visitors see login/register CTAs.
 * Responsive: single-column, centered, fluid down to small mobile widths.
 */
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'

export default async function HomePage() {
  const session = await auth()

  if (session?.user?.role === 'PATIENT') redirect('/dashboard')
  if (session?.user?.role === 'DOCTOR') redirect('/doctor')
  if (session?.user?.role === 'ADMIN') redirect('/admin')

  return (
    <main className="min-h-screen flex items-center justify-center bg-mist px-4">
      <div className="w-full max-w-md text-center">
        <h1 className="font-display text-3xl sm:text-4xl text-harbor mb-3">
          Book with your doctor, in one message
        </h1>
        <p className="text-sm text-ink-secondary mb-8">
          AI Clinic Platform — conversational appointment booking.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/login"
            className="bg-reef text-white font-medium rounded-md px-6 py-2.5 text-sm"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="bg-white border border-border text-harbor font-medium rounded-md px-6 py-2.5 text-sm"
          >
            Create an account
          </Link>
        </div>
      </div>
    </main>
  )
}
