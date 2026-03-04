import { PrismaUsersRepository } from "@/repositories/prisma/users-prisma-repository.js";
import { ListUserUseCase } from "@/use-cases/users/list-users.js";

export function makeListUserUseCase() {
    const userRepository = new PrismaUsersRepository()
    const listUserUseCase = new ListUserUseCase(userRepository)
    return listUserUseCase
}