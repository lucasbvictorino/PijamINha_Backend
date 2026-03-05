import { Feedback, Prisma } from "../@types/prisma"

interface listFeedbacksQuery {
    rating?: number
    page?: number
    limit?: number
}

interface listFeedbacksResponse{
    data: Feedback[]
    totalCount: number
    totalPages: number
    currentPage: number
}

export interface feedbacksRepository {
    create( user: {name: string, id: number }, data: { description: string, rating: number } ): Promise<Feedback>

    update( id: number, description: string, rating: number ): Promise<Feedback|null>

    findBy( where: Prisma.FeedbackWhereUniqueInput ): Promise<Feedback|null>
    list( query: listFeedbacksQuery ): Promise<listFeedbacksResponse>

    delete( id: number ): Promise<Feedback>
}