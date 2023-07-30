
import AuthService from './auth.service.js';

const AuthController = {
  login: async (httpRequest) => {
    const loginData = await AuthService.doLogin(httpRequest.body);
    return loginData;
  },
};

export default AuthController;
