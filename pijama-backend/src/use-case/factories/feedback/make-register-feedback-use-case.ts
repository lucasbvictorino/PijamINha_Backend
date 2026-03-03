import { PrismaFeedbacksRepository } from "@/repositories/prisma/feedbacks-prisma-repository"
import { RegisterFeedbacksUseCase } from "@/use-case/.feedback/register-use-case.js"

export function makeRegisterFeedbackUseCase() {
    const feedbackRepository = new PrismaFeedbacksRepository()
    const registerFeedbackUseCase = new RegisterFeedbacksUseCase(feedbackRepository)

    return registerFeedbackUseCase
}