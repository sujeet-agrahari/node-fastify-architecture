const AuthController = {
  async login(request, reply) {
    const loginData = await this.authService.login(this, request.body);
    reply.code(201);
    return loginData;
  },
};

export default AuthController;
