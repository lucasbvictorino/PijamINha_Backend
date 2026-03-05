import { FastifyInstance } from "fastify";
import { userRoutes } from "./users/user.routes.js";
import { feedbackRoutes } from "./feedback/feedback.routes.js";

export async function appRoutes (app: FastifyInstance) {
    app.register(userRoutes, { prefix: '/users' })
    app.register(feedbackRoutes, { prefix: '/feedback' })
}