import { PajamasRepository } from "../repositories/prisma/pajama-repository.js";
import { GetPajamaUseCase } from "../use-cases/pajamas/get-pajama.js";

export function makeGetPajamaUseCase() {
  const pajamasRepository = new PajamasRepository();
  return new GetPajamaUseCase(pajamasRepository);
}