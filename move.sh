#!/bin/bash

rm -rf ../Michael18811380328.github.io/book/site
rm -rf ../Michael18811380328.github.io/frontend/site
rm -rf ../Michael18811380328.github.io/backend/site
rm -rf ../Michael18811380328.github.io/personal/site
rm -rf ../Michael18811380328.github.io/leetcode/site
rm -rf ../Michael18811380328.github.io/typescript/site

# move helloSite rendered HTML to github webpage
cp -r ./book/site ../Michael18811380328.github.io/book
cp -r ./frontend/site ../Michael18811380328.github.io/frontend
cp -r ./backend/site ../Michael18811380328.github.io/backend
cp -r ./personal/site ../Michael18811380328.github.io/personal
cp -r ./leetcode/site ../Michael18811380328.github.io/leetcode
cp -r ./typescript/site ../Michael18811380328.github.io/typescript

# future iamges 有两个文件夹，最好资源文件和原始网页分开
rm -rf ../Michael18811380328.github.io/images/site
cp -r ./images/site ../Michael18811380328.github.io/images

cp ./index.html ../Michael18811380328.github.io/
