export default async function HealthRoutes(healthModule) {
  healthModule.route({
    method: 'GET',
    url: '/health',
    schema: {
      response: {
        200: healthModule.getSchema('schema:health:healthRes'),
      },
    },
    handler: healthModule.healthController.getHealthStatus,
  });
}
