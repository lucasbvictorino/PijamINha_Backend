import { makeGetUserUseCase } from "@/use-cases/factories/users/make-get-user.js"
import { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"
import { UserPresenter } from "../../presenters/user-presenter.js"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js"

export async function getUserProfile(
    request: FastifyRequest, reply: FastifyReply) {
        
    try {
        const { sub: publicId } = request.user as { sub: string }

        const getUserUseCase = makeGetUserUseCase()

        const { user } = await getUserUseCase.execute({
            publicId
        })
        
        return reply.status(200).send(UserPresenter.toHTTP(user))
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }

}

export async function getUser(
    request: FastifyRequest, reply: FastifyReply) {
        
    try {
        const getParamsSchema = z.object({
            publicId: z.string(),
        })

        const { publicId } = getParamsSchema.parse(request.params)

        const getUserUseCase = makeGetUserUseCase()

        const { user } = await getUserUseCase.execute({
            publicId
        })
        
        return reply.status(200).send(UserPresenter.toHTTP(user))
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }

}