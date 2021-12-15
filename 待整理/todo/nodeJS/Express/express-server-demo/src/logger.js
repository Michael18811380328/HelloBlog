import path from 'path';
import { configure, getLogger } from 'log4js';

const logger = getLogger('dtable-server');
let logFile = '../dtable-server.log';
if (process.env.LOG_DIR) {
  logFile = path.join(process.env.LOG_DIR, 'dtable-server.log');
}
const logLevel = process.env.DTABLE_SERVER_LOG_LEVEL || 'info';

configure({
  appenders: { logger: { type: 'file', filename: logFile } },
  categories: { default: { appenders: ['logger'], level: logLevel } }
});

export default logger;
