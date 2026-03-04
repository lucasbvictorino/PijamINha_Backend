import { User } from "@/@types/prisma/index.js"
import { UsersRepository } from "@/repositories/users-repository.js"
import { InvalidCredentialsError } from "../errors/invalid-credentials-error.js"
import { compare } from "bcryptjs"

interface AuthenticateUserUseCaseRequest {
    login: string
    password: string
}

type AuthenticateUserUseCaseResponse = {
    user: User
}

export class AuthenticateUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({
        login,
        password
    }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
        const user = await this.usersRepository.findByEmailOrUsername(login, login)

        if(!user) {
            throw new InvalidCredentialsError()
        }
        const doesPasswordMatches = await compare(password, user.passwordHash)

        if (!doesPasswordMatches) {
            throw new InvalidCredentialsError()
        }

        return { user }
    }
}