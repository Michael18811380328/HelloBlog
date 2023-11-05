import redis from "redis";
import { TableUtils, OPERATION_TYPE } from "dtable-store";
import { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } from "../config/config";
import logger from "../logger";

class EventManager {
  constructor() {
    this.publishTypes = [
      OPERATION_TYPE.INSERT_ROW,
      OPERATION_TYPE.DELETE_ROW,
      OPERATION_TYPE.DELETE_ROWS,
      OPERATION_TYPE.MODIFY_ROW,
      OPERATION_TYPE.MODIFY_ROWS,
    ];
    this.redisConfig = {
      port: REDIS_PORT,
      host: REDIS_HOST,
    };
    this.passWord = REDIS_PASSWORD;
    this.eventPublisher = null;
  }

  start() {
    this.eventPublisher = redis.createClient(this.redisConfig);
    if (this.passWord) {
      eventPublisher.auth(this.passWord);
    }
    this.eventPublisher.on("error", (err) => {
      logger.error(err);
    });
  }

  stop() {
    this.eventPublisher.quit();
  }

  publishEvents(dtable_uuid, dtable, operation, username, appName) {
    if (this.publishTypes.indexOf(operation.op_type) === -1) {
      return;
    }

    let table_id = operation.table_id;
    let table = TableUtils.getTableById(dtable.value.tables, table_id);
    let table_name = table.name;

    if (operation.op_type === "modify_rows") {
      for (row_id of operation.row_ids) {
        let row = TableUtils.getRowById(table, row_id);
        let row_data = [];
        let row_name = row["0000"] ? row["0000"] : "";
        for (let column of table.columns) {
          if (operation.updated[row_id][column.key] !== undefined) {
            if (column.key === "0000") {
              row_name = operation.updated[row_id][column.key];
            }
            let value = operation.updated[row_id][column.key];
            let old_value = operation.old_rows[row_id][column.key]
              ? operation.old_rows[row_id][column.key]
              : "";
            let column_data = column.data ? column.data : {};
            let cell_data = {
              column_key: column.key,
              column_name: column.name,
              column_type: column.type,
              column_data: column_data,
              value: value,
              old_value: old_value,
            };
            row_data.push(cell_data);
          }
        }
        if (row_data.length === 0) {
          return;
        }
        let message = {
          dtable_uuid: dtable_uuid,
          row_id: row_id,
          op_user: username,
          op_type: "modify_row",
          op_time: Date.now() / 1000,
          table_id: operation.table_id,
          table_name: table_name,
          row_name: row_name,
          row_data: row_data,
          op_app: appName,
        };
        this.eventPublisher.publish(
          "table-events",
          JSON.stringify(message),
          (err, reply) => {
            if (err) {
              logger.error(err);
            }
            if (reply) {
              logger.debug(
                "Publish an user activity:",
                JSON.stringify(message)
              );
            }
          }
        );
      }
      return;
    }

    if (operation.op_type === "delete_rows") {
      for (row_id of operation.row_ids) {
        let row = TableUtils.getRowById(table, row_id);
        let row_data = [];
        row_name = row["0000"] ? row["0000"] : "";
        for (let column of table.columns) {
          let value = row[column.key] ? row[column.key] : "";
          let column_data = column.data ? column.data : {};
          let cell_data = {
            column_key: column.key,
            column_name: column.name,
            column_type: column.type,
            column_data: column_data,
            value: value,
          };
          row_data.push(cell_data);
        }

        let message = {
          dtable_uuid: dtable_uuid,
          row_id: row_id,
          op_user: username,
          op_type: "delete_row",
          op_time: Date.now() / 1000,
          table_id: operation.table_id,
          table_name: table_name,
          row_name: row_name,
          row_data: row_data,
          op_app: appName,
        };
        this.eventPublisher.publish(
          "table-events",
          JSON.stringify(message),
          (err, reply) => {
            if (err) {
              logger.error(err);
            }
            if (reply) {
              logger.debug(
                "Publish an user activity:",
                JSON.stringify(message)
              );
            }
          }
        );
      }
      return;
    }

    let row_id = operation.row_id;
    if (operation.row_data) {
      row_id = operation.row_data._id;
    }
    let row = TableUtils.getRowById(table, row_id);

    let row_data = [];
    let row_name = "";
    if (operation.op_type === "insert_row") {
      row_name = operation.row_data["0000"] ? operation.row_data["0000"] : "";
      for (let column of table.columns) {
        let value = operation.row_data[column.key]
          ? operation.row_data[column.key]
          : "";
        let column_data = column.data ? column.data : {};
        let cell_data = {
          column_key: column.key,
          column_name: column.name,
          column_type: column.type,
          column_data: column_data,
          value: value,
        };
        row_data.push(cell_data);
      }
    }

    if (operation.op_type === "delete_row") {
      row_name = row["0000"] ? row["0000"] : "";
      for (let column of table.columns) {
        let value = row[column.key] ? row[column.key] : "";
        let column_data = column.data ? column.data : {};
        let cell_data = {
          column_key: column.key,
          column_name: column.name,
          column_type: column.type,
          column_data: column_data,
          value: value,
        };
        row_data.push(cell_data);
      }
    }

    if (operation.op_type === "modify_row") {
      row_name = row["0000"] ? row["0000"] : "";
      for (let column of table.columns) {
        if (operation.updated[column.key] !== undefined) {
          if (column.key === "0000") {
            row_name = operation.updated[column.key];
          }
          let value = operation.updated[column.key];
          let old_value = row[column.key] ? row[column.key] : "";
          let column_data = column.data ? column.data : {};
          let cell_data = {
            column_key: column.key,
            column_name: column.name,
            column_type: column.type,
            column_data: column_data,
            value: value,
            old_value: old_value,
          };
          row_data.push(cell_data);
        }
      }
      if (row_data.length === 0) {
        return;
      }
    }

    let message = {
      dtable_uuid: dtable_uuid,
      row_id: row_id,
      op_user: username,
      op_type: operation.op_type,
      op_time: Date.now() / 1000,
      table_id: operation.table_id,
      table_name: table_name,
      row_name: row_name,
      row_data: row_data,
      op_app: appName,
    };
    this.eventPublisher.publish(
      "table-events",
      JSON.stringify(message),
      (err, reply) => {
        if (err) {
          logger.error(err);
        }
        if (reply) {
          logger.debug("Publish an user activity:", JSON.stringify(message));
        }
      }
    );
  }
}

export default EventManager;
