import { CreatePajamaUseCase } from "../../pajamas/create-pajama.js";
import { PajamasRepository } from "../../../repositories/pajama-repository.js";
import { PajamaSizesRepository } from "../../../repositories/prisma/pajama-sizes-repository.js";

export function makeCreatePajamaUseCase() {
  const pajamasRepository = new PajamasRepository();
  const pajamaSizesRepository = new PajamaSizesRepository();

  const createPajamaUseCase = new CreatePajamaUseCase(
    pajamasRepository,
    pajamaSizesRepository
  );

  return createPajamaUseCase;
}