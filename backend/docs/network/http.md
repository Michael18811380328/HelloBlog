# HTTP 笔记

## HTTP/2 协议

如今，一张网页通常要发出 80 到 100 个 HTTP 请求（request）。浏览器会同时跟服务器保留 6 个 TCP 连接（connection）。每个 TCP 连接同时只能处理一个请求，必须当前请求结束，才能发起另一个请求。

2015 年 2 月，IETF 发布新版 HTTP 标准 HTTP/2。HTTP/2 可以一个 TCP 连接同时处理多个 HTTP 请求。

![](https://blog.cloudflare.com/content/images/2015/12/image_1.png)

HTTP/2 需要兼容 HTTP 1.1，两者使用同样的协议符`http://`，所以需要一种自动协议升级机制 Next Protocol Negotiation（缩写 NPN）。HTTP 1.1 定义了 HTTP 信息头`Upgrade: header`，代价是多一次通信往返。服务器告诉浏览器自己支持哪些协议，然后浏览器选择所要采用的协议。但是，HTTP/2 没有采用这种方法，而是采用另一种机制 ALPN（Application Level Protocol Negotiation），具体做法是浏览器告诉服务器它支持的协议顺序，服务器挑选它所要采用的一种。

### HTTP/2 协议的特点

（1）二进制传输

[HTTP/2](http://http2.github.io/http2-spec/)是一个二进制协议，浏览器与服务器之间交换[“数据框”](http://http2.github.io/http2-spec/#FramingLayer)（frame）。每个数据框属于一个[数据流](http://http2.github.io/http2-spec/#StreamsLayer)（stream），每个数据流有一个编号（identifier）。多个流可以混合在一个连接中传递，流可以理解成组成 response 的单位。

（2）并发（concurrency）

同一个 TCP 连接之中可以同时处理多个请求，服务器可以不按照收到的顺序，发出回应。减少了服务器与浏览器之间建立多个连接的需要。使用 HTTP/2 时，HTTP 请求的数量不再是一个问题，优化主要集中在减小文件体积，利用好缓存。

传统的 HTTP 连接，在发出 Content-Length 以后，不能终止传输，否则只能新建另一个 TCP 连接。HTTP/2 允许重置（reset）某个流，传输一个新的流。

（3）多工的流传输（Multiplexing）

这些数据流都是多工的（multiplexed），即浏览器可以向服务器发送，服务器也可以向浏览器发送。也就是说，即使浏览器并没有请求某个资源，服务器也可以向浏览器推送（Server push）。

![](/image/http-connection-2014-12-06.png)

1. 客户端请求 page.html
2. 服务器发现网页包含 script.js，就自己向浏览器发送 stream 2，发送该脚本。
3. 服务器发起 Stream 3，向浏览器推送 style.css。

（4）信息头压缩（Header compression）

HTTP 请求的头信息也是压缩后再发送的，使用 HPACK 算法。

（5）流依赖管理（Stream dependencies）

客户端可以告诉服务器，哪个资源更重要。不同的数据流，可以指定优先性和所依赖的流（dependencies and prioritization）。

![](https://blogs.akamai.com/assets_c/2015/02/Ludkin%20Blog%20Image%203-thumb-400x508-3507.png)

另外，虽然 HTTP/2 并没有规定，一定要使用加密链接（TLS/SSL），但是所有的浏览器目前都要求，只有加密连接，才能使用 HTTP/2 协议。

### 与 HTTP 1.1 的比较

（1）请求的对象数目

HTTP 1.1 ：对于同一个 TCP 连接，一次只能请求一个对象。只有收到服务器回应后，才能请求下一个对象。

![](https://blogs.akamai.com/assets_c/2015/02/Ludkin%20Blog%20Image%201-thumb-400x523-3495.png)

HTTP/2：启用了多工（multiplexing），对于同一个 TCP 连接，浏览器能够送出任意数目的请求，收到的 HTTP 请求是没有次序的。

![](https://blogs.akamai.com/assets_c/2015/02/Ludkin%20Blog%20Image%202-thumb-400x579-3501.png)

（2）HTTP 头信息的压缩

HTTP 1.1：每次请求，浏览器需要提供许多 session 信息，这部分要占据大量的 HTTP 头信息，造成每次请求的体积很大。

HTTP/2：浏览器和服务器都会对 HTTP 头信息进行压缩。此外，完整的头信息只需要送出一次。

（3）

HTTP 1.1：通信只能由客户端发起，这意味着服务器只能收到请求后，推送资源到客户端。

HTTP/2：服务器能够发起通信，推送到客户端。这就能够减少 GET 请求的数目。

以下的网页优化今后将不再需要。

- 文件合并
- 域名分设（Domain sharding）：这一步应该首先去除，因为它增加 DNS 查找的时间。Sharding 的原因有两个，一个不占用 TCP 请求通道；二是为图片等静态资源，新增没有 cookie 的域名。
- 行内资源（Resource inlining）：data URL
- Image sprites
- 使用不含 cookie 的域名

HTTP 1.1 定义了 pipelining，允许一个请求尚未得到回应的情况下，就发出另一个请求。但是，大多数浏览器默认没有打开这项功能。

发出 HTTP 请求就像在超市排队付款，一共只有 6 条队伍，前面的人排满了，后面的人就只有等着。

## HTTP 动词

`POST`方法有三种数据编码方式，在 body 部分传送数据。

表单的`enctype`属性用来指定表单数据的`content-type`。数据会按照指定方式编码，上传到服务器。

**（1）x-www-form-urlencoded**

这是表单数据的默认编码方式。

键名和键值必须转义，空格变为`+`。非英文字母和数字会被`%HH`替换，其中的`HH`是两个十六进制值，表示该字符的 ASCII 码。换行符会被替换成“CR LF”（即`%0D%0A`）。

键名与键值之间使用`=`分隔，键值对之间使用`&`连接。

```javascript
MyVariableOne=ValueOne&MyVariableTwo=ValueTwo
```

`content-type`的值是`application/x-www-form-urlencoded`。

**（2）form-data**

这种格式用于发送大量的二进制数据，或者包含非 ASCII 字符的文本。

下面是一个例子。

```javascript
   Content-Type: multipart/form-data; boundary=AaB03x

   --AaB03x
   Content-Disposition: form-data; name="submit-name"

   Larry
   --AaB03x
   Content-Disposition: form-data; name="files"; filename="file1.txt"
   Content-Type: text/plain

   ... contents of file1.txt ...
   --AaB03x--
```

发送二进制文件的例子。

```javascript
   Content-Type: multipart/form-data; boundary=AaB03x

   --AaB03x
   Content-Disposition: form-data; name="submit-name"

   Larry
   --AaB03x
   Content-Disposition: form-data; name="files"
   Content-Type: multipart/mixed; boundary=BbC04y

   --BbC04y
   Content-Disposition: file; filename="file1.txt"
   Content-Type: text/plain

   ... contents of file1.txt ...
   --BbC04y
   Content-Disposition: file; filename="file2.gif"
   Content-Type: image/gif
   Content-Transfer-Encoding: binary

   ...contents of file2.gif...
   --BbC04y--
   --AaB03x--
```

`content-type`的值位`multipart/form-data`。

## HTTP 信息头

### Access-Control-Allow-Origin

HTTP 回应。Cors 相关，表示允许 Ajax 跨域请求。

```
Access-Control-Allow-Origin: *
```

### Cache-Control

`Cache-Control`提供 Cache 控制。

- `max-age=[seconds]` 当前 cache 最长保存时间
- `s-maxage=[seconds]` 类似 max-age，但只用于共享 cache（即 proxy 服务器）
- public 表示已认证的 HTTP 回应也可以共享 cache（proxy 服务器）
- private 表示 cache 只能用于浏览器，不能用于 proxy
- no-cache 严格声明每次都要向服务器验证
- no-store 不能保存 cache
- must-revalidate 一旦缓存过期，就要重新验证
- proxy-revalidate 类似 must-revalidate，但是只用 proxy 服务器

```http
Cache-Control: max-age=3600, must-revalidate
```

Cache-Control 的优先性高于 Expires。

### Content-Security-Policy

`Content-Security-Policy`指定当前网页允许加载外部资源的范围。

```http
Content-Security-Policy: default-src 'self' trustedscripts.foo.com
```

上面代码表示，`default-src`表示当前设置默认适用于各种场合，`self`表示当前网址，`trustedscripts.foo.com`表示指定的安全网址。

### Expires

网页何时过期。

```http
Expires: Fri, 30 Oct 1998 14:19:41 GMT
```

### Type

HTTP 回应的类型。

```
Type: application/x-web-app-manifest+json
```

### 安全相关的 HTTP 头信息

- Content-Security-Policy
  - Content-Security-Policy-Report-Only
  - X-Webkit-Content-Security-Policy
  - X-Content-Security-Policy
- Public-Key-Pins
  - Public-Key-Pins-Report-Only
- Strict-Transport-Security
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection
- X-Download-Options
- X-Permitted-Cross-Domain-Policies
- Strict-Transport-Security enforces secure (HTTP over SSL/TLS) connections to the server
- X-Frame-Options provides clickjacking protection
- X-XSS-Protection enables the Cross-site scripting (XSS) filter built into most recent web browsers
- X-Content-Type-Options prevents browsers from MIME-sniffing a response away from the declared content-type
- Content-Security-Policy prevents a wide range of attacks, including Cross-site scripting and other cross-site injections

## 参考网址

- Daniel Stenberg, [http2 explained](http://daniel.haxx.se/http2/)
- Stephen Ludin, [With HTTP/2, Akamai Introduces Next Gen Web](https://blogs.akamai.com/2015/02/with-http2-akamai-introduces-next-gen-web.html)
