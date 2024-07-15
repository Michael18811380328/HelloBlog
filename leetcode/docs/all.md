
### 0095-generateTrees.js


0095\. 不同的二叉搜索树

95 不同的二叉搜索树（以1-N为节点，可以建立多少个不同的二叉搜索树？）

问题关键是：二叉搜索树左子树小于当前节点，右子树大于当前节点。那么遍历1-N作为根节点，然后设置 1——1-i是左子树，i+1 —— n 是右子树，然后递归遍历子树的情况。最后把左右子树双重循环即可找到全部的结果。注意：如果一个位置是空的，也需要返回 Null 节点。


### 0097-isInterleave.js


0097\. 交错字符串

97 交错字符串：

思路一，使用DFS递归字符串，并先判断是否全部字符的个数相同，这样可以实现，性能比较差。

思路二：使用动态规划，从开头一直递推到最后的一个值。

思路三：回溯算法+三指针+字典记忆化


### 0098-isValidBST.js


0098\. 验证二叉搜索树

98 验证二叉搜索树

二叉搜索树的性质是，节点值大于左子树最大值，节点值小于右子树最小值。

思路一：使用递归方法，先构建一个递归函数 checkTree(node, small, large)，判断每一个子树的最大最小值。只需要判断当前节点，在递归中判断子节点即可.

思路二：二叉搜索树的中序遍历结果，是一个升序数组，那么根据这个性质，遍历二叉树。如果不是升序数组，就不是二叉搜索树。


### 0103-zigzagLevelOrder.js


0103\. 二叉树的锯齿形层序遍历

题目 0103 难度简单，认真一次性可以做出来

锯齿状层序遍历二叉树（先把二叉树 BFS 层序遍历，然后加一个层序号属性；然后把列表根据层序号再转换成二维数组即可）

时间复杂度是O(n) 遍历全部树节点，然后遍历一下临时的一维列表。

空间复杂度是多出的一个临时数组存放节点的值和层数。

```javascript
const zigzagLevelOrder = function(root) {
  if (!root) return [];
  // 先把二叉树层序遍历(广度优先遍历)，同时增加layer层数
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

```




### 0105-buildTree.js


0105\. 从前序遍历和中序遍历数组中恢复二叉树

从前序遍历和中序遍历数组中（无重复元素），恢复二叉树.找到根元素和左右子树，然后递归即可

```javascript
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
```




### 0106-buildTree.js


0106.从中序遍历和后续遍历中恢复二叉树

```javascript
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
```




### 0109-sortedListToBST.js


0109\. 有序链表转换成二叉搜索树

题目109

有序链表转换成二叉搜索树

1、思路：先把有序链表转换成有序数组，然后转换成二叉搜索树。

2、官方思路：使用快慢指针，获取有序链表的中点，然后左右分别作为开始和结束，转换成子树作为树节点。关键是记录开始节点和结束节点的位置（链表中记录位置的方案）

二叉搜索树的核心：就是找到中位数作为根节点

1、可以使用快慢指针，获取排序链表的中位数。当快指针到达最后一位时，慢指针正好是中位数

2、设置中位数的是根节点，然后左子树和右子树的边界

可以确定，递归左右子树即可注意：链表找到元素的索引

```javascript
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

```




### 0114-flatten.js


0114\. 二叉树展开为链表

题目114 简单

二叉树展开为链表

先把二叉树先序遍历成数组，然后遍历数组，给数组的每一个元素增加引用，实现单链表




### 0116-connect.js


0116\. 完美二叉树中填充每个节点的next指针

116 完美二叉树中，填充每个节点的next指针，下一个右侧节点。实际上就是先把二叉树层序遍历成矩阵，然后遍历每一个子数组，设置指针指向下一个节点即可。




### 0135-candy.js


0135\. 分糖果

困难

关键是双向贪心算法

```javascript
const candy = function(ratings) {
  let result = Array(ratings.length).fill(1);
  // 从左向右遍历
  for (let i = 1; i < result.length; i++) {
    if (ratings[i] > ratings[i - 1]) {
      result[i] = result[i - 1] + 1;
    }
  }
  // 从右向左遍历（技巧点）
  for (let i = result.length - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      result[i] = Math.max(result[i], result[i + 1] + 1);
    }
  }
  // 计算结果
  return result.reduce((a, b) => a + b, 0);
};
```




### 0152-maxProduct.js


0152\. 最大乘积子数组

最大乘积子数组：动态规划思路，和最大和子数组类似。Fx = F(x-1) 的递推式。如果全部是正数，那么完全一致。如果有正数有负数，当前的最大值，可能是前面的最小值和当前值的乘积，所以需要维护两个数组，分别存放最大值和最小值的递推式。


