import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeListPajamasUseCase } from "../../../factories/make-list-pajama.js";

export async function listPajamasController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const querySchema = z.object({
    page: z.coerce.number().default(1),
    perPage: z.coerce.number().default(10),
  });

  const { page, perPage } = querySchema.parse(request.query);

  const listPajamasUseCase = makeListPajamasUseCase();

  const { pajamas } = await listPajamasUseCase.execute({
    page,
    perPage,
  });

  return reply.status(200).send({
    pajamas,
  });
}