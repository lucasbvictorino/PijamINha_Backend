import { PrismaFeedbacksRepository } from "@/repositories/prisma/feedbacks-prisma-repository"
import { PrismaUsersRepository } from "@/repositories/prisma/users-prisma-repository"
import { DeleteFeedbacksUseCase } from "@/use-cases/feedbacks/delete-use-case"

export function makeDeleteFeedbackUseCase() {
    const feedbackRepository = new PrismaFeedbacksRepository()
    const userRepository = new PrismaUsersRepository()
    const deleteFeedbackRepository = new DeleteFeedbacksUseCase(feedbackRepository, userRepository)

    return deleteFeedbackRepository
}