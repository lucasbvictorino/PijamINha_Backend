import { PrismaFeedbacksRepository } from "@/repositories/prisma/feedbacks-prisma-repository"
import { PrismaUsersRepository } from "@/repositories/prisma/users-prisma-repository"
import { RegisterFeedbacksUseCase } from "@/use-cases/feedbacks/register-use-case"


export function makeRegisterFeedbackUseCase() {
    const feedbackRepository = new PrismaFeedbacksRepository()
    const usersRepository = new PrismaUsersRepository() 
    const registerFeedbackUseCase = new RegisterFeedbacksUseCase(feedbackRepository, usersRepository)

    return registerFeedbackUseCase
}