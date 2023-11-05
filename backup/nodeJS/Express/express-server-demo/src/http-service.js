import fs from "fs";
import http from "http";
import bodyParser from "body-parser";
import express from "express";
import csv from "csv";
import { TableUtils, Views } from "dtable-store";
import { decodeAuthorization, decodeAdminAuthorization } from "./utils/auth";
import DtableUtils from "./utils/dtable-utils";
import { ERROR_TYPE, ERROR_MESSAGE } from "./utils/callback-message";
import logger from "./logger";
import { MSG_TYPE_ROW_COMMENT } from "./manager/notification-manager";
import { multiMiddleware } from "./utils/utils";

class HttpService {
  constructor(dtableServer) {
    this.dtableServer = dtableServer;
    this.app = express();
    this.server = http.Server(this.app);
    this.init();
  }

  init() {
    let appContext = this.dtableServer;
    let app = this.app;
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    // Access-Control-Allow-Origin
    app.all("*", (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, Accept"
      );
      res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
      if (req.method.toLowerCase() == "options") {
        res.sendStatus(200);
      } else {
        next();
      }
    });

    app.get("/ping/", (req, res) => {
      res.send("pong");
      return;
    });

    app.get("/dtables/:dtable_uuid", (req, res) => {
      // permission check
      let { lang } = req.query;
      let { dtable_uuid } = req.params;
      let payload = decodeAuthorization(req.headers.authorization, dtable_uuid);
      if (!payload) {
        res
          .status(403)
          .send({
            error_msg:
              "You don't have permission to get data from the current table.",
          });
        return;
      }

      let dtableManager = appContext.getDTableManager();
      dtableManager.getDtable(
        dtable_uuid,
        (err, dtable) => {
          if (err) {
            logger.error(err.error_message);
            if (err.error_type === ERROR_TYPE.DTABLE_NOT_FOUND) {
              res.status(404).send(err.error_message);
              return;
            }

            if (err.error_type === ERROR_TYPE.DTABLE_LOAD_FAILED) {
              res.status(500).send(err.error_message);
              return;
            }
          }

          let resp = dtable.serializeTablesData();
          res.send(resp);
          return;
        },
        lang
      );
    });

    app.get("/api/v1/dtables/:dtable_uuid/metadata/", (req, res) => {
      // permission check
      let { dtable_uuid } = req.params;
      let payload = decodeAuthorization(req.headers.authorization, dtable_uuid);
      if (!payload) {
        res
          .status(403)
          .send({
            error_msg:
              "You don't have permission to get data from the current table.",
          });
        return;
      }

      let dtableManager = appContext.getDTableManager();
      dtableManager.getDtable(dtable_uuid, (err, dtable) => {
        if (err) {
          logger.error(err.error_message);
          if (err.error_type === ERROR_TYPE.DTABLE_NOT_FOUND) {
            res.status(404).send(err.error_message);
            return;
          }

          if (err.error_type === ERROR_TYPE.DTABLE_LOAD_FAILED) {
            res.status(500).send(err.error_message);
            return;
          }
        }

        let metadata = {};
        let tables = [];
        for (let data of dtable.value.tables) {
          let table = {
            _id: data._id,
            name: data.name,
            is_header_locked: data.is_header_locked,
            columns: data.columns,
            views: data.views,
          };
          tables.push(table);
        }
        metadata["tables"] = tables;
        let resp = { metadata: metadata };
        res.send(resp);
        return;
      });
    });

    app.get("/api/v1/dtables/:dtable_uuid/rows/", (req, res) => {
      // list view's rows by dtable_uuid, table_name and view_name
      // if no view_name is given, return rows of 'Default View'

      // permission check
      let { dtable_uuid } = req.params;
      let payload = decodeAuthorization(req.headers.authorization, dtable_uuid);
      if (!payload) {
        res
          .status(403)
          .send({
            error_msg:
              "You don't have permission to get data from the current table.",
          });
        return;
      }
      let dtableManager = appContext.getDTableManager();
      dtableManager.getDtable(dtable_uuid, (err, dtable) => {
        if (err) {
          logger.error(err.error_message);
          if (err.error_type === ERROR_TYPE.DTABLE_NOT_FOUND) {
            res.status(404).send(err.error_message);
            return;
          }

          if (err.error_type === ERROR_TYPE.DTABLE_LOAD_FAILED) {
            res.status(500).send(err.error_message);
            return;
          }
        }

        // get rows by table_id and view_id, if table_id and view_id is provided
        let {
          table_name: tableName,
          view_name: viewName,
          table_id: tableId,
          view_id: viewId,
          grouping: grouping,
        } = req.query;
        let table, view;

        // params check
        if (
          grouping &&
          grouping != "true" &&
          grouping != "false" &&
          grouping != ""
        ) {
          res.status(400).send({ error_msg: `grouping invalid` });
          return;
        }

        if (!tableId && !tableName) {
          res.status(400).send({ error_msg: `params invalid` });
          return;
        }

        if (tableId) {
          table = TableUtils.getTableById(dtable.value.tables, tableId);
        } else {
          table = TableUtils.getTableByName(dtable.value.tables, tableName);
        }
        if (!table) {
          res.status(404).send({ error_msg: `table not found` });
          return;
        }

        // if no view if specified, return rows of first view in views array,
        // which is initialized as default view
        if (!viewId && !viewName) {
          view = table.views[0];
        }
        if (viewId) {
          view = Views.getViewById(table.views, viewId);
        }
        if (viewName) {
          view = Views.getViewByName(table.views, viewName);
        }
        if (!view) {
          res.status(404).send({ error_msg: `view not found` });
          return;
        }

        if (grouping === "true") {
          if (!Views.isGroupView(view)) {
            // require grouped rows, but view itself is not grouped, return err
            res.status(400).send({ error_msg: `table not support group` });
            return;
          }
          res.send({
            groups: dtableManager.listTableViewGroupedRows(dtable, table, view),
          });
          return;
        } else {
          res.send({
            rows: dtableManager.listTableViewRows(dtable, table, view),
          });
          return;
        }
      });
    });

