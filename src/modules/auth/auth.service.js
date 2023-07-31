import bcrypt from 'bcrypt';
import { Prisma, PrismaClient } from '@prisma/client'


// import JwtService from './jwt.service.js';
const prisma = new PrismaClient();

const AuthService = {
  doLogin: async (requestBody) => {
    const { name, email } = requestBody

    const result = await prisma.user.create({
      data: {
        name,
        email,
      },
  })
  return result
  },
};

export default AuthService;