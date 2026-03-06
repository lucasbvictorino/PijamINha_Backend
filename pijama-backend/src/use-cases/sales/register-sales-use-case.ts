import { SalesRepository, SaleWithAddress } from "@/repositories/sales-repository.js"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js"
import { PajamasRepository } from "@/repositories/pajama-repository.js"
import { UsersRepository } from "@/repositories/users-repository.js"
import { PajamaSizesRepository } from "@/repositories/pajama-sizes-repository.js"
import { PAJAMA_SIZE } from "@/@types/prisma/index.js"
import { InsufficientStockError } from "../errors/insufficient-stock-error.js"

interface registerSalesUseCaseRequest {
    buyerName: string,
    cpf: string,
    paymentMethod: string,
    installments: number,
    cardNumber?: string | null,
    userId: string,
    addressId: number,
    pajamas: {
        publicId: string,
        quantity: number,
        size: PAJAMA_SIZE
    }[]
}

export class RegisterSaleUseCase {

    constructor (
        private pajamasRepository: PajamasRepository,
        private pajamaSizesRepository: PajamaSizesRepository,
        private salesRepository: SalesRepository,
        private usersRepository: UsersRepository
    ){}

    async execute (request: registerSalesUseCaseRequest): Promise<SaleWithAddress> {

        const user = await this.usersRepository.findBy({ publicId: request.userId })
        if (!user) throw new ResourceNotFoundError()

        const validatedPajamas = await Promise.all(request.pajamas.map(async (pajama) => {
            const pajamaFound = await this.pajamasRepository.findBy({ publicId: pajama.publicId })
            if (!pajamaFound) throw new ResourceNotFoundError()

            const pajamaSize = await this.pajamaSizesRepository.findByPajamaIdAndSize(pajamaFound.id, pajama.size)
            if (!pajamaSize) throw new ResourceNotFoundError()

            if (pajamaSize.stockQuantity < pajama.quantity) {
                throw new InsufficientStockError()
            }

            return {
                pajamaId: pajamaFound.id,
                size: pajama.size,
                quantity: pajama.quantity,
                price: pajamaFound.price
            }
        }))

        let totalPrice = 0
        let totalPijamas = 0

        for (const p of validatedPajamas) {
            totalPrice += p.price * p.quantity
            totalPijamas += p.quantity
        }

        await Promise.all(
            validatedPajamas.map((p) =>
                this.pajamaSizesRepository.decrementStock(p.pajamaId, p.size, p.quantity)
            )
        )

        const formattedPajamas = validatedPajamas.map(({ pajamaId, quantity, price }) => ({
            pajamaId,
            quantity,
            price
        }))

        const venda = await this.salesRepository.create(
            {
                buyerName: request.buyerName,
                cpf: request.cpf,
                paymentMethod: request.paymentMethod,
                installments: request.installments,
                cardNumber: request.cardNumber,
                totalAmount: totalPrice,
                totalPajamas: totalPijamas,
                userId: user.id,
                addressId: request.addressId
            },
            formattedPajamas
        )

        return venda
    }
}