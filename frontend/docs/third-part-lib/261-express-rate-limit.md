# 261 express-rate-limit

## 用途

限制 express 的请求次数（避免API请求次数太多）

## 可靠性

50多万下载

## 官网链接

https://www.npmjs.com/package/express-rate-limit

## 基本使用

For an API-only server where the rate-limiter should be applied to all requests:

```js
const rateLimit = require("express-rate-limit");

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

//  apply to all requests
app.use(limiter);
```

## 其他

这个是 express 上面的一个工具，需要学会 nginx 等基本使用才行
