import fs from 'fs';
import moment from 'moment';
import { v4 } from 'uuid';
import { OPERATION_TYPE, Operation, Views, TableUtils, RowUtils, GridTable, GridRow, GridColumn, CellType, generatorTableId, generatorColumnKey } from "dtable-store";
import { generatorDefaultData } from '../model/default-dtable';
import Dtable from '../model/dtable';
import DtableUtils from '../utils/dtable-utils';
import logger from '../logger';
import dTableWebAPI from "../utils/dtable-web-api";
import OperationUtils from '../utils/operation-utils';
import { ERROR_TYPE, ERROR_MESSAGE } from '../utils/callback-message';
import { deleteDir } from '../utils/utils';
import DBHelper from "../db-helper";

class DTableManager {

  constructor(dtableServer) {
    this.dtableServer = dtableServer;
    this.eventManager = dtableServer.eventManager;
    this.snapshotManager = dtableServer.snapshotManager;
    this.dtables = new Map();
    this.options = [];
    this.saveTimer = null;
    this.isSaving = false;
    this.lastSavingInfo = {
      count: 0,
      startTime: null,
      endTime: null,
    };
  }

  start() {
    this.saveTimer = setInterval(() => {
      this.saveDtable();
    }, 300000);

    process.on('SIGTERM', () => {
      logger.info('Exiting server process:', process.pid);
      this.saveDtable();
      setInterval(() => {
        process.kill(process.pid, 'SIGKILL');
      }, 10000);
    });
  }

  stop() {
    clearInterval(this.saveTimer);
  }

  isDtableExist(uuid) {
    return this.dtables.get(uuid);
  }

  canOpApply(dtable_uuid, operation) {
    let dtable = this.dtables.get(dtable_uuid);
    let tables = dtable.value.tables;
    return TableUtils.canOpApply(tables, operation);
  }

  addDtable(uuid, dtable) {
    // After reloading the data, you need to update the data in memory
    let table = new Dtable(dtable);
    this.dtables.set(uuid, table);
  }

  removeDtable(uuid) {
    if (this.dtables.has(uuid)) {
      this.dtables.delete(uuid);
    }
  }

  getDtable(uuid, callback, lang) {
    if (this.dtables.has(uuid)) {
      let dtable = this.dtables.get(uuid);
      callback && callback(null, dtable);
    } else {
      DtableUtils.loadDtableData(uuid, (err, results) => {
        if (err) {
          let errorType = ERROR_TYPE.DTABLE_LOAD_FAILED;
          let error = {
            'error_type': errorType,
            'error_message': ERROR_MESSAGE[errorType]
          };
          callback && callback(error);
          return;
        }

        if (!results) {
          // init data
          results = JSON.stringify(generatorDefaultData());
          this.addDtable(uuid, results);

          DtableUtils.listOperationsByDTable(uuid, (operations) => {

            if (operations.length === 0) {

              // Encapsulating a socket operation
              let operation = {
                op_type: OPERATION_TYPE.UPDATE_DEFAULT_DATA, 
                table_id: '0000',
                view_id: '0000',
                column_key: '0000',
                lang: lang
              };
              this.execInitDataOperation(uuid, operation, 'system');

              let dtable = this.dtables.get(uuid);
              callback && callback(null, dtable);

            } else {
              this.applyPendingOperations(uuid, operations, () => {
                let dtable = this.dtables.get(uuid);
                callback && callback(null, dtable);
              });
            }

          });
        } else {
          this.addDtable(uuid, results);
          DtableUtils.listPendingOperationsByDTable(uuid, (operations) => {
            this.applyPendingOperations(uuid, operations, () => {
              let dtable = this.dtables.get(uuid);
              callback && callback(null, dtable);
            });
          });
        }
      });
    }
  }

