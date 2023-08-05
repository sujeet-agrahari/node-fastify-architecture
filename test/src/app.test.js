import { describe, test } from 'node:test';
import assert from 'node:assert';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import config from 'config';
import buildApp from '../../src/app.js';
import * as HttpError from '../../src/utils/http-errors.js';
import notFoundHandler from '../../src/middlewares/not-found-error.js';
import errorHandler from '../../src/middlewares/error-handler.js';

const pluginDir = 'src/plugins';

describe('buildApp', () => {
  const serverOptions = {
    fastifyOptions: {
      logger: {
        level: 'info',
      },
      genReqId: () => crypto.randomUUID(),
    },
    config,
    HttpError,
    errorHandler,
    notFoundHandler,
    dbConfig: config.get('DB_CONFIG'),
  };

  test('built app must have all the passed decorators', async () => {
    const app = await buildApp(serverOptions);
    assert.strictEqual(app.hasDecorator('config'), true);
    assert.strictEqual(app.hasDecorator('HttpError'), true);
    assert.strictEqual(app.hasDecorator('db'), true);
  });

  test('build app must have all the plugins', async () => {
    const app = await buildApp(serverOptions);
    const theFirstPlugin = 'fastify-overview';

    const plugins = await readdir(pluginDir);
    const pluginNamesWithoutExtension = plugins.map((file) => {
      const parsedPath = path.parse(file);
      return parsedPath.name; // Get the filename without extension
    });

    [...pluginNamesWithoutExtension, theFirstPlugin].forEach((pluginName) => {
      assert.strictEqual(app.hasPlugin(pluginName), true);
    });
  });
});
