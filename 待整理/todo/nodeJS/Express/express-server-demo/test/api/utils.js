import axios from 'axios';
import { stringify } from 'querystring';

const DTABLE_WEB_SERVICE_URL = 'http://127.0.0.1:8000';
const DTABLE_SERVER_URL = 'http://127.0.0.1:5000';
const TEST_USER_EMAIL = 'test@seafiletest.com';
const TEST_USER_PASSWORD = 'testtest';
const TEST_READ_ONLY_USER_EMAIL = 'for-read-only@seafiletest.com';
const TEST_READ_ONLY_USER_PASSWORD = 'testtest';
const TEST_ADMIN_EMAIL = 'admin@seafiletest.com';
const TEST_ADMIN_PASSWORD = 'adminadmin';

class TestHelperAPI {

  constructor() {
    axios.defaults.adapter = require('axios/lib/adapters/http');
    this.req = axios.create();
    this.dtableWebServiceURL = DTABLE_WEB_SERVICE_URL;
  }

  shareDTable (workspaceId, dtableName, email, permission, authToken) {
    const url = this.dtableWebServiceURL + '/api/v2.1/workspace/' + workspaceId + '/dtable/' + encodeURIComponent(dtableName) + '/share/';
    let form = {
      email: email,
      permission: permission
    };
    return this.req.post(url, form, {
      headers: {
        Authorization: 'Token ' + authToken
      }
    });
  }

  getDtableWebAuthToken (username, password) {
    const url = this.dtableWebServiceURL + '/api2/auth-token/';
    return this.req.post(url, {
      username: username,
      password: password
    });
  }

  createDTable (dtableName, owner, authToken) {
    const url = this.dtableWebServiceURL + '/api/v2.1/dtables/';
    // send formdata in node
    let form = stringify({
      name: dtableName,
      owner: owner
    })
    return this.req.post(url, form, {
      headers: {
        Authorization: 'Token ' + authToken
      }
    });
  }

  deleteDTable (workspaceId, dtableName, authToken) {
    const url = this.dtableWebServiceURL + '/api/v2.1/workspace/' + workspaceId + '/dtable/';
    return this.req.delete(url, {
      data: {name: dtableName},
      headers: {Authorization: 'Token ' + authToken}
    });
  }

  getAccessToken (workspaceId, dtableName, authToken) {
    const url = this.dtableWebServiceURL + '/api/v2.1/workspace/' + workspaceId + '/dtable/' + encodeURIComponent(dtableName) + '/access-token/';
    return this.req.get(url, {
      headers: {
        Authorization: 'Token ' + authToken
      }
    });
  }

  ping () {
    const url = this.dtableWebServiceURL + '/api2/ping/';
    return this.req.get(url);
  }
}

const testHelperAPI = new TestHelperAPI();

export {
  testHelperAPI,
  DTABLE_WEB_SERVICE_URL,
  DTABLE_SERVER_URL,
  TEST_USER_EMAIL,
  TEST_USER_PASSWORD,
  TEST_READ_ONLY_USER_EMAIL,
  TEST_READ_ONLY_USER_PASSWORD,
  TEST_ADMIN_EMAIL,
  TEST_ADMIN_PASSWORD,
}