  saveDtable() {
    if (this.isSaving) {
      logger.debug('Last save task not completed.');
      return;
    }

    let startTime = Date.now();
    this.isSaving = true;
    let actions = [];
    let keys = this.dtables.keys();
    for (let key of keys) {
      let dtable = this.dtables.get(key);
      let meta = dtable.getMeta();
      if (meta.need_save) {
        let action = () => {
          return new Promise(resolve => {
            let version = dtable.value.version;
            let dtableUuid = key;
            let dtableData = dtable.serializeTablesData();
            let filePath = '/tmp/' + v4();
            fs.writeFile(filePath, dtableData, { flag: 'w+' }, (err) => {
              if (err) {
                logger.error('file write err: ', err);
                deleteDir(filePath);
                resolve();
              } else {
                DtableUtils.updateDtableData(dtableUuid, { path: filePath }, (error, dtableName) => {

                  if (error) {
                    logger.error(error);
                  }

                  if (dtableName) {
                    logger.debug("dtable data update success.");
                    DtableUtils.recordOpID(dtableUuid, version);
                    this.snapshotManager.snapshotDTable(dtableUuid, dtableName);
                  } else {
                    logger.error("This can't happen. DTable saved but no dtableName is empty.");
                  }

                  deleteDir(filePath);
                  resolve();
                });
                dtable.setMeta({ need_save: false });
              }
            });
          });
        }
        actions.push(action());
      }
    }

    Promise.all(actions).then(() => {
      let count = actions.length;
      this.isSaving = false;
      this.lastSavingInfo.count = count;
      this.lastSavingInfo.startTime = startTime;
      this.lastSavingInfo.endTime = Date.now();
      logger.debug(`${count} dtables saved.`)
    });
  }

  execHttpOperation(username, appName, dtable_uuid, dtable, operation) {
    
    // valid
    let { isValid, error_message } = OperationUtils.checkOperation(dtable, operation);

    if (!isValid) {
      return { isValid, error_message };
    }

    // Encapsulation operation
    let newOperation = OperationUtils.encapsulateOperation(dtable, operation);

    // send event message
    this.eventManager.publishEvents(dtable_uuid, dtable, newOperation, username, appName);

    // execute
    let op = new Operation(newOperation);
    let value = dtable.value;
    let newValue = op.apply(value);
    let nextVersion = dtable.value.version + 1;

    newValue = Object.assign({}, newValue, { version: nextVersion });
    dtable.setValue(newValue);

    // record
    DtableUtils.recordOperation(dtable_uuid, nextVersion, newOperation, username, appName);

    // broadcast
    let execOperation = JSON.stringify(newOperation);
    let webSocketManager = this.dtableServer.webSocketManager;
    webSocketManager.io.in(dtable_uuid).emit('update-dtable', execOperation, nextVersion);

    return { isValid: true };
  }

  execSocketOperation(dtable_uuid, operation, username, appName) {
    let dtable = this.dtables.get(dtable_uuid);
    let op = new Operation(operation);
    if (dtable && dtable.value && dtable.value.tables) {
      this.eventManager.publishEvents(dtable_uuid, dtable, operation, username, appName);

      let value = dtable.value;
      let newValue = op.apply(value);
      let version = dtable.value.version + 1;

      // need optimized 
      // let next = Views.updateViewRows(newTables, operation);

      newValue = Object.assign({}, newValue, { version: version });
      dtable.setValue(newValue);

      DtableUtils.recordOperation(dtable_uuid, version, operation, username, appName);

      return version;
    } else {
      logger.error("DTable data loading error, please check your code to solve the error.");
      throw new Error('Dtable data is error.');
    }

  }

  execInitDataOperation(dtable_uuid, operation, username) {
    let dtable = this.dtables.get(dtable_uuid);
    let op = new Operation(operation);
    if (dtable && dtable.value && dtable.value.tables) {

      let value = dtable.value;
      let newValue = op.apply(value);
      let version = dtable.value.version + 1;

      newValue = Object.assign({}, newValue, { version: version });
      dtable.setValue(newValue);

      DtableUtils.recordOperation(dtable_uuid, version, operation, username);

      return version;
    } else {
      logger.error("DTable data loading error, please check your code to solve the error.");
      throw new Error('Dtable data is error.');
    }
  }

