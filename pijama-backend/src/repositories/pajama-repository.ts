import { prisma } from "../lib/prisma.js";

export class PajamasRepository {
  // deleteById(id: number) {
  //     throw new Error("Method not implemented.");
  // }
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

  async findById(id: number) {
    return prisma.pajama.findUnique({
      where: { id },
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

  async delete(id: number) {
    return prisma.pajama.delete({
      where: { id },
    });
  }
}