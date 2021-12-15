class UserManager {

  constructor() {
    this.users = [];
  }

  addUser(dtableUuid, socketId, username, permission, appName) {
    if (!this.users[dtableUuid]) {
      this.users[dtableUuid] = new Map();
    }

    this.users[dtableUuid].set(socketId, {username: username, permission: permission, appName: appName});
    return true;
  }

  deleteUser(dtableUuid, socketId) {
    if (this.users[dtableUuid] &&this.users[dtableUuid].has(socketId)) {
      this.users[dtableUuid].delete(socketId);
      if (this.users[dtableUuid].size === 0) {
        this.users[dtableUuid] = null;
        delete this.users[dtableUuid];
      }
      return true;
    }
    return false;
  }

  findUser(dtableUuid, socketId) {
    if (this.users[dtableUuid] && this.users[dtableUuid].has(socketId)) {
      let username = this.users[dtableUuid].get(socketId);
      return username;
    }
    return null;
  }

  getSocketIdList(dtableUuid, username) {
    let socketIdList = [];
    if (this.users[dtableUuid]) {
      this.users[dtableUuid].forEach((user, socketId) => {
        if (user.username === username) {
          socketIdList.push(socketId);
        }
      });
      return socketIdList;
    }
    return socketIdList;
  }

}

export default UserManager;