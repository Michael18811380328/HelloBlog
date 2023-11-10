#### 08-more

## 第8章  更多精彩算法（难度较大）

第1节  镖局运镖——图的最小生成树

第2节  再谈最小生成树

第3节  重要城市——图的割点

第4节  关键道路——图的割边

第5节  我要做月老——二分图最大匹配


01-graph-small-generate-tree
~~~c
// 图的最小生成树
// 问题：不同的节点之间权重不同，如何使用最少的权重，让图连通
// 即把多余的边去掉（要想让N个点连通，那么至少需要 n - 1条边）
// 只讨论无向图的最小生成树
// 关键：判断两个点是否连通（使用并查集，判断两个顶点是否在同一个集合中）

// 算法步骤：首先按照边的权重从小到大排序，每次从剩余的边中选择权重较小且边的两个定泗安不在同一个集合内的边
// 不会产生回路的边，加入到生成树中，直到加入了 n - 1 条边位置
// 算法不熟悉
#include <stdio.h>

struct edge {
  int u;
  int v;
  int w;
};

// 并查集需要的变量
struct edge e[10];
int n, m;
int f[7] = {0};
int sum = 0, count = 0;

// 辅助函数：快速排序（对边的权重排序）
void quicksort(int left, int right) {
  int i, j;
  struct edge t;
  if (left < right) {
    return;
  }
  i = left;
  j = right;
  while (i != j) {
    while (e[j].w > e[left].w && i < j) {
      j--;
    }
    while (e[i].w <= e[left].w && i < j) {
      i++;
    }
    // swap
    if (i < j) {
      t = e[i];
      e[i] = e[j];
      e[j] = t;
    }
  }
  t = e[left];
  e[left] = e[i];
  e[i] = t;

  quicksort(left, i - 1);
  quicksort(i + 1, right);
  return;
}

// 辅助函数：并查集找到祖先的函数
int get_father(int v) {
  if (f[v] == v) {
    return v;
  }
  else {
    f[v] = get_father(f[v]);
    return f[v];
  }
}

// 辅助函数：并查集合并两个子集
int merge(int v, int u) {
  int t1, t2;
  t1 = get_father(v);
  t2 = get_father(u);
  if (t1 != t2) {
    f[t2] = t1;
    return 1;
  }
  return 0;
}

int main() {
  int i;
  scanf("%d %d", &n, &m);
  for (i = 1; i <= m; i++) {
    scanf("%d %d %d", &e[i].u, &e[i].v, &e[i].w);
  }
  quicksort(1, m);

  for (i = 1; i <= n; i++) {
    f[i] = i;
  }

  // Kruskal 算法核心
  // 开始从小到大遍历每一条边
  for (i = 1; i <= m; i++) {
    // 判断一条边的两个顶点是否连通（即是否在一个集合中）
    if (merge(e[i].u, e[i].v)) {
      // 如果不连通，函数返回1，选择这条边（连通的话，返回0，不处理）
      count++;
      sum = sum + e[i].w;
    }
    // 如果已经达到数量，直接跳出
    if (count == n - 1) {
      break;
    }
  }
  printf("%d", sum);
  getchar();
  return 0;
}

~~~

02-graph-small-tree-prim
~~~c
// Prim 算法实现图的最小生成树
// 这个算法较复杂，暂时先抄写

#include <stdio.h>

int dis[7], book[7] = {0};
int h[7], pos[7], size;

void swap(int x, int y) {
  int t;
  t = h[x];
  h[x] = h[y];
  h[y] = t;

  t = pos[h[x]];
  pos[h[x]] = pos[h[y]];
  pos[h[y]] = t;
  return;
}

void siftdown(int i) {
  int t, flag = 0;
  while (i * 2 <= size && flag == 0) {
    if (dis[h[i]] > dis[h[i * 2]]) {
      t = i * 2;
    }
    else {
      t = i;
    }
    if (i * 2 <= size) {
      if (dis[h[t]] > dis[h[i * 2 + 1]]) {
        t = i * 2 + 1;
      }
    }
    if (t != i) {
      swap(t, i);
      i = t;
    }
    else {
      flag = 1;
    }
  }
  return;
}

void siftup(int i) {
  int flag = 0;
  if (i == 1) {
    return;
  }
  while (i != 1 && flag == 0) {
    if (dis[h[i]] < dis[h[i / 2]]) {
      swap(i, i / 2);
    }
    else {
      flag = 1;
    }
    i = i / 2;
  }
  return;
}

int pop() {
  int t;
  t = h[1];
  pos[t] = 0;
  h[1] = h[size];
  pos[h[1]] = 1;
  size--;
  siftdown(1);
  return t;
}

