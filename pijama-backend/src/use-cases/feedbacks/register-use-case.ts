import { UsersRepository } from '@/repositories/users-repository.js'
import { feedbacksRepository } from '../../repositories/feedbacks-repository.js'
import { Feedback } from '@/@types/prisma/index.js'

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

            // vamos encontrar o usuario:
            const user = await this.usersRepository.findBy( {publicId: idUser})

            // vamos checar se usuario existe:
            if (!user) throw new Error ("Usuário não existe")
            
            // agora vamos encapsular as informações que passaremos:
            const userUtil = { name: user.name, id: user.id }

            const feedbackCriado = await this.feedbacksRepository.create( userUtil, register )

            return feedbackCriado
    }
}