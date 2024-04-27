import ExampleController from './example.controller.js';
import ExampleRoutes from './example.routes.js';
import ExampleService from './example.service.js';

// override api prefix
const prefixOverride = '';

export default async function HealthModule(app) {
  app.decorate('exampleController', ExampleController);
  app.decorate('exampleService', ExampleService);

  app.register(ExampleRoutes, { prefix: '/example' });
}

// export services used by other modules
export { ExampleService, prefixOverride };
