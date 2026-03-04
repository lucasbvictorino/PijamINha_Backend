import { FeedbackPresenter } from "@/http/presenters/feedback-presenter";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import "@fastify/jwt"
import { makeListFeedbackUseCase } from "@/use-case/factories/feedback/make-list-use-case";

export async function listFeedback (request: FastifyRequest, reply: FastifyReply){
    try{

        // o id publico de feedback será colhido na url
        const listBodySchema = z.object({
            rating: z.number().optional(),
            page: z.number().optional(),
            limit: z.number().optional()
        })

        const { rating, page, limit } = listBodySchema.parse(request.query)

        const listFeedbackUseCase = makeListFeedbackUseCase()
        const { feedbacks,
            totalCount,
            totalPages,
            currentPage } = await listFeedbackUseCase.execute( {rating, page, limit} )

        return reply.status(201).send({
            message: "Feedback acessado com sucesso",
            feedbacks: FeedbackPresenter.toHTTP(feedbacks),
            totalCount,
            totalPages,
            currentPage
        })
        
    } catch (error) {
        if (error instanceof Error) return reply.status(400).send({ message: error.message})
    }
}