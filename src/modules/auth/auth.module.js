
import AuthRoutes from './auth.routes.js';
import AuthService from './auth.service.js';

export default async function AuthModule (app, opts) {
  app.register(AuthRoutes, { prefix: opts.prefix + 'auth'})
}

// export services used by other modules
export { AuthService };
