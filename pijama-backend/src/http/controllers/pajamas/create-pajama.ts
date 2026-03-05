import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreatePajamaUseCase } from "../../../factories/make-create-pajama.js";

export async function createPajamaController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createPajamaBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    image: z.string(),
    price: z.number(),
    season: z.string(),
    type: z.string(),
    gender: z.string(),
    favorite: z.boolean().optional(),
    onSale: z.boolean().optional(),
    salePercent: z.number().optional().nullable(),
  });

  const data = createPajamaBodySchema.parse(request.body);

  const createPajamaUseCase = makeCreatePajamaUseCase();

  const { pajama } = await createPajamaUseCase.execute(data);

  return reply.status(201).send({
    pajama,
  });
}