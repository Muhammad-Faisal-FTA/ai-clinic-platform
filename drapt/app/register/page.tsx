/**
 * File: app/register/page.tsx
 * Sprint: 0 — Foundation
 * Implements: FR-AUTH-001 (patient registration form)
 * Responsive: single-column form, fluid down to small mobile widths.
 */
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    setLoading(false)

    if (!res.ok) {
      const data = await res.json()
      setError(data.error ?? 'Something went wrong')
      return
    }

    router.push('/login')
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-mist px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white border border-border rounded-card p-6 sm:p-8"
      >
        <h1 className="font-display text-2xl text-harbor mb-6">Create your account</h1>

        {error && (
          <p className="text-sm text-white bg-brick rounded-md px-3 py-2 mb-4">{error}</p>
        )}

        <div className="flex flex-col gap-4">
          <Field label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <Field
            label="Email"
            type="email"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
          />
          <Field
            label="Password"
            type="password"
            value={form.password}
            onChange={(v) => setForm({ ...form, password: v })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-reef text-white font-medium rounded-md py-2.5 disabled:opacity-60"
        >
          {loading ? 'Creating account…' : 'Create account'}
        </button>

        <p className="text-sm text-ink-secondary mt-4 text-center">
          Already have an account? <a href="/login" className="text-reef">Sign in</a>
        </p>
      </form>
    </main>
  )
}

// Small reusable field — kept local since it's only used on this page.
function Field({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-ink-secondary">{label}</span>
      <input
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-reef-tint focus:border-reef"
      />
    </label>
  )
}
