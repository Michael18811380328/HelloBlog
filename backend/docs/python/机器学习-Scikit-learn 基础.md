# Scikit-learn 基础

## Scikit-learn 介绍

Scikit-learn 是开源的 Python 库，通过统一的界面实现机器学习、预处理、交叉验证及可视化算法。

scikit-learn 网站：[https://scikit-learn.org](https://link.zhihu.com/?target=https%3A//scikit-learn.org/)

Python 中的机器学习

- 简单有效的数据挖掘和数据分析工具
- 可供所有人访问，并可在各种环境中重复使用
- 基于 NumPy，SciPy 和 matplotlib 构建
- 开源，商业上可用 - BSD 许可证

### 分类

确定对象属于哪个类别。

应用：垃圾邮件检测，图像识别。 算法： SVM，最近邻居，随机森林，......

### 回归

预测与对象关联的连续值属性。

应用：药物反应，股票价格。 算法： SVR，岭回归，套索，......

### 聚类

将类似对象自动分组到集合中。

应用：客户细分，分组实验结果 算法： k-Means，谱聚类，均值漂移，......

### 降维

减少要考虑的随机变量的数量。

应用：可视化，提高效率 算法： PCA，特征选择，非负矩阵分解。

### 模型选择

比较，验证和选择参数和模型。

目标：通过参数调整提高准确性 模块： 网格搜索，交叉验证，指标。

### 预处理

特征提取和规范化。

应用程序：转换输入数据（如文本）以与机器学习算法一起使用。 模块： 预处理，特征提取。

## Scikit-learn 机器学习步骤

```python
# 导入 sklearn
from sklearn import neighbors, datasets, preprocessing
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# 加载数据
iris = datasets.load_iris()

# 划分训练集与测试集
X, y = iris.data[:, :2], iris.target
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=33)

# 数据预处理
scaler = preprocessing.StandardScaler().fit(X_train)
X_train = scaler.transform(X_train)
X_test = scaler.transform(X_test)

# 创建模型
knn = neighbors.KNeighborsClassifier(n_neighbors=5)
# 模型拟合
knn.fit(X_train, y_train)

# 预测
y_pred = knn.predict(X_test)
# 评估
accuracy_score(y_test, y_pred)
```

### 导入常用库

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
```

### 加载数据

Scikit-learn 处理的数据是存储为 NumPy 数组或 SciPy 稀疏矩阵的数字，还支持 Pandas 数据框等可转换为数字数组的其它数据类型。

```python
X = np.random.random((11, 5))
y = np.array(['M', 'M', 'F', 'F', 'M', 'F', 'M', 'M', 'F', 'F', 'F'])
X[X < 0.7] = 0
```

### 划分训练集与测试集

```python
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=0)
```

### 数据预处理

### 标准化

```python
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler().fit(X_train)
standardized_X = scaler.transform(X_train)
standardized_X_test = scaler.transform(X_test)
```

### 归一化

```python
from sklearn.preprocessing import Normalizer
scaler = Normalizer().fit(X_train)
normalized_X = scaler.transform(X_train)
normalized_X_test = scaler.transform(X_test)
```

### 二值化

```python
from sklearn.preprocessing import Binarizer
binarizer = Binarizer(threshold=0.0).fit(X)
binary_X = binarizer.transform(X)
```

### 编码分类特征

```python
from sklearn.preprocessing import LabelEncoder
enc = LabelEncoder()
y = enc.fit_transform(y)
```

### 输入缺失值

```python
from sklearn.preprocessing import Imputer
imp = Imputer(missing_values=0, strategy='mean', axis=0)
imp.fit_transform(X_train)
```

### 生成多项式特征

```python
from sklearn.preprocessing import PolynomialFeatures
poly = PolynomialFeatures(5)
poly.fit_transform(X)
```

### 创建模型估计器

### 监督学习

```python
# 线性回归
from sklearn.linear_model import LinearRegression
lr = LinearRegression(normalize=True)
# 支持向量机(SVM)
from sklearn.svm import SVC
svc = SVC(kernel='linear')
# 朴素贝叶斯
from sklearn.naive_bayes import GaussianNB
gnb = GaussianNB()
# KNN
from sklearn import neighbors
knn = neighbors.KNeighborsClassifier(n_neighbors=5)
```

### 无监督学习

```python
# 主成分分析（PCA)
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
pca = PCA(n_components=0.95)
# K Means
k_means = KMeans(n_clusters=3, random_state=0)
```

### 拟合数据

### 监督学习

```python
lr.fit(X, y)
knn.fit(X_train, y_train)
svc.fit(X_train, y_train)
```

### 无监督学习

```python
k_means.fit(X_train)
pca_model = pca.fit_transform(X_train)
```

### 预测

### 监督学习

```python
# 预测标签
y_pred = svc.predict(np.random.random((2,5)))
# 预测标签
y_pred = lr.predict(X_test)
# 评估标签概率
y_pred = knn.predict_proba(X_test)
```

### 无监督学习

```python
y_pred = k_means.predict(X_test)
```

### 评估模型性能

### 分类指标

```python
# 准确率
knn.score(X_test, y_test)
from sklearn.metrics import accuracy_score
accuracy_score(y_test, y_pred)
# 分类预估评价函数
from sklearn.metrics import classification_report
print(classification_report(y_test, y_pred))
# 混淆矩阵
from sklearn.metrics import confusion_matrix
print(confusion_matrix(y_test, y_pred))
```

### 回归指标

```python
# 平均绝对误差
from sklearn.metrics import mean_absolute_error
y_true = [3, -0.5, 2]
mean_absolute_error(y_true, y_pred)
# 均方误差
from sklearn.metrics import mean_squared_error
mean_squared_error(y_test, y_pred)
# R2 评分
from sklearn.metrics import r2_score
r2_score(y_true, y_pred)
```

### 群集指标

```python
# 调整兰德系数
from sklearn.metrics import adjusted_rand_score
adjusted_rand_score(y_true, y_pred)
# 同质性
from sklearn.metrics import homogeneity_score
homogeneity_score(y_true, y_pred)
# V-measure
from sklearn.metrics import v_measure_score
metrics.v_measure_score(y_true, y_pred)
```

### 交叉验证

```python
from sklearn.cross_validation import cross_val_score
print(cross_val_score(knn, X_train, y_train, cv=4))
print(cross_val_score(lr, X, y, cv=2))
```

### 模型调整

### 网格搜索

```python
from sklearn.grid search import GridSearchcV
params = {"n neighbors": np.arange(1, 3)，
          "metric": ["euclidean", "cityblock"]}
grid = GridSearchCV(estimator=knn,
                    param_grid-params)
grid.fit(X_train, y_train)
print(grid.best score)
print(grid.best_estimator_.n_neighbors)
```

### 随机参数优化

```python
from sklearn.grid_search import RandomizedSearchCV
params = {"n_neighbors": range(1, 5),
          "weights": ["uniform", "distance"]}
rsearch = RandomizedSearchCV(estimator=knn,
                             rsearch.fit(X_train, y_train) random_state=5)
print(rsearch.best_score_)
```
