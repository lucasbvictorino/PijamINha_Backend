import { PrismaFeedbacksRepository } from "@/repositories/prisma/feedbacks-prisma-repository"
import { ReadOneFeedbackUseCase } from "@/use-case/.feedback/read-one-use-case.js"

export function makeReadOneFeedbackUseCase() {
    const feedbackRepository = new PrismaFeedbacksRepository()
    const readOneFeedbackRepository = new ReadOneFeedbackUseCase(feedbackRepository)

    return readOneFeedbackRepository
}