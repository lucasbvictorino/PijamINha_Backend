import { prisma } from "../../lib/prisma.js";
import { PajamasRepository } from "../../repositories/pajama-repository.js";
import { PajamaSizesRepository } from "../../repositories/pajama-sizes-repository.js";

interface CreatePajamaRequest {
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
}

export class CreatePajamaUseCase {
  constructor(
    private pajamasRepository: PajamasRepository,
    private pajamaSizesRepository: PajamaSizesRepository
  ) {}

  async execute(data: CreatePajamaRequest) {
    const pajama = await prisma.$transaction(async () => {
      const createdPajama = await this.pajamasRepository.create(data);

      await this.pajamaSizesRepository.createDefaultSizes(
        createdPajama.id
      );

      return createdPajama;
    });

    const pajamaWithSizes = await this.pajamasRepository.findById(
      pajama.id
    );

    return {
      pajama: pajamaWithSizes,
    };
  }
}