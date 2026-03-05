import { Prisma } from "@/@types/prisma/index.js";
import { Sale } from "@/@types/prisma/index.js";

export type SaleWithAddress = Prisma.SaleGetPayload<{
  include: { address: true }
}>

export interface SalesRepository {
    create ( data: Prisma.SaleCreateInput,
        pajamas: {
            pajamaId: number,
            quantity: number,
            price: number
        }[]): Promise<SaleWithAddress>

    findById ( publicId: string ): Promise<SaleWithAddress | null>

    delete ( id: number ): Promise<SaleWithAddress>
}