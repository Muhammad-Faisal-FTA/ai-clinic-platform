/**
 * File: modules/patient/patient.service.ts
 * Sprint: 3 — FEAT-003 (patient profile management)
 * Implements: FR-PAT-001, FR-PAT-002, FR-PAT-003
 *
 * Every function takes the session's userId as input — never a
 * patientId from the request body/URL. That's the whole enforcement
 * mechanism for FR-PAT-003: there is no code path in this module
 * that can be pointed at someone else's data, by construction.
 */
import { patientRepository } from './patient.repository'
import { updateProfileSchema } from './patient.validator'

export async function getMyProfile(userId: string) {
  const patient = await patientRepository.findByUserId(userId)
  if (!patient) throw new Error('Patient profile not found')
  return patient
}

export async function updateMyProfile(userId: string, input: unknown) {
  const data = updateProfileSchema.parse(input)

  return patientRepository.updateByUserId(userId, {
    name: data.name,
    dob: data.dob ? new Date(data.dob) : undefined,
    phone: data.phone,
    preferredLanguage: data.preferredLanguage,
  })
}

// FR-PAT-002: split into upcoming/past for the dashboard view
export async function getMyAppointments(userId: string) {
  const patient = await patientRepository.findByUserId(userId)
  if (!patient) throw new Error('Patient profile not found')

  const appointments = await patientRepository.appointmentsByPatientId(patient.id)
  const now = new Date()

  return {
    upcoming: appointments.filter((a) => a.startTime >= now),
    past: appointments.filter((a) => a.startTime < now),
  }
}
