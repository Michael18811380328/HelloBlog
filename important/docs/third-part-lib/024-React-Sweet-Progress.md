# 024 React Sweet Progress

## 用途

react 实现的进度条（UI小组件）

A way to quickly add a react progress bar to your app

## 可靠性

200个星星

周下载量9000

## 官网链接

https://www.npmjs.com/package/react-sweet-progress

https://github.com/abraztsov/react-sweet-progress

## 基本使用

```js
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

<Progress percent={88} status="success" />
<Progress type="circle" percent={100} status="success" />
```

实际使用
```js
<Progress 
      type="circle" 
      percent={props.uploadPercent} 
      width={30}
      theme={
        {
          default: {
            color: 'rgba(0, 0, 0, 0.6)',
          },
          active: {
            color: '#fff',
          },
          success: {
            symbol: props.tipText,
            color: '#fff',
          }
        }
      }
      style={
        {
          color: '#fff',
          fontSize: '12px',
          transform: 'rotate(-90deg)',
          position: 'absolute',
          zIndex: 1000,
        }
      }
      symbolClassName={'file-upload-span'}
    />
```

## 其他

2018年后未更新
