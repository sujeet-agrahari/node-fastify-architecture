import fp from 'fastify-plugin';
import rateLimit from '@fastify/rate-limit';

export default fp(async function rateLimitPlugin(app) {
  await app.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
    errorResponseBuilder: function (request, context) {
      return {
        statusCode: 429,
        error: 'Too Many Requests',
        message: `Rate limit exceeded. You can make ${context.max} requests per ${context.after}. Try again soon.`,
      };
    },
  });
}, { name: 'rate-limit' });

