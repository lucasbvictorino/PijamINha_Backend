import { prisma } from "../src/lib/prisma.js"
import { hash } from "bcryptjs"
import { env } from "../src/env/index.js"

export async function seed() {
    await prisma.user.upsert({
        where: {
            email: "admin@example.com"
        },
        update: {},
        create: {
            publicId: "00000000-0000-0000-0000-000000000001",
            name: "Admin",
            username: "admin",
            email: "admin@example.com",
            passwordHash: await hash("admin123", env.HASH_SALT_ROUNDS),
            role: "ADMIN"
        }
    })

    console.log("Database seeded successfully.")
}

seed()
    .then(() => {
        prisma.$disconnect()
        process.exit(0)
    })
    .catch((error) => {
        console.error("Error seeding database:", error)
        prisma.$disconnect()
        process.exit(1)
    })