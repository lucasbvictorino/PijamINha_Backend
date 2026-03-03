import { prisma } from "@/lib/prisma.js";
import { feedbacksRepository } from "../feedbacks-repository.js";
import { Prisma } from "../../@types/prisma";

export class PrismaFeedbacksRepository implements feedbacksRepository {
    async create ( user: { name: string, id: number }, data: { description: string, rating: number }){
        return await prisma.feedback.create({
            data: {
                name: user.name,
                description: data.description,
                rating: data.rating,
                user: user.id
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
}