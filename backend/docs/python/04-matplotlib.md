# matplotlib

Matplotlib: Visualization with Python（Matplotlib：使用 Python 进行可视化）

菜鸟教程：https://www.runoob.com/numpy/numpy-matplotlib.html

官方文档：https://matplotlib.org/index.html

### 简介

Matplotlib is a comprehensive library for creating static, animated, and interactive visualizations in Python.Matplotlib makes easy things easy and hard things possible.

Matplotlib 是一个综合性的库，用于在 Python 中创建静态、动画和交互式可视化。Matplotlib 使简单的事情变得容易，使困难的事情成为可能。

Matplotlib 是 Python 的绘图库。 它可与 NumPy 一起使用，提供了一种有效的 MatLab 开源替代方案。 它也可以和图形工具包一起使用，如 PyQt 和 wxPython。

Create

- Develop [publication quality plots](https://matplotlib.org/gallery/index.html) with just a few lines of code
- Use [interactive figures](https://matplotlib.org/gallery/index.html#event-handling) that can zoom, pan, update...

Customize

- [Take full control](https://matplotlib.org/tutorials/index.html#tutorials) of line styles, font properties, axes properties...
- [Export and embed](https://matplotlib.org/api/index_backend_api.html) to a number of file formats and interactive environments

Extend

- Explore tailored functionality provided by [third party packages](https://matplotlib.org/thirdpartypackages/index.html)
- Learn more about Matplotlib through the many [external learning resources](https://matplotlib.org/resources/index.html)

创建

- 只需几行代码即可开发出版质量的图
- 使用可以缩放、平移、更新...

定制

- 完全控制线条样式、字体属性、轴属性...
- 导出并嵌入到多种文件格式和交互式环境中

延长

- 探索第三方软件包提供的定制功能
- 通过许多外部学习资源了解有关 Matplotlib 的更多信息

### 案例

```Python
import numpy as np
from matplotlib import pyplot as plt

x = np.arange(1,11)
y =  2 * x + 5
plt.title("Matplotlib demo")
plt.xlabel("x axis caption")
plt.ylabel("y axis caption")
plt.plot(x,y)
plt.show()
```

这里显示一个函数图像（也支持各种图表等）
