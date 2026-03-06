import fastify from 'fastify';
import { appRoutes } from './http/controllers/routes.js';
import { ZodError } from 'zod';
import fastifyJWT from '@fastify/jwt';
import { env } from './env/index.js';
import fastifyCors from '@fastify/cors';

export const app = fastify()

app.register(fastifyCors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
})

app.register(fastifyJWT, {
    secret: env.JWT_SECRET,
})

app.register(appRoutes)

app.setErrorHandler((error, _request,reply) => {
    if (error instanceof ZodError){
        return reply.status(400).send({
            message: 'Validation error',
            issues: error.format(),
        })
    }

    if (error instanceof SyntaxError){
        return reply.status(400).send({
            message: 'Invalid JSON payload',
        })
    }

    return reply.status(500).send({ message: 'Internal Server Error' })
})
