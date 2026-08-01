/**
 * File: prisma.config.ts  (project root, alongside package.json)
 * Sprint: 1 — completes FEAT-001, FEAT-002
 *
 * Prisma 7 moved the datasource URL out of schema.prisma into this
 * file. The Prisma CLI no longer auto-loads .env, so the explicit
 * `import "dotenv/config"` below is required, not optional.
 * Install: npm install dotenv
 */
import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: { path: 'prisma/migrations' },
  datasource: { url: env('DATABASE_URL') },
})
