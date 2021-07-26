#!/bin/bash

rm -rf ../Michael18811380328.github.io/book/site
rm -rf ../Michael18811380328.github.io/frontend/site
rm -rf ../Michael18811380328.github.io/backend/site
rm -rf ../Michael18811380328.github.io/personal/site
rm -rf ../Michael18811380328.github.io/leetcode/site

# move helloSite rendered HTML to github webpage
cp -r ./book/site ../Michael18811380328.github.io/book
cp -r ./frontend/site ../Michael18811380328.github.io/frontend
cp -r ./backend/site ../Michael18811380328.github.io/backend
cp -r ./personal/site ../Michael18811380328.github.io/personal
cp -r ./leetcode/site ../Michael18811380328.github.io/leetcode
cp ./index.html ../Michael18811380328.github.io/
