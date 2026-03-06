import { SalesRepository, SaleWithAddress } from "@/repositories/sales-repository.js"
import { UsersRepository } from "@/repositories/users-repository.js"
import { addressRepository } from "@/repositories/address-repository.js"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js"

export class DeleteSaleUseCase {

    constructor (
        private salesRepository: SalesRepository,
        private usersRepository: UsersRepository,
        private addressRepository: addressRepository
    ){}

    async execute ( publicIdSale: string, publicIdUser: string ): Promise<SaleWithAddress> {

        const user = await this.usersRepository.findBy({ publicId: publicIdUser })

        if (!user) throw new ResourceNotFoundError()

        const sale = await this.salesRepository.findBy({ publicId: publicIdSale })

        if (!sale) throw new ResourceNotFoundError()

        if (sale.userId !== user.id) throw new Error("Você não tem autorização para isso")

        const deletedSale = await this.salesRepository.delete(sale.id)

        const remainingSales = await this.salesRepository.countByAddressId(sale.addressId)
        if (remainingSales === 0) {
            await this.addressRepository.delete(sale.addressId)
        }

        return deletedSale
    }
}