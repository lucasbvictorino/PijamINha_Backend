import { env } from "@/env/index.js"
import { prisma } from "@/lib/prisma.js"
import { hash } from "bcryptjs"
import { FastifyReply } from "fastify"
import { FastifyRequest } from "fastify/types/request.js"
import z from "zod"


export async function createUser(
    request: FastifyRequest, reply: FastifyReply) {
        
    const registerBodySchema = z.object({
        name: z.string().trim().min(1).max(100),
        username: z.string().trim().min(1).max(100),
        email: z.email().max(100),
        password: z.string().min(8).max(100),
    })

    const { name, username, email, password } = registerBodySchema.parse(request.body)

    const passwordHash = await hash(password, env.HASH_SALT_ROUNDS)

    const user = await prisma.user.create({
        data: {
            name,
            username,
            email,
            passwordHash,
        }
    })
    
    return reply.status(201).send(user)

}