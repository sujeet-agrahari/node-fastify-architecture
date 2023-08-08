import fp from 'fastify-plugin';
import fastifyOverview from 'fastify-overview';

export default fp(async function fastifyOverviewPlugin(app, _opts) {
  await app.register(fastifyOverview, { addSource: true });
}, { name: 'fastify-overview' });
