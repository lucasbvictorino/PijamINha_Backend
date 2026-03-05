import { SalePresenter } from "@/http/presenters/sale-presenter.js";
import { makeRegisterAdressUseCase } from "@/use-cases/factories/address/make-register-use-case.js";
import { makeRegisterSaleUseCase } from "@/use-cases/factories/sales/make-register-use-case.js";
import { FastifyRequest } from "fastify";
import { FastifyReply } from "fastify/types/reply.js";
import z from "zod";

export async function registerSale (request: FastifyRequest, reply: FastifyReply){
    try {

        const registerSaleBodySchema = z.object({
            sale: z.object({
                buyerName: z.string(),
                cpf: z.string(),
                price: z.number(),
                paymentMethod: z.string(),
                installments: z.number().optional().default(1),
                cardNumber: z.string().optional(),
            }),
            address: z.object ({
                zipCode: z.string(),
                state: z.string(),
                city: z.string(),
                neighborhood: z.string(),
                address: z.string(),
                number: z.string()
            }),
            sale_pajamas: z.array(
                z.object ({
                pajamaId: z.number(),
                quantity: z.number(),
                price: z.number()
            }))

        })

        const { address, sale, sale_pajamas } = registerSaleBodySchema.parse(request.body)

        const user = request.user.sub

        const registerAddressUseCase = makeRegisterAdressUseCase()
        const endereço = await registerAddressUseCase.execute(address)
        
        const registerSaleUseCase = makeRegisterSaleUseCase()
        const venda = await registerSaleUseCase.execute({
            buyerName: sale.buyerName,
            cpf: sale.cpf,
            paymentMethod: sale.paymentMethod,
            installments: sale.installments,
            cardNumber: sale.cardNumber,
            userId: user,
            addressId: endereço.id,
            pajamas: sale_pajamas
        })

        return reply.status(201).send({
            message:"Venda efetivada com sucesso",
            like: SalePresenter.toHTTP(venda)
        })


    } catch (error){
        if (error instanceof Error){
            return reply.status(400).send({ message: error.message})
        }
    }
}