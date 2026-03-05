import { PajamasRepository } from "../../repositories/pajama-repository.js";
import { PajamaSizesRepository } from "../../repositories/prisma/pajama-sizes-repository.js";

type SizeUpdate = {
  size: "PP" | "P" | "M" | "G" | "GG";
  stockQuantity: number;
};

interface UpdatePajamaStockRequest {
  pajamaId: number;
  sizes: SizeUpdate[];
}

export class UpdatePajamaStockUseCase {
  constructor(
    private pajamasRepository: PajamasRepository,
    private pajamaSizesRepository: PajamaSizesRepository
  ) {}

  async execute({ pajamaId, sizes }: UpdatePajamaStockRequest) {
    const pajama = await this.pajamasRepository.findById(pajamaId);

    if (!pajama) {
      return { pajama: null };
    }

    // Atualiza cada tamanho informado
    for (const item of sizes) {
      await this.pajamaSizesRepository.updateStock(
        pajamaId,
        item.size,
        item.stockQuantity
      );
    }

    const updated = await this.pajamasRepository.findById(pajamaId);

    return { pajama: updated };
  }
}