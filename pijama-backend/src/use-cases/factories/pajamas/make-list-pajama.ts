import { PajamasRepository } from "../../../repositories/pajama-repository.js";
import { ListPajamasUseCase } from "../../pajamas/list-pajamas.js";

export function makeListPajamasUseCase() {
  const pajamasRepository = new PajamasRepository();

  const listPajamasUseCase = new ListPajamasUseCase(
    pajamasRepository
  );

  return listPajamasUseCase;
}