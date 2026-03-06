import type { Address } from "@/@types/prisma/index.js"

type HTTPAddress = {
    CEP: string
    Estado: string
    Cidade: string
    Vizinhança: string
    Rua: string
    Numero: string
}

export class AddressPresenter {
    static toHTTP (address: Address): HTTPAddress
    static toHTTP (addresses: Address[]): HTTPAddress[]
    static toHTTP (input: Address | Address[]): HTTPAddress | HTTPAddress[] {
        if (Array.isArray(input)) {
            return input.map((address) => this.toHTTP(address))
        }

        return {
            CEP: input.zipCode,
            Estado: input.state,
            Cidade: input.city,
            Vizinhança: input.neighborhood,
            Rua: input.address,
            Numero: input.number
        }
    }
}