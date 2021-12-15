import DtableUtils from "../utils/dtable-utils";

class SysManager {

    constructor(dtableServer) {
        this.dtableServer = dtableServer;
    }

    /**
     * get dtable server infos
     * @param operationsInterval: period interval
     * @param callback: callback method
     */
    getSysInfos(callback) {
      let infos = {};
      let webSocketManager = this.dtableServer.getWebSocketManager();
      infos['web_socket_count'] = webSocketManager.getWebSocketsCount();
      infos['app_connection_count'] = webSocketManager.getAppConnectionCount();
      infos['operation_count_since_up'] = webSocketManager.getOperationCountSinceUp();
      let dtableManager = this.dtableServer.getDTableManager();
      let lastDTableSavingInfo = dtableManager.getLastDTableSavingInfo();
      infos['last_dtable_saving_count'] = lastDTableSavingInfo.count;
      infos['last_dtable_saving_start_time'] = lastDTableSavingInfo.startTime;
      infos['last_dtable_saving_end_time'] = lastDTableSavingInfo.endTime;
      infos['loaded_dtables_count'] = dtableManager.getDTableLoadedCount();
      DtableUtils.queryOperationCount(60 * 60 * 1000, (count) => {
          infos['last_period_operations_count'] = count;
          callback && callback(infos);
      })
    }

}

export default SysManager;
