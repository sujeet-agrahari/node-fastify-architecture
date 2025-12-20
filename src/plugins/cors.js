import fp from 'fastify-plugin';
import cors from '@fastify/cors';

export default fp(async function corsPlugin(app) {
  await app.register(cors, {
    origin: app.config.get('CORS_ORIGIN') || true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
}, { name: 'cors' });

