# react-canvas

### 原生 canvas 的不足

react 下面移动端 canvas 性能不好，不能直接使用移动端硬件加速，所以可以使用下面几个库实现 canvas 和简单图形编辑效果。使用时，参考最新的官网文档。

这个库基于 react 15 版本，和其他项目 react 18 不兼容。

# react-canvas

stars 13k

https://github.com/Flipboard/react-canvas

React Canvas adds the ability for React components to render to `<canvas>` rather than DOM.

使用 React 组件来渲染 canvas 而不是 DOM 渲染

This project is a work-in-progress. Though much of the code is in production on flipboard.com, the React canvas bindings are relatively new and the API is subject to change.

## Motivation

动机：性能问题

Having a long history of building interfaces geared toward mobile devices, we found that the reason mobile web apps feel slow when compared to native apps is the DOM. CSS animations and transitions are the fastest path to smooth animations on the web, but they have several limitations. React Canvas leverages the fact that most modern mobile browsers now have hardware accelerated canvas.

While there have been other attempts to bind canvas drawing APIs to React, they are more focused on visualizations and games. Where React Canvas differs is in the focus on building application user interfaces. The fact that it renders to canvas is an implementation detail.

React Canvas brings some of the APIs web developers are familiar with and blends them with a high performance drawing engine.

## Installation

React Canvas is available through npm:

```bash
npm install react-canvas
```

## React Canvas Components

这是不同层级的组件（容器；图层；群组；文字；图片；渐变；列表）

React Canvas provides a set of standard React components that abstract the underlying rendering implementation.

### `<Surface>`

**Surface** is the top-level component. Think of it as a drawing canvas in which you can place other components.

### `<Layer>`

**Layer** is the the base component by which other components build upon. Common styles and properties such as top, width, left, height, backgroundColor and zIndex are expressed at this level.

### `<Group>`

**Group** is a container component. Because React enforces that all components return a single component in `render()`, Groups can be useful for parenting a set of child components. The Group is also an important component for optimizing scrolling performance, as it allows the rendering engine to cache expensive drawing operations.

### `<Text>`

**Text** is a flexible component that supports multi-line truncation, something which has historically been difficult and very expensive to do in DOM.

### `<Image>`

**Image** is exactly what you think it is. However, it adds the ability to hide an image until it is fully loaded and optionally fade it in on load.

### `<Gradient>`

**Gradient** can be used to set the background of a group or surface.

```js
  render() {
    ...
    return (
      <Group style={this.getStyle()}>
        <Gradient style={this.getGradientStyle()} colorStops={this.getGradientColors()} />
      </Group>
    );
  }
  getGradientColors(){
    return [
      { color: "transparent", position: 0 },
      { color: "#000", position: 1 }
    ]
  }
```

### `<ListView>`

**ListView** is a touch scrolling container that renders a list of elements in a column. Think of it like UITableView for the web. It leverages many of the same optimizations that make table views on iOS and list views on Android fast.

## Events

React Canvas components support the same event model as normal React components. However, not all event types are currently supported.

For a full list of supported events see [EventTypes](https://github.com/Flipboard/react-canvas/blob/master/lib/EventTypes.js).

## Building Components

Here is a very simple component that renders text below an image:

```js
var React = require('react');
var ReactCanvas = require('react-canvas');

var Surface = ReactCanvas.Surface;
var Image = ReactCanvas.Image;
var Text = ReactCanvas.Text;

var MyComponent = React.createClass({

  render: function () {
    var surfaceWidth = window.innerWidth;
    var surfaceHeight = window.innerHeight;
    var imageStyle = this.getImageStyle();
    var textStyle = this.getTextStyle();

    return (
      <Surface width={surfaceWidth} height={surfaceHeight} left={0} top={0}>
        <Image style={imageStyle} src='...' />
        <Text style={textStyle}>
          Here is some text below an image.
        </Text>
      </Surface>
    );
  },

  getImageHeight: function () {
    return Math.round(window.innerHeight / 2);
  },

  getImageStyle: function () {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: this.getImageHeight()
    };
  },

  getTextStyle: function () {
    return {
      top: this.getImageHeight() + 10,
      left: 0,
      width: window.innerWidth,
      height: 20,
      lineHeight: 20,
      fontSize: 12
    };
  }

});
```

## ListView

Many mobile interfaces involve an infinitely long scrolling list of items. React Canvas provides the ListView component to do just that.

Because ListView virtualizes elements outside of the viewport, passing children to it is different than a normal React component where children are declared in render().

The `numberOfItemsGetter`, `itemHeightGetter` and `itemGetter` props are all required.

```js
var ListView = ReactCanvas.ListView;

var MyScrollingListView = React.createClass({

  render: function () {
    return (
      <ListView
        numberOfItemsGetter={this.getNumberOfItems}
        itemHeightGetter={this.getItemHeight}
        itemGetter={this.renderItem} />
    );
  },

  getNumberOfItems: function () {
    // Return the total number of items in the list
  },

  getItemHeight: function () {
    // Return the height of a single item
  },

  renderItem: function (index) {
    // Render the item at the given index, usually a <Group>
  },

});
```

See the [timeline example](https://github.com/Flipboard/react-canvas/blob/master/examples/timeline/app.js) for a more complete example.

Currently, ListView requires that each item is of the same height. Future versions will support variable height items.

## Text sizing

React Canvas provides the `measureText` function for computing text metrics.

The [Page component](https://github.com/Flipboard/react-canvas/blob/master/examples/timeline/components/Page.js) in the timeline example contains an example of using measureText to achieve precise multi-line ellipsized text.

Custom fonts are not currently supported but will be added in a future version.

## css-layout

There is experimental support for using [css-layout](https://github.com/facebook/css-layout) to style React Canvas components. This is a more expressive way of defining styles for a component using standard CSS styles and flexbox.

Future versions may not support css-layout out of the box. The performance implications need to be investigated before baking this in as a core layout principle.

See the [css-layout example](https://github.com/Flipboard/react-canvas/blob/master/examples/css-layout).

## Using with webpack

The [brfs](https://github.com/substack/brfs) transform is required in order to use the project with webpack.

```bash
npm install -g brfs
npm install --save-dev transform-loader brfs
```

Then add the [brfs](https://github.com/substack/brfs) transform to your webpack config

```json
module: {
  postLoaders: [
    { loader: "transform?brfs" }
  ]
}
```