  applyPendingOperations(uuid, results, callback) {
    if (results.length) {
      logger.debug('DTable', uuid, 'applying pending operations...');
      let dtable = this.dtables.get(uuid);
      for (let result of results) {
        let op = new Operation(JSON.parse(result.operation));
        let version = result.op_id;
        if (dtable && dtable.value && dtable.value.tables) {
          let canOpApply = this.canOpApply(uuid, op);
          if (canOpApply) {
            let value = dtable.value;
            let newValue = op.apply(value);
            newValue = Object.assign({}, newValue, { version: version });
            dtable.setValue(newValue);
          }
        }
      }
      logger.debug('DTable', uuid, 'applyed pending operations.');
    }

    callback && callback();
  }

  getDTableLoadedCount() {
    return this.dtables.size;
  }

  getLastDTableSavingInfo() {
    return this.lastSavingInfo;
  }

  getRelatedUsers(dtable_uuid, callback) {
    dTableWebAPI.getTableRelatedUsers(dtable_uuid).then(res => {
      callback && callback(null, res.data.user_list);
    }).catch(error => {
      if (error.response) {
        if (error.response.data && error.response.data.error_msg) {
          callback && callback(new Error(error.response.data.error_msg), null);
        } else {
          let errorMsg = 'dtable-web server error: ' + error.response.status;
          callback && callback(new Error(errorMsg), null);
        }
      } else {
        callback && callback(error, null);
      }
    });
  }

  listTableViewRows(dtable, table, view) {
    // if view is grouped, getViewRows return extracted rows from group, regardless group structure
    const rows = Views.getViewRows(view, table);
    return this.convertRows(dtable, table, view, rows);
  }

  listTableViewGroupedRows(dtable, table, view) {
    let groupedRows = Views.getGroupedRows(view, table);
    groupedRows.map(group => {
      group.rows = this.convertRows(dtable, table, view, group.rows);
    })
    return groupedRows;
  }

  convertRows(dtable, table, view, rows) {
    const formulaColumns = Views.getAllFormulaColumns(Views.getColumns(view, table));
    let formulaResults = {};
    if (formulaColumns && formulaColumns.length > 0) {
      Views.updateFormulaRows(view, table, formulaColumns, rows);
      formulaResults = Views.getFormulaRows(view);
    }
    return rows.map(row => RowUtils.convertRow(row, dtable.value, table, view, formulaResults));
  }

  listTableViewFilteredRows(dtable, table, view, filters, filterConjunction) {
    let originalRows = Views.getViewRows(view, table);
    let filteredRows = RowUtils.filterRows(originalRows, table, filters, filterConjunction);
    return this.convertRows(dtable, table, view, filteredRows);
  }

  insertRowToTable(username, appName, dtableUuid, dtable, options, callback) {
    let { table_name, anchor_row_id, row, row_insert_position } = options;

    // resource check
    let table = TableUtils.getTableByName(dtable.value.tables, table_name);
    if (!table) {
      let error_message = {
        error_type: 'table_not_exist',
        error_message: `table ${table_name} not found`
      }

      callback && callback(false, error_message);
      return;
    }

    let operation = {
      op_type: OPERATION_TYPE.INSERT_ROW,
      table_id: table._id,
      row_id: anchor_row_id,
      row_data: RowUtils.convertRowBack(row, table), // Convert view data to operation data
      row_insert_position: row_insert_position,
    };

    let { isValid, error_message } = this.execHttpOperation(username, appName, dtableUuid, dtable, operation);

    callback && callback(isValid, error_message);
  }

