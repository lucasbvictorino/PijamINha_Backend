import { User } from "@/@types/prisma/index.js";
import { env } from "@/env/index.js";
import { prisma } from "@/lib/prisma.js";
import { UsersRepository } from "@/repositories/users-repository.js";
import { hash } from "bcryptjs";

interface CreateUserUseCaseRequest {
    name: string
    username: string
    email: string
    password: string
}

type CreateUserUseCaseResponse = {
    user: User
}

export class CreateUserUseCase {
    constructor(private usersRepository: UsersRepository) {}
    async execute({
        name,
        username,
        email,
        password
    }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
        const userWithSameEmailOrUsername = await this.usersRepository.findByEmailOrUsername(email, username)

        if (userWithSameEmailOrUsername) {
            throw new Error("Username or email already taken.")
        }

        const passwordHash = await hash(password, env.HASH_SALT_ROUNDS)

        const user = await this.usersRepository.create({
            name,
            username,
            email,
            passwordHash
        })

        return { user }
    }
}