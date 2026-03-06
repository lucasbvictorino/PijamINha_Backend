
import { Feedback } from '@/@types/prisma/index.js'
import { feedbacksRepository } from '../../repositories/feedbacks-repository.js'
import { UsersRepository } from '@/repositories/users-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

export class DeleteFeedbacksUseCase {

    constructor ( private feedbacksRepository: feedbacksRepository,
        private usersRepository: UsersRepository
    ) {}
    
    async execute ( idUser: string, idFeedback: string ): Promise<Feedback> {

        const user = await this.usersRepository.findBy( {publicId: idUser} )
        if (!user) throw new ResourceNotFoundError()
        
        const feedback = await this.feedbacksRepository.findBy({publicId: idFeedback })
        if (!feedback) throw new ResourceNotFoundError()

        if (feedback.userId !== user.id) throw new Error ("Voce não tem permissão para isso")

        const deletado = await this.feedbacksRepository.delete( feedback.id )
        
        return deletado
    }
}