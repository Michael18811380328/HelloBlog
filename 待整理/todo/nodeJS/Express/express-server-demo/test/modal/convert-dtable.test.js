import fs from 'fs';
import path from 'path';
import { convertDTableToVersion1, normalizeDTableVersion1, convertDTableToVersion2, convertDTableToVersion3, convertDTableToVersion4 } from '../../src/model/convert-dtable';

let filePath1 = path.resolve(__dirname, '../test-data.v1.json');
let dtableData1 = JSON.parse(fs.readFileSync(filePath1).toString());

let filePath2 = path.resolve(__dirname, '../test-data.v2.json');
let dtableData2 = JSON.parse(fs.readFileSync(filePath2).toString());

let filePath3 = path.resolve(__dirname, '../test-data.v3.json');
let dtableData3 = JSON.parse(fs.readFileSync(filePath3).toString());

let filePath4 = path.resolve(__dirname, '../test-data.v4.json');
let dtableData4 = JSON.parse(fs.readFileSync(filePath4).toString());

test('convert dtable data to version 4', () => {
  convertDTableToVersion4(dtableData4);

  dtableData4.tables.forEach(table => {

    table.views.forEach(view => {
      expect(view).toEqual(expect.objectContaining({_id: expect.any(String)}));
    });
  });
});

test('convert dtable data to version 3', () => {
  convertDTableToVersion3(dtableData3);

  dtableData3.tables.forEach(table => {

    table.columns.forEach(column => {
      if (column.data && column.data.options) {
        column.data.options.forEach(option => {
          expect(option).toEqual(expect.not.objectContaining({ID: undefined}));
          expect(option).toEqual(expect.objectContaining({id: expect.any(String)}));
        });
      }
    });
  });
});

test('convert dtable data to version 2', () => {
  convertDTableToVersion2(dtableData2);

  dtableData2.tables.forEach(table => {
    expect(table._tid).toEqual(undefined);
    expect(table).toEqual(expect.objectContaining({_id: expect.any(String)}));

    expect(table.title).toEqual(undefined);
    expect(table).toEqual(expect.objectContaining({name: expect.any(String)}));

    
    table.views.forEach(view => {
      expect(view._vid).toEqual(undefined);
      expect(view).toEqual(expect.objectContaining({_id: expect.any(String)}));
    });
  });
});

test('convert dtable data to version 1', () => {
  convertDTableToVersion1(dtableData1);

  // format_version
  expect(dtableData1).toEqual(expect.objectContaining({format_version: expect.any(Number)}));

  // id_row_map
  expect(dtableData1).toEqual(expect.not.objectContaining({forms: expect.any(Object)}));

  // storage_version
  expect(dtableData1).toEqual(expect.not.objectContaining({storage_version: expect.any(Number)}));
  
  // Tables
  
  dtableData1.tables.forEach(table => {
    expect(table).toEqual(expect.not.objectContaining({Id2Row: expect.any(Object)}));
    
    table.views.forEach(view => {
      view.sorts.forEach(sort => {
        expect(sort).toEqual(expect.objectContaining({
          column_key: expect.any(String),
          sort_type: expect.any(String),
        }));
      })
    })
  })
});

test('normalize dtable', () => {
  if (dtableData1.format_version === 0) {
    convertDTableToVersion1(dtableData1);
  }

  addVaildCondition(dtableData1);
  
  normalizeDTableVersion1(dtableData1);
  
  dtableData1.tables.forEach(table => {
    
    // _tid
    expect(table).toEqual(expect.objectContaining({_tid: expect.any(String)}));
    
    // title
    expect(table).toEqual(expect.objectContaining({title: expect.any(String)}));
    
    // id_row_map
    expect(table).toEqual(expect.objectContaining({id_row_map: expect.any(Object)}));
    
    // columns
    expect(table).toEqual(expect.objectContaining({columns: expect.any(Object)}));
    
    // rows
    expect(table).toEqual(expect.objectContaining({rows: expect.any(Object)}));
    
    // views
    table.views.forEach(view => {
      // _vid
      expect(view).toEqual(expect.objectContaining({_vid: expect.any(String)}));

      // type
      expect(view).toEqual(expect.objectContaining({type: expect.any(String)}));

      // name
      expect(view).toEqual(expect.objectContaining({name: expect.any(String)}));

      // is_locked
      expect(view).toEqual(expect.objectContaining({is_locked: expect.any(Boolean)}));

      // rows
      expect(view).toEqual(expect.objectContaining({rows: expect.any(Array)}));

      // formula_rows
      expect(view).toEqual(expect.objectContaining({formula_rows: expect.any(Object)}));

      // summaries
      expect(view).toEqual(expect.objectContaining({summaries: expect.any(Array)}));

      // filter_conjunction
      expect(view).toEqual(expect.objectContaining({filter_conjunction: expect.any(String)}));

      // hidden_columns
      expect(view).toEqual(expect.objectContaining({hidden_columns: expect.any(Array)}));
      let hasHiddenColumns = view.hidden_columns.length > 0 ? true : false;
      expect(hasHiddenColumns).toBe(view.hasHiddenColumns);

      // filters
      expect(view).toEqual(expect.objectContaining({filters: expect.any(Array)}));
      let hasFilter = view.filters.length > 0 ? true : false;
      expect(hasFilter).toBe(view.hasFilter);
      view.filters.forEach(filter => {
        expect(filter).toEqual(expect.objectContaining({
          column_key: expect.any(String),
          filter_predicate: expect.any(String),
          filter_term: expect.any(String),
          filter_term_modifier: expect.any(String),
        }));
      });
      
      // sorts
      expect(view).toEqual(expect.objectContaining({sorts: expect.any(Array)}));
      let hasSort = view.sorts.length > 0 ? true : false;
      expect(hasSort).toBe(view.hasSort);
      view.sorts.forEach(sort => {
        expect(sort).toEqual(expect.objectContaining({
          column_key: expect.any(String),
          sort_type: expect.any(String),
        }));
      });

      // groupbys
      expect(view).toEqual(expect.objectContaining({groupbys: expect.any(Array)}));
      let hasGroupbys = view.groupbys.length > 0 ? true : false;
      expect(hasGroupbys).toBe(view.hasGroupbys);
      view.groupbys.forEach(groupbys => {
        expect(groupbys).toEqual(expect.objectContaining({
          column_key: expect.any(String),
          sort_type: expect.any(String),
        }));
      });

      // groups
      expect(view).toEqual(expect.objectContaining({groups: expect.any(Array)}));
    })
  })
})


function addVaildCondition(dtableData) {
  dtableData.tables.forEach(table => {
    table.views.forEach(view => {

      // hidden_columns
      view.hasHiddenColumns = false;
      if (view.hidden_columns && Array.isArray(view.hidden_columns) && view.hidden_columns.length > 0) {
        view.hasHiddenColumns = true;
      }

      // filters
      view.hasFilter = false;
      if (view.filters && Array.isArray(view.filters) && view.filters.length > 0) {
        view.hasFilter = true;
      }

      // sorts
      view.hasSort = false;
      if (view.sorts && Array.isArray(view.sorts) && view.sorts.length > 0) {
        view.hasSort = true;
      }

      // groupbys
      view.hasGroupbys = false;
      if (view.groupbys && Array.isArray(view.groupbys) && view.groupbys.length > 0) {
        view.hasGroupbys = true;
      }
    });
  });
}