/**
 * File: app/dashboard/profile/page.tsx
 * Sprint: 3 — FR-PAT-001
 * Responsive: single-column form, fluid down to small mobile widths.
 */
'use client'

import { useEffect, useState } from 'react'

interface Profile {
  name: string
  dob: string | null
  phone: string | null
  preferredLanguage: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/patients/me')
      .then((res) => res.json())
      .then((data) => setProfile(data.profile))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!profile) return

    setError('')
    setSaved(false)
    setLoading(true)

    const res = await fetch('/api/patients/me', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: profile.name,
        dob: profile.dob ?? undefined,
        phone: profile.phone ?? undefined,
        preferredLanguage: profile.preferredLanguage,
      }),
    })

    setLoading(false)

    if (!res.ok) {
      const data = await res.json()
      setError(data.error ?? 'Update failed')
      return
    }

    setSaved(true)
  }

  if (!profile) {
    return <p className="text-sm text-ink-secondary">Loading…</p>
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-display text-2xl text-harbor">Your profile</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-border rounded-card p-6 sm:p-8 flex flex-col gap-4"
      >
        {error && (
          <p className="text-sm text-white bg-brick rounded-md px-3 py-2">{error}</p>
        )}
        {saved && (
          <p className="text-sm text-white bg-sage rounded-md px-3 py-2">Profile updated</p>
        )}

        <Field
          label="Full name"
          value={profile.name}
          onChange={(v) => setProfile({ ...profile, name: v })}
        />
        <Field
          label="Date of birth"
          type="date"
          value={profile.dob?.slice(0, 10) ?? ''}
          onChange={(v) => setProfile({ ...profile, dob: v })}
        />
        <Field
          label="Phone"
          value={profile.phone ?? ''}
          onChange={(v) => setProfile({ ...profile, phone: v })}
        />
        <Field
          label="Preferred language"
          value={profile.preferredLanguage}
          onChange={(v) => setProfile({ ...profile, preferredLanguage: v })}
        />

        <button
          type="submit"
          disabled={loading}
          className="self-start bg-reef text-white font-medium rounded-md px-6 py-2.5 text-sm disabled:opacity-60"
        >
          {loading ? 'Saving…' : 'Save changes'}
        </button>
      </form>
    </div>
  )
}

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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-reef-tint focus:border-reef"
      />
    </label>
  )
}
