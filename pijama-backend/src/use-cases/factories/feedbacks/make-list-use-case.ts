import { PrismaFeedbacksRepository } from "@/repositories/prisma/feedbacks-prisma-repository"
import { ListFeedbacksUseCase } from "@/use-cases/feedbacks/list-use-case"


export function makeListFeedbackUseCase() {
    const feedbackRepository = new PrismaFeedbacksRepository()
    const listFeedbackRepository = new ListFeedbacksUseCase(feedbackRepository)

    return listFeedbackRepository
}