    app.post("/api/v1/dtables/:dtable_uuid/rows/", (req, res) => {
      let { dtable_uuid } = req.params;
      let payload = decodeAuthorization(req.headers.authorization, dtable_uuid);
      if (!payload || payload.permission !== "rw") {
        res
          .status(403)
          .send({
            error_msg:
              "You don't have permission to get data from the current table.",
          });
        return;
      }
      let { username, app_name } = payload;
      let dtableManager = appContext.getDTableManager();
      dtableManager.getDtable(dtable_uuid, (err, dtable) => {
        if (err) {
          logger.error(err.error_message);
          if (err.error_type === ERROR_TYPE.DTABLE_NOT_FOUND) {
            res.status(404).send(err.error_message);
            return;
          }

          if (err.error_type === ERROR_TYPE.DTABLE_LOAD_FAILED) {
            res.status(500).send(err.error_message);
            return;
          }
        }

        try {
          let operations = req.body;
          dtableManager.insertRowToTable(
            username,
            app_name,
            dtable_uuid,
            dtable,
            operations,
            (isValid, error_message) => {
              if (!isValid) {
                res.status(400).send(error_message);
                return;
              }
              res.send({ success: true });
              return;
            }
          );
        } catch (error) {
          logger.error(error);
          res.sendStatus(500);
          return;
        }
      });
    });

    app.put("/api/v1/dtables/:dtable_uuid/rows/", (req, res) => {
      // update a row

      // permission check
      let { dtable_uuid } = req.params;
      let payload = decodeAuthorization(req.headers.authorization, dtable_uuid);
      if (!payload || payload.permission !== "rw") {
        res
          .status(403)
          .send({
            error_msg:
              "You don't have permission to get data from the current table.",
          });
        return;
      }
      let { username, app_name } = payload;
      let dtableManager = appContext.getDTableManager();
      dtableManager.getDtable(dtable_uuid, (err, dtable) => {
        if (err) {
          logger.error(err.error_message);
          if (err.error_type === ERROR_TYPE.DTABLE_NOT_FOUND) {
            res.status(404).send(err.error_message);
            return;
          }

          if (err.error_type === ERROR_TYPE.DTABLE_LOAD_FAILED) {
            res.status(500).send(err.error_message);
            return;
          }
        }

        try {
          let operations = req.body;
          dtableManager.modifyTableRow(
            username,
            app_name,
            dtable_uuid,
            dtable,
            operations,
            (isValid, error_message) => {
              if (!isValid) {
                res.status(400).send(error_message);
                return;
              }
              res.send({ success: true });
              return;
            }
          );
        } catch (error) {
          logger.error(error);
          res.sendStatus(500);
          return;
        }
      });
    });

    app.delete("/api/v1/dtables/:dtable_uuid/rows/", (req, res) => {
      // delete a row

      // permission check
      let { dtable_uuid } = req.params;
      let payload = decodeAuthorization(req.headers.authorization, dtable_uuid);
      if (!payload || payload.permission !== "rw") {
        res
          .status(403)
          .send({
            error_msg:
              "You don't have permission to get data from the current table.",
          });
        return;
      }
      let { username, app_name } = payload;
      let dtableManager = appContext.getDTableManager();
      dtableManager.getDtable(dtable_uuid, (err, dtable) => {
        if (err) {
          logger.error(err.error_message);
          if (err.error_type === ERROR_TYPE.DTABLE_NOT_FOUND) {
            res.status(404).send(err.error_message);
            return;
          }

          if (err.error_type === ERROR_TYPE.DTABLE_LOAD_FAILED) {
            res.status(500).send(err.error_message);
            return;
          }
        }

        try {
          let operations = req.body;
          dtableManager.deleteTableRow(
            username,
            app_name,
            dtable_uuid,
            dtable,
            operations,
            (isValid, error_message) => {
              if (!isValid) {
                res.status(400).send(error_message);
                return;
              }
              res.send({ success: true });
              return;
            }
          );
        } catch (error) {
          logger.error(error);
          res.sendStatus(500);
          return;
        }
      });
    });

