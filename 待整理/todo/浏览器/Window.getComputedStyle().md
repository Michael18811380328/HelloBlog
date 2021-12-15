# Window.getComputedStyle()

## [摘要](https://developer.mozilla.org/zh-CN/docs/web/api/window/getcomputedstyle#摘要)

`Window.getComputedStyle()`方法返回一个对象，该对象在应用活动样式表并解析这些值可能包含的任何基本计算后报告元素的所有CSS属性的值。 私有的CSS属性值可以通过对象提供的API或通过简单地使用CSS属性名称进行索引来访问。

## [语法](https://developer.mozilla.org/zh-CN/docs/web/api/window/getcomputedstyle#语法)

```
let style = window.getComputedStyle(element, [pseudoElt]);
```

- element

   用于获取计算样式的[`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element)。

- pseudoElt 可选

  指定一个要匹配的伪元素的字符串。必须对普通元素省略（或`null`）。

注意：在Gecko2.0 (Firefox 4 / Thunderbird 3.3 / SeaMonkey 2.1)之前版本，参数pseudoElt是必要的。如果为null，则不指定其他主要浏览器必须指定此参数。Gecko已经更改为匹配其他浏览器的行为。。

返回的`style`是一个实时的 [`CSSStyleDeclaration`](https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleDeclaration) 对象，当元素的样式更改时，它会自动更新本身。

## [示例](https://developer.mozilla.org/zh-CN/docs/web/api/window/getcomputedstyle#示例)

```
let elem1 = document.getElementById("elemId");
let style = window.getComputedStyle(elem1, null);

// 它等价于
// let style = document.defaultView.getComputedStyle(elem1, null);
```

Copy to Clipboard

```
<style>
 #elem-container{
   position: absolute;
   left:     100px;
   top:      200px;
   height:   100px;
 }
</style>

<div id="elem-container">dummy</div>
<div id="output"></div>

<script>
  function getTheStyle(){
    let elem = document.getElementById("elem-container");
    let theCSSprop = window.getComputedStyle(elem,null).getPropertyValue("height");
    document.getElementById("output").innerHTML = theCSSprop;
   }
  getTheStyle();
</script>
```

Copy to Clipboard

```
function dumpComputedStyles(elem,prop) {

  let cs = window.getComputedStyle(elem,null);
  if (prop) {
    dump("    "+prop+" : "+cs.getPropertyValue(prop)+"\n");
    return;
  }
  let len = cs.length;
  for (var i=0;i<len;i++) {

    let style = cs[i];
    dump("    "+style+" : "+cs.getPropertyValue(style)+"\n");
  }

}
```

Copy to Clipboard

## [描述](https://developer.mozilla.org/zh-CN/docs/web/api/window/getcomputedstyle#描述)

返回的对象与从元素的 [`style`](https://developer.mozilla.org/zh-CN/docs/orphaned/Web/API/ElementCSSInlineStyle/style) 属性返回的对象具有相同的类型;然而，两个对象具有不同的目的。从`getComputedStyle`返回的对象是只读的，可以用于检查元素的样式（包括由一个`<style>`元素或一个外部样式表设置的那些样式）。`elt.style`对象应用于在特定元素上设置样式。

第一个参数必须是Element对象(传递一个非节点元素，如 一个#text 节点， 将会抛出一个错误). 从Gecko 1.9.2  (Firefox 3.6 / Thunderbird 3.1 / Fennec 1.0) 开始, 现在返回的一个在URL周围有引号的URL值，像这样： `url("http://foo.com/bar.jpg")`.

## [`defaultView`](https://developer.mozilla.org/zh-CN/docs/web/api/window/getcomputedstyle#defaultview)

在许多在线的演示代码中，`getComputedStyle`是通过 `document.defaultView` 对象来调用的。大部分情况下，这是不需要的，因为可以直接通过`window`对象调用。但有一种情况，你必需要使用 `defaultView`, 那是在firefox3.6上访问子框架内的样式 。

## [与伪元素一起使用](https://developer.mozilla.org/zh-CN/docs/web/api/window/getcomputedstyle#与伪元素一起使用)

getComputedStyle 可以从**伪元素**拉取样式信息 (比如, `::after`, `::before`, `::marker`, `::line-marker`—查看 [详情](https://dev.w3.org/csswg/css3-content/#pseudo-elements) 这里).

```
<style>
    h3::after {
        content: "rocks!";
    }
</style>

<h3>generated content</h3>

<script>
    let h3 = document.querySelector('h3'),
    result = getComputedStyle(h3, '::after').content;
    alert(`the generated content is: ${result}`);
    console.log(`the generated content is: ${result}`);
    // the generated content is: "rocks!"
</script>
```

Copy to Clipboard

## [注意](https://developer.mozilla.org/zh-CN/docs/web/api/window/getcomputedstyle#注意)

 

返回的[`CSSStyleDeclaration`](https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleDeclaration)对象将包含所有受支持的CSS属性长名称的活动值。示例名称是`border-bottom-width`，`border-width`和`border`是示例速记属性名称。仅使用像`font-size`这样的名字来查询值是最安全的。 查询诸如`font`等简写名称不适用于大多数浏览器。

CSS规范也允许使用驼峰命名，比如`fontSize`或`paddingTop`。

CSS属性值可以使用`getPropertyValue(propName)`API或直接索引到对象，如`cs ['z-index']`或`cs.zIndex`。

 

`getComputedStyle`的返回值是 [`resolved values`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/resolved_value), 通常跟CSS2.1中的[`computed values`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/computed_value)是相同的值。 但对于一些旧的属性，比如`width`, `height`, `padding `它们的值又为 [`used values`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/used_value)。 最初, CSS2.0定义的计算值Computed values 就是属性的最终值。 但是CSS2.1 重新定义了 computed values 为布局前的值， used values布局后的值。 布局前与布局后的区别是， width 或者 height的 百分比可以代表元素的宽度，在布局后会被像素值替换.

在某些情况下，通过浏览器会特意返回不准确的值。 特别是在避免CSS 浏览历史泄露的安全问题， 比如，浏览者看过某个网站， 它的链接通常会变成蓝色带下划线的链接，通过判断链接的颜色（getComputedSytle(node, null).color) 是否为蓝色，就会泄露用户的浏览历史， 所以浏览器会特意返回不准确的值，保护用户隐私。可以了解更多关于css安全的链接[http://blog.mozilla.com/security/2010/03/31/plugging-the-css-history-leak/](https://blog.mozilla.com/security/2010/03/31/plugging-the-css-history-leak/) 和 [http://hacks.mozilla.org/2010/03/privacy-related-changes-coming-to-css-vistited/](https://hacks.mozilla.org/2010/03/privacy-related-changes-coming-to-css-vistited/)

在CSS过渡期间，`getComputedStyle`返回Firefox中的原始属性值，但返回WebKit中的最终属性值。

在Firefox中，属性值为`auto`的会直接返回使用值，而不是`auto`。比如，你在设定了一个元素的css为`height:30px; top: auto; bottom:0;`它的父元素`height:100px;`，在请求`top`的计算样式时，Firefox会返回`'70px' = 100px - 30px;`。

