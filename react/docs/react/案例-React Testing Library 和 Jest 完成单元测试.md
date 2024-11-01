# 使用 React Testing Library 和 Jest 完成单元测试

原作者 joking_zhang https://segmentfault.com/u/joking_zhang 发布于 2020-03-18

原文链接 https://segmentfault.com/a/1190000022054307

# 引言

在2020的今天，构建一个 web 应用对于我们来说，并非什么难事。因为有很多足够多优秀的的前端框架（比如 `React`，`Vue` 和 `Angular`）；以及一些易用且强大的UI库（比如 `Ant Design`）为我们保驾护航，极大地缩短了应用构建的周期。

但是，互联网时代也急剧地改变了许多软件设计，开发和发布的方式。开发者面临的问题是，需求越来越多，应用越来越复杂，时不时会有一种失控的的感觉，并在心中大喊一句：“我太南了！”。严重的时候甚至会出现我改了一行代码，却不清楚其影响范围情况。这种时候，就需要测试的方式，来保障我们应用的质量和稳定性了。

接下来，让我们学习下，如何给 `React` 应用写单元测试吧🎁

# 需要什么样的测试

软件测试是有级别的，下面是《Google软件测试之道》一书中，对于测试认证级别的定义，摘录如下：

- 级别1
  - 使用测试覆盖率工具。
  - 使用持续集成。
  - 测试分级为小型、中型、大型。
  - 创建冒烟测试集合（主流程测试用例）。
  - 标记哪些测试是非确定性的测试（测试结果不唯一）。

- 级别2
  - 如果有测试运行结果为红色（失败❌）就不会发布。
  - 每次代码提交之前都要求通过冒烟测试。（自测，简单走下主流程）
  - 各种类型的整体代码覆盖率要大于50%。
  - 小型测试的覆盖率要大于10%。

- 级别3
  - 所有重要的代码变更都要经过测试。
  - 小型测试的覆盖率大于50%。
  - 新增重要功能都要通过集成测试的验证。

- 级别4
  - 在提交任何新代码之前都会自动运行冒烟测试。
  - 冒烟测试必须在30分钟内运行完毕。
  - 没有不确定性的测试。
  - 总体测试覆盖率应该不小于40%。
  - 小型测试的代码覆盖率应该不小于25%。
  - 所有重要的功能都应该被集成测试验证到。

- 级别5
  - 对每一个重要的缺陷修复都要增加一个测试用例与之对应。
  - 积极使用可用的代码分析工具。
  - 总体测试覆盖率不低于60%。
  - 小型测试代码覆盖率应该不小于40%。

> 小型测试，通常也叫单元测试，一般来说都是自动化实现的。用于验证一个单独的函数，组件，独立功能模块是否可以按照预期的方式运行。

而对于开发者来说，重要的是进行了测试的动作。本篇文章主要围绕着**React组件单元测试**展开的，其目的是为了让开发人员可以站在使用者的角度考虑问题。通过测试的手段，确保组件的每一个功能都可以正常的运行，关注质量，而不是让用户来帮你测试。

在编写单元测试的时候，一定会对之前的代码反复进行调整，虽然过程比较痛苦，可组件的质量，也在一点一点的提高。

# 技术栈选择

