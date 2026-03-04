import { makeDeleteUserUseCase } from "@/use-cases/factories/users/make-delete-user.js"
import { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js"

export async function deleteUserProfile(
    request: FastifyRequest, reply: FastifyReply) {
        
    try {
        const { sub: publicId } = request.user as { sub: string }

        const deleteUserUseCase = makeDeleteUserUseCase()

        await deleteUserUseCase.execute({
            publicId
        })
        
        return reply.status(200).send()
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }

}

export async function deleteUser(
    request: FastifyRequest, reply: FastifyReply) {
        
    try {
        const deleteUserParamsSchema = z.object({
            publicId: z.string(),
        })

        const { publicId } = deleteUserParamsSchema.parse(request.params)

        const deleteUserUseCase = makeDeleteUserUseCase()

        await deleteUserUseCase.execute({
            publicId
        })
        
        return reply.status(200).send()
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }

}