# react-window

渲染列表中部分内容，避免大量列表DOM节点占用性能。这个适用于简单的表格内容，例如纯数字或者纯文本，有确定的单元格宽度，对于复杂的列类型可能不适合。

https://github.com/bvaughn/react-window

~~~js
import { FixedSizeList as List } from 'react-window';
 
const Row = ({ index, style }) => (
  <div style={style}>Row {index}</div>
);
 
const Example = () => (
  <List
    height={150}
    itemCount={1000}
    itemSize={35}
    width={300}
  >
    {Row}
  </List>
);


import { FixedSizeList as List } from 'react-window';
 
const Column = ({ index, style }) => (
  <div style={style}>Column {index}</div>
);
 
const Example = () => (
  <List
    height={75}
    itemCount={1000}
    itemSize={100}
    layout="horizontal"
    width={300}
  >
    {Column}
  </List>
);
~~~

渲染一个表格，避免渲染大量节点 dom 然后浏览器崩溃

~~~js
import { VariableSizeGrid as Grid } from 'react-window';
 
// These item sizes are arbitrary.
// Yours should be based on the content of the item.
const columnWidths = new Array(1000)
  .fill(true)
  .map(() => 75 + Math.round(Math.random() * 50));

const rowHeights = new Array(1000)
  .fill(true)
  .map(() => 25 + Math.round(Math.random() * 50));
 
const Cell = ({ columnIndex, rowIndex, style }) => (
  <div style={style}>
    Item {rowIndex},{columnIndex}
  </div>
);
 
const Example = () => (
  <Grid
    columnCount={1000}
    columnWidth={index => columnWidths[index]}
    height={150}
    rowCount={1000}
    rowHeight={index => rowHeights[index]}
    width={300}
  >
    {Cell}
  </Grid>
);
~~~
