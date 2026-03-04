import { Feedback, Prisma } from "../@types/prisma";

export interface feedbacksRepository {
    create( user: {name: string, id: number }, data: { description: string, rating: number } ): Promise<Feedback>

    update( id: number, description: string, rating: number ): Promise<Feedback|null>

    findBy( where: Prisma.FeedbackWhereUniqueInput ): Promise<Feedback|null>

    delete( id: number ): Promise<Feedback>
}