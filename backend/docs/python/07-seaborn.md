# seaborn

2021-08-30

seaborn: statistical data visualization（统计数据可视化）

Seaborn 是一个基于 matplotlib 的 Python 数据可视化库。 它提供了一个用于绘制有吸引力和信息丰富的统计图形的高级界面。

有关库背后思想的简要介绍，您可以阅读介绍性说明。 访问安装页面以查看如何下载软件包。 您可以浏览示例库以了解您可以使用 seaborn 做什么，然后查看教程和 API 参考以了解操作方法。

官网链接：http://seaborn.pydata.org/

Github: https://github.com/mwaskom/seaborn

介绍：https://seaborn.pydata.org/introduction.html

教程：http://seaborn.pydata.org/tutorial.html

API: http://seaborn.pydata.org/api.html

### 案例

```python
# Import seaborn
import seaborn as sns

# Apply the default theme
sns.set_theme()

# Load an example dataset
tips = sns.load_dataset("tips")

# Create a visualization
sns.relplot(
    data=tips,
    x="total_bill", y="tip", col="time",
    hue="smoker", style="smoker", size="size",
)
```

注：执行时，可能加载数据有问题，报下面的错误

```bash
urllib.error.URLError: <urlopen error [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1045)>
```

因为 sns.load_dataset("tips") 需要从 github 联网加载测试数据集，如果网络不好或者没有翻墙，这里会报错

参考：https://blog.csdn.net/weixin_41571493/article/details/82528742
