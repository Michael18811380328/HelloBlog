# 常用的JS库整理

作为一个前端开发工程师，我们不需要反复造轮子。下面列出常用的景点的库，根据项目实际需求使用吧。

## **1. [Lodash](https://link.zhihu.com/?target=https%3A//github.com/lodash/lodash) & [Underscore](https://link.zhihu.com/?target=https%3A//github.com/jashkenas/underscore)**

也许大多数童鞋都已经知道它们。Underscore提供了日常使用的基础函数。Lodash, 作为NPM最多下载量和被依赖最多的包，旨在为数组，字符串，对象和参数对象提供更一致的跨环境迭代支持。它已经是Underscore的超集。Underscore和Lodash由同一组核心开发者维护。你日常开发中绝对少不了要用到它。


## **2. [Ramda](https://link.zhihu.com/?target=https%3A//github.com/ramda/ramda)**

拥有超过12K的stars，Ramda库可以用来在JavaScript中函数式编程，专门为函数式编程风格而设计，更容易创建函数式pipeline、且从不改变用户已有数据。

摘自官方：Ramda 主要特性如下：Ramda 强调更加纯粹的函数式风格。数据不变性和函数无副作用是其核心设计理念。这可以帮助你使用简洁、优雅的代码来完成工作。*Ramda 函数本身都是自动柯里化的。这可以让你在只提供部分参数的情况下，轻松地在已有函数的基础上创建新函数。Ramda 函数参数的排列顺序更便于柯里化。通常最后提供要操作的数据。*

最后两点一起，使得将多个函数组合为简单的函数序列变得非常容易，每个函数对数据进行变换，并将结果传递给下一个函数。Ramda的设计能很好地支持这种风格的编程。

