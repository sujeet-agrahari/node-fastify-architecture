import fp from 'fastify-plugin';
import helmet from '@fastify/helmet';

export default fp(async function helmetPlugin(app) {
  await app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
  });
}, { name: 'helmet' });

