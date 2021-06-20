#!/bin/bash

# cat ./book/docs/res.md | while read line
# do
#     echo "- '$line': '$line'"
#     # 根据实际子目录确定这里的格式
# done

# todo change file

# dir: book
echo "book start------"
my_array=('' 'book-JS-The-good-parts' 'ebook-JS-basic' 'ebook-javascript-secret-garden' 'ebook-kaikeba-frontend' 'other' 'book-JS-primer-code-design' 'ebook-JSES6-RYF' 'ebook-jstraining-RYF' 'ebook-netease-senior-frontend')
# len=${#my_array[*]} 
for i in {0..10}
do
  str="${my_array[i]}"
  ls "./book/docs/${str}" | while read line
  do
    echo "- '$line': '${str}/$line'"
  done
  echo -e "\n"
done
echo "book end------"
echo -e "\n\n"
sleep 2

# dir personal
echo "personal start------"
ls ./personal/docs/old | while read line
do
  echo "- '$line': 'old/$line'"
done
ls ./personal/docs | while read line
do
  echo "- '$line': '$line'"
done
echo "personal end------"
echo -e "\n\n"
sleep 2

# dir leetcode
echo "leetcode start------"
ls ./leetcode/docs/algre | while read line
do
  echo "- '$line': 'algre/$line'"
done
ls ./leetcode/docs/interview | while read line
do
  echo "- '$line': 'interview/$line'"
done
echo "leetcode end------"
echo -e "\n\n"
sleep 2


# dir backend
echo "backend start------"
ls ./backend/docs/nodejs | while read line
do
  echo "- '$line': 'nodejs/$line'"
done
ls ./backend/docs/python | while read line
do
  echo "- '$line': 'python/$line'"
done
ls ./backend/docs/backend-sql | while read line
do
  echo "- '$line': 'backend-sql/$line'"
done
ls ./backend | while read line
do
  echo "- '$line': '$line'"
done
echo "backend end------"
echo -e "\n\n"
sleep 2


# frontend
# array and loop
echo "frontend start------"
my_array=('' 'about' 'git' 'javascript' 'netease' 'project' 'react' 'typescript')
# len=${#my_array[*]} 
for i in {0..9}
do
  str="${my_array[i]}"
  ls "./frontend/docs/${str}" | while read line
  do
    echo "- '$line': '${str}/$line'"
  done
  echo -e "\n"
done

# some dir is unique(特殊目录，待整理)
ls ./frontend/docs/react/react-all/中文文档全部 | while read line
do
  echo "- '$line': 'react/react-all/中文文档全部/$line'"
done
ls ./frontend/docs/react/react-all/英文文档 | while read line
do
  echo "- '$line': 'react/react-all/英文文档/$line'"
done
ls ./frontend/docs/react/react-all/react-dnd | while read line
do
  echo "- '$line': 'react/react-all/react-dnd/$line'"
done

# 还有下面几个目录未覆盖，未来处理
# - react/react-all/中文文档/2-10 状态提升.md
# - react/react-all/中文文档/2-11 组合 vs 继承.md
# - react/react-all/中文文档/2-12 React 哲学.md
# - react/react-all/中文文档/2-4 组件 & Props.md
# - react/react-all/中文文档/2-5 State & 生命周期.md
# - react/react-all/中文文档/2-6 事件处理.md
# - react/react-all/中文文档/2-7 条件渲染.md
# - react/react-all/中文文档/2-8 列表 & Keys.md
# - react/react-all/中文文档/2-9 表单.md
# - react/react-all/中文文档/readme.md
# - react/react-all/视频教程-传智播客/React入门.md
# - react/react-all/视频教程-技术胖/React 视频教程.md
# - react/react-all/视频教程-技术胖/demo/README.md 

echo "frontend end------"
echo -e "\n\n"
