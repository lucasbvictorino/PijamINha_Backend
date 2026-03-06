import { FeedbackPresenter } from "@/http/presenters/feedback-presenter.js";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import "@fastify/jwt"
import { makeReadOneFeedbackUseCase } from "@/use-cases/factories/feedbacks/make-read-one-use-case.js";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js";

export async function readFeedback (request: FastifyRequest, reply: FastifyReply){
    try{

        const registerParamsSchema = z.object({
            publicId: z.string()
        })

        const { publicId } = registerParamsSchema.parse(request.params)

        const readFeedbackUseCase = makeReadOneFeedbackUseCase()
        const feedback = await readFeedbackUseCase.execute( publicId )

        return reply.status(200).send({
            message: "Feedback acessado com sucesso",
            feedback: FeedbackPresenter.toHTTP(feedback)

        })
    } catch (error) {
        if (error instanceof ResourceNotFoundError) return reply.status(404).send({ message: error.message })
        if (error instanceof Error) return reply.status(400).send({ message: error.message})
    }
}