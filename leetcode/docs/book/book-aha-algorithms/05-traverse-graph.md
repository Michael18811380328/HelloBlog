### 05-traverse-graph

## 第5章  图的遍历

第1节  深度和广度优先究竟是指啥

第2节  城市地图——图的深度优先遍历

第3节  最少转机——图的广度优先遍历

01-traverse-graph-dfs

~~~c
#include <stdio.h>

// 使用图的邻接矩阵存储法（e[101][101]）
int book[101], sum, n, e[101][101];

// DFS 每一个节点
// cur 是当前的顶点编号
void dfs (int cur) {
  int i;
  printf("%d", cur);
  // 每次访问一个节点，那么sum加一，如果已经访问了全部节点，那么直接返回
  sum++;
  if (sum == n) {
    return;
  }
  for (i = 1; i <= n; i++) {
    // 一个点到另一个点有边，并且没有访问过，那么dfs
    if (e[cur][i] == 1 && book[i] == 0) {
      book[i] = 1;
      dfs(i);
    }
  }
  return;
}

int main() {
  int i, j, m, a, b;
  scanf("%d %d", &n, &m);
  // init matrix
  for (i = 1; i <= n; i++) {
    for (j = 1; j <= n; j++) {
      // 主对角线上的元素（一个节点到自己，是0）
      if (i == j) {
        e[i][j] = 0;
      }
      else {
        e[i][j] = 99999999; // 假设为正无穷
      }
    }
  }
  // 读入顶点之间的边
  for (i = 1; i <= m; i++) {
    scanf("%d %d", &a, &b);
    e[a][b] = 1;
    e[b][a] = 1;
    // 无向图，所以两个点都是1
  }
  // 开始遍历
  book[1] = 1;
  dfs(1);
  getchar();
  return 0;
}


~~~

02-traverse-graph-bfs

~~~c
#include <stdio.h>

int main() {
  int i, j, n, m, a, b, cur;
  int book[101] = {0};
  int e[101][101];
  int que[100];

  scanf("%d %d", &n, &m);
  // init matrix
  for (i = 1; i <= n; i++) {
    for (j = 1; j <= n; j++) {
      // 主对角线上的元素（一个节点到自己，是0）
      if (i == j) {
        e[i][j] = 0;
      }
      else {
        e[i][j] = 99999999; // 假设为正无穷
      }
    }
  }

  // 读入顶点之间的边
  for (i = 1; i <= m; i++) {
    scanf("%d %d", &a, &b);
    e[a][b] = 1;
    e[b][a] = 1;
    // 无向图，所以两个点都是1
  }

  // bfs 核心就是队列
  int head = 1;
  int tail = 1;

  // 开始 bfs
  que[tail] = 1;
  tail++;
  book[1] = 1;

  while (head < tail && tail <= n) {
    cur = que[head];
    for (i = 1; i <= n; i++) {
      if (e[cur][i] == 1 && book[i] == 0) {
        que[tail] = i;
        tail++;
        book[i] = 1;
      }
      if (tail > n) {
        break;
      }
    }
    // 每次遍历一个节点，队列的头指针必须增加1
    head++;
  }
  for (i = 1; i < tail; i++) {
    printf("%d", que[i]);
  }
  getchar();
  return 0;
}


~~~

03-city-map-dfs



~~~c
// dfs 适应于边权重不同的情况（例如不同地点的距离不同）
#include <stdio.h>

int min = 9999999;
int book[101], n, e[101][101];

void dfs(int cur, int dis) {
  int j;
  if (dis > min) {
    return;
  }
  if (cur == n) {
    if (dis < min) min = dis;
    return;
  }
  // cur != n
  for (j = 1; j <= n; j++) {
    if (e[cur][j] != 99999999 && book[j] == 0) {
      book[j] = 1;
      dfs(j, dis + e[cur][j]);
      book[j] = 0;
    }
  }
  return;
}

int main () {
  int i, j, n, m, a, b, c;
  scanf("%d %d", &n, &m);
  // init matrix
  for (i = 1; i <= n; i++) {
    for (j = 1; j <= n; j++) {
      // 主对角线上的元素（一个节点到自己，是0）
      if (i == j) {
        e[i][j] = 0;
      }
      else {
        e[i][j] = 99999999; // 假设为正无穷
      }
    }
  }
  for (i = 1; i <= m; i++) {
    scanf("%d %d", &a, &b);
    e[a][b] = 1;
    e[b][a] = 1;
  }
  book[1] = 1;
  dfs(1, 0);
  printf("%d", min);
  getchar();
  return 0;
}


~~~

04-traver-plane-bfs

~~~c

// bfs 适应于边权重相等的情况（例如A到B点坐飞机转机最少的情况）
#include <stdio.h>

struct node {
  int x; // 城市编号
  int s; // 转机次数
};

int main () {
  struct node que[2501];
  int e[51][51] = {0};
  int book[51] = {0};
  int head, tail;
  int i, j, n, m, a, b, cur, start, end, flag = 0;
  scanf("%d %d %d %d", &n, &m, &start, &end);

  // init matrix
  for (i = 1; i <= n; i++) {
    for (j = 1; j <= n; j++) {
      // 主对角线上的元素（一个节点到自己，是0）
      if (i == j) {
        e[i][j] = 0;
      }
      else {
        e[i][j] = 99999999; // 假设为正无穷
      }
    }
  }
  
  // init 不同城市的航班（无向图）
  for (i = 1; i <= m; i++) {
    scanf("%d %d", &a, &b);
    e[a][b] = 1;
    e[b][a] = 1;
  }

  head = 1;
  tail = 1;

  que[tail].x = start;
  que[tail].s = 0;
  tail++;
  book[start] = 1;

  while (head < tail) {
    cur = que[head].x;
    for (j = 1; j <= n; j++) {
      if (e[cur][j] != 99999999 && book[j] == 0) {
        que[tail].x = j;
        que[tail].s = que[head].s + 1;
        tail++;
        book[j] = 1;
      }
      if (que[tail - 1].x == end) {
        flag = 1;
        break;
      }
    }
    if (flag == 1) {
      break;
    }
    head++;
  }
  printf("%d", que[tail - 1].s);
  getchar();
  return 0;
}

~~~

