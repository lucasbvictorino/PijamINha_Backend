
import { Feedback } from '@/@types/prisma/index.js'
import { feedbacksRepository } from '../../repositories/feedbacks-repository.js'

interface listFeedbacksUseCaseRequest {
    rating?: number
    page?: number
    limit?: number
}

type listFeedbacksUSeCaseResponse = {
    feedbacks: Feedback[]
    totalCount: number
    totalPages: number
    currentPage: number
}

export class ListFeedbacksUseCase {

    constructor (private feedbacksRepository: feedbacksRepository) {}

    async execute({ rating, page, limit }: listFeedbacksUseCaseRequest): Promise<listFeedbacksUSeCaseResponse>{

        const { 
            data: feedbacks,
            totalCount,
            totalPages, 
            currentPage } = await this.feedbacksRepository.list({ rating, page, limit })

        return { feedbacks, totalCount, totalPages, currentPage }

    }
}