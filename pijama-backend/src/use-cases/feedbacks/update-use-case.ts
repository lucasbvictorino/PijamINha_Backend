import { Feedback } from '@/@types/prisma/index.js'
import { feedbacksRepository } from '../../repositories/feedbacks-repository.js'
import { UsersRepository } from '@/repositories/users-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface UpdateFeedbackUseCaseRequest {
    publicIdFeedback: string
    publicIdUser: string
    description?: string
    rating?: number
}

type UpdateFeedbackUseCaseResponse = {
    feedback: Feedback
}

export class UpdateFeedbackUseCase {

    constructor(
        private feedbacksRepository: feedbacksRepository,
        private usersRepository: UsersRepository
    ) {}

    async execute({
        publicIdFeedback,
        publicIdUser,
        description,
        rating
    }: UpdateFeedbackUseCaseRequest): Promise<UpdateFeedbackUseCaseResponse> {

        const user = await this.usersRepository.findBy({ publicId: publicIdUser })

        if (!user) throw new ResourceNotFoundError()

        const feedbackToUpdate = await this.feedbacksRepository.findBy({ publicId: publicIdFeedback })

        if (!feedbackToUpdate) throw new ResourceNotFoundError()

        if (feedbackToUpdate.userId !== user.id) throw new Error("Você não tem permissão para isso")

        const feedback = await this.feedbacksRepository.update(
            feedbackToUpdate.id,
            description ?? feedbackToUpdate.description,
            rating ?? feedbackToUpdate.rating
        )

        if (!feedback) throw new ResourceNotFoundError()

        return { feedback }
    }
}
