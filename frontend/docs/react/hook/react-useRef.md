# react useRef

相信有过React使用经验的人对ref都会熟悉，它可以用来获取组件实例对象或者是DOM对象。

而useRef这个hooks函数，除了传统的用法之外，它还可以“跨渲染周期”保存数据。

在阿里的项目中

~~~js
import React from 'react';
import PortalWrapper from '../src/PortalWrapper';

export default () => {
  // React.useRef 是 hook 函数，类似于 React.createRef 函数，可以创建 ref 获取 DOM 节点
  const divRef = React.useRef();
  const outerRef = React.useRef();

  React.useEffect(() => {
    console.log('>>>', divRef.current);
  }, []);

  // 获取外部容器ref，以及获取内部 DIV 的 ref
  return (
    <>
      <PortalWrapper visible getContainer={() => outerRef.current}>
        {() => <div ref={divRef}>2333</div>}
      </PortalWrapper>
      <div style={{ background: 'red', height: 20 }} ref={outerRef} />
    </>
  );
};

~~~

与其他 hook 函数使用：
~~~js
import React, { useState, useEffect, useMemo, useRef } from 'react';

export default function App(props){
  const [count, setCount] = useState(0);

  const doubleCount = useMemo(() => {
    return 2 * count;
  }, [count]);

  const couterRef = useRef();

  useEffect(() => {
    document.title = `The value is ${count}`;
    console.log(couterRef.current);
  }, [count]);

  return (
    <button
      ref={couterRef}
      onClick={() => {setCount(count + 1)}}>Count: {count}, double: {doubleCount}
    </button>
  );
}
~~~

代码中用useRef创建了couterRef对象，并将其赋给了button的ref属性。这样，通过访问couterRef.current就可以访问到button对应的DOM对象。

然后再来看看它保存数据的用法。

在一个组件中有什么东西可以跨渲染周期，也就是在组件被多次渲染之后依旧不变的属性？第一个想到的应该是state。没错，一个组件的state可以在多次渲染之后依旧不变。但是，state的问题在于一旦修改了它就会造成组件的重新渲染。

那么这个时候就可以使用useRef来跨越渲染周期存储数据，而且对它修改也不会引起组件渲染。

~~~js
import React, { useState, useEffect, useMemo, useRef } from 'react';

export default function App(props){
  const [count, setCount] = useState(0);

  const doubleCount = useMemo(() => {
    return 2 * count;
  }, [count]);

  const timerID = useRef();

  useEffect(() => {
    timerID.current = setInterval(()=>{
      setCount(count => count + 1);
    }, 1000); 
  }, []);

  useEffect(()=>{
    if(count > 10){
      clearInterval(timerID.current);
    }
  });

  return (
    <button
      ref={couterRef}
      onClick={() => {setCount(count + 1)}}
      >
      Count: {count}, double: {doubleCount}
    </button>
  );
}
~~~

在上面的例子中，我用ref对象的current属性来存储定时器的ID，这样便可以在多次渲染之后依旧保存定时器ID，从而能正常清除定时器。


参考：https://blog.csdn.net/hjc256/article/details/102587037
