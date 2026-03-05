import { FastifyInstance } from "fastify";
import { saleRoutes } from "./sales/sales.routes.js";

export async function appRoutes (app: FastifyInstance) {
    app.register(saleRoutes, { prefix: '/sale'})
}