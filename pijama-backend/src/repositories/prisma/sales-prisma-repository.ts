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
    
    async findById(publicId: string): Promise<SaleWithAddress | null> {
        return prisma.sale.findUnique({
            where: { publicId },
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

    async delete( id: number ): Promise<SaleWithAddress> {
        return prisma.sale.delete({
            where: { id },
            include : { address: true }
        })
    }
}