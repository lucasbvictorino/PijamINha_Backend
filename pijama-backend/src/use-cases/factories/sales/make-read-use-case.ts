import { PrismaSaleRepository } from "@/repositories/prisma/sales-prisma-repository.js"
import { ReadSaleUseCase } from "@/use-cases/sales/read-sales-use-case.js"

export function makeReadSaleUseCase() {

    const saleRepository = new PrismaSaleRepository()
    const registerSaleUseCase = new ReadSaleUseCase(saleRepository)

    return registerSaleUseCase
}