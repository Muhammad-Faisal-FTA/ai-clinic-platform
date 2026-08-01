/**
 * File: app/api/appointments/me/route.ts
 * Sprint: 3 — FR-PAT-002
 * Same "/me" pattern as patients/me — see that file's header for why.
 */
import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getMyAppointments } from '@/modules/patient/patient.service'

export async function GET() {
  const session = await auth()
  if (session?.user?.role !== 'PATIENT') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  try {
    const appointments = await getMyAppointments(session.user.id)
    return NextResponse.json(appointments)
  } catch {
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
  }
}
