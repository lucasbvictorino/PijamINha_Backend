import { FastifyInstance } from "fastify";
import { pajamasRoutes } from "./pajamas.js";

export async function appRoutes(app: FastifyInstance) {
  app.register(pajamasRoutes);
}