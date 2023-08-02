import fp from 'fastify-plugin';
import { PrismaClient } from '@prisma/client';

export default fp(async (app, opts) => {
  const prisma = new PrismaClient(opts.dbConfig);

  await prisma.$connect();

  app.log.info('Database connected!');

  app.decorate('db', prisma);

  // eslint-disable-next-line no-shadow
  app.addHook('onClose', async (app) => {
    await app.db.$disconnect();
    app.log.info('Database connection closed!');
  });
});
