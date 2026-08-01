/**
 * File: app/api/auth/register/route.ts
 * Sprint: 0 — Foundation
 * Implements: FR-AUTH-001 (patient registration)
 *
 * Thin route handler — validation + HTTP status mapping only.
 * Business logic lives in modules/auth/auth.service.ts.
 */
import { NextResponse } from 'next/server'
import { registerPatient } from '@/modules/auth/auth.service'

export async function POST(req: Request) {
  const { email, password, name } = await req.json()

  if (!email || !password || !name) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  if (password.length < 8) {
    return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
  }

  try {
    const user = await registerPatient({ email, password, name })
    return NextResponse.json({ user }, { status: 201 })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Registration failed'
    return NextResponse.json({ error: message }, { status: 409 })
  }
}
