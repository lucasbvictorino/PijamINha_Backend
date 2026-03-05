import type { Address } from "@/@types/prisma/index.js"

type HTTPUser = {
    CEP: string
    Estado: string
    Vizinhança: string
    Rua: string
    Numero: string
}

export class AddressPresenter {
    static toHTTP (address: Address): HTTPUser
    static toHTTP (addresses: Address[]): HTTPUser[]
    static toHTTP (input: Address | Address[]): HTTPUser | HTTPUser[] {
        if (Array.isArray(input)) {
            return input.map((address) => this.toHTTP(address))
        }

        return {
            CEP: input.zipCode,
            Estado: input.state,
            Vizinhança: input.neighborhood,
            Rua: input.address,
            Numero: input.number
        }
    }
}