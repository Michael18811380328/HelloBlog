# ValueError: Length mismatch: Expected axis has 0 elements, new values have 2 elements

错误如下：

`ValueError: Length mismatch: Expected axis has 0 elements, new values have 2 elements`

代码：

~~~python
import pandas as pd

out_pred_rows = []

sub = pd.DataFrame(out_pred_rows)
sub.columns = ['ImageId', 'EncodedPixels']   # 如果out_pred_rows为空，则这句话会报错
sub = sub[sub.EncodedPixels.notnull()]
~~~

解决方案：
保证out_pred_rows不为空