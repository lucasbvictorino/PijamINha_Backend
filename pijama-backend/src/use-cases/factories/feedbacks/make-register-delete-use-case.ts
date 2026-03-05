import { PrismaFeedbacksRepository } from "@/repositories/prisma/feedbacks-prisma-repository.js"
import { PrismaUsersRepository } from "@/repositories/prisma/users-prisma-repository.js"
import { DeleteFeedbacksUseCase } from "@/use-cases/feedbacks/delete-use-case.js"


export function makeDeleteFeedbackUseCase() {
    const feedbackRepository = new PrismaFeedbacksRepository()
    const userRepository = new PrismaUsersRepository()
    const deleteFeedbackRepository = new DeleteFeedbacksUseCase(feedbackRepository, userRepository)

    return deleteFeedbackRepository
}