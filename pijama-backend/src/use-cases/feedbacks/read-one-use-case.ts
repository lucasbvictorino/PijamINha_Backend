import { Feedback } from '@/@types/prisma/index.js'
import { feedbacksRepository } from '../../repositories/feedbacks-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

export class ReadOneFeedbackUseCase {

    constructor ( private feedbacksRepository: feedbacksRepository ) {}
    
    async execute ( idFeedback: string ): Promise<Feedback> {

        const feedback = await this.feedbacksRepository.findBy({publicId: idFeedback })

        if (!feedback) throw new ResourceNotFoundError()
        
        return feedback
    }
}