    app.get("/api/v1/dtables/:dtable_uuid/filtered-rows/", (req, res) => {
      // permission check
      let { dtable_uuid } = req.params;
      let payload = decodeAuthorization(req.headers.authorization, dtable_uuid);
      if (!payload) {
        res
          .status(403)
          .send({
            error_msg:
              "You don't have permission to get data from the current table.",
          });
        return;
      }
      let dtableManager = appContext.getDTableManager();
      dtableManager.getDtable(dtable_uuid, (err, dtable) => {
        if (err) {
          logger.error(err.error_message);
          if (err.error_type === ERROR_TYPE.DTABLE_NOT_FOUND) {
            res.status(404).send(err.error_message);
            return;
          }

          if (err.error_type === ERROR_TYPE.DTABLE_LOAD_FAILED) {
            res.status(500).send(err.error_message);
            return;
          }
        }

        let { table_name: tableName, view_name: viewName } = req.query;
        let { filters: filters, filter_conjunction: filterConjunction } =
          req.body;
        let table, view;

        // params check
        if (!tableName) {
          res.status(400).send({ error_msg: `table_name invalid` });
          return;
        }
        table = TableUtils.getTableByName(dtable.value.tables, tableName);
        if (!table) {
          res.status(404).send({ error_msg: `table not found` });
          return;
        }

        if (!filters) {
          res.status(404).send({ error_msg: `filters required.` });
          return;
        }

        if (filters.length > 1) {
          // if given more than 1 filters but conjunction is not valid, return err
          if (
            !filterConjunction ||
            (filterConjunction != "Or" && filterConjunction != "And")
          ) {
            res.status(404).send({ error_msg: `filter_conjunction invalid` });
            return;
          }
        } else {
          // if only one filter, dtable-store required a default conjunction
          filterConjunction = "And";
        }

        // if no view if specified, return rows of first view in views array,
        // which is initialized as default view
        if (!viewName) {
          view = table.views[0];
        } else {
          view = Views.getViewByName(table.views, viewName);
        }
        if (!view) {
          res.status(404).send({ error_msg: `view not found` });
          return;
        }

        filters.map((filter) => {
          let column = TableUtils.getTableColumnByName(
            table,
            filter.column_name
          );
          if (!column) {
            res
              .status(400)
              .send({ error_msg: `column ${filter.column_name} not found` });
            return;
          }
          filter.column_key = column.key;
        });

        res.send({
          rows: dtableManager.listTableViewFilteredRows(
            dtable,
            table,
            view,
            filters,
            filterConjunction
          ),
        });
        return;
      });
    });

    app.get("/api/v1/dtables/:dtable_uuid/operations", (req, res) => {
      // parameters check
      let { page, count } = req.query;
      if (!page) page = 1;
      if (!count) count = 25;

      // permission check
      let { dtable_uuid } = req.params;
      let payload = decodeAuthorization(req.headers.authorization, dtable_uuid);
      if (!payload) {
        res
          .status(403)
          .send({
            error_msg:
              "You don't have permission to get data from the current table.",
          });
        return;
      }
      DtableUtils.queryDtableOperations(
        dtable_uuid,
        (page - 1) * count,
        count,
        (err, results) => {
          if (err) {
            logger.error(err);
            res.sendStatus(500);
            return;
          }
          res.send({ operations: results });
          return;
        }
      );
    });

    app.post("/api/v1/dtables/:dtable_uuid/operations", (req, res) => {
      // parameters check
      let operation = req.body;
      if (!operation) {
        res.status(400).send({ error_msg: "operation invalid" });
        return;
      }

      // permission check
      let { dtable_uuid } = req.params;
      let payload = decodeAuthorization(req.headers.authorization, dtable_uuid);
      if (!payload || payload.permission !== "rw") {
        res
          .status(403)
          .send({
            error_msg: "You don't have permission to update the current table.",
          });
        return;
      }

      let { username, app_name } = payload;
      let dtableManager = appContext.getDTableManager();
      dtableManager.getDtable(dtable_uuid, (err, dtable) => {
        if (err) {
          logger.error(err.error_message);
          if (err.error_type === ERROR_TYPE.DTABLE_NOT_FOUND) {
            res.status(404).send(err.error_message);
            return;
          }

          if (err.error_type === ERROR_TYPE.DTABLE_LOAD_FAILED) {
            res.status(500).send(err.error_message);
            return;
          }
        }

        try {
          let { isValid, error_message } = dtableManager.execHttpOperation(
            username,
            app_name,
            dtable_uuid,
            dtable,
            operation
          );
          if (!isValid) {
            res.status(400).send(error_message);
            return;
          }
          res.send({ success: true });
          return;
        } catch (error) {
          logger.error(error);
          res.sendStatus(500);
          return;
        }
      });
    });

    app.delete(
      "/api/v1/dtables/:dtable_uuid/comments/:comment_id/",
      (req, res) => {
        // params check
        let { dtable_uuid, comment_id } = req.params;
        if (isNaN(comment_id)) {
          res.status(400).send({ error_msg: "comment_id invalid" });
          return;
        }
        comment_id = parseInt(comment_id);
        // permission check
        let payload = decodeAuthorization(
          req.headers.authorization,
          dtable_uuid
        );
        if (!payload || payload.permission !== "rw") {
          res
            .status(403)
            .send({ error_msg: "You don't have permission to delete comment" });
          return;
        }
        // resource check and exec sql
        let dtableManager = appContext.getDTableManager();
        dtableManager.getDtable(dtable_uuid, (err, dtable) => {
          if (err) {
            logger.error(err.error_message);
            if (err.error_type === ERROR_TYPE.DTABLE_NOT_FOUND) {
              res.status(404).send(err.error_message);
              return;
            }

            if (err.error_type === ERROR_TYPE.DTABLE_LOAD_FAILED) {
              res.status(500).send(err.error_message);
              return;
            }
          }

          let commentManager = appContext.getCommentManager();
          commentManager.getRowComment(comment_id, (err, comment) => {
            if (err) {
              logger.error(
                "user: ",
                payload.username,
                " query such comment: ",
                comment_id,
                " error: ",
                err
              );
              res.sendStatus(500);
              return;
            }
            if (!comment) {
              res
                .status(404)
                .send({ error_msg: `comment ${comment_id} not found` });
              return;
            }
            if (
              comment.dtable_uuid !== dtable_uuid ||
              comment.author !== payload.username
            ) {
              res
                .status(403)
                .send({
                  error_msg: "You don't have permission to delete comment",
                });
              return;
            }
            commentManager.deleteRowComment(comment_id, (err) => {
              if (err) {
                logger.error(
                  "user: ",
                  payload.username,
                  " delete comment: ",
                  comment_id,
                  " error: ",
                  err
                );
                res.sendStatus(500);
                return;
              }
              res.send({ success: true });
            });
          });
        });
      }
    );

