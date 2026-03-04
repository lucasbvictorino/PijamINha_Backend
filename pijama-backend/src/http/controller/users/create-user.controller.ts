import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists.js"
import { makeCreateUserUseCase } from "@/use-cases/factories/users/make-create-user.js"
import { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"
import { UserPresenter } from "../../presenters/user-presenter.js"


export async function createUser(
    request: FastifyRequest, reply: FastifyReply) {
        
    try {
        const registerBodySchema = z.object({
            name: z.string().trim().min(1).max(100),
            username: z.string().trim().min(1).max(100),
            email: z.email().max(100),
            password: z.string().min(8).max(100),
        })

        const { name, username, email, password } = registerBodySchema.parse(request.body)

        const createUserUseCase = makeCreateUserUseCase()

        const { user } = await createUserUseCase.execute({
            name,
            username,
            email,
            password
        })
        
        return reply.status(201).send(UserPresenter.toHTTP(user))
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: error.message })
        }
        throw error
    }

}