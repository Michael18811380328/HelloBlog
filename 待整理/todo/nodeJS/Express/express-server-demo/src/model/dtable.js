import { convertDTableToVersion1, normalizeDTableVersion1, convertDTableToVersion2, convertDTableToVersion3, convertDTableToVersion4 } from './convert-dtable';

class DTable {

  constructor(dtableString) {
    this.uuid = '';
    this.meta = {
      last_access: '',
      need_save: false,
      last_save_time: '',
    };
    this.value = this.deseralizeDTable(dtableString);
  }

  setValue(value) {
    let last_access = new Date().getTime();
    this.value = value;
    let need_save = true;
    this.setMeta({last_access, need_save})
  }

  setMeta(meta) {
    meta = Object.assign({}, this.meta, meta);
    this.meta = meta;
  }

  getMeta() {
    return this.meta;
  }

  optimizeStorage() {
    let value = {};
    value.version = this.value.version;
    value.format_version = this.value.format_version;
    value.statistics = this.value.statistics;
    value.links = this.value.links;
    value.description = this.value.description;
    value.plugin_settings = this.value.plugin_settings;
    value.settings = this.value.settings;
    value.tables = this.value.tables.map(table => {
      let newTable = {
        _id: table._id,
        name: table.name,
        rows: table.rows,
        columns: table.columns,
        views: table.views,
        id_row_map: {}
      };
      return newTable;
    });
    return value;
  }

  serializeTablesData() {
    let value = this.optimizeStorage();
    return JSON.stringify(value);
  }

  normalizeDTable(dtable) {

    if (!dtable['format_version']) {
      dtable['format_version'] = 0;
    }

    if (!dtable['tables']) {
      throw new Error('The tables data must be exist.');
    }

    if (dtable['format_version'] === 0) {
      convertDTableToVersion1(dtable);
      this.meta.need_save = true;
    }

    if (dtable['format_version'] === 1) {
      convertDTableToVersion2(dtable);
      this.meta.need_save = true;
    }

    if (dtable['format_version'] === 2) {
      convertDTableToVersion3(dtable);
    }

    if (dtable['format_version'] === 3) {
      convertDTableToVersion4(dtable);
    }

    normalizeDTableVersion1(dtable);

    return dtable;
  }

  deseralizeDTable(dtableString) {
    let dtable = JSON.parse(dtableString);
    this.value = this.normalizeDTable(dtable);
    return this.value;
  }

}

export default DTable;
