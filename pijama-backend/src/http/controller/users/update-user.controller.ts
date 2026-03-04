import { FastifyRequest, FastifyReply } from "fastify"
import z from "zod"
import { UserPresenter } from "../../presenters/user-presenter.js"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js"
import { makeUpdateUserUseCase } from "@/use-cases/factories/users/make-update-user.js"


export async function updateUser(
    request: FastifyRequest, reply: FastifyReply) {
        
    try {
        const updateParamsSchema = z.object({
            publicId: z.string(),
        })

        const { publicId } = updateParamsSchema.parse(request.params)

        const registerBodySchema = z.object({
            name: z.string().trim().min(1).max(100).optional(),
            username: z.string().trim().min(1).max(100).optional(),
            email: z.email().max(100).optional(),
        })

        const { name, username, email } = registerBodySchema.parse(request.body)

        const updateUserUseCase = makeUpdateUserUseCase()

        const { user } = await updateUserUseCase.execute({
            publicId,
            name,
            username,
            email
        })
        
        return reply.status(200).send(UserPresenter.toHTTP(user))
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }

}