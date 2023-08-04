import fs from 'fs';
import path from 'path';

import DTable from '../../src/model/dtable';

let filePath1 = path.resolve(__dirname, '../test-data.v1.json');
let dtableData1 = fs.readFileSync(filePath1).toString();
let dtable1 = null;

let filePath2 = path.resolve(__dirname, '../test-data.v2.json');
let dtableData2 = fs.readFileSync(filePath2).toString();
let dtable2 = null;



beforeAll(() => {
  dtable1 = new DTable(dtableData1);
  dtable2 = new DTable(dtableData2);
});

// valid data struct


test('optimize storage', () => {

  let dataInUse = dtable1.value;
  let savedData = dtable1.optimizeStorage();

  // version
  expect(savedData.version).toEqual(dataInUse.version);
  
  // format_version
  expect(savedData.format_version).toEqual(dataInUse.format_version);

  // statistics
  expect(savedData.statistics.length).toEqual(dataInUse.statistics.length);
  
  // tables
  expect(savedData.tables.length).toEqual(dataInUse.tables.length);
  
  savedData.tables.forEach((table, index) => {
    expect(table._tid).toEqual(dataInUse.tables[index]._tid);
    expect(table.title).toEqual(dataInUse.tables[index].title);
    expect(table.columns.length).toEqual(dataInUse.tables[index].columns.length);
    expect(table.rows.length).toEqual(dataInUse.tables[index].rows.length);
    expect(table.views.length).toEqual(dataInUse.tables[index].views.length);

    // can't contain id_row_map
    expect(table).toEqual(expect.not.objectContaining({id_row_map: expect.any(Object)}));
  });
});

test('optimize storage', () => {

  let dataInUse = dtable2.value;
  let savedData = dtable2.optimizeStorage();

  // version
  expect(savedData.version).toEqual(dataInUse.version);
  
  // format_version
  expect(savedData.format_version).toEqual(dataInUse.format_version);

  // statistics
  expect(savedData.statistics.length).toEqual(dataInUse.statistics.length);

  // statistics
  expect(savedData.links.length).toEqual(dataInUse.links.length);
  
  // tables
  expect(savedData.tables.length).toEqual(dataInUse.tables.length);
  
  savedData.tables.forEach((table, index) => {
    expect(table._id).toEqual(dataInUse.tables[index]._id);
    expect(table.name).toEqual(dataInUse.tables[index].name);
    expect(table.columns.length).toEqual(dataInUse.tables[index].columns.length);
    expect(table.rows.length).toEqual(dataInUse.tables[index].rows.length);
    expect(table.views.length).toEqual(dataInUse.tables[index].views.length);

    // can't contain id_row_map
    expect(table).toEqual(expect.not.objectContaining({id_row_map: expect.any(Object)}));
  });
});