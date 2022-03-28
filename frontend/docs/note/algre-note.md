## 算法笔记

### 1 双指针算法

使用条件：有序数组（无序数组先排序）。

分类：快慢指针和对撞指针。对撞指针用于小船载人问题；快慢指针用于判断链表中是否有环，排序数组去重操作等。

判断链表中是否有环，也可以使用对象唯一性判断；

排序数组去重操作，可以使用一次循环，然后splice操作；或者使用对象唯一性操作；或者使用 set 操作（后两种较复杂，适应于无序数组的去重）。两数之和、两数乘积之和，回文字符串等都可以使用双指针算法。

数组中指针用法：for循环数组，一个是当前的i，设置另一个指针pointer，这样可以指向不同的数组，进行处理

#### 快慢指针

~~~js
let a = head.next;
let b = head.next.next;
while (a.next) {
  a = a.next;
  b = b.next.next;
}
// 需要预处理next下一个节点是否存在等
~~~

#### 对撞指针

在一个排序数组中，找到两个数字，使得其中的和等于 target

~~~js
// 输入: numbers = [2, 7, 11, 15], target = 9
// 输出: [1,2]
let fn = (numbers, target) => {
	let left = 0;
	let right = numbers.length - 1;
	while (left < right) {
		let tmp = numbers[left] + numbers[right];
		if (tmp === target) {
			return [left, right];
		}
		if (tmp < target) {
			left++;
		}
		if (tmp > target) {
			right--;
		}
	}
	// 不满足的情况下，返回 null
	return null;
}

console.log(fn([2, 7, 11, 15], 9));
console.log(fn([2, 7, 10, 11, 15], 21));

~~~

### 2 有序数组转换成等高的二叉搜索树

等高的二叉搜索树，那么根节点必然是数组中中位数。数组已经排序，那么使用递归的思路直接将排序的有序数组转换成二叉搜索树，基本思路如下：

~~~js
function transArrayToBST (arr) {
  // 辅助函数
  const trans = (start, end) => {
    if (start > end) {
      return null;
    }
    if (start === end) {
      return new TreeNode(arr[start]);
    }
    // start < end 递归
    let mid = Math.floor((start + end) / 2);
    const midNode = new TreeNode(arr[mid]);
    midNode.left = trans(start, mid - 1);
    midNode.right = trans(mid + 1, end);
    return midNode;
  }
  return trans(0, arr.length - 1);
}
~~~



学会的

### 3 回溯算法小结

核心代码：循环数组，然后把当前项一次放到临时数组中，然后判断临时数组是否满足条件。如果满足条件，直接放到结果数组中。如果不满足条件，如果没有达到条件，那么进一步回溯。如果超过条件，那么返回，继续循环下一个条件。

~~~js
if (tmp.length > K || sum(tmp) > K) {
 	let item = [...tmp];
  list.push(item);
  return;
}

for (let i = start; i < end; i++) {
  tmp.push(arr[i]);
  backtrack(tmp, list);
  tmp.pop(arr[i]);
}
~~~

注意点：目标数组中使用允许重复，全部样本中是否有重复的对象。

备注：如果要求全部样本中没有重复的对象，尽量避免使用 array.includes 判断 tmp 中是否存在另一个元素，这样算法复杂度较差。最好使用对象索引判断一下，减少复杂度。

应用：大部分排列组合问题、硬币找零问题（不能使用贪心算法）



### 4 动态规划小结（初级）

核心代码：当前的结果可以使用前面的结果表示。那么获取初始状态，以及获取递推公式，然后执行一次循环，即可算出N次结果的值。

~~~js
f(n) = F(a * f(n - 1) + b * f(n - 2) +);
~~~

动态规划的实质是，把一个实际问题，转换成数学的递推公式（通项公式），然后使用排列组合或者递推的方式计算结果。

应用：斐波那契函数、打家劫舍问题，背包问题，复杂排列组合问题

难点：把一个实际问题，转换成数学的递推公式

例子：排列组合数据量较大时，回溯方法内存溢出，使用DP解决

~~~js
var fn = (nums, target) => {
  nums.sort((a, b) => b - a);
  let dp = [];
  dp[0] = 1;
  dp[1] = 1;
  for (let i = 1; i <= target; i++) {
    let tmp = 0;
    // 这里可以优化
    nums.forEach(num => {
      if (i - num >= 0) {
        tmp += dp[i - num];
      }
    });
    dp [i] = tmp;
  }
  return dp[target];
}
~~~

动态规划处理最大子序和（给定一个数组，求最大自序和）

1. 一个数组最大的自序和，那么等于每一个项结尾的自序和的最大值

maxList = [max1, max2, max3,,, maxn];
Math.max(...maxList)

2. 每一个项为结尾的最大自序和，可能是当前的 nums[i] 或者是 f(n - 1) + nums[i]

~~~js
function fn(nums) {
  let tmp = 0;
  let maxList = [];
  for (let i = 0; i < nums.length; i++) {
    tmp = Math.max(tmp + nums[i], nums[i]);
    maxList.push(tmp);
  }
  return Math.max(...maxList);
}
~~~

