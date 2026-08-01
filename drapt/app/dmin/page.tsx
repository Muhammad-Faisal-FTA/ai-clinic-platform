/**
 * File: app/admin/page.tsx
 * Sprint: 1 — completes FEAT-002 (role-based dashboards)
 * Implements: FR-AUTH-004
 * Responsive: single column at every width.
 */
import { auth } from '@/auth'

export default async function AdminDashboardPage() {
  const session = await auth()

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-display text-2xl text-harbor">
        Welcome{session?.user?.email ? `, ${session.user.email}` : ''}
      </h1>
      <div className="bg-white border border-border rounded-card p-6 sm:p-8">
        <p className="text-sm text-ink-secondary">
          Doctor management (FR-DOC-001), appointment oversight, and audit log search
          (FR-AUD-003) land in later sprints.
        </p>
      </div>
    </div>
  )
}
