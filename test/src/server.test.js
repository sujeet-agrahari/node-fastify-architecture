import { describe, test, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import config from 'config';
import buildApp from '../../src/app.js';
import * as HttpError from '../../src/utils/http-errors.js';

describe('server', async () => {
  const serverOptions = {
    fastifyOptions: {
      logger: {
        level: 'silent', // Silence logs during tests
      },
      genReqId: () => crypto.randomUUID(),
    },
    config,
    HttpError,
    dbConfig: config.get('DB_CONFIG'),
  };

  let app;

  beforeEach(async () => {
    app = await buildApp(serverOptions);
  });

  afterEach(async () => {
    if (app) {
      await app.close();
    }
  });

  test('server boots up and accepts request', async () => {
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
  });
});
