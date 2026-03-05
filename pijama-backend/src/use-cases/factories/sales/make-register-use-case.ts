import { PrismaSaleRepository } from "@/repositories/prisma/sales-prisma-repository.js"
import { PrismaUsersRepository } from "@/repositories/prisma/users-prisma-repository.js"
import { RegisterSaleUseCase } from "@/use-cases/sales/register-sales-use-case.js"

export function makeRegisterSaleUseCase() {

    const saleRepository = new PrismaSaleRepository()
    const usersRepository = new PrismaUsersRepository()
    const registerSaleUseCase = new RegisterSaleUseCase(saleRepository, usersRepository)

    return registerSaleUseCase
}