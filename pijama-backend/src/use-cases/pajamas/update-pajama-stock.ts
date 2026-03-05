import { PajamasRepository } from "../../repositories/pajama-repository.js";
import { PajamaSizesRepository } from "../../repositories/pajama-sizes-repository.js";

type SizeUpdate = {
  size: "PP" | "P" | "M" | "G" | "GG";
  stockQuantity: number;
};

interface UpdatePajamaStockRequest {
  publicId: string;
  sizes: SizeUpdate[];
}

export class UpdatePajamaStockUseCase {
  constructor(
    private pajamasRepository: PajamasRepository,
    private pajamaSizesRepository: PajamaSizesRepository
  ) {}

  async execute({ publicId, sizes }: UpdatePajamaStockRequest) {
    const pajama = await this.pajamasRepository.findBy({ publicId });

    if (!pajama) {
      return { pajama: null };
    }

    // Atualiza cada tamanho informado
    for (const item of sizes) {
      await this.pajamaSizesRepository.updateStock(
        pajama.id,
        item.size,
        item.stockQuantity
      );
    }

    const updated = await this.pajamasRepository.findBy({ publicId });

    return { pajama: updated };
  }
}