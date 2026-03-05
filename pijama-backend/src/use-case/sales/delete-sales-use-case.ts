import { Sale } from "@/@types/prisma/index.js"
import { SalesRepository } from "@/repositories/sales-repository.js"

export class DeleteSaleUseCase {

    constructor ( private salesRepository: SalesRepository){}

    async execute ( publicIdSale: string, publicIdUser: string ): Promise<Sale> {

        const user = await this.usersRepository.findBy({ publicId: publicIdUser })

        const sale = await this.salesRepository.findById(publicIdSale)

        // checamos se venda existe:
        if (!sale) throw new Error ("A venda não existe")

        if (sale.userId != user.id) throw new Error ("Você náo tem autorização para isso")

        const deletedSale = await this.salesRepository.delete(sale.id)

        return deletedSale
    }
}