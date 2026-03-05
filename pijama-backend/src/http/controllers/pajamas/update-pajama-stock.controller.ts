import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeUpdatePajamaStockUseCase } from "../../../use-cases/factories/pajamas/make-update-pajama-stock.js";

export async function updatePajamaStockController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const paramsSchema = z.object({
    publicId: z.string().uuid(),
  });

  const bodySchema = z.object({
    sizes: z
      .array(
        z.object({
          size: z.enum(["PP", "P", "M", "G", "GG"]),
          stockQuantity: z.number().int().min(0),
        })
      )
      .min(1),
  });

  const { publicId } = paramsSchema.parse(request.params);
  const { sizes } = bodySchema.parse(request.body);

  const useCase = makeUpdatePajamaStockUseCase();
  const { pajama } = await useCase.execute({ publicId, sizes });

  if (!pajama) {
    return reply.status(404).send({ message: "Pajama not found" });
  }

  return reply.status(200).send({ pajama });
}