[Ramdagithub.com](https://link.zhihu.com/?target=https%3A//github.com/ramda/ramda)

## **3. [Math.js](https://link.zhihu.com/?target=https%3A//github.com/josdejong/mathjs)**

拥有超过6K的stars，Math.js是一个Node.js和JavaScript上的math扩展库，并且和内置的Math库兼容。该库中包含一个灵活的表达式分析器，并且有非常多的内置函数可以使用。你甚至可以自行做扩展。

josdejong/mathjsgithub.com

## **4. [Moment](https://link.zhihu.com/?target=https%3A//github.com/moment/moment/) & [date-fns](https://link.zhihu.com/?target=https%3A//github.com/date-fns/date-fns)**

拥有超过40K的stars，moment.js是一个JavaScript的时间处理库，可以用来分析、验证、处理和格式化时间。Moment被设计可以用于浏览器和Node.js环境下。对于V2.10.0，代码完全用ECMAScript 6实现。

Date-fns也是一个非常流行(超过11K的stars)的时间处理库，提供超过130多个函数，很多人把它当做moment.js([查看对比](https://link.zhihu.com/?target=https%3A//github.com/date-fns/date-fns/issues/275%23issuecomment-264934189))的替代品。Date-fns完全用纯函数实现，保证不可修改性。它可以很好的和webpack，Browserify、或Rollup配合使用，并支持tree-shaking。

[momentgithub.com](https://link.zhihu.com/?target=https%3A//github.com/moment/moment/)[date-fnsgithub.com](https://link.zhihu.com/?target=https%3A//github.com/date-fns/date-fns)

## **5. [Sugar](https://link.zhihu.com/?target=https%3A//github.com/andrewplummer/Sugar)**

拥有超过3.5K个stars，Sugar是一个可以用来处理原生对象的库。拥有自定义的构建和模块化的npm包，使得你可以只需要加载你需要的包。用户也可以自定义方法或则使用插件处理特殊情况。

github.com/andrewplummer/Sugar

![img](https://pic4.zhimg.com/80/v2-165116f4af86388ae25372c64ca1d527_1440w.jpg)



## **6. [Lazy](https://link.zhihu.com/?target=https%3A//github.com/dtao/lazy.js)**

拥有5K个stars，lazy.js是一个函数式的JavaScript库。该库的底层的实现都是懒执行的，也就是说尽量不做运算，除非真的需要。这个库不依赖第三方库，这里有一个[demo](https://link.zhihu.com/?target=http%3A//danieltao.com/lazy.js/demos/events/)，这里是[API文档](https://link.zhihu.com/?target=http%3A//danieltao.com/lazy.js/)。

比如，我们要生成300个1到1000之间完全不同的随机数，可以这样写：

```js
Lazy.generate(Math.random)
  .map(function(e) { return Math.floor(e * 1000) + 1; })
  .uniq()
  .take(300)
  .each(function(e) { console.log(e); });
```

如果用JavaScript直接去写，代码就会复杂很多了。

[lazy.jsgithub.com](https://link.zhihu.com/?target=https%3A//github.com/dtao/lazy.js)

## **7. [CollectJS](https://link.zhihu.com/?target=https%3A//github.com/ecrmnn/collect.js/)**

拥有超过3.5K个stars，collect.js是一个非常有前景并且不依赖于任何第三方库。它提供了针对数组和对象的包装，使用非常方便。

```js
const collection = collect([{
  name: 'JavaScript: The Good Parts', pages: 176
}, {
  name: 'JavaScript: The Definitive Guide', pages: 1096
}]);

collection.avg('pages');

//=> 636
```

[collect.jsgithub.com](https://link.zhihu.com/?target=https%3A//github.com/ecrmnn/collect.js/)

## **8. [Chance.js](https://link.zhihu.com/?target=https%3A//github.com/chancejs/chancejs)**

Chance是一个用来随机生成字符串、数字等的函数，他可以减少一些伪随机性，在你需要写自动化测试或则其它你需要生成随机数据的地方很有用。虽然只有3K个stars，但是这个库真的非常方便。



![img](https://pic2.zhimg.com/80/v2-34d5a070c1bb45e44b83d813802c431d_1440w.jpg)



[chancejsgithub.com](https://link.zhihu.com/?target=https%3A//github.com/chancejs/chancejs)

## **9. [Chart.js](https://link.zhihu.com/?target=https%3A//github.com/chartjs/Chart.js)**

拥有超过40K个stars，chart.js是一个少即是多的的经典例子。它只提供了8中可视化的类型，每一种都有动画并且可以自定义。Chart.js让你可以使用`<canvas>`标签来作图，并且在不同的浏览器上高效渲染。



![img](https://pic4.zhimg.com/80/v2-0ef79c2cfda912369438f7d44b7ed2c3_1440w.jpg)

[https://github.com/chartjs/Chart.jsgithub.com](https://link.zhihu.com/?target=https%3A//github.com/chartjs/Chart.js)

## **10. [Polished](https://link.zhihu.com/?target=https%3A//github.com/styled-components/polished)**

拥有超过3.5K个stars，由[styled-components](https://link.zhihu.com/?target=https%3A//github.com/styled-components/styled-components)团队开发，Polished是一个用于写css样式的工具集，提供sass风格的帮助函数和mixins。该库和styled-components，Aphrodite，Radium兼容。

https%3A//github.com/styled-components/polished

## **11. [MOUT](https://link.zhihu.com/?target=https%3A//github.com/mout/mout)**

Mout.js是一个JavaScript的模块化工具集合，能够以AMD模块的形式在浏览器或者Node.js中使用。Mout.js让你可以只加载你需要的模块或者函数，如下所示：

```js
// you can load individual methods (recommended)
var map = require('mout/array/map');
map([1, 2], function(v){ return val * val; }); // [1, 4]

// a single package
var stringUtils = require('mout/string');
stringUtils.camelCase('Foo Bar'); // "fooBar"

// or the whole lib
var mout = require('mout');
console.log( mout.math.clamp(17, 0, 10) ); // 10
```

https%3A//github.com/mout/mout

## **12. [Voca](https://link.zhihu.com/?target=https%3A//github.com/panzerdp/voca)**

一个用于处理字符串的JavaScript库，包含了很多的帮助函数，比如：change case, trim, pad, slugify, latinise, sprintf‘y, truncate, escape等等。

[vocagithub.com](https://link.zhihu.com/?target=https%3A//github.com/panzerdp/voca)

## **13. [Licia](https://link.zhihu.com/?target=https%3A//github.com/liriliri/licia)**

虽然只有500来个stars，但是Licia提供了非常多的工具函数，对于日常使用非常有帮助。
官方介绍：

> *Licia是一套在开发中实践积累起来的实用JavaScript工具库。该库目前拥有超过180个模块，包括Dom操作，cookie设置，类创建，模板函数，日期格式化等实用模块，同时配套有打包工具Eustia进行定制化，使JS脚本加载量缩减在10KB以下，极大优化移动端页面的加载速度。*

Licia由[RedHood](https://link.zhihu.com/?target=https%3A//www.surunzi.com/)开发，详细了解可以查看他本人在知乎上写的对Licia的介绍: [超实用JavaScript工具库](https://zhuanlan.zhihu.com/p/25502829)。

[liriliri/liciagithub.com!(https://link.zhihu.com/?target=https%3A//github.com/liriliri/licia)

## [color](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/color)

==功能==：JavaScript库，用于不可变的颜色转换和对CSS颜色字符串的支持。

```js
npm install color
var color = Color('#7743CE').alpha(0.5).lighten(0.5);
console.log(color.hsl().string());  // 'hsla(262, 59%, 81%, 0.5)'
console.log(color.cmyk().round().array());  // [ 16, 25, 0, 8, 0.5 ]
console.log(color.ansi256().object());  // { ansi256: 183, alpha: 0.5 }
```

------

## [uuidjs](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/uuidjs)

==功能==：UUID.js-JavaScript的RFC兼容UUID生成器

```js
// Create a version 4 (random number-based) UUID object
var objV4 = UUID.genV4();
 
// Create a version 1 (time-based) UUID object
var objV1 = UUID.genV1();
 
// Create a UUID object from a hexadecimal string
var uuid = UUID.parse("a0e0f130-8c21-11df-92d9-95795a3bcd40");
 
// Get string representations of a UUID object
console.log(uuid.toString());   // "a0e0f130-8c21-11df-92d9-95795a3bcd40"
console.log(uuid.hexString);    // "a0e0f130-8c21-11df-92d9-95795a3bcd40"
console.log(uuid.hexNoDelim);   // "a0e0f1308c2111df92d995795a3bcd40"
console.log(uuid.bitString);    // "101000001110000 ... 1100110101000000"
console.log(uuid.urn);          // "urn:uuid:a0e0f130-8c21-11df-92d9-95795a3bcd40"
 
// Compare UUID objects
console.log(objV4.equals(objV1));   // false
 
// Get UUID version numbers
console.log(objV4.version); // 4
console.log(objV1.version); // 1
 
// Get internal field values in 3 different forms via 2 different accessors
console.log(uuid.intFields.timeLow);                // 2699096368
console.log(uuid.bitFields.timeMid);                // "1000110000100001"
console.log(uuid.hexFields.timeHiAndVersion);       // "11df"
console.log(uuid.intFields.clockSeqHiAndReserved);  // 146
console.log(uuid.bitFields.clockSeqLow);            // "11011001"
console.log(uuid.hexFields.node);                   // "95795a3bcd40"
 
console.log(uuid.intFields[0]);                     // 2699096368
console.log(uuid.bitFields[1]);                     // "1000110000100001"
console.log(uuid.hexFields[2]);                     // "11df"
console.log(uuid.intFields[3]);                     // 146
console.log(uuid.bitFields[4]);                     // "11011001"
console.log(uuid.hexFields[5]);
```

------

## [rc-upload](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/rc-upload)

==功能==： 文件上传下载拖拽文件 及文件夹等

```js
var Upload = require('rc-upload');
var React = require('react');
React.render(<Upload />, container);
```

## [react-copy-to-clipboard](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/react-copy-to-clipboard) 、clipboard

==功能==：react 复制粘贴

```js
npm install --save react react-copy-to-clipboard

import React from 'react';
import ReactDOM from 'react-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
 
class App extends React.Component {
  state = {
    value: '',
    copied: false,
  };
 
  render() {
    return (
      <div>
        <input value={this.state.value}
          onChange={({target: {value}}) => this.setState({value, copied: false})} />
 
        <CopyToClipboard text={this.state.value}
          onCopy={() => this.setState({copied: true})}>
          <span>Copy to clipboard with span</span>
        </CopyToClipboard>
 
        <CopyToClipboard text={this.state.value}
          onCopy={() => this.setState({copied: true})}>
          <button>Copy to clipboard with button</button>
        </CopyToClipboard>
 
        {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}
      </div>
    );
  }
}
 
const appRoot = document.createElement('div');
document.body.appendChild(appRoot);
ReactDOM.render(<App />, appRoot);
```

------

## [numeral](https://link.zhihu.com/?target=http%3A//numeraljs.com/)

==功能==：一个用于格式化和处理数字的javascript库。

```js
var value = myNumeral.value();
// 1000

var myNumeral2 = numeral('1,000');

var value2 = myNumeral2.value();
// 1000
```

------

## [omit.js](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/omit.js)

==功能==：返回 在目标对象中 omit[删除; 忽略] 指定属性的对象; 实用程序功能，用于创建删除了某些字段的对象的浅表副本。

```js
npm i --save omit.js

omit(obj: Object, fields: string[]): Object


var omit = require('omit.js');
omit({ name: 'Benjy', age: 18 }, [ 'name' ]); // => { age: 18 
```

------

## [Moment.js](https://link.zhihu.com/?target=https%3A//momentjs.com/)

==功能==：一个JavaScript日期库，用于解析，验证，操作和格式化日期。

```js
moment().format('MMMM Do YYYY, h:mm:ss a'); // December 22nd 2020, 10:55:15 am
moment().format('dddd');                    // Tuesday
moment().format("MMM Do YY");               // Dec 22nd 20
moment().format('YYYY [escaped] YYYY');     // 2020 escaped 2020
moment().format();
```

## [Day.js](https://link.zhihu.com/?target=https%3A//github.com/iamkun/dayjs/blob/HEAD/docs/zh-cn/README.zh-CN.md)

==功能==：Day.js 是一个轻量的处理时间和日期的 JavaScript 库，和 Moment.js 的 API 设计保持完全一样. 如果您曾经用过 Moment.js, 那么您已经知道如何使用 Day.js

```js
dayjs().format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A') // 展示

dayjs()
  .set('month', 3)
  .month() // 获取

dayjs().add(1, 'year') // 处理

dayjs().isBefore(dayjs()) // 查询
```

## [milliseconds](https://link.zhihu.com/?target=https%3A//github.com/HenrikJoreteg/milliseconds)

==~~~~功能==：用于将时间转换为毫秒。

```js
var ms = require('milliseconds');

ms.seconds(2); // 2000
ms.minutes(2); // 120000
ms.hours(2);   // 7200000
ms.days(2);    // 172800000
ms.weeks(2);   // 1209600000
ms.months(2);  // 5259600000
ms.years(2);   // 63115200000
```

## [filesize](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/filesize)

==功能==：filesize.js提供了一种简单的方法来从数字（浮点数或整数）或字符串中获取人类可读的文件大小字符串。

```js
npm i filesize


filesize(500);                        // "500 B"
filesize(500, {bits: true});          // "4 Kb"
filesize(265318, {base: 10});         // "265.32 kB"
filesize(265318);                     // "259.1 KB"
filesize(265318, {round: 0});         // "259 KB"
filesize(265318, {output: "array"});  // [259.1, "KB"]
filesize(265318, {output: "object"}); // {value: 259.1, symbol: "KB", exponent: 1}
filesize(1, {symbols: {B: "Б"}});     // "1 Б"
filesize(1024);                       // "1 KB"
filesize(1024, {exponent: 0});        // "1024 B"
filesize(1024, {output: "exponent"}); // 1
filesize(265318, {standard: "iec"});  // "259.1 KiB"
filesize(265318, {standard: "iec", fullform: true}); // "259.1 kibibytes"
filesize(12, {fullform: true, fullforms: ["байтов"]});  // "12 байтов"
filesize(265318, {separator: ","});   // "259,1 KB"
filesize(265318, {locale: "de"});   // "259,1 KB"
```

## [react-markdown](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/react-markdown)

==功能==：使用备注的React的Markdown组件。

```js
import { Row, Col, Menu, Affix, Anchor } from 'antd';
import ReactMarkdown from 'react-markdown/with-html';
import { isEmpty } from "lodash";

import HeadBlock from './HeadBlock';

import 'github-markdown-css/github-markdown.css'
import './index.less';

const { Link } = Anchor;

const articles = {
  '1': '/developer_guide.md',
  '2': '/user_manual.md'
}


/**
 *
 * @param lists
 * 这里只做两级处理
 */
export const navsToTree = (lists: any[]) => {
  if (isEmpty(lists)) return [];
  // 提取第一个level为最大level 后续比他大的一律为同级
  const maxLevel = lists[0].level;
  const newLists: any[] = [];
  lists.forEach((item: any) => {
    // 一级 同级
    if (item.level <= maxLevel) {
      newLists.push(item)
    } else {
      // 非同级
      if (newLists[newLists.length - 1].children) {
        newLists[newLists.length - 1].children.push(item)
      } else {
        newLists[newLists.length - 1].children = [item]
      }
    }
  })
  return newLists;
}



const NormalTest: React.FC<any> = () => {

  const [currentArticle, setCurrentArticle] = useState<{ url: string, content: any }>({ url: '', content: '' });

  const [treeNavs, setTreeNavs] = useState<any[]>([])

  // 初始为开发文档
  useEffect(() => {
    // console.log(1);

    changeCurrentArticle(articles['1'])
  }, [])

  // 这里是根据文档修改进行获取目录
  useEffect(() => {
    /**
     *  获取所有的文章标题
     */
      // console.log(currentArticle);

    const markdownNavs = document.querySelectorAll('.article-nav')
    const navs: any[] = [];
    markdownNavs.forEach((item: any) => {
      const level = item.getAttribute('data-level');
      const value = item.textContent;
      const nodeKey = item.id;
      navs.push({ level, value, nodeKey })
    })
    transArticleNavs(navs)

  }, [currentArticle.content])

  // 更改当前文档
  const changeCurrentArticle = async (url: string) => {
    const res = await fetch(url);
    const content = await res.text();
    setCurrentArticle({ ...currentArticle, content, url })
  }

  // 书籍导航点击
  const menuOnClick = (e: any) => {
    const url = articles[e.key]
    changeCurrentArticle(url)
  }

  // 转换为文章右侧目录
  const transArticleNavs = (navs: any) => {

    // 转换为二级导航
    const treedevelopDocs = navsToTree(navs);
    setTreeNavs(treedevelopDocs)

  }

  return (
    <>
      <Row className='articles'>
        <Col flex='200px' className="articles-list">
          <Affix offsetTop={24}>
            <Menu defaultSelectedKeys={['1']} onClick={menuOnClick} theme='light'>
              <Menu.Item key="1">开发文档</Menu.Item>
              <Menu.Item key="2">使用文档</Menu.Item>
            </Menu>
          </Affix>

        </Col>
        <Col flex='1' className='articles-content'>
          <div className='articles-content_wrpper'>
            <ReactMarkdown
              className="markdown-body"
              source={currentArticle.content}
              escapeHtml={false}
              renderers={{
                heading: HeadBlock
              }}
            />
          </div>
        </Col>
        <Col flex='200px' className="articles-menu">
          <Affix offsetTop={20} >
            <Anchor style={{ width: 160 }}>
              {
                treeNavs.map((item: any) => {
                  if (item.children) {
                    return (
                      <Link href={`#${item.nodeKey}`} title={item.value} key={item.nodeKey}>
                        {
                          item.children.map((childItem: any) => (
                            <Link href={`#${childItem.nodeKey}`} title={childItem.value} key={childItem.nodeKey} />
                          ))
                        }
                      </Link>
                    )
                  } else {
                    return (
                      <Link href={`#${item.nodeKey}`} title={item.value} key={item.nodeKey} />
                    )
                  }
                })
              }
            </Anchor>
          </Affix>
        </Col>
      </Row>
    </>
  );
};

export default NormalTest;
import React from 'react';

const HeadBlock = (props) => {

  const { level, children } = props;
  const { nodeKey } = children[0].props;

  return (
    <>
      {React.createElement(`h${level}`, { className: 'article-nav', id: nodeKey, 'data-level': level }, children)}
    </>
  );
}

export default HeadBlock;
```

## [cytoscape](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/cytoscape) | cytoscape-dagre

==功能==：Cytoscape.js是功能齐全的图论库。您是否需要对关系数据进行建模和/或可视化，例如生物数据或社交网络？如果是这样，Cytoscape.js就是您所需要的。Cytoscape.js包含一个图形理论模型和一个用于显示交互式图形的可选渲染器。该库旨在使程序员和科学家尽可能轻松地在其应用程序中使用图论，无论是用于Node.js应用程序中的服务器端分析还是用于丰富的用户界面。

## [Lodash](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/lodash)

==功能==：函数工具类库

```js
// Load the full build.
var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require('lodash/fp');
 
// Load method categories.
var array = require('lodash/array');
var object = require('lodash/fp/object');
 
// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
var at = require('lodash/at');
var curryN = require('lodash/fp/curryN');
```

## [patch-package](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/patch-package) node

==功能==：npm yran 补丁,用于改node_modules

## [cross-env](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/cross-env) node

==功能==：
cross-env这是一款运行跨平台设置和使用环境变量的脚本。

```js
npm install --save-dev cross-env
{
  "scripts": {
    "parentScript": "cross-env GREET=\"Joe\" npm run childScript",
    "childScript": "cross-env-shell \"echo Hello $GREET\""
  }
}
```

## [bignumber.js](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/bignumber.js)

==功能==：一个用于任意精度十进制和非十进制算术的JavaScript库

```js
https://mikemcl.github.io/bignumber.js/
https://juejin.cn/post/6844903704714280968#heading-7
```

## [QRCode.js](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/qrcodejs2)、 [qrcode.vue](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/qrcode.vue)

==功能==：

```js
npm install --save qrcode.vue
npm i qrcodejs2


   getBlob(base64) {
      const mimeString = base64.split(',')[0].split(':')[1].split(';')[0]; // mime类型
      const byteString = atob(base64.split(',')[1]); // base64 解码
      const arrayBuffer = new ArrayBuffer(byteString.length); // 创建缓冲数组
      const intArray = new Uint8Array(arrayBuffer); // 创建视图
      for (let i = 0; i < byteString.length; i += 1) {
        intArray[i] = byteString.charCodeAt(i);
      }
      return new Blob([intArray], {
        type: mimeString,
      });
    },
    savePicture(Url = this.qrcodeUrl) {
      const blob = new Blob([''], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = Url;
      // eslint-disable-next-line prefer-destructuring
      a.download = Url.replace(/(.*\/)*([^.]+.*)/gi, '$2').split('?')[0];
      const e = document.createEvent('MouseEvents');
      e.initMouseEvent(
        'click',
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null,
      );
      a.dispatchEvent(e);
      URL.revokeObjectURL(url);
    },
    _qrcode(url) {
      const div = document.createElement('div');
      // eslint-disable-next-line new-cap
      const code = new QRCode(div, {
        text: url,
        width: 500,
        height: 500,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.L,
      });
      // 这里如果需要在页面上展示的话，就将div节点给添加到dom树上去；node.appendChild(div)
      const canvas = code._el.querySelector('canvas'); // 获取生成二维码中的canvas，并将canvas转换成base64
      const base64Text = canvas.toDataURL('image/png');
      const blob = this.getBlob(base64Text); // 将base64转换成blob对象
      return window.URL.createObjectURL(blob);
    },
```

## [cssnano](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/cssnano)、[js-beautify](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/js-beautify)

==功能==： css js 压缩工具

## [cors](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/cors) node

==功能==：CORS是一个node.js软件包，用于提供可用于通过各种选项启用CORS的Connect / Express中间件。

```js
npm install cors


var cors = require('cors');
app.use(
  cors({
    origin: ['http://localhost:8000'],
    methods: ['GET', 'POST'],
    alloweHeaders: ['Conten-Type', 'Authorization'],
  })
);
```

## [countup.js](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/countup.js)

==功能==：数字滚动插件使用方法详解

```js
npm i countup.js

interface CountUpOptions {
  startVal?: number; // number to start at (0)
  decimalPlaces?: number; // number of decimal places (0)
  duration?: number; // animation duration in seconds (2)
  useGrouping?: boolean; // example: 1,000 vs 1000 (true)
  useEasing?: boolean; // ease animation (true)
  smartEasingThreshold?: number; // smooth easing for large numbers above this if useEasing (999)
  smartEasingAmount?: number; // amount to be eased for numbers above threshold (333)
  separator?: string; // grouping separator (',')
  decimal?: string; // decimal ('.')
  // easingFn: easing function for animation (easeOutExpo)
  easingFn?: (t: number, b: number, c: number, d: number) => number;
  formattingFn?: (n: number) => string; // this function formats result
  prefix?: string; // text prepended to result
  suffix?: string; // text appended to result
  numerals?: string[]; // numeral glyph substitution
}
```

## [js-base64](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/js-base64)

==功能==：另一个Base64转码器。

```js
npm install --save js-base64

require=require('esm')(module);
import {Base64} from 'js-base64';


let latin = 'dankogai';
let utf8  = '小飼弾'
let u8s   =  new Uint8Array([100,97,110,107,111,103,97,105]);
Base64.encode(latin);             // ZGFua29nYWk=
Base64.btoa(latin);               // ZGFua29nYWk=
Base64.btoa(utf8);                // raises exception
Base64.fromUint8Array(u8s);       // ZGFua29nYWk=
Base64.fromUint8Array(u8s, true); // ZGFua29nYW which is URI safe
Base64.encode(utf8);              // 5bCP6aO85by+
Base64.encode(utf8, true)         // 5bCP6aO85by-
Base64.encodeURI(utf8);           // 5bCP6aO85by-
```

## [json-bigint](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/json-bigint)

==功能==： Native Bigint是最近添加到JS的，因此我们添加了一个利用它的选项，而不是bignumber.js。但是，使用本机BigInt进行解析仍然是向后兼容的选项。

```js
var JSONbig = require('json-bigint');
 
var json = '{ "value" : 9223372036854775807, "v2": 123 }';
console.log('Input:', json);
console.log('');
 
console.log('node.js built-in JSON:');
var r = JSON.parse(json);
console.log('JSON.parse(input).value : ', r.value.toString());
console.log('JSON.stringify(JSON.parse(input)):', JSON.stringify(r));
 
console.log('\n\nbig number JSON:');
var r1 = JSONbig.parse(json);
console.log('JSONbig.parse(input).value : ', r1.value.toString());
console.log('JSONbig.stringify(JSONbig.parse(input)):', JSONbig.stringify(r1));
```

## [vuejs-datetimepicker](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/vuejs-datetimepicker)

==功能==：

```bash
npm install vuejs-datetimepicker
```
```html
<template>
    <datetime format="MM/DD/YYYY" width="300px" v-model="val"></datetime>
</template>
 
<script>
import datetime from 'vuejs-datetimepicker';
 
export default {
    components: { datetime }
};
</script> 
```

## [vue-meta-info](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/vue-meta-info)

==功能==：基于Vue 2.0 的单页面 meta info 管理.

```html
<template>
  ...
</template>
 
<script>
  export default {
    metaInfo: {
      title: 'My Example App', // set a title
      meta: [{                 // set meta
        name: 'keyWords',
        content: 'My Example App'
      }]
      link: [{                 // set link
        rel: 'asstes',
        href: 'https://assets-cdn.github.com/'
      }]
    }
  }
</script>
```

## [vue-smooth-scroll](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/vue-smooth-scroll)

==功能==：Scroll

```js
npm install --save vue-smooth-scroll

import vueSmoothScroll from 'vue-smooth-scroll'
Vue.use(vueSmoothScroll)
```

## [prismjs](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/prismjs)

==功能==：Prism是一个轻量，健壮，优雅的语法高亮库。这是Dabblet的衍生项目。

## [vuex-persistedstate](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/vuex-persistedstate)

==功能==：

```js
npm install --save vuex-persistedstate


import createPersistedState from 'vuex-persistedstate';
import * as Cookies from 'js-cookie';
import cookie from 'cookie';
 
export default ({ store, req }) => {
    createPersistedState({
        paths: [...],
        storage: {
            getItem: (key) => {
                // See https://nuxtjs.org/guide/plugins/#using-process-flags
                if (process.server) {
                    const parsedCookies = cookie.parse(req.headers.cookie);
                    return parsedCookies[key];
                } else {
                    return Cookies.get(key);
                }
            },
            // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
            setItem: (key, value) =>
                Cookies.set(key, value, { expires: 365, secure: false }),
            removeItem: key => Cookies.remove(key)
        }
    })(store);
};
```

## [vue-slider-component](https://link.zhihu.com/?target=https%3A//github.com/NightCatSama/vue-slider-component/blob/master/README-CN.md)

==功能==：一个高度定制化的滑块组件

```bash
$ yarn add vue-slider-component
# npm install vue-slider-component --save
```
```html
<template>
  <vue-slider v-model="value" />
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

export default {
  components: {
    VueSlider
  },
  data () {
    return {
      value: 0
    }
  }
}
</script>
```

## [CodeMirror](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/codemirror)

==功能==：CodeMirror是使用JavaScript为浏览器实现的多功能文本编辑器。它专门用于编辑代码，并具有100多种语言模式和各种插件，可实现更高级的编辑功能。每种语言都带有功能齐全的代码和语法高亮显示，以帮助阅读和编辑复杂代码。

## [vue-codemirror](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/vue-codemirror)

==功能==：

```html
<codemirror
        ref="editQuerySQL"
        @ready="onCodemirrorReady"
        @input="onCodemirrorInput"
        v-model="query.sql"
        :options="cmOptions"
      ></codemirror>
```

```js   
import { codemirror } from 'vue-codemirror';
import { getEthdb } from '@/api';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/idea.css';
// import 'codemirror/theme/base16-dark.css';
import 'codemirror/theme/panda-syntax.css';
import 'codemirror/addon/hint/show-hint.css';

import 'codemirror/lib/codemirror';
import 'codemirror/mode/sql/sql';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/sql-hint';

        
export default {
    data(){
        retrun {
            query: {
                sql: 'SELECT * FROM ethblock LIMIT 200',
             },
              cmOptions: {
                scroll: false,
                tabSize: 4,
                lineNumbers: false,
                line: false,
                indentWithTabs: true,
                smartIndent: true,
                autofocus: false,
                mode: 'text/x-mariadb',
                theme: 'idea',
                hintOptions: {
                  completeSingle: false,
                },
              },
        }
    },
    methods:{
     onCodemirrorReady(cm) {
      cm.on('keypress', () => {
        cm.showHint();
      });
    },
     onCodemirrorInput(newQuery) {
      this.query.sql = newQuery;
    },
    }
    
    
}
```

## [portfinder](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/portfinder) || [get-port](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/get-port) node

==功能==：端口查看器

```js
[sudo] npm install portfinder



portfinder.getPort({
    port: 3000,    // minimum port
    stopPort: 3333 // maximum port
}, callback);
```

## [regedit](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/regedit) node

==功能==：使用node.js和Windows脚本宿主对Windows注册表进行读取，写入，列出和处理各种时髦的事情。

## [lowdb](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/lowdb)

==功能==：适用于Node，Electron和浏览器的小型JSON数据库。由Lodash驱动。 ⚡️

```js
// npm install lowdb
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json')
const db = low(adapter)
 
// Set some defaults
db.defaults({ posts: [], user: {} })
  .write()
 
// Add a post
db.get('posts')
  .push({ id: 1, title: 'lowdb is awesome'})
  .write()
 
// Set a user using Lodash shorthand syntax
db.set('user.name', 'typicode')
  .write()
```

## [cheerio](https://link.zhihu.com/?target=https%3A//github.com/cheeriojs/cheerio/wiki/Chinese-README) node

==功能==：为服务器特别定制的，快速、灵活、实施的jQuery核心实现. 爬虫

```js
npm install cheerio
const cheerio = require('cheerio');
const $ = cheerio.load('<h2 class="title">Hello world</h2>');

$('h2.title').text('Hello there!');
$('h2').addClass('welcome');

$.html();
//=> <html><head></head><body><h2 class="title welcome">Hello there!</h2></body></html>
```

## [libxmljs](https://link.zhihu.com/?target=https%3A//github.com/libxmljs/libxmljs/wiki)

==功能==：解析xml

## [node-fetch](https://link.zhihu.com/?target=https%3A//github.com/node-fetch/node-fetch)、 [got](https://link.zhihu.com/?target=https%3A//github.com/sindresorhus/got%23readme) node

==功能==：node-ajax

## [ora](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/ora) node

==功能==：优雅的终端旋转器

```js
const ora = require('ora');
 
const spinner = ora('Loading unicorns').start();
 
setTimeout(() => {
    spinner.color = 'yellow';
    spinner.text = 'Loading rainbows';
}, 1000);
```

## [node-mkdirp](https://link.zhihu.com/?target=https%3A//github.com/substack/node-mkdirp) 、[rimraf](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/rimraf) node

==功能==：Like mkdir -p UNIX 命令 rm-rf . nodejs 新建创建文件

```js
var mkdirp = require('mkdirp');
    
mkdirp('/tmp/foo/bar/baz', function (err) {
    if (err) console.error(err)
    else console.log('pow!')
});
```

## [shelljs](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/shelljs)

==功能==：hellJS是在Node.js API之上的Unix shell命令的可移植（Windows / Linux / OS X）实现。您可以使用它消除shell脚本对Unix的依赖，同时仍然保留其熟悉而强大的命令。您还可以全局安装它，以便可以从Node项目外部运行它-告别那些讨厌的Bash脚本！

```js
var shell = require('shelljs');
 
if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}
 
// Copy files to release dir
shell.rm('-rf', 'out/Release');
shell.cp('-R', 'stuff/', 'out/Release');
 
// Replace macros in each .js file
shell.cd('lib');
shell.ls('*.js').forEach(function (file) {
  shell.sed('-i', 'BUILD_VERSION', 'v0.1.2', file);
  shell.sed('-i', /^.*REMOVE_THIS_LINE.*$/, '', file);
  shell.sed('-i', /.*REPLACE_LINE_WITH_MACRO.*\n/, shell.cat('macro.js'), file);
});
shell.cd('..');
```

## [shx](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/shx)

==功能==：Shx 是一个包装 ShellJS Unix 命令的包装器，为 npm 包脚本中简单的类 Unix 跨平台命令提供了一个简单的解决方案

- ShellJS: Good for writing long scripts, all in JS, running via NodeJS (e.g. node myScript.js).
- shx: Good for writing one-off commands in npm package scripts (e.g. "clean": "shx rm -rf out/").

```js
npm install shx --save-dev

package.json:
{
  "scripts": {
    "clean": "shx rm -rf build dist && shx echo Done"
  }
}
```

## [node-ssh](https://link.zhihu.com/?target=https%3A//github.com/steelbrain/node-ssh%23readme)

==功能==：Node-SSH 是 ssh2的一个非常轻量级的 Promise 包装器。

## [chalk](https://link.zhihu.com/?target=https%3A//github.com/chalk/chalk)

==功能==： 给终端嵌套您想要的样式。

```js
const chalk = require('chalk');
const log = console.log;

// Combine styled and normal strings
log(chalk.blue('Hello') + ' World' + chalk.red('!'));

// Compose multiple styles using the chainable API
log(chalk.blue.bgRed.bold('Hello world!'));

// Pass in multiple arguments
log(chalk.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz'));

// Nest styles
log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));

// Nest styles of the same type even (color, underline, background)
log(chalk.green(
    'I am a green line ' +
    chalk.blue.underline.bold('with a blue substring') +
    ' that becomes green again!'
));
```

## [Nzh](https://link.zhihu.com/?target=https%3A//blog.whyoop.com/nzh/docs/%23/)

==功能==：适用于需要转换阿拉伯数字与中文数字的场景。
特点如下:

- 以字符串的方式转换，没有超大数及浮点数等问题(请自行对原数据进行四舍五入等操作)
- 支持科学记数法字符串的转换
- 支持口语化
- 支持自定义转换(不论是兆,京还是厘都可以用)
- 对超大数支持用争议教少的万万亿代替亿亿
- 当然,你还可以把中文数字再转回阿拉伯数字

```js
npm install nzh --save
var Nzh = require("nzh");
var nzhcn = require("nzh/cn"); //直接使用简体中文
var nzhhk = require("nzh/hk"); //繁体中文
var nzhcn = Nzh.cn;                 // 使用简体中文,  另外有 Nzh.hk -- 繁体中文

nzhcn.encodeS(100111);              // 转中文小写 >> 十万零一百一十一
nzhcn.encodeB(100111);              // 转中文大写 >> 壹拾万零壹佰壹拾壹
nzhcn.encodeS("1.23456789e+21");    // 科学记数法字符串 >> 十二万三千四百五十六万万七千八百九十万亿
nzhcn.toMoney("100111.11");         // 转中文金额 >> 人民币壹拾万零壹佰壹拾壹元壹角壹分
```

## [decko](https://link.zhihu.com/?target=https%3A//github.com/developit/decko)

节流 防抖
[https://blog.csdn.net/qq_2955...](https://link.zhihu.com/?target=https%3A//blog.csdn.net/qq_29557739/article/details/96430431)

==功能==：三个最有用的装饰器的简洁实现：

- @bind：this在方法内使常量的值
- @debounce：限制对方法的调用
- @memoize：根据参数缓存返回值

```js
npm i -S decko
```

## [p-queue](https://link.zhihu.com/?target=https%3A//github.com/sindresorhus/p-queue%23readme)

==功能==：对限制速率的异步（或同步）操作很有用。例如，在与REST API交互时或在执行CPU /内存密集型任务时。

```js
const {default: PQueue} = require('p-queue');
const got = require('got');

const queue = new PQueue({concurrency: 1});

(async () => {
    await queue.add(() => got('https://sindresorhus.com'));
    console.log('Done: sindresorhus.com');
})();

(async () => {
    await queue.add(() => got('https://avajs.dev'));
    console.log('Done: avajs.dev');
})();

(async () => {
    const task = await getUnicornTask();
    await queue.add(task);
    console.log('Done: Unicorn task');
})();
```

## [sleep](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/sleep)

==功能==：sleep

```js
npm i sleep

var sleep = require('sleep');
function msleep(n) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}
function sleep(n) {
  msleep(n*1000);
}
```

## [delay](https://link.zhihu.com/?target=https%3A//github.com/sindresorhus/delay%23readme)

==功能==：将承诺推迟一定的时间

```js
npm install delay
const delay = require('delay');

(async () => {
    bar();

    await delay(100);

    // Executed 100 milliseconds later
    baz();
})();
```

## [better-scroll](https://link.zhihu.com/?target=https%3A//github.com/ustbhuangyi/better-scroll)

==功能==：BetterScroll 是一款重点解决移动端（已支持 PC）各种滚动场景需求的插件。它的核心是借鉴的 iscroll 的实现，它的 API 设计基本兼容 iscroll，在 iscroll 的基础上又扩展了一些 feature 以及做了一些性能优化。

```js
https://better-scroll.github.io/docs/zh-CN/guide/#betterscroll-%E6%98%AF%E4%BB%80%E4%B9%88
```

## [create-keyframe-animation](https://link.zhihu.com/?target=https%3A//github.com/HenrikJoreteg/create-keyframe-animation)

==功能==：使用JavaScrip在浏览器中动态生成CSS关键帧动画（不维护了）

## [vconsole](https://link.zhihu.com/?target=https%3A//github.com/Tencent/vConsole/blob/HEAD/README_CN.md)

==功能==：一个轻量、可拓展、针对手机网页的前端开发者调试面板。

```js
<script src="path/to/vconsole.min.js"></script>
<script>
  // 初始化
  var vConsole = new VConsole();
  console.log('Hello world');
</script>
```

> 原作者姓名：ZHUIMEN
> 原出处：segmentfault
> 原文链接：[几个常用js库，别再重复造轮子了_泥瓦工 - SegmentFault 思否](https://link.zhihu.com/?target=https%3A//segmentfault.com/a/1190000038589634)





## **JavaScript 库**

- [Particles.js](https://link.zhihu.com/?target=http%3A//vincentgarreau.com/particles.js/) - 一个用于在网页上创建漂亮的浮动粒子的 JS 库；
- [Three.js](https://link.zhihu.com/?target=https%3A//threejs.org/) - 用于在网页上创建 3D 物体与空间的 JS 库；
- [Fullpage.js](https://link.zhihu.com/?target=https%3A//alvarotrigo.com/fullPage/%23firstPage) - 易于实现全屏滚动功能的库；
- [Typed.js](https://link.zhihu.com/?target=http%3A//www.mattboldt.com/demos/typed-js/) - 实现打字机效果；
- [Waypoints.js](https://link.zhihu.com/?target=http%3A//imakewebthings.com/waypoints/) - 滚动到元素触发事件的库；
- [Highlight.js](https://link.zhihu.com/?target=https%3A//highlightjs.org/) - 页面上语法高亮显示；
- [Chart.js](https://link.zhihu.com/?target=http%3A//www.chartjs.org/) - 纯 JS 制作漂亮的图表；
- [Instantclick](https://link.zhihu.com/?target=http%3A//instantclick.io/) - 鼠标悬停预先加载页面资源，大大加速你的网站响应速度；
- [Chartist](https://link.zhihu.com/?target=http%3A//gionkunz.github.io/chartist-js/index.html) - 开源响应式图表库；
- [Motio](https://link.zhihu.com/?target=http%3A//darsa.in/motio/%23!introduction) - 基于 sprite 的动画和平移库；
- [Animstion](https://link.zhihu.com/?target=http%3A//git.blivesta.com/animsition/) - 页面切换动画的 jQuery 插件；
- [Barba.js](https://link.zhihu.com/?target=https%3A//github.com/luruke/barba.js) - 创建页面间流畅平滑的过渡效果；
- [TwentyTwenty](https://link.zhihu.com/?target=http%3A//zurb.com/playground/twentytwenty) - jQuery 视差插件；
- [Vivus.js](https://link.zhihu.com/?target=https%3A//github.com/maxwellito/vivus%23vivusjs) - 可以执行 SVG 路径动画的轻量级 JS 库；
- [Wow.js](https://link.zhihu.com/?target=http%3A//mynameismatthieu.com/WOW/) - 页面滚动时展现动画效果；
- [Scrolline.js](https://link.zhihu.com/?target=https%3A//github.com/anthonyly/Scrolline.js) - 页面滚动时显示滚动进度的 jQuery 插件；
- [Velocity.js](https://link.zhihu.com/?target=http%3A//velocityjs.org/) - 用于加速 JavaScript 动画；
- [Animate on scroll](https://link.zhihu.com/?target=http%3A//michalsnik.github.io/aos/) - 页面滚动时增添元素动画的小型库；
- [Handlebars.js](https://link.zhihu.com/?target=http%3A//handlebarsjs.com/) - JavaScript 模板引擎；
- [jInvertScroll](https://link.zhihu.com/?target=http%3A//www.pixxelfactory.net/jInvertScroll/) - 轻量级的 jQuery 水平视差插件；
- [One page scroll](https://link.zhihu.com/?target=https%3A//github.com/peachananr/onepage-scroll) - 实现苹果风格单页滚动效果的 jQuery 插件；
- [Parallax.js](https://link.zhihu.com/?target=https%3A//github.com/wagerfield/parallax) - 轻量级的视差引擎，能够对智能设备的方向作出反应；
- [Typeahead.js](https://link.zhihu.com/?target=http%3A//twitter.github.io/typeahead.js/) - 搜索框自动补全的 JS 库；
- [Dragdealer.js](https://link.zhihu.com/?target=http%3A//skidding.github.io/dragdealer/) - 基于拖动的 JavaScript 组件；
- [Bounce.js](https://link.zhihu.com/?target=http%3A//bouncejs.com/) - 快速创建漂亮的 CSS3 动画效果；
- [Pagepiling.js](https://link.zhihu.com/?target=https%3A//github.com/alvarotrigo/pagePiling.js) - 创建全屏滚动效果；
- [Multiscroll.js](https://link.zhihu.com/?target=https%3A//github.com/alvarotrigo/multiscroll.js) - 创建两列垂直反向滚动效果的 jQuery 插件；
- [Favico.js](https://link.zhihu.com/?target=http%3A//lab.ejci.net/favico.js/) - 动态图标插件；
- [Midnight.js](https://link.zhihu.com/?target=http%3A//aerolab.github.io/midnight.js/) - 固定头部切换效果；
- [Anime.js](https://link.zhihu.com/?target=http%3A//animejs.com/) - JavaScript 动画引擎；
- [Keycode](https://link.zhihu.com/?target=http%3A//keycode.info/) - 获取键盘按键的 JS 键码值；
- [Sortable](https://link.zhihu.com/?target=http%3A//rubaxa.github.io/Sortable/) - 用于拖拽排序的 JavaScript 库；
- [Flexdatalist](https://link.zhihu.com/?target=http%3A//projects.sergiodinislopes.pt/flexdatalist/) - 支持 <datalist> 的 jQuery 自动完成插件；
- [Slideout.js](https://link.zhihu.com/?target=https%3A//slideout.js.org/) - 实现滑出式 Web App 导航菜单；
- [Jquerymy](https://link.zhihu.com/?target=http%3A//jquerymy.com/%23/) - 实时、复杂的双向数据绑定 jQuery 插件；
- [Cleave.js](https://link.zhihu.com/?target=http%3A//nosir.github.io/cleave.js/) - 自动格式化表单输入框的文本内容；
- [Page](https://link.zhihu.com/?target=http%3A//smalljs.org/client-side-routing/page/) - 构建单页应用的小型客户端路由库；
- [Selectize.js](https://link.zhihu.com/?target=http%3A//selectize.github.io/selectize.js/) - 基于 jQuery 的 <select> UI 控件，用于创建 tag 标签输入框和 select 下拉框；
- [Nice select](https://link.zhihu.com/?target=http%3A//hernansartorio.com/jquery-nice-select/) - 创建漂亮下拉框的 jQuery 插件；
- [Tether](https://link.zhihu.com/?target=http%3A//tether.io/) - 使用绝对定位创建两个互相相关元素的 JS 库；
- [Shepherd.js](https://link.zhihu.com/?target=https%3A//github.com/HubSpot/shepherd) - 创建新手引导的 JS 库；
- [Tooltip](https://link.zhihu.com/?target=https%3A//github.com/HubSpot/tooltip) - 工具提示插件；
- [Select2](https://link.zhihu.com/?target=https%3A//select2.github.io/) - 基于 jQuery 的替代选择框；
- [IziToast](https://link.zhihu.com/?target=http%3A//izitoast.marcelodolce.com/) - 轻量的跨浏览器响应式消息通知插件；
- [IziModal](https://link.zhihu.com/?target=http%3A//izimodal.marcelodolce.com/) - 炫酷的 jQuery 模态窗口插件。

------

## **CSS 库与设计资源**

- [Animate.css](https://link.zhihu.com/?target=https%3A//daneden.github.io/animate.css/)  - 强大的 CSS3 动画库；
- [Flat UI Colors](https://link.zhihu.com/?target=https%3A//flatuicolors.com/) - 漂亮的扁平化配色；
- [Material Design Lite](https://link.zhihu.com/?target=https%3A//getmdl.io/index.html) - 基于谷歌 Material Design 的前端框架；
- [Colorrrs](https://link.zhihu.com/?target=https%3A//www.webpagefx.com/web-design/random-color-picker/)  - 随机颜色生成器；
- [Section separators](https://link.zhihu.com/?target=https%3A//tympanus.net/Development/SectionSeparators/) - CSS 区域分割；
- [Topcoat](https://link.zhihu.com/?target=http%3A//topcoat.io/) - 专注为简洁、快速的 Web 应用提供 CSS 开发的工具；
- [Create Ken Burns Effect](https://link.zhihu.com/?target=https%3A//www.kirupa.com/html5/ken_burns_effect_css.htm) - 利用 CSS3 实现的 Ken burns 特效；
- [DynCSS](https://link.zhihu.com/?target=http%3A//www.vittoriozaccaria.net/dyn-css/) - 用于分析 CSS -dyn-属性规则，并使其具备动态属性；
- [Magic animations](https://link.zhihu.com/?target=https%3A//www.minimamente.com/example/magic_animations/) - 具备特殊动效的 CSS3 动画；
- [CSSpin](https://link.zhihu.com/?target=https%3A//webkul.github.io/csspin/) - 丰富的 CSS 加载动画；
- [Feather icons](https://link.zhihu.com/?target=https%3A//feathericons.com/) - 简单、漂亮的开源图标库；
- [Ion icons](https://link.zhihu.com/?target=http%3A//ionicons.com/) - 专为 Ionic 框架设计的图标字体；
- [Font Awesome](https://link.zhihu.com/?target=http%3A//fontawesome.io/) - 可缩放的矢量图标字库；
- [Font Generator](https://link.zhihu.com/?target=http%3A//brandmark.io/font-generator/) - 在线字体生成器；
- [On/Off FlipSwitch](https://link.zhihu.com/?target=https%3A//proto.io/freebies/onoff/) - 在线创建纯 CSS3 动画开关效果；
- [UIkit](https://link.zhihu.com/?target=https%3A//getuikit.com/) - 轻量级的模块化前端框架；
- [Bootstrap](https://link.zhihu.com/?target=http%3A//getbootstrap.com/) - 著名的前端框架；
- [Foundation](https://link.zhihu.com/?target=http%3A//foundation.zurb.com/) - 著名的前端框架。

------

## **有用的产品/链接**

- [ Cheatsheet](https://link.zhihu.com/?target=https%3A//github.com/joshbuchea/HEAD) - 可以写入到 <head> 标签的内容清单；（译者注：中文翻译版[地址](https://link.zhihu.com/?target=http%3A//www.css88.com/archives/8052)）
- [Ghost](https://link.zhihu.com/?target=https%3A//ghost.org/) - 基于 Node.js 的简易博客平台；
- [What runs](https://link.zhihu.com/?target=https%3A//www.whatruns.com/) - 用于网站技术分析的 Chrome 插件；
- [Learn anything](https://link.zhihu.com/?target=https%3A//learn-anything.xyz/learn-anything) - 用于分解项目的强大思维导图。



没有吧，Vue 和 React 等主流框架的源码我基本都没读过，越好的框架越不需要使用者特地去读。

但对于和 JS 相关的源码阅读，那肯定是工作里绕不开的。个人印象里比较深的有这些：

- 读 Node.js 和 Txiki 运行时的源码，参考它们的方式调 libuv 来搭 JS 的 event loop。
- 读 Skia 配套的 canvas2dcontext.js 源码，照着用 C++ 实现 Canvas 的 eclipse 方法。
- 读 QuickJS 配套的 quickjs-libc 源码，照着实现对 JS 原生 class 的封装。
- 读 Flutter Tool 的源码，把它调 Dart 编译服务的参数扒出来，编译出二进制 AST 文件自己用。
- 读 Three 的源码，学着它引入 WeakMap 解决纹理资源管理的问题。
- 读 Slate 富文本框架的源码，修它 IME 和选区的 bug（太多了修不完）。
- 读 Pica（基于 lanczos 的图片缩放库）的源码，解决它处理特殊尺寸图片报错的问题。
- 读 PBR 标准的 shader 源码，照着定制 3D 文字的渲染算法。
- 读 Photopea 的 shader 源码（需要 monkey-patch 一下），看它是怎么在 WebGL 和 canvas 之间无缝切换的。

读这些源码的经历，都源于实际需求中的需要。我其实并没有靠读源码精通上面任何一个项目，但可以用它们解决遇到的问题，这就够了。

对于源码，个人还是倾向于「一定要会读，但能不读就不读」。**对于常见生态足够好的开源项目，教程、示例、设计文档和 issue 讨论足够解决大多数使用层面上的问题。如果想高效学习技术，一定要尽可能找到最高层面，最易于理解的信息源**。比如对于和 Chromium、V8 等谷歌系项目深度绑定的 Ninja 构建系统，我之前一直搞不懂它为什么要做成那样，直到偶然读到作者自述的[设计理念](https://link.zhihu.com/?target=http%3A//aosabook.org/en/posa/ninja.html)以后，一下就豁然开朗了。这比上来就翻它的源码然后苦思冥想地倒推「这玩意到底想干嘛」要直接而方便得多。

毕竟某种程度上，读源码也是一种逆向工程，只应该在必要的时候去做。

另外，对于现在社区《XX 框架源码解析》类文章的盛行，个人觉得意义不大，甚至可能有反作用。譬如对于一个刚刚学会做高仿百度主页的小白，如果他既缺乏目标又缺乏工程基础，就跟风式地跑去效仿「大牛」读 V8 的源码，最终大概率只是对着一堆「XX 源码分析」的文章增长信息焦虑，这不是很叶公好龙吗？

（这种文章可以批量制造，只要把调用栈经过的代码复制出来，然后把注释翻译成中文就行了。相比之下，个人觉得更应该科普「如何高效上手调试」之类接地气的基础技能，让大家都觉得这些项目我也改得动）

说到底，并没有什么必须看的代码，只有你特别想解决的问题。如果解决这个问题需要你看源码，那么看就是了。



## **js常用工具类**

![](https://pic4.zhimg.com/50/v2-330d09197f23186f09a2ce9adb530555_hd.jpg?source=1940ef5c)![img](https://pic4.zhimg.com/80/v2-330d09197f23186f09a2ce9adb530555_1440w.jpg?source=1940ef5c)

1. **lodash** 一个一致性、模块化、高性能的 JavaScript 实用工具库。
2. **ramda** 一个很重要的库，提供了许多有用的方法，每个 JavaScript 程序员都应该掌握这个工具
3. **day.js** 一个轻量的处理时间和日期的 JavaScript 库，和 Moment.js 的 API 设计保持完全一样, 体积只有2kb
4. **big.js** 一个小型，快速的JavaScript库，用于任意精度的十进制算术运算
5. **qs** 一个 url参数转化 (parse和stringify)的轻量级js库
6. **decimal.js** 实现JavaScript的任意精度的十进制类型库

## **dom库**

![img](https://pic4.zhimg.com/50/v2-8528c586b2ee93ce8218463c9beb0f4f_hd.jpg?source=1940ef5c)![img](https://pic4.zhimg.com/80/v2-8528c586b2ee93ce8218463c9beb0f4f_1440w.jpg?source=1940ef5c)

1. **JQuery** 封装了各种dom/事件操作, 设计思想值得研究借鉴
2. **zepto** jquery的轻量级版本, 适合移动端操作
3. **fastclick** 一个简单易用的库，它消除了移动端浏览器上的物理点击和触发一个 click 事件之间的 300ms 的延迟。目的就是在不干扰你目前的逻辑的同时，让你的应用感觉不到延迟，反应更加灵敏。

## **文件处理**

![img](https://pic4.zhimg.com/50/v2-8b6e0b53c51862311c45783b906ac57e_hd.jpg?source=1940ef5c)![img](https://pic4.zhimg.com/80/v2-8b6e0b53c51862311c45783b906ac57e_1440w.jpg?source=1940ef5c)

1. **file-saver** 一个在客户端保存文件的解决方案，非常适合在客户端上生成文件的Web应用程序
2. **js-xlsx** 一个强大的解析和编写excel文件的库

## **网络请求**

![img](https://pic2.zhimg.com/50/v2-179d7d207e9e79e5821c0255c8a968cc_hd.jpg?source=1940ef5c)![img](https://pic2.zhimg.com/80/v2-179d7d207e9e79e5821c0255c8a968cc_1440w.jpg?source=1940ef5c)

1. **Axios** 一个基于 Promise 的 HTTP 库，可用在 Node.js 和浏览器上发起 HTTP 请求，支持所有现代浏览器，甚至包括 IE8+
2. **Superagent** 基于Ajax的优化, 可以与 Node.js HTTP 客户端搭配使用
3. **fly.js** 一个基于promise的http请求库, 可以用在node.js, Weex, 微信小程序, 浏览器, React Native中

## **动画库**

![img](https://pic2.zhimg.com/50/v2-30476b970a975e3a0d76134b275bf31a_hd.jpg?source=1940ef5c)![img](https://pic2.zhimg.com/80/v2-30476b970a975e3a0d76134b275bf31a_1440w.jpg?source=1940ef5c)

1. **Anime.js** 一个JavaScript动画库，可以处理CSS属性，单个CSS转换，SVG或任何DOM属性以及JavaScript对象
2. **Velocity** 一个高效的 Javascript 动画引擎，与jQuery的 $.animate() 有相同的API, 同时还支持彩色动画、转换、循环、画架、SVG支持和滚动等效果
3. **Vivus** 一个零依赖的JavaScript动画库，可以让我们用SVG制作动画，使其具有被绘制的外观
4. **GreenSock JS** 一个JavaScript动画库，用于创建高性能、零依赖、跨浏览器动画，已在超过400万个网站上使用, 并且可以在React、Vue、Angular项目中使用
5. **Scroll Reveal** 零依赖，为 web 和移动浏览器提供了简单的滚动动画，以动画的方式显示滚动中的内容
6. **Kute.js** 一个强大高性能且可扩展的原生JavaScript动画引擎，具有跨浏览器动画的基本功能
7. **Typed.js** 一个轻松实现打字效果的js插件
8. **fullPage.js** 一个可轻易创建全屏滚动网站的js滚动动画库, 兼容性无可替代
9. **iscroll** 移动端使用的一款轻量级滚动插件

## **鼠标/键盘相关**

![img](https://pic4.zhimg.com/50/v2-914a4386cf50fdf08af8f3e9b188e15e_hd.jpg?source=1940ef5c)![img](https://pic4.zhimg.com/80/v2-914a4386cf50fdf08af8f3e9b188e15e_1440w.jpg?source=1940ef5c)

1. **KeyboardJS** 一个在浏览器中使用的库（与node.js兼容）.它使开发人员可以轻松设置键绑定和使用组合键来设置复杂的绑定.
2. **SortableJS** 功能强大的JavaScript 拖拽库

## **图形/图像处理库**

![img](https://pic4.zhimg.com/50/v2-bc9e8a4d82a549168f6d145db5ee9a41_hd.jpg?source=1940ef5c)![img](https://pic4.zhimg.com/80/v2-bc9e8a4d82a549168f6d145db5ee9a41_1440w.jpg?source=1940ef5c)

1. **html2canvas** 一个强大的使用js开发的浏览器网页截图工具
2. **dom-to-image** 一个可以将任意DOM节点转换为用JavaScript编写的矢量（SVG）或光栅（PNG或JPEG）图像的库
3. **pica** 一个在浏览器中调整图像大小，而不会出现像素失真，处理速度非常快的图片处理库
4. **Lena.js** 一个轻量级的可以给你图像加各种滤镜的js库
5. **Compressor.js** 一个使用本地canvas.toBlob API进行图像有损压缩的js库
6. **Fabric.js** 一个易于使用的基于HTML5 canvas元素的图片编辑器
7. **merge-images** 一个将多张图片合并成一张图的js插件
8. **cropperjs** 一款强大的图片裁切库, 支持灵活的图片裁切方式
9. **Grade** 一个基于图像中的前2种主要颜色生成互补渐变背景的库

以上这些js库不必每一样都去了解和深究, 技术都是为业务服务的, 所以我们按需使用和学习即可. 至于像react或者vue这种框架的相关生态, 笔者这里就不一一介绍了, 官网文档上都有非常详细的生态集, 感兴趣的朋友自行了解即可. 最后附上一个前端学习路线图, 希望能对大家有所帮助:

![img](https://pic1.zhimg.com/50/v2-adf6b8d1662b7357e499e2bc51116d19_hd.jpg?source=1940ef5c)![img](https://pic1.zhimg.com/80/v2-adf6b8d1662b7357e499e2bc51116d19_1440w.jpg?source=1940ef5c)

笔者今天继续追加常用的js库.

**表单校验**

1. **Validator.js** 一个强大的js表单校验库, github地址: [https://github.com/validatorjs/validator.js](https://link.zhihu.com/?target=https%3A//github.com/validatorjs/validator.js)
2. **Validate.js** 致力于提供一种验证数据的跨框架和跨语言方式的js库, 已通过100％代码覆盖率的单元测试 github地址: [https://github.com/ansman/validate.js](https://link.zhihu.com/?target=https%3A//github.com/ansman/validate.js)

**表单表格**

1. **x-spreadsheet** 一个基于web的简单易用的表格插件 github: [https://github.com/myliang/x-spreadsheet](https://link.zhihu.com/?target=https%3A//github.com/myliang/x-spreadsheet)

**可视化搭建**

[H5-Dooring | 一个所见即所得的H5编辑器](https://link.zhihu.com/?target=https%3A//github.com/MrXujiang/h5-Dooring)



[阿里巴巴淘系技](https://www.zhihu.com/org/a-li-ba-ba-tao-xi-ji-zhu)

作者：阿里巴巴淘系技术
链接：https://www.zhihu.com/question/429436558/answer/1622427573
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



推荐一些我们日常工作常用的 JS 工具库，看了里面的实现细节，或许会感慨：**得亏有了它们，不然要实现这类功能得「多累」呀！**

（点击头像关注我们，看更多阿里工程师推荐干货）

——————————————————————————————————————

读源码还是一个目的性比较强的行为，对于工具库来说，可以学习实现某项功能的技巧；对于大型项目来说，可以学习其整体的工程和架构模式。



\- 工具类：

[Lodashlodash.com](https://link.zhihu.com/?target=https%3A//lodash.com/)

\- 时间操作：

[Moment.js | Homemomentjs.com](https://link.zhihu.com/?target=https%3A//momentjs.com/)

\- 数学计算：

[an extensive math library for JavaScript and Node.jsmathjs.org](https://link.zhihu.com/?target=https%3A//mathjs.org/)

\- 日志库：

[eggjs/egg-loggergithub.com](https://link.zhihu.com/?target=https%3A//github.com/eggjs/egg-logger)

\- 执行命令：

[sindresorhus/execagithub.com](https://link.zhihu.com/?target=https%3A//github.com/sindresorhus/execa)



淘系前端也有一些开源的代码仓库，如果大家对下面的一些领域感兴趣，我们在这方面的实现也可以作为参考和学习交流：



\- 渐进式 React 研发框架：

[alibaba/icegithub.com](https://link.zhihu.com/?target=https%3A//github.com/alibaba/ice)

\- 微前端：

[ice-lab/icestarkgithub.com](https://link.zhihu.com/?target=https%3A//github.com/ice-lab/icestark)

\- React 应用的状态管理：

[ice-lab/icestoregithub.com](https://link.zhihu.com/?target=https%3A//github.com/ice-lab/icestore)

\- React 通用 Hooks: 

[alibaba/hooksgithub.com](https://link.zhihu.com/?target=https%3A//github.com/alibaba/hooks)

\- VS Code 套件：

[ice-lab/iceworksgithub.com](https://link.zhihu.com/?target=https%3A//github.com/ice-lab/iceworks)



## 推荐10个很棒的 JS 库

虽然JavaScript本身很棒，但有它对应生态圈也很重要，这些圈会让 js 更好。开发人员在开始一个新的中等项目时经常喜欢重新写轮子，这是一个糟糕的策略，使用第三方库是有意义的。因为这样的库有明确的用途，有更长生成的迭代，如果遇到问题更容易找到解决方法，最主要的一点是提高开发效率，缩短开发周期。
这里并不是说我们每个项目都要使用第三方库。 在我们的职业生涯初期，最好自己能编写代码以进行学习。 但是在许多项目中，在有意义的地方使用库是一个不错的策略。
这里推荐 10 个 js 库，这些库都有很好的文档，也非常流行，并一直在维护中。

**1. Ramda**


**github:**[https://github.com/ramda/ramda](https://link.zhihu.com/?target=https%3A//github.com/ramda/ramda)
**文档：**[https://ramdajs.com/docs/](https://link.zhihu.com/?target=https%3A//ramdajs.com/docs/)
Ramda 是一个用于函数式编程的很酷的 JS 库，目前在GitHub上有18000个星星。JS 的一个优点是开发人员可以选择函数式编程还是面向对象编程。这两种方法各有利弊，但是如果你喜欢函数式编程，那么一定要看看Ramda。
主要功能是：

- 不变性和无副作用的函数
- 几乎所有的函数都是自动柯里化的
- 参数设置为Ramda函数，便于进行柯里化


**2. Lodash**


**github:** [https://github.com/lodash/lodash](https://link.zhihu.com/?target=https%3A//github.com/lodash/lodash)
**文档：** [https://lodash.com/](https://link.zhihu.com/?target=https%3A//lodash.com/)
**Lodash**仍然是最流行和最有用的 JS 库之一。它免去了处理字符串、数组、对象等的麻烦。目前它在GitHub上有43000颗星星。
有用的功能：

- 遍历字符串，对象和数组
- 创建复合函数
- 操作和测试值


**3. Moment**


**github:** [https://github.com/moment/moment](https://link.zhihu.com/?target=https%3A//github.com/moment/moment)
**文档：** [https://momentjs.com/](https://link.zhihu.com/?target=https%3A//momentjs.com/)
如果必须处理日期的操作、验证、解析或格式化，Moment可能是最好的 JS 库。它很轻，很完善，在GitHub上有43000多颗星，它可以在浏览器和Node.js中工作。
以下是一些有关**Moment**的示例：
moment().startOf('day').fromNow(); //8 hours ago moment('2019-15-11').isValid() //false moment('2019-02-21').isValid() //true

**4. Highlight.js**


**github:** [https://github.com/highlightj..](https://link.zhihu.com/?target=https%3A//github.com/highlightj..).
**文档：** [https://highlightjs.org/](https://link.zhihu.com/?target=https%3A//highlightjs.org/)
**Highlight.js** 是一个用于语法高亮显示的库，可在浏览器和服务器上使用。 它几乎可以与任何Markdown一起使用，并具有自动语言检测功能。
Highlight.js将在<pre> <code>标记之间搜索编程代码，尝试自动检测语言并突出显示语法。 它还支持不同的配色方案。
下面是一个用 JS 编写的代码片段和来自代码编辑器的公共主题的示例

![img](https://pic2.zhimg.com/50/v2-b57500be8809efab0c2751f6f0ac1d4a_hd.jpg?source=1940ef5c)![img](https://pic2.zhimg.com/80/v2-b57500be8809efab0c2751f6f0ac1d4a_1440w.jpg?source=1940ef5c)



**5. D3**


**github:** [https://github.com/d3/d3](https://link.zhihu.com/?target=https%3A//github.com/d3/d3)
**文档：** [https://d3js.org/](https://link.zhihu.com/?target=https%3A//d3js.org/)
**D3**是最流行的数据可视化库，目前在GitHub上有89,500星。 它使用Web标准，并利用现代浏览器的强大功能，使数据栩栩如生。

**6. Three.js**


**github:** [https://github.com/mrdoob/thr..](https://link.zhihu.com/?target=https%3A//github.com/mrdoob/thr..).
**文档：** [https://threejs.org/](https://link.zhihu.com/?target=https%3A//threejs.org/)
**Three.js**是出色的JS 3D库，它使用 WebGL 作为主要渲染器，但也支持其他渲染器，例如Canvas 2D，SVG和css3D。 它在GitHub上有58,000个Star，我们可以用它创建非常酷的东西。

**7. Voca**


**github:** [https://github.com/panzerdp/voca](https://link.zhihu.com/?target=https%3A//github.com/panzerdp/voca)
**文档：** [https://vocajs.com/](https://link.zhihu.com/?target=https%3A//vocajs.com/)
Voca是一个用于处理字符串的优秀 JS 库。目前在GitHub上有2,800颗星。我们可以使用它来操作字符串，如更改大小写、修剪、pad、slugify、latinise、截断、转义等。
其他功能包括：

- 完整的函数集，可操纵，chop，格式化，转义和查询字符串
- 易于阅读和搜索的文档
- 支持多种环境，例如 Chrome，Firefox，Node.js
- 100％的代码覆盖率，没有依赖性

[豌豆资源搜索网站](https://link.zhihu.com/?target=https%3A//55wd.com/)[https://55wd.com](https://link.zhihu.com/?target=https%3A//55wd.com) [广州vi设计公司](https://link.zhihu.com/?target=http%3A//www.maiqicn.com/)[http://www.maiqicn.com](https://link.zhihu.com/?target=http%3A//www.maiqicn.com)


**8. Immutable.js**


**github:** [https://github.com/immutable-..](https://link.zhihu.com/?target=https%3A//github.com/immutable-..).
**文档：** [https://immutable-js.github.i..](https://link.zhihu.com/?target=https%3A//immutable-js.github.i..).
使用不可变数据结构具有一些主要优点，例如简化了应用程序开发，无防御性拷贝以及高级缓存概念。
Immutable.js供了不变的数据结构，如列表，堆栈，映射，集合等。

**9. Hammer.js**


**github:** [https://github.com/hammerjs/h..](https://link.zhihu.com/?target=https%3A//github.com/hammerjs/h..).
**文档：** [http://hammerjs.github.io/](https://link.zhihu.com/?target=http%3A//hammerjs.github.io/)
Hammer.js是一个 JS 库，具有20,900个GitHub Stars，可为Web应用程序带来多点触摸手势。 它很小，没有任何依赖性，并且可以识别由触摸，鼠标或指针事件产生的手势。 默认情况下，它会添加用于点击，双击，滑动，按下等的识别器，但是您可以定义自己的此类识别器集。

**10. Leaflet**


**github:** [https://github.com/Leaflet/Le..](https://link.zhihu.com/?target=https%3A//github.com/Leaflet/Le..).
**文档：** [https://leafletjs.com/](https://link.zhihu.com/?target=https%3A//leafletjs.com/)
在创建移动友好的交互式地图时，Leaflet 是一个很棒的 JS 库。它是开源的，在GitHub上有26700个星星，非常轻量，并且拥有大多数开发人员需要的所有特性。
它可以在所有主流的移动和桌面平台上开箱即用，可以通过插件进行扩展，并且有一个文档良好的、简单的API。



## 参考链接

https://www.zhihu.com/question/429436558

https://hackernoon.com/67-useful-tools-libraries-and-resources-for-saving-your-time-as-a-web-developer-7d3fb8667030

https://zhuanlan.zhihu.com/p/38795426

https://segmentfault.com/a/1190000038589634

