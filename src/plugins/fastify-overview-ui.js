import fp from 'fastify-plugin';
import fastifyOverviewUI from 'fastify-overview-ui';

export default fp(async function fastifyOverviewPlugin(fastify, opts_) {
  await fastify.register(fastifyOverviewUI);
}, {
  name: 'fastify-overview-ui',
  dependencies: ['fastify-overview'],
});
