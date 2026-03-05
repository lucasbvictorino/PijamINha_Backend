import { PajamasRepository } from "../../repositories/prisma/pajama-repository.js";

interface ListPajamasRequest {
  page: number;
  perPage: number;
}

export class ListPajamasUseCase {
  constructor(private pajamasRepository: PajamasRepository) {}

  async execute({ page, perPage }: ListPajamasRequest) {
    const pajamas = await this.pajamasRepository.findMany(page, perPage);

    return {
      pajamas,
    };
  }
}