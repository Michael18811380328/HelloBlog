# Python 基础

2021-08-31

所有代码按照 python3 的语法

### 输入输出

#### input

在Python3 中，直接输入的内容就是给一个字符串。但是在python2中，input 后面的内容作为一个语句执行了。所以使用 raw_input 表示输入的内容。输入的内容如果是数字，但是这是字符串类型的数字，需要转化成数值进行处理。
python3 中没有 raw_input 函数，input函数相当于 raw_input 函数。

~~~python
age = "test";
print("%s"%age)

tall = 100
print("%d"%tall)
~~~

这里类似于C语言，使用后面的变量取代字符串中的变量。C语言中有逗号，Python中没有逗号。

字符串乘一个数字，就是把这个字符串重复多少次。

~~~python
print("test " * 10)
~~~

\a 换行
\t tab缩进

### 字符串

字符串存储的占位：数值和字符串占用内存空间不同；字符串和数值型变量的类型转换；输入的信息都是字符串；

### 列表

列表类似 JS 中的数组。C语言中的数组只能存储固定类型的数据，Python 和 JS中的列表数组可以存储不同类型的数据。列表的增删改查功能对应的不同的方法（参考数组的方法）。数组的方法append对应的增删改查。

python中列表长度不能自动扩展，注意！声明是需要考虑长度

~~~python
#增加
append()
insert()
extend()

#删除
pop() 删除最后一个元素
remove() 根据内容删除
del array[0] 根据下标删除

#修改
array[1] = 10

#查询
in
not in 
~~~

### 列表API

~~~python
# coding=utf-8

# append extend 都是给一个列表增加元素
# append 的参数是单个元素
# extend 参数是另一个列表，会把另一个列表的每一项获取并加入到第一个列表中，另一个列表内容不改变

nums1 = [1, 2, 3]
nums2 = [4, 5]
nums1.extend(nums2)

print(nums1, nums2)

# nums1.extend(4); 报错：TypeError: 'int' object is not iterable
# print(nums1);

# append 只能增加一个元素，多个参数会报错
# nums1.append(6, 7) TypeError: append() takes exactly one argument (2 given)
nums1.append(6)

# 注意 append 会改变原列表，返回值是 None
b = nums1.append(2)
# print(b) None
~~~

### 元组

~~~python
a = (1, 2, 3)
# 元组是只读的，可以查询，不可以更改
# 日常使用不多
~~~

字典就是对象，是键值对的集合。同理可以对对象增删改查操作，对应的方法。

### 循环

1、if 判断的嵌套和多元选择
2、while 循环

常见的循环案例：三角形、九九乘法表，输出偶数包含固定的部分

注意事项：Python中字符串中嵌套变量进行输出，需要不同变量和后面的参数配合，不能直接模板字符串输出。


### while循环语句

~~~python
# coding=utf-8
# while 循环需要判断边界条件，可以循环一部分元素
# for 循环适合循环全部的元素
nums = [1, 2, 3, 4, 5]
i = 0
while i < 5:
  print(nums[i])
  i += 1

nums2 = [1, 2, 3, 4, 5]
nums2_len = len(nums2)
i = 0
while i < nums2_len:
  print(nums[i])
  i += 1

nums3 = [1, 2, 3, 4, 5]
for num in nums:
  print(num)
~~~

### for 循环语句

~~~python
# coding=utf-8
# python 和其他语言不同，支持 if else 结构
nums = [1, 2, 3, 4]
for num in nums:
  print(num)
else:
  print('for-else end')
# 先遍历列表，然后打印else结果

nums2 = []
for num in nums2:
  print(num)
else:
  print('for-else end')
# 遍历列表（空），然后打印结果

nums3 = [1,2,3]
for num in nums3:
  print(num)
  break;
else:
  print('for-else end')
# 循环第一次，打印1，然后跳出循环（不执行else部分）

infos = [
  {'name': 'Mike', 'age': 10},
  {'name': 'Tom', 'age': 25},
]

target = input('please input query name')

for info in infos:
  if info['name'] == target:
    print(info['age'])
    break;
else:
  print('this person not fount')
~~~
