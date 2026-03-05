import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeDeletePajamaUseCase } from "../../../use-cases/factories/pajamas/make-delete-pajama.js";

export async function deletePajamaController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const paramsSchema = z.object({
    publicId: z.string().uuid(),
  });

  const { publicId } = paramsSchema.parse(request.params);

  const useCase = makeDeletePajamaUseCase();

  const { deleted } = await useCase.execute({ publicId });

  if (!deleted) {
    return reply.status(404).send({ message: "Pajama not found" });
  }

  return reply.status(200).send();
}