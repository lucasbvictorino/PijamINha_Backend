import { PajamasRepository } from "../../repositories/pajama-repository.js";

interface DeletePajamaRequest {
  publicId: string;
}

export class DeletePajamaUseCase {
  constructor(private pajamasRepository: PajamasRepository) {}

  async execute({ publicId }: DeletePajamaRequest) {
    const pajama = await this.pajamasRepository.findBy({ publicId });

    if (!pajama) {
      return { deleted: false };
    }

    await this.pajamasRepository.delete({ publicId });

    return { deleted: true };
  }
}