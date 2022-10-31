import DBHelper from "../db-helper";

class CommentManager {

  getRowCommentCount(dtable_uuid, row_id, callback) {
    let sql = `SELECT count(1) AS count FROM dtable_row_comments WHERE dtable_uuid=? AND row_id=?;`;
    DBHelper(sql, (err, results) => {
      callback && callback(err, results);
    }, [dtable_uuid, row_id]);
  }

  listRowComments(dtable_uuid, row_id, limit, offset, callback) {
    let sql = `SELECT id, author, comment, dtable_uuid, row_id, created_at, updated_at, resolved FROM dtable_row_comments 
                WHERE dtable_uuid=? AND row_id=? 
                ORDER BY created_at ASC LIMIT ? OFFSET ?;`;
    DBHelper(sql, (err, results) => {
      callback && callback(err, results);
    }, [dtable_uuid, row_id, limit, offset]);
  }

  getRowComment(comment_id, callback) {
    let sql = `SELECT id, author, comment, dtable_uuid, row_id, created_at, updated_at, resolved
                FROM dtable_row_comments WHERE id=?;`;
    DBHelper(sql, (err, results) => {
      let comment = results.length === 0 ? null : results[0];
      callback && callback(err, comment);
    }, [comment_id]);
  }

  addRowComment(username, dtable_uuid, row_id, comment, callback) {
    let sql = `INSERT INTO dtable_row_comments(author, comment, created_at, updated_at, dtable_uuid, row_id)
                VALUES (?, ?, ?, ?, ?, ?);`;
    DBHelper(sql, (err, results) => {
      callback && callback(err, results);
    }, [username, comment, new Date(), new Date(), dtable_uuid, row_id]);
  }

  updateRowComment(username, comment_id, options, callback) {
    let { comment, resolved } = options;
    let update_sqls = [`updated_at=?`];
    let params = [new Date()];
    if (comment) {
      update_sqls.push(`comment=?`);
      params.push(comment);
    }
    if (resolved) {
      update_sqls.push(`resolved=?`);
      params.push(resolved);
    }
    let final_update_sql = update_sqls.join(', ');
    let sql = `UPDATE dtable_row_comments SET ${final_update_sql} WHERE id=?`;
    params.push(comment_id);
    DBHelper(sql, (err) => {
      callback && callback(err);
    }, params);
  }

  deleteRowComment(comment_id, callback) {
    let sql = `DELETE FROM dtable_row_comments WHERE id=?`;
    DBHelper(sql, (err) => {
      callback && callback(err);
    }, [comment_id]);
  }
}

export default CommentManager;
