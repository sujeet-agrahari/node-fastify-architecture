export default async function AuthRoutes(authModule) {
  authModule.post(
    '/login',
    authModule.authSchema.loginSchema,
    authModule.authController.login,
  );
}
