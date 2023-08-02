import HealthRoutes from './health.routes.js';
import HealthService from './health.service.js';

// override api prefix
const prefixOverride = '';

export default async function HealthModule(app) {
  app.register(HealthRoutes);
}

// export services used by other modules
export { HealthService, prefixOverride };
