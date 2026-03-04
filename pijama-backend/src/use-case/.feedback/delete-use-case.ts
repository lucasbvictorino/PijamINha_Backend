import type { Feedback } from "../../@types/prisma"
import { feedbacksRepository } from '../../repositories/feedbacks-repository.js'

export class DeleteFeedbacksUseCase {

    constructor ( private feedbacksRepository: feedbacksRepository,
        private usersRepository: userRepository
    ) {}
    
    async execute ( idUser: string, idFeedback: string ): Promise<Feedback> {

        // vamos encontrar o usuario:
        const user = await this.userRepository.findby( {publicId: idUser} )

        // vamos checar se usuario existe:
        if (!user) throw new Error ("Usuário não existe")
        
        // vamos encontrar o feedback:
        const feedback = await this.feedbacksRepository.findBy({publicId: idFeedback })

        // vamos checar se o feedback existe:
        if (!feedback) throw new Error("O feedback não existe")

        // vamos checar se o autor do feedback é o mesmo que tanta fazer a deleção:
        if (feedback.userId != user.id) throw new Error ("Voce não tem permissão para isso")

        const deletado = await this.feedbacksRepository.delete( feedback.id )
        
        return deletado
    }
}