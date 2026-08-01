/**
 * File: lib/email.ts
 * Sprint: 2 — supports FR-AUTH-006 (password reset email) and,
 * later, FR-NOT-001 (booking confirmation email).
 *
 * Uses Resend (free tier, dead-simple API) if RESEND_API_KEY is set.
 * Falls back to logging the email to the console when it isn't —
 * so local dev works without setting up an email provider first.
 *
 * Install: npm install resend
 */
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

interface SendEmailInput {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: SendEmailInput) {
  if (!resend) {
    console.log(`[email:dev] to=${to} subject="${subject}"\n${html}`)
    return
  }

  await resend.emails.send({
    from: process.env.EMAIL_FROM ?? 'AI Clinic <onboarding@resend.dev>',
    to,
    subject,
    html,
  })
}