    app.put(
      "/api/v1/dtables/:dtable_uuid/comments/:comment_id/",
      (req, res) => {
        // params check
        let { dtable_uuid, comment_id } = req.params;
        let { options } = req.body;
        if (
          !options ||
          (!options.comment && !options.resolved) ||
          (options.resolved && options.resolved !== 1) ||
          (options.comment && typeof options.comment !== "string")
        ) {
          res.status(400).send({ error_msg: "options invalid" });
          return;
        }
        if (isNaN(comment_id)) {
          res.status(400).send({ error_msg: "comment_id invalid" });
          return;
        }
        comment_id = parseInt(comment_id);
        // permission check
        let payload = decodeAuthorization(
          req.headers.authorization,
          dtable_uuid
        );
        if (!payload || payload.permission !== "rw") {
          res
            .status(403)
            .send({
              error_msg: "You don't have permission to update the comment",
            });
          return;
        }
        // resource check and exec sql
        let dtableManager = appContext.getDTableManager();
        dtableManager.getDtable(dtable_uuid, (err, dtable) => {
          if (err) {
            logger.error(err.error_message);
            if (err.error_type === ERROR_TYPE.DTABLE_NOT_FOUND) {
              res.status(404).send(err.error_message);
              return;
            }

            if (err.error_type === ERROR_TYPE.DTABLE_LOAD_FAILED) {
              res.status(500).send(err.error_message);
              return;
            }
          }

          let commentManager = appContext.getCommentManager();
          commentManager.getRowComment(comment_id, (err, comment) => {
            if (err) {
              logger.error(
                "user: ",
                payload.username,
                " query comment: ",
                comment_id,
                " when PUT comment error: ",
                err
              );
              res.sendStatus(500);
              return;
            }
            if (!comment) {
              res
                .status(404)
                .send({ error_msg: `comment ${comment_id} not found` });
              return;
            }
            if (comment.dtable_uuid !== dtable_uuid) {
              res
                .status(403)
                .send({
                  error_msg: "You don't have permission to update the comment",
                });
              return;
            }
            if (comment.author !== payload.username && options.comment) {
              res
                .status(403)
                .send({
                  error_msg: "You don't have permission to edit comment",
                });
              return;
            }
            commentManager.updateRowComment(
              payload.username,
              comment_id,
              options,
              (err) => {
                if (err) {
                  logger.error(
                    "user: ",
                    payload.username,
                    " update comment: ",
                    comment_id,
                    " with options: ",
                    options,
                    " error: ",
                    err
                  );
                  res.sendStatus(500);
                  return;
                }
                res.send({ success: true });
              }
            );
          });
        });
      }
    );

    app.get(
      "/api/v1/dtables/:dtable_uuid/comments/:comment_id/",
      (req, res) => {
        // params check
        let { dtable_uuid, comment_id } = req.params;
        if (isNaN(comment_id)) {
          res.status(400).send({ error_msg: "comment_id invalid" });
          return;
        }
        comment_id = parseInt(comment_id);
        // permission check
        let payload = decodeAuthorization(
          req.headers.authorization,
          dtable_uuid
        );
        if (!payload) {
          res
            .status(403)
            .send({ error_msg: "You don't have permission to read comment" });
          return;
        }
        // resouce check and query db
        let dtableManager = appContext.getDTableManager();
        dtableManager.getDtable(dtable_uuid, (err, dtable) => {
          if (err) {
            logger.error(err.error_message);
            if (err.error_type === ERROR_TYPE.DTABLE_NOT_FOUND) {
              res.status(404).send(err.error_message);
              return;
            }

            if (err.error_type === ERROR_TYPE.DTABLE_LOAD_FAILED) {
              res.status(500).send(err.error_message);
              return;
            }
          }

          let commentManager = appContext.getCommentManager();
          commentManager.getRowComment(comment_id, (err, comment) => {
            if (err) {
              logger.error(
                "user: ",
                payload.username,
                " query single comment: ",
                comment_id,
                " error: ",
                err
              );
              res.sendStatus(500);
              return;
            }
            if (!comment) {
              res
                .status(404)
                .send({ error_msg: `comment ${comment_id} not found` });
              return;
            }
            if (comment.dtable_uuid !== dtable_uuid) {
              res
                .status(403)
                .send({
                  error_msg: "You don't have permission to get the comment",
                });
              return;
            }
            res.send(comment);
          });
        });
      }
    );

