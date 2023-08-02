import HealthController from './health.controller.js';

export default async function HealthRoutes(healthModule) {
  healthModule.get(
    '/health',
    HealthController.getHealthStatus,
  );
}
