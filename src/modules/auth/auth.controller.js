import AuthService from './auth.service.js';

const AuthController = {
  async login(request) {
    const loginData = await AuthService.doLogin(request.body);
    return loginData;
  },
};

export default AuthController;
