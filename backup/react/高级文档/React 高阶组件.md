# React 进阶之高阶组件

### 前言

我们都知道高阶函数是什么, 高阶组件差不多的用法，==传入的参数变成了 react 组件，并返回一个新的组件==

> A higher-order component is a function that takes a component and returns a new component.

形如:

```js
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

高阶组件是 react 应用中很重要的一部分，最大的特点就是重用组件逻辑。它并不是由 React API 定义出来的功能，而是由 React 的组合特性衍生出来的一种设计模式。如果你用过 redux，那你就一定接触过高阶组件，因为 react-redux 中的 connect 就是一个高阶组件。

原文[https://github.com/sunyongjian/blog/issues/25](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fsunyongjian%2Fblog%2Fissues%2F25)
另外本次 demo 代码都放在 [https://github.com/sunyongjian/hoc-demo](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fsunyongjian%2Fhoc-demo)

先来一个最简单的高阶组件

```jsx
import React, { Component } from "react";
import simpleHoc from "./simple-hoc";

class Usual extends Component {
  render() {
    console.log(this.props, "props");
    return <div>Usual</div>;
  }
}
export default simpleHoc(Usual);
```

```jsx
import React, { Component } from "react";

const simpleHoc = (WrappedComponent) => {
  return class extends Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

// 高阶组件返回的是一个组件(WrappedComponent)，将传入的 props 作为这个组件的 props
export default simpleHoc;
```

组件 Usual 通过 simpleHoc 的包装，打了一个 log... 那么形如 simpleHoc 就是一个高阶组件了，通过接收一个组件 class Usual，并返回一个组件 class。 其实我们可以看到，在这个函数里，我们可以做很多操作。 而且 return 的组件同样有自己的生命周期，function，另外，我们看到也可以把 props 传给 WrappedComponent(被包装的组件)。 高阶组件的定义我都是用箭头函数去写的，如有不适请参照[arrow function](https://link.juejin.im/?target=http:%2F%2Fes6.ruanyifeng.com%2F%23docs%2Ffunction%23%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0)

### 装饰器模式

高阶组件可以看做是装饰器模式(Decorator Pattern)在 React 的实现。即允许向一个现有的对象添加新的功能，同时又不改变其结构，属于包装模式(Wrapper Pattern)的一种。

ES7 中添加了一个 decorator 的属性，使用@符表示，可以更精简的书写。那上面的例子就可以改成：

```jsx
import React, { Component } from "react";
import simpleHoc from "./simple-hoc";

@simpleHoc
export default class Usual extends Component {
  render() {
    return <div>Usual</div>;
  }
}
```

是同样的效果。
当然兼容性是存在问题的，通常都是通过 babel 去编译的。 babel 提供了 plugin，高阶组件用的是类装饰器，所以用`transform-decorators-legacy` [babel](https://link.juejin.im/?target=https%3A%2F%2Fbabeljs.io%2Fdocs%2Fplugins%2Ftransform-decorators%2F)

## 两种形式

### 属性代理

引入里我们写的最简单的形式，就是属性代理(Props Proxy)的形式。通过 hoc 包装 wrappedComponent，也就是例子中的 Usual，本来传给 Usual 的 props，都在 hoc 中接受到了，也就是 props proxy。 由此我们可以做一些操作

- 操作 props
  最直观的就是接受到 props，我们可以做任何读取，编辑，删除的很多自定义操作。包括 hoc 中定义的自定义事件，都可以通过 props 再传下去。

  ```js
  import React, { Component } from "react";

  const propsProxyHoc = (WrappedComponent) =>
    class extends Component {
      handleClick() {
        console.log("click");
      }

      render() {
        return (
          <WrappedComponent {...this.props} handleClick={this.handleClick} />
        );
      }
    };
  export default propsProxyHoc;
  ```

  然后我们的 Usual 组件 render 的时候, `console.log(this.props)` 会得到 handleClick.

- refs 获取组件实例
  当我们包装 Usual 的时候，想获取到它的实例怎么办，可以通过引用(ref),在 Usual 组件挂载的时候，会执行 ref 的回调函数，在 hoc 中取到组件的实例。通过打印，可以看到它的 props， state，都是可以取到的。

  ```js
  import React, { Component } from "react";

  const refHoc = (WrappedComponent) =>
    class extends Component {
      componentDidMount() {
        console.log(this.instanceComponent, "instanceComponent");
      }

      render() {
        return (
          <WrappedComponent
            {...this.props}
            ref={(instanceComponent) =>
              (this.instanceComponent = instanceComponent)
            }
          />
        );
      }
    };

  export default refHoc;
  ```

- 抽离 state

  这里不是通过 ref 获取 state， 而是通过 { props, 回调函数 } 传递给 wrappedComponent 组件，通过回调函数获取 state。这里用的比较多的就是 react 处理表单的时候。通常 react 在处理表单的时候，一般使用的是受控组件（[文档](https://link.juejin.im/?target=https%3A%2F%2Ffacebook.github.io%2Freact%2Fdocs%2Fforms.html%23controlled-components)），即把 input 都做成受控的，改变 value 的时候，用 onChange 事件同步到 state 中。当然这种操作通过 Container 组件也可以做到，具体的区别放到后面去比较。看一下代码就知道怎么回事了：

  ```jsx
  // 普通组件Login
  import React, { Component } from "react";
  import formCreate from "./form-create";

  @formCreate
  export default class Login extends Component {
    render() {
      return (
        <div>
          <div>
            <label id="username">账户</label>
            <input name="username" {...this.props.getField("username")} />
          </div>
          <div>
            <label id="password">密码</label>
            <input name="password" {...this.props.getField("password")} />
          </div>
          <div onClick={this.props.handleSubmit}>提交</div>
          <div>other content</div>
        </div>
      );
    }
  }
  ```

  ```jsx
  //HOC
  import React, { Component } from "react";

  const formCreate = (WrappedComponent) =>
    class extends Component {
      constructor() {
        super();
        this.state = {
          fields: {},
        };
      }
      onChange = (key) => (e) => {
        const { fields } = this.state;
        fields[key] = e.target.value;
        this.setState({
          fields,
        });
      };
      handleSubmit = () => {
        console.log(this.state.fields);
      };
      getField = (fieldName) => {
        return {
          onChange: this.onChange(fieldName),
        };
      };
      render() {
        const props = {
          ...this.props,
          handleSubmit: this.handleSubmit,
          getField: this.getField,
        };
        return <WrappedComponent {...props} />;
      }
    };
  export default formCreate;
  ```

  这里我们把 state，onChange 等方法都放到 HOC 里，其实是遵从的 react 组件的一种规范，子组件简单，傻瓜，负责展示，逻辑与操作放到 Container。比如说我们在 HOC 获取到用户名密码之后，再去做其他操作，就方便多了，而 state，处理函数放到 Form 组件里，只会让 Form 更加笨重，承担了本不属于它的工作，这样我们可能其他地方也需要用到这个组件，但是处理方式稍微不同，就很麻烦了。

### 反向继承

反向继承(Inheritance Inversion)，简称 II，本来我是叫继承反转的...因为有个模式叫控制反转嘛...
跟属性代理的方式不同的是，II 采用通过 去继承 WrappedComponent，本来是一种嵌套的关系，结果 II 返回的组件却继承了 WrappedComponent，这看起来是一种反转的关系。
通过继承 WrappedComponent，除了一些静态方法，包括生命周期，state，各种 function，我们都可以得到。上栗子：

```jsx
// usual
import React, { Component } from "react";
import iiHoc from "./ii-hoc";

@iiHoc
export default class Usual extends Component {
  constructor() {
    super();
    this.state = {
      usual: "usual",
    };
  }

  componentDidMount() {
    console.log("didMount");
  }

  render() {
    return <div>Usual</div>;
  }
}
```

```jsx
//IIHOC
import React from "react";

const iiHoc = (WrappedComponent) =>
  class extends WrappedComponent {
    render() {
      console.log(this.state, "state");
      return super.render();
    }
  };

export default iiHoc;
```

iiHoc return 的组件通过继承，拥有了 Usual 的生命周期及属性，所以 didMount 会打印，state 也通过 constructor 执行，得到 state.usual。
其实，你还可以通过 II：

#### 渲染劫持

这里 HOC 里定义的组件继承了 WrappedComponent 的 render(渲染)，我们可以以此进行 hijack(劫持)，也就是控制它的 render 函数。栗子：

```jsx
//hijack-hoc
import React from "react";

const hijackRenderHoc = (config) => (WrappedComponent) =>
  class extends WrappedComponent {
    render() {
      const { style = {} } = config;
      const elementsTree = super.render();
      console.log(elementsTree, "elementsTree");
      if (config.type === "add-style") {
        return <div style={{ ...style }}>{elementsTree}</div>;
      }
      return elementsTree;
    }
  };

export default hijackRenderHoc;
```

```jsx
  //usual
  @hijackRenderHoc({type: 'add-style', style: { color: 'red'}})
  class Usual extends Component {
    ...
  }
```

我这里通过二阶函数，把 config 参数预制进 HOC， 算是一种柯理化的思想。
栗子很简单，这个 hoc 就是添加样式的功能。但是它暴露出来的信息却不少。首先我们可以通过 config 参数进行逻辑判断，有条件的渲染，当然这个参数的作用很多，react-redux 中的 connect 不就是传入了 props-key 嘛。再就是我们还可以拿到 WrappedComponent 的元素树，可以进行修改操作。最后就是我们通过 div 包裹，设置了 style。但其实具体如何操作还是根据业务逻辑去处理的...

![element-tree](https://user-images.githubusercontent.com/18378034/27580292-bc808a92-5b5c-11e7-9ad4-afec34cab854.png)

### 我的应用场景

- 通常我会通过高阶组件去优化之前老项目写的不好的地方，比如两个页面 UI 几乎一样，功能几乎相同，仅仅几个操作不太一样，却写了两个耦合很多的页面级组件。当我去维护它的时候，由于它的耦合性过多，经常会添加一个功能(这两个组件都要添加)，我要去改完第一个的时候，还要改第二个。而且有时候由于我的记性不好，会忘掉第二个... 就会出现 bug 再返工。更重要的是由于个人比较懒，不想去重构这部分的代码，因为东西太多了，花费太多时间。所以加新功能的时候，我会写一个高阶组件，往 HOC 里添加方法，把那两个组件包装一下，也就是属性代理。这样新代码就不会再出现耦合，旧的逻辑并不会改变，说不定哪天心情好就会抽离一部分功能到 HOC 里，直到理想的状态。

- 另一种情况就是之前写过一个组件 A，做完上线，之后产品加了一个新需求，很奇怪要做的组件 B 跟 A 几乎一模一样，但稍微有区别。那我可能就通过 II 的方式去继承之前的组件 A，比如它在 didMount 去 fetch 请求，需要的数据是一样的。不同的地方我就会放到 HOC 里，存储新的 state 这样，再通过劫持渲染，把不同的地方，添加的地方进行处理。但其实这算 Hack 的一种方式，能快速解决问题，也反映了组件设计规划之初有所不足(原因比较多)。

- Container 解决不了的时候甚至不太优雅的时候。其实大部分时候包一层 Container 组件也能做到差不多的效果，比如操作 props，渲染劫持。但其实还是有很大区别的。比如我们现在有两个功能的 container，添加样式和添加处理函数的，对 Usual 进行包装。栗子：

  ```jsx
  //usual
  class Usual extends Component {
    render() {
      console.log(this.props, "props");
      return <div>Usual</div>;
    }
  }
  export default Usual;
  //console - Object {handleClick: function}  "props"
  ```

  ```jsx
  import React, { Component } from "react";
  import Usual from "./usual";

  class StyleContainer extends Component {
    render() {
      return (
        <div style={{ color: "#76d0a3" }}>
          <div>container</div>
          <Usual {...this.props} />
        </div>
      );
    }
  }

  export default StyleContainer;
  ```

  ```jsx
  import React, { Component } from "react";
  import StyleContainer from "./container-add-style";

  class FuncContainer extends Component {
    handleClick() {
      console.log("click");
    }

    render() {
      const props = {
        ...this.props,
        handleClick: this.handleClick,
      };
      return <StyleContainer {...props} />;
    }
  }

  export default FuncContainer;
  ```

  外层 Container 必须要引入内层 Container，进行包装，还有 props 的传递，同样要注意包装的顺序。当然你可以把所有的处理都放到一个 Container 里。那用 HOC 怎么处理呢，相信大家有清晰的答案了。

  ```jsx
  const addFunc = (WrappedComponent) =>
    class extends Component {
      handleClick() {
        console.log("click");
      }

      render() {
        const props = {
          ...this.props,
          handleClick: this.handleClick,
        };
        return <WrappedComponent {...props} />;
      }
    };
  ```

  ```jsx
  const addStyle = (WrappedComponent) =>
    class extends Component {
      render() {
        return (
          <div style={{ color: "#76d0a3" }}>
            <WrappedComponent {...this.props} />
          </div>
        );
      }
    };
  ```

  ```jsx
  const WrappenComponent = addStyle(addFunc(Usual));

  class WrappedUsual extends Component {
    render() {
      console.log(this.props, "props");
      return (
        <div>
          <WrappedComponent />
        </div>
      );
    }
  }
  ```

  显然 HOC 是更优雅一些的，每个 HOC 都定义自己独有的处理逻辑，需要的时候只需要去包装你的组件。相较于 Container 的方式，HOC 耦合性更低，灵活性更高，可以自由组合，更适合应付复杂的业务。当然当你的需求很简单的时候，还是用 Container 去自由组合，应用场景需要你清楚。

### 注意点(约束)

其实官网有很多，简单介绍一下。

- 最重要的原则就是，注意高阶组件不会修改子组件，也不拷贝子组件的行为。高阶组件只是通过组合的方式将子组件包装在容器组件中，是一个无副作用的纯函数

- 要给 hoc 添加 class 名，便于 debugger。我上面的好多栗子组件都没写 class 名，请不要学我，因为我实在想不出叫什么名了... 当我们在 chrome 里应用 React-Developer-Tools 的时候，组件结构可以一目了然，所以 DisplayName 最好还是加上。
  ![constructor](https://user-images.githubusercontent.com/18378034/27580322-ce62a6dc-5b5c-11e7-968f-fda656604229.png)

- 静态方法要复制
  无论 PP 还是 II 的方式，WrappedComponent 的静态方法都不会复制，如果要用需要我们单独复制。

- refs 不会传递。 意思就是 HOC 里指定的 ref，并不会传递到子组件，如果你要使用最好写回调函数通过 props 传下去。

- 不要在 render 方法内部使用高阶组件。简单来说 react 的差分算法会去比较 NowElement === OldElement, 来决定要不要替换这个 elementTree。也就是如果你每次返回的结果都不是一个引用，react 以为发生了变化，去更替这个组件会导致之前组件的状态丢失。

  ```
   // HOC不要放到render函数里面

   class WrappedUsual extends Component {

    render() {
      const WrappenComponent = addStyle(addFunc(Usual));

      console.log(this.props, 'props');
      return (<div>
        <WrappedComponent />
      </div>);
    }
  }
  ```

- 使用 compose 组合 HOC。函数式编程的套路... 例如应用 redux 中的 middleware 以增强功能。[redux-middleware 解析](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fsunyongjian%2Fblog%2Fissues%2F21)

  ```
  const addFuncHOC = ...
  const addStyleHOC = ...//省略

  const compose = (...funcs) => component => {
    if (funcs.lenght === 0) {
      return component;
    }
    const last = funcs[funcs.length - 1];
    return funcs.reduceRight((res, cur) => cur(res), last(component));
  };

  const WrappedComponent = compose(addFuncHOC, addStyleHOC)(Usual);
  ```