    app.post("/api/v1/dtables/:dtable_uuid/comments/", (req, res) => {
      // params check
      let { table_id, row_id } = req.query;
      if (!table_id || !row_id) {
        res.status(400).send({ error_msg: "table_id or row_id invalid" });
        return;
      }
      let { comment } = req.body;
      if (!comment) {
        res.status(400).send({ error_msg: "comment invalid" });
        return;
      }
      // permission check
      let { dtable_uuid } = req.params;
      let payload = decodeAuthorization(req.headers.authorization, dtable_uuid);
      if (!payload || payload.permission !== "rw") {
        res
          .status(403)
          .send({ error_msg: "You don't have permission to comment the row" });
        return;
      }
      // resource check and exec sql
      let dtableManager = appContext.getDTableManager();
      dtableManager.getDtable(dtable_uuid, (err, dtable) => {
        if (err) {
          logger.error(err.error_message);
          if (err.error_type === ERROR_TYPE.DTABLE_NOT_FOUND) {
            res.status(404).send(err.error_message);
            return;
          }

          if (err.error_type === ERROR_TYPE.DTABLE_LOAD_FAILED) {
            res.status(500).send(err.error_message);
            return;
          }
        }

        let commentManager = appContext.getCommentManager();
        commentManager.addRowComment(
          payload.username,
          dtable_uuid,
          row_id,
          comment,
          (err) => {
            if (err) {
              logger.error(
                "user: ",
                payload.username,
                " in dtable: ",
                dtable_uuid,
                " row: ",
                row_id,
                " create comment: ",
                comment,
                " error: ",
                err
              );
              res.sendStatus(500);
              return;
            }
            let table = TableUtils.getTableById(dtable.value.tables, table_id);
            let row = TableUtils.getRowById(table, row_id);
            let to_users = row["_participants"] ? row["_participants"] : [];
            let notificationManager = appContext.getNotificationManager();
            for (let to_user of to_users) {
              if (to_user.email === payload.username) continue;
              let detail = {
                author: payload.username,
                table_id: table_id,
                row_id: row_id,
                comment: comment,
              };
              notificationManager.addNotification(
                to_user.email,
                dtable_uuid,
                MSG_TYPE_ROW_COMMENT,
                JSON.stringify(detail),
                (err, results) => {
                  if (err) {
                    logger.error("add row_comment notification failed:", err);
                  }
                  let userManager = appContext.getUserManager();
                  let socketIdList = userManager.getSocketIdList(
                    dtable_uuid,
                    to_user.email
                  );
                  let webSocketManager = appContext.getWebSocketManager();
                  let notification = {
                    id: results.insertId,
                    username: to_user.email,
                    dtable_uuid: dtable_uuid,
                    created_at: new Date(),
                    msg_type: MSG_TYPE_ROW_COMMENT,
                    detail: detail,
                  };
                  for (let socketId of socketIdList) {
                    webSocketManager.io
                      .to(socketId)
                      .emit("new-notification", JSON.stringify(notification));
                  }
                }
              );
            }
            res.send({ success: true });
          }
        );
      });
    });

    app.get("/api/v1/dtables/:dtable_uuid/comments/", (req, res) => {
      // params check
      let { page, per_page, row_id } = req.query;
      if (!row_id) {
        res.status(400).send({ error_msg: "row_id invalid" });
      }
      page = isNaN(page) ? 1 : parseInt(page);
      page = page > 0 ? page : 1;
      per_page = isNaN(per_page) ? 10 : parseInt(per_page);
      per_page = per_page > 0 ? per_page : 10;
      // permission check
      let { dtable_uuid } = req.params;
      let payload = decodeAuthorization(req.headers.authorization, dtable_uuid);
      if (!payload) {
        res
          .status(403)
          .send({ error_msg: "You don't have permission to read comments." });
        return;
      }
      // exec sql and resp
      let dtableManager = appContext.getDTableManager();
      dtableManager.getDtable(dtable_uuid, (err, dtable) => {
        if (err) {
          logger.error(err.error_message);
          if (err.error_type === ERROR_TYPE.DTABLE_NOT_FOUND) {
            res.status(404).send(err.error_message);
            return;
          }

          if (err.error_type === ERROR_TYPE.DTABLE_LOAD_FAILED) {
            res.status(500).send(err.error_message);
            return;
          }
        }

        let offset = (page - 1) * per_page;
        let commentManager = appContext.getCommentManager();
        commentManager.listRowComments(
          dtable_uuid,
          row_id,
          per_page,
          offset,
          (err, results) => {
            if (err) {
              logger.error(
                "user: ",
                payload.username,
                " query comments in dtable: ",
                dtable_uuid,
                " row: ",
                row_id,
                " error: ",
                err
              );
              res.sendStatus(500);
              return;
            }
            res.send(results);
          }
        );
      });
    });

    app.get("/api/v1/dtables/:dtable_uuid/comments-count/", (req, res) => {
      // permission check
      let { row_id } = req.query;
      let { dtable_uuid } = req.params;
      let payload = decodeAuthorization(req.headers.authorization, dtable_uuid);
      if (!payload) {
        res
          .status(403)
          .send({
            error_msg:
              "You don't have permission to access the table's comments.",
          });
        return;
      }
      let dtableManager = appContext.getDTableManager();
      dtableManager.getDtable(dtable_uuid, (err, dtable) => {
        if (err) {
          logger.error(err.error_message);
          if (err.error_type === ERROR_TYPE.DTABLE_NOT_FOUND) {
            res.status(404).send(err.error_message);
            return;
          }

          if (err.error_type === ERROR_TYPE.DTABLE_LOAD_FAILED) {
            res.status(500).send(err.error_message);
            return;
          }
        }

        let count = 0;
        let commentManager = appContext.getCommentManager();
        commentManager.getRowCommentCount(
          dtable_uuid,
          row_id,
          (err, results) => {
            if (err) {
              logger.error(
                "user: ",
                payload.username,
                " query comments-count in dtable: ",
                dtable_uuid,
                " row: ",
                row_id,
                " error: ",
                err
              );
              res.sendStatus(500);
              return;
            }
            count = results[0].count;
            res.send({ count });
          }
        );
      });
    });

