import request from 'request';
import fs from 'fs';
import DBHelper from '../db-helper';
import logger from '../logger';
import dTableWebAPI from './dtable-web-api';

class DtableUtils {

  static loadDtableData(dtable_uuid, callback) {
    dTableWebAPI.getDownloadTableURL(dtable_uuid).then(res => {
      const downloadLink = res.data.download_link;
      request.get(downloadLink, (error, response, body) => {
        if (error) {
          callback && callback(error);
          return;
        }
        if (response && response.statusCode === 200) {
          let dtableData = body
          callback && callback(null, dtableData);
          return;
        }
      })
    }).catch((error) => {
      callback && callback(error);
      return;
    });
  }

  static updateDtableData(dtable_uuid, tableData, callback) {
    dTableWebAPI.getUpdateTableURL(dtable_uuid).then(res => {
      const updateLink = res.data.update_link;
      const fileName = res.data.file_name;
      let r = request.post(updateLink, (error, response, body) => {
        if (error) {
          callback && callback(error);
          return;
        }
        if (response && response.statusCode === 200) {
          callback && callback(null, fileName);
          return;
        }
      });
      // https://www.npmjs.com/package/request
      let form = r.form();
      form.append('parent_dir', '/');
      form.append('replace', 1);
      // https://www.npmjs.com/package/form-data
      form.append('file', fs.createReadStream(tableData.path), {filename: fileName});
    }).catch((error) => {
      callback && callback(error);
      return;
    });
  }

  static queryDtableOperations(dtable_uuid, start, count, callback) {
    let sql = `SELECT author, app, op_time, operation, op_id FROM operation_log WHERE
              dtable_uuid='${dtable_uuid}' ORDER BY op_id DESC LIMIT ${start}, ${count}`;

    DBHelper(sql, (err, results) => {
      if (err) {
        logger.error(err);
        callback && callback(err);
      }
      // remove RowDataPacket
      results = JSON.stringify(results);
      results = JSON.parse(results);
      callback && callback(null, results);
    });
  }

  static recordOperation(dtable_uuid, version, operation, username, appName) {
    let sql = 'INSERT INTO `operation_log` \
              (dtable_uuid, op_id, op_time, operation, author, app) VALUES (?, ?, ?, ?, ?, ?)';
    let values = [dtable_uuid, version, Date.now(), JSON.stringify(operation), username, appName];
    DBHelper(sql, (err, results) => {
      if (err) {
        logger.error(err);
        throw new Error('Database error.');
      }
      if (results) {
        logger.debug('Success record operation log to database.');
      }
    }, values);
  }

  static recordOpID(dtable_uuid, version) {
    let sql = 'INSERT INTO `operation_checkpoint` (dtable_uuid, op_id) VALUES \
              (?, ?) ON DUPLICATE KEY UPDATE op_id = VALUES(op_id)';
    let values = [dtable_uuid, version];
    DBHelper(sql, (err, results) => {
      if (err) {
        logger.error(err);
        throw new Error('Database error.');
      }
      if (results) {
        logger.debug('Record op_id', version, 'to database.');
      }
    }, values);
  }

  static listPendingOperationsByDTable(uuid, callback) {
    let sql = 'SELECT a.operation, a.op_id FROM operation_log AS a LEFT JOIN \
              operation_checkpoint AS b ON a.dtable_uuid=b.dtable_uuid WHERE \
              a.dtable_uuid="' + uuid + '" AND a.op_id>b.op_id ORDER BY a.op_id';

    DBHelper(sql, (err, results) => {
      if (err) {
        logger.error(err);
        throw new Error('Database error.');
      }

      if (results) {
        callback && callback(results);
      }
    });
  }

  static listOperationsByDTable(uuid, callback) {
    let sql = 'SELECT a.operation, a.op_id FROM operation_log AS a WHERE a.dtable_uuid="' + uuid + '"';
    DBHelper(sql, (err, results) => {
      if (err) {
        logger.error(err);
        throw new Error('Database error.');
      }

      if (results) {
        callback && callback(results);
      }
    });
  }

  /**
   * @param interval: expected to be a micro sec number eg: if you want query operation count in last 1 hour, interval should be 3600*1000
   * @param callback: callback method
   */
  static queryOperationCount(interval, callback) {
    let lastTimeStamp = interval !== -1? Date.now() - interval: -1;
    let sql = `SELECT count(1) AS count FROM operation_log WHERE op_time>=?`;
    DBHelper(sql, (err, results) => {
        if (err) {
            logger.error(err);
            throw new Error('Databse error.');
        }
        if (results) {
            callback && callback(results[0].count);
        }
    }, [lastTimeStamp]);
  }

  static getDtableDeletedRows(dtableUuid, start, count, callback) {
    let sql = `SELECT id, dtable_uuid, row_id, op_user, op_time, detail, op_app FROM
              activities WHERE dtable_uuid=? AND TO_DAYS(NOW())-TO_DAYS(op_time)<=7
              AND op_type='delete_row' ORDER BY id DESC LIMIT ${start}, ${count};`;
    DBHelper(sql, (err, results) => {
      if (err) {
        callback && callback(err, null);
        return;
      }
      callback && callback(null, results)
    }, [dtableUuid]);
  }
}

export default DtableUtils;
