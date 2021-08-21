# 003 antd-mobile

## 用途

蚂蚁金服 UI 移动端组件

组件丰富、按需加载、性能出众、简易定制

## 可靠性

阿里系通用移动端组件

下载量2万（主要是国内用户或者cnpm下载），星标8万

## 官网链接

https://mobile.ant.design/

https://www.npmjs.com/package/antd-mobile

https://github.com/ant-design/ant-design-mobile


## 基本使用

```js
import { Button } from 'antd-mobile';
ReactDOM.render(<Button>Start</Button>, mountNode);

import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'
```

实际使用

```js
import { List } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

<List className="mt-4">
  {inviteLinks.map((item) => {
    const url = item;
    return(
      <Item 
        key={item.token} 
        multipleLine 
        extra={
          <div>
            <span className="mr-2">{permissionTip}</span>
            <Icon type="ellipsis" onClick={() => {}}/>
          </div>
        }
      >
        {url}
        <Brief>{t('Expire_Date')}</Brief>
      </Item>
    );
  })}
</List>
```

## 其他

强烈推荐样式表按需加载

https://github.com/ant-design/ant-design-mobile/blob/master/docs/react/introduce.en-US.md#%E5%AE%89%E8%A3%85

如果多个 UI 库同时使用，按需加载后，不能确保 css 的顺序，这是现在最大的问题