    app.get("/api/v1/dtables/:dtable_uuid/related-users/", (req, res) => {
      let { dtable_uuid } = req.params;
      let payload = decodeAuthorization(req.headers.authorization, dtable_uuid);
      if (!payload) {
        res
          .status(403)
          .send({ error_msg: "You don't have permission to get users." });
        return;
      }
      let dtableManager = appContext.getDTableManager();
      dtableManager.getDtable(dtable_uuid, (err) => {
        if (err) {
          logger.error(err.error_message);
          if (err.error_type === ERROR_TYPE.DTABLE_NOT_FOUND) {
            res.status(404).send(err.error_message);
            return;
          }

          if (err.error_type === ERROR_TYPE.DTABLE_LOAD_FAILED) {
            res.status(500).send(err.error_message);
            return;
          }
        }

        dtableManager.getRelatedUsers(dtable_uuid, (err, users) => {
          if (err) {
            logger.error(
              "get dtable related-users: ",
              dtable_uuid,
              " error: ",
              err
            );
            res.sendStatus(500);
            return;
          }
          res.send({ user_list: users });
        });
      });
    });

    app.get("/api/v1/dtables/:dtable_uuid/activities/", (req, res) => {
      let { dtable_uuid } = req.params;
      let { page, per_page, row_id } = req.query;
      if (!row_id) {
        res.status(400).send({ error_msg: "row_id is invalid." });
      }
      let payload = decodeAuthorization(req.headers.authorization, dtable_uuid);
      if (!payload) {
        res
          .status(403)
          .send({ error_msg: "You don't have permission to get activities." });
        return;
      }
      page = isNaN(page) || parseInt(page) <= 0 ? 1 : parseInt(page);
      per_page =
        isNaN(per_page) || parseInt(per_page) <= 0 ? 10 : parseInt(per_page);
      let offset = (page - 1) * per_page;
      let dtableManager = appContext.getDTableManager();
      dtableManager.getDtable(dtable_uuid, (err, dtable) => {
        if (err) {
          logger.error("get dtable: ", dtable_uuid, " error: ", err);
          res.sendStatus(500);
          return;
        }
        dtableManager.getRowActivities(
          dtable_uuid,
          row_id,
          per_page,
          offset,
          (err, activities, total_count) => {
            if (err) {
              logger.error("get row: ", row_id, " activities error: ", err);
              res.sendStatus(500);
              return;
            }
            res.send({ activities, total_count });
          }
        );
      });
    });

    app.get("/api/v1/dtables/:dtable_uuid/deleted-rows/", (req, res) => {
      // parameters check
      let { page, per_page } = req.query;
      if (!page) page = 1;
      if (!per_page) per_page = 25;
      page = parseInt(page);
      per_page = parseInt(per_page);
      if (isNaN(page) || isNaN(per_page) || page < 1 || per_page < 1) {
        res.status(400).send({ error_msg: "page or per_page invalid." });
        return;
      }

      // permission check
      let { dtable_uuid } = req.params;
      let payload = decodeAuthorization(req.headers.authorization, dtable_uuid);
      if (!payload) {
        res
          .status(403)
          .send({
            error_msg: "You don't have permission to get deleted rows.",
          });
        return;
      }

      let dtableManager = appContext.getDTableManager();
      dtableManager.getDtable(dtable_uuid, (err, dtable) => {
        if (err) {
          logger.error(err.error_message);
          if (err.error_type === ERROR_TYPE.DTABLE_NOT_FOUND) {
            res.status(404).send(err.error_message);
            return;
          }
          if (err.error_type === ERROR_TYPE.DTABLE_LOAD_FAILED) {
            res.status(500).send(err.error_message);
            return;
          }
        }
        DtableUtils.getDtableDeletedRows(
          dtable_uuid,
          (page - 1) * per_page,
          per_page,
          (err, results) => {
            if (err) {
              logger.error("get deleted rows error: ", err);
              res.sendStatus(500);
              return;
            }
            let deleted_rows = [];
            for (let result of results) {
              result.detail = JSON.parse(result.detail);
              deleted_rows.push(result);
            }
            res.send({ deleted_rows: deleted_rows });
          }
        );
      });
    });

    app.get("/api/v1/dtables/:dtable_uuid/notifications/", (req, res) => {
      // parameters check
      let { page, per_page } = req.query;
      if (!page) page = 1;
      if (!per_page) per_page = 25;
      page = parseInt(page);
      per_page = parseInt(per_page);
      if (isNaN(page) || isNaN(per_page) || page < 1 || per_page < 1) {
        res.status(400).send({ error_msg: "page or per_page invalid." });
        return;
      }

      // permission check
      let { dtable_uuid } = req.params;
      let payload = decodeAuthorization(req.headers.authorization, dtable_uuid);
      if (!payload) {
        res
          .status(403)
          .send({
            error_msg:
              "You don't have permission to access the table's notifications.",
          });
        return;
      }

      let dtableManager = appContext.getDTableManager();
      dtableManager.getDtable(dtable_uuid, (err, dtable) => {
        if (err) {
          logger.error(err.error_message);
          if (err.error_type === ERROR_TYPE.DTABLE_NOT_FOUND) {
            res.status(404).send(err.error_message);
            return;
          }
          if (err.error_type === ERROR_TYPE.DTABLE_LOAD_FAILED) {
            res.status(500).send(err.error_message);
            return;
          }
        }
        let notificationManager = appContext.getNotificationManager();
        notificationManager.listNotifications(
          payload.username,
          dtable_uuid,
          (page - 1) * per_page,
          per_page,
          (err, results) => {
            if (err) {
              logger.error(err);
              res.sendStatus(500);
              return;
            }
            let notification_list = [];
            for (let result of results) {
              result.detail = JSON.parse(result.detail);
              notification_list.push(result);
            }
            res.send({ notification_list: notification_list });
          }
        );
      });
    });

