# Leetcode笔记 
 
## 0277 1267. 统计参与通信的服务器




基本思路：循环矩阵，哈希表计数，一次可以写出来

<https://leetcode.cn/problems/count-servers-that-communicate/description/> 

```javascript
/**
 * @param {number[][]} grid
 * @return {number}
 * BFD 或者 DFS 都可以实现，当然也可以用其他思路
 * 先获取每行每列中是 1 的个数，构成两个字典
 * 然后遍历全部的节点，如果在字典中任意一个大于1，那么就可以通信
 * 这个可以实现，性能略有点差
 */

var countServers = function(grid) {
    let rowDict = {};
    let columnDict = {};
    // 循环全部节点，获取出现的次数，写入到对应的字典中
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === 1) {
                rowDict[row] = (rowDict[row] || 0) + 1;
                columnDict[col] = (columnDict[col] || 0) + 1;
            }
        }
    }
    let result = 0;
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === 1 && (rowDict[row] > 1 || columnDict[col] > 1)) {
                result++;
            }
        }
    }
    return result;
};

```



   
## 0279 2778. 特殊元素平方和



简单，循环数组，直接写出来

<https://leetcode.cn/problems/sum-of-squares-of-special-elements/description/> 

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var sumOfSquares = function(nums) {
    const len = nums.length;
    let result = 0;
    for (let i = 0; i < len; i++) {
        if (len % (i + 1) ===0) {
            result += (nums[i] * nums[i]);
        }
    }
    return result;
};

```



   
## 0280 2784. 检查数组是否是好的




<https://leetcode.cn/problems/check-if-array-is-good/description/> 

简单，数组循环，直接写出来

```javascript
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isGood = function(nums) {
    const len = nums.length;
    nums = nums.sort((a, b) => a > b ? 1 : -1);
    for (let i = 0; i < len; i++) {
        if (i === len - 1) {
            if (nums[i] !== nums[i - 1]) {
                return false;
            }
        } else {
            if (nums[i] !== i + 1) {
                return false;
            }
        }
    }
    return true;
};

```



   
## 0282 2824. 统计和小于目标的下标对数目




<https://leetcode.cn/problems/count-pairs-whose-sum-is-less-than-target/description/> 

简单，循环数组

JS

```javascript
var countPairs = function(nums, target) {
    let result = 0;
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if ((nums[i] + nums[j]) < target) {
                result++;
            }
        }
    }
    return result;
};

```

TS 

```javascript
function countPairs(nums: number[], target: number): number {
    let result: number = 0;
    for (let i: number = 0; i < nums.length; i++) {
        for (let j: number = i + 1; j < nums.length; j++) {
            if ((nums[i] + nums[j]) < target) {
                result++;
            }
        }
    }
    return result;
};

```

python3

```python
class Solution:
    def countPairs(self, nums: List[int], target: int) -> int:
        result = 0
        for i in range(0, len(nums)):
            for j in range(i + 1, len(nums)):
                if (nums[i] + nums[j]) < target:
                    result = result + 1
        return result

```



   
## 0275 2815. 数组中的最大数对和




<https://leetcode.cn/problems/max-pair-sum-in-an-array/description/> 

考点：数组循环+哈希表，难度简单，可以直接做出来

思路：第一次循环，计算每一个数字的位数最大值，并存放在哈希表中。第二次直接双重循环数组，判断每一个数对是否满足条件；如果满足条件就求和，然后计算和的最大值。时间复杂度是 N^2 。这个思路比较好理解。

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSum = function(nums) {
    // 基本思路：
    let dict = {};
    let max = -1;
    // 辅助函数：获取某个数位最大的值
    function getMax(num) {
        let result = num % 10;
        num = (num - num % 10) / 10;
        while (num > 0) {
            let curr = num % 10;
            result = curr > result ? curr : result;
            num = (num - num % 10) / 10;
        }
        return result;
    }
    // 第一次循环数组，把数字和对应的最大位数拿到，然后写入哈希表中
    for (let i = 0; i < nums.length; i++) {
        let item = nums[i];
        dict[item] = getMax(item);
    }
    // 第二次直接循环两次数组，找到每一个数对，然后看最大是否满足，满足的话求和
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (dict[nums[i]] === dict[nums[j]]) {
                let currMax = nums[i] + nums[j];
                if (currMax > max) {
                    max = currMax;
                }
            }
        }
    }
    return max;
};

```

其他大神有一次循环做出来的，类似桶排序，不是很好理解，思路如下。

<https://leetcode.cn/problems/max-pair-sum-in-an-array/solutions/2385996/yi-ci-bian-li-by-endlesscheng-6zt9/> 



   
## 0276 2811. 判断是否能拆分数组


<https://leetcode.cn/problems/check-if-it-is-possible-to-split-array/description/> 

考点：动态规划，贪心算法（脑筋急转弯一般想不出来），难度中等（自己尝试几遍，想到了正确思路，然后做出来了，可能有点费时间）

