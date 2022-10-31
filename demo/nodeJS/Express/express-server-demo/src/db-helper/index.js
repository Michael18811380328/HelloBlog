import mysql from 'mysql';
import { CONFIG } from '../config/config';

const mysql_config = {
  host    : CONFIG.host,
  user    : CONFIG.user,
  password: CONFIG.password,
  database: CONFIG.database,
  port    : CONFIG.port,
  connectionLimit: CONFIG.connectionLimit === undefined ? 10 : CONFIG.connectionLimit,
  timezone: '+00:00'
};

let pool = mysql.createPool(mysql_config);

function DBHelper(sql, callback, add = null) {
  if (add !== null) {
    pool.query(sql, add, callback);
  } else {
    pool.query(sql, callback);
  }
}

export default DBHelper;
