import { SalePresenter } from "@/http/presenters/sale-presenter.js";
import { makeReadSaleUseCase } from "@/use-case/factories/sale/make-read-use-case.js";
import { FastifyRequest } from "fastify";
import { FastifyReply } from "fastify/types/reply.js";
import z from "zod";

export async function readSale (request: FastifyRequest, reply: FastifyReply){
    try {

        const deleteSaleBodySchema = z.object({
            publicId: z.string()
        }) 

        const { publicId } = deleteSaleBodySchema.parse(request.params)

        const readSaleUseCase = makeReadSaleUseCase()
        const venda = await readSaleUseCase.execute(publicId)

        return reply.status(201).send({
            message:"Venda acessada com sucesso",
            like: SalePresenter.toHTTP(venda)

        })

    } catch (error){
        if (error instanceof Error){
            return reply.status(400).send({ message: error.message})
        }
    }
}