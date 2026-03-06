import { PrismaFeedbacksRepository } from "@/repositories/prisma/feedbacks-prisma-repository.js"
import { PrismaUsersRepository } from "@/repositories/prisma/users-prisma-repository.js"
import { RegisterFeedbacksUseCase } from "@/use-cases/feedbacks/register-use-case.js"


export function makeRegisterFeedbackUseCase() {
    const feedbackRepository = new PrismaFeedbacksRepository()
    const usersRepository = new PrismaUsersRepository() 
    const registerFeedbackUseCase = new RegisterFeedbacksUseCase(feedbackRepository, usersRepository)

    return registerFeedbackUseCase
}