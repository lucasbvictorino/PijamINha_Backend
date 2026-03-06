import { makeAuthenticateUserUseCase } from "@/use-cases/factories/users/make-authenticate.js"
import { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"
import { UserPresenter } from "../../presenters/user-presenter.js"
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error.js"


export async function authenticateUser(
    request: FastifyRequest, reply: FastifyReply) {
        
    try {
        const registerBodySchema = z.object({
            username: z.string().trim().min(1).max(100).optional(),
            email: z.email().trim().min(1).max(100).optional(),
            password: z.string().min(8).max(100),
        }).refine((data) => data.username || data.email, {
            message: "Username ou email deve ser fornecido"
        })

        const { username, email, password } = registerBodySchema.parse(request.body)

        const authenticateUserUseCase = makeAuthenticateUserUseCase()

        const { user } = await authenticateUserUseCase.execute({
            login: (username ?? email) as string,
            password
        })

        const token = await reply.jwtSign({
            sub: user.publicId,
            role: user.role
            },
            {expiresIn: '1d'}
        )

        
        return reply.status(200).send({token, user: UserPresenter.toHTTP(user)})
    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: error.message })
        }
        throw error
    }

}