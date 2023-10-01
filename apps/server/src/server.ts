import 'dotenv/config'

import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'

import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'node:path'

const app = fastify()

app.register(multipart)

app.register(fastifyStatic, {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app.register(fastifyCors, { origin: true })
app.register(jwt, { secret: process.env.JWT_SECRET! })

app.register(authRoutes)
app.register(uploadRoutes)
app.register(memoriesRoutes)

app
  .listen({
    port: 3333,
    host: '::',
  })
  .then(() => {
    console.log('🚀 Server is running on port http://localhost:3333!')
  })