    app.post("/api/v1/dtables/:dtable_uuid/notifications/", (req, res) => {
      // parameters check
      let { to_user, msg_type, detail } = req.body;
      if (!to_user || !msg_type || !detail) {
        res.status(400).send({ error_msg: "parameters invalid." });
        return;
      }

      // permission check
      let { dtable_uuid } = req.params;
      let payload = decodeAuthorization(req.headers.authorization, dtable_uuid);
      if (!payload) {
        res
          .status(403)
          .send({
            error_msg:
              "You don't have permission to access the table's notifications.",
          });
        return;
      }

      let dtableManager = appContext.getDTableManager();
      dtableManager.getDtable(dtable_uuid, (err, dtable) => {
        if (err) {
          logger.error(err.error_message);
          if (err.error_type === ERROR_TYPE.DTABLE_NOT_FOUND) {
            res.status(404).send(err.error_message);
            return;
          }
          if (err.error_type === ERROR_TYPE.DTABLE_LOAD_FAILED) {
            res.status(500).send(err.error_message);
            return;
          }
        }
        let notificationManager = appContext.getNotificationManager();
        notificationManager.addNotification(
          to_user,
          dtable_uuid,
          msg_type,
          JSON.stringify(detail),
          (err, results) => {
            if (err) {
              logger.error(err);
              res.sendStatus(500);
              return;
            }
            let userManager = appContext.getUserManager();
            let socketIdList = userManager.getSocketIdList(
              dtable_uuid,
              to_user.email
            );
            let webSocketManager = appContext.getWebSocketManager();
            let notification = {
              id: results.insertId,
              username: to_user.email,
              dtable_uuid: dtable_uuid,
              created_at: new Date(),
              msg_type: MSG_TYPE_ROW_COMMENT,
              detail: detail,
            };
            for (let socketId of socketIdList) {
              webSocketManager.io
                .to(socketId)
                .emit("new-notification", JSON.stringify(notification));
            }
            res.send({ success: true });
          }
        );
      });
    });

    app.put("/api/v1/dtables/:dtable_uuid/notifications/", (req, res) => {
      // parameters check
      let seen = req.body.seen;
      if (String(seen) === "true") {
        seen = true;
      } else if (String(seen) === "false") {
        seen = false;
      } else {
        res.status(400).send({ error_msg: "seen invalid." });
        return;
      }
      // permission check
      let { dtable_uuid } = req.params;
      let payload = decodeAuthorization(req.headers.authorization, dtable_uuid);
      if (!payload) {
        res
          .status(403)
          .send({
            error_msg:
              "You don't have permission to access the table's notifications.",
          });
        return;
      }

      let dtableManager = appContext.getDTableManager();
      dtableManager.getDtable(dtable_uuid, (err, dtable) => {
        if (err) {
          logger.error(err.error_message);
          if (err.error_type === ERROR_TYPE.DTABLE_NOT_FOUND) {
            res.status(404).send(err.error_message);
            return;
          }
          if (err.error_type === ERROR_TYPE.DTABLE_LOAD_FAILED) {
            res.status(500).send(err.error_message);
            return;
          }
        }
        let notificationManager = appContext.getNotificationManager();
        notificationManager.updateNotifications(
          payload.username,
          dtable_uuid,
          seen,
          (err, results) => {
            if (err) {
              logger.error(err);
              res.sendStatus(500);
              return;
            }
            res.send({ success: true });
          }
        );
      });
    });

    app.put(
      "/api/v1/dtables/:dtable_uuid/notifications/:notification_id/",
      (req, res) => {
        // parameters check
        let { dtable_uuid, notification_id } = req.params;
        notification_id = parseInt(notification_id);
        if (isNaN(notification_id)) {
          res.status(400).send({ error_msg: "notification_id invalid" });
          return;
        }
        let seen = req.body.seen;
        if (String(seen) === "true") {
          seen = true;
        } else if (String(seen) === "false") {
          seen = false;
        } else {
          res.status(400).send({ error_msg: "seen invalid." });
          return;
        }

        // permission check
        let payload = decodeAuthorization(
          req.headers.authorization,
          dtable_uuid
        );
        if (!payload) {
          res
            .status(403)
            .send({
              error_msg:
                "You don't have permission to access the table's notifications.",
            });
          return;
        }

        let dtableManager = appContext.getDTableManager();
        dtableManager.getDtable(dtable_uuid, (err, dtable) => {
          if (err) {
            logger.error(err.error_message);
            if (err.error_type === ERROR_TYPE.DTABLE_NOT_FOUND) {
              res.status(404).send(err.error_message);
              return;
            }
            if (err.error_type === ERROR_TYPE.DTABLE_LOAD_FAILED) {
              res.status(500).send(err.error_message);
              return;
            }
          }
          let notificationManager = appContext.getNotificationManager();
          notificationManager.getNotification(
            payload.username,
            notification_id,
            (err, notification) => {
              if (err) {
                logger.error(err);
                res.sendStatus(500);
                return;
              }
              if (!notification) {
                res
                  .status(404)
                  .send({
                    error_msg: `notification ${notification_id} not found.`,
                  });
                return;
              }
              notificationManager.updateNotification(
                payload.username,
                notification_id,
                seen,
                (err, results) => {
                  if (err) {
                    logger.error(err);
                    res.sendStatus(500);
                    return;
                  }
                  res.send({ success: true });
                }
              );
            }
          );
        });
      }
    );

