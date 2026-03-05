import { FastifyInstance } from "fastify"
import { registerFeedback } from "./register.controller"
import { listFeedback } from "./list.controller"
import { readFeedback } from "./read-one.controller"
import { deleteFeedback } from "./delete.controller"

export async function postRoutes (app: FastifyInstance) {
    app.post('/', registerFeedback)

    app.get('/', listFeedback)
    app.get('/:id', readFeedback)

    app.delete('/:publicPostId', deleteFeedback)
}