import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeGetPajamaUseCase } from "../../../use-cases/factories/pajamas/make-get-pajama.js";

export async function getPajamaController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const paramsSchema = z.object({
    publicId: z.string().uuid(),
  });

  const { publicId } = paramsSchema.parse(request.params);

  const useCase = makeGetPajamaUseCase();
  const { pajama } = await useCase.execute({ publicId });

  if (!pajama) {
    return reply.status(404).send({ message: "Pajama not found" });
  }

  return reply.status(200).send({ pajama });
}