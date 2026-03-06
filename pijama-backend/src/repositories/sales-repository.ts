import { Prisma } from "@/@types/prisma/index.js"

export type SaleWithAddress = Prisma.SaleGetPayload<{
  include: { address: true }
}>

interface listSaleQuery {
    page?: number
    limit?: number
}

interface listSalesResponse{
    data: SaleWithAddress[]
    totalCount: number
    totalPages: number
    currentPage: number
}

export interface SalesRepository {
    create ( data: Prisma.SaleUncheckedCreateInput,
        pajamas: {
            pajamaId: number,
            quantity: number,
            price: number
        }[]): Promise<SaleWithAddress>

    findBy ( where: Prisma.SaleWhereUniqueInput ): Promise<SaleWithAddress | null>
    list( query: listSaleQuery ): Promise<listSalesResponse>
    countByAddressId ( addressId: number ): Promise<number>

    delete ( id: number ): Promise<SaleWithAddress>
    update ( id: number, data: Prisma.SaleUncheckedUpdateInput ): Promise<SaleWithAddress>
}