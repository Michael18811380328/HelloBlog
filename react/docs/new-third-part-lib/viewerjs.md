# viewerjs

‌用于图片查看器，‌提供图片的缩放、‌旋转等操作，‌适用于需要展示大量图片或进行图片编辑的应用

# viewerjs&#x20;

### version

1.11.6 •&#x20;

### downloads

49,583&#x20;

### repository

github.com/fengyuanchen/viewerjs&#x20;

### homepage

fengyuanchen.github.io/viewerjs&#x20;

## default readme

​

# Viewer.js

> JavaScript image viewer.

* Website

* jquery-viewer - A jQuery plugin wrapper for Viewer.js.

## Table of contents

* Features

* Main

* Getting started

* Keyboard support

* Options

* Methods

* Events

* No conflict

* Browser support

* Contributing

* Versioning

* License

## Features

* Supports 53 options

* Supports 23 methods

* Supports 17 events

* Supports modal and inline modes

* Supports touch

* Supports move

* Supports zoom

* Supports rotation

* Supports scale (flip)

* Supports keyboard

* Cross-browser support

## Main files

&#x20;  &#x20;

```
dist/
├── viewer.css
├── viewer.min.css   (compressed)
├── viewer.js        (UMD)
├── viewer.min.js    (UMD, compressed)
├── viewer.common.js (CommonJS, default)
└── viewer.esm.js    (ES Module)
```

## Getting started

### Installation

&#x20;  &#x20;

```
npm install viewerjs
```

In browser:

&#x20;  &#x20;

```
<link  href="/path/to/viewer.css" rel="stylesheet">
<script src="/path/to/viewer.js"></script>
```

The cdnjs provides CDN support for
Viewer.js's CSS and JavaScript. You can find the links
here.

### Usage

#### Syntax

```
new Viewer(element[, options])
```

* element

  * Type: HTMLElement

  * The target image or container of images for viewing.

* options (optional)

  * Type: Object

  * The options for viewing. Check out the available options.

#### Example

&#x20;  &#x20;

```html
<!-- a block container is required -->
<div>
  <img id="image" src="picture.jpg" alt="Picture">
</div>

<div>
  <ul id="images">
    <li><img src="picture-1.jpg" alt="Picture 1"></li>
    <li><img src="picture-2.jpg" alt="Picture 2"></li>
    <li><img src="picture-3.jpg" alt="Picture 3"></li>
  </ul>
</div>
```

&#x20;  &#x20;

```javascript
// You should import the CSS file.
// import 'viewerjs/dist/viewer.css';
import Viewer from 'viewerjs';

// View an image.
const viewer = new Viewer(document.getElementById('image'), {
  inline: true,
  viewed() {
    viewer.zoomTo(1);
  },
});
// Then, show the image by clicking it, or call `viewer.show()`.

// View a list of images.
// Note: All images within the container will be found by calling `element.querySelectorAll('img')`.
const gallery = new Viewer(document.getElementById('images'));
// Then, show one image by click it, or call `gallery.show()`.            
```

​


