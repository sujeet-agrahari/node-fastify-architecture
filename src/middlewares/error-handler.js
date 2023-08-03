export default async function errorHandler(error, request, reply) {
  request.log.error({ error });

  // catch HTTP errors
  if (error instanceof this.HttpError.HttpError) {
    reply.code(error.status);
    return {
      statusCode: error.status,
      error: error.error,
      message: error.message,
    };
  }

  // catch other errors
  reply.code(500);
  return {
    statusCode: 500,
    error: 'Internal Server Error!',
    message: error.message,
  };
}
