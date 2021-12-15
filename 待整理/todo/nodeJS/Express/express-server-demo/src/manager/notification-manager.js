import DBHelper from '../db-helper';

export const MSG_TYPE_ROW_COMMENT = 'row_comment';


class NotificationManager {

  listNotifications(username, dtable_uuid, limit, count, callback) {
    let sql = `SELECT id, username, msg_type, created_at, detail, seen FROM dtable_notifications
              WHERE username=? AND dtable_uuid=? ORDER BY created_at DESC LIMIT ?, ?`;
    let values = [username, dtable_uuid, limit, count];
    DBHelper(sql, (err, results) => {
      callback && callback(err, results);
    }, values);
  }

  getNotification(username, notification_id, callback) {
    let sql = `SELECT id, username, msg_type, created_at, detail, seen FROM dtable_notifications
              WHERE id=? AND username=?`;
    let values = [notification_id, username];
    DBHelper(sql, (err, results) => {
      let notification = results.length === 0 ? null : results[0]
      callback && callback(err, notification);
    }, values);
  }

  addNotification(username, dtable_uuid, msg_type, detail, callback) {
    let sql = `INSERT INTO dtable_notifications(username, dtable_uuid, msg_type, created_at, detail)
              VALUES (?, ?, ?, ?, ?)`;
    let values = [username, dtable_uuid, msg_type, new Date(), detail];
    DBHelper(sql, (err, results) => {
      callback && callback(err, results);
    }, values);
  }

  updateNotifications(username, dtable_uuid, seen, callback) {
    let sql = `UPDATE dtable_notifications SET seen=? WHERE username=? AND dtable_uuid=?`;
    let values = [seen, username, dtable_uuid];
    DBHelper(sql, (err, results) => {
      callback && callback(err, results);
    }, values);
  }

  updateNotification(username, notification_id, seen, callback) {
    let sql = `UPDATE dtable_notifications SET seen=? WHERE id=? AND username=?`;
    let values = [seen, notification_id, username];
    DBHelper(sql, (err, results) => {
      callback && callback(err, results);
    }, values);
  }

  deleteNotifications(username, dtable_uuid, callback) {
    let sql = `DELETE FROM dtable_notifications WHERE username=? AND dtable_uuid=?`;
    let values = [username, dtable_uuid];
    DBHelper(sql, (err, results) => {
      callback && callback(err, results);
    }, values); 
  }

}

export default NotificationManager;
