import { generatorTableId, generatorViewId } from 'dtable-store';

function setIdRowMap(table) {
  let idRowMap = {};
  table.rows.map((r) => {
    if (!idRowMap[r._id]) {
      idRowMap[r._id] = r;
    }
  });

  return idRowMap;
}

function normalizeTable(table, tables) {

  table['id_row_map'] = setIdRowMap(table);

  if (!Array.isArray(table.columns)) {
    table.columns = [];
  } else {
    table.columns = table.columns.filter(column => {
      return column;
    });
  }

  if (!Array.isArray(table.rows)) {
    table.rows = [];
  } else {
    table.rows = table.rows.filter(row => {
      return row;
    });
  }

  if (!Array.isArray(table.views)) {
    table.views = []; // need optimized
  } else {
    table.views = table.views.map(view => {
      view.rows = [];
      view.formula_rows = {};
      view.groups = [];
      view.filter_conjunction = view.filter_conjunction ? view.filter_conjunction : 'And';

      if (!Array.isArray(view.hidden_columns)) {
        view.hidden_columns = [];
      } else {
        view.hidden_columns = view.hidden_columns.filter(column_key => {
          return table.columns.find(column => column.key === column_key);
        });
      }
      
      if (!Array.isArray(view.sorts)) {
        view.sorts = [];
      } else {
        view.sorts = view.sorts.filter(sort => {
          if (sort && sort.column_key) {
            return table.columns.find(column => column.key === sort.column_key);
          }
          return false;
        });
      }
      
      if (!Array.isArray(view.filters)) {
        view.filters = [];
      } else {
        view.filters = view.filters.filter(filter => {
          if (filter && filter.column_key) {
            return table.columns.find(column => column.key === filter.column_key);
          }
          return false;
        });
      }
      
      if (!Array.isArray(view.groupbys)) {
        view.groupbys = [];
      } else {
        view.groupbys = view.groupbys.filter(groupby => {
          if (groupby && groupby.column_key) {
            return table.columns.find(column => column.key === groupby.column_key);
          }
          return false;
        });
      }

      return view;
    });
  }
}

export const normalizeDTableVersion1 = (dtable) => {

  if (!dtable['version']) {
    dtable['version'] = 1;
  }

  if (!dtable['statistics']) {
    dtable['statistics'] = [];
  }  
  
  if (dtable['statistics'].length !== 0) {
    dtable['statistics'] = dtable['statistics'].filter(stat => {
      return !!stat;
    });
  }

  if (!dtable['links']) {
    dtable['links'] = [];
  }

  let tables = dtable.tables;
  tables.forEach(table => {
    normalizeTable(table, tables);
  });
};

export const convertDTableToVersion1 = (dtable) => {
  // update format_version
  dtable.format_version = 1;

  // delete forms
  if (dtable['forms']) {
    delete dtable.forms;
  }

  // delete storage_version
  if (dtable.storage_version) {
    delete dtable.storage_version;
  }

  // optimized sort data struct
  dtable.tables.forEach(table => {

    if (table.Id2Row) {
      delete table.Id2Row;
    }

    table.views = table.views.map(view => {
      if (!Array.isArray(view.sorts)) {
        view.sorts = [];
      } else {
        view.sorts = view.sorts.map(sort => {
          if (sort && sort.columnKey) {
            return {
              column_key: sort.columnKey,
              sort_type: sort.sortType
            };
          }
          return sort;
        });
      }

      return view;
    });
  });
};

export const convertDTableToVersion2 = (dtable) => {
  // update format_version
  dtable.format_version = 2;

  dtable.tables.forEach(table => {
    // change _tid to id
    table._id = table._tid ? table._tid : generatorTableId(dtable.tables);
    delete table._tid;

    // change title to name
    table.name = table.title;
    delete table.title;

    // change view _vid to _id
    table.views = table.views.map(view => {

      view._id = view._vid;
      delete view._vid;

      return view;
    });
    
    return table;
  });
};

export const convertDTableToVersion3 = (dtable) => {
  // update format_version
  dtable.format_version = 3;

  dtable.tables.forEach(table => {

    // update columns
    table.columns = table.columns.map(column => {
      if (column.type === 'single-select' || column.type === 'multiple-select') {
        if (column.data && column.data.options) {
          column.data.options = column.data.options.map(option => {
            return {
              id: option.ID,
              name: option.name,
              color: option.color
            };
          });
        }
      }
      return column;
    });
    
    return table;
  });
};

export const convertDTableToVersion4 = (dtable) => {
  // update format_version
  dtable.format_version = 4;

  dtable.tables.forEach(table => {
    // repair view id bug
    table.views = table.views.map(view => {
      view._id = view._id ? view._id : generatorViewId(table.views);
      return view;
    });

  });
}