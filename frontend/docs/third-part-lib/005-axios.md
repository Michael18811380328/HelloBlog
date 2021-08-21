# 005 axios

## 用途

主要用于发送请求，和后端交互，是 ajax 的封装。

## 可靠性

阿里项目中，推荐使用这个社区组件，github 上万使用，可以长期使用

## 官网链接

https://axios-http.com/ 

https://github.com/axios/axios 

https://axios-http.com/zh/docs/intro 

## 基本使用

下面是四种常用请求，第一个参数是 URL，第二个参数是数据，第三个参数是验证（token）

get delete 请求不需要传数据；post put 请求需要传数据

```js
axios.get(url, { headers: {'Authorization': 'Token ' + accessToken} });

axios.post(url, operation, {      
  headers: {        
    'Content-Type': 'application/json',        
    'Authorization': 'Token ' + accessToken      
  }    
});        

axios.delete(url, { headers: { 'Authorization': 'Token ' + accessToken } });            
axios.put(url, form, { headers: { 'Authorization': 'Token ' + accessToken } });
```

## 其他

未来把其他文档统一整合到这里

