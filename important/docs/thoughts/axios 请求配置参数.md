# axios 请求配置参数

重要

目前遇到下面几个字段

- baseURL: 基本的URL，在初始化 axios.create({}) 设置这个参数，用于简化请求的 URL，如果请求 URL 中没有完整的 URL，那么直接使用 baseURL + path 拼接。
- headers: 自定义请求头，{} 包括 Authorization: Token xxx 用于传递 token 验证，或者 {'X-Requested-With': 'XMLHttpRequest'}, 说明发出的是 ajax 请求，具体的参数说明见 HTTP 请求头参数。

参考链接：

- https://axios-http.com/zh/docs/req_config
- https://stackoverflow.com/questions/45578844/how-to-set-header-and-options-in-axios