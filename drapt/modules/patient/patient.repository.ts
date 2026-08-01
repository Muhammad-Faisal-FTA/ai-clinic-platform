/**
 * File: modules/patient/patient.repository.ts
 * Sprint: 3 — FEAT-003 (patient profile management)
 *
 * Sole DB access point for the patient module (NFR-MAINT-001).
 * Every method is scoped by userId or patientId — there is no
 * "findById(arbitraryId)" here on purpose, which is what makes
 * FR-PAT-003 structurally true rather than something to remember
 * to check in every route.
 */
import { db } from '@/lib/db'

export const patientRepository = {
  findByUserId(userId: string) {
    return db.patient.findUnique({ where: { userId } })
  },

  updateByUserId(
    userId: string,
    data: { name: string; dob?: Date; phone?: string; preferredLanguage?: string }
  ) {
    return db.patient.update({ where: { userId }, data })
  },

  appointmentsByPatientId(patientId: string) {
    return db.appointment.findMany({
      where: { patientId },
      include: { doctor: true },
      orderBy: { startTime: 'desc' },
    })
  },
}
