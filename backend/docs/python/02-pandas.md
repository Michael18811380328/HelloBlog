# pandas

2021-08-30

Python 统计库，pandas 是一个快速、强大、灵活且易于使用的开源数据分析和操作工具。

https://pandas.pydata.org/getting_started.html

### 问题 1：安装 pandas 时出现环境错误

在安装 pandas 时出现

```bash
Could not install packages due to an EnvironmentError
Consider using the `--user` option or check the permissions
```

此时在 install 后面加--user 即可

`pip install --user pandas`

参考链接：https://www.cnblogs.com/ConnorShip/category/1347491.html

### 问题 2：ValueError: Length mismatch: Expected axis has 0 elements, new values have 2 elements

错误如下：
ValueError: Length mismatch: Expected axis has 0 elements, new values have 2 elements

代码：

```python
import pandas as pd

out_pred_rows = []

sub = pd.DataFrame(out_pred_rows)
sub.columns = ['ImageId', 'EncodedPixels']   # 如果out_pred_rows为空，则报错
sub = sub[sub.EncodedPixels.notnull()]
```

解决方案：保证 out_pred_rows 不为空

原文链接：https://blog.csdn.net/wangdongwei0/article/details/83863533
