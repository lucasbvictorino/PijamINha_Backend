import { PrismaSaleRepository } from "@/repositories/prisma/sales-prisma-repository.js"
import { ListSalessUseCase } from "@/use-cases/sales/list-sales-use-case.js"

export function makeListSaleUseCase() {

    const saleRepository = new PrismaSaleRepository()
    const listSaleUseCase = new ListSalessUseCase(saleRepository)

    return listSaleUseCase
}