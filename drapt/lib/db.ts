/**
 * File: lib/db.ts
 * Sprint: 1 — fixes Prisma 7 driver adapter requirement
 *
 * Prisma 7 removed the built-in Rust query engine entirely — every
 * database connection now goes through an explicit driver adapter,
 * no exceptions. `new PrismaClient()` with no arguments is invalid
 * in v7, which is exactly the runtime error you hit.
 *
 * Install first:
 *   npm install @prisma/adapter-pg pg
 *   npm install -D @types/pg
 */
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient
  pool?: Pool
}

// Reused across hot-reloads in dev so we don't open a new pool per reload.
const pool =
  globalForPrisma.pool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    // Neon's pooled connection string already includes sslmode=require;
    // uncomment below only if you hit a "self-signed certificate" error.
    // ssl: { rejectUnauthorized: false },
  })

const adapter = new PrismaPg(pool)

export const db = globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
  globalForPrisma.pool = pool
}
