import fp from 'fastify-plugin';
import fastifyOverviewUI from 'fastify-overview-ui';

export default fp(async (fastify) => {
  await fastify.register(fastifyOverviewUI, { name: 'fastify-overview-ui' });
});
