import { User, Prisma } from "@/@types/prisma/index.js";

export interface UsersRepository {
    create(data: Prisma.UserCreateInput): Promise<User>
    findByEmailOrUsername(email: string, username: string): Promise<User | null>
    findBy(where: Prisma.UserWhereInput): Promise<User | null>
    list(): Promise<User[]>
    delete(id: number): Promise<void>
    update(id: number, data: Prisma.UserUpdateInput): Promise<User>
}