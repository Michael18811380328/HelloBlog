03 enumeration

## 第3章  枚举！很暴力

第1节  坑爹的奥数：使用枚举方法，依次找到满足等式的几个式子

第2节  炸弹人：二维数组遍历判断最值

第3节  火柴棍等式：尽量使用数学计算，减少循环的层数

第4节  数的全排列：使用回溯算法，可以优化全排列（深度优先算法）

01-math

~~~c
#include <stdio.h>

// 奥数题目(xxx + xxx = xxx)使用 1-9 填充这个等式
int main() {
  int a[10], book[10];
  int total = 10;
  int i, sum;
  // 使用 a[1] - a[9] 表示九个数字
  for (a[1] = 1; a[1] <= 9; a[1]++) {
    for (a[2] = 1; a[2] <= 9; a[2]++) {
      for (a[3] = 1; a[3] <= 9; a[3]++) {
        for (a[4] = 1; a[4] <= 9; a[4]++) {
          for (a[5] = 1; a[5] <= 9; a[5]++) {
            for (a[6] = 1; a[6] <= 9; a[6]++) {
              for (a[7] = 1; a[7] <= 9; a[7]++) {
                for (a[8] = 1; a[8] <= 9; a[8]++) {
                  for (a[9] = 1; a[9] <= 9; a[9]++) {
                    // 初始化 book 数组
                    for (i = 1; i <= 9; i++) {
                      book[i] = 0;
                    }
                    for (i = 1; i <= 9; i++) {
                      book[a[i]] = 1;
                    }
                    // 计算出现的个数
                    sum = 0;
                    for (i = 1; i <= 9; i++) {
                      sum += book[i];
                    }
                    if (sum == 9 && a[1] * 100 + a[2] * 10 + a[3] + a[4] * 100 + a[5] * 10 + a[6] == a[7] * 100 + a[8] * 10 + a[9]) {
                      total++;
                      printf("%s", "ok");
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  // A + B = C 可能 A 和 B 换一个位置，所以总和除以2
  printf("total is %d", total / 2);
  getchar();
  return 0;
}

~~~

02-boom

~~~c
#include <stdio.h>

int main() {
  char a[20][21];
  int i, j, sum, map = 0, p, q, x, y, n, m;
  // 输入N行M列
  scanf("%d %d", &n, &m);

  for (i = 0; i <= n - 1; i++) {
    scanf("%s", a[i]);
  }

  // 双重枚举遍历矩阵
  for (i = 0; i < n; i++) {
    for (j = 0; j < m; j++) {
      if (a[i][j] == '.') {
        sum = 0;

        // 向上统计
        x = i;
        y = j;
        while (a[x][y] != '#') {
          if (a[x][y] == 'G') {
            sum++;
          }
          x--;
        }
        // 向下统计
        x = i;
        y = j;
        while (a[x][y] != '#') {
          if (a[x][y] == 'G') {
            sum++;
          }
          x++;
        }
        // 向左向右
        x = i;
        y = j;
        while (a[x][y] != '#') {
          if (a[x][y] == 'G') {
            sum++;
          }
          y++;
        }
        x = i;
        y = j;
        while (a[x][y] != '#') {
          if (a[x][y] == 'G') {
            sum++;
          }
          y--;
        }

        if (sum > map) {
          map = sum;
          p = i;
          q = j;
        }
      }
    }
  }
  printf("The position is (%d, %d), we can boom %d enemies", p, q, map);
  getchar();
  return 0;
}

~~~

03-match-equation

~~~c
#include <stdio.h>

// 辅助函数：判断一个数字需要多少火柴
int fun(int x) {
  int num = 0;
  // 这里存储0-9对应的火柴数量
  int f[10] = {6, 2, 5, 5, 4, 5, 6, 3, 7, 6};
  while (x / 10 != 0) {
    num += f[x % 10];
    x = x / 10;
  }
  num += f[x];
  return num;
}

int main() {
  int a, b, c, m, sum = 0;
  scanf("%d", &m);
  // 输入M根火柴
  for (a = 0; a <= 1111; a++) {
    for (b = 0; b <= 1111; b++) {
      c = a + b;
      // 加号和等于号消耗4根火柴
      if (fun(a) + fun(b) + fun(c) + 4 == m) {
        printf("%d + %d = %d", a, b, c);
        sum++;
      }
    }
  }
  // 一共有 sum 个等式
  printf("%d", sum);
  getchar();
  return 0;
}

~~~