int main() {
  int n, m, i, j, k;
  int u[19], v[19], w[19], first[7], next[19];
  int inf = 9999999;
  int count = 0;
  int sum = 0;

  scanf("%d %d", &n, &m);

  for (i = 1; i <= m; i++) {
    scanf("%d %d %d", &u[i], &v[i], &w[i]);
  }

  // 无向图，反向存储一次
  for (i = m + 1; i <= 2 * m; i++) {
    u[i] = u[i - m];
    v[i] = v[i - m];
    w[i] = w[i - m];
  }

  for (i = 1; i <= n; i++) {
    first[i] = -1;
  }

  for (i = 1; i <= 2 * m; i++) {
    next[i] = first[u[i]];
    first[u[i]] = i;
  }

  // Prim 核心逻辑
  book[1] = 1;
  count++;

  dis[1] = 0;
  for (i = 2; i <= n; i++) {
    dis[i] = inf;
  }
  k = first[1];
  while (k != -1) {
    dis[v[k]] = w[k];
    k = next[k];
  }
  size = n;
  for (i = 1; i <= size; i++) {
    h[i] = i;
    pos[i] = i;
  }
  for (i = size / 2; i >= 1; i--) {
    siftdown(i);
  }
  pop();

  while (count < n) {
    j = pop();
    book[j] = 1;
    count++;
    sum = sum + dis[j];
    k = first[j];
    while (k != -1) {
      if (book[v[k]] == 0 && dis[v[k]] > w[k]) {
        dis[v[k]] = w[k];
        siftup(pos[v[k]]);
      }
      k = next[k];
    }
  }
  printf("%d", sum);
  return 0;
}

~~~

03-diversion-point-of-graph
~~~c
// 图的割点
#include <stdio.h>

int n, m, e[9][9], root;
int num[9], low[9], flag[9], index;

int min(int a, int b) {
  return a < b ? a : b;
}

// 割点算法核心：判断一个点后，其他的点是否和已有的点连通
void dfs(int cur, int father) {
  int child = 0;
  int i;
  // index 是时间戳
  index++;
  num[cur] = index;
  low[cur] = index;
  for (i = 1; i <= n; i++) {
    if (e[cur][i] == 1) {
      if (num[i] == 0) {
        child++;
        dfs(i, cur);
        low[cur] = min(low[cur], low[i]);
        if (cur != root && low[i] >= num[cur]) {
          flag[cur] = 1;
        }
        if (cur == root && child == 2) {
          flag[cur] = 1;
        }
      }
      else if  (i != father) {
        low[cur] = min(low[cur], num[i]);
      }
    }
  }
  return;
}

int main() {
  int i, j, x, y;
  scanf("%d %d", &n, &m);
  for (i = 1; i <= n; i++) {
    for (j = 1; j <= n; j++) {
      e[i][j] = 0;
    }
  }
  for (i = 1; i <= m; i++) {
    scanf("%d %d", &x, &y);
    e[x][y] = 1;
    e[y][x] = 1;
  }

  root = 1;
  dfs(1, root);

  for (i = 1; i <= n; i++) {
    if (flag[i] == 1) {
      printf("%d", i);
    }
  }

  getchar();
  getchar();
  return 0;
}

~~~

04-diversion-edge-of-graph
~~~c
// 图的割边
#include <stdio.h>

int n, m, e[9][9], root;
int num[9], low[9], flag[9], index;

int min(int a, int b) {
  return a < b ? a : b;
}

// 割边算法
void dfs(int cur, int father) {
  int i;
  index++;
  num[cur] = index;
  low[cur] = index;
  for (i = 1; i <= n; i++) {
    if (e[cur][i] == 1) {
      if (num[i] == 0) {
        dfs(i, cur);
        low[cur] = min(low[i], low[cur]);
        if (low[i] > num[cur]) {
          printf("%d-%d\n", cur, i);
        }
      }
      else if (i != father) {
        low[cur] = min(low[cur], num[i]);
      }
    }
  }
  return;
}

int main() {
  int i, j, x, y;
  scanf("%d %d", &n, &m);
  for (i = 1; i <= n; i++) {
    for (j = 1; j <= n; j++) {
      e[i][j] = 0;
    }
  }
  for (i = 1; i <= m; i++) {
    scanf("%d %d", &x, &y);
    e[x][y] = 1;
    e[y][x] = 1;
  }

  root = 1;
  dfs(1, root);

  for (i = 1; i <= n; i++) {
    if (flag[i] == 1) {
      printf("%d", i);
    }
  }

  getchar();
  getchar();
  return 0;
}

~~~

05-part-graph
~~~c
// 二分图的最大匹配
#include <stdio.h>

int e[101][101];
int match[101];
int book[101];
int n, m;

int dfs(int u) {
  int i;
  for (i = 1; i <= n; i++) {
    if (book[i] == 0 && e[u][i] == 1) {
      book[i] = 1;
      if (match[i] == 0 || dfs(match[i])) {
        match[i] = u;
        return 1;
      }
    }
  }
  return 0;
}

int main () {
  int i, j, t1, t2, sum = 0;
  for (i = 1; i <= m; i++) {
    scanf("%d %d", &t1, &t2);
    e[t1][t2] = 1;
  }
  for (i = 1; i <= n; i++) {
    match[i] = 0;
  }
  for (i = 1; i <= n; i++) {
    for (j = 1; j <= n; j++) {
      book[j] = 0;
      if (dfs(i)) {
        sum++;
      }
    }
  }
  printf("%d", sum);
  getchar();
  return 0;
}

~~~