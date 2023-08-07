import { describe, test } from 'node:test';
import assert from 'node:assert';
import config from 'config';
import buildApp from '../../src/app.js';
import * as HttpError from '../../src/utils/http-errors.js';
import notFoundHandler from '../../src/middlewares/not-found-error.js';
import errorHandler from '../../src/middlewares/error-handler.js';

describe('server', async () => {
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

  test('server boots up and accepts request', async () => {
    // Arrange
    const app = await buildApp(serverOptions);

    // Act
    const healthResponse = await app.inject({
      method: 'GET',
      url: '/health',
    });

    // Parse the JSON response data
    const parsedData = await healthResponse.json();

    // Assert
    // Check if the required properties exist in the parsed data
    assert.strictEqual('database' in parsedData, true);
    assert.strictEqual('app' in parsedData, true);
    assert.strictEqual(parsedData.database.status, 'up');
    assert.strictEqual(parsedData.app.status, 'up');

    await app.close();
  });
});
