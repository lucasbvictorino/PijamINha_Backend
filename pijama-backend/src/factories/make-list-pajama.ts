import { PajamasRepository } from "../repositories/prisma/pajama-repository.js";
import { ListPajamasUseCase } from "../use-cases/pajamas/list-pajamas.js";

export function makeListPajamasUseCase() {
  const pajamasRepository = new PajamasRepository();

  const listPajamasUseCase = new ListPajamasUseCase(
    pajamasRepository
  );

  return listPajamasUseCase;
}