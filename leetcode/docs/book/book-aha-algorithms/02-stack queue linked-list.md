02 stack queue linked-list

## 第2章  栈、队列、链表  

第1节  解密QQ号——队列：queue，FIFO 先进先出。结构体由一个数组，开始的指针，结束的指针组成。支持增加和减少。减少时，头指针加一；增加时，尾指针增加一，前一个的值是新的值。

第2节  解密回文——栈：stack 只需要存储一个数组和一个顶点指针。FILO 先进后出，操作顶部指针即可。

第3节  纸牌游戏——小猫钓鱼：队列和栈的综合应用

第4节  链表：C语言中通过指针实现链表（需要一部分深入C语言语法）

  指针用途：存储一个地址

  &：取地址符号（获取指针的地址）

  *：三个用途（乘号；声明指针变量（int *q）； 间接访问运算符(printf("%d", *p))）

  malloc: 从内存中申请分配指定字节的大小的内存空间, p = (int *)malloc(sizeof(int))

  malloc 函数返回的是 void * 类型，可以强制转换成其他类型的指针

  指针变量存储的是一个内存地址的首地址，但是这个空间占用多少字节，存储什么数据类型，需要由指针的数据类型标明

  -> 叫做结构体指针运算符（因为指针指向结构体，不能使用 . 访问内部成员，只能使用 -> 访问）

第5节  模拟链表：使用两个数组模拟链表和指针（数据数组和指针数组实现）

01-queue

~~~c
#include <stdio.h> 

int main() {
  int q[102] = {0, 6, 3, 1, 7, 5, 8, 9, 2, 4};
  int head, tail;
  head = 1;
  // queue 中有9个值，所以尾指针指向10
  tail = 10;
  while (head < tail) {
    // 删除奇数元素
    printf("%d", q[head]);
    head++;
    // 把偶数元素移动到尾部
    q[tail] = q[head];
    tail++;
    head++;
  }
  getchar();
  getchar();
  return 0;
}

~~~

02-queue-struct

~~~c
#include <stdio.h>

struct queue {
  int data[100];
  int head;
  int tail;
};

int main() {
  struct queue q;
  int i;
  q.head = 1;
  q.tail = 1;
  
  // init queue
  for (i = 1; i <= 9; i++) {
    scanf("%d", &q.data[q.tail]);
    q.tail++;
  }

  // move and delete number
  while (q.head < q.tail) {
    printf("%d", q.data[q.head]);
    q.head++;

    q.data[q.tail] = q.data[q.head];
    q.head++;
    q.tail++;
  }

  getchar();
  getchar();
  return 0;
}
~~~

03-stack.c

~~~c
#include <stdio.h>
#include <string.h>

int main() {
  char a[101], s[101];
  int i, len, mid, next, top;

  gets(a); // 读入一行字符串
  len = strlen(a);
  mid = len / 2 - 1;

  top = 0;
  for (i = 0; i < mid; i++) {
    s[top] = a[i];
    top++;
  }

  if (len % 2 == 0) {
    next = mid + 1;
  }
  else {
    next = mid + 2;
  }

  for (i = next; i < len - 1; i++) {
    if (a[i] != s[top]) {
      break;
    }
    top--;
  }

  char x = 't';
  char y = 'f';
  if (top == 0) {
    printf("%c", x);
  }
  else {
    printf("%c", y);
  }

  return 0;
}

~~~

04-cat-and-fish

~~~c
#include <stdio.h>

struct queue {
  int data[100];
  int head;
  int tail;
};

struct stack {
  int data[10];
  int top;
};

