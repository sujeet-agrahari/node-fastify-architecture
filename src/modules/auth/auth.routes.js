export default async function AuthRoutes(authModule) {
  authModule.route({
    method: 'POST',
    url: '/login',
    schema: {
      body: authModule.getSchema('schema:auth:login'),
      response: {
        201: authModule.getSchema('schema:auth:loginRes'),
      },
    },
    handler: authModule.authController.login,
  });
}
