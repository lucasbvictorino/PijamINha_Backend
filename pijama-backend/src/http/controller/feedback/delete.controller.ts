import { FeedbackPresenter } from "@/http/presenters/feedback-presenter";
import { makeRegisterFeedbackUseCase } from "@/use-case/factories/feedback/make-register-feedback-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import "@fastify/jwt"
import { makeDeleteFeedbackUseCase } from "@/use-case/factories/feedback/make-register-delete-use-case";

export async function deleteFeedback (request: FastifyRequest, reply: FastifyReply){
    try{

        // o id publico de feedback será colhido na url
        const registerParamsSchema = z.object({
            publicId: z.string()
        })

        const { publicId } = registerParamsSchema.parse(request.params)

        const idUsuario = request.user.sub

        const deleteFeedbackUseCase = makeDeleteFeedbackUseCase()
        const feedback = await deleteFeedbackUseCase.execute( idUsuario, publicId )

        return reply.status(201).send({
            message: "Feedback criado com sucesso",
            feedback: FeedbackPresenter.toHTTP(feedback)

        })
    } catch (error) {
        if (error instanceof Error) return reply.status(400).send({ message: error.message})
    }
}