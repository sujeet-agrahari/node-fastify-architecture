import { NotFoundError } from '../utils/api-errors.js';


export async function notFoundHandler (request, _){
  const errorMessage = `Not Found: ${request.method} on ${request.url}`;
  throw new NotFoundError(errorMessage);
};
