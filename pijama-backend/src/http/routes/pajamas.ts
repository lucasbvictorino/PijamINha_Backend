import { FastifyInstance } from "fastify";
import { createPajamaController } from "../controllers/pajamas/create-pajama.js";
import { listPajamasController } from "../controllers/pajamas/list-pajama.js";
import { getPajamaController } from "../controllers/pajamas/get-pajama.js";
import { updatePajamaStockController } from "../controllers/pajamas/update-pajama-stock.js";
import { deletePajamaController } from "../controllers/pajamas/delete-pajama.js";

export async function pajamasRoutes(app: FastifyInstance) {
  app.post("/pajamas", createPajamaController);
  app.get("/pajamas", listPajamasController);
  app.get("/pajamas/:id", getPajamaController);
  app.patch("/pajamas/:id/stock", updatePajamaStockController);
  app.delete("/pajamas/:id", deletePajamaController);
}