int main() {
  struct queue q1, q2;
  struct stack s;
  int book[10];
  int i, t;

  // init queue
  q1.head = 1;
  q1.tail = 1;
  q2.head = 1;
  q2.tail = 1;

  // init stack
  s.top = 0;

  // init array (cards in desk) no card i is 0, has card i is 1
  for (i = 0; i < 10; i++) {
    book[i] = 0;
  }

  // each user has 6 cards
  for (i = 1; i <= 6; i++) {
    scanf("%d", &q1.data[q1.tail]);
    q1.tail++;
    scanf("%d", &q2.data[q2.tail]);
    q2.tail++;
  }

  while (q1.head < q1.tail && q2.head < q2.tail) {
    t = q1.data[q1.head];
    // check if there is a card is equal with q1 head
    if (book[t] == 0) {
      q1.head++;
      s.top++;
      s.data[s.top] = t;
      book[t] = 1;
    }
    // 如果桌面上已经有这张牌
    else {
      // 先把打出的这张牌收回到末尾
      q1.head++;
      q1.data[q1.tail] = t;
      q1.tail++;
      // 然后遍历桌面上的纸牌，放到队列尾部，并取消标记
      while (s.data[s.top] != t) {
        book[s.data[s.top]] = 0;
        q1.data[q1.tail] = s.data[s.top];
        q1.tail++;
        s.top--;
      }
      // 收回桌面上牌面为t的牌
      book[s.data[s.top]] = 0;
      q1.data[q1.tail] = s.data[s.top];
      q1.tail++;
      s.top--;
    }

    // 如果开始等于结束，证明手中无牌，结束
    if (q1.head == q1.tail) {
      break;
    }

    // 另一个人
    t = q2.data[q2.head];
    // check if there is a card is equal with q2 head
    if (book[t] == 0) {
      q2.head++;
      s.top++;
      s.data[s.top] = t;
      book[t] = 1;
    }
    // 如果桌面上已经有这张牌
    else {
      // 先把打出的这张牌收回到末尾
      q2.head++;
      q2.data[q2.tail] = t;
      q2.tail++;
      // 然后遍历桌面上的纸牌，放到队列尾部，并取消标记
      while (s.data[s.top] != t) {
        book[s.data[s.top]] = 0;
        q2.data[q2.tail] = s.data[s.top];
        q2.tail++;
        s.top--;
      }
      // 收回桌面上牌面为t的牌
      book[s.data[s.top]] = 0;
      q2.data[q2.tail] = s.data[s.top];
      q2.tail++;
      s.top--;
    }
  }
  // 结束游戏判断
  if (q2.head == q2.tail) {
    for (i = q1.head; i < q1.tail; i++) {
      printf("%d", q1.data[i]);
    }
    if (s.top > 0) {
      for (i = 0; i < s.top; i++) {
        printf("%d", s.data[i]);
      }
    }
    else {
      printf("There is no card in dest");
    }
  }
  else {
    for (i = q2.head; i < q2.tail; i++) {
      printf("%d", q2.data[i]);
    }
    if (s.top > 0) {
      for (i = 0; i < s.top; i++) {
        printf("%d", s.data[i]);
      }
    }
    else {
      printf("There is no card in dest");
    }
  }

  getchar();
  getchar();
  return 0;
}

~~~

05-linked-list

~~~c
#include <stdio.h>
#include <stdlib.h>

// 辅助函数：指针基本知识
int pointer_foo() {
  int a = 10;
  int *p;
  // 指针B指向A，那么通过指针B即可访问变量A的值
  p = &a;
  printf("%d", *p);
  return 0;
}

// 辅助函数：动态开辟指针内存
int malloc_foo() {
  int *p;
  // 设置指针获取动态分配的内存地址
  p = (int *)malloc(sizeof(int));
  // 指针所存储的内存空间中存10
  *p = 10;
  printf("%d", *p);
  return 0;
}

// 结构体表示链表的节点类型
struct node {
  int data;
  // 声明一个指针，指向下一个 node 节点的指针
  struct node *next;
};

// 主函数
int main() {
  struct node *head, *p, *q, *t;
  int i, n, a;

  scanf("%d", &n);
  
  // 设置头指针初始为空
  head = NULL;
  for (i = 1; i <= n; i++) {
    scanf("%d", &a);
    // 动态申请临时节点
    p = (struct node *)malloc(sizeof(struct node));
    p -> data = a;
    p -> next = NULL;

    // 如果链表是空，那么就把头指针指向这个节点
    if (head == NULL) {
      head = p;
    }
    // 如果不是空链表，那么把前一个节点(q)的指针，指向当前节点(p)
    // 然后把当前节点变成前一个节点（q）
    else {
      q -> next = p;
      q = p;
    }
  }

  // 读入输入的数字（新加入的数字，放在临时变量a中）
  scanf("%d", &a);
  // 遍历链表，找到合适的插入位置
  t = head;
  while (t != NULL) {
    // 如果遍历到结尾，或者某个节点的值大于a
    // 那么把A节点插入其中（改变指针的指向）
    if (t -> next == NULL || t -> next -> data > a) {
      p = (struct node *)malloc(sizeof(struct node));
      p -> data = a;
      p -> next = t -> next;
      t -> next = p;
      break;
    }
    t = t -> next;
  }
  // 打印插入后的链表
  t = head;
  while (t != NULL) {
    printf("%d", t -> data);
    t = t -> next;
  }
  getchar();
  getchar();
  return 0;
}

~~~

06-linked-list-array

~~~c
#include <stdio.h>

// use two array to generate linked list
int main() {
  int data[101], right[101];
  int i, n, t, len;

  // init data array
  scanf("%d", &n);
  for (i = 1; i <= n; i++) {
    scanf("%d", &data[i]);
  }
  len = n;

  // init right pointer array
  for (i = 1; i <= n; i++) {
    if (i != n) {
      right[i] = i + 1;
    }
    else {
      right[i] = 0;
    }
  }

  // 直接把新加入的数组，放在数据数组的最后一位
  len++;
  scanf("%d", &data[len]);

  // 然后改变指针数组
  t = 1;
  while (t != 0) {
    if (data[right[t]] > data[len]) {
      right[len] = right[t];
      right[t] = len;
      break;
    }
    t = right[t];
  } 
  // print linked list
  t = 1;
  while (t != 0) {
    printf("%d", data[t]);
    t = right[t];
  }
  getchar();
  return 0;
}

~~~

