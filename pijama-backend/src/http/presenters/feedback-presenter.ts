import type { Feedback } from "@/@types/prisma/index.js"

type HTTPFeedback = {
    id: string,
    name: string,

    description: string,
    rating: number,

    createdAt: Date,
    updatedAt: Date
}

export class FeedbackPresenter {
    static toHTTP (feedback: Feedback): HTTPFeedback
    static toHTTP (feedbacks: Feedback[]): HTTPFeedback[]
    static toHTTP (input: Feedback | Feedback[]): HTTPFeedback | HTTPFeedback[] {
        if (Array.isArray(input)) {
            return input.map((feedback) => this.toHTTP(feedback))
        }

        return {
            id: input.publicId,
            name: input.name,
            description: input.description,
            rating: input.rating,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt
        }
    }
}