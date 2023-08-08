import fp from 'fastify-plugin';

export default fp(async function errorHandlerPlugin(app, _opts) {
  // app error handler
  app.setErrorHandler(async function errorHandler(error, _request, reply) {
    app.log.error({ error });

    // catch HTTP errors
    if (error instanceof this.HttpError.HttpError) {
      reply.code(error.status);
      return {
        statusCode: error.status,
        error: error.error,
        message: error.message,
      };
    }

    // catch avj validation errors
    if (error.validation) {
      reply.code(400);
      return {
        statusCode: 400,
        error: error.code,
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
  });

  // not found error handler
  app.setNotFoundHandler(async function notFoundHandler(request) {
    const message = `${request.method} on ${request.url} not found`;
    throw new this.HttpError.NotFoundError(message);
  });
});
