import { PrismaSaleRepository } from "@/repositories/prisma/sales-prisma-repository.js"
import { RegisterSaleUseCase } from "@/use-case/sales/register-sales-use-case.js"

export function makeRegisterSaleUseCase() {

    const saleRepository = new PrismaSaleRepository()
    const registerSaleUseCase = new RegisterSaleUseCase(saleRepository)

    return registerSaleUseCase
}