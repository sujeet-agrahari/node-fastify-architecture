// import { BadRequestError, NotFoundError } from '../../utils/api-errors.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const AuthService = {
  doLogin: async (requestBody) => {
    const { name, email } = requestBody;

    const result = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    return result;
  },
};

export default AuthService;
