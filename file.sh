#!/bin/bash

# cat ./book/docs/res.md | while read line
# do
#     echo "- '$line': '$line'"
#     # 根据实际子目录确定这里的格式
# done

# todo change file

# dir: book
# echo "book start------"
# my_array=('' 'book-JS-The-good-parts' 'ebook-JS-basic' 'ebook-javascript-secret-garden' 'ebook-kaikeba-frontend' 'other' 'book-JS-primer-code-design' 'ebook-JSES6-RYF' 'ebook-jstraining-RYF' 'ebook-netease-senior-frontend' 'third-part-lib')
# # len=${#my_array[*]} 
# for i in {0..10}
# do
#   str="${my_array[i]}"
#   ls "./book/docs/${str}" | while read line
#   do
#     echo "- '$line': '${str}/$line'"
#   done
#   echo -e "\n"
# done
# echo "book end------"
# echo -e "\n\n"
# sleep 2

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
ls ./personal/docs/other | while read line
do
  echo "- '$line': 'other/$line'"
done
echo "personal end------"
echo -e "\n\n"
sleep 2

# dir leetcode
# echo "leetcode start------"
# ls ./leetcode/docs/algre | while read line
# do
#   echo "- '$line': 'algre/$line'"
# done
# ls ./leetcode/docs/interview | while read line
# do
#   echo "- '$line': 'interview/$line'"
# done
# echo "leetcode end------"
# echo -e "\n\n"
# sleep 2


# # dir backend
# echo "backend start------"
# ls ./backend/docs/nodejs | while read line
# do
#   echo "- '$line': 'nodejs/$line'"
# done
# ls ./backend/docs/python | while read line
# do
#   echo "- '$line': 'python/$line'"
# done
# ls ./backend/docs/backend-sql | while read line
# do
#   echo "- '$line': 'backend-sql/$line'"
# done
# ls ./backend | while read line
# do
#   echo "- '$line': '$line'"
# done
# echo "backend end------"
# echo -e "\n\n"
# sleep 2


# # frontend
# # array and loop
# echo "frontend start------"
# my_array=('' 'about' 'ant-design' 'git' 'javascript' 'react' 'typescript' 'third-part-lib')
# # len=${#my_array[*]} 
# for i in {0..9}
# do
#   str="${my_array[i]}"
#   ls "./frontend/docs/${str}" | while read line
#   do
#     echo "- '$line': '${str}/$line'"
#   done
#   echo -e "\n"
# done

# # some dir is unique(特殊目录，待整理)
# ls ./frontend/docs/react/react-all/中文文档全部 | while read line
# do
#   echo "- '$line': 'react/react-all/中文文档全部/$line'"
# done

# ls ./frontend/docs/react/react-all/英文文档 | while read line
# do
#   echo "- '$line': 'react/react-all/英文文档/$line'"
# done

# ls ./frontend/docs/react/react-all/react-dnd | while read line
# do
#   echo "- '$line': 'react/react-all/react-dnd/$line'"
# done

# echo "frontend end------"
# echo -e "\n\n"
