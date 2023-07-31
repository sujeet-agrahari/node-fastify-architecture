import config from 'config'
import { buildApp } from './app.js';
import closeWithGrace from 'close-with-grace';
import fastifyOverveiwUI from 'fastify-overview-ui';


const port = config.get('PORT');
const host = config.get('HOST');

const serverOptions = {
  logger: {
    level: 'info',
  },
  genReqId: () => crypto.randomUUID()
}

// We want to use pino-pretty only if there is a human watching this,
if (process.stdout.isTTY) {
  serverOptions.logger.transport = { target: 'pino-pretty' }
}



const app = await buildApp(serverOptions);

app.register(fastifyOverveiwUI)

app.addHook('onReady', async () => {
  app.log.info(`\n ${app.printRoutes()}`)
})

await app.listen({ port, host });

closeWithGrace(async ({ err }) => {
  if (err) {
    app.log.error({ err }, 'server closing due to error')
  }
  app.log.info('shutting down gracefully')
  await app.close()
})