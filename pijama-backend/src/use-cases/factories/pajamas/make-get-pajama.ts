import { PajamasRepository } from "../../../repositories/pajama-repository.js";
import { GetPajamaUseCase } from "../../pajamas/get-pajama.js";

export function makeGetPajamaUseCase() {
  const pajamasRepository = new PajamasRepository();
  return new GetPajamaUseCase(pajamasRepository);
}