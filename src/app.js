
import Fastify from 'fastify';

import autoload from '@fastify/autoload';

import { join } from 'desm';
import { errorHandler } from './middlewares/error-handler.js';
import { notFoundHandler } from './middlewares/not-found-error.js';


export async function buildApp (opts = {}) {
  const app = Fastify(opts)

  // auto load modules
  app.register(autoload, {
    dir: join(import.meta.url, 'modules'),
    encapsulate: false,
    maxDepth: 1,
    dirNameRoutePrefix: false,
    // load only main .module.js files
    matchFilter: (path) => path.endsWith('.module.js'),
    options: { prefix: '/api/v1'},
  })

  app.setErrorHandler(errorHandler)

  app.setNotFoundHandler(notFoundHandler)

  return app
}