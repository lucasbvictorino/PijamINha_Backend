import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function registerFeedback (request: FastifyRequest, reply: FastifyReply){
    try{

        // não é necessário passar o nome do usuário por aqui, pois o usuário estará logado.
        const registerBodySchema = z.object({
            description: z.string(),
            rating: z.number()
        })

        const { description, rating } = registerBodySchema.parse(request.body)

        const { idUsuario } = request.user.sub
    }
}