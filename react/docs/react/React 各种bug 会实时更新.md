# React 各种bug和解答



### BUG2

```
Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
```

这个错误从网上搜索说是因为你导出的类或者函数在导入的时候方式不正确造成的，而我今天造成这个错误的原因是：

```javascript
static propTypes = {
  noDataImgShow:PropTypes.boolean.isRequired
}
```

我写的`PropTypes.boolean`基本类型引用错误了，boolean -bool 造成的。记得`PropTypes`的基本类型有：

```js
type = {
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,
};
```



### BUG4

```
Build failed: The 'decorators' plugin requires a 'decoratorsBeforeExport' option, whose value must be a boolean. If you are migrating from Babylon/Babel 6 or want to use the old decorators proposal, you should use the 'decorators-legacy' plugin instead of 'decorators'.
```

[https://github.com/ant-design/ant-design-pro/issues/2043](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fant-design%2Fant-design-pro%2Fissues%2F2043)

安装制定版本的`roadhog`

```
npm install --save 2.5.0-beta.1
```



### BUG5

```
Module build failed: ReferenceError: Unknown plugin "transform-runtime" specified in "base" at 2, attempted to resolve relative to "C:\Users\michael\Desktop\company_work\vitark-web-ui\src"
```

安装依赖：

```
 npm install --save babel-plugin-transform-runtime
```



### BUG6

```
Module build failed: ReferenceError: Unknown plugin "transform-class-properties" specified in "base" at 4, attempted to resolve relative to "C:\Users\michael\Desktop\company_work\vitark-web-ui\src"
```

需要安装依赖：

```
npm install 
babel-plugin-transform-class-properties
babel-plugin-transform-decorators-legacy
babel-plugin-transform-export-extensions
babel-plugin-transform-object-rest-spread
babel-preset-env
--save-dev
```



### BUG7

```
Module not found:Error:Can't resolve '@babel/runtime/helpers/esm/extends'
```

这个错误坑的地方在哪里呢？是它的这个方法只有过去的`npm`包里可以找到，如果你用

```
npm install @babel/runtime --save
yarn add @babel/runtime
```

来安装，安装的是最新的包，然后新的包里面并没有这个它要找的方法，所以仍然会报错，这个时候你就会想，我已经安装了，为什么还找不到。

思路来了：**如果你安装了包了，然后还是说找不到包里的方法的话，就说明你需要降级，安装它之前的包**

```
npm i @babel/runtime@7.0.0-beta.55 --save
```

我觉的这条思路可以应对所有找不到包内部方法的问题。



### BUG8

```
Failed to minify the bundle. Error: 0.0f3f4c41.async.js from UglifyJs
```

通常 webpack 在构建时，是不会让 node_modules 下的文件走 babel tranpile 的，一是会慢很多，二是 babel@6 时编译编译过的代码会不安全（据说 babel@7 下没问题了），所以业界有个潜在的约定，**npm 包发布前需要先用 babel 转出一份 es5 的代码**。

但是有些 npm 包不遵守这个约定，没有转成 es5 就发上去，比如 [query-string@6](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fsindresorhus%2Fquery-string%2Fblob%2F597f14a%2Findex.js%23L8%3A31)。然后压缩工具 uglify 又只支持 es5 的语法，遇到 `const`、`let`、`()=>` 类似的语法，就抛错了。

原文看这里的[async.js from UglifyJs](https://links.jianshu.com/go?to=%5Bhttps%3A%2F%2Fgithub.com%2Fsorrycc%2Fblog%2Fissues%2F68%5D(https%3A%2F%2Fgithub.com%2Fsorrycc%2Fblog%2Fissues%2F68))





### BUG

```
doctor_third.bundle.js:55 Uncaught TypeError: Cannot read property 'call' of undefined
    at __webpack_require__ (doctor_third.bundle.js:55)
    at Object.<anonymous> (zrk_doctor_doctor_root.bundle.js:22679)
    at __webpack_require__ (doctor_third.bundle.js:55)
    at webpackJsonpCallback (doctor_third.bundle.js:26)
    at zrk_doctor_doctor_root.bundle.js:1
__webpack_require__ @ doctor_third.bundle.js:55
(anonymous) @ zrk_doctor_doctor_root.bundle.js:22679
__webpack_require__ @ doctor_third.bundle.js:55
webpackJsonpCallback @ doctor_third.bundle.js:26
(anonymous) @ zrk_doctor_doctor_root.bundle.js:1
```

造成的原因和上面的错误完全没有关系，是因为`/public/index.html`下面`js`文件的引用不对。

```
<script type="text/javascript">
    document.write("<script language='javascript' src='"+getStaticFileHost()+"/static/js/jquery-2.1.4.min.js'><\/script>");
    document.write("<script language='javascript' src='"+getStaticFileHost()+"/static/js/mobiscroll.custom-3.0.0-beta2.min.js'><\/script>");
    document.write("<script language='javascript' src='"+getStaticFileHost()+"/static/js/jweixin-1.2.0.js'><\/script>");
    document.write("<script language='javascript' src='"+getStaticFileHost()+"/static/js/react/zrk_doctor_commons.bundle.js'><\/script>");
    document.write("<script language='javascript' src='"+getStaticFileHost()+"/static/js/react/zrk_doctor_doctor_root.bundle.js'><\/script>");
</script>
```



### BUG

```
Uncaught (in promise) Error: Objects are not valid as a React child (found: object with keys {status}). If you meant to render a collection of children, use an array instead or wrap the object using createFragment(object) from the React add-ons.
    at invariant (invariant.js:44)
    at traverseAllChildrenImpl (traverseAllChildren.js:144)
    at traverseAllChildren (traverseAllChildren.js:172)
    at Object.instantiateChildren (ReactChildReconciler.js:70)
    at ReactDOMComponent._reconcilerInstantiateChildren (ReactMultiChild.js:187)
    at ReactDOMComponent.mountChildren (ReactMultiChild.js:226)
    at ReactDOMComponent._createInitialChildren (ReactDOMComponent.js:697)
    at ReactDOMComponent.mountComponent (ReactDOMComponent.js:516)
    at Object.mountComponent (ReactReconciler.js:46)
    at ReactDOMComponent.mountChildren (ReactMultiChild.js:238)
```

解决办法：

```
https://stackoverflow.com/questions/34919111/how-to-debug-this-error-uncaught-in-promise-error-objects-are-not-valid-as-a
```



### BUG

Babel 6 regeneratorRuntime is not defined

解决办法：

首先babel基础包(不安装额外东西)并不是支持完整的es6语言，加上浏览器也不是支持所有的es6语言，如果你写的es6语言刚好撞上这样的情况了.

```
那么就需要babel的拓展包(Polyfill),网址链接描述

这是一个补完babel支持es6的拓展包，配置步骤为3个
1.打开命令行键入 npm install --save-dev babel-polyfill 安装polyfill
2.在webpack.config.js中最上面写上var babelpolyfill = require("babel-polyfill");
3.在自己的项目js文件中最开头写上import "babel-polyfill";
```

上面是网上的解决版本。
链接:
[ES6 写法报错regeneratorRuntime is not defined](https://links.jianshu.com/go?to=https%3A%2F%2Fsegmentfault.com%2Fq%2F1010000006801859)
扩展:
[StackOverFlow Babel 6 regeneratorRuntime is not defined](https://links.jianshu.com/go?to=https%3A%2F%2Fstackoverflow.com%2Fquestions%2F33527653%2Fbabel-6-regeneratorruntime-is-not-defined)
我这边的解决办法

```
        recordPatientBitrth: ["regenerator-runtime/runtime", path.join(PATHS.entry, 'RecordPatientBirth.js')],
```

在入口的地方添加regenerator-runtime/runtime以申明！

### BUG

Cannot read property 'split' of undefine

这个问题你应该调用调用的split是否为空，空的话就会报错，就像下面的例子，item.body为空就会报这个错，恩，低级错误。

```
let arr = item.body.splic(',');
```

### BUG

```
rror: Couldn't find preset "env" relative to directory "/Users/name/plugin/7ada6103-7315-4c24-93f3-4a3a6a0fa7ee"
    at /Users/name/project/node_modules/babel-core/lib/transformation/file/options/option-manager.js:293:19
    at Array.map (native)
    at OptionManager.resolvePresets (/Users/name/project/node_modules/babel-core/lib/transformation/file/options/option-manager.js:275:20)
    at OptionManager.mergePresets (/Users/name/project/node_modules/babel-core/lib/transformation/file/options/option-manager.js:264:10)
    at OptionManager.mergeOptions (/Users/name/project/node_modules/babel-core/lib/transformation/file/options/option-manager.js:249:14)
    at OptionManager.init (/Users/name/project/node_modules/babel-core/lib/transformation/file/options/option-manager.js:368:12)
    at File.initOptions (/Users/name/project/node_modules/babel-core/lib/transformation/file/index.js:216:65)
    at new File (/Users/name/project/node_modules/babel-core/lib/transformation/file/index.js:139:24)
    at Pipeline.transform (/Users/name/project/node_modules/babel-core/lib/transformation/pipeline.js:46:16)
    at BabelCompiler.compileSync (/Users/name/project/node_modules/electron-compilers/lib/js/babel.js:76:26)
```

解决方案[：stackOverFlow](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fbabel%2Fbabel-preset-env%2Fissues%2F186)

### BUG

VM20008:7 Warning: setState(...): Cannot update during an existing state transition (such as within `render` or another component's constructor). Render methods should be a pure function of props and state; constructor side-effects are an anti-pattern, but can be moved to `componentWillMount`.

这个错误的出现往往都是直接浏览器直接卡爆了，出现问题的原因其实非常简单。

你在render方法里面进行了state的操作，造成的结果就是一直在不断的render，值得卡爆！

还有一个错误也是描述这个的。

```
ReactDebugTool.js:173 Uncaught (in promise) RangeError: Maximum call stack size exceeded
   at resumeCurrentLifeCycleTimer (ReactDebugTool.js:173)
   at ReactReconcileTransaction.onEndFlush (ReactDebugTool.js:280)
   at ReactReconcileTransaction.closeAll (Transaction.js:206)
   at ReactReconcileTransaction.perform (Transaction.js:153)
   at ReactUpdatesFlushTransaction.perform (Transaction.js:140)
   at ReactUpdatesFlushTransaction.perform (ReactUpdates.js:89)
   at flushBatchedUpdates (ReactUpdates.js:172)
   at ReactUpdatesFlushTransaction.close (ReactUpdates.js:47)
   at ReactUpdatesFlushTransaction.closeAll (Transaction.js:206)
   at ReactUpdatesFlushTransaction.perform (Transaction.js:153)
```

下面是错误代码：

```
<Modal
       visible={this.state.visible}
       onClose={this.onClickCloseImage()}
       transparent
       className = 'doctor_show_layout'
       <div className="doctor_show_layout">
           <img src={default_avatar}/>
      </div>
</Modal>
```

比如你在一个Modal里直接调用方法`onClose={this.onClickCloseImage()}`,然后在这个方法里还修改了`state`:

```
onClickCloseImage(){
    this.setState({
      visible: false
    });
  }
```

接着就是爆炸了。解决的办法很简单。

```
onClose={this.onClickCloseImage.bind(this)}
```

改调用为绑定，或者如果你在构造函数`constructor`里进行了绑定

```
this.onClickCloseImage = this.onClickCloseImage.bind(this)
```

那下面调用的地方就改成传函数名.

```
<Modal
       visible={this.state.visible}
       onClose={this.onClickCloseImage}
       transparent
       className = 'doctor_show_layout'>
       <div className="doctor_show_layout">
             <img src={default_avatar}/>
       </div>
</Modal>
```



### TypeError

undefined is not a function (evaluating '_iterator[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](https://www.jianshu.com/p/28534cc5b757)')

出现这个问题是因为`react native`不支持遍历的问题，例如下面的代码：

```
for (let [index, data] of current_month_data.entries()) {
            for (let value of data) {
                if ( value.day === this.props.day &&
                    value.month === this.props.month ) {
                    return index;
                }
            }
        }
```

你需要把它改成传统的`for`循环就好了：

```
for(let i = 0;i<current_month_data.length;i++){
            let value = current_month_data[i];
            if(value.day === this.props.day && value.month === this.props.month){
                return i;
            }
        }
```

### Error: Command failed: yarn add react-native --exact 初始化错误

解决方案：

```
npm config set registry https://registry.npm.taobao.org
npm config set disturl https://npm.taobao.org/dist
```

如果不行，我们可以在init的时候制定版本号，就像这样：

```
react-native init demo --verbose --version 0.38.0
```

### Error

JSON value '<null>' of type NSNull cannot be converted to NSString

[google搜索出来的答案](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Ffacebook%2Freact-native%2Fissues%2F11140)

话说现在百度真是越来越堕落了，简直不能忍啊。

出这个问题是我们不能把值`null`转为`string`,所以报错了，处理也非常简单，只需要判断是否为空，就可以搞定，我们
经常发生这个错误的地方就是:

```
 <Image style={styles.image_style} source={{uri:avatar}}></Image>
```

如果这个值是`null`,那么就会报这个错误。
这里也分享给大家一个我们用的工具，可以用来判断是否为空：

```js
/**
 * 判断是否为空
 */
export default class StringUtils {

  isEmpty(str) {
    let flag = false;
    if (!str || str && this.isNull(str) || !this.removeAllSpaces(str)) {
      flag = true;
    }
    return flag;
  }

  //判断是否有空
  isNull(str) {
    if (str === "") return true;
    let regu = "^[ ]+$";
    let re = new RegExp(regu);
    return re.test(str);
  }

  //获取中文状态下获取后两位否则前两位
  getNameSubstr(str) {
    if (str) {

      if (!this.isChinese(str)) {
        if (str.length >= 2) {
          return str.substr(str.length - 2, 2)
        } else {
          return str.substr(str.length - 1, 1)
        }
      } else {
        if (str.length >= 2) {
          return str.substr(0, 2)
        } else {
          return str.substr(0, 1)
        }
      }
    } else {
      return '';
    }
  }

  //判断是否中文和英文
  isChinese(str) {
    if (/.*[\u4e00-\u9fa5]+.*$/.test(str)) {
      return false;
    }
    return true;
  }

  /***
     * 去除所有空格
     * @param str
     * @returns {string}
     */
  removeAllSpaces(str) {
    try {
      return str.replace(/\s+/g, "")
    } catch (e) {
      return ''
    }
  }

  /***
     * 去除两头空格
     * @param str
     * @returns {string}
     */
  removeBothSpaces(str) {
    try {
      return str.replace(/^\s+|\s+$/g, "")
    } catch (e) {
      return ''
    }
  }
}

global.StringUtils = new StringUtils();
```
