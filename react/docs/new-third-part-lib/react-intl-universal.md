# react-intl-universal

[react-intl-universal](https://github.com/alibaba/react-intl-universal) is a React internationalization package developed by [Alibaba Group](http://www.alibabagroup.com/).


## Features

- 支持 React 框架
- 操作简单，3个主要API
- 数字日期货币时间可以支持不同地区
- Pluralize labels in strings（字符串中的标签复数）
- 支持翻译中传参、支持传入 HTML、支持 150 种语言
- 在浏览器和 node 环境下可以运行
- 语言数据支持嵌套的 JSON 格式



## Get Started

### Install

```
npm install react-intl-universal --save
```

### Basic Example

In the following example, we initialize `intl` with app locale data (`locales`) and determine which locale is used dynamically (`currentLocale`). Then use `intl.get(...)` to get the internationalized message. That's all. Pretty simple!

Note that you are not necessary to load all locale data, just load the current locale data on demand. Please refer the [example](https://github.com/alibaba/react-intl-universal/blob/master/examples/browser-example/src/App.js#L72-L88) for more detail.

应用程序的语言环境数据(locale)初始化intl，并确定动态使用哪个语言环境(currentLocale)。然后使用intl.get(…)来获取国际化消息。注意，不需要加载所有区域设置数据，只需根据需要加载当前区域设置数据。

```js
import intl from 'react-intl-universal';

// common locale data
require('intl/locale-data/jsonp/en.js');
require('intl/locale-data/jsonp/zh.js');

// app locale data
const locales = {
  "en-US": require('./locales/en-US.js'),
  "zh-CN": require('./locales/zh-CN.js'),
};

class App extends Component {

  state = {
    initDone: false
  }

  componentDidMount() {
    this.loadLocales();
  }

  loadLocales() {
    // init method will load CLDR locale data according to currentLocale
    // react-intl-universal is singleton, so you should init it only once in your app
    intl.init({
      currentLocale: 'en-US', // TODO: determine locale here
      locales,
    })
    .then(() => {
      // After loading CLDR locale data, start to render
	    this.setState({initDone: true});
    });
  }

  render() {
    return (
      this.state.initDone &&
      <div>
        {intl.get('SIMPLE')}
      </div>
    );
  }

}
```

### Message With Variables

If the message contains variables the `{variable_name}` is substituted directly into the string. In the example below, there are two variables `{name}` and `{where}`, the second argument representing the variables in `get` method are substituted into the string.

如果消息包含变量，{variable_name}将被直接替换到字符串中。在下面的例子中，有两个变量{name}和{where}，第二个参数表示get方法中的变量被替换到字符串中。

Locale data:

```
{ "HELLO": "Hello, {name}. Welcome to {where}!" }
```

JS code:

```
intl.get('HELLO', { name: 'Michael', where: 'China' })
// "Hello, Michael. Welcome to China!"
```

### Plural Form and Number Thousands Separators

Locale data:

```
{ "PHOTO": "You have {num, plural, =0 {no photos.} =1 {one photo.} other {# photos.}}" }
```

JS code:

```
intl.get('PHOTO', { num: 0 }); // "You have no photos."
intl.get('PHOTO', { num: 1 }); // "You have one photo."
intl.get('PHOTO', { num: 1000000 }); // "You have 1,000,000 photos."
```

Plural label supports standard [ICU Message syntax](http://userguide.icu-project.org/formatparse/messages).

Number thousands separators also varies according to the user's locale. According to this [document](https://docs.oracle.com/cd/E19455-01/806-0169/overview-9/index.html), United States use a period to indicate the decimal place. Many other countries use a comma instead.

### Display Currency

Locale data:

```
{ "SALE_PRICE": "The price is {price, number, USD}" }
```

JS code:

```
intl.get('SALE_PRICE', { price: 123456.78 }); // The price is $123,456.78
```

As mentioned, the locale data is in [ICU Message format](http://userguide.icu-project.org/formatparse/messages).

The syntax is {name, type, format}. Here is description:

- name is the variable name in the message. In this case, it's `price`.
- type is the type of value such as `number`, `date`, and `time`.
- format is optional, and is additional information for the displaying format of the value. In this case, it's `USD`.

if `type` is `number` and `format` is omitted, the result is formatted number with [thousands separators](https://docs.oracle.com/cd/E19455-01/806-0169/overview-9/index.html). If `format` is one of [currency code](https://www.currency-iso.org/en/home/tables/table-a1.html), it will show in corresponding currency format.

### Display Dates

Locale data:

```
{
  "SALE_START": "Sale begins {start, date}",
  "SALE_END": "Sale ends {end, date, long}"
}
```

JS code:

```
intl.get('SALE_START', {start:new Date()}); // Sale begins 4/19/2017
intl.get('SALE_END', {end:new Date()}); // Sale ends April 19, 2017
```

If `type` is `date`, `format` has the following values:

- `short` shows date as shortest as possible
- `medium` shows short textual representation of the month
- `long` shows long textual representation of the month
- `full` shows dates with the most detail

### Display Times

Locale data:

```
{
  "COUPON": "Coupon expires at {expires, time, medium}"
}
```

JS code:

```
intl.get('COUPON', {expires:new Date()}); // Coupon expires at 6:45:44 PM
```

if `type` is `time`, `format` has the following values:

- `short` shows times with hours and minutes
- `medium` shows times with hours, minutes, and seconds
- `long` shows times with hours, minutes, seconds, and timezone

### Default Message

When the specific key does't exist in current locale, you may want to make it return a default message. Use `defaultMessage` method after `get` method. For example,

Locale data:

```
{ "HELLO": "Hello, {name}" }
```

JS code:

```
const name = 'Tony';
intl.get('HELLO', { name }).defaultMessage(`Hello, ${name}`); // "Hello, Tony"
```

Or using `d` for short:

```
const name = 'Tony';
intl.get('HELLO', { name }).d(`Hello, ${name}`); // "Hello, Tony"
```

And `getHTML` also supports default message.

```
const name = 'Tony';
intl.getHTML('HELLO').d(<div>Hello, {name}</div>) // React.Element with "<div>Hello, Tony</div>"
```

### HTML Message

The `get` method returns string message. For HTML message, use `getHTML` instead. For example,

Locale data:

```
{ "TIP": "This is <span style='color:red'>HTML</span>" }
```

JS code:

```
intl.getHTML('TIP'); // {React.Element}
```

### Helper

[react-intl-universal](https://www.npmjs.com/package/react-intl-universal) provides a utility helping developer determine the user's `currentLocale`. As the running examples, when user select a new locale, it redirect user new location like `http://localhost:3000?lang=en-US`. Then, we can use `intl.determineLocale` to get the locale from URL. It can also support determine user's locale via cookie, localStorage, and browser default language. Refer to the APIs section for more detail.

## App Examples

- [Browser Apps](https://github.com/alibaba/react-intl-universal/blob/master/examples/browser-example/src/App.js)
- [Server-side App](https://github.com/alibaba/react-intl-universal/blob/master/examples/node-js-example/src/App.js)
- [Component](https://github.com/alibaba/react-intl-universal/blob/master/examples/component-example)

## APIs Definition

```js
  /**
   * Initialize properties and load CLDR locale data according to currentLocale
   * @param {Object} options
   * @param {string} options.escapeHtml To escape html. Default value is true.
   * @param {string} options.currentLocale Current locale such as 'en-US'
   * @param {Object} options.locales App locale data like {"en-US":{"key1":"value1"},"zh-CN":{"key1":"值1"}}
   * @param {Object} options.warningHandler Ability to accumulate missing messages using third party services. See https://github.com/alibaba/react-intl-universal/releases/tag/1.11.1
   * @param {string} options.fallbackLocale Fallback locale such as 'zh-CN' to use if a key is not found in the current locale
   * @returns {Promise}
   */
  init(options)


  /**
   * Load more locales after init
   * @param {Object} locales App locale data 
   */
  load(locales)


  /**
   * Get the formatted message by key
   * @param {string} key The string representing key in locale data file
   * @param {Object} variables Variables in message
   * @returns {string} message
   */
  get(key, variables)

  /**
   * Get the formatted html message by key.
   * @param {string} key The string representing key in locale data file
   * @param {Object} variables Variables in message
   * @returns {React.Element} message
  */
  getHTML(key, options)

  /**
   * Helper: determine user's locale via URL, cookie, and browser's language.
   * You may not need this API, if you have other rules to determine user's locale.
   * @param {string} options.urlLocaleKey URL's query Key to determine locale. Example: if URL=http://localhost?lang=en-US, then set it 'lang'
   * @param {string} options.cookieLocaleKey Cookie's Key to determine locale. Example: if cookie=lang:en-US, then set it 'lang'
   * @param {string} options.localStorageLocaleKey LocalStorage's Key to determine locale such as 'lang'
   * @returns {string} determined locale such as 'en-US'
   */
  determineLocale(options)

  /**
   * Get the inital options 
   * @returns {Object} options includes currentLocale and locales
   */
  getInitOptions()
```



与其他语言库的兼容；浏览器兼容等

## Compatibility with react-intl

As mentioned in the issue [Mirror react-intl API](https://github.com/alibaba/react-intl-universal/issues/2), to make people switch their existing React projects from [react-intl](https://github.com/yahoo/react-intl) to [react-intl-universal](https://www.npmjs.com/package/react-intl-universal). We provide two compatible APIs as following.

```
  /**
   * As same as get(...) API
   * @param {Object} options 
   * @param {string} options.id 
   * @param {string} options.defaultMessage
   * @param {Object} variables Variables in message
   * @returns {string} message
  */
  formatMessage(options, variables)
  /**
   * As same as getHTML(...) API
   * @param {Object} options 
   * @param {string} options.id 
   * @param {React.Element} options.defaultMessage
   * @param {Object} variables Variables in message
   * @returns {React.Element} message
  */
  formatHTMLMessage(options, variables)
```

For example, the `formatMessage` API

```
const name = 'Tony';
intl.formatMessage({ id:'hello', defaultMessage: `Hello, ${name}`}, {name});
```

is equivalent to `get` API

```
const name = 'Tony';
intl.get('hello', {name}).d(`Hello, ${name}`);
```

And the `formatHTMLMessage` API

```
const name = 'Tony';
intl.formatHTMLMessage({ id:'hello', defaultMessage: <div>Hello</div>}, {name});
```

is equivalent to `getHTML` API

```
const name = 'Tony';
intl.getHTML('hello', {name}).d(<div>Hello</div>);
```

## Browser Compatibility

Before using [react-intl-universal](https://www.npmjs.com/package/react-intl-universal), you need to include scripts below in HTML to support older browser.

```
<!--[if lt IE 9]>
<script src="//f.alicdn.com/es5-shim/4.5.7/es5-shim.min.js"></script>
<![endif]-->
<script>
if(typeof Promise!=="function"){document.write('<script src="//f.alicdn.com/es6-shim/0.35.1/??es6-shim.min.js,es6-sham.min.js"><\/script>')}
</script>
```

## Tools

- [react-intl-universal-extract](https://github.com/alibaba/react-intl-universal/tree/master/packages/react-intl-universal-extract): Extract default messages in application. This package will generate a json file which contains the extracted messages.
- [react-intl-universal-pseudo-converter](https://github.com/ceszare/react-intl-universal-pseudo-converter): A [pseudo-localization](https://en.wikipedia.org/wiki/Pseudolocalization) tool for testing internationalization.



## Live Demo

- [react-intl-universal demo](https://g.alicdn.com/alishu/common/0.0.95/intl-example/index.html)
- [CodeSandbox](https://codesandbox.io/s/727pw9zoqx)

## Why Another Internationalization Solution for React?

react-intl 也是一个翻译库，有两个缺点

In case of internationalizing React apps, [react-intl](https://github.com/yahoo/react-intl) is one of most popular package in industry. [react-intl](https://github.com/yahoo/react-intl) decorate your React.Component with wrapped component which is injected internationalized message dynamically so that the locale data is able to be loaded dynamically without reloading page. The following is the example code using [react-intl](https://github.com/yahoo/react-intl).

在React应用的国际化方面，React -intl是业界最流行的包之一。组件与封装组件，封装组件动态注入国际化消息，这样就可以动态加载区域设置数据，而无需重新加载页面。下面是使用react-intl的示例代码。

```js
import { injectIntl } from 'react-intl';

class MyComponent extends Component {
  render() {
    const intl = this.props;
    const title = intl.formatMessage({ id: 'title' });
    return (<div>{title}</div>);
  }
};

export default injectIntl(MyComponent);
```

However, this approach introduces two major issues.

Firstly, Internationalizing can be applied only in view layer such as React.Component. For Vanilla JS file, there's no way to internationalize it. For example, the following snippet is general form validator used by many React.Component in our apps. We definitely will not have such code separated in different React.Component in order to internationalize the warning message. Sadly, [react-intl](https://github.com/yahoo/react-intl) can't be used in Vanilla JS.

首先，国际化只能应用于视图层，如React.Component。例如，下面的代码片段是许多React使用的通用表单验证器。组件在我们的应用程序。我们绝对不会在不同的React中分离这样的代码。组件，以便国际化警告消息。遗憾的是，react-intl不能在 Vanilla JS中使用。

```js
export default const rules = {
  noSpace(value) {
    if (value.includes(' ')) {
      return 'Space is not allowed.';
    }
  }
};
```

Secondly, since your React.Component is wrapped by another class, the behavior is not as expected in many way. For example, to get the instance of React.Component, you can't use the normal way like:

第二，自从你的React。组件被另一个类包装，其行为在很多方面都不符合预期。例如，获取React的实例。组件，你不能使用正常的方式，如:

```js
class App {
  render() {
    <MyComponent ref="my"/>
  }
  getMyInstance() {
    console.log('getMyInstance', this.refs.my);
  }
}
```

Instead, you need to use the method `getWrappedInstance()` to get that.

```js
class MyComponent {...}
export default injectIntl(MyComponent, {withRef: true});


class App {
  render() {
    <MyComponent ref="my"/>
  }
  getMyInstance() {
    console.log('getMyInstance', this.refs.my.getWrappedInstance());
  }
}
```

Furthermore, your React.Component's properties are not inherited in subclass since component is injected by [react-intl](https://github.com/yahoo/react-intl).

Due to the problem above, we create [react-intl-universal](https://www.npmjs.com/package/react-intl-universal) to internationalize React app using simple but powerful API.

此外,你的组件的属性不会在子类中继承，因为组件是通过react-intl注入的。

由于上面的问题，我们创建了React -intl-universal来使用简单但强大的API来国际化React应用。



个人练习：只处理了直接翻译和参数翻译，日期数字等没有处理

~~~js
import intl from 'react-intl-universal';

require('intl/locale-data/en.js');
require('intl/locale-data/zh.js');

// app locale data
const locales = {
  "en-US": require('./locales/en-US.js'),
  "zh-CN": require('./locales/zh-CN.js'),
};

class App extends Component {

  componentDidMount() {
    this.initLocales();
  }

  initLocales() {
    intl.init({
      currentLocale: 'en-US',
      locales,
    })
    .then(() => {
      console.log('load success');
    });
  }

  render() {
    return (
      {intl.get('Name')}
      {intl.get('Hello', {
        name: 'Mike',
        age: '20'
      })}
    );
  }
}
~~~

