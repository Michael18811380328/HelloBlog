# React 框架下 canvas 调研

## 原生 canvas 问题

react 下面移动端 canvas 性能不好，不能直接使用移动端硬件加速，所以可以使用库实现 canvas 和简单图形编辑效果。使用时，参考最新的官网文档（下面的案例是旧的 class 文档，新文档完全 hooks 了）。

## React Konva

https://github.com/konvajs/react-konva

https://www.npmjs.com/package/react-konva

Stras 5.5K

这个是复杂画布绘图的工具 React Konva is a JavaScript library for drawing complex canvas graphics using [React](http://facebook.github.io/react/). It provides declarative and reactive bindings to the [Konva Framework](http://konvajs.github.io/).

## Installation

```
npm install react-konva konva --save
```

## Example

To get more info about `Konva` you can read [Konva Overview](http://konvajs.github.io/docs/overview.html).

Actually you don't need to learn `react-konva`. Just learn `Konva` framework, you will understand how to use `react-konva`

konva 和 react-konva 是类似的功能，所以参考 konva 的文档即可学习 react-conva

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



## Core API

`react-konva` supports all shapes, that `Konva` supports with the same names, and also it supports all the same events like `click`, `touchmove`, `dragend`, etc with "on" prefix like `onClick`, `onTouchMove`, `onDragEnd`.

### Getting reference to Konva objects

To get reference of `Konva` instance of a node you can use `ref` property.

```js
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

### Minimal bundle

By default `react-konva` imports full `Konva` version. With all the shapes and all filters. To minimize bundle size you can use minimal core version of `react-konva`:

```js
// load minimal version of 'react-konva`
import { Stage, Layer, Rect } from "react-konva/lib/ReactKonvaCore";

// minimal version has NO support for core shapes and filters
// if you want import a shape into Konva namespace you can just do this:
import "konva/lib/shapes/Rect";
```

Demo: https://codesandbox.io/s/6l97wny44z

### Usage with React Context

Due to a [known issue](https://github.com/facebook/react/issues/13336) with React, Contexts are not accessible by children of the react-konva `Stage` component. If you need to subscribe to a context from within the `Stage`, you need to "bridge" the context by creating a `Provider` as a child of the `Stage`. For more info, see [this discussion](https://github.com/konvajs/react-konva/issues/188#issuecomment-478302062) and this [react-redux demo](https://github.com/konvajs/react-konva/issues/311#issuecomment-454411007). Here is an example of bridging the context ([live demo](https://codesandbox.io/s/ykqw8r4r21)):

```js
import React, { Component } from "react";
import { render } from "react-dom";
import Konva from "konva";
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



### 实际案例

JS 绘制一个邀请海报

~~~js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Stage, Layer, Text, Image as KImage, Circle } from 'react-konva';

const { qrcodeSrc } = window.app.pageOptions;

class InvitePoster extends Component {

  async componentDidMount() {
    const { width, height, textY, avatarY, qrcodeY, scale } = this.getPosterSize();
    const bgImage = {
      name: 'bgImage',
      width: width,
      height: height,
      url: `poster-background.jpg`
    };
    const avatarImage = {
      name: 'avatarImage',
      width: 50,
      height: 50,
      url: appAvatarURL
    };
    const qrcodeImage = {
      name: 'qrCodeImage',
      width: 60,
      height: 60,
      url: qrcodeSrc
    };

    try {
      const backImg = await this.loadImage(bgImage);
      const avatarImg = await this.loadImage(avatarImage);
      const qrcodeImg = await this.loadImage(qrcodeImage);
      this.setState({
        posterWidth: width,
        posterHeight: height,
        textY,
        avatarY,
        qrcodeY,
        scale,
        backImg,
        avatarImg,
        qrcodeImg,
        isLoading: false,
      });
    } catch(err) {
      this.setState({isLoading: false});
    }
    window.addEventListener('resize', this.resize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  getPosterSize = () => {
    const width = document.querySelector('body').offsetWidth;
    const height = document.querySelector('body').offsetHeight;
    let bgImageWidth = width - 2 * 30;
    let bgImageHeight = height - 2 * 30 - 40;
    if (width <= 320) {
      return {
        width: bgImageWidth,
        height: bgImageHeight,
        avatarY: 285,
        textY: 310,
        qrcodeY: 410,
        scale: 0.8
      };
    }

    if (width === 360 && height === 640) {
      // android
      return {
        width: bgImageWidth,
        height: 540,
        avatarY: 330,
        textY: 360,
        qrcodeY: 475,
        scale: 0.9
      };
    }

    if (width <= 375) {
      if (bgImageHeight > 700) {
        return {
          width: 340,
          height: 620,
          avatarY: 390,
          textY: 420,
          qrcodeY: 547,
          scale: 1
        };
      }
      return {
        width: bgImageWidth,
        height: bgImageHeight,
        avatarY: 350,
        textY: 380,
        qrcodeY: 495,
        scale: 1
      };
    } 

    if (width < 768) {
      return {
        width: 340,
        height: 620,
        avatarY: 390,
        textY: 420,
        qrcodeY: 547,
        scale: 1
      };
    }

    if (width >= 768) { // pc
      return {
        width: 340,
        height: 620,
        avatarY: 390,
        textY: 420,
        qrcodeY: 547,
        scale: 1
      };
    }
  }

  loadImage = (imgInfo) => {
    return new Promise((resolve, reject) => {
      const { width, height, url } = imgInfo;
      let img = new Image();
      img.src = url;
      img.width = width;
      img.height = height;
      img.onload = () => {
        resolve(img);
      };
      img.onerror = () => {
        reject(imgInfo);
      };
    });
  }

  resize = async () => {
    const { width, height, textY, avatarY, qrcodeY, scale } = this.getPosterSize();
    const bgImage = {
      name: 'bgImage',
      width: width,
      height: height,
      url: `background.jpg`
    };
    const backImg = await this.loadImage(bgImage);
    this.setState({
      backImg: backImg,
      posterWidth: width,
      posterHeight: height,
      textY,
      avatarY,
      qrcodeY,
      scale
    });
  }

  genPosterImg = (instance) => {
    if (instance) {
      // 生成图片，手机可以长按保存
      let posterImg = new Image();
      posterImg.crossOrigin = 'anonymous';
      posterImg.src = instance.toDataURL({pixelRatio: 2});
      posterImg.style.cssText = 'width:100%;height:100%;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;';

      document.body.appendChild(posterImg);
    }
  }

  render() {
    let { backImg, avatarImg, qrcodeImg, isLoading } = this.state;
    const { posterWidth, posterHeight, avatarY, textY, qrcodeY, scale } = this.state;
    return (
      <div className='poster-invite'>
        <div className="poster-container">
          <Stage width={posterWidth} height={posterHeight} ref={this.genPosterImg}>
            <Layer scaleY={1.0} scaleX={1.0}>
              <KImage
                x={0}
                y={0}
                width= {backImg.imgWidth}
                height={backImg.imgHeight}
                image={backImg}
              />
              <Circle
                x={42}
                y={avatarY}
                radius={25}
                fillPatternImage={avatarImg}
                fillPatternRepeat={'no-repeat'}
                fillPatternOffsetX={36}
                fillPatternOffsetY={36}
                scaleX={scale}
                scaleY={scale}
              />
              <Text
                x={18}
                y={textY}
                text={name}
                fontSize={18}
                fill={'#72340b'}
                scaleX={scale}
                scaleY={scale}
              />
              <KImage
                x={2}
                y={qrcodeY}
                scaleX={scale}
                scaleY={scale}
                width={qrcodeImg.width}
                height={qrcodeImg.height}
                image={qrcodeImg}
              />
            </Layer>
          </Stage>
        </div>
        <span className="poster-tips-test">press to save image</span>
      </div>
    );
  }
}
~~~

