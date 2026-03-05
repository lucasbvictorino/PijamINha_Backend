import { SalePresenter } from "@/http/presenters/sale-presenter.js";
import { makeDeleteSaleUseCase } from "@/use-case/factories/sale/make-delete-use-case.js";
import { FastifyRequest } from "fastify";
import { FastifyReply } from "fastify/types/reply.js";
import z from "zod";

export async function deleteSale (request: FastifyRequest, reply: FastifyReply){
    try {

        const deleteSaleBodySchema = z.object({
            publicPostId: z.string()
        }) 

        const { publicPostId: publicId } = deleteSaleBodySchema.parse(request.params)

        const user = request.user.sub

        const deleteSaleUseCase = makeDeleteSaleUseCase()
        const venda = await deleteSaleUseCase.execute(publicId, user)

        return reply.status(201).send({
            message:"Venda deletada com sucesso",
            like: SalePresenter.toHTTP(venda)
        })

    } catch (error){
        if (error instanceof Error){
            return reply.status(400).send({ message: error.message})
        }
    }
}