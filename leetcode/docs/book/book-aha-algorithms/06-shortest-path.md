### 06-shortest-path

## 第6章  最短路径 (难度较大)

第1节  只有五行的算法——Floyd-Warshall 

第2节  Dijkstra算法——单源最短路

第3节  Bellman-Ford——解决负权边  

第4节  Bellman-Ford的队列优化  

第5节  最短路径算法对比分析

01-floyd-warshall

~~~c
#include <stdio.h>

int main() {
  int e[10][10];
  int k, i, j, n, m, t1, t2, t3;
  int inf = 99999999;
  scanf("%d %d", &n, &m);

  for (i = 1; i <= m; i++) {
    for (j = 1; j <= n; j++) {
      if (i == j) {
        e[i][j] = 0;
      }
      else {
        e[i][j] = inf;
      }
    }
  }

  for (i = 1; i <= m; i++) {
    scanf(("%d %d %d", &t1, &t2, &t3));
    e[t1][t2] = t3;
  }

  // important
  for (k = 1; k <= n; k++) {
    for (i = 1; i <= n; i++) {
      for (j = 1; j <= n; j++) {
        if (e[i][j] > e[i][k] + e[k][j]) {
          e[i][j] = e[i][k] + e[k][j];
        }
      }
    }
  }

  for (i = 1; i <= n; i++) {
    for (j = 1; j <= n; j++) {
      printf("%10d", e[i][j]);
    }
    printf("\n");
  }

  return 0;
}


~~~



02-dijkstra

~~~c
#include <stdio.h>

// 最短路径：单源最短路 Dijkstra 算法
int main() {
  int e[10][10];
  int dis[10];
  int book[10];
  int i, j, n, m, t1, t2, t3, u, v, min;
  int inf = 99999999;

  scanf("%d %d", &n, &m);

  for (i = 1; i <= n; i++) {
    for (j = 1; j <= n; j++) {
      if (i == j) {
        e[i][j] = 0;
      }
      else {
        e[i][j] = inf;
      }
    }
  }

  for (i = 1; i <= m; i++) {
    scanf("%d %d %d", &t1, &t2, &t3);
    e[t1][t2] = t3;
  }

  for (i = 1; i <= n; i++) {
    dis[i] = e[1][i];
  }

  for (i = 1; i <= n; i++) {
    book[i] = 0;
  }

  book[1] = 1;

  // important
  for (i = 1; i <= n - 1; i++) {
    min = inf;
    for (j = 1; j <= n; j++) {
      if (book[j] == 0 && dis[j] < min) {
        min = dis[j];
        u = j;
      }
    }
    book[u] = 1;
    for (v = 1; v <= n; v++) {
      if (e[u][v] < inf) {
        if (dis[v] > dis[u] + e[u][v]) {
          dis[v] = dis[u] + e[u][v];
        }
      }
    }
  }

  for (i = 1; i <= n; i++) {
    printf("%d", dis[i]);
  }

  getchar();
  return 0;
}


~~~



03-bellman-ford

~~~c
#include <stdio.h>

// 最短路径
int main() {
  int dis[10];
  int i, k, m, n, u[10], v[10], w[10];
  scanf("%d %d", &n, &m);

  for (i = 1; i <= m; i++) {
    scanf("%d %d %d", &u[i], &v[i], &w[i]);
  }

  // 这里有问题
  for (i = 1; i <= n; i++) {
    dis[i] = inf;
  }

  dis[1] = 0;

  // important
  for (k = 1; k <= n - 1; k++) {
    for (i = 1; i <= m; i++) {
      if (dis[v[i]] > dis[u[i]] + w[i]) {
        dis[v[i]] = dis[u[i]] + w[i];
      }
    }
  }
  for (i = 1; i <= n; i++) {
    printf("%d", dis[i]);
  }
  getchar();
  return 0;
}

~~~





04-bellman-ford-queue

~~~c

#include <stdio.h>

int main() {
  int n, m, i, j, k;
  int u[8], v[8], w[8];
  int first[6], next[8];
  int dis[6] = {0};
  int book[6] = {0};
  int que[101] = {0};
  int head = 1;
  int tail = 1;
  int inf = 99999999;

  scanf("%d %d", &n, &m);

  for (i = 1; i <= n; i++) {
    dis[i] = inf;
  }
  dis[1] = 0;

  for (i = 1; i <= n; i++) {
    book[i] = 0;
  }

  for (i = 1; i <= n; i++) {
    first[i] = -1;
  }

  for (i = 1; i <= m; i++) {
    scanf("%d %d %d", &u[i], &v[i], &w[i]);
    next[i] = first[u[i]];
    first[u[i]] = i;
  }

  que[tail] = 1;
  tail++;
  book[1] = 1;

  while (head < tail) {
    k = first[que[head]];
    while (k != -1) {
      if (dis[v[k]] > dis[u[k]] + w[k]) {
        dis[v[k]] = dis[u[k]] + w[k];
        if (book[v[k]] == 0) {
          que[tail] = v[k];
          tail++;
          book[v[k]] = 1;
        }
      }
      k = next[k];
    }
    book[que[head]] = 0;
    head++;
  }
  for (i = 1; i <= n; i++) {
    printf("%d", dis[i]);
  }
  getchar();
  return 0;
}

~~~

