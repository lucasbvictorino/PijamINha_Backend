import { Feedback } from '@/@types/prisma/index.js'
import { feedbacksRepository } from '../../repositories/feedbacks-repository.js'

export class ReadOneFeedbackUseCase {

    constructor ( private feedbacksRepository: feedbacksRepository ) {}
    
    async execute ( idFeedback: string ): Promise<Feedback> {

        // vamos encontrar o feedback:
        const feedback = await this.feedbacksRepository.findBy({publicId: idFeedback })

        // vamos checar se o feedback existe:
        if (!feedback) throw new Error("O feedback não existe")
        
        return feedback
    }
}