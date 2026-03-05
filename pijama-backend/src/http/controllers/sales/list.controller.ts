import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import "@fastify/jwt"
import { SalePresenter } from "@/http/presenters/sale-presenter.js";
import { makeListSaleUseCase } from "@/use-cases/factories/sales/make-list-use-case.js";

export async function listSales (request: FastifyRequest, reply: FastifyReply){
    try{

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
 
        return reply.status(200).send({
            message: "Vendas acessadas com sucesso",
            sales: SalePresenter.toHTTP(sales),
            totalCount,
            totalPages,
            currentPage
        })
        
    } catch (error) {
        if (error instanceof Error) return reply.status(400).send({ message: error.message})
    }
}