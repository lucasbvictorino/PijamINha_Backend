import { prisma } from "@/lib/prisma.js";
import { feedbacksRepository } from "../feedbacks-repository.js";
import { Prisma } from "@/@types/prisma/index.js";

export class PrismaFeedbacksRepository implements feedbacksRepository {
    async create ( user: { name: string, id: number }, data: { description: string, rating: number }){
        return await prisma.feedback.create({
            data: {
                name: user.name,
                description: data.description,
                rating: data.rating,
                userId: user.id
            }
        })
    }

    async update ( id: number, description: string, rating: number ){
        return await prisma.feedback.update({
            where: {
                id
            },
            data: {
                description,
                rating
            }
        })
    }

    async findBy ( where: Prisma.FeedbackWhereUniqueInput ){
       return await prisma.feedback.findUnique({ where })
    }

    async list ({rating, page = 1, limit = 5}: 
        {rating?: number, page?: number, limit?: number}) {

        const skip = (page-1) * limit

        const where: Prisma.FeedbackWhereInput = {
            rating: rating ? {
                gte: rating
            } : undefined
        }

        const feedbacks = await prisma.feedback.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                rating: 'desc'
            }
        })

        const totalCount = await prisma.feedback.count({ where })

        const totalPages = Math.ceil(totalCount / limit)

        return ({
            data: feedbacks,
            totalCount,
            totalPages,
            currentPage: page
        })
        }

    async delete ( id: number ){
        return await prisma.feedback.delete({
            where: { id }
        })
    }
}