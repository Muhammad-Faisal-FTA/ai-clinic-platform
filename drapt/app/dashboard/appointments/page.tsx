/**
 * File: app/dashboard/appointments/page.tsx
 * Sprint: 3 — FR-PAT-002
 *
 * Server component — reads the session and hits the service layer
 * directly rather than fetching its own API route (no reason to add
 * a network hop for data the server already has).
 * Responsive: single column, cards stack naturally at every width.
 */
import { auth } from '@/auth'
import { getMyAppointments } from '@/modules/patient/patient.service'

export default async function AppointmentsPage() {
  const session = await auth()
  const { upcoming, past } = await getMyAppointments(session!.user.id)

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl text-harbor">Your appointments</h1>

      <section>
        <h2 className="text-sm font-medium text-ink-secondary mb-3">Upcoming</h2>
        {upcoming.length === 0 ? (
          <EmptyState message="No upcoming appointments." />
        ) : (
          <div className="flex flex-col gap-3">
            {upcoming.map((apt) => (
              <AppointmentCard key={apt.id} appointment={apt} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-sm font-medium text-ink-secondary mb-3">Past</h2>
        {past.length === 0 ? (
          <EmptyState message="No past appointments." />
        ) : (
          <div className="flex flex-col gap-3">
            {past.map((apt) => (
              <AppointmentCard key={apt.id} appointment={apt} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="bg-white border border-border rounded-card p-6">
      <p className="text-sm text-ink-secondary">{message}</p>
    </div>
  )
}

function AppointmentCard({
  appointment,
}: {
  appointment: { id: string; startTime: Date; status: string; doctor: { name: string; specialty: string } }
}) {
  const badgeClass =
    appointment.status === 'CONFIRMED'
      ? 'bg-sage text-white'
      : appointment.status === 'CANCELLED'
        ? 'bg-brick text-white'
        : 'bg-clay-tint text-clay'

  return (
    <div className="bg-white border border-border rounded-card p-4 sm:p-5 flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-harbor">{appointment.doctor.name}</p>
        <p className="text-xs text-ink-secondary">{appointment.doctor.specialty}</p>
        <p className="text-xs text-ink-secondary mt-1">
          {appointment.startTime.toLocaleString()}
        </p>
      </div>
      <span className={`text-xs font-medium px-3 py-1 rounded-full ${badgeClass}`}>
        {appointment.status}
      </span>
    </div>
  )
}
