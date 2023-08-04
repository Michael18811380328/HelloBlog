import slugid from 'slugid';
import { OPERATION_TYPE, TableUtils } from 'dtable-store';
import logger from '../logger';

class OperationUtils {

  static checkOperation(dtable, operation) {
    // check type
    let op_type = operation.op_type;
    let { isValid, error_message } = this._checkOperationType(operation);
    if (!isValid) {
      return { isValid, error_message };
    }

    switch (op_type) {
      case OPERATION_TYPE.INSERT_ROW: {
        let needParams = ['table_id', 'row_data'];
        let params = Object.keys(operation);
        ({ isValid, error_message } = this._checkOperationParams(needParams, params));
        if (!isValid) {
          return { isValid, error_message };
        }
        let { table_id } = operation;
        return this._checkTable(dtable, table_id);
      }

      case OPERATION_TYPE.DELETE_ROW: {
        let needParams = ['table_id', 'row_id'];
        let params = Object.keys(operation);
        ({ isValid, error_message } = this._checkOperationParams(needParams, params));
        if (!isValid) {
          return { isValid, error_message };
        }
        let { table_id } = operation;
        ({ isValid, error_message } = this._checkTable(dtable, table_id));

        if (!isValid) {
          return { isValid, error_message };
        }

        let { row_id } = operation;
        ({ isValid, error_message } = this._checkRow(dtable, table_id, row_id));
        return { isValid, error_message };
      }

      case OPERATION_TYPE.MODIFY_ROW:
        let needParams = ['table_id', 'row_id', 'updated'];
        let params = Object.keys(operation);
        ({ isValid, error_message } = this._checkOperationParams(needParams, params));
        if (!isValid) {
          return { isValid, error_message };
        }
        let { table_id } = operation;
        ({ isValid, error_message } = this._checkTable(dtable, table_id));

        if (!isValid) {
          return { isValid, error_message };
        }

        let { row_id } = operation;
        ({ isValid, error_message } = this._checkRow(dtable, table_id, row_id));
        return { isValid, error_message };

      case OPERATION_TYPE.INSERT_TABLE: {
        let needParams = ['table_data'];
        let params = Object.keys(operation);
        return this._checkOperationParams(needParams, params);
      }

      default:
        return { isValid: true };
      
    }
  }

  static encapsulateOperation(dtable, operation) {
    let op_type = operation.op_type;
    switch (op_type) {
      case OPERATION_TYPE.INSERT_ROW: {
        let { op_type, table_id, row_id, row_data, row_insert_position } = operation;
        let table = TableUtils.getTableById(dtable.value.tables, table_id);

        // Can be empty
        if (!row_id) {
          row_id = table.rows.length > 0 ? table.rows[table.rows.length - 1]._id : null;
        }

        row_data['_id'] = slugid.nice();

        // Can be empty
        row_insert_position = row_insert_position ? row_insert_position : 'insert_below';

        return {
          op_type: op_type,
          table_id: table_id,
          row_id: row_id,
          row_insert_position: row_insert_position,
          row_data: row_data,
        };
      }
      case OPERATION_TYPE.DELETE_ROW: {
        let { op_type, table_id, row_id } = operation;
        let table = TableUtils.getTableById(dtable.value.tables, table_id);
        let row = TableUtils.getRowById(table, row_id);
        let upper_row_index = table.rows.findIndex(row => { row._id === row_id}) - 1;
        let upper_row_id = upper_row_index >= 0 ? table.rows[upper_row_index] : null;
        
        return {
          op_type: op_type,
          table_id: table_id,
          row_id: row_id,
          deleted_row: row,
          upper_row_id: upper_row_id
        }
        
      }
      case OPERATION_TYPE.MODIFY_ROW: {
        let { op_type, table_id, row_id, updated } = operation;

        let table = TableUtils.getTableById(dtable.value.tables, table_id);
        let row = TableUtils.getRowById(table, row_id);
        
        return {
          op_type: op_type,
          table_id: table_id,
          row_id: row_id,
          updated: updated,
          old_row: row
        };
      }
      case OPERATION_TYPE.INSERT_TABLE: {
        let { op_type, table_data } = operation;
        return { op_type, table_data };
      }
    }
  }

  static _checkOperationType(operation) {
    let op_type = operation.op_type;
    let op_types = Object.values(OPERATION_TYPE);
    if (!op_type || op_types.indexOf(op_type) === -1) {
      let error_message = {
        error_type: 'op_type_invalid',
        error_message: 'Operation type does not exist.'
      };
      return { isValid: false, error_message };
    }
    return { isValid: true };
  }

  static _checkOperationParams(needParams, params) {
    let isValid = needParams.every(param => {
      return params.indexOf(param) > -1;
    }); 
    if (!isValid) {
      let error_message = {
        error_type: 'parameter_error',
        error_message: 'The parameter must contain' + {...needParams} + '.'
      };
      return { isValid: false, error_message };
    }
    return { isValid: true };
  }

  static _checkTable(dtable, table_id) {
    let updatedTable = TableUtils.getTableById(dtable.value.tables, table_id);
    if (!updatedTable) {
      let error_message = {
        error_type: 'table_not_exist',
        error_message: 'Table does not exist.'
      };
      return { isValid: false, error_message };
    }
    return { isValid: true };
  }
  
  static _checkRow(dtable, table_id, row_id) {
    let updatedTable = TableUtils.getTableById(dtable.value.tables, table_id);
    let row = TableUtils.getRowById(updatedTable, row_id);
    if (!row) {
      let error_message = {
        error_type: 'row_not_exist',
        error_message: 'Row does not exist.'
      };
      return { isValid: false, error_message };
    }
    return { isValid: true };
  }
  
}

export default OperationUtils;