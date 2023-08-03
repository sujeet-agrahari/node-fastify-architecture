
export default async function HealthRoutes(healthModule) {
  healthModule.get(
    '/health',
    healthModule.healthController.getHealthStatus,
  );
}
