const request = require('supertest');
import DTableServer from '../../src/dtable-server';
import { testHelperAPI, TEST_USER_EMAIL, TEST_USER_PASSWORD, TEST_READ_ONLY_USER_EMAIL, TEST_READ_ONLY_USER_PASSWORD } from './utils';

const dtableServer = new DTableServer();
dtableServer.start();
const app = dtableServer.httpService.app;


test('TEST PING', () => {
  return request(app).get('/ping/').then((response) => {
    expect(response.statusCode).toBe(200);
  });
});

test('TEST DTABLE-WEB PING', () => {
  return testHelperAPI.ping().then(res => {
    expect(res.statusText).toBe('OK');
  });
});

describe('TEST API USED WITHIN A DTABLE', () => {
  const TEST_DTABLE_NAME = 'seafiletest';
  let authToken;
  let workspaceId;
  let dtableUUID;
  let dtableAccessToken;

  let readAuthToken;
  let readDTableAccessToken;

  beforeAll(() => {
    return testHelperAPI.getDtableWebAuthToken(TEST_USER_EMAIL, TEST_USER_PASSWORD)
    .then((res) => {
      console.log(res.data);
      expect(res.statusText).toBe('OK');
      authToken = res.data.token;
      return testHelperAPI.createDTable(TEST_DTABLE_NAME, TEST_USER_EMAIL, authToken);
    }).then((res) => {
      console.log(res.data);
      console.log('aaaaa');
      workspaceId = res.data.table.workspace_id;
      return testHelperAPI.getAccessToken(workspaceId, TEST_DTABLE_NAME, authToken);
    }).then((res) => {
      expect(res.statusText).toBe('OK');
      dtableUUID = res.data.dtable_uuid;
      dtableAccessToken = res.data.access_token;
      // a user for test read-only things
      return testHelperAPI.getDtableWebAuthToken(TEST_READ_ONLY_USER_EMAIL, TEST_READ_ONLY_USER_PASSWORD);
    }).then((res) => {
      console.log(res.data);
      expect(res.statusText).toBe('OK');
      readAuthToken = res.data.token;
      // share dtable to read-only user with read-only permission
      return testHelperAPI.shareDTable(workspaceId, TEST_DTABLE_NAME, TEST_READ_ONLY_USER_EMAIL, 'r', authToken);
    }).then((res) => {
      console.log('share dtable data: ', res.data);
      // read-only user access token
      return testHelperAPI.getAccessToken(workspaceId, TEST_DTABLE_NAME, readAuthToken);
    }).then((res) => {
      console.log(res.data);
      readDTableAccessToken = res.data.access_token;
      expect(res.statusText).toBe('OK');
    }).catch(err => {
      console.log(err);  // checkout err is a what
      expect(err.status).toBe(200);
    });
  });

  afterAll(() => {
    return testHelperAPI.deleteDTable(workspaceId, TEST_DTABLE_NAME, authToken).then(res => {
    });
  });

  test('test get dtable', () => {
    return request(app).get('/dtables/' + dtableUUID + '/')
    .set('Authorization', 'Token ' + dtableAccessToken)
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.text).tables[0].name).toBe('Table1');
    }).catch(err => {
      console.log(err);
      expect(true).toBe(false);
    });
  })

  test('test create row', () => {
    let body = {
      row: {
        Name: 'I am a new row'
      },
      table_name: 'Table1'
    };
    console.log("dtableUUID: ", dtableUUID);
    // normal create row
    return request(app).post('/api/v1/dtables/' + dtableUUID + '/rows/')
    .type('application/json')
    .send(JSON.stringify(body))
    .set('Authorization', 'Token ' + dtableAccessToken)
    .then((res) => {
      console.log('normal create row res: ', res.text);
      expect(res.statusCode).toBe(200);
      // read-only create row
      return request(app).post('/api/v1/dtables/' + dtableUUID + '/rows/').send(body).set('Authorization', 'Token ' + readDTableAccessToken);
    }).then((res) => {
      console.log('read-only create row res: ', res.text);
      expect(res.statusCode).toBe(403);
    }).catch(err => {
      console.log(err);
      expect(true).toBe(false);
    });
  })

  test('test update row', () => {
    // append a new row
    let body = {
      row: {
        Name: 'I am a new row'
      },
      table_name: 'Table1'
    };
    let row_id;
    return request(app).post('/api/v1/dtables/' + dtableUUID + '/rows/')
    .send(body)
    .set('Authorization', 'Token ' + dtableAccessToken)
    .then((res) => {
      expect(res.statusCode).toBe(200);
      return request(app).get('/dtables/' + dtableUUID + '/').set('Authorization', 'Token ' + dtableAccessToken);
    }).then((res) => {
      expect(res.statusCode).toBe(200);
      row_id = JSON.parse(res.text).tables[0].rows[0]._id;
      expect(!row_id).toBe(false);
      let putBody = Object.assign({}, body, { row_id: row_id, Name: 'I am updated' });
      // normal update
      return request(app).put('/api/v1/dtables/' + dtableUUID + '/rows/').send(putBody).set('Authorization', 'Token ' + dtableAccessToken);
    }).then((res) => {
      console.log('normal update row res: ', res.text);
      expect(res.statusCode).toBe(200);
      let putBody = Object.assign({}, body, { row_id: row_id, Name: 'I am updated by read-only' });
      // read-only update
      return request(app).put('/api/v1/dtables/' + dtableUUID + '/rows/').send(putBody).set('Authorization', 'Token ' + readDTableAccessToken);
    }).then((res) => {
      console.log('read-only update row res: ', res.text);
      expect(res.statusCode).toBe(403);
    }).catch(err => {
      console.log(err);
      expect(true).toBe(false);
    });
  })

  test('test delete row', () => {
    let body = {
      row: {
        Name: 'I am a new row'
      },
      table_name: 'Table1'
    };
    let row_id;
    return request(app).post('/api/v1/dtables/' + dtableUUID + '/rows/')
    .send(body)
    .set('Authorization', 'Token ' + dtableAccessToken)
    .then((res) => {
      expect(res.statusCode).toBe(200);
      return request(app).get('/dtables/' + dtableUUID + '/').set('Authorization', 'Token ' + dtableAccessToken);
    }).then((res) => {
      expect(res.statusCode).toBe(200);
      row_id = JSON.parse(res.text).tables[0].rows[0]._id;
      expect(!row_id).toBe(false);
      let deleteBody = { table_name: 'Table1', row_id: row_id };
      // read-only delete row
      return request(app).delete('/api/v1/dtables/' + dtableUUID + '/rows/').send(deleteBody).set('Authorization', 'Token ' + readDTableAccessToken);
    }).then((res) => {
      console.log('read-only delete row res: ', res.text);
      expect(res.statusCode).toBe(403);
      let deleteBody = { table_name: 'Table1', row_id: row_id };
      // normal delete row
      return request(app).delete('/api/v1/dtables/' + dtableUUID + '/rows/').send(deleteBody).set('Authorization', 'Token ' + dtableAccessToken);
    }).then((res) => {
      console.log('normal delete row res: ', res.text);
      expect(res.statusCode).toBe(200);
    }).catch((err) => {
      console.log(err);
      expect(true).toBe(false);
    });
  })

});
