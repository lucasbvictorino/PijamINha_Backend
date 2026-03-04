import { PrismaFeedbacksRepository } from "@/repositories/prisma/feedbacks-prisma-repository"
import { ListFeedbacksUseCase } from "@/use-case/.feedback/list-use-case.js"

export function makeListFeedbackUseCase() {
    const feedbackRepository = new PrismaFeedbacksRepository()
    const listFeedbackRepository = new ListFeedbacksUseCase(feedbackRepository)

    return listFeedbackRepository
}