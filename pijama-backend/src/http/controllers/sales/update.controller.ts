import { SalePresenter } from "@/http/presenters/sale-presenter.js";
import { makeUpdateSaleUseCase } from "@/use-cases/factories/sales/make-update-use-case.js";
import { FastifyRequest } from "fastify";
import { FastifyReply } from "fastify/types/reply.js";
import z from "zod";

export async function updateSale (request: FastifyRequest, reply: FastifyReply){
    try {

        const updateSaleParamsSchema = z.object({
            publicId: z.string()
        })

        const { publicId } = updateSaleParamsSchema.parse(request.params)

        const updateSaleBodySchema = z.object({
            buyerName: z.string().optional(),
            cpf: z.string().optional()
        })

        const { buyerName, cpf } = updateSaleBodySchema.parse(request.body)

        const user = request.user.sub

        const updateSaleUseCase = makeUpdateSaleUseCase()
        const { sale } = await updateSaleUseCase.execute({
            publicIdSale: publicId,
            publicIdUser: user,
            buyerName,
            cpf
        })

        return reply.status(200).send({
            message: "Venda atualizada com sucesso",
            sale: SalePresenter.toHTTP(sale)
        })

    } catch (error){
        if (error instanceof Error){
            return reply.status(400).send({ message: error.message})
        }
    }
}
