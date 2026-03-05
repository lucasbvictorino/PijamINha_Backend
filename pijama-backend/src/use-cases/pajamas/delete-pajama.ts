import { PajamasRepository } from "../../repositories/pajama-repository.js";

interface DeletePajamaRequest {
  id: number;
}

export class DeletePajamaUseCase {
  constructor(private pajamasRepository: PajamasRepository) {}

  async execute({ id }: DeletePajamaRequest) {
    const pajama = await this.pajamasRepository.findById(id);

    if (!pajama) {
      return { deleted: false };
    }

    await this.pajamasRepository.delete(id);

    return { deleted: true };
  }
}