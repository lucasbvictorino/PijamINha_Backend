import { PrismaFeedbacksRepository } from "@/repositories/prisma/feedbacks-prisma-repository"
import { DeleteFeedbacksUseCase } from "@/use-case/.feedback/delete-use-case.js"

export function makeDeleteFeedbackUseCase() {
    const feedbackRepository = new PrismaFeedbacksRepository()
    const userRepository = new PrismaUsersRepository()
    const deleteFeedbackRepository = new DeleteFeedbacksUseCase(feedbackRepository, userRepository)

    return deleteFeedbackRepository
}