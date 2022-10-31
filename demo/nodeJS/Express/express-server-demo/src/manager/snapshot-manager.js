import DBHelper from '../db-helper';
import logger from '../logger';
import dTableWebAPI from '../utils/dtable-web-api';


class SnapshotManager {

  constructor() {
    this.snapshots = {};
  }

  snapshotDTable(dtableUuid, dtableName) {
    this.getDTableLatestSnapshot(dtableUuid, (err, latestCtime, latestCommitId) => {
      if (err) {
        logger.error(`DTable ${dtableUuid} get latest snapshot failed`);
        
        return;
      } else if (Date.now() < latestCtime + 24 * 3600 * 1000) {
        logger.debug(`DTable ${dtableUuid} snapshot interval is less than one day`);
        return;
      } else {
        dTableWebAPI.getTableLatestCommitId(dtableUuid).then(res => {
          const commitId = res.data.latest_commit_id;
          if (latestCommitId === commitId) {
            logger.debug(`DTable ${dtableUuid} snapshot ${commitId} already exists`);
            return;
          } else {
            this.recordDTableSnapshot(dtableUuid, dtableName, commitId);
          }
        }).catch((error) => {
          logger.error(error);
        });
      }
    });
  }

  getDTableLatestSnapshot(dtableUuid, callback) {
    if (this.snapshots[dtableUuid]) {
      let latestCtime = this.snapshots[dtableUuid].get('ctime');
      let latestCommitId = this.snapshots[dtableUuid].get('commitId');
      callback && callback(null, latestCtime, latestCommitId);
    } else {
      this.queryDTableSnapshot(dtableUuid, (err, results) => {
        if (err) {
          logger.error('query dtable snapshot failed');
          callback && callback(err);
        }
        if (results.length) {
          let latestCommitId = results[0].commit_id;
          let latestCtime = results[0].ctime;
          this.snapshots[dtableUuid] = new Map();
          this.snapshots[dtableUuid].set('commitId', latestCommitId);
          this.snapshots[dtableUuid].set('ctime', latestCtime);
          callback && callback(null, latestCtime, latestCommitId);
        } else {
          this.snapshots[dtableUuid] = new Map();
          let latestCommitId = '';
          let latestCtime = 0;
          callback && callback(null, latestCtime, latestCommitId);
        }
      });
    }
  }

  queryDTableSnapshot(dtableUuid, callback) {
    let sql = 'SELECT commit_id, ctime FROM dtable_snapshot WHERE \
              dtable_uuid="'+ dtableUuid + '" ORDER BY ctime DESC LIMIT 1';

    DBHelper(sql, (err, results) => {
      if (err) {
        logger.error(err);
        callback && callback(err);
      }
      if (results) {
        results = JSON.stringify(results);
        results = JSON.parse(results);
        callback && callback(null, results);
      }
    });
  }

  recordDTableSnapshot(dtableUuid, dtableName, commitId) {
    let sql = 'INSERT INTO `dtable_snapshot` (dtable_uuid, dtable_name, commit_id, ctime) VALUES (?, ?, ?, ?)';
    let dateNow = Date.now();
    let values = [dtableUuid, dtableName, commitId, dateNow];

    DBHelper(sql, (err, results) => {
      if (err) {
        logger.error(err);
        throw new Error('Database error.');
      }
      if (results) {
        logger.info(`Record snapshot ${commitId} to database.`);
        this.snapshots[dtableUuid].set('commitId', commitId);
        this.snapshots[dtableUuid].set('ctime', dateNow);
      }
    }, values);
  }

}


export default SnapshotManager;
