/**
 * File: app/api/patients/me/route.ts
 * Sprint: 3 — FR-PAT-001
 *
 * "/me" pattern, not "/patients/:id" — the profile always comes
 * from the authenticated session, so there's no ID parameter for a
 * malicious or buggy client to swap out. This is how FR-PAT-003 is
 * satisfied for this route specifically.
 */
import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getMyProfile, updateMyProfile } from '@/modules/patient/patient.service'

export async function GET() {
  const session = await auth()
  if (session?.user?.role !== 'PATIENT') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  try {
    const profile = await getMyProfile(session.user.id)
    return NextResponse.json({ profile })
  } catch {
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
  }
}

export async function PATCH(req: Request) {
  const session = await auth()
  if (session?.user?.role !== 'PATIENT') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const body = await req.json()

  try {
    const profile = await updateMyProfile(session.user.id, body)
    return NextResponse.json({ profile })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Update failed'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
