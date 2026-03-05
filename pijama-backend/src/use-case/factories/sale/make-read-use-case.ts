import { PrismaSaleRepository } from "@/repositories/prisma/sales-prisma-repository.js"
import { DeleteSaleUseCase } from "@/use-case/sales/delete-sales-use-case.js"
import { ReadSaleUseCase } from "@/use-case/sales/read-sales-use-case.js"

export function makeReadSaleUseCase() {

    const saleRepository = new PrismaSaleRepository()
    const registerSaleUseCase = new ReadSaleUseCase(saleRepository)

    return registerSaleUseCase
}