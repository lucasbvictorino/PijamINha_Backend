import { Prisma, User } from "@/@types/prisma/index.js";
import { UsersRepository } from "../users-repository.js";
import { prisma } from "@/lib/prisma.js";

export class PrismaUsersRepository implements UsersRepository {
    async create(data: Prisma.UserCreateInput) {
        return await prisma.user.create({ data })
    }

    async findByEmailOrUsername(email: string, username: string) {
        return await prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }]
            }
        })
    }

    async findBy(where: Prisma.UserWhereInput) {
        return await prisma.user.findFirst({ where })
    }

    async list() {
        return await prisma.user.findMany()
    }

    async delete(id: number) {
        await prisma.user.delete({ 
            where: { id } 
        })
    }

    async update(id: number, data: Prisma.UserUpdateInput) {
        return await prisma.user.update({ 
            where: { id }, 
            data 
        })
    }
}