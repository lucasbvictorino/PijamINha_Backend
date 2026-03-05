import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import "@fastify/jwt"
import { SalePresenter } from "@/http/presenters/sale-presenter.js";
import { makeListSaleUseCase } from "@/use-case/factories/sale/make-list-use-case.js";

export async function listSales (request: FastifyRequest, reply: FastifyReply){
    try{

        // o id publico de feedback será colhido na url
        const listBodySchema = z.object({
            page: z.number().optional(),
            limit: z.number().optional()
        })

        const { page, limit } = listBodySchema.parse(request.query)

        const listSalesUseCase = makeListSaleUseCase()
        const { 
            sales,
            totalCount,
            totalPages,
            currentPage 
        } = await listSalesUseCase.execute( { page, limit } )
 
        return reply.status(201).send({
            message: "Feedback acessado com sucesso",
            feedbacks: SalePresenter.toHTTP(sales),
            totalCount,
            totalPages,
            currentPage
        })
        
    } catch (error) {
        if (error instanceof Error) return reply.status(400).send({ message: error.message})
    }
}