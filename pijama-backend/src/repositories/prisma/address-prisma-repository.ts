import { Prisma } from "@/@types/prisma/index.js";
import { addressRepository } from "../address-repository.js";
import { prisma } from "@/lib/prisma.js";

export class PrismaAddressRepository implements addressRepository {

    async create( data: Prisma.AddressCreateInput ) {
        return await prisma.address.create ({
            data
        })
    }

    async findBy( where: Prisma.AddressWhereUniqueInput ) {
        return await prisma.address.findUnique({ where })
    }

    async delete( id: number ) {
        return await prisma.address.delete({ where: { id } })
    }
}