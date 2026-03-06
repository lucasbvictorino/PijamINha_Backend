import { PrismaFeedbacksRepository } from "@/repositories/prisma/feedbacks-prisma-repository.js"
import { ReadOneFeedbackUseCase } from "@/use-cases/feedbacks/read-one-use-case.js"


export function makeReadOneFeedbackUseCase() {
    const feedbackRepository = new PrismaFeedbacksRepository()
    const readOneFeedbackUseCase = new ReadOneFeedbackUseCase(feedbackRepository)

    return readOneFeedbackUseCase
}