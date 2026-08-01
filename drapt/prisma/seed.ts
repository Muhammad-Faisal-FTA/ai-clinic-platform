/**
 * File: prisma/seed.ts
 * Sprint: 1 — testing aid for FEAT-002
 *
 * Doctor and Admin accounts are seeded, not self-registered
 * (see modules/auth/auth.service.ts). This script creates one of
 * each so /doctor and /admin can actually be tested end-to-end.
 * Run with: npx tsx prisma/seed.ts
 * (npm install -D tsx first if you don't have it)
 */
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const db = new PrismaClient()

async function main() {
  const passwordHash = await bcrypt.hash('password123', 12)

  await db.user.upsert({
    where: { email: 'doctor@clinic.test' },
    update: {},
    create: {
      email: 'doctor@clinic.test',
      passwordHash,
      role: 'DOCTOR',
      doctor: { create: { name: 'Dr. Amina Farooq', specialty: 'General Medicine' } },
    },
  })

  await db.user.upsert({
    where: { email: 'admin@clinic.test' },
    update: {},
    create: {
      email: 'admin@clinic.test',
      passwordHash,
      role: 'ADMIN',
    },
  })

  console.log('Seeded: doctor@clinic.test / admin@clinic.test (password: password123)')
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => db.$disconnect())
