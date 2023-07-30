import config from 'config'
import { buildApp } from './app.js';
import closeWithGrace from 'close-with-grace';

const opts = {
  logger: {
    level: 'info',
  }
}

// We want to use pino-pretty only if there is a human watching this,
if (process.stdout.isTTY) {
  opts.logger.transport = { target: 'pino-pretty' }
}


const port = config.get('PORT') || '3000';
const host = config.get('HOST') || '127.0.0.1'

const app = await buildApp(opts);

app.ready(() => app.log.info(`\n ${app.printRoutes()}`))

await app.listen({ port, host });

closeWithGrace(async ({ err }) => {
  if (err) {
    app.log.error({ err }, 'server closing due to error')
  }
  app.log.info('shutting down gracefully')
  await app.close()
})