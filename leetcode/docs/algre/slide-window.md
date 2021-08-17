# 滑动窗口

参考链接：https://blog.csdn.net/summer2day/article/details/89853737

链接使用 C++ 实现，现在改成 JS 实现

1、基础：双端队列：可以从前面或者后面插入或者删除元素。队列内部的元素可以单调递增或者单调递减（特殊的双端队列）。那么直接可以获取当前队列的最大值和最小值。因为 JS 数组中可以直接操作首尾元素，那么天然就是双端队列。然后只需要在增加减少的时候，重新排列数组的内部元素的位置。

2、滑动窗口：每次滑动后，当队列内部元素大于允许的个数时，就把首个元素移除。把小于新加入队列的全部值移除。

三个例子：滑动窗口的最大值、无重复元素的最长子串、长度最小的子数组


### 滑动窗口的最大值(239)
~~~js
// 看一下还能怎么优化
// 用空间换时间，多使用内存，少使用循环！
var maxSlidingWindow = function(nums, k) {
  // 处理特殊情况
  if (k === 1) {
    return nums;
  }
  const len = nums.length;
  if (len === 1) {
    return nums[0];
  }

  // list 是单调递减的双端队列
  let list = [];
  list[0] = 0;

  // 初始化前面几个值
  for (let i = 1; i < k; i++) {
    let item = nums[i];
    let listLen = list.length;
    // 如果当前的值小于最后一个的值，直接插入到队列最后
    if (nums[list[listLen - 1]] > item) {
      list.push(i);
    }
    // 否则，找到合适的位置，插入队列中
    // 这个很消耗性能，如果 K = 30000 那么插入操作是 N 的平方，未来可以用二分法优化
    // 这里应该使用双端队列优化，现在直接在数组中插入性能很差
    else {
      for (let j = 0; j < listLen; j++) {
        if (nums[list[j]] <= item) {
          list.splice(j, listLen - j, i);
          break;
        }
      }
    }
  }
  // 现在已经把开始的K个元素放入了队列中，然后开始遍历剩下的数字，然后获取最大值
  let res = [];
  res[0] = nums[list[0]];

  for (let i = k; i < len; i++) {
    let item = nums[i];
    let listLen = list.length;
    // 如果新增的值小于最小的，那么直接插入最后
    if (nums[list[listLen - 1]] > item) {
      list.push(i);
    } else {
      for (let j = 0; j < listLen; j++) {
        if (nums[list[j]] < item) {
          list.splice(j, listLen - j, i);
          break;
        }
      }
    }
    // 把距离大于K的都删除掉
    list = list.filter((item) => {
      return i - item < k;
    });
    res.push(nums[list[0]]);
  }
  return res;
};
~~~



~~~js
// 求字符串中最长的无重复字符的子字符串

// 思路：创建一个字典，存放当前字母出现的位置；创建一个 start 存放无重复子串的位置
// 循环字符串，然后判断字典中是否出现。如果出现，那么改变 start，同时更新字典中出现的位置
// 每次计算当前值和开始值的差，然后得出当前子串的长度
// 最后计算字符串的长度减去开始的长度，看一下最大值
let fn = (str) => {
  const len = str.length;
  if (len === 1) {
    return 1;
  } 
  let dict = {};
  let start = 0;
  dict[str[0]] = 0;
  let max = 1;
  // 开始从第二个判断
  for (let i = 1; i < len; i++) {
    // 存在相同的元素（更新开始的位置）
    if (dict[str[i]] > -1) {
      start = dict[str[i]] + 1;
      dict[str[i]] = i;
    }
    // 不存在相同的元素
    else {
      dict[str[i]] = i;
    }
    // 每次循环，计算最长的索引，长度是索引的差值 + 1
    let currentMax = i - start + 1;
    if (currentMax > max) {
      max = currentMax;
    }
  }
  return max;
};

// 输入: “abcabcbb”
// 输出: 3
// 解释: 因为无重复字符的最长子串是 “abc”，所以其长度为 3。

// 输入: “bbbbb”
// 输出: 1
// 解释: 因为无重复字符的最长子串是 “b”，所以其长度为 1。

// 输入: “pwwkew”
// 输出: 3
// 解释: 因为无重复字符的最长子串是 “wke”，所以其长度为 3。
// 请注意，你的答案必须是 子串 的长度，“pwke” 是一个子序列，不是子串。

console.log(fn('abcabcbb'), fn('bbbbb'), fn('pwwkew'));


~~~



### 长度最小的子数组(209题目)
~~~js
/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
 var minSubArrayLen = function(s, nums) {
  const len = nums.length;
  let left = 0;
  let right = 0;
  let sum = nums[0];
  while (sum < s) {
      right++;
      sum += nums[right];
      // 全部的和小于s, 那么直接返回0
      if (right === len) {
          return 0;
      }
  }
  let minLen = right - left + 1;
  // 开始遍历每一种情况
  while (left <= right && right < len) {
      if (sum > s) {
          sum -= nums[left];
          left++;
      } else {
          right++;
          if (right === len) {
              break;
          }
          sum += nums[right];
      }
      if (sum >= s) {
          let currentLen = right - left + 1;
          if (minLen > currentLen) {
              minLen = currentLen;
          }
      }
  }
  return minLen;
};

~~~

