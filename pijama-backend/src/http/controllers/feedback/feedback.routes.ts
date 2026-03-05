import { FastifyInstance } from "fastify"
import { registerFeedback } from "./register.controller"
import { listFeedback } from "./list.controller"
import { readFeedback } from "./read-one.controller"
import { deleteFeedback } from "./delete.controller"
import { verifyJWT } from "@/http/middlewares/verify-jwt.js"

export async function feedbackRoutes (app: FastifyInstance) {
    app.post('/', { onRequest: [verifyJWT] }, registerFeedback)

    app.get('/', listFeedback)
    app.get('/:publicId', readFeedback)

    app.delete('/:publicId', { onRequest: [verifyJWT] }, deleteFeedback)
}