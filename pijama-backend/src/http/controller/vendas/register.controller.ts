import { makeRegisterAdressUseCase } from "@/use-case/factories/address/make-register-use-case.js";
import { FastifyRequest } from "fastify";
import { FastifyReply } from "fastify/types/reply.js";
import z from "zod";

export async function registerSale (request: FastifyRequest, reply: FastifyReply){
    try {

        const registerSaleBodySchema = z.object({
            address: z.object ({
                zipCode: z.string(),
                state: z.string(),
                city: z.string(),
                neighborhood: z.string(),
                address: z.string(),
                number: z.string()
            }),
            sale: z.object({
                buyerName: z.string(),
                cpf: z.string(),
                price: z.number(),
                paymentMethod: z.string(),
                installments: z.number().optional().default(1),
                cardNumber: z.string().optional(),
                userId: z.string()
            })
        })

        const { address, sale } = registerSaleBodySchema.parse(request.body)

        const registerAddressUseCase = makeRegisterAdressUseCase()
        const endereço = await registerAddressUseCase.execute(address)
        
        return "yess"

    } catch (error){

    }
}