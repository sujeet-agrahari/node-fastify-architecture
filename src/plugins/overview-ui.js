import fp from 'fastify-plugin';
import fastifyOverviewUI from 'fastify-overview-ui';

export default fp(async function (fastify, _) {
  await fastify.register(fastifyOverviewUI)
})