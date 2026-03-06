import { prisma } from "../lib/prisma.js";
import { PAJAMA_SIZE } from "../@types/prisma/index.js";

export class PajamaSizesRepository {
  async createDefaultSizes(pajamaId: number) {
    const sizes: PAJAMA_SIZE[] = ["PP", "P", "M", "G", "GG"];

    await prisma.pajamaSize.createMany({
      data: sizes.map((size) => ({
        pajamaId,
        size,
        stockQuantity: 0,
      })),
    });
  }

  async findByPajamaIdAndSize(pajamaId: number, size: PAJAMA_SIZE) {
    return prisma.pajamaSize.findFirst({
      where: { pajamaId, size }
    })
  }

  async decrementStock(pajamaId: number, size: PAJAMA_SIZE, quantity: number) {
    return prisma.pajamaSize.updateMany({
      where: { pajamaId, size },
      data: { stockQuantity: { decrement: quantity } }
    })
  }

  async updateStock(pajamaId: number, size: PAJAMA_SIZE, stockQuantity: number) {
    return prisma.pajamaSize.updateMany({
      where: { pajamaId, size },
      data: { stockQuantity }
    })
  }
}