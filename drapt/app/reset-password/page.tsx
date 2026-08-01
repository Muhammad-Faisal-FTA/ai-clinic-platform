/**
 * File: app/reset-password/page.tsx
 * Sprint: 2 — FR-AUTH-006
 * Reads the token from the URL (?token=...), sent via the reset email.
 * Responsive: single-column form, fluid down to small mobile widths.
 */
'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function ResetPasswordPage() {
  const router = useRouter()
  const token = useSearchParams().get('token') ?? ''
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    })

    setLoading(false)

    if (!res.ok) {
      const data = await res.json()
      setError(data.error ?? 'Something went wrong')
      return
    }

    router.push('/login')
  }

  if (!token) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-mist px-4">
        <p className="text-sm text-brick">Missing reset token. Use the link from your email.</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-mist px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white border border-border rounded-card p-6 sm:p-8"
      >
        <h1 className="font-display text-2xl text-harbor mb-6">Set a new password</h1>

        {error && (
          <p className="text-sm text-white bg-brick rounded-md px-3 py-2 mb-4">{error}</p>
        )}

        <label className="flex flex-col gap-1.5 mb-6">
          <span className="text-sm font-medium text-ink-secondary">New password</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-reef-tint focus:border-reef"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-reef text-white font-medium rounded-md py-2.5 disabled:opacity-60"
        >
          {loading ? 'Updating…' : 'Update password'}
        </button>
      </form>
    </main>
  )
}
