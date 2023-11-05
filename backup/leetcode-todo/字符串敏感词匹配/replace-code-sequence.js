// 问题：如果从第三方网站复制的代码，前面有序号，如何使用字符串算法去掉这部分序号？
let str = `
 1/**
 2 * 功能:基于数组的顺序栈
 3 * @author:Michael
 4 *
 5 */
`;

let res = '';
for (let i = 0; i < str.length; i++){
  res += str[i];
  // 我们知道，换行符的 Unicode 是10，那么遇到 10 之后，i += 2
  if (str.charCodeAt(i) === 10) {
    i += 2;
  }
}
console.log(res);

// todo
// 然后我们尝试使用 node 传参的形式处理进入的参数
// 我们把需要处理的字符串作为第二个参数传入试试，但是这样不支持换行（node终端换行直接执行脚本了，未来考虑一下）
// console.log(process.argv[2]);

// 最好直接读取一个文件，然后把每一行内容读取到
// 使用 fs.readFileSync 和 fs.writeFile 等读取文件
// 可以直接用 node 读取 md 文件，判断如果是代码片段，整体进行替换
