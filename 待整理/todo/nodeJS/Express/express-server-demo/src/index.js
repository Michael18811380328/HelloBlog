import DTableServer from './dtable-server';
import logger from './logger';

const port = process.env.PORT || 5000;

logger.info('Starting dtable server process:', process.pid);

process.on('uncaughtException', (err, origin) => {
  logger.error(err, origin);
});

const dtableServer = new DTableServer();
dtableServer.start(port);
