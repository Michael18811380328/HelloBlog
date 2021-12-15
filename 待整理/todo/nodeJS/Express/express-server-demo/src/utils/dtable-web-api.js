import { DTABLE_WEB_SERVICE_URL } from '../config/config';
import axios from 'axios';
import { genJWT } from './utils';

class DTableWebAPI {

  constructor() {
    this.req = axios.create();
    this.dtableWebServiceURL = DTABLE_WEB_SERVICE_URL;
  }

  getDownloadTableURL(dtable_uuid) {
    const url = this.dtableWebServiceURL + 'api/v2.1/dtable-internal/get-file-download-link/';
    let params = {dtable_uuid: dtable_uuid};
    const token = genJWT(dtable_uuid);
    return this.req.get(url, { headers: { 'Authorization': 'Token ' + token }, params: params});
  }

  getUpdateTableURL(dtable_uuid) {
    const url = this.dtableWebServiceURL + 'api/v2.1/dtable-internal/get-file-update-link/';
    let params = {dtable_uuid: dtable_uuid};
    const token = genJWT(dtable_uuid);
    return this.req.get(url, { headers: { 'Authorization': 'Token ' + token }, params: params});
  }

  getTableLatestCommitId(dtable_uuid) {
    const url = this.dtableWebServiceURL + 'api/v2.1/dtable-internal/get-latest-commit-id/';
    let params = {dtable_uuid: dtable_uuid};
    const token = genJWT(dtable_uuid);
    return this.req.get(url, { headers: { 'Authorization': 'Token ' + token }, params: params});
  }

  getTableRelatedUsers(dtable_uuid) {
    const url = this.dtableWebServiceURL + 'api/v2.1/dtable-internal/get-related-users/';
    let params = { dtable_uuid };
    const token = genJWT(dtable_uuid);
    return this.req.get(url, { headers:{ 'Authorization': 'Token ' + token }, params: params});
  }

}

const dTableWebAPI = new DTableWebAPI();

export default dTableWebAPI;
