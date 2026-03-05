import { PrismaSaleRepository } from "@/repositories/prisma/sales-prisma-repository.js"
import { DeleteSaleUseCase } from "@/use-case/sales/delete-sales-use-case.js"
import { RegisterSaleUseCase } from "@/use-case/sales/register-sales-use-case.js"

export function makeDeleteSaleUseCase() {

    const saleRepository = new PrismaSaleRepository()
    const registerSaleUseCase = new DeleteSaleUseCase(saleRepository)

    return registerSaleUseCase
}