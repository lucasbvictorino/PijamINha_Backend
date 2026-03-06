import { PrismaFeedbacksRepository } from "@/repositories/prisma/feedbacks-prisma-repository.js"
import { PrismaUsersRepository } from "@/repositories/prisma/users-prisma-repository.js"
import { UpdateFeedbackUseCase } from "@/use-cases/feedbacks/update-use-case.js"


export function makeUpdateFeedbackUseCase() {
    const feedbackRepository = new PrismaFeedbacksRepository()
    const userRepository = new PrismaUsersRepository()
    const updateFeedbackUseCase = new UpdateFeedbackUseCase(feedbackRepository, userRepository)

    return updateFeedbackUseCase
}
