import { PajamasRepository } from "../../../repositories/pajama-repository.js";
import { PajamaSizesRepository } from "../../../repositories/prisma/pajama-sizes-repository.js";
import { UpdatePajamaStockUseCase } from "../../pajamas/update-pajama-stock.js";

export function makeUpdatePajamaStockUseCase() {
  const pajamasRepository = new PajamasRepository();
  const pajamaSizesRepository = new PajamaSizesRepository();

  return new UpdatePajamaStockUseCase(
    pajamasRepository,
    pajamaSizesRepository
  );
}