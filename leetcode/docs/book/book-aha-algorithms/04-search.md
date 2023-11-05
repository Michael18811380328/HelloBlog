## 第4章  万能的搜索

第四章内容较多（60页）是本书的核心章节

第1节  不撞南墙不回头——深度优先搜索  

第2节  解救小哈  

第3节  层层递进——广度优先搜索  

第4节  再解炸弹人  

第5节  宝岛探险  

第6节  水管工游戏

01-dfs

~~~c
#include <stdio.h>

int a[10], book[10], n;
// 注：C语言全局变量默认的值是0， 这里的 Book 默认都是0

// 扑克牌排列组合
void dfs(int step) {
  int i;
  // 如果已经到n+1，那么满足条件，打印并返回
  if (step == n + 1) {
    for (i = 1; i <= n; i++) {
      printf("%d", a[i]);
    }
    printf("\n");
    return;
  }
  // 开始深度优先遍历
  for  (i = 1; i <= n; i++) {
    if (book[i] == 0) {
      a[step] = i;
      book[i] = 1;
      dfs(step + 1);
      book[i] = 0;
    }
  }
  return;
}

int main() {
  scanf("%d", &n);
  dfs(1);
  getchar();
  return 0;
}

~~~

02-dfs-number

~~~c
#include <stdio.h>

int a[10], book[10], total = 0;

void dfs(int step) {
  int i;
  if (step == 10) {
    if (a[1] * 100 + a[2] * 10 + a[3] + a[4] * 100 + a[5] * 10 + a[6] == a[7] * 100 + a[8] * 10 + a[9]) {
      total++;
      // 满足条件的数组a，可以打印出来
    }
    return;
  }
  for (i = 1; i < 10; i++) {
    if (book[i] == 0) {
      a[step] = i;
      book[i] = 1;
      dfs(step + 1);
      book[i] = 0;
    }
  }
  return;
}

int main() {
  dfs(1);
  // 会重复出现两次，所以这里除以2
  printf("total = %d", total / 2);
  return 0;
}

~~~

03-maze.c

~~~c
#include <stdio.h>

// 迷宫（二维数组）
// 需要判断当前位置是否已经走过(走过就标记一下)
int n, m, p, q, min = 99999999;
int a[51][51], book[51][51];

void dfs(int x, int y, int step) {
  // 这里使用矩阵存储下一步的四个方向(上下左右)
  int next[4][2] = {
    {0, 1},
    {1, 0},
    {0, -1},
    {-1, 0}
  };
  int tx, ty, k;
  // 判断是否到达
  if (x == p && y == q) {
    if (step < min) {
      min = step;
    }
    return;
  }
  // 枚举四种走法
  for (k = 0; k < 4; k++) {
    tx = x + next[k][0];
    ty = y + next[k][1];
    // 判断是否越界
    if (tx < 1 || tx > n || ty < 1 || ty > m) {
      continue;
    }
    // 当前的点没有走过，当前不是障碍物，那么 dfs
    if (a[tx][ty] == 0 && book[tx][ty] == 0) {
      book[tx][ty] = 1;
      dfs(tx, ty, step + 1);
      book[tx][ty] = 0;
    }
  }
  return;
}

int main() {
  int i, j, startx, starty;
  scanf("%d %d", &n, &m);
  for (i = 1; i <= n; i++) {
    for (j = 1; j <= m; j++) {
      scanf("%d", &a[i][j]);
    }
  }
  scanf("%d %d %d %d", &startx, &starty, &p, &q);

  book[startx][starty] = 1;
  dfs(startx, starty, 0);
  printf("%d", min);
  getchar();
  getchar();
  return 0;
}

~~~

04-bfs

~~~c
#include <stdio.h>

// 横坐标、纵坐标、父节点在队列中的编号、步数
struct node {
  int x;
  int y;
  int f;
  int s;
};

