import io from 'socket.io';
import logger from '../logger';
import { decodeAccessToken } from '../utils/auth';
import Message from '../utils/message';
import { ERROR_TYPE, ERROR_MESSAGE, SUCCESS_TYPE } from '../utils/callback-message';

class WebSocketManager {

  constructor(dtableServer) {
    this.dtableServer = dtableServer;
    this.dtableManager = dtableServer.dtableManager;
    this.server = dtableServer.httpService.server;
    this.io = null;
    this.userManager = dtableServer.userManager;
    this.connectCount = 0;
    this.operationCountSinceUp = 0;
    this.appConnectionSocketMap = new Map();  // {socket.id   => payload}
    this.appConnectionDTableMap = new Map();  // {dtable_uuid => {app-1, app-2, app-3...a set of app-name}}
  }

  start() {
    this.io = io(this.server);
    this.io.on('connection', (socket) => { this.onConnected(socket) });
  }

  stop() {
    this.io.disconnect();
  }

  onConnected(socket) {
    // socket is a changed object, can not be assigned a class variable.
    // this.socket = socket;
    logger.debug("websocket connected ok.");
    this.connectCount++;

    socket.on('join-room', (dtable_uuid, accessToken, callback) => {

      let { payload, error_type } = decodeAccessToken(accessToken, dtable_uuid);
      if (!payload) {
        logger.error('join room failed' + ' : ' + ERROR_MESSAGE[error_type]);
        callback && callback(Message.fail(error_type));
        return;
      }
      this.recordAppConnection(payload, socket);
      let { username, app_name } = payload;
      if (!this.userManager.findUser(dtable_uuid, socket.id)) {

        let permission = payload.permission;
        this.userManager.addUser(dtable_uuid, socket.id, username, permission, app_name);
        
        logger.debug(username + ' join room ' + dtable_uuid);
        
        socket.join(dtable_uuid);

        this.dtableManager.getDtable(dtable_uuid, (err, dtable) => {
          if (err) {
            logger.error('Table data reload failed, error message:', err);
            callback && callback(Message.fail(ERROR_TYPE.INTERNAL_ERROR))
          }
          if (dtable) {
            let dtableValue = dtable.value;
            callback && callback(Message.success(SUCCESS_TYPE.JOINED_SUCCESSFULLY, dtableValue.version));
          } else {
            logger.debug('Loading data failed.');
            callback && callback(Message.fail(ERROR_TYPE.INTERNAL_ERROR))
          }
        });
      }

      // can send message to other users
      // this.socket.to(dtable_uuid).emit('join room', 'user' + username + '正在阅读当前表格', this.rooms[dtable_uuid]);
    });

    socket.on('update-dtable', (dtable_uuid, operation, callback) => {

      let user = this.userManager.findUser(dtable_uuid, socket.id);
      let permission = user.permission;
      if (permission !== 'rw') {
        logger.error('You don\'t have permission to update the current table.');
        callback && callback(Message.fail(ERROR_TYPE.PERMISSION_DENIED), false);
        return;
      }

      logger.debug('Received operation: ' + operation);
      try {
        let canOpApply = this.dtableManager.canOpApply(dtable_uuid, JSON.parse(operation));
        if (!canOpApply) {
          let error_type = ERROR_TYPE.OPERATION_INVALID;
          logger.error('Operation can not be execute :' + ERROR_MESSAGE[error_type]);
          callback && callback(Message.fail(error_type), false);
          return;
        }

        let { username, appName } = user;
        let nextVersion = this.dtableManager.execSocketOperation(dtable_uuid, JSON.parse(operation), username, appName);
        socket.to(dtable_uuid).emit('update-dtable', operation, nextVersion);
        callback && callback(Message.success(SUCCESS_TYPE.UPDATE_COMPLETED, nextVersion));
        this.operationCountSinceUp++;
      } catch(error) {
        logger.error(error);
        callback && callback(Message.fail(ERROR_TYPE.INTERNAL_ERROR), false);
      }
    });

    socket.on('leave-room', () => {

      let { dtable_uuid } = socket.handshake.query;

      let user = this.userManager.findUser(dtable_uuid, socket.id);
      let username = user ? user.username : null;
      logger.debug(username + ' is leaving room ' + dtable_uuid);
      
      this.userManager.deleteUser(dtable_uuid, socket.id);

    });

    socket.on('disconnect', () => {

      let { dtable_uuid } = socket.handshake.query;

      let user = this.userManager.findUser(dtable_uuid, socket.id);
      let username = user ? user.username : null;
      logger.debug(username + " disconnect.");

      this.userManager.deleteUser(dtable_uuid, socket.id);
      this.connectCount--;

      // update app-socket-map and app-dtable-map
      if (this.appConnectionSocketMap.has(socket.id)) {
        if (this.appConnectionDTableMap.has(dtable_uuid)) {
          this.appConnectionDTableMap.get(dtable_uuid).delete(this.appConnectionSocketMap.get(socket.id).app_name);
          if (this.appConnectionDTableMap.get(dtable_uuid).size === 0) {
            this.appConnectionDTableMap.delete(dtable_uuid);
          }
        }
        this.appConnectionSocketMap.delete(socket.id);
      }
    });

  }

  getWebSocketsCount() {
    return this.connectCount;
  }

  getOperationCountSinceUp() {
    return this.operationCountSinceUp;
  }

  recordAppConnection(payload, socket) {
    if (!payload.app_name) {
      return;
    }
    logger.debug('record app_name: ', payload.app_name, ' socket id: ', socket.id);
    this.appConnectionSocketMap.set(socket.id, payload);
    if (this.appConnectionDTableMap.get(payload.dtable_uuid)) {
      this.appConnectionDTableMap.get(payload.dtable_uuid).add(payload.app_name);
    } else {
      this.appConnectionDTableMap.set(payload.dtable_uuid, new Set([payload.app_name]));
    }
  }

  getAppConnectionCount() {
    return this.appConnectionSocketMap.size;
  }

  getDTableConnectedApps(dtable_uuid) {
    if (this.appConnectionDTableMap.has(dtable_uuid)) {
      return Array.from(this.appConnectionDTableMap.get(dtable_uuid));
    }
    return [];
  }

}

export default WebSocketManager; 