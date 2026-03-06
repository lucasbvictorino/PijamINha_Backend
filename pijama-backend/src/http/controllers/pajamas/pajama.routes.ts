import { FastifyInstance } from "fastify";
import { createPajamaController } from "./create-pajama.controller.js";
import { listPajamasController } from "./list-pajama.controller.js";
import { getPajamaController } from "./get-pajama.controller.js";
import { updatePajamaStockController } from "./update-pajama-stock.controller.js";
import { deletePajamaController } from "./delete-pajama.controller.js";
import { verifyJWT } from "@/http/middlewares/verify-jwt.js";
import { verifyUserRole } from "@/http/middlewares/verify-user-role.js";


export async function pajamaRoutes(app: FastifyInstance) {
  app.post("/", { onRequest: [verifyJWT, verifyUserRole(['ADMIN'])] }, createPajamaController);
  app.get("/", listPajamasController);
  app.get("/:publicId", getPajamaController);
  app.patch("/:publicId/stock", { onRequest: [verifyJWT, verifyUserRole(['ADMIN'])] }, updatePajamaStockController);
  app.delete("/:publicId", { onRequest: [verifyJWT, verifyUserRole(['ADMIN'])] }, deletePajamaController);
}