    app.delete("/api/v1/dtables/:dtable_uuid/notifications/", (req, res) => {
      // permission check
      let { dtable_uuid } = req.params;
      let payload = decodeAuthorization(req.headers.authorization, dtable_uuid);
      if (!payload) {
        res
          .status(403)
          .send({
            error_msg:
              "You don't have permission to access the table's notifications.",
          });
        return;
      }

      let dtableManager = appContext.getDTableManager();
      dtableManager.getDtable(dtable_uuid, (err, dtable) => {
        if (err) {
          logger.error(err.error_message);
          if (err.error_type === ERROR_TYPE.DTABLE_NOT_FOUND) {
            res.status(404).send(err.error_message);
            return;
          }
          if (err.error_type === ERROR_TYPE.DTABLE_LOAD_FAILED) {
            res.status(500).send(err.error_message);
            return;
          }
        }
        let notificationManager = appContext.getNotificationManager();
        notificationManager.deleteNotifications(
          payload.username,
          dtable_uuid,
          (err, results) => {
            if (err) {
              logger.error(err);
              res.sendStatus(500);
              return;
            }
            res.send({ success: true });
          }
        );
      });
    });

    app.post(
      "/api/v1/:dtable_uuid/import-csv/",
      multiMiddleware,
      (req, res) => {
        try {
          let dtable_uuid = req.params.dtable_uuid;
          let payload = decodeAuthorization(
            req.headers.authorization,
            dtable_uuid
          );
          if (!payload || payload.permission !== "rw") {
            res
              .status(403)
              .send({ error_msg: "You don't have permission to import table" });
            return;
          }
          let { username } = payload;

          let { table_name, lang } = req.body;
          if (!table_name) {
            res.status(400).send({ error_msg: "table_name is invalid." });
            return;
          }
          if (!lang) {
            res.status(400).send({ error_msg: "lang is invalid." });
            return;
          }
          if (
            !req.files ||
            !req.files.csv_file ||
            req.files.csv_file instanceof Array
          ) {
            res.status(400).send({ error_msg: "No csv file." });
            return;
          }
          if (req.files.csv_file.type !== "text/csv") {
            res.status(400).send({ error_msg: "csv_file type error." });
            return;
          }
          let filePath = req.files.csv_file.path;
          if (!fs.existsSync(filePath)) {
            logger.error("can't find file: ", filePath, " but it is uplaoded.");
            res.status(500).send({ error_msg: "Internal Server Error." });
            return;
          }

          // resource check and insert
          let dtableManager = appContext.getDTableManager();
          dtableManager.getDtable(dtable_uuid, (err, dtable) => {
            if (err) {
              logger.error(err.error_message);
              if (err.error_type === ERROR_TYPE.DTABLE_NOT_FOUND) {
                res.status(404).send(err.error_message);
                return;
              }

              if (err.error_type === ERROR_TYPE.DTABLE_LOAD_FAILED) {
                res.status(500).send(err.error_message);
                return;
              }
            }

            // read file
            fs.createReadStream(filePath).pipe(
              csv.parse(
                {
                  skip_empty_lines: true,
                },
                (err, records) => {
                  if (err) {
                    res.status(400).send({ error_msg: "File error" });
                    return;
                  }
                  if (records.length === 0) {
                    res.status(400).send({ error_msg: "File is empty." });
                    return;
                  }
                  let raw_cols = records[0].slice();
                  let raw_rows = records.slice(1, 10001); // recored 10,000 rows
                  try {
                    this.dtableServer.dtableManager.insertTableWithRawColumnsAndRows(
                      dtable,
                      dtable_uuid,
                      table_name,
                      raw_cols,
                      raw_rows,
                      lang,
                      username
                    );
                  } catch (err) {
                    logger.error("insert table error: ", err);
                    res.sendStatus(500);
                    return;
                  }
                  res.status(200).send({ success: true });
                  return;
                }
              )
            );
          });
        } catch (err) {
          logger.error(err);
          res.status(400).send({ error_msg: "Internal Server Error." });
        } finally {
          // delete all uploaded file
          for (let file_field in req.files) {
            if (req.files[file_field] instanceof Array) {
              for (let file of req.files[file_field]) {
                logger.info("get file: ", file);
                if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
              }
            } else {
              logger.info("get file: ", req.files[file_field]);
              if (fs.existsSync(req.files[file_field].path))
                fs.unlinkSync(req.files[file_field].path);
            }
          }
        }
      }
    );

    // internal APIs
    app.get("/api/v1/internal/:dtable_uuid/connected-apps/", (req, res) => {
      let payload = decodeAdminAuthorization(req.headers.authorization);
      if (!payload) {
        res
          .status(403)
          .send({ error_msg: "You don't have permission to access." });
        return;
      }
      let { dtable_uuid } = req.params;
      let dtableManager = appContext.getDTableManager();
      dtableManager.getDtable(dtable_uuid, (error, dtable) => {
        if (error) {
          logger.error(error);
          res.status(500).send({ error_msg: "Internal Server Error." });
          return;
        }
        let webSocketManager = appContext.getWebSocketManager();
        let connectedApps =
          webSocketManager.getDTableConnectedApps(dtable_uuid);
        res.send({ connected_apps: connectedApps });
      });
    });

    // internal admin APIs
    app.get("/api/v1/admin/sys-info/", (req, res) => {
      let payload = decodeAdminAuthorization(req.headers.authorization);
      if (!payload) {
        res
          .status(403)
          .send({ error_msg: "You don't have permission to access." });
        return;
      }
      let sysManager = appContext.getSysManager();
      sysManager.getSysInfos((infos) => {
        res.send(infos);
      });
    });
  }
}

export default HttpService;
