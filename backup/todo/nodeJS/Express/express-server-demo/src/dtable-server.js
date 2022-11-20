import EventManager from './manager/event-manager';
import DTableManager from './manager/dtable-manager';
import WebSocketManager from './manager/websocket-manager';
import HttpService from './http-service';
import UserManager from './manager/user-manager';
import SnapshotManager from './manager/snapshot-manager';
import NotificationManager from './manager/notification-manager';
import logger from './logger';
import CommentManager from "./manager/comment-manager";
import SysManager from "./manager/sys-manager";

class DTableServer {

  constructor() {
    this.eventManager = new EventManager();
    this.userManager = new UserManager();
    this.commentManager = new CommentManager();
    this.snapshotManager = new SnapshotManager();
    this.notificationManager = new NotificationManager();
    this.dtableManager = new DTableManager(this);
    this.httpService = new HttpService(this);
    this.webSocketManager = new WebSocketManager(this);
    this.sysManager = new SysManager(this);
  }

  start(port) {
    this.httpService.server.listen(port, () => 
      logger.info('listening on port ' + port)
    );
    this.dtableManager.start();  // start save timer
    this.webSocketManager.start(); // start socket listener
    this.eventManager.start();  // start events publisher
  }

  getDTableManager() {
    return this.dtableManager;
  }

  getWebSocketManager() {
    return this.webSocketManager;
  }

  getUserManager() {
    return this.userManager;
  }

  getCommentManager() {
    return this.commentManager;
  }

  getNotificationManager() {
    return this.notificationManager;
  }

  getSysManager() {
    return this.sysManager;
  }

}

export default DTableServer;