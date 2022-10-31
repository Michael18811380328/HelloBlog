## enzyme 简单实践

enzyme 主要用于 React 组件测试

文档链接：https://enzymejs.github.io/enzyme/

https://www.npmjs.com/package/enzyme

Jest 断言配置：https://github.com/enzymejs/enzyme-matchers/tree/master/packages/jest-enzyme

环境依赖配置：https://github.com/enzymejs/enzyme-matchers/tree/master/packages/jest-environment-enzyme

官网星星只有 800 颗，证明实际使用的人数不是很多（因为判断组件太严格）国内的组件和功能经常更改，这里不合适

代码两年没有更新了

### 简单步骤

这个只是测试组件，不包括断言库，可以选择自定义的断言库（React 通常匹配 Jest 断言库）

需要在测试入口配置

~~~js
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
~~~

然后编写组件测试文件

~~~jsx
import React from 'react';
import { shallow, mount, render } from 'enzyme';

describe('<CollaboratorFormatter />', () => {

  it('basic text', () => {
    function Fixture() {
      return (
        <div>
          <input id="checked" defaultChecked />
          <input id="not" defaultChecked={false} />
        </div>
      );
    }
    const wrapper = mount(<Fixture />);
    expect(wrapper.find('#checked')).toBeChecked();
    expect(wrapper.find('#not')).not.toBeChecked();
  });

  it('basic text', () => {
    function Fixture() {
      return (
        <div>
          <input id="disabled" disabled />
          <input id="not"/>
        </div>
      );
    }
    const wrapper = mount(<Fixture />);
    expect(wrapper.find('#disabled')).toBeDisabled();
    expect(wrapper.find('#not')).not.toBeDisabled();
  });

  it('basic text', () => {
    function EmptyRenderFixture() {
      return null;
    }
    function NonEmptyRenderFixture() {
      return (
        <div>
          <EmptyRenderFixture />
        </div>
      );
    }
    const wrapper = mount(<EmptyRenderFixture />);
    expect(wrapper.find('EmptyRenderFixture')).toBeEmptyRender();

    const wrapper2 = mount(<NonEmptyRenderFixture />);
    expect(wrapper2.find('NonEmptyRenderFixture')).toBeEmptyRender();
  });

});

~~~

渲染组件有三个方式

shallow rendering：浅渲染有助于限制您将组件作为一个单元进行测试，并确保您的测试不会间接断言子组件的行为。

full DOM rendering：完整 DOM 渲染非常适用于您的组件可能与 DOM API 交互或需要测试封装在高阶组件中的组件的用例。

static rendered markup：使用 enzyme 的渲染功能从你的 React 树中生成 HTML，并分析生成的 HTML 结构。

适合不同的组件和交互

https://enzymejs.github.io/enzyme/docs/api/shallow.html

https://enzymejs.github.io/enzyme/docs/api/mount.html

https://enzymejs.github.io/enzyme/docs/api/render.html