当我们想要为 `React` 应用编写单元测试的时候，官方推荐是使用 [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) + [Jest](https://jestjs.io/) 的方式。[Enzyme](https://github.com/enzymejs/enzyme) 也是十分出色的单元测试库，我们应该选择哪种测试工具呢？

下面让我们看一个简单的计数器的例子，以及两个相应的测试：第一个是使用 [Enzyme](https://github.com/enzymejs/enzyme) 编写的，第二个是使用 [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) 编写的。

##### counter.js

```js
// counter.js
import React from "react";

class Counter extends React.Component {
  state = { count: 0 };
  increment = () => this.setState(({ count }) => ({ count: count + 1 }));
  decrement = () => this.setState(({ count }) => ({ count: count - 1 }));
  render() {
    return (
      <div>
        <button onClick={this.decrement}>-</button>
        <p>{this.state.count}</p>
        <button onClick={this.increment}>+</button>
      </div>
    );
  }
}

export default Counter;
```

##### counter-enzyme.test.js

```js
// counter-enzyme.test.js
import React from "react";
import { shallow } from "enzyme";

import Counter from "./counter";

describe("<Counter />", () => {
  it("properly increments and decrements the counter", () => {
    const wrapper = shallow(<Counter />);
    expect(wrapper.state("count")).toBe(0);

    wrapper.instance().increment();
    expect(wrapper.state("count")).toBe(1);

    wrapper.instance().decrement();
    expect(wrapper.state("count")).toBe(0);
  });
});
```

##### counter-rtl.test.js

```js
// counter-rtl.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Counter from "./counter";

describe("<Counter />", () => {
  it("properly increments and decrements the counter", () => {
    const { getByText } = render(<Counter />);
    const counter = getByText("0");
    const incrementButton = getByText("+");
    const decrementButton = getByText("-");

    fireEvent.click(incrementButton);
    expect(counter.textContent).toEqual("1");

    fireEvent.click(decrementButton);
    expect(counter.textContent).toEqual("0");
  });
});
```

比较两个例子，你能看出哪个测试文件是最好的嘛？如果你不是很熟悉单元测试，可能会任务两种都很好。但是实际上 `Enzyme` 的实现有两个误报的风险：

- 即使代码损坏，测试也会通过。
- 即使代码正确，测试也会失败。

让我们来举例说明这两点。假设您希望重构组件，因为您希望能够设置任何count值。因此，您可以删除递增和递减方法，然后添加一个新的setCount方法。假设你忘记将这个新方法连接到不同的按钮:

##### counter.js

```js
// counter.js
export default class Counter extends React.Component {
  state = { count: 0 };
  setCount = count => this.setState({ count });
  render() {
    return (
      <div>
        <button onClick={this.decrement}>-</button>
        <p>{this.state.count}</p>
        <button onClick={this.increment}>+</button>
      </div>
    );
  }
}
```

第一个测试(`Enzyme`)将通过，但第二个测试(`RTL`)将失败。实际上，第一个并不关心按钮是否正确地连接到方法。它只查看实现本身，也就是说，您的递增和递减方法执行之后，应用的状态是否正确。
这就是**代码损坏，测试也会通过**。

现在是2020年，你也许听说过 `React Hooks`，并且打算使用 `React Hooks` 来改写我们的计数器代码：

##### counter.js

```js
// counter.js
import React, { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count => count + 1);
  const decrement = () => setCount(count => count - 1);
  return (
    <div>
      <button onClick={decrement}>-</button>
      <p>{count}</p>
      <button onClick={increment}>+</button>
    </div>
  );
}
```

这一次，即使您的计数器仍然工作，第一个测试也将被打破。`Enzyme` 会报错，函数组件中无法使用`state`:

```
ShallowWrapper::state() can only be called on class components
```

接下来，就需要改写单元测试文件了：

##### counter-enzyme.test.js

```js
import React from "react";
import { shallow } from "enzyme";

import Counter from "./counter";

describe("<Counter />", () => {
  it("properly increments and decrements the counter", () => {
    const setValue = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation(initialValue => [initialValue, setValue]);
    const wrapper = shallow(<Counter />);

    wrapper
      .find("button")
      .last()
      .props()
      .onClick();
    expect(setValue).toHaveBeenCalledWith(1);
    // We can't make any assumptions here on the real count displayed
    // In fact, the setCount setter is mocked!

    wrapper
      .find("button")
      .first()
      .props()
      .onClick();
    expect(setValue).toHaveBeenCalledWith(-1);
  });
});
```

而使用 `React Testing Library` 编写的单元测试还是可以正常运行的，因为它更加关注应用的事件处理，以及展示；而非应用的实现细节，以及状态变化。更加符合我们对于单元测试的原本诉求，以及最佳实践。

# 可遵循的简单规则

也许上文中使用 `React Testing Library` 编写的单元测试示例，还会给人一种一头雾水的感觉。下面，让我们使用 **AAA** 模式来一步一步的拆解这部分代码。

**AAA模式**：编排（Arrange），执行（Act），断言（Assert）。

几乎所有的测试都是这样写的。首先，您要**编排(初始化)**您的代码，以便为接下来的步骤做好一切准备。然后，您**执行**用户应该执行的步骤(例如单击)。最后，您对应该发生的事情进行**断言**。

```js
import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Counter from "./app";

describe("<Counter />", () => {
  it("properly increments the counter", () => {
    // Arrange
    const { getByText } = render(<Counter />);
    const counter = getByText("0");
    const incrementButton = getByText("+");
    const decrementButton = getByText("-");

    // Act
    fireEvent.click(incrementButton);
    // Assert
    expect(counter.textContent).toEqual("1");

    // Act
    fireEvent.click(decrementButton);
    // Assert
    expect(counter.textContent).toEqual("0");
  });
});
```

##### 编排（Arrange）

在编排这一步，我们需要完成2项任务：

- 渲染组件
- 获取所需的DOM的不同元素。

渲染组件可以使用 RTL's API 的 `render` 方法完成。签名如下：

```js
function render(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult
```

`ui` 是你要加载的组件。`options` 通常不需要指定选项。[官方文档在这里](https://testing-library.com/docs/react-testing-library/api#render-options)，如果要指定的话，如下值是对官方文档的简单摘录：

- container：React Testing库将创建一个div并将该div附加到文档中。而通过这个参数，可以自定义容器。
- baseElement：

如果指定了容器，则此值默认为该值，否则此值默认为document.documentElement。这将用作查询的基本元素，以及在使用debug()时打印的内容。

- hydrate：用于服务端渲染，使用 `ReactDOM.hydrate` 加载你的组件。
- wrapper：传递一个组件作为包裹层，将我们要测试的组件渲染在其中。这通常用于创建可以重用的自定义 render 函数，以便提供常用数据。
- queries：查询绑定。除非合并，否则将覆盖DOM测试库中的默认设置。

基本上，这个函数所做的就是使用ReactDOM呈现组件。在直接附加到document.body的新创建的div中呈现(或为服务器端呈现提供水合物)。因此，可以从DOM测试库和其他一些有用的方法(如debug、rerender或unmount)获得大量查询。

文档：[https://testing-library.com/d...](https://testing-library.com/docs/dom-testing-library/api-queries#queries)

但你可能会想，这些问题是什么呢?有些实用程序允许您像用户那样查询DOM:通过标签文本、占位符和标题查找元素。以下是一些来自文档的查询示例:

- getByLabelText:搜索与作为参数传递的给定文本匹配的标签，然后查找与该标签关联的元素。
- getByText:搜索具有文本节点的所有元素，其中的textContent与作为参数传递的给定文本匹配。
- getByTitle:返回具有与作为参数传递的给定文本匹配的title属性的元素。
- getByPlaceholderText:搜索具有占位符属性的所有元素，并找到与作为参数传递的给定文本相匹配的元素。

一个特定的查询有很多变体:

- getBy:返回查询的第一个匹配节点，如果没有匹配的元素或找到多个匹配，则抛出一个错误。
- getAllBy:返回一个查询中所有匹配节点的数组，如果没有匹配的元素，则抛出一个错误。
- queryBy:返回查询的第一个匹配节点，如果没有匹配的元素，则返回null。这对于断言不存在的元素非常有用。
- queryAllBy:返回一个查询的所有匹配节点的数组，如果没有匹配的元素，则返回一个空数组([])。
- findBy：返回一个promise，该promise将在找到与给定查询匹配的元素时解析。如果未找到任何元素，或者在默认超时时间为4500毫秒后找到了多个元素，则承诺将被拒绝。
- findAllBy：返回一个promise，当找到与给定查询匹配的任何元素时，该promise将解析为元素数组。

##### 执行（Act）

现在一切都准备好了，我们可以行动了。为此，我们大部分时间使用了来自DOM测试库的fireEvent，其签名如下:

```
fireEvent(node: HTMLElement, event: Event)
```

简单地说，这个函数接受一个DOM节点(您可以使用上面看到的查询查询它!)并触发DOM事件，如单击、焦点、更改等。您可以在这里找到许多其他可以调度的事件。

我们的例子相当简单，因为我们只是想点击一个按钮，所以我们只需:

```js
fireEvent.click(incrementButton);
// OR
fireEvent.click(decrementButton);
```

##### 断言（Assert）

接下来是最后一部分。触发事件通常会触发应用程序中的一些更改，因此我们必须执行一些断言来确保这些更改发生。在我们的测试中，这样做的一个好方法是确保呈现给用户的计数已经更改。因此，我们只需断言textContent属性的计数器是递增或递减:

```
expect(counter.textContent).toEqual("1");
expect(counter.textContent).toEqual("0");
```

恭喜你，到这里你已经将我们的示例拆解成功。 🥳

> 注意:这个AAA模式并不特定于测试库。事实上，它甚至是任何测试用例的一般结构。我在这里向您展示这个是因为我发现测试库如何方便地在每个部分中编写测试是一件很有趣的事情。

# 8个典型的例子

到这里，就进入实战阶段了，接下来请先下载示例：[rts-guide-demo](https://github.com/jokingzhang/rts-guide-demo) 。

安装依赖的同时可以简单看下我们的项目。`src/test` 目录下存放了所有单元测试相关的文件。让我们清空这个文件夹，再将下面的示例依次手过一遍。🙏（CV也是可以的👌）

### 1.如何创建测试快照

快照，顾名思义，允许我们保存给定组件的快照。当您进行更新或重构，并希望获取或比较更改时，它会提供很多帮助。

现在，让我们看一下 `App.js` 文件的快照。

##### App.test.js

```js
import React from 'react'
import {render, cleanup} from '@testing-library/react'
import App from '../App'

 afterEach(cleanup)
 
 it('should take a snapshot', () => {
    const { asFragment } = render(<App />)
    
    expect(asFragment()).toMatchSnapshot()
})
```

要获取快照，我们首先必须导入 `render` 和 `cleanup` 。这两种方法将在本文中大量使用。

`render`，顾名思义，有助于渲染React组件。`cleanup` 作为一个参数传递给 `afterEach` ，以便在每次测试后清理所有东西，以避免内存泄漏。

接下来，我们可以使用 `render` 呈现App组件，并从方法中获取 `asFragment` 作为返回值。最后，确保App组件的片段与快照匹配。

现在，要运行测试，打开您的终端并导航到项目的根目录，并运行以下命令:

```
npm test
```

因此，它将创建一个新的文件夹 `__snapshots__` 和一个文件 `App.test.js`:

##### App.test.js.snap

```js
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`should take a snapshot 1`] = `
<DocumentFragment>
  <div
    class="App"
  >
    <h1>
      Testing Updated
    </h1>
  </div>
</DocumentFragment>
`;
```

如果，你在 `App.js` 中做出更改，测试将失败，因为快照将不再匹配。更新快照可以按 `u` ，或者将对应快照文件删除即可。

### 2.测试DOM元素

要测试DOM元素，首先必须查看`TestElements.js`文件。

##### TestElements.js

```js
import React from 'react'

const TestElements = () => {
 const [counter, setCounter] = React.useState(0)
  
 return (
  <>
    <h1 data-testid="counter">{ counter }</h1>
    <button data-testid="button-up" onClick={() => setCounter(counter + 1)}> Up</button>
    <button disabled data-testid="button-down" onClick={() => setCounter(counter - 1)}>Down</button>
 </>
    )
  }
  
  export default TestElements
```

在这里，您唯一需要保留的是 `data-testid` 。它将用于从测试文件中选择这些元素。现在，让我们完成单元测试:

测试计数器是否为0，以及按钮的禁用状态:

##### TestElements.test.js

```js
import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup } from '@testing-library/react';
import TestElements from '../components/TestElements'

afterEach(cleanup);

  it('should equal to 0', () => {
    const { getByTestId } = render(<TestElements />); 
    expect(getByTestId('counter')).toHaveTextContent(0)
   });

   it('should be enabled', () => {
    const { getByTestId } = render(<TestElements />);
    expect(getByTestId('button-up')).not.toHaveAttribute('disabled')
  });

  it('should be disabled', () => {
    const { getByTestId } = render(<TestElements />); 
    expect(getByTestId('button-down')).toBeDisabled()
  });
```

正如您所看到的，语法与前面的测试非常相似。唯一的区别是,我们使用 `getByTestId` 选择必要的元素(根据 `data-testid` )并检查是否通过了测试。换句话说，我们检查 `<h1 data-testid="counter">{ counter }</h1>` 中的文本内容是否等于0。

这里,像往常一样,我们使用 `getByTestId` 选择元素和检查第一个测试如果按钮禁用属性。对于第二个，如果按钮是否被禁用。

如果您保存文件或在终端纱线测试中再次运行，测试将通过。

### 3.测试事件

在编写单元测试之前，让我们首先看下 `TestEvents.js` 是什么样子的。

```js
import React from 'react'

const TestEvents = () => {
  const [counter, setCounter] = React.useState(0)
  
return (
  <>
    <h1 data-testid="counter">{ counter }</h1>
    <button data-testid="button-up" onClick={() => setCounter(counter + 1)}> Up</button>
    <button data-testid="button-down" onClick={() => setCounter(counter - 1)}>Down</button>
 </>
    )
  }
  
  export default TestEvents
```

现在，让我们编写测试。

当我们点击按钮时，测试计数器的增减是否正确:

```js
import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup, fireEvent } from '@testing-library/react';
import TestEvents from '../components/TestEvents'

  afterEach(cleanup);
  
  it('increments counter', () => {
    const { getByTestId } = render(<TestEvents />); 
    
    fireEvent.click(getByTestId('button-up'))

    expect(getByTestId('counter')).toHaveTextContent('1')
  });

  it('decrements counter', () => {
    const { getByTestId } = render(<TestEvents />); 
    
    fireEvent.click(getByTestId('button-down'))

    expect(getByTestId('counter')).toHaveTextContent('-1')
  });
```

可以看到，除了预期的文本内容之外，这两个测试非常相似。

第一个测试使用 `fireEvent.click()` 触发一个 `click` 事件，检查单击按钮时计数器是否增加到1。

第二个检查当点击按钮时计数器是否减为-1。

`fireEvent` 有几个可以用来测试事件的方法，因此您可以自由地深入文档了解更多信息。

现在我们已经知道了如何测试事件，接下来我们将在下一节中学习如何处理异步操作。

### 4. 测试异步操作

异步操作是需要时间才能完成的操作。它可以是HTTP请求、计时器等等。

现在，让我们检查 `TestAsync.js` 文件。

```js
import React from 'react'

const TestAsync = () => {
  const [counter, setCounter] = React.useState(0)

  const delayCount = () => (
    setTimeout(() => {
      setCounter(counter + 1)
    }, 500)
  )
  
return (
  <>
    <h1 data-testid="counter">{ counter }</h1>
    <button data-testid="button-up" onClick={delayCount}> Up</button>
    <button data-testid="button-down" onClick={() => setCounter(counter - 1)}>Down</button>
 </>
    )
  }
  
  export default TestAsync
```

这里，我们使用 `setTimeout()` 将递增事件延迟0.5秒。

测试计数器在0.5秒后判断是否增加:

##### TestAsync.test.js

```js
import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react';
import TestAsync from '../components/TestAsync'

afterEach(cleanup);
  
  it('increments counter after 0.5s', async () => {
    const { getByTestId, getByText } = render(<TestAsync />); 

    fireEvent.click(getByTestId('button-up'))

    const counter = await waitForElement(() => getByText('1')) 

    expect(counter).toHaveTextContent('1')

});
```

要测试递增事件，我们首先必须使用 `async/await` 来处理操作，因为如前所述，完成它需要时间。

接下来，我们使用一个新的助手方法 `getByText()`。这类似于`getByTestId()`。`getByText()`选择文本内容，而不是id。

现在，在单击按钮之后，我们等待 `waitForElement(() => getByText('1')` 来增加计数器。一旦计数器增加到1，我们现在可以移动到条件并检查计数器是否等于1。

也就是说，现在让我们转向更复杂的测试用例。

你准备好了吗?

### 5.测试 React Redux

让我们检查一下 `TestRedux.js` 是什么样子的。

##### TestRedux.js

```js
import React from 'react'
import { connect } from 'react-redux'

const TestRedux = ({counter, dispatch}) => {

 const increment = () => dispatch({ type: 'INCREMENT' })
 const decrement = () => dispatch({ type: 'DECREMENT' })
  
 return (
  <>
    <h1 data-testid="counter">{ counter }</h1>
    <button data-testid="button-up" onClick={increment}>Up</button>
    <button data-testid="button-down" onClick={decrement}>Down</button>
 </>
    )
  }
  
export default connect(state => ({ counter: state.count }))(TestRedux)
```

##### store/reducer.js

```js
export const initialState = {
    count: 0,
  }
  
  export function reducer(state = initialState, action) {
    switch (action.type) {
      case 'INCREMENT':
        return {
          count: state.count + 1,
        }
      case 'DECREMENT':
        return {
          count: state.count - 1,
        }
      default:
        return state
    }
  }
```

正如您所看到的，没有什么特别的。
它只是一个由 `React Redux` 处理的基本计数器组件。

现在，让我们来编写单元测试。

测试初始状态是否为0:

```js
import React from 'react'
import "@testing-library/jest-dom/extend-expect";
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { render, cleanup, fireEvent } from '@testing-library/react';
import { initialState, reducer } from '../store/reducer'
import TestRedux from '../components/TestRedux'

const renderWithRedux = (
  component,
  { initialState, store = createStore(reducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  }
}

 afterEach(cleanup);

it('checks initial state is equal to 0', () => {
    const { getByTestId } = renderWithRedux(<TestRedux />)
    expect(getByTestId('counter')).toHaveTextContent('0')
  })

  it('increments the counter through redux', () => {
    const { getByTestId } = renderWithRedux(<TestRedux />, 
      {initialState: {count: 5}
  })
    fireEvent.click(getByTestId('button-up'))
    expect(getByTestId('counter')).toHaveTextContent('6')
  })
  
  it('decrements the counter through redux', () => {
    const { getByTestId} = renderWithRedux(<TestRedux />, {
      initialState: { count: 100 },
    })
    fireEvent.click(getByTestId('button-down'))
    expect(getByTestId('counter')).toHaveTextContent('99')
  })
```

我们需要导入一些东西来测试 `React Redux` 。这里，我们创建了自己的助手函数 `renderWithRedux()` 来呈现组件，因为它将被多次使用。

`renderWithRedux()` 作为参数接收要呈现的组件、初始状态和存储。如果没有存储，它将创建一个新的存储，如果它没有接收初始状态或存储，它将返回一个空对象。

接下来，我们使用`render()`来呈现组件并将存储传递给提供者。

也就是说，我们现在可以将组件 `TestRedux` 传递给 `renderWithRedux()` 来测试计数器是否等于0。

测试计数器的增减是否正确:

为了测试递增和递减事件，我们将初始状态作为第二个参数传递给`renderWithRedux()`。现在，我们可以单击按钮并测试预期的结果是否符合条件。

现在，让我们进入下一节并介绍 React Context。

### 6. 测试 React Context

让我们检查一下 `TextContext.js` 是什么样子的。

```js
import React from "react"

export const CounterContext = React.createContext()

const CounterProvider = () => {
  const [counter, setCounter] = React.useState(0)
  const increment = () => setCounter(counter + 1)
  const decrement = () => setCounter(counter - 1)

  return (
    <CounterContext.Provider value={{ counter, increment, decrement }}>
      <Counter />
    </CounterContext.Provider>
  )
}

export const Counter = () => {  
    const { counter, increment, decrement } = React.useContext(CounterContext)   
    return (
     <>
       <h1 data-testid="counter">{ counter }</h1>
       <button data-testid="button-up" onClick={increment}> Up</button>
       <button data-testid="button-down" onClick={decrement}>Down</button>
    </>
       )
}

export default CounterProvider
```

现在，通过 React Context 管理计数器状态。让我们编写单元测试来检查它是否按预期运行。

测试初始状态是否为0:

##### TextContext.test.js

```js
import React from 'react'
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup,  fireEvent } from '@testing-library/react'
import CounterProvider, { CounterContext, Counter } from '../components/TestContext'

const renderWithContext = (
  component) => {
  return {
    ...render(
        <CounterProvider value={CounterContext}>
            {component}
        </CounterProvider>)
  }
}

afterEach(cleanup);

it('checks if initial state is equal to 0', () => {
    const { getByTestId } = renderWithContext(<Counter />)
    expect(getByTestId('counter')).toHaveTextContent('0')
})

it('increments the counter', () => {
    const { getByTestId } = renderWithContext(<Counter />)

    fireEvent.click(getByTestId('button-up'))
    expect(getByTestId('counter')).toHaveTextContent('1')
  })

  it('decrements the counter', () => {
    const { getByTestId} = renderWithContext(<Counter />)

    fireEvent.click(getByTestId('button-down'))
    expect(getByTestId('counter')).toHaveTextContent('-1')
  })
```

与前面的React Redux部分一样，这里我们使用相同的方法，创建一个助手函数`renderWithContext()`来呈现组件。但是这一次，它只接收作为参数的组件。为了创建新的上下文，我们将`CounterContext`传递给 Provider。

现在，我们可以测试计数器最初是否等于0。
那么，计数器的增减是否正确呢？

正如您所看到的，这里我们触发一个 `click` 事件来测试计数器是否正确地增加到1并减少到-1。

也就是说，我们现在可以进入下一节并介绍React Router。

### 7. 测试 React Router

让我们检查一下 `TestRouter.js` 是什么样子的。

##### TestRouter.js

```js
import React from 'react'

import { Link, Route, Switch,  useParams } from 'react-router-dom'

const About = () => <h1>About page</h1>

const Home = () => <h1>Home page</h1>

const Contact = () => {
 const { name } = useParams()

 return <h1 data-testid="contact-name">{name}</h1>
}

const TestRouter = () => {
    const name = 'John Doe'
    return (
    <>
    <nav data-testid="navbar">
      <Link data-testid="home-link" to="/">Home</Link>
      <Link data-testid="about-link" to="/about">About</Link>
      <Link data-testid="contact-link" to={`/contact/${name}`}>Contact</Link>
    </nav>
    
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/about:name" component={Contact} />
      </Switch>
    </>
  )
}

export default TestRouter
```

这里，将测试路由对应的页面信息是否正确。

##### TestRouter.test.js

```js
import React from 'react'
import "@testing-library/jest-dom/extend-expect";
import { Router } from 'react-router-dom'
import { render, fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import TestRouter from '../components/TestRouter'


const renderWithRouter = (component) => {
    const history = createMemoryHistory()
    return { 
    ...render (
    <Router history={history}>
        {component}
    </Router>
    )
  }
}

it('should render the home page', () => {
  const { container, getByTestId } = renderWithRouter(<TestRouter />) 
  const navbar = getByTestId('navbar')
  const link = getByTestId('home-link')
  expect(container.innerHTML).toMatch('Home page')
  expect(navbar).toContainElement(link)
})

it('should navigate to the about page', ()=> {
    const { container, getByTestId } = renderWithRouter(<TestRouter />) 
    fireEvent.click(getByTestId('about-link'))
    expect(container.innerHTML).toMatch('About page')
  })
  
  it('should navigate to the contact page with the params', ()=> {
    const { container, getByTestId } = renderWithRouter(<TestRouter />) 
    fireEvent.click(getByTestId('contact-link'))
    expect(container.innerHTML).toMatch('John Doe')
  })
```

要测试React Router，我们首先必须有一个导航历史记录。因此，我们使用 `createMemoryHistory()` 来创建导航历史。

接下来，我们使用助手函数 `renderWithRouter()` 来呈现组件，并将历史记录传递给路由器组件。这样，我们现在就可以测试在开始时加载的页面是否是主页。以及导航栏是否加载了预期的链接。

测试当我们点击链接时，它是否用参数导航到其他页面:

现在，要检查导航是否工作，我们必须触发导航链接上的单击事件。

对于第一个测试，我们检查内容是否等于About页面中的文本，对于第二个测试，我们测试路由参数并检查它是否正确通过。

现在我们可以进入最后一节，学习如何测试Axios请求。

### 8. 测试HTTP请求

让我们检查一下 `TestRouter.js` 是什么样子的。

```js
import React from 'react'
import axios from 'axios'

const TestAxios = ({ url }) => {
  const [data, setData] = React.useState()

  const fetchData = async () => {
    const response = await axios.get(url)
    setData(response.data.greeting)    
 }     
 
 return (
  <>
    <button onClick={fetchData} data-testid="fetch-data">Load Data</button>
    { 
    data ?
    <div data-testid="show-data">{data}</div>:
    <h1 data-testid="loading">Loading...</h1>
    }
  </>
     )

}

export default TestAxios
```

正如您在这里看到的，我们有一个简单的组件，它有一个用于发出请求的按钮。如果数据不可用，它将显示一个加载消息。

现在，让我们编写测试。

来验证数据是否正确获取和显示:

##### TextAxios.test.js

```js
import React from 'react'
import "@testing-library/jest-dom/extend-expect";
import { render, waitForElement, fireEvent } from '@testing-library/react'
import axiosMock from 'axios'
import TestAxios from '../components/TestAxios'

jest.mock('axios')

it('should display a loading text', () => {
  const { getByTestId } = render(<TestAxios />)
  expect(getByTestId('loading')).toHaveTextContent('Loading...')
})

it('should load and display the data', async () => {
  const url = '/greeting'
  const { getByTestId } = render(<TestAxios url={url} />)
  axiosMock.get.mockResolvedValueOnce({
    data: { greeting: 'hello there' },
  })
  fireEvent.click(getByTestId('fetch-data'))
  const greetingData = await waitForElement(() => getByTestId('show-data'))
  expect(axiosMock.get).toHaveBeenCalledTimes(1)
  expect(axiosMock.get).toHaveBeenCalledWith(url)
  expect(greetingData).toHaveTextContent('hello there')
})
```

这个测试用例有点不同，因为我们必须处理HTTP请求。为此，我们必须在`jest.mock('axios')`的帮助下模拟axios请求。

现在，我们可以使用axiosMock并对其应用`get()`方法。最后，我们将使用Jest函数`mockResolvedValueOnce()`来传递模拟数据作为参数。

现在，对于第二个测试，我们可以单击按钮来获取数据并使用`async/await`来解析它。现在我们要测试三件事:

- 如果HTTP请求已经正确完成
- 如果使用url完成了HTTP请求
- 如果获取的数据符合期望。

对于第一个测试，我们只检查加载消息在没有数据要显示时是否显示。

也就是说，我们现在已经完成了八个简单的步骤来测试你的React应用程序。

更多例子请参考[React Testing Library官方文档](https://testing-library.com/docs/example-input-event)。

# 结语

`React Testing Library` 是用于测试 React 应用的一大利器。它为我们提供了访问 `jest-dom` 匹配器的机会，以及最佳实践，使得我们可以使用它来更有效地测试我们的组件。希望这篇文章是有用的，它将帮助您在未来构建更加健壮的 React 应用程序。

# 参考文章

- [React 官方文档](https://zh-hans.reactjs.org/docs/testing.html)
- [React Testing Library 官方文档](https://testing-library.com/docs/example-input-event)
- [How to Start Testing Your React Apps Using the React Testing Library and Jest](https://www.freecodecamp.org/news/8-simple-steps-to-start-testing-react-apps-using-react-testing-library-and-jest/)
- [Test React apps with React Testing Library](https://thomlom.dev/test-react-testing-library/)

[单元测试](https://segmentfault.com/t/单元测试)
[test](https://segmentfault.com/t/test)
[react.js](https://segmentfault.com/t/react.js)
[jest](https://segmentfault.com/t/jest)

阅读 8.5k发布于 2020-03-18
