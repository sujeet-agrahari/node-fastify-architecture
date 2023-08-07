import HealthController from './health.controller.js';
import HealthRoutes from './health.routes.js';
import HealthSchema from './health.schema.js';
import HealthService from './health.service.js';

// override api prefix
const prefixOverride = '';

export default async function HealthModule(app) {
  app.decorate('healthController', HealthController);
  app.decorate('healthService', HealthService);

  app.register(HealthSchema);
  app.register(HealthRoutes);
}

// export services used by other modules
export { HealthService, prefixOverride };
