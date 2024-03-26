# react-image-lightbox

## 用途

react 中图片预览

## 可靠性

1.3K 星星，上万下载，基本没问题

This repository has been archived by the owner on Jan 19, 2023. It is now read-only.

作者推荐使用另一个库：https://www.npmjs.com/package/react-photoswipe-gallery

## 官网链接

https://www.npmjs.com/package/react-image-lightbox

https://github.com/frontend-collective/react-image-lightbox

https://frontend-collective.github.io/react-image-lightbox/

## 基本使用

```js
import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

const images = [
  '//placekitten.com/1500/500',
  '//placekitten.com/4000/3000',
  '//placekitten.com/800/1200',
  '//placekitten.com/1500/1500',
];

export default class LightboxExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoIndex: 0,
      isOpen: false,
    };
  }

  render() {
    const { photoIndex, isOpen } = this.state;
    return (
      <div>
        <button type="button" onClick={() => this.setState({ isOpen: true })}>
          Open Lightbox
        </button>
        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length,
              })
            }
          />
        )}
      </div>
    );
  }
}
```

## 兼容性问题

这个库使用了 react 16 + 17 版本，不支持 react 18，目前测试 18 可以基本使用，其他问题还不确定。
