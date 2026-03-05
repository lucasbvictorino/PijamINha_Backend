import { SalePresenter } from "@/http/presenters/sale-presenter.js";
import { makeDeleteSaleUseCase } from "@/use-cases/factories/sales/make-delete-use-case.js";
import { FastifyRequest } from "fastify";
import { FastifyReply } from "fastify/types/reply.js";
import z from "zod";

export async function deleteSale (request: FastifyRequest, reply: FastifyReply){
    try {

        const deleteSaleBodySchema = z.object({
            publicId: z.string()
        }) 

        const { publicId } = deleteSaleBodySchema.parse(request.params)

        const user = request.user.sub

        const deleteSaleUseCase = makeDeleteSaleUseCase()
        const venda = await deleteSaleUseCase.execute(publicId, user)

        return reply.status(200).send({
            message:"Venda deletada com sucesso",
            like: SalePresenter.toHTTP(venda)
        })

    } catch (error){
        if (error instanceof Error){
            return reply.status(400).send({ message: error.message})
        }
    }
}