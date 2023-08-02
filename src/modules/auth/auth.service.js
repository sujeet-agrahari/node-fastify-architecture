const AuthService = {
  async login(context, requestBody) {
    const { name, email } = requestBody;

    const result = await context.db.user.create({
      data: {
        name,
        email,
      },
    });
    return result;
  },
};

export default AuthService;
