var fs = require('fs');

// 自动获取 markdown 文件路径脚本（v3）
// 因为文档频繁改动，文件名和文件夹变化多，手动维护 mkdocs.yml 太麻烦，所以写了这个脚本
var default_list = [
  'frontend/docs',
  'backend/docs',
  'leetcode/docs',
  'book/docs',
  'personal/docs',
  'images/docs',
  'react/docs',
];

// 如果有传参，直接使用传参；否则使用默认全部的参数
var dirList = process.argv[2] ? [process.argv[2] + '/docs'] : default_list;

for (var i = 0; i < dirList.length; i++) {
  /**
   * Recursively iterates through files and folders to get the markdown file path
   * @param {array} files 
   * @param {string} father_path 
   * @returns null
   */
  var runNodes = function(files, father_path) {
    if (!Array.isArray(files)) {
      return;
    }
    const currentPath = father_path.replace('./' + dirList[i], '');
    res.push(currentPath);
    for (let i = 0; i < files.length; i++) {
      if (files[i] === '.DS_Store' || files[i] === 'Dockerfile') {
        continue;
      }
      if (files[i].includes('.md')) {
        let newPath = father_path + '/' + files[i];
        res.push(newPath);
      }
      if (!files[i].includes('.')) {
        let newPath = father_path + '/' + files[i];
        let newFiles = fs.readdirSync(newPath);
        runNodes(newFiles, newPath);
      }
    }
  }

  var path = './' + dirList[i];
  // check path valid (user input path may not valid)
  if (!fs.existsSync(path)) {
    console.log(`${path} is invalid`);
    continue;
  }
  var files = fs.readdirSync(path);
  var res = [];
  runNodes(files, path);

  // optimise path format and add enter 
  // './personal/docs/economy/xxx.md' to - 'xxx': 'economy/xxx.md'
  var result = '';
  for (let i = 0; i < res.length; i++) {
    // current item is markdown
    if (res[i][0] === '.') {
      let curr = res[i];
      curr = curr.replace(path + '/', '');
      let right = curr;
      let left = curr.slice(curr.lastIndexOf('/') + 1).replace('.md', '');
      let all = `        - '${left}': '${right}'\n`;
      result += all;
    }
    // current item is dir
    else {
      if (res[i].length > 0) {
        result += (`\n    - '${res[i].slice(1)}':\n`).replace(/[\']/ig, '');
      }
    }
  }
  fs.writeFileSync(dirList[i] + '.md', result);
  // push result to mkdock.yml end
  const setting_path = dirList[i].slice(0, dirList[i].indexOf('/')) + '/' + 'mkdocs.yml';
  let setting = fs.readFileSync(setting_path, 'utf8');
  setting += result;
  fs.writeFileSync(setting_path, setting);
}
