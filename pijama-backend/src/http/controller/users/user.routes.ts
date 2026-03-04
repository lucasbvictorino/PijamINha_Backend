import type { FastifyInstance } from "fastify"
import { createUser } from "./create-user.controller.js"
import { getUser, getUserProfile } from "./get-user.controller.js"
import { listUsers } from "./list-users.controller.js"
import { deleteUser, deleteUserProfile } from "./delete-user.controller.js"
import { updateUser, updateUserProfile } from "./update-user.controller.js"
import { authenticateUser } from "./authenticate.controller.js"
import { verifyJWT } from "@/http/middlewares/verify-jwt.js"
import { verifyUserRole } from "@/http/middlewares/verify-user-role.js"

export async function userRoutes(app: FastifyInstance) {
    app.post('/', createUser)
    app.post('/authenticate', authenticateUser)

    app.get('/:publicId', getUser)
    app.get('/', listUsers)

    // Rotas apenas para ADMIN
    app.delete('/:publicId', { onRequest: [verifyJWT, verifyUserRole(['ADMIN'])] }, deleteUser)
    app.patch('/:publicId', { onRequest: [verifyJWT, verifyUserRole(['ADMIN'])] }, updateUser)

    // User profile routes
    app.get('/me', { onRequest: [verifyJWT] }, getUserProfile)
    app.delete('/me', { onRequest: [verifyJWT] }, deleteUserProfile)
    app.patch('/me', { onRequest: [verifyJWT] }, updateUserProfile)
}