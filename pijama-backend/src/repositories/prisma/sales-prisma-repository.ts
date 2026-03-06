import { Prisma } from "@/@types/prisma/index.js"
import { prisma } from "@/lib/prisma.js"
import { SalesRepository, SaleWithAddress } from "../sales-repository.js"

export class PrismaSaleRepository implements SalesRepository {

    async create( data: Prisma.SaleUncheckedCreateInput,
        pajamas: {
            pajamaId: number,
            quantity: number,
            price: number
        }[]): Promise<SaleWithAddress> {
        return await prisma.sale.create ({
            data: {
                buyerName: data.buyerName,
                cpf: data.cpf,
                paymentMethod: data.paymentMethod,
                installments: data.installments,
                cardNumber: data.cardNumber,
                totalAmount: data.totalAmount,
                totalPajamas: data.totalPajamas,
                userId: data.userId,
                addressId: data.addressId,
                pajamas: { create: pajamas.map((item) => ({
                    pajamaId: item.pajamaId,
                    quantity: item.quantity,
                    price: item.price
                }))}
            },
            include : { address : true }
        })
    }
    
    async findBy(where: Prisma.SaleWhereUniqueInput): Promise<SaleWithAddress | null> {
        return prisma.sale.findUnique({
            where,
            include : { address: true }
        })
    }

    async list ({ page = 1, limit = 5 }: 
        { page?: number, limit?: number }) {

        const skip = (page-1) * limit

        const sales = await prisma.sale.findMany({
            skip,
            take: limit,
            include: { address: true },
            orderBy: {
                createdAt: 'desc'
            }
        })

        const totalCount = await prisma.sale.count()

        const totalPages = Math.ceil(totalCount / limit)

        return ({
            data: sales,
            totalCount,
            totalPages,
            currentPage: page
        })
    }

    async countByAddressId( addressId: number ): Promise<number> {
        return prisma.sale.count({ where: { addressId } })
    }

    async delete( id: number ): Promise<SaleWithAddress> {
        return prisma.sale.delete({
            where: { id },
            include : { address: true }
        })
    }

    async update( id: number, data: Prisma.SaleUncheckedUpdateInput ): Promise<SaleWithAddress> {
        return prisma.sale.update({
            where: { id },
            data,
            include: { address: true }
        })
    }
}