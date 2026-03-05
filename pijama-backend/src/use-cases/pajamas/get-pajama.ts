import { PajamasRepository } from "../../repositories/pajama-repository.js";

interface GetPajamaRequest {
  id: number;
}

export class GetPajamaUseCase {
  constructor(private pajamasRepository: PajamasRepository) {}

  async execute({ id }: GetPajamaRequest) {
    const pajama = await this.pajamasRepository.findById(id);

    return { pajama };
  }
}