import AuthRoutes from './auth.routes.js';
import AuthService from './auth.service.js';
import AuthSchema from './auth.schema.js';
import AuthController from './auth.controller.js';

export default async function AuthModule(app) {
  app.decorate('authSchema', AuthSchema);
  app.decorate('authService', AuthService);
  app.decorate('authController', AuthController);

  app.register(AuthRoutes, { prefix: '/auth' });
}

// export services used by other modules
export { AuthService };
