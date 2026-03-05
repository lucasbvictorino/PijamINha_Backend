import type { SaleWithAddress } from "@/repositories/sales-repository.js"
import { AddressPresenter } from "./address-presenter.js"

type HTTPUser = {
    Endereço : {
        CEP: string
        Estado: string
        Vizinhança: string
        Rua: string
        Numero: string
    }
    Venda : {
        idVenda: string
        quantidadeDePijamas: number
        custoTotal: number
    }
}

export class SalePresenter {
    static toHTTP (sale: SaleWithAddress): HTTPUser
    static toHTTP (sales: SaleWithAddress[]): HTTPUser[]
    static toHTTP (input: SaleWithAddress | SaleWithAddress[]): HTTPUser | HTTPUser[] {
        if (Array.isArray(input)) {
            return input.map((sale) => this.toHTTP(sale))
        }

        return {
            Endereço : AddressPresenter.toHTTP(input.address),
            Venda : {
                idVenda: input.publicId,
                quantidadeDePijamas: input.totalPajamas,
                custoTotal: input.totalAmount
            }
            
        }
    }
}