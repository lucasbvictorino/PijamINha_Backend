import { USER_ROLE } from "./prisma/index.js";
import "fastify/jwt"

declare module "@fastify/jwt" {
    interface FastifyJWT {
        payload: { sub: string, role: USER_ROLE }
        user: { sub: string, role: USER_ROLE }
    }
}