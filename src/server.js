import config from 'config';
import closeWithGrace from 'close-with-grace';
import buildApp from './app.js';
import * as HttpError from './utils/http-errors.js';

const port = config.get('PORT');
const host = config.get('HOST');
const { isTTY, NODE_ENV } = process.env;

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

// We want to use pino-pretty only if there is a human watching this,
if (isTTY || NODE_ENV === 'development') {
  serverOptions.fastifyOptions.logger.transport = { target: 'pino-pretty' };
}

const app = await buildApp(serverOptions);

app.addHook('onReady', async () => {
  app.log.info(`\n ${app.printRoutes()}`);
});

const closeListeners = closeWithGrace(
  { delay: 500 },
  async ({ signal, err }) => {
    if (err) {
      app.log.error({ err }, 'Server closing due to error');
    }
    app.log.info(`Got ${signal}! Shutting down gracefully`);
    await app.close();
  },
);

app.addHook('onClose', async () => {
  await closeListeners.uninstall();
  app.log.info('Signal listeners removed!');
});

await app.listen({ port, host });
