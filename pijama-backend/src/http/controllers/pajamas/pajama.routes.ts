import { FastifyInstance } from "fastify";
import { createPajamaController } from "./create-pajama.controller";
import { deletePajamaController } from "./delete-pajama.controller";
import { getPajamaController } from "./get-pajama.controller";
import { listPajamasController } from "./list-pajama.controller";
import { updatePajamaStockController } from "./update-pajama-stock.controller";

export async function pajamaRoutes(app: FastifyInstance) {
  app.post("/", createPajamaController);
  app.get("/", listPajamasController);
  app.get("/:publicId", getPajamaController);
  app.patch("/:publicId/stock", updatePajamaStockController);
  app.delete("/:publicId", deletePajamaController);
}