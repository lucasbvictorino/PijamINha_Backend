import { User } from "@/@types/prisma/index.js";
import { UsersRepository } from "@/repositories/users-repository.js";

type ListUserUseCaseResponse = {
    users: User[]
}

export class ListUserUseCase {
    constructor(private usersRepository: UsersRepository) {}
    async execute(): Promise<ListUserUseCaseResponse> {

        const users = await this.usersRepository.list()

        return { users }
    }
}