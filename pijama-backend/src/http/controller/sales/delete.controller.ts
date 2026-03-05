import { makeRegisterAdressUseCase } from "@/use-case/factories/address/make-register-use-case.js";
import { makeDeleteSaleUseCase } from "@/use-case/factories/sale/make-delete-use-case.js";
import { makeRegisterSaleUseCase } from "@/use-case/factories/sale/make-register-use-case.js";
import { FastifyRequest } from "fastify";
import { FastifyReply } from "fastify/types/reply.js";
import z from "zod";

export async function registerSale (request: FastifyRequest, reply: FastifyReply){
    try {

        const deleteSaleBodySchema = z.object({
            publicId: z.string()
        }) 

        const { publicId } = deleteSaleBodySchema.parse(request.params)

        const user = request.user.sub

        const deleteSaleUseCase = makeDeleteSaleUseCase()
        const venda = await deleteSaleUseCase.execute(publicId, user)

        return reply.status(201).send({
            message:"Venda deletada com sucesso",
            like: SalePresenter.toHTTP(venda)
        })

    } catch (error){

    }
}