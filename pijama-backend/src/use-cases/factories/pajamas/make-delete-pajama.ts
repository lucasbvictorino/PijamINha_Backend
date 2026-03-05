import { PajamasRepository } from "../../../repositories/pajama-repository.js";
import { DeletePajamaUseCase } from "../../pajamas/delete-pajama.js";

export function makeDeletePajamaUseCase() {
  const pajamasRepository = new PajamasRepository();

  return new DeletePajamaUseCase(pajamasRepository);
}