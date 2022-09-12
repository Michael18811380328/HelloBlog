# TensorFlow.js 入门并动手编写娱乐版的双色球在线预测

#### 背景

一年前就知道了 TensorFlow js 版的存在，一直没有去玩一下。最近一次偶然的机会，要协助同事处理过一个 `TensorFlow.js` 相关的 Demo 小程序，要使用 `TensorFlow.js` 结合小程序的照相机 API 功能，实现**微信小程序扫描识别物体功能**。该 Demo 主要是由 TensorFlow.js 官方项目 – https://github.com/tensorflow/tfjs-wechat/tree/master/demo/mobilenet 改造而来。后面开始看官方 demo 开始由最简单的 《[TensorFlow.js 实现线性回归](https://github.com/tensorflow/tfjs-examples/tree/master/getting-started)》 的例子开始学习，并捣鼓出这个《[TensorFlow.js 娱乐版的双色球在线预测](http://www.a4z.cn/tool/ssq.html)》。

#### 工具由来

为什么叫《[TensorFlow.js 娱乐版的双色球在线预测](http://www.a4z.cn/tool/ssq.html)》？哈哈，因为双色球开的期数总数才 2510+ 期，作为训练模型 `model` 学习的基础数据也太小了。还有本身电脑的计算能力也有限，如果硬把学习次数 `epochs` 加非常高，可能电脑要运行几天才可以学习完并预测出结果哈，大家可以试试选用期数为 `00000-20000` 来作为训练模型 `model` 然后把学习次数 `epochs` 加高来进行预测。

#### 费话不多说，直接关键源码分析

```
$(document).ready(``function` `() {
 ``runTf(``'00000-20000'``, 1, 29999) ``// 默认打开运行预测 训练模型期号数据是 00000-20000，学习次数是 1 次，预测的期号是 29999
 ``$(``'#btn'``).click(``function` `() { ``// 点击按钮绑定处理
  ``const modelVal = $(``'#model'``).val()
  ``const epochsVal = $(``'#epochs'``).val()
  ``const roundVal = $(``'#round'``).val()
  ``const tips =
   ``'<span class="tips pulse animated infinite">正在预测...</span>'
  ``if` `(!modelVal) {
   ``alert(``'请先选择历史数据模型训练（model）'``)
   ``return` `false
  ``}
  ``if` `(!epochsVal) {
   ``alert(``'请先输入学习次数（epochs）'``)
   ``return` `false
  ``}
  ``if` `(!roundVal) {
   ``alert(``'请先输入待预测的期号'``)
   ``return` `false
  ``}
  ``$(``'#micro-out-div'``).html(tips)
  ``runTf(modelVal, Number(epochsVal), Number(roundVal))
 ``})
 ``function` `runTf(historyModel, epochs, round) { ``// 关键函数
  ``$(``'#table'``).load(`./ssq/history-${historyModel}.htm`, ``function` `() { ``// 加载相应的训练模型数据，来源于 500 彩票 http://kaijiang.500.com
   ``const rawArr = []
   ``const xsArr = []
   ``const yxArr = []
   ``// 通过 dom 操作把源数据由 table 中抽取出来
   ``$(``'#table .t_tr1'``).each(``function` `() {
    ``let This = $(``this``)
    ``let str = ``''
    ``This.find(``'td'``).each(``function` `(n) {
     ``if` `(n === 0) {
      ``str += $(``this``).text()
     ``} ``else` `if` `(n < 8 && n > 0) {
      ``str += ``'|'` `+ $(``this``).text()
     ``}
    ``})
    ``let arr = str.split(``'|'``)
    ``arr = arr.map((_) => Number(_))
    ``rawArr.push(arr)
    ``xsArr.push(arr[0])
    ``yxArr.push(arr.slice(1))
   ``})
```

 

```
   ``async ``function` `run() { ``// 关键代码
    ``// Sequential 序贯模型，序贯模型是函数式模型的简略版，为最简单的线性、从头到尾的结构顺序，不分叉，是多个网络层的线性堆叠。
    ``const model = tf.sequential()
    ``// 使用.add() 方法将各层添加到模型中
    ``model.add(tf.layers.dense({ units: 7, inputShape: [1] })) ``// Dense，支持通过参数 inputShape 指定输入尺寸，units: 该层的神经单元结点数（输出结果是 7 个球）
    ``// compile({loss, optimizer, metrics}) 编译模型，定义损失函数，优化函数，绩效评估函数
    ``model.compile({ loss: ``'binaryCrossentropy'``, optimizer: ``'sgd'` `}) ``// metrics 可参考：https://js.tensorflow.org/api/1.7.2/#Metrics
    ``console.log(``'开始，gogogo!'``)
    ``// 下面其实定义使用 tensor / tensor1d / tensor2d 都没关系，最终 tensor1d / tensor2d ...3d... 都跟 tensor 效果一样，语法糖来的
    ``const xs = tf.tensor(xsArr) ``// 定义一个张量（这里是历史期号）
    ``console.log(xs.shape) ``// 打印输入尺寸
    ``const ys = tf.tensor(yxArr) ``// 定义一个张量（这里是上面 xs 的历史期号对应所有的开奖结果）
    ``console.log(ys.shape) ``// 打印输入尺寸
    ``console.time(``'训练时间'``)
    ``console.log(``'开始训练...'``)
    ``await model.fit(xs, ys, { epochs: epochs }) ``// 导入数据进行训练 可参考：https://js.tensorflow.org/api/1.7.2/#tf.LayersModel.fit
    ``console.timeEnd(``'训练时间'``)
    ``console.log(``'结束训练'``)
    ``console.time(``'预测时间'``)
    ``console.log(``'开始预测...'``)
    ``const predicted = model ``// 为什么叫娱乐版的呢？因为下面出来的结果太失望了，要自己重新处理
     ``.predict(tf.tensor2d([round], [1, 1])) ``// 预测自己输入的期号为 round 的结果
     ``.abs() ``// 取绝对值
     ``.floor() ``// 去掉小数点
     ``.dataSync() ``// 得到的是一个 Float32Array，如果学习次数 epochs 太少的话，结果类似 [20661, 28071, 7391, 10978, 7883, 9646, 5441]，WTF！太差了吗？
     ``.map((_, n) => { ``// 自己按号码规则求余优化成最终结果
      ``return` `n !== 6 ? _ % 33 || 33 : _ % 16 || 16
     ``})
    ``const obj = {} ``// 判断出来的红球有没有重复
    ``predicted.forEach((_, n) => {
     ``if` `(n !== 6) {
      ``obj[_] = 1
     ``}
    ``})
    ``if` `(Object.keys(obj).length < 6) { ``// 什么？出来的红球有重复？帮我重新预测吧
     ``run()
     ``return` `false
    ``}
    ``// 下面是 dom 操作，打印预测结果
    ``const predictedHtml = [...predicted] .map((_, n) => {
```

`      ``return` `n !== 6 ? `<i>${_}</i>` : `<b>${_}</b>``

```
     ``})
     ``.join(``' | '``)
    ``$(``'#micro-out-div'``).html(
     ``'期号 '` `+ round + ``' 预测结果为：'` `+ predictedHtml
    ``)
    ``console.timeEnd(``'预测时间'``)
    ``console.log(``'结束预测'``)
   ``}
   ``run()
  ``})
 ``}
})
```

#### 可能会遇到的问题

`Error when checking input: expected dense_Dense1_input to have x dimension(s). but got array with shape y,z`
或者 `Error when checking input: expected dense_Dense1_input to have 3 dimension(s). but got array with shape`
或者 `Error when checking target: expected dense_Dense1 to have shape [,1], but got array with shape [6,7]`
**解决方式**：一般是需要相应修改代码 `model.add(tf.layers.dense({ units: 7, inputShape: [1] }))` 中的 units 与 inputShape 的值就可以了

#### 感慨良多

回忆起 10 几年前自己曾经在图书馆看过一本书名叫《神经网络与卷积学习》还是啥的，隐约回忆起类似下面一个画面。

[![TensorFlow.js 机器学习](http://www.a4z.cn/fe/wp-content/uploads/tfjs.jpg)](http://www.a4z.cn/fe/wp-content/uploads/tfjs.jpg)TensorFlow.js 机器学习

还想起了当时书中介绍了“权重”、“权值”等概念。人工智能的概念与实现理论基础几十年前已经有了，受限与计算机的算力，一直没有发展起来，到最近十几年半导体行业与计算机计算能力的快速发展，人工智能才逐渐发展起来。

而自己机缘巧合，进入和开启了前端的职业生涯，在图形图像处理方向的学习，需要作图要用上向量与矩阵计算，需要重新拾起大学、高中、小学的数学知识；还有一段时间沉迷于对一些经典算法的练脑、学习与进步；感觉自己对未来的 AI 世界充满憧憬与期待。

#### 参考引用

https://js.tensorflow.org/api/1.7.2/#Tensors
https://github.com/tensorflow/tfjs-examples/tree/master/getting-started
https://blog.csdn.net/qq_38806886/article/details/83892671
https://www.cnblogs.com/wj-1314/p/9579490.html

1. 1. 本文作者：[Nelson Kuang](https://github.com/nelsonkuang)，欢迎大家留言及多多指教
   2. 版权声明：欢迎转载学习 => 请标注信息来源于http://www.a4z.cn/fe/2020/05/29/tensorflow-js/

 阅读: 682

![img](http://0.gravatar.com/avatar/6999225be7f2128c6d26e866523259ac?s=42&d=wavatar&r=g)

## 作者： 博主

Talk is cheap, show me the code! [查看博主的所有文章](http://www.a4z.cn/fe/author/nelsonkuang/)