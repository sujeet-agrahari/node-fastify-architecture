import ExampleController from './example.controller.js';
import ExampleRoutes from './example.routes.js';
import ExampleService from './example.service.js';

export default async function ExampleModule(app) {
  app.decorate('exampleController', ExampleController);
  app.decorate('exampleService', ExampleService);

  app.register(ExampleRoutes, { prefix: '/example' });
}

// export services used by other modules
export { ExampleService };