### 5 笛卡尔积

数学中，两个集合的乘积，叫做笛卡尔积

```
举例：集合 A = {1, 2}, B = {a, b, c};
笛卡尔积 A x B = {(1, a), (1, b), (1, c), (2, a), (2, b), (2, c)}
笛卡尔积 B x A = {(a, 1), (a, 2), (b, 1), (b, 2), (c, 1), (c, 2)}
```

拼音中，A 集合是声母的集合，B集合是韵母的集合，那么 A 和 B 的笛卡尔积就是全部读音的集合（不考虑特殊情况）

可以是 N 个集合的笛卡尔积

运算规则：不符合交换律和结合律，求并集和交集满足分配率

详情参考：https://baike.baidu.com/item/%E7%AC%9B%E5%8D%A1%E5%B0%94%E4%B9%98%E7%A7%AF


### 6 拼图算法和思路

如何用算法完成一个10000块的拼图？

1、复杂问题简单化：100块拼图，规范的拼图，没有重复的拼图，存储不限制，时间不限制

2、解决简单的问题

思路1：BFS 或者 DFS 算法

给出全部的拼图数组 arr，每一项是一个对象。对象的 ID 是某一块的唯一标识。四个边是某个属性值，全部拼图只有另一个和某一个完全一样

~~~js
let arr = [
  {
    id: '',
    left: '',
    right: '',
    top: '',
    bottom: '',
  }
];
~~~

关键是从某一个节点开始，然后获取相邻的节点（单项指针，或者对象的唯一键值对）。

把全部的节点遍历一次，存放在对象中。对象的键是属性，值是 ID。

~~~js
let dict = [];
for (let i = 0; i < arr.length; i++) {
  let { left, right, top, bottom, id } = arr[i];
  // 把这些属性全部存放到字典中(先假设属性都不同)
  dict[left] = id;
  dict[right] = id;
}
~~~

然后任意选择一个节点，DFS 获取邻接节点

~~~js
let init = arr[0];
let res = [];
res.push(init);
while(res[res.length - 1].right) {
  let next = dict[res[res.length - 1].right];
  if (next) {
    res.push(next);
  }
}
console.log(res);
// 先把一行拼出来
// 然后继续遍历其他几个方向
~~~

这个方法可以解决问题。因为已经在字典中存放了属性值，那么查找的速度比较快，时间复杂度可以接受。

实际我们拼图时，人脑不会采用这样的思路

因为遍历全部的节点需要时间，短时间内不能记住全部的节点属性，从一个点，找到四个相邻节点比较困难。

那么可以采用下面的算法改进

思路2：聚类算法

实际拼图时，往往先根据拼图上的一些特点（颜色相同，某些曲线相同，都含有某个图案，是否是边界点等特点），进行人脑聚类处理。

~~~js
let arr = [
  {
    id: '',
    color: 'red' | 'blue' | 'green' | null,
    graph: 'line' || 'circle' | null,
    is_icon: boolean,
    is_boundary: boolean,
  }
];
~~~

我们假设相邻的图片相似度很高，然后可以用聚类的算法，把全部图案分成若干群，每一个群组内部根据取值直接拼接，最后组合成较大的部分。可能有一些边缘的极端值，最后处理，这个符合人脑的思路

归纳：解决问题的思路

1、把复杂的问题简单化（10000的拼图，简化成100个，数量级的简化；四边凹凸不平的拼图，简化成规范的拼图，难度的简化；可能重复的拼图，简化成完全无重复的拼图，极端值边界值的简化；拼图是2维的，可以简化成1维的链表排序或者节点排序）

2、解决这个简单的问题（核心拼图算法）；或者拆成多个步骤解决；或者递推解决

3、把简答的解法复杂化（考虑数量级，考虑内存，考虑多维数据，考虑特殊值极端值影响）


### 获取字符串数组中，不重复字符串长度的最大值

基本算法是字符串算法，进阶算法是位运算，关键是判断两个字符串是否有相同的字母

1、先把字符串数组转换成对象数组，对象包括字符串的长度，字符串本身

2、双层循环这个对象数组，把每一个组合拿出来，作为新的数组（每一项是对象，包括长度的乘积，两个子字符串）

3、这个数组根据长度的乘积排序

4、循环数组，如果两个字符串没有公共字母，那么直接返回。如果有，继续下一个

判断两个字符串是否有公共的字母？

先把字符串遍历一次，获取字典。然后遍历这两个字典的 key 如果有重复，就是有公共的字母。

可以做一个临时变量 dict: {} key 是字符串，value 是字典，这样可以减少计算字符串的字符的数量。


### 滑动窗口双端队列（求滑动窗口的最大值-最小值）

数据结构：一个滑动窗口数组存放数组下标，一个结果数组

算法：循环数组，将窗口外部的下标去掉，将窗口中小于当前数字的项去掉，然后把当前的数组的项放进去，这样始终保证窗口第一项对应的数组的值是最大的。当滑动到窗口区间时，把窗口的数字放入结果数组中。
