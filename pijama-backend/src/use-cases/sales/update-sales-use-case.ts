import { SaleWithAddress, SalesRepository } from "@/repositories/sales-repository.js";
import { UsersRepository } from "@/repositories/users-repository.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";

interface UpdateSaleUseCaseRequest {
    publicIdSale: string
    publicIdUser: string
    buyerName?: string
    cpf?: string
}

type UpdateSaleUseCaseResponse = {
    sale: SaleWithAddress
}

export class UpdateSaleUseCase {
    constructor(
        private salesRepository: SalesRepository,
        private usersRepository: UsersRepository
    ) {}
    async execute({
        publicIdSale,
        publicIdUser,
        buyerName,
        cpf
    }: UpdateSaleUseCaseRequest): Promise<UpdateSaleUseCaseResponse> {

        const user = await this.usersRepository.findBy({ publicId: publicIdUser })

        if (!user) throw new ResourceNotFoundError()

        const saleToUpdate = await this.salesRepository.findBy({ publicId: publicIdSale })

        if (!saleToUpdate) throw new ResourceNotFoundError()

        if (saleToUpdate.userId !== user.id) throw new Error("Você não tem autorização para isso")

        const sale = await this.salesRepository.update(saleToUpdate.id, {
            buyerName,
            cpf
        })

        return { sale }
    }
}