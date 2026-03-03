import { prisma } from "@/lib/prisma.js"
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

    const user = await prisma.user.create({
        data: {
            name,
            username,
            email,
            password,
        }
    })
    
    return reply.status(201).send(user)

}