// 广度优先算法实现走迷宫（电路板布线）
int main() {
  // 地图是50*50，所以队列不会超过2500个
  struct node que[2501];
  int next[4][2] = {0};
  int book[51][51] = {0};
  next[4][2] = {
    {0, 1},
    {1, 0},
    {0, -1},
    {-1, 0},
  };
  int head, tail;
  int i, j, k, n, m, startx, starty, p, q, tx, ty, flag;
  scanf("%d %d", &n, &m);
  for (i = 1; i <= n; i++) {
    for (j = 1; j <= m; j++) {
      scanf("%d", &a[i][j]);
    }
  }
  scanf("%d %d %d %d", &startx, &starty, &p, &q);

  // init queue
  head = 1;
  tail = 1;
  que[tail].x = startx;
  que[tail].y = starty;
  que[tail].f = 0;
  que[tail].s = 0;
  tail++;
  book[startx][starty] = 1;

  flag = 0;
  while (head < tail) {
    for (k = 0; k <= 3; k++) {
      tx = que[head].x + next[k][0];
      ty = que[head].y + next[k][1];
      if (tx < 1 || tx > n || ty < 1 || ty > m) {
        continue;
      }
      // 标记已经走过这个点
      if (a[tx][ty] == 0 && book[tx][ty] == 0) {
        book[tx][ty] = 1;
        que[tail].x = tx;
        que[tail].y = ty;
        que[tail].f = head;
        que[tail].s = que[head].s + 1;
        tail++;
      }
      // 找到目标
      if (tx == p && ty == q) {
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
  getchar();
  return 0;
}

~~~

05-boom-man-bfs

~~~c
#include <stdio.h>

// 坐标点
struct note {
  int x;
  int y;
};

// map
char a[20][20];

// 辅助函数：获取一个点可以炸掉的敌人
int getnum(int i, int j) {
  int sum, x, y;
  sum = 0;
  // 遍历上下左右可以消灭的敌人个数
  x = i, y = j;
  while (a[x][y] != '#') {
    if (a[x][y] == 'G') {
      sum++;
    }
    x--;
  }

  x = i, y = j;
  while (a[x][y] != '#') {
    if (a[x][y] == 'G') {
      sum++;
    }
    x++;
  }

  x = i, y = j;
  while (a[x][y] != '#') {
    if (a[x][y] == 'G') {
      sum++;
    }
    y--;
  }

  x = i, y = j;
  while (a[x][y] != '#') {
    if (a[x][y] == 'G') {
      sum++;
    }
    y++;
  }
  return sum;
}

int main() {
  // 20 * 20 = 400
  struct note que[401];
  int head, tail;
  int book[20][20] = {0};
  int i, j, k, sum, max = 0, mx, my, n, m, startx, starty, tx, ty;

  int next[4][2] = {
    {0, 1},
    {1, 0},
    {0, -1},
    {-1, 0},
  };
  scanf("%d %d %d %d", &n, &m, &startx, &starty);
  for (i = 0; i <= n - 1; i++) {
    scanf("%d", a[i]);
  }

  // init queue
  head = 1;
  tail = 1;
  que[tail].x = startx;
  que[tail].y = starty;
  tail++;
  book[startx][starty] = 1;
  max = getnum(startx, starty);
  mx = startx;
  my = starty;

  while (head < tail) {
    for (k = 0; k <= 3; k++) {
      tx = que[head].x + next[x][0];
      ty = que[hrad].y + next[x][1];
      // 越界处理
      if (tx < 0 || tx > n - 1 || ty < 0 || ty > m - 1) {
        continue;
      }
      // 如果当前满足条件
      if (a[tx][ty] == '.' && book[tx][ty] == 0) {
        book[tx][ty] = 1;
        que[tail].x = tx;
        que[tail].y = ty;
        tail++;
        // 获取当前的消灭敌人的数量
        sum = getnum(tx, ty);
        if (sum > max) {
          max = sum;
          mx = tx;
          my = ty;
        }
      }
    }
    head++;
  }
  // 这是最终的位置
  printf("%d, %d, %d", mx, my, max);
  getchar();
  return 0;
}

~~~

06-boom-man-dfs

~~~c
#include <stdio.h>

char a[20][21];
int book[20][20], max, mx, my, n, m;

int getnum(int i, int j) {
  int sum = 0, x, y;
  x = i, y = j;
  while (a[x][y] != '#') {
    if (a[x][y] == 'G') {
      sum++;
    }
    x--;
  }

  x = i, y = j;
  while (a[x][y] != '#') {
    if (a[x][y] == 'G') {
      sum++;
    }
    x++;
  }

  x = i, y = j;
  while (a[x][y] != '#') {
    if (a[x][y] == 'G') {
      sum++;
    }
    y--;
  }

  x = i, y = j;
  while (a[x][y] != '#') {
    if (a[x][y] == 'G') {
      sum++;
    }
    y++;
  }
  return sum;
}

void dfs(int x, int y) {
  int next[2][4] = {
    {0, 1},
    {1, 0},
    {0, -1},
    {-1, 0},
  };
  int k, sum, tx, ty;

  sum = getnum(x, y);

  if (sum > max) {
    max = sum;
    mx = x;
    my = y;
  }

  for (k = 0; k <= 3; k++) {
    tx = x + next[k][0];
    ty = y + next[k][1];
    if (tx < 0 || tx > n - 1 || ty < 0 || ty > m - 1) {
      continue;
    }
    if (a[tx][ty] == '.' && book[tx][ty] == 0) {
      book[tx][ty] = 1;
      dfs(tx, ty);
    }
  }
  return;
}

int main() {
  int i, startx, starty;
  scanf("%d %d %d %d", &n, &m, &startx, &starty);
  for (i = 0; i <= n - 1; i++) {
    scanf("%d", a[i]);
  }
  book[startx][starty] = 1;
  max = getnum(startx, starty);
  mx = startx;
  my = starty;
  dfs(startx, starty);
  getchar();
  return 0;
}

~~~

07-island

~~~c
#include <stdio.h>

struct note {
  int x;
  int y;
};

int bfs_main() {
  struct note que[2501];
  int head, tail;
  int a[50][51];
  int book[50][51] = 0;
  int i, j, k, sum, max = 0, mx, my, n, m, startx, starty, tx, ty;
  
  int next[2][4] = {
    {0, 1},
    {1, 0},
    {0, -1},
    {-1, 0},
  };

  scanf("%d %d %d %d", &n, &m, &startx, &starty);
  for (i = 0; i <= n - 1; i++) {
    scanf("%d", a[i]);
  }

  // init queue
  head = 1;
  tail = 1;
  que[tail].x = startx;
  que[tail].y = starty;
  tail++;
  book[startx][starty] = 1;
  sum = 1;

  while (head < tail) {
    for (k = 0; k <= 3; k++) {
      tx = que[head].x + next[k][0];
      ty = que[head].y + next[k][1];
      if (tx < 1 || tx > n || ty < 1 || ty > m) {
        continue;
      }
      if (a[tx][ty] > 0 && book[tx][ty] == 0) {
        sum++;
        book[tx][ty] = 1;
        que[tail].x = tx;
        que[tail].y = ty;
        tail++;
      }
    }
    head++;
  }
  printf("%d", sum);
  getchar();
  return 0;
}

// dfs: 染色法
int a[51][51], book[51][51], n, m, sum;

void dfs(int x, int y, int color) {
  int next[2][4] = {
    {0, 1},
    {1, 0},
    {0, -1},
    {-1, 0},
  };
  int k, tx, ty;
  // 遍历过的点进行着色（-1）
  a[x][y] = color;
  for (k = 0; k <= 3; k++) {
    tx = x + next[k][0];
    ty = y + next[k][1];
    if (tx < 0 || tx > n || ty < 0 || ty > m) {
      continue;
    }
    if (a[tx][ty] > 0 && book[tx][ty] == 0) {
      sum++;
      book[tx][ty] = 1;
      dfs(tx, ty, color);
    }
  }
  return;
}

int dfs_main() {
  int i, j, startx, starty;
  scanf("%d %d %d %d", &n, &m, &startx, &starty);
  for (i = 0; i <= n - 1; i++) {
    scanf("%d", a[i]);
  }
  book[startx][starty] = 1;
  sum = 1;

  dfs(startx, starty, -1);

  for (i = 1; i <= n; i++) {
    for (j = 1; j <= m; j++) {
      // %3d 表示C语言中场宽
      printf("%3d", a[i][j]);
    }
    printf("\n");
  }
  getchar();
  return;
}

int main() {
  bfs_main();
  dfs_main();
}

~~~

08.pipe

~~~c
#include <stdio.h>

int a[51][51];
int book[51][51];
int n, m, flag = 0;

struct note {
  int x;
  int y;
}s[100];

int top = 0;

void dfs(int x, int y, int front) {
  int i;
  // 判断是否到达终点：attention: m + 1
  if (x == n && y == m + 1) {
    flag = 1;
    for (i = 0; i <= top; i++) {
      printf("%d %d", s[i].x, s[i].y);
      return;
    }
  }

  if ( x < 1 || y < 1 || x > n || y > m) {
    return;
  }

  if (book[x][y] == 1) {
    return;
  } 

  book[x][y] = 1;

  top++;
  s[top].x = x;
  s[top].y = y;
  
  // 水管是直的
  if (a[x][y] >= 5 && a[x][y] <= 6) {
    // 进水口左边(只能使用5号摆放方法，插图见书上)
    if (front == 1) {
      dfs(x, y + 1, front);
    }
    // 上边
    if (front == 2) {
      dfs(x + 1, y, front);
    }
    // 右边
    if (front == 3) {
      dfs(x, y - 1, front);
    }
    // 下边
    if (front == 4) {
      dfs(x, y + 1, front);
    }
  }

  // 水管是弯的(1234)
  if (a[x][y] > 0 && a[x][y] < 5) {
    // 进水口左边(只能使用3-4号摆放方法)
    if (front == 1) {
      dfs(x + 1, y, 2);
      dfs(x - 1, y, 4);
    }
    if (front == 2) {
      dfs(x, y + 1, 1);
      dfs(x, y - 1, 3);
    }
    if (front == 3) {
      dfs(x - 1, y, 4);
      dfs(x + 1, y, 2);
    }
    if (front == 4) {
      dfs(x, y + 1, 1);
      dfs(x, y - 1, 3);
    }
  }
  // 回溯完毕，设置节点是0
  book[x][y] = 0;
  top--;
  return;
}

int main() {
  int i, j, num = 0;
  scanf("%d %d", &n, &m);
  for (i = 0; i < n; i++) {
    for (j = 0; j < m; j++) {
      scanf("%d", &a[i][j]);
    }
  }
  dfs(1, 1, 1);
  if (flag == 0) {
    printf("error");
  }
  getchar();
  return 0;
}

~~~
