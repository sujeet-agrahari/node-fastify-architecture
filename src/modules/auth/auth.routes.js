import AuthController from "./auth.controller.js";

export default async function (fastify, _) {
  fastify.post('/login', AuthController.login);
}