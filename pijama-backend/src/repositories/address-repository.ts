import { Prisma } from "@/@types/prisma/index.js";
import { Address } from "@/@types/prisma/index.js";

export interface addressRepository {
    create ( data: Prisma.AddressCreateInput ): Promise<Address>

    findBy ( where: Prisma.AddressWhereUniqueInput ): Promise<Address|null>
}