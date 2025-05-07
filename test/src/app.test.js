import { describe, test, mock } from 'node:test';
import assert from 'node:assert';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import config from 'config';
import buildApp from '../../src/app.js';
import * as HttpError from '../../src/utils/http-errors.js';
import HealthService from '../../src/modules/health/health.service.js';

const pluginDir = 'src/plugins';

describe('buildApp', async () => {
  const serverOptions = {
    fastifyOptions: {
      logger: {
        level: 'info',
      },
      genReqId: () => crypto.randomUUID(),
    },
    config,
    HttpError,
    dbConfig: config.get('DB_CONFIG'),
  };

  test('built app has all the passed decorators', async () => {
    // Arrange & Act
    const app = await buildApp(serverOptions);

    // Assert
    assert.strictEqual(app.hasDecorator('config'), true);
    assert.strictEqual(app.hasDecorator('HttpError'), true);
    assert.strictEqual(app.hasDecorator('db'), true);
  });

  test('built app has all the plugins', async () => {
    // Arrange & Act
    const app = await buildApp(serverOptions);

    const plugins = await readdir(pluginDir);
    const pluginNamesWithoutExtension = plugins.map((file) => {
      const parsedPath = path.parse(file);
      return parsedPath.name; // Get the filename without extension
    });

    // Assert
    for (const pluginName of pluginNamesWithoutExtension) {
      assert.strictEqual(app.hasPlugin(pluginName), true);
    }
  });

  test('built app uses passed notFoundHandler', async () => {
    // Arrange
    const app = await buildApp(serverOptions);

    // Act
    const notFoundErrorRes = await app.inject({
      method: 'GET',
      url: '/it-does-not-exist',
    });
    // Parse the JSON response data
    const parsedData = JSON.parse(notFoundErrorRes.payload);

    // Assert
    // Check if the required properties exist in the parsed data
    assert.strictEqual('statusCode' in parsedData, true);
    assert.strictEqual('error' in parsedData, true);
    assert.strictEqual('message' in parsedData, true);

    assert.strictEqual(parsedData.statusCode, 404);
    assert.strictEqual(parsedData.error, 'Not Found');
    assert.strictEqual(parsedData.message, 'GET on /it-does-not-exist not found');
  });

  test('built app uses passed errorHandler', async () => {
    // Arrange
    const app = await buildApp(serverOptions);
    const errorMsg = 'Something bad happened!';
    mock.method(HealthService, 'getHealthStatus')
      .mock.mockImplementationOnce(
        () => Promise.reject(new HttpError.InternalServerError(errorMsg)),
      );

    // Act
    const errorRes = await app.inject({ method: 'GET', url: '/health' });
    // Parse the JSON response data
    const parsedData = await errorRes.json();

    // Assert
    // Check if the required properties exist in the parsed data
    assert.strictEqual('statusCode' in parsedData, true);
    assert.strictEqual('error' in parsedData, true);
    assert.strictEqual('message' in parsedData, true);

    assert.strictEqual(parsedData.statusCode, 500);
    assert.strictEqual(parsedData.error, 'Internal Server Error');
    assert.strictEqual(parsedData.message, errorMsg);
  });
});
