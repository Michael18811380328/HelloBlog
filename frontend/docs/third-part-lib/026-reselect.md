# 026 reselect

## 用途

Simple “selector” library for Redux (and others) inspired by getters

redux 中的选择器组件

## 可靠性

360 万下载

## 官网链接

https://www.npmjs.com/package/reselect

## 基本使用

```js
import { createSelector } from 'reselect'

// 不同的选择器支持从 state 中直接选择状态
const shopItemsSelector = state => state.shop.items
const taxPercentSelector = state => state.shop.taxPercent
 
const subtotalSelector = createSelector(
  shopItemsSelector,
  items => items.reduce((acc, item) => acc + item.value, 0)
)
 
// 可以给 createSelector 传递多个函数，链式处理
const taxSelector = createSelector(
  subtotalSelector,
  taxPercentSelector,
  (subtotal, taxPercent) => subtotal * (taxPercent / 100)
)
 
export const totalSelector = createSelector(
  subtotalSelector,
  taxSelector,
  (subtotal, tax) => ({ total: subtotal + tax })
)
 
let exampleState = {
  shop: {
    taxPercent: 8,
    items: [
      { name: 'apple', value: 1.20 },
      { name: 'orange', value: 0.95 },
    ]
  }
}
 
console.log(subtotalSelector(exampleState)) // 2.15
console.log(taxSelector(exampleState))      // 0.172
console.log(totalSelector(exampleState))    // { total: 2.322 }
```

第二个案例详见官网介绍

## 其他

这个是基于 redux 库的选择器
