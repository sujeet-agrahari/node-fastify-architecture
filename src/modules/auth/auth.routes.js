import AuthController from './auth.controller.js';

export default async function AuthRoutes(authModule) {
  authModule.post(
    '/login',
    authModule.authSchema.loginSchema,
    AuthController.login,
  );
}
