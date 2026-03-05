import { Prisma } from "@/@types/prisma/index.js";
import { Sale } from "@/@types/prisma/index.js";

export interface SalesRepository {
    create ( data: Prisma.SaleCreateInput,
        pajamas: {
            pajamaId: number,
            quantity: number,
            price: number
        }[]): Promise<Sale>

    findById ( publicId: string ): Promise<Sale | null>

    delete ( id: number ): Promise<Sale>
}