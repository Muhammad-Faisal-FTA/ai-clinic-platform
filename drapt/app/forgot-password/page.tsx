/**
 * File: app/forgot-password/page.tsx
 * Sprint: 2 — FR-AUTH-006
 * Responsive: single-column form, fluid down to small mobile widths.
 */
'use client'

import { useState } from 'react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    setLoading(false)
    setSent(true) // shown regardless of whether the email exists
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-mist px-4">
      <div className="w-full max-w-sm bg-white border border-border rounded-card p-6 sm:p-8">
        <h1 className="font-display text-2xl text-harbor mb-6">Reset your password</h1>

        {sent ? (
          <p className="text-sm text-ink-secondary">
            If an account exists for that email, a reset link has been sent.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label className="flex flex-col gap-1.5 mb-6">
              <span className="text-sm font-medium text-ink-secondary">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-reef-tint focus:border-reef"
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-reef text-white font-medium rounded-md py-2.5 disabled:opacity-60"
            >
              {loading ? 'Sending…' : 'Send reset link'}
            </button>
          </form>
        )}
      </div>
    </main>
  )
}
