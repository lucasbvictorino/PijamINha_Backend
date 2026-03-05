import { FastifyInstance } from "fastify";
import { createPajamaController } from "./create-pajama.controller.js";
import { listPajamasController } from "./list-pajama.controller.js";
import { getPajamaController } from "./get-pajama.controller.js";
import { updatePajamaStockController } from "./update-pajama-stock.controller.js";
import { deletePajamaController } from "./delete-pajama.controller.js";


export async function pajamaRoutes(app: FastifyInstance) {
  app.post("/", createPajamaController);
  app.get("/", listPajamasController);
  app.get("/:publicId", getPajamaController);
  app.patch("/:publicId/stock", updatePajamaStockController);
  app.delete("/:publicId", deletePajamaController);
}