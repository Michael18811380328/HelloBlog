# Chart.js

简单易用的 JS 绘图库，功能强度，配置较多，这里仅简单介绍。

Simple yet flexible JavaScript charting for designers & developers

星标：56K

官网地址：https://www.chartjs.org/docs/latest/

## 全部文档

All the links point to the new version 3 of the lib.

- [Introduction](https://www.chartjs.org/docs/latest/)
- [Getting Started](https://www.chartjs.org/docs/latest/getting-started/index)
- [General](https://www.chartjs.org/docs/latest/general/data-structures)
- [Configuration](https://www.chartjs.org/docs/latest/configuration/index)
- [Charts](https://www.chartjs.org/docs/latest/charts/line)
- [Axes](https://www.chartjs.org/docs/latest/axes/index)
- [Developers](https://www.chartjs.org/docs/latest/developers/index)
- [Popular Extensions](https://github.com/chartjs/awesome)
- [Samples](https://www.chartjs.org/samples/)

绘图原理：在 DOM 节点中加入一个 canvas，然后 JS 绘制图表

~~~js
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
~~~

基本图表实现简单，关键是不同图表的配置，参数的选择等，异常值和大量数据下的性能问题

### 通用配置

颜色：文字颜色，背景颜色，边线颜色（支持渐变色）

数据结构:

| Name      | Type               | Description                                                  |
| --------- | ------------------ | ------------------------------------------------------------ |
| `label`   | `string`           | The label for the dataset which appears in the legend and tooltips. ——出现在图例和工具提示中的数据集标签。 |
| `clip`    | `number`|`object`  | How to clip relative to chartArea. Positive value allows overflow, negative value clips that many pixels inside chartArea. 0 = clip at chartArea. Clipping can also be configured per side: clip: {left: 5, top: false, right: -2, bottom: 0} ——如何相对于 chartArea 进行剪辑。 正值允许溢出，负值在chartArea 内剪辑许多像素。 0 = 在图表区域剪辑。 剪裁也可以每边配置：剪辑：{left：5，top：false，right：-2，bottom：0} |
| `order`   | `number`           | The drawing order of dataset. Also affects order for stacking, tooltip and legend.——数据集的绘制顺序。 还会影响堆叠、工具提示和图例的顺序。 |
| `stack`   | `string`           | The ID of the group to which this dataset belongs to (when stacked, each group will be a separate stack). Defaults to dataset `type`. ——此数据集所属的组的 ID（堆叠时，每个组将是一个单独的堆叠）。 默认为数据集类型。 |
| `parsing` | `boolean`|`object` | How to parse the dataset. The parsing can be disabled by specifying parsing: false at chart options or dataset. If parsing is disabled, data must be sorted and in the formats the associated chart type and scales use internally.——如何解析数据集。 可以通过在图表选项或数据集中指定 parsing: false 来禁用解析。 如果禁用解析，则必须对数据进行排序，并以相关图表类型和刻度在内部使用的格式进行排序。 |
| `hidden`  | `boolean`          | Configure the visibility of the dataset. Using `hidden: true` will hide the dataset from being rendered in the Chart.——配置数据集的可见性。 使用 hidden: true 将隐藏数据集以防止在图表中呈现。 |

示例

~~~js
const data = [
  {x: 'Jan', net: 100, cogs: 50, gm: 50},
  {x: 'Feb', net: 120, cogs: 55, gm: 75},
];

const config = {
  type: 'bar',
  data: {
    labels: ['Jan', 'Feb'],
    datasets: [{
      label: 'Net sales',
      data: data,
      parsing: {
        yAxisKey: 'net'
      }
    }, {
      label: 'Cost of goods sold',
      data: data,
      parsing: {
        yAxisKey: 'cogs'
      }
    }, {
      label: 'Gross margin',
      data: data,
      parsing: {
        yAxisKey: 'gm'
      }
    }]
  },
};
~~~

字体

| Name         | Type              | Default                                                | Description                                                  |
| ------------ | ----------------- | ------------------------------------------------------ | ------------------------------------------------------------ |
| `family`     | `string`          | `"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"` | Default font family for all text, follows CSS font-family options. |
| `size`       | `number`          | `12`                                                   | Default font size (in px) for text. Does not apply to radialLinear scale point labels. |
| `style`      | `string`          | `'normal'`                                             | Default font style. Does not apply to tooltip title or footer. Does not apply to chart title. Follows CSS font-style options (i.e. normal, italic, oblique, initial, inherit). |
| `weight`     | `string`          | `undefined`                                            | Default font weight (boldness). (see [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight)). |
| `lineHeight` | `number`|`string` | `1.2`                                                  | Height of an individual line of text (see [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height)). |

选项：不同级别的对象，都支持设置不同的可选项。https://www.chartjs.org/docs/latest/general/options.html

性能：Chart.js 图表在画布元素上呈现，这使得呈现速度非常快。 对于大型数据集或性能敏感的应用程序，您可能希望考虑以下提示（https://www.chartjs.org/docs/latest/general/performance.html）。可以去掉动画效果等，手动设置数据范围，去掉贝塞尔曲线使用 Web Worker 进行并行渲染等，以节省性能。