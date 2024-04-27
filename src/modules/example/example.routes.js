export default async function HealthRoutes(healthModule) {
  healthModule.route({
    method: 'GET',
    url: '/',
    handler: healthModule.exampleController.getExample,
  });
}
