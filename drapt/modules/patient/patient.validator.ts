/**
 * File: modules/patient/patient.validator.ts
 * Sprint: 3 — FEAT-003 (patient profile management)
 * Implements: FR-PAT-001
 *
 * Install: npm install zod
 */
import { z } from 'zod'

export const updateProfileSchema = z.object({
  name: z.string().min(1, 'Name is required').max(120),
  dob: z.string().optional(), // ISO date string, e.g. from <input type="date">
  phone: z.string().max(30).optional(),
  preferredLanguage: z.string().max(10).optional(),
})

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
