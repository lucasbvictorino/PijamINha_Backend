import { PrismaSaleRepository } from "@/repositories/prisma/sales-prisma-repository.js"
import { PrismaUsersRepository } from "@/repositories/prisma/users-prisma-repository.js"
import { PajamasRepository } from "@/repositories/pajama-repository.js"
import { PajamaSizesRepository } from "@/repositories/pajama-sizes-repository.js"
import { RegisterSaleUseCase } from "@/use-cases/sales/register-sales-use-case.js"

export function makeRegisterSaleUseCase() {

    const saleRepository = new PrismaSaleRepository()
    const usersRepository = new PrismaUsersRepository()
    const pajamasRepository = new PajamasRepository()
    const pajamaSizesRepository = new PajamaSizesRepository()
    const registerSaleUseCase = new RegisterSaleUseCase(pajamasRepository, pajamaSizesRepository, saleRepository, usersRepository)

    return registerSaleUseCase
}