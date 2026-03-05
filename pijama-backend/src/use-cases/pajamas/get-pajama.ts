import { PajamasRepository } from "../../repositories/pajama-repository.js";

interface GetPajamaRequest {
  publicId: string;
}

export class GetPajamaUseCase {
  constructor(private pajamasRepository: PajamasRepository) {}

  async execute({ publicId }: GetPajamaRequest) {
    const pajama = await this.pajamasRepository.findBy({ publicId });

    return { pajama };
  }
}