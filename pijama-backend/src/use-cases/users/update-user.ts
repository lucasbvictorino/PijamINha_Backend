import { User } from "@/@types/prisma/index.js";
import { UsersRepository } from "@/repositories/users-repository.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";

interface UpdateUserUseCaseRequest {
    publicId: string
    name?: string
    username?: string
    email?: string
}

type UpdateUserUseCaseResponse = {
    user: User
}

export class UpdateUserUseCase {
    constructor(private usersRepository: UsersRepository) {}
    async execute({
        publicId,
        name,
        username,
        email
    }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
        const userToUpdate = await this.usersRepository.findBy({ publicId })

        if (!userToUpdate) {
            throw new ResourceNotFoundError()
        }

        const user = await this.usersRepository.update(userToUpdate.id, {
            name,
            username,
            email
        })


        return { user }
    }
}