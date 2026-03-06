import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import "@fastify/jwt"
import { makeRegisterFeedbackUseCase } from "@/use-cases/factories/feedbacks/make-register-feedback-use-case.js";
import { FeedbackPresenter } from "@/http/presenters/feedback-presenter.js";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js";

export async function registerFeedback (request: FastifyRequest, reply: FastifyReply){
    try{

        const registerBodySchema = z.object({
            description: z.string(),
            rating: z.number()
        })

        const { description, rating } = registerBodySchema.parse(request.body)

        const idUsuario = request.user.sub

        const registerFeedbackUseCase = makeRegisterFeedbackUseCase()
        const feedback = await registerFeedbackUseCase.execute( idUsuario, {
            description,
            rating
        })

        return reply.status(201).send({
            message: "Feedback criado com sucesso",
            feedback: FeedbackPresenter.toHTTP(feedback)

        })
    } catch (error) {
        if (error instanceof ResourceNotFoundError) return reply.status(404).send({ message: error.message })
        if (error instanceof Error) return reply.status(400).send({ message: error.message})
    }
}