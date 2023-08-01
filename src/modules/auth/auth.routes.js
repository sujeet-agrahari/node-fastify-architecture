import AuthController from "./auth.controller.js";

export default async function (authModule) {
  authModule.post(
    '/login', 
    authModule.authSchema.loginSchema, 
    AuthController.login
  );
}