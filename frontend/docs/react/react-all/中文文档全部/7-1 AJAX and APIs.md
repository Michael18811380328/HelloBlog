# AJAX and APIs

### 如何在 React 中发起 AJAX 请求？

在 React 开发中，你能使用任何你喜欢的 AJAX 库，比如社区比较流行的 [Axios](https://github.com/axios/axios)，[jQuery AJAX](https://api.jquery.com/jQuery.ajax/)，或者是浏览器内置的 [window.fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)。

### 应该在 React 组件的哪个生命周期函数中发起 AJAX 请求？

我们推荐你在 [`componentDidMount`](https://zh-hans.reactjs.org/docs/react-component.html#mounting) 这个生命周期函数中发起 AJAX 请求。这样做你可以拿到 AJAX 请求返回的数据并通过 `setState` 来更新组件。

### 示例：使用 AJAX 请求结果去改变组件内部 state

下面这个组件演示了如何在 `componentDidMount` 中发起 AJAX 请求去更新组件的 state 。

示例 API 返回如下的 JSON 对象：

```jsx
{
  "items": [
    { "id": 1, "name": "Apples",  "price": "$2" },
    { "id": 2, "name": "Peaches", "price": "$5" }
  ] 
}

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://api.example.com/items")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        // 注意：需要在此处处理错误
        // 而不是使用 catch() 去捕获错误
        // 因为使用 catch 去捕获异常会掩盖掉组件本身可能产生的 bug
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.name}>
              {item.name} {item.price}
            </li>
          ))}
        </ul>
      );
    }
  }
}
```

Here is the equivalent with [Hooks](https://reactjs.org/docs/hooks-intro.html):

```jsx
function MyComponent() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("https://api.example.com/items")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.items);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {items.map(item => (
          <li key={item.name}>
            {item.name} {item.price}
          </li>
        ))}
      </ul>
    );
  }
}
```

