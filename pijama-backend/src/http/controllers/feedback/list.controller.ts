import { FeedbackPresenter } from "@/http/presenters/feedback-presenter.js";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import "@fastify/jwt"
import { makeListFeedbackUseCase } from "@/use-cases/factories/feedbacks/make-list-use-case.js";

export async function listFeedback (request: FastifyRequest, reply: FastifyReply){
    try{

        const listBodySchema = z.object({
            rating: z.coerce.number().optional(),
            page: z.coerce.number().optional(),
            limit: z.coerce.number().optional()
        })

        const { rating, page, limit } = listBodySchema.parse(request.query)

        const listFeedbackUseCase = makeListFeedbackUseCase()
        const { feedbacks,
            totalCount,
            totalPages,
            currentPage } = await listFeedbackUseCase.execute( {rating, page, limit} )

        return reply.status(200).send({
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