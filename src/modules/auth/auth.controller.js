import AuthService from './auth.service.js';

const AuthController = {
  login: async function (request, _) {
    const loginData = await AuthService.doLogin(request.body);
    return loginData;
  }
};

export default AuthController;
