import { PrismaSaleRepository } from "@/repositories/prisma/sales-prisma-repository.js"
import { PrismaUsersRepository } from "@/repositories/prisma/users-prisma-repository.js"
import { UpdateSaleUseCase } from "@/use-cases/sales/update-sales-use-case.js"

export function makeUpdateSaleUseCase() {
    const saleRepository = new PrismaSaleRepository()
    const usersRepository = new PrismaUsersRepository()
    const updateSaleUseCase = new UpdateSaleUseCase(saleRepository, usersRepository)

    return updateSaleUseCase
}