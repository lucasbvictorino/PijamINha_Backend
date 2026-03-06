import type { SaleWithAddress } from "@/repositories/sales-repository.js"
import { AddressPresenter } from "./address-presenter.js"

type HTTPSale = {
    Endereço : {
        CEP: string
        Estado: string
        Cidade: string
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
    static toHTTP (sale: SaleWithAddress): HTTPSale
    static toHTTP (sales: SaleWithAddress[]): HTTPSale[]
    static toHTTP (input: SaleWithAddress | SaleWithAddress[]): HTTPSale | HTTPSale[] {
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