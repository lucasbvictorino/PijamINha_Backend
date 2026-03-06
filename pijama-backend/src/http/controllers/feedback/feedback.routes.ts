import { FastifyInstance } from "fastify"
import { verifyJWT } from "@/http/middlewares/verify-jwt.js"
import { registerFeedback } from "./register.controller.js"
import { listFeedback } from "./list.controller.js"
import { readFeedback } from "./read-one.controller.js"
import { deleteFeedback } from "./delete.controller.js"
import { updateFeedback } from "./update.controller.js"

export async function feedbackRoutes (app: FastifyInstance) {
    app.post('/', { onRequest: [verifyJWT] }, registerFeedback)

    app.get('/', listFeedback)
    app.get('/:publicId', readFeedback)

    app.patch('/:publicId', { onRequest: [verifyJWT] }, updateFeedback)
    app.delete('/:publicId', { onRequest: [verifyJWT] }, deleteFeedback)
}