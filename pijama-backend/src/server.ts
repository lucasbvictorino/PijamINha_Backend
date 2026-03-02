import fastify from 'fastify'
import { env } from './env'

export const app = fastify({
  logger: true,
})

app.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log(`Server rodando em http://localhost:${env.PORT}`)
})
