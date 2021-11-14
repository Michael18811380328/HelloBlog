# Grid 布局

详细教程参考阮一峰老师：https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html

Grid 布局类似 Flex 布局。flex 主要是垂直和水平轴分布，Grid 是网格状分布，功能更强大。

下面是基本案例

首先新建一个 HTML 

~~~html
<div id="root">
  <div id="child1">1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
  <div>7</div>
  <div>8</div>
  <div>9</div>
</div>
~~~

在父盒子上设置属性

~~~css
/* 在父盒子上设置 */
#root {
  background-color: #ccc;
  /* 整体是 grid 布局(类似 flex inline-flex) */
  display: grid;
  display: inline-grid;

  /* 1、列属性 */
  /* 分成四列，每一列的宽度都是100px */
  grid-template-columns: 100px 100px 100px 100px;

  /* 也可以使用百分比（每一个宽度是 25%） */
  grid-template-columns: 25% 25% 25% 25%;

  /* 相同的参数使用 repeat，重复4次，每一次的宽度是 25% */
  grid-template-columns: repeat(4, 25%);

  /* 每一个子元素是100px, 父盒子的宽度不确定，自动填充满 */
  grid-template-columns: repeat(auto-fill, 100px);

  /* fr 表示比例，这里表示每一行有三个元素，宽度比例是 1：1：2，类似于flex布局中的比例 */
  grid-template-columns: 1fr 1fr 2fr;

  /* minmax 表示某个子元素宽度在最大最小值之间，优先匹配最大的值200px */
  grid-template-columns: 1fr 1fr minmax(100px, 200px);

  /* auto 表示自动宽度，如果多个 auto 可以均分剩余的宽度 */
  grid-template-columns: auto 500px auto;

  /* 可以自定义网格先名称：三个区域四个网格线名称 */
  grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];

  /* 左右两栏布局 */
  grid-template-columns: 30% 70%;

  /* 7网格布局——用于日历 */
  grid-template-columns: repeat(7, 1fr);
  grid-template-columns: 100px 100px 100px;

  /* 2、行属性 */
  /* 分成三行，每一行的高度是 50 100 50 */
  grid-template-rows: 50px 100px 50px;
  /* 行属性也支持上面的样式 */

  /* 3、间隔 */
  /* 行间距和列间距是 10 和 20 */
  grid-gap: 10px 20px;

  /* 也可以单独设置 */
  grid-row-gap: 20px;
  grid-column-gap:  30px;

  /* 4、区域合并：类似于合并单元格 */
  /* 默认九个不合并 */
  grid-template-areas: 'a b c'
    'd e f'
    'g h i';
  /* 合并成七巧板 */
  grid-template-areas: 'a a c'
    'e b c'
    'e d d';
  /* 页面布局 */
  grid-template-areas: "header header header"
    "main main sidebar"
    "footer footer footer";
  /* 5、子元素排列顺序 */
  /* 先行后列排布，还是先列后行排布 */
  grid-auto-flow: row | column | row dense | column dense;

  /* 6、子元素的排列对齐，与 flex 一致, 或者一起写成 place-item */
  justify-items: center;
  align-items: center;
  place-items: center center;

  /* 整个内容区在容器中的位置（9个子元素的整体，在父盒子中的位置） */
  /* start | end | center | stretch | space-around | space-between | space-evenly; */
  justify-content: space-around;
  align-content:  space-around;
  place-content: space-between space-between;

  /* 7、超出部分显示 */
  /* 如果默认第N个元素在内部，然后手动设置在外部，就是超出的部分，超出的行列的高度可以这样设置 */
  /* 手动设置，详见下面 */
  grid-auto-columns: 10px;
  grid-auto-rows: 10px;
}
~~~

在子盒子上设置属性

~~~css
#root #child1 {
  /* 1 某个子元素的四条边分别位于哪个网格线 */
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 3;
  /* grid-column-start: header-start | header-end 这里是特定的边界线的名称; */
  /* 或者使用 span 表示跨域几个单位长度，这样就不需要计算开始和结束的边界线 */
  /* 如果不同子项目发生重叠，那么根据 z-index 设置不同的层级 */
  /* 如果一个子元素占据了上面的空间，那么后面的子元素向下排列 */
  /* 实际上可以使用 bootstrap 处理这部分样式 */
  grid-column-start: span 2;

  /* 可以简写成下面的格式 */
  grid-column: 1 / 3; /* 等价于 grid-column-start: 1; grid-column-end: 3 */ 
  grid-row: 2 / 4;

  /* 2 某个子元素位于哪个区域 */
  grid-area: e; /* 这个子元素位于 e 区域 */

  /* 或者可以直接设置四条边 <row-start> / <column-start> / <row-end> / <column-end> */
  grid-area: 1 / 1 / 3 / 3;

  /* 3 子元素内部内容的样式 */
  justify-self: center;
  align-self: center;
  place-self: center;
}
~~~

这样就能实现简单的 grid 布局

