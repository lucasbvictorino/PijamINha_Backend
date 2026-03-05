import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists.js"
import { FastifyReply, FastifyRequest } from "fastify"
import { UserPresenter } from "../../presenters/user-presenter.js"
import { makeListUserUseCase } from "@/use-cases/factories/users/make-list-users.js"


export async function listUsers(
    _request: FastifyRequest, reply: FastifyReply) {
        
    try {
        const listUsersUseCase = makeListUserUseCase()
        const { users } = await listUsersUseCase.execute()
        
        return reply.status(200).send(UserPresenter.toHTTP(users))
    } catch (error) {
        throw error
    }

}