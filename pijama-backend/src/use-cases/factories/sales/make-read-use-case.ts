import { PrismaSaleRepository } from "@/repositories/prisma/sales-prisma-repository.js"
import { DeleteSaleUseCase } from "@/use-cases/sales/delete-sales-use-case.js"
import { ReadSaleUseCase } from "@/use-cases/sales/read-sales-use-case.js"

export function makeReadSaleUseCase() {

    const saleRepository = new PrismaSaleRepository()
    const registerSaleUseCase = new ReadSaleUseCase(saleRepository)

    return registerSaleUseCase
}