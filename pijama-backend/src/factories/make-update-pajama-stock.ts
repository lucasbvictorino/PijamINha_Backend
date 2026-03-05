import { PajamasRepository } from "../repositories/prisma/pajama-repository.js";
import { PajamaSizesRepository } from "../repositories/prisma/pajama-sizes-repository.js";
import { UpdatePajamaStockUseCase } from "../use-cases/pajamas/update-pajama-stock.js";

export function makeUpdatePajamaStockUseCase() {
  const pajamasRepository = new PajamasRepository();
  const pajamaSizesRepository = new PajamaSizesRepository();

  return new UpdatePajamaStockUseCase(
    pajamasRepository,
    pajamaSizesRepository
  );
}