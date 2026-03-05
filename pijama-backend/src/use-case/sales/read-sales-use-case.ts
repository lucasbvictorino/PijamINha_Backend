import { Sale } from "@/@types/prisma/index.js"
import { SalesRepository, SaleWithAddress } from "@/repositories/sales-repository.js"

export class ReadSaleUseCase {

    constructor ( private salesRepository: SalesRepository){}

    async execute ( publicIdSale: string ): Promise<SaleWithAddress> {

        const sale = await this.salesRepository.findById(publicIdSale)

        // checamos se venda existe:
        if (!sale) throw new Error ("A venda não existe")

        return sale
    }
}