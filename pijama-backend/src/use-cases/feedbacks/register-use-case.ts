import { UsersRepository } from '@/repositories/users-repository.js'
import { feedbacksRepository } from '../../repositories/feedbacks-repository.js'
import { Feedback } from '@/@types/prisma/index.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface registerFeedbackUseCaseRequest {
    description: string,
    rating: number
}

export class RegisterFeedbacksUseCase {

    constructor ( 
        private feedbacksRepository: feedbacksRepository,
        private usersRepository: UsersRepository
    ) {}
    
    async execute (idUser: string,
        register: registerFeedbackUseCaseRequest): Promise<Feedback> {

            const user = await this.usersRepository.findBy( {publicId: idUser})

            if (!user) throw new ResourceNotFoundError()
            
            const userUtil = { name: user.name, id: user.id }

            const feedbackCriado = await this.feedbacksRepository.create( userUtil, register )

            return feedbackCriado
    }
}