  modifyTableRow(username, appName, dtableUuid, dtable, options, callback) {
    let { table_name, row_id, row } = options;

    // resource check
    let table = TableUtils.getTableByName(dtable.value.tables, table_name);

    if (!table) {
      let error_message = {
        error_type: 'table_not_exist',
        error_message: `table ${table_name} not found`
      }

      callback && callback(false, error_message);
      return;
    }

    // Encapsulation init operation
    let operation = { 
      op_type: OPERATION_TYPE.MODIFY_ROW,
      table_id: table._id,
      row_id: row_id,
      updated: RowUtils.convertRowBack(row, table), // Convert view data to operation data
    };

    let { isValid, error_message } = this.execHttpOperation(username, appName, dtableUuid, dtable, operation);

    callback && callback(isValid, error_message);
  }

  deleteTableRow(username, appName, dtableUuid, dtable, options, callback){
    let { table_name, row_id } = options;

    // resource check
    let table = TableUtils.getTableByName(dtable.value.tables, table_name);
    if (!table) {
      let error_message = {
        error_type: 'table_not_exist',
        error_message: `table ${table_name} not found`
      }

      callback && callback(false, error_message);
      return;
    }

    // Encapsulation init operation
    let operation = { 
      op_type: OPERATION_TYPE.DELETE_ROW,
      table_id: table._id,
      row_id: row_id,
    };

    let { isValid, error_message } = this.execHttpOperation(username, appName, dtableUuid, dtable, operation);

    callback && callback(isValid, error_message);
  }

  getRowActivities(dtableUuid, rowId, limit, offset, callback) {
    let sql = `SELECT id, dtable_uuid, row_id, op_user, op_type, op_time, detail FROM activities
               WHERE dtable_uuid=? and row_id=? ORDER BY op_time DESC LIMIT ? OFFSET ?`;
    DBHelper(sql, (err, activities) => {
      if (err) {
        callback && callback(err, null);
        return;
      }
      for (let activity of activities) {
        activity.detail = JSON.parse(activity.detail);
      }
      let count_sql = `SELECT count(1) AS count FROM activities WHERE dtable_uuid=? and row_id=?`;
      DBHelper(count_sql, (err, results) => {
        if (err) {
          callback && callback(err, null);
          return;
        }
        callback && callback(err, activities, results[0].count);
      }, [dtableUuid, rowId]);
    }, [dtableUuid, rowId, limit, offset])
  }

  insertTableWithRawColumnsAndRows(dtable, dtable_uuid, table_name, raw_columns, raw_rows, lang, username) {
    let table_id = generatorTableId(dtable.value.tables);
    let params = { table_id: table_id, table_name: table_name, lang: lang};
    let table_data = new GridTable(params);

    // columns
    let columns = [];
    raw_columns.forEach((col, index) => {
      let new_column_key = index === 0 ? '0000' : generatorColumnKey(columns);
      let new_column = new GridColumn({column_key: new_column_key, column_type: CellType.TEXT, column_name: col});
      columns.push(new_column);
    });
    table_data.columns = columns;

    // rows
    let rows = [];
    raw_rows.forEach((row) => {
      let new_row = new GridRow();
      let creator = username;
      let last_modifier = username;
      let createTime = moment().utc().toISOString(true);
      let modifyTime = createTime;
      let row_data = {};
      columns.forEach((col, index) => {
        row_data[col.key] = row[index];
      });
      new_row = Object.assign({}, new_row, row_data, {
        _creator: creator, 
        _last_modifier: last_modifier,
        _ctime: createTime, 
        _mtime: modifyTime
      });
      rows.push(new_row);
      table_data.id_row_map[new_row._id] = new_row;
    });
    table_data.rows = rows;

    // operation
    let operation = {
      op_type: OPERATION_TYPE.INSERT_TABLE,
      table_data:  table_data
    };

    this.execHttpOperation(username, null, dtable_uuid, dtable, operation);
  }

}

export default DTableManager;
