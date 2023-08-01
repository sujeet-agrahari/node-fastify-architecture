import Fastify from 'fastify';
import autoload from '@fastify/autoload';
import { join } from 'desm';
import fastifyOverview from 'fastify-overview';

export default async function buildApp(opts = {}) {
  const app = Fastify(opts.fastifyOptions);
  await registerPlugins(app, opts);
  await registerDecorators(app, opts);
  await registerModules(app, opts);
  await registerErrorHandlers(app, opts);

  return app;
}

async function registerPlugins(app, opts) {
  // Register fastifyOverview as the first plugin to be registered
  await app.register(fastifyOverview, { addSource: true });

  // Loads all plugins defined in the 'plugins' directory
  await app.register(autoload, {
    dir: join(import.meta.url, 'plugins'),
    options: Object.assign({}, opts),
  });
}

async function registerDecorators(app, opts) {
  // Register global utilities
  app.decorate('config', opts.config);
  app.decorate('HttpError', opts.HttpError);
}

async function registerModules(app, opts) {
  // Auto-load modules
  await app.register(autoload, {
    dir: join(import.meta.url, 'modules'),
    maxDepth: 1,
    dirNameRoutePrefix: false,
    matchFilter: (path) => path.endsWith('.module.js'),
    options: Object.assign({ prefix: app.config.API_PREFIX }, opts),
  });
}

async function registerErrorHandlers(app, opts) {
  // Register error handlers
  await app.setErrorHandler(opts.errorHandler);
  await app.setNotFoundHandler(opts.notFoundHandler);
}
