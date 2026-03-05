import { prisma } from "../lib/prisma.js";

export class PajamaSizesRepository {
  async createDefaultSizes(pajamaId: number) {
    const sizes = ["PP", "P", "M", "G", "GG"];

    await prisma.pajamaSize.createMany({
      data: sizes.map((size) => ({
        pajamaId,
        size,
        stockQuantity: 0,
      })),
    });
  }

  async updateStock(
    pajamaId: number,
    size: string,
    stockQuantity: number
  ) {
    return prisma.pajamaSize.updateMany({
      where: {
        pajamaId,
        size,
      },
      data: {
        stockQuantity,
      },
    });
  }
}