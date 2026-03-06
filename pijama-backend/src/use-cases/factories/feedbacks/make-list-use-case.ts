import { PrismaFeedbacksRepository } from "@/repositories/prisma/feedbacks-prisma-repository.js"
import { ListFeedbacksUseCase } from "@/use-cases/feedbacks/list-use-case.js"


export function makeListFeedbackUseCase() {
    const feedbackRepository = new PrismaFeedbacksRepository()
    const listFeedbackUseCase = new ListFeedbacksUseCase(feedbackRepository)

    return listFeedbackUseCase
}