# 为什么我使用 GraphQL 而放弃 REST API？



- Max Desiatov

- 平川

- 万佳

- 2021 年 5 月 09 日

- 本文字数：5911 字

  阅读完需：约 19 分钟

***本文最初发布于 Max Desiatov 的个人博客，经原作者授权由 InfoQ 中文站翻译并分享。***



在大多数移动和 Web 应用中，服务器交互需要花费开发人员大量时间和精力来开发和测试。



在我所开发的那些拥有最复杂 API 应用程序中，网络层设计和维护占去高达 40%的开发时间，特别是由于我在本文中提到的一些边缘情况。这样实现过几次后，很容易就会发现，有一些不同的模式、工具和框架可以带来帮助。虽然我们很幸运，不必再关心[SOAP](https://en.wikipedia.org/wiki/SOAP)，但[REST](https://en.wikipedia.org/wiki/Representational_state_transfer)也不是历史的终结。



最近，我有机会为自己的项目和客户开发和运行一些使用 GraphQL API 构建的移动和 Web 应用程序。这真是一个很好的体验，尤其要感谢令人惊叹的 [PostGraphile](https://www.graphile.org/postgraphile/) 和 [Apollo](https://www.apollographql.com/client)。至此，我再也无法回过头来享受使用 REST 的工作了。

## REST 有什么问题吗？

#### 每个 REST API 都是独特的

公平地说，REST 甚至不是一个标准。维基百科将其[定义](https://en.wikipedia.org/wiki/Representational_state_transfer)为：



> 一种架构风格，基于 HTTP 定义了一组约束和属性。



虽然确实存在像 JSON API 规范这样的东西，但在实践中，我们很少看到有 RESTful 后端实现它。在最好的情况下，你可能会偶然发现一些使用 [OpenAPI/Swagger](https://www.infoq.cn/article/OpenAPI/Swagger) 的东西。即使这样，OpenAPI 也没有指定 API 的形状或格式，它只是一个机器可读的规范，允许（但不是要求）你对 API 运行自动化测试、自动生成文档等。



主要问题仍然存在。你可能会说你的 API 是 RESTful 的，但是对于如何安排端点或是否应该（例如）使用 HTTP 方法`PATCH`进行对象更新，一般没有严格的规则。



还有一些东西乍一看是 RESTful 的，但如果你仔细看，就不是那么像了：[Dropbox HTTP API](https://www.dropbox.com/developers/documentation/http/documentation)。



> 端点接受请求体中的文件内容，因此，它们的参数将以 JSON 的形式在`Dropbox-API-Arg`请求头或 arg URL 参数中传递。



JSON 在请求头中？



没错，Dropbox API 端点要求你将请求正文留空，并将有效载荷序列化为 JSON，放到一个自定义的 HTTP 头中。为这种特殊情况编写客户端代码很有趣。我们不能抱怨，因为毕竟没有广泛使用的标准。



事实上，下面提到的大多数注意事项都是由于缺乏标准造成的，但是我想强调一下在实践中经常看到的情况。



在一个有经验的团队中，你可以避免这些问题，但是你难道不希望一些问题已经在软件方面得到解决吗？

#### 没有静态类型意味着要注意类型验证

无论如何努力避免这种情况，你迟早会遇到 JSON 属性拼写错误、发送或接收的数据类型错误、字段丢失等问题。如果你的客户端和/或服务器编程语言是静态类型的，并且你不能用错误的字段名或类型构造对象，那可能没问题。如果你的 API 是版本化的，旧 API 的 URL 为`/API/v1`，新版本的 URL 为`/API/v2`，那么你可能做得很好。如果有一个 OpenAPI 规范，可以为你生成客户端/服务器类型声明，那就更好了。



但你真能负担得起在所有项目中都做到这样吗？当你的团队在冲刺期间决定重命名或重新安排对象字段时，你能负担得起上线`/api/v1.99`端点的成本吗？即使完成了，团队会不会忘记更新规范并通知客户端开发人员更新内容？



在客户端或服务器上的所有验证逻辑，你确定都是正确的吗？理想情况下，你希望它在两边都得到验证，对吧？维护所有这些自定义代码非常有趣。或者保持 API JSON 模式是最新的。

#### 分页和过滤并不简单

大多数 API 都使用对象集合。在待办事项列表应用中，列表本身就是一个集合。大多数集合都可以包含 100 多个项。对于大多数服务器来说，在一次响应的一个集合中返回所有项是一个繁重的操作。如果再乘以在线用户的数量，就会产生很大的 AWS 账单。显而易见的解决方案：只返回集合的子集。



分页相对简单。在查询参数中传递类似`offset`和`limit`这样的值：`/todos?Limit =10&offset=20`以获得从 20 开始的 10 个对象。每个人对这些参数的命名都不一样，有些人喜欢`count`和`skip`，而我喜欢`offset`和`limit`，因为它们直接对应于 SQL 修饰符。



一些后端数据库会暴露要传递给下一页查询的游标或标记。请查看[Elasticsearch API](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-scroll.html)，该 API 建议在需要依次浏览大量结果文档时使用`scroll`调用。还有一些 API 在头中传递相关信息。参见[GitHub REST API](https://developer.github.com/v3/guides/traversing-with-pagination/)（至少不是在头中传递 JSON）。



说到过滤，就有趣多了……需要按一个字段过滤吗？没问题，可能是`/todos?filter=key%3Dvalue`，也可能是可读性更好的`/todos?filterKey=key&filterValue=value`。那么按两个值过滤呢？这应该很简单，对吧？使用[URL编码](https://en.wikipedia.org/wiki/Percent-encoding)，查询看起来是这个样子：`/todos?filterKeys=key1%2Ckey2&filterValue=value`。但通常，我们没有办法阻止特性蔓延，可能会出现使用`AND`/`OR`操作符进行高级过滤的需求。或者复杂的全文搜索查询和复杂的过滤。迟早你会看到一些 API 发明了自己的过滤 [DSL](https://en.wikipedia.org/wiki/Domain-specific_language)。URL 查询组件已经不够用了，但是`GET`请求中的请求体也不太好，这意味着你最终要在`POST`请求中发送非可变查询（Elasticsearch 就是这样做的）。至此，API 还是 RESTful 的吗？



无论哪种方式，客户端和服务器都需要特别注意解析、格式化和验证所有这些参数。如此多的乐趣！举例来说，如果没有恰当的验证且存在未初始化的变量，你就很容易地得到类似这样的东西：`/todos?offset=undefined`。

#### 不容易记录和测试

上面提到的 [Swagger](https://swagger.io/) 可能是目前最好的工具，但其应用还不够广泛。根据我的观察，更常见的情况是，API 文档单独维护。对一个稳定且广泛使用的 API 来说，这没什么大不了的，但是在敏捷流程的开发过程中，这就比较糟糕了。文档单独存储意味着，它经常不会更新，特别是当更改是一个小的、但会破坏客户端的更改时。



如果你不使用 Swagger，这可能意味着你需要维护专门的测试基础设施。与单元测试相比，你对集成测试（即同时测试客户端和服务器端代码）的需求会更多。

#### 关系查询和批量查询会让人更加沮丧

对于比较大的 API，这就成了一个问题，因为你可能有许多相关的集合。让我们进一步来看一个待办事项列表应用程序的例子：假设每个待办事项也可以属于一个项目。你是否总是希望一次获取所有相关的项目？可能不需要，但是还需要添加更多的查询参数。也许你不想一次获取所有对象字段。如果应用程序需要项目有所有者，并且除了每个集合有单独的视图显示外，还有一个视图显示所有这些数据的聚合？它要么是三个独立的 HTTP 请求，要么是一个复杂的请求，同时获取所有数据用于聚合。



无论哪种方式，都存在复杂性和性能上的权衡，在不断发展的应用程序中维护这些请求会带来更多令人头痛的问题。

#### 你需要同时在服务器和客户端上实现每个端点

还有大量的库可以在 [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping) 或直接数据库自省的帮助下自动生成 REST 端点。即使使用了这样的库，它们通常也不是很灵活或可扩展的。也就是说，如果需要自定义参数、高级过滤行为或对请求/响应有效负载的一些更智能的处理，就需要从头重新实现端点。



另一项任务是在客户端代码中使用这些端点。如果有的话，最好使用代码生成，但是它似乎不够灵活。即使是使用像 [Moya](https://github.com/moya/moya) 这样的辅助库，也会遇到同样障碍：有许多自定义行为需要处理，这是由前面提到的边缘情况引起的。



如果开发团队不是全栈的，那么服务器和客户端团队之间的沟通就至关重要，在没有机器可读的 API 规范的情况下更是如此。

## GraphQL 如何做得更好？

对于所有讨论过的问题，我倾向于认为，在 CRUD 应用程序中，有一种标准方式来生成和使用 API 会非常棒。通用的工具和模式、集成测试和文档基础设施将有助于解决技术和组织问题。



GraphQL 有一个 RFC 规范草案 和一个参考实现。此外，请参阅 [GraphQL教程](http://graphql.org/learn/)，它描述了你需要了解的大多数概念。有针对不同平台的实现，也有许多可用的开发工具，其中最著名的是 GraphiQL，它捆绑了一个很好的、具有自动完成功能的 API 浏览器，以及一个文档浏览器，可以浏览从 GraphQL 模式自动生成的文档。



事实上，我发现 GraphiQL 是不可或缺的。它可以帮助解决我前面提到的客户端和服务器团队之间的沟通问题。只要 GraphQL 模式中有任何更改，你就可以在 GraphQL 浏览器中看到它，就像嵌入式 API 文档。现在，客户端和服务器团队可以以一种更好的方式在 API 设计上开展合作，缩短迭代时间，共享自动生成的文档，它们让每次 API 更新对每个人都可见。要了解这些工具是如何工作的，请查看 Star Wars API 示例，它可以作为[GraphiQL的在线演示](http://graphql.org/swapi-graphql/)。



能指定从服务器请求的对象字段让客户端可以根据需要只获取需要的数据。不再有多个重量级的查询发送到一个刚性的 REST API，为了让客户端可以在应用程序 UI 中一次性显示它。你不再受限于一组端点，而是有一个可以查询和修改的模式，能够挑选客户端指定的字段和对象。服务器只需以这种方式实现顶级模式对象。

#### 一个简单的例子

GraphQL 模式定义了可用于在服务器和客户端之间通信的类型。有两种特殊类型，它们同时也是 GraphQL 的核心概念：`Query`和`Mutation`。在大多数情况下，向 GraphQL API 发出的每个请求要么是没有副作用的`Query`实例，要么是会修改存储在服务器上的对象的`Mutation`实例。



现在，继续我们待办事项列表应用程序的例子，考虑下面这个 GraphQL 模式：



```
type Project {  id: ID  name: String!}type TodoItem {  id: ID  description: String!  isCompleted: Boolean!  dueDate: Date  project: Project}type TodoList {  totalCount: Int!  items: [TodoItem]!}type Query {  allTodos(limit: Int, offset: Int): TodoList!  todoByID(id: ID!): TodoItem}type Mutation {  createTodo(item: TodoItem!): TodoItem  deleteTodo(id: ID!): TodoItem  updateTodo(id: ID!, newItem: TodoItem!): TodoItem}schema {  query: Query  mutation: Mutation}
```

复制代码



底部的`schema`块是特定的，定义了前面描述的根类型`Query`和`Mutation`。此外，它非常简单：`type`块定义新的类型，每个块包含具有自己类型的字段定义。类型可以是非可选的，例如`String!`字段不能有空值，而`String`可以。字段也可以有命名参数，所以`TodoList!`类型的字段`allTodos(limit: Int, offset: Int): TodoList!`接受两个可选参数，而其本身的值是非可选的，这意味着它将始终返回一个不能为空的`TodoList`实例。然后，要查询所有待办事项的`id`和名称，你可以编写这样一个查询：



```
query {  allTodos(limit: 5) {    totalCount    items {      id      description      isCompleted    }  }}
```

复制代码



GraphQL 客户端库根据模式自动解析和验证查询，然后将其发送到 GraphQL 服务器。请注意，`allTodos`字段的`offset`参数是缺失的。作为可选项，它的缺失意味着它有`null`值。如果服务器提供这种模式，文档中可能会声明，`null`偏移量意味着默认情况下应该返回第一页。响应可能是这样的：



```
{  "data": {    "allTodos": {      "totalCount": 42,      "items": [        {          "id": 1,          "description": "write a blogpost",          "isCompleted": true        },        {          "id": 2,          "description": "edit until looks good",          "isCompleted": true        },        {          "id": 2,          "description": "proofread",          "isCompleted": false        },        {          "id": 4,          "description": "publish on the website",          "isCompleted": false        },        {          "id": 5,          "description": "share",          "isCompleted": false        }      ]    }  }}
```

复制代码



如果你从查询中删除`isCompleted`字段，它将从结果中消失。或者你可以添加`project`字段，用其`id`和`name`来遍历关系。将`offset`参数添加到`allTodos`字段进行分页，这样`allTodos(count: 5, offset: 5)`将返回第二页。结果中提供了`totalCount`字段，这很有用，因为现在你知道总共有`42 / 5 = 9`页。但显然，如果不需要`totalCount`，你可以忽略它。查询可以完全控制将要接收的实际信息，但是底层的 GraphQL 基础设施还必须确保所有必需的字段和参数都在那里。如果你的 GraphQL 服务器足够聪明，它将不会对你不需要的字段运行数据库查询，而且有些库好到免费提供这种查询。此模式中的其他变体和查询也是如此：对输入进行类型检查和验证，并且基于查询，GraphQL 服务器知道期望的结果形状。本质上，所有通信都通过服务器上一个预定义的 URL（通常是`/graphql`）运行，借助一个简单的`POST`请求，其中包含序列化为 JSON 有效负载的查询。但是，你几乎从来都不需要接触如此低的抽象层。



总体来说还不错：我们已经解决了类型级别的验证问题，分页看起来也不错，并且在需要时可以轻松地遍历实体关系。如果使用一些现成的 GraphQL->数据库查询翻译库，你甚至不需要在服务器上编写大多数数据库查询。客户端库可以很容易地将 GraphQL 响应自动解包为所需类型的对象实例，因为从模式和查询可以提前知道响应形状。

#### GraphQL 是个时髦的东西，是一种时尚，对吗？

虽然 [Netflix falcor](https://github.com/Netflix/falcor)似乎在解决类似问题，它比 GraphQL 早几个月发布在 GitHub 上，也更早地引起我的注意，但很明显，似乎 GraphQL 赢了。良好的工具和强大的行业支持使其非常有吸引力。



除了一些客户端库中存在的一些小问题（现在已经解决了）之外，我强烈推荐你仔细看看 GraphQL 在你的技术栈中可以提供什么。它已经出技术预览四年多了，而且这个生态系统正在变得更加强大。在 Facebook 设计 GraphQL 的同时，我们也看到越来越多的大公司在他们的产品中使用它：GitHub、Shopify、Khan Academy、Coursera，而且[这个列表还在不断增长](http://graphql.org/users/)。



有很多流行的开源项目都在使用 GraphQL：这个博客是基于静态站点生成器 Gatsby，它将 GraphQL 查询的结果转换成数据，然后呈现到 HTML 文件中。如果你使用的是 WordPress，也有 GraphQL API 可以使用。Reaction Commerce 是 Shopify 的开源替代方案，同样是基于 GraphQL。



另外值得一提的两个 GraphQL 库是 PostGraphile 和 Apollo。



如果你使用 PostgreSQL 作为后端数据库，PostGraphile 能够扫描 SQL 模式并自动生成一个带有实现的 GraphQL 模式。你可以将所有常见的 CRUD 操作暴露为所有表的查询和修改。它可能看起来像 ORM，但它不是：你可以完全控制如何设计数据库模式，以及使用什么索引。



最妙的是，PostGraphile 还以查询和修改的方式暴露视图和函数，所以如果有特别复杂的 SQL 查询需要映射到 GraphQL 字段，只需创建 SQL 视图或函数，它就会自动出现在 GraphQL 模式中。通过像行级安全这样的高级 Postgres 特性，你可以通过编写少量 SQL 策略实现复杂的访问控制逻辑。PostGraphile 甚至还有模式文档这样的东西，可以从 Postgres 注释自动生成。



相应地，Apollo 提供了多个平台的客户端库，以及在最流行的编程语言（包括 TypeScript 和 Swift）中生成类型定义的代码生成器。



总的来说，我发现，Apollo 比 Relay 等更简单和易于使用。由于 Apollo 客户端库架构简单，我能够将一个使用 React.js 与 Redux 的应用慢慢过渡到 React Apollo，一个组件一个组件的，只在有意义的时候才这样做。与原生 iOS 应用一样，Apollo iOS 是一个相对轻量级的、易于使用的库。







[Max Desiatov](https://desiatov.com/)

![Max Desiatov](data:image/jpeg;base64,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)I'm **Max Desiatov**, a software consultant building mobile and backend apps. I curate **[@ServerSideSwift](https://twitter.com/ServerSideSwift)** feed, and co-maintain **[WebAssembly support for Swift](https://swiftwasm.org/)** and a framework called **[Tokamak](https://tokamak.dev/)** compatible with SwiftUI.

**[Blog](https://desiatov.com/)****[Support My Work](https://desiatov.com/sponsor)**



Why I use GraphQL and avoid REST APIs28 May, 2018

Server interactions take a significant amount of time and effort to develop and test in most mobile and web apps. In apps with most complex APIs I worked on, the networking layer took up to 40% of the development time to design and maintain, specifically due to some of the edge cases I mention below in this article. After implementing this a few times, it’s easy to see different patterns, tools and frameworks that can help with this. While we’re lucky (well, most of us are, I hope) not to care about [SOAP](https://en.wikipedia.org/wiki/SOAP) anymore, [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) isn’t the end of history either.

Recently I had a chance to develop and to run in production a few mobile and web apps built with [GraphQL](http://graphql.org/) APIs, both for my own projects and my clients. This has been a really good experience, not least thanks to wonderful [PostGraphile](https://www.graphile.org/postgraphile/) and [Apollo](https://www.apollographql.com/client) libraries. At this point, it’s quite hard for me to come back and enjoy working with REST.

But obviously, this needs a little explanation.

## So what’s wrong with REST?

### Every REST API is a snowflake

To be fair, REST isn’t even a standard. Wikipedia [defines](https://en.wikipedia.org/wiki/Representational_state_transfer) it as

> an architectural style that defines a set of constraints and properties based on HTTP

While something like [JSON API](http://jsonapi.org/) spec does exist, in practice it’s very rare that you see a RESTful backend implementing it. In best case scenario, you might stumble upon something that uses [OpenAPI/Swagger](https://en.wikipedia.org/wiki/OpenAPI_Specification). Even then, OpenAPI doesn’t specify anything about APIs shape or form, it’s just a machine-readable spec, that allows (but not requires) you to run automatic tests on your API, automatically generate documentation etc.

The main problem is still there. You may say your API is RESTful, but there are no strict rules in general on how endpoints are arranged or whether you should, for example, use `PATCH` HTTP method for object updates.

There are also things that look RESTful on a first glance, but not so much if you squint: [Dropbox HTTP API](https://www.dropbox.com/developers/documentation/http/documentation).

> endpoints accept file content in the request body, so their arguments are instead passed as JSON in the `Dropbox-API-Arg` request header or arg URL parameter.

JSON in a request header? (╯°□°）╯︵ ┻━┻

That’s right, there are Dropbox API endpoints that require you to leave request body empty and to serialise a payload as JSON and chuck it an a custom HTTP header. It’s fun to write client code for special cases like this. But we can’t complain, because there is no widely-used standard after all.

In fact, most of the caveats mentioned below are caused by lack of a standard, but I’d like to highlight what I’ve seen in practice most frequently.

And yes, you can avoid most of these problems in a disciplined experienced team, but wouldn’t you want some of this stuff to be resolved already on a software side?

### No static typing means caring about type validation

No matter how much you try to avoid this, sooner or later you stumble upon misspelt JSON properties, wrong data types sent or received, fields missing etc. You’re probably ok if your client and/or server programming language is statically typed and you just can’t construct an object with a wrong field name or type. You’re probably doing good if your API is versioned and you have an old version on `/api/v1` URL and a new version with a renamed field on `/api/v2` URL. Even better if you have an OpenAPI spec that generates client/server type declarations for you.

But can you really afford all this in all your projects? Can you afford setting up `/api/v1.99` endpoint when during a sprint your team decides to rename or rearrange object fields? Even if it’s done, will the team not forget to update the spec and to ping the client devs about the update?

You sure you have all the validation logic right either on client or on server? Ideally, you want it validated on both sides, right? Maintaining all of this custom code is a lot of fun. Or keeping your API [JSON Schema](http://json-schema.org/) up to date.

### Pagination and filtering is not so simple

Most APIs work with collections of objects. In a todo-list app, the list itself is a collection. Most collections can contain more than 100 items. For most servers returning all items in a collection in same response is a heavy operation. Multiply that by a number of online users and it can add up to a hefty AWS bill. Obvious solution: return only a subset of a collection.

Pagination is comparatively straightforward. Pass something like `offset` and `limit` values in query parameters: `/todos?limit=10&offset=20` to get only 10 objects starting at the 20th. Everyone names these parameters differently, some prefer `count` and `skip`, I like `offset` and `limit` because they directly correspond to SQL modifiers.

Some backend databases expose cursors or tokens to be passed for next page query. Check out [Elasticsearch API](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-scroll.html) that recommends using `scroll` calls when you need to go through a huge list of resulting documents sequentially. There are also APIs that pass relevant information in headers. See [GitHub REST API](https://developer.github.com/v3/guides/traversing-with-pagination/) (at least that’s not JSON passed in headers 😅).

When it comes to filtering, it’s so much more interesting… Need filtering by one field? No problem, it could be `/todos?filter=key%3Dvalue` or maybe more human-readable `/todos?filterKey=key&filterValue=value`. How’s about filtering by two values? Hm, that should be easy, right? Query would look like `/todos?filterKeys=key1%2Ckey2&filterValue=value` with [URL encoding](https://en.wikipedia.org/wiki/Percent-encoding). But often there is no way to stop the feature creep, maybe a requirement appears for advanced filtering with `AND`/`OR` operators. Or maybe complex full-text search queries together with complex filtering. Sooner or later you can see a few APIs that invent their own filtering [DSL](https://en.wikipedia.org/wiki/Domain-specific_language). URL query components are no longer sufficient, but request body in `GET` requests is not great either, which means you end-up sending non-mutating queries in `POST` requests (which is what Elasticsearch does). Is the API still RESTful at this point?

Either way, both clients and servers need to take extra care with parsing, formatting and validating all these parameters. So much fun! 🙃 As an example, without proper validation and with uninitialised variables you can easily get something like `/todos?offset=undefined`.

### Not easy to document and test

[Swagger](https://swagger.io/) mentioned above is probably the best tool for this at the moment, but it isn’t used widely enough. Much more frequently I see APIs with documentation maintained separately. Not a big deal for a stable widely used API, but much worse during development in an agile process. Documentation stored separately means it’s frequently not updated at all, especially if it’s a minor, but client-breaking change.

If you don’t use Swagger, it probably means you have specialised test infrastructure to maintain. There’s also a much higher chance you need integration tests rather than unit-tests, means testing both client and server-side code.

### Relations and batch queries make it even more frustrating

This becomes a problem with much larger APIs, where you might have a number of related collections. Let’s go further with an example of a todo-list app: suppose every todo item can also belong to a project. Would you always want to fetch all related projects at once? Probably not, but then there are more query parameters to add. Maybe you don’t want to fetch all object fields at once. What if the app needs projects to have owners and there’s a view with all this data aggregated in addition to separate views displaying each collection separately? It’s either three separate HTTP requests or one complex request with all data fetched at once for aggregation.

Either way, there are complexity and performance tradeoffs, maintaining which in a growing application brings more headaches than one would like.

### You need every endpoint implemented both on server *and* client

There is also a ton of libraries that can automatically generate a REST endpoint with some help from [ORMs](https://en.wikipedia.org/wiki/Object-relational_mapping) or direct database introspection. Even when those are used, usually they aren’t very flexible or extensible. That means reimplementing an endpoint from scratch if there is a need for custom parameters, advanced filtering behaviour or just some smarter handling of request or response payload.

Yet another task is consuming those endpoints in client code. It’s great to use code-generation if you have it, but again it seems to be not flexible enough. Even with helper libraries like [Moya](https://github.com/moya/moya), you stumble upon the same barrier: there is a lot of custom behaviour to handle, which is caused by edge cases mentioned above.

If a dev team isn’t full-stack, communication between server and client teams is crucial, even critical when there’s no machine-readable API spec.

## And how’s GraphQL better?

With all issues discussed, I’m inclined to say that in [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) apps it would be great to have a standard way to produce and consume APIs. Common tooling and patterns, integrated testing and documentation infrastructure would help with both technical and organisational issues.

[GraphQL](http://graphql.org/) has a draft [RFC](https://en.wikipedia.org/wiki/Request_for_Comments) spec and a [reference implementation](https://github.com/graphql/graphql-js). Also, check out [GraphQL tutorial](http://graphql.org/learn/), which describes most of the concepts you’d need to know. There are implementations for different platforms, and there is plenty of developer tools available as well, most notably [GraphiQL](https://github.com/graphql/graphiql), which bundles a nice API explorer with auto-completion and a browser for documentation automatically generated from a GraphQL schema.

In fact, I find GraphiQL indispensable. It can help in solving communication issues between client and server-side teams I’ve mentioned earlier. As soon as any changes are available in a GraphQL schema, you’ll be able to see it in GraphiQL browser, same with embedded API documentation. Now client and server teams can work together on API design in an even better way with shorter iteration time and shared documentation that’s automatically generated and visible to everyone on every API update. To get a feeling of how these tools work check out a Star Wars API example that is available as a [GraphiQL live demo](http://graphql.org/swapi-graphql/).

Being able to specify object fields requested from a server allows clients to fetch only data they need when they need. No more multiple heavy queries issued to a rigid REST API, which are then stitched on the client just to display it all at once in app UI. You are no longer restricted to a set of endpoints, but have a schema of queries and mutations, being able to cherry-pick fields and objects that a client specifically requires. And a server only needs to implement top-level schema objects this way.

### A quick example

A GraphQL schema defines types that can be used in communication between servers and clients. There are two special types that are also [core concepts](http://graphql.org/learn/schema/#the-query-and-mutation-types) in GraphQL: `Query` and `Mutation`. Most of the time every request that is issued to a GraphQL API is either a `Query` instance that is free of side-effects or a `Mutation` instance that modifies objects stored on the server.

Now, sticking with our todo app example, consider this GraphQL schema:

```
type Project {
  id: ID
  name: String!
}

type TodoItem {
  id: ID
  description: String!
  isCompleted: Boolean!
  dueDate: Date
  project: Project
}

type TodoList {
  totalCount: Int!
  items: [TodoItem]!
}

type Query {
  allTodos(limit: Int, offset: Int): TodoList!
  todoByID(id: ID!): TodoItem
}

type Mutation {
  createTodo(item: TodoItem!): TodoItem
  deleteTodo(id: ID!): TodoItem
  updateTodo(id: ID!, newItem: TodoItem!): TodoItem
}

schema {
  query: Query
  mutation: Mutation
}
```

This `schema` block at the bottom is special and defines root `Query` and `Mutation` types as described previously. Otherwise, it’s pretty straightforward: `type` blocks define new types, each block contains field definitions with their own types. Types can be non-optional, for example `String!` field can’t ever have `null` value, while `String` can. Fields can also have named parameters, so `allTodos(limit: Int, offset: Int): TodoList!` field of type `TodoList!` takes two optional parameters, while its own value is non-optional, meaning it will always return a `TodoList` instance that can’t be `null`.

Then to query all todos with ids and names you’d write a query like this:

```
query {
  allTodos(limit: 5) {
    totalCount
    items {
      id
      description
      isCompleted
    }
  }
}
```

GraphQL client library automatically parses and validates the query against the schema and only then sends it to a GraphQL server. Note that `offset` argument to `allTodos` field is absent. Being optional, its absence means it has `null` value. If the server supplies this sort of schema, it’s probably stated in documentation that `null` offset means that first page should be returned by default. The response could look like this:

```json
{
  "data": {
    "allTodos": {
      "totalCount": 42,
      "items": [
        {
          "id": 1,
          "description": "write a blogpost",
          "isCompleted": true
        },
        {
          "id": 2,
          "description": "edit until looks good",
          "isCompleted": true
        },
        {
          "id": 2,
          "description": "proofread",
          "isCompleted": false
        },
        {
          "id": 4,
          "description": "publish on the website",
          "isCompleted": false
        },
        {
          "id": 5,
          "description": "share",
          "isCompleted": false
        }
      ]
    }
  }
}
```

If you drop `isCompleted` field from the query, it’ll disappear from the result. Or you can add `project` field with its `id` and `name` to traverse the relation. Add `offset` parameter to `allTodos` field to paginate, and so `allTodos(count: 5, offset: 5)` will return the second page. Helpfully enough, you’ve got `totalCount` field in the result, so now you know you’ve got `42 / 5 = 9` pages in total. But obviously, you can omit `totalCount` if you don’t need it. The query is in full control of what actual information will be received, but underlying GraphQL infrastructure also ensures that all required fields and parameters are there. If your GraphQL server is smart enough, it won’t run database queries for fields you don’t need, and some libraries are good enough to provide that for free. Same with the rest of mutations and queries in this schema: input is type-checked and validated, and based on the query a GraphQL server knows what result shape is expected.

Under the hood, all communication runs through a predefined URL (usually `/graphql`) on a server with a simple `POST` request that contains the query serialised as a JSON payload. You almost never have a need to be exposed to an abstraction layer this low though.

Not too bad overall: we’ve got type-level validation issues taken care of, pagination is also looking good and entity relations can be easily traversed when needed. If you use some GraphQL -> database query translation libraries that are available, you wouldn’t even need to write most of the database queries on the server. Client-side libraries can unpack a GraphQL response automatically as an object instance of a needed type quite easily, as naturally the response shape is known upfront from the schema and queries.

### GraphQL is this new hipster thing, a fad, right?

While [falcor by Netflix](https://github.com/Netflix/falcor) seemed to be solving a similar problem, was published on GitHub a few months earlier than GraphQL and came up on my personal radar earlier, it clearly looks like GraphQL has won. Good tooling and strong industry support make it quite compelling. Aside from a few minor glitches in some client libraries (that since have been resolved), I can’t recommend highly enough to have a good look at what GraphQL could offer in your tech stack. It is [out of technical preview](http://graphql.org/blog/production-ready/) for almost two years now and the ecosystem is growing even stronger. While Facebook designed GraphQL, we see more and more big companies using it in their products as well: [GitHub](https://developer.github.com/v4/), [Shopify](https://help.shopify.com/api/custom-storefronts/storefront-api/graphql-explorer), [Khan Academy](http://engineering.khanacademy.org/posts/creating-query-components-with-apollo.htm), [Coursera](https://dev-blog.apollodata.com/courseras-journey-to-graphql-a5ad3b77f39a), and the list [is growing](http://graphql.org/users/).

There’s plenty of popular open-source projects that use GraphQL: this blog is powered by [Gatsby](https://www.gatsbyjs.org/) static site generator, which translates results of GraphQL queries into data that are rendered into an HTML file. If you’re on WordPress, a [GraphQL API](https://wpgraphql.com/) is available for it as well. [Reaction Commerce](https://github.com/reactioncommerce/reaction) is an open-source alternative to Shopify that’s also powered by GraphQL.

A few GraphQL libraries worth mentioning again are [PostGraphile](https://www.graphile.org/postgraphile/) and [Apollo](https://www.apollographql.com/client).

If you use PostgreSQL as your database on the backend, PostGraphile is able to scan a SQL schema and automatically generate a GraphQL schema with an implementation. You get all common CRUD operations exposed as queries and mutations for all tables. It may look like it’s an ORM, but it isn’t: you’re in full control of how your database schema is designed, and what indices are used. Great thing is that PostGraphile also exposes views and functions as queries and mutations, so if there is particularly complex SQL query that you’d like to map to a GraphQL field, just create that SQL view or function and it’ll appear automatically in GraphQL schema. With advanced Postgres features like [row-level security](https://www.postgresql.org/docs/10/static/ddl-rowsecurity.html), you can get complex access control logic implemented with only a few SQL policies to write. PostGraphile even has awesome things like schema documentation [generated automatically from Postgres comments](https://www.graphile.org/postgraphile/postgresql-schema-design/#table-documentation) 🤩.

In turn, Apollo provides both client libraries for multiple platforms and code generators that produce type definitions in most popular programming languages, including TypeScript and Swift. In general, I find Apollo much simpler and manageable to use than, for example, [Relay](https://github.com/facebook/relay). Thanks to simple architecture of Apollo client library, I was able to slowly transition an app that used [React.js](http://reactjs.com/) with [Redux](https://redux.js.org/) to [React Apollo](https://github.com/apollographql/react-apollo), component by component and only when it made sense to do so. Same with native iOS apps, [Apollo iOS](https://github.com/apollographql/apollo-ios) is a relatively lightweight library that’s easy to use.

In a future article, I’d like to describe some of my experience with this tech stack. In the meantime, shoot me a [message on Twitter](https://twitter.com/maxdesiatov) about your experience with GraphQL or if you’re just interested how it could work in your app 👋.

------

If you enjoyed this article, please consider [becoming a sponsor](https://desiatov.com/sponsor). My goal is to produce content like this and to work on open-source projects full time, every single contribution brings me closer to it! This also benefits you as a reader and as a user of [my open-source projects](https://github.com/MaxDesiatov), ensuring that my blog and projects are constantly maintained and improved.

------

- [How do closures and callbacks work? It's turtles all the way down →](https://desiatov.com/closures/)