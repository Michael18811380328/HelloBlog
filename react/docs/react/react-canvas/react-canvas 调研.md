# React 框架下 canvas 调研

### 原生 canvas

react 下面移动端 canvas 性能不好，不能直接使用移动端硬件加速，所以可以使用下面几个库实现 canvas 和简单图形编辑效果。

使用时，参考最新的官网文档。

# react-canvas

stars 12k

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
        <Gradient style={this.getGradientStyle()} 
                  colorStops={this.getGradientColors()} />
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

## Accessibility

This area needs further exploration. Using fallback content (the canvas DOM sub-tree) should allow screen readers such as VoiceOver to interact with the content. We've seen mixed results with the iOS devices we've tested. Additionally there is a standard for [focus management](http://www.w3.org/TR/2010/WD-2dcontext-20100304/#dom-context-2d-drawfocusring) that is not supported by browsers yet.

One approach that was raised by [Bespin](http://vimeo.com/3195079) in 2009 is to keep a [parallel DOM](http://robertnyman.com/2009/04/03/mozilla-labs-online-code-editor-bespin/#comment-560310) in sync with the elements rendered in canvas.

## Running the examples

```
npm install
npm start
```

This will start a live reloading server on port 8080. To override the default server and live reload ports, run `npm start` with PORT and/or RELOAD_PORT environment variables.

**A note on NODE_ENV and React**: running the examples with `NODE_ENV=production` will noticeably improve scrolling performance. This is because React skips propType validation in production mode.

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



# React Konva

https://github.com/konvajs/react-konva

Stras 3K

这个是复杂画布绘图的工具

React Konva is a JavaScript library for drawing complex canvas graphics using [React](http://facebook.github.io/react/).

It provides declarative and reactive bindings to the [Konva Framework](http://konvajs.github.io/).



**At the current moment, `react-konva` is not supported in React Native environment.**

Currently you can use all `Konva` components as React components and all `Konva` events are supported on them in same way as normal browser events are supported.

## Installation

```
npm install react-konva konva --save
```

## [Tutorials and Documentation](https://konvajs.github.io/docs/react/)

## Example

```js
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';

class ColoredRect extends React.Component {
  state = {
    color: 'green'
  };
  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor()
    });
  };
  render() {
    return (
      <Rect
        x={20}
        y={20}
        width={50}
        height={50}
        fill={this.state.color}
        shadowBlur={5}
        onClick={this.handleClick}
      />
    );
  }
}

class App extends Component {
  render() {
    // Stage is a div container
    // Layer is actual canvas element (so you may have several canvases in the stage)
    // And then we have canvas shapes inside the Layer
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Text text="Try click on rect" />
          <ColoredRect />
        </Layer>
      </Stage>
    );
  }
}

render(<App />, document.getElementById('root'));
```

To get more info about `Konva` you can read [Konva Overview](http://konvajs.github.io/docs/overview.html).

**Actually you don't need to learn `react-konva`. Just learn `Konva` framework, you will understand how to use `react-konva`**

## Core API

`react-konva` supports all shapes, that `Konva` supports with the same names, and also it supports all the same events like `click`, `touchmove`, `dragend`, etc with "on" prefix like `onClick`, `onTouchMove`, `onDragEnd`.

### Getting reference to Konva objects

To get reference of `Konva` instance of a node you can use `ref` property.

```
class MyShape extends React.Component {
  componentDidMount() {
    // log Konva.Circle instance
    console.log(this.circle);
  }
  render() {
    return <Circle ref={ref => (this.circle = ref)} radius={50} fill="black" />;
  }
}
```

### Strict mode

By default `react-konva` works in "non-strict" mode. If you changed a property **manually** (or by user action like `drag&drop`) properties of the node will be not matched with properties from `render()`. `react-konva` updates ONLY properties changed in `render()`.

In strict mode `react-konva` will update all properties of the nodes to the values that you provided in `render()` function, no matter changed they or not.

You should decide what mode is better in your actual use case.

To enable strict mode globally you can do this:

```
import { useStrictMode } from 'react-konva';

useStrictMode(true);
```

Or you can enable it only for some components:

```
<Rect width={50} height={50} fill="black" _useStrictMode />
```

Take a look into this example:

```js
import { Circle } from 'react-konva';
import Konva from 'konva';

const Shape = () => {
  const [color, setColor] = React.useState();

  return (
    <Circle
      x={0}
      y={0}
      draggable
      radius={50}
      fill={color}
      onDragEnd={() => {
        setColor(Konva.Util.getRandomColor());
      }}
    />
  );
};
```

The circle is `draggable` and it changes its color on `dragend` event. In `strict` mode position of the node will be reset back to `{x: 0, y: 0}` (as we defined in render). But in `non-strict` mode the circle will keep its position, because `x` and `y` are not changed in render.

### Minimal bundle

By default `react-konva` imports full `Konva` version. With all the shapes and all filters. To minimize bundle size you can use minimal core version of `react-konva`:

```
// load minimal version of 'react-konva`
import { Stage, Layer, Rect } from "react-konva/lib/ReactKonvaCore";

// minimal version has NO support for core shapes and filters
// if you want import a shape into Konva namespace you can just do this:
import "konva/lib/shapes/Rect";
```

Demo: https://codesandbox.io/s/6l97wny44z

### Usage with React Context

Due to a [known issue](https://github.com/facebook/react/issues/13336) with React, Contexts are not accessible by children of the react-konva `Stage` component. If you need to subscribe to a context from within the `Stage`, you need to "bridge" the context by creating a `Provider` as a child of the `Stage`. For more info, see [this discussion](https://github.com/konvajs/react-konva/issues/188#issuecomment-478302062) and this [react-redux demo](https://github.com/konvajs/react-konva/issues/311#issuecomment-454411007). Here is an example of bridging the context ([live demo](https://codesandbox.io/s/ykqw8r4r21)):

```
import React, { Component } from "react";
import Konva from "konva";
import { render } from "react-dom";
import { Stage, Layer, Rect } from "react-konva";

const ThemeContext = React.createContext("red");

const ThemedRect = () => {
  const value = React.useContext(ThemeContext);
  return (
    <Rect x={20} y={50} width={100} height={100} fill={value} shadowBlur={10} />
  );
};

const Canvas = () => {
  return (
    <ThemeContext.Consumer>
      {value => (
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <ThemeContext.Provider value={value}>
            <Layer>
              <ThemedRect />
            </Layer>
          </ThemeContext.Provider>
        </Stage>
      )}
    </ThemeContext.Consumer>
  );
};

class App extends Component {
  render() {
    return (
      <ThemeContext.Provider value="blue">
        <Canvas />
      </ThemeContext.Provider>
    );
  }
}
```

## Comparisons

### react-konva vs react-canvas

[react-canvas](https://github.com/Flipboard/react-canvas) is a completely different react plugin. It allows you to draw DOM-like objects (images, texts) on canvas element in very performant way. It is NOT about drawing graphics, but react-konva is exactly for drawing complex graphics on `<canvas>` element from React.

### react-konva vs react-art

[react-art](https://github.com/reactjs/react-art) allows you to draw graphics on a page. It also supports SVG for output. But it has no support of events of shapes.

### react-konva vs vanilla canvas

Vanilla canvas is faster because when you use `react-konva` you have two layers of abstractions. Konva framework is on top of canvas and React is on top of Konva. Depending on the use case this approach can be slow. The purpose of `react-konva` is to reduce the complexity of the application and use well-known declarative way for drawing on canvas.