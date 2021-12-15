const generatorDefaultData = () =>  {
  
  return {
    format_version: 4,
    tables: [
      {
        _id: '0000',
        name: 'Table1',
        columns:  [
          {
            key: '0000',
            name: 'Name',
            type: 'text',
            width: 200,
            editable: true,
            resizable: true
          }
        ],
        rows:  [],
        views: [
          {
            _id: '0000',
            name: 'Default View',
            type: 'table',
            is_locked: false,
            rows: [],
            formula_rows: [],
            summaries: [],
            filter_conjunction: 'And',
            filters: [],
            sorts: [],
            hidden_columns: [],
            groupbys: [],
            groups: [],
          }
        ],
        id_row_map: [],
      }
    ]
  }

};

export { generatorDefaultData };