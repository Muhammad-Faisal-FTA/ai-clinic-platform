/**
 * File: modules/auth/auth.service.ts
 * Sprint: 2 — adds FR-AUTH-006 (password reset)
 * Implements: FR-AUTH-001, FR-AUTH-003, FR-AUTH-006, NFR-SEC-002
 *
 * Reset tokens: a random 32-byte token is emailed to the user; only
 * its SHA-256 hash is stored, so a DB leak alone can't be used to
 * reset accounts. Expires in 15 minutes (not specified in the TRD —
 * a reasonable default for a one-time link, stated here explicitly).
 */
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { sendEmail } from '@/lib/email'

interface RegisterInput {
  email: string
  password: string
  name: string
}

export async function registerPatient({ email, password, name }: RegisterInput) {
  const existing = await db.user.findUnique({ where: { email } })
  if (existing) throw new Error('Email already registered')

  const passwordHash = await bcrypt.hash(password, 12)

  const user = await db.user.create({
    data: {
      email,
      passwordHash,
      role: 'PATIENT',
      patient: { create: { name } },
    },
  })

  return { id: user.id, email: user.email, role: user.role }
}

const RESET_TOKEN_TTL_MS = 15 * 60 * 1000 // 15 minutes

function hashToken(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex')
}

// FR-AUTH-006: request a reset link. Always succeeds silently for
// unknown emails too — confirming which emails exist is its own
// security leak, so the API response never reveals that.
export async function requestPasswordReset(email: string) {
  const user = await db.user.findUnique({ where: { email } })
  if (!user) return // deliberately no error — avoids email enumeration

  const token = crypto.randomBytes(32).toString('hex')

  await db.passwordResetToken.create({
    data: {
      userId: user.id,
      tokenHash: hashToken(token),
      expiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MS),
    },
  })

  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`

  await sendEmail({
    to: user.email,
    subject: 'Reset your AI Clinic password',
    html: `<p>Click to reset your password (expires in 15 minutes):</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
  })
}

// FR-AUTH-006: consume the token and set a new password.
export async function resetPassword(token: string, newPassword: string) {
  const tokenHash = hashToken(token)

  const record = await db.passwordResetToken.findUnique({ where: { tokenHash } })
  if (!record) throw new Error('Invalid or expired reset link')
  if (record.usedAt) throw new Error('This reset link has already been used')
  if (record.expiresAt < new Date()) throw new Error('This reset link has expired')

  const passwordHash = await bcrypt.hash(newPassword, 12)

  await db.$transaction([
    db.user.update({ where: { id: record.userId }, data: { passwordHash } }),
    db.passwordResetToken.update({ where: { id: record.id }, data: { usedAt: new Date() } }),
  ])
}
