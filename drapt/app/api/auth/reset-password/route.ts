/**
 * File: app/api/auth/reset-password/route.ts
 * Sprint: 2 — FR-AUTH-006
 */
import { NextResponse } from 'next/server'
import { resetPassword } from '@/modules/auth/auth.service'

export async function POST(req: Request) {
  const { token, password } = await req.json()

  if (!token || !password) {
    return NextResponse.json({ error: 'Missing token or password' }, { status: 400 })
  }
  if (password.length < 8) {
    return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
  }

  try {
    await resetPassword(token, password)
    return NextResponse.json({ message: 'Password updated' })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Reset failed'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
