import { SalesRepository, SaleWithAddress } from "@/repositories/sales-repository.js"
import { PrismaUsersRepository } from "@/repositories/prisma/users-prisma-repository.js"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js"

export class DeleteSaleUseCase {

    constructor (
        private salesRepository: SalesRepository,
        private usersRepository: PrismaUsersRepository
    ){}

    async execute ( publicIdSale: string, publicIdUser: string ): Promise<SaleWithAddress> {

        const user = await this.usersRepository.findBy({ publicId: publicIdUser })

        if (!user) throw new ResourceNotFoundError()

        const sale = await this.salesRepository.findById(publicIdSale)

        
        if (!sale) throw new ResourceNotFoundError()

        if (sale.userId != user.id) throw new Error ("Você náo tem autorização para isso")

        const deletedSale = await this.salesRepository.delete(sale.id)

        return deletedSale
    }
}