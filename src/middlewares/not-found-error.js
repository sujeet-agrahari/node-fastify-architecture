export async function notFoundHandler (request, _){
  const message = `${request.method} on ${request.url} not found`;
  throw new this.HttpError.NotFoundError(message);
};
