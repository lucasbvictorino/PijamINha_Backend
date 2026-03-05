import { Prisma } from "../@types/prisma/index.js";
import { prisma } from "../lib/prisma.js";

export class PajamasRepository {
  async create(data: {
    name: string;
    description: string;
    image: string;
    price: number;
    season: string;
    type: string;
    gender: string;
    favorite?: boolean;
    onSale?: boolean;
    salePercent?: number | null;
  }) {
    return prisma.pajama.create({
      data,
    });
  }

  async findBy(where: Prisma.PajamaWhereUniqueInput) {
    return prisma.pajama.findUnique({
      where,
      include: { sizes: true },
    });
  }

  async findMany(page: number, perPage: number) {
    return prisma.pajama.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      include: { sizes: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async delete(where: Prisma.PajamaWhereUniqueInput) {
    return prisma.pajama.delete({
      where,
    });
  }
}