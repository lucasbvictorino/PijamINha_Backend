import { addressRepository } from "@/repositories/address-repository.js"
import { Sale } from "@/@types/prisma/index.js"

interface registerSalesUseCaseRequest {
    buyerName: string
    cpf: string
    installments: string
    cardNumber: string
    userId: string
}

buyerName: string;
    cpf: string;
    paymentMethod: string;
    installments: number;
    cardNumber: string | null;
    userId: number;
    totalAmount: number;
    addressId: number;

export class RegisterAddressUseCase {

    constructor (private addressRepository: addressRepository) {}

    async execute (request: registerAddressUseCaseRequest): Promise<Address> {

        const endereço = await this.addressRepository.create(request)

        return endereço
    }
}
