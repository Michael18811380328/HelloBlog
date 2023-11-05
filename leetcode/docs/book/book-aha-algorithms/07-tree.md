## 树

## 第7章  神奇的树

第1节  开启“树”之旅

第2节  二叉树

第3节  堆——神奇的优先队列

第4节  擒贼先擒王——并查集



树是不包含回路的连通无向图。

- 一颗树中任何两个节点有且仅有一条路径连通
- 一棵树中有 n 个节点，那么有 n - 1 条边
- 一棵树中加一条边，就可以构成一个回路

二叉树和多叉树可互相转换。

满二叉树：二叉树的每个节点都有两个子节点。

完全二叉树

- 完全二叉树：满二叉树最后一行缺少几个元素。
- 如果把一个完全二叉树从头到尾编号，那么父节点是 k 左子节点是 2 * k, 右子节点是 2 * k + 1。
- 如果一个完全二叉树有N个节点，那么高度是 logN (树的层数)。

最小堆：所有父节点都比子节点小

堆中获取最小值：直接获取堆顶部的元素，然后把最后一个元素移动到顶部，然后把这个元素重新放到合适的位置。

创建堆：先把全部数放在一个数组中（就是一个完全二叉树）。因为最下面一层节点是满足条件的，所以从 n / 2 的节点开始，逐步向上遍历，把这个节点向下调整。

01-tree
~~~c
int h[101];

// 向下调整
void siftdown(int i) {
  int t, flag = 0;
  while (i * 2 <= n && flag == 0) {
    if (h[i] > h[i * 2]) {
      t = i * 2;
    }
    else {
      t = i;
    }
    if (i * 2 + 1 <= n) {
      if (h[t] > h[i * 2 + 1]) {
        t = i * 2 + 1;
      }
    }
    if (t != i) {
      swap(t, i);
      i = t;
    }
    else {
      flag = 1; // stop
    }
  }
  return;
}

~~~


02-heap
~~~c
#include <stdio.h>

int h[101]; // heap
int n; // 堆中元素的数量

void swap(int x, int y) {
  int tmp;
  tmp = h[x];
  h[x] = h[y];
  h[y] = tmp;
  return;
}

// 向下调整函数(从节点i向下调整)
void siftdown (int i) {
  int t, flag = 0;
  while (i * 2 <= n && flag == 0) {
    if (h[i] < h[i * 2]) {
      t = i * 2;
    }
    else {
      t = i;
    }
    if (i * 2 + 1 <= n) {
      if (h[t] < h[i * 2 + 1]) {
        t = i * 2 + 1;
      }
    }
    if (t != i) {
      swap(i, t);
      i = t;
    } else {
      flag = 1;
    }
  }
  return;
}

// create heap
void create() {
  int i;
  for (i = n / 2; i >= 1; i--) {
    siftdown(i);
  }
  return;
}

// sort
void heapsort() {
  while (n > 1) {
    swap(1, n);
    n--;
    siftdown(1);
  }
  return;
}

int main() {
  int i, num;
  scanf("%d", &num);
  for (i = 0; i <= num; i++) {
    scanf("%d", &h[i]);
  }
  n = num;

  create();

  heapsort();

  for (i = 0; i <= num; i++) {
    printf("%d", h[i]);
  }
  getchar();
  return 0;
}

~~~

03-disjoint-set
~~~c
// 并查集
// 一个数组中，存在多个不同的树，需要计算树的个数
// 关键：合并子集（从左合并）
#include <stdio.h>

int f[1001] = {0},n, m, k, sum = 0;

void init() {
  int i;
  for (i = 1; i <= n; i++) {
    f[i] = i;
  }
  return;
}

int get_father(int v) {
  if (f[v] == v) {
    return v;
  }
  else {
    // 计算一个节点的相同值的节点时，同时把全部的节点链上的单元格修改了
    f[v] = get_father(f[v]);
    return f[v];
  }
}

void merge(int v, int u) {
  int t1, t2;
  t1 = get_father(v);
  t2 = get_father(u);
  if (t1 != t2) {
    f[t2] = t1; // 靠左原则，把右面的节点的值改成坐标的节点的值
  }
  return;
}

int main() {
  int i, x, y;
  scanf("%d %d", &n, &m);

  init();

  for (i = 1; i <= m; i++) {
    scanf("%d %d", &x, &y);
    merge(x, y);
  }

  for (i = 1; i <= n; i++) {
    if (f[i] == i) {
      sum++;
    }
  }

  printf("%d", sum);
  getchar();
  return 0;
}

~~~
