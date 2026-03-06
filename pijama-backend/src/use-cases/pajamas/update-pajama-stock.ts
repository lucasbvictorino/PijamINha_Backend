import { PajamasRepository } from "../../repositories/pajama-repository.js";
import { PajamaSizesRepository } from "../../repositories/pajama-sizes-repository.js";
import { PAJAMA_SIZE } from "../../@types/prisma/index.js";

type SizeUpdate = {
  size: PAJAMA_SIZE;
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