import type { SaleWithAddress } from "@/repositories/sales-repository.js"
import { SalesRepository } from "@/repositories/sales-repository.js"

interface listSalesUseCaseRequest {
    page?: number
    limit?: number
}

type listSalesUseCaseResponse = {
    sales: SaleWithAddress[]
    totalCount: number
    totalPages: number
    currentPage: number
}

export class ListSalesUseCase {

    constructor (private saleRepository: SalesRepository) {}

    async execute({ page, limit }: listSalesUseCaseRequest): Promise<listSalesUseCaseResponse>{

        const { 
            data: sales,
            totalCount,
            totalPages, 
            currentPage } = await this.saleRepository.list({ page, limit })

        return { sales, totalCount, totalPages, currentPage }

    }
}