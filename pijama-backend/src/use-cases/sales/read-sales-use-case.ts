import { SalesRepository, SaleWithAddress } from "@/repositories/sales-repository.js"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js"

export class ReadSaleUseCase {

    constructor ( private salesRepository: SalesRepository){}

    async execute ( publicIdSale: string ): Promise<SaleWithAddress> {

        const sale = await this.salesRepository.findBy({ publicId: publicIdSale })

        if (!sale) throw new ResourceNotFoundError()

        return sale
    }
}