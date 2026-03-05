import { PrismaFeedbacksRepository } from "@/repositories/prisma/feedbacks-prisma-repository"
import { ReadOneFeedbackUseCase } from "@/use-cases/feedbacks/read-one-use-case"

export function makeReadOneFeedbackUseCase() {
    const feedbackRepository = new PrismaFeedbacksRepository()
    const readOneFeedbackRepository = new ReadOneFeedbackUseCase(feedbackRepository)

    return readOneFeedbackRepository
}