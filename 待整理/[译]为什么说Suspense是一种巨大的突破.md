# [译]为什么说Suspense是一种巨大的突破

来源：

[https://medium.com/react-in-depth/why-react-suspense-will-be-a-game-changer-37b40fea71ecmedium.com/react-in-depth/why-react-suspense-will-be-a-game-changer-37b40fea71ec](https://link.zhihu.com/?target=https%3A//medium.com/react-in-depth/why-react-suspense-will-be-a-game-changer-37b40fea71ec)

这篇文章不会深入研究React Suspense的技术细节以及它如何在幕后工作，已经有很多很棒的博客文章，视频和会议演讲。相反，我想更多地关注Suspense对应用程序开发人员的影响，就像我们如何考虑应用中的加载状态和架构一样。

## **简单的介绍**

为了让所有没有听说过Suspense或者不知道它是什么的人更好的理解，我仍然想要简单的介绍一下Suspense。

去年，[Dan Abramov在JSConf冰岛](https://link.zhihu.com/?target=https%3A//www.youtube.com/watch%3Fv%3DnLF0n9SACd4)提出Suspense，在处理React应用程序中的异步数据获取时，Suspense被认为是一种提升开发者开发体验的巨大改进。这是一个巨大的变化，因为每个正在构建动态Web应用程序的人都知道，这仍然是开发过程中主要的痛点之一，同样也会产生许多的样板代码。

同时，Suspense也改变了我们思考加载状态的方式，即我们不应该将fetching component或data source耦合，而是应该更多的关注UI(将数据获取这些内容交给React框架去处理)。为了提升用户体验，我们的应用程序应该在合适的时机展示spinners(loading)，Suspense将有助于将这部分内容解耦。

![img](https://pic3.zhimg.com/80/v2-e3fa404f16db90b8071a7c2f3f6c3f7a_1440w.jpg)

Suspense不仅能用于API数据提取范围，还可以应用于任何异步数据流，例如，code split或assents loading。 React.lazy与Suspense特性已经在[React稳定版本中发布](https://link.zhihu.com/?target=https%3A//reactjs.org/blog/2018/10/23/react-v-16-6.html)，其允许用户轻松对动态加载bundle进行拆分，而无需手动处理加载状态。包含数据获取功能的Suspense完全版本必须等到今年晚些时候，但已经可以通过当前的alpha版本进行体验。

通常的想法是， Suspense允许组件“suspend”它们的渲染。例如，如果他们需要从外部来源加载额外数据，一旦所有依赖的资源(数据或资源文件)都存在了，React将重新尝试渲染组件。

为了实现上面描述的功能，React使用Promises。组件可以在其render方法中抛出Promise（[或者在组件渲染期间调用的任何东西](https://link.zhihu.com/?target=https%3A//twitter.com/acdlite/status/969428655238557697)，例如新的静态方法getDerivedStateFromProps); React捕获抛出的Promise并在组件树上查找最接近的Suspense组件，它充当一种边界；Suspense组件接受一个组件作为fallback prop，当其子树中的任何子项被挂起时，都会呈现该元素。

React还会跟踪抛出的Promise。一旦promise被resolve了，就会再次渲染组件。这假定由于Promise被resolve，被suspend的组件现在已经获取了能够正确渲染所需的所有信息。为此，我们使用某种形式的缓存来存储数据，在每次渲染时，我们通过这个缓存来确定数据是否已经可用（然后它只是从变量中读取它), 在这种情况下它会触发fetch,并抛出Promise的结果来让React捕获。如上所述，这不仅适用于data fetching，任何可以使用Promise描述的异步操作都适用，code split是一个非常明显和流行的例子。

Suspense的核心概念与[error boundaries](https://link.zhihu.com/?target=https%3A//reactjs.org/docs/error-boundaries.html)非常相似，error boundaries在React 16中引入，允许在应用程序内的任何位置捕获未捕获的异常，然后在组件树中展示跟错误信息相关的组件。以同样的方式，Suspense组件从其子节点捕获任何抛出的Promises，不同之处在于对于Suspense我们不必使自定义组件充当边界，Suspense组件就是那个边界；而在error boundary中，我们需要为边界组件定义(componentDidCatch)方法。



这一整套方法大大简化了我们考虑应用程序加载状态的方式，降低了开发人员的心智负担。

对于大多数应用开发者而言，他们通常不考虑数据源，而是考虑接口或应用程序中的逻辑和信息层次结构。而且您知道还有谁不关心您的数据来源吗？用户。没有人喜欢具有数千个独立loading的应用程序，其中一些只闪烁几毫秒，页面内容在数据请求的过程中会发生跳动。

## **所以为什么Suspense是一种巨大的突破呢？**

要了解这个问题，让我们来看看，目前如何在我们的应用程序中处理数据提取。 最原始的方法是将所有必需的信息存储为本地状态，这看起来像这样：

```js
class DynamicData extends Component {
  state = {
    loading: true,
    error: null,
    data: null
  };

  componentDidMount () {
    fetchData(this.props.id)
      .then((data) => {
        this.setState({
          loading: false,
          data
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error: error.message
        });
      });
  }

  componentDidUpdate (prevProps) {
    if (this.props.id !== prevProps.id) {
      this.setState({ loading: true }, () => {
        fetchData(this.props.id)
          .then((data) => {
            this.setState({
              loading: false,
              data
            });
          })
          .catch((error) => {
            this.setState({
              loading: false,
              error: error.message
            });
          });
      });
    }
  }

  render () {
    const { loading, error, data } = this.state;
    return loading ? (
      <p>Loading...</p>
    ) : error ? (
      <p>Error: {error}</p>
    ) : (
      <p>Data loaded  </p>
    );
  }
}
```

我们在组件mount时获取数据，并修改state；此外，我们还通过local state来跟踪错误和加载状态。这看起来很熟悉吗？即使你没有使用本地的state，也可能是某种抽象，但你仍然需要写很多的三元表达式来处理这些状态。

我不会说这种方法本身是不好的（它能够满足简单用例的需要，而且我们显然可以轻松地对其进行优化，例如将实际的data fetcing抽象到单独的方法中）。但是这种方式要想规模化(scale)非常难，开发体验也很糟糕。我们可以看到这种方式有如下几个问题：

- **丑陋的三元表达式→糟糕的DX**： 加载和错误状态是通过渲染中的三元组定义的，从而使代码不必要地复杂化。我们不是描述了一个渲染函数，我们描述了三个。
- **样板代码→坏DX：** 处理所有这些状态带来了许多样板代码：在mount的时候触发fetch，更新loading状态；并在成功时将数据存储在state中，或在失败时存储错误信息。我们需要为使用外部数据的每个组件重复此操作。
- **受限数据和加载状态→糟糕的DX和UX：** 状态被处理并存储在组件中，这意味着我们将在应用程序中展示大量的loading；并且如果我们有依赖于相同数据的不同组件，则会对相同的endpoint进行多次不必要的重复调用。通过这种方法，加载状态与数据提取及其组件相关联，这种限制使得，我们只能在特定的组件内处理它，而不能在更广泛的应用程序环境中处理它。
- **重新获取数据→坏DX**
  更改页面的id，然后触发重新获取数据逻辑很难实现。我们必须在componentDidMount中进行初始的data fetching，另外还要检查componentDidUpdate中的id是否发生了变化，来决定是否需要再次执行data fetching。
- **闪烁的loading→糟糕的用户体验**
  如果用户的互联网连接足够快，显示loading只有几毫秒甚至比完全没有显示任何东西更糟糕，这会使你的应用程序感觉更加笨拙和慢。

你能看到这种模式吗？对于许多人来说，这可能并不令人感到惊讶，但对我而言，实际上并非如此清晰地说明了实际开发人员和用户体验的实际情况。

因此，在确定问题之后，我们如何解决这些问题？

## **Context**

长期以来，Redux一直是解决这些问题的优秀方案。借助React 16中的“新”Context API，我们获得了另一个很棒的工具，可帮助我们在全局级别定义和公开数据，同时使其可以在深层嵌套的组件树中轻松访问。所以为了简单起见，我们将在这里使用后者。

首先，我们可以轻松地将之前存储在state的所有信息提取到context中，这将允许我们与其他组件共享它。此外，还能通过provider对外暴露的方法来执行data fetching，以便我们的组件只要调用了该方法，就能更新context中存储的信息。在React 16.6中发布的[contextType](https://link.zhihu.com/?target=https%3A//reactjs.org/docs/context.html%23classcontexttype)使得它更加优雅，不那么冗长。

provider还可以作为缓存的一种形式，如果数据已经存在或加载，则阻止我们多次请求相同的数据，例如，由另一个组件触发。

```js
const DataContext = React.createContext();

class DataContextProvider extends Component {
  // We want to be able to store multiple sources in the provider,
  // so we store an object with unique keys for each data set +
  // loading state
  state = {
    data: {},
    fetch: this.fetch.bind(this)
  };

  fetch (key) {
    if (this.state[key] && (this.state[key].data || this.state[key].loading)) {
      // Data is either already loaded or loading, so no need to fetch!
      return;
    }

    this.setState(
      {
        [key]: {
          loading: true,
          error: null,
          data: null
        }
      },
      () => {
        fetchData(key)
          .then((data) => {
            this.setState({
              [key]: {
                loading: false,
                data
              }
            });
          })
          .catch((e) => {
            this.setState({
              [key]: {
                loading: false,
                error: e.message
              }
            });
          });
      }
    );
  }

  render () {
    return <DataContext.Provider value={this.state} {...this.props} />;
  }
}

class DynamicData extends Component {
  static contextType = DataContext;

  componentDidMount () {
    this.context.fetch(this.props.id);
  }

  componentDidUpdate (prevProps) {
    if (this.props.id !== prevProps.id) {
      this.context.fetch(this.props.id);
    }
  }

  render () {
    const { id } = this.props;
    const { data } = this.context;

    const idData = data[id];

    return idData.loading ? (
      <p>Loading...</p>
    ) : idData.error ? (
      <p>Error: {idData.error}</p>
    ) : (
      <p>Data loaded  </p>
    );
  }
}
```

我们甚至可以尝试删除组件中的三元组。假设我们希望loading组件在组件树中更高的层级，覆盖的不仅仅是这个组件。既然我们在context中有加载状态，我们可以在我们想要的地方简单地访问它，并在那里显示loading，对吧？

这仍然是有问题的，因为AsyncData组件需要被渲染，以便首先触发data fetching。当然，我们也可以在组件树的更高一个层次来执行data fetching，而不是在组件中触发它，但这并没有真正解决问题，它只是将其移动到其他地方。它对代码的可读性和可维护性也很不利，因为AsyncData依赖于其他一些组件来为它进行数据加载。这种依赖既不明确也不好。理想情况下，我们的组件可以独立工作，因此可以将它们放在任何位置，而不必依赖于其周围组件树中特定位置的其他组件。 但至少现在我们将所有数据和加载状态放在一个中心位置，这是一种改进。由于我们能够将provider放在任何地方，我们可以从任何我们想要的地方使用这些信息和功能，这意味着其他组件可以利用它（不再需要冗余代码），并且可以重用已经加载的数据，从而消除了不必要的API调用。

我们来总结一下这种方式的优缺点：

- **丑陋的三元组：**这里没有任何改变，现在我们所能做的就是将三元组移到其他地方，这并没有真正解决DX问题。
- **样板代码：**我们删除了之前所需的所有样板。我们只需触发从上下文中获取和读取数据以及加载状态，从而减少重复代码，从而提高剩余可读性和可维护性。
  **受限数据和加载状态：**我们现在有一个可以在应用程序的任何地方访问的全局状态。所以我们显着改善了这种情况，但是无法解决所有问题：如果我们想要显示加载状态，加载状态仍然会耦合到数据源（即使我们发现这些依赖关系的作弊）加载各自信息的多个组件，我们仍然必须明确知道哪些来源并手动检查所有单独的加载状态。
- 重新获取数据: 这里什么都没改变......
- 闪烁的loading： 这里仍然有问题



## **Suspense**

所以Suspense如何来解决上面这些问题呢？

首先，我们可以摆脱context，数据获取和缓存将由cache provider完成，它实际上可以是任何东西: context，localStorage，window对象（如果你真的想要甚至是Redux），你可以命名它。所有这些provider基本上都存储了我们要求的信息。在每个请求中，它首先检查信息是否已经存在了，如果是这样，直接return；如果没有，获取数据，并抛出Promise。在解析Promise之前，它将获取的数据存储在它用于缓存的任何内容中，这样当React触发重新渲染时，一切都复用。显然，考虑到缓存失效和SSR等问题，使用更复杂的用例会变得更复杂，但这是它的一般要点。

这种缓存功能也是包含data fetching的完全版Suspense尚未正式release的原因之一。如果你想要一个实验性的缓存功能，可以使用名为[react-cache](https://link.zhihu.com/?target=https%3A//github.com/facebook/react/tree/master/packages/react-cache)的实验package。但请注意，在早期阶段，API肯定会发生变化，许多常见用例尚未涵盖。

![img](https://pic3.zhimg.com/80/v2-b82e29b253b32b08e09bf0830a5a4d46_1440w.jpg)



除此之外，我们还可以摆脱所有加载状态三元组。更重要的是，不是在组件mount和update的时候获取，而是借助Suspense在render阶段来执行，如果数据还不可用，则执行suspend。这可能看起来像一个反模式（毕竟我们总是被告知不要这样做），但考虑到如果数据在缓存中，provider将只需要返回它并且渲染就可以了。

```js
import createResource from './magical-cache-provider';
const dataResource = createResource((id) => fetchData(id));

class DynamicData extends Component {
  render () {
    const data = dataResource.read(this.props.id);
    return <p>Data loaded  </p>;
  }
}
```

最后，我们可以放置suspend组件并定义我们想要在获取数据时展现的fallback组件。

```js
class App extends Component {
  render () {
    return (
      <Suspense fallback={<p>Loading...</p>}>
        <DeepNesting>
          <ThereMightBeSeveralAsyncComponentsHere />
        </DeepNesting>
      </Suspense>
    );
  }
}

// We can also be very specific with multiple boundaries
// They don't need to know what components might be suspending
// their render or why, they just catch whatever bubbles up and
// handle it as intended
class App extends Component {
  render () {
    return (
      <Suspense fallback={<p>Loading...</p>}>
        <DeepNesting>
          <MaybeSomeAsycComponent />
          <Suspense fallback={<p>Loading content...</p>}>
            <ThereMightBeSeveralAsyncComponentsHere />
          </Suspense>
          <Suspense fallback={<p>Loading footer...</p>}>
            <DeeplyNestedFooterTree />
          </Suspense>
        </DeepNesting>
      </Suspense>
    );
  }
}
```

然后我们来总结一下Suspense的特点：

- ❤️**丑陋的三元组：**不见了。fallback渲染现在由suspense处理，这使代码更直观，加载状态已成为UI关注点，与实际data fetching分离。
- ❤️**样板代码：**我们完全不需要生命周期方法来触发获取，并且进一步改进了这个。此外，未来的将会由package来充当cache provider，只需要在更改存储解决方案时切换它们。
- ❤️**限制数据和加载状态：**解决了。现在我们有明确的加载状态边界，其并不关心触发加载的来源或原因。每当boundary内的任何组件被suspend时，将呈现加载状态。
- ❤️**重复获取数据：**由于我们（可以）在render方法中直接传递源，当props更新时，如果数据获取依赖于改props，将会触发重新获取数据，而无需我们执行任何操作。cache provider负责这一点。
  **闪烁的loading:** 嗯，这还是个问题 。

## **Concurrent mode彻底解决所有问题**

Concurrent模式，以前称为Async React，是另一个即将推出的功能，它允许React一次处理多个任务，根据定义的优先级在它们之间切换，有效地允许它进行多任务。安德鲁·克拉克在最后一次ReactConf上做了一次精彩的演讲，包括一个对用户产生深远影响的精彩演示。我不想在这里详细介绍所有细节，但这确实值得一提。

但是，通过向我们的应用程序添加并发模式，Suspense可以使用一个新功能，我们可以通过Suspense组件上的prop来控制。如果我们现在传入maxDuration，boundary将延迟显示loading一段时间，从而防止loading不必要地闪烁，来实现良好的用户体验。

```js
// Instead of this...
ReactDOM.render(<App />, document.getElementById('root'));

// ...we do this
ReactDOM.createRoot(document.getElementById(‘root’)).render(<App />);
```

要明确的是，这不会使数据获取的速度更快，但在用户层面会有这样的感受，并且用户体验将得到显着改善。

此外，Suspense并不强依赖于并发模式。正如我们之前看到的那样，一般的功能在没有并发模式的情况下，能够完美地工作并且已经解决了许多问题，并发模式更多的是锦上添花，不是绝对必要但如果有的话很棒。



总结一下：Suspense的提出，最大的优势是提升开发体验，减少样板代码，使得代码更好维护，并且在一定程度上带来更好的用户体验。