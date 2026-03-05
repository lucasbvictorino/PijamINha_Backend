import { addressRepository } from "@/repositories/address-repository.js"
import { Address } from "@/@types/prisma/index.js"

interface registerAddressUseCaseRequest {
    zipCode: string
    state: string
    city: string
    neighborhood: string
    address: string
    number: string
}

export class RegisterAddressUseCase {

    constructor (private addressRepository: addressRepository) {}

    async execute (request: registerAddressUseCaseRequest): Promise<Address> {

        const endereço = await this.addressRepository.create(request)

        return endereço
    }
}
