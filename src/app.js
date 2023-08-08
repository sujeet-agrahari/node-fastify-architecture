/* eslint-disable no-use-before-define */
import Fastify from 'fastify';
import autoload from '@fastify/autoload';
import { join } from 'desm';

export default async function buildApp(opts = {}) {
  const app = Fastify(opts.fastifyOptions);
  await registerDecorators(app, opts);
  await registerPlugins(app, opts);
  await registerModules(app, opts);

  return app;
}

async function registerDecorators(app, opts) {
  // Register global utilities
  app.decorate('config', opts.config);
  app.decorate('HttpError', opts.HttpError);
}

async function registerPlugins(app, opts) {
  // Loads all plugins defined in the 'plugins' directory
  await app.register(autoload, {
    dir: join(import.meta.url, 'plugins'),
    options: { ...opts },
  });
}

async function registerModules(app, opts) {
  // Auto-load modules
  await app.register(autoload, {
    dir: join(import.meta.url, 'modules'),
    maxDepth: 1,
    dirNameRoutePrefix: false,
    matchFilter: (path) => path.endsWith('.module.js'),
    options: { prefix: app.config.API_PREFIX, ...opts },
  });
}
