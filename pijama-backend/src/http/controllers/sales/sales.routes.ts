import { FastifyInstance } from "fastify"
import { registerSale } from "./register.controller.js"
import { listSales } from "./list.controller.js"
import { readSale } from "./read.controller.js"
import { deleteSale } from "./delete.controller.js"
import { verifyJWT } from "@/http/middlewares/verify-jwt.js"


export async function saleRoutes (app: FastifyInstance) {
    app.post('/', { onRequest: [verifyJWT] }, registerSale)

    app.get('/', listSales)
    app.get('/:publicId', readSale)

    app.delete('/:publicId', { onRequest: [verifyJWT] }, deleteSale)
}