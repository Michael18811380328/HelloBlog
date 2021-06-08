# gojs-react

这个组件用于在React中使用 GoJS 来绘制图表、色板、概述图。

### By Northwoods Software for [GoJS 2.1](https://gojs.net/)

This project provides React components for [GoJS](https://gojs.net/latest/index.html) Diagrams, Palettes, and Overviews to simplify usage of GoJS within a React application. See the [gojs-react-basic project](https://github.com/NorthwoodsSoftware/gojs-react-basic) for example usage and the [Intro page on using GoJS with React](https://gojs.net/latest/intro/react.html) for more information. Some more detail on the implementation of these components can be found [here](https://github.com/NorthwoodsSoftware/gojs-react/blob/master/IMPLEMENTATION.md).

## Installation

gojs-react can be installed via NPM or used via CDN. This package has peer dependencies on GoJS and React, so make sure those are also installed or included on your page.

### NPM

```bash
npm install --save gojs-react
```

### CDN

```html
<script src="https://unpkg.com/gojs-react/dist/gojsreact.production.min.js"></script>
```

## Usage

这个库提供了三个组件：ReactDiagram, ReactPalette, and ReactOverview，与GoJS的组件对应。

This package provides three components - ReactDiagram, ReactPalette, and ReactOverview - corresponding to the related GoJS classes. The [gojs-react-basic repository](https://github.com/NorthwoodsSoftware/gojs-react-basic) provides example usage. Feel free to use these components as examples for setting up your own React components for GoJS. If you'd like to do so, we suggest reading more about the implementation of these components [here](https://github.com/NorthwoodsSoftware/gojs-react/blob/master/IMPLEMENTATION.md).

下面是组件的基本 props 配置

```jsx
<ReactDiagram
  ref={this.diagramRef}
  divClassName='diagram-component'
  initDiagram={this.initDiagram}
  nodeDataArray={this.props.nodeDataArray}
  linkDataArray={this.props.linkDataArray}
  modelData={this.props.modelData}
  onModelChange={this.props.onModelChange}
  skipsDiagramUpdate={this.props.skipsDiagramUpdate}
/>
<ReactPalette
  initPalette={this.initPalette}
  divClassName='palette-component'
  nodeDataArray={[{ key: 0, text: 'Alpha' }]}
/>
<ReactOverview
  initOverview={this.initOverview}
  divClassName='overview-component'
  observedDiagram={this.state.observed}
/>
```

### Component Props

#### initDiagram/initPalette/initOverview

初始化的图表

Specifies a function that is reponsible for initializing and returning a GoJS Diagram, Palette, or Overview. In the case of an Overview, this is an optional property and when not provided, an Overview with default properties and centered content will be created.

```js
function initDiagram() {
  const $ = go.GraphObject.make;
  const diagram = $(go.Diagram,
    {
      'undoManager.isEnabled': true,  // must be set to allow for model change listening
      // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
      model: $(go.GraphLinksModel, {
        linkKeyProperty: 'key'  // this should always be set when using a GraphLinksModel
      })
    });

  diagram.nodeTemplate =
    $(go.Node, 'Auto',  // the Shape will go around the TextBlock
      $(go.Shape, 'RoundedRectangle', { strokeWidth: 0, fill: 'white' },
        // Shape.fill is bound to Node.data.color
        new go.Binding('fill', 'color')),
      $(go.TextBlock,
        { margin: 8 },  // some room around the text
        // TextBlock.text is bound to Node.data.key
        new go.Binding('text', 'key'))
    );

  return diagram;
}
```

#### divClassName

Specifies the CSS classname to add to the rendered div. This should usually specify a width/height.

```css
.diagram-component {
  width: 400px;
  height: 400px;
  border: 1px solid black;
}
```

#### nodeDataArray (ReactDiagram and ReactPalette only)

Specifies the array of nodes for the Diagram's model.

```js
nodeDataArray: [
  { key: 'Alpha', color: 'lightblue' },
  { key: 'Beta', color: 'orange' },
  { key: 'Gamma', color: 'lightgreen' },
  { key: 'Delta', color: 'pink' }
]
```

#### Optional - linkDataArray (ReactDiagram and ReactPalette only)

Specifies the array of links for the Diagram's model.

```js
linkDataArray: [
  { key: -1, from: 'Alpha', to: 'Beta' },
  { key: -2, from: 'Alpha', to: 'Gamma' },
  { key: -3, from: 'Beta', to: 'Beta' },
  { key: -4, from: 'Gamma', to: 'Delta' },
  { key: -5, from: 'Delta', to: 'Alpha' }
]
```

#### Optional - modelData (ReactDiagram and ReactPalette only)

Specifies a modelData object for the Diagram's model.

#### skipsDiagramUpdate (ReactDiagram only)

Specifies whether the component should skip updating, often set when updating state from a GoJS model change. This flag is checked during shouldComponentUpdate.

#### onModelChange (ReactDiagram only)

Specifies a function to be called when a GoJS transaction has completed. This function will typically be responsible for updating React/Redux state.

```js
function handleModelChange(data) {
  const insertedNodeKeys = data.insertedNodeKeys;
  const modifiedNodeData = data.modifiedNodeData;
  const removedNodeKeys = data.removedNodeKeys;
  const insertedLinkKeys = data.insertedLinkKeys;
  const modifiedLinkData = data.modifiedLinkData;
  const removedLinkKeys = data.removedLinkKeys;

  // ... make state changes
}
```

#### observedDiagram (ReactOverview only)

Specifies the go.Diagram which the Overview will observe.

https://github.com/NorthwoodsSoftware/gojs-react

https://gojs.net/latest/index.html