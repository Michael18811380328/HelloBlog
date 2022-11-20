import path from 'path';
import { loadJsonFile } from '../utils/utils';

let filePath = process.env.DTABLE_SERVER_CONFIG;
if (!filePath) {
  filePath = path.join(__dirname, '../../config/config.json');
}

const config = loadJsonFile(filePath);

export const CONFIG = {
  host    : config.host,
  user    : config.user,
  password: config.password,
  database: config.database,
  port    : config.port,
  connectionLimit: config.connection_limit,
};

export const PRIVATE_KEY = config.private_key;

export const DTABLE_WEB_SERVICE_URL = config.dtable_web_service_url;

export const REDIS_HOST = config.redis_host;
export const REDIS_PORT = config.redis_port;
export const REDIS_PASSWORD = config.redis_password;
