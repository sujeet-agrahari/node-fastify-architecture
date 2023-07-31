import { NotFoundError } from '../utils/api-errors.js';


export async function notFoundHandler (request, _){
  const message = `${request.method} on ${request.url} not found`;
  throw new NotFoundError(message);
};