### 0164-maximumGap.js


0164\. 最大间距

最大间距：常规的思路：数组快速排序，然后循环一次，获取最大间距（快速排序是N\*logN）。

因为题目要求是N，这个方法严格上不合适。

官方给出的思路是基数排序或者桶排序。实际中直接使用内置的排序即可。


### 0166-fractionToDecimal.js


0166\. 分数到小数

166 分数到小数（需要细心）

关键点：

1、两个整数相除，结果可能是整数，小数，或者循环小数。不可能是无限不循环小数，这个是数学原理。

2、如何判断是循环小数？每次计算，如果余数出现相同，那么就是循环小数，所以适应一个对象记录出现的余数，使用一个数组记录出现的位置，即可把循环的部分获取到。


### 0174-calculateMinimumHP.js


0174\. 地下城与勇士

困难，二维矩阵反向动态规划，每一个单元格条件判断。

如果使用递归，需要加入记忆化搜索（缓存）

```javascript
var calculateMinimumHP2 = function (dungeon) {
  const m = dungeon.length;
  const n = dungeon[0].length;

  // 初始化一个二维数组来存储所需的最小生命值
  const dp = Array.from({ length: m }, () => new Array(n));

  // 初始化右下角单元格
  dp[m - 1][n - 1] = Math.max(1, 1 - dungeon[m - 1][n - 1]);

  // 初始化最右侧一列
  for (let i = m - 2; i >= 0; i--) {
    dp[i][n - 1] = Math.max(1, dp[i + 1][n - 1] - dungeon[i][n - 1]);
  }

  // 初始化最下面一行
  for (let j = n - 2; j >= 0; j--) {
    dp[m - 1][j] = Math.max(1, dp[m - 1][j + 1] - dungeon[m - 1][j]);
  }

  // 填充其余的单元格
  for (let i = m - 2; i >= 0; i--) {
    for (let j = n - 2; j >= 0; j--) {
      const minNext = Math.min(dp[i + 1][j], dp[i][j + 1]);
      dp[i][j] = Math.max(1, minNext - dungeon[i][j]);
    }
  }
  return dp[0][0];
}
```




### 0199-rightSideView.js


0199\. 二叉树的右视图

二叉树的右视图：先把二叉树层序遍历，然后获取每一层的最后一个元素即可

```javascript
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
```




### 1052-maxSatisfied.js


1052.爱生气的书店老板

困难，运行通过

<https://leetcode.cn/problems/grumpy-bookstore-owner/>

```javascript
/**
 * @param {number[]} customers
 * @param {number[]} grumpy
 * @param {number} minutes
 * @return {number}
 * 最大顾客数 = 各种情况下都不生气的顾客（staticValue） + 老板心情好时不生气的顾客（slide window, max）
 */

```

```javascript
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




### 1146-SnapshotArray.js


1146\. 快照数组 SnapshotArray

困难

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




### 1267-countServers.js


1267\. 统计参与通信的服务器

简单：循环矩阵，哈希表计数，一次可以写出来

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

```

```javascript
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




### 2682-circularGameLosers.js


2682\. 找出转圈游戏输家

中等，运行通过

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




### 2778-sumOfSquares.js


2778\. 特殊元素平方和

简单，循环数组，直接写出来

<https://leetcode.cn/problems/sum-of-squares-of-special-elements/description/>

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */

```

```javascript
var sumOfSquares = function(nums) {
    const len = nums.length;
    let result = 0;
    for (let i = 0; i < len; i++) {
        if (len % (i + 1) === 0) {
            result += (nums[i] * nums[i]);
        }
    }
    return result;
};

```




### 2784-isGood.js


2784\. 检查数组是否是好的

<https://leetcode.cn/problems/check-if-array-is-good/description/>

简单，数组循环，直接写出来

```javascript
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




### 2811-canSplitArray.js


2811\. 判断是否能拆分数组

困难

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

<https://leetcode.cn/problems/check-if-it-is-possible-to-split-array/solutions/2375201/todoline-shen-du-sou-suo-ji-yi-hua-qian-mqn2a/>

或者是脑筋急转弯

<https://leetcode.cn/problems/check-if-it-is-possible-to-split-array/solutions/2375178/nao-jin-ji-zhuan-wan-by-endlesscheng-0l19/>


### 2815-maxSum.js


2815\. 数组中的最大数对和

简单：考点：数组循环+哈希表，可以直接做出来

<https://leetcode.cn/problems/max-pair-sum-in-an-array/description/>

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


### 2824-countPairs.js


2824\. 统计和小于目标的下标对数目

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


