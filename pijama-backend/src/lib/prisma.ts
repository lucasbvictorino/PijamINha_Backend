import { PrismaPg } from '@prisma/adapter-pg'
import PrismaPkg from '@/@types/prisma/client.js'
const PrismaClient = PrismaPkg.PrismaClient
import { env } from '@/env/index.js'

const connectionString = `${env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
export const prisma = new PrismaClient({ adapter })