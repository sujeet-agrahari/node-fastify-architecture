import { APIError } from '../utils/api-errors.js';

export async function errorHandler(error, request, reply) {
  request.log.error({ error });

  // catch HTTP errors
  if (error instanceof APIError) {
    reply.code(error.status);
    return {
      error: {
        code: error.status,
        message: error.message,
      },
    };
  }

  // connect all errors
  reply.code(500);
  return {
    error: {
      code: 500,
      message: 'Something went wrong!',
    },
  };
};