思路1：先使用贪心算法，但是可能不满足一些情况，不成立

```javascript
var canSplitArray = function(nums, m) {
    // 思路：先求数组的和，然后双指针（前后指针分别向中间靠拢），然后和逐渐减少
    // 如果左右同时满足，那么减去左右中最小的一个（贪心算法？）
    const len = nums.length;
    if (len < 3) {
        return true;
    }
    let sum = nums.reduce((a, b) => { return a + b; }, 0);
    let left = 0;
    let right = len - 1;
    // left right
    // 如果这样的思路，不满足实例3——这需要动态规划？
    while (sum >= m && left + 1 < right) {
        // 左边的小于右边的，且减去左边后还满足条件
        if (nums[left] < nums[right] && sum - nums[left] > m) {
            sum = sum - nums[left];
            left++;
        }
        // 左边的大于右边的，且减去右边后还满足条件
        else if (nums[left] < nums[right] && sum - nums[right] > m) {
            sum = sum - nums[right];
            right--;
        }
        // 两边都不满足，直接跳出循环
        else {
            break;
        }
    }
    if (left + 1 === right) {
        return true;
    } else {
        return false;
    }
};

```

思路2：动态规划（递归调用，超时了），思路基本正确，代码需要改进

递推公式

Fn(start, end) = Fn(start + 1, end) || Fn(start, end - 1)

F(1, 3) = (a1 + a2) >= m || (a2 + a3) >= m;

```javascript
var canSplitArray = function(nums, m) {
    const len = nums.length;
    if (len < 3) {
        return true;
    }
    let dict = {};
    function fn(a, b) {
        // 从缓存中获取结果，避免大量递归
        let key = `${a}-${b}`;
        if (dict[key]) {
            return dict[key];
        }
        let result;
        if (a + 2 === b) {
            result = (nums[a] + nums[a + 1]) >= m || (nums[a + 1] + nums[a + 2]) >= m;
        } else {
            result = fn(a + 1, b) || fn(a, b - 1);
        }
        dict[key] = result;
        return result;
    }
    return fn(0, nums.length - 1);
};

```

思路3：动态规划改进版

```javascript
var canSplitArray = function(nums, m) {
    const len = nums.length;
    if (len < 3) {
        return true;
    }
    if (len === 3) {
        return (nums[0] + nums[1]) >= m || (nums[1] + nums[2]) >= m;
    }
    // 先计算每个三元数对的值
    let dict = {};
    for (let i = 0; i < len; i++) {
        if (nums[i] && nums[i + 2]) {
            let result = (nums[i] + nums[i + 1]) >= m || (nums[i + 1] + nums[i + 2]) >= m;
            dict[`${i}-${i+2}`] = result;
        }
    }
    // 然后循环长度，计算最终的结果
    for (let length = 3; length < len; length++) {
        for (let start = 0; start < len; start++) {
            if (nums[start] && nums[start+length]) {
                let result = dict[`${start+1}-${start+length}`] || dict[`${start}-${start+length-1}`];
                dict[`${start}-${start+length}`] = result;
            }
        } 
    }
    return dict[`${0}-${len - 1}`];
};

```

继续优化代码（减少了两层 if 判断，但是时间复杂度提升不大）

```javascript
var canSplitArray = function(nums, m) {
    const len = nums.length;
    if (len < 3) {
        return true;
    }
    if (len === 3) {
        return (nums[0] + nums[1]) >= m || (nums[1] + nums[2]) >= m;
    }
    // 先计算每个三元数对的值
    let dict = {};
    for (let i = 0; i < len - 2; i++) {
        let result = (nums[i] + nums[i + 1]) >= m || (nums[i + 1] + nums[i + 2]) >= m;
        dict[`${i}-${i+2}`] = result;
    }
    // 然后循环长度，计算最终的结果
    for (let length = 3; length < len; length++) {
        for (let start = 0; start < len - length; start++) {
            let result = dict[`${start+1}-${start+length}`] || dict[`${start}-${start+length-1}`];
            dict[`${start}-${start+length}`] = result;
        } 
    }
    return dict[`${0}-${len - 1}`];
};

```

可以参考高赞答案，这个确实没有想到，性能差距很大

深度搜索 + 记忆化 + 前缀和;

https\://leetcode.cn/problems/check-if-it-is-possible-to-split-array/solutions/2375201/todoline-shen-du-sou-suo-ji-yi-hua-qian-mqn2a/

 或者是脑筋急转弯

https\://leetcode.cn/problems/check-if-it-is-possible-to-split-array/solutions/2375178/nao-jin-ji-zhuan-wan-by-endlesscheng-0l19/



   
## 0290 1052.爱生气的书店老板


运行通过

<https://leetcode.cn/problems/grumpy-bookstore-owner/> 

