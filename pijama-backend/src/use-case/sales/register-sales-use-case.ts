import { Sale } from "@/@types/prisma/index.js"
import { SalesRepository } from "@/repositories/sales-repository.js"

interface registerSalesUseCaseRequest {
    buyerName: string,
    cpf: string,
    paymentMethod: string,
    installments: number,
    cardNumber?: string | null,
    totalAmount: number,
    userId: string,
    addressId: number,
    pajamas: {
        pajamaId: number,
        quantity: number,
        price: number
    }[]
}

export class RegisterSaleUseCase {

    constructor ( private salesRepository: SalesRepository){}

    async execute (request: registerSalesUseCaseRequest): Promise<Sale> {

        const user = await this.usersRepository.findBy({ publicId: request.userId })

        let precoTotal = 0
        for (const pijamas of request.pajamas) precoTotal += pijamas.price

        const venda = await this.salesRepository.create(
            {
                buyerName: request.buyerName,
                cpf: request.cpf,
                paymentMethod: request.paymentMethod,
                installments: request.installments,
                cardNumber: request.cardNumber,
                totalAmount: precoTotal,
                user : {
                    connect: { id: user.id }
                },
                address: {
                    connect: { id: request.addressId }
                }
            },
            request.pajamas
        )

        return venda
    }
}