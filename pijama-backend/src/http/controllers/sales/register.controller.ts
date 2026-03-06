import { SalePresenter } from "@/http/presenters/sale-presenter.js";
import { makeRegisterAdressUseCase } from "@/use-cases/factories/address/make-register-use-case.js";
import { makeRegisterSaleUseCase } from "@/use-cases/factories/sales/make-register-use-case.js";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js";
import { InsufficientStockError } from "@/use-cases/errors/insufficient-stock-error.js";
import { FastifyRequest } from "fastify";
import { FastifyReply } from "fastify/types/reply.js";
import z from "zod";

export async function registerSale (request: FastifyRequest, reply: FastifyReply){
    try {

        const registerSaleBodySchema = z.object({
            sale: z.object({
                buyerName: z.string(),
                cpf: z.string(),
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
                z.object({
                    publicId: z.string(),
                    quantity: z.number().int().positive(),
                    size: z.enum(["PP", "P", "M", "G", "GG"])
                })
            )
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
            message: "Venda efetivada com sucesso",
            sale: SalePresenter.toHTTP(venda)
        })


    } catch (error){
        if (error instanceof ResourceNotFoundError){
            return reply.status(404).send({ message: error.message})
        }
        if (error instanceof InsufficientStockError){
            return reply.status(409).send({ message: error.message})
        }
        if (error instanceof Error){
            return reply.status(400).send({ message: error.message})
        }
    }
}