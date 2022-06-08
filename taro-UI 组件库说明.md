# Taro-ui 常用 UI 组件库说明

https://taro-ui.jd.com/#/docs/introduction

### 安装

~~~bash
npm install -g @tarojs/cli
taro init myApp

cd myApp
npm install taro-ui
~~~

在 taro 项目的 `config/index.js` 中新增如下配置项：

~~~json
h5: {
  esnextModules: ['taro-ui']
}
~~~

样式文件，支持全部引入，或者按需加载

~~~js
import 'taro-ui/dist/style/index.scss'
~~~

~~~css
@import "~taro-ui/dist/style/index.scss";
~~~

注意：
这个 UI 库使用使用 scss 预处理样式和 TS 语法，所以原来的项目也需要改成 TS + SCSS，否则项目无法正常导入运行（报错语法不正确）。所以现在需要重构一下项目。


### Icon图标

两种方式使用

~~~jsx
<View className='at-icon at-icon-settings'></View>


import { AtIcon } from 'taro-ui'
@import "~taro-ui/dist/style/components/icon.scss";
<AtIcon value='clock' size='30' color='#F00'></AtIcon>
~~~

主要的图标有几十个（图标示例）基本够用

也支持第三方的 font-awesome 库



### Button按钮

~~~jsx
import { AtButton } from 'taro-ui'

@import "~taro-ui/dist/style/components/button.scss";
@import "~taro-ui/dist/style/components/loading.scss";

<AtButton>按钮文案</AtButton>
<AtButton type='primary' size='small'>按钮文案</AtButton>
<AtButton type='secondary' size='normal'>按钮文案</AtButton>
<AtButton loading type='primary'>按钮文案</AtButton>
~~~



### Fab浮动按钮

浮动悬浮按钮

~~~jsx
import { AtFab } from 'taro-ui'
@import "~taro-ui/dist/style/components/fab.scss";

<AtFab onClick={this.onButtonClick.bind(this)}>
  <Text className='at-fab__icon at-icon at-icon-menu'></Text>
</AtFab>
~~~

### Avatar头像

```jsx
import { AtAvatar } from 'taro-ui'
@import "~taro-ui/dist/style/components/avatar.scss";

<AtAvatar circle image='https://jdc.jd.com/img/200'></AtAvatar>
```

### Article文章样式

```jsx
@import "~taro-ui/dist/style/components/article.scss";

<View className='at-article'>
  <View className='at-article__h1'>
    这是一级标题这是一级标题
  </View>
  <View className='at-article__info'>
    2017-05-07&nbsp;&nbsp;&nbsp;这是作者
  </View>
  <View className='at-article__content'>
    <View className='at-article__section'>
      <View className='at-article__h2'>这是二级标题</View>
      <View className='at-article__h3'>这是三级标题</View>
      <View className='at-article__p'>
        这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本落。这是文本段落。1234567890123456789012345678901234567890 ABCDEFGHIJKLMNOPQRSTUVWXYZ
      </View>
      <View className='at-article__p'>
        这是文本段落。这是文本段落。
      </View>
      <Image 
        className='at-article__img' 
        src='https://jdc.jd.com/img/400x400' 
        mode='widthFix' />
    </View>
  </View>
</View>
```

~~~css
.at-article /* 根类名 */
.at-article__h1 /* 一级标题 */
.at-article__h2 /* 二级标题 */
.at-article__h3 /* 三级标题 */
.at-article__info /* 作者信息 */
.at-article__p /* 段落 */
.at-article__img /* 图片 */
~~~

### Badge徽标

### Countdown倒计时

### Curtain幕帘

### LoadMore页面提示

### Noticebar通告栏

用于展示一行或多行通告文字。

~~~jsx
import { AtNoticebar } from 'taro-ui'

<AtNoticebar>这是 NoticeBar 通告栏</AtNoticebar>

<AtNoticebar icon='volume-plus'>
  这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
</AtNoticebar>

<AtNoticebar marquee>
  滚动：这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
</AtNoticebar>
~~~



### Tag标签

用于展示1个或多个文字标签，可点击切换选中、不选中的状态。

~~~jsx
import { AtTag } from 'taro-ui'

<AtTag>标签</AtTag>
<AtTag type='primary' circle>标签</AtTag>
<AtTag size='small'>标签</AtTag>
~~~



### Timeline时间轴

### Swiper滑动视图容器

滑块视图容器，常用于走马灯、轮播图

~~~jsx
import { Swiper, SwiperItem } from '@tarojs/components'

import Taro, { Component } from '@tarojs/taro'
// 引入 Swiper, SwiperItem 组件
import { Swiper, SwiperItem } from '@tarojs/components'
class App extends Component {
  render () {
    return (
      <Swiper
        className='test-h'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        vertical
        circular
        indicatorDots
        autoplay>
        <SwiperItem>
          <View className='demo-text-1'>1</View>
        </SwiperItem>
        <SwiperItem>
          <View className='demo-text-2'>2</View>
        </SwiperItem>
        <SwiperItem>
          <View className='demo-text-3'>3</View>
        </SwiperItem>
      </Swiper>
    )
  }
}
~~~



### Divider分隔符

~~~jsx
import { AtDivider } from 'taro-ui'
<AtDivider content='分割线' />
~~~



### Steps步骤条

### ActionSheet动作面板

~~~jsx
import { AtActionSheet, AtActionSheetItem } from "taro-ui"

<AtActionSheet isOpened cancelText='取消' title='头部标题可以用通过转义字符换行'>
  <AtActionSheetItem onClick={ this.handleClick }>
    按钮一
  </AtActionSheetItem>
  <AtActionSheetItem>
    按钮二
  </AtActionSheetItem>
</AtActionSheet>
~~~



### ActivityIndicator活动指示器

### Modal模态框

~~~jsx
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"


<AtModal isOpened>
  <AtModalHeader>标题</AtModalHeader>
  <AtModalContent>
    这里是正文内容，欢迎加入京东凹凸实验室
    这里是正文内容，欢迎加入京东凹凸实验室
    这里是正文内容，欢迎加入京东凹凸实验室
  </AtModalContent>
  <AtModalAction> <Button>取消</Button> <Button>确定</Button> </AtModalAction>
</AtModal>


<AtModal
  isOpened
  title='标题'
  cancelText='取消'
  confirmText='确认'
  onClose={ this.handleClose }
  onCancel={ this.handleCancel }
  onConfirm={ this.handleConfirm }
  content='欢迎加入京东凹凸实验室\n\r欢迎加入京东凹凸实验室'
/>
~~~



### Progress进度条

### Toast轻提示

### SwipeAction滑动操作

### Message消息通知

### Form表单

### Input输入框

### InputNumber数字输入框

### Radio单选按钮

### Checkbox多选框

### Rate评分

### Switch开关

### Textarea多行文本框

### Picker选择器

### SearchBar搜索栏

### Slider滑动条

### ImagePicker图片选择器

### Range范围选择器

### Flex弹性布局

### Grid栅格布局

### List列表

### Card卡片

### FloatLayout浮动弹层

### Accordion手风琴

### NavBar导航栏

### TabBar标签栏

### Tabs标签页

### SegmentedControl分段器

### Pagination分页器

### Drawer抽屉

### Indexes索引选择器

### Calendar日历
