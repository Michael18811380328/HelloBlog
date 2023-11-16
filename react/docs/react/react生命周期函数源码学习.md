# React 生命周期函数源码学习

Component Specs and Lifecycle 组件规格和生命周期

This should actually be something like `Lifecycle<P, S> | DeprecatedLifecycle<P, S>`,
as React will _not_ call the deprecated lifecycle methods if any of the new lifecycle methods are present.

这实际上应该类似于 `Lifecycle<P, S> | 不推荐使用的 Lifecycle<P, S>`
因为如果存在任何新的生命周期方法，React 将不会调用已弃用的生命周期方法。

## 定义生命周期接口

组件生命周期 继承自 新的生命周期 和 废弃的生命周期

~~~ts
interface ComponentLifecycle<P, S, SS = any> extends NewLifecycle<P, S, SS>, DeprecatedLifecycle<P, S> {

  // Called immediately after a component is mounted. Setting state here will trigger re-rendering.
  componentDidMount?(): void;

  /**
   * Called to determine whether the change in props and state should trigger a re-render.
   * `Component` always returns true.
   * `PureComponent` implements a shallow comparison on props and state and returns true if any props or states have changed.
   * If false is returned, `Component#render`, `componentWillUpdate` and `componentDidUpdate` will not be called.
   */
  shouldComponentUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean;

  /* Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as
   cancelled network requests, or cleaning up any DOM elements created in `componentDidMount`. */
  componentWillUnmount?(): void;

  /* Catches exceptions generated in descendant components. Unhandled exceptions will cause
   * the entire component tree to unmount.*/
  componentDidCatch?(error: Error, errorInfo: ErrorInfo): void;
}
~~~


## 静态接口

~~~ts
// Unfortunately, we have no way of declaring that the component constructor must implement this
// 我们无法声明组件构造函数必须实现这个
interface StaticLifecycle<P, S> {
  getDerivedStateFromProps?: GetDerivedStateFromProps<P, S>;
  getDerivedStateFromError?: GetDerivedStateFromError<P, S>;
}

type GetDerivedStateFromProps<P, S> =
  /**
   * Returns an update to a component's state based on its new props and old state.
   * Note: its presence prevents any of the deprecated lifecycle methods from being invoked */
  (nextProps: Readonly<P>, prevState: S) => Partial<S> | null;

type GetDerivedStateFromError<P, S> =
  /**
   * This lifecycle is invoked after an error has been thrown by a descendant component.
   * It receives the error that was thrown as a parameter and should return a value to update state.
   * Note: its presence prevents any of the deprecated lifecycle methods from being invoked
   */
  (error: any) => Partial<S> | null;

~~~


## 新的生命周期接口

~~~ts
// This should be "infer SS" but can't use it yet
interface NewLifecycle<P, S, SS> {
  /**
   * Runs before React applies the result of `render` to the document, and
   * returns an object to be given to componentDidUpdate. Useful for saving
   * things such as scroll position before `render` causes changes to it.
   *
   * Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated lifecycle events from running.
   */
  getSnapshotBeforeUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>): SS | null;
  /**
   * Called immediately after updating occurs. Not called for the initial render.
   * The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.
   */
  componentDidUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot?: SS): void;
}
~~~

## 废弃的生命周期

~~~ts
interface DeprecatedLifecycle<P, S> {
  /**
   * Called immediately before mounting occurs, and before `Component#render`.
   * Avoid introducing any side-effects or subscriptions in this method.
   *
   * Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps prevents this from being invoked.
   *
   * @deprecated 16.3, use componentDidMount or the constructor instead; will stop working in React 17
   * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state
   * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path
   */
  componentWillMount?(): void;
  /**
   * Called immediately before mounting occurs, and before `Component#render`.
   * Avoid introducing any side-effects or subscriptions in this method.
   *
   * This method will not stop working in React 17.
   *
   * Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps prevents this from being invoked.
   *
   * @deprecated 16.3, use componentDidMount or the constructor instead
   * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state
   * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path
   */
  UNSAFE_componentWillMount?(): void;
  /**
   * Called when the component may be receiving new props.
   * React may call this even if props have not changed, so be sure to compare new and existing
   * props if you only want to handle changes.
   *
   * Calling `Component#setState` generally does not trigger this method.
   *
   * Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps prevents this from being invoked.
   *
   * @deprecated 16.3, use static getDerivedStateFromProps instead; will stop working in React 17
   * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props
   * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path
   */
  componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void;
  /**
   * Called when the component may be receiving new props.
   * React may call this even if props have not changed, so be sure to compare new and existing
   * props if you only want to handle changes.
   *
   * Calling `Component#setState` generally does not trigger this method.
   *
   * This method will not stop working in React 17.
   *
   * Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps prevents this from being invoked.
   *
   * @deprecated 16.3, use static getDerivedStateFromProps instead
   * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props
   * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path
   */
  UNSAFE_componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void;
  /**
   * Called immediately before rendering when new props or state is received. Not called for the initial render.
   *
   * Note: You cannot call `Component#setState` here.
   *
   * Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps prevents this from being invoked.
   *
   * @deprecated 16.3, use getSnapshotBeforeUpdate instead; will stop working in React 17
   * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update
   * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path
   */
  componentWillUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void;
  /**
   * Called immediately before rendering when new props or state is received. Not called for the initial render.
   * Note: You cannot call `Component#setState` here.
   * This method will not stop working in React 17.
   * Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps prevents this from being invoked.
   * @deprecated 16.3, use getSnapshotBeforeUpdate instead
   * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update
   * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path
   */
  UNSAFE_componentWillUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void;
}

~~~

## 组合后接口

~~~ts
// 混合类型
interface Mixin<P, S> extends ComponentLifecycle<P, S> {
  mixins?: Array<Mixin<P, S>>;
  statics?: {
      [key: string]: any;
  };
  displayName?: string;
  // ValidationMap 验证映射
  propTypes?: ValidationMap<any>;
  contextTypes?: ValidationMap<any>;
  childContextTypes?: ValidationMap<any>;
  getDefaultProps?(): P;
  getInitialState?(): S;
}

interface ComponentSpec<P, S> extends Mixin<P, S> {
  render(): ReactNode;
  [propertyName: string]: any;
}
~~~

