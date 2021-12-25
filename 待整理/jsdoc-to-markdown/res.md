<a name="DtableStore"></a>

## DtableStore
dtable-store 类存储一位客人的名字，并打招呼。

**Kind**: global class  

- [DtableStore](#dtablestore)
  - [dtableStore.setCustomPermissions(customPermissions)](#dtablestoresetcustompermissionscustompermissions)
  - [dtableStore.deserializeDTable(value) ⇒](#dtablestoredeserializedtablevalue-)
  - [dtableStore.moveRows(target_ids, move_position, moved_rows, upper_row_ids)](#dtablestoremoverowstarget_ids-move_position-moved_rows-upper_row_ids)
  - [dtableStore.moveGroupRows(target_ids, move_position, moved_rows, upper_row_ids, updated, old_rows)](#dtablestoremovegrouprowstarget_ids-move_position-moved_rows-upper_row_ids-updated-old_rows)
  - [dtableStore.modifyColumnType(new_column, old_column)](#dtablestoremodifycolumntypenew_column-old_column)

<a name="DtableStore+setCustomPermissions"></a>

### dtableStore.setCustomPermissions(customPermissions)
set customPermission

**Kind**: instance method of [<code>DtableStore</code>](#DtableStore)  

| Param | Type |
| --- | --- |
| customPermissions | <code>object</code> | 

<a name="DtableStore+deserializeDTable"></a>

### dtableStore.deserializeDTable(value) ⇒
序列化 dtable

**Kind**: instance method of [<code>DtableStore</code>](#DtableStore)  
**Returns**: object  

| Param | Type |
| --- | --- |
| value | <code>object</code> | 

<a name="DtableStore+moveRows"></a>

### dtableStore.moveRows(target_ids, move_position, moved_rows, upper_row_ids)
**Kind**: instance method of [<code>DtableStore</code>](#DtableStore)  

| Param | Type | Description |
| --- | --- | --- |
| target_ids | <code>array</code> | id of target rows |
| move_position | <code>string</code> | move to the top(move_above)/bottom(move_below) of the target row |
| moved_rows | <code>array</code> | dragged rows |
| upper_row_ids | <code>array</code> | rows which above dragged row, used to undo operation of move rows |

<a name="DtableStore+moveGroupRows"></a>

### dtableStore.moveGroupRows(target_ids, move_position, moved_rows, upper_row_ids, updated, old_rows)
**Kind**: instance method of [<code>DtableStore</code>](#DtableStore)  

| Param | Type | Description |
| --- | --- | --- |
| target_ids | <code>array</code> | id of target rows |
| move_position | <code>string</code> | move to the top(move_above)/bottom(move_below) of the target row |
| moved_rows | <code>array</code> | dragged rows |
| upper_row_ids | <code>array</code> | rows which above dragged row, used to undo operation of move rows |
| updated | <code>object</code> | used to update dragged rows |
| old_rows | <code>object</code> | used to undo update dragged rows |

<a name="DtableStore+modifyColumnType"></a>

### dtableStore.modifyColumnType(new_column, old_column)
**Kind**: instance method of [<code>DtableStore</code>](#DtableStore)  

| Param | Type | Description |
| --- | --- | --- |
| new_column | <code>object</code> | : used to updated or undo updated column |
| old_column | <code>object</code> | : used to undo updated or updated column |