```
/*
 * @lc app=leetcode.cn id=1052 lang=javascript
 * [1052] 爱生气的书店老板-滑动窗口
 */

/**
 * @param {number[]} customers
 * @param {number[]} grumpy
 * @param {number} minutes
 * @return {number}
 * 最大顾客数 = 各种情况下都不生气的顾客（staticValue） + 老板心情好时不生气的顾客（slide window, max）
 */
var maxSatisfied = function(customers, grumpy, minutes) {
  const len = customers.length;
  // 各种情况下都不生气的顾客（固定值）
  let staticValue = 0;
  for (let i = 0; i < len; i++) {
    // 不生气 0 时，有效的顾客
    if (grumpy[i] === 0) {
      staticValue += (customers[i]);
    }
  }
  // 计算窗口初始化的最大值
  let max = 0;
  let curr = 0;
  for (let i = 0; i < minutes; i++) {
    if (grumpy[i] === 1) {
      curr += customers[i];
    }
  }
  // 这是窗口初始化的最大值
  max = curr;
  // 滑动窗口开始
  for (let i = minutes; i < len; i++) {
    if (grumpy[i] === 1) {
      curr += customers[i];
    }
    if (grumpy[i - minutes] === 1) {
      curr -= customers[i - minutes];
    }
    if (curr > max) {
      max = curr;
    }
  }
  return staticValue + max;
};

```

单元测试

```
// console.log(maxSatisfied([4,10,10], [1,1,0], 2) === 24);
// console.log(maxSatisfied([3], [1], 1) === 3);
// console.log(maxSatisfied([1], [1], 1) === 1);
// console.log(maxSatisfied([1,0,1,2,1,1,2,5,2,2,2,1], [0,1,0,1,0,1,0,1,0,0,1,1], 5) === 17);
// console.log(maxSatisfied([1,0,1,2,1,1,7,5], [0,1,0,1,0,1,0,1], 3) === 16);
// console.log(maxSatisfied([2,6,6,9], [0,0,1,1], 1) === 17);

// python 解答 https://zhuanlan.zhihu.com/p/352407806

```



   
## 0291 2682. 找出转圈游戏输家


运行通过

数组循环，注意特殊情况就行

<https://leetcode.cn/problems/find-the-losers-of-the-circular-game/description/> 

```javascript
/**
 * @param {number} n
 * @param {number} k
 * @return {number[]}
 */
var circularGameLosers = function(n, k) {
    let dict = {};
    dict[1] = true;
    let index = 1; // 当前球的位置
    // 循环，直到某个朋友接到球
    // 中间某个人接到球，就记录在字典中
    for (let i = 1; i < 10000; i++) {
        let time = i * k;
        index = (index + time) % n;
        // 如果转了一圈，就是最后一个数字
        if (index === 0) {
            index = n;
        }
        // 有人第二次接到球，游戏结束
        if (dict[index]) {
            break;
        } else {
            dict[index] = true;
        }
    }
    // 把全部字典的键遍历一次，然后求差值，就是结果数组
    let result = [];
    for (let i = 2; i <= n; i++) {
        if (!dict[i]) {
            result.push(i);
        }
    }
    return result;
};

// console.log(circularGameLosers(5, 2)); // [4,5]
// console.log(circularGameLosers(4, 4)); // [2,3,4]
// console.log(circularGameLosers(2, 1)); // []
// console.log(circularGameLosers(5, 3)); // [2,3]

```



   
## 0292 1146 快照数组 SnapshotArray


有一定难度

<https://leetcode.cn/problems/snapshot-array/solutions/2016347/zhi-ji-lu-xiu-gai-by-masx200-zguh/> 

因为操作比较多，需要综合考虑空间复杂度和时间复杂度，所以需要字典存储+二分查找

```javascript
// 解法三：优化，字典数组+二分查找（时间复杂度和空间复杂度都可以满足）
// https://leetcode-cn.com/problems/snapshot-array/solution/zi-jie-leetcode1146kuai-zhao-shu-zu-by-user7746o/

let SnapshotArray = function(length) {
  // 这里必须 fill 否则 map 会跳过
  this.arr = new Array(length).fill(0).map(() => new Map());
  this.snapId = 0;
};

SnapshotArray.prototype.set = function(index, val) {
  this.arr[index].set(this.snapId, val);
};

SnapshotArray.prototype.snap = function() {
  this.snapId++;
  return this.snapId - 1;
};

SnapshotArray.prototype.get = function(index, snap_id) {
  // 找到这个数的所有记录
  let snapIds = [...this.arr[index].keys()]
  // 二分查找，找到 <= snap_id 的值
  let start = 0;
  let end = snapIds.length - 1;
  let mid;
  while (start <= end) {
    mid = Math.floor((start + end) / 2);
    if (snapIds[mid] < snap_id) {
      start = mid + 1;
    } else if (snapIds[mid] > snap_id) {
      end = mid - 1;
    } else if (snapIds[mid] === snap_id) {
      return this.arr[index].get(snap_id);
    }
  }
  return this.arr[index].get(snapIds[start - 1]) || null;
};

```



  