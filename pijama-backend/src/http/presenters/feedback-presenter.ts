import type { Feedback } from "@/@types/prisma/index.js"

type HTTPPost = {
    id: string,

    description: string,
    rating: number,

    createdAt: Date,
    updatedAt: Date
}

export class FeedbackPresenter {
    static toHTTP (post: Feedback): HTTPPost
    static toHTTP (posts: Feedback[]): HTTPPost[]
    static toHTTP (input: Feedback | Feedback[]): HTTPPost | HTTPPost[] {
        if (Array.isArray(input)) {
            return input.map((post) => this.toHTTP(post))
        }

        return {
            id: input.publicId,

            description: input.description,
            rating: input.rating,

            createdAt: input.createdAt,
            updatedAt: input.updatedAt
        }
    }
}