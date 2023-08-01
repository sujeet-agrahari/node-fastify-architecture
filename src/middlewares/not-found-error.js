export default async function notFoundHandler(request) {
  const message = `${request.method} on ${request.url} not found`;
  throw new this.HttpError.NotFoundError(message);
}
