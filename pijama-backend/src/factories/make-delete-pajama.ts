import { PajamasRepository } from "../repositories/prisma/pajama-repository.js";
import { DeletePajamaUseCase } from "../use-cases/pajamas/delete-pajama.js";

export function makeDeletePajamaUseCase() {
  const pajamasRepository = new PajamasRepository();

  return new DeletePajamaUseCase(pajamasRepository);
}