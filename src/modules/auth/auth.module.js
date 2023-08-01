import AuthRoutes from './auth.routes.js';
import AuthService from './auth.service.js';
import AuthSchema from './auth.schema.js';

export default async function AuthModule(app) {
  app.decorate('authSchema', AuthSchema);
  app.register(AuthRoutes, { prefix: '/auth' });
}

// export services used by other modules
export { AuthService };
