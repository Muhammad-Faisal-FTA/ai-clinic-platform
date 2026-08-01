/**
 * File: app/api/auth/forgot-password/route.ts
 * Sprint: 2 — FR-AUTH-006
 * Always returns 200 with the same message, whether or not the email
 * exists — see requestPasswordReset() for why.
 */
import { NextResponse } from 'next/server'
import { requestPasswordReset } from '@/modules/auth/auth.service'

export async function POST(req: Request) {
  const { email } = await req.json()
  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  await requestPasswordReset(email)

  return NextResponse.json({
    message: 'If an account exists for that email, a reset link has been sent.',
  })
}
