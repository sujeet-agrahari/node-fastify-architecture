
import AuthRoutes from './auth.routes.js';
import AuthService from './auth.service.js';

export default async function AuthModule (app) {
  app.register(AuthRoutes, { prefix:  '/auth' })
}

// export services used by other modules
export { AuthService };
