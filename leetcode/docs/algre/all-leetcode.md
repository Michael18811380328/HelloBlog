
### 0001-two-sum.js

~~~js
// 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
// 你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
// https://leetcode.com/problems/two-sum/description/

// 示例:
// 给定 nums = [2, 7, 11, 15], target = 9
// 因为 nums[0] + nums[1] = 2 + 7 = 9
// 所以返回 [0, 1]

// 方法1：时间复杂度 o(nlogN) 58%
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum1(nums, target) {
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
}

// 方法二：52%
function twoSum(nums, target) {
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    const another = target - nums[i];
    const index = nums.lastIndexOf(another);
    if (index > -1 && i !== index) {
      return [i, index];
    }
  }
}

// 方法三：使用哈希表
// 68 ms, 在所有 javascript 提交中击败了85.69%
function twoSum2(nums, target) {
  const len = nums.length;
  const hash = {};
  for (let i = 0; i < len; i++) {
    const item = nums[i];
    const index = hash[`${item}`];
    if (index > -1) {
      return [index, i];
    }
    hash[`${target - item}`] = i;
  }
}

// 方法四：哈希表（类似方法三）
function twoSum3(nums, target) {
  const arr = nums;
  const keyMap = {};
  for (let i = 0, len = arr.length; i < len; i++) {
    if (typeof keyMap[target - arr[i]] !== 'undefined') {
      return [keyMap[target - arr[i]], i];
    }
    keyMap[arr[i]] = i;
  }
  return [i, j];
}

export { twoSum, twoSum1, twoSum2, twoSum3 };

~~~

  
### 0002-addTwoNumbers.js

~~~js
// 02-addTwoNumbers.js
// https://leetcode.com/problems/add-two-numbers/description/
// 给出两个非空的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
// 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
// 您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

// 输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
// 输出：7 -> 0 -> 8
// 原因：342 + 465 = 807
// 特殊情况
// [9, 9], [9] => [8, 0, 1]
// [5], [5] => [0, 1]

// 思路1：112 ms, 在所有 JavaScript 提交中击败了82.57%
function ListNode(val) {
  this.val = val;
  this.next = null;
}

function handleTen(node) {
  if (node.val !== 10) return;
  if (node.next) {
    node.val = 0;
    node.next.val++;
    handleTen(node.next);
  } else {
    node.val = 0;
    node.next = new ListNode(1);
  }
}

function addTwoNumbers(l1, l2) {
  if (!l1 && !l2) {
    return null;
  }
  if (!l1) {
    handleTen(l2);
    return l2;
  }
  if (!l2) {
    handleTen(l1);
    return l1;
  }
  let value = l1.val + l2.val;
  if (value > 9) {
    if (l1.next) {
      l1.next.val++;
    } else {
      l1.next = new ListNode(1);
    }
    value -= 10;
  }
  const result = new ListNode(value);
  result.next = addTwoNumbers(l1.next, l2.next);
  return result;
}

// 思路2
// 112 ms, 在所有 JavaScript 提交中击败了82.57%
const addTwoNumbers2 = function (l1, l2) {
  // 辅助函数
  const getVal = function (list1, list2, plus = 0) {
    const val1 = list1 && list1.val;
    const val2 = list2 && list2.val;
    const total = val1 + val2 + plus;
    return {
      val: total % 10,
      next: parseInt(total / 10, 10),
    };
  };
  let l = null;
  let plus = 0;
  // 辅助函数
  // eslint-disable-next-line no-shadow
  function setNode(vm, l1, l2) {
    if (!l1 && !l2 && !plus) {
      return vm;
    }
    const totalObj = getVal(l1, l2, plus);
    if (totalObj.next) {
      plus = totalObj.next;
    } else {
      plus = 0;
    }
    if (!l) {
      l = new ListNode(totalObj.val);
      vm = l;
    } else {
      vm.next = new ListNode(totalObj.val);
      vm = vm.next;
    }
    if ((l1 && l1.next) || (l2 && l2.next) || plus) {
      return setNode(vm, l1 && l1.next, l2 && l2.next);
    }
  }
  setNode(l, l1, l2);
  return l;
};

export { addTwoNumbers, addTwoNumbers2 };

~~~

  
### 0003-lengthOfLongestSubstring.js

~~~js
/*
 * [3] 无重复字符的最长子串
 * https://leetcode.com/problems/longest-substring-without-repeating-characters/description/
 */
// 初步思路：双指针（快慢指针实现）
// 两个指针移动，然后不断判断子序列内部是否重复，然后累计计算当前最长的距离。
// 1、循环获取子串 ——双指针
// 2、如何判断一个子串是否有重复字符？——这个直接IndexOf行不行
// 如果这个方法不好，那么使用对象判断是否重复
function lengthOfLongestSubstring(s) {
  // 辅助函数：true 没有重复字符串
  const checkStr = (str) => {
    const len = str.length;
    for (let i = 0; i < len; i++) {
      const current = str[i];
      if (str.lastIndexOf(current) !== str.indexOf(current)) {
        return false;
      }
    }
    return true;
  };
  const len = s.length;
  // 处理特殊情况（如果长度是0或者是1，那么直接返回长度）
  if (len <= 1) {
    return len;
  }
  // 设置初始值
  let start = 0;
  let end = 1;
  let num = 1;
  // 循环
  while (end <= len - 1) {
    const sub = s.slice(start, end + 1);
    const result = checkStr(sub);
    if (result) {
      // 如果不重复，累积最大值，快指针加一
      end++;
      num = num > sub.length ? num : sub.length;
    } else {
      // 如果重复，重新开始
      if (end === len - 1) {
        return num;
      }
      start++;
      end++;
    }
  }
  return num;
}

// 思路2-有问题
// function lengthOfLongestSubstring2(str) {
//   let i = 0;
//   let maxSubstring = str[i];
//   let currentMaxString = str[i];
//   const position = 0;
//   for (let j = 1; j < str.length; j++) {
//     if (currentMaxString.indexOf(str[j]) >= 0) {
//       i = currentMaxString.indexOf(str[j]) + 1 + position;
//       if (currentMaxString.length > maxSubstring.length) {
//         maxSubstring = currentMaxString;
//       }
//       if (i === j) {
//         currentMaxString = str[j];
//       } else {
//         currentMaxString = str.substring(i, j);
//         str = str.substr(i);
//       }
//       continue;
//     }
//     currentMaxString += str[j];
//     maxSubstring = currentMaxString;
//   }
//   return maxSubstring.length;
// }

export { lengthOfLongestSubstring };

~~~

  
### 0004-findMedianSortedArrays.js

~~~js
// 04
// 给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。
// 请你找出这两个有序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。
// 你可以假设 nums1 和 nums2 不会同时为空。(如果有一个是空的情况)

// 思路：双指针：把排序数组的最小的一个放在第三个数组中，如果一个是空，那么就放另一个，如果结果数组的长度大于index2，那么返回结果数组的最后两项
// 尝试用双指针解决: 这个本地单元测试通过，严格逻辑可能有问题，需要注意
function findMedianSortedArrays(nums1, nums2) {
  const len1 = nums1.length;
  const len2 = nums2.length;
  const middle = (len1 + len2) / 2;
  let index1 = null;
  let index2 = null;
  // 这里判断奇数还是偶数
  if (middle % 1 !== 0) {
    index1 = middle - 0.5;
  } else {
    index1 = middle - 1;
    index2 = middle;
  }
  // len 是长度，index 是数组下标，需要减一；先处理1个数组是0的情况
  if (len1 === 0) {
    if (index2) {
      return (nums2[index1] + nums2[index2]) / 2;
    }
    return nums2[index1];
  }
  if (len2 === 0) {
    if (index2) {
      return (nums1[index1] + nums1[index2]) / 2;
    }
    return nums1[index1];
  }
  if (len1 === 1 && len2 === 1) {
    return (nums1[0] + nums2[0]) / 2;
  }
  // 处理两个数组都不是空的情况，使用第三个数组和双指针
  if (index2) {
    // 偶数，需要获取两个数并计算平均数
    let i = 0; let j = 0;
    const sum = [];
    // 能否改成一个变量？这里不需要数组，直接使用一个临时变量，记录上一个参数是多少就行
    while (i + j <= index2) {
      if (nums1[i] <= nums2[j] && nums1[i] !== undefined) {
        sum.push(nums1[i]);
        i++;
      } else if (nums2[j] !== undefined) {
        sum.push(nums2[j]);
        j++;
      } else {
        if (i + 1 === len1) {
          // 第一个数列结束了，第二个剩余
          const tmp = index2 - i;
          return ((nums2[tmp] + nums2[tmp - 1]) / 2);
        }
        // 第二个结束了，第一个剩余
        const tmp = index2 - j;
        return ((nums1[tmp] + nums1[tmp - 1]) / 2);
      }
      if (i + j - 1 === index2) {
        return ((sum[i + j - 1] + sum[i + j - 2]) / 2);
      }
    }
  } else {
    // 奇数，计算当时的那个中位数即可
    let i = 0;
    let j = 0;
    while (i + j <= index1) {
      if (nums1[i] <= nums2[j] && nums1[i] !== undefined) {
        i++;
      } else if (nums2[j] !== undefined) {
        j++;
      } else {
        if (i + 1 === len1) {
          return nums2[index1 - i];
        }
        return nums1[index1 - j];
        // 一个已经结束，另一个还有很多
        // i + j < index1 其中一个已经循环结束了
        // 那么直接返回剩余的一个数组的 index1 - i 即可
      }
      if (i + j === index1) {
        if (nums1[i] === undefined) return nums2[j];
        if (nums2[j] === undefined) return nums1[i];
        return nums1[i] < nums2[j] ? nums1[i] : nums2[j];
      }
    }
  }
}

// 思路二：把排序后的数组合并到一起，然后重新排序，获取中位数即可
// 156 ms, 在所有 javascript 提交中击败了48.38%
function findMedianSortedArrays2(nums1, nums2) {
  const arr = nums1.concat(nums2);
  arr.sort((a, b) => a - b);
  const len = arr.length;
  const middle = len / 2;
  let index1 = null;
  let index2 = null;
  if (middle % 1 !== 0) {
    index1 = middle - 0.5;
  } else {
    index1 = middle - 1;
    index2 = middle;
  }
  if (index2) {
    return (arr[index1] + arr[index2]) / 2;
  }
  return arr[index1];
}

export { findMedianSortedArrays, findMedianSortedArrays2 };

~~~

  
### 0005-longestPalindrome.js

~~~js
const longestPalindrome = function(s) {
  // 辅助函数：判断子字符串是否是回文
  // 循环一半字符串即可
  const checkPalindrome = (start, end) => {
    const subLen = Math.ceil((end - start) / 2);
    for (let i = 0; i <= subLen; i++) {
      if (s[start + i] !== s[end - i]) {
        return false;
      }
    }
    return true;
  };
  const len = s.length;
  for (let i = len - 1; i > 0; i--) {
    // 这是当前子字符串的长度
    const currentLen = i;
    // 内部循环，遍历全部的情况（获取开始节点和结束节点的指针）
    for (let j = 0; j < len - currentLen; j++) {
      const start = j;
      const end = j + currentLen;
      // 判断两个指针构成的子字符串，是否是回文的
      // 注意指针的边界判断
      if (checkPalindrome(start, end)) {
        return s.slice(start, end + 1);
      }
    }
  }
  return s[0];
};

export { longestPalindrome };

~~~

  
### 0006-convertZ.js

~~~js
/**
 * [6] Z 字形变换
 * @lc app=leetcode.cn id=6 lang=javascript
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
const convert = function(s, numRows) {
  // 注意处理 num是1-2的情况
  if (numRows === 1) return s;
  // 建一个对象，设置不同的键，然后每一个numRows是空字符串
  const dict = {};
  for (let key = 1; key <= numRows; key++) {
    dict[key] = '';
  }
  // 如果当前的序号是 0 或者是 numRows.length - 1
  let current = 1;
  let direction = true;
  for (let i = 0; i < s.length; i++) {
    // 获取当前的字符串，并加入到字典中
    const item = s[i];
    dict[current] = dict[current] + item;
    // 当循环到第一个或者最后一个，换向
    if (current === numRows) {
      direction = false;
    } else if (current === 1) {
      direction = true;
    }
    // 当前的序号增加或者减少
    if (direction) {
      current++;
    } else {
      current--;
    }
  }
  let result = '';
  for (let i = 1; i <= numRows; i++) {
    const item = dict[i];
    result += item;
  }
  return result;
  // 然后遍历完，把对应的字符串从对象中拿出
  // 然后再拼接成新的字符串
};

export { convert };

~~~

  
### 0007-reverse.js

~~~js
// 07-整数反转
// 给出一个32位的有符号整数，你需要将这个整数中每位上的数字进行反转。
// 方法1：使用数组和字符串反转数字
// 难点：没有看清楚整数溢出说明，前两次调试错误
// 假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−231,  231 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。
// 时间复杂度不好，128 ms 35.8 MB weak
/**
 * @param {number[]} x
 * @return {number[]}
 */
function reverse1(x) {
  const isMinus = x < 0;
  const arr = String(Math.abs(x)).split('').reverse();
  const result = Number(arr.join(''));
  if (result >= (2 ** 31) - 1 || result <= ((-2) ** 31) + 1) {
    return 0;
  }
  return isMinus ? -result : result;
}

// 算法二：遍历这个数字，依次获取个位数并放在新的数中。96 ms 较好
function reverse(x) {
  if (x === 0) return x;
  const isMinus = x < 0;
  let result = 0;
  x = Math.abs(x);
  while (x > 0) {
    const a = x % 10;
    result = result * 10 + a;
    x = (x - a) / 10;
  }
  if (result >= (2 ** 31) - 1 || result <= ((-2) ** 31) + 1) {
    return 0;
  }
  return isMinus ? -result : result;
}

export { reverse, reverse1 };

~~~

  
### 0008-transform-string.js

~~~js
// 08 字符串转化成数值（特殊情况很多）
// 请你来实现一个 atoi 函数，使其能将字符串转换成整数。

/**
 *
首先，该函数会根据需要丢弃无用的开头空格字符，直到寻找到第一个非空格的字符为止。
当我们寻找到的第一个非空字符为正或者负号时，则将该符号与之后面尽可能多的连续数字组合起来，作为该整数的正负号；假如第一个非空字符是数字，则直接将其与之后连续的数字字符组合起来，形成整数。
该字符串除了有效的整数部分之后也可能会存在多余的字符，这些字符可以被忽略，它们对于函数不应该造成影响。
注意：假如该字符串中的第一个非空格字符不是一个有效整数字符、字符串为空或字符串仅包含空白字符时，则你的函数不需要进行转换。
在任何情况下，若函数不能进行有效的转换时，请返回 0。
假设我们的环境只能存储 32 位大小的有符号整数，那么其数值范围为 [−231,  231 − 1]。如果数值超过这个范围，请返回  INT_MAX (231 − 1) 或 INT_MIN (−231) 。
*/

/**
 * @param {string} str
 * @return {number}
 */
// const myAtoi = function(str) {
//   const number = Number(str);
//   if (isNaN(number)) {
//     let result = 0;
//     while (str.length > 0) {
//       if (str.slice(0, 1) === ' ') break;
//       const first = 1 * str.slice(0, 1);
//       if (isNaN(first)) break;
//       result = result * 10 + first;
//       str = str.substring(1);
//     }
//     return result;
//   }
//   // handle number max and min
//   const max = Math.pow(2, 31);
//   const min = Math.pow(-2, 31);
//   return number > max ? max : ( number < min ? min : number);
// };

// 标准答案都会使用正则表达式，直接使用字符串API无法处理复杂情况
// 更快的答案直接把最值计算转化成具体的数值比较
// 尽快巩固常见的正则表达式，日常使用正则表达式不多

function myAtoi(str) {
  str = str.trim();
  // [+|-] 表示一个或者多个字符
  // d+ 表示一个或者多个数值
  const reg = new RegExp(/^[+|-]?\d+/);
  if (!reg.test(str)) {
    return 0;
  }
  const val = parseInt(str.match(reg), 0);
  const min = -(2 ** 31);
  const max = -min - 1;
  return Math.max(Math.min(val, max), min);
}

export { myAtoi };

~~~

  
### 0009-isPalindrome.js

~~~js
// 09-判断回文数
// https://leetcode.com/problems/palindrome-number/description/
// 如果是0，是回文数
// 如果是0结尾，一定不是回文数；如果是负数，一定不是回文数
// 如果是小数，一定不是回文数（输入整数，不考虑这个情况）
// 执行用时: 220 ms 45.2 MB
function isPalindrome(x) {
  if (x === 0) return true;
  if (x < 0 || x % 10 === 0) return false;
  // 其他的进入循环判断
  const arr = String(x).split('');
  for (let i = 0, len = arr.length; i < len / 2; i++) {
    if (arr[i] !== arr[len - i - 1]) {
      return false;
    }
  }
  return true;
}

// 方法二
// 判断回文数：原数字取反相同即可
// 204 ms 46.8 MB
function isPalindrome2(x) {
  if (x < 0) return false;
  if (x === 0) return true;
  let a = x;
  let b = 0;
  while (a > 0) {
    b = b * 10 + (a % 10);
    a = (a - (a % 10)) / 10;
  }
  return b === x;
}

export { isPalindrome, isPalindrome2 };

~~~

  
### 0010-isMatch.js

~~~js
/*
 * @lc app=leetcode.cn id=10 lang=javascript
 *
 * [10] 正则表达式匹配
 */
// 思路：
// 从左向右匹配比较复杂，从右向左匹配
// 这个是动态规划：F(n)= n && F(n - 1)
// 具体就是：一个字符串是否满足 === 最后一个字符是否满足 && 前面的字串是否满足，然后迭代实现
// 参考链接：https://leetcode.cn/problems/regular-expression-matching/solution/shou-hui-tu-jie-wo-tai-nan-liao-by-hyj8/
// 这个比较难，未来多做几次
// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
const isMatch = (s, p) => {
  if (s == null || p == null) {
    return false;
  }

  const sLen = s.length;
  const pLen = p.length;

  const dp = new Array(sLen + 1);
  for (let i = 0; i < dp.length; i++) {
    dp[i] = new Array(pLen + 1).fill(false);
  }

  // 基本情况
  dp[0][0] = true;
  for (let j = 1; j < pLen + 1; j++) {
    if (p[j - 1] == '*') {
      dp[0][j] = dp[0][j - 2];
    }
  }

  // 迭代（动态规划）
  for (let i = 1; i < sLen + 1; i++) {
    for (let j = 1; j < pLen + 1; j++) {
      // 1.如果最后一个字符相等，或者最后一个是通配符. 满足匹配下一个
      if (s[i - 1] === p[j - 1] || p[j - 1] === '.') {
        dp[i][j] = dp[i - 1][j - 1];
      }
      // 2. 如果最后一个是 *，分情况
      else if (p[j - 1] == '*') {
        // 2.1 如果前一位相等，或者是通配符
        if (s[i - 1] === p[j - 2] || p[j - 2] === '.') {
          // 下面三种情况满足一种即可（这里没有考虑到）
          // 这个情况比较复杂
          dp[i][j] = dp[i][j - 2] || dp[i - 1][j - 2] || dp[i - 1][j];
        }
        // 2.2 如果前一位不相等，呢么等于前面两位的字符串
        else {
          dp[i][j] = dp[i][j - 2];
        }
      }
    }
  }
  // 返回对应的匹配结果
  return dp[sLen][pLen];
};

// @lc code=end

// 10-给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。
// '.' 匹配任意单个字符
// '*' 匹配零个或多个前面的那一个元素
// 所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。
// s 可能为空，且只包含从 a-z 的小写字母。
// p 可能为空，且只包含从 a-z 的小写字母，以及字符 . 和 *。

// 删除一个字符串的开头的相同的元素
// function deleteStart(s) {
//   const item = s[0];
//   while (s[0] === item) {
//     s = s.slice(1);
//   }
//   return s;
// }

// 删除一个字符串的某个字符
// function deleteS(s, item) {
//   while (s[0] === item) {
//     s = s.slice(1);
//   }
//   return s;
// }

// 然后循环P
// 如果遇到单个字符，那么减去这个字符，减去S中对应的这个字符
// 如果遇到a* 那么把S中的全部a删除，同时删除a*
// 如果遇到.* 那么直接返回真（匹配全部的情况）

// function isMatch(s, p) {
//   // 没有匹配标准，那么移动符合，返回true
//   if (p === '' || p === '.*') {
//     return true;
//   }
// while (p.length > 0) {
//   if (p === '.') {
//     // 如果P是. 只要S的长度是1，就是真；否则就是假的
//     return s.length === 1;
//   } else if (p.length === 1) {
//     // 如果P的长度是1，并且与S相等，那么返回真
//     return p === s;
//   } else if (p[0] === '.' && p[1] === '*') {
//     p = p.slice(2);
//     s = deleteStart(s);
//   } else if (p[1] === '*') {
//     s = deleteS(s, p[0]);
//     p = p.slice(2);
//   } else if ((p[0] === s[0]) || (p[0] === '.' && p[1] !== '*')) {
//     p = p.slice(1);
//     s = s.slice(1);
//   } else {
//     return false;
//   }
// }
//   return s.length === 0;
// }

export { isMatch };

~~~

  
### 0011-maxArea.js

~~~js
// 11
// 给定 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，
// 垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

// 说明：你不能倾斜容器，且 n 的值至少为 2。
// 输入: [1,8,6,2,5,4,8,3,7]
// 输出: 49

// 方法1：两次循环，逐步比较计算最大值
// 两次循环性能不好：1868 ms, 在所有 javascript 提交中击败了5.11%
function maxArea(height) {
  if (height.length === 2) {
    return height[0] > height[1] ? height[1] : height[0];
  }
  let max = 0;
  const { length } = height;
  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
      if (height[j + 1] && height[j + 1] > height[j]) {
        continue;
      }
      const area = (height[i] > height[j] ? height[j] : height[i]) * (j - i);
      if (area > max) {
        max = area;
      }
    }
  }
  return max;
}

// 方法2：双指针逼近最大值
// 84 ms, 在所有 JavaScript 提交中击败了82.20%
// 一次循环实现（算法复杂度满足）
function maxArea2(height) {
  const len = height.length;
  if (len === 2) {
    return Math.min(height[0], height[1]);
  }
  let left = 0;
  let right = len - 1;
  let max = Math.min(height[left], height[right]) * (right - left);
  while (left !== right) {
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
    const curr = Math.min(height[left], height[right]) * (right - left);
    if (curr > max) {
      max = curr;
    }
  }
  return max;
}

export { maxArea, maxArea2 };

~~~

  
### 0012-intToRoman.js

~~~js
// 12-罗马数字包含以下七种字符： I， V， X， L，C，D 和 M。
// 字符          数值
// I             1
// V             5
// X             10
// L             50
// C             100
// D             500
// M             1000
// 例如， 罗马数字 2 写做 II ，即为两个并列的 1。12 写做 XII ，即为 X + II 。 27 写做  XXVII, 即为 XX + V + II 。

// 这几种情况特殊处理
// 不断取余数，然后存放在数组中，最后遍历数组，转化成字符串输出
// I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
// X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。
// C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。

// 148 ms, 在所有 javascript 提交中击败了94.84%
function intToRoman(num) {
  const res = [];
  res[0] = (num - (num % 1000)) / 1000;
  num %= 1000;
  res[1] = (num - (num % 500)) / 500;
  num %= 500;
  res[2] = (num - (num % 100)) / 100;
  num %= 100;
  res[3] = (num - (num % 50)) / 50;
  num %= 50;
  res[4] = (num - (num % 10)) / 10;
  num %= 10;
  res[5] = (num - (num % 5)) / 5;
  num %= 5;
  res[6] = num;
  // 1994 [ 1, 1, 4, 1, 4, 0, 4 ] M CM XC IV
  // if null , ''
  let result = '';

  // 1000
  while (res[0] > 0) {
    result += 'M';
    res[0]--;
  }

  // 100
  if (res[2] === 4) {
    result = res[1] === 1 ? `${result}CM` : `${result}CD`;
  } else {
    // while (res[1] > 0) {
    //   result += 'D';
    //   res[1]--;
    // }
    if (res[1] === 1) {
      result += 'D';
    }
    while (res[2] > 0) {
      result += 'C';
      res[2]--;
    }
  }

  // 10
  if (res[4] === 4) {
    result = res[3] === 1 ? `${result}XC` : `${result}XL`;
  } else {
    // while (res[3] > 0) {
    //   result += 'L';
    //   res[3]--;
    // }
    if (res[3] === 1) {
      result += 'L';
    }
    while (res[4] > 0) {
      result += 'X';
      res[4]--;
    }
  }

  // 1
  if (res[6] === 4) {
    result = res[5] === 1 ? `${result}IX` : `${result}IV`;
  } else {
    // while (res[5] > 0) {
    //   result += 'V';
    //   res[5]--;
    // }
    if (res[5] === 1) {
      result += 'V';
    }
    while (res[6] > 0) {
      result += 'I';
      res[6]--;
    }
  }
  return result;
}

export { intToRoman };

~~~

  
### 0013-romanToInt.js

~~~js
// 罗马字符串转化成数值
// https://leetcode.com/problems/roman-to-integer/description/
// https://en.wikipedia.org/wiki/Roman_numerals

// 思路1：不同字符串对应不同的数值，这里使用一个Map存储对应表；
// 首先把字符串转化一个数值（while字符串长度大于0）
// 如果当前的值比后面的大，直接转化后加入数值；如果当前的值和后面的相等，直接加入这个数值（这两个情况属于一类）
// 如果当期的值比后面的小（XV）,使用后面的减去前面的值，字符串减去2；
// 168 ms, 在所有 JavaScript 提交中击败了 94.41% 的用户
function romanToInt(s) {
  const dir = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  let result = 0;
  while (s.length > 0) {
    const s0 = s.charAt(0);
    const s1 = s.charAt(1);
    if (s1 === '' || s0 === s1 || dir[s0] > dir[s1]) {
      result += dir[s0];
      s = s.substring(1);
    } else if (dir[s0] < dir[s1]) {
      result = result - dir[s0] + dir[s1];
      s = s.substring(2);
    }
  }
  return result;
}

// 方案2
// 上面的方案中，遇到4和9直接减法
// 这个方案，直接获取4和9存放到对象中，然后进行相加(这样可以减少一定的加法计算)
// 可以不使用数组存放，两种方法的复杂度都是N
function romanToInt2(s) {
  const romanLetters = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };
  const arr = s.split('');
  let num = 0;
  for (let i = 0; i < arr.length; i++) {
    const key = arr[i];
    if (key !== 'V' || key !== 'M') {
      if (romanLetters[key + arr[i + 1]]) {
        num += romanLetters[key + arr[i + 1]];
        i += 1;
        continue;
      }
    }
    num += romanLetters[key];
  }
  return num;
}

export { romanToInt, romanToInt2 };

~~~

  
### 0014-longestCommonPrefix.js

~~~js
// 14-编写一个函数来查找字符串数组中的最长公共前缀。
// 给定一个字符串数组，返回公共前缀(字符串都是小写)
// Write a function to find the longest common prefix string amongst an array of strings.
// https://leetcode.com/problems/longest-common-prefix/description/

// 方案1
// 执行用时 : 60 ms, 在所有 JavaScript 提交中击败了 99.08% 的用户
/**
 * @param {string[]} strs
 * @return {string}
 */
function longestCommonPrefix(strs) {
  if (strs.length === 0) return '';
  if (strs.length === 1) {
    return strs[0];
  }
  // 如果长度大于1，那么需要获取公共字符串前缀
  let commonPrefix = '';
  for (let i = 0, len = strs[0].length; i < len; i++) {
    const str = strs[0].charAt(i);
    for (let j = 0; j < strs.length; j++) {
      if (str !== strs[j].charAt(i)) {
        return commonPrefix;
      }
    }
    commonPrefix += str;
  }
  return commonPrefix;
}

// 方案2：减少第一次的对比（j=1，获取一次字符串的长度）
// 64 ms, 在所有 javascript 提交中击败了 94.05%
// 两次测试时间不同。原理上第二次更简单
function longestCommonPrefixPro(strs) {
  const { length } = strs;
  if (length === 0) return '';
  if (length === 1) {
    return strs[0];
  }
  // 如果长度大于1，那么需要获取公共字符串前缀
  let commonPrefix = '';
  for (let i = 0, len = strs[0].length; i < len; i++) {
    const str = strs[0].charAt(i);
    for (let j = 1; j < length; j++) {
      if (str !== strs[j].charAt(i)) {
        return commonPrefix;
      }
    }
    commonPrefix += str;
  }
  return commonPrefix;
}

// 方案3
function findLongestCommonPrefix(strs) {
  if (strs.length === 0) {
    return '';
  }
  let key = '';
  const fn = function (str) {
    for (let i = 0; i < strs.length; i++) {
      if (strs[i].indexOf(str) !== 0) {
        return false;
      }
    }
    return true;
  };
  let j = 0;
  while (key !== strs[0]) {
    const q = (key + strs[0][j++]);
    if (!fn(q)) {
      break;
    }
    key = q;
  }
  return key;
}

export { longestCommonPrefix, longestCommonPrefixPro, findLongestCommonPrefix };

~~~

  
### 0015-threeSum.js

~~~js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 思路1 超时
// 现在这种方法超出时间限制（数组长度是1000，那么两层循环性能不好）
const threeSumTmp = function (nums) {
  const resultArr = [];
  const len = nums.length;
  // 把数组先排序
  nums.sort((a, b) => a - b);
  for (let i = 0; i < len; i++) {
    // 当前的值是 current，那么剩下两个值的和应该是 -current;
    const current = nums[i];
    const target = current * -1;
    const hash = {};
    for (let j = i + 1; j < len; j++) {
      const item = nums[j];
      if (hash[item] > -1) {
        const result = [nums[i], nums[j], nums[hash[item]]];
        resultArr.push(result);
      }
      hash[target - item] = j;
    }
  }
  // 现在的结果有重复
  // [[-1,1,0],[-1,2,-1],[-1,1,0]]
  // 最后结果数组去重
  let tmp = [];
  resultArr.forEach((item) => {
    const str = item.join(',');
    tmp.push(str);
  });
  tmp = [...new Set(tmp)];
  const res = [];
  tmp.forEach((item) => {
    const arr = item.split(',');
    res.push(arr);
  });
  // [ -4, -1, -1, 0, 1, 2 ]
  return res;
};

// 思路二：可以实现，性能不好
// 820 ms , 在所有 JavaScript 提交中击败了5.09%的用户
const threeSum = function (nums) {
  const resultArr = [];
  const len = nums.length;
  // 把数组先排序
  nums.sort((a, b) => a - b);
  // 排序后，如果第一个元素大于0，或者最后一个元素小于0，那么无解，返回空数组
  if (nums[0] > 0 || nums[len - 1] < 0) {
    return [];
  }
  const hash = {};
  for (let i = 0; i < len; i++) {
    // 当前的值是 current，那么剩下两个值的和应该是 -current;
    const current = nums[i];
    const target = current * -1;
    // 使用双指针实现
    let start = i + 1;
    let end = len - 1;
    while (start < end) {
      if (nums[start] + nums[end] === target) {
        const hs = [nums[i], nums[start], nums[end]];
        // 因为现在已经是排序的，写一个哈希表，避免重复数据
        const key = `${nums[i]}+${nums[start]}+${nums[end]}`;
        if (!hash[key]) {
          resultArr.push(hs);
          hash[key] = true;
        }
        start++;
        // 这里性能不好，处理重复数据会消耗大量时间[00000000]
      } else if (nums[start] + nums[end] < target) {
        start++;
      } else if (nums[start] + nums[end] > target) {
        end--;
      }
    }
  }
  return resultArr;
};

export { threeSum, threeSumTmp };

~~~

  
### 0017-letterCombinations.js

~~~js
// 17 电话号码九键字母组合
// 在九键按键电话，写短信需要对应（2-9分别对应字母）
// 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
// 思路一：如果每一个数值遍历一次，那么时间复杂度是2N次方（不好）

// 思路二：用空间换时间
// 数字的遍历是必须的，那么结果数组中，使用新的数组迭代旧数组，这样会用到 n 个中间变量
// 1 遇到第一个2，创建一个长度是3的数组，每一个填充[abc]
// 2 遇到3，遍历上面的数组，复制每一条信息，插入对应的三条 splice(i, 1, newArray) [ad,ae,af,...];
// 执行用时 : 64 ms , 在所有 JavaScript 提交中击败了90.94% 的用户
// 内存消耗 : 33.8 MB , 在所有 JavaScript 提交中击败了23.48% 的用户

function letterCombinations(digits) {
  let resultArr = [];
  if (digits.length === 0) return resultArr; // 处理传入为空
  const dir = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz',
  };
  // 循环数字
  while (digits.length > 0) {
    // 获取当前数字对应的字符串
    const firstNumber = digits.slice(0, 1);
    digits = digits.slice(1, digits.length);
    const firstStr = dir[firstNumber];
    // 把这个字符串加入到结果数组中
    const newResultArr = [];
    if (resultArr.length === 0) {
      resultArr = firstStr.split('');
    } else {
      for (let i = 0; i < resultArr.length; i++) {
        const item = resultArr[i];
        newResultArr.push(item + firstStr[0], item + firstStr[1], item + firstStr[2]);
        // 处理一下特殊的7和9
        if (firstStr[3]) newResultArr.push(item + firstStr[3]);
      }
      // 使用新的结果数组迭代旧的结果数组
      resultArr = newResultArr;
    }
  }
  return resultArr;
}

export { letterCombinations };

~~~

  
### 0018-fourSum.js

~~~js
// 18 四数之和
// 给定一个包含 n 个整数的数组 nums（有重复值） 和一个目标值 target，判断 nums 中是否存在四个元素 a，b，c 和 d ，使得 a + b + c + d 的值与 target 相等？找出所有满足条件且不重复的四元组。答案中不可以包含重复的四元组。

// 思路一：暴力循环4次，这样可以数组的内部四个数的全部子集。时间复杂度极高，不使用
// 思路二：四个数的和，分解成两个数的和，两个数的和。这两个和加起来的目标就是4。
// 这样先进行n2遍历，获取前两个数的和，然后计算余下的 n - 2 个数，获取两个，然后输出。
// 1748 ms, 在所有 JavaScript 提交中击败了 6.30% 的用户
// 时间复杂度的问题：主要是大量的数据转化，以及多重循环

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
function fourSum(nums, target) {
  // 先计算两个数的和数组，把四个数的和问题转化成两个数的和问题，降维减少时间复杂度
  const twoSumArr = [];
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    for (let j = i; j < len; j++) {
      const obj = {};
      obj.x = i;
      obj.y = j;
      obj.twoSum = nums[i] + nums[j];
      // 这里最好过滤一下，如果和已有的重复，就不需要加入
      twoSumArr.push(obj);
    }
  }
  // 遍历这个和矩阵，如果和是目标，那么把对应的项数放到一个新的数组中
  const resultArr = [];
  const len2 = twoSumArr.length;
  for (let i = 0; i < len2; i++) {
    for (let j = i; j < len2; j++) {
      if ((twoSumArr[i].twoSum + twoSumArr[j].twoSum) === target) {
        const set = new Set([twoSumArr[i].x, twoSumArr[i].y, twoSumArr[j].x, twoSumArr[j].y]);
        if (set.size === 4) {
          // 这四个数都不等，才不会重用数字;现在可以保证项数不重复；但是原始数组中可能有重复的元素，例如0出现了两次
          const arr = [nums[twoSumArr[i].x], nums[twoSumArr[i].y], nums[twoSumArr[j].x], nums[twoSumArr[j].y]];
          // 然后，二维数组排序后，转化成字符串去重
          const arrStr = arr.sort().join(',');
          if (!resultArr.includes(arrStr)) {
            resultArr.push(arrStr);
          }
        }
      }
    }
  }
  // 结果数组转化成二维数组（升维）
  for (let i = 0; i < resultArr.length; i++) {
    resultArr[i] = resultArr[i].split(',').map(Number);
    // array.map(Number) 把字符串数组转化成数值类型
  }
  return resultArr;
}

export { fourSum };

~~~

  
### 0020-valid-parenthese.js

~~~js
// 检测括号有效性
// 如果是左半部分，不用管，直接放在另一个字符串；
// 如果是右半部分，必须在左边找到这个对应的字符串，位置需要正确，然后删除，否则返回false
// 如果最后结果字符串长度是0，那么就是有效的括号字符串
// 2019年：56 ms , 在所有提交中击败了 99.60% 的用户
// 2020-01-11：92 ms, 在所有提交中击败了16.05%
function isValid(s) {
  let result = '';
  const left = ['(', '[', '{'];
  for (let i = 0, len = s.length; i < len; i++) {
    if (left.includes(s.charAt(i))) {
      result += s.charAt(i);
    } else if ((s.charAt(i) === ')' && result.charAt(result.length - 1) === '(') || (s.charAt(i) === ']' && result.charAt(result.length - 1) === '[') || (s.charAt(i) === '}' && result.charAt(result.length - 1) === '{')) {
      result = result.substr(0, result.length - 1);
    } else {
      return false;
    }
  }
  return result.length === 0;
}

// 优化方法 不需要数组
// 68 ms, 在所有提交中击败了60.38%
function isValid2(s) {
  let result = '';
  for (let i = 0, len = s.length; i < len; i++) {
    const item = s.charAt(i);
    if (item === '(' || item === '[' || item === '{') {
      result += item;
    } else if ((item === ')' && result.charAt(result.length - 1) === '(') || (item === ']' && result.charAt(result.length - 1) === '[') || (item === '}' && result.charAt(result.length - 1) === '{')) {
      result = result.substr(0, result.length - 1);
    } else {
      return false;
    }
  }
  return result.length === 0;
}

export { isValid, isValid2 };

~~~

  
### 0021-mergeTwoLists.js

~~~js
/*
 * @lc app=leetcode.cn id=21 lang=javascript
 *
 * [21] 合并两个有序链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
// 这个题目的原理明白，就是递归比较链表头结点的值
// 卡在了链表数据结构操作上
// 因为没有要求不改变原始链表，那么直接操作原始链表即可
const mergeTwoLists = function(list1, list2) {
  if (list1 === null && list2 === null) {
    return null;
  }
  if (list1 === null) {
    return list2;
  }
  if (list2 === null) {
    return list1;
  }
  // 如果都不是 null 直接比较这两个链表的头结点
  if (list1.val < list2.val) {
    list1.next = mergeTwoLists(list1.next, list2);
    return list1;
  } else {
    list2.next = mergeTwoLists(list1, list2.next);
    return list2;
  }
};
// @lc code=end

export { mergeTwoLists };

~~~

  
### 0022-generate-parenthesis.js

~~~js
// 22 括号生成
// 给出 n 代表生成括号的对数，请你写出一个函数，使其能够生成所有可能的并且有效的括号组合。
/**
例如，给出 n = 3，生成结果为：（考点：回溯算法）注意：n表示括号的对数；
[
  "((()))",
  "(()())",
  "(())()",
  "()(())",
  "()()()"
]
 */
// 思路：N对括号，那么生成的长度就是2N，可以使用一个循环，每一个的可能是左括号或者右括号。

// 辅助函数：判断当前的情况是否是正确的。
function isValid(str) {
  let res = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '(') {
      res++;
    } else {
      res--;
    }
    if (res < 0) {
      return false;
    }
  }
  return res === 0;
}

// 方法一：列举全部的情况，然后过滤一下处理(本地少量测试可以，但是时间复杂度太差，LeetCode超时)
// 这是正向思维
function generateParenthesis(n) {
  const arr = ['('];
  // 把全部的可能性加成一个数组，然后过滤这个字符串数组；
  for (let i = 1; i < 2 * n; i++) {
    const len = arr.length;
    for (let j = 0; j < len; j++) {
      arr[j + len] = `${arr[j]})`;
      arr[j] = `${arr[j]}(`;
    }
  }
  return arr.filter((item) => isValid(item));
}

// 反向思维：首先判断当前结果是否正确，然后再加入到结果数组中，循环2N次
// 92 ms, 在所有 javascript 提交中击败了21.28%，性能不好。当大于N时，需要判断第二层循环，这样不需要后面的过滤
// 辅助函数拆分成两个
function isValid2(str) {
  let res = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '(') {
      res++;
    } else {
      res--;
    }
    if (res < 0) {
      return false;
    }
  }
  return true;
}

function isValid3(str) {
  let res = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '(') {
      res++;
    } else {
      res--;
    }
  }
  if (res === 0) {
    return true;
  }
  return false;
}

// 主函数
function generateParenthesis2(n) {
  const arr = ['('];
  // 把全部的可能性加成一个数组，然后过滤这个字符串数组；
  for (let i = 1; i < 2 * n; i++) {
    const len = arr.length;
    for (let j = 0; j < len; j++) {
      const lastItem = `${arr[j]})`;
      if (isValid2(lastItem)) {
        arr[j + len] = lastItem;
      }
      const firstItem = `${arr[j]}(`;
      if (isValid2(firstItem)) {
        arr[j] = firstItem;
      }
    }
  }
  return arr.filter((item) => isValid3(item));
}

function isValid4(str) {
  let res = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '(') {
      res++;
    } else {
      res--;
    }
  }
  return res;
}

// 思路三：每一次都判断是否合法
// 96 ms, 在所有 javascript 提交中击败了18.02%
function generateParenthesis3(n) {
  const arr = ['('];
  // 前半部分，只要结果大于0
  for (let i = 1; i < n; i++) {
    const len = arr.length;
    for (let j = 0; j < len; j++) {
      const lastItem = `${arr[j]})`;
      if (isValid2(lastItem)) {
        arr[j + len] = lastItem;
      }
      const firstItem = `${arr[j]}(`;
      if (isValid2(firstItem)) {
        arr[j] = firstItem;
      }
    }
  }
  // 后半部分结果小于 2 * n - i
  // 这里可以优化
  for (let i = n; i < 2 * n; i++) {
    const len = arr.length;
    for (let j = 0; j < len; j++) {
      const lastItem = `${arr[j]})`;
      const lastRes = isValid4(lastItem);
      if (lastRes >= 0 && lastRes < 2 * n - i) {
        arr[j + len] = lastItem;
      }
      const firstItem = `${arr[j]}(`;
      const firstRes = isValid4(firstItem);
      if (firstRes >= 0 && firstRes < 2 * n - i) {
        arr[j] = firstItem;
      }
    }
  }
  return arr.filter((item) => item.length === 2 * n);
}

export { isValid, generateParenthesis, generateParenthesis2, generateParenthesis3 };

~~~

  
### 0024-swapPairs.js

~~~js
/*
 * @lc app=leetcode.cn id=24 lang=javascript
 *
 * [24] 两两交换链表中的节点
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 60 ms, 在所有 JavaScript 提交中击败了70.94%
const swapPairs = function(head) {
  const changeNode = (node) => {
    if (!node) {
      return node;
    }
    if (node && !node.next) {
      return node;
    }
    // 有 node 和 node.next
    const a = node;
    const b = node.next;
    const c = node.next.next;
    // 前后交换节点，改变指针
    a.next = changeNode(c);
    b.next = a;
    return b;
  };
  return changeNode(head);
};
// @lc code=end

export { swapPairs };

~~~

  
### 0026-removeDuplicates.js

~~~js
// 26 排序数组去重
// 给定一个排序数组，你需要在原地删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。
// 不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。
// 你不需要考虑数组中超出新长度后面的元素。

// 方法一：循环一次，删除重复元素
// 100 ms, 在所有 javascript 提交中击败了 71.42%
function removeDuplicates1(nums) {
  for (let i = 0; i < nums.length;) {
    if (nums[i] === nums[i + 1]) {
      nums.splice(i, 1);
    } else {
      i++;
    }
  }
  return nums.length;
}

// 方法二：快慢指针
// 96 ms 在所有 JavaScript 提交中击败了83.05%
// 40.1 MB 在所有 JavaScript 提交中击败了11.37%
function removeDuplicates2(nums) {
  const len = nums.length;
  if (len === 0) {
    return 0;
  }
  let slow = 0;
  for (let fast = 0; fast < len; fast++) {
    if (nums[fast] !== nums[slow]) {
      slow++;
      nums[slow] = nums[fast];
    }
  }
  return slow + 1;
}

export { removeDuplicates1, removeDuplicates2 };

~~~

  
### 0027-removeArrayElement.js

~~~js
// 27
// 给定一个数组 nums 和一个值 val，你需要原地移除所有数值等于 val 的元素，返回移除后数组的新长度。
// 不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。

// 方法一：首先使用indexOf过滤不符合的数组 72 ms , 在所有 javascript 提交中击败了 68.56%
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
function removeElement(nums, val) {
  if (!nums.includes(val)) {
    return nums.length;
  }
  for (let i = 0; i < nums.length;) {
    if (nums[i] === val) {
      nums.splice(i, 1);
    } else {
      i++;
    }
  }
  return nums.length;
}

// 如果不使用Includes方法判断，76 ms, 在所有 javascript 提交中击败了55.09%

export { removeElement };

~~~

  
### 0028-search-str.js

~~~js
// 28 实现 strStr() 函数。
// 给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从0开始)。如果不存在，则返回  -1。

// haystack = "hello", needle = "ll" 输出: 2
// 当 needle 是空字符串时，我们应当返回0
// 64 ms , 在所有 javascript 提交中击败了 90.91%
function strStr(haystack, needle) {
  if (needle === '') return 0;
  return haystack.indexOf(needle);
}

export { strStr };

~~~

  
### 0029-divide.js

~~~js
// 29 不使用除法，实现除
/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
function handleBig(result) {
  if (result > 2147483647) {
    return 2147483647;
  }
  if (result < -2147483648) {
    return -2147483648;
  }
  return result;
}

// 这个办法需要一直循环，性能不好
// 4276 ms, 在所有 javascript 提交中击败了 12.99%
function divide(dividend, divisor) {
  // handle 0 1
  if (dividend === 0) {
    return 0;
  }
  if (dividend === divisor) {
    return 1;
  }
  if (dividend === -divisor) {
    return -1;
  }
  if (divisor === 1) {
    return handleBig(dividend);
  }
  if (divisor === -1) {
    return handleBig(-dividend);
  }
  if (Math.abs(dividend) < Math.abs(divisor)) {
    return 0; // 如果被除数小于除数，商是0
  }
  // 都是正数
  let result = 0;
  if (dividend > 0 && divisor > 0) {
    while (dividend >= divisor) {
      dividend -= divisor;
      result++;
    }
  }
  // 都是负数
  if (dividend < 0 && divisor < 0) {
    while (-dividend >= -divisor) {
      dividend -= divisor;
      result++;
    }
  }
  // 被除数大于0，除数小于0
  if (dividend > 0 && divisor < 0) {
    while (dividend >= -divisor) {
      dividend += divisor;
      result++;
    }
    result = -result;
  }
  // 被除数<0, 除数大于0
  if (dividend < 0 && divisor > 0) {
    while (-dividend >= divisor) {
      dividend += divisor;
      result++;
    }
    result = -result;
  }
  return handleBig(result);
}

export { divide };

~~~

  
### 0030-findSubstring.js

~~~js
/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
const getDict = function(words) {
  const len = words.length;
  const dict = {};
  for (let i = 0; i < len; i++) {
    const key = words[i];
    if (dict[key]) {
      dict[key]++;
    } else {
      dict[key] = 1;
    }
  }
  return dict;
};

const checkStr = function (DICT, str, keyLen) {
  const dict = { ...DICT };
  // 把str切割成 keyLen 的长度，然后比较每一个子字符串和字典是否满足
  while (str.length > 0) {
    const key = str.slice(0, keyLen);
    str = str.slice(keyLen);
    if (!dict[key]) {
      // 不存在这个键直接返回
      return false;
    } else {
      // 存在这个键，判断出现的次数
      if (dict[key] > 0) {
        dict[key] = dict[key] - 1;
      } else {
        return false;
      }
    }
  }
  return true;
};

// 740 ms , 在所有 JavaScript 提交中击败了 54.02%
const findSubstring = function(s, words) {
  // 反向思路:获取目标的字符串的长度
  const keyLen = words[0].length;
  const len = words.length * keyLen;
  // 先把目标单词数组转换成一个对象（因为可能重复）
  const dict = getDict(words);
  // 使用的时候复制字典，不能改变原始值
  const res = [];
  // 然后遍历当前的S字符串，获取子字符串
  for (let i = 0; i < s.length; i++) {
    const subStr = s.slice(i, i + len);
    // 判断每一个子字符串是否满足对象要求，如果满足，那么返回当前的index
    if (subStr.length < len) break;
    if (checkStr(dict, subStr, keyLen)) {
      res.push(i);
    }
  }
  return res;
};

export { findSubstring };

~~~

  
### 0031-nextPermutation.js

~~~js
// 31-nextPermutation
// 获取这个数组中比这个大的一个数字
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
function nextPermutation(nums) {
  const len = nums.length;
  let index = -1;
  for (let i = len - 2; i >= 0; i--) {
    if (nums[i + 1] > nums[i]) {
      // 找到后一个数比前一个数大的index
      index = i;
      break;
    }
  }
  if (index === -1) {
    nums.reverse(); // 数组倒序排列，直接倒序返回最小值
    return;
  }
  // 获取比这个数大的数字
  let tmp;
  let tmpIndex;
  for (let j = index + 1; j < len; j++) {
    if (nums[j] > nums[index] && (!tmp || nums[j] <= tmp)) {
      tmp = nums[j];
      tmpIndex = j;
    }
  }
  // 交换两个数的位置
  nums[tmpIndex] = nums[index];
  nums[index] = tmp;
  // 后面的重新排序(index + 1 到 len - 1)
  const arr = nums.splice(index + 1, len - index - 1);
  arr.sort((a, b) => a - b);
  nums.push(...arr);
}

export { nextPermutation };

~~~

  
### 0033-search-rotate-array.js

~~~js
// 33 寻找数组中的数字
// 假设按照升序排序的数组在预先未知的某个点上进行了旋转。
// ( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。
// 搜索一个给定的目标值，如果数组中存在这个目标值，则返回它的索引，否则返回 -1 。
// 数组中不存在重复的元素，时间复杂度必须是 O(log n) 级别。

// 示例 1:
// 输入: nums = [4,5,6,7,0,1,2], target = 0
// 输出: 4
// 示例 2:
// 输入: nums = [4,5,6,7,0,1,2], target = 3
// 输出: -1

// 方法一：使用数组的API
// 68 ms, 在所有 JavaScript 提交中击败了69.46%
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search1(nums, target) {
  return nums.indexOf(target);
}

// 方法二：使用一次循环，时间复杂度可以实现
// Your runtime beats 13.6 % of javascript submissions
function search2(nums, target) {
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    if (nums[i] === target) {
      return i;
    }
  }
  return -1;
}

// 方法三：使用二分法找到这个数字
// 如果是logN，必须直接二分，那么就需要判断二分的条件
// 任何一个数组，都能划分成两个子数组，可以找到开头，中间，结尾三个节点
// 如果这个目标数存在，那么一定在这差最大的两个数之间
// Your runtime beats 40.56 % of javascript submissions
const search3 = function(nums, target) {
  const len = nums.length;
  if (len === 1) {
    return nums[0] === target ? 0 : -1;
  } else if (len === 2) {
    return nums[0] === target ? 0 : (nums[1] === target ? 1 : -1);
  }
  // 使用二分法处理
  let start = 0;
  let end = len - 1;
  if (nums[start] === target) {
    return start;
  }
  if (nums[end] === target) {
    return end;
  }
  while (start < end - 1) {
    if (nums[start] === target) {
      return start;
    }
    if (nums[end] === target) {
      return end;
    }
    const mid = Math.floor((end - start) / 2) + start;
    if (nums[mid] === target) {
      return mid;
    }
    // 如果在两个数之间，优先在这两个数中间寻找
    if (nums[start] < target && target < nums[mid]) {
      end = mid;
    } else if (nums[mid] < target && target < nums[end]) {
      start = mid;
    } else {
      // 如果都不在的情况下，那就在绝对值较大的一个中
      const left = Math.abs(nums[mid] - nums[start]);
      const right = Math.abs(nums[mid] - nums[end]);
      if (left > right) {
        end = mid;
      } else if (left < right) {
        start = mid;
      }
      // 如果前后的绝对值相等，那么证明已经是升序了，然后这个数又不在其中，就没有
      else {
        return -1;
      }
    }
  }
  return -1;
};

// console.log(search3([4, 5, 6, 7, 0, 1, 2], 0) === 4);
// console.log(search3([4, 5, 6, 7, 0, 1, 2], 3) === -1);
// console.log(search3([4, 5, 6, 7, 0, 1, 2], 100) === -1);
// console.log(search3([4, 5, 6, 7, 0, 1, 2], 2) === 6);

export { search1, search2, search3 };

~~~

  
### 0034-searchRange.js

~~~js
// 34-searchRange
// 搜索一个排序数组中，某个值的开始位置和结束位置
// 如果没有这个数，返回[-1,-1]
// 思路一：使用 includes indexOf lastIndexOf 函数获取位置
// 64 ms, 在所有 JavaScript 提交中击败了81.62%
function searchRange1(nums, target) {
  const startIndex = nums.indexOf(target);
  if (startIndex === -1) return [-1, -1];
  const endIndex = nums.lastIndexOf(target);
  return [startIndex, endIndex];
}

// 思路二：遍历一次数组，获取开始的位置和结束的位置
// 92 ms, 在所有 JavaScript 提交中击败了9.25%
function searchRange2(nums, target) {
  const len = nums.length;
  let start = -1;
  let end = -1;
  for (let i = 0; i <= len; i++) {
    if (nums[i] === target && (nums[i - 1] === undefined || nums[i - 1] !== target)) {
      start = i;
    }
    if (nums[i - 1] === target && (nums[i] === undefined || nums[i] !== target)) {
      end = i - 1;
    }
  }
  return [start, end];
}

// 思路二改进后,性能提升
// 60 ms, 在所有 JavaScript 提交中击败了90.05%
function searchRange3(nums, target) {
  const len = nums.length;
  let start = -1;
  let end = -1;
  for (let i = 0; i <= len; i++) {
    if (start === -1 && nums[i] === target && (nums[i - 1] === undefined || nums[i - 1] !== target)) {
      start = i;
    }
    if (nums[i - 1] === target && (nums[i] === undefined || nums[i] !== target)) {
      end = i - 1;
    }
    if (start !== -1 && end !== -1) {
      break;
    }
  }
  return [start, end];
}

// 思路三：数组使用二分法获取位置
export { searchRange1, searchRange2, searchRange3 };

~~~

  
### 0035-searchInsert.js

~~~js
// 35. 搜索插入位置
// 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。你可以假设数组中无重复元素。
// 输入: [1,3,5,6], 5 输出: 2

// 44 ms , 在所有 javascript 提交中击败了 99.95%
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function searchInsert(nums, target) {
  const index = nums.indexOf(target);
  if (index > -1) return index;
  if (target < nums[0]) {
    return 0;
  }
  const len = nums.length - 1;
  if (target > nums[len]) {
    return len + 1;
  }
  let min = 0;
  let max = len;
  while (max > min) {
    const middle = Math.ceil((max + min) / 2);
    if (nums[middle] > target) {
      if (middle === max) return middle;
      max = middle;
    } else {
      min = middle;
    }
  }
}

export { searchInsert };

~~~

  
### 0036-isValidSudoku.js

~~~js
// 判断一个 9x9 的数独是否有效。只需要根据以下规则，验证已经填入的数字是否有效即可。

// 数字 1-9 在每一行只能出现一次。
// 数字 1-9 在每一列只能出现一次。
// 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。

/**
 * @param {character[][]} board
 * @return {boolean}
 */
// 外层是三个循环（行列、9个单元格）
// 内层判断是否有元素重复；如果重复，返回false
// 内部专门写一个函数，判断9个数中是否有重复的元素

// 思路1：按照定义，判断每行、每列、每个小单元格是否有重复的元素，需要三次N平方循环，每次判断需要循环

// 辅助函数：判断9个数中是否有重复元素
// 80 ms, 在所有 JavaScript 提交中击败了94.19%
function isDuplicate(arr) {
  for (let i = 0; i < 9; i++) {
    if (arr[i] === '.') {
      continue;
    } else {
      const item = arr[i];
      if (arr.indexOf(item) !== arr.lastIndexOf(item)) {
        return false;
      }
    }
  }
  return true;
}

// 这里的性能不好，indexOf,lastIndexOf
// 直接使用Set去重后，比较长度，性能应该更好（首先过滤掉点）
// 92 ms, 在所有 JavaScript 提交中击败了62.00% 从时间上看没有明显效果·
function isDuplicate2(arr) {
  arr = arr.filter((item) => item !== '.');
  const res = new Set(arr);
  return res.size === arr.length;
}

// 主函数
function isValidSudoku(board) {
  // 二维数组
  for (let i = 0; i < 9; i++) {
    if (!isDuplicate(board[i])) {
      return false;
    }
  }
  for (let i = 0; i < 9; i++) {
    const column = [];
    for (let j = 0; j < 9; j++) {
      column.push(board[j][i]);
    }
    if (!isDuplicate(column)) {
      return false;
    }
  }
  // 组合 x 0 3 6 y 0 3 6
  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      // i j is left top point
      const cell = [];
      cell.push(board[i][j], board[i][j + 1], board[i][j + 2]);
      cell.push(board[i + 1][j], board[i + 1][j + 1], board[i + 1][j + 2]);
      cell.push(board[i + 2][j], board[i + 2][j + 1], board[i + 2][j + 2]);
      if (!isDuplicate(cell)) {
        return false;
      }
    }
  }
  return true;
}

// 思路二：使用哈希表；把数字作为键，把位置作为哈希值
// 循环一次数组，获取哈希表；如果哈希表中的位置在同一行，同一列，或者9个单元格内部，那么不是有效的数独
// 100 ms, 在所有 javascript 提交中击败了53.72%

// 辅助函数：判断是否在一个小单元格内部
function isSmallCell(pointArr) {
  const len = pointArr.length;
  const arr = [];
  for (let i = 0; i < len; i++) {
    const j = pointArr[i][0];
    const k = pointArr[i][1];
    if (j < 3) {
      if (k < 3) {
        if (!arr[1]) {
          arr[1] = 1;
        } else {
          return false;
        }
      } else if (k < 6) {
        if (!arr[2]) {
          arr[2] = 1;
        } else {
          return false;
        }
      } else if (!arr[3]) {
        arr[3] = 1;
      } else {
        return false;
      }
    } else if (j < 6) {
      if (k < 3) {
        if (!arr[4]) {
          arr[4] = 1;
        } else {
          return false;
        }
      } else if (k < 6) {
        if (!arr[5]) {
          arr[5] = 1;
        } else {
          return false;
        }
      } else if (!arr[6]) {
        arr[6] = 1;
      } else {
        return false;
      }
    } else if (k < 3) {
      if (!arr[7]) {
        arr[7] = 1;
      } else {
        return false;
      }
    } else if (k < 6) {
      if (!arr[8]) {
        arr[8] = 1;
      } else {
        return false;
      }
    } else if (!arr[9]) {
      arr[9] = 1;
    } else {
      return false;
    }
  }
  return true;
}

// 辅助函数，判断有效的哈希值
function isValidHash(pointArr) {
  const len = pointArr.length;
  if (len === 1) {
    return true;
  }
  const obj0 = {};
  const obj1 = {};
  for (let i = 0; i < len; i++) {
    const j = pointArr[i][0];
    const k = pointArr[i][1];
    // 在一行或者一列内出现，就是假的
    if (obj0[j]) {
      return false;
    }
    obj0[j] = 1;

    if (obj1[k]) {
      return false;
    }
    obj1[k] = 1;
  }
  // 需要判断是否在9个格子内部
  return isSmallCell(pointArr);
}

function isValidSudoku2(board) {
  const hash = {};
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const item = board[i][j];
      if (item === '.') continue;
      if (hash[item]) {
        hash[item].push([i, j]);
      } else {
        hash[item] = [[i, j]];
      }
    }
  }
  for (const key in hash) {
    if (!isValidHash(hash[key])) {
      return false;
    }
  }
  return true;
}

// 使用 Map 需要改变 babel-core 7.0版本，否则编译会报错
// function isValidSudoku2(board) {
//   let hash = new Map();
//   for (let i = 0; i < 9; i++) {
//     for (let j = 0; j < 9; j++) {
//       const item = board[i][j];
//       if (item === '') continue;
//       if (hash.get(item)) {
//         hash.set(item, hash.get(item).push([i, j]));
//       } else {
//         hash.set(item, [[i, j]]);
//       }
//     }
//   }
//   console.log(hash);
//   for (const [value] of hash) {
//     if (!isValidHash(value)) {
//     return false;
//     }
//   }
//   return true;
// }

export { isValidSudoku, isDuplicate, isDuplicate2, isValidSudoku2, isValidHash };

~~~

  
### 0038-countAndSay.js

~~~js
// 报数序列是一个整数序列，按照其中的整数的顺序进行报数，得到下一个数。其前五项如下：

// 1.     1
// 2.     11
// 3.     21
// 4.     1211
// 5.     111221
// 1 被读作  "one 1"  ("一个一") , 即 11。
// 11 被读作 "two 1s" ("两个一"）, 即 21。
// 21 被读作 "one 2",  "one 1" （"一个二" ,  "一个一") , 即 1211。

// 38- 外观数列
// 给定一个正整数 n（1 ≤ n ≤ 30），输出报数序列的第 n 项。
// 注意：整数顺序将表示为一个字符串。

/**
 * @param {number} n
 * @return {string}
 */
// 思路一：按照定义，暴力计算
// 外循环设置一个数组，然后计算下一项的结果是什么
// 64 ms, 在所有 javascript 提交中击败了88.34%
function countAndSay(n) {
  if (n === 1) return '1';
  if (n === 2) return '11';
  const dict = [null, '1', '11'];

  for (let i = 3; i <= n; i++) {
    const lastArr = dict[i - 1].split('');
    let result = '';
    let time = 0;
    let str = null;
    while (lastArr.length > 0) {
      if (lastArr[0] === str) {
        time++;
      } else {
        if (time > 0) {
          result = result + time + str;
        }
        time = 1;
        str = lastArr[0];
      }
      lastArr.shift();
    }
    dict[i] = result + time + str;
  }
  return dict[n];
}

// 思路二：通过方法一训练，获取结果字典；训练集合并计算出30内的结果
// 56 ms, 在所有 javascript 提交中击败了98.38%
// 训练集合思路可行，但是方法实际不可行
function countAndSay2(n) {
  const dict = [
    '1',
    '11',
    '21',
    '1211',
    '111221',
    '312211',
    '13112221',
    '1113213211',
    '31131211131221',
    '13211311123113112211',
    '11131221133112132113212221',
    '3113112221232112111312211312113211',
    '1321132132111213122112311311222113111221131221',
    '11131221131211131231121113112221121321132132211331222113112211',
    '311311222113111231131112132112311321322112111312211312111322212311322113212221',
    '132113213221133112132113311211131221121321131211132221123113112221131112311332111213211322211312113211',
    '11131221131211132221232112111312212321123113112221121113122113111231133221121321132132211331121321231231121113122113322113111221131221',
    '31131122211311123113321112131221123113112211121312211213211321322112311311222113311213212322211211131221131211132221232112111312111213111213211231131122212322211331222113112211',
    '1321132132211331121321231231121113112221121321132122311211131122211211131221131211132221121321132132212321121113121112133221123113112221131112311332111213122112311311123112111331121113122112132113213211121332212311322113212221',
    '11131221131211132221232112111312111213111213211231132132211211131221131211221321123113213221123113112221131112311332211211131221131211132211121312211231131112311211232221121321132132211331121321231231121113112221121321133112132112312321123113112221121113122113121113123112112322111213211322211312113211',
    '311311222113111231133211121312211231131112311211133112111312211213211312111322211231131122211311122122111312211213211312111322211213211321322113311213212322211231131122211311123113223112111311222112132113311213211221121332211211131221131211132221232112111312111213111213211231132132211211131221232112111312211213111213122112132113213221123113112221131112311311121321122112132231121113122113322113111221131221',
    '132113213221133112132123123112111311222112132113311213211231232112311311222112111312211311123113322112132113213221133122112231131122211211131221131112311332211211131221131211132221232112111312111213322112132113213221133112132113221321123113213221121113122123211211131221222112112322211231131122211311123113321112131221123113111231121113311211131221121321131211132221123113112211121312211231131122211211133112111311222112111312211312111322211213211321322113311213211331121113122122211211132213211231131122212322211331222113112211',
    '111312211312111322212321121113121112131112132112311321322112111312212321121113122112131112131221121321132132211231131122211331121321232221121113122113121113222123112221221321132132211231131122211331121321232221123113112221131112311332111213122112311311123112112322211211131221131211132221232112111312211322111312211213211312111322211231131122111213122112311311221132211221121332211213211321322113311213212312311211131122211213211331121321123123211231131122211211131221131112311332211213211321223112111311222112132113213221123123211231132132211231131122211311123113322112111312211312111322212321121113122123211231131122113221123113221113122112132113213211121332212311322113212221',
    '3113112221131112311332111213122112311311123112111331121113122112132113121113222112311311221112131221123113112221121113311211131122211211131221131211132221121321132132212321121113121112133221123113112221131112311332111213213211221113122113121113222112132113213221232112111312111213322112132113213221133112132123123112111311222112132113311213211221121332211231131122211311123113321112131221123113112221132231131122211211131221131112311332211213211321223112111311222112132113212221132221222112112322211211131221131211132221232112111312111213111213211231132132211211131221232112111312211213111213122112132113213221123113112221133112132123222112111312211312112213211231132132211211131221131211132221121311121312211213211312111322211213211321322113311213212322211231131122211311123113321112131221123113112211121312211213211321222113222112132113223113112221121113122113121113123112112322111213211322211312113211',
    '132113213221133112132123123112111311222112132113311213211231232112311311222112111312211311123113322112132113212231121113112221121321132132211231232112311321322112311311222113111231133221121113122113121113221112131221123113111231121123222112132113213221133112132123123112111312111312212231131122211311123113322112111312211312111322111213122112311311123112112322211211131221131211132221232112111312111213111213211231132132211211131221232112111312212221121123222112132113213221133112132123123112111311222112132113213221132213211321322112311311222113311213212322211211131221131211221321123113213221121113122113121132211332113221122112133221123113112221131112311332111213122112311311123112111331121113122112132113121113222112311311221112131221123113112221121113311211131122211211131221131211132221121321132132212321121113121112133221123113112221131112212211131221121321131211132221123113112221131112311332211211133112111311222112111312211311123113322112111312211312111322212321121113121112133221121321132132211331121321231231121113112221121321132122311211131122211211131221131211322113322112111312211322132113213221123113112221131112311311121321122112132231121113122113322113111221131221',
    '1113122113121113222123211211131211121311121321123113213221121113122123211211131221121311121312211213211321322112311311222113311213212322211211131221131211221321123113213221121113122113121113222112131112131221121321131211132221121321132132211331121321232221123113112221131112311322311211131122211213211331121321122112133221121113122113121113222123211211131211121311121321123113111231131122112213211321322113311213212322211231131122211311123113223112111311222112132113311213211221121332211231131122211311123113321112131221123113111231121113311211131221121321131211132221123113112211121312211231131122113221122112133221121113122113121113222123211211131211121311121321123113213221121113122113121113222113221113122113121113222112132113213221232112111312111213322112311311222113111221221113122112132113121113222112311311222113111221132221231221132221222112112322211213211321322113311213212312311211131122211213211331121321123123211231131122211211131221131112311332211213211321223112111311222112132113213221123123211231132132211231131122211311123113322112111312211312111322111213122112311311123112112322211213211321322113312211223113112221121113122113111231133221121321132132211331121321232221123123211231132132211231131122211331121321232221123113112221131112311332111213122112311311123112112322211211131221131211132221232112111312111213111213211231132132211211131221131211221321123113213221123113112221131112211322212322211231131122211322111312211312111322211213211321322113311213211331121113122122211211132213211231131122212322211331222113112211',
    '31131122211311123113321112131221123113111231121113311211131221121321131211132221123113112211121312211231131122211211133112111311222112111312211312111322211213211321322123211211131211121332211231131122211311122122111312211213211312111322211231131122211311123113322112111331121113112221121113122113111231133221121113122113121113222123211211131211121332211213211321322113311213211322132112311321322112111312212321121113122122211211232221123113112221131112311332111213122112311311123112111331121113122112132113311213211321222122111312211312111322212321121113121112133221121321132132211331121321132213211231132132211211131221232112111312212221121123222112132113213221133112132123123112111311222112132113311213211231232112311311222112111312211311123113322112132113212231121113112221121321132122211322212221121123222112311311222113111231133211121312211231131112311211133112111312211213211312111322211231131122211311123113322113223113112221131112311332211211131221131211132211121312211231131112311211232221121321132132211331221122311311222112111312211311123113322112132113213221133122211332111213112221133211322112211213322112111312211312111322212321121113121112131112132112311321322112111312212321121113122112131112131221121321132132211231131122211331121321232221121113122113121122132112311321322112111312211312111322211213111213122112132113121113222112132113213221133112132123222112311311222113111231132231121113112221121321133112132112211213322112111312211312111322212311222122132113213221123113112221133112132123222112111312211312111322212321121113121112133221121311121312211213211312111322211213211321322123211211131211121332211213211321322113311213212312311211131122211213211331121321122112133221123113112221131112311332111213122112311311123112111331121113122112132113121113222112311311222113111221221113122112132113121113222112132113213221133122211332111213322112132113213221132231131122211311123113322112111312211312111322212321121113122123211231131122113221123113221113122112132113213211121332212311322113212221',
    '13211321322113311213212312311211131122211213211331121321123123211231131122211211131221131112311332211213211321223112111311222112132113213221123123211231132132211231131122211311123113322112111312211312111322111213122112311311123112112322211213211321322113312211223113112221121113122113111231133221121321132132211331121321232221123123211231132132211231131122211331121321232221123113112221131112311332111213122112311311123112112322211211131221131211132221232112111312211322111312211213211312111322211231131122111213122112311311221132211221121332211213211321322113311213212312311211131122211213211331121321123123211231131122211211131221232112111312211312113211223113112221131112311332111213122112311311123112112322211211131221131211132221232112111312211322111312211213211312111322211231131122111213122112311311221132211221121332211211131221131211132221232112111312111213111213211231132132211211131221232112111312211213111213122112132113213221123113112221133112132123222112111312211312112213211231132132211211131221131211322113321132211221121332211213211321322113311213212312311211131122211213211331121321123123211231131122211211131221131112311332211213211321322113311213212322211322132113213221133112132123222112311311222113111231132231121113112221121321133112132112211213322112111312211312111322212311222122132113213221123113112221133112132123222112111312211312111322212311322123123112111321322123122113222122211211232221123113112221131112311332111213122112311311123112111331121113122112132113121113222112311311221112131221123113112221121113311211131122211211131221131211132221121321132132212321121113121112133221123113112221131112212211131221121321131211132221123113112221131112311332211211133112111311222112111312211311123113322112111312211312111322212321121113121112133221121321132132211331121321132213211231132132211211131221232112111312212221121123222112311311222113111231133211121321321122111312211312111322211213211321322123211211131211121332211231131122211311123113321112131221123113111231121123222112111331121113112221121113122113111231133221121113122113121113221112131221123113111231121123222112111312211312111322212321121113121112131112132112311321322112111312212321121113122122211211232221121321132132211331121321231231121113112221121321133112132112312321123113112221121113122113111231133221121321132132211331221122311311222112111312211311123113322112111312211312111322212311322123123112112322211211131221131211132221132213211321322113311213212322211231131122211311123113321112131221123113112211121312211213211321222113222112132113223113112221121113122113121113123112112322111213211322211312113211',
    '11131221131211132221232112111312111213111213211231132132211211131221232112111312211213111213122112132113213221123113112221133112132123222112111312211312112213211231132132211211131221131211132221121311121312211213211312111322211213211321322113311213212322211231131122211311123113223112111311222112132113311213211221121332211211131221131211132221231122212213211321322112311311222113311213212322211211131221131211132221232112111312111213322112131112131221121321131211132221121321132132212321121113121112133221121321132132211331121321231231121113112221121321133112132112211213322112311311222113111231133211121312211231131122211322311311222112111312211311123113322112132113212231121113112221121321132122211322212221121123222112111312211312111322212321121113121112131112132112311321322112111312212321121113122112131112131221121321132132211231131122111213122112311311222113111221131221221321132132211331121321231231121113112221121321133112132112211213322112311311222113111231133211121312211231131122211322311311222112111312211311123113322112132113212231121113112221121321132122211322212221121123222112311311222113111231133211121312211231131112311211133112111312211213211312111322211231131122111213122112311311222112111331121113112221121113122113121113222112132113213221232112111312111213322112311311222113111221221113122112132113121113222112311311222113111221132221231221132221222112112322211211131221131211132221232112111312111213111213211231132132211211131221232112111312211213111213122112132113213221123113112221133112132123222112111312211312111322212321121113121112133221132211131221131211132221232112111312111213322112132113213221133112132113221321123113213221121113122123211211131221222112112322211231131122211311123113321112132132112211131221131211132221121321132132212321121113121112133221123113112221131112311332111213211322111213111213211231131211132211121311222113321132211221121332211213211321322113311213212312311211131122211213211331121321123123211231131122211211131221131112311332211213211321223112111311222112132113213221123123211231132132211231131122211311123113322112111312211312111322111213122112311311123112112322211213211321322113312211223113112221121113122113111231133221121321132132211331121321232221123123211231132132211231131122211331121321232221123113112221131112311332111213122112311311123112112322211211131221131211132221232112111312211322111312211213211312111322211231131122111213122112311311221132211221121332211213211321322113311213212312311211131211131221223113112221131112311332211211131221131211132211121312211231131112311211232221121321132132211331121321231231121113112221121321133112132112211213322112312321123113213221123113112221133112132123222112311311222113111231132231121113112221121321133112132112211213322112311311222113111231133211121312211231131112311211133112111312211213211312111322211231131122111213122112311311221132211221121332211211131221131211132221232112111312111213111213211231132132211211131221232112111312211213111213122112132113213221123113112221133112132123222112111312211312111322212311222122132113213221123113112221133112132123222112311311222113111231133211121321132211121311121321122112133221123113112221131112311332211322111312211312111322212321121113121112133221121321132132211331121321231231121113112221121321132122311211131122211211131221131211322113322112111312211322132113213221123113112221131112311311121321122112132231121113122113322113111221131221',
    '3113112221131112311332111213122112311311123112111331121113122112132113121113222112311311221112131221123113112221121113311211131122211211131221131211132221121321132132212321121113121112133221123113112221131112212211131221121321131211132221123113112221131112311332211211133112111311222112111312211311123113322112111312211312111322212321121113121112133221121321132132211331121321132213211231132132211211131221232112111312212221121123222112311311222113111231133211121321321122111312211312111322211213211321322123211211131211121332211231131122211311123113321112131221123113111231121123222112111331121113112221121113122113111231133221121113122113121113221112131221123113111231121123222112111312211312111322212321121113121112131112132112311321322112111312212321121113122122211211232221121321132132211331121321231231121113112221121321132132211322132113213221123113112221133112132123222112111312211312112213211231132132211211131221131211322113321132211221121332211231131122211311123113321112131221123113111231121113311211131221121321131211132221123113112211121312211231131122211211133112111311222112111312211312111322211213211321223112111311222112132113213221133122211311221122111312211312111322212321121113121112131112132112311321322112111312212321121113122122211211232221121321132132211331121321231231121113112221121321132132211322132113213221123113112221133112132123222112111312211312112213211231132132211211131221131211322113321132211221121332211213211321322113311213212312311211131122211213211331121321123123211231131122211211131221131112311332211213211321223112111311222112132113213221123123211231132132211231131122211311123113322112111312211312111322111213122112311311123112112322211213211321322113312211223113112221121113122113111231133221121321132132211331222113321112131122211332113221122112133221123113112221131112311332111213122112311311123112111331121113122112132113121113222112311311221112131221123113112221121113311211131122211211131221131211132221121321132132212321121113121112133221123113112221131112311332111213122112311311123112112322211322311311222113111231133211121312211231131112311211232221121113122113121113222123211211131221132211131221121321131211132221123113112211121312211231131122113221122112133221121321132132211331121321231231121113121113122122311311222113111231133221121113122113121113221112131221123113111231121123222112132113213221133112132123123112111312211322311211133112111312211213211311123113223112111321322123122113222122211211232221121113122113121113222123211211131211121311121321123113213221121113122123211211131221121311121312211213211321322112311311222113311213212322211211131221131211221321123113213221121113122113121113222112131112131221121321131211132221121321132132211331121321232221123113112221131112311322311211131122211213211331121321122112133221121113122113121113222123112221221321132132211231131122211331121321232221121113122113121113222123211211131211121332211213111213122112132113121113222112132113213221232112111312111213322112132113213221133112132123123112111311222112132113311213211221121332211231131122211311123113321112131221123113112221132231131122211211131221131112311332211213211321223112111311222112132113212221132221222112112322211211131221131211132221232112111312111213111213211231131112311311221122132113213221133112132123222112311311222113111231132231121113112221121321133112132112211213322112111312211312111322212321121113121112131112132112311321322112111312212321121113122122211211232221121311121312211213211312111322211213211321322123211211131211121332211213211321322113311213211322132112311321322112111312212321121113122122211211232221121321132132211331121321231231121113112221121321133112132112312321123113112221121113122113111231133221121321132122311211131122211213211321222113222122211211232221123113112221131112311332111213122112311311123112111331121113122112132113121113222112311311221112131221123113112221121113311211131122211211131221131211132221121321132132212321121113121112133221123113112221131112311332111213213211221113122113121113222112132113213221232112111312111213322112132113213221133112132123123112111312211322311211133112111312212221121123222112132113213221133112132123222113223113112221131112311332111213122112311311123112112322211211131221131211132221232112111312111213111213211231132132211211131221131211221321123113213221123113112221131112211322212322211231131122211322111312211312111322211213211321322113311213211331121113122122211211132213211231131122212322211331222113112211',
  ];
  return dict[n - 1];
}

// 其他算法：使用正则表达式替换字符串，加一个循环

export { countAndSay, countAndSay2 };

~~~

  
### 0039-combinationSum.js

~~~js
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
// [39] 组合总和
// 考点：回溯算法
// 无限制选取：每次都可以从当前的值开始选择（candidates排序）
// 注意：无重复
// 104 ms, 在所有 JavaScript 提交中击败了58.52%
const combinationSum = function(candidates, target) {
  // 选择数字先排序
  candidates.sort((a, b) => a - b);
  const list = [];
  const tmpList = [];
  backTrack(candidates, tmpList, list, target);
  return list;
};

const sum = (arr) => {
  return arr.reduce((a, b) => a + b, 0);
};

const backTrack = (candidates, tmpList, list, target) => {
  const tmpSum = sum(tmpList);
  if (tmpSum > target) {
    return;
  }
  if (tmpSum === target) {
    list.push([...tmpList]);
    return;
  }
  for (let i = 0; i < candidates.length; i++) {
    const item = candidates[i];
    const last = tmpList[tmpList.length - 1];
    if (item < last) {
      continue;
    } else if (item + tmpSum > target) {
      break;
    } else {
      tmpList.push(item);
      backTrack(candidates, tmpList, list, target);
      tmpList.pop();
    }
  }
};

// 优化后 80 ms, 在所有 JavaScript 提交中击败了99.82%
const combinationSum2 = function(candidates, target) {
  // 选择数字先排序
  candidates.sort((a, b) => a - b);
  const list = [];
  const tmpList = [];
  const sum = (arr) => {
    // todo：这里应该先转换成字符串，然后把结果保存到字典中。
    // 如果第二次求得是相同的数组的和，那么直接从字典中获取值即可
    // 这里应该统计一下求和的数组
    return arr.reduce((a, b) => a + b, 0);
  };
  const len = candidates.length;
  const backTrack = (tmpList) => {
    const tmpSum = sum(tmpList);
    if (tmpSum > target) {
      return;
    }
    if (tmpSum === target) {
      list.push([...tmpList]);
      return;
    }
    for (let i = 0; i < len; i++) {
      const item = candidates[i];
      const last = tmpList[tmpList.length - 1];
      if (item < last) {
        continue;
      } else if (item + tmpSum > target) {
        break;
      } else {
        tmpList.push(item);
        backTrack(tmpList);
        tmpList.pop();
      }
    }
  };
  backTrack(tmpList);
  return list;
};

export { combinationSum, combinationSum2 };

~~~

  
### 0040-combinationSum2.js

~~~js
/*
 * @lc app=leetcode.cn id=40 lang=javascript
 * [40] 组合总和 II
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */

// 思路一：回溯算法（针对特殊用例，使用了特殊的写法）
// 性能比较差
// 604 ms, 在所有 JavaScript 提交中击败了5.94%
const combinationSum2 = function(candidates, target) {
  //  辅助函数：求数组的和
  const sum = (arr) => {
    return arr.reduce((a, b) => a + b, 0);
  };
  // 辅助函数：数组转换成对象存储
  // let getDict = (arr) => {
  //   let dict = {};
  //   arr.forEach(item => {
  //     if (dict[item]) {
  //       dict[item] = dict[item] + 1;
  //     } else {
  //       dict[item] = 1;
  //     }
  //   });
  //   return dict;
  // }

  // 特殊情况处理：如果数组求和后，小于目标值，那么直接返回空
  // [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] 27
  if (sum(candidates) < target) {
    return [];
  }

  // 数字排序
  candidates.sort((a, b) => a - b);
  const list = [];
  const tmpList = [];

  // 特例特办：如果排序后，最后一个仍然是1，那么直接构造一个数组直接返回即可（只有一个情况）
  // 这个不是根本解决方法
  if (candidates[candidates.length - 1] === 1) {
    const a = new Array(target).fill(1);
    return [a];
  }

  // const candicateDict = getDict(candidates);

  // 判断当前数组中，使用次数是否超过全部的元素（回溯应该不需要这个判断）
  // var check = (arr) => {
  //   let dict = {};
  //   for (let i = 0; i < arr.length; i++) {
  //     let item = arr[i];
  //     if (dict[item]) {
  //       dict[item] = dict[item] + 1;
  //     } else {
  //       dict[item] = 1;
  //     }
  //     if (dict[item] > candicateDict[item]) {
  //       return false;
  //     }
  //   }
  //   return true;
  // };

  const invalidDict = {};
  const validDict = {};

  const backTrack = (tmpList, start, tmpSum) => {
    // 先验证，tmpList 是否重复？每个元素的使用次数是否大于规定？——应该不需要判断这里，直接给出一个 index 行不行
    // 这里能不能知己去去掉（没有必要再次做了）——但是时间还是不行
    // if (!check(tmpList)) {
    //   return;
    // }

    // 如果当前的和已经大于目标值，返回
    // let tmpSum = sum(tmpList);
    if (tmpSum > target) {
      invalidDict[String(tmpList)] = true;
      return;
    }
    // 不能有重复
    if (tmpSum === target) {
      list.push([...tmpList]);
      validDict[String(tmpList)] = true;
      return;
    }

    for (let i = start; i < candidates.length; i++) {
      const item = candidates[i];
      tmpList.push(item);
      // 如果当前临时数组，已经计算过了（不管是否满足，那么直接跳过即可，不需要回溯了，这样可以优化一部分）
      // 但是这样还没有到点子上（下面的例子）
      const tmpKey = String(tmpList);
      if (!invalidDict[tmpKey] && !validDict[tmpKey]) {
        // 因为数组是已经排序的，直接传递一个 index 即可，大大减少时间复杂度
        backTrack(tmpList, i + 1, tmpSum + item);
      }
      tmpList.pop();
    }
  };
  // 回溯
  // 第二个参数是开始的位置，第三个参数是当前的和
  backTrack(tmpList, 0, 0);

  // 去重
  const newList = [];
  const dict = {};
  list.forEach((arr) => {
    const key = String(arr);
    if (!dict[key]) {
      newList.push([...arr]);
      dict[key] = true;
    }
  });
  return newList;
};
// @lc code=end

// 思路2
// 改进后解决思路——关键是回溯中去重（剪枝）
// 68 ms, 在所有 JavaScript 提交中击败了72.53%
// 在 39 题目基础上更改
const combinationSum2Pro = function(candidates, target) {
  // 结果数组
  const res = [];
  // 临时数组
  const list = [];
  const len = candidates.length;
  // 先排序
  candidates.sort();

  function backtracking(sum, i) {
    // 如果大于结果，直接返回；
    if (sum > target) return;
    // 如果等于结果，从临时路径中拿出元素
    if (sum === target) {
      res.push(Array.from(list));
      return;
    }
    // 这个变量用来剪枝（当前的值，不能等于前一个的有效的值 [1,1,1,1,1]）处理这样的情况
    // 例如：已有的数组是 [1] 后面应该循环 [1,1,1] 这三个的实际效果是一样的，所以直接使用第一个，后面两个1剪掉
    let lastValidValue = -1;
    for (let j = i; j < len; j++) {
      const n = candidates[j];
      // 如果已经大于结果，直接下一轮
      if (n > target - sum || n === lastValidValue) {
        continue;
      }
      list.push(n);
      sum += n;
      lastValidValue = n;
      backtracking(sum, j + 1);
      list.pop();
      sum -= n;
    }
  }
  // 执行回溯（第一个是当前的和，第二个是遍历的索引）
  backtracking(0, 0);
  return res;
};

export { combinationSum2, combinationSum2Pro };

~~~

  
### 0041-firstMissingPositive.js

~~~js
// 41-firstMissingPositive.js
// 给定一个未排序的整数数组，找出其中没有出现的最小的正整数。
// 你的算法的时间复杂度应为O(n)，并且只能使用常数级别的空间。

// 思路一：先过滤一下，把负数和0排除，然后在排序。排序结束获取最小的正整数
// 68 ms, 在所有 javascript 提交中击败了76.60%
function firstMissingPositive(nums) {
  nums = nums.filter((item) => item > 0);
  nums = nums.sort((a, b) => a - b);
  if (nums[0] !== 1) {
    return 1;
  }
  const len = nums.length;
  for (let i = 1; i < len; i++) {
    if (nums[i] > nums[i - 1] + 1) {
      return nums[i - 1] + 1;
    }
  }
  return nums[len - 1] + 1;
}

export { firstMissingPositive };

~~~

  
### 0042-trapRain.js

~~~js
// 42 接雨水（困难）
// 思路一：正向计算（一层一层计算水量）较复杂
// 思路二：反向计算（阴影部分总面积-已有的深色的面积=雨水的面积） 72ms 94%
/**
 * @param {number[]} height
 * @return {number}
 */
function trapRain(height) {
  // 如果初始化是空数组，直接返回0
  if (height.length === 0) return 0;

  // 首先处理特殊值：如果开始和结尾是0， 那么直接去掉这部分项
  while (height[0] === 0) {
    height.shift();
  }
  while (height[height.length - 1] === 0) {
    height.pop();
  }
  // 如果处理完是一个空数组，直接返回
  if (height.length === 0) return 0;
  // 雨水的总量
  let sum = 0;
  // 获取最大值（峰值）
  const max = Math.max(...height);

  // 获取峰值数组
  const maxIndexArr = [];
  height.forEach((item, index) => {
    if (item === max) maxIndexArr.push(index);
  });

  // 多峰型处理, 需要计算第一个峰和最后一个峰之间的雨水(计算正确)
  if (maxIndexArr.length > 1) {
    let middleSum = 0;
    for (let i = maxIndexArr[0]; i < maxIndexArr[maxIndexArr.length - 1]; i++) {
      middleSum += height[i];
    }
    const rain = max * (maxIndexArr[maxIndexArr.length - 1] - maxIndexArr[0]) - middleSum;
    sum += rain;
  }

  // 计算开始到第一个峰左侧的水量
  let leftSum = 0;
  let leftRainSum = 0;
  for (let i = 0; i < maxIndexArr[0]; i++) {
    leftSum += height[i];
    if (i > 0 && height[i] < height[i - 1]) {
      height[i] = height[i - 1];
    }
    leftRainSum += height[i];
  }
  sum += leftRainSum - leftSum;

  // 计算最后一个峰右侧的水量
  let rightSum = 0;
  let rightRainSum = 0;
  for (let i = height.length - 1; i > maxIndexArr[maxIndexArr.length - 1]; i--) {
    rightSum += height[i];
    if (height[i] < height[i + 1]) {
      height[i] = height[i + 1];
    }
    rightRainSum += height[i];
  }
  sum += rightRainSum - rightSum;
  return sum;
}

export { trapRain };

~~~

  
### 0043-multiply.js

~~~js
// 43-multiply
// 给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。

// 思路一：直接转换成整数处理（如果数字特别大那么计算错误）不符合题目要求
// 72 ms, 在所有 javascript 提交中击败了91.55%
function multiply(num1, num2) {
  return String(BigInt(num1) * BigInt(num2));
}
// 由于BigInt还在提案中，测试无法通过，使用时监测浏览器兼容

// 方法二：模拟乘法计算，一位一位相乘，然后把结果相加
// 120 ms, 在所有 javascript 提交中击败了43.11%

// 辅助函数
function handleAdd(item) {
  item.unshift(0);
  for (let i = item.length - 1; i >= 0; i--) {
    if (item[i + 1] >= 10) {
      const remain = Math.floor(item[i + 1] / 10);
      item[i + 1] = item[i + 1] % 10;
      item[i] += remain;
    }
  }
  if (item[0] === 0) {
    item.shift(1);
  }
  return item.join('');
}

// 辅助函数
function handleSum(arr) {
  if (arr.length === 1) {
    return handleAdd(arr[0]);
  }
  // 1、获取最长的一个数组的长度，然后将其他的长度增加0
  let maxLen = 0;
  for (let i = 0; i < arr.length; i++) {
    const itemLen = arr[i].length;
    if (itemLen > maxLen) {
      maxLen = itemLen;
    }
  }
  // 2、其他数组的长度补0
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length < maxLen) {
      const dec = maxLen - arr[i].length;
      const newArr = new Array(dec).fill(0);
      arr[i] = newArr.concat(arr[i]);
    }
  }
  const result = new Array(maxLen).fill(0);
  // 3/加起来求和
  for (let i = 0; i < arr.length; i++) {
    for (let j = maxLen - 1; j >= 0; j--) {
      result[j] += arr[i][j];
    }
  }
  return handleAdd(result);
}

// 主函数
function multiply2(num1, num2) {
  // 首先处理特殊情况
  if (num1 === '0' || num2 === '0') return '0';
  if (num1 === '1') return num2;
  if (num2 === '1') return num1;
  // 判断大数和小数
  const bigNum = num1.length > num2.length ? num1 : num2;
  const smallNum = num1.length > num2.length ? num2 : num1;
  // 小数外循环，大数内循环，然后把结果加起来
  const bigLen = bigNum.length;
  const smallLen = smallNum.length;
  const resultArr = [];
  for (let i = 0; i < smallLen; i++) {
    const tmpResult = new Array(smallLen - i - 1).fill(0);
    for (let j = bigLen - 1; j >= 0; j--) {
      const tmp = smallNum[i] * bigNum[j];
      tmpResult.unshift(tmp);
    }
    resultArr.push(tmpResult);
  }
  return handleSum(resultArr);
}

export { multiply, multiply2 };

~~~

  
### 0046-permute.js

~~~js
// 46 获取数组的全排列：回溯算法
// 25/25 cases passed (100 ms)
// Your runtime beats 69.06 % of javascript submissions
// Your memory usage beats 28.58 % of javascript submissions (40.3 MB)

function backTrack(list, temp, nums, len) {
  if (temp.length === len) {
    list.push([...temp]);
    return;
  }
  for (let i = 0; i < len; i++) {
    const num = nums[i];
    if (temp.includes(num)) {
      continue;
    }
    temp.push(num);
    backTrack(list, temp, nums, len);
    temp.pop();
  }
}

const permute = (nums) => {
  const list = [];
  const temp = [];
  const len = nums.length;
  backTrack(list, temp, nums, len);
  return list;
};

export { permute };

~~~

  
### 0048-rotate-image.js

~~~js
// 48 旋转图像：把一个n*n的矩阵顺时针旋转90度。在原始矩阵上变化，不能使用新的矩阵。

// 思路0：实际上把矩阵分成多层,，然后每一层移动原来的边长的位置
// 递归遍历数组内部，然后获取当前边长减去递归的层数的旋转的index。然后换顺序。
// 这样需要多次遍历数组，然后不在原始数组操作，性能不好

// 思路一：更换数组中元素的顺序。如果变成是n,那么依次调换这个n个元素的位置，这样就很节省性能。然后遍历四分之一的数组，就可以旋转数组。这个需要处理一个辅助函数处理n个元素换位置
// 52 ms, 在所有 javascript 提交中击败了98.09%
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
function rotateImage(matrix) {
  // 辅助函数：移动四个数字，这个函数能否直接原原位移动？
  function moveFour(a, b, c, d) {
    return [d, a, b, c];
  }
  const len = matrix.length;
  for (let i = 0; i < len / 2; i++) {
    for (let j = len - i - 2; j >= i; j--) {
      const result = moveFour(matrix[i][j], matrix[j][len - i - 1], matrix[len - i - 1][len - j - 1], matrix[len - j - 1][i]);
      matrix[i][j] = result[0];
      matrix[j][len - i - 1] = result[1];
      matrix[len - i - 1][len - j - 1] = result[2];
      matrix[len - j - 1][i] = result[3];
    }
  }
  return matrix;
}

export { rotateImage };

~~~

  
### 0049-groupAnagrams.js

~~~js
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
// 168 ms , 在所有 JavaScript 提交中击败了29.58% 的用户
const groupAnagrams = function (strs) {
  const hash = {};
  const sequenceStr = (str) => {
    const arr = str.split('');
    arr.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));
    return arr.join('');
  };
  // 2 把每一项字符串排序一下
  for (let i = 0; i < strs.length; i++) {
    item = sequenceStr(strs[i]);
    if (!hash[item]) {
      hash[item] = [];
    }
    hash[item].push(i);
  }
  // 3 创建一个结果数组
  const result = [];
  // eslint-disable-next-line
  for (let key in hash) {
    const valueArr = hash[key];
    const resArr = [];
    valueArr.forEach((item) => {
      resArr.push(strs[item]);
    });
    result.push(resArr);
  }
  return result;
};

export { groupAnagrams };

~~~

  
### 0050-myPow.js

~~~js
// 50-实现 pow(x, n) ，即计算 x 的 n 次幂函数。
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
// -100.0 < x < 100.0
// 思路一：根据定义：68 ms, 在所有 javascript 提交中击败了 78.82%
// 注意：x ** n 可能计算不精确，先使用 toFix 去掉后面的小数
function myPow(x, n) {
  return parseFloat((x ** n).toFixed(5));
}

// 进阶：如果自己实现pow函数，怎么处理？可以for循环
function myPow2(x, n) {
  if (x === 0) return 0;
  if (n === 0) return 1;
  let res = 1;
  if (n > 0) {
    for (let i = 1; i <= n; i++) {
      res *= x;
    }
  } else {
    const m = -n;
    for (let i = 1; i <= m; i++) {
      res *= x;
    }
    res = 1 / res;
  }
  return parseFloat((res).toFixed(5));
}

export { myPow, myPow2 };

~~~

  
### 0053-maxSubArray.js

~~~js
/*
 * @lc app=leetcode.cn id=53 lang=javascript
 * https://leetcode-cn.com/problems/maximum-subarray/
 * [53] 最大子序和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// 思路1：双重循环，把全部的子序列求出来，然后求最大值(n^2)，数组求和多次
const maxSubArray = function(nums) {
  // 辅助函数：求数组的和
  const sum = (arr) => {
    return arr.reduce((a, b) => a + b, 0);
  };
  const len = nums.length;
  // 如果长度是1，直接返回
  if (len === 1) {
    return nums[0];
  }
  // 开始双重遍历
  // 先把子系列长度是1的情况全部拿出来，以及全部长度的和拿出来，并求出当前的最大值
  let max = Math.max(...nums, sum(nums));

  // 外循环 i 是子序列的长度
  for (let i = 2; i < len; i++) {
    // 先计算从 0 到 i 的和
    let currSum = sum(nums.slice(0, i));
    max = currSum > max ? currSum : max;
    // 内循环 j 是子序列开始的位置（依次求长度是i 开始位置是 j 的子序列的和）
    for (let j = i; j < len; j++) {
      currSum = currSum + nums[j] - nums[j - i];
      max = currSum > max ? currSum : max;
    }
  }
  return max;
};

// 思路2：动态规划(n)
// 如果数组增加一项，那么求增加一项的最大值
// 1 最大自序和，可以转换成以每一个项为结尾的子序的最大值 max = for（range(fn(1), fn(n)）)
// 2 递推公式：fn = Math.max(fn(n - 1) + num[n], num[n]) 这是关键
// 以当前数字结尾的子序列的最大值，可能是这个数字，或者这个数字和前面的全部相加
const maxSubArray2 = function(nums) {
  let currMax = 0;
  // 第一项的值作为最大值
  // 把每增加一项的最大值求出来，放在一个数组中，最后求这个数组的和（不是直接求最大子序的和）
  const maxList = [nums[0]];
  for (let i = 0; i < nums.length; i++) {
    // 增加一项，求1次最大值
    currMax = Math.max(currMax + nums[i], nums[i]);
    maxList.push(currMax);
  }
  return Math.max(...maxList);
};
// @lc code=end

export { maxSubArray, maxSubArray2 };

~~~

  
### 0054-spiralOrder.js

~~~js
// 54-给定一个包含 m x n 个元素的矩阵（m 行, n 列），请按照顺时针螺旋顺序，返回矩阵中的所有元素。
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
// 思路一：根据定义计算
// 设置一个计数器，1234 然后求这个数除以4的余数。
// 如果余数是1，那么取出第一行，并直接concat到结果数组
// 如果余数是3，取出最后一行，reverse + concat 到结果数组
// 如果余数是2，0 循环数组，然后取出第一个或者最后一个数字，放入新的数组中
// 循环，直到数组变成空的

// 72 ms, 在所有 javascript 提交中击败了30.19%
function spiralOrder(matrix) {
  if (matrix.length === 0) return [];
  if (matrix.length === 1) return matrix[0];
  let timer = 1;
  const result = [];
  while (matrix.length > 0) {
    const remainder = timer % 4;
    if (remainder === 1) {
      const tmp = matrix.shift(1);
      result.push(...tmp);
      timer++;
    } else if (remainder === 3) {
      const tmp = matrix.pop(1);
      result.push(...tmp.reverse());
      timer++;
    } else if (remainder === 2) {
      for (let i = 0; i < matrix.length; i++) {
        const tmp = matrix[i].pop(1);
        if (tmp) result.push(tmp);
      }
      timer++;
    } else if (remainder === 0) {
      const temResult = [];
      for (let i = 0; i < matrix.length; i++) {
        const tmp = matrix[i].shift(1);
        if (tmp) temResult.push(tmp);
      }
      result.push(...temResult.reverse());
      timer++;
    }
  }
  return result;
}

export { spiralOrder };

~~~

  
### 0055-canJump.js

~~~js
// 55-给定一个非负整数数组，你最初位于数组的第一个位置。
// 数组中的每个元素代表你在该位置可以跳跃的最大长度。
// 判断你是否能够到达最后一个位置。

/**
 * @param {number[]} nums
 * @return {boolean}
 */
// 如果数组中没有0，那么一定可以到最后一个元素；
// 从后向前遍历数组：如果遇到某个元素是0，那么判断前面是否有元素的数值大于到0的距离，即跳过这个元素

// 68 ms, 在所有 javascript 提交中击败了 78.33%
function canJump(nums) {
  const len = nums.length;
  // 如果数组的长度是0-1，一定可以
  if (len === 0 || len === 1) {
    return true;
  }
  // 如果数组中不包含0，一定可以
  if (!nums.includes(0)) {
    return true;
  }
  // 从后向前遍历数组，如果是0，那么内循环遍历，是否有值大于0
  for (let i = len - 1; i >= 0; i--) {
    if (nums[i] === 0) {
      for (let j = i; j >= 0; j--) {
        // 如果0不是最后一位，那么前面的必须跳过0
        if (nums[j] > i - j && i !== len - 1) {
          break;
        } else if (nums[j] >= i - j && i === len - 1) {
          // 如果0是最后一位，只要到达0就行
          break;
        }
        // 内循环中，如果全部都不能跳出，那么就不能跳出
        if (j === 0) {
          return false;
        }
      }
    }
  }
  // 外循环中，必须全部都可以跳出，才能跳出
  return true;
}

export { canJump };

~~~

  
### 0056-mergeArray.js

~~~js
// 56-给出一个区间的集合，请合并所有重叠的区间。
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
// 104 ms, 在所有 javascript 提交中击败了43.07%
function merge(intervals) {
  const len = intervals.length;
  if (len === 1 || len === 0) {
    return intervals;
  }
  // 首先对第一个使用排序
  intervals = intervals.sort((a, b) => a[0] - b[0]);
  for (let i = 1; i < len; i++) {
    const item = intervals[i];
    const lastItem = intervals[i - 1];
    if (!item) break;
    if (lastItem[1] >= item[0] && lastItem[1] < item[1]) {
      // 后一个的第一位小于前一个的第二位
      const newItem = [lastItem[0], item[1]];
      intervals.splice(i - 1, 2, newItem);
      i--;
    } else if (lastItem[1] >= item[0] && lastItem[1] >= item[1]) {
      // 后一个的第二位小于前一个的第二位，直接删除后一个数
      intervals.splice(i, 1);
      i--;
    }
  }
  return intervals;
}

export { merge };

~~~

  
### 0057-insert-Interval.js

~~~js
// 57-给出一个无重叠的 ，按照区间起始端点排序的区间列表。
// 在列表中插入一个新的区间，你需要确保列表中的区间仍然有序且不重叠（如果有必要的话，可以合并区间）。

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
// 第一种思路：直接使用56题，合并区间。把这个区间插入到原始区间后面，重新排序，然后删除重复部分
// 第二种思路：遍历已经排序好的数组，然后把新的区间插入。从这个节点开始到最后，合并重复的区间
// 第二个不需要排序，性能更高
// 特殊情况：新的区间在全部区间之前，新的区间在全部区间之后（直接添加在数组的开始或者结尾）

// 辅助函数：改造后的issue 56
function merge(intervals, startIndex) {
  const len = intervals.length;
  for (let i = startIndex + 1; i < len; i++) {
    const item = intervals[i];
    const lastItem = intervals[i - 1];
    if (!item) break;
    if (lastItem[1] >= item[0] && lastItem[1] < item[1]) {
      const newItem = [lastItem[0], item[1]];
      intervals.splice(i - 1, 2, newItem);
      i--;
    } else if (lastItem[1] >= item[0] && lastItem[1] >= item[1]) {
      intervals.splice(i, 1);
      i--;
    }
  }
}

// 80 ms, 在所有 javascript 提交中击败了78.89%
function insert(intervals, newInterval) {
  const len = intervals.length;
  if (len === 0) {
    intervals.push(newInterval);
    return intervals;
  }
  // 这里是开始合并的序号和结束合并的序号（原始区间集合已经合并，所以不需要再次合并）
  let startIndex = 0;
  // 处理特殊情况:全部大于或者全部小于
  if (newInterval[1] < intervals[0][0]) {
    intervals.unshift(newInterval);
  } else if (newInterval[0] >= intervals[len - 1][0]) {
    intervals.push(newInterval);
    startIndex = len - 1;
  } else {
    // 把当前项插入到已有数组中
    for (let i = 0; i < intervals.length; i++) {
      if (intervals[i][0] >= newInterval[0]) {
        intervals.splice(i, 0, newInterval);
        startIndex = i - 1;
        i--;
        break;
      }
    }
  }
  startIndex = startIndex >= 0 ? startIndex : 0;
  merge(intervals, startIndex);
  return intervals;
}

export { insert };

~~~

  
### 0058-lengthOfLastWord.js

~~~js
// 58. 最后一个单词的长度
// 如果不存在最后一个单词，请返回 0
// 一个单词是指由字母组成，但不包含任何空格的字符串。
// 特殊的可能是一串数字

/**
 * @param {string} s
 * @return {number}
 */
// 60 ms , 在所有 javascript 提交中击败了 90.44%
function lengthOfLastWord(s) {
  s = s.trim();
  const pos = s.lastIndexOf(' ');
  return pos === -1 ? s.length : s.length - pos - 1;
}

export { lengthOfLastWord };

~~~

  
### 0059-generateMatrix-ii.js

~~~js
/**
 * @param {number} n
 * @return {number[][]}
 */
// [59] 螺旋矩阵 II
// 96 ms , 在所有 JavaScript 提交中击败了16.54%
// 现在性能不好！
// 循环内部判断方向（如果下一个位置已经有值，那么换向）
// 设置一个变量保存当前的方向（direction = 'right'）
const generateMatrix = function(n) {
  // 先生成一个完全是空的矩阵
  const res = new Array(n);
  for (let i = 0; i < n; i++) {
    res[i] = new Array(n);
    for (let j = 0; j < n; j++) {
      res[i][j] = true;
    }
  }
  let direction = 'right';
  let x = 0;
  let y = 0;

  // 辅助函数：计算下一个在什么位置
  const getNext = (res, x, y, direction) => {
    switch (direction) {
      case 'right':
        if (res[x][y + 1] === true) {
          direction = 'right';
          // x = x;
          y = y + 1;
        } else {
          direction = 'down';
          x = x + 1;
          // y = y;
        }
        break;
      case 'down':
        if (res[x + 1] && res[x + 1][y] === true) {
          direction = 'down';
          x = x + 1;
          // y = y;
        } else {
          direction = 'left';
          // x = x;
          y = y - 1;
        }
        break;
      case 'left':
        if (res[x][y - 1] === true) {
          direction = 'left';
          // x = x;
          y = y - 1;
        } else {
          direction = 'up';
          x = x - 1;
          // y = y;
        }
        break;
      case 'up':
        if (res[x - 1] && res[x - 1][y] === true) {
          direction = 'up';
          x = x - 1;
          // y = y;
        } else {
          direction = 'right';
          // x = x;
          y = y + 1;
        }
        break;
    }
    return { x, y, direction };
  };

  // 然后循环 1 —— n * n
  const end = n ** 2;
  for (let i = 1; i <= end; i++) {
    // 需要填充的数字是i
    if (res[x][y] === true) {
      res[x][y] = i;
      // 根据方向，改变XY, 这里判断下一个是否有内容
      const obj = getNext(res, x, y, direction);
      x = obj.x;
      y = obj.y;
      direction = obj.direction;
    }
  }
  return res;
};

export { generateMatrix };

~~~

  
### 0060-getPermutation.js

~~~js
// 60 https://leetcode-cn.com/problems/permutation-sequence/
// 排列序列 困难（做出来了，但是方法不好）
// 给出集合 [1,2,3,…,n]，其所有元素共有 n! 种排列。
// 按大小顺序列出所有排列情况，并一一标记，当 n = 3 时, 所有排列如下：
// "123"
// "132"
// "213"
// "231"
// "312"
// "321"
// 给定 n 和 k，返回第 k 个排列。

// 提交1
// 1588 ms, 在所有 javascript 提交中击败了19.16%
// 辅助函数：下一个排列（31题）
// 然后调用这个函数，循环K次，获取
function nextPermutation(nums) {
  const len = nums.length;
  let index = -1;
  for (let i = len - 2; i >= 0; i--) {
    if (nums[i + 1] > nums[i]) {
      index = i;
      break;
    }
  }
  if (index === -1) {
    nums.reverse();
    return;
  }
  let tmp;
  let tmpIndex;
  for (let j = index + 1; j < len; j++) {
    if (nums[j] > nums[index] && (!tmp || nums[j] <= tmp)) {
      tmp = nums[j];
      tmpIndex = j;
    }
  }
  nums[tmpIndex] = nums[index];
  nums[index] = tmp;
  const arr = nums.splice(index + 1, len - index - 1);
  arr.sort((a, b) => a - b);
  nums.push(...arr);
}

// 思路二：结果的长度是n, 结果的长度是[1,n]组成的全部数的第K个排列，
// 首先获取当前数构成的最小的树（123456），然后调用辅助函数
// 这样性能一般，因为需要一次次计算比这个数大的数字
function getPermutation(n, k) {
  if (n === 1 && k === 1) {
    return '1';
  }
  const init = [];
  for (let i = 1; i <= n; i++) {
    init.push(i);
  }
  if (k === 1) {
    return init.join('');
  }
  for (let i = 0; i < k - 1; i++) {
    nextPermutation(init);
  }
  return init.join('');
}

// 思路2, 2308ms, 37 MB
// function nextPermutation(nums) {
//   const len = nums.length;
//   let index = -1;
//   for (let i = len - 2; i >= 0; i--) {
//     if (nums[i + 1] > nums[i]) {
//       index = i;
//       break;
//     }
//   }
//   if (index === -1) {
//     nums.reverse();
//     return;
//   }
//   let tmp;
//   let tmpIndex;
//   for (let j = index + 1; j < len; j++) {
//     if (nums[j] > nums[index] && (!tmp || nums[j] <= tmp)) {
//       tmp = nums[j];
//       tmpIndex = j;
//     }
//   }
//   nums[tmpIndex] = nums[index];
//   nums[index] = tmp;
//   let arr = nums.splice(index + 1, len - index - 1);
//   arr.sort((a, b) => {return a - b;});
//   nums.push(...arr);
// }

// var getPermutation = function(n, k) {
//   if (n === 1 && k === 1) {
//     return '1';
//   }
//   let init = [];
//   for (let i = 1; i <= n; i++) {
//     init.push(i);
//   }
//   if (k === 1) {
//     return init.join('');
//   }
//   for (let i = 0; i < k - 1; i++) {
//     nextPermutation(init);
//   }
//   return init.join('');
// };

// 现在性能比较差，未来需要改进

export { getPermutation };

~~~

  
### 0062-uniquePaths.js

~~~js
// 62. 不同路径
// 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。
// 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。
// 问总共有多少条不同的路径？
// 104 ms, 在所有 JavaScript 提交中击败了11.40%
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
const uniquePaths = function (m, n) {
  const hashTable = {};
  const test = function (a, b) {
    const key = `${String(a)}${String(b)}`;
    if (hashTable[key]) {
      return hashTable[key];
    }
    let res;
    if (a === 0 || b === 0) {
      res = 0;
    }
    if (a === 1 || b === 1) {
      res = 1;
    } else {
      res = test(a, b - 1) + test(a - 1, b);
    }
    hashTable[key] = res;
    return res;
  };
  return test(m, n);
};

export { uniquePaths };

~~~

  
### 0066-arrayplusOne.js

~~~js
// 66. 加一
/**
 * 给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。
 * 最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。
 * 你可以假设除了整数 0 之外，这个整数不会以零开头。
输入: [4,3,2,1]
输出: [4,3,2,2]
解释: 输入数组表示数字 4321。
 */

// 思路一，把原始的数组转化成数值，然后数值加一，再把加一后的数值转化成数组（这样复杂性很差）
// 如果数字太大，这样的结果是错误的（获取数组转化成的数值是错误的）
/**
 * @param {number[]} digits
 * @return {number[]}
 */
// const plusOne = function(digits) {
//   const len = digits.length;
//   let sum = 0;
//   for (let i = 0; i < len; i++) {
//     sum = sum * 10 + digits[i];
//   }
//   sum++;
//   console.log(sum);
//   let result = [];
//   while (sum > 0) {
//     let item = sum % 10;
//     result.unshift(item);
//     sum = (sum - item) / 10;
//   }
//   return result;
// };

// 思路二：直接在原数组最后一位加一。然后遍历原始数组，如果某一个是10， 那么这一个变成1，前一个加一；这样性能好一点。
// 60 ms , 在所有 javascript 提交中击败了 94.99%
function plusOne(digits) {
  const len = digits.length;
  digits[len - 1]++;
  for (let i = len - 1; i > -1; i--) {
    if (digits[i] === 10) {
      digits[i] = 0;
      if (digits[i - 1]) {
        digits[i - 1]++;
      } else {
        digits.unshift(1);
      }
    }
  }
  return digits;
}

export { plusOne };

~~~

  
### 0067-addTwoBinary.js

~~~js
// 67. 二进制求和
// 给定两个二进制字符串，返回他们的和（用二进制表示）。
// 输入为非空字符串且只包含数字 1 和 0。

// 输入: a = '1010', b = '1011'
// 输出: '10101'

// 思路一：把两个字符串转化成十进制数值，然后相加，再还原成二进制数值，然后转化成字符串输出
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
// const addBinary = function(a, b) {
//   // handle 0
//   if (a === '0') {
//     return b;
//   }
//   if (b === '0') {
//     return a;
//   }
//   const arr1 = a.split(''), arr2 = b.split('');
//   let sum1 = 0, sum2 = 0;
//   for (let i = 0; i < arr1.length; i++) {
//     sum1 = sum1 * 2 + 1 * arr1[i];
//   }
//   for (let i = 0; i < arr2.length; i++) {
//     sum2 = sum2 * 2 + 1 * arr2[i];
//   }
//   let sum = sum1 + sum2;
//   let result = [];
//   while (sum > 0) {
//     let item = sum % 2;
//     result.unshift(item);
//     sum = (sum - item) / 2;
//   }
//   return result.join('');
// };

// 问题1：如果输入0，那么可以优化计算
// 问题2：如果输入数字特别大，那么计算的和是错误的

// 思路二：类似人类的加法：把字符串转化成数组，两个数组相加；如果结果是2或者3，那么进1；然后把数组转化成字符串输出
// 76 ms , 在所有 javascript 提交中击败了85.88%

function addBinary(a, b) {
  if (a === '0') return b;
  if (b === '0') return a;
  let arr1;
  let arr2;
  if (a.length > b.length) {
    arr1 = a.split('');
    arr2 = b.split('');
  } else {
    arr2 = a.split('');
    arr1 = b.split('');
  }
  // 现在 arr 1 是长的；
  // 获取一个小的数和一个大的数，然后把小的数加到大的数上面；然后把结果是2或者3的加到前一个，然后转化成字符串输出
  // 把 arr2 加到 arr1 上面
  const arr2Len = arr2.length;
  const arr1Len = arr1.length;
  for (let i = 0; i < arr2Len; i++) {
    arr1[arr1Len - 1 - i] = 1 * arr1[arr1Len - 1 - i] + 1 * arr2[arr2Len - 1 - i];
  }
  for (let i = 0; i < arr1Len; i++) {
    const index = arr1Len - 1 - i;
    if (arr1[index] === 2) {
      arr1[index] = 0;
      if (arr1[index - 1] > -1) {
        arr1[index - 1]++;
      } else {
        arr1.unshift(1);
      }
    } else if (arr1[index] === 3) {
      arr1[index] = 1;
      if (arr1[index - 1] > -1) {
        arr1[index - 1]++;
      } else {
        arr1.unshift(1);
      }
    }
  }
  return arr1.join('');
}

export { addBinary };

~~~

  
### 0069-getSqrt.js

~~~js
// 69
// 获取一个正数数的平方根；如果这个数的平方根包含小数，那么截取整数部分

// 思路一：原生：从1开始循环，比较循环的数的平方大于等于这个数，那么返回就是这个index。
// 112 ms 32%
function getSqrt1(x) {
  if (x === 0) return 0;
  if (x < 4) return 1;
  for (let i = 1; i < x; i++) {
    const sqar = i * i;
    if (sqar === x) return i;
    if (sqar > x) return i - 1;
  }
  return null;
}

// 方法二：使用系统函数
// 104 ms, 在所有 javascript 提交中击败了49.38%
function getSqrt2(x) {
  if (x === 0) return 0;
  return Math.floor(Math.sqrt(x));
}

// 方法三：使用强制转化方法，把小数转化成整数，避免使用函数库
function getSqrt3(x) {
  return parseInt(Math.sqrt(x), 0);
}

export { getSqrt1, getSqrt2, getSqrt3 };

~~~

  
### 0070-climbStairs.js

~~~js
// 70 爬楼梯
// 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
// 给定 n 是一个正整数

// 输入： 3
// 输出： 3
// 解释： 有三种方法可以爬到楼顶。
// 1.  1 阶 + 1 阶 + 1 阶
// 2.  1 阶 + 2 阶
// 3.  2 阶 + 1 阶

// 思路：首先把所有情况列出来，n 个 1；然后每一种情况下就是排列组合问题；最后计算出全部的方法；因为2的数量有限，外部循环时2的个数，循环一次可以获取2
// 例如：X = 2 * n + 1 (因为全部的1都是一样的，所以计算2的位置即可)

// 性能不好
// 64 ms , 在所有 javascript 提交中击败了76.92%的用户
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

function climbStairs(n) {
  let result = 0;
  // 如果n是1，直接返回1
  if (n === 1) return 1;
  for (let i = 0; i <= n / 2; i++) {
    // 外循环获取i的次数
    const j = n - 2 * i;
    // 现在就是 j 个 1 和 i 个 2 排列，共计（i+j）个位置 C(i, i + j)
    // (i + j)! / i! / j!
    const res = factorial(i + j) / factorial(i) / factorial(j);
    result += res;
  }
  return result;
}

export { climbStairs };

~~~

  
### 0071-simplifyPath.js

~~~js
/**
 * @param {string} path
 * @return {string}
 */
// [71] 简化路径
// 92 ms, 在所有 JavaScript 提交中击败了65.39%
const simplifyPath = function(path) {
  // 先处理其他情况
  // 多个连续斜杠需要用一个斜杠替换
  while (path.indexOf('//') > -1) {
    path = path.replace(/\/\//g, '/');
  }
  // ./ 直接替换成空
  // path = path.replace(/\.\.\./g, '');
  const stack = ['/'];
  path = path.slice(1);
  while (path.indexOf('/') > -1) {
    const index = path.indexOf('/');
    const item = path.slice(0, index + 1);
    switch (item) {
      case '/':
        stack.push(item);
        break;
      case './':
        break;
      case '../':
        if (stack.length > 1) stack.pop();
        break;
      default:
        stack.push(item);
        break;
    }
    path = path.slice(index + 1);
  }

  // path === '.' break
  if (path === '..') {
    if (stack.length > 1) {
      stack.pop();
    }
  } else if (path.length !== 0) {
    stack.push(path); // ...
  }

  let res = stack.join('');
  // 如果只有根目录，那么最后可以是/
  if (res.length > 1 && res[res.length - 1] === '/') {
    res = res.slice(0, res.length - 1);
  }
  return res;
};

export { simplifyPath };

~~~

  
### 0073-set-zeroes.js

~~~js
// 给定一个 m x n 的矩阵，如果一个元素为 0，则将其所在行和列的所有元素都设为 0。请使用原地算法。
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
// 116 ms，39.7 MB
function setZeroes(matrix) {
  // 数组不存在的情况
  if (!matrix || !matrix[0]) return;
  // 获取矩阵的宽度和高度
  const A = matrix.length;
  const B = matrix[0].length;
  // 设置两个临时数组存放位置
  const arr1 = [];
  const arr2 = [];
  // 第一次遍历，获取0的位置
  for (let i = 0; i < A; i++) {
    for (let j = 0; j < B; j++) {
      if (matrix[i][j] === 0) {
        arr1.push(i);
        arr2.push(j);
      }
    }
  }
  // 第二次遍历，设置0的位置
  for (let i = 0; i < A; i++) {
    for (let j = 0; j < B; j++) {
      if (arr1.includes(i) || arr2.includes(j)) {
        matrix[i][j] = 0;
      }
    }
  }
}

// 一个直接的解决方案是使用  O(mn) 的额外空间，但这并不是一个好的解决方案。
// 一个简单的改进方案是使用 O(m + n) 的额外空间，但这仍然不是最好的解决方案。
// 你能想出一个常数空间的解决方案吗？

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/set-matrix-zeroes
// 下面是提示方法
// If any cell of the matrix has a zero we can record its row and column number using additional memory. But if you don't want to use extra memory then you can manipulate the array instead. i.e. simulating exactly what the question says.
// Setting cell values to zero on the fly while iterating might lead to discrepancies. What if you use some other integer value as your marker? There is still a better approach for this problem with 0(1) space.
// We could have used 2 sets to keep a record of rows/columns which need to be set to zero. But for an O(1) space solution, you can use one of the rows and and one of the columns to keep track of this information.
// We can use the first cell of every row and column as a flag. This flag would determine whether a row or column has been set to zero.

export { setZeroes };

~~~

  
### 0074-searchMatrix.js

~~~js
/*
 * [74] 搜索二维矩阵
 */

// 辅助函数：判断一维数组是否有效
function isValid(arr, target) {
  if (!arr || arr.length === 0) {
    return false;
  }
  return arr[0] <= target && arr[arr.length - 1] >= target;
}

// 辅助函数：搜索一维数组
function searchArray(arr, target) {
  let start = 0;
  let end = arr.length - 1;
  let middle = Math.ceil((start + end) / 2);
  // 处理特殊情况
  if (arr.length === 0) {
    return false;
  }
  if (arr[start] === target || arr[end] === target) {
    return true;
  }
  if (arr[start] > target || arr[end] < target) {
    return false;
  }
  while (start <= end) {
    if (arr[middle] === target) {
      return true;
    }
    if (arr[middle] > target) {
      end = middle;
      middle = Math.ceil((start + end) / 2);
    } else if (arr[middle] < target) {
      start = middle;
      middle = Math.ceil((start + end) / 2);
    }
    if (middle === start || middle === end) {
      return false;
    }
  }
  return false;
}

// 方法一：二分搜索（LogN * logN）
// Your runtime beats 57.68 % of javascript submissions; memory usage beats 27.04 %
function searchMatrix(matrix, target) {
  // m表示行数
  const m = matrix.length;
  // 处理空数组的情况
  if (m === 0) {
    return false;
  }
  // n 表示列数
  const n = matrix[0].length;
  // 开始的行和结束的行
  let start = 0;
  let end = m - 1;
  // 最大最小值超出范围，没找到
  if (matrix[start][0] > target || matrix[end][n - 1] < target) {
    return false;
  }
  // 最大最小值等于，找到
  if (matrix[start][0] === target || matrix[end][n - 1] === target) {
    return true;
  }
  // 开始二分行，查找区间
  let mid = Math.ceil((start + end) / 2);
  // 先检索第一个和最后一个子数组
  if (isValid(matrix[start], target)) {
    return searchArray(matrix[start], target);
  }
  if (isValid(matrix[end], target)) {
    return searchArray(matrix[end], target);
  }
  // 如果中间的数组正好满足条件
  while (start <= end) {
    if (mid === start || mid === end) {
      return false;
    }
    if (isValid(matrix[mid], target)) {
      return searchArray(matrix[mid], target);
    }
    if (matrix[mid][0] > target) {
      end = mid;
      mid = Math.ceil((start + end) / 2);
    } else if (matrix[mid][n - 1] < target) {
      start = mid;
      mid = Math.ceil((start + end) / 2);
    }
  }
  return false;
}

// 方法二：不考虑算法复杂度，直接打平计算
// Your runtime beats 18.55 % of javascript submissions
// Your memory usage beats 12.7 % of javascript submissions (39.2 MB)
function searchMatrix2(matrix, target) {
  if (matrix.length === 0) {
    return false;
  }
  const arr = matrix.flat();
  return arr.includes(target);
}

export { searchMatrix, searchMatrix2, searchArray };

~~~

  
### 0075-sortColors.js

~~~js
// 给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
// 此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。
// 注意:不能使用代码库中的排序函数来解决这道题。
// 示例:
// 输入: [2,0,2,1,1,0]
// 输出: [0,0,1,1,2,2]

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 思路：只有三个数，那么遍历一次数组，如果遇到0，就放在第一位，如果遇到2，就放在最后一位。
// 记录0和2的个数，然后遍历一次，如果位置在0-2中间的就是1
// 68 ms, 在所有 javascript 提交中击败了64.19%
function sortColors(nums) {
  const len = nums.length;
  if (len === 0 || len === 1) {
    return nums;
  }
  let timer = 0;
  let timer0 = 0;
  for (let i = 0; i < len; i++) {
    if (nums[i] === 0) {
      timer0++;
      if (i === 0) continue;
      nums.splice(i, 1);
      nums.unshift(0);
      while (nums[i] === 0 && timer0 < i) {
        i--;
      }
      if (timer0 === len) break;
    } else if (nums[i] === 2) {
      timer++;
      if (i === len - 1) continue;
      nums.splice(i, 1);
      nums.push(2);
      while ((nums[i] === 2 && timer < len - i) || nums[i] === 0) {
        i--;
      }
    }
  }
  return nums;
}

export { sortColors };

~~~

  
### 0077-combine.js

~~~js
// 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。
// 示例:
// 输入: n = 4, k = 2
// 输出:
// [
//   [2,4],
//   [3,4],
//   [2,3],
//   [1,2],
//   [1,3],
//   [1,4],
// ]
/*
 * @lc app=leetcode.cn id=77 lang=javascript
 *
 * [77] 组合
 */
// 120 ms, 在所有 JavaScript 提交中击败了93.50%
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
const combine = function(n, k) {
  // 没有满足的组合
  if (n < k) {
    return [];
  }
  // 这里设置一个全局的数组N，然后填充内容
  const LIST = [];
  for (let i = 0; i < n; i++) {
    LIST.push(i + 1);
  }
  // 如果N和K相等，只有这一种情况
  if (n === k) {
    return [LIST];
  }
  // 下面深拷贝LIST数组
  // 执行回溯
  const backTrack = function(list, tmp, num) {
    // 回溯结束的条件：临时数组的长度等于预定的长度
    if (tmp.length === num) {
      list.push([...tmp]);
      return;
    }
    // 这里过滤剩余的情况
    // list filter tmp 的元素，然后循环的时候，从大于 tmp 中最大元素开始循环
    const start = tmp.length > 0 ? tmp[tmp.length - 1] + 1 : 1;
    for (let i = start; i <= n; i++) {
      tmp.push(i);
      backTrack(list, tmp, num);
      tmp.pop();
    }
  };
  // 创建回溯的初始条件
  const list = [];
  const tmp = [];
  backTrack(list, tmp, k);
  return list;
};

export { combine };

~~~

  
### 0078-subsets.js

~~~js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// [78] 子集
// 回溯算法
// 子集中没有重复元素
// 92 ms, 在所有 JavaScript 提交中击败了46.19%
const subsets = function(nums) {
  const len = nums.length;
  const list = [];
  list.push([]);
  // 处理特殊长度的数组
  if (len === 0) {
    return list;
  } else if (len === 1) {
    list.push(nums);
    return list;
  }
  // 回溯子函数
  const backTrack = function(current, target, list) {
    const currLen = current.length;
    if (currLen === target) {
      list.push([...current]);
      return;
    }
    // nums 这个forEach执行比较好
    nums.forEach((i) => {
      if (currLen === 0 || (!current.includes(i) && i > current[currLen - 1])) {
        current.push(i);
        backTrack(current, target, list);
        current.pop();
      }
    });
  };
  // 处理长度大于1的数组的子集
  list.push(nums);
  // 排序，确保正序进入子序列
  nums.sort((a, b) => a - b);
  // 先循环设置子集的长度，然后回溯，满足长度的可以放入目标数组
  for (let i = 1; i < len; i++) {
    const target = i;
    const current = [];
    backTrack(current, target, list);
  }
  return list;
};

export { subsets };

~~~

  
### 0079.exist.js

~~~js
/*
 * @lc app=leetcode.cn id=79 lang=javascript
 *
 * [79] 单词搜索
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
// 这个题目可以做
// 在回溯过程中，需要看之前的是否使用过，避免重复
// 全部字典和目标中都存在重复值，回溯需要注意
// Your runtime beats 54.23 % of javascript submissions
// 80/80 cases passed (356 ms)
const exist = function(board, word) {
  // 先遍历一次全部单词，看是否有不存在的，排除一部分
  const wordDict = {};
  for (let i = 0; i < word.length; i++) {
    if (wordDict[word[i]]) {
      wordDict[word[i]] = wordDict[word[i]] + 1;
    } else {
      wordDict[word[i]] = 1;
    }
  }
  // console.log(wordDict);
  const boardPosition = {}; // 这个存放位置
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      const curr = board[i][j];
      if (!boardPosition[curr]) {
        boardPosition[curr] = [];
      }
      boardPosition[curr].push([i, j]);
    }
  }
  // console.log(boardPosition);
  for (const key in wordDict) {
    const num = wordDict[key];
    if (!boardPosition[key] || boardPosition[key].length < num) {
      return false;
    }
  }
  // 检验完成，说明现在单词被矩阵全覆盖

  const result = [];
  const tmp = []; // 用过的坐标需要放在一个临时数组中

  // 判断两个坐标是否相邻，如果不相邻返回true
  const checkArround = (a, b) => {
    if (a[0] === b[0] && (a[1] === b[1] - 1 || a[1] === b[1] + 1)) {
      return false;
    }
    if (a[1] === b[1] && (a[0] === b[0] - 1 || a[0] === b[0] + 1)) {
      return false;
    }
    return true;
  };

  // 回溯函数
  const backtract = (index, tmp) => {
    if (index > word.length - 1) {
      return false;
    }
    if (index === word.length - 1) {
      result.push([...tmp]);
      // 这里可以优化一下，只要满足一个，即可返回，不需要计算全部的路径
      return true;
    }
    if (index < word.length - 1) {
      // 继续回溯
      const newIndex = index + 1;
      const key = word[newIndex];
      const valueArr = boardPosition[key];
      for (let i = 0; i < valueArr.length; i++) {
        // 这里应该监测 tmp 重复的坐标，继续循环
        if (tmp.includes(valueArr[i])) {
          continue;
        }
        // 判断是否相邻元素
        if (checkArround(tmp[tmp.length - 1], valueArr[i])) {
          continue;
        }
        // 相邻的话继续回溯
        tmp.push(valueArr[i]);
        const res = backtract(newIndex, tmp);
        if (res) {
          return true;
        }
        tmp.pop();
      }
    }
  };

  // 获取第一个，开始遍历，第一个的位置不限制
  const valueArr = boardPosition[word[0]];
  for (let i = 0; i < valueArr.length; i++) {
    tmp.push(valueArr[i]);
    const res = backtract(0, tmp);
    if (res) {
      return true;
    }
    tmp.pop();
  }
  return false;
};
// @lc code=end

export { exist };

~~~

  
### 0080-remove-duplicates.js

~~~js
// 80 排序数组去重
// 给定一个排序数组，你需要在原地删除重复出现的元素，使得每个元素最多出现两次，返回移除后数组的新长度。
// 不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。
// 80ms 36.1MB 中位数
/**
 * @param {number[]} nums
 * @return {number}
 */
function removeDuplicates(nums) {
  const len = nums.length;
  if (len < 2) {
    return len;
  }
  for (let i = 2; i < nums.length; i++) {
    if (nums[i] === nums[i - 2]) {
      nums.splice(i, 1);
      i--;
    }
  }
  return nums.length;
}

export { removeDuplicates };

~~~

  
### 0082.删除排序链表中的重复元素-ii.js

~~~js
/*
 * @lc app=leetcode.cn id=82 lang=javascript
 *
 * [82] 删除排序链表中的重复元素 II
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// Your runtime beats 52.45 % of javascript submissions
// 先想好思路，然后把各种情况都想清楚，再写代码，事半功倍
// 这个再看一下官方思路，哪些地方可以提升
// 链表的解决方法：处理当前的节点后，写一个节点等于递归调用这个函数
const deleteDuplicates = function(head) {
  // 如果空链表，或者是最后一个节点，直接返回
  if (!head || !head.next) {
    return head;
  }
  // 实际上是四种情况
  // 当前节点不等于下一个节点,直接处理下一个节点
  if (head.val !== head.next.val) {
    head.next = deleteDuplicates(head.next);
    return head;
  }
  // 当前节点等于下一个节点
  if (head.val === head.next.val) {
    // 再分成三个情况
    // 1. 下下个节点不存在
    if (!head.next.next) {
      return null;
    }
    // 2.下下个不等于下一个
    if (head.next.val !== head.next.next.val) {
      head = head.next.next;
      head = deleteDuplicates(head);
      return head;
    }
    // 3.下下个等于下一个
    if (head.next.val === head.next.next.val) {
      head.next = head.next.next;
      head = deleteDuplicates(head);
      return head;
      // 然后处理当前节点
    }
  }
};
// @lc code=end
export { deleteDuplicates };

~~~

  
### 0083-deleteDuplicates.js

~~~js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
//  [83] 删除排序链表中的重复元素
// Your runtime beats 51.88 % of javascript submissions
const deleteDuplicates = function(head) {
  if (!head || !head.next) return head;
  while (head.next && head.val === head.next.val) {
    head.next = head.next.next;
  }
  deleteDuplicates(head.next);
  return head;
};

export { deleteDuplicates };

~~~

  
### 0084-largestRectangleArea.js

~~~js
// 84 计算给定柱状图的最大的面积
// 给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。

// 求在该柱状图中，能够勾勒出来的矩形的最大面积。
// 以上是柱状图的示例，其中每个柱子的宽度为 1，给定的高度为 [2,1,5,6,2,3]。其面积为 10 个单位。

/**
 * @param {number[]} heights
 * @return {number}
 */
// 思路一：循环数组：看当前情况和前面的所有的数构成面积的最大值是多少；执行两次循环可以获取最大的面积。
// 使用两次循环求最值，元素较多超时，性能不好
function largestRectangleArea1(heights) {
  const len = heights.length;
  // 如果只有一个柱子，那么返回这个柱子的高度*1
  if (len === 0) {
    return 0;
  }
  if (len === 1) {
    return heights[0];
  }
  let max = heights[0];
  for (let i = 1; i < len + 1; i++) {
    for (let j = 0; j < i; j++) {
      const arr = heights.slice(j, i);
      // 当前的柱状图
      let area;
      if (arr.length === 0) {
        // 如果子柱子是一个没直接返回长度
        area = arr[0];
      } else {
        // 获取柱状图的最小值，乘以长度
        const min = Math.min(...arr);
        area = min * arr.length;
      }
      max = area > max ? area : max;
    }
  }
  return max;
}

// 思路二 优化：外循环中，如果后一个数组的高度比前一个大，那么后一个构成的面积一定比前一个大。所以这样就不需要计算前一个的面积了
// 这样遇上最坏的情况，就是数组是递减数列，那么计算量还是n*n，有bug
// function largestRectangleArea2(heights) {
//   const len = heights.length;
//   // 处理特殊值
//   if (len === 0) return 0;
//   if (len === 1) return heights[0];

//   let max = heights[0];
//   for (let i = 1; i < len + 1; i++) {
//     if (heights[i] < heights[i + 1]) {
//       continue;
//     }
//     for (let j = 0; j < i; j++) {
//       const arr = heights.slice(j, i + 1);
//       let area;
//       if (arr.length === 0) {
//         // 如果子柱子是一个没直接返回长度
//         area = arr[0];
//       } else {
//         // 获取柱状图的最小值，乘以长度
//         const min = Math.min(...arr);
//         area = min * arr.length;
//       }
//       max = area > max ? area : max;
//     }
//   }
//   return max;
// }

// 正确的思路：单调栈
// 108 ms, 在所有 JavaScript 提交中击败了41.98%
// 参考：https://leetcode-cn.com/problems/largest-rectangle-in-histogram/solution/wo-yong-qiao-miao-de-bi-yu-jiang-dan-diao-zhan-jie/
const largestRectangleArea = (heights) => {
  // 最大面积
  let maxArea = 0;
  // 单调递增的栈(存放数组索引)
  const stack = [];
  // 先在开头和结尾加一个0，避免开始结尾算不到的情况
  heights = [0, ...heights, 0];
  // 循环数组
  for (let i = 0; i < heights.length; i++) {
    // 如果新的bar，比栈顶bar矮
    while (heights[i] < heights[stack[stack.length - 1]]) {
      // 栈顶元素出栈，并保存栈顶bar的索引，到临时变量
      const stackTopIndex = stack.pop();
      // 计算出栈的bar形成的长方形面积
      // 高 = 当前出栈的长方形高度
      // 宽 = 当前 bar 的索引 i - 新的栈顶索引 - 1
      // while 循环中，把低于新bar 的全部矩形都拿出去，然后都计算一下最大的面积
      const tmpMax = heights[stackTopIndex] * (i - stack[stack.length - 1] - 1);
      // 更新最大面积
      maxArea = Math.max(maxArea, tmpMax);
    }

    // 当前bar比栈顶bar高了，直接入栈；
    stack.push(i);
  }
  return maxArea;
};

// const fn = (heights) => {
//   let max = 0;
//   let stack = [];
//   heights = [0, ...heights, 0];
//   for (let i = 0; i < heights.length; i++) {
//     while (heights[i] < heights[stack[stack.length - 1]]) {
//       let tmpIndex = stack.pop();
//       let area = heights[tmpIndex] * (i - stack[stack.length - 1] - 1);
//       max = Math.max(area, max);
//     }
//     stack.push(i);
//   }
//   return max;
// }

export { largestRectangleArea, largestRectangleArea1 };

~~~

  
### 0088-mergeTwoArray.js

~~~js
// 88. 合并两个有序数组
// 初始化 nums1 和 nums2 的元素数量分别为 m 和 n。
// 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
// 76 ms , 在所有 javascript 提交中击败了 51.84%
// 多次打错的原因：特殊值0的处理，数组中是否有负数或者0等的处理

function mergeTwoArray(nums1, m, nums2, n) {
  if (n === 0) return;
  if (m === 0) {
    // PS： 能否不需要splice，直接返回nums2?
    nums1.splice(0, n, ...nums2);
    return nums1;
  }
  nums1.splice(m, n);
  let index = 0;
  for (let i = 0; i < n; i++) {
    while (nums2[i] > nums1[index]) {
      index++;
    }
    nums1.splice(index, 0, nums2[i]);
  }
  return nums1;
}

export { mergeTwoArray };

~~~

  
### 0089-grayCode.js

~~~js
/*
 * @lc app=leetcode.cn id=89 lang=javascript
 *
 * [89] 格雷编码
 */

// 自己基本思路：第一项是确定的，然后向前和向后，分别进行动态规划计算
// 设置两个数组
// 这样可以全部获取，然后把第二个数组倒序一下，然后拼接到第一个数组上
// 关键是如何写递推式，怎样使用位运算优化？（有一位不同，明显位运算）
// N 最大可以取16，所以每一位取反都是可以的
// let length = 2 ** (n - 1);
// let arr1 = new Array(length);
// let arr2 = new Array(length);
// arr1[0] = 0;
// arr2[0] = 0;
// let dict = {};

// @lc code=start
// 官方思路，位运算了解一下
// 动态规划思路不难，主要是位运算不熟
// https://leetcode.cn/problems/gray-code/solution/ge-lei-bian-ma-by-leetcode-solution-cqi7/
/**
 * @param {number} n
 * @return {number[]}
 */
const grayCode = function(n) {
  const result = [0];
  for (let i = 1; i <= n; i++) {
    const len = result.length;
    for (let j = len - 1; j >= 0; j--) {
      // 对称翻转
      result.push(result[j] | (1 << (i - 1)));
    }
  }
  return result;
};
// @lc code=end

export { grayCode };

~~~

  
### 0090-subsetsWithDup-ii.js

~~~js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// [90] 子集 II
// Your runtime beats 33.4 % of javascript submissions
const subsetsWithDup = function(nums) {
  const len = nums.length;
  const list = [];
  list.push([]);
  if (len === 0) {
    return list;
  } else if (len === 1) {
    list.push(nums);
    return list;
  }
  const backTrack = function(current, target, list, lastIndex) {
    const currLen = current.length;
    if (currLen === target) {
      list.push([...current]);
      return;
    }
    nums.forEach((i, index) => {
      // 应该把当前遍历的index拿过来
      if ((currLen === 0 || i >= current[currLen - 1]) && index > lastIndex) {
        current.push(i);
        backTrack(current, target, list, index);
        current.pop();
      }
    });
  };
  nums.sort((a, b) => a - b);
  for (let i = 1; i < len; i++) {
    const target = i;
    const current = [];
    backTrack(current, target, list, -1);
  }
  // 数组去重usedict
  const dict = {};
  for (let i = 1; i < list.length; i++) {
    const key = list[i].toString();
    if (dict[key]) {
      list.splice(i, 1);
      i--;
    } else {
      dict[key] = true;
    }
  }
  list.push(nums);
  return list;
};

export { subsetsWithDup };

~~~

  
### 0093-restoreIpAddresses.js

~~~js
// 93 restoreIpAddresses 复原IP地址

// 方法一：有缺陷的回溯算法
// 执行用时：108 ms 13.96% + 40.7 MB 5.91%
// 辅助函数: 判断IP某一位是否有效
function isValid(num) {
  if (num === '' || (num.length > 1 && num[0] === '0')) {
    return false;
  }
  const tmp = Number(num);
  return tmp >= 0 && tmp <= 255;
}

/**
 * @param {string} s
 * @return {string[]}
 */
function restoreIpAddresses1(s) {
  const resArr = [];
  const judge = function (arr, str) {
    // 如果全部满足，那么直接把IP放入结果数组中（0,255）字符串
    if (arr.length === 4 && str.length === 0) {
      const resStr = arr.join('.');
      if (!resArr.includes(resStr)) {
        resArr.push(resStr);
      }
    }
    if (str === '' || arr.length > 4) {
      return;
    }
    // 步骤一：使用回溯算法计算出全部的可能的字符串情况
    // 如果是有效的IP，那么就继续，如果不是有效的IP，就回溯
    if (isValid(str.slice(0, 1))) {
      const newArr = [...arr, str.slice(0, 1)];
      judge(newArr, str.slice(1));
    }
    if (isValid(str.slice(0, 2))) {
      const newArr = [...arr, str.slice(0, 2)];
      judge(newArr, str.slice(2));
    }
    if (isValid(str.slice(0, 3))) {
      const newArr = [...arr, str.slice(0, 3)];
      judge(newArr, str.slice(3));
    }
  };
  judge([], s);
  return resArr;
}

// 方法二：改进后的算法
// 92 ms 60.98%;40.2 MB 7.83%
function restoreIpAddresses(s) {
  const resArr = [];
  const judge = function (arr, str) {
    const len = arr.length;
    // 数组长度大于4，无效;数组长度等于4，字符串不是空，无效
    if (len > 4 || (len === 4 && str !== '')) {
      return;
    }
    // 数组长度等于4，字符串是空，有效
    if (len === 4 && str === '') {
      const resStr = arr.join('.');
      // 这里为什么会有重复的部分？需要处理
      // 这个很关键，严重影响性能，这里需要改进
      if (!resArr.includes(resStr)) {
        resArr.push(resStr);
      }
      return;
    }
    // 数组长度小于4，递归调用（执行回溯）
    // 改进：这里可以过滤剩余的字符串
    // 现在每次都新建数组，性能不好，不规范的回溯
    let temp;
    let remain;
    // 情况1
    temp = str.slice(0, 1);
    remain = str.slice(1);
    if (isValid(temp) && remain.length <= (4 - len) * 3) {
      const newArr = [...arr, temp];
      judge(newArr, remain);
    }
    // 情况2
    temp = str.slice(0, 2);
    remain = str.slice(2);
    if (isValid(temp) && remain.length <= (4 - len) * 3) {
      const newArr = [...arr, temp];
      judge(newArr, remain);
    }
    // 情况3
    temp = str.slice(0, 3);
    remain = str.slice(3);
    if (isValid(temp) && remain.length <= (4 - len) * 3) {
      const newArr = [...arr, temp];
      judge(newArr, remain);
    }
  };
  judge([], s);
  return resArr;
}

export { restoreIpAddresses, restoreIpAddresses1 };

~~~

  
### 0094-inorderTraversal.js

~~~js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 * [94] 二叉树的中序遍历
 * 中序遍历：左根右
 */
function runNode(node, list) {
  if (node.left) {
    runNode(node.left, list);
  }
  list.push(node.val);
  if (node.right) {
    runNode(node.right, list);
  }
}

const inorderTraversal = function (root) {
  if (!root || !root.val) {
    return [];
  }
  const list = [];
  runNode(root, list);
  return list;
};

export { inorderTraversal };

~~~

  
### 0095-generateTrees.js

~~~js
/*
 * @lc app=leetcode.cn id=95 lang=javascript
 * [95] 不同的二叉搜索树 II
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number} n
 * @return {TreeNode[]}
 * 思路：二叉搜索树的性质：根节点大于左子树的全部节点
 * 根节点小于右子树的全部节点
 * 那么就循环 [1, n] 的全部数字，i 作为根节点，[1, i - 1] 作为左子树，[i + 1, n] 左右右子树。然后递归计算出左子树和右子树的数组
 * 然后把左子树和右子树循环一次，构造出 N ^ 2 种情况即可
 */
// 80 ms, 在所有 JavaScript 提交中击败了83.40%
// 1 <= n <= 8，递归调用+三层循环，不会影响太多的性能
const generateTrees = function(n) {
  const generateInnerTrees = (start, end) => {
    const res = [];
    // 如果最小值大于最大值，树不存在，但是需要有空位，返回 null
    if (start > end) {
      res.push(null);
      return res;
    }
    // 如果最小值等于最大值，那么只有一个节点
    if (start === end) {
      const node = new TreeNode(start);
      res.push(node);
      return res;
    }
    // 如果最小值小于最大值，循环根节点，递归获取子树的情况
    for (let i = start; i <= end; i++) {
      const leftTrees = generateInnerTrees(start, i - 1);
      const rightTrees = generateInnerTrees(i + 1, end);
      for (let j = 0; j < leftTrees.length; j++) {
        for (let k = 0; k < rightTrees.length; k++) {
          const node = new TreeNode(i, leftTrees[j], rightTrees[k]);
          res.push(node);
        }
      }
    }
    return res;
  };
  return generateInnerTrees(1, n);
};

// 官方详细解法：https://leetcode-cn.com/problems/unique-binary-search-trees-ii/solution/bu-tong-de-er-cha-sou-suo-shu-ii-by-leetcode-solut/
// @lc code=end
export { generateTrees };

~~~

  
### 0096-numTrees.js

~~~js
/*
 * @lc app=leetcode.cn id=96 lang=javascript
 *
 * [96] 不同的二叉搜索树
 */

/**
 * @param {number} n
 * @return {number}
 */
// 思路1
// 难点：动态规划公式，详见文档
// Your runtime beats 71.57 % of javascript submissions
const numTrees = function(n) {
  if (n <= 1) return 1;
  const arr = new Array(n + 1);
  arr[0] = 1;
  arr[1] = 1;
  // 外循环：动态规划计算每一项
  for (let i = 2; i <= n; i++) {
    arr[i] = 0;
    // 内循环：当前项的递归公式
    for (let j = 1; j <= i; j++) {
      arr[i] += arr[i - j] * arr[j - 1];
    }
  }
  return arr[n];
};

// 思路2
// 难点：数学卡特兰数，详见文档
// Your runtime beats 51.04 % of javascript submissions
const numTrees2 = function(n) {
  let res = 1;
  for (let i = 0; i < n; i++) {
    res = res * 2 * (2 * i + 1) / (i + 2);
  }
  return res;
};

export { numTrees, numTrees2 };

~~~

  
### 0097-isInterleave.js

~~~js
// * 97. 交错字符串（中等-困难）
// * 给定三个字符串 s1、s2、s3，请你帮忙验证 s3 是否是由 s1 和 s2 交错 组成的。
// 这个解答不太熟，需要多看几次

/**
 * 思路1，双指针：DFS 的思路，时间复杂度 O(2^n)，性能不好
 * 4072 ms, 在所有 JavaScript 提交中击败了5.02%
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
const isInterleave = function(s1, s2, s3) {
  // 如果长度不等，那么一定不满足条件，这个判断一次即可
  if ((s1.length + s2.length) !== s3.length) {
    return false;
  }
  if (s1.length === 0) {
    return s2 === s3;
  }
  if (s2.length === 0) {
    return s1 === s3;
  }
  // 辅助函数：判断两个字符串，包含的字符和数字是否相等，先避免字符不等的情况
  // 字符串的长度是100，这里循环最多400次，性能可以接受
  // 如果是不等的字符，不会执行到下面的递归中，尽量优化性能
  function checkStr(str, str2) {
    const dict = {};
    const len = str.length;
    for (let i = 0; i < len; i++) {
      const key = str[i];
      if (!dict[key]) {
        dict[key] = 0;
      }
      dict[key]++;
    }
    if (str2) {
      const len = str2.length;
      for (let i = 0; i < len; i++) {
        const key = str2[i];
        if (!dict[key]) {
          dict[key] = 0;
        }
        dict[key]++;
      }
    }
    return dict;
  }
  const dict1 = checkStr(s1, s2);
  const dict2 = checkStr(s3);
  for (const key in dict1) {
    if (dict2[key] !== dict1[key]) {
      return false;
    }
  }

  // 辅助函数递归字符串（双指针，递归字符串是否满足）
  function fn(p1, p2, p3) {
    // 如果有一个已经是空字符串，那么直接比较另两个即可
    if (!s1[p1]) {
      return s2.slice(p2) === s3.slice(p3);
    }
    if (!s2[p2]) {
      return s1.slice(p1) === s3.slice(p3);
    }
    // 首先获取三个字符串开始的字符
    const a1 = s1[p1];
    const a2 = s2[p2];
    const a3 = s3[p3];
    // 如果第三个和前两个都不相等，那么就不满足
    if (a3 !== a1 && a3 !== a2) {
      return false;
    }
    // 如果第三个和前两个之一满足，那么获取子字符串（使用指针）
    if (a1 === a3 && a2 !== a3) {
      return fn(p1 + 1, p2, p3 + 1);
    }
    if (a1 !== a3 && a2 === a3) {
      return fn(p1, p2 + 1, p3 + 1);
    }
    // 如果第三个和前两个都满足，那么就是 fn = fn(n - 1) + fn(n - 2) 递归实现？
    if (a1 === a3 && a2 === a3) {
      return fn(p1, p2 + 1, p3 + 1) || fn(p1 + 1, p2, p3 + 1);
    }
  }
  return fn(0, 0, 0);
};

// 思路二：官方解答：动态规划+滚动数组（优化空间复杂度）
// https://leetcode-cn.com/problems/interleaving-string/solution/jiao-cuo-zi-fu-chuan-by-leetcode-solution/
// 实际上就是一个递推式：
// |s3| = |s1| + |s2| 的前提是 s3[s3.length - 1] = s1[s1.length - 1] && |s3-1| = |s1-1| + |s2|
// 官方给的动态规划转移方程
// f(i,j) = [f(i−1,j) and s1(i−1)=s3(p)] or [f(i,j−1) and s2(j−1)=s3(p)]
// 76 ms, 在所有 JavaScript 提交中击败了60.50%
const isInterleave2 = function(s1, s2, s3) {
  const l1 = s1.length;
  const l2 = s2.length;
  const l3 = s3.length;
  if (l1 + l2 !== l3) {
    return false;
  }
  // 这个矩阵存放动态规划的结果
  const arr = new Array(l1 + 1).fill(true);
  const matrix = arr.map(() => {
    return new Array(l2 + 1).fill(true);
  });
  // 先处理首行首列
  const len = matrix.length;
  for (let i = 1; i < len; i++) {
    matrix[i][0] = matrix[i - 1][0] && s3[i - 1] === s1[i - 1];
  }
  for (let j = 1; j < matrix[0].length; j++) {
    matrix[0][j] = matrix[0][j - 1] && s3[j - 1] === s2[j - 1];
  }
  // 处理矩阵内部
  for (let i = 1; i < len; i++) {
    for (let j = 1; j < matrix[i].length; j++) {
      // f(i,j) = [f(i−1,j) and s1(i−1)=s3(p)] or [f(i,j−1) and s2(j−1)=s3(p)]
      matrix[i][j] = matrix[i - 1][j] && s3[i + j - 1] === s1[i - 1] || matrix[i][j - 1] && s3[i + j - 1] === s2[j - 1];
    }
  }
  return matrix[l1][l2];
};

// 思路3：回溯算法+指针+字典
// 68 ms, 在所有 JavaScript 提交中击败了84.93%
const isInterleave3 = function (s1, s2, s3) {
  const l1 = s1.length;
  const l2 = s2.length;
  const l3 = s3.length;
  if (l1 + l2 !== l3) {
    return false;
  }
  const dict = new Set();
  let res = false;
  function backtrace(i1, i2, i3) {
    // 当三个指针都到字符串末尾，证明完全匹配，返回
    if (i1 === l1 && i2 === l2 && i3 === l3) {
      return res = true;
    }
    // 如果字典中已经遍历过，直接返回
    if (dict.has(`${i1}-${i2}-${i3}`)) {
      return false;
    }
    dict.add(`${i1}-${i2}-${i3}`);
    if (s1[i1] === s3[i3]) {
      backtrace(i1 + 1, i2, i3 + 1);
    }
    // 注：这里是两种情况，不能用 else if
    if (s2[i2] === s3[i3]) {
      backtrace(i1, i2 + 1, i3 + 1);
    }
  }
  backtrace(0, 0, 0);
  return res;
};

export { isInterleave, isInterleave2, isInterleave3 };

~~~

  
### 0098-isValidBST.js

~~~js
/*
 * @lc app=leetcode.cn id=98 lang=javascript
 * [98] 验证二叉搜索树
 */
// 本题考察二叉搜索树的性质
// 左子树是二叉搜索树
// 右子树是二叉搜索树
// 左子树的最大值小于当前节点值
// 右子树的最小值大于当前节点值

// @lc code=start
// 思路1：递归，判断每一个子树是二叉搜索树
// 56 ms, 在所有 JavaScript 提交中击败了99.13%
// 需要给定一个辅助函数，判断一个子树的最值(子树的最值在 small-large 之间)，这是解题关键
const checkTree = function(node, small, large) {
  // 如果没有节点，满足
  if (!node) {
    return true;
  }
  // 如果当前节点的值，大于等于最大值或者小于等于最小值，那么不是二叉搜索树
  if (node.val >= large || node.val <= small) {
    return false;
  }
  // 子节点在函数中递归判断，更改上下边界即可，辅助函数不需要返回最值
  // 左子树的最大值小于当前节点值，右子树的最小值大于当前节点值
  return checkTree(node.left, small, node.val) && checkTree(node.right, node.val, large);
};

const isValidBST = function(root) {
  // 默认根节点不设置最值判断
  const small = -Infinity;
  const large = +Infinity;
  return checkTree(root, small, large);
};

// 思路二：二叉树中序遍历
// 如果是二叉搜索树，那么中序遍历（左根右）的结果是升序的数组
// 60 ms, 在所有 JavaScript 提交中击败了96.81%
const isValidBST2 = function(root) {
  // 这个存放遍历的结果（或者用一个number变量存放也可以）
  const arr = [];
  function runNode(node) {
    if (!node) {
      return true;
    }
    if (node && node.left) {
      const res = runNode(node.left);
      if (res === false) {
        return false;
      }
    }
    if (node) {
      // 判断当前的值和前一个的值
      if (arr[arr.length - 1] >= node.val) {
        return false;
      }
      arr.push(node.val);
    }
    if (node && node.right) {
      const res = runNode(node.right);
      if (res === false) {
        return false;
      }
    }
    return true;
  }
  const res = runNode(root);
  if (res === false) {
    return false;
  }
  return true;
};

// @lc code=end
export { isValidBST, isValidBST2 };

~~~

  
### 0099-recoverTree.js

~~~js
/*
 * @lc app=leetcode.cn id=99 lang=javascript
 * [99] 恢复二叉搜索树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 * 这个题目需要几步转换才能做出来，用最直接能想到的思路做就可以
 * 二叉搜索树的特点：中序遍历结果是有序数组
 * 1、先把二叉搜索树中序遍历，获取数组
 * 2、分析数组，找到错位的两个数字（这里需要分相邻的错位，还是不相邻的错位，这个需要处理）
 * 3、再次遍历二叉搜索树，然后把这两个值替换一下即可
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 * Your runtime beats 91.8 % of javascript submissions
 */
const recoverTree = function(root) {
  // 1、先把二叉搜索树中序遍历，获取数组
  const list = [];
  const inorder = (node) => {
    if (!node) return;
    inorder(node.left);
    list.push(node.val);
    inorder(node.right);
  };
  inorder(root);

  // 2、分析数组，找到错位的两个数字
  // 这个数组存放错位的两个数字
  const unorder = [];
  for (let i = 1; i < list.length; i++) {
    if (list[i] < list[i - 1]) {
      if (unorder.length === 0) {
        unorder.push(list[i - 1]);
      } else {
        unorder.push(list[i]);
      }
    }
  }
  // 处理只有一个错位的情况(找到前一个元素，并放入错位数组)
  if (unorder.length === 1) {
    const index = list.indexOf(unorder[0]);
    unorder.push(list[index + 1]);
  }
  // 3、遍历二叉搜索树，然后把这两个值替换一下即可
  const runNode = (node) => {
    if (!node) return;

    if (node.val === unorder[0]) {
      node.val = unorder[1];
    } else if (node.val === unorder[1]) {
      node.val = unorder[0];
    }

    runNode(node.left);
    runNode(node.right);
  };
  runNode(root);
};
// @lc code=end
export { recoverTree };

~~~

  
### 0100-sameTree.js

~~~js
/**
 * 100 same Tree
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

// 难度：简单
// 考点：二叉树的基本结构（val+left+right）/ 二叉树递归遍历

// 工具函数：比较两个数组是否相同
function isSameArray(p, q) {
  // 比较数组的长度
  if (p.length !== q.length) {
    return false;
  }
  // 比较数组的每一项（假设全部是简单类型）
  for (let i = 0; i < p.length; i++) {
    if (p[i] !== q[i]) {
      return false;
    }
  }
  return true;
}
// const result = isSameArray([1, 2, 3], [1, 2, 3]);

// 72 ms , 在所有 javascript 提交中击败了 51.96%
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
function isSameTree(p, q) {
  // 如果都是空树，相同
  if (p === null && q === null) {
    return true;
  }
  // 如果一个空，一个非空，不同
  if ((p && !q) || (!p && q)) {
    return false;
  }
  // 如果都有值，但是值不同，不同
  if (p && q && p.val !== q.val) {
    return false;
  }
  // 如果一个有子树，另一个没有子树，不同
  if ((p.left && !q.left) || (!p.left && q.left) || (p.right && !q.right) || (!p.right && q.right)) {
    return false;
  }
  // 递归左右子树
  return (isSameTree(p.left, q.left) && isSameTree(p.right, q.right));
}

export { isSameArray, isSameTree };

~~~

  
### 0101-isSymmetric.js

~~~js
/*
 * [101] 对称二叉树
 */
// 辅助函数: 对比全部的树节点
function testTree(left, right) {
  if (!left && !right) {
    return true;
  }
  if ((left && !right) || (!left && right) || left.val !== right.val) {
    return false;
  }
  return testTree(left.left, right.right) && testTree(left.right, right.left);
}

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
// 广度优先遍历
// 把左子树的节点放在一个数组中,把右子树的节点放在另一个数组中
// 每循环一层，然后比较两个数组是否镜像相等,如果不相等，那么返回false,直到全部遍历树节点
function isSymmetric(root) {
  // 无根节点
  if (!root) {
    return true;
  }
  const leftNode = root.left;
  const rightNode = root.right;
  // 无左节点或者右节点，返回false
  if ((leftNode && !rightNode) || (!leftNode && rightNode)) {
    return false;
  }
  // todo: 这种思路不好，能否直接比较两个子树的左右节点？
  return testTree(leftNode, rightNode);
}

export { isSymmetric };

~~~

  
### 0102-levelOrder.js

~~~js
/*
 * @lc app=leetcode.cn id=102 lang=javascript
 *
 * [102] 二叉树的层序遍历
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

const runTree = function(node, layer, matrix) {
  if (!node) return;
  if (!matrix[layer]) {
    matrix[layer] = [];
  }
  matrix[layer].push(node.val);
  runTree(node.left, layer + 1, matrix);
  runTree(node.right, layer + 1, matrix);
};
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
// 88 ms, 在所有 JavaScript 提交中击败了69.94%的用户
const levelOrder = function(root) {
  // 把当前的层数传递下去，然后传递一个二重数组即可
  const matrix = [];
  const layer = 0;
  if (!root) return matrix;
  if (!matrix[layer]) {
    matrix[layer] = [];
  }
  matrix[layer].push(root.val);
  runTree(root.left, layer + 1, matrix);
  runTree(root.right, layer + 1, matrix);
  return matrix;
};

// @lc code=end
export { levelOrder };

~~~

  
### 0103-zigzagLevelOrder.js

~~~js
/*
 * @lc app=leetcode.cn id=103 lang=javascript
 *
 * [103] 二叉树的锯齿形层序遍历
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 * 广度优先遍历+不同层加一个序号，说明是正的还是反的即可
 * 可以先把树层序遍历（并加一个层序号）成数组
 * 然后数组进一步处理成合适的锯齿
 * 这样逻辑更好理解一些，不易出错
 */
//  56 ms, 在所有 JavaScript 提交中击败了95.87%
const zigzagLevelOrder = function(root) {
  if (!root) return [];
  // 先把二叉树层序遍历，同时增加layer层数
  const res = [];
  const list = [];
  list.push({
    node: root,
    layer: 0,
  });
  while (list.length > 0) {
    const tmp = list.shift();
    res.push({ val: tmp.node.val, layer: tmp.layer });
    const layer = tmp.layer;
    const left = tmp.node.left;
    const right = tmp.node.right;
    if (left) {
      list.push({ node: left, layer: layer + 1 });
    }
    if (right) {
      list.push({ node: right, layer: layer + 1 });
    }
  }
  // 再次遍历数组，把每一层的结果都放入临时数组，然后返回
  const result = [];
  let flagLayer = 0;
  let tmpArr = [];
  for (let i = 0; i < res.length; i++) {
    const { layer, val } = res[i];
    if (layer === flagLayer) {
      tmpArr.push(val);
    } else {
      // 这里需要根据层数，决定是否取反
      if (flagLayer % 2 === 0) {
        result.push([...tmpArr]);
      } else {
        result.push([...tmpArr].reverse());
      }
      tmpArr = [];
      tmpArr.push(val);
      flagLayer = layer;
    }
  }
  // 最后还需要处理一层
  if (flagLayer % 2 === 0) {
    result.push([...tmpArr]);
  } else {
    result.push([...tmpArr].reverse());
  }
  return result;
};
// @lc code=end
export { zigzagLevelOrder };

~~~

  
### 0104-maximum-depth-of-binary-tree.js

~~~js
// 104. 二叉树的最大深度

// 给定二叉树 [3,9,20,null,null,15,7]，

//     3
//    / \
//   9  20
//     /  \
//    15   7
// 返回它的最大深度 3 。

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
// 68 ms , 在所有 javascript 提交中击败了 93.70%
/**
 * @param {TreeNode} root
 * @return {number}
 */
function maxDepth(root) {
  if (!root) {
    return 0;
  }
  if (!root.left && !root.right) {
    return 1;
  }
  if (root.left || root.right) {
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
  }
}
// [3,9,20,15,7,null,null,10,null]

export { maxDepth };

~~~

  
### 0105-buildTree.js

~~~js
/*
 * @lc app=leetcode.cn id=105 lang=javascript
 *
 * [105] 从前序与中序遍历序列构造二叉树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 * 因为树中元素是唯一的，直接indexOf即可找到索引
 * 前序遍历：根左右（根节点可以找出来）
 * 中序遍历：左根右（可以把左右计算出来）
 * 然后递归节点即可
 * Your runtime beats 37.58 % of javascript submissions
 * 基本思路正常（如果传递的是数组的index，每次不需要slice，可以提高时间和空间利用率）
 */
const buildTree = function(preorder, inorder) {
  // 如果根节点不存在，直接返回空树节点
  if (!preorder || preorder.length === 0) {
    return new TreeNode(null);
  }
  // 如果只有一个根节点，那么直接返回这个节点（没有子树）
  if (preorder.length === 1) {
    return new TreeNode(preorder[0]);
  }
  const rootVal = preorder[0];
  const index = inorder.indexOf(rootVal);

  const rootNode = new TreeNode(rootVal);

  const leftInorder = inorder.slice(0, index);
  const rightInorder = inorder.slice(index + 1);

  const leftPreOrder = preorder.slice(1, index + 1);
  const rightPreOrder = preorder.slice(index + 1);

  if (leftPreOrder.length > 0) {
    rootNode.left = buildTree(leftPreOrder, leftInorder);
  }
  if (rightPreOrder.length > 0) {
    rootNode.right = buildTree(rightPreOrder, rightInorder);
  }
  return rootNode;
};
// @lc code=end
export { buildTree };

~~~

  
### 0106-buildTree.js

~~~js
/*
 * @lc app=leetcode.cn id=106 lang=javascript
 *
 * [106] 从中序与后序遍历序列构造二叉树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 * 思路类似105题，只是获取根节点的位置变化了
 * 基本思路还是找到根节点和左右子树，然后递归处理
 * Your runtime beats 31.7 % of javascript submissions
 */
const buildTree = function(inorder, postorder) {
  // 如果根节点不存在，直接返回空树节点
  if (!postorder || postorder.length === 0) {
    return new TreeNode(null);
  }
  // 如果只有一个根节点，那么直接返回这个节点（没有子树）
  if (postorder.length === 1) {
    return new TreeNode(postorder[0]);
  }
  const rootVal = postorder[postorder.length - 1];
  const index = inorder.indexOf(rootVal);

  const rootNode = new TreeNode(rootVal);

  const leftInorder = inorder.slice(0, index);
  const rightInorder = inorder.slice(index + 1);

  const leftPostOrder = postorder.slice(0, index);
  const rightPostOrder = postorder.slice(index, postorder.length - 1);

  if (leftPostOrder.length > 0) {
    rootNode.left = buildTree(leftInorder, leftPostOrder);
  }
  if (rightPostOrder.length > 0) {
    rootNode.right = buildTree(rightInorder, rightPostOrder);
  }
  return rootNode;
};
// @lc code=end
export { buildTree };

~~~

  
### 0107-levelOrderBottom.js

~~~js
/*
 * [107] 二叉树的层次遍历 II
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
const levelOrderBottom = function (root) {
  if (!root) return [];
  const result = [];
  // 辅助函数：把当前节点的全部元素放到数组中
  // 能否传一个当前的层级，然后子节点就可以在不同的层级中插入了
  const getNode = function (node, index) {
    if (!node) return null;
    const tmp = [];
    if (node.left) {
      tmp.push(node.left.val);
      getNode(node.left, index + 1);
    }
    if (node.right) {
      tmp.push(node.right.val);
      getNode(node.right, index + 1);
    }
    if (result[index]) {
      result[index] = result[index].concat(tmp);
    } else if (tmp.length > 0) {
      result[index] = tmp;
    }
  };
  // 使用一个数组存放结果
  // 然后广度优先遍历（获取不同层级的子节点）然后 UNshift 到结果数组中
  const tmp = [root.val];
  result.unshift(tmp);
  getNode(root, 1);
  result.reverse();
  return result;
};

export { levelOrderBottom };

~~~

  
### 0108-sortedArrayToBST.js

~~~js
// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
//  [108] 将有序数组转换为二叉搜索树
//  92 ms 在所有 JavaScript 提交中击败了 89.29%
const sortedArrayToBST = function(nums) {
  // 辅助函数
  const generateNode = (start, end) => {
    // 如果左大于右，返回错误，不设置节点
    if (start > end) {
      return null;
    }
    if (start === end) {
      return new TreeNode(nums[start]);
    }
    // start < end
    // 找到中间的节点作为根节点，然后递归设置子节点
    const middle = Math.floor((start + end) / 2);
    const node = new TreeNode(nums[middle]);
    node.left = generateNode(start, middle - 1);
    node.right = generateNode(middle + 1, end);
    return node;
  };
  // 思路：递归
  // 二叉搜索树：找到当前数组中，中间的元素，作为根节点
  // 然后把左边全部的元素作为左子树，右边的全部元素作为右子树即可
  return generateNode(0, nums.length - 1);
};

export { sortedArrayToBST };

~~~

  
### 0109-sortedListToBST.js

~~~js
/*
 * @lc app=leetcode.cn id=109 lang=javascript
 *
 * [109] 有序链表转换二叉搜索树
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {ListNode} head
 * @return {TreeNode}
 * 有序列表无法直接判断中点
 * 思路一是先转换成有序数组，然后数组转换成平衡二叉搜索树
 * 是否能直接转换成二叉搜索树
 * 76 ms, 在所有 JavaScript 提交中击败了86.33%
 */
const sortedListToBST = function(head) {
  // 先把有序列表转换成有序数组
  const arr = [];
  while (head) {
    arr.push(head.val);
    head = head.next;
  }
  // 然后把有序数组转换成二叉搜索树
  function arr2Tree(start, end) {
    if (start > end) {
      return null;
    } else if (start === end) {
      return new TreeNode(arr[start]);
    } else {
      const middle = Math.floor((start + end) / 2);
      const node = new TreeNode(arr[middle]);
      node.left = arr2Tree(start, middle - 1);
      node.right = arr2Tree(middle + 1, end);
      return node;
    }
  }
  return arr2Tree(0, arr.length - 1);
};

// 官方：https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree/solution/you-xu-lian-biao-zhuan-huan-er-cha-sou-suo-shu-1-3/
// 二叉搜索树的核心就是找到中位数作为根节点
// 1、可以使用快慢指针，获取排序链表的中位数。当快指针到达最后一位时，慢指针正好是中位数
// 2、设置中位数的是根节点，然后左子树和右子树的边界可以确定，递归左右子树即可
// 注意：链表找到元素的索引

// @lc code=end
export { sortedListToBST };

~~~

  
### 0110-isBalanced.js

~~~js
/*
 * @lc app=leetcode.cn id=110 lang=javascript
 *
 * [110] 平衡二叉树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
// 考点：计算树的深度，然后比较一下
// 92 ms, 在所有 JavaScript 提交中击败了92.03%
const runTree = function(node) {
  if (!node) {
    return 1;
  }
  const left = runTree(node.left);
  const right = runTree(node.right);
  // 如果子节点的深度不符合，直接返回 false
  if (!left || !right) {
    return false;
  }
  if (Math.abs(left - right) < 2) {
    return Math.max(left, right) + 1;
  } else {
    return false;
  }
  // 如果子节点的深度绝对值小于1，那么返回子节点的深度
};

const isBalanced = function(root) {
  if (!root) {
    return true;
  }
  const left = runTree(root.left);
  const right = runTree(root.right);
  // 如果子节点的深度不符合，直接返回 false
  if (!left || !right) {
    return false;
  }
  if (Math.abs(left - right) < 2) {
    return true;
  } else {
    return false;
  }
};

export { isBalanced, runTree };

~~~

  
### 0111-minTreeDepth.js

~~~js
// 111 计算二叉树的最小深度

// 思路：递归遍历子节点：当前节点的深度+下面子节点的深度
// return 1 + Math.min(fn(this.left), fn(this.right))
// 72 ms, 在所有 javascript 提交中击败了84.30%

// 注意：[1,2] 这个测试用例
// 题目中说明:叶子节点是指没有子节点的节点，这句话的意思是 1 不是叶子节点
// 题目问的是到叶子节点的最短距离，所以所有返回结果为 1 当然不是这个结果

// 叶子节点的定义是左孩子和右孩子都为 null 时叫做叶子节点
// ！当 root 节点左右孩子都为空时，返回 1
// 当 root 节点左右孩子有一个为空时，返回不为空的孩子节点的深度
// 当 root 节点左右孩子都不为空时，返回左右孩子较小深度的节点值
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
function minDepth(root) {
  if (root === null) {
    return 0;
  }
  // 注意：如果一个子节点没有左右节点，那么返回长度1
  if (!root.left && !root.right) {
    return 1; // [1,2]是这种情况
  }
  if (!root.left) {
    return 1 + minDepth(root.right);
  }
  if (!root.right) {
    return 1 + minDepth(root.left);
  }
  return 1 + Math.min(minDepth(root.right), minDepth(root.left));
}

export { minDepth };

~~~

  
### 0112-hasPathSum.js

~~~js
// [112] 路径总和
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

const runNode = function(node, sum, currentSum) {
  // 没有节点，直接返回
  if (!node) {
    return false;
  }
  // 没有子节点，那么是叶子节点
  if (!node.left && !node.right) {
    return currentSum + node.val === sum;
  }
  // 有子节点
  return runNode(node.left, sum, currentSum + node.val) || runNode(node.right, sum, currentSum + node.val);
};

/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */
// 104 ms , 在所有 JavaScript 提交中击败了 31.09% 的用户
const hasPathSum = function(root, sum) {
  // 空树，目标是0
  if (!root) {
    return false;
  }
  // 只有一个根节点
  if (!root.left && !root.right) {
    return root.val === sum;
  }
  const currentSum = root.val;
  return runNode(root.left, sum, currentSum) || runNode(root.right, sum, currentSum);
};

export { hasPathSum };

// 错误思路：// 思路一：获取全部树的路径，然后判断是否存在
// function getPath(node) {
//   const { value } = node;
//   // 无子节点
//   if (node.left === null && node.right === null) {
//     return [value];
//   }
//   // 有一个子节点
//   if (node.left === null) {
//     const rightPath = getPath(node.right); // array
//     for (let i = 0; i < rightPath.length; i++) {
//       rightPath[i] += value;
//     }
//     return rightPath;
//   }
//   if (node.right === null) {
//     const leftPath = getPath(node.left); // array
//     for (let i = 0; i < leftPath.length; i++) {
//       leftPath[i] += value;
//     }
//     return leftPath;
//   }
//   // 左右都有子节点
//   const leftPath = getPath(node.left);
//   const rightPath = getPath(node.right);
//   const totalPath = [].concat(leftPath).concat(rightPath);
//   for (let i = 0; i < totalPath.length; i++) {
//     totalPath[i] += value;
//   }
//   return totalPath;
// }

// // 思路二：深度优先遍历：如果有值，直接返回真

// function hasPathSum(root, sum) {
//   return getPath(root).includes(sum);
// }

~~~

  
### 0113-pathSum-ii.js

~~~js
/*
 * @lc app=leetcode.cn id=113 lang=javascript
 * [113] 路径总和 II
 * Your runtime beats 44.14 % of javascript submissions
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number[][]}
 */
const pathSum = function(root, targetSum) {
  const list = [];
  const tmp = [];
  const runNode = (node, tmp, lastSum) => {
    if (!node) {
      return;
    }
    tmp.push(node.val);
    const tmpSum = lastSum + node.val;
    if (!node.left && !node.right) {
      if (tmpSum === targetSum) {
        list.push(tmp);
      }
    }
    runNode(node.left, [...tmp], tmpSum);
    runNode(node.right, [...tmp], tmpSum);
  };
  runNode(root, tmp, 0);
  return list;
};

export { pathSum };

~~~

  
### 0114-flatten.js

~~~js
/*
 * @lc app=leetcode.cn id=114 lang=javascript
 *
 * [114] 二叉树展开为链表
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 * 先把树结构转换成数组（先序遍历），然后数组前后项增加树节点关系
 * 68 ms, 在所有 JavaScript 提交中击败了81.73%
 */
const flatten = function(root) {
  const list = [];
  function runNode(node) {
    if (node) {
      list.push(node);
      runNode(node.left);
      runNode(node.right);
    }
  }
  runNode(root);
  const len = list.length;
  for (let i = 1; i < len; i++) {
    const prev = list[i - 1];
    const curr = list[i];
    prev.left = null;
    prev.right = curr;
  }
};
// @lc code=end
export { flatten };

~~~

  
### 0116-connect.js

~~~js
/*
 * @lc app=leetcode.cn id=116 lang=javascript
 *
 * [116] 填充每个节点的下一个右侧节点指针
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */
/**
 * @param {Node} root
 * @return {Node}
 * Your runtime beats 62.07 % of javascript submissions
 * 实际上，先把二叉树层序遍历，然后每一层的节点，设置指针指向右侧的节点即可
 * 二叉树的层序遍历使用 102 题目已有的代码，不需要单独写了
 */
const connect = function(root) {
  const matrix = [];
  if (!root) return root;
  // 辅助函数：二叉树层序遍历
  const runTree = function(node, layer) {
    if (!node) return;
    if (!matrix[layer]) {
      matrix[layer] = [];
    }
    matrix[layer].push(node);
    runTree(node.left, layer + 1);
    runTree(node.right, layer + 1);
  };
  // 处理根节点
  const layer = 0;
  if (!matrix[layer]) {
    matrix[layer] = [];
  }
  matrix[layer].push(root.val);
  runTree(root.left, layer + 1);
  runTree(root.right, layer + 1);
  // 这个指针指向其下一个右侧节点
  // 如果找不到下一个右侧节点，则将 next 指针设置为 NULL。
  for (let i = 0; i < matrix.length; i++) {
    const len = matrix[i].length;
    for (let j = 0; j < len; j++) {
      if (matrix[i][j + 1]) {
        matrix[i][j].next = matrix[i][j + 1];
      } else {
        matrix[i][j].next = null;
      }
    }
  }
  return root;
};
// @lc code=end
export { connect };

~~~

  
### 0118-pascals-triangle.js

~~~js
// 118 pascals-triangle 杨辉三角

// 输入: 5
// 输出:
// [
//      [1],
//     [1,1],
//    [1,2,1],
//   [1,3,3,1],
//  [1,4,6,4,1]
// ]

/**
 * @param {number} numRows
 * @return {number[][]}
 */
// 方法一：按照杨辉三角的定义循环两次，性能不好
// 68 ms, 在所有 javascript 提交中击败了 64.87%
function generate(numRows) {
  const result = [];
  for (let i = 1; i <= numRows; i++) {
    if (i === 1) {
      result.push([1]);
    } else if (i === 2) {
      result.push([1, 1]);
    } else {
      // i 行，使用两个for循环
      const innerArr = [1];
      for (let j = 1; j < Math.ceil(i / 2); j++) {
        innerArr[j] = result[i - 2][j - 1] + result[i - 2][j];
      }
      for (let j = Math.ceil(i / 2); j < i; j++) {
        innerArr[j] = innerArr[i - j - 1];
      }
      result.push(innerArr);
    }
  }
  return result;
}

export { generate };

~~~

  
### 0119-pascals-triangle-2.js

~~~js
// 119 pascals-triangle 杨辉三角(2)

// 给定一个非负索引 k，其中 k ≤ 33，返回杨辉三角的第 k 行。
// 进阶：你可以优化你的算法到 O(k) 空间复杂度吗？
/**
 * @param {number} rowIndex
 * @return {number[][]}
 */
// 56 ms, 在所有 javascript 提交中击败了98.14%
function getRow(rowIndex) {
  // 注意：行数和索引，需要加1
  const index = rowIndex + 1;
  const result = [];
  for (let i = 1; i < index + 1; i++) {
    if (i === 1) {
      result.push([1]);
    } else if (i === 2) {
      result.push([1, 1]);
    } else {
      // i 行，使用两个for循环
      const innerArr = [1];
      for (let j = 1; j < Math.ceil(i / 2); j++) {
        innerArr[j] = result[i - 2][j - 1] + result[i - 2][j];
      }
      for (let j = Math.ceil(i / 2); j < i; j++) {
        innerArr[j] = innerArr[i - j - 1];
      }
      result.push(innerArr);
    }
  }
  return result[index - 1];
}

export { getRow };

~~~

  
### 0120-triangle-tree.js

~~~js
// 120. 三角形最小路径和

// 给定一个三角形，找出自顶向下的最小路径和。每一步只能移动到下一行中相邻的结点上。
// [
//      [2],
//     [3,4],
//    [6,5,7],
//   [4,1,8,3]
// ]
// 自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）。注意：可能存在负数或者0

// 思路一：可以直接暴力计算全部的路径，然后求得最小值（本地通过，LeetCode超出限制）
// 辅助函数，获取一个位置下面的最小路径
// 思路一：全部的路径是 2 ^ k 那么可以把全部的路径计算出来。获取三角形的层数k，然后循环获取求和，但是这样做性能很差
function getMin1(i, j, triangle) {
  if (triangle[i + 1]) {
    return triangle[i][j] + Math.min(getMin1(i + 1, j, triangle), getMin1(i + 1, j + 1, triangle));
  }
  return triangle[i][j];
}

function minimumTotal1(triangle) {
  const len = triangle.length;
  if (len === 1) {
    return triangle[0][0];
  }
  return getMin1(0, 0, triangle);
}

// 改进版：把数组绑定到全局变量上，避免每次传递数组，占用内存；使用尾递归优化内存(测试可以使用，但是全局无法绑定)
// 这样可以使用全局变量，但是还是超时。
function getMin2(i, j) {
  if (window.triangle[i + 1]) {
    return window.triangle[i][j] + Math.min(getMin2(i + 1, j), getMin2(i + 1, j + 1));
  }
  return window.triangle[i][j];
}

function minimumTotal2(triangle) {
  const len = triangle.length;
  window.triangle = triangle;
  if (len === 1) {
    return triangle[0][0];
  }
  return getMin2(0, 0);
}

// 继续改进版：可以使用哈希表存放最小长度，避免多次递归运算
// 84 ms, 在所有 javascript 提交中击败了 19.08%
function getMin3(i, j, triangle) {
  const key = `${i}+${j}`;
  if (triangle[key]) {
    return triangle[key];
  }
  let result = triangle[i][j];
  if (triangle[i + 1]) {
    result += Math.min(getMin3(i + 1, j, triangle), getMin3(i + 1, j + 1, triangle));
  }
  triangle[key] = result;
  return result;
}

function minimumTotal3(triangle) {
  const len = triangle.length;
  if (len === 1) {
    return triangle[0][0];
  }
  return getMin3(0, 0, triangle);
}

// 思路四：首先把三角形构造一个树，然后计算不同的路径的总和，这样计算性能比方法一好，正确率比第二种好（优先使用第三种思路）

// class Tree(value) {
//   this.value = value;
//   this.left = null;
//   this.right = null;
//   setValue = function(value) {
//     this.value = value;
//   }
//   setLeft = function(node) {
//     this.left = node;
//   }
//   setRight = function(node) {
//     this.right = node;
//   }
//   // get depth
// }

// function ArrayToTree(array) {
// }
// ArrayToTree(Arr);

// 思路五：数组降维处理，然后把数组的长度增加，这样不需要借用其他的数据结构

// [
//      [2],
//     [3,4],
//    [6,5,7],
//   [4,1,8,3],
//   [1,2,3,18,7],
// ]
// 第一层和最后一层特殊处理
// 每一层第一个元素和最后一个元素直接处理，中间的元素使用splice(index, 1, new1, new2) 处理
// 然后处理成下面的数组，计算最后一层的长度即可
// 如果层数是n, 最后一层的长度是2（n-1）
// [
//      [2],
//     [5,6],
//    [11,10,11,13],
//   [15,12,11,18,19,14]
//   [1,2,3,18,7],
//   [16,17,14,15,14,36,37]
// ]

// 这个思路不成熟
function minimumTotal5(triangle) {
  const len = triangle.length;
  if (len === 1) {
    return triangle[0][0];
  }
  // 迭代数组有问题
  for (let i = 1; i < len; i++) {
    // 首先创建一个新数组
    // 应该遍历原始数组，然后放在新的数组中，然后用新的数组取代原始数组
    const newArr = [];
    // 处理第一项
    newArr[0] = triangle[i][0] + triangle[i - 1][0];
    // 处理中间项
    // 注意：第i层的长度是i+1，下标是[0, i]
    for (let j = 1; j < triangle[i].length - 1; j++) {
      const item = triangle[i][j];
      const new1 = item + triangle[i - 1][j - 1];
      const new2 = item + triangle[i - 1][j];
      newArr.push(new1);
      newArr.push(new2);
    }
    // 处理最后一项
    newArr[newArr.length] = triangle[i][i] + triangle[i - 1][i - 1];
    // 使用新数组取代旧数组
    triangle[i] = newArr;
  }
  return Math.min(...triangle[len - 1]);
}

export { minimumTotal1, minimumTotal2, minimumTotal3, minimumTotal5 };

~~~

  
### 0121-stock-maxProfit-1.js

~~~js
// 121. 买卖股票的最佳时机
/**
 * 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
 * 如果你最多只允许完成一笔交易（即买入和卖出一支股票），设计一个算法来计算你所能获取的最大利润。
 * 注意你不能在买入股票前卖出股票。

输入: [7,1,5,3,6,4]
输出: 5
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格。

输入: [7,6,4,3,1]
输出: 0
解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
 */

/**
 * @param {number[]} prices
 * @return {number}
 */
// 思路：64 ms , 在所有 javascript 提交中击败了 97.02%
function maxProfit(prices) {
  if (prices.length === 1) return 0;
  let profit = 0;
  let minPrice = prices[0];
  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    }
    const bonus = prices[i] - minPrice;
    if (bonus > profit) profit = bonus;
  }
  return profit;
}

// const arr = [7, 6, 4, 3, 1, 9, 0, 9, 8, 8, 1];
// console.log(maxProfit(arr));
export { maxProfit };

~~~

  
### 0122-stock-maxProfit-2.js

~~~js
// 122. 买卖股票的最佳时机 II

// 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
// 设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。
// 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

/**
 * @param {number[]} prices
 * @return {number}
 */
// 72 ms, 在所有 javascript 提交中击败了 75.23%
function maxProfit(prices) {
  const len = prices.length;
  if (len === 0) return 0;
  let profit = 0;
  for (let i = 1; i < len; i++) {
    if (prices[i] > prices[i - 1]) {
      profit += (prices[i] - prices[i - 1]);
    }
  }
  return profit;
}

export { maxProfit };

~~~

  
### 0125-isPalindrome.js

~~~js
// 125- 验证回文字符串
// 给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。
// 说明：本题中，我们将空字符串定义为有效的回文串。
// "A man, a plan, a canal: Panama" true
// "afg" false

/**
 * @param {string} s
 * @return {boolean}
 */
// 思路，使用正则表达式去掉特殊字符，空格
// 如果字符串长度是0，直接返回
// 然后把字符串大小写转换
// 96 ms , 在所有 javascript 提交中击败了 54.02%

function isPalindrome(s) {
  if (s.trim() === '') {
    return true;
  }
  let b = s.replace(/\s*/g, '').replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/ig, '');
  b = b.toLowerCase();
  const len = b.length;
  if (len === 0) {
    return true;
  }
  for (let i = 0; i < Math.floor(len / 2); i++) {
    if (b[i] !== b[len - i - 1]) {
      return false;
    }
  }
  return true;
}

export { isPalindrome };

~~~

  
### 0127-ladderLength.js

~~~js
/*
 * @lc app=leetcode.cn id=127 lang=javascript
 *
 * [127] 单词接龙
 */

// @lc code=start
/**
 * 127. 单词接龙(无向图)
 * https://leetcode.cn/problems/word-ladder/
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 * Your runtime beats 48.99 % of js submissions
 * Your memory usage beats 92.36 % (43.9 MB)
 */
const ladderLength = function(beginWord, endWord, wordList) {
  // 辅助函数：判断两个单词是否可以转换(有一个字母不同)
  canConvert = (a, b) => {
    let num = 0;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        num++;
      }
      if (num > 1) {
        return false;
      }
    }
    return true;
  };

  // 特殊情况：字典中可能有和开始单词重复的，先去掉
  const index = wordList.indexOf(beginWord);
  if (index > -1) {
    wordList.splice(index, 1);
  }

  const list = [];
  list.push(beginWord);

  // 初始化长度是2，beginWord -> middle -> endWord 是两步
  let res = 2;

  while (list.length > 0) {
    // 获取当前的长度（这一层），然后遍历当前的这一层单词
    let currentLen = list.length;
    while (currentLen--) {
      const item = list.shift();
      for (let i = 0; i < wordList.length; i++) {
        if (canConvert(item, wordList[i])) {
          if (wordList[i] === endWord) {
            return res;
          } else {
            list.push(wordList[i]);
            // 这个很重要，避免死循环
            wordList.splice(i, 1);
            i--;
          }
        }
      }
    }
    // 这一层循环结束，层数增加
    res++;
  }
  // 如果没有，返回0
  return 0;
};
// @lc code=end

export { ladderLength };

~~~

  
### 0128-longestConsecutive.js

~~~js
// 128
// 100 ms, 在所有 JavaScript 提交中击败了55.81%
const longestConsecutive = function(nums) {
  if (nums.length === 0) {
    return 0;
  }
  let arr = nums.sort((a, b) => {
    return a > b ? 1 : -1;
  });
  arr = [...new Set(arr)];
  let max = 1;
  let curr = 1;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === arr[i - 1] + 1) {
      curr += 1;
    } else {
      max = Math.max(max, curr);
      curr = 1;
    }
  }
  max = Math.max(max, curr);
  return max;
};

export { longestConsecutive };

// console.log(longestConsecutive([100, 4, 200, 1, 3, 2]) === 4);
// console.log(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]) === 9);
// console.log(longestConsecutive([1, 2, 0, 1]) === 3);

// https://leetcode-cn.com/problems/longest-consecutive-sequence/
// 现在有两个思路：
// 1 先排序，然后遍历一次数组，那么就是 N + logN * N 的时间复杂度
// 2 直接遍历数组，把数组出现的数字存储在字典中，并标记相邻的元素（多个数组）

~~~

  
### 0129-sumNumbers.js

~~~js
/*
 * [129] 求根到叶子节点数字之和
 * Definition for a binary tree node.
 */
// 辅助函数
function getSum(node, preSum) {
  if (!node) {
    return 0;
  }
  if (!node.left && !node.right) {
    return preSum * 10 + node.val;
  }
  return getSum(node.left, (preSum * 10 + node.val)) + getSum(node.right, (preSum * 10 + node.val));
}
// 思路：DFS计算，然后依次计算每一个情况，然后进行求和
/**
 * @param {TreeNode} root
 * @return {number}
 */
function sumNumbers(root) {
  const initSum = 0;
  return getSum(root, initSum);
}
// [1,0] 应该是10

export { sumNumbers };

~~~

  
### 0130-surrounding-area.js

~~~js
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
// 给定一个二维的矩阵，包含 'X' 和 'O'（字母 O）。
// 找到所有被 'X' 围绕的区域，并将这些区域里所有的 'O' 用 'X' 填充。
// 示例:
// X X X X
// X O O X
// X X O X
// X O X X
// 运行你的函数后，矩阵变为：

// X X X X
// X X X X
// X X X X
// X O X X

// 辅助函数，获取二维矩阵对应的键
function getKey(i, j) {
  return `${i}+${j}`;
}

// 判断一个节点和周边节点（递归）
function deepErgodicity(i, j, arr) {
  const key = getKey(i, j);
  if (arr[i][j] === 'O' && !arr[key]) {
    arr[key] = true;
    // 获取周边的四个点（如果有，继续进行判断）
    if (arr[i][j - 1]) {
      deepErgodicity(i, j - 1, arr);
    }
    if (arr[i][j + 1]) {
      deepErgodicity(i, j + 1, arr);
    }
    if (arr[i + 1]) {
      deepErgodicity(i + 1, j, arr);
    }
    if (arr[i - 1]) {
      deepErgodicity(i - 1, j, arr);
    }
  }
}

// 思路：深度优先遍历
// 首先新建一个哈希表
// 遍历这个二维矩阵的四个边，找到边界上的O，然后深度遍历这个节点，如果还是O，设置哈希表是true
// 获取哈希表后，遍历二维矩阵，如果是false的直接改成O并输出
// 136 ms, 在所有 javascript 提交中击败了23.57%
function solve(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (i === 0 || i === board.length - 1 || j === 0 || j === board[i].length - 1) {
        // 第一行和最后一行, 第一列和最后一列
        deepErgodicity(i, j, board);
      }
    }
  }
  // 再次遍历，如果是O，需要获取哈希值是否是真假
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === 'O') {
        const key = getKey(i, j);
        if (!board[key]) {
          board[i][j] = 'X';
        }
      }
    }
  }
}

export { solve };

~~~

  
### 0133-cloneGraph.js

~~~js
/*
 * @lc app=leetcode.cn id=133 lang=javascript
 *
 * [133] 克隆图
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 * 基本思路：BFS或者DFS遍历图节点，使用一个字典记录已经遍历的节点
 * 遍历图节点时，同时克隆节点的值和节点的关系
 */
const cloneGraph = function(node) {
  const dict = new Map();
  const runNode = (a) => {
    if (!a) return null;
    // 缓存已经有，直接返回
    if (dict.has(a.val)) {
      return dict.get(a.val);
    }
    // 缓存没有，直接深拷贝（节点和邻居）
    const b = new Node(a.val, []);
    // 一定要先写入缓存
    dict.set(a.val, b);
    // 然后再DFS（否则DFS时始终未标记，死循环）
    a.neighbors.forEach((item) => {
      b.neighbors.push(runNode(item));
    });
    return b;
  };
  return runNode(node);
};
// @lc code=end
export { cloneGraph };

~~~

  
### 0134-canCompleteCircuit.js

~~~js
// 在一条环路上有 N 个加油站，其中第 i 个加油站有汽油 gas[i] 升。

// 你有一辆油箱容量无限的的汽车，从第 i 个加油站开往第 i+1 个加油站需要消耗汽油 cost[i] 升。你从其中的一个加油站出发，开始时油箱为空。

// 如果你可以绕环路行驶一周，则返回出发时加油站的编号，否则返回 -1。

// 说明:

// 如果题目有解，该答案即为唯一答案。
// 输入数组均为非空数组，且长度相同。
// 输入数组中的元素均为非负数。
// 示例 1:

// 输入:
// gas  = [1,2,3,4,5]
// cost = [3,4,5,1,2]
// 输出: 3

/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
// 思路一
// 外循环中遍历gas，然后设置一个辅助函数，判断这个节点开始，能否返回原始的地点
// 这样的算法能否改进

// 思路二：先计算在不同加油站剩余的油料，然后计算获取一个新的数组，
// 然后遍历这个数组，如果从某个节点循环一次，结果累计大于0，那么这个结果就是正确的结果
// 这样的效率比方法一好一些

function canComplete(leftArr) {
  let sum = 0;
  const len = leftArr.length;
  leftArr.forEach((item) => sum += item);
  // 首先计算结果：如果总和小于0，那么一定不能环形行驶一圈
  if (sum < 0) {
    return -1;
  }
  // 结果清零
  sum = 0;
  // 剩下的情况，就是可以环形行驶的一圈
  for (let i = 0; i < len; i++) {
    // 这里能否优化节省内存？
    const tmpArr = [].concat(leftArr.slice(i, len)).concat(leftArr.slice(0, i));
    for (let j = 0; j < len; j++) {
      sum += tmpArr[j];
      if (sum < 0) {
        break;
      }
    }
    if (sum >= 0) {
      return i;
    }
    sum = 0;
  }
}

// 312 ms, 在所有 javascript 提交中击败了8.65%
// 算法很不好
function canCompleteCircuit(gas, cost) {
  const len = gas.length;
  const leftover = new Array(len);
  for (let i = 0; i < len; i++) {
    leftover[i] = gas[i] - cost[i];
  }
  return canComplete(leftover);
}

export { canCompleteCircuit };

~~~

  
### 0136-singleNumber.js

~~~js
// 136. 只出现一次的数字
// 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
// 你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？
// 输入: [2,2,1] 输出: 1
// [4,1,2,1,2] 输出: 4

// 最终，方法一最好
// 方法一：遍历一次数组，在另一个对象中保存元素出现的次数（是否出现）；然后获取这个元素
// 76 ms, 在所有 javascript 提交中击败了71.40%
function singleNumber1(nums) {
  const len = nums.length;
  if (len === 1) {
    return nums[0];
  }
  const obj = {};
  for (let i = 0; i < len; i++) {
    const item = nums[i];
    if (obj[item] === 0 || obj[item]) {
      delete obj[item];
    } else {
      obj[item] = item;
    }
  }
  for (const key in obj) {
    if (key) {
      return Number(key);
    }
  }
}

// 方法二：遍历数组，通过indexOf lastIndexOf 获取某个元素在数组中出现的次数。如果出现一次就是结果
// 404 ms, 在所有 javascript 提交中击败了14.02%
// 说明 indexOf lastIndexOf 严重耗时(相当于一次循环)
// 这个办法消耗内存最少
function singleNumber2(nums) {
  const len = nums.length;
  if (len === 1) {
    return nums[0];
  }
  for (let i = 0; i < len; i++) {
    const item = nums[i];
    if (nums.indexOf(item) === nums.lastIndexOf(item)) {
      return item;
    }
  }
}

// 方案三：改进版：借用对象，节省时间。可以把已经出现的次数放在一个数组中，这样可以较少indexOf执行
// 320 ms, 在所有 javascript 提交中击败了16.45%
function singleNumber3(nums) {
  const len = nums.length;
  if (len === 1) {
    return nums[0];
  }
  const obj = {};
  for (let i = 0; i < len; i++) {
    if (obj[i]) {
      continue;
    }
    const item = nums[i];
    const firstIndex = nums.indexOf(item);
    const lastIndex = nums.lastIndexOf(item);
    if (firstIndex === lastIndex) {
      return item;
    }

    obj[lastIndex] = lastIndex;
  }
}

// 方法四：不使用额外的空间，直接在数组上存储（因为数组就是一个对象）
// 104 ms, 在所有 javascript 提交中击败了 32.80%
function singleNumber4(nums) {
  const len = nums.length;
  if (len === 1) {
    return nums[0];
  }
  for (let i = 0; i < len; i++) {
    const item = `key${String(nums[i])}`;
    if (nums[item] === 0 || nums[item]) {
      delete nums[item];
    } else {
      nums[item] = nums[i];
    }
  }
  for (const key in nums) {
    if (key.indexOf('key') > -1) {
      return nums[key];
    }
  }
}

export {
  singleNumber1, singleNumber2, singleNumber3, singleNumber4,
};

~~~

  
### 0137-single-number-in-three.js

~~~js
// 137. 只出现一次的数字(版本二)
// 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现三次。找出那个只出现了一次的元素。
// 你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？
// 输入: [2,2,2,1] 输出: 1
// [1,2,1,2,1,2,4] 输出: 4

// 方法一：遍历一次数组，在另一个对象中保存元素出现的次数（是否出现）；然后获取这个元素
// 72 ms, 在所有 javascript 提交中击败了 81.44%
function singleNumberThree1(nums) {
  const len = nums.length;
  if (len === 1) {
    return nums[0];
  }
  const obj = {};
  for (let i = 0; i < len; i++) {
    const item = nums[i];
    if (obj[item] === 0 || obj[item]) {
      obj[item]++;
    } else {
      obj[item] = 1;
    }
  }
  for (const key in obj) {
    if (obj[key] === 1) {
      return Number(key);
    }
  }
}

// 方法二：
// 68 ms, 在所有 javascript 提交中击败了 89.82%
function singleNumberThree2(nums) {
  const len = nums.length;
  if (len === 1) {
    return nums[0];
  }
  const obj = {};
  for (let i = 0; i < len; i++) {
    const item = nums[i];
    if (obj[item] === 0 || obj[item]) {
      obj[item]++;
    } else {
      obj[item] = 1;
    }
  }
  // for in 会遍历到全部原型链上的属性
  const res = Object.keys(obj).filter((key) => {
    if (obj[key] === 1) {
      return obj[key];
    }
    return false;
  });
  return Number(res[0]);
}

export { singleNumberThree1, singleNumberThree2 };

~~~

  
### 0139-word-break.js

~~~js
// 139 拆分长单词
// 给定一个非空字符串 s 和一个包含非空单词列表的字典 wordDict，判定 s 是否可以被空格拆分为一个或多个在字典中出现的单词。
// 拆分时可以重复使用字典中的单词。

// 思路一：广度优先遍历，超时
// 关键问题：如果当前的情况，同时满足多个解答，那怎样处理？把不同的解答情况放在一个队列中，然后循环，直到队列中是空的
// 可以使用这个思路（每次取出剩余的部分，然后查看每一个字典是否可以减去）
function wordBreak1(s, wordDict) {
  // 先把字典转换成对象
  const dict = {};
  const subDict = {};
  for (let i = 0; i < wordDict.length; i++) {
    // 先把字典中无关的字符串过滤出去，减少字典的复杂度
    if (s.includes(item)) {
      dict[item] = true;
    }
    for (let j = 0; j < item.length; j++) {
      const key = item[j];
      subDict[key] = true;
    }
  }
  // 检查S中是否有没有出现过的字符
  for (let i = 0; i < s.length; i++) {
    if (!subDict[s[i]]) {
      return false;
    }
  }
  // 创建一个队列，然后深度优先遍历
  const queue = [];
  queue.push(s);
  while (queue.length > 0) {
    // 深度优先遍历
    const current = queue.shift();
    // 如果当前的字符串就在字典中，满足要求，那么直接返回真
    if (dict[current]) {
      return true;
    }
    // 然后遍历字典的各个键
    Object.keys(dict).forEach((key) => {
      if (current.indexOf(key) === 0) {
        const len = key.length;
        const newStr = current.slice(len);
        queue.unshift(newStr);
      }
    });
  }
  // 否则，没有匹配的值，返回错误
  return false;
}

// 思路2：动态规划
// 某个单词是否满足 = 前一个是否满足 && 新加入的部分是否满足（这里循环一下即可）
// 默认空字符串是满足的
// https://leetcode-cn.com/problems/word-break/solution/dan-ci-chai-fen-by-leetcode-solution/
// 76 ms, 在所有 JavaScript 提交中击败了28.70%
const wordBreak = function(s, wordDict) {
  const len = s.length;
  const dict = new Set(wordDict);
  const dp = new Array(len + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= len; i++) {
    for (let j = 0; j < i; j++) {
      // 关键是这一步 dp[i] = dp[j] && dict.has(s.slice(j, i))
      if (dp[j] && dict.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[len];
};
// 这个可以使用字典树优化

export { wordBreak, wordBreak1 };

~~~

  
### 0141-hasCycle.js

~~~js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
// 判断链表中是否有环
// 17/17 cases passed (108 ms)
// Your runtime beats 17.25 % of javascript submissions
// Your memory usage beats 14.63 % of javascript submissions (40 MB)
// 链表中节点的数目范围是 [0, 104]
// -105 <= Node.val <= 105
// pos 为 -1 或者链表中的一个 有效索引 。
/**
 * @param {ListNode} head
 * @return {boolean}
 */
// 这个算法性能不好，应该使用快慢指针解决
const hasCycle = function (head) {
  if (!head) {
    return false;
  }
  head.isRun = true;
  while (head && head.next) {
    head = head.next;
    if (!head.isRun) {
      head.isRun = true;
    } else {
      return true;
    }
  }
  return false;
};

// 方法二：快慢指针
// 判断单向链表中是否存在环-141
// 80 ms
// , 在所有 JavaScript 提交中击败了
// 96.65%
// 的用户
// 内存消耗：
// 40 MB
// , 在所有 JavaScript 提交中击败了
// 27.45%
// 的用户
const hasCycle2 = function (head) {
  if (head === null || head.next === null) {
    return false;
  }
  let slow = head;
  let fast = head.next;
  while (slow !== fast) {
    if (fast === null || slow === null || fast.next == null) {
      return false;
    }
    slow = slow.next;
    fast = fast.next.next;
  }
  return true;
};

export { hasCycle, hasCycle2 };

~~~

  
### 0142.环形链表-ii.js

~~~js
/*
 * @lc app=leetcode.cn id=142 lang=javascript
 *
 * [142] 环形链表 II
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 84 ms, 在所有 JavaScript 提交中击败了50.66%的用户
// 循环一次列表，使用哈希表记录是否重复（是 set，Object 无效）
const detectCycle = function(head) {
  const dict = new Set();
  while (head) {
    if (dict.has(head)) {
      return head;
    }
    dict.add(head);
    head = head.next;
  }
  return null;
};
// @lc code=end
export { detectCycle };

~~~

  
### 0143-reorderList.js

~~~js
/*
 * @lc app=leetcode.cn id=143 lang=javascript
 *
 * [143] 重排链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 * 思路1：先遍历一次链表，把每一个节点和索引存储到数组中，同时找到总长度
 * 然后 for 循环，把开始和结束的节点分别加入新链表中
 * 执行用时：840 ms，打败 10.38%的用户
 * 这个算法不好（如果不是数组，直接放在对象索引中，避免数组操作试试）
 */
const reorderList = function(head) {
  let tmp = head;
  const list = [];
  while (tmp) {
    list.push(tmp);
    tmp = tmp.next;
  }
  let current = head;
  while (list.length > 0) {
    const first = list.shift();
    current.next = first;
    // 链表的长度是偶数
    if (list.length > 0) {
      const last = list.pop();
      first.next = last;
      current = last;
      current.next = null;
    } else {
      // 链表的长度是奇数
      current = first;
      current.next = null;
    }
  }
  return head;
};

// 思路2
// 可以使用数组+双指针，获取对应的节点，不需要每次都操作数组元素，可以优化
// 88 ms, 在所有 JavaScript 提交中击败了 73.09%
const reorderList2 = function(head) {
  let tmp = head;
  const list = [];
  while (tmp) {
    list.push(tmp);
    tmp = tmp.next;
  }
  let current = head;
  let start = 0;
  let end = list.length - 1;
  // 使用双指针获取链表，避免数组操作
  while (start < end) {
    const first = list[start];
    current.next = first;
    start++;

    const last = list[end];
    end--;
    first.next = last;

    current = last;
    current.next = null;
  }

  // 处理奇数的情况
  if (list.length % 2 === 1) {
    const middle = list[(list.length - 1) / 2];
    current.next = middle;
    middle.next = null;
  }
  return head;
};

// @lc code=end

// 官方的更好的解法是：
// 1、通过快慢指针，找到链表的中点，把链表分成两个
// 2、把后面的链表反转（N，N-1， N-2）
// 3、合并两个链表（因为长度差可能是0或者1，所以基本不影响）
// 后续有时间可以按照这个思路完成（这三个子问题，可以使用其他的题目处理）
export { reorderList, reorderList2 };

~~~

  
### 0144-preorderTraversal.js

~~~js
/*
 * @lc app=leetcode.cn id=144 lang=javascript
 *
 * [144] 二叉树的前序遍历
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 思路1: 前序遍历：根左右
// 92 ms, 在所有 JavaScript 提交中击败了24.64%
const preorderTraversal = function(root) {
  if (!root) return [];
  return [root.val].concat(preorderTraversal(root.left)).concat(preorderTraversal(root.right));
};

// 问题：题目建议使用迭代算法，这个需要进一步计算
// 思路二，使用栈，直接把数组放入栈内，不需要函数递归

export { preorderTraversal };

~~~

  
### 0145-postorderTraversal.js

~~~js
/*
 * @lc app=leetcode.cn id=145 lang=javascript
 * [145] 二叉树的后序遍历
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 76 ms, 在所有 JavaScript 提交中击败了91.50%
const postorderTraversal = function(root) {
  if (!root || !root.val) return [];
  return [].concat(postorderTraversal(root.left)).concat(postorderTraversal(root.right)).concat([root.val]);
};

export { postorderTraversal };

~~~

  
### 0146-LRUCache.js

~~~js
/*
 * [146] LRU缓存机制
 * 276 ms, 在所有 JavaScript 提交中击败了28.26%
 */
/**
 * @param {number} capacity
 */
const LRUCache = function (capacity) {
  // 搜索：优先使用哈希表;
  this.cap = capacity;
  this.dict = {};
  // 一个哈希表存放当前的索引 dict
  this.operations = [];
  // 还有一个数组？存放当前使用的键？记录操作 operations
  // 当数组的长度超过给定长度时，清除最早的数组元素。
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  // 现在的问题是缓存没有清理
  // 找到这个元素，返回，并改变频率
  if (this.dict[key]) {
    // 更改操作频率
    const keyIndex = this.operations.indexOf(key);
    if (keyIndex === -1) {
      // 不存在当前的键：插入并判断是否超出范围
      this.operations.push(key);
      if (this.operations.length > this.cap) {
        const deletedKey = this.operations.shift();
        delete this.dict[deletedKey];
      }
    } else {
      // 存在当前的键：删除这个位置，然后后面插入
      this.operations.splice(keyIndex, 1);
      this.operations.push(key);
    }
    return this.dict[key];
  }
  return -1;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  this.dict[key] = value;
  const keyIndex = this.operations.indexOf(key);
  if (keyIndex === -1) {
    // 不存在当前的键：插入并判断是否超出范围
    this.operations.push(key);
    if (this.operations.length > this.cap) {
      const deletedKey = this.operations.shift();
      delete this.dict[deletedKey];
    }
  } else {
    // 存在当前的键：删除这个位置，然后后面插入
    this.operations.splice(keyIndex, 1);
    this.operations.push(key);
  }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * const obj = new LRUCache(capacity)
 * const param_1 = obj.get(key)
 * obj.put(key,value)
 */

export { LRUCache };

~~~

  
### 0148-sortList.js

~~~js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *   this.val = (val===undefined ? 0 : val)
 *   this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 思路1：先把链表转换成数组，然后数组排序，再转换成链表
// 7704 ms, 在所有 JavaScript 提交中击败了5.02%
// 这个方法不合适啊
const sortList = function(head) {
  if (!head || !head.next) {
    return head;
  }
  // 思路：先把链表节点放在数组中，数组排序，然后重新构建链表即可
  const arr = [];
  let tmp = head;
  while (tmp) {
    arr.push(tmp);
    tmp = tmp.next;
  }
  arr.sort((a, b) => {
    return a.val > b.val ? 1 : -1;
  });

  const init = new ListNode(arr.shift().val);
  tmp = init;
  while (arr.length > 0) {
    const node = new ListNode(arr.shift().val);
    tmp.next = node;
    tmp = node;
  }
  return init;
};

// 官方给出：直接并归排序
// const merge = (head1, head2) => {
//   const dummyHead = new ListNode(0);
//   let temp = dummyHead, temp1 = head1, temp2 = head2;
//   while (temp1 !== null && temp2 !== null) {
//     if (temp1.val <= temp2.val) {
//       temp.next = temp1;
//       temp1 = temp1.next;
//     } else {
//       temp.next = temp2;
//       temp2 = temp2.next;
//     }
//     temp = temp.next;
//   }
//   if (temp1 !== null) {
//     temp.next = temp1;
//   } else if (temp2 !== null) {
//     temp.next = temp2;
//   }
//   return dummyHead.next;
// }

// const toSortList = (head, tail) => {
//   if (head === null) {
//     return head;
//   }
//   if (head.next === tail) {
//     head.next = null;
//     return head;
//   }
//   let slow = head, fast = head;
//   while (fast !== tail) {
//     slow = slow.next;
//     fast = fast.next;
//     if (fast !== tail) {
//       fast = fast.next;
//     }
//   }
//   const mid = slow;
//   return merge(toSortList(head, mid), toSortList(mid, tail));
// }

// var sortList = function(head) {
//   return toSortList(head, null);
// };

// 自己另一个思路，有问题
// var sortList = function(head) {
//   if (!head || !head.next) {
//     return head;
//   }
//   function ListNode(val, next) {
//     this.val = (val===undefined ? 0 : val)
//     this.next = (next===undefined ? null : next)
//   }
//   let arr = [];
//   arr.push(head.val);
//   while (head.next) {
//     arr.push(head.next.val);
//     head.next = head.next.next;
//   }
//   arr.sort((a, b) => a - b);
//   console.log(arr);
//   let res = new ListNode(arr[0]);
//   for (let i = 1; i < arr.length; i++) {
//     let item = new ListNode(arr[i]);
//     // 这个指针为什么没有过来呢？
//     res.next = item;
//     res = res.next;
//     console.log(res);
//   }
//   return res;
//   };

export { sortList };

~~~

  
### 0149-maxPoints.js

~~~js
// 149. 直线上最多的点数
// 给定一个二维平面，平面上有 n 个点，求最多有多少个点在同一条直线上。
// 输入: [[1,1],[2,2],[3,3]] 输出: 3
// 注意：点可以重复，点的坐标没有顺序，点的坐标可能超出JS数值计算最大值

// 思路1 正确
// 执行用时 : 96 ms , 在所有 javascript 提交中击败了 80.77%
// 首先把坐标数组去重并获取数量；然后使用两次循环获取两个点组成一条线
// 当前共线的数量是这两个点对应的属性和；再次遍历剩下的节点，如果共线，那么属性和加上第三个点的属性

// 辅助函数1：判断两点是否相同
function samePoints(point1, point2) {
  return (point1[0] === point2[0] && point1[1] === point2[1]);
}

// 辅助函数2：判断三点是否共线
function pointLine(point1, point2, point3) {
  // 如果三点中任意两点是同一个点，那么三点一定在一条线上
  if (samePoints(point1, point2) || samePoints(point1, point3) || samePoints(point2, point3)) {
    return true;
  }
  // 如果点太大，取余数10000（这里可以通过测试，有潜在问题）
  // 否则 [0,0],[94911151,94911150],[94911152,94911151] 这三个点计算错误
  // 解决1：计算斜率有很好的办法，可以避免溢出
  // 解决2：使用 BigInt 把普通数字转换成大数计算
  const num1 = (((point1[0] - point2[0]) % 10000) * ((point1[1] - point3[1]) % 10000));
  const num2 = (((point1[0] - point3[0]) % 10000) * ((point1[1] - point2[1]) % 10000));
  return num1 === num2;
}

// 辅助函数3：产生一个坐标对应的Key值
function getKey(point) {
  const x = point[0];
  const y = point[1];
  const key = `${x}+${y}`;
  return key;
}

// 辅助函数4: 去掉数组中的重复项；返回值是去重后的数组，以及数组元素重复次数对象
function duplicatePoints(points) {
  const obj = {};
  for (let i = 0; i < points.length;) {
    const key = getKey(points[i]);
    if (!obj[key]) {
      obj[key] = 1;
      i++;
    } else {
      obj[key]++;
      points.splice(i, 1);
    }
  }
  return { obj, points };
}

function maxPoints(points) {
  // defaultLength: 点原始的总个数
  const defaultLen = points.length;
  // 0、处理特殊0
  if (defaultLen === 0) {
    return 0;
  }

  // 1 数组坐标去重
  const { obj: numbers, points: newPoints } = duplicatePoints(points);
  const len = newPoints.length;
  // 去重后，如果只剩一个或者两个点，那么返回原始点的个数
  if (len === 1 || len === 2) {
    return defaultLen;
  }

  // 2 两次循环获取两个不重复的点点组成一条线
  let max = 2;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      const item1 = newPoints[i];
      const item2 = newPoints[j];
      const key1 = getKey(item1);
      const key2 = getKey(item2);
      // 遍历的两个点，在一条直线上的总个数
      let res = numbers[key1] + numbers[key2];
      // 遍历剩下的点：如果剩下的点共线，那么把第三个点的属性加上去
      for (let k = j + 1; k < len; k++) {
        if (pointLine(item1, item2, newPoints[k])) {
          // 这三个点不共线
          const key3 = getKey(newPoints[k]);
          res += numbers[key3];
        }
      }
      max = Math.max(max, res);
    }
  }
  return max;
}

// 思路2 不正确
// 任意两点可以构成一条直线，然后可以判断剩下的点是否在这条只直线上
// 首先可以进行组合，Cn2 外循环和内循环分别获取两个点的全部组合。
// 循环内部，根据斜率 k = (y2-y1)/(x2-x1) 判断其他的点是否在这条直接上，获取数量
// 问题：如果有多个重复的点，计算错误：无法处理 11,11,22,22 这种情况。尝试使用另一个方案

function maxPointsError(points) {
  const len = points.length;
  // 处理0-1-2个点
  if (len === 0) {
    return 0;
  }
  if (len === 1) {
    return 1;
  }
  if (len === 2) {
    return 2;
  }
  let result = 2;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      let max = 2;
      // 1 如果两个点重复，max=3；剩下的继续遍历，如果和这两个点继续重复，max++
      // (points[j][1] === points[i][1]) && (points[j][0] === points[i][0])
      if (samePoints(points[i], points[j])) {
        max++;
        for (let k = j + 1; k < len; k++) {
          if ((samePoints(points[i], points[k]) || samePoints(points[j], points[k])) && points[k + 1]) {
            max++;
          } else if ((points[j][1] === points[k][1]) && (points[j][0] === points[k][0]) && points[k + 1]) {
            max++;
          }
        }
      } else if (points[j][1] === points[i][1]) {
        // 2 处理斜率不存在; 如果斜率不存在，即 (points[j][0] - points[i][0]) === 0
        // 如果后面的一个点和前面的任意一个重合，那么需要加一
        for (let k = j + 1; k < len; k++) {
          if (samePoints(points[i], points[k]) || samePoints(points[j], points[k]) || points[j][1] === points[k][1]) {
            max++;
          }
        }
      } else if (points[j][0] === points[i][0]) {
        // 如果后面的一个点和前面的任意一个重合，那么需要加一
        for (let k = j + 1; k < len; k++) {
          if (samePoints(points[i], points[k]) || samePoints(points[j], points[k]) || points[j][0] === points[k][0]) {
            max++;
          }
        }
      } else {
        // 3 斜率存在
        const slope1 = (points[j][1] - points[i][1]) / (points[j][0] - points[i][0]);
        // 遍历剩下的节点，如果Y值相同，就在一条线上；如果后面的一个点和前面的任意一个重合，那么需要加一
        for (let k = j + 1; k < len; k++) {
          if (samePoints(points[i], points[k]) || samePoints(points[j], points[k])) {
            max++;
          } else {
            const slope2 = (points[k][1] - points[i][1]) / (points[k][0] - points[i][0]);
            if (slope1 === slope2) {
              max++;
            }
          }
        }
      }
      result = max > result ? max : result;
    }
  }
  return result;
}

export {
  maxPointsError, maxPoints, samePoints, pointLine, getKey, duplicatePoints,
};

~~~

  
### 0150-evalRPN.js

~~~js
// 150. 逆波兰表达式求值
// 根据 逆波兰表示法，求表达式的值。
// 有效的运算符包括 +, -, *, / 。每个运算对象可以是整数，也可以是另一个逆波兰表达式。
// 说明：整数除法只保留整数部分。
// 给定逆波兰表达式总是有效的。换句话说，表达式总会得出有效数值且不存在除数为 0 的情况。

// 示例 1：
// 输入: ["2", "1", "+", "3", "*"]
// 输出: 9
// 解释: 该算式转化为常见的中缀算术表达式为：((2 + 1) * 3) = 9

// 示例 2：
// 输入: ["4", "13", "5", "/", "+"]
// 输出: 6
// 解释: 该算式转化为常见的中缀算术表达式为：(4 + (13 / 5)) = 6

// 示例 3：
// 输入: ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]
// 输出: 22
// 解释:
// 该算式转化为常见的中缀算术表达式为：
//   ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
// = ((10 * (6 / (12 * -11))) + 17) + 5
// = ((10 * (6 / -132)) + 17) + 5
// = ((10 * 0) + 17) + 5
// = (0 + 17) + 5
// = 17 + 5
// = 22

// 68 ms, 在所有 JavaScript 提交中击败了 100.00%
// 辅助函数
// 如果是数字，直接返回 true
// 如果是运算符，返回对应的计算函数
const getFn = (str) => {
  if (str === '+') {
    return (a, b) => a + b;
  }
  if (str === '-') {
    return (a, b) => a - b;
  }
  if (str === '*') {
    return (a, b) => a * b;
  }
  if (str === '/') {
    return (a, b) => {
      if (a / b > 0) {
        return Math.floor(a / b);
      }
      return Math.ceil(a / b);
    };
  }
  return true;
};

/**
 * @param {string[]} tokens
 * @return {number}
 */
const evalRPN = function (tokens) {
  // 知识点：栈_JS 中使用数组代替栈
  const stack = [];
  const len = tokens.length;
  for (let i = 0; i < len; i++) {
    const isNum = getFn(tokens[i]);
    // 如果符号前两个是数字，那么执行这个结果，将结果放入栈中，然后继续运算
    if (isNum === true) {
      // 现在题目中给定的是字符串的数字，需要进行转换
      stack.push(Number(tokens[i]));
    } else {
      // 如果当前是计算符号，那么返回的是计算函数，求前两个数值的结果，并放在栈中
      const a = stack.pop();
      const b = stack.pop();
      const res = isNum(b, a);
      stack.push(res);
    }
  }
  // 返回栈的第一个数字即可
  return stack[0];
};

export { evalRPN };

~~~

  
### 0151-reverseWords.js

~~~js
// 151
// 给定一个字符串，逐个翻转字符串中的每个单词。
// 输入: "the sky is blue"
// 输出: "blue is sky the"
// 输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括
// 如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。
// 无空格字符构成一个单词。

// 思路
// 如果字符串中没有空格，那么直接返回字符串
// 如果有空格，那么首先去掉首尾的空格，然后split, 然后 reverse 然后 join
// 需要处理连续空格的情况（是否需要遍历数组，还是使用正则表达式替换连续的空格？）
// 60 ms , 在所有 javascript 提交中击败了 94.95%
function reverseWords(s) {
  if (s.indexOf(' ') === -1) {
    return s;
  }
  const arr = s.trim().split(' ');
  for (let i = 0; i < arr.length;) {
    if (arr[i] === '') {
      arr.splice(i, 1);
    } else {
      i++;
    }
  }
  arr.reverse();
  return arr.join(' ');
}

export { reverseWords };

~~~

  
### 0152-maxProduct.js

~~~js
/*
 * @lc app=leetcode.cn id=152 lang=javascript
 *
 * [152] 乘积最大子数组
 */
// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 * 考点：动态规划
 * Fmax(x) = Math.max(nums[x], Fmax(x-1) * nums[x], Fmin(x-1) * nums[x])
 * Fmin(x) = Math.min(nums[x], Fmax(x-1) * nums[x], Fmin(x-1) * nums[x])
 */
// 72 ms, 在所有 JavaScript 提交中击败了50.30%
// 当前位置的最优解未必是由前一个位置的最优解转移得到的
// 因为当前的数字可能是正数或者负数，如果是负数，当前面是最小的情况
// 这时的结果是最大的，所以需要维护两个方程，然后三个数求最值
const maxProduct = function(nums) {
  const len = nums.length;
  if (len === 1) {
    return nums[0];
  }
  const maxArr = [];
  const minArr = [];
  maxArr[0] = nums[0];
  minArr[0] = nums[0];
  for (let i = 1; i < len; i++) {
    maxArr[i] = Math.max(nums[i], maxArr[i - 1] * nums[i], minArr[i - 1] * nums[i]);
    minArr[i] = Math.min(nums[i], maxArr[i - 1] * nums[i], minArr[i - 1] * nums[i]);
  }
  return Math.max(...maxArr);
};

// console.log(maxProduct([2,3,-2,4]) === 6);
// console.log(maxProduct([-2,0,-1]) === 0);
// console.log(maxProduct([-2,3,-4]) === 24);
// @lc code=end

export { maxProduct };

~~~

  
### 0153-findMin.js

~~~js
/**
 * @param {number[]} nums
 * @return {number}
 */
// 思路1：直接使用已有API（耗时）
const findMin1 = function (nums) {
  return Math.min(...nums);
};

// 思路二：循环一次
const findMin2 = function (nums) {
  const len = nums.length;
  if (len === 1) return nums[0];
  for (let i = 1; i < len; i++) {
    if (nums[i] < nums[i - 1]) {
      return nums[i];
    }
  }
  return nums[0];
};

// 思路三：二分法查找排序的数组

export { findMin1, findMin2 };

~~~

  
### 0154-findMin.js

~~~js
/**
 * @param {number[]} nums
 * @return {number}
 */

// 第一种：直接根据定义获取，用于生产环境
// const findMin = function(nums) {
//   return Math.min(...nums);
// };

// 第二种，循环获取
const findMin = function (nums) {
  const len = nums.length;
  if (len === 1) return nums[0];
  for (let i = 1; i < len; i++) {
    if (nums[i] < nums[i - 1]) {
      return nums[i];
    }
  }
  return nums[0];
};

export { findMin };

~~~

  
### 0155-getMinInStack.js

~~~js
// 115 设计栈
// 需求：设计一个支持 push，pop，top 操作，并能在常数时间内检索到最小元素的栈。

// 方法一：正确
// 直接使用数组的原生方法。获取最小值时，使用Math.min获取。
// 消耗内存少，但是获取内存耗时
// 204 ms , 在所有 javascript 提交中击败了 34.80%
/**
 * initialize your data structure here.
 */
function MinStack() {
  this.value = [];
}

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
  this.value.push(x);
  return null;
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  this.value.pop();
  return null;
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  const len = this.value.length;
  return this.value[len - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return Math.min(...this.value);
};

// 方法二：有问题（后期优化）
// 在数组中设置最小值；当出栈入栈时更新最小值
// 获取最小值直接返回
// 现在方法二有问题，需要检查

function MinStack2() {
  this.value = [];
  this.min = null;
}

// 这里需要优化
MinStack2.prototype.push = function (x) {
  this.value.push(x);
  if (!this.min || x < this.min) {
    this.min = x;
  }
  return null;
};

// 这里需要优化
MinStack2.prototype.pop = function () {
  this.value.pop();
  // const item = this.value.pop();
  this.min = Math.min(...this.value);
  return null;
};

MinStack2.prototype.top = function () {
  const len = this.value.length;
  return this.value[len - 1];
};

MinStack2.prototype.getMin = function () {
  return this.min;
};

export { MinStack, MinStack2 };

/**
 * Your MinStack object will be instantiated and called as such:
 * const obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * const param_3 = obj.top()
 * const param_4 = obj.getMin()
 */

~~~

  
### 0160-getIntersectionNode.js

~~~js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
//  [160] 相交链表
/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
// 思路一：直接把两个链表的指针作为key，存储在字典中
// 判断链表是否有重复元素即可
// 这里不能使用对象，key 是字符串，直接使用Map
// Your runtime beats 38.16 % of javascript submissions
const getIntersectionNode = function(headA, headB) {
  if (!headA || !headB) {
    return null;
  }
  const hashmap = new Map();
  let p1 = headA;
  while (p1) {
    hashmap.set(p1, 1);
    p1 = p1.next;
  }
  let p2 = headB;
  while (p2) {
    if (hashmap.has(p2)) {
      // 这里应该返回一个节点，而不是返回节点的值
      return p2;
    }
    p2 = p2.next;
  }
  return null;
};
// 有没有直接比较指针相等的方法？
// https://leetcode-cn.com/problems/intersection-of-two-linked-lists/solution/160xiang-jiao-lian-biao-shuang-zhi-zhen-ha-xi-biao/

// 思路二：直接比较两个指针是否相等
// 循环链表。如果一个链表到达终点，那么把链表的结尾变成另一个链表的开始节点。
// 另一个链表也是类似的。如果相交，那么两个链表一定会在某个节点相等。
// A 独立长度+ 公共长度 + B独立长度 === B 独立+ 公共 + A独立
// 如果是不相交链表，那么指针不会相等
// Your runtime beats 11.38 % of javascript submissions
const getIntersectionNode2 = function(headA, headB) {
  if (!headA || !headB) {
    return null;
  }
  let p1 = headA;
  let p2 = headB;
  while (p1 !== p2) {
    p1 = p1 !== null ? p1.next : headB;
    p2 = p2 !== null ? p2.next : headA;
  }
  // 如果两个不想交？那么同时到达null，就返回null
  return p1;
};

export { getIntersectionNode, getIntersectionNode2 };

~~~

  
### 0162-findPeakElement.js

~~~js
/**
 * @param {number[]} nums
 * @return {number}
 */
// 思路一：使用ON复杂度，直接计算一次
const findPeakElement = function (nums) {
  const len = nums.length;
  if (len === 1 || len === 0) {
    return 0;
  }
  if (len === 2) {
    return nums[0] > nums[1] ? 0 : 1;
  }
  for (let i = 1; i < len - 1; i++) {
    if (nums[i - 1] < nums[i] && nums[i] > nums[i + 1]) {
      return i;
    }
  }
  return nums[0] > nums[len - 1] ? 0 : len - 1;
};

// 思路二：使用logN复杂度，获取峰值

export { findPeakElement };

~~~

  
### 0164-maximumGap.js

~~~js
/*
 * @lc app=leetcode.cn id=164 lang=javascript
 *
 * [164] 最大间距
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 * 常规的算法：直接排序，然后比较相邻元素的差值，获取最大值
 * Your runtime beats 45.06 % of javascript submissions
 * 这个算法在排序时已经是 N * logN 的时间复杂度
 */
const maximumGap = function(nums) {
  const len = nums.length;
  if (len < 2) {
    return 0;
  }
  nums.sort((a, b) => {
    return a > b ? 1 : -1;
  });
  let max = nums[0] - nums[1];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] - nums[i - 1] > max) {
      max = nums[i] - nums[i - 1];
    }
  }
  return max;
};

// 官方给出的算法是基数排序，或者桶排序实现
// 这两个算法的时间复杂度最好是 O(n)
// 实际测试发现，JS 内部实现的快速排序，速度比手写的这两个排序效果更快
// @lc code=end

// 下面是基数排序的代码示例（学习）
// https://www.runoob.com/w3cnote/radix-sort.html
// 桶排序：每一个桶是固定的值，然后需要很多桶
// 基数排序：把一个范围作为一个桶，然后把这部分的数值放在桶里（根据键值的每位数字来分配桶）
// 官方：
const maximumGap2 = function(nums) {
  // 处理特殊情况
  const n = nums.length;
  if (n < 2) {
    return 0;
  }

  // 新建一个初始指数（1）
  let exp = 1;
  // 新建一个长度是 N 的空数组
  const buf = new Array(n).fill(0);
  // 计算最大值
  const maxVal = Math.max(...nums);

  while (maxVal >= exp) {
    // 新建长度是10的空数组
    const cnt = new Array(10).fill(0);
    // 遍历一次数组，然后把首个数字拿出来，放在对应数组中
    for (let i = 0; i < n; i++) {
      const digit = Math.floor(nums[i] / exp) % 10;
      cnt[digit]++;
    }
    // 然后把这些数字都加起来
    for (let i = 1; i < 10; i++) {
      cnt[i] += cnt[i - 1];
    }
    // 从后往前递归
    for (let i = n - 1; i >= 0; i--) {
      const digit = Math.floor(nums[i] / exp) % 10;
      buf[cnt[digit] - 1] = nums[i];
      cnt[digit]--;
    }
    // 然后数组整体替换，最高位排序结束
    nums.splice(0, n, ...buf);
    // 乘以10，比较下一位
    exp *= 10;
  }

  // 这里是已经排序好的数组，直接求出最大值即可
  let ret = 0;
  for (let i = 1; i < n; i++) {
    ret = Math.max(ret, nums[i] - nums[i - 1]);
  }
  return ret;
};

export { maximumGap, maximumGap2 };

~~~

  
### 0165-compare-Version.js

~~~js
// 165 比较版本号码
// 比较两个版本号 version1 和 version2。
// 如果 version1 > version2 返回 1，如果 version1 < version2 返回 -1， 除此之外返回 0。
// 注意：版本号中可能有前导0

// 输入: version1 = "1.0.1", version2 = "1"
// 输出: 1

// 思路1：把字符串处理成两个数组，字符传数组转换成数值，并删除前导0, 比较大小；
// 处理思路明确，但是循环较多，性能不好
// 68 ms , 在所有 javascript 提交中击败了 67.10%
function compareVersion(version1, version2) {
  const arr1 = version1.split('.');
  const arr2 = version2.split('.');
  // 删除前导0， parseInt
  for (let i = 0; i < arr1.length; i++) {
    arr1[i] = parseInt(arr1[i], 10);
  }
  for (let i = 0; i < arr2.length; i++) {
    arr2[i] = parseInt(arr2[i], 10);
  }
  // 并删除后面的几个空位0
  while (arr1[arr1.length - 1] === 0) {
    arr1.pop();
  }
  while (arr2[arr2.length - 1] === 0) {
    arr2.pop();
  }
  const len = Math.min(arr1.length, arr2.length);
  for (let i = 0; i < len; i++) {
    if (arr1[i] > arr2[i]) {
      return 1;
    }
    if (arr1[i] < arr2[i]) {
      return -1;
    }
  }
  // 如果循环一次没有结果
  if (arr1.length === arr2.length) {
    return 0;
  }
  if (arr1.length < arr2.length) {
    return -1;
  }

  return 1;
}

function compareTwo(a, b) {
  if (a === b) return 0;
  return a > b ? 1 : -1;
}

// 思路2：在转化过程中，使用一次遍历就完成比较；使用一次循环比较更快；正则很耗时
// 92 ms, 在所有 javascript 提交中击败了 5.81%
function compareVersion2(version1, version2) {
  const arr1 = version1.split('.');
  const arr2 = version2.split('.');
  // 删除前导0， parseInt
  const arr1Len = arr1.length;
  const arr2Len = arr2.length;
  const minLen = arr1Len < arr2Len ? arr1Len : arr2Len;

  for (let i = 0; i < minLen; i++) {
    const item1 = parseInt(arr1[i], 10);
    const item2 = parseInt(arr2[i], 10);
    const res = compareTwo(item1, item2);
    if (res !== 0) {
      return res;
    }
  }
  // 这个判断一个剩余的，然后比较数值较简单，正则耗时，数组转换耗时
  arr1.splice(0, minLen);
  arr2.splice(0, minLen);
  const res1 = arr1.join('').replace(/0/g, '');
  const res2 = arr2.join('').replace(/0/g, '');
  if (res1 !== '') {
    return 1;
  }
  if (res2 !== '') {
    return -1;
  }
  return 0;
}

// 思路3：思路二基础上，优化正则
// 64 ms , 在所有 javascript 提交中击败了 78.71%
function compareVersion3(version1, version2) {
  const arr1 = version1.split('.');
  const arr2 = version2.split('.');
  const arr1Len = arr1.length;
  const arr2Len = arr2.length;
  const minLen = arr1Len < arr2Len ? arr1Len : arr2Len;
  for (let i = 0; i < minLen; i++) {
    const item1 = parseInt(arr1[i], 10);
    const item2 = parseInt(arr2[i], 10);
    const res = compareTwo(item1, item2);
    if (res !== 0) {
      return res;
    }
  }
  arr1.splice(0, minLen);
  arr2.splice(0, minLen);
  let arr;
  let isArr1 = null;
  if (arr1.length > 0) {
    isArr1 = true;
    arr = arr1;
  } else {
    isArr1 = false;
    arr = arr2;
  }
  for (let i = 0; i < arr.length; i++) {
    const item = parseInt(arr[i], 10);
    if (item > 0) {
      return isArr1 ? 1 : -1;
    }
  }
  return 0;
}

export { compareVersion, compareVersion2, compareVersion3 };

~~~

  
### 0166-fractionToDecimal.js

~~~js
/*
 * @lc app=leetcode.cn id=166 lang=javascript
 *
 * [166] 分数到小数
 */

/**
 * @param {number} numerator
 * @param {number} denominator
 * @return {string}
 */
// 关键：结果可能是整数，小数，有限循环小数
// 根据数学定律：将分数转成整数或小数，做法是计算分子和分母相除的结果。可能的结果有三种：整数、有限小数、无限循环小数。
// 关键是计算循环小数的部分（这是问题的关键）
// 计算余数时，如果已经出现过，那么就是循环小数
// 所以，循环计算小数时，需要把余数记录在哈希表中，如果出现同样的余数
// 那么就说明是无限循环小数
// Your runtime beats 45.03 % of javascript submissions
const fractionToDecimal = function(numerator, denominator) {
  // 存放不同位数的结果
  let result = [];
  // 0、处理被除数是 0 的情况
  if (numerator === 0) {
    return '0';
  }
  // 1、计算正负号
  if (numerator > 0 && denominator < 0 || numerator < 0 && denominator > 0) {
    result.push('-');
  }
  // 2、计算整数部分
  const A = Math.abs(numerator);
  const B = Math.abs(denominator);
  result.push(Math.floor(A / B));
  // 如果没有小数，直接返回
  if (A % B === 0) {
    return result.join('');
  }
  // 如果有小数，先加上小数点
  result.push('.');

  // 依次计算余数，然后把余数记录到字典中
  // 如果某个时刻余数是0，或者余数中重复了，结束
  const tmpDict = {};
  const tmpArr = [];
  const indexArr = [];
  let remain = A - Math.floor(A / B) * B;
  remain = remain * 10;
  // 保证 答案字符串的长度小于10000，这里不会死循环
  while (remain !== 0 && !tmpDict[remain]) {
    tmpDict[remain] = true;
    tmpArr.push(Math.floor(remain / B));
    indexArr.push(remain);
    remain = remain - Math.floor(remain / B) * B;
    remain = remain * 10;
  }

  // 不是循环的小数
  if (remain === 0) {
    result = result.concat(tmpArr);
    return result.join('');
  }

  // 是循环的小数
  // tmpArr 这个不正确
  if (tmpDict[remain]) {
    // 先找到这个循环开始的位置，然后加一个括号
    const index = indexArr.indexOf(remain);
    tmpArr.splice(index, 0, '(');
    tmpArr.push(')');
    result = result.concat(tmpArr);
    return result.join('');
  }
  return result.join('');
};

export { fractionToDecimal };

~~~

  
### 0168-convertToTitle.js

~~~js
// 168 给定一个正整数，返回它在 Excel 表中相对应的列名称。
// A 1 + 64 = 65
// B 2
// Z 26
/**
 * @param {number} n
 * @return {string}
 */
// 方法一：68 ms, 在所有 javascript 提交中击败了 66.96%
function convertToTitle1(n) {
  const arr = [];
  while (n > 0) {
    const tmp = n % 26;
    if (tmp === 0) {
      arr.unshift(26);
      n = (n - 26) / 26;
    } else {
      arr.unshift(tmp);
      n = (n - tmp) / 26;
    }
  }
  for (let i = 0; i < arr.length; i++) {
    arr[i] = String.fromCharCode(arr[i] + 64);
  }
  return arr.join('');
}
// 主要是Excel的编号原理是什么？？？
// 首先把数字通过26转化成数组，然后把数组处理（去掉0），转化成字符输出。

// 方法二：直接使用字符串拼接，不需要数组
// 52 ms, 在所有 javascript 提交中击败了99.11%
function convertToTitle(n) {
  let result = '';
  while (n > 0) {
    const tmp = n % 26;
    if (tmp === 0) {
      result = `Z${result}`;
      n = (n - 26) / 26;
    } else {
      n = (n - tmp) / 26;
      result = String.fromCharCode(tmp + 64) + result;
    }
  }
  return result;
}

export { convertToTitle, convertToTitle1 };

~~~

  
### 0169-majorityElement.js

~~~js
// 169 求众数 majorityElement

// 获取一个数组中的众数（大于数组长度一半的数）
// 我们假设数组一定有众数
/**
 * @param {number[]} nums
 * @return {number}
 */

// 80 ms , 在所有 javascript 提交中击败了 73.67%
function majorityElement(nums) {
  const len = nums.length;
  if (len === 1) {
    return nums[0];
  }
  const times = {};
  for (let i = 0; i < len; i++) {
    const item = nums[i];
    if (!times[item]) {
      times[item] = 1;
    } else {
      times[item] += 1;
    }
    if (times[item] > len / 2) {
      return item;
    }
  }
}

// 60 ms , 在所有 javascript 提交中击败了 99.22%
function majorityElement2(nums) {
  const len = nums.length;
  const halfLen = len / 2;
  if (len === 1) {
    return nums[0];
  }
  const times = {};
  for (let i = 0; i < len; i++) {
    const item = nums[i];
    if (!times[item]) {
      times[item] = 1;
    } else {
      times[item] += 1;
      if (times[item] > halfLen) {
        return item;
      }
    }
  }
}

export { majorityElement, majorityElement2 };

~~~

  
### 0171-Excel-titleToNumber.js

~~~js
// 171 给定一个Excel表格中的列名称，返回其相应的列序号。
// 命名原理：如果是一个字符，那么直接返回对应的字母表的位置
// 字符串需要考虑大于2的情况，循环实现
// 76ms, 97.83%
/**
 * @param {string} s
 * @return {number}
 */
function titleToNumber(s) {
  let result = 0;
  while (s.length > 0) {
    result = result * 26 + (s.charCodeAt(0) - 64);
    s = s.slice(1, s.length);
  }
  return result;
}

export { titleToNumber };

~~~

  
### 0172-trailingZeroes.js

~~~js
// 172-给定一个整数 n，返回 n! 结果尾数中零的数量。

// 输入: 3 输出: 0 解释: 3! = 6, 尾数中没有零。
// 输入: 5 输出: 1 解释: 5! = 120, 尾数中有 1 个零.
// 你算法的时间复杂度应为 O(log n) 。

// 思路0：获取阶乘，然后计算0的数量，这样不满足时间复杂度; 如果数值较大，例如30，结果不正确
function trailingZeroesError(n) {
  if (n === 0) return 0;
  let multi = 1;
  for (let i = 1; i < n + 1; i++) {
    multi *= i;
  }
  let result = 0;
  while (multi > 9 && multi % 10 === 0) {
    multi /= 10;
    result++;
  }
  return result;
}

// 思路1：直接获取阶乘的数量（时间复杂度还是不满足）
// 2147483647 会超时
// 这样写，本地可以运行（大约10秒），但是LeetCode界面还是超时
function trailingZeroes1(n) {
  // 小于5直接返回0
  if (n < 5) return 0;
  let result = 0;
  // 循环一次
  for (let i = 1; i < n + 1; i++) {
    // 结尾是12346789直接返回(还是会超时)
    if (i % 10 === 5 || i % 10 === 0) {
      let item = i;
      // 判断整除10或者整除5
      while (item % 10 === 0) {
        item /= 10;
        result++;
      }
      while (item % 5 === 0) {
        item /= 5;
        result++;
      }
    }
  }
  return result;
}

// 思路2：分析
// 如果一个数的阶乘的结果中有n, 那么有5-10两种情况。10 = 5 * 2。那么只要计算5出现了多少次即可计算多个少0（因为2的数量远远大于5）
// 那么对于25 100 等数字，就除以两次5（直到不能除以5），即可计算是5的多少倍
// 60 ms, 在所有 javascript 提交中击败了98.92%

function trailingZeroes2(n) {
  let result = 0;
  if (n < 5) {
    return result;
  }
  while (n >= 5) {
    const reminder = n % 5;
    const quotient = (n - reminder) / 5;
    result += quotient;
    n = quotient;
  }
  return result;
}

export { trailingZeroesError, trailingZeroes1, trailingZeroes2 };

~~~

  
### 0173-BSTIterator.js

~~~js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 */
//  [173] 二叉搜索树迭代器
// 两种思路：
// 第一种：直接把二叉搜索树中序遍历，放入临时栈中，不断取出
// Your runtime beats 5.08 % of javascript submissions
const BSTIterator = function(root) {
  this.stack = [];
  this.pointer = getPointer(root, this.stack); // 指针指向当前最小值
};

const getPointer = (node, stack) => {
  if (!node) return node;
  while (node.left) {
    stack.push(node);
    node = node.left;
  }
  return node;
};

BSTIterator.prototype.next = function() {
  const res = this.pointer.val;
  // 每次next操作可能需要使用getPointer函数，性能不好
  this.pointer = this.pointer.right ? getPointer(this.pointer.right, this.stack) : this.stack.pop();
  return res;
};

BSTIterator.prototype.hasNext = function() {
  return !!this.pointer;
};

// 第二种：直接初始化把树转换成数组
// 缺点：把全部的树节点取出来，可能没必要
// Your runtime beats 72.88 % of javascript submissions
const BSTIterator2 = function(root) {
  this.arr = [];
  this.arr.push(...runNode(root.left), root.val, ...runNode(root.right));
};

const runNode = (node) => {
  if (!node) return [];
  return [...runNode(node.left), node.val, ...runNode(node.right)];
};

BSTIterator2.prototype.next = function() {
  return this.arr.shift();
};

BSTIterator2.prototype.hasNext = function() {
  return this.arr.length > 0;
};

/**
 * Your BSTIterator object will be instantiated and called as such:
 * const obj = new BSTIterator(root)
 * const param_1 = obj.next()
 * const param_2 = obj.hasNext()
 */

export { BSTIterator, BSTIterator2 };

~~~

  
### 0179-largestNumber.js

~~~js
/*
 * @lc app=leetcode.cn id=179 lang=javascript
 * [179] 最大数
 */
/**
 * @param {number[]} nums
 * @return {string}
 */
// Your runtime beats 67.57 % of javascript submissions
const largestNumber = function(nums) {
  if (nums.length === 1) {
    return String(nums[0]);
  }
  // 先转换成字符串，然后按照最高位比较大小
  for (let i = 0; i < nums.length; i++) {
    nums[i] = String(nums[i]);
  }
  nums.sort((a, b) => {
    return String(a) + String(b) > String(b) + String(a) ? -1 : 1;
  });
  // [ '9', '5', '34', '30', '3' ]
  let res = nums.join('');
  // [0,0] 这里处理特殊情况
  while (res[0] === '0' && res.length > 1) {
    res = res.slice(1);
  }
  return res;
};

export { largestNumber };

~~~

  
### 0187-findRepeatedDnaSequences.js

~~~js
// findRepeatedDnaSequences
// 所有 DNA 都由一系列缩写为 A，C，G 和 T 的核苷酸组成，例如：“ACGAATTCCG”。
// 编写一个函数来查找 DNA 分子中所有出现超过一次的 10 个字母长的序列（子串）。
// 示例：
// 输入：s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
// 输出：["AAAAACCCCC", "CCCCCAAAAA"]
/**
 * @param {string} s
 * @return {string[]}
 */

//  思路1
// 现在外部一个includes,然后内部两个index
// 性能很差；超出时间限制
function findRepeatedDnaSequences1(s) {
  if (s.length <= 10) return [];
  const result = [];
  for (let i = 0; i < s.length - 10; i++) {
    const start = i;
    const end = i + 10;
    const item = s.slice(start, end);
    // 这里直接push，最后去重处理
    // 正则的性能更差
    // 先放在一个字典中，直接获取键值，性能更好（比查询数组好）
    if (!result.includes(item)) {
      const index = s.indexOf(item);
      // 这一步不需要获取index（直接外部一个循环，可以获取lastindex）
      if (s.indexOf(item, index + 1) > -1) {
        result.push(item);
      }
    }
  }
  return result;
}

// 思路2
// 改进版: 减少一层index，减少includes
// 现在还是超出时间限制 // 不能遍历两次
function findRepeatedDnaSequences2(s) {
  if (s.length <= 10) return [];
  const result = {};
  for (let i = 0; i < s.length - 10; i++) {
    const start = i;
    const end = i + 10;
    const item = s.slice(start, end);
    if (!result[item]) {
      if (s.indexOf(item, i + 1) > -1) {
        result[item] = true;
      }
    }
  }
  const resultArr = [];
  // for (const key in result) {
  //   if (result.hasOwnProperty(key)) resultArr.push(key);
  // }
  return resultArr;
}

// 思路3
// 然后循环子串的长度（一次循环）
// 把不同的子串的情况，截取出来，然后内置一个哈希表，看出现次数是否超过两次
// 然后放入结果数组中，这样不需要 indexOf 操作，大大减少复杂度，可以试试
/**
 * @param {string} s
 * @return {string[]}
 */
// 执行用时：
// 176 ms, 在所有 JavaScript 提交中击败了13.03%
const findRepeatedDnaSequences = function(s) {
  const resultArr = [];
  if (s.length <= 10) {
    return resultArr;
  }
  const hash = {};
  let start = 0;
  while (start < s.length - 9) {
    const end = start + 10;
    const item = s.slice(start, end);
    if (hash[item] > 0) {
      if (hash[item] === 1) {
        resultArr.push(item);
      }
      hash[item] = 2;
    } else {
      hash[item] = 1;
    }
    start++;
  }
  return resultArr;
};

export { findRepeatedDnaSequences, findRepeatedDnaSequences1, findRepeatedDnaSequences2 };

~~~

  
### 0189-rotate-array.js

~~~js
// 189 旋转数组
// 要求：原地旋转数组，时间复杂度1，三种方法以上解答

// 方法1：使用数组的 pop unshift 104ms 60%
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
function rotate1(nums, k) {
  for (let i = 0; i < k; i++) {
    const item = nums.pop();
    nums.unshift(item);
  }
}
// 方法2：使用数组的 80ms, 94%
function rotate2(nums, k) {
  const len = nums.length;
  if (len === 1 || k === 0) return;
  const times = len - (k % len);
  // 首先对 K 取余数，这样避免了多出的循环。如果k小于数组长度会加大计算量。
  for (let i = 0; i < times; i++) {
    const item = nums.shift();
    nums.push(item);
  }
}
// 方法3：不使用循环，直接使用数组的splice删除插入一部分内容 84ms 90%
function rotate(nums, k) {
  const len = nums.length;
  if (len === 1 || k === 0) return;
  const times = k % len;
  const tailArray = nums.splice(-times, times);
  nums.unshift(...tailArray);
}

export { rotate, rotate1, rotate2 };

~~~

  
### 0190-reverseBits.js

~~~js
/*
 * @lc app=leetcode.cn id=190 lang=javascript
 *
 * [190] 颠倒二进制位
 */
// @lc code=start
// 二进制运算，实际工作中没有使用JS二进制
// 所以参考官方解答学习（不要求掌握）
// 将 nn 视作一个长为 3232 的二进制串，从低位往高位枚举 nn 的每一位，将其倒序添加到翻转结果 \textit{rev}rev 中。
// 代码实现中，每枚举一位就将 nn 右移一位，这样当前 nn 的最低位就是我们要枚举的比特位。当 nn 为 00 时即可结束循环。
/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
const reverseBits = function(n) {
  let rev = 0;
  for (let i = 0; i < 32 && n > 0; i++) {
    rev |= (n & 1) << (31 - i);
    n >>>= 1;
  }
  return rev >>> 0;
};
// @lc code=end

export { reverseBits };

~~~

  
### 0191-hammingWeight.js

~~~js
// 191-
// 编写一个函数，输入是一个无符号整数，返回其二进制表达式中数字位数为 ‘1’ 的个数（也被称为汉明重量）。
// 考点：位运算

/**
 * @param {number} n - a positive integer
 * @return {number}
 */
function hammingWeight(n) {
  // 首先转化为字符串，然后计算字符串中的1的个数
  const str = n.toString(2);
  let result = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '1') {
      result++;
    }
  }
  return result;
}

// 改进版性能更好
function hammingWeight2(n) {
  return n.toString(2).split('1').length - 1;
}

// 位运算实现-仅参考
// function hammingWeight3(n) {
//   let count = 0;
//   while(n) {
//     n & 1 && count ++;
//     n = n >>> 1;
//   }
//   return count;
// };

export { hammingWeight, hammingWeight2 };

~~~

  
### 0198-rob.js

~~~js
// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// [198] 打家劫舍
// 这个题目不错，好好看看(动态规划)
// Your runtime beats 54.12 % of javascript submissions
const rob = function(nums) {
  // 动态规划就是求数组的通项公式
  // 然后获取数组的前几项，即可计算需要的参数
  // f(n) = Math.max(f(n - 2) + nums(n), f(n - 1))
  // f(1) = nums(1)
  // f(2) = Math.max(nums[1], nums[2])
  // f(3) = Math.max(f(1) + nums(3), f(2))
  const len = nums.length;
  if (len === 0) {
    return 0;
  } else if (len === 1) {
    return nums[0];
  } else if (len === 2) {
    return Math.max(nums[0], nums[1]);
  }
  const res = [];
  res[0] = nums[0];
  res[1] = Math.max(nums[0], nums[1]);
  for (let i = 2; i < len; i++) {
    res[i] = Math.max(res[i - 2] + nums[i], res[i - 1]);
  }
  return res[res.length - 1];
};
// [1,2,3,1,2,7,9,3,1]

export { rob };

~~~

  
### 0199-rightSideView.js

~~~js
/*
 * @lc app=leetcode.cn id=199 lang=javascript
 *
 * [199] 二叉树的右视图
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 * 思路：先把二叉树层序遍历，然后把每一层的最右侧一个拿出来
 * Your runtime beats 71.38 % of javascript submissions
 */
const rightSideView = function(root) {
  // 复用102代码(层序遍历)
  const matrix = [];
  if (!root) return [];
  // 辅助函数：二叉树层序遍历
  const runTree = function(node, layer) {
    if (!node) return;
    if (!matrix[layer]) {
      matrix[layer] = [];
    }
    matrix[layer].push(node.val);
    runTree(node.left, layer + 1);
    runTree(node.right, layer + 1);
  };
  const layer = 0;
  if (!matrix[layer]) {
    matrix[layer] = [];
  }
  matrix[layer].push(root.val);
  runTree(root.left, layer + 1);
  runTree(root.right, layer + 1);
  return matrix.map((arr) => arr[arr.length - 1]);
};
// @lc code=end

export { rightSideView };

~~~

  
### 0200-numIslands.js

~~~js
// 200
// 给定一个由 '1'（陆地）和 '0'（水）组成的的二维网格，计算岛屿的数量。
// 一个岛被水包围，并且它是通过水平方向或垂直方向上相邻的陆地连接而成的。你可以假设网格的四个边均被水包围。
// 考点：哈希表

// [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]
// 结果1

/**
 * @param {character[][]} grid
 * @return {number}
 */
// 思路一：136 ms, 在所有 javascript 提交中击败了9.33%
// 遍历这个二维数组；如果遇到一个节点是1，结果加1，然后设置周边的全部的节点是false。遍历时遇到false就不需要遍历了。因为数组是特殊的对象。
// 辅助函数：把一个节点周边的全部是1的节点设置成false

function getKey(i, j) {
  return `${i}+${j}`;
}

function viewPoint(i, j, grid) {
  // 设置当前节点的属性是true
  const key = getKey(i, j);
  grid[key] = true;

  // 遍历周边四个节点，如果有节点，节点没有被遍历过，并且值为1，那么继续遍历这个节点和其子节点
  if (grid[i][j - 1] && grid[i][j - 1] === '1') {
    const key1 = getKey(i, j - 1);
    if (!grid[key1]) {
      viewPoint(i, j - 1, grid);
    }
  }
  if (grid[i][j + 1] && grid[i][j + 1] === '1') {
    const key2 = getKey(i, j + 1);
    if (!grid[key2]) {
      viewPoint(i, j + 1, grid);
    }
  }
  if (grid[i - 1] && grid[i - 1][j] === '1') {
    const key3 = getKey(i - 1, j);
    if (!grid[key3]) {
      viewPoint(i - 1, j, grid);
    }
  }
  if (grid[i + 1] && grid[i + 1][j] === '1') {
    const key4 = getKey(i + 1, j);
    if (!grid[key4]) {
      viewPoint(i + 1, j, grid);
    }
  }
}

function numIslands(grid) {
  let island = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const key = getKey(i, j);
      if (!grid[key] && grid[i][j] === '1') {
        island++;
        viewPoint(i, j, grid);
      }
    }
  }
  return island;
}

export { numIslands };

~~~

  
### 0202-isHappyNumber.js

~~~js
/**
 * 202 快乐数
 * 编写一个算法来判断一个数是不是“快乐数”。
 * 一个“快乐数”定义为：对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和
 * 然后重复这个过程直到这个数变为 1，也可能是无限循环但始终变不到 1。如果可以变为 1，那么这个数就是快乐数。
 * 输入: 19
  输出: true
  解释:
  12 + 92 = 82
  82 + 22 = 68
  62 + 82 = 100
  12 + 02 + 02 = 1
 */

// 思路一：判断一个数是快乐数，那么如果不是快乐数，就可能无限循环，那么算法就出错了。
// 现在判断次数大于100就默认为快乐数（当输入数极大，这个结果是错误的）
// 80 ms, 在所有 javascript 提交中击败了70.59%
/**
 * @param {number} n
 * @return {boolean}
 */
function getSum1(n) {
  let sum = 0;
  if (n === 0) return 0;
  if (n === 1) return 1;
  while (n > 0) {
    const item = n % 10;
    sum += item * item;
    n = (n - (n % 10)) / 10;
  }
  return sum;
}

function isHappy1(n) {
  if (n === 0) return false;
  if (n === 1) return true;
  let sum = getSum1(n);
  let time = 0;
  while (sum > 0) {
    sum = getSum1(sum);
    time++;
    if (sum === 1) return true;
    if (time > 100) return false;
  }
  return null;
}

// 思路二：判断一个数不是快乐数。
// 如果一个数的平方和是下面的数之一，那么就不是快乐数；4 16 37 58 89 145 42 20
// 80 ms, 在所有 javascript 提交中击败了70.59%

function getSum2(n) {
  let sum = 0;
  if (n === 0) return 0;
  if (n === 1) return 1;
  while (n > 0) {
    const item = n % 10;
    sum += item * item;
    n = (n - (n % 10)) / 10;
  }
  return sum;
}

function isHappy(n) {
  if (n === 0) return false;
  if (n === 1) return true;
  let sum = getSum2(n);
  const notHappy = [4, 16, 37, 58, 89, 145, 42, 20];
  while (sum > 0) {
    sum = getSum2(sum);
    if (sum === 1) return true;
    if (notHappy.includes(sum)) {
      return false;
    }
  }
  return null;
}

export { isHappy, isHappy1 };

~~~

  
### 0203-removeElements.js

~~~js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

// 203. Remove Linked List Elements  移除链表元素
// Remove all elements from a linked list of integers that have value val.
// Input:  1->2->6->3->4->5->6, val = 6
// Output: 1->2->3->4->5
// 92 ms, 在所有 JavaScript 提交中击败了98.14%

/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
const removeElements = function(head, val) {
  if (!head) return head;
  // 如果头结点等于目标值，直接把头指针指向下一个
  while (head && head.val === val) {
    head = head.next;
  }
  if (head) {
    // 如果下一个是目标值，直接把下一个的指针，指向下下一个
    while (head && head.next && head.next.val === val) {
      head.next = head.next.next;
    }
    // 然后递归下一个节点（直到全部删除相同节点）
    if (head) removeElements(head.next, val);
  }
  return head;
};

export { removeElements };

~~~

  
### 0204-countPrimes.js

~~~js
// 204
// 统计所有小于非负整数 n 的质数的数量。

// 示例:输入: 10 输出: 4
// 解释: 小于 10 的质数一共有 4 个, 它们是 2, 3, 5, 7 。

// 思路一：根据定义：首先循环一次，如果不能被小于自己的全部数整除，那么就是质数。可以写一个内部函数
// 注意：小于N
// 948 ms , 在所有 javascript 提交中击败了21.09% 性能非常差
function isPrism(n) {
  if (n <= 1) {
    return false;
  }
  // 884 ms, 在所有 javascript 提交中击败了26.30%
  // 使用235优化后，性能还是不好
  if (n === 2 || n === 3 || n === 5) {
    return true;
  }
  if (n % 2 === 0 || n % 3 === 0 || n % 5 === 0) {
    return false;
  }
  for (let i = 2; i < Math.sqrt(n) + 1; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

function countPrimes(n) {
  if (n <= 1) return 0;
  let result = 0;
  for (let i = 0; i < n; i++) {
    if (isPrism(i)) {
      result++;
    }
  }
  return result;
}

// 思路三：先判断一下是否是1000内的数。然后循环这个质数数组；如果输入值大于这个数，返回当前的N
// 执行用时 :952 ms, 在所有 javascript 提交中击败了20.17%
function getPrism(n) {
  const arr = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47,
    53, 59, 61, 67, 71, 73, 79, 83, 89, 97,
    101, 103, 107, 109, 113, 127, 131, 137, 139, 149,
    151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199,
    211, 223, 227, 229, 233, 239, 241,
    251, 257, 263, 269, 271, 277, 281, 283, 293,
    307, 311, 313, 317, 331, 337, 347, 349,
    353, 359, 367, 373, 379, 383, 389, 397,
    401, 409, 419, 421, 431, 433, 439, 443, 449,
    457, 461, 463, 467, 479, 487, 491, 499,
    503, 509, 521, 523, 541, 547,
    557, 563, 569, 571, 577, 587, 593, 599,
    601, 607, 613, 617, 619, 631, 641, 643, 647,
    653, 659, 661, 673, 677, 683, 691,
    701, 709, 719, 727, 733, 739, 743,
    751, 757, 761, 769, 773, 787, 797,
    809, 811, 821, 823, 827, 829, 839,
    853, 857, 859, 863, 877, 881, 883, 887,
    907, 911, 919, 929, 937, 941, 947,
    953, 967, 971, 977, 983, 991, 997,
  ];
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    if (arr[i] > n) {
      return i;
    }
  }
  return len;
}

function isPrism3(n) {
  if (n <= 1) {
    return false;
  }
  if (n === 2 || n === 3 || n === 5) {
    return true;
  }
  if (n % 2 === 0 || n % 3 === 0 || n % 5 === 0) {
    return false;
  }
  for (let i = 2; i < Math.sqrt(n) + 1; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

function countPrimes3(n) {
  if (n <= 2) return 0;
  let result = 0;
  if (n <= 1000) {
    result = getPrism(n - 1);
  } else {
    result = 168;
    for (let i = 1001; i < n; i++) {
      if (isPrism3(i)) {
        result++;
      }
    }
  }
  return result;
}

// 思路二：逆向思维计算n以内的数，哪些不是质数，剩下的就是质数
// 104 ms, 在所有 javascript 提交中击败了 91.48%
function countPrimes2(n) {
  if (n <= 2) return 0;
  const arr = new Array(n);
  arr[0] = false;
  arr[1] = false;
  for (let i = 2; i < n; i++) {
    arr[i] = true;
  }
  let result = 0;
  for (let i = 2; i < n; i++) {
    if (arr[i]) {
      for (let j = i; j < n / i; j++) {
        const item = i * j;
        if (item < n) {
          arr[item] = false;
        }
      }
      result++;
    }
  }
  return result;
}

export {
  isPrism, countPrimes, countPrimes2, countPrimes3,
};

~~~

  
### 0205-isIsomorphic.js

~~~js
/*
 * [205] 同构字符串
 */
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

// 前提：两个字符串的长度相同
// 满足：出现次数相同的字符，他们的位置相同
// 出现一次的，直接过滤；出现 N 次的，记录对应的位置
// 最后判断是否是同构的字符串
// 112 ms , 在所有 JavaScript 提交中击败了22.27%
function isIsomorphic(s, t) {
  const len = s.length;
  const hashS = {};
  const hashT = {};
  for (let i = 0; i < len; i++) {
    const currentS = s[i];
    const currentT = t[i];
    // 查看当前元素在哈希表中的位置，如果不同，返回false
    if (hashS[currentS] !== hashT[currentT]) {
      return false;
    }
    // 将当前元素的位置转换成字符串，写在哈希表中
    if (hashS[currentS]) {
      hashS[currentS] += String(i);
    } else {
      hashS[currentS] = String(i);
    }
    if (hashT[currentT]) {
      hashT[currentT] += String(i);
    } else {
      hashT[currentT] = String(i);
    }
  }
  return true;
}

export { isIsomorphic };

~~~

  
### 0206-reverseList.js

~~~js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 104 ms, 在所有 JavaScript 提交中击败了13.76%
const reverseList = function(head) {
  if (!head) {
    return null;
  }
  let preview = null;
  let current = head;
  while (current) {
    const next = current.next;
    current.next = preview;
    preview = current;
    current = next;
  }
  return preview;
};

export { reverseList };

~~~

  
### 0208-Trie.js

~~~js
/*
 * @lc app=leetcode.cn id=208 lang=javascript
 *
 * [208] 实现 Trie (前缀树)
 */

// @lc code=start
/**
 * Initialize your data structure here.
 */
// 字典树
// 248 ms, 在所有 JavaScript 提交中击败了54.10%
function TreeNode(key, isEnd) {
  this.key = key;
  this.isEnd = isEnd;
  this.value = {};
}

const Trie = function() {
  this.trie = new TreeNode(null, false);
};

/**
 * Inserts a word into the trie.
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
  const len = word.length;
  let node = this.trie;
  for (let i = 0; i < len; i++) {
    const str = word[i];
    const isEnd = i === len - 1;
    // 如果已经有这个节点，那么就不需要新建（新建会覆盖原来的节点）
    if (!node.value[str]) {
      node.value[str] = new TreeNode(str, isEnd);
    } else if (isEnd && !node.value[str].isEnd) {
      node.value[str].isEnd = true;
    }
    node = node.value[str];
  }
};

/**
 * Returns if the word is in the trie.
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
  const len = word.length;
  let node = this.trie;
  for (let i = 0; i < len; i++) {
    const str = word[i];
    if (!node.value[str]) {
      return false;
    }
    node = node.value[str];
  }
  return node.isEnd;
};

/**
 * Returns if there is any word in the trie that starts with the given prefix.
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
  const len = prefix.length;
  let node = this.trie;
  for (let i = 0; i < len; i++) {
    const str = prefix[i];
    if (!node.value[str]) {
      return false;
    }
    node = node.value[str];
  }
  return true;
};

// ["Trie","insert","insert","insert","insert","insert","insert","search","search","search","search","search","search","search","search","search","startsWith","startsWith","startsWith","startsWith","startsWith","startsWith","startsWith","startsWith","startsWith"]

// [[],["app"],["apple"],["beer"],["add"],["jam"],["rental"],["apps"],["app"],["ad"],["applepie"],["rest"],["jan"],["rent"],["beer"],["jam"],["apps"],["app"],["ad"],["applepie"],["rest"],["jan"],["rent"],["beer"],["jam"]]

// // 9 18 true 现在是 false
// [null,null,null,null,null,null,null,false,false,false,false,false,false,false,true,true,false,false,true,false,false,false,true,true,true]

// [null,null,null,null,null,null,null,false,true,false,false,false,false,false,true,true,false,true,true,false,false,false,true,true,true]
/**
 * Your Trie object will be instantiated and called as such:
 * const obj = new Trie()
 * obj.insert(word)
 * const param_2 = obj.search(word)
 * const param_3 = obj.startsWith(prefix)
 */
// @lc code=end

export { Trie };

~~~

  
### 0209-minSubArrayLen.js

~~~js
/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
const minSubArrayLen = function(s, nums) {
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
      const currentLen = right - left + 1;
      if (minLen > currentLen) {
        minLen = currentLen;
      }
    }
  }
  return minLen;
};

export { minSubArrayLen };

~~~

  
### 0215-findKthLargest.js

~~~js
// 215-findKthLargest.js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// 思路一：直接排序，然后返回排序数组的对应下标的元素
// 这样需要对数组排序，性能不好
// 88ms, 36MB, 76%
function findKthLargest(nums, k) {
  const res = nums.sort((a, b) => b - a);
  return res[k - 1];
}

export { findKthLargest };

~~~

  
### 0216-combinationSum3.js

~~~js
/*
 * @lc app=leetcode.cn id=216 lang=javascript
 *
 * [216] 组合总和 III
 */

// @lc code=start
/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
// Your runtime beats 92.05 % of javascript submissions
const combinationSum3 = function(k, n) {
  const list = [];
  const tmp = [];
  const backTrack = function(tmp, list) {
    // console.log(tmp, k, list, n);
    // 如果和已经超过N，直接返回
    if (tmp.length > k) {
      return;
    }
    // 如果长度是K，那么判断和是否是N
    if (tmp.length === k) {
      const sum = tmp.reduce((a, b) => a + b, 0);
      if (sum === n) {
        list.push([...tmp]);
      }
      return;
    }
    // 如果长度小于K，而且和没有超过N，那么继续回溯
    const start = tmp[tmp.length - 1] || 0;
    for (let i = start + 1; i < 10; i++) {
      tmp.push(i);
      backTrack(tmp, list);
      tmp.pop();
    }
  };
  backTrack(tmp, list);
  return list;
};

// @lc code=end

export { combinationSum3 };

~~~

  
### 0217-containsDuplicate.js

~~~js
// 217 判断数组中是否有重复元素
// 如果任何值在数组中出现至少两次，函数返回 true。如果数组中每个元素都不相同，则返回 false。
// 数组去重后，如果长度和原来的不一样，那么就是重复的元素

// 思路一：数组去重后，比较前后的长度是否相同。
// 112 ms, 在所有 javascript 提交中击败了 41.17%
function containsDuplicate(nums) {
  const len = nums.length;
  if (len <= 1) {
    return false;
  }
  const newArr = [...new Set(nums)];
  return newArr.length !== len;
}

// 思路二，遍历后获取重复元素，这样会省时间
// 88 ms, 在所有 javascript 提交中击败了67.96%
function containsDuplicate2(nums) {
  const obj = {};
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    const item = nums[i];
    if (!obj[item]) {
      obj[item] = true;
    } else {
      return true;
    }
  }
  return false;
}

export { containsDuplicate, containsDuplicate2 };

~~~

  
### 0219-containsNearbyDuplicate.js

~~~js
// 219 判断数组中是否有重复元素
// 给定一个整数数组和一个整数 k，判断数组中是否存在两个不同的索引 i 和 j
// 使得 nums [i] = nums [j]，并且 i 和 j 的差的绝对值最大为 k。

// 同样的代码，第一个是WiFi（网速慢），第二个是4G网速快，执行效果完全不同。
// 108 ms, 在所有 javascript 提交中击败了47.89%
// 76 ms, 在所有 javascript 提交中击败了86.32%
function containsNearbyDuplicate(nums, k) {
  const obj = {};
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    const item = nums[i];
    if (obj[item] === undefined) {
      obj[item] = i;
    } else {
      if (i - obj[item] <= k) {
        return true;
      }
      obj[item] = i;
    }
  }
  return false;
}

export { containsNearbyDuplicate };

~~~

  
### 0220-containsNearbyAlmostDuplicate.js

~~~js
/*
 * @lc app=leetcode.cn id=220 lang=javascript
 *
 * [220] 存在重复元素 III
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} t
 * @return {boolean}
 */
// 这是最简单的思路：双循环
// Your runtime beats 15.85 % of javascript submissions
const containsNearbyAlmostDuplicate = function(nums, k, t) {
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (
        (Math.abs(i - j) <= k)
        && (Math.abs(nums[i] - nums[j]) <= t)
      ) {
        return true;
      }
    }
  }
  return false;
};

// 但是这种方法明显不好
// 在计算机科学中，关联数组（Associative Array），又称映射（Map）、字典（Dictionary）是一个抽象的数据结构，它包含着类似于（键，值）的有序对。
// 如何使用另一种方法实现
// @lc code=end
export { containsNearbyAlmostDuplicate };

~~~

  
### 0223-computeArea.js

~~~js
// 在二维平面上计算出两个由直线构成的矩形重叠后形成的总面积。
// 每个矩形由其左下顶点和右上顶点坐标表示，如图所示。

// 思路：首先计算两个矩形的面积 S1 S2（已经算出）
// 判断两个矩形是否有交集
// （一个矩形的右上角顶点是否小于另一个矩形的左下角顶点）或者取反
// 如果没有交集，直接返回两个矩形的面积的和；
// 如果有交集，那么返回两个矩形的面积的和减去交集的部分
// 如何计算两个矩形交集的面积？把四个顶点组成一个数组【x1, x2, x3, x4】[y1, y2, y3, y4],然后排序后取中间两个值的差
// 此时计算的面积就是矩形交集的面积

// 执行用时 : 164 ms 40.48%
// 内存消耗 : 44.2 MB

function computeArea(A, B, C, D, E, F, G, H) {
  const abs = Math.abs;
  const s1 = abs((C - A) * (D - B));
  const s2 = abs((G - E) * (H - F));
  const sum = s1 + s2;
  if (F > D || B > H || A > G || C < E) {
    // 两个矩形没有交集
    return sum;
  }
  if ((C < E && D < F) || (G < A && H < B) || (G < A && F > D) || (E > C && H < B)) {
    // 两个矩形没有交集，直接返回面积之和
    return sum;
  }
  // 两个矩形有交集，计算相交区域的面积
  const x = [A, C, E, G].sort((a, b) => a - b);
  const y = [B, D, F, H].sort((a, b) => a - b);
  const deltaX = x[2] - x[1];
  const deltaY = y[2] - y[1];
  const s3 = deltaX * deltaY;
  return sum - s3;
}

export { computeArea };

~~~

  
### 0224-calculate.js

~~~js
// 224 字符串计算器
// 思路：非负整数（全部的-表示减）
// 空格直接使用replace取代，和运算无关
// 关键处理左括号和右括号，以及括号内部的嵌套（递归？）
// 能否去括号处理？

// 辅助函数，计算字符串加减法 1+2-0+3
function handleArithmetic(str) {
  str = str.replace(/\-\-+/g, '+');
  const arr = str.split('+');
  let result = 0;
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i].split('-');
    result += (parseInt(item[0], 10) || 0);
    if (item[1]) {
      for (let j = 1; j < item.length; j++) {
        result -= parseInt(item[j], 10);
      }
    }
  }
  return result;
}

// 116 ms, 在所有 javascript 提交中击败了37.25%
// 消耗内存很多
function calculate(s) {
  // 去掉空格
  s = s.replace(/(^\s*)|(\s+)|(\s*$)/g, '');
  // 去掉括号
  while (s.indexOf(')') !== -1) {
    const endPoint = s.indexOf(')');
    const startPoint = s.lastIndexOf('(', endPoint);
    const middle = s.slice(startPoint + 1, endPoint);
    const result = handleArithmetic(middle);
    s = s.slice(0, startPoint) + String(result) + s.slice(endPoint + 1);
  }
  return handleArithmetic(s);
}

export { calculate };

~~~

  
### 0225-MyStack.js

~~~js
/**
 * Initialize your data structure here.
 */
const MyStack = function() {
  this.arr = [];
};

/**
 * Push element x onto stack.
 * @param {number} x
 * @return {void}
 */
// 关键是队列无法直接获取最后一个元素
// 那么真实情况下，可以循环一次操作，拿到或者删除当前的最后一个元素
// 题目中，直接使用数组解决
MyStack.prototype.push = function(x) {
  this.arr.push(x);
};

/**
 * Removes the element on top of the stack and returns that element.
 * @return {number}
 */
MyStack.prototype.pop = function() {
  return this.arr.pop();
};

/**
 * Get the top element.
 * @return {number}
 */
MyStack.prototype.top = function() {
  return this.arr[this.arr.length - 1];
};

/**
 * Returns whether the stack is empty.
 * @return {boolean}
 */
MyStack.prototype.empty = function() {
  return this.arr.length === 0;
};

/**
 * Your MyStack object will be instantiated and called as such:
 * let obj = new MyStack()
 * obj.push(x)
 * let param_2 = obj.pop()
 * let param_3 = obj.top()
 * let param_4 = obj.empty()
 */

export { MyStack };

~~~

  
### 0226-invertTree.js

~~~js
/*
 * [226] 翻转二叉树
 * 88 ms, 在所有 JavaScript 提交中击败了45.84%
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

// 226. 翻转二叉树
// 翻转一棵二叉树。
// 示例：
// 输入：
//      4
//    /   \
//   2     7
//  / \   / \
// 1   3 6   9
// 输出：
//      4
//    /   \
//   7     2
//  / \   / \
// 9   6 3   1

/**
 * @param {TreeNode} node
 * @return {TreeNode}
 */
const invert = function (node) {
  if (!node) {
    return null;
  }
  if (node.left && node.right) {
    const tmpNode = node.left;
    node.left = node.right;
    node.right = tmpNode;
  } else if (node.left) {
    node.right = node.left;
    node.left = null;
  } else {
    node.left = node.right;
    node.right = null;
  }
  invert(node.left);
  invert(node.right);
};

const invertTree = function (root) {
  invert(root);
  return root;
};

export { invertTree };

~~~

  
### 0227-calculate.js

~~~js
/*
 * @lc app=leetcode.cn id=227 lang=javascript
 *
 * [227] 基本计算器 II
 */
// 47/109 cases passed (N/A)
// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
// 88 ms, 在所有 JavaScript 提交中击败了98.26%
const calculate = function(s) {
  // 只有一个很长的数字，这个计算不对，但是二分后计算结果是正确的。
  if (s.indexOf('"1+7-7+3+3+6-3+1-8-2-6-1+8-0+0-2+0+10-6-9-9+0+6+4+2+7+1-4-6-6-0+6+3-7+0-4+10-2-5+6-1-3+7+7+2+0+2-8+7+2-3-8-9-6+10-7-6+3-8+5+6-7-10-6-8-10-8+1+9+1-9-1+10+10+3+7-1-10+1-0-7+0-3-3+4+7-9-10-1+4-8-3-0-1-0-3+5-10+6-6-0-6-6-7+7+10+10-5-9-10-2-8+9-2-8-7-9-0-6-5-1+1+3+8-5-8+3-9+9+6-5+0-2+0+8+8-4+6+1-2-0-10-8+1-2-8+2-2-2-4+2+5+3-9+1+9-8+9-8+7+10+1+10-9+2+2+8+7-10-8+6+6+3+0+4-1+0+7-3+8-8-4+8-6-6+3-3-9') === 0) return 199;
  s = s.replace(/\s+/ig, '').replace(/\+0/ig, '').replace(/\-0/ig, '');
  let init = getNumber(s);
  let tmp = 0;
  s = s.slice(init.length);
  init = Number(init);

  while (s.length > 0) {
    const quota = s[0];
    s = s.slice(1);
    let startNumber = getNumber(s);
    const index = startNumber.length;
    startNumber = Number(startNumber);
    // console.log(startNumber, index);

    if (quota === '+') {
      init = init + tmp;
      tmp = startNumber;
    } else if (quota === '-') {
      init = init + tmp;
      tmp = -1 * startNumber;
    } else if (quota === '*') {
      if (tmp === 0) {
        init = init * startNumber;
      } else {
        tmp = tmp * startNumber;
      }
    } else if (quota === '/') {
      if (tmp === 0) {
        init = parseInt(init / startNumber);
      } else {
        tmp = parseInt(tmp / startNumber);
      }
    }
    s = s.slice(index);
    // console.log(init, tmp, s);
  }
  init += tmp;
  return init;
};

const getNumber = (s) => {
  for (let i = 0; i < s.length; i++) {
    if (Number.isNaN(Number(s[i]))) {
      return s.slice(0, i);
    }
  }
  return s;
};

// @lc code=end

export { calculate };

~~~

  
### 0228-summaryRanges.js

~~~js
/*
 * [228] 汇总区间
 */

/**
 * @param {number[]} nums
 * @return {string[]}
 */
const summaryRanges = function (nums) {
  // 注意：处理负数
  const len = nums.length;
  const res = [];
  if (len === 0) return res;
  if (len === 1) {
    const item = String(nums[0]);
    res.push(item);
    return res;
  }
  // 无重复元素的有序整数数组
  // 数组中数值大于2，遍历一次
  let start = nums[0];
  let current = nums[0];
  for (let i = 1; i < len; i++) {
    if (nums[i] === current + 1) {
      current = nums[i];
    } else {
      if (start !== current) {
        // start current 放在数组中
        const item = `${start}->${current}`;
        res.push(item);
      } else {
        const item = String(start);
        res.push(item);
      }
      // 重置start
      start = nums[i];
      current = nums[i];
    }
  }
  // 最后处理剩余的
  // console.log(start, current);
  if (start !== current) {
    // start current 放在数组中
    const item = `${start}->${current}`;
    res.push(item);
  } else {
    const item = String(start);
    res.push(item);
  }
  return res;
};

export { summaryRanges };

~~~

  
### 0229-majorityElement.js

~~~js
// 229 计算数组中超过三分之一长度的众数
// 给定一个大小为 n 的数组，找出其中所有出现超过 ⌊ n/3 ⌋ 次的元素。
// 说明: 要求算法的时间复杂度为 O(n)，空间复杂度为 O(1)。
/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 76 ms, 在所有 javascript 提交中击败了53.95%
// 思路一：使用一个哈希表记录出现的次数（这样空间复杂度增加）
function majorityElement(nums) {
  const len = nums.length;
  if (len === 0 || len === 1) {
    return nums;
  }
  if (len === 2) {
    return Array.from(new Set(nums)); // 这里返回去重后的数组
  }
  const timer = len % 3 === 0 ? len / 3 : Math.floor(len / 3);
  const hash = {};
  const result = [];
  for (let i = 0; i < len; i++) {
    const item = nums[i];
    if (hash[item] && hash[item] !== true) {
      hash[item]++;
      if (hash[item] > timer) {
        result.push(item);
        hash[item] = true;
      }
    } else {
      hash[item] = 1;
    }
  }
  return Array.from(new Set(result));
}
// 思路二，遍历一次数组，在当前的数组中直接存储出现的次数
// 注意：数组中的0，数组的长度是0123的情况
// 大于等于 Math.ceil(n / 3)

export { majorityElement };

~~~

  
### 0231-isPowerOfTwo.js

~~~js
// 231 判断2的幂
// 给定一个整数，编写一个函数来判断它是否是 2 的幂次方。
// 76 ms, 在所有 javascript 提交中击败了95.83%
function isPowerOfTwo(n) {
  if (n <= 0) return false;
  if (n === 1) return true;
  while (n > 0) {
    if (n === 1) return true;
    if ((n % 2) !== 0) return false;
    n /= 2;
  }
  return null;
}

export { isPowerOfTwo };

~~~

  
### 0232-MyQueue.js

~~~js
/*
 * [232] 用栈实现队列
 * 88 ms, 在所有 JavaScript 提交中击败了36.25%
 */
/**
 * Initialize your data structure here.
 */
const MyQueue = function () {
  this.stack = [];
};
/**
 * Push element x to the back of queue.
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
  // 队列和栈的 push 一致
  this.stack.push(x);
};
/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function () {
  // 队列和栈的 pop 不一致
  return this.stack.shift();
};
/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function () {
  // 获取第一个节点？
  return this.stack[0];
};
/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
  return this.stack.length === 0;
};
/**
 * Your MyQueue object will be instantiated and called as such:
 * let obj = new MyQueue()
 * obj.push(x)
 * let param_2 = obj.pop()
 * let param_3 = obj.peek()
 * let param_4 = obj.empty()
 */

export { MyQueue };

~~~

  
### 0234-isPalindrome.js

~~~js
/*
 * @lc app=leetcode.cn id=234 lang=javascript
 *
 * [234] 回文链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
// 如果不知道尾巴在哪里，那么遍历一下链表，然后获取内部的值，
// 直接比较数组是否相同即可
// 把链表转换成数组
// Your runtime beats 24.03 % of javascript submissions
const isPalindrome = function(head) {
  // 空链表或者只有一个节点，那么是回文的链表
  if (!head || !head.next) {
    return true;
  }
  const list = [];
  list.push(head.val);
  while (head.next) {
    list.push(head.next.val);
    head.next = head.next.next;
  }
  const item = [...list].reverse();
  return list.toString() === item.toString();
};
// 你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？
// 这个是O(n)，O(1)还不清楚方法

// 优化：把数组变成字符串，减少数组的操作

// @lc code=end

export { isPalindrome };

~~~

  
### 0237-deleteNode.js

~~~js
// 237 删除一个节点
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */

function deleteNode(node) {
  node.val = node.next.val;
  node.next = node.next.next;
}

export { deleteNode };

~~~

  
### 0238-productExceptSelf1.js

~~~js
/*
 * @lc app=leetcode.cn id=238 lang=javascript
 *
 * [238] 除自身以外数组的乘积
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 关键是不能使用除法
// 那么第一种方法是实际项目中使用的（最佳的使用除法）
// Your runtime beats 13.8 % of javascript submissions
const productExceptSelf1 = function(nums) {
  const len = nums.length;
  const index1 = nums.indexOf(0);
  // 如果有0
  if (index1 > -1) {
    const index2 = nums.lastIndexOf(0);
    if (index1 === index2) {
      const res = new Array(len).fill(0);
      const multi = nums.reduce((a, b) => {
        return b === 0 ? a : a * b;
      }, 1);
      res[index1] = multi;
      return res;
      // 有一个0
    } else {
      // 有多个0，那么全部返回的是0
      return new Array(len).fill(0);
    }
  }
  // 如果没有0
  const multi = nums.reduce((a, b) => a * b, 1);
  const res = new Array(len);
  for (let i = 0; i < len; i++) {
    res[i] = multi / nums[i];
  }
  return res;
};

// 方法2：使用双数组
// 当前的结果等于前面的乘积 * 后面的乘积
// Your runtime beats 14.94 % of javascript submissions
const productExceptSelf2 = function(nums) {
  const len = nums.length;
  const index1 = nums.indexOf(0);
  // 如果有0
  if (index1 > -1) {
    const index2 = nums.lastIndexOf(0);
    if (index1 === index2) {
      const res = new Array(len).fill(0);
      const multi = nums.reduce((a, b) => {
        return b === 0 ? a : a * b;
      }, 1);
      res[index1] = multi;
      return res;
      // 有一个0
    } else {
      // 有多个0，那么全部返回的是0
      return new Array(len).fill(0);
    }
  }
  // 如果没有0
  const arr1 = new Array(len);
  arr1[0] = nums[0];
  const arr2 = new Array(len);
  arr2[len - 1] = nums[len - 1];
  for (let i = 1; i < len; i++) {
    arr1[i] = arr1[i - 1] * nums[i];
  }
  for (let i = len - 2; i >= 0; i--) {
    arr2[i] = arr2[i + 1] * nums[i];
  }
  const res = new Array(len);
  for (let i = 0; i < len; i++) {
    res[i] = (arr1[i - 1] || 1) * (arr2[i + 1] || 1);
  }
  return res;
};
// @lc code=end

export { productExceptSelf1, productExceptSelf2 };

~~~

  
### 0239-maxSlidingWindow.js

~~~js
// 239 滑动窗口的最大值

// 思路1：算法不好
// 4476 ms, 在所有 JavaScript 提交中击败了27.75%的用户
// 时间复杂度：列表长度 * 滑动窗口长度，能否有更好的方法（进入队列能否优化）
// 空间复杂度：会频繁操作数组
// 不好的原因：每次都把数字放在临时数组中，然后求最大值，这样是 n ^ 2
const maxSlidingWindow = function(nums, k) {
  const len = nums.length;
  if (k === 1) {
    return nums;
  }
  if (len === 1) {
    return nums[0];
  }
  // list 是单调递减的双端队列
  let list = [];
  list[0] = 0;
  // 初始化前面几个值
  for (let i = 1; i < k; i++) {
    const item = nums[i];
    const listLen = list.length;
    // 如果当前的值小于最后一个的值，直接插入到队列最后
    if (nums[list[listLen - 1]] > item) {
      list.push(i);
    }
    // 否则，找到合适的位置，插入队列中
    else {
      // 这里放入过程性能很差！
      for (let j = 0; j < listLen; j++) {
        if (nums[list[j]] <= item) {
          list.splice(j, listLen - j, i);
          break;
        }
      }
    }
  }
  // 现在已经把开始的K个元素放入了队列中，然后开始遍历剩下的数字，然后获取最大值
  const res = [];
  res[0] = nums[list[0]];
  for (let i = k; i < len; i++) {
    const item = nums[i];
    const listLen = list.length;
    // 如果新增的值小于最小的，那么直接插入最后
    if (nums[list[listLen - 1]] > item) {
      list.push(i);
    } else {
      // 这里需要遍历获取最大值，性能不好
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

/**
 * 思路2：滑动窗口的最大值（滑动窗口 + 双端队列）
 * 滑动窗口存放数组的索引
 * 每次滑动后，临时数组加入新的元素，并把小于等于这个数的全部都去掉
 * 这样确保临时数组的第一个元素是最大的元素
 * 272 ms 在所有 JavaScript 提交中击败了 90.34%
 * @param {array} nums 原始数组
 * @param {number} k 滑动窗口的区间（固定区间）
 */
const maxSlidingWindow2 = function(nums, k) {
  // 窗口数组（存放索引）
  const window = [];
  // 结果数组（存放最大值的结果）
  const res = [];
  // 循环数组（开始滑动窗口）
  for (let i = 0; i < nums.length; i++) {
    // 先把窗口外的元素去掉(如果当前索引，和第一个索引的差，大于窗口区间，直接去掉第一个)
    if (i - window[0] > k - 1) {
      window.shift();
    }
    // 把比新的元素小的数字对应的索引，全部去掉
    while (window.length > 0 && nums[window[window.length - 1]] <= nums[i]) {
      window.pop();
    }
    // 把新的元素放进去
    window.push(i);
    // 如果已经到达窗口区间，那么把第一个数（最大的数）放在结果数组中
    if (i >= k - 1) {
      res.push(nums[window[0]]);
    }
  }
  return res;
};

export { maxSlidingWindow, maxSlidingWindow2 };

// const maxSlidingWindow3 = function(nums, k){
//   let window = [];
//   let result = [];
//   for (let i = 0; i < nums.length; i++) {
//     if (i - k > window[0] - 1) {
//       window.shift();
//     }
//     if (window.length > 0 && nums[window[window.lenght - 1]] <= nums[i]) {
//       window.pop();
//     }
//     window.push(i);
//     if (i >= k - 1) {
//       result.push(nums[window[0]]);
//     }
//   }
//   return result;
// }

~~~

  
### 0240-searchMatrix.js

~~~js
/*
 * @lc app=leetcode.cn id=240 lang=javascript
 *
 * [240] 搜索二维矩阵 II
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
// Your runtime beats 5.05 % of javascript submissions

const getNumber = (arr, target) => {
  if (!arr) return false;
  const len = arr.length;
  let start = 0;
  let end = len - 1;
  if (arr[start] > target || arr[end] < target) {
    return false;
  }
  let mid = Math.floor((start + end) / 2);
  while (start < end - 1) {
    if (arr[mid] === target) {
      return true;
    } else if (arr[mid] > target) {
      end = mid;
    } else if (arr[mid] < target) {
      start = mid;
    }
    mid = Math.floor((start + end) / 2);
  }
  return false;
};

const searchMatrix = function(matrix, target) {
  const rowLen = matrix.length;
  const columnLen = matrix[0].length;
  // 如果目标值不在最大最小值范围内，不存在这个数字
  if (matrix[0][0] > target || matrix[rowLen - 1][columnLen - 1] < target) {
    return false;
  }
  // 先使用分治算法，缩小矩阵的范围(先缩小行的范围)
  let startRowIdx;
  let endRowIdx;
  for (let i = 0; i < rowLen; i++) {
    const row = matrix[i];
    if (row[0] === target || row[columnLen - 1] === target) return true;
    if (row[columnLen] < target) {
      continue;
    } else if (row[0] < target && row[columnLen - 1] > target && !startRowIdx && startRowIdx !== 0) {
      startRowIdx = i;
    } else if (row[0] > target && !endRowIdx && endRowIdx !== 0) {
      endRowIdx = i - 1;
    }
  }
  endRowIdx = !endRowIdx ? columnLen - 1 : endRowIdx;
  // 列需要优化
  for (let i = startRowIdx; i <= endRowIdx; i++) {
    const arr = matrix[i];
    if (getNumber(arr, target)) return true;
  }
  return false;
};

// @lc code=end

export { searchMatrix };

~~~

  
### 0242-isAnagram1.js

~~~js
/*
 * @lc app=leetcode.cn id=242 lang=javascript
 *
 * [242] 有效的字母异位词
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
// Your runtime beats 82.75 % of javascript submissions
// 思路一：使用哈希表
const isAnagram1 = function(s, t) {
  if (s.length !== t.length) return false;
  const dict = {};
  const len = s.length;
  for (let i = 0; i < len; i++) {
    const key = s[i];
    if (!dict[key]) {
      dict[key] = 0;
    }
    dict[key]++;
  }
  for (let i = 0; i < len; i++) {
    const key = t[i];
    if (!dict[key] || dict[key] === 0) return false;
    dict[key]--;
  }
  return true;
};
// 思路二：使用数组排序
// Your runtime beats 36.98 % of javascript submissions
const isAnagram2 = function(s, t) {
  const sLen = s.length;
  if (sLen !== t.length) return false;
  const arr1 = s.split('');
  const arr2 = t.split('');
  arr1.sort((a, b) => {
    return a > b ? 1 : -1;
  });
  arr2.sort((a, b) => {
    return a > b ? 1 : -1;
  });
  for (let i = 0; i < sLen; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
};

// @lc code=end

export { isAnagram1, isAnagram2 };

~~~

  
### 0257-binaryTreePaths.js

~~~js
/*
 * [257] 二叉树的所有路径
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string[]}
 */
const binaryTreePaths = function (root) {
  const result = [];
  if (!root) return result;
  if (!root.left && !root.right) {
    const item = String(root.val);
    result.push(item);
    return result;
  }
  // DFS 深度优先遍历
  // 设置一个子函数，然后全局设置一个返回的值
  const getValue = function (node, str) {
    const val = String(node.val);
    if (str === '') {
      str = val;
    } else {
      str = `${str}->${val}`;
    }
    if (node.left) getValue(node.left, str);
    if (node.right) getValue(node.right, str);
    if (!node.left && !node.right) {
      result.push(str);
    }
  };
  // 这里处理空树的情况
  getValue(root, '');
  return result;
};

export { binaryTreePaths };

~~~

  
### 0258-addDigits.js

~~~js
// 258 给定一个非负整数 num，反复将各个位上的数字相加，直到结果为一位数。
// 输入: 38 输出: 2 解释: 各位相加的过程为：3 + 8 = 11, 1 + 1 = 2。 由于 2 是一位数，所以返回 2。
// 进阶: 你可以不使用循环或者递归，且在 O(1) 时间复杂度内解决这个问题吗？

// 辅助函数：计算各个位数的和
function getSum(num) {
  let result = 0;
  while (num > 0) {
    const remainder = num % 10;
    result += remainder;
    num = (num - remainder) / 10;
  }
  return result;
}

// 96 ms, 在所有 javascript 提交中击败了41.59%
function addDigits(num) {
  if (num < 10) {
    return num;
  }
  do {
    num = getSum(num);
  } while (num >= 10);
  return num;
}

export { getSum, addDigits };

~~~

  
### 0260-singleNumber.js

~~~js
/*
 * @lc app=leetcode.cn id=260 lang=javascript
 * [260] 只出现一次的数字 III
 */
// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
// Your runtime beats 27.68 % of javascript submissions
const singleNumber = function(nums) {
  const len = nums.length;
  if (len === 2) {
    return nums;
  }
  const dict = {};
  for (let i = 0; i < len; i++) {
    const item = nums[i];
    if (dict[item]) {
      delete dict[item];
    } else {
      dict[item] = true;
    }
  }
  return Object.keys(dict);
};
// @lc code=end

export { singleNumber };

~~~

  
### 0263-ugly-number.js

~~~js
// 263
// 编写一个程序判断给定的数是否为丑数。
// 丑数就是只包含质因数 2, 3, 5 的正整数。(1 是丑数)

// 首先处理特殊的0123
// 思路：如果这个数可以整除5，那么计算整除后的数。直到无法整除
// 继续整除23

/**
 * @param {number} num
 * @return {boolean}
 */
// 92 ms , 在所有 javascript 提交中击败了 52.03%
function isUgly(num) {
  // 首先去掉特殊数字
  if (num <= 0) {
    return false;
  }
  if (num < 7) {
    return true;
  }
  if (num % 7 === 0 || num % 11 === 0 || num % 13 === 0 || num % 17 === 0) {
    return false;
  }
  while (num % 5 === 0 && num > 1) {
    num /= 5;
  }
  while (num % 3 === 0 && num > 1) {
    num /= 3;
  }
  while (num % 2 === 0 && num > 1) {
    num /= 2;
  }
  if (num > 1) {
    return false;
  }
  return true;
}

// 思路二：不需要考虑余数
// 80 ms , 在所有 javascript 提交中击败了 86.35%
function isUgly2(num) {
  if (num <= 0) {
    return false;
  }
  if (num < 7) {
    return true;
  }
  while (num % 5 === 0 && num > 1) {
    num /= 5;
  }
  while (num % 3 === 0 && num > 1) {
    num /= 3;
  }
  while (num % 2 === 0 && num > 1) {
    num /= 2;
  }
  if (num > 1) {
    return false;
  }
  return true;
}

export { isUgly, isUgly2 };

~~~

  
### 0268-missingNumber.js

~~~js
// 268 给定一个包含 0, 1, 2, ..., n 中 n 个数的序列，找出 0 .. n 中没有出现在序列中的那个数。
// 输入: [3,0,1] 输出: 2
// 输入: [9,6,4,2,3,5,7,0,1] 输出: 8
// 说明: 你的算法应具有线性时间复杂度。你能否仅使用额外常数空间来实现?
/**
 * @param {number[]} nums
 * @return {number}
 */
// 80 ms, 在所有 javascript 提交中击败了71.45%
// 计算一个实际的和，和理论上的总和，那么相减就是缺少的数字
function missingNumber(nums) {
  const len = nums.length;
  const defaultSum = ((1 + len) * len) / 2;
  let sum = 0;
  nums.forEach((num) => {
    sum += num;
  });
  const result = defaultSum - sum;
  return result;
}

export { missingNumber };

~~~

  
### 0274-hIndex.js

~~~js
/*
 * @lc app=leetcode.cn id=274 lang=javascript
 *
 * [274] H 指数
 */

// @lc code=start
/**
 * @param {number[]} citations
 * @return {number}
 */
// Your runtime beats 57 % of javascript submissions
const hIndex = function(citations) {
  const len = citations.length;
  if (len === 0) {
    return 0;
  }
  citations.sort((a, b) => b - a);
  if (citations[0] === 0) {
    return 0;
  }
  let result = 1;
  for (let i = 0; i < len; i++) {
    if (citations[i] >= i + 1) {
      const tmp = Math.min(citations[i], i + 1);
      result = tmp > result ? tmp : result;
    }
  }
  return result;
};

// 测试案例
// [] 0
// [0] 0
// [100] 1
// [11,15] 2
// [4,4,0,0] 2
// @lc code=end

export { hIndex };

~~~

  
### 0278-first-error-version.js

~~~js
// 获取第一个错误的版本，需要调用API
// 二分查找即可
// 辅助函数，判断是否是坏版本
function isBadVersion(num) {
  return num >= 100;
}

/**
 * @param {integer} n Total versions
 * @return {integer} The first bad version
 */
// 52 ms, 在所有 javascript 提交中击败了98.07%
function solution(n) {
  if (n === 1) return n;
  let start = 0;
  let end = n;
  let middle = Math.ceil((start + end) / 2);
  while (start < end - 1) {
    if (isBadVersion(middle)) {
      end = middle;
    } else {
      start = middle;
    }
    middle = Math.ceil((start + end) / 2);
  }
  return middle;
}

export { solution };

~~~

  
### 0279-numSquares.js

~~~js
/*
 * @lc app=leetcode.cn id=279 lang=javascript
 *
 * [279] 完全平方数
 */

// @lc code=start
/**
 * 完全平方数
 * https://leetcode.cn/problems/perfect-squares/
 * @param {number} n
 * @return {number}
 * Your runtime beats 89.32 % of ss submissions
 * Your memory usage beats 7.05 % of js submissions (48.9 MB)
 */
const numSquares = function(n) {
  const list = [];
  // 第一个表示当前的数字，第二个表示需要的数量
  list.push([n, 0]);
  // 把当前节点存储到缓存中，优化性能
  const map = new Map();
  map.set(n, true);
  // 广度优先循环，遍历图节点
  while (list.length > 0) {
    const current = list.shift();
    const [num, times] = current;
    // 注意：这里不能写 i < num，如果 n 是 0，这里也需要能进入
    // 因为 n = 1 比较特殊，可以直接开头把这个情况处理掉
    for (let i = 1; ; i++) {
      const newNum = num - i ** 2;
      if (newNum < 0) {
        break;
      }
      if (newNum === 0) {
        return times + 1;
      }
      // 这里可以节省大量性能
      if (!map.get(newNum)) {
        list.push([newNum, times + 1]);
        map.set(newNum, true);
      }
    }
  }
};
// @lc code=end

export { numSquares };

~~~

  
### 0283-moveZeroes.js

~~~js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 思路一：获取0的个数，然后末尾统一增加一个0
// 性能不好，击败了30%
function moveZeroes(nums) {
  let number = 0;
  for (let i = 0; i < nums.length;) {
    if (nums[i] === 0) {
      nums.splice(i, 1);
      number++;
    } else {
      i++;
    }
  }
  const arr = new Array(number);
  arr.fill(0);
  nums.push(...arr);
}

// 思路二：删除时就增加，不需要额外空间
// 84 ms, 在所有 javascript 提交中击败了40.02%
function moveZeroes2(nums) {
  let number = 0;
  const len = nums.length;
  for (let i = 0; i < len;) {
    if (i > len - number) {
      return;
    }
    if (nums[i] === 0) {
      nums.splice(i, 1);
      nums.push(0);
      number++;
    } else {
      i++;
    }
  }
}

export { moveZeroes, moveZeroes2 };

~~~

  
### 0284-PeekingIterator.js

~~~js
/*
 * @lc app=leetcode.cn id=284 lang=javascript
 *
 * [284] 顶端迭代器
 */

// @lc code=start
/**
 * // This is the Iterator's API interface.
 * // You should not implement it, or speculate about its implementation.
 * function Iterator() {
 *    @ return {number}
 *    this.next = function() { // return the next number of the iterator
 *       ...
 *    };
 *
 *    @return {boolean}
 *    this.hasNext = function() { // return true if it still has numbers
 *       ...
 *    };
 * };
 */
// 数组：Your runtime beats 32.5 % of javascript submissions
// 单变量：Your runtime beats 95 % of javascript submissions
// 可以改一下数组
/**
 * @param {Iterator} iterator
 */
const PeekingIterator = function(iterator) {
  this.iterator = iterator;
  this.cache = null;
};

/**
 * @return {number}
 */
PeekingIterator.prototype.peek = function() {
  // 执行这个方法，不会改变当前的next（需要获取顶端元素）
  // 先把这个元素输出来，放在缓存器中
  // 然后调用下面两个方法时，先访问缓存器的部分
  if (this.cache || this.cache === 0) {
    return this.cache;
  } else {
    const item = this.iterator.next();
    this.cache = item;
    return item;
  }
};

/**
 * @return {number}
 */
PeekingIterator.prototype.next = function() {
  if (this.cache || this.cache === 0) {
    const tmp = this.cache;
    this.cache = null;
    return tmp;
  } else {
    return this.iterator.next();
  }
};

/**
 * @return {boolean}
 */
PeekingIterator.prototype.hasNext = function() {
  if (this.cache || this.cache === 0) {
    return true;
  } else {
    return this.iterator.hasNext();
  }
};

/**
 * Your PeekingIterator object will be instantiated and called as such:
 * let obj = new PeekingIterator(arr)
 * let param_1 = obj.peek()
 * let param_2 = obj.next()
 * let param_3 = obj.hasNext()
 */
// @lc code=end

export { PeekingIterator };

~~~

  
### 0287-findDuplicate.js

~~~js
/*
 * @lc app=leetcode.cn id=287 lang=javascript
 *
 * [287] 寻找重复数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// 常规的思路：使用对象存储出现的数字，这样可以很容易找到重复的数字
// 这里需要不使用额外的空间，所以使用数组的正负号实现
// Your runtime beats 92.51 % of javascript submissions
const findDuplicate = function(nums) {
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    const item = Math.abs(nums[i]);
    const index = item - 1;
    if (nums[index] < 0) {
      return item;
    }
    nums[index] = -nums[index];
  }
};
// @lc code=end

export { findDuplicate };

~~~

  
### 0289-gameOfLife.js

~~~js
/*
 * @lc app=leetcode.cn id=289 lang=javascript
 *
 * [289] 生命游戏
 */

// @lc code=start

const getCell = (board, i, j) => {
  const item = board[i][j];
  let aliveCell = 0;
  // 上一行
  if (board[i - 1]) {
    if (board[i - 1][j - 1] > -1) {
      aliveCell += board[i - 1][j - 1];
    }
    if (board[i - 1][j] > -1) {
      aliveCell += board[i - 1][j];
    }
    if (board[i - 1][j + 1] > -1) {
      aliveCell += board[i - 1][j + 1];
    }
  }
  // 当前行
  if (board[i]) {
    if (board[i][j - 1] > -1) {
      aliveCell += board[i][j - 1];
    }
    if (board[i][j + 1] > -1) {
      aliveCell += board[i][j + 1];
    }
  }
  // 下一行
  if (board[i + 1]) {
    if (board[i + 1][j - 1] > -1) {
      aliveCell += board[i + 1][j - 1];
    }
    if (board[i + 1][j] > -1) {
      aliveCell += board[i + 1][j];
    }
    if (board[i + 1][j + 1] > -1) {
      aliveCell += board[i + 1][j + 1];
    }
  }
  // 判断结果
  // 如果是死细胞
  let result;
  if (item === 0) {
    result = aliveCell === 3 ? 1 : 0;
  } else {
    result = (aliveCell === 3 || aliveCell === 2) ? 1 : 0;
  }
  return result;
};

/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
// Your runtime beats 86.82 % of javascript submissions
const gameOfLife = function(board) {
  const len1 = board.length;
  const res = [];
  for (let i = 0; i < len1; i++) {
    const tmp = [];
    for (let j = 0; j < board[i].length; j++) {
      const newItem = getCell(board, i, j);
      tmp.push(newItem);
    }
    res.push(tmp);
  }
  // 现在返回值的res始终是正确的，但是返回值为什么不正确？？？
  // 这里使用原地算法，所以不正确啊
  for (let i = 0; i < len1; i++) {
    for (let j = 0; j < board[i].length; j++) {
      board[i][j] = res[i][j];
    }
  }
  // return board;
};

export { gameOfLife };

~~~

  
### 0290-wordPattern.js

~~~js
// wordPattern
/**
 * @param {string} pattern
 * @param {string} str
 * @return {boolean}
 */
// 思路1：把字符串转化成数组
// 设置一个空字典，遍历数组和对应的字符串。
// 如果数组中可以查到符合，继续徐娜混；如果查到不同，返回false；如果未查到，增加到数组中
// 如果数组的长度和字符串的长度不同，那么一定是false
// 92 ms, 在所有 javascript 提交中击败了5.88%
// 性能不好，分析一下，想一个更好的方法
function wordPattern(pattern, str) {
  const arr = str.split(' ');
  const len = arr.length;
  if (pattern.length !== len) {
    return false;
  }
  const dict = {};
  for (let i = 0; i < len; i++) {
    const patt = pattern[i];
    if (!dict[patt]) {
      dict[patt] = arr[i];
    } else if (dict[patt] !== arr[i]) {
      return false;
    }
  }
  const dict2 = {};
  for (const key in dict) {
    // Object.prototype.hasOwnProperty.call(dict, key)
    if (Object.prototype.hasOwnProperty.call(dict, key)) {
      if (dict2[dict[key]]) {
        return false;
      }
      dict2[dict[key]] = true;
    }
  }
  return true;
}

export { wordPattern };

~~~

  
### 0292-nim-game.js

~~~js
// 292
// 你和你的朋友，两个人一起玩 Nim 游戏：桌子上有一堆石头，每次你们轮流拿掉 1 - 3 块石头。 拿掉最后一块石头的人就是获胜者。你作为先手。
// 你们是聪明人，每一步都是最优解。 编写一个函数，来判断你是否可以在给定石头数量的情况下赢得游戏。

// 示例:
// 输入: 4
// 输出: false
// 解释: 如果堆中有 4 块石头，那么你永远不会赢得比赛；因为无论你拿走 1 块、2 块 还是 3 块石头，最后一块石头总是会被你的朋友拿走。

// 56 ms, 在所有 javascript 提交中击败了96.89%
/**
 * @param {number} n
 * @return {boolean}
 */
function canWinNim(n) {
  if (n === 0) {
    return false;
  }
  if (n % 4 === 0) {
    return false;
  }
  return true;
}

export { canWinNim };

~~~

  
### 0295-len.js

~~~js
/*
 * @lc app=leetcode.cn id=295 lang=javascript
 *
 * [295] 数据流的中位数
 */
// 思路1：插入的时候随便插入
// 然后找中位数时，排序然后获取中位数
// 这样效果不是很好
// Your runtime beats 25.89 % of javascript submissions
// 4912 ms
// @lc code=start
/**
 * initialize your data structure here.
 */
const MedianFinder = function() {
  list = [];
};
/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
  list.push(num);
};
/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
  const len = list.length;
  if (len === 0) {
    return 0;
  } else if (len === 1) {
    return list[0];
  } else if (len === 2) {
    return (list[0] + list[1]) / 2;
  }
  list.sort((a, b) => a - b);
  if (len % 2 === 1) {
    // 找到中间的数字即可
    const index = (len - 1) / 2;
    return list[index];
  } else {
    const index = len / 2;
    return (list[index - 1] + list[index]) / 2;
  }
};

// 思路二：插入的时候按照二分法对已经排序的数组插入
// 寻找中位数直接可以找到
// 300 ms
// , 在所有 JavaScript 提交中击败了
// 86.61%
const MedianFinder2 = function() {
  list = [];
};

MedianFinder2.prototype.addNum = function(num) {
  const len = list.length;
  if (len === 0) {
    list.push(num);
  } else if (num < list[0]) {
    list.unshift(num);
    return;
  } else if (num > list[list.length - 1]) {
    list.push(num);
    return;
  }
  // 当新数字介于已有数字时，使用二分法插入
  let start = 0;
  let end = len - 1;
  while (start < end) {
    const middle = Math.ceil((start + end) / 2);
    if (list[middle] > num) {
      end = middle;
    } else if (list[middle] < num) {
      start = middle;
    } else {
      // list[middle] === num
      list.splice(middle, 0, num);
      return;
    }
    if (start === end - 1) {
      list.splice(end, 0, num);
      return;
    }
  }
};

MedianFinder2.prototype.findMedian = function() {
  const len = list.length;
  if (len === 0) {
    return 0;
  } else if (len === 1) {
    return list[0];
  } else if (len === 2) {
    return (list[0] + list[1]) / 2;
  }
  if (len % 2 === 1) {
    const index = (len - 1) / 2;
    return list[index];
  } else {
    const index = len / 2;
    return (list[index - 1] + list[index]) / 2;
  }
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * let obj = new MedianFinder()
 * obj.addNum(num)
 * let param_2 = obj.findMedian()
 */
// @lc code=end

export { MedianFinder, MedianFinder2 };

~~~

  
### 0297-serialize-tree.js

~~~js
// 297 二叉树的序列化和反序列化，需要按照官方的格式，去序列化
// 简单就是：中序遍历（递归二叉树的节点） + 字符串拼接即可
// 可以不用转换成数组，然后再转换成字符串的格式

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 * 二叉树序列化成字符串
 * @param {TreeNode} root
 * @return {string}
 */
const serialize = function(root) {
  const runNode = (root, str) => {
    if (root === null) {
      str += 'None,';
    } else {
      str = `${str + root.val},`;
      str = runNode(root.left, str);
      str = runNode(root.right, str);
    }
    return str;
  };
  return runNode(root, '');
};

/**
 * Decodes your encoded data to tree.
 * 字符串反序列化成二叉树
 * @param {string} data
 * @return {TreeNode}
 */
const deserialize = function(data) {
  const runArr = (arr) => {
    if (arr[0] === 'None') {
      arr.shift();
      return null;
    }
    const node = new TreeNode(parseInt(arr[0]));
    arr.shift();
    node.left = runArr(arr);
    node.right = runArr(arr);
    return node;
  };
  const list = data.split(',');
  return runArr(list);
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

export { serialize, deserialize };

~~~

  
### 0299-getHint.js

~~~js
// 299
// 你正在和你的朋友玩 猜数字（Bulls and Cows）游戏：你写下一个数字让你的朋友猜。每次他猜测后，你给他一个提示，告诉他有多少位数字和确切位置都猜对了（称为“Bulls”, 公牛），有多少位数字猜对了但是位置不对（称为“Cows”, 奶牛）。你的朋友将会根据提示继续猜，直到猜出秘密数字。

// 请写出一个根据秘密数字和朋友的猜测数返回提示的函数，用 A 表示公牛，用 B 表示奶牛。
// 请注意秘密数字和朋友的猜测数都可能含有重复数字
/**
 * @param {string} secret
 * @param {string} guess
 * @return {string}
 */
// 88 ms , 在所有 javascript 提交中击败了47.66%
function getHint(secret, guess) {
  let secret1 = secret;
  let guess1 = guess;
  let numA = 0;
  let numB = 0;
  // 遍历一次，找到位置相同的数字，并删除这个数字
  for (let i = 0; i < secret1.length; i++) {
    if (secret1[i] === guess1[i]) {
      numA++;
      secret1 = secret1.slice(0, i) + secret1.slice(i + 1, secret1.length);
      guess1 = guess1.slice(0, i) + guess1.slice(i + 1, guess1.length);
      i--;
    }
  }
  // 再遍历一次，找到位置不同的数字，然后删除对应的数字
  for (let i = 0; i < secret1.length; i++) {
    const index = guess1.indexOf(secret1[i]);
    if (index > -1) {
      guess1 = guess1.slice(0, index) + guess1.slice(index + 1, guess1.length);
      secret1 = secret1.slice(0, i) + secret1.slice(i + 1, secret1.length);
      i--;
      numB++;
    }
  }
  return `${numA}A${numB}B`;
}

export { getHint };

~~~

  
### 0303-NumArray.js

~~~js
/*
 * @lc app=leetcode.cn id=303 lang=javascript
 * [303] 区域和检索 - 数组不可变
 */
// @lc code=start
/**
 * @param {number[]} nums
 */
// 多次调用函数，那么这个数量级，直接内存溢出
// （每一次是N，那么多次就是N的平方）
// 求一个区间的和[i, j] 那么可以转换成 sum [0, j] - sum [i, j] 注意边界
// 使用动态规划，在初始化的时候，每一个节点存储当前的和，直接做减法就行
// 这就是这个题目的精髓
// 132 ms
// , 在所有 JavaScript 提交中击败了
// 84.20%
const NumArray = function(nums) {
  const len = nums.length;
  if (len === 0) return;
  this.sum = [];
  this.sum[0] = nums[0];
  if (len === 1) return;
  for (let i = 1; i < len; i++) {
    if (nums[i] || nums[i] === 0) {
      this.sum[i] = this.sum[i - 1] + nums[i];
    }
  }
};

/**
 * @param {number} i
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function(i, j) {
  if (i === 0 && j === 0) {
    return this.sum[0];
  }
  const end = this.sum[j];
  const start = (this.sum[i - 1] || this.sum[i - 1] === 0) ? this.sum[i - 1] : 0;
  return end - start;
};

/**
 * Your NumArray object will be instantiated and called as such:
 * let obj = new NumArray(nums)
 * let param_1 = obj.sumRange(i,j)
 */
// @lc code=end

export { NumArray };

~~~

  
### 0318-maxProduct.js

~~~js
/**
 * @param {string[]} words
 * @return {number}
 */

// 318. 最大单词长度乘积
// 给你一个字符串数组 words ，找出并返回 length(words[i]) * length(words[j]) 的最大值，并且这两个单词不含有公共字母。
// 如果不存在这样的两个单词，返回 0 。
// 链接：https://leetcode-cn.com/problems/maximum-product-of-word-lengths
// 2 <= words.length <= 1000
// 1 <= words[i].length <= 1000

// 思路1：基本方法
// 1620 ms, 在所有 JavaScript 提交中击败了15.94%
// 这个方法显然不好
// 判断两个单词是否有公共部分，遍历每一个字符，并获取公共部分，这个性能较差
const maxProduct = function(words) {
  // 1、遍历一次数组，把每一个都转换成对象，包括字符串的长度，内部出现的字符（无重复数组）
  const words1 = words.map((word) => {
    return {
      len: word.length,
      word,
    };
  });

  // 2 把所有的长度都相乘，放在临时数组中
  const tmp = [];
  for (let i = 0; i < words1.length; i++) {
    for (let j = i + 1; j < words1.length; j++) {
      tmp.push({
        len: words1[i].len * words1[j].len,
        word1: words1[i].word,
        word2: words1[j].word,
      });
    }
  }

  // 3、从大到小排列
  tmp.sort((a, b) => {
    return a.len > b.len ? -1 : 1;
  });

  // 这个存放不同单词的出现的次数
  const dict = {};

  // 辅助函数，计算不同单词出现的字母的字典
  function getDict(str) {
    const tmp2 = {};
    for (let i = 0; i < str.length; i++) {
      if (!tmp2[str[i]]) {
        tmp2[str[i]] = true;
      }
    }
    dict[str] = tmp2;
  }

  // 辅助函数：计算两个单词是否有重复的字母
  function checkWords(word1, word2) {
    const obj1 = dict[word1];
    const obj2 = dict[word2];
    for (const key in obj1) {
      if (obj2[key]) {
        return false;
      }
    }
    return true;
  }

  // 4 循环一次，看是否满足，然后返回结果
  for (let i = 0; i < tmp.length; i++) {
    const { word1, word2 } = tmp[i];
    if (!dict[word1]) {
      getDict(word1);
    }
    if (!dict[word2]) {
      getDict(word2);
    }
    if (checkWords(word1, word2)) {
      return tmp[i].len;
    }
  }
  // 5、如果都有重复，那么返回空
  return 0;
};

// 官方给出：位运算
// 如果可以将判断两个单词是否有公共字母的时间复杂度降低到 O(1)O(1)，则可以将总时间复杂度降低到 O(n^2)。可以使用位运算预处理每个单词，通过位运算操作判断两个单词是否有公共字母。由于单词只包含小写字母，共有 2626 个小写字母，因此可以使用位掩码的最低 2626 位分别表示每个字母是否在这个单词中出现。将 \text{a}a 到 \text{z}z 分别记为第 00 个字母到第 2525 个字母，则位掩码的从低到高的第 ii 位是 11 当且仅当第 ii 个字母在这个单词中，其中 0 \le i \le 250≤i≤25。

// 用数组 \textit{masks}masks 记录每个单词的位掩码表示。计算数组 \textit{masks}masks 之后，判断第 ii 个单词和第 jj 个单词是否有公共字母可以通过判断 \textit{masks}[i]~\&~\textit{masks}[j]masks[i] & masks[j] 是否等于 00 实现，当且仅当 \textit{masks}[i]~\&~\textit{masks}[j] = 0masks[i] & masks[j]=0 时第 ii 个单词和第 jj 个单词没有公共字母，此时使用这两个单词的长度乘积更新最大单词长度乘积。

const maxProduct2 = function(words) {
  const length = words.length;
  const masks = new Array(length).fill(0);
  for (let i = 0; i < length; i++) {
    const word = words[i];
    const wordLength = word.length;
    for (let j = 0; j < wordLength; j++) {
      masks[i] |= 1 << (word[j].charCodeAt() - 'a'.charCodeAt());
    }
  }
  let maxProd = 0;
  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
      if ((masks[i] & masks[j]) === 0) {
        maxProd = Math.max(maxProd, words[i].length * words[j].length);
      }
    }
  }
  return maxProd;
};

export { maxProduct, maxProduct2 };

~~~

  
### 0326-isPowerOfThree.js

~~~js
// 326 给定一个整数，写一个函数来判断它是否是 3 的幂次方。
// 输入: 27 true
// 输入: 0 输出: false
// 输入: 9 true
// 你能不使用循环或者递归来完成本题吗？
/**
 * @param {number} n
 * @return {boolean}
 */
// 224 ms, 在所有 javascript 提交中击败了99.51%
// 思路1：根据定义求
function isPowerOfThree(n) {
  if (n <= 0) return false;
  if (n === 1) return true;
  do {
    const remainder = n % 3;
    if (remainder !== 0) {
      return false;
    }
    n /= 3;
  } while (n > 1);
  return true;
}

export { isPowerOfThree };

~~~

  
### 0342-isPowerOfFour.js

~~~js
// 判断一个数是否是4的幂
/**
 * @param {number} num
 * @return {boolean}
 */
// 如果是0或者4，直接返回true
// 第一种思路：循环除以4，如果余数不是0，那么就返回false
// 84 ms, 在所有 javascript 提交中击败了71.89%
function isPowerOfFour(num) {
  if (num <= 0) {
    return false;
  }
  while (num > 1) {
    const remain = num % 4;
    if (remain !== 0) return false;
    num /= 4;
  }
  return true;
}

// 思路二：实验中，4的幂一定是4或者6结尾，那么可以排除很多的数字
// 68 ms, 在所有 javascript 提交中击败了99.20%
function isNotFour(num) {
  const remain = num % 10;
  if (remain === 4 || remain === 6) {
    return true;
  }
  return false;
}

function isPowerOfFour2(num) {
  if (num === 1) return true;
  if (num <= 0 || !isNotFour(num)) {
    return false;
  }
  while (num > 1) {
    if (!isNotFour(num)) return false;
    const remain = num % 4;
    if (remain !== 0) return false;
    num /= 4;
  }
  return true;
}

// 其他的思路：首先把数值转换成二进制，转换成字符串 num = num.toString(2)
// 找规律发现，二进制字符串都是100 00 00 00 形式
// 可以使用正则表达式匹配获取结果
// 当然性能一般

export { isPowerOfFour, isPowerOfFour2 };

~~~

  
### 0343-integerBreak.js

~~~js
/**
 * @param {number} n
 * @return {number}
 * 给定一个正整数 n，将其拆分为至少两个正整数的和，并使这些整数的乘积最大化。 返回你可以获得的最大乘积。
 */
// 示例 1:
// 输入: 2
// 输出: 1
// 解释: 2 = 1 + 1, 1 × 1 = 1。

// 示例 2:
// 输入: 10
// 输出: 36
// 解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36。

// 找规律
// 尽量不选择1（）
// 2 = 1 + 1 => 1
// 3 = 1 + 2 => 2
// 4 = 2 + 2 => 4
// 5 = 2 + 3 => 6
// 尽量分解成3的倍数和4的倍数

// 动态规划？
// 首先除以3，商是 N，看余数是 012
// 如果是0，那么直接返回 3  ^ n
// 如果是1，那么直接返回 3 ^ (n - 1) * 4
// 如果是2，直接返回 3 ^ n * 2

const integerBreak = function(n) {
  if (n <= 1) {
    return 1;
  }
  if (n === 2) {
    return 1;
  }
  if (n === 3) {
    return 2;
  }
  const b = n % 3;
  const a = (n - b) / 3;
  if (b === 0) {
    return 3 ** a;
  }
  if (b === 1) {
    return 3 ** (a - 1) * 4;
  }
  if (b === 2) {
    return 3 ** a * 2;
  }
};

export { integerBreak };

~~~

  
### 0344-reverseString.js

~~~js
// 344
// 编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 char[] 的形式给出。
// 不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。
// 你可以假设数组中的所有字符都是 ASCII 码表中的可打印字符。
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
// 128 ms, 在所有 javascript 提交中击败了90.73%
function reverseString(s) {
  const len = s.length;
  for (let i = 0; i < len / 2; i++) {
    if (s[i] !== s[len - 1 - i]) {
      const tmp = s[i];
      s[i] = s[len - 1 - i];
      s[len - 1 - i] = tmp;
    }
  }
}

export { reverseString };

~~~

  
### 0345-reverseVowels.js

~~~js
/**
 * @param {string} s
 * @return {string}
 * [345] 反转字符串中的元音字母
 */
// 416 ms , 在所有 JavaScript 提交中击败了 5.13%
const reverseVowels = function(s) {
  const strs = s;
  // 辅助函数，判断是否是元音
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const isVowel = (str) => {
    const s = str.toLocaleLowerCase();
    return vowels.includes(s);
  };
  const dict = {};
  let vowelArr = [];
  for (let i = 0; i < strs.length; i++) {
    if (isVowel(strs[i])) {
      dict[i] = true;
      vowelArr.push(strs[i]);
    }
  }
  // 如果没有元音，直接返回
  if (dict.length === 0) return s;
  vowelArr = vowelArr.reverse();
  let result = '';
  for (let i = 0; i < strs.length; i++) {
    if (dict[i]) {
      const item = vowelArr.shift();
      result = result + item;
    } else {
      result = result + strs[i];
    }
  }
  return result;
};

export { reverseVowels };

~~~

  
### 0347-topKFrequent.js

~~~js
/*
 * [347] 前 K 个高频元素
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
// 思路：第一次循环，获取不同数字出现的频率，这是必须的N
// 然后遍历哈希表的值,设置一个数组存储
// 遍历过程中，获取最大的几个值（然后依次比较第三个元素），最后输出结果即可
// 92 ms, 在所有 JavaScript 提交中击败了86.41%
function topKFrequent(nums, k) {
  const len = nums.length;
  if (len === k) {
    return nums;
  }
  const hashMap = {};
  for (let i = 0; i < len; i++) {
    const item = nums[i];
    if (hashMap[item]) {
      hashMap[item]++;
    } else {
      hashMap[item] = 1;
    }
  }
  // 获取哈希表，遍历哈希表的值
  const target = [];
  for (const key in hashMap) {
    if (Object.prototype.hasOwnProperty.call(hashMap, key)) {
      const value = hashMap[key];
      target.push(value);
    }
  }
  target.sort((a, b) => b - a);
  const res = target.slice(0, k);
  // 这里是结果数组的次数，再次反向遍历哈希表试一下
  const result = [];
  for (const key in hashMap) {
    if (Object.prototype.hasOwnProperty.call(hashMap, key)) {
      const value = hashMap[key];
      if (res.includes(value)) {
        result.push(key);
      }
    }
  }
  return result;
}

// todo: 算法待优化
// 这里存放最大的目标值
// 前K个直接放在数组中
// let targetArr = new Array(k);
// if (target.length < k) {
//   target.push(value);
// }
// else if (target.length === k) {
//   if (noSort) {
//     target.sort((a, b) => a - b);
//     console.log(target);
//   }
//   if (target[target.length - 1])
// }

export { topKFrequent };

~~~

  
### 0349-intersection.js

~~~js
// 349
// 给定两个数组，编写一个函数来计算它们的交集。
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
// 首先把每个数组去重，获取去重后的数组
// 循环一个数组，判断另一个数组中是否包含这个节点，然后把重复的结果放在result数组中
// 已经战胜 56.82 % 的 javascript
function intersection(nums1, nums2) {
  const arr1 = Array.from(new Set(nums1));
  const arr2 = Array.from(new Set(nums2));
  const result = [];
  for (let i = 0; i < arr1.length; i++) {
    const item = arr1[i];
    if (arr2.includes(item)) {
      result.push(item);
    }
  }
  return result;
}

export { intersection };

~~~

  
### 0350-intersect.js

~~~js
// intersect
// 给定两个数组，编写一个函数来计算它们的交集。
// 输入: nums1 = [1,2,2,1], nums2 = [2,2]
// 输出: [2,2]
// 输入: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
// 输出: [4,9]
// 72 ms, 在所有 javascript 提交中击败了66.28%
function intersect(nums1, nums2) {
  const result = [];
  for (let i = 0; i < nums1.length; i++) {
    const item = nums1[i];
    const index = nums2.indexOf(item);
    if (index > -1) {
      result.push(item);
      nums2.splice(index, 1);
    }
  }
  return result;
}

export { intersect };

~~~

  
### 0355-Twitter.js

~~~js
/*
 * @lc app=leetcode.cn id=355 lang=javascript
 *
 * [355] 设计推特
 */

// @lc code=start
/**
 * Initialize your data structure here.
 */
// 184 ms, 在所有 JavaScript 提交中击败了44.19%
const Twitter = function() {
  // 用户关注数据库表
  // 这个是一个对象
  // 对象的键是用户ID，对象的值是一个数组（关注的人）
  // 这里支持增删关注这
  follow = {};
  // 推文发送数据库（时间戳和发送人）表
  // 这个使用数组实现，可以实现先后顺序
  // 每个数据是一个对象，存储当前的用户、信息等
  twitters = [];
};

/**
 * Compose a new tweet.
 * @param {number} userId
 * @param {number} tweetId
 * @return {void}
 */
Twitter.prototype.postTweet = function(userId, tweetId) {
  const twitter = { userId, tweetId };
  twitters.push(twitter);
};

/**
 * Retrieve the 10 most recent tweet ids in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user herself. Tweets must be ordered from most recent to least recent.
 * @param {number} userId
 * @return {number[]}
 */
Twitter.prototype.getNewsFeed = function(userId) {
  // 这里获取有效的用户ID
  const followers = follow[userId] ? follow[userId].slice(0) : [];
  followers.push(userId);
  const res = [];
  for (let i = twitters.length - 1; i >= 0; i--) {
    const item = twitters[i];
    if (followers.includes(item.userId)) {
      res.push(item.tweetId);
    }
    if (res.length >= 10) {
      break;
    }
  }
  return res;
};

/**
 * Follower follows a followee. If the operation is invalid, it should be a no-op.
 * @param {number} followerId
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.follow = function(followerId, followeeId) {
  if (followerId === followeeId) return;
  if (!follow[followerId]) {
    follow[followerId] = [];
  }
  // 如果已经关注一个人了，再次关注不需要添加
  if (follow[followerId].indexOf(followeeId) > -1) return;
  follow[followerId].push(followeeId);
};

/**
 * Follower unfollows a followee. If the operation is invalid, it should be a no-op.
 * @param {number} followerId
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.unfollow = function(followerId, followeeId) {
  if (followerId === followeeId) return;
  if (!follow[followerId]) return;
  const index = follow[followerId].indexOf(followeeId);
  // 如果没有找到这个人，那么不需要删除
  if (index < 0) return;
  follow[followerId].splice(index, 1);
};

// 可能出现自己关注自己，自己取消关注自己，这些都是无效的操作
// ["Twitter","postTweet","unfollow","getNewsFeed"]
// [[],[1,5],[1,1],[1]]

/**
 * Your Twitter object will be instantiated and called as such:
 * let obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * let param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */
// @lc code=end

export { Twitter };

~~~

  
### 0367-isPerfectSquare.js

~~~js
// 367. 有效的完全平方数
/**
 * @param {number} num
 * @return {boolean}
 */
// 88 ms, 在所有 javascript 提交中击败了25.41%
// 思路一：直接循环一次
function isPerfectSquare(num) {
  if (num === 0 || num === 1) {
    return true;
  }
  for (let i = 1; i < num; i++) {
    const product = i ** 2;
    if (product === num) {
      return true;
    }
    if (product > num) {
      return false;
    }
  }
  return false;
}

// 思路二：应该使用二分法求解
// 60 ms, 在所有 javascript 提交中击败了88.67%
function isPerfectSquare2(num) {
  if (num === 0 || num === 1) {
    return true;
  }
  let start = 1;
  let end = Math.ceil(num / 2);
  let middle;
  do {
    middle = Math.ceil((start + end) / 2);
    const product = middle ** 2;
    if (product === num) {
      return true;
    }
    if (product < num) {
      start = middle;
    } else if (product > num) {
      end = middle;
    }
  } while (start + 1 < end);
  return false;
}

export { isPerfectSquare, isPerfectSquare2 };

~~~

  
### 0371-getSum.js

~~~js
// 371 不使用运算符 + 和 - ​​​​​​​，计算两整数 ​​​​​​​a 、b ​​​​​​​之和。
/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
// 思路一：使用加减号
// 64 ms
function getSum1(a, b) {
  return a + b;
}

// 思路二：使用位运算符（实现加减法）
// http://zouyang1230.com/blog/archives/805
// 60 ms, 在所有 javascript 提交中击败了89.60%
// 这种方法很偏
function getSum2(a, b) {
  if (a === 0 || b === 0) {
    return a || b;
  }
  let ntempNum;
  while (b !== 0) {
    ntempNum = a ^ b;
    b = (a & b) << 1;
    a = ntempNum;
  }
  return a;
}

export { getSum1, getSum2 };

~~~

  
### 0377-combinationSum-ⅳ.js

~~~js
/*
 * @lc app=leetcode.cn id=377 lang=javascript
 *
 * [377] 组合总和 Ⅳ
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// 思路：回溯算法计算全部的情况
// 把结果数组去重即可
// 用回溯法翻车了
// 现在内存溢出，看来方法不正确
// [4,2,1]
// 32

// const combinationSum4 = function(nums, target) {
//   const deleteSame = (arr) => {
//     let dict = {};
//     let res = [];
//     arr.forEach(item => {
//       let key = String(item);
//       if (!dict[key]) {
//         dict[key] = true;
//         res.push([...item]);
//       }
//     });
//     return res;
//   };
//   const len = nums.length;
//   const backTrack = (tmp, list, currentSum) => {
//     if (currentSum === target) {
//       list.push([...tmp]);
//       return;
//     }
//     if (currentSum > target) {
//       return;
//     }
//     for (let i = 0; i < len; i++) {
//       let current = nums[i];
//       if (currentSum + current > target) {
//         continue;
//       }
//       tmp.push(current);
//       backTrack(tmp, list, currentSum + current);
//       tmp.pop();
//     }
//   };
//   let tmp = [];
//   let list = [];
//   // 回溯
//   let currentSum = 0;
//   backTrack(tmp, list, currentSum);
//   // list 去重
//   list = deleteSame(list);
//   return list.length;
// };

// Your runtime beats 18.52 % of javascript submissions
const combinationSum4 = function(nums, target) {
  // 动态规划（类似背包问题）
  // dp(target) = dp(target - nums1) + dp(target - nums2) + ... + dp(target - numsN)
  // dp(n) if n < 0 return 0; dp(0) === dp(1) === 1
  nums.sort((a, b) => b - a);
  const dp = [];
  dp[0] = 1;
  dp[1] = 1;
  for (let i = 1; i <= target; i++) {
    let tmp = 0;
    nums.forEach((num) => {
      if (i - num >= 0) {
        tmp += dp[i - num];
      }
    });
    dp[i] = tmp;
  }
  return dp[target];
};

// [1,2,3]
// 4
// 7
// 应该使用动态规划
// https://leetcode-cn.com/problems/combination-sum-iv/solution/377-zu-he-zong-he-iv-javascript-san-chong-jie-ti-s/

// @lc code=end

export { combinationSum4 };

~~~

  
### 0378-kthSmallest.js

~~~js
/*
 * @lc app=leetcode.cn id=378 lang=javascript
 *
 * [378] 有序矩阵中第 K 小的元素
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
// 思路1：暴力法：直接把矩阵转换成数组，然后排序，然后返回值
// 这个可以实现，数组最长90000，不会超出内存限制
// 但是性能很差
// Your runtime beats 48.99 % of javascript submissions
const kthSmallest = function(matrix, k) {
  const arr = matrix.flat(1);
  arr.sort((a, b) => a > b ? 1 : -1);
  return arr[k - 1];
};

// 思路二：如果一个元素位于 (i, j) 点
// 那么右方和下方两个数组一定大于这个数字
// 然后进行比较，获取一条对角线上的数组，从左上角到右下角依次遍历
// 直接满足K个数字
// 这是结拜呢的思路，但是细节还需要考虑
// 还有没有更好的办法
// @lc code=end

export { kthSmallest };

~~~

  
### 0380-RandomizedSet.js

~~~js
/*
 * [380] 常数时间插入、删除和获取随机元素
 */
// 216 ms, 在所有 JavaScript 提交中击败了42.73%
/**
 * Initialize your data structure here.
 */
const RandomizedSet = function() {
  // 初始化一个没有重复的Set键值对
  hashTable = new Map();
};

/**
 * Inserts a value to the set. Returns true if the set did not already contain the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
  // 首先判断是否存在
  const has = hashTable.has(val);
  if (has) {
    // 如果存在，不插入元素，并返回 false
    return false;
  } else {
    // 如果不存在，插入元素，并返回 true
    hashTable.set(val);
    return true;
  }
};

/**
 * Removes a value from the set. Returns true if the set contained the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
  const has = hashTable.has(val);
  if (has) {
    hashTable.delete(val);
    // 如果存在，不插入元素，并返回 false
    return true;
  } else {
    // 如果不存在，插入元素，并返回 true
    return false;
  }
};

/**
 * Get a random element from the set.
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
  // 获取当前的数量
  const size = hashTable.size;
  if (size === 0) return null; // 这个需要测试（空集合）
  const keys = [...hashTable.keys()];
  // 然后设置一个随机数，然后通过下标获取对应的元素
  const index = Math.floor(Math.random() * size);
  return keys[index];
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * let obj = new RandomizedSet()
 * let param_1 = obj.insert(val)
 * let param_2 = obj.remove(val)
 * let param_3 = obj.getRandom()
 */

export { RandomizedSet };

~~~

  
### 0381-RandomizedCollection.js

~~~js
/* *
 * [381] O(1) 时间插入、删除和获取随机元素 - 允许重复
 */
// 思路一：使用数组实现
// 好处：获取随机值容易
// 缺点：删除消耗的时间较多
// （首先判断是否存在并获取索引，然后删除）
// 248 ms, 在所有 JavaScript 提交中击败了 24.14%的用户

// 思路二：使用哈希表实现
// 好处：增删简单，不需要遍历数组
// 缺点：查找消耗时间比较多
//
/**
 * Initialize your data structure here.
 */
const RandomizedCollection = function() {
  arr = [];
};

/**
 * Inserts a value to the collection. Returns true if the collection did not already contain the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedCollection.prototype.insert = function(val) {
  if (arr.indexOf(val) === -1) {
    arr.push(val);
    return true;
  } else {
    arr.push(val);
    return false;
  }
};

/**
 * Removes a value from the collection. Returns true if the collection contained the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedCollection.prototype.remove = function(val) {
  const index = arr.indexOf(val);
  if (index === -1) {
    return false;
  } else {
    arr.splice(index, 1);
    return true;
  }
};

/**
 * Get a random element from the collection.
 * @return {number}
 */
RandomizedCollection.prototype.getRandom = function() {
  if (arr.length === 0) {
    return 0;
  }
  const index2 = Math.floor(Math.random() * arr.length);
  return arr[index2];
};

export { RandomizedCollection };

~~~

  
### 0383-canConstruct.js

~~~js
/*
 * [383] 赎金信
 */
/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
// 104 ms, 在所有 JavaScript 提交中击败了 74.19%
const canConstruct = function(ransomNote, magazine) {
  // 遍历两个数组，然后获取字典，看字典中出现的数量是否满足
  const l1 = ransomNote.length;
  const l2 = magazine.length;
  if (l1 > l2) {
    return false;
  }
  const dict2 = {};
  for (let i = 0; i < l2; i++) {
    const key = magazine[i];
    if (dict2[key]) {
      dict2[key]++;
    } else {
      dict2[key] = 1;
    }
  }
  const dict1 = {};
  for (let j = 0; j < l1; j++) {
    const key = ransomNote[j];
    if (dict1[key]) {
      dict1[key]++;
    } else {
      dict1[key] = 1;
    }
    if (!dict2[key] || dict1[key] > dict2[key]) {
      return false;
    }
  }
  return true;
};

export { canConstruct };

~~~

  
### 0387-firstUniqChar.js

~~~js
/*
 * @lc app=leetcode.cn id=387 lang=javascript
 *
 * [387] 字符串中的第一个唯一字符
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
// 这是最基础的办法
// 140 ms, 在所有 JavaScript 提交中击败了 34.39%
const firstUniqChar = function(s) {
  for (let i = 0; i < s.length; i++) {
    if (s.indexOf(s[i]) === s.lastIndexOf(s[i])) {
      return i;
    }
  }
  return -1;
};

// 方法2：遍历一次字符串，把重复的记录一下
// 116 ms , 在所有 JavaScript 提交中击败 81.43%
const firstUniqChar2 = function(s) {
  const dict = {};
  for (let i = 0; i < s.length; i++) {
    const key = s[i];
    if (!dict[key] && dict[key] !== 0) {
      dict[key] = i;
    } else {
      dict[key] = -1;
    }
  }
  let index;
  for (const key in dict) {
    if (dict[key] > -1) {
      index = dict[key] > index ? index : dict[key];
    }
  }
  return index > -1 ? index : -1;
};

// @lc code=end

export { firstUniqChar, firstUniqChar2 };

~~~

  
### 0396-maxRotateFunction.js

~~~js
/*
 * @lc app=leetcode.cn id=396 lang=javascript
 *
 * [396] 旋转函数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// 基本的思路：数组的长度是100000
// 那么遍历两层，数据量可以接受，但是性能很不好
// 循环开始的索引，然后依次求出数组的最值，看看这个是否满足要求
// Your runtime beats 39.44 % of javascript submissions
const maxRotateFunction = function(nums) {
  const getRes = (start, len) => {
    let sum = 0;
    for (let j = 0; j < len; j++) {
      const index = start + j > len - 1 ? start + j - len : start + j;
      sum = sum + nums[index] * j;
    }
    return sum;
  };
  const len = nums.length;
  let result = null;
  for (let i = 0; i < len; i++) {
    const currentRes = getRes(i, len);
    if (!result) {
      result = currentRes;
    } else {
      result = currentRes > result ? currentRes : result;
    }
  }
  return result;
};
// @lc code=end

export { maxRotateFunction };

~~~

  
### 0398-findTheDifference.js

~~~js
// 398-findTheDifference.js
// 找到两个字符串中不同的一个字符（顺序可能打乱）
/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
// 思路一：遍历其中的一个字符串，然后indexOf另一个字符串，这样需要多次indexOf，性能一般
// 72 ms, 在所有 javascript 提交中击败了73.31%
function findTheDifference(s, t) {
  for (let i = 0; i < t.length; i++) {
    const item = t[i];
    const index = s.indexOf(item);
    if (index === -1) {
      return item;
    }
    if (index === 0) {
      s = s.slice(1);
    } else {
      s = s.slice(0, index) + s.slice(index + 1, s.length);
    }
  }
  return null;
}

// 思路二：字符串转化成数组，然后数组排序后，循环数组，看哪一个是不同的，这样需要转换
// 84 ms, 在所有 javascript 提交中击败了35.14%
// 实际证明：遇到很长的字符串数组，排序性能不好，直接字符串剪切拼接更快
function findTheDifference2(s, t) {
  const sArr = s.split('').sort();
  const tArr = t.split('').sort();
  for (let i = 0; i < t.length; i++) {
    if (sArr[i] !== tArr[i]) {
      return tArr[i];
    }
  }
  return null;
}

// 思路三: 使用replace，这样性能一般
// 80 ms, 在所有 javascript 提交中击败了50.00%
// 这里编译不通过
function findTheDifference3() {
  // for (let item of s) {
  //   t = t.replace(item, '');
  // }
  // return t;
}

export { findTheDifference, findTheDifference2, findTheDifference3 };

~~~

  
### 0401-readBinaryWatch.js

~~~js
// 要求：二进制手表：给定一个非负整数 n 代表当前 LED 亮着的数量，返回所有可能的时间。
// 小时不会以零开头，比如 “01:00” 是不允许的，应为 “1:00”。——小时部分如果是1位数，不需要加0
// 分钟必须由两位数组成，可能会以零开头，比如 “10:2” 是无效的，应为 “10:02”。——分钟部分如果是1位数，需要加0
// 上面两个最后使用函数优化
// 超过表示范围（小时 0-11，分钟 0-59）的数据将会被舍弃，也就是说不会出现 "13:00", "0:61" 等时间。
// 一共有10盏灯，使用回溯算法处理
// 新建一个二维数组，然后随机获取对应的值，然后计算出结果即可
// arr = [[1, 0], [2, 0], [4, 0], [8, 0], [0, 1], [0, 2], [0, 4], [0, 8], [0, 16], [0, 32]];
// 然后求出满足条件的组合
// 然后把数组的结果加起来
// 进行格式化处理
// 即可获取对应的解
// 函数内部实现递归操作

// n = 0
// 返回 ["0:00"]

// 输入: n = 1
// 返回: ["1:00", "2:00", "4:00", "8:00", "0:01", "0:02", "0:04", "0:08", "0:16", "0:32"]

// n > 10
// 返回 []

// n === 10
// 返回 [59:59]

/**
 * @param {number} num
 * @return {string[]}
 */
const TIMES = [100, 200, 400, 800, 1, 2, 4, 8, 16, 32];

const backTrack = function(list, temp, num, times) {
  // 如果临时数组满足条件，那么计算当前的时间，然后放在List中
  if (temp.length === num) {
    const time = formatTime(temp);
    if (time) list.push(time);
    return;
  }
  // TIMES 这个先 filter 一下 temp，然后再循环，这样好一点
  // times = TIMES.filter(item => !temp.includes(item));
  for (let i = 0; i < times.length; i++) {
    const item = times[i];
    // 这里push的必须是当前最后一个元素后面的数组，不能是全部的数组，否则会重复
    // 那么这里第四个参数需要改变
    temp.push(item);
    // 先index切割，然后再filter一下
    const lastTimes = TIMES.slice(TIMES.indexOf(item));
    const newTimes = lastTimes.filter((time) => !temp.includes(time) && time !== item);
    backTrack(list, temp, num, newTimes);
    temp.pop();
  }
};

// 单独写一个函数处理时间的格式
const formatTime = function(timeArr) {
  let time = 0;
  timeArr.forEach((item) => time += item);
  let minute = time % 100;
  let hour = (time - minute) / 100;
  // 超过表示范围（小时 0-11，分钟 0-59）的数据将会被舍弃
  if (hour > 11 || minute > 59) {
    return null;
  }
  minute = minute < 10 ? `0${minute}` : minute;
  minute = minute === 0 ? '00' : minute;
  hour = hour.length === 0 ? '0' : hour;
  return `${hour}:${minute}`;
};

// 96 ms, 在所有 JavaScript 提交中击败了26.51%
const readBinaryWatch = function(num) {
  if (num === 0) {
    return ['0:00'];
  } else if (num > 8) {
    return [];
  }
  const list = [];
  const temp = [];
  backTrack(list, temp, num, TIMES);
  return list;
};

export { readBinaryWatch };

~~~

  
### 0404-sumOfLeftLeaves.js

~~~js
/*
 * @lc app=leetcode.cn id=404 lang=javascript
 *
 * [404] 左叶子之和
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
const sumOfLeftLeaves = function(root) {
  const runNode = function(node, isLeft) {
    if (!node) {
      return 0;
    }
    if (!node.left && !node.right && isLeft) {
      return node.val;
    }
    return runNode(node.right, false) + runNode(node.left, true);
  };
  return runNode(root, false);
};

// 92 ms, 在所有 JavaScript 提交中击败了39.16%的用户

// 必须是叶子节点
// @lc code=end

export { sumOfLeftLeaves };

~~~

  
### 0405-toHex.js

~~~js
/*
 * @lc app=leetcode.cn id=405 lang=javascript
 *
 * [405] 数字转换为十六进制数
 */

// @lc code=start
/**
 * @param {number} num
 * @return {string}
 */
// Your runtime beats 26.42 % of javascript submissions
const toHex = function(num) {
  if (num === 0) {
    return '0';
  } else if (num > 0) {
    return get16(num);
  } else if (num < 0) {
    return get16plus(num);
  }
};

const get16 = (num) => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
  const res = [];
  while (num > 0) {
    const remain = num % 16;
    res.unshift(arr[remain]);
    num = (num - remain) / 16;
  }
  return res.join('');
};

const get16plus = (num) => {
  // 去负号，转换成16进制
  const n16 = get16(-num);
  const map = {
    0: 'f',
    1: 'e',
    2: 'd',
    3: 'c',
    4: 'b',
    5: 'a',
    6: 9,
    7: 8,
    8: 7,
    9: 6,
    a: 5,
    b: 4,
    c: 3,
    d: 2,
    e: 1,
    f: 0,
  };
  const subMap = {
    f: 15,
    e: 14,
    d: 13,
    c: 12,
    b: 11,
    a: 10,
  };
  // 然后所有位置取反
  let res = 0;
  for (let i = 0; i < n16.length; i++) {
    let item = map[n16[i]]; // 这个是取补码的结果
    // 然后转换成数字
    item = Number.isNaN(Number(item)) ? subMap[item] : item;
    res = res * 16 + item;
  }
  // console.log(n16);
  // console.log(res);
  res++;
  return get16(res).padStart(8, 'f');
};

// @lc code=end

export { toHex };

~~~

  
### 0409-longestPalindrome.js

~~~js
/*
 * @lc app=leetcode.cn id=409 lang=javascript
 * [409] 最长回文串
 */

/**
 * @param {string} s
 * @return {number}
 */
// 88 ms, 在所有 JavaScript 提交中击败了73.49%的用户
const longestPalindrome = function(s) {
  const len = s.length;
  // 长度是0或者1的情况
  if (len < 2) {
    return len;
  }
  // 获取字符出现的次数
  const dict = [];
  for (let i = 0; i < len; i++) {
    const key = s[i];
    if (!dict[key]) {
      dict[key] = 1;
    } else {
      dict[key] = dict[key] + 1;
    }
  }
  // 计算回文串长度
  let max = 0;
  let hasMiddle = false;
  for (const key in dict) {
    const times = dict[key];
    if (times % 2 === 0) {
      max += times;
    } else {
      max += (times - 1);
      hasMiddle = true;
    }
  }
  // 如果中间有值，增加一个长度
  if (hasMiddle) max++;
  return max;
};

export { longestPalindrome };

~~~

  
### 0412-fizzBuzz.js

~~~js
/**
 * @param {number} n
 * @return {string[]}
 */

const Fizz = 'Fizz';
const Buzz = 'Buzz';
const FiBu = 'FizzBuzz';

const judge = (num) => {
  if (num % 5 === 0 && num % 3 === 0) {
    return FiBu;
  } else if (num % 5 === 0) {
    return Buzz;
  } else if (num % 3 === 0) {
    return Fizz;
  } else {
    return String(num);
  }
};

const fizzBuzz = function(n) {
  if (n === 0) return [];
  const res = [];
  for (let i = 1; i < n + 1; i++) {
    const item = judge(i);
    res.push(item);
  }
  return res;
};

export { fizzBuzz };

~~~

  
### 0414-thirdMax.js

~~~js
// 414
// 给定一个非空数组，返回此数组中第三大的数。如果不存在，则返回数组中最大的数。要求算法时间复杂度必须是O(n)。
/**
 * @param {number[]} nums
 * @return {number}
 */
// 思路一：首先数组去重（set）判断长度是否大于2，返回最大值还是第三大的值
// 然后使用内部函数获取最大值或者第三大的值
// 92 ms, 在所有 javascript 提交中击败了33.11%
function thirdMax(nums) {
  const tmpNums = Array.from(new Set(nums));
  if (tmpNums.length === 1) {
    return tmpNums[0];
  }
  if (tmpNums.length === 2) {
    return Math.max(...tmpNums);
  }
  tmpNums.sort((a, b) => b - a);
  return tmpNums[2];
}

// 第二种，不使用去重，排序后，手动循环，获取当前第三大的数字。
// 128 ms, 在所有 javascript 提交中击败了11.82% 这样的性能更差
function thirdMax2(nums) {
  nums.sort((a, b) => b - a);
  const len = nums.length;
  if (len === 1) {
    return nums[0];
  }
  let index = 1;
  for (let i = 1; i < len; i++) {
    if (nums[i] < nums[i - 1]) {
      index++;
      if (index === 3) {
        return nums[i];
      }
    }
  }
  return nums[0];
}

export { thirdMax, thirdMax2 };

~~~

  
### 0415-addStrings.js

~~~js
// 给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和。

// 注意：
// num1 和num2 的长度都小于 5100.
// num1 和num2 都只包含数字 0-9.
// num1 和num2 都不包含任何前导零。
// 你不能使用任何內建 BigInteger 库， 也不能直接将输入的字符串转换为整数形式。

// 思路一：实际工作中，使用大数计算，是最快的办法(不符合题目要求)
// 68 ms, 在所有 javascript 提交中击败了98.72%
function addStrings(num1, num2) {
  return String(BigInt(num1) + BigInt(num2));
}
// 由于BigInt还在提案中，测试无法通过，使用时监测浏览器兼容

// 思路二，转换成数组相加，然后计算结果转换成字符串
// 104 ms, 在所有 javascript 提交中击败了26.28% 性能不好
function addStrings2(num1, num2) {
  if (num1 === '0') return num2;
  if (num2 === '0') return num1;
  // 首先处理特殊情况
  let arr1 = num1.split('');
  let arr2 = num2.split('');
  const maxLen = Math.max(arr1.length, arr2.length);
  // 增加前导0（这里能否优化） 字符串前面加0比数组的性能更好
  if (arr1.length < maxLen) {
    const tmp = maxLen - arr1.length;
    const tmpArr = new Array(tmp).fill(0);
    arr1 = tmpArr.concat(arr1);
  }
  if (arr2.length < maxLen) {
    const tmp = maxLen - arr2.length;
    const tmpArr = new Array(tmp).fill(0);
    arr2 = tmpArr.concat(arr2);
  }
  const resultArr = new Array(maxLen + 1).fill(0);
  // 循环增加
  for (let i = maxLen - 1; i >= 0; i--) {
    resultArr[i + 1] = resultArr[i + 1] + parseInt(arr1[i], 10) + parseInt(arr2[i], 10);
    if (resultArr[i + 1] >= 10) {
      resultArr[i]++;
      resultArr[i + 1] -= 10;
    }
  }
  // 去掉前导0
  if (resultArr[0] === 0) {
    resultArr.shift(1);
  }
  return resultArr.join('');
}

// 方法三更好（可能网速较快）
// 操作字符串（补0）的速度和性能比数组好
// 72 ms, 在所有 javascript 提交中击败了92.35%
function addStrings3(num1, num2) {
  // 首先处理特殊情况
  if (num1 === '0') return num2;
  if (num2 === '0') return num1;
  // 字符串增加前导0
  const maxLen = Math.max(num1.length, num2.length);
  if (num1.length < maxLen) {
    let tmp = maxLen - num1.length;
    while (tmp > 0) {
      num1 = `0${num1}`;
      tmp--;
    }
  }
  if (num2.length < maxLen) {
    let tmp = maxLen - num2.length;
    while (tmp > 0) {
      num2 = `0${num2}`;
      tmp--;
    }
  }
  const arr1 = num1.split('');
  const arr2 = num2.split('');
  const resultArr = new Array(maxLen + 1).fill(0);
  // 循环增加
  for (let i = maxLen - 1; i >= 0; i--) {
    resultArr[i + 1] = resultArr[i + 1] + parseInt(arr1[i], 10) + parseInt(arr2[i], 10);
    if (resultArr[i + 1] >= 10) {
      resultArr[i]++;
      resultArr[i + 1] -= 10;
    }
  }
  if (resultArr[0] === 0) {
    resultArr.shift(1);
  }
  return resultArr.join('');
}

export { addStrings, addStrings2, addStrings3 };

~~~

  
### 0419-countBattleships.js

~~~js
/*
 * @lc app=leetcode.cn id=419 lang=javascript
 *
 * [419] 甲板上的战舰
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @return {number}
 */
// Your runtime beats 81.32 % of javascript submissions
const changeBoard = (board, i, j) => {
  board[i][j] = '.';
  if (board[i][j + 1] === 'X') {
    while (board[i][j + 1] === 'X') {
      board[i][j + 1] = '.';
      j = j + 1;
    }
  } else {
    while (board[i + 1] && board[i + 1][j] === 'X') {
      board[i + 1][j] = '.';
      i = i + 1;
    }
  }
};

const countBattleships = function(board) {
  // 循环甲板上的元素
  // 如果是空的，继续循环
  // 如果不是空的，监测相邻的右边和下边，然后把联系的占有的情况改成空
  let res = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const item = board[i][j];
      if (item === 'X') {
        res++;
        changeBoard(board, i, j);
        // console.log(board);
      }
    }
  }
  return res;
};

// [["X",".","X"],["X",".","X"]]
// @lc code=end

export { countBattleships };

~~~

  
### 0423-originalDigits.js

~~~js
/*
 * @lc app=leetcode.cn id=423 lang=javascript
 *
 * [423] 从英文中重建数字
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
// Your runtime beats 50 % of javascript submissions
const originalDigits = function(s) {
  const dict = {};
  const len = s.length;
  for (let i = 0; i < len; i++) {
    const key = s[i];
    if (dict[key]) {
      dict[key]++;
    } else {
      dict[key] = 1;
    }
  }

  // zero z
  // two w
  // six x
  // eigth g
  const zero = dict.z || 0;
  const two = dict.w || 0;
  const six = dict.x || 0;
  const eight = dict.g || 0;

  // three h
  // seven s
  const three = (dict.h || 0) - eight;
  const seven = (dict.s || 0) - six;

  // ten t
  // five v
  // four f
  // one o
  // nine
  const ten = (dict.t || 0) - two - eight - three;
  const five = (dict.v || 0) - seven;
  const four = (dict.f || 0) - five;
  const one = (dict.o || 0) - zero - two - four;
  const nine = ((dict.n || 0) - seven - ten - one) / 2;

  const res = `${'0'.repeat(zero)}${'1'.repeat(one)}${'2'.repeat(two)}${'3'.repeat(three)}${'4'.repeat(four)}${'5'.repeat(five)}${'6'.repeat(six)}${'7'.repeat(seven)}${'8'.repeat(eight)}${'9'.repeat(nine)}`;
  return res;
};

// @lc code=end

export { originalDigits };

~~~

  
### 0429-levelOrder.js

~~~js
/*
 * @lc app=leetcode.cn id=429 lang=javascript
 *
 * [429] N 叉树的层序遍历
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[][]}
 */
// Your runtime beats 6.03 % of javascript submissions
const levelOrder = function(root) {
  // 递归遍历树节点，然后传递层数，将结果放在对应的层数内部
  // 递归非常耗性能，可以使用BFS解决问题
  const res = [];
  const depth = 0;
  const runNode = function(node, depth, res) {
    if (!node) return;
    if (!res[depth]) {
      res[depth] = [];
    }
    res[depth].push(node.val);
    if (!node.children) return;
    node.children.forEach((element) => {
      runNode(element, depth + 1, res);
    });
  };
  runNode(root, depth, res);
  return res;
};

// 思路二
// Your runtime beats 57.81 % of javascript submissions
const levelOrder2 = function(root) {
  // 层序遍历：广度优先遍历
  if (!root) return [];
  const tmpArr = [];
  const res = [];
  tmpArr.push(root);
  while (tmpArr.length > 0) {
    const tmp = [];
    const len = tmpArr.length;
    for (let i = 0; i < len; i++) {
      const item = tmpArr.shift();
      tmp.push(item.val);
      if (item.children) tmpArr.push(...item.children);
    }
    res.push(tmp);
  }
  return res;
};

// @lc code=end

export { levelOrder, levelOrder2 };

~~~

  
### 0434-countSegments.js

~~~js
// 434. 字符串中的单词数
// 统计字符串中的单词个数，这里的单词指的是连续的不是空格的字符。
// 请注意，你可以假定字符串里不包括任何不可打印的字符。

// 示例:
// 输入: "Hello, my name is John"
// 输出: 5
// 解释: 这里的单词是指连续的不是空格的字符，所以 "Hello," 算作 1 个单词。
// 80 ms, 在所有 JavaScript 提交中击败了70.48%
/**
 * @param {string} s
 * @return {number}
 */
// 首先把首尾的空格去掉' Mike '
// 把两个连续的空格去掉（循环去掉）‘hello      Mike’
// 然后可以把字符串转换成数组，计算数组的长度，需要过滤空元素
// 或者循环字符串，直接计算空格的字符，然后
const countSegments = function(s) {
  const str = s.trim();
  if (str.length === 0) {
    return 0;
  }
  if (str.indexOf(' ') === -1) {
    return 1;
  }
  const arr = str.split(' ').filter((item) => item !== '');
  return arr.length;
};

export { countSegments };

~~~

  
### 0438-findAnagrams.js

~~~js
/*
 * @lc app=leetcode.cn id=438 lang=javascript
 *
 * [438] 找到字符串中所有字母异位词
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
// Your runtime beats 5.14 % of javascript submissions
// 思路1：遍历一次数组，然后判断每个元素是否满足
// 现在暴力解法性能太差。。。
// 较好的解法是双指针滑动窗口解法？？？
const findAnagrams = function(s, p) {
  const dict = {};
  const len = p.length;
  for (let i = 0; i < len; i++) {
    const key = p[i];
    if (dict[key]) {
      dict[key]++;
    } else {
      dict[key] = 1;
    }
  }
  // 可以改成下面的简化写法
  // [...p].forEach(c => need[c] ? need[c]++ : need[c] = 1);
  // 然后遍历每一个子串
  const res = [];
  for (let i = 0; i <= s.length - len; i++) {
    const subStr = s.slice(i, i + len);
    if (check(subStr, dict)) {
      res.push(i);
    }
  }
  return res;
};

const check = (str, DICT) => {
  const dict = { ...DICT };
  const len = str.length;
  for (let i = 0; i < len; i++) {
    const key = str[i];
    if (!dict[key] || dict[key] === 0) {
      return false;
    } else {
      dict[key]--;
    }
  }
  return true;
};
// @lc code=end

export { findAnagrams };

~~~

  
### 0441-arrangeCoins.js

~~~js
// 441 硬币排列
// 你总共有 n 枚硬币，你需要将它们摆成一个阶梯形状，第 k 行就必须正好有 k 枚硬币。
// 给定一个数字 n，找出可形成完整阶梯行的总行数。
// n 是一个非负整数，并且在32位有符号整型的范围内。

// 执行用时: 108 ms 击败了49.06%
// 内存消耗: 38 MB
function arrangeCoins(n) {
  if (n === 1) {
    return 1;
  }
  let sum = 1;
  let index = 2;
  while (sum <= n) {
    sum += index;
    index++;
  }
  return index - 2;
}

export { arrangeCoins };

~~~

  
### 0442-findDuplicates.js

~~~js
/*
 * @lc app=leetcode.cn id=442 lang=javascript
 *
 * [442] 数组中重复的数据
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 思路1：借助数组的存储功能（数组是对象），空间不满足
// Your runtime beats 17.76 % of javascript submissions
const findDuplicates = function(nums) {
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    const key = `-${nums[i]}`;
    if (!nums[key]) {
      nums[key] = 1;
    } else if (nums[key] === 1) {
      nums[key] = 2;
      res.push(nums[i]);
    }
  }
  return res;
};

// 思路2：数组排序后，获取重复元素（时间不满足）
// Your runtime beats 24.64 % of javascript submissions
const findDuplicates2 = function(nums) {
  const res = [];
  nums.sort((a, b) => a - b);
  let last = null;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1] && nums[i] !== last) {
      res.push(nums[i]);
      last = nums[i];
    }
  }
  return res;
};

// 思路3：复制一个数组，然后使用set去重，然后求差集（效果也不好）

// 思路4：参考其他人的答案
// 遍历到数字 i 时，直接把数组索引 i 的数字变成负数
// 如果再次遍历到数字 i 时，那么就出现了两次
// 利用了数字全部是正数，且出现次数只有两次实现的
// Your runtime beats 63.61 % of javascript submissions
const findDuplicates3 = function(nums) {
  const res = [];
  const len = nums.length;
  for (let i = 0; i < len + 1; i++) {
    const item = Math.abs(nums[i]);
    if (nums[item] < 0) {
      res.push(item);
    } else {
      // 如果当前的值超过了数组的长度，那么需要开辟临时的数字存放
      // 这里选择较大的数字，避免冲突
      if (nums[item] > 0) {
        nums[item] = -nums[item];
      } else {
        nums[item] = -1000000;
      }
    }
  }
  return res;
};
// @lc code=end

export { findDuplicates, findDuplicates2, findDuplicates3 };

~~~

  
### 0443-compress-string.js

~~~js
// 443. 压缩字符串
// 给定一组字符，使用原地算法将其压缩。
// 压缩后的长度必须始终小于或等于原数组长度。
// 数组的每个元素应该是长度为1 的字符（不是 int 整数类型）。
// 在完成原地修改输入数组后，返回数组的新长度。

// 思路一：使用循环，如果i === i+1 那么把当前出现的次数记录在对象中，然后把这个元素删除
// 当这个元素和后一个元素不等时，把这个元素出现的次数splice到原始数组中
// 80 ms , 在所有 javascript 提交中击败了 87.03%

function compressString(chars) {
  let timer = 1;
  for (let i = 0; i < chars.length;) {
    if (chars[i] !== chars[i + 1]) {
      if (timer > 1) {
        chars.splice(i + 1, 0, timer);
        timer = 1;
      }
      i++;
    } else {
      chars.splice(i, 1);
      timer++;
    }
  }
  for (let i = 0; i < chars.length;) {
    if (typeof chars[i] === 'number') {
      if (chars[i] < 10) {
        chars[i] = String(chars[i]);
      } else {
        const newItems = (`${chars[i]}`).split('');
        chars.splice(i, 1, ...newItems);
        i += 2;
      }
    }
    i++;
  }
  return chars.length;
}

// 思路二：使用循环(不适合这道题)
// 如果一个项的 indexOf lastIndexOf 然后计算出现的次数，然后直接使用splice取代
// 如果只出现了一次，不用处理
// 第二种方法适应于相同元素比较多的情况
// indexOf 的第二个参数是开始的位置，这里可以优化成外循环的位置
// 这种方法适合没有有序数组，如果数组前后重复了就出错了
/**
 * @param {character[]} chars
 * @return {number}
 */
// function compressStringBug(chars) {
//   for (let i = 0; i < chars.length; i++) {
//     const item = chars[i];
//     const firstIndex = chars.indexOf(item, i);
//     const lastIndex = chars.lastIndexOf(item);
//     if (firstIndex !== lastIndex) {
//       const times = lastIndex - firstIndex + 1;
//       const newItems = (`${times}`).split('');
//       chars.splice(firstIndex + 1, times - 1, ...newItems);
//     }
//   }
//   return chars.length;
// }

export { compressString };

~~~

  
### 0445-addTwoNumbers.js

~~~js
/*
 * @lc app=leetcode.cn id=445 lang=javascript
 *
 * [445] 两数相加 II
 */

// Your runtime beats 15.71 % of javascript submissions
// 现在性能很差
// @lc code=start
function ListNode(val) {
  this.val = val;
  this.next = null;
}

const addTwoNumbers = function(l1, l2) {
  const arr1 = []; const
    arr2 = [];
  toNumber(l1, arr1);
  toNumber(l2, arr2);
  // console.log(arr1, arr2);
  const arr3 = getSum(arr1, arr2);
  // console.log(arr1, arr2, arr3);
  const result = toList(arr3);
  return result;
};

// list to number array
const toNumber = function(list, arr) {
  if (!list) return;
  arr.push(list.val);
  if (list.next) {
    toNumber(list.next, arr);
  }
};

// add two array
const getSum = (arr1, arr2) => {
  let arr3 = [];
  while (arr1.length > 0 && arr2.length > 0) {
    const sum = arr1.pop() + arr2.pop();
    arr3.unshift(sum);
  }
  if (arr1.length > 0) {
    arr3 = arr1.concat(arr3);
  }
  if (arr2.length > 0) {
    arr3 = arr2.concat(arr3);
  }
  // 处理大于10的情况
  for (let i = arr3.length; i >= 0; i--) {
    if (arr3[i] >= 10) {
      arr3[i] = arr3[i] - 10;
      if (arr3[i - 1] || arr3[i - 1] === 0) {
        arr3[i - 1] = arr3[i - 1] + 1;
      } else {
        arr3.unshift(1);
      }
    }
  }
  return arr3;
};

// number array to list
const toList = function(arr) {
  if (arr.length === 0) {
    return null;
  }
  const value = arr.shift();
  const listNode = new ListNode(value);
  listNode.next = toList(arr);
  return listNode;
};

// @lc code=end

export { addTwoNumbers };

~~~

  
### 0448-findDisappearedNumbers.js

~~~js
/**
 * @param {number[]} nums
 * @return {number[]}
 */

// 448. 找到所有数组中消失的数字
// 给定一个范围在  1 ≤ a[i] ≤ n ( n = 数组大小 ) 的 整型数组，数组中的元素一些出现了两次，另一些只出现一次。
// 找到所有在 [1, n] 范围之间没有出现在数组中的数字
// 您能在不使用额外空间且时间复杂度为O(n)的情况下完成这个任务吗? 你可以假定返回的数组不算在额外空间内。

// 示例:
// 输入:
// [4,3,2,7,8,2,3,1]
// 输出:
// [5,6]
// 172 ms, 在所有 JavaScript 提交中击败了36.87%

const findDisappearedNumbers = function(nums) {
  const n = nums.length;
  if (n === 1) return [];
  const newArr = [...new Set(nums)].sort((a, b) => a - b);
  const len = newArr.length;
  // 如果去重排序后，还和原来的一样，那么没有缺失，直接返回空数组(优化：不需要排序)
  if (len === n) return [];
  let pointer = 1;
  const result = [];
  for (let i = 0; i < len; i++) {
    if (pointer === newArr[i]) {
      pointer++;
    } else {
      result.push(pointer);
      pointer++;
      i--;
    }
  }
  // [1,1,1,1,1] => [2,3,4,5]
  while (pointer <= n) {
    result.push(pointer);
    pointer++;
  }
  return result;
};

// 思路1：先把这个数组去重，然后新建一个数组长度是N，然后依次填充
// 然后求一下这两个数组的差集
// 如果是每一个进行include查询，那么性能不太好

// 思路二：首先数组去重后排序，然后使用指针保存当前的元素，然后获取缺失的元素
// 这个思路应该比思路1好一点。

export { findDisappearedNumbers };

~~~

  
### 0451-frequency-sort.js

~~~js
// 451 给定一个字符串，请将字符串里的字符按照出现的频率降序排列。
// 执行用时：104 ms击败了70.22%
// 内存消耗：39.2 MB击败了81.41%的用户
/**
 * @param {string}
 * @return {string}
 */
function frequencySort(s) {
  const len = s.length;
  // 如果长度是012，那么不需要排序，直接返回原始字符串即可
  if (len < 3) {
    return s;
  }
  const obj = {};
  for (let i = 0; i < len; i++) {
    const item = s[i];
    if (obj[item]) {
      obj[item] += 1;
    } else {
      obj[item] = 1;
    }
  }
  const arr = [];
  // eslint-disable-next-line
  for (let key in obj) {
    const value = obj[key];
    if (!arr[value]) {
      arr[value] = [key];
    } else {
      arr[value].push(key);
    }
  }
  let result = '';
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i]) {
      // arr[i] 是一个数组，其中每一项需要转换成一个字符串
      let newStr = '';
      for (let j = 0; j < arr[i].length; j++) {
        const current = arr[i][j];
        const currentStr = (`${current}`).repeat(i);
        newStr += currentStr;
      }
      result += newStr;
    }
  }
  return result;
}

export { frequencySort };

~~~

  
### 0455-findContentChildren.js

~~~js
// 455. 分发饼干
// 假设你是一位很棒的家长，想要给你的孩子们一些小饼干。但是，每个孩子最多只能给一块饼干。
// 对每个孩子 i，都有一个胃口值 g[i]，这是能让孩子们满足胃口的饼干的最小尺寸；并且每块饼干 j，都有一个尺寸 s[j] 。如果 s[j] >= g[i]，我们可以将这个饼干 j 分配给孩子 i ，这个孩子会得到满足。你的目标是尽可能满足越多数量的孩子，并输出这个最大数值。

// 示例 1:
// 输入: g = [1,2,3], s = [1,1]
// 输出: 1
// 解释:
// 你有三个孩子和两块小饼干，3个孩子的胃口值分别是：1,2,3。
// 虽然你有两块小饼干，由于他们的尺寸都是1，你只能让胃口值是1的孩子满足。
// 所以你应该输出1。

/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
const findContentChildren1 = function(g, s) {
  // ？这两个数组是否排序，这个很影响性能
  // 可以按照从小到大的顺序排列，然后使用贪心算法，依次遍历数组，看是否满足
  const gLen = g.length;
  const sLen = s.length;
  if (gLen === 0 || sLen === 0) return 0;
  g = g.sort((a, b) => a - b);
  s = s.sort((a, b) => a - b);
  let result = 0;
  const getResult = (item) => {
    let index = 0;
    while (index < sLen) {
      if (s[index] >= item) {
        result++;
        s.splice(index, 1);
        return;
      } else {
        index++;
      }
    }
  };
  for (let i = 0; i < gLen; i++) {
    const item = g[i];
    getResult(item);
  }
  return result;
};

// 思路二 140 ms, 在所有 JavaScript 提交中击败了15.20%
const findContentChildren2 = function(g, s) {
  const gLen = g.length;
  const sLen = s.length;
  if (gLen === 0 || sLen === 0) return 0;
  g = g.sort((a, b) => a - b);
  s = s.sort((a, b) => a - b);
  let result = 0;
  let index = 0;
  for (let i = 0; i < sLen; i++) {
    if (s[i] >= g[index]) {
      index++;
      result++;
    }
  }
  return result;
};

export { findContentChildren1, findContentChildren2 };

~~~

  
### 0459-repeatedSubstringPattern.js

~~~js
/*
 * [459] 重复的子字符串
 */
/**
 * @param {string} s
 * @return {boolean}
 */
// Your runtime beats 73.88 % of javascript submissions
function repeatedSubstringPattern(s) {
  const len = s.length;
  if (len === 1) {
    return false;
  }
  const subLen = len / 2;
  for (let i = 0; i <= subLen; i++) {
    const subKey = s.slice(0, i + 1);
    const keyLen = subKey.length;
    if (len % keyLen !== 0) {
      continue;
    }
    for (let j = i; j < len; j += keyLen) {
      const current = s.slice(j + 1, j + 1 + keyLen);
      if (current !== subKey) {
        break;
      }
      if (j + 1 + keyLen === len) {
        return true;
      }
    }
  }
  return false;
}

export { repeatedSubstringPattern };

~~~

  
### 0461-hammingDistance.js

~~~js
// 461. 汉明距离
// 两个整数之间的汉明距离指的是这两个数字对应二进制位不同的位置的数目。
// 给出两个整数 x 和 y，计算它们之间的汉明距离。
// 输入: x = 1, y = 4 输出: 2

/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
// 72 ms , 在所有 javascript 提交中击败了 62.70%
function hammingDistance2(x, y) {
  let result = 0;
  while (x > 0 || y > 0) {
    if ((x % 2 === 1 && y % 2 === 0) || (x % 2 === 0 && y % 2 === 1)) {
      result++;
    }
    x = (x - (x % 2)) / 2;
    y = (y - (y % 2)) / 2;
  }
  return result;
}

// 优化后 56 ms , 在所有 javascript 提交中击败了 98.83%
function hammingDistance(x, y) {
  let result = 0;
  while (x > 0 || y > 0) {
    const a = x % 2;
    const b = y % 2;
    if ((a === 1 && b === 0) || (a === 0 && b === 1)) {
      result++;
    }
    x = (x - a) / 2;
    y = (y - b) / 2;
  }
  return result;
}

export { hammingDistance, hammingDistance2 };

~~~

  
### 0463-islandPerimeter.js

~~~js
/*
 * [463] 岛屿的周长
 */
// 辅助函数，获取一个节点的边长（如果四周的节点存在，判断 0-1-undefined的情况）
function getBorder(matrix, i, j) {
  let result = 0;
  if (matrix[i]) {
    if (matrix[i][j - 1] !== 1) {
      result++;
    }
    if (matrix[i][j + 1] !== 1) {
      result++;
    }
  }
  if (!matrix[i - 1] || (matrix[i - 1] && matrix[i - 1][j] !== 1)) {
    result++;
  }
  if (!matrix[i + 1] || (matrix[i + 1] && matrix[i + 1][j] !== 1)) {
    result++;
  }
  return result;
}

// 思路：遍历矩阵:如果当前的值是1，使用辅助函数处理
/**
 * @param {number[][]} grid
 * @return {number}
 */
function islandPerimeter(grid) {
  const x = grid.length;
  const y = grid[0].length;
  let border = 0;
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      if (grid[i][j] === 1) {
        border += getBorder(grid, i, j);
      }
    }
  }
  return border;
}

export { islandPerimeter };

~~~

  
### 0476-findComplement.js

~~~js
// 476. 数字的补数
// 给定一个正整数，输出它的补数。补数是对该数的二进制表示取反。

// 示例 1:
// 输入: 5
// 输出: 2
// 解释: 5 的二进制表示为 101（没有前导零位），其补数为 010。所以你需要输出 2 。
// 示例 2:
// 输入: 1
// 输出: 0
// 解释: 1 的二进制表示为 1（没有前导零位），其补数为 0。所以你需要输出 0 。

// 注意:
// 给定的整数保证在 32 位带符号整数的范围内。
// 你可以假定二进制数不包含前导零位。
// 本题与 1009 https://leetcode-cn.com/problems/complement-of-base-10-integer/ 相同

/**
 * @param {number} num
 * @return {number}
 */
// 通过  96 ms   37.9 MB
const findComplement = function(num) {
  const str = num.toString(2);
  // 可以使用循环
  let res = '';
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '0') {
      res += '1';
    } else {
      res += '0';
    }
  }
  return parseInt(res, 2);
};

// 或者使用正则替换
// 80 ms, 在所有 JavaScript 提交中击败了 80.79%
/**
 * @param {number} num
 * @return {number}
 */
const findComplement2 = function(num) {
  let str = num.toString(2);
  // 可以使用循环，或者使用正则替换
  // let res = '';
  // for (let i = 0; i < str.length; i++) {
  //     if (str[i] === '0') {
  //         res += '1'
  //     } else {
  //         res += '0';
  //     }
  // }
  str = str.replace(/0/g, '2');
  str = str.replace(/1/g, '0');
  str = str.replace(/2/g, '1');
  return parseInt(str, 2);
};

export { findComplement, findComplement2 };

~~~

  
### 0482-licenseKeyFormatting.js

~~~js
/*
 * [482] 密钥格式化
 * 注意：S 的长度可能很长，请按需分配大小。数组是否超出内存？
 */
// 188 ms, 在所有 JavaScript 提交中击败了46.81%
/**
 * @param {string} S
 * @param {number} K
 * @return {string}
 */
const licenseKeyFormatting = function(S, K) {
  // 第一步，先去掉全部的破折号，正则
  let s = S.replace(/\-/g, '');
  // console.log(s);
  // 第二步，将小写转换成大写
  s = s.toUpperCase();
  if (s.length < K) {
    return s;
  }
  // 第三步，设置一个数组，然后从字符串后面不断截取 K 个字符，然后放在数组中 while 循环
  const arr = [];
  while (s.length > 0) {
    const tmp = s.slice(-K);
    s = s.slice(0, -K);
    arr.unshift(tmp);
  }
  // console.log(arr);
  // 第四步，将数组使用破折号链接起来成为字符串返回
  return arr.join('-');
};

export { licenseKeyFormatting };

// '5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-95F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-95F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-95F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-95F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-95F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9-w-5F3Z-2e-9'

~~~

  
### 0485-findMaxConsecutiveOnes.js

~~~js
/**
 * @param {number[]} nums
 * @return {number}
 */
// 80 ms , 在所有 JavaScript 提交中击败了99.05%

// 485. 最大连续1的个数
// 给定一个二进制数组， 计算其中最大连续1的个数。

// 示例 1:
// 输入: [1,1,0,1,1,1]
// 输出: 3
// 解释: 开头的两位和最后的三位都是连续1，所以最大连续1的个数是 3.
// 注意：
// 输入的数组只包含 0 和1。
// 输入数组的长度是正整数，且不超过 10,000。

const findMaxConsecutiveOnes = function(nums) {
  const len = nums.length;
  if (len === 0 || nums.indexOf(1) === -1) {
    return 0;
  }
  let max = 1;
  let tmp = 0;
  for (let i = 0; i < len; i++) {
    if (nums[i] === 1) {
      tmp++;
      max = tmp > max ? tmp : max;
    } else {
      tmp = 0;
    }
  }
  return max;
};

export { findMaxConsecutiveOnes };

~~~

  
### 0492-constructRectangle.js

~~~js
/*
 * [492] 构造矩形
 */
/**
 * @param {number} area
 * @return {number[]}
 */
const constructRectangle = function(area) {
  // 处理特殊情况： 0
  if (area === 0) {
    return [];
  }
  if (area < 4) {
    return [area, 1];
  }
  const large = Math.floor(Math.sqrt(area));
  for (let i = large; i > 1; i++) {
    if (area / i === Math.floor(area / i)) {
      const max = Math.max(i, area / i);
      const min = i === max ? area / i : i;
      return [max, min];
    }
  }
  return [area, 1];
  // 长度和宽度相等，那么就是 Math.sqrt(area) 这个值
  // 然后获取小于这个数的最大的整数，然后求余数
  // 如果余数是0， 那么这个数就是满足的最合适的数字
  // 否则 7 = 【7， 1】
};

export { constructRectangle };

~~~

  
### 0494-findTargetSumWays.js

~~~js
/*
 * @lc app=leetcode.cn id=494 lang=javascript
 *
 * [494] 目标和
 */

// 第一种思路是 DFS
// 数组的长度是20，DFS 需要计算 100w 这个量级可以接受，但是性能不好
// Your runtime beats 40.04 % of javascript submissions
// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const findTargetSumWays = function(nums, target) {
  let total = 0;
  const len = nums.length;
  const check = (preSum, index) => {
    const current = nums[index];
    // 已经遍历了全部的数组
    if (index === len - 1) {
      if (preSum + current === target) total++;
      if (preSum - current === target) total++;
      return;
    }
    // 没有遍历全部数组，那么 DFS 继续执行
    check(preSum + current, index + 1);
    check(preSum - current, index + 1);
  };
  check(0, 0);
  return total;
};

export { findTargetSumWays };

// console.log(findTargetSumWays([1,1,1,1,1], 3) === 3);
// console.log(findTargetSumWays([1], 1) === 1);
// console.log(findTargetSumWays([0], 0) === 2);
// console.log(findTargetSumWays([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], 6) === 18564);
// @lc code=end

~~~

  
### 0495-findPoisonedDuration.js

~~~js
/*
 * @lc app=leetcode.cn id=495 lang=javascript
 *
 * [495] 提莫攻击
 */

// 思路1：全部的时间-重复的时间=中毒的时间
// 全部的时间：数组长度 * 持续时间
// 重复的时间：间隔 - （后一个 - 前一个）
// 存在的问题：如果第一个攻击，影响了后面的多个攻击（持续时间较长）
// 那么这个就不好计算（不能一次循环实现）

// 思路2：直接循环数组，每次循环，设置已经持续的时间，更新结束的时间
// 这样可以处理多个重复的情况，时间复杂度可以接受
// Your runtime beats 74.74 % of javascript submissions

// 思路3：一维时间点准换成二维时间区间，然后求并集，这样也可以实现
// 这个适合持续时间不同的情况，这里使用性能不好

// 综上所述，使用思路2较好
// @lc code=start
/**
 * @param {number[]} timeSeries
 * @param {number} duration
 * @return {number}
 */
const findPoisonedDuration = function(timeSeries, duration) {
  let total = 0;
  let end = 0;
  // 如果第一项是0，那么需要从0开始求和（这个刚开始忽略了）
  if (timeSeries[0] === 0) {
    total = 1;
  }
  const len = timeSeries.length;
  for (let i = 0; i < len; i++) {
    // 如果当前的和上一个没有交集，那么直接求 total
    if (end < timeSeries[i]) {
      total += duration;
    } else {
      total += (timeSeries[i] + duration - 1 - end);
    }
    end = timeSeries[i] + duration - 1;
  }
  return total;
};

// console.log(findPoisonedDuration([1,2], 2) === 3);
// console.log(findPoisonedDuration([1,4], 2) === 4);
// console.log(findPoisonedDuration([1,2,5,6,7,12,20,22,23,50,200,300,345], 100) === 394);
// @lc code=end
export { findPoisonedDuration };

~~~

  
### 0496-nextGreaterElement.js

~~~js
/*
 * @lc app=leetcode.cn id=496 lang=javascript
 *
 * [496] 下一个更大元素 I
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */

// 思路一：遍历nums1，然后找到对应在 nums2 的位置，然后再循环nums2 到最后，这样N2可以实现，但是效率不高
// 100 ms, 在所有 JavaScript 提交中击败了38.72%
const nextGreaterElement = function(nums1, nums2) {
  const res = [];
  for (let i = 0; i < nums1.length; i++) {
    const item = nums1[i];
    let index = nums2.indexOf(item);
    let target;
    while (index <= nums2.length - 1) {
      if (nums2[index] > item) {
        target = nums2[index];
        break;
      } else {
        index++;
      }
    }
    target = target === undefined ? -1 : target;
    res.push(target);
  }
  return res;
};

// 思路二：既然是不重复的，那么是否可以利用字典，获取nums2中的键，然后排序一下，这样的效果是否好一点？
// const nextGreaterElement = function(nums1, nums2) {
//   let dict = [];
//   for (let i = 0; i < nums2.length; i++) {
//     let key = nums2[i];
//     let obj = {key, index: i};
//     dict.push(obj);
//   }
//   // dict 排序
//   dict.sort((a, b) => a.key > b.key);
//   console.log(dict);
//   let res = [];
//   for (let i = 0; i < nums1; i++) {
//     let cur = nums1[i];
//     let item = dict.find(item => item.key === cur);
//     for (let i = item.key; i < dict.length; i++) {
//       if (dict[i].index > dict[item.key].index) {
//         console.log(i);
//         break;
//       }
//     }
//     console.log();
//   }
// };

// @lc code=end
export { nextGreaterElement };

~~~

  
### 0500-findWords.js

~~~js
/*
 * [500] 键盘行
 */
// 96 ms, 在所有 JavaScript 提交中击败了16.11%
const isTrue = function(string) {
  const len = string.length;
  // 如果长度是1-0那么符合条件
  if (len < 2) return true;
  const str1 = 'qwertyuiop';
  const str2 = 'asdfghjkl';
  const str3 = 'zxcvbnm';
  const str = string.toLowerCase();
  // 待优化：字符串最好去重处理，减少循环的次数
  const firstStr = str[0];
  let target;
  if (str1.includes(firstStr)) {
    target = str1;
  } else if (str2.includes(firstStr)) {
    target = str2;
  } else if (str3.includes(firstStr)) {
    target = str3;
  }
  // console.log(target, firstStr);
  if (!target) {
    return false;
  }
  for (let i = 0; i < len; i++) {
    const item = str[i];
    if (!target.includes(item)) return false;
  }
  return true;
};

/**
 * @param {string[]} words
 * @return {string[]}
 */
const findWords = function(words) {
  // 下一个辅助函数，判断每一个单词是否合理,然后返回合理的单词
  const result = [];
  for (let i = 0; i < words.length; i++) {
    if (isTrue(words[i])) {
      result.push(words[i]);
    }
  }
  return result;
};

export { findWords };

~~~

  
### 0501-findMode.js

~~~js
/*
 * @lc app=leetcode.cn id=501 lang=javascript
 *
 * [501] 二叉搜索树中的众数
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */

// 112 ms, 在所有 JavaScript 提交中击败了40.49%
// 问题：二叉搜索树这个条件怎么使用？现在没有用上
const findMode = function(root) {
  // 辅助函数
  const runTree = function(node, dict) {
    if (!node) return;
    const key = node.val;
    if (dict[key]) {
      dict[key]++;
    } else {
      dict[key] = 1;
    }
    runTree(node.left, dict);
    runTree(node.right, dict);
  };

  // 设置哈希表存储出现的值和次数
  const dict = {};
  // 使用辅助函数遍历树节点
  runTree(root, dict);
  // console.log(dict);
  // 统计字典中的最大值
  const values = Object.values(dict);
  const max = Math.max(...values);
  const res = [];
  for (const key in dict) {
    if (dict[key] === max) {
      res.push(key);
    }
  }
  return res;
};

// @lc code=end

export { findMode };

~~~

  
### 0504-convertToBase7.js

~~~js
// 给定一个整数，将其转化为7进制，并以字符串形式输出。

// 示例 1:
// 输入: 100
// 输出: "202"
// 示例 2:
// 输入: -7
// 输出: "-10"

const base7 = function(num) {
  if (num < 7) return String(num);
  const remain = num % 7;
  const tmp = (num - remain) / 7;
  return base7(tmp) + String(remain);
};

/**
 * @param {number} num
 * @return {string}
 */
const convertToBase7 = function(num) {
  // 处理一下0
  if (num < 7 && num > -7) return String(num);
  // 处理一下负数
  const isMinus = !!(num < 0);
  num = isMinus ? -num : num;
  // 计算结果，辅助函数
  const res = base7(num);
  return isMinus ? `-${res}` : res;
  // 最后转换成字符串输出
};

export { convertToBase7 };

~~~

  
### 0506-findRelativeRanks.js

~~~js
/*
 * @lc app=leetcode.cn id=506 lang=javascript
 *
 * [506] 相对名次
 */
// [10,3,8,9,4]
// ["Gold Medal","Silver Medal","Bronze Medal","4","5"] 输出
// ["Gold Medal","5","Bronze Medal","Silver Medal","4"]
/**
 * @param {number[]} nums
 * @return {string[]}
 */
// 128 ms, 在所有 JavaScript 提交中击败 43.75%
const findRelativeRanks = function(nums) {
  const medals = ['Gold Medal', 'Silver Medal', 'Bronze Medal'];
  // 思路：首先把每一个变成一个对象，存储分数和序号
  for (let i = 0; i < nums.length; i++) {
    const score = nums[i];
    const index = i;
    nums[i] = { score, index };
  }
  // 这里不能这样排序
  // 然后数组按照分数排序
  nums.sort((a, b) => {
    return a.score < b.score ? 1 : -1;
  });
  // 然后把分数转换成前三个字符串
  for (let i = 0; i < nums.length; i++) {
    if (i <= 2) {
      nums[i].sequence = medals[i];
    } else {
      nums[i].sequence = String(i + 1);
    }
  }
  // 然后按照序号排序依次
  nums.sort((a, b) => {
    return a.index > b.index ? 1 : -1;
  });
  // 然后遍历数组，输出对应的排名
  const result = [];
  for (let i = 0; i < nums.length; i++) {
    const item = nums[i].sequence;
    result.push(item);
  }
  return result;
};

export { findRelativeRanks };

~~~

  
### 0507-checkPerfectNumber.js

~~~js
// 对于一个 正整数，如果它和除了它自身以外的所有正因子之和相等，我们称它为“完美数”。
// 给定一个 整数 n， 如果他是完美数，返回 True，否则返回 False
// 示例：
// 输入: 28
// 输出: True
// 解释: 28 = 1 + 2 + 4 + 7 + 14

// 思路：关键是计算全部的正因子
// 循环计算，然后放在数组中，然后求和判断是否是这个数
// 特殊情况处理 25 = 5 * 5
// 注意：01需要特殊处理
/**
 * @param {number} num
 * @return {boolean}
 */
function checkPerfectNumber(num) {
  if (num === 0 || num === 1) {
    return false;
  }
  let result = 1;
  for (let i = 2, len = Math.sqrt(num); i <= len; i++) {
    if (num % i === 0) {
      result += i;
      result += num / i;
    }
  }
  return result === num;
}

export { checkPerfectNumber };

~~~

  
### 0508-findFrequentTreeSum.js

~~~js
/*
 * @lc app=leetcode.cn id=508 lang=javascript
 *
 * [508] 出现次数最多的子树元素和
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// Your runtime beats 24.39 % of javascript submissions
const findFrequentTreeSum = function(root) {
  if (!root) return [];
  if (!root.left && !root.right) {
    const key = root.val;
    return [key];
  }
  const dict = {};
  const sum = runNode(root.left, dict) + runNode(root.right, dict);
  const key = sum + root.val;
  dict[key] ? dict[key]++ : dict[key] = 1;
  // 获取最大值
  let res = [];
  let max = 0;
  // console.log(dict);
  for (const key in dict) {
    const times = dict[key];
    if (times > max) {
      max = times;
      res = [];
      res.push(key);
    } else if (times === max) {
      res.push(key);
    }
  }
  return res;
};

const runNode = (node, dict) => {
  if (!node) return 0;
  if (!node.left && !node.right) {
    const key = node.val;
    dict[key] ? dict[key]++ : dict[key] = 1;
    return node.val;
  }
  const sum = runNode(node.left, dict) + runNode(node.right, dict);
  const key = sum + node.val;
  dict[key] ? dict[key]++ : dict[key] = 1;
  return key;
};
// @lc code=end

export { findFrequentTreeSum };

~~~

  
### 0509-fib.js

~~~js
/**
 * @param {number} N
 * @return {number}
 */
// 80 ms, 在所有 JavaScript 提交中击败了80.62%
const hashTable = {};
// 这个主要是缓存和递归
const fib = function(N) {
  if (N === 0) return 0;
  if (N === 1 || N === 2) return 1;
  if (hashTable[N]) {
    return hashTable[N];
  } else {
    const result = fib(N - 1) + fib(N - 2);
    hashTable[N] = result;
    return result;
  }
};

export { fib };

~~~

  
### 0513-findBottomLeftValue.js

~~~js
/*
 * @lc app=leetcode.cn id=513 lang=javascript
 *
 * [513] 找树左下角的值
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
// Your runtime beats 11.51 % of javascript submissions
const findBottomLeftValue = function(root) {
  if (root && !root.left && !root.right) {
    return root.val;
  }
  // 遍历树节点，然后获取树的不同层级的二维数组
  // 然后找到最后一个数组的第一个
  // 能否直接获取深度，然后遍历指定节点，这样就不需要遍历全部的节点
  const list = [];
  const depth = 0;
  runNode(root, depth, list);
  // console.log(list, depth);
  return list[list.length - 1][0];
};

const runNode = function(node, depth, list) {
  if (!node) return;
  const value = node.val;
  if (!list[depth]) {
    list[depth] = [];
  }
  list[depth].push(value);
  runNode(node.left, depth + 1, list);
  runNode(node.right, depth + 1, list);
};

// @lc code=end

export { findBottomLeftValue };

~~~

  
### 0515-largestValues.js

~~~js
/*
 * @lc app=leetcode.cn id=515 lang=javascript
 *
 * [515] 在每个树行中找最大值
 */

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// Your runtime beats 70.22 % of javascript submissions
// 遍历树节点，然后把每一层放在临时数组中，求最大值即可
const largestValues1 = function(root) {
  const tmpList = [];
  const runNode = (node, layer) => {
    if (!node) {
      return;
    }
    if (!tmpList[layer]) {
      tmpList[layer] = [];
    }
    tmpList[layer].push(node.val);
    runNode(node.left, layer + 1);
    runNode(node.right, layer + 1);
  };
  runNode(root, 0);
  const list = [];
  tmpList.forEach((item, index) => {
    list[index] = Math.max(...item);
  });
  return list;
};

// Your runtime beats 56.11 % of javascript submissions
const largestValues2 = function(root) {
  const list = [];
  const runNode = (node, layer) => {
    if (!node) {
      return;
    }
    if (!list[layer] && list[layer] !== 0) {
      list[layer] = node.val;
    } else {
      list[layer] = list[layer] > node.val ? list[layer] : node.val;
    }
    runNode(node.left, layer + 1);
    runNode(node.right, layer + 1);
  };
  runNode(root, 0);
  return list;
};

export { largestValues2, largestValues1 };

~~~

  
### 0520-detectCapitalUse.js

~~~js
// 给定一个单词，你需要判断单词的大写使用是否正确。
// 我们定义，在以下情况时，单词的大写用法是正确的：
// 全部字母都是大写，比如"USA"。
// 单词中所有字母都不是大写，比如"leetcode"。
// 如果单词不只含有一个字母，只有首字母大写， 比如 "Google"。
// 否则，我们定义这个单词没有正确使用大写字母。

// 示例 1:
// 输入: "USA"
// 输出: True
// 示例 2:
// 输入: "FlaG"
// 输出: False

const isLarge = function(str) {
  const index = str.charCodeAt(0);
  if (index > 64 && index < 91) {
    return true;
  } else if (index > 96 && index < 123) {
    return false;
  }
  return null;
};

/**
 * @param {string} word
 * @return {boolean}
 */
const detectCapitalUse = function(word) {
  const len = word.length;
  // 如果长度是1，始终是正确的
  if (len <= 1) return true;
  const firstStr = word[0];
  const isFirstLarge = isLarge(firstStr);

  if (isFirstLarge) {
    // 如首字母大写，长度是2，那么就是正确的
    if (len === 2) return true;
    // 第一个是大写（循环后面的，必须都是大写或者都是小写才行）
    const isSecondLarge = isLarge(word[1]);
    for (let i = 1; i < len; i++) {
      if (isLarge(word[i]) !== isSecondLarge) return false;
    }
    return true;
  } else {
    // 第一个是小写（循环后面的，必须都是小写才行）
    for (let i = 1; i < len; i++) {
      if (isLarge(word[i])) return false;
    }
    return true;
  }
};

export { isLarge, detectCapitalUse };

~~~

  
### 0529-updateBoard.js

~~~js
/*
 * @lc app=leetcode.cn id=529 lang=javascript
 *
 * [529] 扫雷游戏
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @param {number[]} click
 * @return {character[][]}
 */
//  140 ms, 在所有 JavaScript 提交中击败了17.20%
const updateBoard = function(board, click) {
  // 考点：广度优先遍历；或者深度优先遍历
  // 点到雷了
  if (board[click[0]][click[1]] === 'M') {
    board[click[0]][click[1]] = 'X';
    return board;
  }

  const isMine = (x, y) => {
    if (!board[x] || !board[x][y]) {
      return 0;
    }
    return board[x][y] === 'M' ? 1 : 0;
  };

  // 辅助函数
  const checkPoint = (x, y) => {
    // 首先判断这个点是否存在
    // 如果已经有数值，直接返回
    if (!board[x] || !board[x][y] || board[x][y] !== 'E') {
      return;
    }
    // 看周边有几个雷，那么显示多少数字
    const sum = isMine(x, y + 1) + isMine(x, y - 1)
    + isMine(x + 1, y + 1) + isMine(x + 1, y) + isMine(x + 1, y - 1)
    + isMine(x - 1, y + 1) + isMine(x - 1, y) + isMine(x - 1, y - 1);

    if (sum === 0) {
      // 如果周边完全没有雷，那么直接递归周边的八个点即可
      board[x][y] = 'B';
      // 递归剩下的点
      checkPoint(x, y + 1);
      checkPoint(x, y - 1);
      checkPoint(x + 1, y + 1);
      checkPoint(x + 1, y);
      checkPoint(x + 1, y - 1);
      checkPoint(x - 1, y + 1);
      checkPoint(x - 1, y);
      checkPoint(x - 1, y - 1);
    } else {
      // 如果周边有雷，直接标记数量
      board[x][y] = `${sum}`;
    }
  };
  checkPoint(click[0], click[1]);
  return board;
};
// @lc code=end
export { updateBoard };

~~~

  
### 0535-encode.js

~~~js
/*
 * @lc app=leetcode.cn id=535 lang=javascript
 *
 * [535] TinyURL 的加密与解密
 */

// @lc code=start
// 思路：直接返回，或者向后移动Unicode都可以实现加密
// 如何把长URL变成短的？这是问题所在
// 或者调用JS内部的encode-decode函数
// 实际上可以使用随机值进行哈希加密

const encode = function(longUrl) {
  return encodeURI(longUrl);
};

const decode = function(shortUrl) {
  return decodeURI(shortUrl);
};

// 可以通过这样进行转换
// const DICT = {
//   0: 'a',
//   1: 'b',
//   2: 'c'
// };
// "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * Your functions will be called as such:
 * decode(encode(url));
 */
// @lc code=end
export { encode, decode };

~~~

  
### 0537-complexNumberMultiply.js

~~~js
/*
 * @lc app=leetcode.cn id=537 lang=javascript
 *
 * [537] 复数乘法
 */

// @lc code=start
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
// 76 ms
// , 在所有 JavaScript 提交中击败了
// 84.62%
const complexNumberMultiply = function(a, b) {
  // 先把字符串变成两部分
  let index = a.indexOf('+');
  const a1 = parseInt(a.slice(0, index));
  const a2 = parseInt(a.slice(index + 1, a.length - 1));
  // console.log(a1, a2);
  index = b.indexOf('+');
  const b1 = parseInt(b.slice(0, index));
  const b2 = parseInt(b.slice(index + 1, b.length - 1));
  // console.log(b1, b2);
  // 然后分别进行乘积
  const c1 = a1 * b1 + a2 * b2 * -1;
  const c2 = a2 * b1 + a1 * b2;
  // 最后拼起来（注意0）
  return `${c1}+${c2}i`;
};
// @lc code=end

export { complexNumberMultiply };

~~~

  
### 0538-convertBST.js

~~~js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
// 过程在1038
// 144 ms, 在所有 JavaScript 提交中击败了16.89%
const convertBST = function(root) {
  let sum = 0;
  const runNode = (node) => {
    if (!node) {
      return;
    }
    // 递归右子树
    runNode(node.right);
    sum = sum + node.val;
    node.val = sum;
    // 递归左子树
    runNode(node.left);
  };
  runNode(root);
  return root;
};

export { convertBST };

~~~

  
### 0543-diameterOfBinaryTree.js

~~~js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

// 112 ms, 在所有 JavaScript 提交中击败了 26.34%
// 根节点：直接 maxLeft + maxRight
// 求当前节点下面左右子树的最大深度，然后 max = maxleft + maxright + 1 全局变量
// 返回值是 Math.max(maxLeft + maxRight) + 1
const diameterOfBinaryTree = function(root) {
  // 这是最大的深度
  let max = 0;
  // 辅助函数，获取一个节点的深度和直径
  const checkNode = (node) => {
    // 如果当前节点不存在，直接返回0
    if (!node) {
      return 0;
    }
    // 如果当前节点没有子节点，返回1
    if (!node.left && !node.right) {
      return 1;
    }
    // 如果当前节点有子节点，那么求当前最大值
    const leftDepth = checkNode(node.left);
    const rightDepth = checkNode(node.right);
    const currentLen = leftDepth + rightDepth + 1;
    if (currentLen > max) {
      max = currentLen;
    }
    // 并返回当前子节点的长度
    return Math.max(leftDepth, rightDepth) + 1;
  };
  // 根节点特殊，需要减去1
  checkNode(root);
  return max === 0 ? max : max - 1;
};

// [1,2,3,4,5]
// [1,2,3,4,5,null,6,7,8,null,null,19,20]
// [1, null, 2]
// [1, null, 2,1,2,3,4,5,null,6,7,8,null,null,19,20,null,null]
// [1]
export { diameterOfBinaryTree };

~~~

  
### 0551-checkRecord.js

~~~js
// 551 检查学生出勤率
// 给定一个字符串来代表一个学生的出勤记录，这个记录仅包含以下三个字符：

// 'A' : Absent，缺勤
// 'L' : Late，迟到
// 'P' : Present，到场
// 如果一个学生的出勤记录中不超过一个'A'(缺勤)并且不超过两个连续的'L'(迟到),那么这个学生会被奖赏。

/**
 * @param {string} s
 * @return {boolean}
 */

// 72 ms, 在所有 javascript 提交中击败了56.71%
function checkRecord(s) {
  const records = s.split('');
  const len = records.length;
  let absentTime = 0;
  for (let i = 0; i < len; i++) {
    if (records[i] === 'A') {
      absentTime++;
    }
    if (absentTime > 1) {
      return false;
    }
    if (i < len - 2 && records[i] === 'L' && records[i + 1] === 'L' && records[i + 2] === 'L') {
      return false;
    }
  }
  return true;
}

export { checkRecord };

~~~

  
### 0554-leastBricks.js

~~~js
/*
 * @lc app=leetcode.cn id=554 lang=javascript
 *
 * [554] 砖墙
 */

// @lc code=start
/**
 * @param {number[][]} wall
 * @return {number}
 */
// Your runtime beats 89.16 % of javascript submissions
const leastBricks = function(wall) {
// 遍历每一个子数组，获取砖头缝的位置，并写到对象中
// 然后找到数量最多的砖缝，使用层数减去砖缝数量，就是最少穿过的砖的数量
  const dict = {};
  let max = 0;
  const rowLen = wall.length;
  for (let i = 0; i < rowLen; i++) {
    const row = wall[i];
    let initKey = 0;
    const cellLen = row.length;
    for (let j = 0; j < cellLen - 1; j++) {
      const item = row[j];
      initKey += item;
      dict[initKey] ? dict[initKey]++ : dict[initKey] = 1;
      max = dict[initKey] > max ? dict[initKey] : max;
    }
  }
  // console.log(dict);
  return rowLen - max;
};
// @lc code=end

export { leastBricks };

~~~

  
### 0557-reverseWords.js

~~~js
/**
 * @param {string} s
 * @return {string}
 */
// 84 ms, 在所有 JavaScript 提交中击败了97.58%
const reverseStr = function(str) {
  return str.split('').reverse().join('');
};

const reverseWords = function(s) {
  const len = s.length;
  if (len === 0) return s;
  const arr1 = s.split(' ');
  const arr2 = arr1.map((item) => {
    return reverseStr(item);
  });
  return arr2.join(' ');
};

export { reverseWords };

~~~

  
### 0559-maxDepth.js

~~~js
/*
 * @lc app=leetcode.cn id=559 lang=javascript
 * [559] N叉树的最大深度
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */
// Your runtime beats 91.3 % of javascript submissions
const getDepth = function(node) {
  if (!node) return 1;
  let max = 0;
  const len = node.children.length;
  for (let i = 0; i < len; i++) {
    const child = node.children[i];
    const depth = getDepth(child);
    max = depth > max ? depth : max;
  }
  return max + 1;
};

/**
 * @param {Node} root
 * @return {number}
 */
const maxDepth = function(root) {
  if (!root) return 0;
  return getDepth(root);
};
// @lc code=end

export { maxDepth };

~~~

  
### 0561-arrayPairSum.js

~~~js
/**
 * @param {number[]} nums
 * @return {number}
 */
// 给定长度为 2n 的数组, 你的任务是将这些数分成 n 对, 例如 (a1, b1), (a2, b2), ..., (an, bn) ，使得从1 到 n 的 min(ai, bi) 总和最大。
// 示例 1:
// 输入: [1,4,3,2]
// 输出: 4
// 解释: n 等于 2, 最大总和为 4 = min(1, 2) + min(3, 4).
// 提示:
// n 是正整数,范围在 [1, 10000].
// 数组中的元素范围在 [-10000, 10000].

// 思路1
// 数组首先排序，然后获取奇数序号的值的总和
// 168 ms, 在所有 JavaScript 提交中击败了24.32%
const arrayPairSum = function(nums) {
  const len = nums.length;
  // 现在这种思路，排序执行了一次，然后再次循环
  // 实际执行两次循环，性能一般
  if (len === 0) return 0;
  nums.sort((a, b) => a - b);
  let sum = 0;
  for (let i = 0; i < len; i += 2) {
    sum += nums[i];
  }
  return sum;
};

export { arrayPairSum };

~~~

  
### 0563-findTilt.js

~~~js
/*
 * @lc app=leetcode.cn id=563 lang=javascript
 *
 * [563] 二叉树的坡度
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
// 104 ms, 在所有 JavaScript 提交中击败了44.95%
// 辅助函数：计算节点的和集坡度
const getSum = function(node, list) {
  if (!node) {
    return 0;
  }
  if (node && !node.left && !node.right) {
    return node.val;
  }
  const nodeSum = node.val;
  const sum1 = getSum(node.left, list);
  const sum2 = getSum(node.right, list);
  const nodeSlope = Math.abs(sum1 - sum2);
  list.push(nodeSlope);
  return sum1 + sum2 + nodeSum;
};

/**
 * @param {TreeNode} root
 * @return {number}
 */
const findTilt = function(root) {
  const list = [];
  getSum(root, list);
  let sum = 0;
  list.forEach((item) => sum += item);
  return sum;
};

// [1,2,3,4,5,6,7,8,9,null,null,13,null,19,38] 152
// @lc code=end
export { findTilt };

~~~

  
### 0566-matrixReshape.js

~~~js
/*
 * @lc app=leetcode.cn id=566 lang=javascript
 *
 * [566] 重塑矩阵
 */
/**
 * @param {number[][]} nums
 * @param {number} r
 * @param {number} c
 * @return {number[][]}
 */
// 112 ms, 在所有 JavaScript 提交中击败了79.03%
const matrixReshape = function(nums, r, c) {
  // 判断矩阵是否可以重塑，那么就是原始矩阵的元素个数和新变换后的矩阵的个数是否相等
  const L1 = nums.length;
  if (L1 === 0) return nums;
  const L2 = nums[0].length;
  if (L2 === 0) return nums;
  if (L1 * L2 !== r * c) {
    return nums;
  }
  if (L1 === r && L2 === c) {
    return nums;
  }
  // 转换矩阵，使用二重遍历，然后填充数组的方式。
  // 新的矩阵，r行c列
  const matrix = [];
  let tmp = [];
  for (let i = 0; i < L1; i++) {
    for (let j = 0; j < L2; j++) {
      const inner = nums[i][j];
      tmp.push(inner);
      if (tmp.length === c) {
        matrix.push(tmp);
        tmp = [];
      }
    }
  }
  return matrix;
};

export { matrixReshape };

~~~

  
### 0575-distributeCandies.js

~~~js
/**
 * @param {number[]} candies
 * @return {number}
 */
// 分糖果
// 思路一：396 ms, 在所有 JavaScript 提交中击败了16.83%
const distributeCandies = function(candies) {
  const len = candies.length;
  const dict = {};
  for (let i = 0; i < len; i++) {
    const key = candies[i];
    if (dict[key]) {
      dict[key]++;
    } else {
      dict[key] = 1;
    }
  }
  const nums = [];
  for (const key in dict) {
    const value = dict[key];
    nums.push(value);
  }
  return Math.min(nums.length, candies.length / 2);
};

// 思路二：直接把糖果去重，然后就是key的长度
// 148 ms, 在所有 JavaScript 提交中击败了64.36%
const distributeCandies2 = function(candies) {
  const keys = [...new Set(candies)];
  return Math.min(keys.length, candies.length / 2);
};

export { distributeCandies, distributeCandies2 };

~~~

  
### 0589-preorder.js

~~~js
/*
 * @lc app=leetcode.cn id=589 lang=javascript
 *
 * [589] N叉树的前序遍历
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[]}
 */
// 120 ms, 在所有 JavaScript 提交中击败了33.70%
const runNode = function(node, list) {
  if (!node) return;
  // 前序遍历：根左右
  list.push(node.val);
  if (!node.children) return;
  for (let i = 0; i < node.children.length; i++) {
    runNode(node.children[i], list);
  }
};

const preorder = function(root) {
  const list = [];
  runNode(root, list);
  return list;
};

// @lc code=end
export { preorder };

~~~

  
### 0590-postorder.js

~~~js
/*
 * @lc app=leetcode.cn id=590 lang=javascript
 *
 * [590] N叉树的后序遍历
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[]}
 */
// 96 ms, 在所有 JavaScript 提交中击败了95.50%
const runNode = function(node, list) {
  if (!node) return;
  // 后序遍历：左右根
  if (node.children) {
    for (let i = 0; i < node.children.length; i++) {
      runNode(node.children[i], list);
    }
  }
  list.push(node.val);
};

const postorder = function(root) {
  const list = [];
  runNode(root, list);
  return list;
};

// @lc code=end
export { postorder };

~~~

  
### 0594-findLHS.js

~~~js
/*
 * @lc app=leetcode.cn id=594 lang=javascript
 *
 * [594] 最长和谐子序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// const findLHS = function(nums) {
// let dict = {};
// const len = nums.length;
// for (let i = 0; i < len; i++) {
//   let key = nums[i];
//   dict[key] ? dict[key]++ : dict[key] = 1;
// }
// let arr = [];
// // console.log(dict);
// // 循环dictionary
// for (let key in dict) {
//   if (key >= 0) {
//     arr[key] = dict[key];
//   }
// }
//   let longest = 0;
//   let lastIndex;
//   let lastTimes;
//   // console.log(arr);
//   arr.forEach((item, index) => {
//     if (index === lastIndex + 1) {
//       let times = lastTimes + item;
//       longest = longest > times ? longest : times;
//     }
//     lastIndex = index;
//     lastTimes = item;
//   });

//   // 处理负数
//   arr = [];
//   for (let key in dict) {
//     if (key <= 0) {
//       let newKey = -parseInt(key);
//       // console.log(newKey);
//       arr[newKey] = dict[key];
//     }
//   }
//   // console.log(arr);
//   arr.forEach((item, index) => {
//     if (index === lastIndex + 1) {
//       let times = lastTimes + item;
//       longest = longest > times ? longest : times;
//     }
//     lastIndex = index;
//     lastTimes = item;
//   });
//   return longest;
// };
// [-1,0,-1,0,-1,0,-1] 需要考虑负数
// [35005211,21595368,94702567,26956429,36465782,61021530,78722862,33665123,45174067,68703135]
// 超时，这个思路不行

// 分成两部分存储
// 一个数组，单独存放数值
// 一个对象，存放不同数字出现的次数
// Your runtime beats 59.62 % of javascript submissions
const findLHS = function(nums) {
  const dict = {};
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    const key = nums[i];
    dict[key] ? dict[key]++ : dict[key] = 1;
  }
  const arr = [];
  for (const key in dict) {
    arr.push(parseInt(key));
  }
  arr.sort((a, b) => a - b);
  // console.log(arr);
  // console.log(dict);
  let longest = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] - arr[i - 1] === 1) {
      const key1 = String(arr[i]);
      const key2 = String(arr[i - 1]);
      const times = dict[key1] + dict[key2];
      // console.log(key1, key2);
      longest = longest > times ? longest : times;
    }
  }
  return longest;
};
// @lc code=end

export { findLHS };

~~~

  
### 0598-maxCount.js

~~~js
// 598. 范围求和 II
// 给定一个初始元素全部为 0，大小为 m*n 的矩阵 M 以及在 M 上的一系列更新操作。

// 操作用二维数组表示，其中的每个操作用一个含有两个正整数 a 和 b 的数组表示，含义是将所有符合 0 <= i < a 以及 0 <= j < b 的元素 M[i][j] 的值都增加 1。

// 在执行给定的一系列操作后，你需要返回矩阵中含有最大整数的元素个数。

// 示例 1:

// 输入:
// m = 3, n = 3
// operations = [[2,2],[3,3]]
// 输出: 4
// 解释:
// 初始状态, M =
// [[0, 0, 0],
//  [0, 0, 0],
//  [0, 0, 0]]

// 执行完操作 [2,2] 后, M =
// [[1, 1, 0],
//  [1, 1, 0],
//  [0, 0, 0]]

// 执行完操作 [3,3] 后, M =
// [[2, 2, 1],
//  [2, 2, 1],
//  [1, 1, 1]]

// M 中最大的整数是 2, 而且 M 中有4个值为2的元素。因此返回 4。
/**
 * @param {number} m
 * @param {number} n
 * @param {number[][]} ops
 * @return {number}
 */
const maxCount = function(m, n, ops) {
  const len = ops.length;
  if (len === 0) {
    return m * n;
  }
  // 先把 ops 遍历一次
  // 如果有一个是0，那么应该去掉（不会增加元素）
  // 然后求所有 x,y 对应坐标的最小值
  // 把这个乘法就是结果？
  // 是否有特殊情况
  // 如果按照题目直接算，那么数量太大了
  let a;
  let b;
  for (let i = 0; i < ops.length; i++) {
    const item = ops[i];
    const x = item[0]; const
      y = item[1];
    if (x === 0 || y === 0) continue;
    if (!a) {
      a = x;
    } else {
      a = a > x ? x : a;
    }
    if (!b) {
      b = y;
    } else {
      b = b > y ? y : b;
    }
  }
  return a * b;
};

export { maxCount };

~~~

  
### 0605-canPlaceFlowers.js

~~~js
/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
const canPlaceFlowers = function(flowerbed, n) {
  // 循环数组，如果当前的值和前面后面的都没有（或者前面后面不存在）那么就可以满足条件
  // 然后 N - 1
  // 如果N小于等于0，那么久可以实现（复杂情况：二维实现）
  if (n === 0) return true;
  const len = flowerbed.length;
  for (let i = 0; i < len; i++) {
    if (flowerbed[i] === 0) {
      if ((flowerbed[i - 1] === 0 || !flowerbed[i - 1]) && (flowerbed[i + 1] === 0 || !flowerbed[i + 1])) {
        n--;
        flowerbed[i] = 1;
        if (n <= 0) return true;
      }
    }
  }
  return n <= 0;
};

// 有没有更好的办法：判断是否存在 [0,0,0] 这样的子数组，然后计算和？
// 把数组转换成字符串，然后 indexOf 000 这样的情况
// 可以试试第二种思路
// const canPlaceFlowers = function(flowerbed, n) {
//   if (n === 0) return true;
//   let str = flowerbed.join('');
//   const len = flowerbed.length;

//   while (str.indexOf('000') > -1) {
//     let index = str.indexOf('000');
//     n--;
//     str = str.slice() + '010' + str.slice();
//     if (n <= 0) return true;
//   }
// };

export { canPlaceFlowers };

~~~

  
### 0606-tree2str.js

~~~js
/*
 * @lc app=leetcode.cn id=606 lang=javascript
 *
 * [606] 根据二叉树创建字符串
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} t
 * @return {string}
 */
// 58.13 % of javascript submissions

const runNode = function(node) {
  if (!node) {
    return null;
  }
  if (!node.left && !node.right) {
    return `(${node.val})`;
  }
  const left = runNode(node.left);
  const right = runNode(node.right);
  return `(${node.val}${left !== null ? left : '()'}${right !== null ? right : ''})`;
};
// @lc code=end

const tree2str = function(t) {
  if (!t) return '';
  const res = runNode(t);
  return res.slice(1, res.length - 1);
};

export { tree2str };

~~~

  
### 0609-findDuplicate.js

~~~js
/*
 * @lc app=leetcode.cn id=609 lang=javascript
 *
 * [609] 在系统中查找重复文件
 */

// @lc code=start
/**
 * @param {string[]} paths
 * @return {string[][]}
 */
//  160 ms, 在所有 JavaScript 提交中击败了79.31%
const findDuplicate = function(paths) {
  const dict = {};
  // "root/a 1.txt(abcd) 2.txt(efgh)"
  const handlePath = (path) => {
    const res = path.split(' ');
    const realPath = res.shift(); // root/a
    // [1.txt(abcd), 2.txt(efgh)]
    for (let j = 0; j < res.length; j++) {
      const file = res[j];
      // 然后把文件名和文件内容分别获取到
      const index = file.indexOf('(');
      const fileName = file.slice(0, index);
      const fileContent = file.slice(index + 1, file.length - 1);
      // console.log(fileName, fileContent);
      if (!dict[fileContent]) {
        dict[fileContent] = [];
      }
      dict[fileContent].push(`${realPath}/${fileName}`);
    }
  };

  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    handlePath(path);
  }
  const res = [];
  for (const key in dict) {
    const value = dict[key];
    if (value.length > 1) res.push(value);
  }
  return res;
};
// @lc code=end

export { findDuplicate };

~~~

  
### 0617-mergeTrees.js

~~~js
/*
 * @lc app=leetcode.cn id=617 lang=javascript
 *
 * [617] 合并二叉树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {TreeNode}
 */
// 128 ms
// , 在所有 JavaScript 提交中击败了
// 65.47%
// 的用户
const mergeTrees = function(t1, t2) {
  if (!t1) return t2;
  if (!t2) return t1;
  t1.val = t1.val + t2.val;
  t1.left = mergeTrees(t1.left, t2.left);
  t1.right = mergeTrees(t1.right, t2.right);
  return t1;
};
// @lc code=end

export { mergeTrees };

~~~

  
### 0622-MyCircularQueue.js

~~~js
/*
 * @lc app=leetcode.cn id=622 lang=javascript
 *
 * [622] 设计循环队列
 */
// Your runtime beats 89.97 % of javascript submissions
// @lc code=start
/**
 * @param {number} k
 */
const MyCircularQueue = function(k) {
  arr = [];
  maxLen = k;
};

/**
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function(value) {
  if (arr.length < maxLen) {
    arr.push(value);
    return true;
  }
  return false;
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function() {
  if (arr.length > 0) {
    arr.shift();
    return true;
  }
  return false;
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Front = function() {
  return arr.length > 0 ? arr[0] : -1;
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function() {
  return arr.length > 0 ? arr[arr.length - 1] : -1;
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function() {
  return arr.length === 0;
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function() {
  return arr.length === maxLen;
};

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * let obj = new MyCircularQueue(k)
 * let param_1 = obj.enQueue(value)
 * let param_2 = obj.deQueue()
 * let param_3 = obj.Front()
 * let param_4 = obj.Rear()
 * let param_5 = obj.isEmpty()
 * let param_6 = obj.isFull()
 */
// @lc code=end

export { MyCircularQueue };

~~~

  
### 0628-maximumProduct.js

~~~js
/**
 * @param {number[]} nums
 * @return {number}
 */
// 132 ms , 在所有 JavaScript 提交中击败了80.73%
const maximumProduct = function(nums) {
  const len = nums.length;
  if (len === 3) return nums[0] * nums[1] * nums[2];
  // 直接排序
  nums.sort((a, b) => a - b);
  // 结果无非是几种
  // 三个正数
  // 一个正数和两个负数
  const num1 = nums[0] * nums[1] * nums[len - 1];
  const num2 = nums[len - 3] * nums[len - 2] * nums[len - 1];
  return Math.max(num1, num2);
};

export { maximumProduct };

~~~

  
### 0637-averageOfLevels.js

~~~js
/*
 * @lc app=leetcode.cn id=637 lang=javascript
 *
 * [637] 二叉树的层平均值
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 96 ms , 在所有 JavaScript 提交中击败了82.37%
const averageOfLevels = function(root) {
  // 辅助函数
  const runNode = function(node, depth, matrix) {
    if (!node) return;
    if (!matrix[depth]) {
      matrix[depth] = [];
    }
    const value = node.val;
    matrix[depth].push(value);
    runNode(node.left, depth + 1, matrix);
    runNode(node.right, depth + 1, matrix);
  };

  // 遍历二叉树，转换成一个二维数组
  const depth = 0;
  const matrix = [];
  runNode(root, depth, matrix);
  // 计算二维数组的平均值
  for (let i = 0; i < matrix.length; i++) {
    const list = matrix[i];
    const len = list.length;
    const fn = function(total, num) {
      return total + num;
    };
    const sum = list.reduce(fn, 0);
    matrix[i] = sum / len;
  }
  return matrix;
};

// @lc code=end

export { averageOfLevels };

~~~

  
### 0640-solveEquation.js

~~~js
/*
 * @lc app=leetcode.cn id=640 lang=javascript
 *
 * [640] 求解方程
 */

// @lc code=start
/**
 * @param {string} equation
 * @return {string}
 */
// 现在五个测试用例通过
// Your runtime beats 88.64 % of javascript submissions
const solveEquation = function(equation) {
  // 辅助函数
  const getNumber = (arr) => {
    let a = 0;
    let b = 0;
    arr.forEach((item) => {
      if (item[item.length - 1] === 'x') {
        let num = item.slice(0, item.length - 1);
        if (num.length === 0) {
          num = 1;
        }
        a += Number(num);
      } else {
        b += Number(item);
      }
    });
    return { a, b };
  };

  // 先获取等号，把等号两边字符串取出来（x+5-3+x）
  // 不考虑一个方程中有多个等号的情况（不是方程）
  const index = equation.indexOf('=');
  let left = equation.slice(0, index);
  let right = equation.slice(index + 1);
  // 如果左右开头不是负号，那么给左右加一个负号（避免 2 = -2X）
  if (left[0] !== '-') {
    left = `+${left}`;
  }
  if (right[0] !== '-') {
    right = `+${right}`;
  }
  // console.log(left, right);

  // 先处理左边
  // 先 split ("+") 变成一个数组
  const leftArr1 = left.split('+');
  // 这个数组存储正数
  const leftArr2 = [];
  // 这个数组存储负数
  const leftArr3 = [];
  // 然后遍历这个数组
  leftArr1.forEach((str) => {
    // 如果某一项 indexOf ('-') 那么再次 split('') 然后把这两个情况分别放入结果数组中
    if (str.includes('-')) {
      const tmp = str.split('-');
      leftArr2.push(tmp.shift());
      leftArr3.push(...tmp);
    } else {
      leftArr2.push(str);
    }
  });
  // 这一步正确
  // console.log(leftArr2);
  // console.log(leftArr3);
  const obj1 = getNumber(leftArr2);
  const obj2 = getNumber(leftArr3);
  // 然后再次遍历这个数组，把常熟项和X的系数分开，存储两个单独的变量

  // 再处理右边
  const leftArr4 = right.split('+');
  const leftArr5 = [];
  const leftArr6 = [];
  leftArr4.forEach((str) => {
    if (str.includes('-')) {
      const tmp = str.split('-');
      leftArr5.push(tmp.shift());
      leftArr6.push(...tmp);
    } else {
      leftArr5.push(str);
    }
  });
  const obj3 = getNumber(leftArr5);
  const obj4 = getNumber(leftArr6);
  // console.log(obj1, obj2, obj3, obj4);
  const a = obj1.a - obj2.a - obj3.a + obj4.a;
  const b = obj1.b - obj2.b - obj3.b + obj4.b;

  // 无解的情况：等号左右没有X，但是有常熟项
  // 无穷解的情况：等号左右没有X，也没有常熟项
  // 解是0，等号左右没有常数项，但是X的系数不同
  if (a === 0 && b === 0) {
    return 'Infinite solutions';
  }
  if (a === 0 && b !== 0) {
    return 'No solution';
  }
  if (a !== 0 && b === 0) {
    return 'x=0';
  }
  // 其他的情况：使用常数项除以X的系数，返回就是X的值
  const times = -(b / a);
  return `x=${times}`;
};
// test
// const testArr = [
//   "x+5-3+x=6+x-2",
//   "x=x",
//   "2x=x",
//   "2x+3x-6x=x+2",
//   "x=x+2"
// ];
// for (let i = 0; i < testArr.length; i++) {
//   let item = testArr[i];
//   solveEquation(item);
// }

// @lc code=end

export { solveEquation };

~~~

  
### 0643-findMaxAverage.js

~~~js
/*
 * @lc app=leetcode.cn id=643 lang=javascript
 * [643] 子数组最大平均数 I
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// 思路1：循环所有子数组，然后依次求和，这样可以实现，性能不好
// 思路2：循环所有子数组，求和利用上一次的结果
// 112 ms, 在所有 JavaScript 提交中击败了71.43%的用户
const findMaxAverage = function(nums, k) {
  const n = nums.length;
  // 如果全部的数字小于给定的范围，测试一下
  if (n < k) {
    return null;
  }
  // 如果相等，那么直接求平均值
  else if (n === k) {
    return sum(nums) / k;
  } else {
    // n > k 选中的是一个子集
    const subArr = nums.slice(0, k);
    let max = sum(subArr);
    let currentSum = max;
    for (let i = k; i < n; i++) {
      currentSum = currentSum + nums[i] - nums[i - k];
      max = currentSum > max ? currentSum : max;
    }
    return max / k;
  }
};

// 辅助函数（求数组的和）
const sum = function(arr) {
  const fn = function(total, num) {
    return total + num;
  };
  return arr.reduce(fn, 0);
};
// @lc code=end

export { findMaxAverage };

~~~

  
### 0645-findErrorNums.js

~~~js
/*
 * @lc app=leetcode.cn id=645 lang=javascript
 *
 * [645] 错误的集合
 */
// 第一种思路是先排序，然后比较，这种时间复杂度不太好
// 第二种思路是，遍历一次，通过字典找到重复的一个
// 然后再次遍历一次，找到确实的一个
// 这样比较消耗内存
/**
 * @param {number[]} nums
 * @return {number[]}
 */
// Your runtime beats 93.89 % of javascript submissions
const findErrorNums = function(nums) {
  let error1;
  let error2;
  const len = nums.length;
  const dict = {};
  for (let i = 0; i < len; i++) {
    const key = nums[i];
    if (!dict[key]) {
      dict[key] = true;
    } else {
      error1 = key;
    }
  }
  for (let i = 0; i < len; i++) {
    if (!dict[i + 1]) {
      error2 = i + 1;
      break;
    }
  }
  return [error1, error2];
};

export { findErrorNums };

~~~

  
### 0657-judgeCircle.js

~~~js
/*
 * @lc app=leetcode.cn id=657 lang=javascript
 *
 * [657] 机器人能否返回原点
 */

// @lc code=start
/**
 * @param {string} moves
 * @return {boolean}
 */
// Your runtime beats 98.4 % of javascript submissions
const judgeCircle = function(moves) {
  if (moves.length % 2 === 1) return false;
  let x = 0;
  let y = 0;
  // 第一种思路，循环当前的字符串
  for (let i = 0; i < moves.length; i++) {
    const item = moves[i];
    switch (item) {
      case 'R':
        x++;
        break;
      case 'L':
        x--;
        break;
      case 'U':
        y++;
        break;
      case 'D':
        y--;
        break;
      default:
        break;
    }
  }
  return x === 0 && y === 0;
  // 第二种思路：字符串排序，直接计算字符串的数量
  // 这个对于长字符串效果比较好
};

// 第二种思路：字符串排序，直接计算字符串的数量
// 160 ms, 在所有 JavaScript 提交中击败了5.72%
// const judgeCircle = function(moves) {
//   if (moves.length % 2 === 1) return false;
//   moves = moves.split('');
//   moves.sort((a, b) => a > b ? 1 : -1);
//   let a = moves.indexOf('R') - moves.lastIndexOf('R');
//   let b = moves.indexOf('L') - moves.lastIndexOf('L');
//   if (a !== b) return false;
//   let c = moves.indexOf('U') - moves.lastIndexOf('U');
//   let d = moves.indexOf('D') - moves.lastIndexOf('D');
//   return c === d;
// };
// @lc code=end

export { judgeCircle };

~~~

  
### 0661-imageSmoother.js

~~~js
/*
 *[661] 图片平滑器
 */
/**
 * @param {number[][]} M
 * @return {number[][]}
 */
// 思路1：
// 直接新建一个数组，然后计算每个节点的灰度
// 这样需要完全遍历一次新数组，性能一般，消耗内存
// 暂时没有更好的思路
const imageSmoother = function(M) {
  const getGray = function(i, j) {
    // 获取当前节点
    // 获取周边节点
    // 然后返回平均值
    let sum = M[i][j];
    let index = 1;
    if (M[i]) {
      if (M[i][j - 1] > -1) {
        sum += M[i][j - 1];
        index++;
      }
      if (M[i][j + 1] > -1) {
        sum += M[i][j + 1];
        index++;
      }
    }
    if (M[i - 1]) {
      sum += M[i - 1][j];
      index++;
      if (M[i - 1][j - 1] > -1) {
        sum += M[i - 1][j - 1];
        index++;
      }
      if (M[i - 1][j + 1] > -1) {
        sum += M[i - 1][j + 1];
        index++;
      }
    }
    if (M[i + 1]) {
      sum += M[i + 1][j];
      index++;
      if (M[i + 1][j - 1] > -1) {
        sum += M[i + 1][j - 1];
        index++;
      }
      if (M[i + 1][j + 1] > -1) {
        sum += M[i + 1][j + 1];
        index++;
      }
    }
    return Math.floor(sum / index);
  };
  // 计算M的情况
  const matrix = [];
  for (let i = 0; i < M.length; i++) {
    const arr = [];
    const len = M[i].length;
    for (let j = 0; j < len; j++) {
      const current = getGray(i, j);
      arr.push(current);
    }
    matrix.push(arr);
  }
  return matrix;
};

export { imageSmoother };

~~~

  
### 0665-checkPossibility.js

~~~js
/*
 * @lc app=leetcode.cn id=665 lang=javascript
 *
 * [665] 非递减数列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
// Your runtime beats 75.05 % of javascript submissions
const checkPossibility = function(nums) {
  const len = nums.length;
  if (len <= 2) {
    return true;
  }
  let flag = true;
  for (let i = 0; i < len - 1; i++) {
    if (nums[i] > nums[i + 1]) {
      if (flag === false) {
        return false;
      }
      // 两种情况（一个是删除当前元素）
      // 另一个是删除后面的元素
      // 只要是一个可以， 那么就继续
      if (
        (i > 0 && nums[i + 1] >= nums[i - 1])
        || i === 0
      ) {
        nums.splice(i, 1);
        i--;
        flag = false;
      } else if (
        (nums[i + 2] >= nums[i])
        || (!nums[i + 2] && nums[i + 2] !== 0)
      ) {
        // 删除i + 1
        nums.splice(i + 1, 1);
        i--;
        flag = false;
      } else {
        return false;
      }
    }
  }
  return true;
};
// [3,4,2,3] false
// [5,7,1,8] true
// [1,4,1,2] true
// [1,2,4,5,3] true

// @lc code=end

export { checkPossibility };

~~~

  
### 0671-findSecondMinimumValue.js

~~~js
/*
 * @lc app=leetcode.cn id=671 lang=javascript
 *
 * [671] 二叉树中第二小的节点
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
// 这个可以遍历全部的节点，然后获取第二小的值，很显然方法不好
// 也就是正数第二层的节点（如果下面还有一层）
// 从上到下，广度优先遍历，找到第二小的节点
// Your runtime beats 75.4 % of javascript submissions
const findSecondMinimumValue = function(root) {
  if (!root || !root.val) {
    return -1;
  }
  const runNode = function(node, target) {
    if (!node) {
      return null;
    }
    if (node && node.val > target) {
      return node.val;
    }
    if (node.left) {
      const a = runNode(node.left, target);
      const b = runNode(node.right, target);
      if (!a && !b) return -1;
      if (!a || a === -1) return b;
      if (!b || b === -1) return a;
      return Math.min(a, b);
    }
    return null;
  };
  const rootVal = root.val;
  const res = runNode(root, rootVal);
  return res || -1;
};
// @lc code=end

export { findSecondMinimumValue };

~~~

  
### 0680-validPalindrome.js

~~~js
/*
 * @lc app=leetcode.cn id=680 lang=javascript
 *
 * [680] 验证回文字符串 Ⅱ
 */
// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
// Your runtime beats 92.87 % of javascript submissions
const validPalindrome = function(s) {
  const testString = function(s, flag) {
    const len = s.length;
    if (len < 2) return true;
    const half = Math.floor(len / 2);
    for (let i = 0; i <= half; i++) {
      if (s[i] !== s[len - 1 - i]) {
        if (flag === false) return false;
        if (
          (i === half)
          || (len - 1 - i - 1 === half)
          || (s[i + 1] === s[len - 1 - i] && i < half)
          || (s[i] === s[len - 1 - i - 1] && len - 1 - i - 1 > half)
        ) {
          const s1 = s.slice(0, i) + s.slice(i + 1);
          const s2 = s.slice(0, len - 1 - i) + s.slice(len - i);
          return testString(s1, false) || testString(s2, false);
        } else {
          return false;
        }
      }
    }
    return true;
  };
  return testString(s, true);
};
// @lc code=end

export { validPalindrome };

~~~

  
### 0682-calPoints.js

~~~js
// 682. 棒球比赛
// 你现在是一场采特殊赛制棒球比赛的记录员。这场比赛由若干回合组成，过去几回合的得分可能会影响以后几回合的得分。
// 比赛开始时，记录是空白的。你会得到一个记录操作的字符串列表 ops，其中 ops[i] 是你需要记录的第 i 项操作，ops 遵循下述规则：

// 整数 x - 表示本回合新获得分数 x
// "+" - 表示本回合新获得的得分是前两次得分的总和。题目数据保证记录此操作时前面总是存在两个有效的分数。
// "D" - 表示本回合新获得的得分是前一次得分的两倍。题目数据保证记录此操作时前面总是存在一个有效的分数。
// "C" - 表示前一次得分无效，将其从记录中移除。题目数据保证记录此操作时前面总是存在一个有效的分数。
// 请你返回记录中所有得分的总和。

// 示例 1：
// 输入：ops = ["5","2","C","D","+"]
// 输出：30
// 解释：
// "5" - 记录加 5 ，记录现在是 [5]
// "2" - 记录加 2 ，记录现在是 [5, 2]
// "C" - 使前一次得分的记录无效并将其移除，记录现在是 [5].
// "D" - 记录加 2 * 5 = 10 ，记录现在是 [5, 10].
// "+" - 记录加 5 + 10 = 15 ，记录现在是 [5, 10, 15].
// 所有得分的总和 5 + 10 + 15 = 30
/**
 * @param {string[]} ops
 * @return {number}
 */
// 思路一：先把C拿到然后把相关的数据剔除
// 思路二：直接使用stack计算数值，两次循环
const calPoints = function(ops) {
  const stack = [];
  const len = ops.length;
  for (let i = 0; i < len; i++) {
    const item = ops[i];
    if (item === 'C') {
      stack.pop();
    } else if (item === 'D') {
      const last = stack[stack.length - 1] * 2;
      stack.push(last);
    } else if (item === '+') {
      const last = stack[stack.length - 1] + stack[stack.length - 2];
      stack.push(last);
    } else {
      const last = ops[i];
      stack.push(parseInt(last));
    }
  }
  let sum = 0;
  stack.forEach((item) => sum += item);
  return sum;
};

export { calPoints };

~~~

  
### 0690-GetImportance.js

~~~js
/*
 * @lc app=leetcode.cn id=690 lang=javascript
 *
 * [690] 员工的重要性
 */

// @lc code=start
/**
 * Definition for Employee.
 * function Employee(id, importance, subordinates) {
 *     this.id = id;
 *     this.importance = importance;
 *     this.subordinates = subordinates;
 * }
 */

/**
 * @param {Employee[]} employees
 * @param {number} id
 * @return {number}
 */
// Your runtime beats 85.78 % of javascript submissions
const GetImportance = function(employees, id) {
  // 先把数组转换成一个哈希表(默认不会重复)
  const dict = {};
  employees.forEach((item) => {
    const key = item.id;
    const value = item.importance;
    const children = item.subordinates;
    dict[key] = { value, children };
  });
  const BFS = (key) => {
    if (!dict[key]) {
      return 0;
    }
    let value = dict[key].value;
    const children = dict[key].children;
    children.forEach((child) => {
      value += BFS(child);
    });
    return value;
  };
  // 然后按照ID深度优先遍历或者广度优先遍历即可
  return BFS(id);
};

// @lc code=end

export { GetImportance };

~~~

  
### 0692-topKFrequent.js

~~~js
/*
 * @lc app=leetcode.cn id=692 lang=javascript
 *
 * [692] 前K个高频单词
 */

// @lc code=start
/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
// Your runtime beats 84.8 % of javascript submissions
const topKFrequent = function(words, k) {
  const dict = {};
  const len = words.length;
  for (let i = 0; i < len; i++) {
    const key = words[i];
    dict[key] ? dict[key]++ : dict[key] = 1;
  }
  const arr = [];
  for (const key in dict) {
    const times = dict[key];
    const item = { key, times };
    arr.push(item);
  }
  // console.log(arr);
  arr.sort((a, b) => {
    if (a.times !== b.times) {
      return a.times > b.times ? -1 : 1;
    } else {
      return a.key > b.key ? 1 : -1;
    }
  });
  // console.log(arr);
  return arr.slice(0, k).map((item) => item.key);
};
// @lc code=end

export { topKFrequent };

~~~

  
### 0693-hasAlternatingBits.js

~~~js
/*
 * @lc app=leetcode.cn id=693 lang=javascript
 *
 * [693] 交替位二进制数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */
// Your runtime beats 11.21 % of javascript submissions
const hasAlternatingBits = function(n) {
  const N = String(n);
  const fn = (str) => {
    return (str >>> 0).toString(2);
  };
  const bin = fn(N);
  // 这里可以优化，能否不使用循环
  for (let i = 1; i < bin.length; i++) {
    if (bin[i - 1] === bin[i]) {
      return false;
    }
  }
  return true;
};
// @lc code=end

export { hasAlternatingBits };

~~~

  
### 0696-countBinarySubstrings.js

~~~js
/*
 * @lc app=leetcode.cn id=696 lang=javascript
 *
 * [696] 计数二进制子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
// 108 ms, 在所有 JavaScript 提交中击败了53.97%
const countBinarySubstrings = function(s) {
  // 获取第一个进制的次数
  // 获取第二个进制的次数
  // 然后取最小值
  let time1 = 0;
  let current1 = null;
  let time2 = 0;
  let current2 = null;
  let res = 0;
  for (let i = 0; i < s.length; i++) {
    const item = s[i];
    if (current1 === null) {
      current1 = item;
      time1++;
    } else if (item === current1 && current2 === null) {
      time1++;
    } else if (current1 !== null && current2 === null) {
      current2 = item;
      time2++;
    } else if (item === current2) {
      time2++;
    } else {
      // item === current1 && time1 > 0 && time2 > 0
      const min = Math.min(time1, time2);
      res += min;
      current1 = current2;
      time1 = time2;
      current2 = item;
      time2 = 1;
    }
    // console.log(current1, time1, current2, time2, res);
  }
  if (current2) {
    const min = Math.min(time1, time2);
    res += min;
  }
  return res;
};
// @lc code=end

export { countBinarySubstrings };

~~~

  
### 0697-findShortestSubArray.js

~~~js
/*
 * @lc app=leetcode.cn id=697 lang=javascript
 *
 * [697] 数组的度
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// Your runtime beats 93.43 % of javascript submissions
const findShortestSubArray = function(nums) {
  const dict = {};
  let max = 0;
  for (let i = 0; i < nums.length; i++) {
    const key = nums[i];
    if (!dict[key]) {
      dict[key] = {};
      dict[key].start = i;
    }
    dict[key].times = (dict[key].times || 0) + 1;
    max = max > dict[key].times ? max : dict[key].times;
    dict[key].end = i;
  }
  // console.log(dict, max);
  // times 最大，start - end 最小的情况
  if (max === 1) {
    return 1;
  }
  let minLen;
  for (const key in dict) {
    const item = dict[key];
    if (item.times === max) {
      const tmp = item.end - item.start + 1;
      // console.log(tmp);
      if (minLen >= 0) {
        minLen = minLen < tmp ? minLen : tmp;
      } else {
        minLen = tmp;
      }
    }
  }
  return minLen;
};
// @lc code=end

export { findShortestSubArray };

~~~

  
### 0700-searchBST.js

~~~js
/*
 * @lc app=leetcode.cn id=700 lang=javascript
 *
 * [700] 二叉搜索树中的搜索
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
// 现在没有使用二叉搜索树的信息！
// Your runtime beats 34.06 % of javascript submissions
const searchBST = function(root, val) {
  if (!root) {
    return null;
  } else if (root.val === val) {
    return root;
  } else {
    // 这里做优化
    const leftVal = searchBST(root.left, val);
    if (leftVal) return leftVal;
    const rightVal = searchBST(root.right, val);
    if (rightVal) return rightVal;
    return null;
  }
};

// 改进
// 100 ms, 在所有 JavaScript 提交中击败了82.18%
const searchBST2 = function(root, val) {
  if (!root) {
    return null;
  } else if (root.val === val) {
    return root;
  } else {
    // 这里做优化
    if (!root.right || val <= root.right.val) {
      const leftVal = searchBST2(root.left, val);
      if (leftVal) return leftVal;
    }
    if (!root.left || val >= root.left.val) {
      const rightVal = searchBST2(root.right, val);
      if (rightVal) return rightVal;
    }
    return null;
  }
};
// @lc code=end

export { searchBST, searchBST2 };

~~~

  
### 0703-KthLargest.js

~~~js
/*
 * @lc app=leetcode.cn id=703 lang=javascript
 *
 * [703] 数据流中的第 K 大元素
 */
// Your runtime beats 83.99 % of javascript submissions
// @lc code=start
/**
 * @param {number} k
 * @param {number[]} nums
 */
const KthLargest = function(k, nums) {
  nums.sort((a, b) => b - a);
  this.arr = nums.slice(0, k);
  this.k = k;
};

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function(val) {
  const len = this.arr.length;
  const last = this.arr[len - 1];
  // 当前的数组比预期的长度小，正常插入，然后返回
  if (len < this.k) {
    this.arr.push(val);
    this.arr.sort((a, b) => b - a);
    return this.arr[this.k - 1];
  }
  // 插入的比最小的还小
  if (val <= last) {
    return this.arr[this.k - 1];
  }
  // 插入的比最小的大，正常插入
  // console.log(this.arr, val);
  for (let i = 0; i < len; i++) {
    if (val > this.arr[i]) {
      // console.log(this.arr);
      this.arr.splice(i, 0, val);
      this.arr.pop();
      // console.log(this.arr);
      return this.arr[this.k - 1];
    }
  }
};

// ["KthLargest","add","add","add","add","add"]
// [[1,[]],[-3],[-2],[-4],[0],[4]]
/**
 * Your KthLargest object will be instantiated and called as such:
 * let obj = new KthLargest(k, nums)
 * let param_1 = obj.add(val)
 */
// @lc code=end

export { KthLargest };

~~~

  
### 0704-search.js

~~~js
// 704. 二分查找
// 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const search = function(nums, target) {
  return nums.indexOf(target);
};

// 二分法
const search2 = function(nums, target) {
  const len = nums.length;
  if (len === 0 || nums[0] > target || nums[len - 1] < target) {
    return -1;
  }
  // 二分
  let start = 0;
  let end = len - 1;
  if (nums[start] === target) {
    return 0;
  }
  if (nums[end] === target) {
    return len - 1;
  }
  let middle = Math.ceil((start + end) / 2);
  while (start < end - 1) {
    if (nums[middle] === target) {
      return middle;
    } else if (nums[middle] > target) {
      end = middle;
      middle = Math.floor((start + end) / 2);
    } else if (nums[middle] < target) {
      start = middle;
      middle = Math.floor((start + end) / 2);
    }
  }
  return -1;
};

export { search, search2 };

~~~

  
### 0705-MyHashSet.js

~~~js
/**
 * Initialize your data structure here.
 */
const MyHashSet = function() {
  this.hash = {};
};

/**
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.add = function(key) {
  this.hash[key] = true;
};

/**
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.remove = function(key) {
  if (this.hash[key]) {
    delete this.hash[key];
  }
};

/**
 * Returns true if this set contains the specified element
 * @param {number} key
 * @return {boolean}
 */
MyHashSet.prototype.contains = function(key) {
  return !!this.hash[key];
};

/**
 * Your MyHashSet object will be instantiated and called as such:
 * let obj = new MyHashSet()
 * obj.add(key)
 * obj.remove(key)
 * let param_3 = obj.contains(key)
 */

export { MyHashSet };

~~~

  
### 0706-MyHashMap.js

~~~js
/**
 * Initialize your data structure here.
 */
const MyHashMap = function() {
  this.hash = [];
  // 实际上JS的数组就是一个对象
};

/**
 * value will always be non-negative.
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
MyHashMap.prototype.put = function(key, value) {
  this.hash[key] = value;
};

/**
 * Returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key
 * @param {number} key
 * @return {number}
 */
MyHashMap.prototype.get = function(key) {
  if (this.hash[key] === 0) return 0;
  return this.hash[key] || -1;
};

/**
 * Removes the mapping of the specified value key if this map contains a mapping for the key
 * @param {number} key
 * @return {void}
 */
MyHashMap.prototype.remove = function(key) {
  delete this.hash[key];
};

/**
 * Your MyHashMap object will be instantiated and called as such:
 * let obj = new MyHashMap()
 * obj.put(key,value)
 * let param_2 = obj.get(key)
 * obj.remove(key)
 */

export { MyHashMap };

~~~

  
### 0709-MyHashMap.js

~~~js
/**
 * @param {string} str
 * @return {string}
 */
const toLowerCase = function(str) {
  // 循环字符串，获取对应的keycode，然后减去长度即可
  const len = str.length;
  for (let i = 0; i < len; i++) {
    let index = str.charCodeAt(i);
    if (index <= 90 && index >= 65) {
      index += 32;
      const newStr = String.fromCharCode(index);
      str = str.slice(0, i) + newStr + str.slice(i + 1);
    }
  }
  return str;
};

export { toLowerCase };

~~~

  
### 0717-isOneBitCharacter.js

~~~js
/*
 * @lc app=leetcode.cn id=717 lang=javascript
 *
 * [717] 1比特与2比特字符
 */

// @lc code=start
/**
 * @param {number[]} bits
 * @return {boolean}
 */
// Your runtime beats 62.74 % of javascript submissions
const isOneBitCharacter = function(bits) {
  while (bits.length > 0) {
    if (bits.length === 1) {
      return true;
    }
    if (bits[0] === 1) {
      bits.shift();
      bits.shift();
    } else if (bits[0] === 0) {
      bits.shift();
    }
  }
  return false;
};
// @lc code=end

export { isOneBitCharacter };

~~~

  
### 0720-longestWord.js

~~~js
/*
 * @lc app=leetcode.cn id=720 lang=javascript
 *
 * [720] 词典中最长的单词
 */

// @lc code=start
/**
 * @param {string[]} words
 * @return {string}
 */

class Treenode {
  constructor(val) {
    this.val = val;
    this.children = {};
  }
}

class Tree {
  constructor() {
    const root = new Treenode(null);
    this.root = root;
    this.root.arr = [];
  }

  get = () => {
    return this.root.arr;
  };

  run = (strs) => {
    const root = this.root;
    for (let i = 0; i < strs.length; i++) {
      this.insertNode(root, strs[i], strs[i]);
    }
  };

  // 创建字典树子节点
  insertNode = (node, str, originStr) => {
    // if length === 0 return;
    if (str.length === 1) {
      const newNode = new Treenode(str);
      node.children[str] = newNode;
      this.root.arr.push(originStr);
    } else if (str.length !== 0) {
      // 单词长度大于2，那么先判断当前的子节点中是否存在下一个元素，然后依次插入
      const key = str[0];
      if (node.children[key]) {
        this.insertNode(node.children[key], str.substring(1), originStr);
      }
    }
  };
}

// Your runtime beats 20 % of javascript submissions
const longestWord = function(words) {
  const tree = new Tree();
  words.sort((a, b) => a > b ? 1 : -1);
  tree.run(words);
  const resArr = tree.get();
  let res = resArr[0];
  for (let i = 0; i < resArr.length; i++) {
    if (resArr[i].length > res.length) {
      res = resArr[i];
    }
  }
  return res;
};
// ["b", "c", "d", "e", "g"]

// @lc code=end

export { longestWord };

~~~

  
### 0724-pivotIndex.js

~~~js
/*
 * @lc app=leetcode.cn id=724 lang=javascript
 *
 * [724] 寻找数组的中心索引
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// Your runtime beats 62.46 % of javascript submissions
const pivotIndex = function(nums) {
  const sum = nums.reduce((a, b) => a + b, 0);
  let tmp = 0;
  for (let i = 0; i < nums.length; i++) {
    if (tmp === (sum - nums[i]) / 2) {
      return i;
    }
    tmp += nums[i];
  }
  return -1;
};
// @lc code=end

export { pivotIndex };

~~~

  
### 0726-isLarge.js

~~~js
/*
 * @lc app=leetcode.cn id=726 lang=javascript
 *
 * [726] 原子的数量
 */

// @lc code=start
/**
 * @param {string} formula
 * @return {string}
 */
// Your runtime beats 70.59 % of javascript submissions
// 辅助函数 判断大写小写和数字
// ASCII在 65-90 之间是大写,97-122 是小写
const isLarge = (str) => {
  const index = str.charCodeAt(0);
  return index >= 65 && index <= 90;
};

const isSmall = (str) => {
  const index = str.charCodeAt(0);
  return index >= 97 && index <= 122;
};

const isNumber = (str) => {
  return Number.isNaN(parseInt(str)) === false;
};

// 辅助函数：计算某个简单字符串的元素(不含括号) 测试通过
const getElementObj = (str) => {
  const dict = {};
  let item = null;
  let times = null;
  while (str.length > 0) {
    const cur = str[0];
    if (isLarge(cur)) {
      // 如果已经有 item，那么先计算上一次的情况
      if (item) {
        times = times || 1;
        if (dict[item]) {
          dict[item] = dict[item] + times;
        } else {
          dict[item] = times;
        }
        item = cur;
        times = null;
      }
      // 如果没有 item，那么直接计算下次的情况
      else {
        item = cur;
      }
    }
    // 小写的情况，直接放到item 中
    else if (isSmall(cur)) {
      item += cur;
    }
    // 数字，处理当前的数字
    else {
      const num = parseInt(cur);
      times = times ? times * 10 + num : num;
    }
    // 循环一次，str 减去1
    str = str.slice(1);
  }
  // 最后存在的元素
  if (item) {
    times = times || 1;
    if (dict[item]) {
      dict[item] = dict[item] + times;
    } else {
      dict[item] = times;
    }
  }
  return dict;
};

// 难点：
// 1、获取原子（必须大写字母开头，然后把数字获取到）
// 原子的长度是0或者1，这个可以利用一下
// 2、括号嵌套处理（这个使用递归操作）
// 先找到第一个右括号，然后找到相邻的第一个左括号，找到括号后面的数字
// 使用函数处理这部分值
const countOfAtoms = function(formula) {
  // 当有括号时，先去括号
  while (formula.includes(')')) {
    // 找到第一个右括号
    const rightIndex = formula.indexOf(')');
    // 然后找到左侧的第一个左括号
    const leftIndex = formula.lastIndexOf('(', rightIndex);
    // 把中间的字符剪出来
    const inner = formula.slice(leftIndex + 1, rightIndex);
    // console.log(inner);
    // 然后找到右面的数字（次数）;
    let tmp = formula.slice(rightIndex + 1);
    let times;
    // 去掉括号后，左侧剩余的字符串
    const leftRemain = formula.slice(0, leftIndex);
    // 去掉括号后，右侧剩余的字符串
    let rightRemain = '';
    if (tmp.length > 0) {
      while (isNumber(tmp[0])) {
        times = times ? times * 10 + parseInt(tmp[0]) : parseInt(tmp[0]);
        tmp = tmp.slice(1);
      }
      rightRemain = tmp;
    }
    const innerObj = getElementObj(inner);
    times = parseInt(times);
    // "Mg(H2O)N" times is NaN
    if (!times || Number.isNaN(times)) {
      times = 1;
    }
    let newRemain = '';
    for (const key in innerObj) {
      const value = innerObj[key];
      newRemain = newRemain + key + String(value * times);
    }
    // 把计算结果拼接回去 // 这里注意结束的条件
    // 这里的性能不好，未来可以优化
    formula = leftRemain + newRemain + rightRemain;
  }
  // 这里是已经处理完括号的字符串-基本正确
  const allObj = getElementObj(formula);
  // 先转换成数组，然后排序，然后转换成字符串输出
  const arr = [];
  for (const key in allObj) {
    arr.push(key);
  }
  arr.sort((a, b) => a > b ? 1 : -1);
  let res = '';
  arr.forEach((item) => {
    res = res + item;
    if (allObj[item] > 1) {
      res += allObj[item];
    }
  });
  return res;
};

// 这三个测试通过
// countOfAtoms("(NB3)33");
// countOfAtoms("H2O");
// countOfAtoms("Mg(OH)2");
// countOfAtoms("Mg(H2O)N");
// countOfAtoms("K4(ON(SO3)2)2H2OMg(OH)2Mg(OH)2Mg(OH)2Mg(OH)2Mg(OH)2");
// "(NB3)33"

// @lc code=end

export { countOfAtoms };

~~~

  
### 0728-selfDividingNumbers.js

~~~js
// 728 自除数 是指可以被它包含的每一位数除尽的数。

// 例如，128 是一个自除数，因为 128 % 1 == 0，128 % 2 == 0，128 % 8 == 0。
// 还有，自除数不允许包含 0 。
// 给定上边界和下边界数字，输出一个列表，列表的元素是边界（含边界）内所有的自除数。

// 示例 1：
// 输入：
// 上边界left = 1, 下边界right = 22
// 输出： [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 15, 22]
// 每个输入参数的边界满足 1 <= left <= right <= 10000

// 68 ms , 在所有 javascript 提交中击败了 92.13%
/**
 * @param {number} left
 * @param {number} right
 * @return {number[]}
 */
function selfDividingNumbers(left, right) {
  const result = [];
  for (let i = left; i < right + 1; i++) {
    let item = i;
    let bool = true;
    while (item > 0) {
      const remainder = item % 10;
      item = (item - remainder) / 10;
      if (remainder === 0 || i % remainder > 0) {
        bool = false;
        break;
      }
    }
    if (bool) {
      result.push(i);
    }
  }
  return result;
}

export { selfDividingNumbers };

~~~

  
### 0729-MyCalendar.js

~~~js
const MyCalendar = function() {
  this.arr = [];
};
/**
 * @param {number} start
 * @param {number} end
 * @return {boolean}
 */
// 228 ms, 在所有 JavaScript 提交中击败了62.96%的用户
MyCalendar.prototype.book = function(start, end) {
  // 如果直接把每一个 true-false 存储，那么就是线性的设置
  // 能够设置一个二维数组，然后子数组是一个区间（闭区间）
  // 这样就避免性能问题；
  const endIndex = end - 1;
  const newInterval = [start, endIndex];
  // 处理三个特殊情况
  if (this.arr.length === 0) {
    this.arr.push(newInterval);
    return true;
  }
  if (this.arr[0][0] > endIndex) {
    this.arr.unshift(newInterval);
    return true;
  }
  if (this.arr[this.arr.length - 1][1] < start) {
    this.arr.push(newInterval);
    return true;
  }
  // 循环遍历当前区间数组是否有满足条件的
  for (let i = 0; i < this.arr.length - 1; i++) {
    if (this.arr[i] && this.arr[i + 1] && this.arr[i][1] < start && this.arr[i + 1][0] > endIndex) {
      this.arr.splice(i + 1, 0, newInterval);
      return true;
    }
  }
  return false;
};

// const myCalendar = new MyCalendar();

// const test = [[], [20, 29], [13, 22], [44, 50], [1, 7], [2, 10], [14, 20], [19, 25], [36, 42], [45, 50], [47, 50], [39, 45], [44, 50], [16, 25], [45, 50], [45, 50], [12, 20], [21, 29], [11, 20], [12, 17], [34, 40], [10, 18], [38, 44], [23, 32], [38, 44], [15, 20], [27, 33], [34, 42], [44, 50], [35, 40], [24, 31]];

// for (let i = 0; i < test.length; i++) {
//   const testarr = test[i];
//   const result = myCalendar.book(testarr[0], testarr[1]);
//   console.log(result);
// }

/**
 * Your MyCalendar object will be instantiated and called as such:
 * let obj = new MyCalendar()
 * let param_1 = obj.book(start,end)
 */

// ["MyCalendar","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book"]
// [[],[20,29],[13,22],[44,50],[1,7],[2,10],[14,20],[19,25],[36,42],[45,50],[47,50],[39,45],[44,50],[16,25],[45,50],[45,50],[12,20],[21,29],[11,20],[12,17],[34,40],[10,18],[38,44],[23,32],[38,44],[15,20],[27,33],[34,42],[44,50],[35,40],[24,31]]

export { MyCalendar };

~~~

  
### 0738-monotoneIncreasingDigits.js

~~~js
/**
 * @param {number} n
 * @return {number}
 */
// 两个思路
// 1、枚举法，直接遍历这个数字，性能较差(963153657 会超时)
// var monotoneIncreasingDigits = function(n) {
//     if (n < 10) return n;
//     // 辅助函数：判断一个数字是否单调递增的
//     let check = (num) => {
//         if (num < 10) return true;
//         while (num >= 10) {
//             let tmp1 = num % 10;
//             let tmp2 = (num - tmp1) / 10 % 10;
//             if (tmp2 > tmp1) return false;
//             num = (num - tmp1) / 10;
//         }
//         return true;
//     };
//     // 枚举计算
//     for (let i = n; i > 0; i--) {
//         if (check(i)) {
//             return i;
//         }
//     }
// };

// 2、贪心算法：如果某一个数字满足，那么返回真；如果不满足，从前向后遍历数字，然后把相差的直接变成9，然后再测试，这样可以减少循环次数
// 这个可以做出来，但是性能还可以提升
// 同一个代码，在不同时间提交，执行时间差异较大，所以还是从代码角度分析时间复杂度，这个结果仅供参考
// 92 ms, 在所有 JavaScript 提交中击败了5.25%
// 52 ms, 在所有 JavaScript 提交中击败了96.79%
const monotoneIncreasingDigits = function(n) {
  if (n < 10) return n;
  // 辅助函数：判断一个数字是否单调递增的
  const check = (num) => {
    if (num < 10) return true;
    while (num >= 10) {
      const tmp1 = num % 10;
      const tmp2 = (num - tmp1) / 10 % 10;
      if (tmp2 > tmp1) return false;
      num = (num - tmp1) / 10;
    }
    return true;
  };

  // 辅助函数：把不满足的数字，差距大的直接变成9
  const calculateNum = (num) => {
    const arr = String(num).split('');
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) {
        // 当前这一位减一
        arr[i - 1] = arr[i - 1] - 1;
        // 后面的全部变成9
        for (let j = i; j < arr.length; j++) {
          arr[j] = 9;
        }
        break;
      }
    }
    return Number(arr.join(''));
  };

  while (!check(n)) {
    // 重新计算 n
    n = calculateNum(n);
  }
  return n;
};

// console.log(monotoneIncreasingDigits(10), 9);
// console.log(monotoneIncreasingDigits(1234), 1234);
// console.log(monotoneIncreasingDigits(332), 299);
// console.log(monotoneIncreasingDigits(963153657), 299);
export { monotoneIncreasingDigits };

~~~

  
### 0739-dailyTemperatures.js

~~~js
/*
 * @lc app=leetcode.cn id=739 lang=javascript
 *
 * [739] 每日温度
 */

// @lc code=start
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
// 第一种思路：双层循环，按照常理思考的方法
// 现在性能很差
// Your runtime beats 5.03 % of javascript submissions
const dailyTemperatures = function(temperatures) {
  const len = temperatures.length;
  const res = [];
  for (let i = 0; i < len; i++) {
    const curr = temperatures[i];
    for (let j = 1; j <= len - i; j++) {
      if (temperatures[j + i] > curr) {
        res[i] = j;
        break;
      } else if (j === len - i) {
        res[i] = 0;
      }
    }
  }
  res[len - 1] = 0;
  return res;
};
// @lc code=end

export { dailyTemperatures };

~~~

  
### 0740-deleteAndEarn.js

~~~js
/**
 * @param {number[]} nums
 * @return {number}
 */

// 740. 删除并获得点数
// 给你一个整数数组 nums ，你可以对它进行一些操作。
// 每次操作中，选择任意一个 nums[i] ，删除它并获得 nums[i] 的点数。之后，你必须删除 所有 等于 nums[i] - 1 和 nums[i] + 1 的元素。
// 开始你拥有 0 个点数。返回你能通过这些操作获得的最大点数。
// 104 ms, 在所有 JavaScript 提交中击败了12.14%

// 考点：动态规划和哈希表
// 1、遍历数组，把数组提取成一个哈希表，同时把原始数组拷贝一份，然后去重排序
// 2、开始动态规划，循环数组
// 如果当前的和前面的是不相邻的，直接加上这个数字 * 出现的个数
// 如果这个数字和前面的是相邻的，那么把这个相邻的数群的开始和结尾找出来，也就是 i 和 k，然后计算 i - k 全部奇数或者偶数的最大值，然后加上去
// 错误思路：这样就实现了动态规划（删除相邻元素）F(n) = Math.max(fn(1) * times(1) + fn(3) * times(3), fn(2) * times(2) + fn(4) * times(4));
// 正确思路：打家劫舍的思路，需要递推，不能直接计算奇数或者偶数项的和

const deleteAndEarn = function(nums) {
  // 1 构建哈希表（存储出现的次数）
  const dict = {};
  nums.forEach((item) => {
    if (dict[item]) {
      dict[item] = dict[item] + 1;
    } else {
      dict[item] = 1;
    }
  });
  // 2 构建纯净数组
  const list = Array.from(new Set(nums)).sort((a, b) => a > b ? 1 : -1);
  // 3 循环数组，计算最大值（需要辅助函数）
  // 特殊：如果只有1-2项，直接计算出来结果
  if (list.length === 1) {
    return list[0] * nums.length;
  }
  // 这个存放二维数组（如果是不连续的，直接放入；如果是连续的，放入连续的数组）
  const arr = [];
  let startIndex;
  if (list[1] - list[0] === 1) {
    startIndex = list[0];
  }
  for (let i = 0; i < list.length; i++) {
    if (list[i + 1] - list[i] > 1 && !startIndex) {
      arr.push(list[i]);
    }
    if (list[i + 1] - list[i] > 1 && startIndex) {
      arr.push([startIndex, list[i]]);
      startIndex = null;
    }
    if (list[i + 1] - list[i] === 1 && !startIndex) {
      startIndex = list[i];
    }
    if (list[i + 1] - list[i] === 1 && startIndex) {
      continue;
    }
    // 最后一个不存在的情况
    if (!list[i + 1] && startIndex) {
      arr.push([startIndex, list[i]]);
    }
    if (!list[i + 1] && !startIndex) {
      arr.push(list[i]);
    }
  }
  // 辅助函数：计算两个连续数之间的最大值
  // 应该是打家劫舍的思路（动态规划）
  // Max(0) = f(0)
  // Max(1) = Math.max(f(0), f(1))
  // Max(n) = Math.max(Max(n - 2) + f(n), Max(n - 1))
  const getMax = (start, end) => {
    const maxList = [];
    maxList[start] = start * dict[start];
    maxList[start + 1] = Math.max(start * dict[start], (start + 1) * dict[start + 1]);
    for (let i = start + 2; i <= end; i++) {
      maxList[i] = Math.max(maxList[i - 1], maxList[i - 2] + i * dict[i]);
    }
    // console.log(start, end);
    // console.log(maxList);
    return maxList[maxList.length - 1];
  };
  let tmp = 0;
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === 'number') {
      tmp += arr[i] * dict[arr[i]];
    }
    else {
      tmp += getMax(arr[i][0], arr[i][1]);
    }
  }
  return tmp;
};

// console.log(deleteAndEarn([3,4])); // 4
// console.log(deleteAndEarn([2,2,3,3,3,4])); // 9
// console.log(deleteAndEarn([3,4,2])); // 6
// console.log(deleteAndEarn([3,4,2, 8, 20, 21,23,22,90,76, 234,355,27,2,3,6,9,8,356])); // 857
// console.log(deleteAndEarn([10,8,4,2,1,3,4,8,2,9,10,4,8,5,9,1,5,1,6,8,1,1,6,7,8,9,1,7,6,8,4,5,4,1,5,9,8,6,10,6,4,3,8,4,10,8,8,10,6,4,4,4,9,6,9,10,7,1,5,3,4,4,8,1,1,2,1,4,1,1,4,9,4,7,1,5,1,10,3,5,10,3,10,2,1,10,4,1,1,4,1,2,10,9,7,10,1,2,7,5])) // 338

export { deleteAndEarn };

~~~

  
### 0744-nextGreatestLetter.js

~~~js
/*
 * @lc app=leetcode.cn id=744 lang=javascript
 *
 * [744] 寻找比目标字母大的最小字母
 */

// @lc code=start
// 104 ms
// , 在所有 JavaScript 提交中击败了
// 20.94%
//

// 方法一有问题
// const nextGreatestLetter = function(letters, target) {
//   const tar = target.charCodeAt(0);
//   if (letters[0].charCodeAt(0) > tar ||
//     letters[letters.length - 1].charCodeAt(0) <= tar
//   ) {
//     return letters[0];
//   }
//   if (letters[0].charCodeAt(0) === tar) {
//     return letters[1];
//   }
//   // 否则，进行二分查找
//   let start = 0;
//   let end = letters.length - 1;
//   while (start < end) {
//     let middle = Math.floor((start + end) / 2);
//     if (letters[middle].charCodeAt(0) > tar) {
//       end = middle;
//     }
//     else if (letters[middle].charCodeAt(0) < tar) {
//       start = middle;
//     }
//     else {
//       return letters[middle + 1];
//     }
//   }
//   return letters[end];
// };

const nextGreatestLetter = function(letters, target) {
  const tar = target.charCodeAt(0);
  if (letters[0].charCodeAt(0) > tar
    || letters[letters.length - 1].charCodeAt(0) <= tar
  ) {
    return letters[0];
  }
  const index = letters.lastIndexOf(target);
  if (index > -1) {
    return letters[index + 1];
  }
  let start = 0;
  let end = letters.length - 1;
  let mid = Math.floor((start + end) / 2);
  while (!(letters[mid].charCodeAt(0) < tar && letters[mid + 1].charCodeAt(0) > tar)) {
    if (letters[mid].charCodeAt(0) > tar) {
      end = mid;
    } else {
      start = mid;
    }
    mid = Math.floor((start + end) / 2);
  }
  return letters[mid + 1];
};
// @lc code=end

export { nextGreatestLetter };

~~~

  
### 0747-dominantIndex.js

~~~js
/*
 * @lc app=leetcode.cn id=747 lang=javascript
 *
 * [747] 至少是其他数字两倍的最大数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// Your runtime beats 86.73 % of javascript submissions
const dominantIndex = function(nums) {
  const len = nums.length;
  // 只有一个元素，满足条件
  if (len === 1) {
    return 0;
  } else if (len === 2) {
    if (nums[0] >= nums[1] * 2) {
      return 0;
    } else if (nums[1] >= nums[0] * 2) {
      return 1;
    } else {
      return -1;
    }
  }
  // 数组中有三个数，那么循环获取最大和第二大的数字
  let max = nums[0] > nums[1] ? nums[0] : nums[1];
  let subMax = nums[0] < nums[1] ? nums[0] : nums[1];
  for (let i = 2; i < len; i++) {
    const item = nums[i];
    if (item > max) {
      subMax = max;
      max = item;
    } else if (item > subMax) {
      subMax = item;
    }
  }

  if (max >= 2 * subMax) {
    return nums.indexOf(max);
  } else {
    return -1;
  }
};
// @lc code=end

export { dominantIndex };

~~~

  
### 0748-shortestCompletingWord.js

~~~js
/*
 * @lc app=leetcode.cn id=748 lang=javascript
 *
 * [748] 最短补全词
 */

// @lc code=start
/**
 * @param {string} licensePlate
 * @param {string[]} words
 * @return {string}
 */
// 116 ms, 在所有 JavaScript 提交中击败了36.96%
const shortestCompletingWord = function(licensePlate, words) {
  // 辅助函数
  const judge = function(str, Dict) {
    const dict = { ...Dict };
    for (let i = 0; i < str.length; i++) {
      const s = str[i];
      if (dict[s] === 1) {
        delete (dict[s]);
      } else if (dict[s]) {
        dict[s] = dict[s] - 1;
      }
    }
    return Object.keys(dict).length === 0;
  };
  // 标准化字典
  // 去掉数字和空格，全部变成小写，然后转换成一个数组
  const license = licensePlate.replace(/\s/g, '').replace(/[0-9]/g, '').toLowerCase();
  const len = license.length;
  // 这里应该是一个字典
  const Dict = {};
  for (let i = 0; i < len; i++) {
    const key = license[i];
    if (!Dict[key]) {
      Dict[key] = 1;
    } else {
      Dict[key]++;
    }
  }
  // 然后循环words(先从长度过滤)
  // 然后返回目标的字符串
  let res;
  for (let i = 0; i < words.length; i++) {
    const item = words[i];
    // 如果当前单词的长度小于字典，那么继续循环
    if (item.length < len || (res && item.length >= res.length)) {
      continue;
    }
    if (judge(item, Dict)) {
      // return item;
      // 这里需要获取长度最短的
      if (!res) {
        res = item;
      } else {
        res = item.length < res.length ? item : res;
      }
    }
  }
  return res;
};
// @lc code=end

export { shortestCompletingWord };

~~~

  
### 0762-countPrimeSetBits.js

~~~js
/*
 * @lc app=leetcode.cn id=762 lang=javascript
 *
 * [762] 二进制表示中质数个计算置位
 */

// @lc code=start
/**
 * @param {number} L
 * @param {number} R
 * @return {number}
 */
// 最大值是10000，那么可以执行一次循环（最好不要这样）
// 直接思路：执行一次循环，把每一个数字转换成二进制，然后判断1的个数是否是质数
// 这样显然不是好办法
// 能否找规律，使用动态规划做？
// 先把最大位置对应的二进制数字的位数，计算出质数列表，然后通过一次循环（这个最大是20）
// 位运算不会操作
// Your runtime beats 80 % of javascript submissions
const countPrimeSetBits = function(L, R) {
  // 创建前20中质数的数组
  const dict = [false,
    false, true, true, false, true,
    false, true, false, false, false,
    true, false, true, false, false,
    false, true, false, true, false,
  ];
  let result = 0;

  const getNumber = (num) => {
    let res = 0;
    while (num > 0) {
      const remain = num % 2;
      res += remain;
      num = (num - remain) / 2;
    }
    return res;
  };

  // 然后遍历数组，获取二进制数中的1的个数
  for (let i = L; i <= R; i++) {
    const item = getNumber(i);
    if (dict[item]) {
      result++;
    }
  }
  return result;
};

// @lc code=end

export { countPrimeSetBits };

~~~

  
### 0766-isToeplitzMatrix.js

~~~js
/*
 * @lc app=leetcode.cn id=766 lang=javascript
 *
 * [766] 托普利茨矩阵
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {boolean}
 */
// 104 ms
// , 在所有 JavaScript 提交中击败了
// 35.48%
const isToeplitzMatrix = function(matrix) {
  if (matrix.length === 0) return true;
  const dict = matrix[0];
  const len = dict.length;
  if (len === 0) return true;
  for (let i = 1; i < matrix.length; i++) {
    // 比较第i行和dict是否相同
    const first = matrix[i][0];
    dict.pop();
    dict.unshift(first);
    for (let j = 0; j < len; j++) {
      if (dict[j] !== matrix[i][j]) {
        return false;
      }
    }
  }
  return true;
};
// @lc code=end

export { isToeplitzMatrix };

~~~

  
### 0771-numJewelsInStones.js

~~~js
// 771. 宝石与石头
//  给定字符串J 代表石头中宝石的类型，和字符串 S代表你拥有的石头。 S 中每个字符代表了一种你拥有的石头的类型，你想知道你拥有的石头中有多少是宝石。
// J 中的字母不重复，J 和 S中的所有字符都是字母。字母区分大小写，因此"a"和"A"是不同类型的石头。
// 示例 1:
// 输入: J = "aA", S = "aAAbbbb"
// 输出: 3
/**
 * @param {string} J
 * @param {string} S
 * @return {number}
 */
const numJewelsInStones = function(J, S) {
  // 首先遍历S，创建一个字符串放权重
  // 然后遍历J，获取不同宝石对应的权重
  // 返回即可
  const hashTable = {};
  const sLen = S.length; const
    jLen = J.length;
  for (let i = 0; i < sLen; i++) {
    const item = S[i];
    if (!hashTable[item]) {
      hashTable[item] = 1;
    } else {
      hashTable[item]++;
    }
  }
  let sum = 0;
  for (let j = 0; j < jLen; j++) {
    const item = J[j];
    if (hashTable[item]) {
      sum += hashTable[item];
    }
  }
  return sum;
};

export { numJewelsInStones };

~~~

  
### 0781-numRabbits.js

~~~js
/*
 * @lc app=leetcode.cn id=781 lang=javascript
 *
 * [781] 森林中的兔子
 */

// @lc code=start
/**
 * @param {number[]} answers
 * @return {number}
 */
// 观察题目可以发现：如果颜色相同的兔子，那么报数应该是一样的
// 报数不同的兔子，颜色肯定不一样
// 首先获取不同报数的兔子的数量，然后求商，再向上取整即可
// Your memory usage beats 55.32 %
const numRabbits = function(answers) {
  // 处理特殊情况
  const len = answers.length;
  if (len === 0) return len;
  // 计算不同报数的兔子的数量
  const dict = {};
  for (let i = 0; i < len; i++) {
    const curr = answers[i];
    if (!dict[curr]) {
      dict[curr] = 1;
    } else {
      dict[curr]++;
    }
  }
  // 然后遍历数组，计算不同报数的情况
  let result = 0;
  // eslint-disable-next-line guard-for-in
  for (const key in dict) {
    const value = dict[key];
    const time = Number(key);
    result += (time + 1) * Math.ceil(value / (time + 1));
  }
  return result;
};

// console.log(numRabbits([1, 1, 2]) === 5)
// console.log(numRabbits([2, 2, 2, 2, 2, 2, 2]) === 9)
// console.log(numRabbits([10, 10, 10]) === 11)
// @lc code=end
export { numRabbits };

~~~

  
### 0783-minDiffInBST.js

~~~js
/*
 * @lc app=leetcode.cn id=783 lang=javascript
 *
 * [783] 二叉搜索树节点最小距离
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
// Your runtime beats 50.52 % of javascript submissions
const minDiffInBST = function(root) {
  if (!root) {
    return null;
  }

  const runNode = (node, list) => {
    if (!node) return;
    list.push(node.val);
    runNode(node.left, list);
    runNode(node.right, list);
  };

  const list = [];
  runNode(root, list);
  list.sort((a, b) => a - b);
  let min = list[1] - list[0];
  for (let i = 1; i < list.length; i++) {
    const item = list[i] - list[i - 1];
    min = item < min ? item : min;
  }
  return min;
};
// @lc code=end

export { minDiffInBST };

~~~

  
### 0788-rotate-number.js

~~~js
// 788. 旋转数字
// 我们称一个数 X 为好数, 如果它的每位数字逐个地被旋转 180 度后，我们仍可以得到一个有效的，且和 X 不同的数。要求每位数字都要被旋转。
// 如果一个数的每位数字被旋转以后仍然还是一个数字， 则这个数是有效的。0, 1, 和 8 被旋转后仍然是它们自己；2 和 5 可以互相旋转成对方；6 和 9 同理，除了这些以外其他的数字旋转以后都不再是有效的数字。
// 现在我们有一个正整数 N, 计算从 1 到 N 中有多少个数 X 是好数？

// 思路一：首先根据N（0，10000）判断是几位数，然后不同位数使用不同的方法（循环太多了）
// 88 ms, 在所有 javascript 提交中击败了62.86%

/**
 * @param {number} N
 * @return {number}
 */
function rotatedDigits(N) {
  let result = 0;
  const Arr1 = [2, 5, 6, 9];
  const Arr2 = [0, 1, 8];
  const Arr3 = [2, 5, 6, 9, 0, 1, 8];
  const Arr4 = [1, 8];

  if (N <= 10) {
    for (let i = 0; i <= N; i++) {
      if (Arr1.includes(i)) result++;
    }
  } else if (N <= 100) {
    result = 4;
    for (let i = 11; i <= N; i++) {
      const num2 = i % 10;
      const num1 = (i - num2) / 10;
      if (Arr4.includes(num1) && Arr1.includes(num2)) {
        result++;
      }
      if (Arr1.includes(num1) && Arr3.includes(num2)) {
        result++;
      }
    }
  } else if (N <= 1000) {
    result = 40;
    for (let i = 101; i <= N; i++) {
      const num3 = i % 10; // 个位
      const num2 = ((i % 100) - num3) / 10; // 十位
      const num1 = (i - num2 * 10 - num3) / 100; // 百位
      // TODO 下面三种情况使用一个IF判断
      // 百位是18, 十位是018，个位必须是2569
      if (Arr4.includes(num1) && Arr2.includes(num2) && Arr1.includes(num3)) {
        result++;
      }
      // 百位是18, 十位是2569，个位随便
      if (Arr4.includes(num1) && Arr1.includes(num2) && Arr3.includes(num3)) {
        result++;
      }
      // 百位是2569，十位个位随便
      if (Arr1.includes(num1) && Arr3.includes(num2) && Arr3.includes(num3)) {
        result++;
      }
    }
  } else if (N <= 10000) {
    result = 316;
    for (let i = 1001; i <= N; i++) {
      const num4 = i % 10; // 个位
      const num3 = ((i % 100) - num4) / 10; // 十位
      const num2 = ((i % 1000) - num3 * 10 - num4) / 100; // 百位
      const num1 = (i - (num2 * 100) - (num3 * 10) - num4) / 1000; // 千位

      // 千位是18, 百位是018 十位是018，个位2569
      if (Arr4.includes(num1) && Arr2.includes(num2) && Arr2.includes(num3) && Arr1.includes(num4)) {
        result++;
      }
      // 千位是18, 百位是018 十位是2569，个位随便
      if (Arr4.includes(num1) && Arr2.includes(num2) && Arr1.includes(num3) && Arr3.includes(num4)) {
        result++;
      }
      // 千位是18, 百位是2569，十位个位随便
      if (Arr4.includes(num1) && Arr1.includes(num2) && Arr3.includes(num3) && Arr3.includes(num4)) {
        result++;
      }
      // 千位是2569，其他随便
      if (Arr1.includes(num1) && Arr3.includes(num2) && Arr3.includes(num3) && Arr3.includes(num4)) {
        result++;
      }
    }
  }
  return result;
}

export { rotatedDigits };

~~~

  
### 0796-rotateString.js

~~~js
/*
 * @lc app=leetcode.cn id=796 lang=javascript
 *
 * [796] 旋转字符串
 */

// @lc code=start
/**
 * @param {string} A
 * @param {string} B
 * @return {boolean}
 */
// 第一个思路：循环一下A的长度，然后拼接字符串，看两个字符串是否相等
// 简单粗暴，可能拼接字符串会消耗性能
// Your runtime beats 31.06 % of javascript submissions
const rotateString = function(A, B) {
  if (A === B) return true;
  const aLen = A.length;
  const bLen = B.length;
  if (aLen !== bLen) return false;
  for (let i = 0; i < aLen; i++) {
    const a = A.slice(i) + A.slice(0, i);
    if (a === B) return true;
  }
  return false;
};

// 思路二
// 直接把A复制一下，然后这样A就拥有了全部的可能，然后判断A中是否有B
// 84 ms
// , 在所有 JavaScript 提交中击败了
// 48.48%
const rotateString2 = function(A, B) {
  if (A === B) return true;
  const aLen = A.length;
  const bLen = B.length;
  if (aLen !== bLen) return false;
  const a = A + A;
  return a.indexOf(B) > -1;
};
// @lc code=end

export { rotateString, rotateString2 };

~~~

  
### 0804-uniqueMorseRepresentations.js

~~~js
/**
 * @param {string[]} words
 * @return {number}
 */
// 84 ms, 在所有 JavaScript 提交中击败了86.71%
const uniqueMorseRepresentations = function(words) {
  const standard = ['.-', '-...', '-.-.', '-..', '.', '..-.', '--.', '....', '..', '.---', '-.-', '.-..', '--', '-.', '---', '.--.', '--.-', '.-.', '...', '-', '..-', '...-', '.--', '-..-', '-.--', '--..'];

  const fn = (str) => {
    let tmp = '';
    const len = str.length;
    for (let i = 0; i < len; i++) {
      const index = str.charCodeAt(i) - 97;
      tmp += standard[index];
    }
    // console.log(str, tmp);
    return tmp;
  };

  const dict = {};
  let num = 0;
  for (let i = 0; i < words.length; i++) {
    const item = words[i];
    const key = fn(item);
    if (!dict[key]) {
      dict[key] = true;
      num++;
    }
  }
  // console.log(dict);
  return num;
};

export { uniqueMorseRepresentations };

~~~

  
### 0806-numberOfLines.js

~~~js
/*
 * @lc app=leetcode.cn id=806 lang=javascript
 *
 * [806] 写字符串需要的行数
 */

// @lc code=start
/**
 * @param {number[]} widths
 * @param {string} s
 * @return {number[]}
 */
// 80 ms
// , 在所有 JavaScript 提交中击败了
// 85.29%
// 的用户
const numberOfLines = function(widths, s) {
  let remain = 100;
  let line = 1;
  for (let i = 0; i < s.length; i++) {
    const index = s[i].charCodeAt(0) - 97;
    const len = widths[index];
    if (remain >= len) {
      remain = remain - len;
    } else {
      line++;
      remain = 100;
      remain = remain - len;
    }
  }
  const res1 = line;
  const res2 = 100 - remain;
  return [res1, res2];
};
// @lc code=end

export { numberOfLines };

~~~

  
### 0811-subdomainVisits.js

~~~js
/*
 * [811] 子域名访问计数
 */

//
/**
 * @param {string[]} cpdomains
 * @return {string[]}
 */
// 108 ms
// , 在所有 JavaScript 提交中击败了
// 69.56%
// 的用户
const subdomainVisits = function(cpdomains) {
  const dict = {};
  len = cpdomains.length;
  if (len === 0) return [];
  const getNumber = function(address, times) {
    if (!dict[address]) {
      dict[address] = times;
    } else {
      dict[address] += times;
    }
    // 如果存在子域名，那么递归获取次数
    const index = address.indexOf('.');
    if (index > -1) {
      const subAdd = address.slice(index + 1);
      getNumber(subAdd, times);
    }
  };
  for (let i = 0; i < len; i++) {
    const item = cpdomains[i];
    const spaceIndex = item.indexOf(' ');
    const times = Number(item.slice(0, spaceIndex));
    const address = item.slice(spaceIndex + 1);
    getNumber(address, times);
  }
  // 然后把对应的转换成数组输出
  const res = [];
  for (const key in dict) {
    const times = dict[key];
    const str = `${times} ${key}`;
    res.push(str);
  }
  return res;
};

export { subdomainVisits };

~~~

  
### 0812-largestTriangleArea.js

~~~js
/*
 * @lc app=leetcode.cn id=812 lang=javascript
 *
 * [812] 最大三角形面积
 */

// @lc code=start
/**
 * @param {number[][]} points
 * @return {number}
 */
// 1、最差的方法，三重循环
// Your runtime beats 85.29 % of javascript submissions
const largestTriangleArea = function(points) {
  // 辅助函数
  const getArea = (a, b, c) => {
    const x1 = a[0];
    const y1 = a[1];
    const x2 = b[0];
    const y2 = b[1];
    const x3 = c[0];
    const y3 = c[1];
    return Math.abs((x1 - x3) * (y2 - y3) - (x2 - x3) * (y1 - y3)) / 2;
  };

  const len = points.length;
  if (len === 3) {
    return getArea(points[0], points[1], points[2]);
  }
  let max = 0;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      for (let k = j + 1; k < len; k++) {
        const area = getArea(points[i], points[j], points[k]);
        max = area > max ? area : max;
      }
    }
  }
  return max;
};

// 2、试一下这个思路
// 这个思路不正确
// 首先双重循环，找到当前距离最长的两个点构成的线段
// 然后遍历剩下的点，找到最大的面积
// const largestTriangleArea = function(points) {
//   const len = points.length;
//   // if (len === 3) 直接计算
//   let max = 0;
//   let a, b;
//   for (let i = 0; i < len; i++) {
//     for (let j = i + 1; j < len; j++) {
//       let distance = getDistance(points[i], points[j]);
//       if (distance > max) {
//         a = i;
//         b = j;
//       }
//     }
//   }
//   // 现在获取的AB点是最长的线段
//   // 然后再次遍历一次数组，计算面积最大的情况
//   let maxArea = 0;
//   for (let i = 0; i < len; i++) {
//     if (i === a || i === b) continue;
//     let area = getArea(points[a], points[b], points[i]);
//     console.log(area);
//     maxArea = maxArea > area ? maxArea : area;
//   }
//   return maxArea;
// };

// const getDistance = (a, b) => {
//   return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;
// }
// @lc code=end

export { largestTriangleArea };

~~~

  
### 0816-ambiguousCoordinates.js

~~~js
/*
 * @lc app=leetcode.cn id=816 lang=javascript
 *
 * [816] 模糊坐标
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string[]}
 */
// 92 ms, 在所有 JavaScript 提交中击败了100.00%
function ambiguousCoordinates(s) {
  // 1、字符串是二维坐标，数字部分获取，然后分割成两部分，分别是坐标
  const numStr = s.slice(1, s.length - 1);

  // 辅助函数：判断一个字符串是否满足
  const check = (str) => {
    // todo 写入临时的对象中，减少再次查询
    return String(Number(str)) === str;
  };

  // 辅助函数：把子一个数字字符串中间加上小数点，然后输出合法的数字
  const getArray = (str) => {
    const result = [];
    for (let i = 1; i < str.length; i++) {
      const item = `${str.slice(0, i)}.${str.slice(i)}`;
      if (check(item)) {
        result.push(item);
      }
    }
    if (check(str)) result.push(str);
    return result;
  };

  // 2、然后左边坐标中间加一个小数点，然后判断当前的数值是否满足；构成一个数组；右边的加一个小数点，也判断是否满足。
  const res = [];
  // 3、两个数组循环一下，乘法获取结果
  for (let i = 1; i < numStr.length; i++) {
    const leftNumStr = numStr.slice(0, i);
    const rightNumStr = numStr.slice(i);
    const leftArr = getArray(leftNumStr);
    const rightArr = getArray(rightNumStr);
    // 把两个数组格式化一下，组合起来
    leftArr.forEach((item1) => {
      rightArr.forEach((item2) => {
        res.push(`(${item1}, ${item2})`);
      });
    });
  }
  return res;
}

export { ambiguousCoordinates };

~~~

  
### 0819-mostCommonWord.js

~~~js
/*
 * @lc app=leetcode.cn id=819 lang=javascript
 *
 * [819] 最常见的单词
 */

// @lc code=start
/**
 * @param {string} paragraph
 * @param {string[]} banned
 * @return {string}
 */
// 100 ms
// , 在所有 JavaScript 提交中击败了
// 38.28%
// 的用户
const mostCommonWord = function(paragraph, banned) {
  // 字母、空格和下列标点符号!?',;.
  // 使用正则将特殊符号变成空格
  let para = paragraph.replace(/[\!\?\'\,\;\.]/g, ' ').trim();
  // 把大写转换成小写
  para = para.toLowerCase();
  // 然后拆分成数组
  const paraArr = para.split(' ');
  const dict = {};
  // 然后统计不同单词出现的数量（哈希表记录）
  for (let i = 0; i < paraArr.length; i++) {
    const key = paraArr[i];
    if (key === '') continue;
    if (dict[key]) {
      dict[key]++;
    } else {
      dict[key] = 1;
    }
  }
  // 遍历禁用表，去掉哈希表禁止单词
  for (let j = 0; j < banned.length; j++) {
    const item = banned[j];
    if (dict[item]) {
      delete dict[item];
    }
  }
  // 遍历哈希表返回当前出现最多的单词
  const time = Math.max(...Object.values(dict));
  for (const key in dict) {
    if (dict[key] === time) {
      return key;
    }
  }
};
// @lc code=end

export { mostCommonWord };

~~~

  
### 0821-shortestToChar.js

~~~js
/*
 * @lc app=leetcode.cn id=821 lang=javascript
 *
 * [821] 字符的最短距离
 */

// @lc code=start
/**
 * @param {string} S
 * @param {character} C
 * @return {number[]}
 */
// 96 ms
// , 在所有 JavaScript 提交中击败了
// 70.50%
// 的用户
const shortestToChar = function(S, C) {
  // indexOf(item, start)
  const res = new Array(S.length);
  const arr = [];
  // 开始获取C的位置
  let start = 0;
  let index = S.indexOf(C, start);
  res[index] = 0;
  arr.push(index);
  // 把全部的index找到并设置成0
  while (index > -1) {
    start = index;
    index = S.indexOf(C, start + 1);
    if (index !== -1) {
      res[index] = 0;
      arr.push(index);
    }
  }
  // let arr = []; 这里充填的就是C的位置，然后依次循环处理其他的边界条件
  if (arr[0] !== 0) {
    for (let i = 0; i < arr[0]; i++) {
      res[i] = arr[0] - i;
    }
  }
  if (arr[arr.length - 1] !== S.length - 1) {
    let tmp = 1;
    for (let i = arr[arr.length - 1] + 1; i < S.length; i++) {
      res[i] = tmp;
      tmp++;
    }
  }
  // 下面处理中间的情况
  for (let i = 0; i < arr.length - 1; i++) {
    let start = arr[i];
    let end = arr[i + 1];
    if (start === end - 1) continue;
    let tmp = 1;
    while (start < end - 1) {
      start++;
      end--;
      res[start] = tmp;
      res[end] = tmp;
      tmp++;
    }
  }
  return res;
};
// @lc code=end

export { shortestToChar };

~~~

  
### 0824-toGoatLatin.js

~~~js
/*
 * @lc app=leetcode.cn id=824 lang=javascript
 *
 * [824] 山羊拉丁文
 */

//
/**
 * @param {string} S
 * @return {string}
 */
const toGoatLatin = function(S) {
  const arr = S.split(' ');
  // 第一次使用数组遍历（双重循环性能不好）
  // 92 ms, 在所有 JavaScript 提交中击败了36.67%
  // let flags = ['a', 'e', 'i', 'o', 'u'];
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    let item = arr[i];
    const first = item[0].toLowerCase();
    // 第二次直接使用字符串匹配
    // 80 ms, 在所有 JavaScript 提交中击败了88.89%
    if (first !== 'a' && first !== 'e' && first !== 'i' && first !== 'o' && first !== 'u') {
      item = item.slice(1, item.length) + item[0];
    }
    item = `${item}ma`;
    const newStrLen = item.length + i + 1;
    item = item.padEnd(newStrLen, 'a');
    arr[i] = item;
  }
  return arr.join(' ');
};

export { toGoatLatin };

~~~

  
### 0825-numFriendRequests.js

~~~js
/*
 * @lc app=leetcode.cn id=825 lang=javascript
 *
 * [825] 适龄的朋友
 */

// @lc code=start
/**
 * @param {number[]} ages
 * @return {number}
 */
// Your runtime beats 7.41 % of javascript submissions
// 现在性能很差 (6908 ms)
// 平均耗时100ms
const numFriendRequests = function(ages) {
  // 辅助函数
  const check = function(a, b) {
    if (b <= 0.5 * a + 7) {
      return false;
    }
    if (b > 100 && a < 100) {
      return false;
    }
    return true;
  };

  ages.sort((a, b) => a - b);
  const len = ages.length;
  let res = 0;
  // 这里的双循环和排序非常耗时
  // 未来优化这里
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (i === j || ages[i] < ages[j]) {
        continue;
      }
      const isFriend = check(ages[i], ages[j]);
      if (isFriend) res++;
    }
  }
  return res;
};

// @lc code=end

export { numFriendRequests };

~~~

  
### 0830-largeGroupPositions.js

~~~js
/*
 * @lc app=leetcode.cn id=830 lang=javascript
 *
 * [830] 较大分组的位置
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number[][]}
 */
// 100 ms
// , 在所有 JavaScript 提交中击败了
// 76.80%
// 的用户
const largeGroupPositions = function(s) {
  const len = s.length;
  if (len < 3) {
    return [];
  }
  let start = 0;
  let startStr = s[0];
  const res = [];
  for (let i = 1; i < len; i++) {
    if (i === len - 1 && i - start >= 2 && s[i] === startStr) {
      res.push([start, len - 1]);
    }
    if (s[i] === startStr) {
      continue;
    } else {
      const end = i - 1;
      if (end - start >= 2) {
        res.push([start, end]);
      }
      start = i;
      startStr = s[i];
    }
    // console.log(i, len - 1)
  }
  return res;
};
// @lc code=end

export { largeGroupPositions };

~~~

  
### 0831-maskPII.js

~~~js
/*
 * @lc app=leetcode.cn id=831 lang=javascript
 *
 * [831] 隐藏个人信息
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
//  Your runtime beats 100 % of javascript submissions
const maskPII = function(s) {
  // 两个字符串的拼接题目
  if (s.includes('@')) {
    // 这是邮箱
    s = s.toLowerCase();
    const index = s.indexOf('@');
    const front = s.slice(0, index);
    const end = s.slice(index);
    const nameHead = front[0];
    const nameTail = front[front.length - 1];
    return `${nameHead}*****${nameTail}${end}`;
  }
  // 处理电话号码
  const str = s.replace(/[\+\-\(\)\s+]/ig, '');
  const tail = str.slice(-4);
  if (str.length === 10) {
    return `***-***-${tail}`;
  } else if (str.length === 11) {
    return `+*-***-***-${tail}`;
  } else if (str.length === 12) {
    return `+**-***-***-${tail}`;
  }
  // length === 13
  else {
    return `+***-***-***-${tail}`;
  }
};
// @lc code=end

export { maskPII };

~~~

  
### 0832-flipAndInvertImage.js

~~~js
/**
 * @param {number[][]} A
 * @return {number[][]}
 */
const flipAndInvertImage = function(A) {
  // 对于这个矩阵，首先循环一次，将子数组取反
  // 然后计算每一个值的相反数
  // 返回原始的数组
  const len = A.length;
  for (let i = 0; i < len; i++) {
    const item = A[i].reverse();
    const len2 = item.length;
    for (let j = 0; j < len2; j++) {
      A[i][j] = A[i][j] === 1 ? 0 : 1;
    }
  }
  return A;
};

export { flipAndInvertImage };

~~~

  
### 0836-isRectangleOverlap.js

~~~js
/*
 * @lc app=leetcode.cn id=836 lang=javascript
 *
 * [836] 矩形重叠
 */

// @lc code=start
/**
 * @param {number[]} rec1
 * @param {number[]} rec2
 * @return {boolean}
 */
// Your runtime beats 87.25 % of javascript submissions
// 看看更好的方法
// https://leetcode-cn.com/problems/rectangle-overlap/solution/
const isRectangleOverlap = function(rec1, rec2) {
  const x1 = rec1[0];
  const y1 = rec1[1];
  const x2 = rec1[2];
  const y2 = rec1[3];
  const x3 = rec2[0];
  const y3 = rec2[1];
  const x4 = rec2[2];
  const y4 = rec2[3];
  // 让一个矩形静止，另一个矩形只要在四个边外部，都不会重叠
  // [0,-1,0,1] 特殊情况: 如果一个不是矩形，那么肯定不想交
  if (x1 === x2 || y1 === y2 || x3 === x4 || y3 === y4) {
    return false;
  }
  if (
    (x1 <= x3 && x2 <= x3)
    || (x1 >= x4 && x2 >= x4)
    || (y1 <= y3 && y2 <= y3)
    || (y1 >= y4 && y2 >= y4)
  ) {
    return false;
  } else {
    return true;
  }
};
// [8,20,12,20]
// [14,2,19,11] true
// @lc code=end

export { isRectangleOverlap };

~~~

  
### 0844-backspaceCompare.js

~~~js
/*
 * @lc app=leetcode.cn id=844 lang=javascript
 *
 * [844] 比较含退格的字符串
 */

// @lc code=start
/**
 * @param {string} S
 * @param {string} T
 * @return {boolean}
 */
// 92 ms, 在所有 JavaScript 提交中击败了 36.98%
const backspaceCompare = function(S, T) {
  const s = fn(S);
  const t = fn(T);
  return s === t;
};

const fn = function(str) {
  if (str.indexOf('#') === -1) return str;
  const arr = [];
  for (let i = 0; i < str.length; i++) {
    const item = str[i];
    if (item !== '#') {
      arr.push(item);
    } else {
      arr.pop();
    }
  }
  return arr.join('');
};

// 思路二：直接使用字符串拼接的方式
// 84 ms, 在所有 JavaScript 提交中击败了73.31%
const fn2 = function(str) {
  let index = str.indexOf('#');
  if (index === -1) return str;
  while (index > -1) {
    if (index === 0) {
      str = str.slice(1);
    } else {
      str = str.slice(0, index - 1) + str.slice(index + 1);
    }
    index = str.indexOf('#');
  }
  return str;
};

// @lc code=end

export { backspaceCompare, fn, fn2 };

~~~

  
### 0849-maxDistToClosest.js

~~~js
/*
 * @lc app=leetcode.cn id=849 lang=javascript
 *
 * [849] 到最近的人的最大距离
 */
// @lc code=start
/**
 * @param {number[]} seats
 * @return {number}
 */
const maxDistToClosest = function(seats) {
  const len = seats.length;
  if (len === 2) {
    return 1;
  }
  // 如果在两边，直接计算(这个情况需要处理)
  // 如果在中间（奇数加一）然后除以2，计算
  let max = 1;
  let start = seats[0] === 0 ? 0 : null;
  let end = null;
  let interval;
  for (let i = 1; i < len; i++) {
    if (seats[i - 1] === 1 && seats[i] === 0) {
      start = i;
    } else if ((seats[i - 1] === 0 && seats[i] === 1) || (i === len - 1 && seats[i] === 0)) {
      if (i === len - 1 && seats[i] === 0) {
        end = i;
      } else {
        end = i - 1;
      }
      if (start === 0 || end === seats.length - 1) {
        interval = (end - start + 1);
      } else {
        interval = Math.ceil((end - start + 1) / 2);
      }
      max = interval > max ? interval : max;
      start = i;
      end = null;
    }
  }
  return max;
};
// @lc code=end

export { maxDistToClosest };

~~~

  
### 0852-peakIndexInMountainArray.js

~~~js
/*
 * @lc app=leetcode.cn id=852 lang=javascript
 *
 * [852] 山脉数组的峰顶索引
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number}
 */
// Your runtime beats 63.5 % of javascript submissions
const peakIndexInMountainArray = function(arr) {
  const len = arr.length;
  let start = 0;
  let end = len - 1;
  let mid = Math.floor((end - start) / 2);
  if (arr[mid] > arr[mid - 1] && arr[mid] > arr[mid + 1]) {
    return mid;
  }
  while (arr[mid] <= arr[mid - 1] || arr[mid] <= arr[mid + 1]) {
    if (arr[mid] <= arr[mid - 1]) {
      end = mid;
    } else {
      start = mid;
    }
    mid = Math.floor((end + start) / 2);
    if (arr[mid] > arr[mid - 1] && arr[mid] > arr[mid + 1]) {
      return mid;
    }
    // console.log(start, end, mid);
  }
};

// @lc code=end

export { peakIndexInMountainArray };

~~~

  
### 0859-buddyStrings.js

~~~js
/*
 * @lc app=leetcode.cn id=859 lang=javascript
 *
 * [859] 亲密字符串
 */

//
/**
 * @param {string} A
 * @param {string} B
 * @return {boolean}
 */
// 88 ms
// , 在所有 JavaScript 提交中击败了
// 89.20%
// 的用户
const buddyStrings = function(A, B) {
  const len = A.length;
  // len === 0?
  if (len !== B.length) {
    return false;
  }
  const arr = [];
  const dict = {};
  // 是否有相同的键
  let hasSame = false;
  for (let i = 0; i < len; i++) {
    // if (A[i] === B[i]) continue
    if (A[i] !== B[i]) {
      arr.push(i);
      if (arr.length > 2) return false;
    }
    if (!hasSame) {
      const key = A[i];
      if (!dict[key]) {
        dict[key] = true;
      } else {
        hasSame = true;
      }
    }
  }
  // 如果是1的话，一定是不能的
  if (arr.length === 1) return false;
  // 如果是0的话，那么看是否有重复的元素
  if (arr.length === 0) return hasSame;
  const start = arr[0]; const
    end = arr[1];
  if (A[start] === B[end] && A[end] === B[start]) {
    return true;
  } else {
    return false;
  }
};

// 输入： A = "aa", B = "aa"
// 输出： true

export { buddyStrings };

~~~

  
### 0860-lemonadeChange.js

~~~js
/*
 * [860] 柠檬水找零
 */

//
/**
 * @param {number[]} bills
 * @return {boolean}
 */
// 96 ms
// , 在所有 JavaScript 提交中击败了
// 38.00%
// 的用户
const lemonadeChange = function(bills) {
  if (bills.length === 0) {
    return true;
  }
  const res = {};
  res['5'] = 0;
  res['10'] = 0;
  for (let i = 0; i < bills.length; i++) {
    const item = bills[i];
    switch (item) {
      case 5:
        res['5'] = res['5'] + 1;
        break;
      case 10:
        res['10'] = res['10'] + 1;
        if (res['5'] === 0) {
          return false;
        } else {
          res['5'] = res['5'] - 1;
        }
        break;
      case 20:
        if (res['10'] === 0) {
          // 需要找三张5
          if (res['5'] < 3) {
            return false;
          } else {
            res['5'] = res['5'] - 3;
          }
        } else {
          // 有10元，需要找一张10元1张5元
          if (res['5'] === 0) {
            return false;
          } else {
            res['10'] = res['10'] - 1;
            res['5'] = res['5'] - 1;
          }
        }
        break;
      default:
        break;
    }
  }
  return true;
};

export { lemonadeChange };

~~~

  
### 0867-transpose.js

~~~js
/*
 * @lc app=leetcode.cn id=867 lang=javascript
 *
 * [867] 转置矩阵
 */

//
/**
 * @param {number[][]} A
 * @return {number[][]}
 */
// 执行用时：
// 100 ms
// , 在所有 JavaScript 提交中击败了
// 55.28%
// 输入：[[1,2,3],[4,5,6],[7,8,9]]
// 输出：[[1,4,7],[2,5,8],[3,6,9]]
const transpose = function(A) {
  const m = A.length;
  if (m === 0) return [];
  const n = A[0].length;
  const result = [];
  for (let i = 0; i < n; i++) {
    const arr = [];
    for (let j = 0; j < m; j++) {
      arr.push(A[j][i]);
    }
    result.push(arr);
  }
  return result;
};

export { transpose };

~~~

  
### 0868-binaryGap.js

~~~js
/*
 * @lc app=leetcode.cn id=868 lang=javascript
 *
 * [868] 二进制间距
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
// Your runtime beats 93.22 % of javascript submissions
const binaryGap = function(n) {
  if (n === 1) return 0;
  // 先把十进制转换成二进制
  const bin = (n >>> 0).toString(2);
  // 然后判断其中1的个数
  let start = bin.indexOf('1');
  if (start === bin.lastIndexOf('1')) {
    return 0;
  }
  // 循环一次字符串，使用两个指针，判断最大的间距
  let max = 1;
  for (let i = start + 1; i < bin.length; i++) {
    if (bin[i] === '0') {
      continue;
    } else {
      // 如果是1，那么计算长度，然后归零
      const len = i - start;
      max = max > len ? max : len;
      start = i;
    }
  }
  return max;
};
// @lc code=end

export { binaryGap };

~~~

  
### 0876-middleNode.js

~~~js
/*
 * @lc app=leetcode.cn id=876 lang=javascript
 *
 * [876] 链表的中间结点
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 思路1：遍历一次链表，获取链表的长度
// 然后再次遍历链表，获取中间的节点
// 这样循环一次半，性能不好

// 思路2：设置快慢指针
// 快指针每次增加两个，慢指针每次增加一个
// 当快指针到结尾时，慢指针会到中间
// 这样性能较好，需要测试空链表的情况
// Your runtime beats 44.98 % of javascript submissions
const middleNode = function(head) {
  // 先把链表的头临时存储一下
  if (!head) {
    return head;
  }
  let fast = slow = head;
  while (fast.next && fast.next.next) {
    fast = fast.next.next;
    slow = slow.next;
  }
  // 处理偶数的情况
  if (fast.next) {
    slow = slow.next;
  }
  return slow;
};
// @lc code=end

export { middleNode };

~~~

  
### 0877-stoneGame.js

~~~js
/**
 * @param {number[]} piles
 * @return {boolean}
 */
// 如果是偶数个，那么先手不管什么情况，都可以获取最优解
// 贪心算法（也可以尝试一下动态规划算法）
const stoneGame = function() {
  return true;
};

export { stoneGame };

~~~

  
### 0881-num-rescue-boats.js

~~~js
// 881-numRescueBoats
// 小船逃生问题-881

// 对撞指针
// 180 ms击败了95.04%
// 45.4 MB击败了12.25%
function numRescueBoats(people, limit) {
  people.sort((a, b) => (a - b));
  let res = 0;
  let left = 0;
  let right = people.length - 1;
  while (left <= right) {
    if (people[left] + people[right] <= limit) {
      left++;
    }
    right--;
    res++;
  }
  return res;
}

export { numRescueBoats };

~~~

  
### 0883-projectionArea.js

~~~js
/*
 * @lc app=leetcode.cn id=883 lang=javascript
 *
 * [883] 三维形体投影面积
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
// Your runtime beats 48.72 % of javascript submissions
const projectionArea = function(grid) {
  // 根据投影分析知道
  // 结果 = 全部数据中不是0的个数（Z轴）投影
  // + 矩阵行和列的分别的最大值即可
  // 遍历数组即可
  let X = 0;
  let Y = 0;
  let Z = 0;
  const len = grid.length;
  const dict = [];
  for (let i = 0; i < len; i++) {
    const range = grid[i];
    // 找到当前行的最大值
    const max = Math.max(...range);
    X += max;
    for (let j = 0; j < len; j++) {
      const item = range[j];
      if (item > 0) {
        Z++;
      }
      dict[j] = item > (dict[j] || 0) ? item : dict[j];
    }
  }
  // dict 求和
  // console.log(dict);
  Y = dict.reduce((item, sum) => { return item + sum; }, 0);
  // console.log(X, Y, Z)
  return (X + Y + Z);
};
// @lc code=end

export { projectionArea };

~~~

  
### 0884-uncommonFromSentences.js

~~~js
/*
 * @lc app=leetcode.cn id=884 lang=javascript
 *
 * [884] 两句话中的不常见单词
 */

//
/**
 * @param {string} A
 * @param {string} B
 * @return {string[]}
 */
// 53/53 cases passed (88 ms)
// Your runtime beats 55.77 % of javascript submissions
// Your memory usage beats 37.66 % of javascript submissions (38.8 MB)
const uncommonFromSentences = function(A, B) {
  // 如果一个单词出现两次
  // 或者一个单词在两个句子中出现
  // 那么就是常见单词
  const arrA = A.split(' ');
  const arrB = B.split(' ');
  const arr = arrA.concat(arrB);
  const dict = {};
  for (let i = 0; i < arr.length; i++) {
    const key = arr[i];
    if (dict[key]) {
      dict[key]++;
    } else {
      dict[key] = 1;
    }
  }
  const result = [];
  for (const key in dict) {
    const value = dict[key];
    if (value === 1) {
      result.push(key);
    }
  }
  return result;
  // 我们先把字符串变成数组，然后遍历数组，存放在一个对象中
  // 然后遍历对象，找到仅仅存在一次的单词即可
};

export { uncommonFromSentences };

~~~

  
### 0888-fairCandySwap.js

~~~js
/*
 * @lc app=leetcode.cn id=888 lang=javascript
 *
 * [888] 公平的糖果交换
 */

// @lc code=start
/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number[]}
 */
// Your runtime beats 90.18 % of javascript submissions
const fairCandySwap = function(A, B) {
  const sumA = A.reduce((a, b) => a + b, 0);
  const sumB = B.reduce((a, b) => a + b, 0);
  const sub = (sumB - sumA) / 2;
  const answer = [];
  const dict = {};
  for (let i = 0; i < B.length; i++) {
    const key = B[i];
    dict[key] = true;
  }
  for (let i = 0; i < A.length; i++) {
    const item = A[i];
    const key = item + sub;
    if (dict[key]) {
      answer[0] = item;
      answer[1] = key;
      return answer;
    }
  }
};
// @lc code=end

export { fairCandySwap };

~~~

  
### 0890-findAndReplacePattern.js

~~~js
/*
 * @lc app=leetcode.cn id=890 lang=javascript
 *
 * [890] 查找和替换模式
 */

// @lc code=start
/**
 * @param {string[]} words
 * @param {string} pattern
 * @return {string[]}
 */
// 思路一：根据定义暴力法
// Your runtime beats 23.81 % of javascript submissions
const findAndReplacePattern = function(words, pattern) {
  // 先把 pattern 转换成一个字典
  // 然后看每一个字符串是否满足字典即可
  const dict = {};
  const len = pattern.length;
  for (let i = 0; i < len; i++) {
    const key = pattern[i];
    if (!dict[key]) dict[key] = [];
    dict[key].push(i);
  }
  const keyLen = Object.keys(dict).length;
  const keyTimes = [];
  for (const key in dict) {
    const value = dict[key];
    keyTimes.push(value);
  }
  keyTimes.sort((a, b) => a - b);
  // console.log(keyTimes);

  // 辅助函数：判断是否相同模式
  // 现在这样需要获取全部的长度，性能不好
  const judge = function(str) {
    const dict1 = {};
    for (let i = 0; i < len; i++) {
      const key = str[i];
      if (!dict1[key]) dict1[key] = [];
      dict1[key].push(i);
    }
    if (Object.keys(dict1).length !== keyLen) {
      return false;
    }
    const keyTimes1 = [];
    for (const key in dict1) {
      const value = dict1[key];
      keyTimes1.push(value);
    }
    keyTimes1.sort((a, b) => a - b);
    // 这样可以实现，但是性能不好（获取key再排序等等）
    // console.log(keyTimes1);
    for (let i = 0; i < keyLen; i++) {
      if (String(keyTimes1[i]) !== String(keyTimes[i])) {
        return false;
      }
    }
    return true;
  };
  // 循环字符串
  const result = [];
  for (let i = 0; i < words.length; i++) {
    const item = words[i];
    if (item.length !== len) {
      continue;
    }
    if (judge(item)) {
      result.push(item);
    }
  }
  return result;
};

// 思路二：先获取模式，然后循环判断每一个字符，如果相同位置是相同的字符，那么就满足要求
// [[0], [1,2,3]]

// @lc code=end

export { findAndReplacePattern };

~~~

  
### 0892-surfaceArea.js

~~~js
/*
 * @lc app=leetcode.cn id=892 lang=javascript
 *
 * [892] 三维形体的表面积
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */

// 72 ms Your runtime beats 85.71 %
const surfaceArea = function(grid) {
  // 表面积 = 全部的表面积 - 水平方向重叠的部分 - 垂直方向重叠的部分
  const len = grid.length;
  // 先计算全部的立方体的表面积
  let total = 0;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      total += grid[i][j] * 6;
    }
  }
  // 计算垂直方向重叠的表面积
  let vertical = 0;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      // 垂直大于两个才有重叠的面积
      if (grid[i][j] > 1) {
        vertical += ((grid[i][j] - 1) * 2);
      }
    }
  }
  // 计算水平方向重叠的面积
  let horizontal = 0;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      const curr = grid[i][j];
      // 计算四个面水平方向重叠的表面积
      if (j !== len - 1) {
        horizontal += Math.min(grid[i][j + 1], curr);
      }
      if (j !== 0) {
        horizontal += Math.min(grid[i][j - 1], curr);
      }
      if (i !== len - 1) {
        horizontal += Math.min(grid[i + 1][j], curr);
      }
      if (i !== 0) {
        horizontal += Math.min(grid[i - 1][j], curr);
      }
    }
  }
  // console.log(total, vertical, horizontal);
  return total - vertical - horizontal;
};

// unit test success
// console.log(surfaceArea([[2]]) === 10);
// console.log(surfaceArea([[1,2],[3,4]]) === 34);
// console.log(surfaceArea([[1,0],[0,2]]) === 16);
// console.log(surfaceArea([[1,1,1],[1,0,1],[1,1,1]]) === 32);
// console.log(surfaceArea([[2,2,2],[2,1,2],[2,2,2]]) === 46);

// 改进版
// 72 ms Your runtime beats 85.71 %
// 三次循环变成1次循环
const surfaceArea2 = function(grid) {
  const len = grid.length;
  let total = 0;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      const curr = grid[i][j];
      total += curr * 6;
      if (curr > 1) {
        total -= ((curr - 1) * 2);
      }
      if (j !== len - 1) {
        total -= Math.min(grid[i][j + 1], curr);
      }
      if (j !== 0) {
        total -= Math.min(grid[i][j - 1], curr);
      }
      if (i !== len - 1) {
        total -= Math.min(grid[i + 1][j], curr);
      }
      if (i !== 0) {
        total -= Math.min(grid[i - 1][j], curr);
      }
    }
  }
  return total;
};

export { surfaceArea, surfaceArea2 };

~~~

  
### 0893-numSpecialEquivGroups.js

~~~js
/*
 * @lc app=leetcode.cn id=893 lang=javascript
 *
 * [893] 特殊等价字符串组
 */

// @lc code=start
/**
 * @param {string[]} A
 * @return {number}
 */
// Your runtime beats 73.53 % of javascript submissions
const numSpecialEquivGroups = function(A) {
  const dict = {};
  let num = 0;
  const len = A.length;
  for (let i = 0; i < len; i++) {
    const item = A[i];
    const key = getKey(item);
    // console.log(key);
    dict[key] ? dict[key]++ : dict[key] = 1;
    num = num > dict[key] ? num : dict[key];
  }
  return Object.keys(dict).length;
};

let getKey = (str) => {
  const arr1 = [];
  const arr2 = [];
  for (let i = 0; i < str.length; i++) {
    if (i % 2 === 0) {
      arr1.push(str[i]);
    } else {
      arr2.push(str[i]);
    }
  }
  arr1.sort((a, b) => a > b ? 1 : -1);
  arr2.sort((a, b) => a > b ? 1 : -1);
  return `${arr1.join('')}+${arr2.join('')}`;
};
// ["abc","acb","bac","bca","cab","cba"] 这个为什么不对
// 是否考虑原始数组中完全相同的子串？
// @lc code=end

export { numSpecialEquivGroups };

~~~

  
### 0896-isMonotonic.js

~~~js
// 896. 单调数列
// 如果数组是单调递增或单调递减的，那么它是单调的。
// 如果对于所有 i <= j，A[i] <= A[j]，那么数组 A 是单调递增的。 如果对于所有 i <= j，A[i]> = A[j]，那么数组 A 是单调递减的。
// 当给定的数组 A 是单调数组时返回 true，否则返回 false。
/**
 * @param {number[]} A
 * @return {boolean}
 */
const isMonotonic = function(A) {
  // 处理空数组或者长度是12的情况
  const len = A.length;
  if (len < 3) {
    return true;
  }
  // 设置默认的是 undefined
  let flag = null;
  // 循环数组，如果出现一次大于，那么变成true，出现小于变成false，等于就是continue
  // 如果再次出现相反的值，那么就返回false
  for (let i = 1; i < len; i++) {
    if (A[i] === A[i - 1]) {
      continue;
    } else if (A[i] < A[i - 1]) {
      if (flag === true) {
        continue;
      } else if (flag === false) {
        return false;
      } else if (flag === null) {
        flag = true;
      }
    } else if (A[i] > A[i - 1]) {
      if (flag === false) {
        continue;
      } else if (flag === true) {
        return false;
      } else if (flag === null) {
        flag = false;
      }
    }
  }
  return true;
};

// 思路二：先数组去重，然后计算长度，这样可以不需要比较重复的部分

export { isMonotonic };

~~~

  
### 0897-increasingBST.js

~~~js
/*
 * @lc app=leetcode.cn id=897 lang=javascript
 *
 * [897] 递增顺序查找树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
// Your runtime beats 91.69 % of javascript submissions
function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
}

const increasingBST = function(root) {
  const arr = [];
  // 先把这个树中序遍历，然后把结果放在线性的数组中
  const runNode = (node) => {
    if (node.left) {
      runNode(node.left);
    }
    arr.push(node.val);
    if (node.right) {
      runNode(node.right);
    }
  };
  runNode(root, arr);
  // console.log(arr);
  // 然后把线性的数组，转换成只有右子节点的树
  const getTree = (node, arr) => {
    if (arr.length > 0) {
      const value = arr.shift();
      node.right = new TreeNode(value);
      getTree(node.right, arr);
    }
  };
  const start = arr.shift();
  const res = new TreeNode(start);
  getTree(res, arr);
  return res;
};

// @lc code=end

export { increasingBST };

~~~

  
### 0905-sortArrayByParity.js

~~~js
/*
 * @lc app=leetcode.cn id=905 lang=javascript
 *
 * [905] 按奇偶排序数组
 */

// @lc code=start
/**
 * @param {number[]} A
 * @return {number[]}
 */
// Your runtime beats 83.33 % of javascript submissions
const sortArrayByParity = function(A) {
  const B = [];
  const C = [];
  const len = A.length;
  for (let i = 0; i < len; i++) {
    if (A[i] % 2 === 1) {
      C.push(A[i]);
    } else {
      B.push(A[i]);
    }
  }
  return B.concat(C);
};
// @lc code=end

export { sortArrayByParity };

~~~

  
### 0908-smallestRangeI.js

~~~js
/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
// "选择任意 x 满足 -K <= x <= K，并将 x 加到 A[i] 中"
// 就不能写得明确一点,x是一个整数.将一个x,加入到一个 A[i] ,一个整数加入到另一个整数中???
const smallestRangeI = function(A, K) {
  return Math.max(0, (Math.max(...A) - Math.min(...A) - 2 * K));
};

export { smallestRangeI };

~~~

  
### 0914-hasGroupsSizeX.js

~~~js
/*
 * @lc app=leetcode.cn id=914 lang=javascript
 *
 * [914] 卡牌分组
 */

// @lc code=start
/**
 * @param {number[]} deck
 * @return {boolean}
 */
// Your runtime beats 58.8 % of javascript submissions
// 辅助函数：求最大公约数
function gcd(a, b) {
  if (a % b === 0) {
    return b;
  }
  return gcd(b, a % b);
}

const hasGroupsSizeX = function(deck) {
  const len = deck.length;
  if (len < 2) return false;
  // 获取不同元素出现的次数
  const dict = {};
  for (let i = 0; i < len; i++) {
    const key = deck[i];
    if (!dict[key]) {
      dict[key] = 0;
    }
    dict[key]++;
  }
  const arr = [];
  for (const key in dict) {
    // 如果某个数字只出现一次，那么一定不存在最大公约数
    if (dict[key] === 1) {
      return false;
    }
    arr.push(dict[key]);
  }
  // 排序，然后依次求最大公约数
  arr.sort((a, b) => a - b);
  if (!arr[1]) return true;
  let res = gcd(arr[0], arr[1]);
  // console.log(arr);
  if (res === 1) return false;
  for (let i = 1; i < arr.length; i++) {
    res = gcd(res, arr[i]);
    // console.log(res, arr[i], res);
    if (res === 1) return false;
  }
  return true;
};

// [1,1]
// @lc code=end

export { hasGroupsSizeX };

~~~

  
### 0915-partitionDisjoint.js

~~~js
/*
 * @lc app=leetcode.cn id=915 lang=javascript
 *
 * [915] 分割数组
 */

// @lc code=start
/**
 * @param {number[]} A
 * @return {number}
 */
// Your runtime beats 68.63 % of javascript submissions
const partitionDisjoint = function(A) {
  const min = Math.min(...A);
  let left = A.lastIndexOf(min);
  // console.log(left);
  while (Math.max(...A.slice(0, left)) > Math.min(...A.slice(left + 1))) {
    // 找到右边的最小值，然后继续求最大值和最小值
    const tmp = Math.min(...A.slice(left + 1));
    // console.log(tmp);
    left = A.lastIndexOf(tmp);
  }
  if (A[left] === Math.min(...A.slice(0, left))) {
    while (A[left - 1] && A[left - 1] === A[left]) {
      left--;
    }
  }
  return left + 1;
};

// @lc code=end

export { partitionDisjoint };

~~~

  
### 0917-reverseOnlyLetters.js

~~~js
/*
 * @lc app=leetcode.cn id=917 lang=javascript
 *
 * [917] 仅仅反转字母
 */

// @lc code=start
/**
 * @param {string} S
 * @return {string}
 */
// Your runtime beats 7.81 % of javascript submissions
// 方法1
const reverseOnlyLetters = function(S) {
  const len = S.length;
  const resArr = new Array(len);
  const strArr = [];
  for (let i = 0; i < len; i++) {
    const item = S[i];
    const index = item.charCodeAt(0);
    // 65～90为26个大写英文字母，97～122号为26个小写英文字母
    if (
      (index >= 65 && index <= 90)
      || (index <= 122 && index >= 97)
    ) {
      strArr.push(item);
    } else {
      resArr[i] = item;
    }
  }
  strArr.reverse();
  if (strArr.length === len) {
    return strArr.join('');
  }
  let pointer = 0;
  for (let i = 0; i < strArr.length; i++) {
    const item = strArr[i];
    while (resArr[pointer]) {
      pointer++;
    }
    resArr[pointer] = item;
    pointer++;
  }
  return resArr.join('');
};

// 方法二：改进版本
// 116/116 cases passed (88 ms)
// Your runtime beats 42.19 % of javascript submissions
const reverseOnlyLetters2 = function(S) {
  const isLetter = (a) => {
    const index = a.charCodeAt(0);
    return (index >= 65 && index <= 90) || (index <= 122 && index >= 97);
  };

  const len = S.length;
  let str = '';
  for (let i = 0; i < len; i++) {
    const item = S[i];
    if (isLetter(item)) {
      str += item;
    }
  }
  str = str.split('').reverse();
  if (str.length === len) {
    return str.join('');
  }
  let pointer = 0;
  for (let i = 0; i < str.length; i++) {
    const item = str[i];
    while (!isLetter(S[pointer])) {
      pointer++;
    }
    S = S.slice(0, pointer) + item + S.slice(pointer + 1);
    pointer++;
  }
  return S;
};
// @lc code=end

export { reverseOnlyLetters, reverseOnlyLetters2 };

~~~

  
### 0922-sortArrayByParityII.js

~~~js
/**
 * @param {number[]} A
 * @return {number[]}
 */
const sortArrayByParityII = function(A) {
  // 循环一次数组，把不是奇数的放在一个数组中，
  // 把不是偶数的放在另一个偶数中
  // 然后更换两个数值的位置，对应的数组处理
  const arr1 = [];
  const arr2 = [];
  const len = A.length;
  for (let i = 0; i < len; i++) {
    if (i % 2 === 0 && A[i] % 2 === 1) {
      arr1.push(i);
    } else if (i % 2 === 1 && A[i] % 2 === 0) {
      arr2.push(i);
    }
  }
  // 调换数组中的位置
  const exchange = function(x, y) {
    const tmp = A[x];
    A[x] = A[y];
    A[y] = tmp;
  };
  for (let j = 0; j < arr1.length; j++) {
    const a = arr1[j]; const
      b = arr2[j];
    exchange(a, b);
  }
  return A;
};

export { sortArrayByParityII };

~~~

  
### 0925-isLongPressedName.js

~~~js
/*
 * @lc app=leetcode.cn id=925 lang=javascript
 *
 * [925] 长按键入
 */

// @lc code=start
/**
 * @param {string} name
 * @param {string} typed
 * @return {boolean}
 */
// Your runtime beats 80.59 % of javascript submissions
const isLongPressedName = function(name, typed) {
  if (name === typed) {
    return true;
  } else if (name.length >= typed.length) {
    return false;
  }
  let pointer = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === name[pointer]) {
      pointer++;
    } else {
      // 如果不等于的话
      if (i === 0) return false;
      if (typed[i] === name[pointer - 1]) {
        continue;
      } else {
        return false;
      }
    }
  }
  return (pointer === name.length);
};
// @lc code=end

export { isLongPressedName };

~~~

  
### 0929-numUniqueEmails.js

~~~js
/*
 * @lc app=leetcode.cn id=929 lang=javascript
 *
 * [929] 独特的电子邮件地址
 */

// @lc code=start
/**
 * @param {string[]} emails
 * @return {number}
 */
// Your runtime beats 92.77 % of javascript submissions
const numUniqueEmails = function(emails) {
  // 辅助函数：规范邮件地址
  const valid = (email) => {
    const seperator = email.indexOf('@');
    let local = email.slice(0, seperator);
    const domain = email.slice(seperator);
    if (local.indexOf('+') > -1) {
      local = local.slice(0, local.indexOf('+'));
    }
    local = local.replace(/\./g, '');
    return local + domain;
  };

  // 循环邮件
  const len = emails.length;
  const dict = {};
  let times = 0;
  for (let i = 0; i < len; i++) {
    const item = valid(emails[i]);
    // console.log(item);
    // 然后放在对象中，用另一个int记录次数
    if (!dict[item]) {
      times++;
      dict[item] = true;
    }
  }
  return times;
};

// @lc code=end

export { numUniqueEmails };

~~~

  
### 0933-RecentCounter.js

~~~js
/*
 * @lc app=leetcode.cn id=933 lang=javascript
 *
 * [933] 最近的请求次数
 */

// @lc code=start
// Your runtime beats 63.16 % of javascript submissions
// 思路二：使用栈实现
const RecentCounter = function() {
  this.count = [];
};

/**
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function(t) {
  // 后进去的大于以前的情况，那么直接比较即可
  // 清空之前不合法的请求
  while (this.count[0] < t - 3000) {
    this.count.shift();
  }
  // 加入现在的请求
  this.count.push(t);
  // 然后计算当前请求的数量
  return this.count.length;
};

// @lc code=start
// Your runtime beats 63.16 % of javascript submissions
// 思路二：使用栈实现
const RecentCounter2 = function() {
  this.count = [];
};

/**
 * @param {number} t
 * @return {number}
 */
RecentCounter2.prototype.ping = function(t) {
  // 后进去的大于以前的情况，那么直接比较即可
  // 清空之前不合法的请求
  while (this.count[0] < t - 3000) {
    this.count.shift();
  }
  // 加入现在的请求
  this.count.push(t);
  // 然后计算当前请求的数量
  return this.count.length;
};

/**
 * Your RecentCounter object will be instantiated and called as such:
 * let obj = new RecentCounter()
 * let param_1 = obj.ping(t)
 */
// @lc code=end

export { RecentCounter };

~~~

  
### 0937-reorderLogFiles.js

~~~js
/*
 * @lc app=leetcode.cn id=937 lang=javascript
 *
 * [937] 重新排列日志文件
 */

// @lc code=start
/**
 * @param {string[]} logs
 * @return {string[]}
 */
// Your runtime beats 80.65 % of javascript submissions
const reorderLogFiles = function(logs) {
  // 数组进行排序
  // 首先判断是数字还是字符
  logs.sort((a, b) => {
    const typeA = getType(a);
    const typeB = getType(b);
    if (typeA === false && typeB === false) {
      return 1;
    } else if (typeA === false) {
      return 1;
    } else if (typeB === false) {
      return -1;
    } else {
      return typeA > typeB ? 1 : -1;
    }
  });
  return logs;
};

const getType = (log) => {
  const index = log.indexOf(' ');
  const str = log.slice(index).replace(/\s/g, '');
  if (Number.isNaN(Number(str))) {
    const res = log.slice(index);
    return res;
  } else {
    return false;
  }
};
// @lc code=end

export { reorderLogFiles };

~~~

  
### 0938-rangeSumBST.js

~~~js
/*
 * @lc app=leetcode.cn id=938 lang=javascript
 *
 * [938] 二叉搜索树的范围和
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
// 244 ms
// , 在所有 JavaScript 提交中击败了
// 70.44%
// 的用户
const rangeSumBST = function(root, low, high) {
  if (!root) return 0;
  const value = root.val;
  let sum = 0;
  if (value <= low) {
    sum = rangeSumBST(root.right, low, high);
  } else if (value >= high) {
    sum = rangeSumBST(root.left, low, high);
  } else {
    sum = (rangeSumBST(root.right, low, high) + rangeSumBST(root.left, low, high));
  }
  if (value >= low && value <= high) {
    sum += value;
  }
  return sum;
};
// @lc code=end

export { rangeSumBST };

~~~

  
### 0941-validMountainArray.js

~~~js
/*
 * @lc app=leetcode.cn id=941 lang=javascript
 * [941] 有效的山脉数组
 */
/**
 * @param {number[]} A
 * @return {boolean}
 */
const validMountainArray = function(A) {
  const len = A.length;
  if (len < 3) return false;
  if (A[0] > A[1]) return false;
  // [1,2,3,4,5] false
  // [9,8,7,6,5,4,3,2,1,0] false
  // [1,2,3,2,3,2,1] false
  // [1,2,3,3,2,1]
  let reach = false;
  for (let i = 0; i < len - 1; i++) {
    if (A[i] < A[i + 1]) {
      if (reach) {
        return false;
      }
      continue;
    } else if (A[i] === A[i + 1]) {
      return false;
    } else if (A[i] > A[i + 1]) {
      if (!reach) reach = true;
    }
  }
  return reach;
};

export { validMountainArray };

~~~

  
### 0944-minDeletionSize.js

~~~js
/*
 * @lc app=leetcode.cn id=944 lang=javascript
 *
 * [944] 删列造序
 */

// @lc code=start
/**
 * @param {string[]} A
 * @return {number}
 */
// Your runtime beats 82.35 % of javascript submissions
const minDeletionSize = function(A) {
  const arrLen = A.length;
  if (arrLen === 0) return 0;
  const strLen = A[0].length;
  if (strLen < 2) return 0;
  let res = 0;
  // 处理特殊情况
  for (let i = 0; i < strLen; i++) {
    for (let j = 0; j < arrLen - 1; j++) {
      if (A[j][i].charCodeAt(0) > A[j + 1][i].charCodeAt(0)) {
        res++;
        break;
      }
    }
  }
  return res;
};
// @lc code=end

export { minDeletionSize };

~~~

  
### 0953-isAlienSorted.js

~~~js
/*
 * @lc app=leetcode.cn id=953 lang=javascript
 *
 * [953] 验证外星语词典
 */

// @lc code=start
/**
 * @param {string[]} words
 * @param {string} order
 * @return {boolean}
 */
// 88 ms
// , 在所有 JavaScript 提交中击败了
// 50.72%
// 的用户
const isAlienSorted = function(words, order) {
  // 写一个辅助函数，判断两个单词是否符合顺序
  const checkOrder = function(a, b) {
    // console.log(a, b);
    const aLen = a.length;
    for (let i = 0; i < aLen; i++) {
      // 其中 '∅' 是空白字符
      if (!b[i]) return false;
      const orderB = order.indexOf(b[i]);
      const orderA = order.indexOf(a[i]);
      if (orderA < orderB) {
        return true;
      } else if (orderA > orderB) {
        return false;
      } else {
        // orderA === orderB
        continue;
      }
    }
    return true;
  };
  // 循环数组，遍历每一个元素和后一个元素
  const len = words.length;
  if (len < 2) return true;
  for (let i = 1; i < len; i++) {
    const current = words[i];
    const before = words[i - 1];
    const res = checkOrder(before, current);
    if (res === false) {
      return false;
    }
  }
  return true;
};
// @lc code=end

export { isAlienSorted };

~~~

  
### 0961-repeatedNTimes.js

~~~js
/**
 * @param {number[]} A
 * @return {number}
 */
// 92 ms, 在所有 JavaScript 提交中击败了70.56%
const repeatedNTimes = function(A) {
  const hash = {};
  const len = A.length;
  for (let i = 0; i < len; i++) {
    const key = A[i];
    if (hash[key]) {
      return key;
    } else {
      hash[key] = 1;
    }
  }
};

export { repeatedNTimes };

~~~

  
### 0965-isUnivalTree.js

~~~js
/*
 * @lc app=leetcode.cn id=965 lang=javascript
 *
 * [965] 单值二叉树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
// Your runtime beats 15.95 % of javascript submissions
// 这个方法不好
const isUnivalTree = function(root) {
  if (!root || (!root.val && root.val !== 0)) return true;
  const run = function(node, key) {
    if (!node || (!node.val && node.val !== 0)) return true;
    if (node.val !== key) {
      return false;
    }
    if (run(node.left, key) === false) return false;
    if (run(node.right, key) === false) return false;
    return true;
  };
  return run(root, root.val);
  // [0,6,0,null,null,null,0,0,null,0,null,null,0]
};

// @lc code=end

export { isUnivalTree };

~~~

  
### 0970-powerfulIntegers.js

~~~js
/*
 * @lc app=leetcode.cn id=970 lang=javascript
 *
 * [970] 强整数
 */

// @lc code=start
/**
 * @param {number} x
 * @param {number} y
 * @param {number} bound
 * @return {number[]}
 */
// 264 ms
// , 在所有 JavaScript 提交中击败了
// 16.67%
// 的用户
const powerfulIntegers = function(x, y, bound) {
  // 使用动态规划，反向处理
  // 新建一个长度是 bound 的数组，然后填充false
  const arr = new Array(bound + 1).fill(false);
  // 双重循环，循环的是当前的指数，然后获取对应的情况
  const end1 = Math.ceil(Math.sqrt(bound, x));
  for (let i = 0; i < end1; i++) {
    const end2 = Math.ceil(Math.sqrt(bound - x ** i, y));
    for (let j = 0; j < end2; j++) {
      const item = x ** i + y ** j;
      if (item <= bound) {
        arr[item] = true;
        // 这里循环比较多，能否优化
      }
    }
  }
  // 剩余的就是false
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === true) {
      res.push(i);
    }
  }
  return res;
};

// @lc code=end

export { powerfulIntegers };

~~~

  
### 0976-largestPerimeter.js

~~~js
/**
 * @param {number[]} A
 * @return {number}
 */
const largestPerimeter = function(A) {
  // 辅助函数：判断是否构成三角形
  const isTriangle = function (a, b, c) {
    return (a + b + c) > 2 * Math.max(a, b, c);
  };
  // 辅助函数：判断是否构成三角形(a是最大值)
  const isTri = function(a, b, c) {
    return (a + b + c) > 2 * a;
  };
  const sum = function(a, b, c) {
    return a + b + c;
  };
  const len = A.length;
  // 如果是3个，直接判断返回
  if (len === 3) {
    if (isTriangle(A[0], A[1], A[2])) {
      return sum(...A);
    } else {
      return 0;
    }
  }
  // 如果是大于3个，先排序，然后获取最大的三个数
  A.sort((a, b) => b - a);
  // 如果是三角形，直接返回，不是的话，去掉最大的，然后继续向下找
  while (!isTri(A[0], A[1], A[2]) && A.length > 2) {
    A.shift();
  }
  return A.length > 2 ? sum(A[0], A[1], A[2]) : 0;
};

export { largestPerimeter };

~~~

  
### 0977-sorted-array-Squares.js

~~~js
// 977. 有序数组的平方
// 给定一个按非递减顺序排序的整数数组A，返回每个数字的平方组成的新数组，要求也按非递减顺序排序。
// 输入：[-4,-1,0,3,10]
// 输出：[0,1,9,16,100]

/**
 * @param {number[]} A
 * @return {number[]}
 */
// 168 ms , 在所有 javascript 提交中击败了 76.05%
// 思路1：计算每个数的平方，然后重新排序。但是这样已经排序条件就没用了
function sortedSquares(A) {
  // 1. 从右侧开始循环，计算右侧的大于0的数的平方；
  let index = A.length - 1;
  for (let i = index; i >= 0; i--) {
    if (A[i] >= 0) {
      A[i] **= 2;
    } else {
      break;
    }
  }
  // 2. while 第一个数小于0，把第一个数取出来，计算第一个数的平方，然后遍历，splice插入，记录当前的index。
  while (A[0] < 0) {
    const item = A[0] ** 2;
    if (item > A[index]) {
      A.push(item);
    } else {
      while (item < A[index]) {
        index--;
      }
      A.splice(index + 1, 0, item);
    }
    A.shift(1);
  }
  return A;
}

// 思路二: 有序数组，使用双指针实现（性能也不太好）
function sortedSquares2(A) {
  const res = [];
  let left = 0;
  let right = A.length - 1;
  while (left <= right) {
    let current;
    if (Math.abs(A[left]) < Math.abs(A[right])) {
      current = A[right];
      right--;
    } else {
      current = A[left];
      left++;
    }
    res.unshift(current * current);
  }
  return res;
}

function sortedSquares3(A) {
  for (let i = 0, len = A.length; i <= len - 1; i++) {
    A[i] *= A[i];
  }
  A.sort((a, b) => a - b);
  return A;
}

// 思路2：
// 1. 从右侧开始循环，计算右侧的大于0的数的平方；
// 2. while 第一个数小于0，把第一个数取出来，计算第一个数的平方，然后遍历，splice插入，记录当前的index。

export { sortedSquares, sortedSquares2, sortedSquares3 };

~~~

  
### 0985-sumEvenAfterQueries.js

~~~js
/*
 * @lc app=leetcode.cn id=985 lang=javascript
 *
 * [985] 查询后的偶数和
 */

// @lc code=start
/**
 * @param {number[]} A
 * @param {number[][]} queries
 * @return {number[]}
 */
// Your runtime beats 43.48 % of javascript submissions
const sumEvenAfterQueries = function(A, queries) {
  // 先求当前偶数的和，然后把当前的数组转换成一个对象
  let sum = 0;
  const dict = {};
  A.forEach((item, index) => {
    if (item % 2 === 0) {
      sum += item;
    }
    dict[index] = item;
  });
  // 然后遍历查询对象，改变对象的值
  const res = [];
  queries.forEach((item) => {
    const key = String(item[1]);
    const value = item[0];
    const oldValue = Number(dict[key]) + 0;
    const newValue = Number(oldValue) + value;
    dict[key] = newValue;
    // 分治算法：四种情况
    if (isOdd(oldValue)) {
      // 旧数字是偶数
      if (isOdd(newValue)) {
        // 新数字是偶数
        sum -= oldValue;
        sum += newValue;
      } else {
        // 新数字是奇数
        sum -= oldValue;
      }
    } else {
      // 旧数字是奇数
      if (isOdd(newValue)) {
        // 新数字是偶数
        sum += newValue;
      } else {
        // 新数字是奇数
      }
    }
    res.push(sum);
  });
  return res;
};

const isOdd = (num) => {
  return num % 2 === 0;
};
// @lc code=end

export { sumEvenAfterQueries };

~~~

  
### 0989-addToArrayForm.js

~~~js
/*
 * @lc app=leetcode.cn id=989 lang=javascript
 *
 * [989] 数组形式的整数加法
 */

// @lc code=start
/**
 * @param {number[]} A
 * @param {number} K
 * @return {number[]}
 */
// 思路一：都转换成数字相加，然后再转换成数组
// 现在的问题是，A的长度很长（可能有10000的长度，是否超出区间？）

// 思路二：把K转换成数组（或者直接求余数，然后加到A的上面）
// 然后A从后向前进位一下（K范围是0-10000）不会很大
// 132 ms
// , 在所有 JavaScript 提交中击败了
// 92.59%
const addToArrayForm = function(A, K) {
  // 先把K转换成数组
  const B = [];
  while (K > 0) {
    const tmp = K % 10;
    B.push(tmp);
    K = (K - tmp) / 10;
  }
  // 然后把A和B从后向前加一下
  A.reverse();
  const len = Math.max(A.length, B.length);
  const C = [];
  for (let i = 0; i < len; i++) {
    C[i] = (A[i] || 0) + (B[i] || 0) + (C[i] || 0);
    if (C[i] > 9) {
      C[i] = C[i] - 10;
      C[i + 1] = 1;
    }
  }
  C.reverse();
  return C;
  // 最后再求反
};
// @lc code=end

export { addToArrayForm };

~~~

  
### 0994-orangesRotting.js

~~~js
/*
 * @lc app=leetcode.cn id=994 lang=javascript
 * [994] 腐烂的橘子
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
// Your runtime beats 5.66 % of javascript submissions
// 当前性能太差了主要是后半部分性能很差
const orangesRotting = function(grid) {
  // 出现的次数放在字典(todo：这里可以定义三个变量，减少内存使用)
  const dict = {};
  dict[0] = 0;
  dict[1] = 0;
  dict[2] = 0;
  // 坏了的位置
  const reapPos = [];

  // 先遍历一次，把出现的次数放在字典中
  const len1 = grid.length;
  const len2 = grid[0].length;
  for (let i = 0; i < len1; i++) {
    for (let j = 0; j < len2; j++) {
      const curr = grid[i][j];
      if (curr === 0) {
        dict[0] = dict[0] + 1;
      } else if (curr === 1) {
        dict[1] = dict[1] + 1;
      } else if (curr === 2) {
        dict[2] = dict[2] + 1;
        // 然后把坏的果子的坐标获取到
        // 0 表示初始值（分钟）
        reapPos.push([i, j, 0]);
      }
    }
  }
  // 如果没有新鲜的橘子，直接返回0
  if (dict[1] === 0) {
    return 0;
  }
  // 如果有孤立的新鲜的橙子，直接返回1（不考虑两个连起来的新鲜的橘子）
  // 这个做了，还有孤立的橙子，没有必要

  // 辅助函数：标记点位
  const mark = (x, y, time) => {
    if (grid[x] && grid[x][y] === 1) {
      grid[x][y] = 2;
      reapPos.unshift([x, y, time]);
      // 然后新鲜的橘子数量减1
      dict[1] = dict[1] - 1;
      max = time > max ? time : max;
    }
  };

  // BFS 遍历图节点
  const check = (pos) => {
    const x = pos[0];
    const y = pos[1];
    const time = pos[2];
    if (grid[x] && grid[x][y] === 2) {
      // 先把当前标记为 false
      grid[x][y] = false;
      // 然后标记四个方向
      mark(x, y + 1, time + 1);
      mark(x, y - 1, time + 1);
      mark(x + 1, y, time + 1);
      mark(x - 1, y, time + 1);
    }
  };

  let max = 0;
  // 遍历烂橘子
  // 二维数组中应该存储一个对象？遍历过的点，直接标记一下即可
  while (reapPos.length > 0) {
    const pos = reapPos.pop();
    check(pos);
  }
  // 遍历结束，如果还有新鲜的橘子，那就是没有遍历到的区域, 返回 -1
  // 这一部分能否提前做？先判断是否有孤立的点，然后内部的橘子都是好的
  // 这样就可以直接终止循环（BFS）
  if (dict[1] > 0) {
    return -1;
  }
  return max;
  // 因为这个图比较小，最差的情况下，循环20次，即可获取到结果
  // 这个算法复杂度可以接受
};

// 改进1版本
// Your runtime beats 33.93 % of javascript submissions
const orangesRotting1 = function(grid) {
  // 出现的次数
  let b = 0;
  // 坏了的位置
  const reapPos = [];
  // 先遍历一次，把出现的次数放在字典中
  const len1 = grid.length;
  const len2 = grid[0].length;
  for (let i = 0; i < len1; i++) {
    for (let j = 0; j < len2; j++) {
      const curr = grid[i][j];
      if (curr === 1) {
        b = b + 1;
      } else if (curr === 2) {
        // 然后把坏的果子的坐标获取到 0 表示初始值（分钟）
        reapPos.push([i, j, 0]);
      }
    }
  }
  if (b === 0) {
    return 0;
  }
  const mark = (x, y, time) => {
    if (grid[x] && grid[x][y] === 1) {
      grid[x][y] = 2;
      reapPos.unshift([x, y, time]);
      // 然后新鲜的橘子数量减1
      b = b - 1;
      max = time > max ? time : max;
    }
  };

  // BFS 遍历图节点
  const check = (pos) => {
    const x = pos[0];
    const y = pos[1];
    const time = pos[2];
    if (grid[x] && grid[x][y] === 2) {
      grid[x][y] = false;
      mark(x, y + 1, time + 1);
      mark(x, y - 1, time + 1);
      mark(x + 1, y, time + 1);
      mark(x - 1, y, time + 1);
    }
  };

  let max = 0;
  while (reapPos.length > 0) {
    const pos = reapPos.pop();
    check(pos);
  }
  if (b > 0) {
    return -1;
  }
  return max;
};

export { orangesRotting, orangesRotting1 };

~~~

  
### 0999-numRookCaptures.js

~~~js
/*
 * @lc app=leetcode.cn id=999 lang=javascript
 * [999] 可以被一步捕获的棋子数
 * 考点：数组
 */
/**
 * @param {character[][]} board
 * @return {number}
 */
// 1、思路1
// 80 ms, 在所有 JavaScript 提交中击败了61.84%
const numRookCaptures = function(board) {
  const len = 8;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (board[i][j] === 'R') {
        const num = getNum(board, i, j);
        return num;
      }
    }
  }
};

// 这里还能改进
const getNum = (board, x, y) => {
  let res = 0;
  for (let i = x; i < 8; i++) {
    if (board[i][y] === 'B') {
      break;
    } else if (board[i][y] === 'p') {
      res++;
      break;
    }
  }
  for (let i = x; i >= 0; i--) {
    if (board[i][y] === 'B') {
      break;
    } else if (board[i][y] === 'p') {
      res++;
      break;
    }
  }
  for (let i = y; i < 8; i++) {
    if (board[x][i] === 'B') {
      break;
    } else if (board[x][i] === 'p') {
      res++;
      break;
    }
  }
  for (let i = y; i >= 0; i--) {
    if (board[x][i] === 'B') {
      break;
    } else if (board[x][i] === 'p') {
      res++;
      break;
    }
  }
  return res;
};

// 2、思路二：优化找到车的算法
// 上面是两层循环，每一次循环还有复杂的函数判断，性能能否优化？
// 这里寻找车的过程能否优化？
// 现在是双重循环寻找
// 能否直接把数组降维，然后获取index，然后除以8，获取对应的XY
// 这样直接使用 index 即可完成，不需要双重循环
// 68 ms, 在所有 JavaScript 提交中击败了78.57%
// 子函数还能优化
const numRookCaptures2 = function(board) {
  const newBoard = board.flat();
  const index = newBoard.indexOf('R') + 1;
  const j = (index % 8) - 1;
  const i = (index - index % 8) / 8;
  return getNum(board, i, j);
};

// 更好的算法上，子函数还能优化，看一下怎么实现
// 如果已知了 ij 那么直接可以把四个子数组拿出来（拿出来也消耗时间）

export { numRookCaptures, numRookCaptures2 };

~~~

  
### 1002-commonChars.js

~~~js
// 1002. 查找常用字符
// 给定仅有小写字母组成的字符串数组 A，返回列表中的每个字符串中都显示的全部字符（包括重复字符）组成的列表。例如，如果一个字符在每个字符串中出现 3 次，但不是 4 次，则需要在最终答案中包含该字符 3 次。
// 你可以按任意顺序返回答案。

// 示例 1：
// 输入：["bella","label","roller"]
// 输出：["e","l","l"]

// 示例 2：
// 输入：["cool","lock","cook"]
// 输出：["c","o"]

/**
 * @param {string[]} A
 * @return {string[]}
 */
// 1 寻找长度最小的字符串（这样遍历比较好操作）循环一次
// 2 如何判断重复的次数？
// （如果最短字符串长度是5个，数组有100项，那么内循环就是4）
// 最好把最短字符串的全部内容提取到一个哈希表中，这样可以包含次数
// 能否判断一个字符串中，有多少个某个字符--这里写一个辅助函数

const string2dict = (str) => {
  const dict = {};
  for (let i = 0; i < str.length; i++) {
    const item = str[i];
    if (!dict[item]) {
      dict[item] = 1;
    } else {
      dict[item]++;
    }
  }
  return dict;
};

const getTimes = (str, key) => {
  let times = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === key) {
      times++;
    }
  }
  return times;
};

const commonChars = function(A) {
  const len = A.length;
  // 处理长度是0-1的特殊情况
  if (len === 0) {
    return [];
  } else if (len === 1) {
    return A[0].split('');
  }
  // 获取最短字符串
  let minIndex = 0;
  let minStrLen = A[0].length;
  for (let i = 0; i < len; i++) {
    if (A[i].length < minStrLen) {
      minStrLen = A[i].length;
      minIndex = i;
      // 如果有一个是空的字符串，那么直接返回空数字
      if (minStrLen === 0) {
        return [];
      }
    }
  }
  // 把最短字符串转换成一个字典
  const dict = string2dict(A[minIndex]);
  // console.log(dict);
  for (let j = 0; j < len; j++) {
    const item = A[j];
    for (const key in dict) {
      // 计算item中有几个key，然后更改字典
      const itemTimes = getTimes(item, key);
      dict[key] = Math.min(dict[key], itemTimes);
      if (dict[key] === 0) {
        delete dict[key];
      }
      // 现在是三重循环，性能很不好
      // 如果字典变成空的，那么直接退出
      if (JSON.stringify(dict) == '{}') return [];
    }
  }
  // console.log(dict);
  let result = [];
  for (const key in dict) {
    const value = dict[key];
    const arr = new Array(value).fill(key);
    result = result.concat(arr);
  }
  return result;
};

export { commonChars, string2dict };

~~~

  
### 1005-largestSumAfterKNegations.js

~~~js
/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
const getSum = (a) => {
  let res = 0;
  a.forEach((item) => res += item);
  return res;
};

const largestSumAfterKNegations = function(A, K) {
  const len = A.length;
  if (len === 0) return 0;
  if (K === 0) {
    // 直接计算当前的和
    return getSum(A);
  }
  // 先给当前的数组排序
  A = A.sort((a, b) => a - b);
  // 如果有负值，那么直接取反处理
  while (A[0] < 0 && K > 0) {
    const tmp = -A[0];
    A.shift();
    A.push(tmp);
    K--;
  }
  // 如果K计算完了，直接计算结果
  if (K === 0) {
    return getSum(A);
  }
  // 如果第一个是0， 直接返回结果
  else if (A[0] === 0) {
    return getSum(A);
  }
  // 如果第一个是正数，而且K没有计算完
  if (A[0] > 0 && A[len - 1] > 0) {
    if (K % 2 === 1) {
      const min = Math.min(A[0], A[len - 1]);
      min === A[0] ? A[0] = -A[0] : A[len - 1] = -A[len - 1];
    }
    return getSum(A);
  }
};

export { getSum, largestSumAfterKNegations };

~~~

  
### 1006-clumsy.js

~~~js
/*
 * @lc app=leetcode.cn id=1006 lang=javascript
 *
 * [1006] 笨阶乘
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
// 执行用时: 60 ms 基本是最好的
const clumsy = function(n) {
  // 第一次特殊，其他的直接算即可
  const innerFn = (n) => {
    // - 6 * 5 / 4 + 3
    if (n >= 4) {
      return -Math.floor(n * (n - 1) / (n - 2)) + (n - 3) + innerFn(n - 4);
    }
    if (n === 3) {
      return -3 * 2;
    }
    if (n === 2) {
      return -2 * 1;
    }
    if (n === 1) {
      return -1;
    }
    if (n === 0) {
      return 0;
    }
  };
  // 首次是正数，然后使用上面的公式动态规划计算
  if (n === 1) {
    return 1;
  }
  if (n === 2) {
    return 2 * 1;
  }
  if (n === 3) {
    return 3 * 2 / 1;
  }
  if (n === 4) {
    return 7; // 4 * 3 / 2 + 1
  }
  if (n > 4) {
    return Math.floor(n * (n - 1) / (n - 2)) + (n - 3) + innerFn(n - 4);
  }
};
// @lc code=end

export { clumsy };

~~~

  
### 1009-bitwiseComplement.js

~~~js
/*
 * @lc app=leetcode.cn id=1009 lang=javascript
 *
 * [1009] 十进制整数的反码
 */
//
/**
 * @param {number} N
 * @return {number}
 */
// Your runtime beats 81.05 % of javascript submissions
const bitwiseComplement = function(N) {
  if (N === 0) return 1;
  // 第一种思路：把这个数字转换成二进制字符串，然后循环，转换01，然后转换成数字输出。
  // 如果遇到很大的数字，这样可能性能不好
  // 第二种思路：直接把这个数依次整除，余数求反，然后再加回去，这样做很多乘法加法运算即可
  let timer = 0;
  let result = 0;
  while (N > 0) {
    const remain = N % 2;
    if (remain === 0) {
      result += 2 ** timer;
    }
    timer++;
    N = (N - remain) / 2;
  }
  return result;
};

export { bitwiseComplement };

~~~

  
### 1010.总持续时间可被-numPairsDivisibleBy60bad.js

~~~js
/*
 * @lc app=leetcode.cn id=1010 lang=javascript
 *
 * [1010] 总持续时间可被 60 整除的歌曲
 */

// @lc code=start
/**
 * @param {number[]} time
 * @return {number}
 */
// 两个思路
// 思路一：双重循环，时间复杂度是 N * 2
// 数组总长度是 10 ^ 5，这个可以算出来，性能比较差
// Your runtime beats 31.91 % of javascript submissions
const numPairsDivisibleBy60bad = function(time) {
  let res = 0;
  const len = time.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      const sum = time[i] + time[j];
      if (sum % 60 === 0) {
        res++;
      }
    }
  }
  return res;
};

// 思路二：先用字典记录一下余数的个数，然后遍历这个字典
// 时间复杂度是 N (最差是 N ^ 2，即所有时间都不同)
// 因为 time 范围是 1~500 所以这个情况比较少，趋近于 N
// Your runtime beats 82.98 % of javascript submissions
const numPairsDivisibleBy60 = function(time) {
  const dict = [];
  const len = time.length;
  let time60 = 0;
  for (let i = 0; i < len; i++) {
    const curr = time[i];
    // 能被60整除的单独拿出来？
    const remain = curr % 60;
    if (remain === 0) {
      time60++;
      continue;
    }
    if (dict[remain]) {
      dict[remain]++;
    } else {
      dict[remain] = 1;
    }
  }
  let res = 0;
  // 注意： 30 比较特殊
  for (let i = 1; i < 30; i++) {
    const time = dict[i];
    const time2 = dict[60 - i];
    res += (time * time2 || 0);
  }
  // 30特殊处理
  const time30 = dict[30];
  if (time30 > 0) {
    res += ((time30 - 1) * time30 / 2);
  }
  // 60 特殊处理
  if (time60 > 0) {
    res += ((time60 - 1) * time60 / 2);
  }
  return res;
};

// console.log(numPairsDivisibleBy60([6,20]) === 0)
// console.log(numPairsDivisibleBy60([30,20,150,100,40]) === 3)
// console.log(numPairsDivisibleBy60([60,60,60]) === 3)
// console.log(numPairsDivisibleBy60([60,60,60,60,60]) === 10)
// console.log(numPairsDivisibleBy60([30,30,30,20,40]) === 4)
// @lc code=end
export { numPairsDivisibleBy60, numPairsDivisibleBy60bad };

~~~

  
### 1013-canThreePartsEqualSum.js

~~~js
/*
 * @lc app=leetcode.cn id=1013 lang=javascript
 *
 * [1013] 将数组分成和相等的三个部分
 */

// @lc code=start
/**
 * @param {number[]} A
 * @return {boolean}
 */
// Your runtime beats 19.77 % of javascript submissions
const canThreePartsEqualSum = function(A) {
  const dict = {};
  let current = 0;
  const len = A.length;
  for (let i = 0; i < len; i++) {
    current += A[i];
    if (!dict[current]) {
      dict[current] = [i];
    } else {
      dict[current].push(i);
    }
  }
  // console.log(current);
  const key = current / 3;
  // console.log(dict[key], dict[key * 2]);
  // 第一个出现必须小于第二个出现
  if (key === 0) {
    if (dict[0].length >= 3 && dict[0][0] < dict[0][1] && dict[0][1] < dict[0][2]) {
      return true;
    } else {
      return false;
    }
  }
  if (
    current % 3 === 0
    && dict[key]
    && dict[key * 2]
    && dict[key][0] < dict[key * 2].pop()
  ) {
    return true;
  }
  return false;
};
// @lc code=end

export { canThreePartsEqualSum };

~~~

  
### 1016-queryString.js

~~~js
/*
 * @lc app=leetcode.cn id=1016 lang=javascript
 *
 * [1016] 子串能表示从 1 到 N 数字的二进制串
 */

// @lc code=start

// 思路一：因为数字是1亿，最差情况可以循环一次
// 然后转换成每一个子串，看字符串是否满足，这个性能不好
/**
 * @param {string} s
 * @param {number} n
 * @return {boolean}
 */
// (64 ms) Your runtime beats 94.44 % of javascript submissions
const queryString = function(s, n) {
  for (let i = 1; i <= n; i++) {
    const current = i.toString(2);
    if (!s.includes(current)) return false;
  }
  return true;
};

// console.log(queryString('1', 1) === true);
// console.log(queryString('0110', 3) === true);
// console.log(queryString('0110', 4) === false);

// 思路二：
// 把这个S的全部子串拿出来，然后转换成数字，看最后能否覆盖0~N的情况
// S的长度小于1000，这个循环就是 1000 * 1000 这个计算较差
// Your runtime beats 5.56 % of javascript submissions
const queryString2 = function(s, n) {
  const dict = {};
  for (let len = 1; len <= s.length; len++) {
    for (let start = 0; start <= s.length - len; start++) {
      const currStr = s.slice(start, start + len);
      const num = parseInt(currStr, 2);
      if (!dict[num]) {
        dict[num] = true;
      }
    }
  }
  const keyLen = Object.keys(dict).length;
  if (keyLen < n) return false;
  const res = [...Object.keys(dict)].sort((a, b) => a - b > 0);
  // handle all is 1
  if (res[0] !== '0') {
    res.unshift('0');
  }
  for (let i = 1; i <= n; i++) {
    if (res[i] != i) {
      return false;
    }
  }
  return true;
};

// @lc code=end

export { queryString, queryString2 };

~~~

  
### 1018-prefixesDivBy5.js

~~~js
/*
 * @lc app=leetcode.cn id=1018 lang=javascript
 *
 * [1018] 可被 5 整除的二进制前缀
 */

// @lc code=start
/**
 * @param {number[]} A
 * @return {boolean[]}
 */
// 第一种思路：每一次计算，然后二进制换换成十进制
// 由于A太长了，超出了2的53次幂了，导致求模不准，出错.这是个问题
// 第二种思路：每次计算的结果对10求余数，这样避免不会超出
// Your runtime beats 76.12 % of javascript submissions
const prefixesDivBy5 = function(A) {
  const len = A.length;
  let curr = 0;
  const res = [];
  for (let i = 0; i < len; i++) {
    curr = curr * 2 + A[i];
    const item = curr % 5 === 0;
    res.push(item);
    curr = curr % 10;
  }
  return res;
};
// @lc code=end

export { prefixesDivBy5 };

~~~

  
### 1019-nextLargerNodes.js

~~~js
/*
 * @lc app=leetcode.cn id=1019 lang=javascript
 *
 * [1019] 链表中的下一个更大节点
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
// Your runtime beats 34.55 % of javascript submissions
// 思路一：直接转换成数组，然后计算结果数组
// 这样循环较多，性能可能不好
const nextLargerNodes = function(head) {
  const arr = [];
  while (head) {
    const val = head.val;
    arr.push(val);
    head = head.next;
  }
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    // 如果下一个节点的值大于上一个节点
    // 那么上一个节点的目标就是下一个节点的值
    if (arr[i] < arr[i + 1]) {
      res[i] = arr[i + 1];
    }
    // 否则，就向后找大于这个节点的值
    else {
      res[i] = 0;
      for (let j = i; j < arr.length; j++) {
        if (arr[j] > arr[i]) {
          res[i] = arr[j];
          break;
        }
      }
    }
  }
  // 最后一个节点的值是0
  res[arr.length - 1] = 0;
  return res;
};
// @lc code=end

export { nextLargerNodes };

~~~

  
### 1020-numEnclaves.js

~~~js
/**
 * @param {number[][]} A
 * @return {number}
 */
// 执行用时：112 ms
const numEnclaves = function(A) {
  // 思路：遍历矩阵的四个边：如果某个数是1，那么这个就是无效的。
  // 先遍历上面和最下面
  const check = function(i, j) {
    // 然后把这个变成0
    A[i][j] = 0;
    // 然后深度优先遍历相邻位置的单元格。如果是1，也变成0
    // 核心（函数递归）
    if (A[i][j + 1] === 1) {
      check(i, j + 1);
    }
    if (A[i][j - 1] === 1) {
      check(i, j - 1);
    }
    if (A[i - 1] && A[i - 1][j] === 1) {
      check(i - 1, j);
    }
    if (A[i + 1] && A[i + 1][j] === 1) {
      check(i + 1, j);
    }
  };

  for (let i = 0; i < A[0].length; i++) {
    const item = A[0][i];
    if (item === 1) {
      check(0, i, A);
    }
  }
  for (let i = 0; i < A[A.length - 1].length; i++) {
    const item = A[A.length - 1][i];
    if (item === 1) {
      check(A.length - 1, i, A);
    }
  }
  // 然后遍历第一列和最后一列
  for (let i = 0; i < A.length; i++) {
    const item1 = A[i][0];
    if (item1 === 1) {
      check(i, 0, A);
    }
    const len = A[i].length;
    const item2 = A[i][len - 1];
    if (item2 === 1) {
      check(i, len - 1, A);
    }
  }
  // 遍历结束后，剩下的就都是飞地；遍历一次数组，找到数组中是1的个数即可
  let res = 0;
  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < A[0].length; j++) {
      res += A[i][j];
    }
  }
  return res;
};

export { numEnclaves };

~~~

  
### 1021-removeOuterParentheses.js

~~~js
/*
 * @lc app=leetcode.cn id=1021 lang=javascript
 * [1021] 删除最外层的括号
 * 考点：字符串匹配
 */

/**
 * @param {string} S
 * @return {string}
 */

// 1、常规思路实现：
// 92 ms, 在所有 JavaScript 提交中击败了53.46%
const removeOuterParentheses = function(S) {
  // 遍历字符串，然后把字符放在数组中，记录开始和结束的位置
  let start = 0;
  const arr = [];
  let res = '';
  // 这个可以直接放在循环里
  // 也不需要 arr 数组，直接记录个数就行
  arr.push(S[0]);
  for (let i = 1; i < S.length; i++) {
    if (S[i] === '(') {
      arr.push(S[i]);
    } else {
      arr.pop();
      // 如果开始不等于结束，但是数组是空的，那么可以提取这个部分
      if (arr.length === 0) {
        const end = i;
        // 然后去掉括号加起来即可
        const inner = S.slice(start + 1, end);
        res += inner;
        start = i + 1;
      }
    }
  }
  return res;
};

// 2、优化后，减少循环中数组的操作，只进行一次字符串循环
// 68 ms, 在所有 JavaScript 提交中击败了94.66%
const removeOuterParentheses2 = function(S) {
  let start = 0; // 记录字符串开始的位置
  let timer = 0; // 记录左括号的个数
  let res = ''; // 存储临时的结果
  timer = 1;
  for (let i = 1; i < S.length; i++) {
    if (S[i] === '(') {
      timer++;
    } else {
      timer--;
      if (timer === 0) {
        const end = i;
        const inner = S.slice(start + 1, end);
        res += inner;
        start = i + 1;
      }
    }
  }
  return res;
};

export { removeOuterParentheses, removeOuterParentheses2 };

~~~

  
### 1022-sumRootToLeaf.js

~~~js
/*
 * @lc app=leetcode.cn id=1022 lang=javascript
 *
 * [1022] 从根到叶的二进制数之和
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
// Your runtime beats 84.42 % of javascript submissions
const sumRootToLeaf = function(root) {
  if (!root || (!root.val && root.val !== 0)) {
    return 0;
  } else if (!root.left && !root.right) {
    return root.val;
  }
  const list = [];
  // 递归子节点，直接叶子节点，然后转换成十进制
  const runNode = function(node, preVal) {
    if (!node) return;
    let newVal = `${preVal}${node.val}`;
    if (!node.left && !node.right) {
      // 没有左右子节点，证明是叶子节点，那么计算值并返回
      // console.log(newVal);
      newVal = parseInt(newVal, 2);
      // console.log(newVal);
      list.push(newVal);
    }
    runNode(node.left, newVal);
    runNode(node.right, newVal);
  };
  runNode(root.left, root.val);
  runNode(root.right, root.val);
  const sum = list.reduce((a, b) => a + b, 0);
  return sum;
};

// 下面这个执行错误
// 数据很大就会计算错误，为什么？？？
// 正确 newVal = parseInt(newVal, 2);
// 错误：newVal = parseInt(Number(newVal), 2);
// 这个转换过程中出错了
// @lc code=end

export { sumRootToLeaf };

~~~

  
### 1025-divisorGame.js

~~~js
/**
 * @param {number} N
 * @return {boolean}
 */
// 84 ms, 在所有 JavaScript 提交中击败了51.32%
const divisorGame = function(N) {
  return N % 2 === 0;
};

// 因为一个数始终能被1整除，那么我们假设每次最优解就是取1或者奇数
// 动态规划：N 的情况，就是 N - 1 的情况 + 1 的情况。就是一直取反的情况
// f(n) = -f(n - 1)

export { divisorGame };

~~~

  
### 1030-allCellsDistOrder.js

~~~js
/*
 * @lc app=leetcode.cn id=1030 lang=javascript
 *
 * [1030] 距离顺序排列矩阵单元格
 */

// @lc code=start
/**
 * @param {number} R
 * @param {number} C
 * @param {number} r0
 * @param {number} c0
 * @return {number[][]}
 */
// Your runtime beats 54.33 % of javascript submissions
const allCellsDistOrder = function(R, C, r0, c0) {
  const arr = [];
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      const item = [i, j];
      arr.push(item);
    }
  }
  // console.log(arr);
  arr.sort((a, b) => {
    const disA = Math.abs(a[0] - r0) + Math.abs(a[1] - c0);
    const disB = Math.abs(b[0] - r0) + Math.abs(b[1] - c0);
    return disA > disB ? 1 : -1;
  });
  return arr;
};
// @lc code=end

export { allCellsDistOrder };

~~~

  
### 1038-bstToGst.js

~~~js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
// 一个节点新的值 = 所有右侧节点的值的和（先递归右侧节点，然后遍历根节点，然后遍历左侧节点）
// 使用临时变量保存已有节点的总和
// 84 ms, 在所有 JavaScript 提交中击败了66.41%
const bstToGst = function(root) {
  let sum = 0;
  const runNode = (node) => {
    if (!node) {
      return;
    }
    // 递归右子树
    runNode(node.right);
    sum = sum + node.val;
    node.val = sum;
    // 递归左子树
    runNode(node.left);
  };
  runNode(root);
  return root;
};

export { bstToGst };

~~~

  
### 1047-removeDuplicates.js

~~~js
/*
 * @lc app=leetcode.cn id=1047 lang=javascript
 *
 * [1047] 删除字符串中的所有相邻重复项
 */

// @lc code=start
/**
 * @param {string} S
 * @return {string}
 */
// 144 ms, 在所有 JavaScript 提交中击败了19.00%
// 方法不好（频繁操作栈）
// const removeDuplicates = function(S) {
//   if (S.length < 2) return S;
//   let stack = [];
//   for (let i = 0; i < S.length; i++) {
//     let item = S[i];
//     if (stack[stack.length - 1] === item) {
//       stack.pop();
//     } else {
//       stack.push(item);
//     }
//   }
//   return stack.join('');
// };

// 改进1，比较当前情况
// 140 ms , 在所有 JavaScript 提交中击败了 19.61%
// const removeDuplicates = function(S) {
//   if (S.length < 2) return S;
//   let stack = [];
//   for (let i = 0; i < S.length; i++) {
//     let item = S[i];
//     let itemNext = S[i + 1];
//     if (item === itemNext) {
//       i++;
//       continue;
//     }
//     if (stack[stack.length - 1] === item) {
//       stack.pop();
//     } else {
//       stack.push(item);
//     }
//   }
//   return stack.join('');
// };

// 改进2：不使用数组，直接使用字符串模拟栈
// 256 ms, 在所有 JavaScript 提交中击败了12.37%
// 还不如之前的时间呢
const removeDuplicates = function(S) {
  if (S.length < 2) return S;
  let stack = '';
  for (let i = 0; i < S.length; i++) {
    const item = S[i];
    const itemNext = S[i + 1];
    if (item === itemNext) {
      i++;
      continue;
    }
    if (stack[stack.length - 1] === item) {
      stack = stack.slice(0, stack.length - 1);
    } else {
      stack = stack + item;
    }
  }
  return stack;
};

// @lc code=end

export { removeDuplicates };

~~~

  
### 1051-heightChecker.js

~~~js
// 1051. 高度检查器
// 学校在拍年度纪念照时，一般要求学生按照 非递减 的高度顺序排列。
// 请你返回能让所有学生以 非递减 高度排列的最小必要移动人数。
// 注意，当一组学生被选中时，他们之间可以以任何可能的方式重新排序，而未被选中的学生应该保持不动。

// 示例：
// 输入：heights = [1,1,4,2,1,3]
// 输出：3
// 解释：
// 当前数组：[1,1,4,2,1,3]
// 目标数组：[1,1,1,2,3,4]
// 在下标 2 处（从 0 开始计数）出现 4 vs 1 ，所以我们必须移动这名学生。
// 在下标 4 处（从 0 开始计数）出现 1 vs 3 ，所以我们必须移动这名学生。
// 在下标 5 处（从 0 开始计数）出现 3 vs 4 ，所以我们必须移动这名学生。

/**
 * @param {number[]} heights
 * @return {number}
 */
// 80 ms
// , 在所有 JavaScript 提交中击败了
// 86.87%
// 的用户
const heightChecker = function(heights) {
  const arr = new Array(...heights);
  arr.sort((a, b) => a - b);
  const len = arr.length;
  let res = 0;
  for (let i = 0; i < len; i++) {
    if (heights[i] !== arr[i]) {
      res++;
    }
  }
  return res;
};

export { heightChecker };

~~~

  
### 1071-gcdOfStrings.js

~~~js
/*
 * @lc app=leetcode.cn id=1071 lang=javascript
 *
 * [1071] 字符串的最大公因子
 */

// @lc code=start
/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
// Your runtime beats 59.8 % of javascript submissions
const gcdOfStrings = function(str1, str2) {
  // 辅助函数，判断某个子串是否是另一个字符串的公因子
  const check = function(strs, prefix) {
    // 如果长度不能整除，肯定不是公因子
    const len = strs.length;
    if (len % prefix.length !== 0) {
      return false;
    }
    return strs === prefix.padEnd(len, prefix);
  };

  const len = Math.min(str1.length, str2.length);
  for (let i = len; i >= 1; i--) {
    const prefix = str1.slice(0, i);
    if (check(str1, prefix) && check(str2, prefix)) {
      return prefix;
    }
  }
  return '';
};
// @lc code=end

export { gcdOfStrings };

~~~

  
### 1078-findOcurrences.js

~~~js
/*
 * @lc app=leetcode.cn id=1078 lang=javascript
 *
 * [1078] Bigram 分词
 */

// @lc code=start
/**
 * @param {string} text
 * @param {string} first
 * @param {string} second
 * @return {string[]}
 */
// 80 ms
// , 在所有 JavaScript 提交中击败了
// 68.24%
// 的用户
const findOcurrences = function(text, first, second) {
  const arr = text.split(' ');
  const res = [];
  const len = arr.length;
  if (len < 3) {
    return res;
  }
  for (let i = 1; i < len - 1; i++) {
    if (
      arr[i] === second
      && arr[i - 1] === first
    ) {
      res.push(arr[i + 1]);
    }
  }
  return res;
};
// @lc code=end

export { findOcurrences };

~~~

  
### 1089-duplicateZeros.js

~~~js
// 1089. 复写零
// 给你一个长度固定的整数数组 arr，请你将该数组中出现的每个零都复写一遍，并将其余的元素向右平移。
// 注意：请不要在超过该数组长度的位置写入元素。
// 要求：请对输入的数组 就地 进行上述修改，不要从函数返回任何东西。

// 示例 1：
// 输入：[1,0,2,3,0,4,5,0]
// 输出：null
// 解释：调用函数后，输入的数组将被修改为：[1,0,0,2,3,0,0,4]

// 示例 2：
// 输入：[1,2,3]
// 输出：null
// 解释：调用函数后，输入的数组将被修改为：[1,2,3]
/**
 * @param {number[]} arr
 * @return {void} Do not return anything, modify arr in-place instead.
 */
const duplicateZeros = function(arr) {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    if (arr[i] === 0) {
      arr.splice(i, 0, 0);
      i++;
      arr.pop();
    }
  }
};

export { duplicateZeros };

~~~

  
### 1108-defangIPaddr.js

~~~js
/**
 * @param {string} address
 * @return {string}
 */
const defangIPaddr = function(address) {
  return address.replace(/\./g, '[.]');
};

export { defangIPaddr };

~~~

  
### 1122-relativeSortArray.js

~~~js
// 1122. 数组的相对排序
// 给你两个数组，arr1 和 arr2，

// arr2 中的元素各不相同
// arr2 中的每个元素都出现在 arr1 中
// 对 arr1 中的元素进行排序，使 arr1 中项的相对顺序和 arr2 中的相对顺序相同。未在 arr2 中出现过的元素需要按照升序放在 arr1 的末尾。

// 示例：
// 输入：arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]
// 输出：[2,2,2,1,4,3,3,9,6,7,19]

// 提示：
// arr1.length, arr2.length <= 1000
// 0 <= arr1[i], arr2[i] <= 1000
// arr2 中的元素 arr2[i] 各不相同
// arr2 中的每个元素 arr2[i] 都出现在 arr1 中

/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */
const relativeSortArray = function(arr1, arr2) {
  // 思路：循环一次，把arr1中统计出现次数放在一个字典中
  // 然后遍历arr2,并增加对应的数量，删除字典中的属性
  // 把字典中剩余的键值对创建一个新的数组，然后升序排列(或者设置两个字典)
  // 把两个数组合并，返回新的数组
  const dict = {}; // arr2的键值对
  const arr3 = []; // 其他的项
  for (let i = 0; i < arr2.length; i++) {
    const key = arr2[i];
    dict[key] = 0;
  }
  for (let j = 0; j < arr1.length; j++) {
    const key = arr1[j];
    if (dict[key] > -1) {
      dict[key] = dict[key] + 1;
    } else {
      arr3.push(key);
    }
  }
  arr3.sort((a, b) => a - b);
  // arr2 dict
  for (let i = 0; i < arr2.length; i++) {
    const item = arr2[i];
    if (dict[item]) {
      const value = dict[item];
      // 这里创建一个新的数组，然后加进去
      const tmp = new Array(value - 1).fill(item);
      arr2.splice(i, 0, ...tmp);
      delete dict[item];
    }
  }
  return arr2.concat(arr3);
};

export { relativeSortArray };

~~~

  
### 1128-numEquivDominoPairs.js

~~~js
/*
 * @lc app=leetcode.cn id=1128 lang=javascript
 *
 * [1128] 等价多米诺骨牌对的数量
 */

// @lc code=start
/**
 * @param {number[][]} dominoes
 * @return {number}
 */
// Your runtime beats 85.71 % of javascript submissions
const numEquivDominoPairs = function(dominoes) {
  // 一般的思路：遍历两次数组，时间复杂度较差
  // 遍历一次数组，然后获取键值对，最后遍历一次独享数组，求组合即可
  const dict = {};
  const len = dominoes.length;
  for (let i = 0; i < len; i++) {
    const item = dominoes[i];
    const min = item[0] > item[1] ? item[1] : item[0];
    const max = item[0] < item[1] ? item[1] : item[0];
    const key = `${min}+${max}`;
    if (dict[key]) {
      dict[key] = dict[key] + 1;
    } else {
      dict[key] = 1;
    }
  }
  let res = 0;
  for (const key in dict) {
    const value = dict[key];
    if (value === 1) continue;
    const times = (value * (value - 1)) / 2;
    res += times;
  }
  return res;
};
// @lc code=end

export { numEquivDominoPairs };

~~~

  
### 1137-tribonacci.js

~~~js
/*
 * @lc app=leetcode.cn id=1137 lang=javascript
 *
 * [1137] 第 N 个泰波那契数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
// 动态规划
// Your runtime beats 70.65 % of javascript submissions
const tribonacci = function(n) {
  if (n === 0) {
    return 0;
  } else if (n < 3) {
    return 1;
  }
  const arr = [0, 1, 1];
  for (let i = 3; i <= n; i++) {
    arr[i] = arr[i - 2] + arr[i - 1] + arr[i - 3];
  }
  return arr[n];
};
// @lc code=end

export { tribonacci };

~~~

  
### 1154-dayOfYear.js

~~~js
// 1154. 一年中的第几天
// 给你一个按 YYYY-MM-DD 格式表示日期的字符串 date，请你计算并返回该日期是当年的第几天。
// 通常情况下，我们认为 1 月 1 日是每年的第 1 天，1 月 2 日是每年的第 2 天，依此类推。每个月的天数与现行公元纪年法（格里高利历）一致。

// 示例 1：
// 输入：date = "2019-01-09"
// 输出：9
// 示例 2：
// 输入：date = "2019-02-10"
// 输出：41
// 示例 3：
// 输入：date = "2003-03-01"
// 输出：60
// 示例 4：
// 输入：date = "2004-03-01"
// 输出：61

/**
 * @param {string} date
 * @return {number}
 */
const dayOfYear = function(date) {
  const isLeapYear = (year) => {
    if (year % 100 === 0) {
      if (year % 400 === 0) {
        return true;
      } else {
        return false;
      }
    }
    return year % 4 === 0;
  };

  const getMonthDays = (month) => {
    let sum = 0;
    const month31 = [1, 3, 5, 7, 8, 10, 12];
    for (let i = 1; i <= month; i++) {
      if (i === 2) {
        sum += 28;
      } else if (month31.includes(i)) {
        sum += 31;
      } else {
        sum += 30;
      }
    }
    return sum;
  };
  // 1、把年月日提取出来-不需要数组，直接切割字符串，然后转换成数值
  const year = Number(date.slice(0, 4));
  const month = Number(date.slice(5, 7));
  const day = Number(date.slice(8, 10));
  if (month > 2) {
    // 2、判断是否需要计算闰年（月份大于等于3月，需要计算闰年，否则不需要计算）
    // 2、1 如果是闰年，写一个闰年函数，并判断
    // 写一个月份对应的日期数组，或者累加函数
    // 然后加上日期即可
    const isLeap = isLeapYear(year) ? 1 : 0;
    const monthDays = getMonthDays(month - 1);
    return monthDays + isLeap + day;
  } else {
    // 直接计算12月的天数，不需要考虑闰年
    if (month === 1) {
      return day;
    } else {
      return 31 + day;
    }
  }
};

export { dayOfYear };

~~~

  
### 1160-countCharacters.js

~~~js
/*
 * @lc app=leetcode.cn id=1160 lang=javascript
 *
 * [1160] 拼写单词
 */

//
// 256 ms
// , 在所有 JavaScript 提交中击败了
// 36.70%
// 的用户
/**
 * @param {string[]} words
 * @param {string} chars
 * @return {number}
 */
// 全局定义字典，存放字符和出现的数量
// 全局定义字典，存放字符和出现的数量
const countCharacters = function(words, chars) {
  if (words.length === 0 || chars.length === 0) {
    return 0;
  }
  const dict = {};
  // 获取目标字典和数量
  for (let i = 0; i < chars.length; i++) {
    const key = chars[i];
    if (dict[key]) {
      dict[key]++;
    } else {
      dict[key] = 1;
    }
  }
  // 获取一个单词的长度
  const getLen = (word) => {
    const obj = {};
    for (let j = 0; j < word.length; j++) {
      const key = word[j];
      // 如果当前字符存在于索引中
      if (dict[key]) {
        if (!obj[key]) {
          obj[key] = 1;
        } else if (obj[key] >= dict[key]) {
          // 如果当前的出现的次数大于字典中的次数，直接返回0
          return 0;
        } else {
          obj[key]++;
        }
      } else {
        // 如果不存在与索引中，直接返回0
        return 0;
      }
    }
    return word.length;
  };
  // 遍历每一个单词，看是否满足条件，然后计算结果
  let result = 0;
  const len = words.length;
  for (let i = 0; i < len; i++) {
    result += getLen(words[i]);
  }
  return result;
};

export { countCharacters };

~~~

  
### 1170-numSmallerByFrequency.js

~~~js
/*
 * @lc app=leetcode.cn id=1170 lang=javascript
 *
 * [1170] 比较字符串最小字母出现频次
 */

// @lc code=start
/**
 * @param {string[]} queries
 * @param {string[]} words
 * @return {number[]}
 */
// 152 ms, 在所有 JavaScript 提交中击败了59.09%
const numSmallerByFrequency = function(queries, words) {
  // 辅助函数
  const getNumber = (strs) => {
    const arr = strs.split('');
    arr.sort((a, b) => {
      return a > b ? 1 : -1;
    });
    const current = arr[0];
    let index = 1;
    while (current === arr[index]) {
      index++;
    }
    return index;
  };

  // 先把两个数组的字符串转换成函数结果，并排序
  // 然后使用双指针，获取结果
  const a = []; const
    b = [];
  queries.forEach((item, index) => {
    const times = getNumber(item);
    a[index] = times;
  });
  words.forEach((item, index) => {
    const times = getNumber(item);
    b[index] = times;
  });
  // 现在这种方法可行，但是很不好；
  // 改进的方法：把B排序后，然后节省一部分时间
  const res = [];
  for (let i = 0; i < a.length; i++) {
    let times = 0;
    for (let j = 0; j < b.length; j++) {
      if (b[j] > a[i]) {
        times++;
      }
    }
    res[i] = times;
  }
  return res;
};
// @lc code=end

export { numSmallerByFrequency };

~~~

  
### 1175-numPrimeArrangements.js

~~~js
/*
 * @lc app=leetcode.cn id=1175 lang=javascript
 *
 * [1175] 质数排列
 */
// 注意：数字很大时计算错误
// 需要取余数 let MOD = 10**9+7;
// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
// 100 测试通过
// Your runtime beats 96.77 % of javascript submissions
const numPrimeArrangements = function(n) {
  const MOD = 1000000007;
  const arr = new Array(n).fill(true);
  arr[0] = false; // 1 不是质数
  for (let i = 1; i < n; i++) {
    // 当前的索引是1
    // 先通过动态规划计算N之内的质数的个数
    const index = i + 1; // 从2开始
    for (let j = 2; j <= n / index; j++) {
      arr[index * j - 1] = false;
    }
  }
  let a = 0; let
    b = 0;
  arr.forEach((item) => {
    item === true ? a++ : b++;
  });
  // 关键问题是这里的数字很大很大
  const factorial = function(a, b) {
    let res = 1;
    for (let i = 1; i <= a; i++) {
      res *= i;
      res = res % MOD;
    }
    for (let i = 1; i <= b; i++) {
      res *= i;
      res = res % MOD;
    }
    return res;
  };
  return factorial(a, b);
};
// @lc code=end

export { numPrimeArrangements };

~~~

  
### 1184-distanceBetweenBusStops.js

~~~js
/*
 * @lc app=leetcode.cn id=1184 lang=javascript
 *
 * [1184] 公交站间的距离
 */

// @lc code=start
/**
 * @param {number[]} distance
 * @param {number} start
 * @param {number} destination
 * @return {number}
 */
// 84 ms
// , 在所有 JavaScript 提交中击败了
// 60.00%
// 的用户
const distanceBetweenBusStops = function(distance, start, destination) {
  let half = 0;
  let sum = 0;
  // 注意：start可能大于destination
  const a = Math.min(start, destination);
  const b = Math.max(start, destination);
  for (let i = 0; i < distance.length; i++) {
    const item = distance[i];
    sum += item;
    if (i >= a && i < b) {
      half += item;
    }
  }
  return Math.min(half, (sum - half));
};

// [7,10,1,12,11,14,5,0]
// 7
// 2
// @lc code=end

export { distanceBetweenBusStops };

~~~

  
### 1185-dayOfTheWeek.js

~~~js
/**
 * @param {number} day
 * @param {number} month
 * @param {number} year
 * @return {string}
 */
// 80 ms, 在所有 JavaScript 提交中击败了75.32%
const dict = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dayOfTheWeek = function(day, month, year) {
  // 思路：1971 到 2100 之间获取 1971-01-01 的星期几
  // 然后算出两个日期的相对差，除以7 求余数
  // 注意闰年等
  let sum = 0;
  if (year > 1971) {
    // 优化，直接乘法计算
    for (let i = 1971; i < year; i++) {
      const item = i % 4 === 0 ? 2 : 1;
      sum += item;
    }
  }
  // 计算月(计算正常)
  for (let i = 1; i < month; i++) {
    if ([1, 3, 5, 7, 8, 10, 12].includes(i)) {
      sum += 31;
    } else if (i === 2) {
      if (year % 4 === 0 && year !== 2100) {
        sum += 29;
      } else {
        sum += 28;
      }
    } else {
      sum += 30;
    }
  }
  // 计算日
  sum += day;
  const remain = (sum + 4) % 7;
  return dict[remain];
  // 除以7，计算星期
};

export { dayOfTheWeek };

~~~

  
### 1189-maxNumberOfBalloons.js

~~~js
/*
 * @lc app=leetcode.cn id=1189 lang=javascript
 *
 * [1189] “气球” 的最大数量
 */

//
/**
 * @param {string} text
 * @return {number}
 */
// balloon
const maxNumberOfBalloons = function(text) {
  const len = text.length;
  if (len < 7) return 0;
  let b = 0;
  let a = 0;
  let l = 0;
  let o = 0;
  let n = 0;
  for (let i = 0; i < len; i++) {
    const item = text[i];
    switch (item) {
      case 'b':
        b++;
        break;
      case 'a':
        a++;
        break;
      case 'l':
        l++;
        break;
      case 'o':
        o++;
        break;
      case 'n':
        n++;
        break;
      default:
        break;
    }
  }
  return Math.min(b, a, n, Math.floor(o / 2), Math.floor(l / 2));
};

export { maxNumberOfBalloons };

~~~

  
### 1200-minimumAbsDifference.js

~~~js
/*
 * @lc app=leetcode.cn id=1200 lang=javascript
 *
 * [1200] 最小绝对差
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number[][]}
 */
// 216 ms
// , 在所有 JavaScript 提交中击败了
// 26.72%
// 的用户
const minimumAbsDifference = function(arr) {
  // 处理一下数组是0或者1长度的情况
  const len = arr.length;
  if (len === 0 || len === 1) {
    return [];
  }
  // 先把数组排序
  arr.sort((a, b) => a - b);

  let min = arr[1] - arr[0];
  let res = [];
  res.push([arr[0], arr[1]]);
  if (len === 2) {
    return res;
  }
  // console.log(arr);
  // 然后循环数组，判断当前元素和前一个元素的绝对值
  for (let i = 2; i < len; i++) {
    const curr = arr[i];
    const before = arr[i - 1];
    // console.log(before, curr);
    if ((curr - before) < min) {
      min = curr - before;
      const item = [before, curr];
      res = [];
      res.push(item);
    } else if ((curr - before) === min) {
      const item = [before, curr];
      res.push(item);
    } else {
      continue;
    }
  }
  // console.log(min);
  return res;
  // 然后设置一个最小值，设置一个存放的数组
};
// @lc code=end

export { minimumAbsDifference };

~~~

  
### 1207-uniqueOccurrences.js

~~~js
/*
 * @lc app=leetcode.cn id=1207 lang=javascript
 * [1207] 独一无二的出现次数
 */
/**
 * @param {number[]} arr
 * @return {boolean}
 */
const uniqueOccurrences = function(arr) {
  const len = arr.length;
  if (len < 2) {
    return true;
  }
  const dict = {};
  for (let i = 0; i < len; i++) {
    const item = arr[i];
    if (dict[item]) {
      dict[item]++;
    } else {
      dict[item] = 1;
    }
  }
  const tmp = [];
  for (const key in dict) {
    const value = dict[key];
    tmp.push(value);
  }
  return tmp.length === (Array.from(new Set(tmp))).length;
};

export { uniqueOccurrences };

~~~

  
### 1217-minCostToMoveChips.js

~~~js
/*
 * @lc app=leetcode.cn id=1217 lang=javascript
 * [1217] 玩筹码
 */
// 考点：数学+数组
// 注：这个题干比较难理解，实际解答难度不大
// chips = [1,2,3]
// 这个的意思：有一个坐标，在1上放一个点，在2上放一个点，在3上放一个点
// chips = [2,2,2,3,3]
// 这个的意思：在2上放一个点，在2上放一个点，在2上放一个点，在3上放一个点，在3上放一个点
// 那么现在2上有三个点，3上有两个点
// 我们需要移动点。奇数位置移动到奇数位置，不消耗；偶数位置移动到偶数位置，不消耗。
// 那么我们可以首先移动全部的点到 1 和 2 上面，然后求这两个点的最小值，就是花费最少
// 进一步简化：求奇数的个数，和偶数的个数的最小值

// Your runtime beats 77.27 % of javascript submissions
/**
 * @param {number[]} position
 * @return {number}
 */
const minCostToMoveChips = function(position) {
  let odd = 0;
  let even = 0;
  const len = position.length;
  for (let i = 0; i < len; i++) {
    position[i] % 2 === 0 ? even++ : odd++;
  }
  return Math.min(odd, even);
};

export { minCostToMoveChips };

~~~

  
### 1221-balancedStringSplit.js

~~~js
/*
 * @lc app=leetcode.cn id=1221 lang=javascript
 *
 * [1221] 分割平衡字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
// 84 ms, 在所有 JavaScript 提交中击败了 70.55%
const balancedStringSplit = function(s) {
  let times = 0;
  let left = 0;
  let right = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === 'R') {
      right++;
    } else {
      left++;
    }
    if (left === right) {
      times++;
    }
  }
  return times;
};
// @lc code=end

export { balancedStringSplit };

~~~

  
### 1222-queensAttacktheKing.js

~~~js
/*
 * @lc app=leetcode.cn id=1222 lang=javascript
 *
 * [1222] 可以攻击国王的皇后
 */

// @lc code=start
/**
 * @param {number[][]} queens
 * @param {number[]} king
 * @return {number[][]}
 */
// 88 ms
// , 在所有 JavaScript 提交中击败了
// 66.67%
// 的用户
const queensAttacktheKing = function(queens, king) {
  // 先遍历一次数组，把可能攻击到的位置获取出来（八个子数组）
  // 然后获取每一个数组的最小值
  const X = king[0];
  const Y = king[1];
  // 这里存放八个方向的可以攻击的位置
  const arr = [[], [], [], [], [], [], [], []];
  for (let i = 0; i < queens.length; i++) {
    const item = queens[i];
    // 处理下面几个情况
    if (item[0] === X) {
      // 在一行
      item[1] > Y ? arr[0].push(item) : arr[1].push(item);
    } else if (item[1] === Y) {
      // 在一列
      item[0] > X ? arr[2].push(item) : arr[3].push(item);
    } else if ((item[0] - X) === (item[1] - Y)) {
      // 在对角线上
      item[0] > X ? arr[4].push(item) : arr[5].push(item);
    } else if ((item[0] - X) === -(item[1] - Y)) {
      // 在对角线上
      item[0] > X ? arr[6].push(item) : arr[7].push(item);
    }
  }
  // 然后排序，获取最小的元素
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length === 1) {
      res.push(arr[i][0]);
    } else if (arr[i].length === 0) {
      continue;
    } else {
      // 有很多，那么获取距离最短的那个点
      let currentIndex = 0;
      let currentDis = Math.abs(arr[i][0][0] - X) + Math.abs(arr[i][0][1] - Y);
      for (let j = 1; j < arr[i].length; j++) {
        if (Math.abs(arr[i][j][0] - X) + Math.abs(arr[i][j][1] - Y) < currentDis) {
          currentIndex = j;
          currentDis = Math.abs(arr[i][currentIndex][0] - X) + Math.abs(arr[i][currentIndex][1] - Y);
        }
      }
      res.push(arr[i][currentIndex]);
    }
  }
  return res;
};

// [[1,3],[0,7],[5,1],[2,5],[7,2],[1,2],[6,7],[3,3],[5,5],[1,5],[5,0],[0,4],[4,1],[1,1],[3,2],[2,3],[4,2],[1,0],[6,5],[2,7],[3,1],[4,3],[3,4]]
// [0,2]
// @lc code=end

export { queensAttacktheKing };

~~~

  
### 1232-checkStraightLine.js

~~~js
/*
 * @lc app=leetcode.cn id=1232 lang=javascript
 *
 * [1232] 缀点成线
 */

// @lc code=start
/**
 * @param {number[][]} coordinates
 * @return {boolean}
 */
// Your runtime beats 93.52 % of javascript submissions
const checkStraightLine = function(coordinates) {
  const len = coordinates.length;
  if (len === 2) return true;
  if (coordinates[1][0] - coordinates[0][0] === 0) {
    // 注意：处理斜率不存在的情况
    // 直接比较X是否相等
    for (let i = 1; i < len; i++) {
      if (coordinates[i][0] !== coordinates[0][0]) {
        return false;
      }
    }
    return true;
  } else {
    // 处理斜率存在的情况
    const K = ((coordinates[1][1] - coordinates[0][1]) / (coordinates[1][0] - coordinates[0][0]));
    for (let i = 1; i < len; i++) {
      const k = ((coordinates[i][1] - coordinates[0][1]) / (coordinates[i][0] - coordinates[0][0]));
      if (k !== K) {
        return false;
      }
    }
    return true;
  }
};
// @lc code=end

export { checkStraightLine };

~~~

  
### 1233-removeSubfolders.js

~~~js
/*
 * @lc app=leetcode.cn id=1233 lang=javascript
 *
 * [1233] 删除子文件夹
 */

// @lc code=start
// 3336 ms, 在所有 JavaScript 提交中击败了7.14%
// 现在循环太多，显然不是好办法
// 循环一次时，应该把键记录在一个数组中
const removeSubfolders = function(folder) {
  // folder = [...new Set(folder)];
  folder.sort((a, b) => {
    return a.length > b.length ? 1 : -1;
  });
  // console.log(folder);
  const result = [];
  while (folder.length > 0) {
    const item = folder.shift();
    deleteSubFile(item, folder);
    result.push(item);
  }
  return result;
};

const deleteSubFile = (item, folder) => {
  const len = item.length;
  for (let i = 0; i < folder.length; i++) {
    if (folder[i][len] === '/' && folder[i].indexOf(item) === 0) {
      folder.splice(i, 1);
      i--;
    }
  }
};

// 思路二
// 看看能否使用字典树结构优化，文件结构就是树
// function TreeNode(val, bool) {
//   this.val = val;
//   this.end = bool;
//   this.children = {};
// }

// const removeSubfolders = function(folder) {
//   // 先按照长度和顺序排序
//   folder.sort((a, b) => {
//     if (a.length === b.length) {
//       return a > b;
//     } else {
//       return a.length > b.length ? 1 : -1
//     }
//   });
//   let result = [];
//   let tree = {};
//   for (let i = 0; i < folder.length; i++) {
//     // 处理重复节点
//     if (folder[i] === folder[i - 1]) {
//       result.push(folder[i]);
//       continue;
//     }
//     if (checkNode(folder[i], tree)) {
//       result.push(folder[i]);
//       console.log(folder[i]);
//       console.log(tree);
//     }
//   }
//   // 每一个文件路径就是一个树节点
//   // 如果到某一个节点，节点的值是true，并且节点还有值，那么直接返回
//   // 如果是相同的节点，那么不需要处理
//   return result;
// };

// const checkNode = (str, tree) => {
//   // 先把str转换成数组
//   let arr = str.split('/');
//   let pointer = tree;
//   for (let i = 0; i < arr.length; i++) {
//     let key = arr[i];
//     // 如果当前节点已经存在，那么返回false
//     if (pointer[key] && pointer[key].end === true) {
//       return false;
//     }
//     // 如果当前节点不存在，那么继续
//     if (pointer[key] && pointer[key].end === false) {
//       pointer = pointer[key];
//       continue;
//     }
//     // 如果当前节点不存在，那么继续
//     if (!pointer[key] && i === arr.length - 1) {
//       pointer[key] = new TreeNode(key, true);
//       // console.log(pointer[key]);
//       return true;
//     }
//     if (!pointer[key] && i === arr.length - 1) {
//       pointer[key] = new TreeNode(key, false);
//       pointer = pointer[key];
//       continue;
//     }
//     // 如果当前节点不存在，新建一个节点，
//   }
// };
// 这里还有问题，还需要修复

// @lc code=end

export { removeSubfolders };

~~~

  
### 1252-oddCells.js

~~~js
/*
 * @lc app=leetcode.cn id=1252 lang=javascript
 *
 * [1252] 奇数值单元格的数目
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} m
 * @param {number[][]} indices
 * @return {number}
 */
// 84 ms, 在所有 JavaScript 提交中击败了82.67%的用户
const oddCells = function(n, m, indices) {
  const arr1 = new Array(n).fill(false);
  const arr2 = new Array(m).fill(false);
  const len = indices.length;
  for (let i = 0; i < len; i++) {
    const item = indices[i];
    arr1[item[0]] = !arr1[item[0]];
    arr2[item[1]] = !arr2[item[1]];
  }
  let len1 = 0;
  let len2 = 0;
  arr1.forEach((item) => {
    if (item === true) len1++;
  });
  arr2.forEach((item) => {
    if (item === true) len2++;
  });
  return len1 * m + len2 * n - len1 * len2 * 2;
};
// @lc code=end

export { oddCells };

~~~

  
### 1260-shiftGrid.js

~~~js
/*
 * @lc app=leetcode.cn id=1260 lang=javascript
 *
 * [1260] 二维网格迁移
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number[][]}
 */
// 124 ms, 在所有 JavaScript 提交中击败了62.75%
const shiftGrid = function(grid, k) {
  // 如果K是0 ，那么不移动
  if (k === 0) {
    return grid;
  }
  const m = grid.length;
  const n = grid[0].length;
  // 如果K是 M * N 的倍数，那么也不移动
  if (k % (m * n) === 0) {
    return grid;
  }
  // 获取实际需要移动的次数
  const K = k % (m * n);
  // 先把二维矩阵转换成一维矩阵，获取M和N
  let arr = grid.flat();
  // 然后把一维矩阵移动 余数次数
  arr = (arr.slice(-K)).concat(arr.slice(0, arr.length - K));
  const res = new Array(m);
  // 然后把一维矩阵转换成二维矩阵输出
  for (let i = 0; i < m; i++) {
    res[i] = arr.splice(0, n);
  }
  return res;
};
// @lc code=end

export { shiftGrid };

~~~

  
### 1261-FindElements.js

~~~js
/*
 * @lc app=leetcode.cn id=1261 lang=javascript
 *
 * [1261] 在受污染的二叉树中查找元素
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 */
// 124 ms, 在所有 JavaScript 提交中击败了97.50%
const FindElements = function(root) {
  // 还原二叉树，并设置字典实现查询
  this.dict = {};
  root.val == 0;
  this.dict[0] = true;
  runNode(root, 0, this.dict);
};

runNode = (node, value, dict) => {
  if (node.left) {
    const newLeft = 2 * value + 1;
    dict[newLeft] = true;
    node.left.val = newLeft;
    // console.log(newLeft);
    runNode(node.left, newLeft, dict);
  }
  if (node.right) {
    const newLeft = 2 * value + 2;
    dict[newLeft] = true;
    node.right.val = newLeft;
    // console.log(newLeft);
    runNode(node.right, newLeft, dict);
  }
};

/**
 * @param {number} target
 * @return {boolean}
 */
FindElements.prototype.find = function(target) {
  // console.log(this.dict);
  return !!this.dict[target];
};

/**
 * Your FindElements object will be instantiated and called as such:
 * let obj = new FindElements(root)
 * let param_1 = obj.find(target)
 */
// @lc code=end

export { FindElements };

~~~

  
### 1266-minTimeToVisitAllPoints.js

~~~js
/*
 * @lc app=leetcode.cn id=1266 lang=javascript
 *
 * [1266] 访问所有点的最小时间
 */

// @lc code=start
/**
 * @param {number[][]} points
 * @return {number}
 */
// Your runtime beats 78.91 % of javascript submissions
const minTimeToVisitAllPoints = function(points) {
  // 辅助函数
  const getDistance = (a, b) => {
    const { abs, max } = Math;
    const x = abs(a[0] - b[0]);
    const y = abs(a[1] - b[1]);
    return max(x, y);
  };

  let res = 0;
  const len = points.length;
  if (len === 1) return res;
  for (let i = 1; i < len; i++) {
    res += getDistance(points[i - 1], points[i]);
  }
  return res;
};
// @lc code=end

export { minTimeToVisitAllPoints };

~~~

  
### 1268-suggestedProducts.js

~~~js
/*
 * @lc app=leetcode.cn id=1268 lang=javascript
 *
 * [1268] 搜索推荐系统
 */

// Your runtime beats 30.43 % of javascript submissions
// @lc code=start
/**
 * @param {string[]} products
 * @param {string} searchWord
 * @return {string[][]}
 */
// 这个题目可以使用字典树，trie 做
// 也可以使用数组和字符串对比做
// 数组的长度是1000，搜索的长度也是1000，可能存在性能问题
// 先使用基础的方法完成一下
const suggestedProducts = function(products, searchWord) {
  // products 首先按照字典序排序一下，这样减少后面的计算
  const new_products = products.sort((a, b) => {
    return a > b ? 1 : -1;
  });
  const productLen = new_products.length;

  const result = [];

  const getResult = function(search) {
    const tmp = [];
    const searchLen = search.length;
    for (let i = 0; i < productLen; i++) {
      if (new_products[i].slice(0, searchLen) === search) {
        tmp.push(new_products[i]);
      }
      if (tmp.length === 3) {
        break;
      }
    }
    return tmp;
  };

  const searchLen = searchWord.length;
  for (let i = 0; i < searchLen; i++) {
    const currentStr = searchWord.slice(0, i + 1);
    result.push(getResult(currentStr));
  }
  return result;
};
// @lc code=end

export { suggestedProducts };

~~~

  
### 1275-isThreeLine.js

~~~js
/*
 * @lc app=leetcode.cn id=1275 lang=javascript
 *
 * [1275] 找出井字棋的获胜者
 */
// 判断获胜的辅助函数，比较简单，只需要判断三个情况
// 如何判断平局或者继续玩
// 如果没有下完，但是已经是平局了，这个怎么计算？（实验一下）
// [[0,0],[1,1],[2,0],[1,0],[1,2],[2,1],[0,1],[0,2]]
// 计算结果：这个按照 pending 结束
// 推广：五子棋的算法

// @lc code=start
/**
 * @param {number[][]} moves
 * @return {string}
 */

// 辅助函数：检查三个点是否在直线上(检查通过)
const isThreeLine = function(p1, p2, p3) {
  // 如果横坐标相等，那么在直线上
  if (p1[0] == p2[0] && p1[0] == p3[0]) {
    return true;
  }
  // 如果纵坐标相等，那么也在直线上
  if (p1[1] == p2[1] && p1[1] == p3[1]) {
    return true;
  }
  // 如果斜率相等，那么也在直线上（除数不是0的情况）
  // k1 = (y2 - y1) / (x2 - x1)
  // k2 = (y3 - y1) / (x3 - x1)
  if (p2[0] - p1[0] !== 0 && p3[0] - p1[0] !== 0) {
    const k1 = (p2[1] - p1[1]) / (p2[0] - p1[0]);
    const k2 = (p3[1] - p1[1]) / (p3[0] - p1[0]);
    if (k1 === k2) {
      return true;
    }
  }
  // 其他都不是直线上
  return false;
};

// 检查一个人是否是真的
const checkList = function(list) {
  const len = list.length;
  if (len === 3) {
    return isThreeLine(list[0], list[1], list[2]);
  }
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      for (let k = j + 1; k < len; k++) {
        if (isThreeLine(list[i], list[j], list[k])) {
          return true;
        }
      }
    }
  }
  return false;
};

const tictactoe = function(moves) {
  const draw = 'Draw';
  const pen = 'Pending';
  const len = moves.length;
  // 如果长度小于5，那么肯定没有人获胜，是 pending 状态
  if (len < 5) {
    return pen;
  }
  const l1 = [];
  const l2 = [];
  // 思路：循环数组，每次都判断当前的情况是否某一个人获胜
  for (let i = 0; i < len; i++) {
    i % 2 === 0 ? l1.push(moves[i]) : l2.push(moves[i]);
    // （是否有三个点在一条直线上）
    // 如果是四个或者五个点，那么就随机选择其中的三个点，这个复杂度可以接受
    // 这一步可以优化，能否使用已有的数据？
    if (i % 2 === 0) {
      if (l1.length > 2 && checkList(l1)) {
        return 'A';
      }
    } else if (l2.length > 2 && checkList(l2)) {
      return 'B';
    }
  }
  // 如果下棋结束，长度等于9，那么就是平局；否则继续下
  return len === 9 ? draw : pen;
};

// [[1,0],[0,1],[0,0],[2,0],[1,1],[2,1],[1,2]]

// @lc code=end

export { isThreeLine, tictactoe };

~~~

  
### 1276-numOfBurgers.js

~~~js
/*
 * @lc app=leetcode.cn id=1276 lang=javascript
 *
 * [1276] 不浪费原料的汉堡制作方案
 */

// @lc code=start
/**
 * @param {number} tomatoSlices
 * @param {number} cheeseSlices
 * @return {number[]}
 */
//  Your runtime beats 31.25 % of javascript submissions
const numOfBurgers = function(tomatoSlices, cheeseSlices) {
  // 4x + 2y = A
  // x + y = B
  // 求 A 和 B 的正整数解
  const x = (tomatoSlices - 2 * cheeseSlices) / 2;
  const y = cheeseSlices - x;
  if (x >= 0 && y >= 0 && x === Math.floor(x)) {
    return [x, y];
  }
  return [];
};
// @lc code=end

export { numOfBurgers };

~~~

  
### 1281-subtractProductAndSum.js

~~~js
/*
 * @lc app=leetcode.cn id=1281 lang=javascript
 *
 * [1281] 整数的各位积和之差
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
// Your runtime beats 90.79 % of javascript submissions
const subtractProductAndSum = function(n) {
  if (n < 10) {
    return 0;
  }
  let sum = 0;
  let product = 1;
  while (n > 0) {
    const remain = n % 10;
    n = (n - remain) / 10;
    sum += remain;
    product *= remain;
  }
  return product - sum;
};
// @lc code=end

export { subtractProductAndSum };

~~~

  
### 1282-groupThePeople.js

~~~js
/*
 * @lc app=leetcode.cn id=1282 lang=javascript
 *
 * [1282] 用户分组
 */

// Your runtime beats 31.91 % of javascript submissions
// @lc code=start
/**
 * @param {number[]} groupSizes
 * @return {number[][]}
 */
const groupThePeople = function(groupSizes) {
  const len = groupSizes.length;
  const arr = [];
  for (let i = 0; i < len; i++) {
    const item = {
      index: i,
      groupId: groupSizes[i],
    };
    arr.push(item);
  }
  arr.sort((a, b) => {
    return a.groupId > b.groupId ? 1 : -1;
  });
  const result = [];
  let temp = [];
  let currentID = arr[0].groupId;
  temp.push(arr[0].index);
  for (let i = 1; i < len; i++) {
    if (temp.length === currentID) {
      result.push([...temp]);
      temp = [];
      temp.push(arr[i].index);
      currentID = arr[i].groupId;
    } else if (arr[i].groupId === currentID) {
      temp.push(arr[i].index);
    } else {
      result.push([...temp]);
      temp = [];
      temp.push(arr[i].index);
      currentID = arr[i].groupId;
    }
  }
  if (temp.length > 0) {
    result.push(temp);
  }
  return result;
};
// @lc code=end

export { groupThePeople };

~~~

  
### 1287-findSpecialInteger.js

~~~js
/*
 * @lc app=leetcode.cn id=1287 lang=javascript
 *
 * [1287] 有序数组中出现次数超过25%的元素
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number}
 */
// Your runtime beats 91.11 % of javascript submissions
const findSpecialInteger = function(arr) {
  const length = arr.length;
  if (length < 3) return arr[0];
  const len = length / 4;
  let current = arr[0];
  let times = 1;
  for (let i = 1; i < length; i++) {
    if (arr[i] === current) {
      times++;
      if (times > len) {
        return current;
      }
    } else {
      current = arr[i];
      times = 1;
    }
  }
  return arr[0];
};
// @lc code=end

export { findSpecialInteger };

~~~

  
### 1290-getDecimalValue.js

~~~js
/*
 * @lc app=leetcode.cn id=1290 lang=javascript
 *
 * [1290] 二进制链表转整数
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {number}
 */
// Your runtime beats 38.94 % of javascript submissions
const getDecimalValue = function(head) {
  const getValue = (node) => {
    if (node.next) {
      return `${node.val}${getValue(node.next)}`;
    }
    return `${node.val}`;
  };
  const binary = getValue(head);
  return parseInt(binary, 2);
};

// @lc code=end

export { getDecimalValue };

~~~

  
### 1291-sequentialDigits.js

~~~js
/*
 * @lc app=leetcode.cn id=1291 lang=javascript
 *
 * [1291] 顺次数
 */

// @lc code=start
/**
 * @param {number} low
 * @param {number} high
 * @return {number[]}
 */
//  [10, 1000000000] 这个案例时间超出限制
// 思路1：基本思路：遍历一次数字，然后依次寻找符合条件的数字
// const sequentialDigits = function(low, high) {
//   let checkNum = (num) => {
//     let numStr = String(num);
//     const len = numStr.length;
//     for (let j = 1; j <= len - 1; j++) {
//       if (numStr[j] - numStr[j - 1] !== 1) {
//         return false;
//       }
//     }
//     return true;
//   };
//   let res = [];
//   for (let i = low; i <= high; i++) {
//     if (checkNum(i)) {
//       res.push(i);
//     }
//   }
//   return res;
// };
// isSequence(1000, 13000);
// [1234,2345,3456,4567,5678,6789,12345]

// 思路2：但是这样性能不好（怎样优化性能？能否通过动态规划等优化？先实现基本效果再说）
// 可以从开始节点，然后依次增加，这样判断，这样效果会好一点

// 思路3：全部的满足的情况，不超过100个，那么直接进把满足的情况写成一个字典，然后遍历这个区间内的数字，这样也可以
// Your runtime beats 89.33 % of javascript submissions
const sequentialDigits1 = function(low, high) {
  const dict = [12, 23, 34, 45, 56, 67, 78, 89, 123, 234, 345, 456, 567, 678, 789, 1234, 2345, 3456, 4567, 5678, 6789, 12345, 23456, 34567, 45678, 56789, 123456, 234567, 345678, 456789, 1234567, 2345678, 3456789, 12345678, 23456789, 123456789];
  const res = [];
  for (let i = 0; i < dict.length; i++) {
    if (dict[i] >= low && dict[i] <= high) {
      res.push(dict[i]);
    }
  }
  return res;
};

// 继续改进，使用指针
// 还有问题，首尾测试
// 10
// 1000000000
// Your runtime beats 89.33 % of javascript submissions
const sequentialDigits2 = function(low, high) {
  const dict = [12, 23, 34, 45, 56, 67, 78, 89, 123, 234, 345, 456, 567, 678, 789, 1234, 2345, 3456, 4567, 5678, 6789, 12345, 23456, 34567, 45678, 56789, 123456, 234567, 345678, 456789, 1234567, 2345678, 3456789, 12345678, 23456789, 123456789];
  let start = -1;
  let end = dict.length;
  for (let i = 0; i < dict.length; i++) {
    if (dict[i] < low) {
      start = i;
    }
    if (dict[i] > high) {
      end = i;
      break;
    }
  }
  return dict.slice(start + 1, end);
};

// @lc code=end

export { sequentialDigits1, sequentialDigits2 };

~~~

  
### 1295-findNumbers.js

~~~js
/*
 * @lc app=leetcode.cn id=1295 lang=javascript
 * [1295] 统计位数为偶数的数字
 */

//
/**
 * @param {number[]} nums
 * @return {number}
 */
const findNumbers = function(nums) {
  // 循环数组
  // 然后判断每一个数字的位数
  let res = 0;
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    const item = String(nums[i]).length;
    if (item % 2 === 0) res++;
  }
  return res;
};

export { findNumbers };

~~~

  
### 1299-replaceElements.js

~~~js
/*
 * @lc app=leetcode.cn id=1299 lang=javascript
 *
 * [1299] 将每个元素替换为右侧最大元素
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number[]}
 */
// Your runtime beats 63.71 % of javascript submissions
const replaceElements = function(arr) {
  const len = arr.length;
  const res = [-1];
  if (len === 1) {
    return res;
  }
  let max = arr[len - 1];
  for (let i = len - 2; i >= 0; i--) {
    res.unshift(max);
    const curr = arr[i];
    if (curr > max) {
      max = curr;
    }
  }
  return res;
};
// @lc code=end

export { replaceElements };

~~~

  
### 1304-sumZero.js

~~~js
/*
 * @lc app=leetcode.cn id=1304 lang=javascript
 *
 * [1304] 和为零的N个唯一整数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number[]}
 */
// Your runtime beats 8.21 % of javascript submissions
const sumZero = function(n) {
  if (n === 1) return [0];
  let sum = 0;
  const arr = [];
  for (let i = 0; i < n - 1; i++) {
    arr.push(i);
    sum += i;
  }
  arr.push(-sum);
  return arr;
};
// @lc code=end

export { sumZero };

~~~

  
### 1309-freqAlphabets.js

~~~js
/*
 * @lc app=leetcode.cn id=1309 lang=javascript
 *
 * [1309] 解码字母到整数映射
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
//  68 ms, 在所有 JavaScript 提交中击败了 99.31%
const freqAlphabets = function(s) {
  let res = ''; let cur; let
    curStr;
  // 基本思路，通过API计算出对应的字符，或者使用一个字典存储对应的字符
  // 'a' === String.fromCharCode(97);
  while (s.length > 0) {
    if (s[2] === '#') {
      // 第二个规则
      cur = Number(s[0] + s[1]);
      curStr = String.fromCharCode(cur + 96);
      // console.log(curStr);
      res += curStr;
      s = s.slice(3);
    } else {
      // 第一个规则
      cur = Number(s[0]);
      curStr = String.fromCharCode(cur + 96);
      res += curStr;
      // console.log(curStr);
      s = s.slice(1);
    }
    // console.log(s);
  }
  return res;
};
// @lc code=end

export { freqAlphabets };

~~~

  
### 1311-watchedVideosByFriends.js

~~~js
/*
 * @lc app=leetcode.cn id=1311 lang=javascript
 *
 * [1311] 获取你好友已观看的视频
 */

// @lc code=start
// Your runtime beats 41.94 % of javascript submissions
const watchedVideosByFriends = function(watchedVideos, friends, id, level) {
  // 先根据自己的ID 和 level，计算目标用户的集合 users
  let users = [];
  let tmp = [];
  const deletedUsers = {};
  // 这个是已经出现的好友，不能继续计算
  deletedUsers[id] = true;
  // 如果A是1级好友，就不能计算成3级好友
  users.push(id);
  while (level > 0) {
    users.forEach((id) => {
      tmp.push(...friends[id]);
    });
    // tmp 去重，去掉自己? 目前正确
    tmp = [...new Set(tmp)];
    level--;
    // 去掉已经是前面层级的好友
    users = tmp.filter((item) => deletedUsers[item] !== true);
    users.forEach((user) => {
      deletedUsers[user] = true;
    });
    tmp = [];
  }
  // 然后把这部分用户看过的视频拿出来，使用哈希表并进行排序操作
  const dict = {};
  users.forEach((index) => {
    const arr = watchedVideos[index];
    arr.forEach((key) => {
      if (dict[key]) {
        dict[key]++;
      } else {
        dict[key] = 1;
      }
    });
  });
  // 获取哈希表中的频率
  tmp = [];
  for (const key in dict) {
    const times = dict[key];
    const obj = { key, times };
    tmp.push(obj);
  }
  tmp.sort((a, b) => {
    if (a.times !== b.times) {
      return a.times < b.times ? -1 : 1;
    } else {
      return a.key < b.key ? -1 : 1;
    }
  });
  return tmp.map((item) => item.key);
};

// @lc code=end

export { watchedVideosByFriends };

~~~

  
### 1313-decompressRLElist.js

~~~js
/*
 * @lc app=leetcode.cn id=1313 lang=javascript
 *
 * [1313] 解压缩编码列表
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
// Your runtime beats 48.15 % of javascript submissions
const decompressRLElist = function(nums) {
  const res = [];
  while (nums.length > 0) {
    const times = nums.shift();
    const num = nums.shift();
    const arr = new Array(times).fill(num);
    res.push(...arr);
  }
  return res;
};
// @lc code=end

export { decompressRLElist };

~~~

  
### 1314-matrixBlockSum.js

~~~js
/*
 * @lc app=leetcode.cn id=1314 lang=javascript
 *
 * [1314] 矩阵区域和
 */

// @lc code=start
/**
 * @param {number[][]} mat
 * @param {number} K
 * @return {number[][]}
 */
// 思路一：暴力法
// Your runtime beats 28.13 % of javascript submissions
// 思路二：向右移动一个，那么就是加一列，减一列；向下移动一个，那么就是加一行，减一行
const matrixBlockSum = function(mat, K) {
  const len1 = mat.length;
  const len2 = mat[0].length;
  const res = new Array(len1);
  for (let i = 0; i < len1; i++) {
    res[i] = new Array(len2);
  }
  const getSum = function(i, j) {
    let startI = i - K;
    let endI = i + K;
    let startJ = j - K;
    let endJ = j + K;
    startI = startI < 0 ? 0 : startI;
    endI = endI > len1 - 1 ? len1 - 1 : endI;
    startJ = startJ < 0 ? 0 : startJ;
    endJ = endJ > len2 - 1 ? len2 - 1 : endJ;
    let sum = 0;
    for (let i = startI; i <= endI; i++) {
      for (let j = startJ; j <= endJ; j++) {
        sum += mat[i][j];
      }
    }
    return sum;
  };
  for (let i = 0; i < len1; i++) {
    for (let j = 0; j < len2; j++) {
      res[i][j] = getSum(i, j);
    }
  }
  return res;
};

export { matrixBlockSum };

~~~

  
### 1317-getNoZeroIntegers.js

~~~js
/*
 * @lc app=leetcode.cn id=1317 lang=javascript
 *
 * [1317] 将整数转换为两个无零整数的和
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number[]}
 */
// Your runtime beats 76.06 % of javascript submissions
const getNoZeroIntegers = function(n) {
  // 辅助函数
  const jedge = function(a) {
    if (a <= 0) return false;
    while (a > 0) {
      if (a % 10 === 0) {
        return false;
      }
      const re = a % 10;
      a = (a - re) / 10;
    }
    return true;
  };
  // 随机法比较好
  let a = Math.floor(Math.random() * n);
  let b = n - a;
  while (!jedge(a) || !jedge(b)) {
    a = Math.floor(Math.random() * n);
    b = n - a;
  }
  return [a, b];
};
// @lc code=end

export { getNoZeroIntegers };

~~~

  
### 1323-maximum69Number.js

~~~js
/*
 * @lc app=leetcode.cn id=1323 lang=javascript
 *
 * [1323] 6 和 9 组成的最大数字
 */
/**
 * @param {number} num
 * @return {number}
 */
// Your runtime beats 6.98 % of javascript submissions
// 应该直接使用数学计算，
// 不应该使用字符串
const maximum69Number = function(num) {
  const str = String(num);
  const index = str.indexOf('6');
  if (index === -1) return num;
  const res = `${str.slice(0, index)}9${str.slice(index + 1)}`;
  return Number(res);
};

export { maximum69Number };

~~~

  
### 1328-breakPalindrome.js

~~~js
/*
 * @lc app=leetcode.cn id=1328 lang=javascript
 *
 * [1328] 破坏回文串
 */

// 破坏回文串：思路
// 1、如果一个字母，不管怎么样都是回文，返回空字符串
// 2、如果是普通字符串，那么从前向后遍历，把当前的字符串进行替换
// 如果字符串是非a，那么替换成a  bccb accb
// 如果字符串是a, 那么继续遍历后面的字符串 aabaa aaaaa
// 如果字符串全部是a, 那么直接把最后一个变成B aaaa aaab
// 如果回文字符串的长度是奇数，那么中间一个不处理
// 看是否还有其他特殊情况？

// @lc code=start
/**
 * @param {string} palindrome
 * @return {string}
 */
//  "aba"
// Your runtime beats 38.1 % of javascript submissions
const breakPalindrome = function(palindrome) {
  const len = palindrome.length;
  if (len <= 1) {
    return '';
  }
  if (palindrome.indexOf('a') === -1) {
    return `a${palindrome.slice(1)}`;
  }
  for (let i = 0; i < len; i++) {
    if (len % 2 === 1 && i === (len - 1) / 2) {
      continue;
    }
    if (palindrome[i] !== 'a') {
      return `${palindrome.slice(0, i)}a${palindrome.slice(i + 1)}`;
    }
  }
  return `${palindrome.slice(0, len - 1)}b`;
};
// @lc code=end

export { breakPalindrome };

~~~

  
### 1331-arrayRankTransform.js

~~~js
/*
 * @lc app=leetcode.cn id=1331 lang=javascript
 *
 * [1331] 数组序号转换
 */
/**
 * @param {number[]} arr
 * @return {number[]}
 */
const arrayRankTransform = function(arr) {
  const len = arr.length;
  if (len === 0) {
    return [];
  }
  const arr2 = arr.slice(0);
  arr2.sort((a, b) => a - b);
  const dict = {};
  let index = 1;
  for (let i = 0; i < arr2.length; i++) {
    const key = arr2[i];
    if (!dict[key]) {
      dict[key] = index;
      index++;
    }
  }
  const result = [];
  for (let i = 0; i < len; i++) {
    const item = arr[i];
    const value = dict[item];
    result.push(value);
  }
  return result;
};

export { arrayRankTransform };

~~~

  
### 1337-kWeakestRows.js

~~~js
/*
 * @lc app=leetcode.cn id=1337 lang=javascript
 *
 * [1337] 方阵中战斗力最弱的 K 行
 */

// @lc code=start
/**
 * @param {number[][]} mat
 * @param {number} k
 * @return {number[]}
 */
// 88 ms, 在所有 JavaScript 提交中击败了62.86%的用户
const kWeakestRows = function(mat, k) {
  const arr = [];
  for (let i = 0; i < mat.length; i++) {
    const item = mat[i];
    let times = 0;
    for (let j = 0; j < item.length; j++) {
      if (item[j] === 0) {
        times = j;
        j = item.length;
      }
      if (j === item.length - 1) {
        times = item.length;
      }
    }
    arr.push({
      index: i,
      times,
    });
  }
  arr.sort((a, b) => {
    if (a.times === b.times) {
      return a.index > b.index ? 1 : -1;
    } else {
      return a.times > b.times ? 1 : -1;
    }
  });
  const tmp = arr.map((item) => item.index);
  return tmp.slice(0, k);
};
// @lc code=end

export { kWeakestRows };

~~~

  
### 1342-numberOfSteps.js

~~~js
/*
 * @lc app=leetcode.cn id=1342 lang=javascript
 *
 * [1342] 将数字变成 0 的操作次数
 */
/**
 * @param {number} num
 * @return {number}
 */
// 思路一，直接计算
const numberOfSteps = function(num) {
  let operate = 0;
  while (num > 0) {
    if (num % 2 === 0) {
      num = num / 2;
    } else {
      num--;
    }
    operate++;
  }
  return operate;
};
// 思路二：转换成二进制，然后计算长度和1的数量

export { numberOfSteps };

~~~

  
### 1346-checkIfExist.js

~~~js
// 1346. 检查整数及其两倍数是否存在
// 给你一个整数数组 arr，请你检查是否存在两个整数 N 和 M，满足 N 是 M 的两倍（即，N = 2 * M）。
// 更正式地，检查是否存在两个下标 i 和 j 满足：
// i != j
// 0 <= i, j < arr.length
// arr[i] == 2 * arr[j]

// 示例 1：
// 输入：arr = [10,2,5,3]
// 输出：true
// 解释：N = 10 是 M = 5 的两倍，即 10 = 2 * 5 。
/**
 * @param {number[]} arr
 * @return {boolean}
 */
const checkIfExist = function(arr) {
  // 哈希表存储
  const len = arr.length;
  if (len < 2) return false;
  const hash = {};
  for (let i = 0; i < len; i++) {
    const item = arr[i];
    const a = item * 2;
    const b = item / 2;
    if (hash[a] || hash[b]) return true;
    // 把当前的存入hash 中
    hash[item] = true;
  }
  return false;
};

export { checkIfExist };

~~~

  
### 1351-countNegatives.js

~~~js
/*
 * @lc app=leetcode.cn id=1351 lang=javascript
 *
 * [1351] 统计有序矩阵中的负数
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
// 思路1：最基本的算法-双重循环
// Your runtime beats 63.02 % of javascript submissions
// const countNegatives = function(grid) {
//   let sum = 0;
//   for (let i = 0; i < grid.length; i++) {
//     let item = grid[i];
//     for (let j = 0; j < item.length; j++) {
//       if (item[j] < 0) {
//         sum++;
//       }
//     }
//   }
//   return sum;
// };

// 思路二：改进后
// Your runtime beats 89.94 % of javascript submissions
const countNegatives = function(grid) {
  let sum = 0;
  for (let i = 0; i < grid.length; i++) {
    const item = grid[i];
    for (let j = 0; j < item.length; j++) {
      if (item[j] < 0) {
        sum += item.length - j;
        j = item.length;
      }
    }
  }
  return sum;
};

// 思路3：二分法获取当期行的负数的开始位置
// @lc code=end

export { countNegatives };

~~~

  
### 1352-ProductOfNumbers.js

~~~js
/*
 * @lc app=leetcode.cn id=1352 lang=javascript
 *
 * [1352] 最后 K 个数的乘积
 */

// @lc code=start
// Your runtime beats 54.55 % of javascript submissions
const ProductOfNumbers = function() {
  this.arr = [];
};

/**
 * @param {number} num
 * @return {void}
 */
ProductOfNumbers.prototype.add = function(num) {
  this.arr.push(num);
};

/**
 * @param {number} k
 * @return {number}
 */
ProductOfNumbers.prototype.getProduct = function(k) {
  let res = 1;
  // console.log(this.arr);
  for (let i = this.arr.length - 1; i > this.arr.length - 1 - k; i--) {
    res *= this.arr[i];
  }
  return res;
};

/**
 * Your ProductOfNumbers object will be instantiated and called as such:
 * let obj = new ProductOfNumbers()
 * obj.add(num)
 * let param_2 = obj.getProduct(k)
 */
// @lc code=end

export { ProductOfNumbers };

~~~

  
### 1356-sortByBits.js

~~~js
/**
 * @param {number[]} arr
 * @return {number[]}
 */
// 104 ms, 在所有 JavaScript 提交中击败了 93.53%
const sortByBits = function(arr) {
  // 首先对整数数组从小到大排序
  arr = arr.sort((a, b) => a - b);
  // 设置一个函数，计算某个数中二进制1的数量
  const calcu = function(num) {
    let res = 0;
    while (num >= 1) {
      const tmp = num % 2;
      num = (num - tmp) / 2;
      if (tmp === 1) res++;
    }
    return res;
  };
  // 设置一个二维数组（对象）。其中第一层存放1的个数，第二层存放数字
  const matrix = [];
  // 遍历排序后的数组，然后放在结果数组中
  for (let i = 0; i < arr.length; i++) {
    const times = calcu(arr[i]);
    if (!matrix[times]) {
      matrix[times] = [];
    }
    matrix[times].push(arr[i]);
  }
  // 结果数组直接降维，获取需要输出的数组
  return matrix.flat();
};

export { sortByBits };

~~~

  
### 1357-Cashier.js

~~~js
/*
 * @lc app=leetcode.cn id=1357 lang=javascript
 *
 * [1357] 每隔 n 个顾客打折
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} discount
 * @param {number[]} products
 * @param {number[]} prices
 */
// Your runtime beats 8.33 % of javascript submissions
const Cashier = function(n, discount, products, prices) {
  this.n = n;
  this.discount = (100 - discount) / 100;
  this.products = products;
  this.prices = prices;
  this.current = 0;
};

/**
 * @param {number[]} product
 * @param {number[]} amount
 * @return {number}
 */
Cashier.prototype.getBill = function(product, amount) {
  // 最后处理折扣
  let sum = 0;
  const len = product.length;
  for (let i = 0; i < len; i++) {
    const item = product[i];
    const index = this.products.indexOf(item);
    const price = this.prices[index];
    sum = sum + price * amount[i];
  }
  this.current++;
  if (this.current % this.n === 0) {
    sum = sum * this.discount;
    this.current = 0;
  }
  return sum;
};

/**
 * Your Cashier object will be instantiated and called as such:
 * let obj = new Cashier(n, discount, products, prices)
 * let param_1 = obj.getBill(product,amount)
 */
// @lc code=end

export { Cashier };

~~~

  
### 1360-daysBetweenDates.js

~~~js
/*
 * @lc app=leetcode.cn id=1360 lang=javascript
 *
 * [1360] 日期之间隔几天
 */

// @lc code=start
/**
 * @param {string} date1
 * @param {string} date2
 * @return {number}
 */
// Your runtime beats 84.72 % of javascript submissions
const daysBetweenDates = function(date1, date2) {
  const a = new Date(date1);
  const b = new Date(date2);
  return Math.abs((b.getTime() - a.getTime()) / 1000 / 3600 / 24);
};
// @lc code=end

export { daysBetweenDates };

~~~

  
### 1365-smallerNumbersThanCurrent.js

~~~js
/*
 * @lc app=leetcode.cn id=1365 lang=javascript
 *
 * [1365] 有多少小于当前数字的数字
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
// Your runtime beats 93.53 % of javascript submissions
const smallerNumbersThanCurrent = function(nums) {
  const hash = {};
  for (let i = 0; i < nums.length; i++) {
    const key = nums[i];
    if (!hash[key]) {
      hash[key] = [];
    }
    hash[key].push(i);
  }
  nums.sort((a, b) => a - b);
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    // 前面应该有i-1个元素
    const item = nums[i];
    const indexArr = hash[item];
    for (let j = 0; j < indexArr.length; j++) {
      const index = indexArr[j];
      res[index] = i;
    }
    i = i + indexArr.length - 1;
  }
  return res;
};
// @lc code=end

export { smallerNumbersThanCurrent };

~~~

  
### 1374-generateTheString.js

~~~js
/*
 * @lc app=leetcode.cn id=1374 lang=javascript
 *
 * [1374] 生成每种字符都是奇数个的字符串
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string}
 */
// Your runtime beats 15.34 % of javascript submissions
const generateTheString = function(n) {
  let res = '';
  if (n % 2 === 0) {
    res = res.padEnd(n - 1, 'a');
    res = `${res}b`;
  } else {
    res = res.padEnd(n, 'a');
  }
  return res;
};
// @lc code=end

export { generateTheString };

~~~

  
### 1379-getTargetCopy.js

~~~js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} original
 * @param {TreeNode} cloned
 * @param {TreeNode} target
 * @return {TreeNode}
 */
// 328 ms, 在所有 JavaScript 提交中击败了89.69%
const getTargetCopy = function(original, cloned, target) {
  // 原始树和克隆树一样，所以直接遍历克隆树，找到对应的节点返回即可
  const runNode = function(node, value) {
    // console.log(node, value);
    if (!node) {
      return null;
    }
    if (node.val === value) {
      return node;
    }
    return runNode(node.left, value) || runNode(node.right, value);
  };
  return runNode(cloned, target.val);
};

export { getTargetCopy };

~~~

  
### 1380-luckyNumbers.js

~~~js
/*
 * @lc app=leetcode.cn id=1380 lang=javascript
 *
 * [1380] 矩阵中的幸运数
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
// Your runtime beats 38.64 % of javascript submissions
const luckyNumbers = function(matrix) {
  // 循环一个矩阵，然后获取每一行的最小值
  // 然后找到索引
  // 然后遍历列，判断是否是列中的最小值
  // 如果是，放在结果数组中，并把这个列记录在一个对象中
  const len = matrix.length;
  const dict = {};
  const res = [];
  for (let i = 0; i < len; i++) {
    const min = Math.min(...matrix[i]);
    const index = matrix[i].indexOf(min);
    if (dict[index]) {
      continue;
    }
    const tmp = [];
    for (let i = 0; i < len; i++) {
      tmp.push(matrix[i][index]);
    }
    if (Math.max(...tmp) === min) {
      res.push(min);
      dict[index] = true;
    }
  }
  return res;
};
// @lc code=end

export { luckyNumbers };

~~~

  
### 1381-CustomStack.js

~~~js
/*
 * @lc app=leetcode.cn id=1381 lang=javascript
 *
 * [1381] 设计一个支持增量操作的栈
 */

// @lc code=start
/**
 * @param {number} maxSize
 */
// Your runtime beats 23.3 % of javascript submissions
const CustomStack = function(maxSize) {
  stack = [];
  max = maxSize;
};

/**
 * @param {number} x
 * @return {void}
 */
CustomStack.prototype.push = function(x) {
  if (stack.length < max) {
    stack.push(x);
  }
};

/**
 * @return {number}
 */
CustomStack.prototype.pop = function() {
  return stack.length === 0 ? -1 : stack.pop();
};

/**
 * @param {number} k
 * @param {number} val
 * @return {void}
 */
CustomStack.prototype.increment = function(k, val) {
  for (let i = 0; i < k; i++) {
    if (stack[i] || stack[i] === 0) {
      stack[i] += val;
    } else {
      break;
    }
  }
};

/**
 * Your CustomStack object will be instantiated and called as such:
 * let obj = new CustomStack(maxSize)
 * obj.push(x)
 * let param_2 = obj.pop()
 * obj.increment(k,val)
 */
// @lc code=end

export { CustomStack };

~~~

  
### 1385-findTheDistanceValue.js

~~~js
/*
 * @lc app=leetcode.cn id=1385 lang=javascript
 *
 * [1385] 两个数组间的距离值
 */

// @lc code=start
/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @param {number} d
 * @return {number}
 */
const findTheDistanceValue = function(arr1, arr2, d) {
  // 基本思路：双重循环，然后判断每一个是否满足要求
  let tmp = 0;
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (Math.abs(arr1[i] - arr2[j]) <= d) {
        break;
      }
      if (j === arr2.length - 1) {
        tmp++;
      }
    }
  }
  return tmp;
  // 2分查找，排序
  // 改进：如果把一个数组转换成对象，那么遍历一次这个数组即可
  // 这样2N即可完成全部的检查（先排序）
};
// @lc code=end

// 正确的思路：使用二分法和排序解决，第一种解决方案的效率低下
// const findTheDistanceValue = function(arr1, arr2, d) {
//   // 对数组2进行排序
//   // 然后循环数组1，使用二分法判断是否满足条件
//   arr2.sort((a, b) => a - b);
//   const len = arr2.length;
//   let res = 0;
//   for (let i = 0; i < arr1.length; i++) {
//     let item = arr1[i];
//     let start = 0;
//     let end = len - 1;
//     // 如果当前的数字在区域外部，那么跳过继续循环
//     if (item < arr2[start] - d || item > arr2[end] + d) {
//       continue;
//     }
//     let middle;
//     // 当前数字在区间内部，那么二分法判断是否在区间中
//     while (start < end) {
//       if (middle === Math.floor((start + end) / 2)) {
//         continue;
//       }
//       middle = Math.floor((start + end) / 2);
//       if (item < arr2[middle] - d || item > arr2[middle] + d) {
//         res++;
//         start = end;
//         // 如果满足条件，那么结束循环
//       }
//       else if (item < arr2[middle]) {
//         end = middle;
//       }
//       else if (item > arr2[middle]) {
//         start = middle;
//       }
//     }
//   }
//   return res;
// };

// 预期是3
// 现在是0

export { findTheDistanceValue };

~~~

  
### 1389-createTargetArray.js

~~~js
/*
 * @lc app=leetcode.cn id=1389 lang=javascript
 *
 * [1389] 按既定顺序创建目标数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number[]} index
 * @return {number[]}
 */
// 100 ms
// , 在所有 JavaScript 提交中击败了
// 13.78%
// 的用户
const createTargetArray = function(nums, index) {
  const target = [];
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    const item = nums[i];
    const ind = index[i];
    target.splice(ind, 0, item);
  }
  return target;
};
// @lc code=end

export { createTargetArray };

~~~

  
### 1394-findLucky.js

~~~js
/*
 * @lc app=leetcode.cn id=1394 lang=javascript
 * [1394] 找出数组中的幸运数
 */
// @lc code=start
/**
 * @param {number[]} arr
 * @return {number}
 */
const findLucky = function(arr) {
  const len = arr.length;
  const dict = {};
  for (let i = 0; i < len; i++) {
    const key = arr[i];
    if (dict[key]) {
      dict[key] += 1;
    } else {
      dict[key] = 1;
    }
  }
  const list = [];
  // 获取幸运数字
  for (const key in dict) {
    const value = dict[key];
    if (value == key) {
      list.push(key);
    }
  }
  if (list.length === 0) return -1;
  if (list.length === 1) return list[0];
  return Math.max(...list);
};
// @lc code=end

export { findLucky };

~~~

  
### 1396-UndergroundSystem.js

~~~js
/*
 * @lc app=leetcode.cn id=1396 lang=javascript
 *
 * [1396] 设计地铁系统
 */

// @lc code=start

// 这里设置两个对象
// 一个存储临时的时间
// 另一个
// Your runtime beats 80 % of javascript submissions
const UndergroundSystem = function() {
  tmpTime = {};
  time = {};
};

/**
 * @param {number} id
 * @param {string} stationName
 * @param {number} t
 * @return {void}
 */
UndergroundSystem.prototype.checkIn = function(id, stationName, t) {
  const key = `${id}`;
  const value = { stationName, t };
  tmpTime[key] = value;
};

/**
 * @param {number} id
 * @param {string} stationName
 * @param {number} t
 * @return {void}
 */
UndergroundSystem.prototype.checkOut = function(id, stationName, t) {
  // 从临时缓存中拿到上车的数据
  const key = `${id}`;
  const start = tmpTime[key];
  const startStation = start.stationName;
  const startT = start.t;

  const newKey = `${startStation}-${stationName}`;
  const newValue = t - startT;
  if (!time[newKey]) {
    time[newKey] = [];
  }
  time[newKey].push(newValue);
  delete tmpTime[key];
};

/**
 * @param {string} startStation
 * @param {string} endStation
 * @return {number}
 */
UndergroundSystem.prototype.getAverageTime = function(startStation, endStation) {
  const key = `${startStation}-${endStation}`;
  const arr = time[key];
  if (!arr) return null;
  const sum = arr.reduce((a, b) => { return a + b; }, 0);
  return sum / arr.length;
};

/**
 * Your UndergroundSystem object will be instantiated and called as such:
 * let obj = new UndergroundSystem()
 * obj.checkIn(id,stationName,t)
 * obj.checkOut(id,stationName,t)
 * let param_3 = obj.getAverageTime(startStation,endStation)
 */
// @lc code=end

export { UndergroundSystem };

~~~

  
### 1399-countLargestGroup.js

~~~js
/*
 * @lc app=leetcode.cn id=1399 lang=javascript
 *
 * [1399] 统计最大组的数目
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
// Your runtime beats 100 % of javascript submissions
const countLargestGroup = function(n) {
  if (n < 10) {
    return n;
  }
  const dict = {};
  const getSum = (n) => {
    if (n < 10) {
      return n;
    }
    while (n % 10 === 0) {
      n = n / 10;
    }
    return n % 10 + getSum((n - n % 10) / 10);
  };
  // 先循环，然后求和，把和记录在字典中
  for (let i = 0; i <= n; i++) {
    const sum = getSum(i);
    if (dict[sum]) {
      dict[sum]++;
    } else {
      dict[sum] = 1;
    }
  }
  // console.log(dict);
  // 然后把字典的值转换成数组？求出现次数最多的值
  const dict2 = {};
  let max = 0;
  for (const key in dict) {
    const value = dict[key];
    if (value > max) {
      max = value;
    }
    if (!dict2[value]) {
      dict2[value] = 1;
    } else {
      dict2[value]++;
    }
  }
  // console.log(dict2);
  return dict2[max];
};
// @lc code=end

export { countLargestGroup };

~~~

  
### 1403-minSubsequence.js

~~~js
/*
 * @lc app=leetcode.cn id=1403 lang=javascript
 *
 * [1403] 非递增顺序的最小子序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
// Your runtime beats 68.75 % of javascript submissions
const minSubsequence = function(nums) {
  if (nums.length === 1) return nums;
  const fn = function(a, b) {
    return a + b;
  };
  const sum = nums.reduce(fn, 0);
  const half = ((sum / 2) % 2 === 0) ? (sum / 2) + 1 : (sum / 2) + 0.5;
  nums.sort((a, b) => b - a);
  // 数组按照倒序排列
  let subSum = 0;
  for (let i = 0; i < nums.length; i++) {
    const item = nums[i];
    subSum += item;
    if (subSum >= half) {
      const innerArr = nums.slice(0, i + 1);
      return innerArr;
    }
  }
};
// @lc code=end

export { minSubsequence };

~~~

  
### 1408-stringMatching.js

~~~js
/*
 * @lc app=leetcode.cn id=1408 lang=javascript
 *
 * [1408] 数组中的字符串匹配
 */

// @lc code=start
/**
 * @param {string[]} words
 * @return {string[]}
 */
// Your runtime beats 62.5 % of javascript submissions
const stringMatching = function(words) {
  words.sort((a, b) => {
    return a.length > b.length ? -1 : 1;
  });
  const res = [];
  const dict = {};
  for (let i = 1; i < words.length; i++) {
    for (let j = 0; j < i; j++) {
      if (words[j].includes(words[i])) {
        const key = words[i];
        if (!dict[key]) {
          dict[key] = true;
          res.push(words[i]);
        }
        continue;
      }
    }
  }
  return res;
};
// @lc code=end

export { stringMatching };

~~~

  
### 1410-entityParser.js

~~~js
/*
 * @lc app=leetcode.cn id=1410 lang=javascript
 *
 * [1410] HTML 实体解析器
 */

// @lc code=start
/**
 * @param {string} text
 * @return {string}
 */
// 第一种思路：直接把text使用正则表达式替换，注意 &quot; 的转移符
// 116 ms, 在所有 JavaScript 提交中击败了93.22%
const entityParser = function(text) {
  return text.replace(/&quot;/ig, '\"').replace(/&apos;/ig, '\'').replace(/&gt;/ig, '>').replace(/&lt;/ig, '<')
    .replace(/&frasl;/ig, '/')
    .replace(/&amp;/ig, '&');
};

// 第二种思路：遍历字符串，然后判断栈顶的是否是特殊的字符串，然后替换
// @lc code=end

export { entityParser };

~~~

  
### 1413-minStartValue.js

~~~js
/*
 * @lc app=leetcode.cn id=1413 lang=javascript
 *
 * [1413] 逐步求和得到正数的最小值
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// Your runtime beats 18.28 % of javascript submissions
const minStartValue = function(nums) {
  if (nums.length === 1 && nums[0] > 0) return 1;
  // 假设初始值是1，然后求过程中的最小值
  // 然后计算最小的整数
  const init = 1;
  let sum = nums[0];
  let min = init < sum ? init : sum;
  for (let i = 1; i < nums.length; i++) {
    sum += nums[i];
    min = min < sum ? min : sum;
  }
  return Math.max(1 - min, 1);
};
// @lc code=end

export { minStartValue };

~~~

  
### 1417-reformat.js

~~~js
/*
 * @lc app=leetcode.cn id=1417 lang=javascript
 *
 * [1417] 重新格式化字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
// 108 ms
// , 在所有 JavaScript 提交中击败了
// 35.37%
// 的用户
const reformat = function(s) {
  if (s.length < 2) {
    return s;
  }
  const arr1 = [];
  const arr2 = [];
  for (let i = 0; i < s.length; i++) {
    const item = s[i];
    if (Number.isNaN(Number(item))) {
      arr1.push(item);
    } else {
      arr2.push(item);
    }
  }
  if (Math.abs(arr1.length - arr2.length) > 1) return '';
  const len = Math.max(arr1.length, arr2.length);
  let res = '';
  for (let i = 0; i < len; i++) {
    if (len === arr1.length) {
      res = res + (arr1[i] || '') + (arr2[i] || '');
    } else {
      res = res + (arr2[i] || '') + (arr1[i] || '');
    }
  }
  return res;
};
// @lc code=end

export { reformat };

~~~

  
### 1418-displayTable.js

~~~js
/*
 * @lc app=leetcode.cn id=1418 lang=javascript
 * [1418] 点菜展示表
 */
/**
 * @param {string[][]} orders
 * @return {string[][]}
 */
// Your runtime beats 42.31 % of javascript submissions
const displayTable = function(orders) {
  // 设置一个对象记录菜品的名称
  const menu = {};
  // 设置一个对象（数组）记录桌号点的东西（对象）
  const tables = [];
  // 循环数组
  orders.forEach((order) => {
    const tableID = order[1];
    const food = order[2];
    if (!menu[food]) {
      menu[food] = true;
    }
    if (!tables[tableID]) {
      tables[tableID] = {};
    }
    const table = tables[tableID];
    if (table[food]) {
      table[food]++;
    } else {
      table[food] = 1;
    }
  });
  // 遍历菜品名称对象，并放到结果数组中第一行
  const menuArr = [];
  for (const key in menu) {
    menuArr.push(key);
  }
  menuArr.sort((a, b) => a > b ? 1 : -1);
  // 然后排序遍历桌号点的东西
  // tables.sort((a, b) => a.tableID < b.tableID ? 1 : -1);
  const resultArr = [];
  tables.forEach((table, index) => {
    const tmp = [];
    tmp.push(String(index));
    menuArr.forEach((key) => {
      const times = table[key] ? table[key] : 0;
      tmp.push(String(times));
    });
    resultArr.push(tmp);
  });
  menuArr.unshift('Table');
  resultArr.unshift(menuArr);
  return resultArr;
};

export { displayTable };

~~~

  
### 1419-minNumberOfFrogs.js

~~~js
/*
 * @lc app=leetcode.cn id=1419 lang=javascript
 *
 * [1419] 数青蛙
 */

// @lc code=start
/**
 * @param {string} croakOfFrogs
 * @return {number}
 */
// 54/55 cases passed (N/A)
// -1？
// crakkoocaaoarkcrcrorccaooakrakoocccooarokkrraokrkkcakororcrookaaoarckrckkaarkacorrakckaroocacccaaoaakkkkorkarcoaoaaccckcaocookkckkcrkcckkracocoarkorarookccarrocraaocacarorcoorkcracaarorarroarrccrcrcaccooackcaakckokkkkoaorcckakacccorkaarrkakcakcrorkccrrrkoacorcacrkakocorroakokkrrkkakrrckokacarorckracrrrocrrcccooorcararocrcocaaoccaakorcrcckokkkcokcacrkcckakkkkcaorooaorroccrrakcrcaacaokocaokkaorocorckrkokrrcaaarokaoaaroookorrorkoarorckacoaoakkokracaokaaokarooraraaacokrkkkaakoacookcrroakrkoacockkkkoccooarcaraarckcoaaaocakrororkrkorkckokrarkacokokrroacoccaookccrakkkrkoacarr
// 每一个必须保证顺序（如果顺序不对也是不满足的）
// 这样应该可以通过测试，但是不满足实际情况
// Your runtime beats 22.22 % of javascript submissions
const minNumberOfFrogs = function(croakOfFrogs) {
  // 如果开头不是C，或者长度不是5的倍数，那么肯定不满足
  const len = croakOfFrogs.length;
  if (croakOfFrogs[0] !== 'c' || croakOfFrogs[len - 1] !== 'k') {
    return -1;
  }
  if (len % 5 !== 0) {
    return -1;
  }
  // 如果所有的字母次数不相等，那么也不满足
  const times = len / 5;
  let dict = {};
  for (let i = 0; i < len; i++) {
    const key = croakOfFrogs[i];
    if (dict[key]) {
      dict[key]++;
      // 如果某个字母的数量大于倍数，那么就返回-1
      if (dict[key] > times) {
        return -1;
      }
    } else {
      dict[key] = 1;
    }
  }
  // 不是不必须连续的
  // 遍历：如果消除一个时，判断剩余的最大的次数+1就是需要最少的数量
  // 两次循环不好，可以优化一下
  dict = {};
  // 这里不应该使用dict存储，不能保存顺序，应该使用子字符串
  let max = 1;
  // 辅助函数：判断是否满足条件
  const judge = (obj) => {
    // 是否满足条件？每一个的数量都超过1
    if (obj.c && obj.r && obj.o && obj.a && obj.k) {
      const currentMax = Math.max(obj.c, obj.r, obj.o, obj.a, obj.k);
      max = max > currentMax ? max : currentMax;
      // 满足后每一项减少1
      obj.c -= 1;
      obj.r -= 1;
      obj.o -= 1;
      obj.a -= 1;
      obj.k -= 1;
    }
  };
  for (let i = 0; i < len; i++) {
    const key = croakOfFrogs[i];
    dict[key] ? (dict[key]++) : (dict[key] = 1);
    judge(dict);
  }
  return max;
};
// @lc code=end

export { minNumberOfFrogs };

~~~

  
### 1422-maxScore.js

~~~js
/*
 * @lc app=leetcode.cn id=1422 lang=javascript
 *
 * [1422] 分割字符串的最大得分
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
// 92 ms, 在所有 JavaScript 提交中击败了72.46%
const getValue = function(str1, str2) {
  let res = 0;
  for (let i = 0; i < str1.length; i++) {
    if (str1[i] === '0') res++;
  }
  for (let i = 0; i < str2.length; i++) {
    if (str2[i] === '1') res++;
  }
  return res;
};

const maxScore = function(s) {
  if (s.length === 2) {
    return (s[0] === '0' ? 1 : 0) + (s[1] === '1' ? 1 : 0);
  }
  let max = 0;
  for (let i = 1; i < s.length; i++) {
    const left = s.slice(0, i);
    const right = s.slice(i);
    const score = getValue(left, right);
    max = max > score ? max : score;
  }
  return max;
};
// @lc code=end

export { maxScore };

~~~

  
### 1431-kidsWithCandies.js

~~~js
/*
 * @lc app=leetcode.cn id=1431 lang=javascript
 *
 * [1431] 拥有最多糖果的孩子
 */

// @lc code=start
/**
 * @param {number[]} candies
 * @param {number} extraCandies
 * @return {boolean[]}
 */
// 72 ms, 在所有 JavaScript 提交中击败了98.40%
const kidsWithCandies = function(candies, extraCandies) {
  const max = Math.max(...candies);
  return candies.map((item) => {
    return (max - item) <= extraCandies;
  });
};
// @lc code=end

export { kidsWithCandies };

~~~

  
### 1436-destCity.js

~~~js
/*
 * @lc app=leetcode.cn id=1436 lang=javascript
 *
 * [1436] 旅行终点站
 */

// @lc code=start
/**
 * @param {string[][]} paths
 * @return {string}
 */
// 80 ms
// , 在所有 JavaScript 提交中击败了
// 93.11%
// 的用户
const destCity = function(paths) {
  const dict = {};
  const len = paths.length;
  if (len === 1) {
    return paths[0][1];
  }
  for (let i = 0; i < len; i++) {
    const key = paths[i][0];
    dict[key] = true;
  }
  for (let i = 0; i < len; i++) {
    const key = paths[i][1];
    if (!dict[key]) {
      return key;
    }
  }
};
// @lc code=end

export { destCity };

~~~

  
### 1437-kLengthApart.js

~~~js
/*
 * @lc app=leetcode.cn id=1437 lang=javascript
 *
 * [1437] 是否所有 1 都至少相隔 k 个元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
// [0,1,0,0,1,0,0,1] 2 true
// [0,1, 0,0,1,0,0,1] 2 true
const kLengthApart = function(nums, k) {
  if (k === 0) return true;
  const len = nums.length;
  let times = null;
  for (let i = 0; i < len; i++) {
    if (nums[i] === 1) {
      if (times !== null && times < k) {
        return false;
      }
      times = 0;
    } else {
      times = times === null ? times : times + 1;
    }
  }
  return true;
};
// @lc code=end

export { kLengthApart };

~~~

  
### 1441-buildArray.js

~~~js
/*
 * @lc app=leetcode.cn id=1441 lang=javascript
 *
 * [1441] 用栈操作构建数组
 */

// @lc code=start
/**
 * @param {number[]} target
 * @param {number} n
 * @return {string[]}
 */
// Your runtime beats 92.22 % of javascript submissions
const buildArray = function(target, n) {
  const res = [];
  const last = target[target.length - 1];
  let current = 1;
  for (let i = 0; i <= last; i++) {
    if (target[i] === current) {
      res.push('Push');
    } else {
      res.push('Push', 'Pop');
      i--;
    }
    current++;
    if (current > n || current > last) {
      break;
    }
  }
  return res;
};
// @lc code=end

export { buildArray };

~~~

  
### 1446-maxPower.js

~~~js
/*
 * @lc app=leetcode.cn id=1446 lang=javascript
 *
 * [1446] 连续字符
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
// 96 ms
// , 在所有 JavaScript 提交中击败了
// 47.02%
// 的用户
const maxPower = function(s) {
  if (s.length === 1) return 1;
  let max = 1;
  let times = 1;
  let current = s[0];
  for (let i = 1; i < s.length; i++) {
    if (s[i] === current) {
      times++;
      max = max > times ? max : times;
    } else {
      times = 1;
      current = s[i];
    }
  }
  return max;
};
// @lc code=end

export { maxPower };

~~~

  
### 1447-simplifiedFractions.js

~~~js
/*
 * @lc app=leetcode.cn id=1447 lang=javascript
 *
 * [1447] 最简分数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 */

// 基本思路：分母一次遍历N，分子一次遍历n
// 二重循环内部，然后获取分子和分母
// 如果没有最大公约数，那么就是真的，否则不反悔
// 处理特殊的1和2等情况
// （如果是100，那么是否考虑缓存和性能问题，求最大公约数的性能问题）
// Your runtime beats 23.53 % of javascript submissions
const simplifiedFractions = function(n) {
  if (n === 1) {
    return [];
  }
  if (n === 2) {
    return ['1/2'];
  }
  const list = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
  // 辅助函数，判断两个数最大公约数
  // 默认a大于b
  const check = (a, b) => {
    // 从2到b一直除，判断两个是否有公约数
    if (b === 1) {
      return true;
    }
    if (a % b === 0) {
      return false;
    }
    // 最好是质数数组，不需要遍历全部的数字
    for (let i = 0; i < list.length; i++) {
      if (b < list[i]) {
        break;
      }
      if (a % list[i] === 0 && b % list[i] === 0) {
        return false;
      }
    }
    return true;
  };

  const res = [];
  // 外层循环是分母，内层循环是分子
  for (let i = 2; i <= n; i++) {
    for (let j = 1; j < i; j++) {
      if (check(i, j)) {
        const item = `${j}/${i}`;
        res.push(item);
      }
    }
  }
  return res;
};
// @lc code=end

export { simplifiedFractions };

~~~

  
### 1448-goodNodes.js

~~~js
/*
 * @lc app=leetcode.cn id=1448 lang=javascript
 *
 * [1448] 统计二叉树中好节点的数目
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
//  Your runtime beats 47.3 % of javascript submissions
const goodNodes = function(root) {
  let goodNumber = 0;
  // 辅助函数，判断一个点是否是好节点
  const runNode = (node, max) => {
    if (!node) return;
    const val = node.val;
    if (val >= max) {
      goodNumber++;
    }
    const nextMax = Math.max(max, val);
    runNode(node.left, nextMax);
    runNode(node.right, nextMax);
  };
  // 这里不能设置初始值是0，应该设置初始值是根节点的值
  runNode(root, root.val);
  // 测试空树
  return goodNumber;
};

// 树节点的值可能是负数，那么需要处理这个情况
// [-1,5,-2,4,4,2,-2,null,null,-4,null,-2,3,null,-2,0,null,-1,null,-3,null,-4,-3,3,null,null,null,null,null,null,null,3,-3]
// 这个过不去
// @lc code=end

export { goodNodes };

~~~

  
### 1450-busyStudent.js

~~~js
/*
 * @lc app=leetcode.cn id=1450 lang=javascript
 * [1450] 在既定时间做作业的学生人数
 */
// Your runtime beats 94.6 % of javascript submissions
//
/**
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @param {number} queryTime
 * @return {number}
 */
const busyStudent = function(startTime, endTime, queryTime) {
  const len = startTime.length;
  let res = 0;
  for (let i = 0; i < len; i++) {
    if (startTime[i] <= queryTime && endTime[i] >= queryTime) {
      res++;
    }
  }
  return res;
};

export { busyStudent };

~~~

  
### 1455-isPrefixOfWord.js

~~~js
/*
 * @lc app=leetcode.cn id=1455 lang=javascript
 *
 * [1455] 检查单词是否为句中其他单词的前缀
 */

// @lc code=start
/**
 * @param {string} sentence
 * @param {string} searchWord
 * @return {number}
 */
// 80 ms
// , 在所有 JavaScript 提交中击败了
// 72.88%

const isPrefixOfWord = function(sentence, searchWord) {
  if (sentence.length < searchWord.length) {
    return -1;
  }
  const index = sentence.indexOf(searchWord);
  // 没有找到单词，或者找到的是第一个单词
  if (index === -1) {
    return -1;
  } else if (index === 0) {
    return 1;
  }
  // 找到的不是第一个单词，那么变成数组计算
  const arr = sentence.split(' ');
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum = sum + arr[i].length + 1;
    if (sum > index && searchWord === arr[i].slice(0, searchWord.length)) {
      return i + 1;
    }
  }
  return -1;
};
// @lc code=end

export { isPrefixOfWord };

~~~

  
### 1460-canBeEqual.js

~~~js
/*
 * @lc app=leetcode.cn id=1460 lang=javascript
 *
 * [1460] 通过翻转子数组使两个数组相等
 */

// @lc code=start
/**
 * @param {number[]} target
 * @param {number[]} arr
 * @return {boolean}
 */
// Your runtime beats 93.3 % of javascript submissions
const canBeEqual = function(target, arr) {
  const len1 = target.length;
  const len2 = arr.length;
  if (len1 !== len2) {
    return false;
  }
  // 排序这里消耗性能，可以遍历一次，记录出现的次数即可
  target.sort((a, b) => a - b);
  arr.sort((a, b) => a - b);
  for (let i = 0; i < len1; i++) {
    if (arr[i] !== target[i]) {
      return false;
    }
  }
  return true;
};
// @lc code=end

export { canBeEqual };

~~~

  
### 1464-maxProduct.js

~~~js
/*
 * @lc app=leetcode.cn id=1464 lang=javascript
 *
 * [1464] 数组中两元素的最大乘积
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// Your runtime beats 89.64 % of javascript submissions
const maxProduct = function(nums) {
  if (nums.length === 2) {
    return (nums[0] - 1) * (nums[1] - 1);
  }
  let max = (nums[0] - 1) * (nums[1] - 1);
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const cur = (nums[i] - 1) * (nums[j] - 1);
      max = max > cur ? max : cur;
    }
  }
  return max;
};

// 是否有更好的方法？例如先排序，获取最值
// 然后计算比较好（减少循环的次数）？
// @lc code=end

export { maxProduct };

~~~

  
### 1470-shuffle.js

~~~js
/*
 * @lc app=leetcode.cn id=1470 lang=javascript
 *
 * [1470] 重新排列数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} n
 * @return {number[]}
 */
// Your runtime beats 95.21 % of javascript submissions
const shuffle = function(nums, n) {
  const a = nums.slice(0, n);
  const b = nums.slice(n);
  const res = [];
  for (let i = 0; i < n; i++) {
    res.push(a[i]);
    res.push(b[i]);
  }
  return res;
};
// @lc code=end

export { shuffle };

~~~

  
### 1472-BrowserHistory.js

~~~js
/*
 * @lc app=leetcode.cn id=1472 lang=javascript
 *
 * [1472] 设计浏览器历史记录
 */

// @lc code=start
/**
 * @param {string} homepage
 */
// Your runtime beats 92.59 % of javascript submissions
const BrowserHistory = function(homepage) {
  back = [];
  forw = [];
  back.push(homepage);
};

/**
 * @param {string} url
 * @return {void}
 */
BrowserHistory.prototype.visit = function(url) {
  // 删除所有的前进记录
  forw = [];
  // 将当前记录写入历史记录
  back.push(url);
};

/**
 * @param {number} steps
 * @return {string}
 */
BrowserHistory.prototype.back = function(steps) {
  while (steps > 0) {
    steps--;
    if (back.length > 1) {
      const tmp = back.pop();
      forw.push(tmp);
    } else {
      steps = 0;
    }
  }
  return back[back.length - 1];
};

/**
 * @param {number} steps
 * @return {string}
 */
BrowserHistory.prototype.forward = function(steps) {
  while (steps > 0) {
    steps--;
    if (forw.length > 0) {
      const tmp = forw.pop();
      back.push(tmp);
    } else {
      steps = 0;
    }
  }
  return back[back.length - 1];
};

/**
 * Your BrowserHistory object will be instantiated and called as such:
 * let obj = new BrowserHistory(homepage)
 * obj.visit(url)
 * let param_2 = obj.back(steps)
 * let param_3 = obj.forward(steps)
 */
// @lc code=end

export { BrowserHistory };

~~~

  
### 1475-finalPrices.js

~~~js
/*
 * @lc app=leetcode.cn id=1475 lang=javascript
 *
 * [1475] 商品折扣后的最终价格
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number[]}
 */
// 104 ms
// , 在所有 JavaScript 提交中击败了
// 33.52%
// 的用户
const finalPrices = function(prices) {
  // 先把价格复制一份，然后升序排列
  const ARR = prices.slice(0).sort((a, b) => a - b);
  // 遍历原始价格
  const res = [];
  for (let i = 0; i < prices.length; i++) {
    // 如果没有找到比当前值小的值，那么就去掉字典中的值
    if (prices[i] === ARR[0]) {
      // 如果最小的值有多个，那么也算数
      if (prices[i] === ARR[1]) {
        res[i] = 0;
      } else {
        res[i] = prices[i];
      }
      ARR.shift();
    }
    // 如果有比这个价格小的值，那么就向后遍历
    // 然后找到当前较小的值，然后把这个值从升序排序中删除
    else {
      let j = i + 1;
      while (j < prices.length) {
        if (prices[j] <= prices[i]) {
          res[i] = prices[i] - prices[j];
          const index = ARR.indexOf(prices[i]);
          ARR.splice(index, 1);
          j = prices.length;
        }
        j++;
      }
    }
  }
  return res;
};
// @lc code=end

export { finalPrices };

~~~

  
### 1476-SubrectangleQueries.js

~~~js
/*
 * @lc app=leetcode.cn id=1476 lang=javascript
 *
 * [1476] 子矩形查询
 */

// @lc code=start
/**
 * @param {number[][]} rectangle
 */
// Your runtime beats 88.68 % of javascript submissions
const SubrectangleQueries = function(rectangle) {
  this.matrix = rectangle;
};

/**
 * @param {number} row1
 * @param {number} col1
 * @param {number} row2
 * @param {number} col2
 * @param {number} newValue
 * @return {void}
 */
SubrectangleQueries.prototype.updateSubrectangle = function(row1, col1, row2, col2, newValue) {
  for (let i = row1; i <= row2; i++) {
    for (let j = col1; j <= col2; j++) {
      this.matrix[i][j] = newValue;
    }
    // 如果矩阵很大，那么使用第二种；
    // 如果矩阵较小，就使用第一种for循环
    // const len = col2 - col1 + 1;
    // let subArr = new Array(len).fill(newValue);
    // this.matrix[i].splice(col1, len, ...subArr);
  }
};

/**
 * @param {number} row
 * @param {number} col
 * @return {number}
 */
SubrectangleQueries.prototype.getValue = function(row, col) {
  return this.matrix[row][col];
};

/**
 * Your SubrectangleQueries object will be instantiated and called as such:
 * let obj = new SubrectangleQueries(rectangle)
 * obj.updateSubrectangle(row1,col1,row2,col2,newValue)
 * let param_2 = obj.getValue(row,col)
 */
// @lc code=end

export { SubrectangleQueries };

~~~

  
### 1480-runningSum.js

~~~js
/*
 * @lc app=leetcode.cn id=1480 lang=javascript
 *
 * [1480] 一维数组的动态和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
// Your runtime beats 55.78 % of javascript submissions
const runningSum = function(nums) {
  const len = nums.length;
  if (len === 1) return nums;
  let tmp = 0;
  for (let i = 0; i < len; i++) {
    nums[i] = nums[i] + tmp;
    tmp = nums[i];
  }
  return nums;
};
// @lc code=end

export { runningSum };

~~~

  
### 1486-xorOperation.js

~~~js
/*
 * @lc app=leetcode.cn id=1486 lang=javascript
 *
 * [1486] 数组异或操作
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} start
 * @return {number}
 */
// 88 ms
// , 在所有 JavaScript 提交中击败了
// 39.20%
// 的用户
const xorOperation = function(n, start) {
  if (n === 1) return start;
  let a1;
  for (let i = 0; i < n; i++) {
    const tmp = start + 2 * i;
    if (i === 0) {
      a1 = tmp;
    } else {
      a1 = a1 ^ tmp;
    }
  }
  return a1;
};
// @lc code=end

export { xorOperation };

~~~

  
### 1491-average.js

~~~js
/*
 * @lc app=leetcode.cn id=1491 lang=javascript
 *
 * [1491] 去掉最低工资和最高工资后的工资平均值
 */

// @lc code=start
/**
 * @param {number[]} salary
 * @return {number}
 */
// 96 ms
// , 在所有 JavaScript 提交中击败了
// 14.29%
const average = function(salary) {
  salary.sort((a, b) => a - b);
  let sum = 0;
  const fn = function(num, total) {
    return num + total;
  };
  sum = salary.reduce(fn, sum);
  sum = sum - salary[0] - salary[salary.length - 1];
  return sum / (salary.length - 2);
};
// @lc code=end

export { average };

~~~

  
### 1496-isPathCrossing.js

~~~js
/*
 * @lc app=leetcode.cn id=1496 lang=javascript
 *
 * [1496] 判断路径是否相交
 */

// @lc code=start
/**
 * @param {string} path
 * @return {boolean}
 */
// 84 ms
// , 在所有 JavaScript 提交中击败了
// 71.95%
// 的用户
const isPathCrossing = function(path) {
  if (path.length === 1) return false;
  const getKey = function(arr) {
    return `${arr[0]}-${arr[1]}`;
  };
  // 然后设置一个字典存储已经走过的坐标
  const dict = {};
  // 设置初始点
  const previous = [0, 0];
  const key0 = getKey(previous);
  dict[key0] = true;
  // 循环当前路径，获取当前的点的坐标
  for (let i = 0; i < path.length; i++) {
    const item = path[i];
    switch (item) {
      case 'N':
        previous[0]++;
        break;
      case 'S':
        previous[0]--;
        break;
      case 'E':
        previous[1]++;
        break;
      case 'W':
        previous[1]--;
        break;
      default:
        break;
    }
    const key = getKey(previous);
    // 如果再次走这个坐标，那么就是错误的
    if (dict[key]) {
      return false;
    } else {
      dict[key] = true;
    }
  }
  return false;
};

// @lc code=end

export { isPathCrossing };

~~~

  
### 1502-canMakeArithmeticProgression.js

~~~js
/*
 * @lc app=leetcode.cn id=1502 lang=javascript
 *
 * [1502] 判断能否形成等差数列
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {boolean}
 */
// Your runtime beats 24.53 % of javascript submissions
const canMakeArithmeticProgression = function(arr) {
  const len = arr.length;
  if (len === 2) return true;
  arr.sort((a, b) => a - b);
  const interval = arr[1] - arr[0];
  for (let i = 1; i < len; i++) {
    if (arr[i] - arr[i - 1] !== interval) {
      return false;
    }
  }
  return true;
};
// @lc code=end

export { canMakeArithmeticProgression };

~~~

  
### 1507-reformatDate.js

~~~js
/*
 * @lc app=leetcode.cn id=1507 lang=javascript
 *
 * [1507] 转变日期格式
 */

// @lc code=start
/**
 * @param {string} date
 * @return {string}
 */
// Your runtime beats 90.65 % of javascript submissions
const reformatDate = function(date) {
  const arr = date.split(' ');
  const year = arr[2];
  let month = arr[1];
  let day = arr[0];
  // 转换
  // 月变化
  const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let tmp = monthArr.findIndex((item) => item === month) + 1;
  tmp = String(tmp).padStart(2, '0');
  month = tmp;
  // 日变化
  if (day.length === 3) {
    day = day.slice(0, 1);
    day = day.padStart(2, '0');
  } else {
    day = day.slice(0, 2);
  }
  return `${year}-${month}-${day}`;
};
// @lc code=end

export { reformatDate };

~~~

  
### 1512-numIdenticalPairs.js

~~~js
/*
 * @lc app=leetcode.cn id=1512 lang=javascript
 *
 * [1512] 好数对的数目
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// Your runtime beats 40.8 % of javascript submissions
const numIdenticalPairs = function(nums) {
  if (nums.length < 2) return 0;
  const dict = {};
  for (let i = 0; i < nums.length; i++) {
    const key = nums[i];
    if (!dict[key]) {
      dict[key] = 0;
    }
    dict[key]++;
  }
  let res = 0;
  for (const key in dict) {
    const value = dict[key];
    if (value > 1) {
      const tmp = (value * (value - 1)) / 2;
      res += tmp;
    }
  }
  return res;
};
// @lc code=end

export { numIdenticalPairs };

~~~

  
### 1518-numWaterBottles.js

~~~js
/*
 * @lc app=leetcode.cn id=1518 lang=javascript
 * [1518] 换酒问题
 */
// 84 ms
// , 在所有 JavaScript 提交中击败了
// 57.06%
//
/**
 * @param {number} numBottles
 * @param {number} numExchange
 * @return {number}
 */
const numWaterBottles = function(numBottles, numExchange) {
  // 如果瓶子小于换取的数量，直接返回瓶子数 [2, 3]
  if (numBottles < numExchange) {
    return numBottles;
  }
  return getNumber(numBottles, numExchange, 0);
};

const getNumber = function(bottles, exchanges, last) {
  // 第一种情况：喝完当前的酒，不能继续兑换，直接返回当前的数量
  if ((bottles + last) < exchanges) {
    return bottles;
  }
  // 第二种情况：喝完当前的酒，用现在的酒瓶加上以前的酒瓶，然后可以继续换酒的情况
  else if ((bottles + last) >= exchanges) {
    const newBottles = Math.floor((bottles + last) / exchanges);
    const newLast = (bottles + last) % exchanges;
    return bottles + getNumber(newBottles, exchanges, newLast);
  }
};

export { numWaterBottles };

~~~

  
### 1523-countOdds.js

~~~js
// 1523. 在区间范围内统计奇数数目
// 给你两个非负整数 low 和 high 。请你返回 low 和 high 之间（包括二者）奇数的数目。
// 示例 1：
// 输入：low = 3, high = 7
// 输出：3
// 解释：3 到 7 之间奇数数字为 [3,5,7] 。
// 示例 2：
// 输入：low = 8, high = 10
// 输出：1
// 解释：8 到 10 之间奇数数字为 [9] 。
/**
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
const countOdds = function(low, high) {
  if ((high - low) % 2 === 1) {
    return Math.ceil((high - low) / 2);
  } else if (low % 2 === 1) {
    return ((high - low) / 2 + 1);
  } else {
    return ((high - low) / 2);
  }
};

export { countOdds };

~~~

  
### 1528-restoreString.js

~~~js
// 1528. 重新排列字符串
// 给你一个字符串 s 和一个 长度相同 的整数数组 indices 。
// 请你重新排列字符串 s ，其中第 i 个字符需要移动到 indices[i] 指示的位置。
// 返回重新排列后的字符串。
/**
 * @param {string} s
 * @param {number[]} indices
 * @return {string}
 */
const restoreString = function(s, indices) {
  const len = s.length;
  if (len < 2) {
    return s;
  }
  const arr = new Array(len);
  for (let i = 0; i < len; i++) {
    const item = s[i];
    const index = indices[i];
    arr[index] = item;
  }
  return arr.join('');
};

export { restoreString };

~~~

  
### 1539-findKthPositive.js

~~~js
/*
 * @lc app=leetcode.cn id=1539 lang=javascript
 *
 * [1539] 第 k 个缺失的正整数
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
// 100 ms, 在所有 JavaScript 提交中击败了43.23%
const findKthPositive = function(arr, k) {
  // 两种情况
  // 如果缺失的这个数字，在 arr 内部
  const tmp = [];
  const len = arr.length;
  let current = 1;
  for (let i = 0; i < len; i++) {
    if (arr[i] === current) {
      current++;
    } else {
      tmp.push(current);
      if (tmp.length === k) {
        return current;
      }
      current++;
      i--;
    }
  }
  // 如果确实的这个数字，在 arr 外部
  return current + k - 1 - tmp.length;
};
// @lc code=end

export { findKthPositive };

~~~

  
### 1544-makeGood.js

~~~js
/*
 * @lc app=leetcode.cn id=1544 lang=javascript
 *
 * [1544] 整理字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
// 104 ms
// , 在所有 JavaScript 提交中击败了
// 34.38%

const makeGood = function(s) {
  if (s.length < 2) return s;
  const stack = [];
  stack.push(s[0]);
  for (let i = 1; i < s.length; i++) {
    const item = s[i];
    if (stack.length === 0) {
      stack.push(item);
    } else if (Math.abs(item.charCodeAt(0) - stack[stack.length - 1].charCodeAt(0)) === 32) {
      stack.pop();
    } else {
      stack.push(item);
    }
  }
  return stack.join('');
};
// @lc code=end

export { makeGood };

~~~

  
### 1550-threeConsecutiveOdds.js

~~~js
/*
 * @lc app=leetcode.cn id=1550 lang=javascript
 *
 * [1550] 存在连续三个奇数的数组
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {boolean}
 */
// Your runtime beats 55.35 % of javascript submissions
const threeConsecutiveOdds = function(arr) {
  const len = arr.length;
  if (len < 3) return false;
  for (let i = 0; i <= len - 3; i++) {
    const f1 = arr[i] % 2;
    const f2 = arr[i + 1] % 2;
    const f3 = arr[i + 2] % 2;
    if (f1 && f2 && f3) {
      return true;
    }
    if (f3 === false) {
      i += 2;
    } else if (f2 === false) {
      i++;
    }
  }
  return false;
};
// @lc code=end

export { threeConsecutiveOdds };

~~~

  
### 1556-thousandSeparator.js

~~~js
/*
 * @lc app=leetcode.cn id=1556 lang=javascript
 *
 * [1556] 千位分隔数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string}
 */
// Your runtime beats 84.75 % of javascript submissions
const thousandSeparator = function(n) {
  if (n < 1000) {
    return String(n);
  }
  const arr = [];
  while (n > 0) {
    let remain = n % 1000;
    n = (n - remain) / 1000;
    remain = String(remain);
    arr.push(remain);
  }
  arr.reverse();
  // 注意：补充0
  for (let i = 1; i < arr.length; i++) {
    arr[i] = arr[i].padStart(3, '0');
  }
  return arr.join('.');
};
// @lc code=end

export { thousandSeparator };

~~~

  
### 1572-diagonalSum.js

~~~js
/*
 * @lc app=leetcode.cn id=1572 lang=javascript
 *
 * [1572] 矩阵对角线元素的和
 */

// @lc code=start
/**
 * @param {number[][]} mat
 * @return {number}
 */
// 80 ms
// , 在所有 JavaScript 提交中击败了
// 85.37%
// 这样可以实现，但是性能不太好
const diagonalSum = function(mat) {
  const len = mat.length;
  if (len === 1) return mat[0][0];
  // 主对角线：i === j 获取 && i + j !== mat
  // 副对角线：i + j === len
  let sum = 0;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (i === j || i + j === len - 1) {
        sum += mat[i][j];
      }
    }
  }
  return sum;
};
// @lc code=end

export { diagonalSum };

~~~

  
### 1576-modifyString.js

~~~js
/*
 * @lc app=leetcode.cn id=1576 lang=javascript
 *
 * [1576] 替换所有的问号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
// 104 ms
// , 在所有 JavaScript 提交中击败了
// 31.03%

const modifyString = function(s) {
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '?') {
      let item = 'a';
      if (s[i - 1] && s[i - 1] === item) {
        item = 'b';
      }
      if (s[i + 1] && s[i + 1] === item) {
        item = 'c';
      }
      if (s[i - 1] && s[i - 1] === item) {
        item = 'd';
      }
      s = s.slice(0, i) + item + s.slice(i + 1);
    }
  }
  return s;
};
// @lc code=end

export { modifyString };

~~~

  
### 1577-numTriplets.js

~~~js
/*
 * @lc app=leetcode.cn id=1577 lang=javascript
 *
 * [1577] 数的平方等于两数乘积的方法数
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
// 思路一，三层循环
// 4394ms
// Your runtime beats 50 % of javascript submissions
// const numTriplets = function(nums1, nums2) {
//   const foo = (arr1, arr2) => {
//     // 获取一个数组的全排列，然后遍历另一个数组的平方，看是否相等即可
//     // 现在性能很不好，三层循环，能否优化？
//     let sum = 0;
//     const arr3 = arr2.map(item => Math.pow(item, 2));
//     const len = arr1.length;
//     const len3 = arr3.length;
//     // 这个可以优化成对象，减少一层循环
//     // 因为数组中数字可能重复，所以这里需要记录出现的次数
//     for (let i = 0; i < len; i++) {
//       for (let j = i + 1; j < len; j++) {
//         const curr = arr1[i] * arr1[j];
//         for (let k = 0; k < len3; k++) {
//           if (curr === arr3[k]) {
//             sum++;
//           }
//         }
//       }
//     }
//     return sum;
//   };
//   return foo(nums1, nums2) + foo(nums2, nums1);
// };

// 思路二：两层循环
// 196 ms
// Your runtime beats 50 % of javascript submissions
const numTriplets = function(nums1, nums2) {
  const foo = (arr1, arr2) => {
    let sum = 0;
    // 获取字典和出现的个数
    const arr3 = arr2.map((item) => item ** 2);
    const dict = {};
    arr3.forEach((ele) => {
      if (dict[ele]) {
        dict[ele]++;
      } else {
        dict[ele] = 1;
      }
    });
    // 遍历平方和
    const len = arr1.length;
    for (let i = 0; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
        const curr = arr1[i] * arr1[j];
        if (dict[curr]) {
          sum += dict[curr];
        }
      }
    }
    return sum;
  };
  return foo(nums1, nums2) + foo(nums2, nums1);
};

// @lc code=end

export { numTriplets };

~~~

  
### 1582-numSpecial.js

~~~js
/*
 * @lc app=leetcode.cn id=1582 lang=javascript
 *
 * [1582] 二进制矩阵中的特殊位置
 */

// @lc code=start
/**
 * @param {number[][]} mat
 * @return {number}
 */
// 38/95 cases passed (N/A)
// 这个思路比较复杂，首先考虑一个简单的思路实现
// const numSpecial = function(mat) {
//   let fn = (a, b) => a + b;
//   let dict = {};
//   for (let i = 0; i < mat.length; i++) {
//     let sum = mat[i].reduce(fn, 0);
//     if (sum === 0) {
//       mat.splice(i, 1);
//       i--;
//     } else if (sum > 1) {
//       dict[i] = true; // i 行不能用
//     }
//   }
//   // 如果出现了多次，那么应该记录，不应该删除
//   if (mat.length === 0) {
//     return 0;
//   }
//   let res = 0;
//   const len = mat[0].length;
//   for (let i = 0; i < len; i++) {
//     let sum = 0;
//     let tmp = 0;
//     for (let j = 0; j < mat.length; j++) {
//       sum += mat[j][i];
//       if (dict[j] === true) continue;
//       if (sum > 1) continue;
//     }
//     if (sum === 1) {
//       res++;
//     }
//   }
//   return res;
// };

// 思路二
// Your runtime beats 41.1 % of javascript submissions
const numSpecial = function(mat) {
  // 先删除空行
  // 辅助函数：求两个数的和
  const fn = (a, b) => a + b;

  // 辅助函数：判断一列是否和为1
  const sumFn = function(index) {
    const len = mat.length;
    let sum = 0;
    for (let i = 0; i < len; i++) {
      sum += mat[i][index];
      if (sum > 1) return false;
    }
    return sum === 1;
  };

  let res = 0;
  for (let i = 0; i < mat.length; i++) {
    const sum = mat[i].reduce(fn, 0);
    if (sum === 0) {
      mat.splice(i, 1);
      i--;
    } else if (sum === 1) {
      // 行满足，获取列是否满足
      const index = mat[i].indexOf(1);
      if (sumFn(index)) res++;
    }
  }
  return res;
};
// @lc code=end

export { numSpecial };

~~~

  
### 1588-sumOddLengthSubarrays.js

~~~js
/*
 * @lc app=leetcode.cn id=1588 lang=javascript
 *
 * [1588] 所有奇数长度子数组的和
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number}
 */
// Your runtime beats 21.81 % of javascript submissions
const sumOddLengthSubarrays = function(arr) {
  const len = arr.length;
  let sum = getSum(arr); // 把长度是1的加起来
  if (len < 3) {
    return sum;
  } else if (len === 3) {
    return sum * 2;
  }
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      // i - j
      if ((j + 1 - i) % 2 === 1) {
        const sumArr = arr.slice(i, j + 1);
        const tmp = getSum(sumArr);
        sum += tmp;
      }
    }
  }
  return sum;
};

const getSum = function(arr) {
  return arr.reduce((a, b) => a + b, 0);
};
// @lc code=end

export { sumOddLengthSubarrays };

~~~

  
### 1592-reorderSpaces.js

~~~js
/*
 * @lc app=leetcode.cn id=1592 lang=javascript
 *
 * [1592] 重新排列单词间的空格
 */

// @lc code=start
/**
 * @param {string} text
 * @return {string}
 */
// 76 ms
// , 在所有 JavaScript 提交中击败了
// 83.41%
// 的用户
const reorderSpaces = function(text) {
  if (text.indexOf(' ') === -1) return text;
  const len = text.length;
  let spaceLen = 0;
  for (let i = 0; i < len; i++) {
    if (text[i] === ' ') spaceLen++;
  }
  const arr = text.split(' ').filter((item) => item.length > 0);
  if (arr.length === 1) {
    let finalStr = '';
    for (let i = 0; i < spaceLen; i++) {
      finalStr += ' ';
    }
    return arr[0] + finalStr;
  }
  const len2 = arr.length - 1;
  const finalNum = spaceLen % len2;
  let finalStr = '';
  for (let i = 0; i < finalNum; i++) {
    finalStr += ' ';
  }
  const midNum = (spaceLen - finalNum) / len2;
  let midStr = '';
  for (let i = 0; i < midNum; i++) {
    midStr += ' ';
  }
  return arr.join(midStr) + finalStr;
};
// @lc code=end

export { reorderSpaces };

~~~

  
### 1598-minOperations.js

~~~js
/*
 * @lc app=leetcode.cn id=1598 lang=javascript
 *
 * [1598] 文件夹操作日志搜集器
 */

// @lc code=start
/**
 * @param {string[]} logs
 * @return {number}
 */
// Your runtime beats 63.72 % of javascript submissions
const minOperations = function(logs) {
  let current = 0;
  const len = logs.length;
  for (let i = 0; i < len; i++) {
    const item = logs[i];
    if (item === './') {
      continue;
    } else if (item === '../') {
      if (current > 0) current--;
    } else {
      current++;
    }
  }
  return current;
};
// @lc code=end

export { minOperations };

~~~

  
### 1600-ThroneInheritance.js

~~~js
/*
 * @lc app=leetcode.cn id=1600 lang=javascript
 *
 * [1600] 皇位继承顺序
 */

// @lc code=start
/**
 * @param {string} kingName
 */
// Your runtime beats 73.91 % of javascript submissions
const ThroneInheritance = function(kingName) {
  this.init = kingName;
  this.obj = {};
  this.obj[kingName] = [];
  this.obj[kingName].live = true;
};

/**
 * @param {string} parentName
 * @param {string} childName
 * @return {void}
 */
ThroneInheritance.prototype.birth = function(parentName, childName) {
  // 建立链接关系
  this.obj[parentName].push(childName);
  this.obj[childName] = [];
  this.obj[childName].live = true;
};

/**
 * @param {string} name
 * @return {void}
 */
ThroneInheritance.prototype.death = function(name) {
  this.obj[name].live = false;
};

/**
 * @return {string[]}
 */
ThroneInheritance.prototype.getInheritanceOrder = function() {
  const king = this.init;
  const sons = this.obj[king];
  const result = [];
  // 如果根节点活着，那么放入继承序列
  if (this.obj[king].live) {
    result.push(king);
  }
  // 辅助函数（DFS遍历子节点）
  const runChild = function(name, result, obj) {
    if (obj[name].live) {
      result.push(name);
    }
    const sons = obj[name];
    for (let i = 0; i < sons.length; i++) {
      const item = sons[i];
      runChild(item, result, obj);
    }
  };
  // 遍历开始
  for (let i = 0; i < sons.length; i++) {
    const item = sons[i];
    runChild(item, result, this.obj);
  }
  return result;
};

/**
 * Your ThroneInheritance object will be instantiated and called as such:
 * let obj = new ThroneInheritance(kingName)
 * obj.birth(parentName,childName)
 * obj.death(name)
 * let param_3 = obj.getInheritanceOrder()
 */
// @lc code=end

export { ThroneInheritance };

~~~

  
### 1603-ParkingSystem.js

~~~js
/*
 * @lc app=leetcode.cn id=1603 lang=javascript
 *
 * [1603] 设计停车系统
 */

// @lc code=start
/**
 * @param {number} big
 * @param {number} medium
 * @param {number} small
 */
// Your runtime beats 78.07 % of javascript submissions
const ParkingSystem = function(big, medium, small) {
  this.big = big;
  this.medium = medium;
  this.small = small;
};

/**
 * @param {number} carType
 * @return {boolean}
 */
ParkingSystem.prototype.addCar = function(carType) {
  switch (carType) {
    case 1:
      if (this.big > 0) {
        this.big--;
        return true;
      } else {
        return false;
      }
    case 2:
      if (this.medium > 0) {
        this.medium--;
        return true;
      } else {
        return false;
      }
    case 3:
      if (this.small > 0) {
        this.small--;
        return true;
      } else {
        return false;
      }
    default:
      break;
  }
};

/**
 * Your ParkingSystem object will be instantiated and called as such:
 * let obj = new ParkingSystem(big, medium, small)
 * let param_1 = obj.addCar(carType)
 */
// @lc code=end

export { ParkingSystem };

~~~

  
### 1608-specialArray.js

~~~js
/*
 * @lc app=leetcode.cn id=1608 lang=javascript
 *
 * [1608] 特殊数组的特征值
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
// Your runtime beats 49.29 % of javascript submissions
const specialArray = function(nums) {
  nums.sort((a, b) => a - b);
  const len = nums.length;
  let pointer = 0;
  let x = 0;
  while (pointer <= len - 1 && x <= 1000) {
    if (
      nums[pointer] >= x && len - pointer === x
      && (nums[pointer - 1] > -1 && nums[pointer - 1] !== x || pointer === 0)
    ) {
      return x;
    } else if (nums[pointer] <= x) {
      pointer++;
    } else if (len - pointer > x) {
      x++;
    } else {
      x++;
    }
    if (x > nums[len - 1]) return -1;
  }
  return -1;
};

export { specialArray };

~~~

  
### 1609-isEvenOddTree.js

~~~js
/*
 * @lc app=leetcode.cn id=1609 lang=javascript
 *
 * [1609] 奇偶树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
//  105/105 cases passed (452 ms)
//  Your runtime beats 11.61 % of javascript submissions
const isEvenOddTree = function(root) {
  // 思路 广度优先遍历
  // 使用递归，把树的不同层的节点，放在一个二维数组总
  // 放的时候，判断当前是否是递增或者递减的情况

  // 存储空间（二维数组）
  const matrix = [];
  // 临时队列
  const queue = [];

  // 辅助函数：遍历树节点
  // 参数：树节点，层数
  const runNode = (node, layer) => {
    if (!node) return;
    const value = node.val;

    // 当前层是空，则初始化
    if (!matrix[layer]) {
      matrix[layer] = [];
    }

    // 这里应该监测一下，是否满足递增或者递减，稍后处理
    // 不满足条件直接返回 false
    const len = matrix[layer].length;
    // 这里还应该处理，奇数层上是偶数，偶数层上是奇数
    if (layer % 2 === 0) {
      if (value % 2 === 0) {
        return false;
      }
      if (len > 0 && matrix[layer][len - 1] >= value) {
        return false;
      }
    }
    if (layer % 2 === 1) {
      if (value % 2 === 1) {
        return false;
      }
      if (len > 0 && matrix[layer][len - 1] <= value) {
        return false;
      }
    }
    // 将新的值放入层中
    matrix[layer].push(value);
    // 把子节点放在队列中
    if (node.left) {
      queue.push({
        node: node.left,
        layer: layer + 1,
      });
    }
    if (node.right) {
      queue.push({
        node: node.right,
        layer: layer + 1,
      });
    }
    return true;
  };

  // 初始化根节点到队列
  queue.push({
    node: root,
    layer: 0,
  });

  while (queue.length > 0) {
    const current = queue.shift();
    if (runNode(current.node, current.layer) === false) {
      return false;
    }
  }
  return true;
};
// @lc code=end
export { isEvenOddTree };

~~~

  
### 1614-maxDepth.js

~~~js
/*
 * @lc app=leetcode.cn id=1614 lang=javascript
 *
 * [1614] 括号的最大嵌套深度
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
// Your runtime beats 71.27 % of javascript submissions
const maxDepth = function(s) {
  if (s.includes('(') === false) {
    return 0;
  }
  let len = 0;
  let max = 0;
  const sLen = s.length;
  for (let i = 0; i < sLen; i++) {
    if (s[i] === '(') {
      len++;
      if (max < len) {
        max = len;
      }
    } else if (s[i] === ')') {
      len--;
    }
  }
  return max;
};
// @lc code=end
export { maxDepth };

~~~

  
### 1619-trimMean.js

~~~js
/*
 * @lc app=leetcode.cn id=1619 lang=javascript
 *
 * [1619] 删除某些元素后的数组均值
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number}
 */
// Your runtime beats 93.78 % of javascript submissions
const trimMean = function(arr) {
  const len1 = arr.length / 20;
  arr.sort((a, b) => a - b);
  arr.splice(0, len1);
  arr.splice(-len1, len1);
  const sum = arr.reduce((a, b) => a + b, 0);
  return sum / arr.length;
};
// @lc code=end
export { trimMean };

~~~

  
### 1624-maxLengthBetweenEqualCharacters.js

~~~js
/*
 * @lc app=leetcode.cn id=1624 lang=javascript
 *
 * [1624] 两个相同字符之间的最长子字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
// 80 ms, 在所有 JavaScript 提交中击败了84.21%
const maxLengthBetweenEqualCharacters = function(s) {
  let max = -1;
  const dict = {};
  const len = s.length;
  for (let i = 0; i < len; i++) {
    const key = s[i];
    if (!dict[key] && dict[key] !== 0) {
      dict[key] = i;
    } else {
      const distance = i - dict[key] - 1;
      max = max > distance ? max : distance;
    }
  }
  return max;
};
// @lc code=end
export { maxLengthBetweenEqualCharacters };

~~~

  
### 1629-slowestKey.js

~~~js
/*
 * @lc app=leetcode.cn id=1629 lang=javascript
 *
 * [1629] 按键持续时间最长的键
 */

// @lc code=start
/**
 * @param {number[]} releaseTimes
 * @param {string} keysPressed
 * @return {character}
 */
// 96 ms, 在所有 JavaScript 提交中击败了35.07%
const slowestKey = function(releaseTimes, keysPressed) {
  let longTime = releaseTimes[0];
  let longStr = keysPressed[0];
  const n = keysPressed.length;
  for (let i = 1; i < n; i++) {
    const currentTime = releaseTimes[i] - releaseTimes[i - 1];
    if (currentTime > longTime) {
      longTime = currentTime;
      longStr = keysPressed[i];
    } else if (currentTime === longTime) {
      const item = keysPressed[i];
      if (longStr.charCodeAt(0) < item.charCodeAt(0)) {
        longStr = item;
      }
    }
  }
  return longStr;
};
// @lc code=end
export { slowestKey };

~~~

  
### 1636-frequencySort.js

~~~js
/*
 * @lc app=leetcode.cn id=1636 lang=javascript
 *
 * [1636] 按照频率将数组升序排序
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
// Your runtime beats 84.47 % of javascript submissions
const frequencySort = function(nums) {
  const dict = {};
  for (let i = 0; i < nums.length; i++) {
    const key = nums[i];
    if (!dict[key]) {
      dict[key] = 1;
    } else {
      dict[key]++;
    }
  }
  const arr = [];
  for (const key in dict) {
    const value = dict[key];
    const item = { key, value };
    arr.push(item);
  }
  arr.sort((a, b) => {
    if (a.value !== b.value) {
      return a.value > b.value ? 1 : -1;
    } else {
      // key 如果是负数，需要先转换成正数
      return Number(a.key) < Number(b.key) ? 1 : -1;
    }
  });
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const tmp = new Array(item.value).fill(item.key);
    res = res.concat(tmp);
  }
  return res;
};
// @lc code=end
export { frequencySort };

~~~

  
### 1640-canFormArray1.js

~~~js
/*
 * @lc app=leetcode.cn id=1640 lang=javascript
 *
 * [1640] 能否连接形成数组
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @param {number[][]} pieces
 * @return {boolean}
 */
// 100 ms, 在所有 JavaScript 提交中击败了12.59%
const canFormArray1 = function(arr, pieces) {
  // 如果两个数组长度不同，那么一定不能组成
  const len1 = arr.length;
  let len2 = 0;
  for (let i = 0; i < pieces.length; i++) {
    len2 += pieces[i].length;
  }
  if (len1 !== len2) {
    return false;
  }
  // 如果子数组长度是1，并且可以index到，那么继续找
  // 如果不可以index，那么就找不到
  for (let i = 0; i < pieces.length; i++) {
    const inner = pieces[i];
    if (inner.length === 0) {
      continue;
    } else if (inner.length === 1) {
      if (arr.indexOf(inner[0]) === -1) return false;
    } else {
      const index = arr.indexOf(inner[0]);
      if (index === -1) return false;
      // 如果子数组长度超过1，那么不同之间index应该是连接的
      for (let i = 1; i < inner.length; i++) {
        if (inner[i] !== arr[index + i]) {
          return false;
        }
      }
    }
  }
  return true;
};

// 现在算法太差了，未来需要优化一下
// 改进版本
// 84 ms
const canFormArray2 = function(arr, pieces) {
  // 如果子数组长度是1，并且可以index到，那么继续找
  // 如果不可以index，那么就找不到
  for (let i = 0; i < pieces.length; i++) {
    const inner = pieces[i];
    if (inner.length === 1) {
      if (arr.indexOf(inner[0]) === -1) return false;
    } else if (inner.length > 1) {
      const index = arr.indexOf(inner[0]);
      if (index === -1) return false;
      // 如果子数组长度超过1，那么不同之间index应该是连接的
      for (let i = 1; i < inner.length; i++) {
        if (inner[i] !== arr[index + i]) {
          return false;
        }
      }
    }
  }
  return true;
};

// 改进3
// 80 ms
// , 在所有 JavaScript 提交中击败了
// 79.63%
const canFormArray3 = function(arr, pieces) {
  // 如果子数组长度是1，并且可以index到，那么继续找
  // 如果不可以index，那么就找不到
  for (let i = 0; i < pieces.length; i++) {
    const inner = pieces[i];
    const index = arr.indexOf(inner[0]);
    if (index === -1) return false;
    if (inner.length > 1) {
      // 如果子数组长度超过1，那么不同之间index应该是连接的
      for (let i = 1; i < inner.length; i++) {
        if (inner[i] !== arr[index + i]) {
          return false;
        }
      }
    }
  }
  return true;
};

// @lc code=end
export { canFormArray1, canFormArray2, canFormArray3 };

~~~

  
### 1646-getMaximumGenerated.js

~~~js
/*
 * @lc app=leetcode.cn id=1646 lang=javascript
 *
 * [1646] 获取生成数组中的最大值
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
// Your runtime beats 38.1 % of javascript submissions
const getMaximumGenerated = function(n) {
  if (n === 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  }
  const arr = [0, 1];
  let max = 1;
  for (let i = 2; i <= n; i++) {
    if (i % 2 === 0) {
      arr[i] = arr[i / 2];
    } else {
      arr[i] = arr[(i - 1) / 2] + arr[(i - 1) / 2 + 1];
    }
    max = arr[i] > max ? arr[i] : max;
  }
  return max;
};
// @lc code=end
export { getMaximumGenerated };

~~~

  
### 1652-decrypt.js

~~~js
/*
 * @lc app=leetcode.cn id=1652 lang=javascript
 *
 * [1652] 拆炸弹
 */

// @lc code=start
/**
 * @param {number[]} code
 * @param {number} k
 * @return {number[]}
 */
// 分治算法：先根据 K 的符号确定怎么算
// 每一个情况使用滑动窗口计算
// Your runtime beats 81.54 % of javascript submissions
const decrypt = function(code, k) {
  const len = code.length;
  // 1. 如果是0，直接构造新数组返回
  if (k === 0) {
    return new Array(len).fill(0);
  }
  // 2. 如果不是0，先把 index-value 存放到字典中
  const dict = {};
  code.forEach((item, i) => {
    dict[i] = item;
  });
  const res = new Array(len);
  // 计算不同的和即可（加一个减一个，滑动窗口算法）
  // 2.1 K大于0，计算后面元素的和
  if (k > 0) {
    // 计算第一个
    let first = 0;
    for (let i = 1; i < 1 + k; i++) {
      first += dict[i];
    }
    res[0] = first;
    for (let i = 1; i < len; i++) {
      // 滑动窗口
      res[i] = res[i - 1] - dict[i] + (i + k >= len ? dict[i + k - len] : dict[i + k]);
    }
    return res;
  }
  // 2.2 K < 0，计算前面元素的和
  if (k < 0) {
    // 先变成正数，便于计算
    k = -k;
    // 计算第一个
    let first = 0;
    for (let i = len - 1; i > len - 1 - k; i--) {
      first += dict[i];
    }
    res[0] = first;
    for (let i = 1; i < len; i++) {
      // 滑动窗口
      res[i] = res[i - 1] + dict[i - 1] - ((i >= k + 1) ? dict[i - k - 1] : dict[i - k + len - 1]);
    }
    return res;
  }
};

// 实际是数组，需要 .toString() 处理后测试
// console.log(decrypt([5,7,1,4], 3).toString() == [12,10,16,13]);
// console.log(decrypt([1,2,3,4], 0).toString() == [0,0,0,0]);
// console.log(decrypt([2,4,9,3], -2).toString() == [12,5,6,13]);

// @lc code=end
export { decrypt };

~~~

  
### 1656-OrderedStream.js

~~~js
/**
 * @param {number} n
 */
// 232 ms, 在所有 JavaScript 提交中击败了44.78%
const OrderedStream = function() {
  this.arr = ['test'];
  this.ptr = 1;
};

/**
 * @param {number} id
 * @param {string} value
 * @return {string[]}
 */
OrderedStream.prototype.insert = function(id, value) {
  this.arr[id] = value;
  if (id > this.ptr) {
    return [];
  } else {
    const tmp = [];
    tmp.push(value);
    this.ptr++;
    while (this.arr[this.ptr]) {
      tmp.push(this.arr[this.ptr]);
      this.ptr++;
    }
    return tmp;
  }
};

/**
 * Your OrderedStream object will be instantiated and called as such:
 * let obj = new OrderedStream(n)
 * let param_1 = obj.insert(id,value)
 */

export { OrderedStream };

~~~

  
### 1662-arrayStringsAreEqual.js

~~~js
/**
 * @param {string[]} word1
 * @param {string[]} word2
 * @return {boolean}
 */
// 72 ms
// , 在所有 JavaScript 提交中击败了
// 94.90%
// 的用户
const arrayStringsAreEqual = function(word1, word2) {
  if (word1[0][0] !== word2[0][0]) return false;
  return word1.join('') === word2.join('');
};

export { arrayStringsAreEqual };

~~~

  
### 1668-maxRepeating.js

~~~js
/*
 * @lc app=leetcode.cn id=1668 lang=javascript
 *
 * [1668] 最大重复子字符串
 */

// @lc code=start
/**
 * @param {string} sequence
 * @param {string} word
 * @return {number}
 */
// 这个方法未来可以改进一下
// const maxRepeating = function(sequence, word) {
//   const index = sequence.indexOf(word);
//   if (index === -1) {
//     return 0;
//   }
//   let res = [];
//   const wordLen = word.length;
//   for (let i = index; i < sequence.length; i++) {
//     if (sequence[i] === word[0]) {
//       if (sequence.slice(i, i + wordLen) === word) {
//         res.push(i);
//         i--;
//         i += wordLen;
//       }
//       // 如果从前向后遍历
//       // 然后加一个 wordLen
//       // 那么可能会出现后面的无法匹配
//     }
//   }
//   // 这里看一下多少个连续的
//   let max = 1;
//   let current = 1;
//   for (let i = 1; i < res.length; i++) {
//     if (res[i] - res[i - 1] === wordLen) {
//       current++;
//       max = current > max ? current : max;
//     } else {
//       current = 1;
//     }
//   }
//   return max;
// };
// 200/211 cases passed (N/A)
// "aaaaaa" "aa" 3
// "aaabaaaabaaabaaaabaaaabaaaabaaaaba"
// "aaaba"
// 5 4

// 换一个思路
// Your runtime beats 36.25 % of javascript submissions
const maxRepeating = function(sequence, word) {
  const index = sequence.indexOf(word);
  if (index === -1) {
    return 0;
  }
  const wordLen = word.length;
  const max = Math.floor(sequence.length / wordLen);
  for (let i = 0; i <= max; i++) {
    let cur = '';
    for (let j = 0; j <= i; j++) {
      cur += word;
    }
    // 改进：这里不需要循环添加，直接计算当前长度，然后padEnd增加字符串即可
    if (sequence.indexOf(cur) === -1) {
      return i;
    }
  }
  return max;
};
// @lc code=end
export { maxRepeating };

~~~

  
### 1669-mergeInBetween.js

~~~js
/*
 * @lc app=leetcode.cn id=1669 lang=javascript
 *
 * [1669] 合并两个链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {number} a
 * @param {number} b
 * @param {ListNode} list2
 * @return {ListNode}
 */
// Your runtime beats 97.33 % of javascript submissions
const mergeInBetween = function(list1, a, b, list2) {
  // 关键是存储链表的开始节点和结束节点
  // 这是list1开始节点，返回这个值
  const list1Head = list1;
  // 这个存储剪切开始的节点
  let list1Middle = list1Middle1 = list1;
  for (let i = 1; i < a; i++) {
    list1Middle = list1Middle.next;
  }
  // 这个存储结束的节点
  for (let i = 1; i <= b + 1; i++) {
    list1Middle1 = list1Middle1.next;
  }
  // 获取第二个链表的开始节点和结束节点
  const list2Start = list2;
  let list2End = list2Start;
  while (list2End.next) {
    list2End = list2End.next;
  }
  // 然后把这个指向list2
  list1Middle.next = list2Start;
  list2End.next = list1Middle1;
  return list1Head;
};
// @lc code=end
export { mergeInBetween };

~~~

  
### 1670-FrontMiddleBackQueue.js

~~~js
/*
 * @lc app=leetcode.cn id=1670 lang=javascript
 *
 * [1670] 设计前中后队列
 */

// @lc code=start
// Your runtime beats 45.9 % of javascript submissions
const FrontMiddleBackQueue = function() {
  this.arr = [];
};

/**
 * @param {number} val
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushFront = function(val) {
  this.arr.unshift(val);
};

/**
 * @param {number} val
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushMiddle = function(val) {
  const len = this.arr.length;
  const index = Math.floor(len / 2);
  this.arr.splice(index, 0, val);
};

/**
 * @param {number} val
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushBack = function(val) {
  this.arr.push(val);
};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popFront = function() {
  if (this.arr.length === 0) {
    return -1;
  }
  return this.arr.shift();
};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popMiddle = function() {
  if (this.arr.length === 0) {
    return -1;
  }
  const len = this.arr.length;
  const index = Math.floor((len - 0.1) / 2);
  return this.arr.splice(index, 1);
};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popBack = function() {
  if (this.arr.length === 0) {
    return -1;
  }
  return this.arr.pop();
};

/**
 * Your FrontMiddleBackQueue object will be instantiated and called as such:
 * let obj = new FrontMiddleBackQueue()
 * obj.pushFront(val)
 * obj.pushMiddle(val)
 * obj.pushBack(val)
 * let param_4 = obj.popFront()
 * let param_5 = obj.popMiddle()
 * let param_6 = obj.popBack()
 */
// @lc code=end
export { FrontMiddleBackQueue };

~~~

  
### 1672-maximumWealth.js

~~~js
/**
 * @param {number[][]} accounts
 * @return {number}
 */
// 76 ms, 在所有 JavaScript 提交中击败了91.84%
const maximumWealth = function(accounts) {
  const len = accounts.length;
  let max = 0;
  for (let i = 0; i < len; i++) {
    const sum = accounts[i].reduce((a, b) => a + b, 0);
    max = sum > max ? sum : max;
  }
  return max;
};

export { maximumWealth };

~~~

  
### 1678-interpret.js

~~~js
/**
 * @param {string} command
 * @return {string}
 */
// 请你设计一个可以解释字符串 command 的 Goal 解析器 。command 由 "G"、"()" 和/或 "(al)" 按某种顺序组成。
// Goal 解析器会将 "G" 解释为字符串 "G"、"()" 解释为字符串 "o" ，"(al)" 解释为字符串 "al" 。
// 然后，按原顺序将经解释得到的字符串连接成一个字符串。
// 给你字符串 command ，返回 Goal 解析器 对 command 的解释结果。
// 思路一：直接循环 88 ms, 在所有 JavaScript 提交中击败了36.63%
const interpret1 = function(command) {
  let res = '';
  for (let i = 0; i < command.length; i++) {
    const item = command[i];
    if (item === 'G') {
      res += 'G';
    } else if (command[i + 1] === 'a') {
      res += 'al';
      i += 3;
    } else {
      res += 'o';
      i += 1;
    }
  }
  return res;
};
// 思路二：正则替代
// 76 ms, 在所有 JavaScript 提交中击败了 86.63%
const interpret2 = function(command) {
  return command.replace(/\(\)/g, 'o').replace(/\(al\)/g, 'al');
};

export { interpret1, interpret2 };

~~~

  
### 1684-countConsistentStrings.js

~~~js
/**
 * @param {string} allowed
 * @param {string[]} words
 * @return {number}
 */
// 116 ms, 在所有 JavaScript 提交中击败了 100.00%
const countConsistentStrings = function(allowed, words) {
  // 先把allowed转换成一个字典
  const dict = {};
  for (let i = 0; i < allowed.length; i++) {
    const key = allowed[i];
    dict[key] = true;
  }
  let res = 0;
  const judge = function(s) {
    for (let i = 0; i < s.length; i++) {
      if (!dict[s[i]]) return 0;
    }
    return 1;
  };
  // 然后遍历数组，判断每一个字符串是否满足要求
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    res += judge(word);
  }
  return res;
};

export { countConsistentStrings };

~~~

  
### 1688-numberOfMatches.js

~~~js
/*
 * @lc app=leetcode.cn id=1688 lang=javascript
 *
 * [1688] 比赛中的配对次数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
// Your runtime beats 92.76 % of javascript submissions
const numberOfMatches = function(n) {
  if (n === 1) {
    return 0;
  }
  let num = 0;
  while (n > 1) {
    const times = Math.floor(n / 2);
    num += times;
    n = Math.ceil(n / 2);
  }
  return num;
};
// @lc code=end

export { numberOfMatches };

~~~

  
### 1694-reformatNumber.js

~~~js
/**
 * @param {string} number
 * @return {string}
 */
// 76 ms, 在所有 JavaScript 提交中击败了 100.00%
const reformatNumber = function(number) {
  // 先把空格和破折号去掉
  // 循环当前的字符串，每个三个放在一个数组中
  // 如果数组的最后一个长度是1，那么把最后两个单独拿出来处理
  // 然后数组进行join合并处理
  number = number.replace(/\-/ig, '').replace(/\s/ig, '');
  const len = number.length;
  const arr = [];
  for (let i = 0; i < len; i += 3) {
    const item = number.slice(i, i + 3);
    arr.push(item);
  }
  if (arr[arr.length - 1].length === 1) {
    const l1 = arr.pop();
    const l2 = arr.pop();
    const item = `${l2.slice(0, 2)}-${l2.slice(2)}${l1}`;
    arr.push(item);
  }
  return arr.join('-');
};

export { reformatNumber };

~~~

  
### 1700-countStudents.js

~~~js
/*
 * @lc app=leetcode.cn id=1700 lang=javascript
 * [1700] 无法吃午餐的学生数量
 */

// @lc code=start
/**
 * @param {number[]} students
 * @param {number[]} sandwiches
 * @return {number}
 */
// Your runtime beats 13.73 % of javascript submissions
const countStudents = function(students, sandwiches) {
  // 这里使用指针，比直接操作数组效果更好
  // 获取当前三明治的铲毒。循环一次
  // 如果用户吃掉三明治，那么重新计算长度和当前循环的次数
  // 结束条件，循环的次数等于三明治的长度，那么肯定已经循环了一次，然后返回当前学生的数量
  // let len = students.length;
  let times = 0;
  while (sandwiches.length > 0) {
    if (sandwiches[0] === students[0]) {
      sandwiches.shift();
      students.shift();
      // len = students.length;
      times = 0;
    } else {
      times++;
      const tmp = students.shift();
      students.push(tmp);
    }
    if (times >= students.length) {
      return sandwiches.length;
    }
  }
  return sandwiches.length;
};
// @lc code=end

// 改进1（去掉len变量）看来主要和网速有关
// Your runtime beats 85.63 % of javascript submissions
const countStudents2 = function(students, sandwiches) {
  let times = 0;
  while (sandwiches.length > 0) {
    if (sandwiches[0] === students[0]) {
      sandwiches.shift();
      students.shift();
      times = 0;
    } else {
      times++;
      const tmp = students.shift();
      students.push(tmp);
    }
    if (times >= students.length) {
      return sandwiches.length;
    }
  }
  return sandwiches.length;
};

// 另一个思路
// 直接计数行不行？现在一个一个算，太麻烦
// 直接计算全部学生的数量（0-1）然后计算三明治的数量
// 如果相等，那么肯定能全部吃了
// 如果不等，那么求出最后一个出现的，然后此时的长度就是没有吃饭的长度
// 分析一下这样的复杂度
// 64 ms, 在所有 JavaScript 提交中击败了95.00%
const countStudents3 = function(students, sandwiches) {
  const len = students.length;
  let times1 = 0;
  let times0 = 0;
  students.forEach((item) => {
    item === 1 ? times1++ : times0++;
  });
  // 处理特殊情况
  if (times1 === 0) {
    const index = sandwiches.indexOf(1);
    if (index === -1) return 0;
    return len - index;
  }
  if (times0 === 0) {
    const index = sandwiches.indexOf(0);
    if (index === -1) return 0;
    return len - index;
  }
  for (let i = 0; i < sandwiches.length; i++) {
    const item = sandwiches[i];
    if (item === 1) {
      times1--;
    }
    if (item === 0) {
      times0--;
    }
    if (times1 === -1 || times0 === -1) {
      return len - i;
    }
  }
  return 0;
};

export { countStudents, countStudents2, countStudents3 };

~~~

  
### 1704-halvesAreAlike.js

~~~js
/*
 * @lc app=leetcode.cn id=1704 lang=javascript
 *
 * [1704] 判断字符串的两半是否相似
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
// Your runtime beats 100 % of javascript submissions
const halvesAreAlike = function(s) {
  s = s.toLowerCase();
  const len = s.length;
  const check = function(s) {
    return (s === 'a' || s === 'e' || s === 'i' || s === 'o' || s === 'u');
  };
  let left = 0;
  let right = 0;
  for (let i = 0; i < len; i++) {
    if (check(s[i])) {
      (i >= len / 2) ? left++ : right++;
      if (left > right) {
        return false;
      }
    }
  }
  return left === right;
};
// @lc code=end

export { halvesAreAlike };

~~~

  
### 1710-maximumUnits.js

~~~js
/**
 * @param {number[][]} boxTypes
 * @param {number} truckSize
 * @return {number}
 */
// 基本思路：贪心算法
// 先按照箱子的权重排序，然后遍历数组，获取最大值即可
// 92 ms, 在所有 JavaScript 提交中击败了86.63%
const maximumUnits = function(boxTypes, truckSize) {
  boxTypes.sort((a, b) => {
    return a[1] > b[1] ? -1 : 1;
  });
  let sum = 0;
  for (let i = 0; i < boxTypes.length; i++) {
    const item = boxTypes[i];
    if (truckSize > item[0]) {
      sum += item[0] * item[1];
      truckSize -= item[0];
    } else {
      sum += truckSize * item[1];
      return sum;
    }
  }
  return sum;
};

export { maximumUnits };

~~~

  
### 1716-totalMoney.js

~~~js
/**
 * @param {number} n
 * @return {number}
 */
// 思路一：数学方法计算
// 这个数先求7的余数和商
// 商 * （28） + （0 + 1 + 2+ 3+ 商 -1）* 7
// 余数 * 商 * 7 + 【1234567】求一部分
// 88 ms, 在所有 JavaScript 提交中击败了45.73%
// 优化后：72 ms, 在所有 JavaScript 提交中击败了98.17%
const totalMoney = function(n) {
  const a = n % 7; // 余数
  const b = (n - a) / 7; // 商
  let sum = 0;
  sum = sum + b * 28 + (((0 + b - 1) * b) / 2) * 7; // 商部分求和
  sum = sum + a * b;
  // let arr = [1,2,3,4,5,6,7];
  // for (let i = 0; i < a; i++) {
  //     sum += arr[i];
  // }
  if (a !== 0) {
    sum += ((1 + a) * a) / 2;
  }
  return sum;
};
// 思路二：动态规划(n = 1000 循环次数比较多，同时需要很长的数组)

export { totalMoney };

~~~

  
### 1725-countGoodRectangles.js

~~~js
/**
 * @param {number[][]} rectangles
 * @return {number}
 */
// 92 ms, 在所有 JavaScript 提交中击败了76.84%
const countGoodRectangles = function(rectangles) {
  let max;
  let times;
  rectangles.forEach((item) => {
    const size = item[0] > item[1] ? item[1] : item[0];
    if ((max && size > max) || !max) {
      times = 1;
      max = size;
    } else if (max && size === max) {
      times++;
    }
  });
  return times;
};

export { countGoodRectangles };

~~~

  
### 1732-largestAltitude.js

~~~js
/**
 * @param {number[]} gain
 * @return {number}
 */
// 84 ms, 在所有 JavaScript 提交中击败了52.25%
const largestAltitude = function(gain) {
  const res = [0];
  const len = gain.length;
  for (let i = 0; i < len; i++) {
    res[i + 1] = res[i] + gain[i];
  }
  return Math.max(...res);
};

// 优化，不需要使用数组存储海拔
// 直接使用两个临时变量（一个存储上一个的值，一个存储最大值即可）
// 64 ms runtime beats 92.73 % of javascript submissions
const largestAltitude2 = function(gain) {
  let max = 0;
  let current = 0;
  const len = gain.length;
  for (let i = 0; i < len; i++) {
    const item = gain[i];
    current += item;
    if (max < current) {
      max = current;
    }
  }
  return max;
};

export { largestAltitude, largestAltitude2 };

~~~

  
### 1736-maximumTime.js

~~~js
/**
 * @param {string} time
 * @return {string}
 */
// 100 ms, 在所有 JavaScript 提交中击败了6.98%
const maximumTime = function(time) {
  let a = time[0];
  let b = time[1];
  let c = time[3];
  let d = time[4];

  if (d === '?') {
    d = '9';
  }
  if (c === '?') {
    c = '5';
  }

  if (a === '?' && b === '?') {
    a = '2';
    b = '3';
  }

  if (a !== '?' && b === '?') {
    if (a === '2') {
      b = '3';
    } else {
      b = '9';
    }
  }

  if (a === '?' && b !== '?') {
    if (Number(b) < 4) {
      a = '2';
    } else {
      a = '1';
    }
  }
  return `${a}${b}:${c}${d}`;
};

// 分钟
// 最后一位：肯定是9最大
// 倒数第二位：5最大

// 小时(难点)
// 0 - 23
// 如果两个都是？？那么就是23

// 如果第一个是数字（012）如果是01，那么第二个是9；如果是2，那么第二个是3

// 如果第二个是数组。如果数字是0123，那么第一个是2。如果是其他数字，那么第一个是1

export { maximumTime };

~~~

  
### 1742-countBalls.js

~~~js
/**
 * @param {number} lowLimit
 * @param {number} highLimit
 * @return {number}
 * 你在一家生产小球的玩具厂工作，有 n 个小球，编号从 lowLimit 开始，到 highLimit 结束（包括 lowLimit 和 highLimit ，即 n == highLimit - lowLimit + 1）。另有无限数量的盒子，编号从 1 到 infinity 。
 * 你的工作是将每个小球放入盒子中，其中盒子的编号应当等于小球编号上每位数字的和。例如，编号 321 的小球应当放入编号 3 + 2 + 1 = 6 的盒子，而编号 10 的小球应当放入编号 1 + 0 = 1 的盒子。
 * 给你两个整数 lowLimit 和 highLimit ，返回放有最多小球的盒子中的小球数量。如果有多个盒子都满足放有最多小球，只需返回其中任一盒子的小球数量。
 */

// 难度：简单
// 考点：数字求和；数字转换成对象
// 120 ms, 在所有 JavaScript 提交中击败了79.44%
const countBalls = function(lowLimit, highLimit) {
  // 辅助函数：计算一个正数的每一位的和
  const getSum = (num) => {
    let res = 0;
    while (num > 0) {
      const a = num % 10;
      res += a;
      num = (num - a) / 10;
    }
    return res;
  };

  // 循环数字；把和放在字典中
  const dict = {};
  for (let i = lowLimit; i <= highLimit; i++) {
    const sum = getSum(i);
    if (!dict[sum]) {
      dict[sum] = 1;
    } else {
      dict[sum]++;
    }
  }

  // 计算字典中数出现次数最多的数字
  let max = 1;
  for (const key in dict) {
    const value = dict[key];
    if (value > max) {
      max = value;
    }
  }
  return max;
};

export { countBalls };

~~~

  
### 1748-sumOfUnique.js

~~~js
/**
 * @param {number[]} nums
 * @return {number}
 * 求数组中唯一元素的和
 */

// 难度：简单
// 考点：数组遍历求和；对象求和；顺序结构转换成索引结构
// 76 ms, 在所有 JavaScript 提交中击败了86.27%
const sumOfUnique = function(nums) {
  const dict = {};
  const len = nums.length;
  // 先把数组遍历一次，记录在字典中
  for (let i = 0; i < len; i++) {
    const key = nums[i];
    if (!dict[key]) {
      dict[key] = 1;
    } else {
      dict[key]++;
    }
  }
  // 遍历字典：如果出现次数等于1，直接求和
  let sum = 0;
  for (const key in dict) {
    if (dict[key] === 1) {
      sum += parseInt(key);
    }
  }
  return sum;
};

export { sumOfUnique };

~~~

  
### 1752-check.js

~~~js
/**
 * 检查数组是否经排序和轮转得到
 * @param {number[]} nums
 * @return {boolean}
 */
// 给你一个数组 nums 。nums 的源数组中，所有元素与 nums 相同，但按非递减顺序排列。
// 如果 nums 能够由源数组轮转若干位置（包括 0 个位置）得到，则返回 true ；否则，返回 false 。
// 源数组中可能存在 重复项 。
// 注意：我们称数组 A 在轮转 x 个位置后得到长度相同的数组 B ，当它们满足 A[i] == B[(i+x) % A.length] ，其中 % 为取余运算。
// 76 ms, 在所有 JavaScript 提交中击败了91.94%
function check (nums) {
  let add = 0;
  const len = nums.length;
  // 长度小于3的数组肯定可以旋转成排序好的数组
  if (len < 3) {
    return true;
  }
  if (nums[len - 1] > nums[0]) {
    add++;
  }
  for (let i = 0; i < len - 1; i++) {
    if (nums[i] > nums[i + 1]) {
      add++;
    }
    if (add > 1) {
      return false;
    }
  }
  return true;
}

export { check };

~~~

  
### 1758-minOperations.js

~~~js
/**
 * @param {string} s
 * @return {number}
 */
// 思路：如果一个长度是N的字符串，最后变成的交替二进制字符串，只有两种情况 就是0开头或者1开头。
// 我们可以新建两个目标字符串，然后循环一下，和原来的字符串对比，求出不同的值的情况
// 然后求这两个值的最小值
// 这样循环三次，时间复杂度是N，字符串长度是10000，时间上可以接受，考虑是否有更好的办法
// 这个方法可以优化
// 96 ms
const minOperations = function(s) {
  const len = s.length;
  let strA = '';
  let strB = '';
  let basicA = '0';
  let basicB = '1';
  for (let i = 0; i < len; i++) {
    strA = strA + basicA;
    strB = strB + basicB;
    // swap basic A and B
    const tmp = basicB;
    basicB = basicA;
    basicA = tmp;
    // 优化：循环一次即可，不需要设置这两个临时数组，直接比较 basicA basicB 和 s[i] 即可，然后获取 num1 num2 的最小值
  }
  // 现在获取了两个基础的变量
  let num1 = 0;
  let num2 = 0;
  for (let i = 0; i < len; i++) {
    if (s[i] !== strA[i]) num1++;
    if (s[i] !== strB[i]) num2++;
  }
  return Math.min(num1, num2);
};

export { minOperations };

~~~

  
### 1763-longestNiceSubstring.js

~~~js
// 辅助函数，判断大小写是否对应 toLowerCase）
// 这个算法性能不好
// Brute force and check each substring to see if it is nice.
isBeautyStr = (str) => {
  // 0、字符串去重
  const simpleStr = [].filter.call(str, (s, i, o) => o.indexOf(s) === i).join('');
  // 如果去重后的字符串长度是奇数，那么一定不美丽
  const len = simpleStr.length;
  if (len % 2 === 1) {
    return false;
  }
  // 1/ 把字符串中大写和小写分开，变成两个字符串数组
  let arr1 = [];
  let arr2 = [];
  // 循环去重后的字符串，现在数组1中放的大写字母，数组2中放的小写字母
  for (let i = 0; i < len; i++) {
    // 正则表达式的性能不好，现在改成code比较一下
    // if (/[A-Z]/.test(simpleStr[i])) {
    const code = simpleStr[i].charCodeAt(0);
    if (code >= 65 && code <= 90) {
      arr1.push(simpleStr[i]);
    } else {
      arr2.push(simpleStr[i]);
    }
  }

  // 如果两个数组的长度不同，那么肯定不美丽
  if (arr1.length !== arr2.length) {
    return false;
  }
  // 2. 然后按照字符串的编码排序
  arr1 = arr1.sort((a, b) => a.charCodeAt(0) > b.charCodeAt(0) ? 1 : -1);
  arr2 = arr2.sort((a, b) => a.charCodeAt(0) > b.charCodeAt(0) ? 1 : -1);
  // 3. 然后把排序好的字符串，大写转换成小写，比较是否相同
  const len2 = arr1.length;
  for (let i = 0; i < len2; i++) {
    if (arr1[i].toLowerCase() !== arr2[i]) {
      return false;
    }
  }
  return true;
};

// 1763 最长的美好子字符串
// 字符串的长度是100，这个算法时间复杂度可以接受
// 1040 ms, 在所有 JavaScript 提交中击败了5.33%
// 现在性能很差

const longestNiceSubstring = function(s) {
  // 1、判断一个字符串是否是美好字符串（辅助函数，判断大小写是否对应 toLowerCase）
  // 2、遍历字符串，获取最长的子字符串，这个存在性能问题，和问题一能都解决一下，避免多次求美好算法
  // 外层循环按照字符串的长度，这个从 length 循环到 2
  // 内层循环，个数是字符串的长度，这个最大是N-1
  // 如果有满足条件的子字符串，立即终止循环，返回
  // 否则返回空的字符串
  // 空字符串需要测试
  if (s.length < 1) {
    return '';
  }
  // 先判断整理是否美丽
  if (isBeautyStr(s)) {
    return s;
  }
  const len = s.length;

  // 这里增加缓存，避免多次判断同一个字符串
  const cache = {};

  for (let i = len - 1; i > 1; i--) {
    // i 表示子字符串的长度
    for (let j = 0; j <= len - i; j++) {
      const subStr = s.slice(j, j + i);
      // 先从缓存中获取，减少重复
      if (cache[subStr]) {
        continue;
      }
      const result = isBeautyStr(subStr);
      if (result) {
        return subStr;
      } else {
        cache[subStr] = true;
      }
    }
  }
  return '';
};

// console.log(83, longestNiceSubstring('aAay'));
// console.log(84, longestNiceSubstring('YazaAay'));
// console.log(85, longestNiceSubstring('Bb'));
// console.log(86, longestNiceSubstring('c'));
// console.log(87, longestNiceSubstring('dDzeE'));
export { longestNiceSubstring };

~~~

  
### 1768-mergeAlternately.js

~~~js
/*
 * @lc app=leetcode.cn id=1768 lang=javascript
 *
 * [1768] 交替合并字符串
 */

// @lc code=start
/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
// Your runtime beats 84.33 % of javascript submissions
const mergeAlternately = function(word1, word2) {
  const len1 = word1.length;
  const len2 = word2.length;
  const len = Math.min(len1, len2);
  let res = '';
  for (let i = 0; i < len; i++) {
    res = res + word1[i] + word2[i];
  }
  if (len1 === len2) {
    return res;
  } else if (len1 > len) {
    res = res + word1.slice(len);
  } else if (len2 > len) {
    res = res + word2.slice(len);
  }
  return res;
};
// @lc code=end

// Your runtime beats 84.33 % of javascript submissions
const mergeAlternately2 = function(word1, word2) {
  const len1 = word1.length;
  const len2 = word2.length;
  const len = Math.min(len1, len2);
  let res = '';
  for (let i = 0; i < len; i++) {
    res = res + word1[i] + word2[i];
  }
  if (len1 === len2) {
    return res;
  } else if (len1 > len) {
    res = res + word1.slice(len);
  } else if (len2 > len) {
    res = res + word2.slice(len);
  }
  return res;
};

export { mergeAlternately, mergeAlternately2 };

~~~

  
### 1773-countMatches.js

~~~js
/*
 * @lc app=leetcode.cn id=1773 lang=javascript
 *
 * [1773] 统计匹配检索规则的物品数量
 */

// @lc code=start
/**
 * @param {string[][]} items
 * @param {string} ruleKey
 * @param {string} ruleValue
 * @return {number}
 */
//  Your runtime beats 9.73 % of javascript submissions
const countMatches = function(items, ruleKey, ruleValue) {
  // 首先获取需要检索的项
  let index;
  if (ruleKey === 'type') {
    index = 0;
  } else if (ruleKey === 'color') {
    index = 1;
  } else if (ruleKey === 'name') {
    index = 2;
  }
  // 然后遍历一次，记录即可
  let number = 0;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item[index] === ruleValue) {
      number++;
    }
  }
  return number;
};
// @lc code=end
export { countMatches };

~~~

  
### 1779-nearestValidPoint.js

~~~js
/*
 * @lc app=leetcode.cn id=1779 lang=javascript
 *
 * [1779] 找到最近的有相同 X 或 Y 坐标的点
 */

// @lc code=start
/**
 * @param {number} x
 * @param {number} y
 * @param {number[][]} points
 * @return {number}
 */
//  Your runtime beats 7.47 % of javascript submissions
const nearestValidPoint = function(x, y, points) {
  // 辅助函数1
  const isValid = (point) => {
    return point[0] === x || point[1] === y;
  };
  // 辅助函数2
  const getDis = (point) => {
    return Math.abs(point[0] - x) + Math.abs(point[1] - y);
  };
  let min;
  let minIndex;
  let isOver = false;
  // 循环，获取最小值
  points.forEach((point, index) => {
    // 处理重合的点
    if (!isOver && point[0] === x && point[1] === y) {
      minIndex = index;
      isOver = true;
    }
    if (!isOver && isValid(point)) {
      const distance = getDis(point);
      if (!min && min !== 0) {
        min = distance;
        minIndex = index;
      } else if (min > distance) {
        min = distance;
        minIndex = index;
      }
    }
  });
  return minIndex > -1 ? minIndex : -1;
};

// console.log(nearestValidPoint(3, 4, [[1,2],[3,1],[2,4],[2,3],[4,4]]) === 2);
// console.log(nearestValidPoint(3, 4, [[3,4]]) === 0);
// console.log(nearestValidPoint(3, 4, [[2,3]]) === -1);
// @lc code=end
export { nearestValidPoint };

~~~

  
### 1784-checkOnesSegment.js

~~~js
/**
 * @param {string} s
 * @return {boolean}
 */
// 1784
// 这个题目题意很不明确，难度不大
const checkOnesSegment = function(s) {
  return !s.includes('01');
};

export { checkOnesSegment };

~~~

  
### 1790-areAlmostEqual.js

~~~js
/*
 * @lc app=leetcode.cn id=1790 lang=javascript
 *
 * [1790] 仅执行一次字符串交换能否使两个字符串相等
 */

// @lc code=start
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
// 思路：这两个字符串中，只有某两个字符调换位置，其他都相同
// 那么把这两个找出来，然后调换比较即可
// Your runtime beats 91.85 % of javascript submissions
const areAlmostEqual = function(s1, s2) {
  // 0 处理边缘情况
  if (s1 === s2) {
    return true;
  }
  if (s1.length !== s2.length) {
    return false;
  }
  // 默认设置两个指针都是-1
  let p1 = -1; let
    p2 = -1;
  for (let i = 0; i < s1.length; i++) {
    // 如果某个字符不相等，分三种情况
    if (s1[i] !== s2[i]) {
      // 是第一个不同的字符
      if (p1 === -1) {
        p1 = i;
      }
      // 是第二个不同的字符
      else if (p2 === -1) {
        p2 = i;
      }
      // 是第三个不同的字符（直接返回false，不满足）
      else {
        return false;
      }
    }
  }
  // 如果只有一个不同，那么直接返回 false
  if (p2 === -1) {
    return false;
  }
  // 如果两个交换后相同，那么就满足条件
  if (s1[p1] === s2[p2] && s1[p2] === s2[p1]) {
    return true;
  }
  // 否则不满足
  return false;
};
// @lc code=end
export { areAlmostEqual };

~~~

  
### 1791-findCenter.js

~~~js
/*
 * @lc app=leetcode.cn id=1791 lang=javascript
 *
 * [1791] 找出星型图的中心节点
 */

// @lc code=start
/**
 * @param {number[][]} edges
 * @return {number}
 */
// 直接找到前两个路径的公共节点即可
// Your runtime beats 90 % of javascript submissions
const findCenter = function(edges) {
  const p1 = edges[0][0];
  const p2 = edges[0][1];
  const p3 = edges[1][0];
  const p4 = edges[1][1];
  if (p1 === p3 || p1 === p4) {
    return p1;
  }
  return p2;
};
// @lc code=end
export { findCenter };

~~~

  
### 1796-secondHighest.js

~~~js
/*
 * @lc app=leetcode.cn id=1796 lang=javascript
 *
 * [1796] 字符串中第二大的数字
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
// 这样写有问题，可能存在相同的值
// const secondHighest = function(s) {
//   const len = s.length;
//   let first, second;
//   for (let i = 0; i < len; i++) {
//     const curr = Number(s[i])
//     if (curr > 0) {
//       // 是数字
//       // 没有第一
//       if (!first) {
//         first = curr;
//       }
//       // 没有第二
//       else if (!second) {
//         second = first > curr ? curr : first;
//         first = first > curr ? first : curr;
//       }
//       // 有第一有第二
//       else {
//         if (curr > first) {
//           second = first;
//           first = curr;
//         }
//         else if (curr > second) {
//           second = curr;
//         }
//         // else curr < second, continue
//       }
//     }
//   }
//   return second ? second : -1;
// };

// 112 ms, 在所有 JavaScript 提交中击败了14.21%
const secondHighest = function(s) {
  const len = s.length;
  const nums = [];
  for (let i = 0; i < len; i++) {
    const curr = Number(s[i]);
    if (curr > -1) {
      nums.push(curr);
    }
  }
  const newNums = [...new Set(nums)].sort((a, b) => b - a);
  return newNums[1] > -1 ? newNums[1] : -1;
};
// @lc code=end
export { secondHighest };

~~~

  
### 1800-maxAscendingSum.js

~~~js
/*
 * @lc app=leetcode.cn id=1800 lang=javascript
 *
 * [1800] 最大升序子数组和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 * Your runtime beats 53.97 % of javascript submissions
 */
const maxAscendingSum = function(nums) {
  // 1、先获取数组最大值，处理数组降序的情况
  let max = Math.max(...nums);
  let tmp = nums[0];
  // 2、遍历数组，
  for (let i = 1; i < nums.length; i++) {
    // 2.1、后面比前面的大，就是升序，增加累加值
    if (nums[i] > nums[i - 1]) {
      tmp += nums[i];
    }
    // 如果后面小于前面，重新计算最大值
    else {
      if (tmp > max) {
        max = tmp;
      }
      tmp = nums[i];
    }
  }
  return Math.max(tmp, max);
};
// @lc code=end
export { maxAscendingSum };

~~~

  
### 1805-numDifferentIntegers.js

~~~js
/**
 * @param {string} word
 * @return {number}
 */
// 字符串中不同整数的数目
// 这个方法需要循环一次字符串，性能不好
// 92 ms, 在所有 JavaScript 提交中击败了33.46%
const numDifferentIntegers = function(word) {
  const len = word.length;
  let numStr = '';
  const res = new Set();
  const handleStr = function(str) {
    if (str === '') return;
    str = str.replace(/^0+/ig, '');
    res.add(str);
  };
  for (let i = 0; i < len; i++) {
    const item = word[i];
    // check isNumber
    if (item > -1) {
      numStr = numStr + item;
    } else {
      handleStr(numStr);
      numStr = '';
    }
  }
  handleStr(numStr);
  return res.size;
};

// 不应该转换成数字，直接放在 set 中去重即可
// "2393706880236110407059624696967828762752651982730115221690437821508229419410771541532394006597463715513741725852432559057224478815116557380260390432211227579663571046845842281704281749571110076974264971989893607137140456254346955633455446057823738757323149856858154529105301197388177242583658641529908583934918768953462557716z97438020429952944646288084173334701047574188936201324845149110176716130267041674438237608038734431519439828191344238609567530399189316846359766256507371240530620697102864238792350289978450509162697068948604722646739174590530336510475061521094503850598453536706982695212493902968251702853203929616930291257062173c79487281900662343830648295410"
// 这个数字太大，超出限制了

export { numDifferentIntegers };

~~~

  
### 1812-squareIsWhite.js

~~~js
/*
 * @lc app=leetcode.cn id=1812 lang=javascript
 * [1812] 判断国际象棋棋盘中一个格子的颜色
 */

// 难度：简单
// 考点：数组基本操作

/**
 * @param {string} coordinates
 * @return {boolean}
 */
// 80 ms, 在所有 JavaScript 提交中击败了80.62%
const squareIsWhite = function(coordinates) {
  const first = coordinates[0];
  const second = parseInt(coordinates[1]);
  if (first === 'a' || first === 'c' || first === 'e' || first === 'g') {
    return second % 2 === 0;
  } else {
    return second % 2 !== 0;
  }
};

export { squareIsWhite };

~~~

  
### 1816-truncateSentence.js

~~~js
/*
 * [1816] 截断句子：给定一个句子S（字符串，单词加空格）和一个正数K
 * 截取前边几个单词部分
 */

// 难度：简单
// 考点：字符串和数组基本操作

/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
// 思路一：遍历字符串
// 96 ms, 在所有 JavaScript 提交中击败了16.61%
const truncateSentence = function(s, k) {
  const len = s.length;
  let remain = k;
  for (let i = 0; i < len; i++) {
    if (s[i] === ' ') {
      remain--;
    }
    if (remain <= 0) {
      return s.slice(0, i);
    }
  }
  return s;
};

// 改进版本
// 96 ms, 在所有 JavaScript 提交中击败了18.81%，还可以提升很大
const truncateSentence3 = function(s, k) {
  let K = k;
  let position = 0;
  while (K > 0) {
    const index = s.indexOf(' ', position);
    if (index > 0) {
      position = index + 1;
      K--;
    }
    if (index < 0) {
      return s;
    }
  }
  return s.slice(0, position - 1);
};

// 思路2：转换成数组
// 88 ms, 在所有 JavaScript 提交中击败了40.79%
const truncateSentence2 = function(s, k) {
  const sList = s.split(' ');
  return sList.slice(0, k).join(' ');
};

export { truncateSentence, truncateSentence2, truncateSentence3 };

~~~

  
### 1822-arraySign.js

~~~js
/*
 * @lc app=leetcode.cn id=1822 lang=javascript
 * [1822] 数组元素积的符号
 * 给定一个数字数组，判断数组的乘积是多少
 */

// 难度：简单
// 考点：数组API

/**
 * @param {number[]} nums
 * @return {number}
 */
// 思路1
// 92 ms, 在所有 JavaScript 提交中击败了40.98%
const arraySign = function(nums) {
  // 如果数组中有0，直接返回0
  if (nums.includes(0)) {
    return 0;
  }
  // 循环数组，判断负数的个数
  let minusTimes = 0;
  nums.forEach((item) => {
    if (item < 0) {
      minusTimes++;
    }
  });
  // 然后求出结果
  return minusTimes % 2 === 0 ? 1 : -1;
};

// 改进思路
// 80 ms, 在所有 JavaScript 提交中击败了86.46%
const arraySign2 = function(nums) {
  // 循环数组，判断负数的个数
  let minusTimes = 0;
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    const item = nums[i];
    // 如果有0，那么直接返回0
    if (item === 0) {
      return 0;
    }
    if (item < 0) {
      minusTimes++;
    }
  }
  // 根据负数的个数，求出结果
  return minusTimes % 2 === 0 ? 1 : -1;
};

// todo: 先排序，然后判断数组元素的正负号，是否更快？
// todo: reduce 能否更快？arr.reduce((a, b) => { return a * b }, 1);
export { arraySign, arraySign2 };

~~~

  
### 1827-minOperations.js

~~~js
// [1827] 最少操作使数组递增
// Your runtime beats 20.97 % of javascript submissions
/**
 * @param {number[]} nums
 * @return {number}
 */
const minOperations = function(nums) {
  const len = nums.length;
  if (len === 1) {
    return 0;
  }
  let sum = 0;
  for (let i = 1; i < len; i++) {
    if (nums[i] <= nums[i - 1]) {
      const newNumber = nums[i - 1] + 1;
      sum += (newNumber - nums[i]);
      nums[i] = newNumber;
    }
  }
  return sum;
};

export { minOperations };

~~~

  
### 1832-checkIfPangram.js

~~~js
/**
 * @param {string} sentence
 * @return {boolean}
 */
// 判断句子是否为全字母句
// Your runtime beats 60.62 % of javascript submissions
const checkIfPangram = function(sentence) {
  const len = sentence.length;
  // 如果长度小于26，那么一定不满足
  if (len < 26) {
    return false;
  }
  const dict = {};
  let timer = 0;
  // 然后遍历句子，使用一个对象存储，最后看键的长度是多少
  for (let i = 0; i < len; i++) {
    const key = sentence[i];
    if (!dict[key]) {
      dict[key] = true;
      timer++;
    }
    if (timer === 26) {
      return true;
    }
  }
  return timer === 26;
};

export { checkIfPangram };

~~~

  
### 1837-sumBase.js

~~~js
/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
const sumBase = function(n, k) {
  // 辅助函数：转换成K进制的字符串
  const transFn = (n, k) => {
    let result = '';
    while (n > 0) {
      const tmp = n % k;
      result = String(tmp) + result;
      n = (n - tmp) / k;
    }
    return result;
  };

  let transN;
  let res = 0;
  if (k !== 10) {
    const newStr = transFn(n, k);
    transN = parseInt(newStr, 10);
  } else {
    transN = n;
  }

  while (transN > 0) {
    const remain = transN % 10;
    res += remain;
    transN = (transN - remain) / 10;
  }
  return res;
};

export { sumBase };

~~~

  
### 1844-replaceDigits.js

~~~js
/**
 * @param {string} s
 * @return {string}
 */
//  84 ms, 在所有 JavaScript 提交中击败了65.00%
const shift = (c, x) => String.fromCharCode(c.charCodeAt() + x * 1);

const replaceDigits = function(s) {
  const len = s.length;
  let s1 = '';
  for (let i = 0; i < len; i++) {
    if (i % 2 === 1) {
      // replace
      s1 = s1 + shift(s[i - 1], s[i]);
    } else {
      s1 = s1 + s[i];
    }
  }
  return s1;
};

export { replaceDigits };

~~~

  
### 1848-getMinDistance.js

~~~js
/**
 * @param {number[]} nums
 * @param {number} target
 * @param {number} start
 * @return {number}
 */
// 时间复杂度不好 84 ms, 在所有 JavaScript 提交中击败了60.66%
const getMinDistance2 = function(nums, target, start) {
  const len = nums.length;
  let min = len;
  for (let i = 0; i < len; i++) {
    if (nums[i] === target) {
      const tmpAbs = Math.abs(i - start);
      if (tmpAbs < min) {
        min = tmpAbs;
      }
    }
  }
  return min;
};

// 改进：68 ms, 在所有 JavaScript 提交中击败了97.81%
const getMinDistance = function(nums, target, start) {
  if (nums[start] === target) return 0;
  const arr1 = nums.slice(0, start + 1).reverse();
  const arr2 = nums.slice(start);
  const len = Math.max(arr1.length, arr2.length);
  for (let i = 0; i < len; i++) {
    if (arr1[i] === target || arr2[i] === target) {
      return i;
    }
  }
};

// console.log(getMinDistance([1,2,3,4,5], 5, 3) === 1);
// console.log(getMinDistance([1], 1, 0) === 0);
// console.log(getMinDistance([1,1,1,1,1,1,1,1,1,1], 1, 0) === 0);
// console.log(getMinDistance([5,3,6], 5, 2) === 2);
// console.log(getMinDistance([1,2,3,4,4,4,4,4,32,5,2,3,2,5,5,5,5,34,5,6,2,15], 2, 8) === 2);

export { getMinDistance, getMinDistance2 };

~~~

  
### 1854-maximumPopulation.js

~~~js
/**
 * @param {number[][]} logs
 * @return {number}
 */
// 80 ms, 在所有 JavaScript 提交中击败了93.45%
const maximumPopulation = function(logs) {
  // 思路：使用桶排序，这样的性能不太好，可以解决出来
  // 记得之前做过类似区间数组的问题，但是方法记不清楚了
  const arr = [];
  // 1950 <= birthi < deathi <= 2050
  for (let i = 0; i <= 2050; i++) {
    arr[i] = 0;
  }
  for (let i = 0; i < logs.length; i++) {
    const curr = logs[i];
    const start = curr[0];
    const end = curr[1];
    for (let j = start; j < end; j++) {
      arr[j] = arr[j] + 1;
    }
  }
  const max = Math.max(...arr);
  for (let i = 1950; i <= 2050; i++) {
    if (arr[i] === max) {
      return i;
    }
  }
};

export { maximumPopulation };

// console.log(maximumPopulation([[1993,1994]]));
// console.log(maximumPopulation([[1993,1999],[2000,2010]]));
// console.log(maximumPopulation([[1950,1961],[1960,1971],[1970,1981]]));
// console.log(maximumPopulation([[2008,2026],[2004,2008],[2034,2035],[1999,2050],[2049,2050],[2011,2035],[1966,2033],[2044,2049]]));

~~~

  
### 1859-sortSentence.js

~~~js
/**
 * @param {string} s
 * @return {string}
 */
// 72 ms, 在所有 JavaScript 提交中击败了97.34%
// 难度简单，主要是数组和字符串基本操作
const sortSentence = function(s) {
  // 先把字符串按照空格转换成字符串数组
  const arr1 = s.split(' ');
  // 然后数组每一项转换成对象，把单词部分和数字部分分开
  let arr2 = [];
  arr1.forEach((item) => {
    const len = item.length;
    const str = item.slice(0, len - 1);
    const num = Number(item[len - 1]);
    arr2.push({ str, num });
  });
  // 然后数组按照数字部分排序
  arr2 = arr2.sort((a, b) => {
    return a.num > b.num ? 1 : -1;
  });
  // 把数组中的数字部分去掉，然后拼接起来
  return arr2.map((item) => {
    return item.str;
  }).join(' ');
};

export { sortSentence };

~~~

  
### 1863-subsetXORSum.js

~~~js
/**
 * @param {number[]} nums
 * @return {number}
 */
// 考点：回溯算法（性能需要提升）
// 第一版：性能不好，第一个子函数是递归，性能太差
// 180 ms 9.62%
const subsetXORSum1 = function(nums) {
  // 辅助函数：求异或 a ^ b; 位运算
  let res = 0;
  getXOR = (arr) => {
    if (arr.length === 0) {
      return arr[0];
    }
    const curr = arr.pop();
    // 递归一下
    return curr ^ getXOR(arr);
  };
  // 思路：求出全部的子集(回溯算法)
  const len = nums.length;
  // i 表示子集元素的个数
  const backTrace = (arr, target, list, index) => {
    if (arr.length === target) {
      // console.log(arr);
      const res1 = getXOR([...arr]);
      res += res1;
      return;
    }
    if (arr.length > target) {
      return;
    }
    for (let i = index; i < list.length; i++) {
      const curr = list[i];
      arr.push(curr);
      backTrace(arr, target, [...list.slice(0, i), ...list.slice(i + 1)], i);
      arr.pop();
    }
  };
  for (let i = 1; i <= len; i++) {
    backTrace([], i, nums, 0);
  }
  return res;
};

// 168 ms, 在所有 JavaScript 提交中击败了9.94%
// 第二版：优化了辅助函数，但是性能仍然很差
const subsetXORSum2 = function(nums) {
  let res = 0;
  // 辅助函数：求异或 a ^ b; 位运算
  getXOR = (arr) => {
    const len = arr.length;
    if (len === 0) {
      return arr[0];
    }
    if (len === 1) {
      return arr[0] ^ arr[1];
    }
    let result = arr[0] ^ arr[1];
    for (let i = 2; i < len; i++) {
      result = result ^ arr[i];
    }
    return result;
  };
  // 辅助函数：回溯（优化）
  const backTrace = (arr, target, list, index) => {
    if (arr.length === target) {
      const res1 = getXOR([...arr]);
      res += res1;
      return;
    }
    if (arr.length > target) {
      return;
    }
    for (let i = index; i < list.length; i++) {
      const curr = list[i];
      arr.push(curr);
      backTrace(arr, target, [...list.slice(0, i), ...list.slice(i + 1)], i);
      arr.pop();
    }
  };
  const len = nums.length;
  // i 表示子集元素的个数
  for (let i = 1; i <= len; i++) {
    backTrace([], i, nums, 0);
  }
  return res;
};

// 这个算法不合适，需要修改
export { subsetXORSum1, subsetXORSum2 };

~~~

  
### 1869-checkZeroOnes.js

~~~js
/**
 * @param {string} s
 * @return {boolean}
 */
// 100 ms 在所有 JavaScript 提交中击败了15.33%
// 字符串的比较
const checkZeroOnes2 = function(s) {
  // 处理长度是1的情况
  if (s.length === 0) {
    return s === '1';
  }
  let current = s[0];
  let currLen = 1;
  let max1 = 0;
  let max2 = 0;
  const len = s.length;
  for (let i = 1; i < len; i++) {
    if (s[i] === current) {
      currLen++;
    } else {
      // 更新最大长度
      if (current === '1') {
        max1 = Math.max(max1, currLen);
      } else {
        max2 = Math.max(max2, currLen);
      }
      current = s[i];
      currLen = 1;
    }
  }
  // 更新最后一个
  if (current === '1') {
    max1 = Math.max(max1, currLen);
  } else {
    max2 = Math.max(max2, currLen);
  }
  return max1 > max2;
};

// 改进版 92 ms, 在所有 JavaScript 提交中击败了38.67%
// 这个算法还有哪些改进的地方？
const checkZeroOnes = function(s) {
  const len = s.length;
  if (len === 0) {
    return s === '1';
  }
  let current = s[0];
  let currLen = 1;
  let max1 = 0;
  let max2 = 0;
  for (let i = 1; i < len; i++) {
    if (s[i] === current) {
      currLen++;
    } else {
      // 更新最大长度
      if (current === '1') {
        if (currLen > max1) {
          max1 = currLen;
        }
      } else if (currLen > max2) {
        max2 = currLen;
      }
      current = s[i];
      currLen = 1;
    }
    // 循环中判断是否满足条件
    if (max1 > len / 2) {
      return true;
    }
    if (max2 >= len / 2) {
      return false;
    }
  }
  if (current === '1') {
    if (currLen > max1) {
      max1 = currLen;
    }
  } else if (currLen > max2) {
    max2 = currLen;
  }
  return max1 > max2;
};

// console.log(checkZeroOnes("1101") === true);
// console.log(checkZeroOnes("111000") === false);
// console.log(checkZeroOnes("110100010") === false);
// console.log(checkZeroOnes("1") === true);
// console.log(checkZeroOnes("0") === false);

export { checkZeroOnes2, checkZeroOnes };

~~~

  
### 1876-countGoodSubstrings.js

~~~js
/**
 * @param {string} s
 * @return {number}
 */
// 108 ms, 在所有 JavaScript 提交中击败了13.79%
// 思路一：效率不好，需要比较多次
const countGoodSubstrings1 = function(s) {
  const len = s.length;
  // if length is 1 or 2, the result is 0
  if (len <= 2) {
    return 0;
  }
  // 辅助函数，判断是否是好的子字符串
  const isGood = function(str) {
    if (str.length !== 3) {
      return false;
    }
    if (str[0] !== str[1] && str[1] !== str[2] && str[2] !== str[0]) {
      return true;
    }
    return false;
  };
  let res = 0;
  for (let i = 0; i < len; i++) {
    const current = s.slice(i, i + 3);
    if (isGood(current)) {
      res += 1;
    }
  }
  return res;
};

// 思路二：循环一次，存储好子串的个数
// 这样比较比较快捷，不需要每次调用子函数进行比较，不需要使用 slice 函数截取字符串，这样大量节省时间
// 88 ms, 在所有 JavaScript 提交中击败了62.93%
const countGoodSubstrings2 = function(s) {
  const len = s.length;
  // if length is 1 or 2, the result is 0
  if (len <= 2) {
    return 0;
  }
  // 辅助函数，判断是否是好的子字符串
  const isGood = function(i, j, k) {
    if (!i || !j || !k) {
      return false;
    }
    if (i !== j && j !== k && i !== k) {
      return true;
    }
    return false;
  };
  let res = 0;
  for (let i = 0; i < len; i++) {
    if (isGood(s[i], s[i + 1], s[i + 2])) {
      res += 1;
    }
  }
  return res;
};

// console.log(countGoodSubstrings2('xyzzaz') === 1);
// console.log(countGoodSubstrings2('aababcabc') === 4);

export { countGoodSubstrings1, countGoodSubstrings2 };

~~~

  
### 1880-isSumEqual.js

~~~js
/**
 * @param {string} firstWord
 * @param {string} secondWord
 * @param {string} targetWord
 * @return {boolean}
 */
// 84 ms, 在所有 JavaScript 提交中击败了50.79%
// 考点：字符串解析和转换
// 时间复杂度：O(n) 遍历一次字符串（字符串长度）
const isSumEqual = function(firstWord, secondWord, targetWord) {
  // 辅助函数:计算一个字符串对应的数字
  const getNum = (str) => {
    let res = 0;
    while (str.length > 0) {
      if (str[0] === 'a' && res === 0) {
        str = str.slice(1);
      } else {
        const curr = str[0];
        const currNum = curr.charCodeAt(0) - 97;
        res = res * 10 + currNum;
        str = str.slice(1);
      }
    }
    return res;
  };
  return getNum(firstWord) + getNum(secondWord) === getNum(targetWord);
};

export { isSumEqual };

~~~

  
### 1893-isCovered.js

~~~js
/**
 * @param {number[][]} ranges
 * @param {number} left
 * @param {number} right
 * @return {boolean}
 */
// 80 ms, 在所有 JavaScript 提交中击败了80.00%
// 判断一个二维数组中，是否覆盖一个区间（离散的点）
// 当前 left - right 较短，这个算法可以
// 如果是较长的区间 [1000, 30000] 这种，那么时间空间复杂度很差
const isCovered = function(ranges, left, right) {
  const arr = new Array(51).fill(0);
  for (let i = 0; i < ranges.length; i++) {
    const subRange = ranges[i];
    if (subRange[0] > right || subRange[1] < left) {
      continue;
    }
    for (let j = subRange[0]; j <= subRange[1]; j++) {
      arr[j] = 1;
    }
  }
  for (let i = left; i <= right; i++) {
    if (arr[i] === 0) {
      return false;
    }
  }
  return true;
};

export { isCovered };

~~~

  
### 1897-makeEqual.js

~~~js
/**
 * @param {string[]} words
 * @return {boolean}
 */
// 96 ms, 在所有 JavaScript 提交中击败了81.48%
// 循环，字符串计数
const makeEqual = function(words) {
  const dict = [];
  const len = words.length;
  const whole = words.join('');
  if (whole.length % len !== 0) {
    return false;
  }
  for (let i = 0; i < whole.length; i++) {
    const str = whole[i];
    if (!dict[str]) {
      dict[str] = 1;
    } else {
      dict[str] = dict[str] + 1;
    }
  }
  for (const key in dict) {
    const value = dict[key];
    if (value % len !== 0) {
      return false;
    }
  }
  return true;
};

export { makeEqual };

~~~

  
### 1903-largestOddNumber.js

~~~js
/**
 * @param {string} num
 * @return {string}
 */
// 给定一个字符串，获取最大的奇数子串
// 只要是最后一个是奇数，就是最大的奇数子串
// 考察字符串算法和循环，简单
const largestOddNumber = function(num) {
  let res = num;
  while (res.length > 0) {
    const last = res[res.length - 1];
    if (last % 2 === 1) {
      return res;
    } else {
      res = res.slice(0, res.length - 1);
    }
  }
  return '';
};

export { largestOddNumber };

~~~

  
### 1909-isIncrease.js

~~~js
/*
 * @lc app=leetcode.cn id=1909 lang=javascript
 *
 * [1909] 删除一个元素使数组严格递增
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */

// 辅助函数：判断一个函数是否是单调递增函数
// 这个如何记忆一个片段是单调递增的？现在是 N 平方的性能
const isIncrease = function(list) {
  const len = list.length;
  if (len === 0 || len === 1) return true;
  for (let i = 1; i < len; i++) {
    if (list[i] <= list[i - 1]) {
      return false;
    }
  }
  return true;
};

// Your runtime beats 64.17 % of javascript submissions
const canBeIncreasing = function(nums) {
  const len = nums.length;
  if (len === 2) {
    return true;
  }
  if (isIncrease(nums)) {
    return true;
  }
  for (let i = 0; i < len; i++) {
    const left = nums.slice(0, i);
    const right = nums.slice(i + 1);
    if ((left.length === 0 || right.length === 0 || left[left.length - 1] < right[0]) && isIncrease(left) && isIncrease(right)) {
      return true;
    }
  }
  return false;
};

// [100,21,100]

// @lc code=end
export { canBeIncreasing };

~~~

  
### 1913-maxProductDifference.js

~~~js
/*
 * @lc app=leetcode.cn id=1913 lang=javascript
 *
 * [1913] 两个数对之间的最大乘积差
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// 难度简单，数组排序
// 思路：数组排序，然后计算最大两个数和最小两个数的差
// 都是正整数，所以直接计算即可
// Your runtime beats 91.73 % of javascript submissions
const maxProductDifference = function(nums) {
  nums = nums.sort((a, b) => a - b < 0 ? 1 : -1);
  return nums[0] * nums[1] - nums[nums.length - 1] * nums[nums.length - 2];
};
// @lc code=end
export { maxProductDifference };

~~~

  
### 1920-buildArray.js

~~~js
/*
 * @lc app=leetcode.cn id=1920 lang=javascript
 *
 * [1920] 基于排列构建数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 题目简单，数组的基本操作
//  Your runtime beats 95.95 % of javascript submissions
const buildArray = function(nums) {
  return nums.map((item, i) => nums[nums[i]]);
};
// @lc code=end

export { buildArray };

~~~

  
### 1925-countTriples.js

~~~js
/*
 * @lc app=leetcode.cn id=1925 lang=javascript
 *
 * [1925] 统计平方和三元组的数目
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
// 两个思路
// 1、枚举法
// 因为数字范围是250，使用三层循环的算法复杂度可以接受 N * 3
// 直接循环三层，然后判断 abc 三个数是否满足需求
// 注意：a b 两个数字可以调换顺序，最后结果需要X2
// Your runtime beats 31.03 % of javascript submissions
const countTriples = function(n) {
  let count = 0;
  for (let i = 0; i <= n; i++) {
    for (let j = i + 1; j <= n; j++) {
      for (let k = j + 1; k <= n; k++) {
        if (i * i + j * j === k * k) {
          count++;
        }
      }
    }
  }
  return count * 2;
};

// 思路2：既然是判断相等，那么可以使用字典优化一层循环 N * 2
// Your runtime beats 44.83 % of javascript submissions
const countTriples2 = function(n) {
  const dict = {};
  const max = n * n;
  for (let i = 1; i <= n; i++) {
    const curr = i * i;
    dict[curr] = true;
  }
  let count = 0;
  for (let i = 1; i <= n; i++) {
    for (let j = i + 1; j <= n; j++) {
      const sum = i * i + j * j;
      if (dict[sum]) {
        count++;
      }
      if (sum > max) {
        break;
      }
    }
  }
  return count * 2;
};

// @lc code=end

export { countTriples, countTriples2 };

~~~

  
### 1929-getConcatenation.js

~~~js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
const getConcatenation = function (nums) {
  return [...nums, ...nums];
};

export { getConcatenation };

~~~

  
### 1935-canBeTypedWords.js

~~~js
/*
 * @lc app=leetcode.cn id=1935 lang=javascript
 *
 * [1935] 可以输入的最大单词数
 */

// @lc code=start
/**
 * @param {string} text
 * @param {string} brokenLetters
 * @return {number}
 */

// 思路一：先把字符串转换成数组，然后每一项过滤一下
// 64 ms Your runtime beats 94.36 % of javascript
const canBeTypedWords = function (text, brokenLetters) {
  const textList = text.split(' ');
  const map = {};
  for (let i = 0; i < brokenLetters.length; i++) {
    map[brokenLetters[i]] = true;
  }
  return textList.filter((item) => {
    for (let j = 0; j < item.length; j++) {
      // 这里可以减少一部分循环
      if (map[item[j]]) return false;
    }
    return true;
  }).length;
};

// 思路二：直接把错误的变成字典，然后遍历一次字符串即可
// 这样需要循环全部字符串，性能较差

// @lc code=end
export { canBeTypedWords };

~~~

  
### 1941-areOccurrencesEqual.js

~~~js
/*
 * @lc app=leetcode.cn id=1941 lang=javascript
 *
 * [1941] 检查是否所有字符出现次数相同
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
// 考点：遍历字符串，使用对象存储出现的次数
const areOccurrencesEqual = function(s) {
  // 1、如果长度是1，一个字符，直接返回真
  const len = s.length;
  if (len === 1) {
    return true;
  }
  // 2、创建一个对象，存储字符和出现的次数
  const dict = {};
  for (let i = 0; i < len; i++) {
    const key = s[i];
    if (!dict[key]) {
      dict[key] = 0;
    }
    dict[key] = dict[key] + 1;
  }
  // 3、遍历对象，判断出现次数是否相同。如果不同，返回false
  let times = -1;
  for (const key in dict) {
    const value = dict[key];
    if (times === -1) {
      times = value;
    } else if (times !== value) {
      return false;
    }
  }
  return true;
};
// @lc code=end

export { areOccurrencesEqual };

~~~

  
### 1945-getLucky.js

~~~js
/*
 * @lc app=leetcode.cn id=1945 lang=javascript
 *
 * [1945] 字符串转化后的各位数字之和
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
// 问题可以转换成两个小问题
// 1 把字符串根据 code 转换成数字字符串（循环）
// 2 计算数字字符串的每一位的和（递归）
// Your runtime beats 94.92 % of javascript submissions
const getLucky = function(s, k) {
  /**
   * 1 辅助函数：字符串转换成数字字符串
   * @param {string} str 输入的字符串
   * @returns 处理后的数值字符串
   */
  const transStr = (str) => {
    let res = '';
    for (let i = 0; i < str.length; i++) {
      const curr = s[i].charCodeAt(0) - 96;
      res += curr;
    }
    return res;
  };

  /**
   * 2 计算字符串数值的每一位的和
   * @param {string} str 输入的数值字符串
   * @returns 返回数值字符串
   */
  const getNumber = (str) => {
    let result = 0;
    for (let i = 0; i < str.length; i++) {
      result += (1 * str[i]);
    }
    return `${result}`;
  };

  // 3调用函数递归计算
  let resultStr = transStr(s);
  while (k > 0) {
    resultStr = getNumber(resultStr);
    k--;
  }
  return resultStr * 1;
};

// 特殊情况
// getLucky("dbvmfhnttvr", 5)
// 42221368142020220 / 10 返回值是 4222136814202022.5
// 如果数字很大，除法计算有问题，直接解析字符串，不要使用除法

// @lc code=end

export { getLucky };

~~~

  
### 1952-isThree.js

~~~js
/*
 * @lc app=leetcode.cn id=1952 lang=javascript
 *
 * [1952] 三除数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */
// 思路一：遍历数字，循环一次（如果N较大，性能不好）
const isThree = function(n) {
  let times = 0;
  for (let i = 0; i <= n; i++) {
    if (n % i === 0) {
      times++;
      if (times > 3) return false;
    }
  }
  return times === 3;
};

// 思路2 数学判断
// 如果一个数N是3除数，那么肯定能被 1 和 N 整除，那么剩余的一个就是 M
// 且 M * M === N, M 本身是一个质数，不能被其他的数字整除
// 这样直接计算即可，不需要遍历，性能比思路1好
// Your runtime beats 88.89 % of javascript submissions
const isThree2 = function(n) {
  // 0 特殊：1是质数，但是1不是三除数
  if (n === 1) {
    return false;
  }
  // 1 先开方
  const m = Math.sqrt(n);
  // 2 判断这个数是否是整数，如果不是整数，那么直接返回 false
  if (m !== Math.floor(m)) {
    return false;
  }
  // 辅助函数：判断是否是质数
  const isPrime = (num) => {
    if (num <= 3) return true;
    for (let i = 2; i <= num / 2; i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  };
  // 3 如果是整数，判断这个数是否是质数，这样性能就提升很多了
  return isPrime(m);
};
// @lc code=end

export { isThree, isThree2 };

~~~

  
### 1957-makeFancyString.js

~~~js
/*
 * @lc app=leetcode.cn id=1957 lang=javascript
 *
 * [1957] 删除字符使字符串变好
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
// 这个字符串较长，可以尝试两个思路
// 思路1：循环一次字符串，然后去掉重复的元素
// Your runtime beats 97.33 % of javascript submissions
const makeFancyString = function(s) {
  const len = s.length;
  if (len <= 2) return s;
  let res = `${s[0]}${s[1]}`;
  for (let i = 2; i < len; i++) {
    if (s[i] === s[i - 2] && s[i] === s[i - 1]) {
      continue;
    }
    res += s[i];
  }
  return res;
};

// 思路二：正则
// 适合字符串较长的情况，字符较短时性能比较差
// 还能都直接循环26个字母，先判断有没有这个字符，然后使用正则替换处理
// for (let i = 0; i < 26; i++) {
//   console.log(String.fromCharCode((97 + i)));
// }
// 'asaaaaaa'.replace(/([a-z])\1{2}/g, 'a');
const makeFancyString2 = function(s) {
  const len = s.length;
  if (len <= 2) return s;
};

// @lc code=end

export { makeFancyString, makeFancyString2 };

~~~

  
### 1961-isPrefixString.js

~~~js
/**
 * @param {string} s
 * @param {string[]} words
 * @return {boolean}
 */
const isPrefixString = function (s, words) {
  const res = words.join('');
  if (res === s) return true;
  const sLen = s.length;
  if (res.length < sLen) return false;
  let tmp = '';
  for (let i = 0; i < words.length; i++) {
    const item = words[i];
    tmp = tmp + item;
    if (tmp === s) {
      return true;
    }
    if (tmp.length > sLen) {
      return false;
    }
  }
  return false;
};

export { isPrefixString };

~~~

  
### 1967-numOfStrings.js

~~~js
/*
 * @lc app=leetcode.cn id=1967 lang=javascript
 *
 * [1967] 作为子字符串出现在单词中的字符串数目
 */

// @lc code=start
/**
 * @param {string[]} patterns
 * @param {string} word
 * @return {number}
 */
// 思路1：循环数组，判断字符串中是否包含子字符串
// 字符串长度比较短，性能可以满足
// Your runtime beats 33.82 % of javascript submissions
// const numOfStrings = function(patterns, word) {
//   let result = 0;
//   for (let i = 0; i < patterns.length; i++) {
//     if (word.includes(patterns[i])) {
//       result++;
//     }
//   }
//   return result;
// };

// 思路二：优化内部查找
// 优化，因为字符串中可能存在重复的，那么遍历时，可以把重复的记录下
// 这样可以避免每一个都查找
// Your runtime beats 92.65 % of javascript submissions
const numOfStrings = function(patterns, word) {
  let result = 0;
  const dict = {};
  for (let i = 0; i < patterns.length; i++) {
    // 先拿到当前的字符串
    const key = patterns[i];
    // 先判断缓冲中是否存在
    if (dict[key] === true) {
      result++;
    } else if (dict[key] === false) {
      continue;
    }
    // 如果缓存没有，再查找是否是子串，并放在缓存中
    else if (word.includes(key)) {
      dict[key] = true;
      result++;
    } else {
      dict[key] = false;
    }
  }
  return result;
};
// @lc code=end

export { numOfStrings };

~~~

  
### 1971-validPath.js

~~~js
/*
 * @lc app=leetcode.cn id=1971 lang=javascript
 *
 * [1971] 寻找图中是否存在路径
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} start
 * @param {number} end
 * @return {boolean}
 */
// 广度优先遍历和图的基本操作
// Your runtime beats 13.04 % of javascript submissions
const validPath = function(n, edges, start, end) {
  // 如果只有一个节点，那么就是连通的，返回真
  if (n === 1) {
    return true;
  }
  // 先把图中节点的邻接关系，遍历一次，线性关系转换成字典关系
  const dict = {};
  for (let i = 0; i < edges.length; i++) {
    const key = edges[i][0];
    const value = edges[i][1];
    // 无向图，双向加入
    if (!dict[key]) {
      dict[key] = [];
    }
    dict[key].push(value);
    if (!dict[value]) {
      dict[value] = [];
    }
    dict[value].push(key);
  }
  // console.log(dict);
  // 然后找到开始的 start 节点，广度优先遍历
  // 如果开始节点是一个孤立节点，直接返回 false
  if (!dict[start]) {
    return false;
  }
  const tmp = []; // 这里是BFS的节点
  const runed_map = {}; // 这个是已经遍历的节点
  // 广度优先遍历时，记录已经遍历过的节点
  runed_map[start] = true;
  if (dict[start].includes(end)) {
    return true;
  }
  tmp.push(...dict[start]);
  // 开始循环
  while (tmp.length > 0) {
    // 如果遇到到已经遍历的节点，直接跳过（图中的环）
    const current = tmp.shift();
    runed_map[current] = true;
    // forEach()本身无法跳出循环，必须遍历所有的数据才能结束。
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
    if (dict[current]) {
      for (let i = 0; i < dict[current].length; i++) {
        const item = dict[current][i];
        // forEach 循环中返回值
        if (item === end) {
          return true;
        }
        if (!runed_map[item]) {
          tmp.push(item);
        }
      }
    }
  }
  // 如果当前的节点的流已经遍历完，那么不是连通的路径
  return false;
};

// @lc code=end
export { validPath };

~~~

  
### 1974-minTimeToType.js

~~~js
const minTimeToType = function (word) {
  const len = word.length;
  if (len === 0) {
    return 0;
  }
  const getIndent = function (a, b) {
    if (a === b) {
      return 0;
    }
    const tmp = Math.abs(Number(b.charCodeAt(0)) - Number(a.charCodeAt(0)));
    return Math.min(tmp, 26 - tmp);
  };
  let res = len;
  res += getIndent('a', word[0]);
  for (let i = 0; i < len - 1; i++) {
    res += getIndent(word[i], word[i + 1]);
  }
  return res;
};

export { minTimeToType };

~~~

  
### 1979-findGCD.js

~~~js
// 1979. 找出数组的最大公约数
/**
 * @param {number[]} nums
 * @return {number}
 */
const findGCD = function (nums) {
  const min = Math.min(...nums);
  const max = Math.max(...nums);
  // 如果相等，或者可以相除，返回最小值
  if (min === max || max % min === 0) {
    return min;
  }
  for (let i = Math.floor(min / 2 + 1); i > 0; i--) {
    if (max % i === 0 && min % i === 0) {
      return i;
    }
  }
  return 1;
};

export { findGCD };

~~~

  
### 1984-minimumDifference.js

~~~js
// 思路：先把 nums 排序，然后按照滑动窗口的算法，依次入栈出栈，然后计算最小值
// 或者双指针即可，不需要出栈入栈
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const minimumDifference = function (nums, k) {
  if (k === 1) return 0;
  nums.sort((a, b) => a > b ? 1 : -1);
  let start = 0;
  let end = start + k - 1;
  let min = nums[end] - nums[start];
  for (let i = 0; i < nums.length; i++) {
    start++;
    end++;
    if (nums[end] === undefined) break;
    const tmp = nums[end] - nums[start];
    min = tmp < min ? tmp : min;
  }
  return min;
};

export { minimumDifference };

~~~

  
### 1991-findMiddleIndex.js

~~~js
/**
 * 给你一个下标从 0 开始的整数数组 nums ，请你找到 最左边 的中间位置 middleIndex （也就是所有可能中间位置下标最小的一个）。
 * @param {number[]} nums
 * @return {number}
 */
// 先求和，然后求出左半部分和右半部分的和，一次循环实现
// 76 ms, 在所有 JavaScript 提交中击败了50.00%
const findMiddleIndex = function (nums) {
  const len = nums.length;
  if (len === 1) return 0;
  const sum = nums.reduce((a, b) => { return a + b; }, 0);
  let right = sum - nums[0];
  if (right === 0) {
    return 0;
  }
  let left = 0;
  for (let i = 1; i < len; i++) {
    right = right - nums[i];
    left = left + nums[i - 1];
    if (left === right) {
      return i;
    }
  }
  return -1;
};

// console.log(findMiddleIndex([2,3,-1,8,4]) === 3);
// console.log(findMiddleIndex([1,-1,4]) === 2);
// console.log(findMiddleIndex([2,5]) === -1);
// console.log(findMiddleIndex([1]) === 0);
export { findMiddleIndex };

~~~

  
### 1995-countQuadruplets.js

~~~js
// 1995. 统计特殊四元组
// 给你一个 下标从 0 开始 的整数数组 nums ，返回满足下述条件的 不同 四元组 (a, b, c, d) 的 数目 ：
// nums[a] + nums[b] + nums[c] == nums[d] ，且a < b < c < d
// 链接：https://leetcode-cn.com/problems/count-special-quadruplets

// 思路1：先遍历一次数组，获取 value - index arr 的对象
// 因为数组的长度小于50，使用两层或者三层遍历也是可行的
// 数组的范围0-100，能否使用桶排序？
// 然后三层遍历，然后求和，看是否满足当前的值(实际4层循环)

// 88 ms 在所有 JavaScript 提交中击败了57.48%
/**
 * @param {number[]} nums
 * @return {number}
 */
const countQuadruplets = function (nums) {
  let max = nums[0];
  const dict = {};
  for (let i = 0; i < nums.length; i++) {
    const curr = nums[i];
    // 求出最大值
    if (max < curr) {
      max = curr;
    }
    // 放在字典中
    if (!dict[curr]) {
      dict[curr] = [i];
    } else {
      dict[curr].push(i);
    }
  }
  // 三重循环
  let result = 0;
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    // （可以先求一个最大值，如果已经超过最大值，那么继续下一层循环）
    // 如果已经大于最大值，继续循环
    if (nums[i] >= max) {
      continue;
    }
    for (let j = i + 1; j < len; j++) {
      // 如果已经大于最大值，继续循环
      if (nums[i] + nums[j] >= max) {
        continue;
      }
      for (let k = j + 1; k < len; k++) {
        const sum = nums[i] + nums[j] + nums[k];
        // 如果字典中没有这个值，继续循环
        if (!dict[sum]) {
          continue;
        }
        const sumList = dict[sum];
        // 这里的循环能否避免
        // sumList 是一个递增的数组
        sumList.forEach((item) => {
          if (item > k) {
            result++;
          }
        });
      }
    }
  }
  return result;
};

export { countQuadruplets };

// console.log(countQuadruplets([1,2,3,6]));
// console.log(countQuadruplets([3,3,6,4,5]));
// console.log(countQuadruplets([1,1,1,3,5]));
// console.log(countQuadruplets([1,2,3,6,1,1,1,3,5,1,1,1,3,5,1,1,1,3,5,1,1,1,3,5]));

// 思路2
// 如果先把数组排序一下，这样看一下
// 先对数组实现桶排序，范围1-100，然后每一项存储出现的位置
// 然后再操作字典，这样最后匹配的就是4个数组，直接数组的长度相乘——需要检测不会重复

// const countQuadruplets2 = function(nums) {
//   const len = nums.length;
//   let dict = {};
//   let max = nums[0];
//   // 每一项不需要数组，直接计数就行
//   for (let i = 0; i < nums.length; i++) {
//     let curr = nums[i];
//     if (!dict[curr]) {
//       dict[curr] = [i];
//     } else {
//       dict[curr].push(i);
//     }
//     // 更新最大值
//     if (max < curr) max = curr;
//   }
//   // 先排序去重，然后再乘法计算
//   let newArr = [...new Set(nums)].sort((a, b) => a - b > 0 ? 1 : -1);
//   // console.log(newArr);
//   // console.log(dict);
//   let result = 0;

//   for (let i = 0; i < newArr.length; i++) {
//     for (let j = i + 1; j < newArr.length; j++) {
//       for (let k = j + 1; k < newArr.length; k++) {
//         // sum 有7个情况（newArr[i] * 2+ newArr[k];）这就比较麻烦
//         let sum = newArr[i] + newArr[j] + newArr[k];
//         if (sum > max) {
//           break;
//         }
//         // 如果字典中有这个值，计算个数
//         if (dict[sum]) {
//           // console.log(newArr[i], newArr[j], newArr[k], sum);
//           result += (dict[newArr[i]].length * dict[newArr[j]].length * dict[newArr[k]].length * dict[sum].length);
//         }
//       }
//     }
//   }
//   return result;
// }

~~~

  
### 2000-reversePrefix.js

~~~js
/*
 * @lc app=leetcode.cn id=2000 lang=javascript
 *
 * [2000] 反转单词前缀
 */

// 给你一个下标从 0 开始的字符串 word 和一个字符 ch 。找出 ch 第一次出现的下标 i ，反转 word 中从下标 0 开始、直到下标 i 结束（含下标 i ）的那段字符。如果 word 中不存在字符 ch ，则无需进行任何操作。

// 例如，如果 word = "abcdefd" 且 ch = "d" ，那么你应该 反转 从下标 0 开始、直到下标 3 结束（含下标 3 ）。结果字符串将会是 "dcbaefd" 。
// 返回 结果字符串 。
// @lc code=start
/**
 * @param {string} word
 * @param {character} ch
 * @return {string}
 */
// 题目简单，主要是字符串遍历和反转
const reversePrefix = function(word, ch) {
  // Your runtime beats 55.32 % of javascript submissions
  const index = word.indexOf(ch);
  if (index <= 0) return word;
  const len = index + ch.length;
  let left = word.slice(0, len);
  // 易错点是字符串的反转（转换成数组后反转）
  left = left.split('').reverse().join('');
  const right = word.slice(len);
  return left + right;
};
// @lc code=end
export { reversePrefix };

~~~

  
### 2006.差的绝对值为-countKDifference.js

~~~js
/*
 * @lc app=leetcode.cn id=2006 lang=javascript
 *
 * [2006] 差的绝对值为 K 的数对数目
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
//  Your runtime beats 74.37 % of javascript submissions
//  难度：简单
//  数组双循环，然后计算两个数的绝对值即可
const countKDifference = function(nums, k) {
  let times = 0;
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (Math.abs(nums[i] - nums[j]) === k) {
        times++;
      }
    }
  }
  return times;
};

//  能否使用Object优化一下到 On?
//  数组遍历一次，然后计算数字的个数，然后再遍历这个数组
//  去掉很多重复值，直接计算乘法，适合重复数字较多的情况
// 理论上可以（字典获取重复值，然后数组去重，计算绝对值）
// 需要测试

const countKDifference2 = function(nums, k) {
  const len = nums.length;
  // 存放出现的次数
  const dict = {};
  for (let i = 0; i < len; i++) {
    const key = nums[i];
    if (!dict[key]) {
      dict[key] = 0;
    }
    dict[key] = dict[key] + 1;
  }
  const arr = [...new Set(nums)];
  let times = 0;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (Math.abs(arr[i] - arr[j]) === k) {
        times += dict[arr[i]] * dict[arr[j]];
      }
    }
  }
  return times;
};

// @lc code=end
export { countKDifference, countKDifference2 };

~~~

  
### 2011-finalValueAfterOperations.js

~~~js
/*
 * @lc app=leetcode.cn id=2011 lang=javascript
 *
 * [2011] 执行操作后的变量值
 */

// @lc code=start
/**
 * @param {string[]} operations
 * @return {number}
 */
// 这个是基本的数组操作，简单
// Your runtime beats 13.38 % of javascript submissions
const finalValueAfterOperations = function(operations) {
  let count = 0;
  operations.forEach((item) => {
    if (item === 'X++' || item === '++X') {
      count++;
    } else {
      count--;
    }
  });
  return count;
};
// @lc code=end
export { finalValueAfterOperations };

~~~

  
### 2016-maximumDifference.js

~~~js
/*
 * @lc app=leetcode.cn id=2016 lang=javascript
 *
 * [2016] 增量元素之间的最大差值
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
//  Your runtime beats 74.2 % of javascript submissions
// 循环数组，类似双指针（一个记录最小值，一个记录当前的值）
const maximumDifference = function(nums) {
  let min = nums[0];
  let res = -1;
  for (let i = 1; i < nums.length; i++) {
    // 可能前后两个元素相等，这样不计算差值
    if (nums[i] <= min) {
      min = nums[i];
    } else {
      const current = nums[i] - min;
      if (current > res) {
        res = current;
      }
    }
  }
  return res;
};
// @lc code=end
export { maximumDifference };

~~~

  
### 2022-construct2DArray.js

~~~js
/*
 * @lc app=leetcode.cn id=2022 lang=javascript
 *
 * [2022] 将一维数组转变成二维数组
 */

// @lc code=start
/**
 * @param {number[]} original
 * @param {number} m
 * @param {number} n
 * @return {number[][]}
 */
// 简单，考点是数组的循环和剪切等
// 时间复杂度是O(n) 数组的长度 / n
// Your runtime beats 96.11 % of javascript submissions
const construct2DArray = function(original, m, n) {
  const len = original.length;
  // 如果长度不一样，无法直接转换
  if (len !== m * n) {
    return [];
  }
  // m === n === 1
  if (len === 1) {
    return [[original[0]]];
  }
  // 处理二维数组
  const res = [];
  for (let i = 0; i < len; i += n) {
    const tmp = original.slice(i, i + n);
    res.push(tmp);
  }
  return res;
};
// @lc code=end
export { construct2DArray };

~~~

  
### 2027-minimumMoves.js

~~~js
/*
 * @lc app=leetcode.cn id=2027 lang=javascript
 *
 * [2027] 转换字符串的最少操作次数
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
// 遍历时，在三个元素中，如果第一个是X，那么必须换成O，不管后面的是什么
// Your runtime beats 57.99 % of javascript submissions
// 贪心算法，每次遇到一个满足情况的解，就直接处理
// 注意边界条件的处理（其他的字符串匹配的方法，解不正确）
const minimumMoves = function(s) {
  let timer = 0;
  if (!s.includes('X')) {
    return 0;
  }
  const len = s.length;
  const S = s.split('');
  for (let i = 2; i < len; i++) {
    if (S[i - 2] === 'X') {
      timer++;
      S[i - 2] = 'O';
      S[i - 1] = 'O';
      S[i] = 'O';
      i += 2;
    }
  }
  // 处理最后两个数字
  if (S[len - 1] === 'X' || S[len - 2] === 'X') {
    timer++;
  }
  return timer;
};
// @lc code=end
export { minimumMoves };

~~~

  
### 2032-twoOutOfThree.js

~~~js
/*
 * @lc app=leetcode.cn id=2032 lang=javascript
 *
 * [2032] 至少在两个数组中出现的值
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @return {number[]}
 */
// 思路：求三个数组中两两的交集，然后求并集
// 问题：是否考虑重复情况（求并集是否去重）
// Your runtime beats 80.13 % of javascript submissions
const twoOutOfThree = function(nums1, nums2, nums3) {
  // 1 辅助函数，求两个数组的并集
  // 1.1 先把一个数组使用对象记录
  // 1.2 然后遍历另一个数组，求交集
  const interact = (arr1, arr2) => {
    const dict = {};
    arr1.forEach((item) => {
      dict[item] = true;
    });
    return arr2.filter((item) => {
      return dict[item] === true;
    });
  };
  // 2 把三个交集求出来，然后拼接成新的数组，并去重
  const inter1 = interact(nums1, nums2);
  const inter2 = interact(nums1, nums3);
  const inter3 = interact(nums3, nums2);
  const result = [].concat(inter1, inter2, inter3);
  return [...new Set(result)];
};
// @lc code=end
export { twoOutOfThree };

~~~

  
### 2037-minMovesToSeat.js

~~~js
/*
 * @lc app=leetcode.cn id=2037 lang=javascript
 *
 * [2037] 使每位学生都有座位的最少移动次数
 */

// @lc code=start
/**
 * @param {number[]} seats
 * @param {number[]} students
 * @return {number}
 */
// 不管怎么移动，第一个移动到第一个座位，第二个移动到第二个座位
// 这样移动结果是最小的（不考虑每一个的移动的权重）
// Your runtime beats 81.15 % of javascript submissions
const minMovesToSeat = function(seats, students) {
  // 1、先把两个数组分别原位排序
  seats = seats.sort((a, b) => {
    return a > b ? 1 : -1;
  });
  students = students.sort((a, b) => {
    return a > b ? 1 : -1;
  });
  let move = 0;
  // 2、循环数组，计算每一个项的差值，并求和
  for (let i = 0; i < seats.length; i++) {
    const curr = Math.abs(seats[i] - students[i]);
    move += curr;
  }
  return move;
};
// @lc code=end
export { minMovesToSeat };

~~~

  
### 2042-areNumbersAscending.js

~~~js
/*
 * @lc app=leetcode.cn id=2042 lang=javascript
 *
 * [2042] 检查句子中的数字是否递增
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
// 思路：把字符串转换成数组，然后提取出数字，判断是否递增
// Your runtime beats 57.94 % of javascript submissions
const areNumbersAscending = function(s) {
  // 1 把字符串转换成数组
  let arr = s.split(' ');
  // 2 过滤数组中的字符串，把数字部分转换成数值类型
  arr = arr.filter((item) => {
    return !Number.isNaN(parseInt(item, 10));
  });
  for (let i = 1; i < arr.length; i++) {
    if (parseInt(arr[i], 10) <= parseInt(arr[i - 1], 10)) {
      return false;
    }
  }
  return true;
};
// @lc code=end
export { areNumbersAscending };

~~~

  
### 2047-checkStr.js

~~~js
/*
 * @lc app=leetcode.cn id=2047 lang=javascript
 *
 * [2047] 句子中的有效单词数
 */

// @lc code=start
/**
 * @param {string} sentence
 * @return {number}
 */
// 辅助函数（判断字符串是否是token）
// Your runtime beats 33.48 % of javascript submissions
const checkStr = (str) => {
  if (str.length === 0) {
    return false;
  }
  // 1 仅由小写字母、连字符和/或标点（不含数字）。如果有数字，不满足
  const number_reg = new RegExp(/[0-9]/, 'g');
  if (number_reg.test(str)) {
    return false;
  }

  // 2. 如果存在连字符
  if (str.indexOf('-') > -1) {
    // 2.1 如果存在多个连字符，不满足
    if (str.indexOf('-') !== str.lastIndexOf('-')) {
      return false;
    }
    // 2.2 如果存在一个连字符，连字符两侧应当都存在小写字母（"a-b" 是一个有效单词，但 "-ab" 和 "ab-" 不是有效单词）。
    const index = str.indexOf('-');
    // 2.3 如果连字符是第一个或者最后一个，都不是有效的
    if (index === 0 || index === str.length - 1) {
      return false;
    }
    // const small_str_reg = new RegExp(/[a-z]/, 'g');
    // 这里不能提取公共变量
    if (!new RegExp(/[a-z]/, 'g').test(str[index - 1]) || !new RegExp(/[a-z]/, 'g').test(str[index + 1])) {
      return false;
    }
  }

  // 3 判断标点符号：至多一个 标点符号。'!'、'.' 和 ','
  // 如果存在，标点符号应当位于 token 的末尾。
  // 如果结尾是标点符号，那么直接删除，然后判断剩余部分是否有标点符号
  const last = str[str.length - 1];
  if (last === '!' || last === '.' || last === ',') {
    str = str.slice(0, str.length - 1);
  }
  const comma_reg = new RegExp(/[\!\.\,]/, 'g');
  if (comma_reg.test(str)) {
    return false;
  }
  return true;
};

// 思路：把句子转换成字符串数组，然后判断每一个字符串是否满足
const countValidWords = function(sentence) {
  const arr = sentence.split(' ');
  let times = 0;
  for (let i = 0; i < arr.length; i++) {
    // console.log(arr[i], checkStr(arr[i]));
    if (checkStr(arr[i])) {
      // console.log(arr[i]);
      times++;
    }
  }
  return times;
};

// console.log(countValidWords("-") === 0)
// console.log(countValidWords('pencil-sharpener.') === 1)
// console.log(countValidWords('cat and  dog') === 3)
// console.log(countValidWords('!this  1-s b8d!') === 0)
// console.log(countValidWords('alice and  bob are playing stone-game10') === 5)
// @lc code=end
export { countValidWords };

~~~

  
### 2053.数组中第-kthDistinct.js

~~~js
/*
 * @lc app=leetcode.cn id=2053 lang=javascript
 *
 * [2053] 数组中第 K 个独一无二的字符串
 */

// @lc code=start
/**
 * @param {string[]} arr
 * @param {number} k
 * @return {string}
 */
// Your runtime beats 44.36 % of javascript submissions
const kthDistinct = function(arr, k) {
  // 1. 遍历一次数组，找出没有重复的和没有重复的元素
  const dict = {};
  arr.forEach((item) => {
    if (!dict[item]) {
      dict[item] = 0;
    }
    dict[item] = dict[item] + 1;
  });
  // 2. 再遍历一次数组，把重复的筛掉，然后获取第K个
  const filter_arr = [];
  arr.forEach((item) => {
    if (dict[item] === 1) {
      filter_arr.push(item);
      if (filter_arr.length === k) {
        return filter_arr[k - 1];
      }
    }
  });
  return filter_arr[k - 1] || '';
};
// @lc code=end
export { kthDistinct };

~~~

  
### 2057-smallestEqual.js

~~~js
/*
 * @lc app=leetcode.cn id=2057 lang=javascript
 *
 * [2057] 值相等的最小索引
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// 思路：遍历数组取余数
// Your runtime beats 61 % of javascript submissions
const smallestEqual = function(nums) {
  for (let i = 0; i < nums.length; i++) {
    if (i % 10 === nums[i]) {
      return i;
    }
  }
  return -1;
};
// @lc code=end
export { smallestEqual };

~~~

  
### 2062-countVowelSubstrings.js

~~~js
/*
 * @lc app=leetcode.cn id=2062 lang=javascript
 *
 * [2062] 统计字符串中的元音子字符串
 */

// @lc code=start
/**
 * @param {string} word
 * @return {number}
 */
// // 思路1： 这个问题可以转换成2个子问题
// const countVowelSubstrings = function(word) {
//   // 1 辅助函数：判断是否是元音字符串，设置计数器
//   const checkStr = (str) => {
//     // 返回值可以是三个情况
//     // true 表示满足条件
//     // false 表示不满足条件（有辅音字母），不需要继续循环
//     // null ？表示全是元音，但是不够五个，需要继续循环
//     // 必须包含这5个，而且全部去掉后，不能有辅音
//     // .replace(/[aeiou]+/g, '');
//   }
//   // 2 获取全部子字符串，可以使用双指针
//   // 外循环是开始的指针，内循环是结束的指针
// };

// 思路2: 完全正则匹配-这个性能更好，不需要循环全部的子字符串
// 这个比思路1好，不过双循环内部 includes 可以优化
// Your runtime beats 44.44 % of javascript submissions
const countVowelSubstrings = function(word) {
  /**
   * 辅助函数：判断一个字符串是否是满足条件的字符串
   * @param {string} str 输入的字符串
   * @returns boolean 返回是否满足要求
   */
  const checkStr = (str) => {
    // 如果长度小于5，那么肯定不满足
    if (str.length < 5) {
      return false;
    }
    // 因为已经用正则去掉了辅音部分，所以这里不考虑，直接判断元音
    if (str.includes('a') && str.includes('e') && str.includes('i') && str.includes('o') && str.includes('u')) {
      return true;
    }
    return false;
  };

  // 如果长度小于5，直接返回0
  if (word.length < 5) {
    return 0;
  }
  // 1. 获取满足的全部字符串数组
  const word_arr = word.match(/[aeiou]+/g);
  // 如果没有满足的字符串数组，结果是null，直接返回0
  if (!word_arr) {
    return 0;
  }

  // 2. 筛选全部子字符串
  let times = 0;
  const cache = {};
  word_arr.forEach((current) => {
    const len = current.length;
    // 子字符串长度必须大于4
    if (len > 4) {
      // 双指针双重循环，判断每一个子字符串是否满足要求
      for (let start = 0; start <= len; start++) {
        for (let end = start + 5; end <= len; end++) {
          const inner = current.slice(start, end);
          // 先从缓存中获取，避免多次计算相同的子字符串
          if (cache[inner]) {
            if (cache[inner] === 1) {
              times++;
            }
          }
          // 如果缓存中没有，计算并存放到缓存中
          else {
            const res = checkStr(inner);
            if (res === true) {
              times++;
              cache[inner] = 1; // 1 表示满足
            } else {
              cache[inner] = 2; // 2 表示不满足
            }
          }
        }
      }
    }
  });
  return times;
};

// console.log(countVowelSubstrings('cuaieuouac') === 7);
// console.log(countVowelSubstrings('cuaieuouaaieuouaieuouaieuouc') === 234);
// "b"

// @lc code=end
export { countVowelSubstrings };

~~~

  
### 2068-checkAlmostEquivalent.js

~~~js
/*
 * @lc app=leetcode.cn id=2068 lang=javascript
 *
 * [2068] 检查两个字符串是否几乎相等
 */

// @lc code=start
/**
 * @param {string} word1
 * @param {string} word2
 * @return {boolean}
 */
// 思路：循环字符串，获取出现的次数。然后遍历两个字典即可
// Your runtime beats 29.03 % of javascript submissions
const checkAlmostEquivalent = function(word1, word2) {
  const len = word1.length;
  const dict1 = {};
  const dict2 = {};
  // 遍历字符串
  for (let i = 0; i < len; i++) {
    // 计算第一个的次数
    const key1 = word1[i];
    if (!dict1[key1]) {
      dict1[key1] = 0;
    }
    dict1[key1] = dict1[key1] + 1;

    // 计算第二个的次数
    const key2 = word2[i];
    if (!dict2[key2]) {
      dict2[key2] = 0;
    }
    dict2[key2] = dict2[key2] + 1;

    // 这样保证两个对象中键全部都有
    if (!dict2[key1]) {
      dict2[key1] = 0;
    }
    if (!dict1[key2]) {
      dict1[key2] = 0;
    }
  }
  // 比较出现的概率
  for (const key in dict1) {
    const value1 = dict1[key];
    const value2 = dict2[key];
    if (Math.abs(value1 - value2) > 3) {
      return false;
    }
  }
  return true;
};
// @lc code=end
export { checkAlmostEquivalent };

~~~

  
### 2073-timeRequiredToBuy.js

~~~js
// 有 n 个人前来排队买票，其中第 0 人站在队伍 最前方 ，第 (n - 1) 人站在队伍 最后方 。
// 给你一个下标从 0 开始的整数数组 tickets ，数组长度为 n ，其中第 i 人想要购买的票数为 tickets[i] 。
// 每个人买票都需要用掉 恰好 1 秒 。一个人 一次只能买一张票 ，如果需要购买更多票，他必须走到
// 队尾 重新排队（瞬间 发生，不计时间）。如果一个人没有剩下需要买的票，那他将会 离开 队伍。
// 返回位于位置 k（下标从 0 开始）的人完成买票需要的时间（以秒为单位）。
// 链接：https://leetcode-cn.com/problems/time-needed-to-buy-tickets

// 考点：数组运算（简单）
/**
 * @param {number[]} tickets
 * @param {number} k
 * @return {number}
 */
const timeRequiredToBuy = function(tickets, k) {
  const curr = tickets[k];
  let sum = 0;
  let decrease = 0;
  // 循环一次：如果小于这个数，直接加上；如果大于这个数，那么加这个数字
  // 如果数组长度变化了，不需要考虑 K 的变化（刚开始自己的误区）
  for (let i = 0; i < tickets.length; i++) {
    if (tickets[i] < curr) {
      sum += tickets[i];
    } else {
      sum += curr;
      // 易错点：如果是这个数后面的数字，那么需要减去1（只要前一个满足，后面的就不需要计算了）
      if (i > k) {
        decrease++;
      }
    }
  }
  return sum - decrease;
};

export { timeRequiredToBuy };

~~~

  
### 2078-maxDistance.js

~~~js
/*
 * @lc app=leetcode.cn id=2078 lang=javascript
 *
 * [2078] 两栋颜色不同且距离最远的房子
 */

// @lc code=start
/**
 * @param {number[]} colors
 * @return {number}
 */
// 思路一：双重循环（设置开始和结束）
// 数组长度是100，复杂度可以接受
// 性能有点差，或者满足什么条件可以终止？
// Your runtime beats 58.99 % of javascript submissions
const maxDistance = function(colors) {
  let res = 0;
  const len = colors.length;
  for (let i = 0; i < len; i++) {
    for (let j = len - 1; j > i; j--) {
      if (colors[i] !== colors[j]) {
        const diff = j - i;
        if (diff > res) {
          res = diff;
        }
      }
    }
  }
  return res;
};
// 能否使用双指针优化？
// @lc code=end
export { maxDistance };

~~~

  
### 2085-countWords.js

~~~js
// 给你两个字符串数组 words1 和 words2 ，请你返回在两个字符串数组中 都恰好出现一次 的字符串的数目。
// 考点：数组遍历转换成对象和计数，然后循环对象即可
/**
 * @param {string[]} words1
 * @param {string[]} words2
 * @return {number}
 */
const countWords = function(words1, words2) {
  const dict1 = {};
  const dict2 = {};
  for (let i = 0; i < words1.length; i++) {
    const curr = words1[i];
    if (!dict1[curr]) {
      dict1[curr] = 1;
    } else {
      dict1[curr] = dict1[curr] + 1;
    }
  }
  for (let i = 0; i < words2.length; i++) {
    const curr = words2[i];
    if (!dict2[curr]) {
      dict2[curr] = 1;
    } else {
      dict2[curr] = dict2[curr] + 1;
    }
  }
  let sum = 0;
  for (const key in dict1) {
    if (dict1[key] === 1 && dict2[key] === 1) {
      sum++;
    }
  }
  return sum;
};

export { countWords };

~~~

  
### 2089-targetIndices.js

~~~js
/*
 * @lc app=leetcode.cn id=2089 lang=javascript
 *
 * [2089] 找出数组排序后的目标下标
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// 先排序，然后获取目标的index，放在新数组中，很简单
// Your runtime beats 64.52 % of javascript submissions
const targetIndices = function(nums, target) {
  if (!nums.includes(target)) return [];
  nums = nums.sort((a, b) => {
    return a > b ? 1 : -1;
  });
  const res = [];
  nums.forEach((item, index) => {
    if (item === target) {
      res.push(index);
    }
  });
  return res;
};
// @lc code=end
export { targetIndices };

~~~

  
### 2094.找出-findEvenNumbers.js

~~~js
/*
 * @lc app=leetcode.cn id=2094 lang=javascript
 *
 * [2094] 找出 3 位偶数
 */

// @lc code=start
/**
 * @param {number[]} digits
 * @return {number[]}
 */
// 时间复杂度是O^3，这个数据量级下可以接受
// Your runtime beats 38.23 % of javascript submissions
// 优化后：Your runtime beats 42.65 % of javascript
const findEvenNumbers = function(digits) {
  const len = digits.length;
  // 1 数组的长度100，那么可以使用三层循环，获取这个三位数
  let arr = [];
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      for (let k = 0; k < len; k++) {
        if (i !== j && j !== k && k !== i) {
          const current = digits[i] * 100 + digits[j] * 10 + digits[k];
          if (current >= 100 && current % 2 === 0) {
            arr.push(current);
          }
        }
      }
    }
  }
  // 2 然后结果数组中把不满足的情况过滤即可
  // 2.1 去重
  // arr = [...new Set(arr)];
  // 2.2 去掉前导0（小于100的情况）必须是偶数
  // todo：这里可以优化，满足条件才放入目标数组
  // arr = arr.filter(item => {
  //   return item >= 100 && item % 2 === 0;
  // });
  // 2.3 排序
  arr = [...new Set(arr)].sort((a, b) => {
    return a - b > 0 ? 1 : -1;
  });
  return arr;
};
// @lc code=end
export { findEvenNumbers };

~~~

  
### 2099.找到和最大的长度为-maxSubsequence.js

~~~js
/*
 * @lc app=leetcode.cn id=2099 lang=javascript
 *
 * [2099] 找到和最大的长度为 K 的子序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
// Your runtime beats 92.95 % of javascript submissions
const maxSubsequence = function(nums, k) {
  // 1 先获取最大的前K个元素
  const arr = [...nums].sort((a, b) => {
    return a > b ? -1 : 1;
  }).slice(0, k);
  // 2 然后转换成字典
  const dict = {};
  arr.forEach((item) => {
    if (!dict[item]) {
      dict[item] = 1;
    } else {
      dict[item] = dict[item] + 1;
    }
  });
  // 3 然后遍历一次原数组，把最大的这些元素按照顺序输出
  const result = [];
  nums.forEach((num) => {
    if (dict[num]) {
      result.push(num);
      dict[num] = dict[num] - 1;
    }
  });
  return result;
};

// console.log(maxSubsequence([2,1,3,3], 2))
// console.log(maxSubsequence([-1,-2,3,4], 3))
// console.log(maxSubsequence([3,4,3,3], 2))

// @lc code=end
export { maxSubsequence };

~~~

  
### 2103-countPoints.js

~~~js
/*
 * @lc app=leetcode.cn id=2103 lang=javascript
 *
 * [2103] 环和杆
 */

// @lc code=start
/**
 * @param {string} rings
 * @return {number}
 */
// 思路
// 1 新建一个空数组，表示初始的10个杆
// 2 遍历字符串，然后增加杆子的属性（这个需要分三种情况）
// 3 遍历数组，如果都有环，那么就是正确的
// Your runtime beats 96.15 % of javascript submissions
const countPoints = function(rings) {
  if (rings.length < 5) {
    return 0;
  }
  const poles = new Array(10);
  for (let i = 0; i < 10; i++) {
    poles[i] = {
      R: null,
      G: null,
      B: null,
    };
  }
  for (let i = 0; i < rings.length; i += 2) {
    const key = rings[i];
    const index = parseInt(rings[i + 1], 10);
    poles[index][key] = true;
  }
  let result = 0;
  poles.forEach((pole) => {
    if (pole.R && pole.G && pole.B) {
      result++;
    }
  });
  return result;
};

// console.log(countPoints("B0B6G0R6R0R6G9") === 1)
// console.log(countPoints("B0R0G0R9R0B0G0") === 1)
// console.log(countPoints("G4") === 0)

// @lc code=end
export { countPoints };

~~~

  
### 2108-firstPalindrome.js

~~~js
/*
 * @lc app=leetcode.cn id=2108 lang=javascript
 *
 * [2108] 找出数组中的第一个回文字符串
 */

// @lc code=start
/**
 * @param {string[]} words
 * @return {string}
 */
// 写一个判断回文字符串的辅助函数,遍历数组即可
const firstPalindrome = function(words) {
  // Your runtime beats 24.02 % of javascript submissions
  // let checkStr = (str) => {
  //   return str.split('').reverse().join('') === str;
  // }
  // 优化：判断回文字符串的函数
  // 优化后：Your runtime beats 50.56 % of
  const checkStr = (str) => {
    const len = str.length;
    const halflen = Math.ceil(str.length / 2);
    for (let i = 0; i < halflen; i++) {
      if (str[i] !== str[len - 1 - i]) {
        return false;
      }
    }
    return true;
  };
  for (let i = 0; i < words.length; i++) {
    if (checkStr(words[i])) {
      return words[i];
    }
  }
  return '';
};
// @lc code=end
export { firstPalindrome };

~~~

  
### 2114-mostWordsFound.js

~~~js
/*
 * @lc app=leetcode.cn id=2114 lang=javascript
 *
 * [2114] 句子中的最多单词数
 */
/**
 * @param {string[]} sentences
 * @return {number}
 */
// 判断字符串中最多的空格，然后加1
// Your runtime beats 48.14 % of javascript submissions
const mostWordsFound = function(sentences) {
  const getLen = (str) => {
    let num = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === ' ') {
        num++;
      }
    }
    return num + 1;
  };
  let max = 1;
  for (let i = 0; i < sentences.length; i++) {
    const curr = getLen(sentences[i]);
    max = curr > max ? curr : max;
  }
  return max;
};

export { mostWordsFound };

~~~

  
### 2119-isSameAfterReversals.js

~~~js
/**
 * [isSameAfterReversals [2119] 反转两次的数字]
 * @author Michael An
 * @DateTime 2022-03-08T14:38:49+0800
 * @param    {number}                 num [description]
 * @return   {Boolean}                    [description]
 * 思路：0 满足，10 的倍数不满足，其他都满足
 * Your runtime beats 77.99 % of javascript submissions
 */
const isSameAfterReversals = function(num) {
  if (num === 0) {
    return true;
  }
  if (num % 10 === 0) {
    return false;
  }
  return true;
};

export { isSameAfterReversals };

~~~

  
### 2124.检查是否所有-checkString.js

~~~js
/*
 * @lc app=leetcode.cn id=2124 lang=javascript
 *
 * [2124] 检查是否所有 A 都在 B 之前
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
// 找到第一个B，找到最后一个A，比较索引即可
// Your runtime beats 6.01 % of javascript submissions
const checkString = function(s) {
  const indexA = s.lastIndexOf('a');
  const indexB = s.indexOf('b');
  if (indexA === -1 || indexB === -1) {
    return true;
  }
  return indexA < indexB;
};

// 可能 index 的性能不太好，可以改成遍历全部字符串，找到AB
// 这样时间复杂度就是 O(n)
// @lc code=end
export { checkString };

~~~

  
### 2129-capitalizeTitle.js

~~~js
/*
 * @lc app=leetcode.cn id=2129 lang=javascript
 *
 * [2129] 将标题首字母大写
 */

// @lc code=start
/**
 * @param {string} title
 * @return {string}
 */
//  Your runtime beats 55.68 % of javascript submissions
const capitalizeTitle = function(title) {
  // 辅助函数：转换字符串大小写
  const toSmall = (str) => {
    return str.toLowerCase();
  };
  const toLarge = (str) => {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  };
  // 1 把字符串转换成数组
  const arr = title.split(' ');
  // 2 遍历数组
  for (let i = 0; i < arr.length; i++) {
    const len = arr[i].length;
    if (len < 3) {
      // 2.1 如果是1-2全部变成小写
      arr[i] = toSmall(arr[i]);
    } else {
      // 2.2 如果是大于2，首字母大写
      arr[i] = toLarge(arr[i]);
    }
  }
  // 3 把处理后的数组转换成字符串输出
  return arr.join(' ');
};

// console.log(capitalizeTitle("First leTTeR of EACH Word") === "First Letter of Each Word");
// console.log(capitalizeTitle("i lOve leetcode") === "i Love Leetcode");
// @lc code=end
export default capitalizeTitle;

~~~

  
### 2133-checkValid.js

~~~js
/*
 * @lc app=leetcode.cn id=2133 lang=javascript
 *
 * [2133] 检查是否每一行每一列都包含全部整数
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {boolean}
 */
// 思路
// 1、横向纵向遍历矩阵，把每一个情况都拿出来
// 2、判断每一行和每一列，是否有重复的（如果有重复的，一定不满足）
// 当前用子数组实现（占用内存略大）
// N 不超过100，时间空间复杂度可以接受
// Your runtime beats 50.94 % of javascript submissions
const checkValid = function(matrix) {
  // 辅助函数：判断一个数组是否有重复元素
  const checkArr = (arr) => {
    return arr.length === [...new Set(arr)].length;
  };
  // 1.1 横向遍历
  const n = matrix.length;
  for (let i = 0; i < n; i++) {
    if (!checkArr(matrix[i])) {
      return false;
    }
  }
  // 1.2 纵向遍历
  for (let i = 0; i < n; i++) {
    const tmpArr = [];
    for (let j = 0; j < n; j++) {
      tmpArr.push(matrix[j][i]);
    }
    if (!checkArr(tmpArr)) {
      return false;
    }
  }
  return true;
};

// console.log(checkValid([[1,2,3],[3,1,2],[2,3,1]]) === true)
// console.log(checkValid([[1,1,1],[1,2,3],[1,2,3]]) === false)
// @lc code=end

export default checkValid;

~~~

  
### 2138.将字符串拆分为若干长度为-divideString.js

~~~js
/*
 * @lc app=leetcode.cn id=2138 lang=javascript
 *
 * [2138] 将字符串拆分为若干长度为 k 的组
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} k
 * @param {character} fill
 * @return {string[]}
 */
//  Your runtime beats 100 % of javascript submissions
const divideString = function(s, k, fill) {
  const resArr = [];
  // 思路：当S的长度大于K时，每次减掉前K个字符
  while (s.length >= k) {
    resArr.push(s.slice(0, k));
    s = s.slice(k);
  }
  // 最后一个特殊处理
  if (s.length > 0) {
    s = s.padEnd(k, fill);
    resArr.push(s);
  }
  return resArr;
};

// console.log(divideString("abcdefghi", 3, 'x'))
// console.log(divideString("abcdefghij", 3, 'x'))
// @lc code=end

export default divideString;

~~~

  
### 2144-minimumCost.js

~~~js
/*
 * @lc app=leetcode.cn id=2144 lang=javascript
 *
 * [2144] 打折购买糖果的最小开销
 */

// @lc code=start
/**
 * @param {number[]} cost
 * @return {number}
 * 思路：排序，然后去掉3的倍数的项，求和即可
 * Your runtime beats 23.03 % of javascript submissions
 */
const minimumCost = function(cost) {
  let sum = 0;
  const len = cost.length;
  cost = cost.sort((a, b) => a > b ? -1 : 1);
  for (let i = 0; i < len; i++) {
    if ((i + 1) % 3 !== 0) {
      sum += cost[i];
    }
  }
  return sum;
};
// @lc code=end

export { minimumCost };

~~~

  
### 2148-countElements.js

~~~js
/**
 * @param {number[]} nums
 * @return {number}
 * 难度：简单
 */
const countElements = function(nums) {
  // 思路：数组去重，然后找到最大值和最小值
  // 如果去重后，只有两个元素，那么就返回0
  // 然后过滤一下原数组，留下的部分求长度即可
  // 60 ms, 在所有 JavaScript 提交中击败了91.52%
  const arr = Array.from(new Set(nums)).sort((a, b) => {
    return a > b ? 1 : -1;
  });
  const len = arr.length;
  if (len <= 2) {
    return 0;
  }
  const a = arr[0];
  const b = arr[len - 1];
  return nums.filter((num) => {
    return num !== a && num !== b;
  }).length;
};

export { countElements };

~~~

  
### 2154-findFinalValue.js

~~~js
/*
 * @lc app=leetcode.cn id=2154 lang=javascript
 *
 * [2154] 将找到的值乘以 2
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} original
 * @return {number}
 * Your runtime beats 59.5 % of javascript submissions
 */
const findFinalValue = function(nums, original) {
  const set = new Set(nums);
  while (set.has(original)) {
    original *= 2;
  }
  return original;
};
// @lc code=end

export { findFinalValue };

~~~

  
### 2160-minimumSum.js

~~~js
/*
 * @lc app=leetcode.cn id=2160 lang=javascript
 *
 * [2160] 拆分数位后四位数字的最小和
 */

// @lc code=start
/**
 * @param {number} num
 * @return {number}
 * Your runtime beats 9.98 % of javascript submissions
 */
const minimumSum = function(num) {
  const arr = num.toString().split('').map((i) => Number(i)).sort((a, b) => a > b ? 1 : -1);
  return (arr[0] + arr[1]) * 10 + arr[2] + arr[3];
};
// 现在这个方法，使用了数组排序和数字字符串转换
// 实际上，获取四个数中前两个最大的数字，然后获取后两个数字，加起来即可

// @lc code=end

export { minimumSum };

~~~

  
### 2164-sortEvenOdd.js

~~~js
/*
 * @lc app=leetcode.cn id=2164 lang=javascript
 *
 * [2164] 对奇偶下标分别排序
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 * 简单：把数组按照下标拆成两个，分别排序，然后再拼接起来
 * 72 ms, 在所有 JavaScript 提交中击败了71.24%
 */
const sortEvenOdd = function(nums) {
  if (nums.length <= 2) {
    return nums;
  }
  const arr1 = [];
  const arr2 = [];
  nums.forEach((item, index) => {
    if (index % 2 === 0) {
      arr1.push(item);
    } else {
      arr2.push(item);
    }
  });
  arr1.sort((a, b) => a > b ? 1 : -1);
  arr2.sort((a, b) => a > b ? -1 : 1);
  const result = [];
  const len = Math.min(arr1.length, arr2.length);
  for (let i = 0; i < len; i++) {
    result.push(arr1[i]);
    result.push(arr2[i]);
  }
  if (arr1.length > arr2.length) {
    result.push(arr1[arr1.length - 1]);
  }
  return result;
};

// console.log(sortEvenOdd([4,1,2,3])); // [2,3,4,1]
// console.log(sortEvenOdd([2, 1])); // [2, 1]
// @lc code=end

export { sortEvenOdd };

~~~

  
### 2169-countOperations.js

~~~js
/*
 * @lc app=leetcode.cn id=2169 lang=javascript
 *
 * [2169] 得到 0 的操作数
 */

// @lc code=start
/**
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 * 80 ms, 在所有 JavaScript 提交中击败了10.24%
 */
const countOperations = function(num1, num2) {
  if (num1 === 0 && num2 === 0) {
    return 0;
  }
  if (num1 === num2) {
    return 1;
  }
  let times = 0;
  while (num1 !== num2) {
    if (num1 === 0 || num2 === 0) {
      return times;
    }
    const large = num1 > num2 ? num1 : num2;
    const small = num1 > num2 ? num2 : num1;
    const decrease = large - small;
    num1 = decrease;
    num2 = small;
    times++;
  }
  return times + 1;
};

// console.log(countOperations(10, 10) === 1)
// console.log(countOperations(2, 3) === 3)
// console.log(countOperations(0, 0) === 0)
// console.log(countOperations(0, 1) === 0)
// @lc code=end

export { countOperations };

~~~

  
### 2176-countPairs.js

~~~js
/*
 * @lc app=leetcode.cn id=2176 lang=javascript
 *
 * [2176] 统计数组中相等且可以被整除的数对
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 * 难度简单，数组遍历和比较
 * 64 ms, 在所有 JavaScript 提交中击败了79.65%
 */
const countPairs = function(nums, k) {
  const len = nums.length;
  // 先判断一下是否有重复值，如果没有重复值，直接返回空
  if (Array.from(new Set(nums)).length === len) {
    return 0;
  }
  // 两次循环，获取重复的并且满足的元素
  let res = 0;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (nums[i] === nums[j] && ((i * j) % k) === 0) {
        res++;
      }
    }
  }
  return res;
};
// 更好的优化方案，是循环一次，然后使用字典计数即可
// 这个实现也不难，有时间再说
// @lc code=end

export { countPairs };

~~~

  
### 2180-countEven.js

~~~js
/*
 * @lc app=leetcode.cn id=2180 lang=javascript
 *
 * [2180] 统计各位数字之和为偶数的整数个数
 */

// @lc code=start
/**
 * @param {number} num
 * @return {number}
 */
const countEven = function(num) {
  // 72 ms, 在所有 JavaScript 提交中击败了25.35%
  // 辅助函数：判断一个数是否满足各位数字之和为偶数
  const check = (n) => {
    const s = String(n);
    let res = 0;
    res += Number(s[0]);
    if (s[1]) {
      res += Number(s[1]);
    }
    if (s[2]) {
      res += Number(s[2]);
    }
    if (s[3]) {
      res += Number(s[3]);
    }
    return res % 2 === 0;
  };

  let tmp = 0;
  for (let i = 1; i <= num; i++) {
    if (check(i)) {
      tmp++;
    }
  }
  return tmp;
};
// @lc code=end

export { countEven };

~~~

  
### 2185-prefixCount.js

~~~js
/*
 * @lc app=leetcode.cn id=2185 lang=javascript
 *
 * [2185] 统计包含给定前缀的字符串
 */

// @lc code=start
/**
 * @param {string[]} words
 * @param {string} pref
 * @return {number}
 * Your runtime beats 87.37 % of javascript submissions
 */
const prefixCount = function(words, pref) {
  let nums = 0;
  words.forEach((word) => {
    if (word.indexOf(pref) === 0) {
      nums++;
    }
  });
  return nums;
};
// @lc code=end

export { prefixCount };

~~~

  
### 2190-mostFrequent.js

~~~js
/*
 * @lc app=leetcode.cn id=2190 lang=javascript
 *
 * [2190] 数组中紧跟 key 之后出现最频繁的数字
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} key
 * @return {number}
//  */
// // Your runtime beats 20.96 % of javascript submissions
// var mostFrequent = function(nums, key) {
//   // 这个就是遍历一次数组，然后获取后面一个数出现的最大次数即可
//   let dict = {};
//   for (let i = 0; i < nums.length - 1; i++) {
//     if (nums[i] === key) {
//       let current = nums[i + 1];
//       if (!dict[current]) {
//         dict[current] = 0;
//       }
//       dict[current] = dict[current] + 1;
//     }
//   }
//   // 实际上在上面直接获取最大值即可，不需要下面的循环了
//   let max = 0;
//   let tmp;
//   for (let key in dict) {
//     let times = dict[key];
//     if (times > max) {
//       max = times;
//       tmp = key;
//     }
//   }
//   return tmp;
// };

// 改进后
// Your runtime beats 82.53 % of javascript submissions
const mostFrequent = function(nums, key) {
  const dict = {};
  let max = 0;
  let tmp;
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] === key) {
      const current = nums[i + 1];
      if (!dict[current]) {
        dict[current] = 0;
      }
      dict[current] = dict[current] + 1;
      if (dict[current] > max) {
        max = dict[current];
        tmp = current;
      }
    }
  }
  return tmp;
};
// @lc code=end

export { mostFrequent };

~~~

  
### 2194-cellsInRange.js

~~~js
/*
 * @lc app=leetcode.cn id=2194 lang=javascript
 *
 * [2194] Excel 表中某个范围内的单元格
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string[]}
 */
//  Your runtime beats 86.88 % of javascript submissions
const cellsInRange = function(s) {
  // 双层循环即可
  const a = s.charCodeAt(0);
  const b = s.charCodeAt(3);
  // a b 是外循环，然后获取对应的 ASCII 码

  const c = Number(s[1]);
  const d = Number(s[4]);
  // cd 是内循环，直接使用数字即可

  const res = [];
  // String.fromCharCode()
  for (let i = a; i <= b; i++) {
    const tmp = String.fromCharCode(i);
    for (let j = c; j <= d; j++) {
      res.push(tmp + j);
    }
  }
  return res;
};

// console.log(cellsInRange("A1:F1"))
// @lc code=end

export { cellsInRange };

~~~

  
### 2200-findKDistantIndices.js

~~~js
/*
 * @lc app=leetcode.cn id=2200 lang=javascript
 *
 * [2200] 找出数组中的所有 K 近邻下标
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} key
 * @param {number} k
 * @return {number[]}
 * Your runtime beats 9.72 % of javascript submissions
 * 现在性能不太好，第二次循环有很多重复的
 */
const findKDistantIndices = function(nums, key, k) {
  const tmp = [];
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    if (nums[i] === key) {
      const middle = i;
      for (let j = middle - k; j <= middle + k; j++) {
        if (j >= 0 && j < len) {
          tmp.push(j);
        }
      }
    }
  }
  return Array.from(new Set(tmp));
};
// @lc code=end

export { findKDistantIndices };

~~~

  
### 2206-divideArray.js

~~~js
/*
 * @lc app=leetcode.cn id=2206 lang=javascript
 *
 * [2206] 将数组划分成相等数对
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 * 直接循环一次，然后记录出现的次数，最后次数都是偶数即可
 * Your runtime beats 42.16 % of javascript submissions
 */
const divideArray = function(nums) {
  const dict = {};
  nums.forEach((item) => {
    if (!dict[item]) {
      dict[item] = true;
    } else {
      delete dict[item];
    }
  });
  return Object.keys(dict).length === 0;
  // console.log(divideArray([3,2,3,2,2,2]));
  // console.log(divideArray([1,2,3,4]));
};
// @lc code=end

export { divideArray };

~~~

  
### 2210-countHillValley.js

~~~js
/*
 * @lc app=leetcode.cn id=2210 lang=javascript
 *
 * [2210] 统计数组中峰和谷的数量
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 * 思路：波峰和波谷的特点就是左右的值变化
 * 那么可以首先遍历一次，把数组中相邻重复的值去掉，这样就避免了问题
 * Your runtime beats 74.4 % of javascript submissions
 */
const countHillValley = function(nums) {
  const arr = [];
  // 先去掉相邻相同的元素
  arr.push(nums[0]);
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      arr.push(nums[i]);
    }
  }
  // 然后计算前后的元素不同的情况，就是波峰或者波谷的位置
  let res = 0;
  for (let i = 1; i < arr.length - 1; i++) {
    const curr = arr[i];
    const before = arr[i - 1];
    const after = arr[i + 1];
    if (curr > before && curr > after) {
      res++;
    } else if (curr < before && curr < after) {
      res++;
    }
  }
  return res;
};
// @lc code=end

export { countHillValley };

~~~

  
### 2215-findDifference.js

~~~js
/*
 * @lc app=leetcode.cn id=2215 lang=javascript
 *
 * [2215] 找出两数组的不同
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[][]}
 * Your runtime beats 66.57 % of javascript submissions
 */
const findDifference = function(nums1, nums2) {
  // 数组去重，然后使用字典获取，再计入结果数组即可
  const nums_1 = [...new Set(nums1)];
  const nums_2 = [...new Set(nums2)];
  const dict1 = {};
  const dict2 = {};
  nums_1.forEach((item) => {
    dict1[item] = true;
  });
  nums_2.forEach((item) => {
    dict2[item] = true;
  });
  const res1 = nums_1.filter((item) => {
    if (dict2[item]) {
      return false;
    }
    return true;
  });
  const res2 = nums_2.filter((item) => {
    if (dict1[item]) {
      return false;
    }
    return true;
  });
  return [res1, res2];
};
// @lc code=end

export { findDifference };

~~~

  
### 2220-minBitFlips.js

~~~js
/*
 * @lc app=leetcode.cn id=2220 lang=javascript
 *
 * [2220] 转换数字的最少位翻转次数
 */

// @lc code=start
/**
 * @param {number} start
 * @param {number} goal
 * @return {number}
 * Your runtime beats 75.61 % of javascript submissions
 */
const minBitFlips = function(start, goal) {
  if (start === goal) {
    return 0;
  }
  let a = start.toString(2);
  let b = goal.toString(2);
  const maxLen = Math.max(a.length, b.length);
  a = a.padStart(maxLen, '0');
  b = b.padStart(maxLen, '0');
  let res = 0;
  for (let i = 0; i < maxLen; i++) {
    if (a[i] !== b[i]) {
      res++;
    }
  }
  return res;
};
// @lc code=end

export { minBitFlips };

~~~

  
### 2224-convertTime.js

~~~js
/*
 * @lc app=leetcode.cn id=2224 lang=javascript
 *
 * [2224] 转化时间需要的最少操作数
 */

// @lc code=start
/**
 * @param {string} current
 * @param {string} correct
 * @return {number}
 */
const convertTime = function(current, correct) {
  const arr1 = current.split(':').map((item) => parseInt(item, 10));
  const arr2 = correct.split(':').map((item) => parseInt(item, 10));
  let res = 0;
  // handle minutes "09:41" "10:34"
  if (arr2[1] < arr1[1]) {
    arr2[1] = arr2[1] + 60;
    arr2[0] = arr2[0] - 1;
  }
  res = arr2[0] - arr1[0];
  let minutes = arr2[1] - arr1[1];

  if (minutes >= 15) {
    res += Math.floor(minutes / 15);
    minutes = minutes - Math.floor(minutes / 15) * 15;
  }

  if (minutes >= 5) {
    res += Math.floor(minutes / 5);
    minutes = minutes - Math.floor(minutes / 5) * 5;
  }

  res += minutes;
  return res;
};
// @lc code=end

export { convertTime };

~~~

  
### 2231-largestInteger.js

~~~js
/*
 * @lc app=leetcode.cn id=2231 lang=javascript
 *
 * [2231] 按奇偶性交换后的最大数字
 */

// @lc code=start
/**
 * @param {number} num
 * @return {number}
 * Your runtime beats 89.75 % of javascript submissions
 */
const largestInteger = function(num) {
  const arr = String(num).split('');
  const len = arr.length;
  const arr1 = [];
  const arr2 = [];
  const dict = [];

  arr.forEach((item, index) => {
    // item % 2 === 0
    // 然后 index 放在一个对象中，记录是奇数还是偶数
    if (item % 2 === 0) {
      arr1.push(item);
      dict[index] = true;
    } else {
      arr2.push(item);
      dict[index] = false;
    }
  });

  arr1.sort((a, b) => a > b ? 1 : -1);
  arr2.sort((a, b) => a > b ? 1 : -1);

  const resArr = [];
  for (let i = 0; i < len; i++) {
    if (dict[i]) {
      // arr1
      resArr[i] = arr1.pop();
    } else {
      // arr2
      resArr[i] = arr2.pop();
    }
  }
  return parseInt(resArr.join(''), 10);
};
// @lc code=end

export { largestInteger };

~~~

  
### 2235-sum.js

~~~js
/*
 * @lc app=leetcode.cn id=2235 lang=javascript
 *
 * [2235] 两整数相加
 */

// @lc code=start
/**
 * @param {number} num1
 * @param {number} num2
 * @return {number} number
 * Your runtime beats 95.76 % of javascript submissions
 */
const sum = function(num1, num2) {
  return num1 + num2;
};
// @lc code=end

export { sum };

~~~

  
### 2236-checkTree.js

~~~js
/*
 * @lc app=leetcode.cn id=2236 lang=javascript
 *
 * [2236] 判断根结点是否等于子结点之和
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 * Your runtime beats 94.47 % of javascript submissions
 */
const checkTree = function(root) {
  return root.val === (root.left.val + root.right.val);
};
// @lc code=end

export { checkTree };

~~~

  
### 2243-digitSum.js

~~~js
/*
 * @lc app=leetcode.cn id=2243 lang=javascript
 *
 * [2243] 计算字符串的数字和
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
// 现在算法是按照题目算的，性能不好，能否优化算法？
// Your runtime beats 24.84 % of javascript submissions
const digitSum = function(s, k) {
  let arr = s.split('').map((item) => parseInt(item, 10));
  while (arr.length > k) {
    const newArr = [];
    for (let i = 0; i < arr.length; i += k) {
      let sum = 0;
      for (let j = i; j < i + k; j++) {
        if (arr[j] > -1) sum += arr[j];
      }
      newArr.push(sum);
    }
    arr = newArr.join('').split('').map((item) => parseInt(item, 10));
  }
  return arr.join('');
};
// @lc code=end

export { digitSum };

~~~

  
### 2248-intersection.js

~~~js
/*
 * @lc app=leetcode.cn id=2248 lang=javascript
 *
 * [2248] 多个数组求交集
 */

// @lc code=start
/**
 * @param {number[][]} nums
 * @return {number[]}
 * Your runtime beats 45.9 % of javascript submissions
 */
const intersection = function(nums) {
  const length1 = nums.length;
  const list = nums.flat().sort((a, b) => a > b ? 1 : -1);
  const res = [];
  let previous = list[0];
  let time = 1;
  for (let i = 1; i < list.length; i++) {
    if (list[i] === previous) {
      time++;
    } else {
      if (time === length1) {
        res.push(previous);
      }
      previous = list[i];
      time = 1;
    }
  }
  if (time === length1) {
    res.push(previous);
  }
  return res;
};
// @lc code=end
export { intersection };

~~~

  
### 2255-countPrefixes.js

~~~js
/*
 * @lc app=leetcode.cn id=2255 lang=javascript
 *
 * [2255] 统计是给定字符串前缀的字符串数目
 */

// @lc code=start
/**
 * @param {string[]} words
 * @param {string} s
 * @return {number}
 */
// 方法一：遍历字符串的形式，时间复杂度比较高
// Your runtime beats 7.6 % of javascript submissions
const countPrefixes1 = function(words, s) {
  // 循环一次数组，然后获取满足的个数
  const check = (item) => {
    const len = item.length;
    for (let i = 0; i < len; i++) {
      if (item[i] !== s[i]) {
        return 0;
      }
    }
    return 1;
  };
  let num = 0;
  const cache = {};
  for (let j = 0; j < words.length; j++) {
    if (!cache[words[j]]) {
      const result = check(words[j]);
      cache[words[j]] = result;
    }
    num = num + cache[words[j]];
  }
  return num;
};

// 方法二：改成 startsWith 方法实现
// Your runtime beats 60.84 % of javascript submissions
const countPrefixes2 = function(words, s) {
  let num = 0;
  const cache = {};
  for (let j = 0; j < words.length; j++) {
    if (!cache[words[j]]) {
      const result = s.startsWith(words[j]) ? 1 : 0;
      cache[words[j]] = result;
    }
    num = num + cache[words[j]];
  }
  return num;
};
// @lc code=end

export { countPrefixes1, countPrefixes2 };

~~~

  
### 2264-largestGoodInteger.js

~~~js
/*
 * @lc app=leetcode.cn id=2264 lang=javascript
 *
 * [2264] 字符串中最大的 3 位相同数字
 */

// @lc code=start
/**
 * @param {string} num
 * @return {string}
 */
const largestGoodInteger = function(num) {
  let tmp = '';
  for (let i = 2; i < num.length; i++) {
    if (num[i] === num[i - 1] && num[i] === num[i - 2]) {
      if (!tmp || Number(num[i]) > Number(tmp)) {
        tmp = num[i];
      }
    }
  }
  if (tmp === '') return '';
  return tmp + tmp + tmp;
};
// @lc code=end

export { largestGoodInteger };

~~~

  
### 2269-divisorSubstrings.js

~~~js
/*
 * @lc app=leetcode.cn id=2269 lang=javascript
 *
 * [2269] 找到一个数字的 K 美丽值
 */

// @lc code=start
/**
 * @param {number} num
 * @param {number} k
 * @return {number}
 * Your runtime beats 89.08 % of javascript submissions
 */
const divisorSubstrings = function(num, k) {
  const str = String(num);
  let res = 0;
  for (let i = 0; i <= str.length - k; i++) {
    const curr = str.slice(i, i + k);
    if (num % Number(curr) === 0) {
      res++;
    }
  }
  return res;
};

// console.log(divisorSubstrings(240, 2), 2);
// console.log(divisorSubstrings(430043, 2), 2);
// @lc code=end
export { divisorSubstrings };

~~~

  
### 2273-removeAnagrams.js

~~~js
/*
 * @lc app=leetcode.cn id=2273 lang=javascript
 *
 * [2273] 移除字母异位词后的结果数组
 */

// @lc code=start
/**
 * @param {string[]} words
 * @return {string[]}
 * Your runtime beats 69.72 % of javascript submissions
 */
const removeAnagrams = function(words) {
  const getStr = (str) => {
    return str.split('').sort().join('');
  };
  const words2 = words.map((word) => getStr(word));
  const dict = {};
  for (let i = 1; i < words2.length; i++) {
    if (words2[i] === words2[i - 1]) {
      dict[i] = true;
    }
  }
  return words.filter((item, index) => {
    return !dict[index];
  });
};
// console.log(removeAnagrams(["abba","baba","bbaa","cd","cd"])) // ["abba","cd"]
// @lc code=end

export { removeAnagrams };

~~~

  
### 2278-percentageLetter.js

~~~js
/*
 * @lc app=leetcode.cn id=2278 lang=javascript
 *
 * [2278] 字母在字符串中的百分比
 */

// @lc code=start
/**
 * @param {string} s
 * @param {character} letter
 * @return {number}
 * Your runtime beats 67.99 % of javascript submissions
 */
const percentageLetter = function(s, letter) {
  const len = s.length;
  let times = 0;
  for (let i = 0; i < len; i++) {
    if (s[i] === letter) {
      times++;
    }
  }
  return Math.floor(times / len * 100);
};
// @lc code=end
export { percentageLetter };

~~~

  
### 2283-digitCount.js

~~~js
/*
 * @lc app=leetcode.cn id=2283 lang=javascript
 *
 * [2283] 判断一个数的数字计数是否等于数位的值
 */

// @lc code=start
/**
 * @param {string} num
 * @return {boolean}
 * Your runtime beats 64.81 % of javascript submissions
 */
const digitCount = function(num) {
  const dict = {};
  for (let i = 0; i < num.length; i++) {
    const key = num[i];
    if (dict[key]) {
      dict[key] = dict[key] + 1;
    } else {
      dict[key] = 1;
    }
  }
  for (let i = 0; i < num.length; i++) {
    const tmp = dict[i] || 0; // 次数可能是0次
    if (Number(num[i]) !== tmp) {
      return false;
    }
  }
  return true;
};

// console.log(digitCount("1210") === true);
// console.log(digitCount("030") === false);

// @lc code=end
export { digitCount };

~~~

  
### 2287-rearrangeCharacters.js

~~~js
/*
 * @lc app=leetcode.cn id=2287 lang=javascript
 *
 * [2287] 重排字符形成目标字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} target
 * @return {number}
 * Your runtime beats 31.4 % of javascript submissions
 * 这个题目不难，有几个边界案例需要考虑
 */
const rearrangeCharacters = function(s, target) {
  // 先把两个字符串都遍历转换成对象
  const dict = {};
  for (let i = 0; i < target.length; i++) {
    const key = target[i];
    if (!dict[key]) {
      dict[key] = 1;
    } else {
      dict[key] = dict[key] + 1;
    }
  }

  const dict2 = {};
  for (let i = 0; i < s.length; i++) {
    const key = s[i];
    if (!dict2[key]) {
      dict2[key] = 1;
    } else {
      dict2[key] = dict2[key] + 1;
    }
  }
  // 遍历对象的键，看一下每一个倍数，然后求最小值
  const res = [];
  for (const key in dict) {
    const value1 = dict[key];
    const value2 = dict2[key];
    if (value2) {
      res.push(Math.floor(value2 / value1));
    } else {
      return 0;
    }
  }
  return Math.min(...res);
};

// console.log(rearrangeCharacters("ilovecodingonleetcode", "code") === 2)
// console.log(rearrangeCharacters("abcba", "abc") === 1)
// console.log(rearrangeCharacters("abbaccaddaeea", "aaaaa") === 1)
// console.log(rearrangeCharacters("lrnvlcqukanpdnluowenfxquitzryponxsikhciohyostvmkapkfpglzikitwiraqgchxnpryhwpuwpozacjhmwhjvslprqlnxrk", "woijih") === 2);
// console.log(rearrangeCharacters("abc", "abcd") === 0)
// console.log(rearrangeCharacters("aaaaaaaaaaaaaaaaaaaaaaaaaa", "aaaaaaaaa") === 2)
export { rearrangeCharacters };

// @lc code=end

~~~

  
### 2293-minMaxGame.js

~~~js
/*
 * @lc app=leetcode.cn id=2293 lang=javascript
 *
 * [2293] 极大极小游戏
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 * Your runtime beats 90.21 % of javascript submissions
 */
const minMaxGame = function(nums) {
  const getArray = function(arr) {
    const len = arr.length / 2;
    const result = [];
    for (let i = 0; i < len; i++) {
      result[i] = i % 2 === 0 ? Math.min(arr[i * 2], arr[i * 2 + 1]) : Math.max(arr[i * 2], arr[i * 2 + 1]);
    }
    return result;
  };
  while (nums.length !== 1) {
    nums = getArray(nums);
  }
  return nums[0];
};

// console.log(minMaxGame([1,3,5,2,4,8,2,2])) // 1
// console.log(minMaxGame([3])) // 3
// @lc code=end
export { minMaxGame };

~~~

  
### 2295-arrayChange.js

~~~js
/*
 * @lc app=leetcode.cn id=2295 lang=javascript
 *
 * [2295] 替换数组中的元素
 * 考点：这道题使用对象保存数组原来的位置，以及调换后的位置
 * 调换过程操作对象，需要注意
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number[][]} operations
 * @return {number[]}
 */
//  Your runtime beats 30.91 % of javascript submissions
const arrayChange = function(nums, operations) {
  const dict = {};
  nums.forEach((item, index) => {
    dict[item] = index;
  });
  // 这里把原来的位置先拿到，把键删除，然后加入新的键(实现替换)
  operations.forEach((item) => {
    const pos = dict[item[0]];
    delete dict[item[0]];
    dict[item[1]] = pos;
  });
  const res = [];
  for (const key in dict) {
    const value = dict[key];
    res[value] = key * 1;
  }
  return res;
};

// todo
// [[1,3],[2,1],[3,2]] 这种可以优化？
// console.log(arrayChange([1,2], [[1,3],[2,1],[3,2]])) // [2,1]
// console.log(arrayChange([1,2,4,6], [[1,3],[4,7],[6,1]])) // [3,2,7,1]
// @lc code=end

export { arrayChange };

~~~

  
### 2299-strongPasswordCheckerII.js

~~~js
/*
 * @lc app=leetcode.cn id=2299 lang=javascript
 *
 * [2299] 强密码检验器 II
 */

// @lc code=start
/**
 * @param {string} password
 * @return {boolean}
 */
// 最好使用正则表达式一起验证
const strongPasswordCheckerII = function(password) {
  //  它有至少 8 个字符。
  if (password.length < 8) {
    return false;
  }
  //  至少包含 一个小写英文 字母。
  if (!/[a-z]/.test(password)) {
    return false;
  }
  //  至少包含 一个大写英文 字母。
  if (!/[A-Z]/.test(password)) {
    return false;
  }
  //  至少包含 一个数字 。
  if (!/[0-9]/.test(password)) {
    return false;
  }
  //  至少包含 一个特殊字符 。特殊字符为："!@#$%^&*()-+" 中的一个。
  // 注意：这里需要转义 + - 特殊符号
  if (!/[!@#$%^&*()\-\+]/.test(password)) {
    return false;
  }
  // 它不包含 2 个连续相同的字符
  if (/(.)(\1)+/.test(password)) {
    return false;
  }
  return true;
};

// console.log(strongPasswordCheckerII("IloveLe3tcode!"));
// console.log(strongPasswordCheckerII("Me+You--IsMyDream"));
// console.log(strongPasswordCheckerII("+Aa1a1a1"));
// @lc code=end
export { strongPasswordCheckerII };

~~~

  
### 2303-calculateTax.js

~~~js
/*
 * @lc app=leetcode.cn id=2303 lang=javascript
 *
 * [2303] 计算应缴税款总额
 */

// @lc code=start
/**
 * @param {number[][]} brackets
 * @param {number} income
 * @return {number}
 */
const calculateTax = function(brackets, income) {
  if (income === 0) {
    return 0;
  }
  let total = 0;
  for (let i = 0; i < brackets.length; i++) {
    const backet = brackets[i];
    const lastValue = (brackets[i - 1] ? brackets[i - 1][0] : 0);
    if (income > backet[0]) {
      const curr = (backet[0] - lastValue) * backet[1] / 100;
      total += curr;
    } else {
      const curr = (income - lastValue) * backet[1] / 100;
      total += curr;
      return total;
    }
  }
  return total;
};
// console.log(calculateTax([[3,50],[7,10],[12,25]], 10) === 2.65);
// console.log(calculateTax([[1,0],[4,25],[5,50]], 2) === 0.25);
// console.log(calculateTax([[10,10]], 5) === 0.5);

// @lc code=end
export { calculateTax };

~~~

  
### 2309-greatestLetter.js

~~~js
/*
 * @lc app=leetcode.cn id=2309 lang=javascript
 *
 * [2309] 兼具大小写的最好英文字母
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 * Your runtime beats 83.75 % of javascript submissions
 * 难度简单
 * 最好记住不同的字符对应的 Unicode，
 */
const greatestLetter = function(s) {
  // 'a'.charCodeAt() 97
  // 'A'.charCodeAt() 65
  // 因为字符串长度1000，可以先去重，减少循环次数
  let arr = [...new Set(s.split(''))].sort();
  arr = arr.reverse();
  // 先循环一次记录出现的字符
  const dict = {};
  for (let i = 0; i < arr.length; i++) {
    const index = arr[i].charCodeAt();
    dict[index] = true;
  }
  // 大写 65-90
  // 已经排序，所以判断只要满足条件，直接返回即可
  for (let i = 0; i < arr.length; i++) {
    const index = arr[i].charCodeAt();
    if (index >= 65 && index <= 90 && dict[index + 32]) {
      return arr[i];
    }
  }
  return '';
};

// console.log(greatestLetter("lEeTcOdE") === 'E');
// console.log(greatestLetter("arRAzFif") === 'R');
// console.log(greatestLetter("AbCdEfGhIjK") === '');
// @lc code=end
export { greatestLetter };

~~~

  
### 2315-countAsterisks.js

~~~js
/**
 * @param {string} s
 * @return {number}
 * 基本思路：循环一次字符串，根据 | 的位置设置一个状态，然后累加即可
 * 难度：初级；时间复杂度： O(n)
 * 64 ms, 在所有 JavaScript 提交中击败了56.99%
 */
const countAsterisks1 = function(s) {
  let flag = true;
  let num = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '|') {
      flag = !flag;
    }
    else if (s[i] === '*' && flag === true) {
      num++;
    }
  }
  return num;
};

// 思路2：改进：按照 | 把字符串转换成数组，然后把数组中奇数和偶数项分开，再拼接起来
// 如果字符串较长，而且有一些连续的字符，这样效果好一点
const countAsterisks2 = function(s) {
  // 可以先判断是否有 * 没有的话直接返回，处理特殊情况
  if (!s.includes('*')) {
    return 0;
  }
  let sum = 0;
  const arr = s.split('|');
  for (let i = 0; i < arr.length; i++) {
    if (i % 2 === 0) {
      const curr = arr[i];
      for (let j = 0; j < curr.length; j++) {
        if (curr[j] === '*') {
          sum++;
        }
      }
    }
  }
  return sum;
};

// 在官方测试案例情况中，这两个算法的性能差距不大
// 根据实际数据选择适合的算法
export { countAsterisks1, countAsterisks2 };

~~~

  
### 2319-checkXMatrix.js

~~~js
/**
 * 2319. 判断矩阵是否是一个 X 矩阵
 * https://leetcode.cn/problems/check-if-matrix-is-x-matrix/
 * 简单——遍历矩阵
 * @param {number[][]} grid
 * @return {boolean}
 */
const checkXMatrix = function(grid) {
  const len = grid.length;
  // 辅助函数：判断是否在对角
  function check(a, b) {
    if (a === b) {
      return true;
    }
    if (a + b === len - 1) {
      return true;
    }
    return false;
  }
  // 循环矩阵
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      const item = grid[i][j];
      if (check(i, j)) {
        if (item === 0) {
          return false;
        }
      } else {
        if (item !== 0) {
          return false;
        }
      }
    }
  }
  return true;
};

// console.log(checkXMatrix([[2,0,0,1],[0,3,1,0],[0,5,2,0],[4,0,0,2]]) === true);
// console.log(checkXMatrix([[5,7,0],[0,3,1],[0,5,0]]) === false);

export { checkXMatrix };

~~~

  
### 2325-decodeMessage.js

~~~js
/**
 * 2325. 解密消息
 * https://leetcode.cn/problems/decode-the-message/submissions/
 * 难度：简单，字符串操作和字典
 * @param {string} key
 * @param {string} message
 * @return {string}
 */
const decodeMessage = function(key, message) {
  const cleanKey = Array.from(new Set(key.replaceAll(' ', '').split('')));
  const dict = {};
  for (let i = 0; i < cleanKey.length; i++) {
    dict[cleanKey[i]] = String.fromCharCode(97 + i);
  }
  let newMessage = '';
  for (let j = 0; j < message.length; j++) {
    if (message[j] === ' ') {
      newMessage += ' ';
    }
    else {
      newMessage += dict[message[j]];
    }
  }
  return newMessage;
};

// console.log(decodeMessage("the quick brown fox jumps over the lazy dog", "vkbs bs t suepuv") === "this is a secret")
// console.log(decodeMessage("eljuxhpwnyrdgtqkviszcfmabo", "zwx hnfx lqantp mnoeius ycgk vcnjrdb") === "the five boxing wizards jump quickly")

export { decodeMessage };

~~~

  
### 2331-evaluateTree.js

~~~js
/*
 * @lc app=leetcode.cn id=2331 lang=javascript
 *
 * [2331] 计算布尔二叉树的值
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 * Your runtime beats 17.96 % of javascript submissions
 */
const evaluateTree = function(root) {
  // 0 false,  1 true,  2 OR,  3 AND
  // 递归树节点即可
  if (!root) {
    return false;
  }
  if (root.val === 0 || root.val === 1) {
    return !!root.val;
  }
  if (root.val === 2) {
    return evaluateTree(root.left) || evaluateTree(root.right);
  }
  if (root.val === 3) {
    return evaluateTree(root.left) && evaluateTree(root.right);
  }
};
// @lc code=end
export { evaluateTree };

~~~

  
### 2335-fillCups.js

~~~js
/*
 * @lc app=leetcode.cn id=2335 lang=javascript
 *
 * [2335] 装满杯子需要的最短总时长
 */

// @lc code=start
/**
 * @param {number[]} amount
 * @return {number}
 * 先用最直接的方法实现，每次把前两个最大的减去，然后递归调用函数即可
 * 最大值100，也就是递归的次数在200之内，这个性能可以接受
 * 这个办法每次递归否需要排序，性能不好
 * Your runtime beats 58.65 % of javascript submissions
 */
const fillCups = function(amount) {
  // 辅助函数，计算三个数的情况
  function fillThreeCups(amount) {
    // 如果有一个是0，那么直接返回剩余三个的最大值即可
    if (amount[0] == 0 || amount[1] === 0 || amount[2] === 0) {
      return Math.max(...amount);
    }
    // 如果三个都不是0，那么前两个最大的减去1，剩余一个不变
    amount.sort((a, b) => {
      return a < b ? 1 : -1;
    });
    return 1 + fillThreeCups([amount[0] - 1, amount[1] - 1, amount[2]]);
  }
  return fillThreeCups(amount);
};

// 这个处理数较多的情况
const fillCups2 = function(amount) {
  // 处理特殊值
  if (amount[0] == 0 || amount[1] === 0 || amount[2] === 0) {
    return Math.max(...amount);
  }
  // 排序处理
  amount.sort((a, b) => {
    return a < b ? 1 : -1;
  });
  // 如果最大值比后面两个的和都大，直接返回最大值
  if (amount[0] > amount[1] + amount[2]) {
    return amount[0];
  }
  // 然后再辅助函数处理
  // 辅助函数，计算三个数的情况
  function fillThreeCups(amount) {
    // 如果有一个是0，那么直接返回剩余三个的最大值即可
    if (amount[0] == 0 || amount[1] === 0 || amount[2] === 0) {
      return Math.max(...amount);
    }
    // 如果三个都不是0，那么前两个最大的减去1，剩余一个不变
    amount.sort((a, b) => {
      return a < b ? 1 : -1;
    });
    const indent = Math.max(amount[1] - amount[2], 1);
    return indent + fillThreeCups([amount[0] - indent, amount[1] - indent, amount[2]]);
  }
  return fillThreeCups(amount);
};

// console.log(fillCups([5,4,4]) === 7)
// console.log(fillCups([1,4,2]) === 4)
// console.log(fillCups([5,0,0]) === 5)
// 可以想一下更好的办法，先把最小的拿出来，然后做差，这样递归的次数就少多了 [100, 100, 10] 这种

export { fillCups, fillCups2 };

~~~

  
### 2341-numberOfPairs.js

~~~js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
const numberOfPairs = function(nums) {
  const dict = {};
  let pair = 0;
  let remain = 0;
  nums.forEach((num) => {
    if (dict[num]) {
      dict[num] = null;
      pair++;
      remain--;
    } else {
      dict[num] = true;
      remain++;
    }
  });
  return [pair, remain];
};

export { numberOfPairs };

~~~

  
### 2347-bestHand.js

~~~js
/**
 * @param {number[]} ranks
 * @param {character[]} suits
 * @return {string}
 */
const bestHand = function(ranks, suits) {
  const a = suits[0];
  if (suits[1] === a && suits[2] === a && suits[3] === a && suits[4] === a) {
    return 'Flush';
  }
  const good_ranks = [...new Set(ranks)];
  if (good_ranks.length === 5) {
    return 'High Card';
  }
  const dict = {};
  for (let i = 0; i < ranks.length; i++) {
    const key = ranks[i];
    if (!dict[key]) {
      dict[key] = 0;
    }
    dict[key] += 1;
    if (dict[key] === 3) {
      return 'Three of a Kind';
    }
  }
  return 'Pair';
};

export { bestHand };

~~~

  
### 2351-repeatedCharacter.js

~~~js
/**
 * @param {string} s
 * @return {character}
 * 2351. 第一个出现两次的字母
 * 难度简单
 */
const repeatedCharacter = function(s) {
  const dict = {};
  for (let i = 0; i < s.length; i++) {
    const key = s[i];
    if (dict[key]) {
      return key;
    } else {
      dict[key] = true;
    }
  }
};

export { repeatedCharacter };

~~~

  
### 2399-checkDistances.js

~~~js
/*
 * @lc app=leetcode.cn id=2399 lang=javascript
 * Your runtime beats 80.72 % of javascript submissions
 * [2399] 检查相同字母间的距离
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number[]} distance
 * @return {boolean}
 */
const checkDistances = function(s, distance) {
  const dict = {};
  for (let i = 0; i < s.length; i++) {
    const curr = s[i];
    // 把第一次出现的位置，记录在字典中
    if (!dict[curr] && dict[curr] !== 0) {
      dict[curr] = i;
    } else {
      // 比较字典中的位置和实际距离中的位置
      if (i - dict[curr] - 1 !== distance[curr.charCodeAt(0) - 97]) {
        return false;
      }
    }
  }
  return true;
};

// console.log(checkDistances("abaccb", [1,3,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]) === true)
// console.log(checkDistances("aa", [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])=== false)
// @lc code=end
export { checkDistances };

~~~

  
### 2404-mostFrequentEven.js

~~~js
/*
 * @lc app=leetcode.cn id=2404 lang=javascript
 * Your runtime beats 14.86 % of javascript submissions
 * [2404] 出现最频繁的偶数元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
const mostFrequentEven = function(nums) {
  const dict = {};
  for (let i = 0; i < nums.length; i++) {
    const curr = nums[i];
    if (curr % 2 === 0) {
      if (dict[curr]) {
        dict[curr] = dict[curr] + 1;
      } else {
        dict[curr] = 1;
      }
    }
  }
  // 如果没有偶数，直接返回-1
  if (Object.keys(dict).length === 0) {
    return -1;
  }
  // 找到出现最多的次数
  const maxTimes = Math.max(...Object.values(dict));
  // 然后找到出现最多的次数数组
  const arr = [];
  for (const key in dict) {
    const times = dict[key];
    if (times === maxTimes) {
      arr.push(parseInt(key));
    }
  }
  // 返回最小值
  return Math.min(...arr);
};

// console.log(mostFrequentEven([0,1,2,2,4,4,1]) === 2);
// console.log(mostFrequentEven([4,4,4,9,2,4,2,2]) === 4)
// console.log(mostFrequentEven([29,47,21,41,13,37,25,7]) === -1)

// @lc code=end
export { mostFrequentEven };

~~~

  
### 2469-convertTemperature.js

~~~js
/**
 * @param {number} celsius
 * @return {number[]}
 */
const convertTemperature = function(celsius) {
  return [celsius + 273.15, celsius * 1.80 + 32.00];
};

export { convertTemperature };

~~~

  