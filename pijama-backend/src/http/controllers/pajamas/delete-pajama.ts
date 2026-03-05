import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeDeletePajamaUseCase } from "../../../factories/make-delete-pajama.js";

export async function deletePajamaController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const paramsSchema = z.object({
    id: z.coerce.number().int().positive(),
  });

  const { id } = paramsSchema.parse(request.params);

  const useCase = makeDeletePajamaUseCase();

  const { deleted } = await useCase.execute({ id });

  if (!deleted) {
    return reply.status(404).send({ message: "Pajama not found" });
  }

  return reply.status(204).send();
}