## 算法笔记

### 1 双指针算法

使用条件：有序数组（无序数组先排序）。

分类：快慢指针和对撞指针。对撞指针用于小船载人问题；快慢指针用于判断链表中是否有环，排序数组去重操作等。

判断链表中是否有环，也可以使用对象唯一性判断；

排序数组去重操作，可以使用一次循环，然后splice操作；或者使用对象唯一性操作；或者使用 set 操作（后两种较复杂，适应于无序数组的去重）。两数之和、两数乘积之和，回文字符串等都可以使用双指针算法。

数组中指针用法：for循环数组，一个是当前的i，设置另一个指针pointer，这样可以指向不同的数组，进行处理

快慢指针

~~~js
let a = head.next;
let b = head.next.next;
while (a.next) {
  a = a.next;
  b = b.next.next;
}
// 需要预处理next下一个节点是否存在等
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
