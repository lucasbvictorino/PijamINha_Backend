import { PrismaSaleRepository } from "@/repositories/prisma/sales-prisma-repository.js"
import { PrismaUsersRepository } from "@/repositories/prisma/users-prisma-repository.js"
import { DeleteSaleUseCase } from "@/use-cases/sales/delete-sales-use-case.js"

export function makeDeleteSaleUseCase() {

    const saleRepository = new PrismaSaleRepository()
    const usersRepository = new PrismaUsersRepository()
    const deleteSaleUseCase = new DeleteSaleUseCase(saleRepository, usersRepository)

    return deleteSaleUseCase
}