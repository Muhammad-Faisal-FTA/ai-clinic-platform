/**
 * File: app/dashboard/page.tsx
 * Sprint: 1 — completes FEAT-002 (role-based dashboards)
 * Implements: FR-AUTH-004
 *
 * Minimal patient landing page. Appointment listing (FR-PAT-002) is a
 * separate, later requirement — not built here, so this only shows
 * an empty-state placeholder rather than a fake data list.
 * Responsive: stacks on mobile, single column at every width.
 */
import { auth } from '@/auth'

export default async function PatientDashboardPage() {
  const session = await auth()

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-display text-2xl text-harbor">
        Welcome{session?.user?.email ? `, ${session.user.email}` : ''}
      </h1>
      <div className="bg-white border border-border rounded-card p-6 sm:p-8">
        <p className="text-sm text-ink-secondary">
          You don&apos;t have any appointments yet. Booking through the Receptionist Agent
          arrives in a later sprint (FEAT-005).
        </p>
      </div>
    </div>
  )
}
