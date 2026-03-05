import { PrismaAddressRepository } from "@/repositories/prisma/address-prisma-repository.js"
import { RegisterAddressUseCase } from "@/use-cases/address/register-address-use-case.js"

export function makeRegisterAdressUseCase() {

    const addressRepository = new PrismaAddressRepository()
    const registerAddressUseCase = new RegisterAddressUseCase(addressRepository)

    return registerAddressUseCase
}