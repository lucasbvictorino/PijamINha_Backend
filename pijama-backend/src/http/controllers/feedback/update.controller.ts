import { FeedbackPresenter } from "@/http/presenters/feedback-presenter.js";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import "@fastify/jwt"
import { makeUpdateFeedbackUseCase } from "@/use-cases/factories/feedbacks/make-update-use-case.js";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js";

export async function updateFeedback (request: FastifyRequest, reply: FastifyReply){
    try{

        const updateParamsSchema = z.object({
            publicId: z.string()
        })

        const updateBodySchema = z.object({
            description: z.string().optional(),
            rating: z.number().optional()
        })

        const { publicId } = updateParamsSchema.parse(request.params)
        const { description, rating } = updateBodySchema.parse(request.body)

        const idUsuario = request.user.sub

        const updateFeedbackUseCase = makeUpdateFeedbackUseCase()
        const { feedback } = await updateFeedbackUseCase.execute({
            publicIdFeedback: publicId,
            publicIdUser: idUsuario,
            description,
            rating
        })

        return reply.status(200).send({
            message: "Feedback atualizado com sucesso",
            feedback: FeedbackPresenter.toHTTP(feedback)
        })
    } catch (error) {
        if (error instanceof ResourceNotFoundError) return reply.status(404).send({ message: error.message })
        if (error instanceof Error) return reply.status(400).send({ message: error.message})
    }
}
