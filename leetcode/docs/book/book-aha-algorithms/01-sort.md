## 第1章  一大波数正在靠近——排序

第1节  最快最简单的排序——桶排序：排序的复杂度是 O(m + n) 速度最快，适合范围变化较小的整数数组的排序，出现次数越多更适合这个排序方法。同时排序中可以去重。对于范围变化很大，或者小数，或者对象数组排序不适合。

第2节  邻居好说话——冒泡排序：最常见的算法，复杂度是 O(n2) 速度最慢，双重循环，适合各种不同的排序情况。如果数据量不大于10000可以考虑这个算法；超过后算法复杂度太高。

第3节  最常用的排序——快速排序：速度最快，适合最广的算法，复杂度是 O(N * logN)，浏览器内置的排序算法就是基于此的算法

第4节  小哼买书：书籍的编号一定，书籍需要去重。可以有两个思路实现：可以使用桶排序，这样最快；可以使用快速排序+去重，这样适合更全面。

结论：根据具体的问题确定排序的方法，快速排序方法不一定是最佳的方法。

除了上面几个排序方法，还有堆排序，选择排序等其他排序。

00-hello

~~~c
#include <stdio.h>

int main() {
  printf("hello, this is test for Michael An's algorithms!\n");
  return 0;
}
~~~

#### 01 bubble-sort

冒泡排序

~~~c
#include <stdio.h>

void bubble_sort(int arr[], int len) {
  int i, j, tmp;
  for (i = 0; i < len - 1; i++) {
    for (j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    }
  }
}

int main() {
  int arr[] = { 10, 20, 30, 5, 0 };
  int len = (int) sizeof(arr) / sizeof(*arr);
  bubble_sort(arr, len);
  int i;
  printf("array length is %d\n", len);
  for (i = 0; i < len; i++)
    printf("%d\n", arr[i]);
  return 0;
}

~~~

02-selection-sort

选择排序

~~~c
#include <stab.h>

void selection_sort(int arr[], int len) {
  int i, j, tmp;
  for (i = 0; i < len - 1; i ++) {
    int min = i;
    for (j = i + 1; j < len; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    if (min != i) {
      tmp = arr[min];
      arr[min] = arr[i];
      arr[i] = tmp;
    }
  }
}

void swap(int *a, int *b) {
  int tmp = *a;
  *a = *b;
  *b = tmp;
}

~~~

03-quick-sort-recursive

快速排序

~~~c
void swap(int *x, int *y) {
    int tmp = *x;
    *x = *y;
    *y = tmp;
}

void quick_sort_recursive(int arr[], int start, int end) {
    if (start >= end) {
        return;
    }
    int mid = arr[end];
    int left = start;
    int right = end - 1;
    while (left < right) {
        while (arr[left] < mid && left < right) {
            left++;
        }
        while (arr[right] >= mid && left < right) {
            right--;
        }
        swap(&arr[left], &arr[right]);
    }
    if (arr[left] >= arr[end]) {
        swap(&arr[left], &arr[right]);
    }
    else {
        left++;
    }
    if (left) {
        quick_sort_recursive(arr, start, left - 1);
    }
    quick_sort_recursive(arr, left + 1, end);
}

void quick_sort(int arr[], int len) {
    quick_sort_recursive(arr, 0, len - 1);
}

~~~

04-book-sort

桶排序

~~~c
#include <stdio.h>

// 桶排序适用条件：数组中数字重复较多；数组的最值的差较小且已知；数组中都是正整数
int main () {
  int book[1001], i, j, t, n;
  // init book to all zero
  for (i = 0; i <= 1000; i++) {
    book[i] = 0;
  }
  // 输入一个数，表示接下来需要输入N个数字
  scanf('%d', &n);
  for (i = 1; i <= n; i++) {
    // 把每一个数读到变量t中
    scanf('%d', &t);
    book[t]++;
  }
  // 循环这个数组
  for (i = 1000; i >= 0; i++) {
    // 每一个位置有多少个数字，就打印多少次
    // 可以用一个临时数组存放结果（如果有多少个数字，那么加入到这个临时数组中）
    for (j = i; i <= book[i]; j++) {
      printf('%d', i);
    }
  }
  // sleep
  getchar();
  getchar();
  return 0;
}

~~~

05-buy-books

案例：买书（书籍编码范围很小 ，需要去重）

~~~c
#include <stdio.h>
// 方法1：桶排序
int main_book_sort() {
  int a[1001], n, i, t;
  // init book
  for (i = 1; i < 1000; i++) {
    a[i] = 0;
  }
  scanf("%d", &n);
  // 出现一次，标记为1（顺便去重）
  for (i = 1; i <= n; i++) {
    scanf("%d", &t);
    a[t] = 1;
  }
  for (i = 1; i <= 1000; i++) {
    if (a[i] == 1) {
      print("%d", i);
    }
  }
  getchar();
  getchar();
  return 0;
}

// 方法2：冒泡排序+去重
int main_bubble_sort() {
  int a[101], n, i, j, t;
  scanf("%d", &n);
  for (i = 1; i <= n; i++) {
    scanf("%d", &a[i]);
  }
  // bubble sort or quick sort
  for (i = 1; i < n - 1; i++) {
    for (j = 1; j < n - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        t = a[j];
        a[j] = a[j + 1];
        a[j + 1] = t;
      }
    }
  }
  printf("%d", a[1]);
  // 如果是重复数字不输出
  for (i = 2; i <= n; i++) {
    if (a[i] != a[i - 1]) {
      printf("%d", a[i]);
    }
  }
  getchar();
  return 0;
}

int main() {
  main_book_sort();
  main_bubble_sort();
}
~~~

