const AuthController = {
  async login(request) {
    const loginData = await this.authService.login(this, request.body);
    return loginData;
  },
};

export default AuthController;
