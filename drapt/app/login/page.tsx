/**
 * File: app/login/page.tsx
 * Sprint: 2 — surfaces FR-AUTH-007's rate-limit message, links to
 * FR-AUTH-006's forgot-password flow
 * Implements: FR-AUTH-002
 * Responsive: single-column form, fluid down to small mobile widths.
 */
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSession, signIn } from 'next-auth/react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await signIn('credentials', { email, password, redirect: false })

    if (res?.error) {
      setLoading(false)
      // Our custom CredentialsSignin subclasses set `code` to a
      // human-readable message (see auth.ts) — anything else falls
      // back to the generic message.
      setError(
        res.error === 'CredentialsSignin' ? 'Invalid email or password' : res.error
      )
      return
    }

    const session = await getSession()
    const role = session?.user?.role

    if (role === 'DOCTOR') router.push('/doctor')
    else if (role === 'ADMIN') router.push('/admin')
    else router.push('/dashboard')

    router.refresh()
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-mist px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white border border-border rounded-card p-6 sm:p-8"
      >
        <h1 className="font-display text-2xl text-harbor mb-6">Welcome back</h1>

        {error && (
          <p className="text-sm text-white bg-brick rounded-md px-3 py-2 mb-4">{error}</p>
        )}

        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink-secondary">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-reef-tint focus:border-reef"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink-secondary">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-reef-tint focus:border-reef"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-reef text-white font-medium rounded-md py-2.5 disabled:opacity-60"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>

        <p className="text-sm text-ink-secondary mt-4 text-center">
          <a href="/forgot-password" className="text-reef">Forgot your password?</a>
        </p>
      </form>
    </main>
  )
}
