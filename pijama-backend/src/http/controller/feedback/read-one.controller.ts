import { FeedbackPresenter } from "@/http/presenters/feedback-presenter";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import "@fastify/jwt"
import { makeReadOneFeedbackUseCase } from "@/use-case/factories/feedback/make-read-one-use-case";

export async function readFeedback (request: FastifyRequest, reply: FastifyReply){
    try{

        // o id publico de feedback será colhido na url
        const registerParamsSchema = z.object({
            publicId: z.string()
        })

        const { publicId } = registerParamsSchema.parse(request.params)

        const readFeedbackUseCase = makeReadOneFeedbackUseCase()
        const feedback = await readFeedbackUseCase.execute( publicId )

        return reply.status(201).send({
            message: "Feedback acessado com sucesso",
            feedback: FeedbackPresenter.toHTTP(feedback)

        })
    } catch (error) {
        if (error instanceof Error) return reply.status(400).send({ message: error.message})
    }
}